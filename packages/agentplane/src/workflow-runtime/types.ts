import type { WorkflowV2FrontMatter } from "@agentplaneorg/core/config";

export type WorkflowMode = WorkflowV2FrontMatter["workflow"]["mode"];
export type WorkflowApprovals = WorkflowV2FrontMatter["approvals"];
export type WorkflowRetryPolicy = WorkflowV2FrontMatter["retry_policy"];
export type WorkflowTimeouts = WorkflowV2FrontMatter["timeouts"];
export type WorkflowFrontMatter = WorkflowV2FrontMatter;

export type WorkflowSectionName = "Prompt Template" | "Checks" | "Fallback";

export type WorkflowSections = Record<string, string>;

export type WorkflowDocument = {
  frontMatter: WorkflowFrontMatter;
  frontMatterRaw: Record<string, unknown>;
  body: string;
  sections: WorkflowSections;
  promptTemplate: string;
  sourcePath?: string;
};

export type WorkflowSeverity = "ERROR" | "WARN" | "INFO";

export type WorkflowErrorCode =
  | "WF_MISSING_FILE"
  | "WF_READ_FAILED"
  | "WF_FRONTMATTER_NOT_OBJECT"
  | "WF_PARSE_ERROR"
  | "WF_SCHEMA_MISSING"
  | "WF_SCHEMA_TYPE"
  | "WF_SCHEMA_ENUM"
  | "WF_SCHEMA_RANGE"
  | "WF_SCHEMA_UNKNOWN_KEY"
  | "WF_UNSUPPORTED_VERSION"
  | "WF_REQUIRED_SECTION_MISSING"
  | "WF_TEMPLATE_UNKNOWN_VARIABLE"
  | "WF_TEMPLATE_UNKNOWN_FILTER"
  | "WF_PATH_OUTSIDE_ROOT"
  | "WF_OWNER_NOT_FOUND"
  | "WF_POLICY_MISMATCH"
  | "WF_FIX_SKIPPED_UNSAFE";

export type WorkflowDiagnostic = {
  code: WorkflowErrorCode;
  severity: WorkflowSeverity;
  path: string;
  message: string;
  remediation?: {
    code: WorkflowErrorCode;
    why: string;
    fix: string;
    safeCommand: string;
    stopCondition: string;
  };
};

export type WorkflowValidationResult = {
  ok: boolean;
  diagnostics: WorkflowDiagnostic[];
};

export type WorkflowTemplateRenderOptions = {
  strictVariables: boolean;
  strictFilters: boolean;
  allowedFilters: Record<string, (value: unknown) => unknown>;
};

export type WorkflowPaths = {
  workflowPath: string;
  lastKnownGoodPath: string;
  workflowDir: string;
};

export type WorkflowBuildInput = {
  baseTemplate: string;
  projectOverrideTemplate?: string;
  runtimeContext: Record<string, unknown>;
};

export type WorkflowBuildOutput = {
  text: string;
  diagnostics: WorkflowDiagnostic[];
};
