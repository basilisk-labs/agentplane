import type { TaskRepositoryEffect } from "@agentplaneorg/core/tasks";

import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { toStringList } from "../../cli/spec/parse-utils.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskScopeExtend } from "./scope-extend.js";

const REPOSITORY_EFFECTS = [
  "repository_write",
  "documentation",
  "source_code",
  "tests",
  "public_api",
  "schema",
  "dependencies",
  "ci",
  "release_metadata",
  "security_boundary",
] as const satisfies readonly TaskRepositoryEffect[];

export type TaskScopeExtendParsed = {
  taskId: string;
  scopeRoots: string[];
  repositoryEffects: TaskRepositoryEffect[];
  requestDigest: string;
  stateFingerprint: string;
  by: string;
};

export const taskScopeExtendSpec: CommandSpec<TaskScopeExtendParsed> = {
  id: ["task", "scope", "extend"],
  group: "Task",
  summary: "Extend blocked task repository scope with state-bound USER authority.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "scope-root",
      repeatable: true,
      valueHint: "<path>",
      description: "Repository-relative writable root to add. Repeatable.",
    },
    {
      kind: "string",
      name: "repository-effect",
      repeatable: true,
      choices: [...REPOSITORY_EFFECTS],
      valueHint: "<effect>",
      description: "Repository effect to add. Repeatable.",
    },
    {
      kind: "string",
      name: "request-digest",
      required: true,
      valueHint: "<sha256:...>",
      description: "Exact digest of the pending structured scope-extension request.",
    },
    {
      kind: "string",
      name: "state-fingerprint",
      required: true,
      valueHint: "<sha256:...>",
      description: "Exact task next-action fingerprint that binds this approval.",
    },
    {
      kind: "string",
      name: "by",
      required: true,
      valueHint: "<role>",
      description: "Approver role. Scope extension requires USER.",
    },
  ],
  examples: [
    {
      cmd: "agentplane task scope extend T-1 --scope-root website --repository-effect documentation --request-digest sha256:... --state-fingerprint sha256:... --by USER",
      why: "Approve a monotonic repository-scope extension after a typed blocker.",
    },
  ],
  validateRaw: (raw) => {
    if (
      toStringList(raw.opts["scope-root"]).length === 0 &&
      toStringList(raw.opts["repository-effect"]).length === 0
    ) {
      throw usageError({
        spec: taskScopeExtendSpec,
        message: "At least one --scope-root or --repository-effect is required.",
      });
    }
    if (!/^sha256:[0-9a-f]{64}$/u.test(String(raw.opts["state-fingerprint"]))) {
      throw usageError({
        spec: taskScopeExtendSpec,
        message: "--state-fingerprint must be an exact sha256:<64 lowercase hex> digest.",
      });
    }
    if (!/^sha256:[0-9a-f]{64}$/u.test(String(raw.opts["request-digest"]))) {
      throw usageError({
        spec: taskScopeExtendSpec,
        message: "--request-digest must be an exact sha256:<64 lowercase hex> digest.",
      });
    }
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    scopeRoots: toStringList(raw.opts["scope-root"]),
    repositoryEffects: toStringList(raw.opts["repository-effect"]) as TaskRepositoryEffect[],
    requestDigest: String(raw.opts["request-digest"]),
    stateFingerprint: String(raw.opts["state-fingerprint"]),
    by: String(raw.opts.by),
  }),
};

export function makeRunTaskScopeExtendHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskScopeExtendParsed): Promise<number> =>
    await cmdTaskScopeExtend({
      ctx: await getCtx("task scope extend"),
      cwd: ctx.cwd,
      taskId: parsed.taskId,
      scopeRoots: parsed.scopeRoots,
      repositoryEffects: parsed.repositoryEffects,
      requestDigest: parsed.requestDigest,
      stateFingerprint: parsed.stateFingerprint,
      by: parsed.by,
    });
}
