export const CORE_VERSION = "0.0.0";

export {
  findGitRoot,
  resolveProject,
  type ResolvedProject,
  type ResolveProjectOptions,
} from "./project-root.js";

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
} from "./config.js";

export {
  parseTaskReadme,
  renderTaskFrontmatter,
  renderTaskReadme,
  type ParsedTaskReadme,
} from "./task-readme.js";

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
} from "./task-store.js";

export {
  buildTasksExportSnapshot,
  canonicalTasksPayload,
  canonicalizeJson,
  computeTasksChecksum,
  writeTasksExport,
  type TasksExportMeta,
  type TasksExportSnapshot,
  type TasksExportTask,
} from "./tasks-export.js";
