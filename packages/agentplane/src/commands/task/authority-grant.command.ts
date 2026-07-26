import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { createCliEmitter } from "../../cli/output.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import {
  appendSideEffectAuthorityAudit,
  createSideEffectAuthorityRecord,
  readSideEffectAuthorityState,
  withSideEffectAuthorityState,
} from "../shared/side-effect-authority.js";
import type { CommandContext } from "../shared/task-backend.js";
import { applyTaskMutation } from "../shared/task-mutation.js";

export type TaskAuthorityGrantParsed = {
  taskId: string;
  operationId: string;
  operationDigest: string;
  stateFingerprintDigest: string;
  stateScopeDigest: string;
  by: string;
  ttlMinutes: number;
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
    if (ttl !== undefined && (!/^\d+$/u.test(String(ttl)) || Number(ttl) < 1 || Number(ttl) > 60)) {
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
    ttlMinutes: raw.opts["ttl-minutes"] === undefined ? 15 : Number(raw.opts["ttl-minutes"]),
  }),
};

function requestedOperation(decision: Awaited<ReturnType<typeof buildTaskRouteDecision>>) {
  const request = decision.workflowStep.kind === "approval" ? decision.workflowStep.request : null;
  if (!request || request.type !== "side_effect") {
    throw usageError({
      spec: taskAuthorityGrantSpec,
      message: "The current task route does not require a side-effect authority grant.",
    });
  }
  return request;
}

export function makeRunTaskAuthorityGrantHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskAuthorityGrantParsed): Promise<number> => {
    const commandCtx = await getCtx("task authority grant");
    const decision = await buildTaskRouteDecision({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      taskId: parsed.taskId,
      includeRemote: false,
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
    let grantId: string | null = null;
    await applyTaskMutation({
      ctx: commandCtx,
      taskId: parsed.taskId,
      build: (task) => {
        const state = readSideEffectAuthorityState(task);
        if (!state) {
          throw usageError({
            spec: taskAuthorityGrantSpec,
            message:
              "Existing side-effect authority state is malformed or tampered; repair it before granting authority.",
          });
        }
        const routeOperation = request.operation;
        const grant = createSideEffectAuthorityRecord({
          actor: parsed.by,
          operation: routeOperation,
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
        grantId = grant.id;
        const withGrant = {
          schemaVersion: 1 as const,
          grants: [...state.grants, grant],
          audit: state.audit,
        };
        const audited = appendSideEffectAuthorityAudit({
          state: withGrant,
          at: issuedAt,
          actor: parsed.by,
          operation: routeOperation,
          fingerprint: decision.workflowStep.preconditionFingerprint,
          authority: grant,
          outcome: "approved",
        });
        return { nextTask: { ...task, extensions: withSideEffectAuthorityState(task, audited) } };
      },
    });
    createCliEmitter().success(
      "task authority grant",
      parsed.taskId,
      `authority=${grantId ?? "recorded"} expires_at=${expiresAt}`,
    );
    return 0;
  };
}
