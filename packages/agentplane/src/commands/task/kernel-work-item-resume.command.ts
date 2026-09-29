import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import { cmdWorkItemResume, type WorkItemResumeOptions } from "./kernel-work-item-resume.js";

export const taskWorkItemResumeSpec: CommandSpec<WorkItemResumeOptions> = {
  id: ["task", "work-item", "resume"],
  group: "Task",
  summary: "Resume one blocked canonical WorkItem with state-bound operator input.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "work-item",
      valueHint: "<id>",
      required: true,
      description: "Blocked WorkItem ID.",
    },
    {
      kind: "string",
      name: "state-digest",
      valueHint: "<sha256:...>",
      required: true,
      description: "Exact canonical record digest from task advance.",
    },
    {
      kind: "string",
      name: "by",
      valueHint: "<role>",
      required: true,
      choices: ["USER"],
      description: "Explicit operator attribution.",
    },
    {
      kind: "string",
      name: "note",
      valueHint: "<text>",
      required: true,
      description: "Explain how the blocker was resolved.",
    },
  ],
  validateRaw(raw) {
    if (!/^sha256:[a-f0-9]{64}$/u.test(String(raw.opts["state-digest"])))
      throw usageError({
        spec: taskWorkItemResumeSpec,
        message: "--state-digest must be an exact sha256 digest.",
      });
    if (
      typeof raw.opts.note !== "string" ||
      !raw.opts.note.trim() ||
      typeof raw.opts["work-item"] !== "string" ||
      !raw.opts["work-item"].trim()
    )
      throw usageError({
        spec: taskWorkItemResumeSpec,
        message: "--note and --work-item must not be empty.",
      });
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    workItemId: String(raw.opts["work-item"]),
    stateDigest: String(raw.opts["state-digest"]),
    by: String(raw.opts.by),
    note: String(raw.opts.note),
  }),
};

export function makeRunTaskWorkItemResumeHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (_ctx: CommandCtx, parsed: WorkItemResumeOptions) =>
    cmdWorkItemResume(await getCtx("task work-item resume"), parsed);
}
