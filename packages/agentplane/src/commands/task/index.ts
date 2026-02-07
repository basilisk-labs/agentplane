export { TASK_NEW_USAGE, TASK_NEW_USAGE_EXAMPLE, cmdTaskNew } from "./new.js";
export { TASK_ADD_USAGE, TASK_ADD_USAGE_EXAMPLE, cmdTaskAdd } from "./add.js";
export { TASK_UPDATE_USAGE, TASK_UPDATE_USAGE_EXAMPLE, cmdTaskUpdate } from "./update.js";
export { TASK_SCRUB_USAGE, TASK_SCRUB_USAGE_EXAMPLE, cmdTaskScrub } from "./scrub.js";

export { cmdTaskListWithFilters, cmdTaskList } from "./list.js";
export { cmdTaskNext } from "./next.js";
export { cmdReady } from "./ready.js";
export { cmdTaskSearch } from "./search.js";

export { TASK_SCAFFOLD_USAGE, TASK_SCAFFOLD_USAGE_EXAMPLE, cmdTaskScaffold } from "./scaffold.js";
export { cmdTaskNormalize } from "./normalize.js";
export { cmdTaskMigrate } from "./migrate.js";
export {
  TASK_MIGRATE_DOC_USAGE,
  TASK_MIGRATE_DOC_USAGE_EXAMPLE,
  cmdTaskMigrateDoc,
} from "./migrate-doc.js";

export { cmdTaskComment } from "./comment.js";
export { cmdTaskSetStatus } from "./set-status.js";
export { cmdTaskShow } from "./show.js";
export { TASK_DERIVE_USAGE, TASK_DERIVE_USAGE_EXAMPLE, cmdTaskDerive } from "./derive.js";

export { cmdTaskExport } from "./export.js";
export { cmdTaskLint } from "./lint.js";

export {
  TASK_PLAN_USAGE,
  TASK_PLAN_USAGE_EXAMPLE,
  TASK_PLAN_SET_USAGE,
  TASK_PLAN_SET_USAGE_EXAMPLE,
  TASK_PLAN_APPROVE_USAGE,
  TASK_PLAN_APPROVE_USAGE_EXAMPLE,
  TASK_PLAN_REJECT_USAGE,
  TASK_PLAN_REJECT_USAGE_EXAMPLE,
  cmdTaskPlan,
} from "./plan.js";

export { START_USAGE, START_USAGE_EXAMPLE, cmdStart } from "./start.js";
export { BLOCK_USAGE, BLOCK_USAGE_EXAMPLE, cmdBlock } from "./block.js";
export { FINISH_USAGE, FINISH_USAGE_EXAMPLE, cmdFinish } from "./finish.js";
export { VERIFY_USAGE, VERIFY_USAGE_EXAMPLE, cmdVerify } from "./verify.js";
export { TASK_VERIFY_USAGE, TASK_VERIFY_USAGE_EXAMPLE, cmdTaskVerify } from "./verify-record.js";

export {
  TASK_DOC_SET_USAGE,
  TASK_DOC_SET_USAGE_EXAMPLE,
  TASK_DOC_SHOW_USAGE,
  TASK_DOC_SHOW_USAGE_EXAMPLE,
  cmdTaskDocSet,
  cmdTaskDocShow,
} from "./doc.js";

export { dedupeStrings } from "./shared.js";
