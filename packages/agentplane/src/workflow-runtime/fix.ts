import {
  UnsupportedWorkflowVersionError,
  safeParseWorkflowFrontMatter,
} from "@agentplaneorg/core/config";

import { parseWorkflowMarkdown, serializeWorkflowMarkdown } from "./markdown.js";
import type { WorkflowDiagnostic } from "./types.js";

type WorkflowFixResult = {
  changed: boolean;
  text: string;
  diagnostics: WorkflowDiagnostic[];
};

type ExpectedWorkflowPolicy = {
  mode: "direct" | "branch_pr";
  approvals: {
    require_plan: boolean;
    require_verify: boolean;
    require_network: boolean;
  };
};

function unsafeFixDiagnostics(error: unknown): WorkflowDiagnostic[] {
  if (error instanceof UnsupportedWorkflowVersionError) {
    return [
      {
        code: "WF_UNSUPPORTED_VERSION",
        severity: "ERROR",
        path: "front_matter.version",
        message: error.message,
      },
    ];
  }
  return [
    {
      code: "WF_FIX_SKIPPED_UNSAFE",
      severity: "WARN",
      path: "front_matter",
      message: "Unsafe workflow autofix skipped because front matter is not a valid v1/v2 input.",
    },
  ];
}

export function safeAutofixWorkflowText(
  text: string,
  expectedPolicy?: ExpectedWorkflowPolicy,
): WorkflowFixResult {
  const parsed = parseWorkflowMarkdown(text);
  const normalized = safeParseWorkflowFrontMatter(parsed.document.frontMatterRaw);
  if (!normalized.success) {
    return {
      changed: false,
      text,
      diagnostics: unsafeFixDiagnostics(normalized.error),
    };
  }

  const nextFrontMatter = structuredClone(normalized.data);
  if (expectedPolicy) {
    nextFrontMatter.workflow = {
      ...nextFrontMatter.workflow,
      mode: expectedPolicy.mode,
    };
    nextFrontMatter.approvals = {
      ...nextFrontMatter.approvals,
      ...expectedPolicy.approvals,
    };
  }

  const sections = {
    ...parsed.document.sections,
    "Prompt Template": parsed.document.sections["Prompt Template"] ?? "",
    Checks: parsed.document.sections.Checks ?? "- preflight\n- verify\n- finish",
    Fallback:
      parsed.document.sections.Fallback ??
      "last_known_good: .agentplane/workflows/last-known-good.md",
  };
  const nextText = serializeWorkflowMarkdown(nextFrontMatter, sections);
  return {
    changed: nextText !== text,
    text: nextText,
    diagnostics: [],
  };
}
