export const CORE_VERSION = "0.0.0";

export {
  findGitRoot,
  resolveProject,
  type ResolvedProject,
  type ResolveProjectOptions,
} from "./project/project-root.js";

export {
  defaultConfig,
  loadConfig,
  saveConfig,
  setByDottedKey,
  validateConfig,
  type AgentplaneConfig,
  type LoadedConfig,
  type StatusCommitPolicy,
  type WorkflowMode,
} from "./config/config.js";

export {
  parseTaskReadme,
  renderTaskFrontmatter,
  renderTaskReadme,
  type ParsedTaskReadme,
} from "./tasks/task-readme.js";

export {
  createTask,
  getTasksDir,
  listTasks,
  readTask,
  setTaskDocSection,
  taskReadmePath,
  validateTaskDocMetadata,
  type TaskFrontmatter,
  type TaskPriority,
  type TaskRecord,
  type TaskStatus,
} from "./tasks/task-store.js";

export {
  buildTasksExportSnapshot,
  canonicalTasksPayload,
  canonicalizeJson,
  computeTasksChecksum,
  writeTasksExport,
  type TasksExportMeta,
  type TasksExportSnapshot,
  type TasksExportTask,
} from "./tasks/tasks-export.js";

export {
  lintTasksFile,
  lintTasksSnapshot,
  readTasksExport,
  type TasksLintResult,
} from "./tasks/tasks-lint.js";

export { getBaseBranch, getPinnedBaseBranch, setPinnedBaseBranch } from "./git/base-branch.js";

export {
  extractTaskSuffix,
  isGenericSubject,
  validateCommitSubject,
  type CommitPolicyResult,
} from "./commit/commit-policy.js";

export { getStagedFiles, getUnstagedFiles } from "./git/git-utils.js";
