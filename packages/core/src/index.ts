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
  type ExecutionProfile,
  type LoadedConfig,
  type ReasoningEffort,
  type StatusCommitPolicy,
  type WorkflowMode,
} from "./config/config.js";

export {
  buildExecutionProfile,
  EXECUTION_PROFILE_PRESETS,
  resolveExecutionProfilePreset,
} from "./config/execution-profile.js";

export {
  parseTaskReadme,
  renderTaskFrontmatter,
  renderTaskReadme,
  type ParsedTaskReadme,
} from "./tasks/task-readme.js";

export { readTaskReadme, updateTaskReadmeAtomic } from "./tasks/task-readme-io.js";

export {
  docChanged,
  ensureDocSections,
  extractTaskDoc,
  mergeTaskDoc,
  normalizeDocSectionName,
  normalizeTaskDoc,
  parseDocSections,
  setMarkdownSection,
  splitCombinedHeadingLines,
} from "./tasks/task-doc.js";

export { atomicWriteFile } from "./fs/atomic-write.js";

export { generateTaskId, timestampIdPrefix, TASK_ID_ALPHABET } from "./tasks/task-id.js";

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

export {
  clearPinnedBaseBranch,
  getBaseBranch,
  getPinnedBaseBranch,
  resolveBaseBranch,
  setPinnedBaseBranch,
} from "./git/base-branch.js";

export {
  extractTaskSuffix,
  isGenericSubject,
  validateCommitSubject,
  type CommitPolicyResult,
} from "./commit/commit-policy.js";

export { getStagedFiles, getUnstagedFiles, getUnstagedTrackedFiles } from "./git/git-utils.js";
