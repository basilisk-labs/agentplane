import fs from "node:fs/promises";
import path from "node:path";
import { loadConfig } from "@agentplaneorg/core/config";

import {
  emitWorkflowEvent,
  resolveWorkflowPaths,
  safeAutofixWorkflowText,
  validateWorkflowAtPath,
} from "../../workflow-runtime/index.js";
import { renderWorkflowDiagnostic } from "../../workflow-runtime/validation-helpers.js";

export async function checkWorkflowContract(repoRoot: string): Promise<string[]> {
  const result = await validateWorkflowAtPath(repoRoot);
  const findings = result.diagnostics.map((d) => renderWorkflowDiagnostic(d));
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
  try {
    current = await fs.readFile(paths.workflowPath, "utf8");
  } catch {
    return { changed: false, note: "Skip: workflow contract file not found." };
  }

  const loaded = await loadConfig(path.join(repoRoot, ".agentplane"));
  const fixed = safeAutofixWorkflowText(current, {
    mode: loaded.config.workflow_mode,
    approvals: {
      require_plan: loaded.config.agents?.approvals?.require_plan ?? true,
      require_verify: loaded.config.agents?.approvals?.require_verify ?? true,
      require_network: loaded.config.agents?.approvals?.require_network ?? true,
    },
  });
  if (fixed.diagnostics.some((d) => d.code === "WF_FIX_SKIPPED_UNSAFE")) {
    const details = fixed.diagnostics.map((d) => `${d.path}`).join(", ");
    return {
      changed: false,
      note: `Skip: unsafe workflow autofix required (unknown keys). Proposed manual review: ${details}`,
    };
  }
  if (!fixed.changed) {
    return { changed: false, note: "OK: workflow contract already normalized." };
  }

  await fs.mkdir(path.dirname(paths.workflowPath), { recursive: true });
  await fs.writeFile(paths.workflowPath, fixed.text, "utf8");
  await fs.mkdir(paths.workflowDir, { recursive: true });
  await fs.copyFile(paths.workflowPath, paths.lastKnownGoodPath);
  return {
    changed: true,
    note: "Fixed: normalized workflow contract and refreshed last-known-good.",
  };
}
