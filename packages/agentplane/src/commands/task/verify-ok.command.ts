import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskVerifyOk } from "./verify-record.js";
import {
  createTaskVerifyCommandSpec,
  makeRunTaskVerifyHandler,
  type TaskVerifyParsed,
} from "./verify-command-shared.js";

export type TaskVerifyOkParsed = TaskVerifyParsed;

export const taskVerifyOkSpec = createTaskVerifyCommandSpec({
  id: ["task", "verify", "ok"],
  summary: "Record verification as OK (updates Verification section and verification frontmatter).",
  example: {
    cmd: 'agentplane task verify ok 202602030608-F1Q8AB --by REVIEWER --note "Looks good"',
    why: "Record an OK verification.",
  },
});

export function makeRunTaskVerifyOkHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return makeRunTaskVerifyHandler({
    commandName: "task verify ok",
    getCtx,
    run: cmdTaskVerifyOk,
  });
}
