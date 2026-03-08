import fs from "node:fs/promises";
import path from "node:path";

import {
  emitWorkflowEvent,
  resolveWorkflowPaths,
  safeAutofixWorkflowText,
  validateWorkflowAtPath,
} from "../../workflow-runtime/index.js";

export async function checkWorkflowContract(repoRoot: string): Promise<string[]> {
  const result = await validateWorkflowAtPath(repoRoot);
  const findings = result.diagnostics.map(
    (d) => `[${d.severity}] ${d.code} ${d.path}: ${d.message}`,
  );
  emitWorkflowEvent({
    event: "workflow_doctor_check",
    details: { ok: result.ok, findings: result.diagnostics.length },
  });
  return findings;
}

export async function safeFixWorkflow(
  repoRoot: string,
): Promise<{ changed: boolean; note: string }> {
  const paths = resolveWorkflowPaths(repoRoot);
  let current = "";
  let sourcePath = paths.workflowPath;
  try {
    current = await fs.readFile(paths.workflowPath, "utf8");
  } catch {
    try {
      current = await fs.readFile(paths.legacyWorkflowPath, "utf8");
      sourcePath = paths.legacyWorkflowPath;
    } catch {
      return { changed: false, note: "Skip: workflow contract file not found." };
    }
  }

  const fixed = safeAutofixWorkflowText(current);
  if (fixed.diagnostics.some((d) => d.code === "WF_FIX_SKIPPED_UNSAFE")) {
    const details = fixed.diagnostics.map((d) => `${d.path}`).join(", ");
    return {
      changed: false,
      note: `Skip: unsafe workflow autofix required (unknown keys). Proposed manual review: ${details}`,
    };
  }
  if (!fixed.changed) {
    if (sourcePath === paths.workflowPath) {
      return { changed: false, note: "OK: workflow contract already normalized." };
    }
    await fs.mkdir(path.dirname(paths.workflowPath), { recursive: true });
    await fs.writeFile(paths.workflowPath, current, "utf8");
    await fs.rm(paths.legacyWorkflowPath, { force: true });
    await fs.mkdir(paths.workflowDir, { recursive: true });
    await fs.copyFile(paths.workflowPath, paths.lastKnownGoodPath);
    return {
      changed: true,
      note: "Fixed: moved legacy WORKFLOW.md into .agentplane and refreshed last-known-good.",
    };
  }

  await fs.mkdir(path.dirname(paths.workflowPath), { recursive: true });
  await fs.writeFile(paths.workflowPath, fixed.text, "utf8");
  if (sourcePath === paths.legacyWorkflowPath) {
    await fs.rm(paths.legacyWorkflowPath, { force: true });
  }
  await fs.mkdir(paths.workflowDir, { recursive: true });
  await fs.copyFile(paths.workflowPath, paths.lastKnownGoodPath);
  return {
    changed: true,
    note: "Fixed: normalized workflow contract and refreshed last-known-good.",
  };
}
