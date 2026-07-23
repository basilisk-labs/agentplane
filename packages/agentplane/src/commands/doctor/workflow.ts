import fs from "node:fs/promises";

import {
  emitWorkflowEvent,
  publishWorkflowCandidate,
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

  const fixed = safeAutofixWorkflowText(current);
  const unsupportedVersion = fixed.diagnostics.find(
    (diagnostic) => diagnostic.code === "WF_UNSUPPORTED_VERSION",
  );
  if (unsupportedVersion) {
    return {
      changed: false,
      note: `Skip: ${unsupportedVersion.message}`,
    };
  }
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

  const published = await publishWorkflowCandidate(repoRoot, fixed.text);
  if (!published.ok) {
    return {
      changed: false,
      note: "Skip: normalized workflow candidate failed contract validation.",
    };
  }
  return {
    changed: true,
    note: "Fixed: normalized workflow contract and refreshed last-known-good.",
  };
}
