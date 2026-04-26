import type { AgentplaneConfig } from "@agentplaneorg/core/config";

import { diagnosticsToValidationResult } from "./markdown.js";
import type { WorkflowDiagnostic, WorkflowDocument, WorkflowValidationResult } from "./types.js";
import { validateWorkflowFrontMatter } from "./validate-frontmatter.js";
import { isRecord, pushDiagnostic } from "./validation-helpers.js";

export function validateWorkflowDocument(
  document: WorkflowDocument,
  opts?: {
    repoRoot?: string;
    knownAgentIds?: Set<string>;
    config?: AgentplaneConfig | null;
  },
): WorkflowValidationResult {
  const diags: WorkflowDiagnostic[] = [];
  const raw = document.frontMatterRaw;
  if (!isRecord(raw)) {
    pushDiagnostic(diags, {
      code: "WF_FRONTMATTER_NOT_OBJECT",
      severity: "ERROR",
      path: "front_matter",
      message: "Workflow front matter must decode to an object.",
    });
    return diagnosticsToValidationResult(diags);
  }

  const frontMatter = validateWorkflowFrontMatter(diags, raw, opts);
  if (frontMatter) {
    document.frontMatter = frontMatter;
  }

  return diagnosticsToValidationResult(diags);
}
