export type WorkflowMode = "direct" | "branch_pr";

export type WorkflowApprovals = {
  require_plan: boolean;
  require_verify: boolean;
  require_network: boolean;
};

export type WorkflowRetryPolicy = {
  normal_exit_continuation: boolean;
  abnormal_backoff: "exponential";
  max_attempts: number;
};

export type WorkflowTimeouts = {
  stall_seconds: number;
};

export type WorkflowFrontMatter = {
  version: number;
  mode: WorkflowMode;
  owners: {
    orchestrator: string;
  };
  approvals: WorkflowApprovals;
  retry_policy: WorkflowRetryPolicy;
  timeouts: WorkflowTimeouts;
  in_scope_paths: string[];
};

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
  legacyWorkflowPath: string;
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
