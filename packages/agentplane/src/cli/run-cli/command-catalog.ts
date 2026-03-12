import type { CommandEntry } from "./command-catalog/shared.js";

import { CORE_COMMANDS } from "./command-catalog/core.js";
import { LIFECYCLE_COMMANDS } from "./command-catalog/lifecycle.js";
import { PROJECT_COMMANDS } from "./command-catalog/project.js";
import { TASK_COMMANDS } from "./command-catalog/task.js";

export type { CommandEntry, RunDeps } from "./command-catalog/shared.js";

export const COMMANDS = [
  ...CORE_COMMANDS,
  ...TASK_COMMANDS,
  ...PROJECT_COMMANDS,
  ...LIFECYCLE_COMMANDS,
] as const satisfies readonly CommandEntry[];
