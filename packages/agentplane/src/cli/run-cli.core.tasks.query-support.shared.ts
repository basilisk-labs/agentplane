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

export { runCli } from "./run-cli.js";
export { infoMessage } from "./output.js";
export {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../agents/agents-template.js";
export type * as taskBackend from "../backends/task-backend.js";
export { loadCommandContext, loadTaskFromContext } from "../commands/shared/task-backend.js";
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
export { evolveRunnerRunState, writeRunnerRunState } from "../runner/artifacts.js";
export {
  formatRunnerCapabilitySummaryLines,
  formatRunnerPolicyFieldSummaryLines,
} from "../runner/policy-display.js";
export { prepareTaskRunnerExecution } from "../runner/usecases/task-run.js";
export * as processSupervision from "../runner/process-supervision/signals.js";
export { resolveUpdateCheckCachePath } from "./update-check.js";
export * as prompts from "./prompts.js";
export { VERIFY_STEPS_PLACEHOLDER } from "../commands/task/shared/docs.js";
