import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import {
  cmdRestoreCompletion,
  type RestoreCompletionOptions,
} from "./kernel-work-item-restore-completion.js";

export const taskWorkItemRestoreCompletionSpec: CommandSpec<RestoreCompletionOptions> = {
  id: ["task", "work-item", "restore-completion"],
  group: "Task",
  summary: "Restore one authenticated historical completion after a scope-plan reset.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "work-item",
      required: true,
      valueHint: "<id>",
      description: "Reset WorkItem ID.",
    },
    {
      kind: "string",
      name: "inspection-work-order",
      required: true,
      valueHint: "<sha256:...>",
      description: "Exact historical independent inspection WorkOrder.",
    },
    {
      kind: "string",
      name: "state-digest",
      valueHint: "<sha256:...>",
      description: "Exact current record digest from the dry-run.",
    },
    {
      kind: "string",
      name: "proof-digest",
      valueHint: "<sha256:...>",
      description: "Exact authenticated proof digest from the dry-run.",
    },
    {
      kind: "string",
      name: "by",
      choices: ["USER"],
      valueHint: "<role>",
      description: "Explicit operator attribution.",
    },
    {
      kind: "string",
      name: "note",
      valueHint: "<text>",
      description: "Explain the historical reset recovery.",
    },
    {
      kind: "boolean",
      name: "dry-run",
      description: "Read and authenticate evidence without changing state.",
    },
  ],
  validateRaw(raw) {
    if (
      typeof raw.opts["work-item"] !== "string" ||
      !raw.opts["work-item"].trim() ||
      !/^sha256:[a-f0-9]{64}$/u.test(String(raw.opts["inspection-work-order"])) ||
      (!raw.opts["dry-run"] &&
        (raw.opts.by !== "USER" ||
          typeof raw.opts.note !== "string" ||
          !raw.opts.note.trim() ||
          !["state-digest", "proof-digest"].every((name) =>
            /^sha256:[a-f0-9]{64}$/u.test(String(raw.opts[name])),
          )))
    )
      throw usageError({
        spec: taskWorkItemRestoreCompletionSpec,
        message:
          "Use --dry-run with the exact inspection selector, or supply exact state/proof digests, --by USER and --note.",
      });
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    workItemId: String(raw.opts["work-item"]),
    inspectionWorkOrder: String(raw.opts["inspection-work-order"]),
    stateDigest: raw.opts["state-digest"] as string | undefined,
    proofDigest: raw.opts["proof-digest"] as string | undefined,
    by: raw.opts.by as string | undefined,
    note: raw.opts.note as string | undefined,
    dryRun: Boolean(raw.opts["dry-run"]),
  }),
};

export function makeRunTaskWorkItemRestoreCompletionHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (_ctx: CommandCtx, parsed: RestoreCompletionOptions) =>
    cmdRestoreCompletion(await getCtx("task work-item restore-completion"), parsed);
}
