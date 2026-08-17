import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { createCliEmitter } from "../../cli/output.js";
import {
  prepareAgentWorkOrder,
  requirePreparedAgentWorkOrder,
} from "../../runner/usecases/agent-work-order.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import {
  appendSideEffectAuthorityAudit,
  createSideEffectAuthorityRecord,
} from "../shared/side-effect-authority.js";
import {
  loadSideEffectAuthorityState,
  persistSideEffectAuthorityState,
} from "../shared/side-effect-authority-store.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import {
  userApprovalReceiptRequestForStep,
  verifyUserApprovalReceipt,
} from "./user-approval-receipt.js";

export type TaskAuthorityGrantParsed = {
  taskId: string;
  operationId: string;
  operationDigest: string;
  stateFingerprintDigest: string;
  stateScopeDigest: string;
  by?: string;
  approvalReceipt?: string;
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
      description: "Human or policy actor granting the authority.",
    },
    {
      kind: "string",
      name: "approval-receipt",
      valueHint: "<base64url>",
      description: "Signed user approval receipt from a configured trusted bridge.",
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
    ] as const) {
      if (typeof raw.opts[key] !== "string" || raw.opts[key].trim().length === 0) {
        throw usageError({ spec: taskAuthorityGrantSpec, message: `Missing required --${key}.` });
      }
    }
    const by = raw.opts.by;
    const receipt = raw.opts["approval-receipt"];
    const hasBy = typeof by === "string" && by.trim().length > 0;
    const hasReceipt = typeof receipt === "string" && receipt.trim().length > 0;
    if (hasBy === hasReceipt) {
      throw usageError({
        spec: taskAuthorityGrantSpec,
        message: "Provide exactly one of --by or --approval-receipt.",
      });
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
    by: typeof raw.opts.by === "string" ? raw.opts.by.trim() : undefined,
    approvalReceipt:
      typeof raw.opts["approval-receipt"] === "string"
        ? raw.opts["approval-receipt"].trim()
        : undefined,
    ttlMinutes: typeof raw.opts["ttl-minutes"] === "string" ? Number(raw.opts["ttl-minutes"]) : 15,
    remote: raw.opts.remote === true,
  }),
};

function currentRouteCommand(taskId: string, remote: boolean): string {
  return `agentplane task next-action ${taskId}${remote ? " --remote" : ""} --explain`;
}

function requestedOperation(
  decision: TaskRouteDecision,
  parsed: Pick<TaskAuthorityGrantParsed, "taskId" | "remote">,
) {
  const request = decision.workflowStep.kind === "approval" ? decision.workflowStep.request : null;
  if (request?.type !== "side_effect") {
    throw usageError({
      spec: taskAuthorityGrantSpec,
      message:
        "Authority request is stale: the recomputed " +
        `${parsed.remote ? "hosted" : "local"} route is now ` +
        `${decision.workflowStep.kind}:${decision.workflowStep.id} and no longer requests ` +
        `side-effect authority. Inspect the current route with: ${currentRouteCommand(
          parsed.taskId,
          parsed.remote,
        )}`,
    });
  }
  return request;
}

export function makeRunTaskAuthorityGrantHandler(session: {
  getLocalContext: (
    cmd: string,
    cwd: string,
    rootOverride: string | null,
  ) => Promise<CommandContext>;
  getRemoteContext: (cmd: string) => Promise<CommandContext>;
  getLocalWriteContext: (cmd: string) => Promise<CommandContext>;
  getRemoteWriteContext: (cmd: string) => Promise<CommandContext>;
}) {
  return async (ctx: CommandCtx, parsed: TaskAuthorityGrantParsed): Promise<number> => {
    const commandCtx = await (parsed.remote
      ? session.getRemoteContext("task authority grant")
      : session.getLocalContext("task authority grant", ctx.cwd, ctx.rootOverride ?? null));
    const preparedWorkOrder = requirePreparedAgentWorkOrder(
      await prepareAgentWorkOrder({
        command_ctx: commandCtx,
        cwd: ctx.cwd,
        root_override: ctx.rootOverride ?? null,
        task_id: parsed.taskId,
        ...(parsed.remote ? { include_remote: true } : {}),
      }),
    );
    const decision = preparedWorkOrder.route_decision;
    const request = requestedOperation(decision, parsed);
    if (
      request.operationId !== parsed.operationId ||
      request.operationDigest !== parsed.operationDigest ||
      request.stateFingerprintDigest !== parsed.stateFingerprintDigest ||
      request.stateScopeDigest !== parsed.stateScopeDigest
    ) {
      throw usageError({
        spec: taskAuthorityGrantSpec,
        message:
          "Authority grant inputs are stale or do not match the recomputed task route. " +
          `Inspect the current route with: ${currentRouteCommand(parsed.taskId, parsed.remote)}`,
      });
    }
    const verifiedReceipt = parsed.approvalReceipt
      ? verifyUserApprovalReceipt({
          encoded: parsed.approvalReceipt,
          config: commandCtx.config.authority.approval_receipts,
          request: userApprovalReceiptRequestForStep(
            decision.workflowStep as Extract<
              TaskRouteDecision["workflowStep"],
              { kind: "approval" }
            >,
          ),
        })
      : null;
    const actor = verifiedReceipt?.actor ?? parsed.by ?? "";
    const now = new Date();
    const issuedAt = now.toISOString();
    const requestedExpiry = now.getTime() + parsed.ttlMinutes * 60_000;
    const effectiveExpiry = verifiedReceipt
      ? Math.min(requestedExpiry, Date.parse(verifiedReceipt.receipt.expires_at))
      : requestedExpiry;
    if (effectiveExpiry <= now.getTime()) {
      throw usageError({
        spec: taskAuthorityGrantSpec,
        message: "Approval receipt no longer has a usable authority lifetime.",
      });
    }
    const expiresAt = new Date(effectiveExpiry).toISOString();
    const writeCommandCtx = await (parsed.remote
      ? session.getRemoteWriteContext("task authority grant")
      : session.getLocalWriteContext("task authority grant"));
    const task = await loadTaskFromContext({
      ctx: writeCommandCtx,
      taskId: parsed.taskId,
      preferBranchSnapshot: writeCommandCtx.config.workflow_mode === "branch_pr",
    });
    const loaded = await loadSideEffectAuthorityState({
      gitRoot: writeCommandCtx.resolvedProject.gitRoot,
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
    if (
      verifiedReceipt &&
      loaded.state.grants.some((item) => item.evidenceDigest === verifiedReceipt.digest)
    ) {
      throw usageError({
        spec: taskAuthorityGrantSpec,
        message: "Approval receipt has already been consumed for this task.",
      });
    }
    const grant = createSideEffectAuthorityRecord({
      actor,
      operation: request.operation,
      fingerprint: decision.workflowStep.preconditionFingerprint,
      issuedAt,
      expiresAt,
      ...(verifiedReceipt ? { evidenceDigest: verifiedReceipt.digest } : {}),
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
      actor,
      operation: request.operation,
      fingerprint: decision.workflowStep.preconditionFingerprint,
      authority: grant,
      outcome: "approved",
    });
    await persistSideEffectAuthorityState({
      gitRoot: writeCommandCtx.resolvedProject.gitRoot,
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
