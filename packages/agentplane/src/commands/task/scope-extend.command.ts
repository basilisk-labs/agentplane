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

function optionalStringOption(value: unknown): string | undefined {
  if (typeof value === "string") {
    return value.trim() || undefined;
  }
  return toStringList(value).at(-1);
}

export type TaskScopeExtendParsed = {
  taskId: string;
  scopeRoots: string[];
  repositoryEffects: TaskRepositoryEffect[];
  requestDigest: string;
  stateFingerprint?: string;
  stateScopeDigest?: string;
  reconcileRequest?: string;
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
      name: "reconcile-request",
      valueHint: "<private-json>",
      description:
        "Strict v1 completed_scope_admission_reconcile JSON: schema_version, kind, task_id, repository_identity, kernel_digest, head_sha, before_commit, before_readme_digest, partial_readme_digest, request_digest. Commit IDs are full Git SHAs; digests are sha256:<64 lowercase hex>. --state-scope-digest binds the exact request bytes. Reconcile only the pinned legacy partial or retained native intent; preserve original Kernel and failed evidence. Exact replay is a durable no-op.",
    },
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
      valueHint: "<sha256:...>",
      description: "Legacy exact task next-action fingerprint that binds this approval.",
    },
    {
      kind: "string",
      name: "state-scope-digest",
      valueHint: "<sha256:...>",
      description: "Operation-scoped semantic state digest that binds this approval.",
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
      cmd: "agentplane task scope extend T-1 --scope-root website --repository-effect documentation --request-digest sha256:... --state-scope-digest sha256:... --by USER",
      why: "Approve a monotonic repository-scope extension after a typed blocker.",
    },
    {
      cmd: "agentplane task scope extend T-1 --scope-root helper.ts --request-digest sha256:... --state-scope-digest sha256:... --reconcile-request private-reconcile.json --by USER",
      why: "Recover the exact retained completed-task partial using its private typed request and byte digest.",
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
    if (
      optionalStringOption(raw.opts["reconcile-request"]) &&
      (!optionalStringOption(raw.opts["state-scope-digest"]) ||
        optionalStringOption(raw.opts["state-fingerprint"]))
    )
      throw usageError({
        spec: taskScopeExtendSpec,
        message:
          "--reconcile-request requires --state-scope-digest and excludes --state-fingerprint.",
      });
    const stateFingerprint = optionalStringOption(raw.opts["state-fingerprint"]);
    const stateScopeDigest = optionalStringOption(raw.opts["state-scope-digest"]);
    if (stateFingerprint === undefined && stateScopeDigest === undefined) {
      throw usageError({
        spec: taskScopeExtendSpec,
        message: "One of --state-scope-digest or --state-fingerprint is required.",
      });
    }
    for (const [name, value] of [
      ["--state-fingerprint", stateFingerprint],
      ["--state-scope-digest", stateScopeDigest],
    ] as const) {
      if (value !== undefined && !/^sha256:[0-9a-f]{64}$/u.test(value)) {
        throw usageError({
          spec: taskScopeExtendSpec,
          message: `${name} must be an exact sha256:<64 lowercase hex> digest.`,
        });
      }
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
    ...(optionalStringOption(raw.opts["state-fingerprint"])
      ? { stateFingerprint: optionalStringOption(raw.opts["state-fingerprint"]) }
      : {}),
    ...(optionalStringOption(raw.opts["state-scope-digest"])
      ? { stateScopeDigest: optionalStringOption(raw.opts["state-scope-digest"]) }
      : {}),
    ...(optionalStringOption(raw.opts["reconcile-request"])
      ? { reconcileRequest: optionalStringOption(raw.opts["reconcile-request"]) }
      : {}),
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
      ...(parsed.stateFingerprint ? { stateFingerprint: parsed.stateFingerprint } : {}),
      ...(parsed.stateScopeDigest ? { stateScopeDigest: parsed.stateScopeDigest } : {}),
      ...(parsed.reconcileRequest ? { reconcileRequest: parsed.reconcileRequest } : {}),
      by: parsed.by,
    });
}
