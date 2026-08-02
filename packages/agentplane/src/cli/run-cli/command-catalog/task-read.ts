import { taskListSpec } from "../../../commands/task/list.spec.js";
import { taskNextSpec } from "../../../commands/task/next.spec.js";
import { taskSearchSpec } from "../../../commands/task/search.spec.js";
import type { CommandContext } from "../../../commands/shared/task-backend.js";
import { requireCanonicalCommandInvocation } from "../../command-invocations.js";

import { declareSessionCommand, type CommandEntry } from "./kernel.js";
import { TASK_READ_REQUIREMENTS, type TaskReadSession } from "./task-capability-profiles.js";

const getTaskReadContext = (session: TaskReadSession) => (command: string) =>
  session.require("task.read", command) as Promise<CommandContext>;

export const TASK_READ_COMMANDS = [
  declareSessionCommand(taskListSpec, {
    load: (session) =>
      import("../../../commands/task/list.run.js").then((module) =>
        module.makeRunTaskListHandler((command) => session.require("task.read", command)),
      ),
    requirements: TASK_READ_REQUIREMENTS,
    invocation: requireCanonicalCommandInvocation(["task", "list"]),
  }),
  declareSessionCommand(taskSearchSpec, {
    load: (session) =>
      import("../../../commands/task/search.run.js").then((module) =>
        module.makeRunTaskSearchHandler(getTaskReadContext(session)),
      ),
    requirements: TASK_READ_REQUIREMENTS,
  }),
  declareSessionCommand(taskNextSpec, {
    load: (session) =>
      import("../../../commands/task/next.run.js").then((module) =>
        module.makeRunTaskNextHandler(getTaskReadContext(session)),
      ),
    requirements: TASK_READ_REQUIREMENTS,
  }),
] as const satisfies readonly CommandEntry[];
