export const TASK_KIND_VALUES = new Set([
  "analysis",
  "content",
  "docs",
  "code",
  "release",
  "ops",
  "context",
]);

export const MUTATION_SCOPE_VALUES = new Set([
  "none",
  "docs",
  "code",
  "release",
  "ops",
  "context",
  "unknown",
]);

export const RISK_FLAG_VALUES = new Set([
  "network",
  "credentials",
  "deploy",
  "publish",
  "merge",
  "security",
  "external_system",
]);

export const BLUEPRINT_REQUEST_VALUES = new Set([
  "analysis.light",
  "content.light",
  "docs.change",
  "code.direct",
  "code.branch_pr",
  "performance.benchmark",
  "quality.regression",
  "context.assimilation",
  "context.maximum_assimilation",
  "post_run.improvement_review",
  "release.strict",
  "ops.approval",
]);
