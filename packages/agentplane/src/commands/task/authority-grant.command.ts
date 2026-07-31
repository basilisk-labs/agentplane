import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { createCliEmitter } from "../../cli/output.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import {
  appendSideEffectAuthorityAudit,
  createSideEffectAuthorityRecord,
} from "../shared/side-effect-authority.js";
import {
  loadSideEffectAuthorityState,
  persistSideEffectAuthorityState,
} from "../shared/side-effect-authority-store.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";

export type TaskAuthorityGrantParsed = {
  taskId: string;
  operationId: string;
  operationDigest: string;
  stateFingerprintDigest: string;
  stateScopeDigest: string;
  by: string;
  ttlMinutes: number;
  remote: boolean;
};

export const taskAuthorityGrantSpec: CommandSpec<TaskAuthorityGrantParsed> = {
  id: ["task", "authority", "grant"],
  group: "Task",
  summary: "Persist one scoped, expiring authority record for the current protected workflow step.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "operation",
      valueHint: "<operation-id>",
      required: true,
      description: "Protected workflow operation from task next-action.",
    },
    {
      kind: "string",
      name: "operation-digest",
      valueHint: "<sha256>",
      required: true,
      description: "Exact operation digest emitted by task next-action.",
    },
    {
      kind: "string",
      name: "state-fingerprint",
      valueHint: "<sha256>",
      required: true,
      description: "Current route fingerprint emitted by task next-action.",
    },
    {
      kind: "string",
      name: "state-scope-digest",
      valueHint: "<sha256>",
      required: true,
      description: "Current authority scope digest emitted by task next-action.",
    },
    {
      kind: "string",
      name: "by",
      valueHint: "<actor>",
      required: true,
      description: "Human or policy actor granting the authority.",
    },
    {
      kind: "string",
      name: "ttl-minutes",
      valueHint: "<1-60>",
      description: "Authority lifetime in minutes (default: 15).",
    },
    {
      kind: "boolean",
      name: "remote",
      default: false,
      description: "Rebuild the authority request from live hosted PR/check/review state.",
    },
  ],
  examples: [
    {
      cmd: "agentplane task authority grant <task-id> --operation pr.open --operation-digest <sha256> --state-fingerprint <sha256> --state-scope-digest <sha256> --by USER",
      why: "Approve exactly the protected operation currently requested by task next-action.",
    },
  ],
  validateRaw: (raw) => {
    for (const key of [
      "operation",
      "operation-digest",
      "state-fingerprint",
      "state-scope-digest",
      "by",
    ] as const) {
      if (typeof raw.opts[key] !== "string" || raw.opts[key].trim().length === 0) {
        throw usageError({ spec: taskAuthorityGrantSpec, message: `Missing required --${key}.` });
      }
    }
    const ttl = raw.opts["ttl-minutes"];
    if (
      ttl !== undefined &&
      (typeof ttl !== "string" || !/^\d+$/u.test(ttl) || Number(ttl) < 1 || Number(ttl) > 60)
    ) {
      throw usageError({
        spec: taskAuthorityGrantSpec,
        message: "--ttl-minutes must be an integer from 1 through 60.",
      });
    }
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    operationId: String(raw.opts.operation).trim(),
    operationDigest: String(raw.opts["operation-digest"]).trim(),
    stateFingerprintDigest: String(raw.opts["state-fingerprint"]).trim(),
    stateScopeDigest: String(raw.opts["state-scope-digest"]).trim(),
    by: String(raw.opts.by).trim(),
    ttlMinutes: typeof raw.opts["ttl-minutes"] === "string" ? Number(raw.opts["ttl-minutes"]) : 15,
    remote: raw.opts.remote === true,
  }),
};

function requestedOperation(decision: Awaited<ReturnType<typeof buildTaskRouteDecision>>) {
  const request = decision.workflowStep.kind === "approval" ? decision.workflowStep.request : null;
  if (request?.type !== "side_effect") {
    throw usageError({
      spec: taskAuthorityGrantSpec,
      message: "The current task route does not require a side-effect authority grant.",
    });
  }
  return request;
}

export function makeRunTaskAuthorityGrantHandler(session: {
  getLocalContext: (cmd: string) => Promise<CommandContext>;
  getRemoteContext: (cmd: string) => Promise<CommandContext>;
}) {
  return async (ctx: CommandCtx, parsed: TaskAuthorityGrantParsed): Promise<number> => {
    const commandCtx = await (parsed.remote
      ? session.getRemoteContext("task authority grant")
      : session.getLocalContext("task authority grant"));
    const decision = await buildTaskRouteDecision({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      taskId: parsed.taskId,
      includeRemote: parsed.remote,
    });
    const request = requestedOperation(decision);
    if (
      request.operationId !== parsed.operationId ||
      request.operationDigest !== parsed.operationDigest ||
      request.stateFingerprintDigest !== parsed.stateFingerprintDigest ||
      request.stateScopeDigest !== parsed.stateScopeDigest
    ) {
      throw usageError({
        spec: taskAuthorityGrantSpec,
        message:
          "Authority grant inputs are stale or do not match the current task next-action; recompute the route.",
      });
    }
    const now = new Date();
    const issuedAt = now.toISOString();
    const expiresAt = new Date(now.getTime() + parsed.ttlMinutes * 60_000).toISOString();
    const task = await loadTaskFromContext({
      ctx: commandCtx,
      taskId: parsed.taskId,
      preferBranchSnapshot: commandCtx.config.workflow_mode === "branch_pr",
    });
    const loaded = await loadSideEffectAuthorityState({
      gitRoot: commandCtx.resolvedProject.gitRoot,
      taskId: parsed.taskId,
      task,
    });
    if (!loaded.state) {
      throw usageError({
        spec: taskAuthorityGrantSpec,
        message:
          "Existing side-effect authority state is malformed or tampered; repair it before granting authority.",
      });
    }
    const grant = createSideEffectAuthorityRecord({
      actor: parsed.by,
      operation: request.operation,
      fingerprint: decision.workflowStep.preconditionFingerprint,
      issuedAt,
      expiresAt,
    });
    if (grant.operationDigest !== request.operationDigest) {
      throw usageError({
        spec: taskAuthorityGrantSpec,
        message:
          "Authority target parameters cannot be reconstructed safely; recompute task next-action.",
      });
    }
    const audited = appendSideEffectAuthorityAudit({
      state: {
        schemaVersion: 1,
        grants: [...loaded.state.grants, grant],
        audit: loaded.state.audit,
      },
      at: issuedAt,
      actor: parsed.by,
      operation: request.operation,
      fingerprint: decision.workflowStep.preconditionFingerprint,
      authority: grant,
      outcome: "approved",
    });
    await persistSideEffectAuthorityState({
      gitRoot: commandCtx.resolvedProject.gitRoot,
      taskId: parsed.taskId,
      state: audited,
    });
    createCliEmitter().success(
      "task authority grant",
      parsed.taskId,
      `authority=${grant.id} expires_at=${expiresAt} stored=git_common_dir`,
    );
    return 0;
  };
}
