import fs from "node:fs/promises";
import path from "node:path";

import { loadConfig } from "@agentplaneorg/core";

import { parseWorkflowMarkdown } from "./markdown.js";
import { emitWorkflowEvent } from "./observability.js";
import { resolveWorkflowPaths } from "./paths.js";
import type { WorkflowDiagnostic, WorkflowDocument, WorkflowValidationResult } from "./types.js";
import { validateWorkflowDocument } from "./validate.js";

async function pathExists(absPath: string): Promise<boolean> {
  try {
    await fs.access(absPath);
    return true;
  } catch {
    return false;
  }
}

async function resolveWorkflowReadPath(paths: {
  workflowPath: string;
  legacyWorkflowPath: string;
}): Promise<string> {
  if (await pathExists(paths.workflowPath)) return paths.workflowPath;
  if (await pathExists(paths.legacyWorkflowPath)) return paths.legacyWorkflowPath;
  return paths.workflowPath;
}

async function removeLegacyWorkflowIfPresent(paths: {
  workflowPath: string;
  legacyWorkflowPath: string;
}): Promise<void> {
  if (paths.workflowPath === paths.legacyWorkflowPath) return;
  try {
    await fs.rm(paths.legacyWorkflowPath, { force: true });
  } catch {
    // best effort cleanup
  }
}

async function listAgentIds(agentplaneDir: string): Promise<Set<string>> {
  const ids = new Set<string>();
  const dir = path.join(agentplaneDir, "agents");
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const ent of entries) {
      if (ent.isFile() && ent.name.endsWith(".json")) {
        ids.add(ent.name.replace(/\.json$/i, ""));
      }
    }
  } catch {
    // best effort
  }
  return ids;
}

export async function readWorkflowDocument(
  repoRoot: string,
  absPath?: string,
): Promise<{ document: WorkflowDocument | null; diagnostics: WorkflowDiagnostic[]; path: string }> {
  const paths = resolveWorkflowPaths(repoRoot);
  const targetPath = absPath ?? (await resolveWorkflowReadPath(paths));

  try {
    const content = await fs.readFile(targetPath, "utf8");
    const parsed = parseWorkflowMarkdown(content, targetPath);
    return {
      document: parsed.document,
      diagnostics: parsed.diagnostics,
      path: targetPath,
    };
  } catch (error) {
    return {
      document: null,
      diagnostics: [
        {
          code: (await pathExists(targetPath)) ? "WF_READ_FAILED" : "WF_MISSING_FILE",
          severity: "ERROR",
          path: "file",
          message: `Cannot read workflow file ${targetPath}: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      path: targetPath,
    };
  }
}

export async function validateWorkflowAtPath(
  repoRoot: string,
  absPath?: string,
): Promise<WorkflowValidationResult> {
  const read = await readWorkflowDocument(repoRoot, absPath);
  const diagnostics = [...read.diagnostics];
  if (!read.document) {
    return {
      ok: false,
      diagnostics,
    };
  }

  const loaded = await loadConfig(path.join(repoRoot, ".agentplane"));
  const knownAgentIds = await listAgentIds(path.join(repoRoot, ".agentplane"));
  const validated = validateWorkflowDocument(read.document, {
    repoRoot,
    knownAgentIds,
    config: loaded.config,
  });
  diagnostics.push(...validated.diagnostics);

  return {
    ok: diagnostics.every((d) => d.severity !== "ERROR"),
    diagnostics,
  };
}

export async function validateWorkflowText(
  repoRoot: string,
  workflowText: string,
): Promise<WorkflowValidationResult> {
  const parsed = parseWorkflowMarkdown(workflowText);
  const loaded = await loadConfig(path.join(repoRoot, ".agentplane"));
  const knownAgentIds = await listAgentIds(path.join(repoRoot, ".agentplane"));
  const validated = validateWorkflowDocument(parsed.document, {
    repoRoot,
    knownAgentIds,
    config: loaded.config,
  });
  return {
    ok: [...parsed.diagnostics, ...validated.diagnostics].every((d) => d.severity !== "ERROR"),
    diagnostics: [...parsed.diagnostics, ...validated.diagnostics],
  };
}

export async function publishWorkflowCandidate(
  repoRoot: string,
  candidateText: string,
): Promise<WorkflowValidationResult> {
  const paths = resolveWorkflowPaths(repoRoot);
  const tempPath = `${paths.workflowPath}.tmp.${Date.now()}`;

  const parsed = parseWorkflowMarkdown(candidateText, paths.workflowPath);
  const configLoaded = await loadConfig(path.join(repoRoot, ".agentplane"));
  const validation = validateWorkflowDocument(parsed.document, {
    repoRoot,
    knownAgentIds: await listAgentIds(path.join(repoRoot, ".agentplane")),
    config: configLoaded.config,
  });
  const diagnostics = [...parsed.diagnostics, ...validation.diagnostics];

  if (diagnostics.some((d) => d.severity === "ERROR")) {
    emitWorkflowEvent({
      event: "workflow_publish_failed",
      code: "WF_PARSE_ERROR",
      details: { reason: "validation failed before publish", diagnostics: diagnostics.length },
    });
    return { ok: false, diagnostics };
  }

  try {
    await fs.mkdir(path.dirname(paths.workflowPath), { recursive: true });
    await fs.mkdir(paths.workflowDir, { recursive: true });
    await fs.writeFile(tempPath, candidateText, "utf8");
    await fs.rename(tempPath, paths.workflowPath);
    await removeLegacyWorkflowIfPresent(paths);
    await fs.copyFile(paths.workflowPath, paths.lastKnownGoodPath);
    emitWorkflowEvent({
      event: "workflow_publish_completed",
      details: { workflowPath: paths.workflowPath, lastKnownGoodPath: paths.lastKnownGoodPath },
    });
    return { ok: true, diagnostics };
  } catch (error) {
    try {
      await fs.rm(tempPath, { force: true });
    } catch {
      // best effort cleanup
    }
    emitWorkflowEvent({
      event: "workflow_publish_failed",
      code: "WF_READ_FAILED",
      details: { reason: error instanceof Error ? error.message : String(error) },
    });
    return {
      ok: false,
      diagnostics: [
        ...diagnostics,
        {
          code: "WF_READ_FAILED",
          severity: "ERROR",
          path: "file",
          message: `Failed to atomically publish workflow: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
    };
  }
}

export async function restoreWorkflowFromLastKnownGood(
  repoRoot: string,
): Promise<WorkflowValidationResult> {
  const paths = resolveWorkflowPaths(repoRoot);
  const tempPath = `${paths.workflowPath}.restore.tmp.${Date.now()}`;

  let lkgText = "";
  try {
    lkgText = await fs.readFile(paths.lastKnownGoodPath, "utf8");
  } catch (error) {
    emitWorkflowEvent({
      event: "workflow_restore_failed",
      code: "WF_MISSING_FILE",
      details: { reason: error instanceof Error ? error.message : String(error) },
    });
    return {
      ok: false,
      diagnostics: [
        {
          code: "WF_MISSING_FILE",
          severity: "ERROR",
          path: "file",
          message: `Missing last-known-good workflow snapshot at ${paths.lastKnownGoodPath}`,
        },
      ],
    };
  }

  const parsed = parseWorkflowMarkdown(lkgText, paths.lastKnownGoodPath);
  const configLoaded = await loadConfig(path.join(repoRoot, ".agentplane"));
  const validated = validateWorkflowDocument(parsed.document, {
    repoRoot,
    knownAgentIds: await listAgentIds(path.join(repoRoot, ".agentplane")),
    config: configLoaded.config,
  });
  const diagnostics = [...parsed.diagnostics, ...validated.diagnostics];
  if (diagnostics.some((d) => d.severity === "ERROR")) {
    emitWorkflowEvent({
      event: "workflow_restore_failed",
      code: "WF_PARSE_ERROR",
      details: { reason: "last-known-good validation failed" },
    });
    return { ok: false, diagnostics };
  }

  try {
    await fs.mkdir(path.dirname(paths.workflowPath), { recursive: true });
    await fs.writeFile(tempPath, lkgText, "utf8");
    await fs.rename(tempPath, paths.workflowPath);
    await removeLegacyWorkflowIfPresent(paths);
    emitWorkflowEvent({
      event: "workflow_restore_completed",
      details: { workflowPath: paths.workflowPath, from: paths.lastKnownGoodPath },
    });
    return { ok: true, diagnostics };
  } catch (error) {
    try {
      await fs.rm(tempPath, { force: true });
    } catch {
      // best effort cleanup
    }
    emitWorkflowEvent({
      event: "workflow_restore_failed",
      code: "WF_READ_FAILED",
      details: { reason: error instanceof Error ? error.message : String(error) },
    });
    return {
      ok: false,
      diagnostics: [
        ...diagnostics,
        {
          code: "WF_READ_FAILED",
          severity: "ERROR",
          path: "file",
          message: `Failed to restore workflow from snapshot: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
    };
  }
}
