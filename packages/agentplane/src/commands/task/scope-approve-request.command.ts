import type { CommandContext } from "../shared/task-backend.js";
import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { approveKernelScopeRequest } from "./kernel-scope-request.js";

type Options = {
  taskId: string;
  workItemId: string;
  requestDigest: string;
  stateDigest: string;
  by: string;
};
export const taskScopeApproveRequestSpec: CommandSpec<Options> = {
  id: ["task", "scope", "approve-request"],
  group: "Task",
  summary: "Approve one authenticated pre-effect scope request with exact USER authority.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "work-item",
      required: true,
      valueHint: "<id>",
      description: "Blocked WorkItem.",
    },
    {
      kind: "string",
      name: "request-digest",
      required: true,
      valueHint: "<sha256:...>",
      description: "Exact retained request digest.",
    },
    {
      kind: "string",
      name: "state-digest",
      required: true,
      valueHint: "<sha256:...>",
      description: "Exact canonical record digest.",
    },
    {
      kind: "string",
      name: "by",
      required: true,
      choices: ["USER"],
      valueHint: "USER",
      description: "Explicit operator attribution.",
    },
  ],
  validateRaw(raw) {
    if (
      ![raw.opts["request-digest"], raw.opts["state-digest"]].every((v) =>
        /^sha256:[a-f0-9]{64}$/u.test(String(v)),
      )
    )
      throw usageError({
        spec: taskScopeApproveRequestSpec,
        message: "Exact sha256 request and state digests are required.",
      });
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    workItemId: String(raw.opts["work-item"]),
    requestDigest: String(raw.opts["request-digest"]),
    stateDigest: String(raw.opts["state-digest"]),
    by: String(raw.opts.by),
  }),
};
export function makeRunTaskScopeApproveRequestHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (_ctx: CommandCtx, opts: Options) => {
    await approveKernelScopeRequest(await getCtx("task scope approve-request"), opts);
    return 0;
  };
}
