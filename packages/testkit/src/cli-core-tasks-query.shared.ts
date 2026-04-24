export { execFile } from "node:child_process";
export { readFileSync } from "node:fs";
export {
  chmod,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
export { default as os } from "node:os";
export { default as path } from "node:path";
export { promisify } from "node:util";
export { expect, it, vi } from "vitest";
export type { ResolvedProject } from "@agentplaneorg/core/project";
export { defaultConfig } from "@agentplaneorg/core/config";
export { extractTaskSuffix } from "@agentplaneorg/core/commit";
export {
  readTask,
  renderTaskDocFromSections,
  taskDocToSectionMap,
} from "@agentplaneorg/core/tasks";

export {
  evolveRunnerRunState,
  filterAgentsByWorkflow,
  formatRunnerCapabilitySummaryLines,
  formatRunnerPolicyFieldSummaryLines,
  infoMessage,
  loadAgentTemplates,
  loadAgentsTemplate,
  loadCommandContext,
  loadTaskFromContext,
  prepareTaskRunnerExecution,
  processSupervision,
  prompts,
  resolveUpdateCheckCachePath,
  runCli,
  VERIFY_STEPS_PLACEHOLDER,
  writeRunnerRunState,
} from "agentplane/internal/testing";
export type { taskBackend } from "agentplane/internal/testing";
export {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  createUpgradeBundle,
  expectAgentJsonEnvelope,
  getAgentplaneHome,
  gitBranchExists,
  runCliSilent,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  mkTempDir,
  parseAgentJsonEnvelope,
  pathExists,
  splitOutputLines,
  stageGitignoreIfPresent,
  stubTaskBackend,
  writeConfig,
  writeDefaultConfig,
} from "@agentplane/testkit";
