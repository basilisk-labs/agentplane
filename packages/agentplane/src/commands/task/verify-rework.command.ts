import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskVerifyRework } from "./verify-record.js";
import {
  createTaskVerifyCommandSpec,
  makeRunTaskVerifyHandler,
  type TaskVerifyParsed,
} from "./verify-command-shared.js";

export type TaskVerifyReworkParsed = TaskVerifyParsed;

export const taskVerifyReworkSpec = createTaskVerifyCommandSpec({
  id: ["task", "verify", "rework"],
  summary:
    "Record verification as needs rework (resets commit, sets status to DOING, updates Verification).",
  example: {
    cmd: 'agentplane task verify rework 202602030608-F1Q8AB --by REVIEWER --note "Needs changes"',
    why: "Record a needs-rework verification.",
  },
});

export function makeRunTaskVerifyReworkHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return makeRunTaskVerifyHandler({
    commandName: "task verify rework",
    getCtx,
    run: cmdTaskVerifyRework,
  });
}
