export type {
  TaskStoreIntent,
  TaskStoreIntentResult,
  TaskStorePatch,
  TaskStoreTaskPatch,
} from "./task-store/types.js";

export {
  appendTaskCommentIntent,
  appendTaskEventIntent,
  applyTaskStoreIntentsToTask,
  mutateTaskStore,
  replaceTaskDocIntent,
  setTaskFieldsIntent,
  setTaskSectionIntent,
  touchTaskDocMetaIntent,
} from "./task-store/intents.js";

export { TaskStore, backendIsLocalFileBackend, getTaskStore } from "./task-store/store.js";
