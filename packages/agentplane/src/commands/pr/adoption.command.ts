import { mkdir } from "node:fs/promises";
import path from "node:path";

import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import {
  requirePreparedAgentWorkOrder,
  prepareAgentWorkOrder,
} from "../../runner/usecases/agent-work-order.js";
import {
  publishNewStableRegularFileNoFollow,
  readStableRegularTextNoFollow,
} from "../../shared/stable-file.js";
import {
  appendSideEffectAuthorityAudit,
  workflowOperationAuthorityDigest,
} from "../shared/side-effect-authority.js";
import {
  hydrateTaskSideEffectAuthority,
  loadSideEffectAuthorityState,
  persistSideEffectAuthorityState,
} from "../shared/side-effect-authority-store.js";
import {
  loadTaskFromContext,
  resolveCommandGitCommonDir,
  type CommandContext,
} from "../shared/task-backend.js";
import { tryAcquireSupervisorExecutionLease } from "../shared/supervisor-execution-episode.js";
import {
  applyExistingPrAdoptionRequestFromProvider,
  approveExistingPrAdoption,
  assertExistingPrAdoptionRequest,
  existingPrAdoptionOperation,
  prepareExistingPrAdoptionFromProvider,
  type ExistingPrAdoptionRequest,
} from "./adoption-request.js";
import type { ExistingPrAdoptionTarget } from "./adoption-identity.js";
import { createExistingPrAdoptionStore, resolveAdoptionControlRoot } from "./adoption-store.js";
import { assertAdoptionTaskAuthority } from "./adoption-task-authority.js";

type Action = "prepare" | "approve" | "apply";
export type PrAdoptParsed = {
  taskId: string;
  action: Action;
  file?: string;
  requestDigest?: string;
  approvalDigest?: string;
  by?: string;
  ttlMinutes: number;
};

const SHA256 = /^sha256:[a-f0-9]{64}$/u;

export const prAdoptSpec: CommandSpec<PrAdoptParsed> = {
  id: ["pr", "adopt"],
  group: "PR",
  summary:
    "Prepare, explicitly approve, or apply an exact existing same-repository hosted PR adoption.",
  args: [
    { name: "task-id", required: true, valueHint: "<task-id>" },
    { name: "action", required: true, valueHint: "<prepare|approve|apply>" },
  ],
  options: [
    {
      kind: "string",
      name: "file",
      valueHint: "<json>",
      description: "Exact adoption claim for prepare.",
    },
    {
      kind: "string",
      name: "request-digest",
      valueHint: "<sha256>",
      description: "Retained request digest for approve or apply.",
    },
    {
      kind: "string",
      name: "approval-digest",
      valueHint: "<sha256>",
      description: "Exact reviewed approval digest for approve.",
    },
    {
      kind: "string",
      name: "by",
      valueHint: "USER",
      description: "Explicit USER actor for approve.",
    },
    {
      kind: "string",
      name: "ttl-minutes",
      valueHint: "<1-60>",
      description: "Approval lifetime, default 15 minutes.",
    },
  ],
  validateRaw(raw) {
    const action = raw.args.action;
    if (action !== "prepare" && action !== "approve" && action !== "apply") {
      throw usageError({
        spec: prAdoptSpec,
        message: "Action must be prepare, approve, or apply.",
      });
    }
    if (action === "prepare" && typeof raw.opts.file !== "string") {
      throw usageError({ spec: prAdoptSpec, message: "prepare requires --file." });
    }
    if (
      action !== "prepare" &&
      (typeof raw.opts["request-digest"] !== "string" || !SHA256.test(raw.opts["request-digest"]))
    ) {
      throw usageError({ spec: prAdoptSpec, message: "approve/apply require --request-digest." });
    }
    if (
      action === "approve" &&
      (raw.opts.by !== "USER" ||
        typeof raw.opts["approval-digest"] !== "string" ||
        !SHA256.test(raw.opts["approval-digest"]))
    ) {
      throw usageError({
        spec: prAdoptSpec,
        message: "approve requires --by USER and --approval-digest.",
      });
    }
    const ttl = Number(raw.opts["ttl-minutes"] ?? 15);
    if (!Number.isInteger(ttl) || ttl < 1 || ttl > 60) {
      throw usageError({ spec: prAdoptSpec, message: "--ttl-minutes must be 1 through 60." });
    }
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    action: raw.args.action as Action,
    file: typeof raw.opts.file === "string" ? raw.opts.file : undefined,
    requestDigest:
      typeof raw.opts["request-digest"] === "string" ? raw.opts["request-digest"] : undefined,
    approvalDigest:
      typeof raw.opts["approval-digest"] === "string" ? raw.opts["approval-digest"] : undefined,
    by: typeof raw.opts.by === "string" ? raw.opts.by : undefined,
    ttlMinutes: Number(raw.opts["ttl-minutes"] ?? 15),
  }),
};

function requestDirectory(common: string, taskId: string, digest: string): string {
  if (!/^[A-Za-z0-9][A-Za-z0-9_-]*$/u.test(taskId) || !SHA256.test(digest)) {
    throw new Error("Existing PR adoption storage identity is invalid");
  }
  return path.join(common, "agentplane", "pr-adoptions", taskId, digest.slice(7));
}

async function readRequest(
  common: string,
  taskId: string,
  digest: string,
): Promise<ExistingPrAdoptionRequest> {
  const raw = await readStableRegularTextNoFollow(
    path.join(requestDirectory(common, taskId, digest), "request.json"),
    "existing PR adoption request",
  );
  const request = assertExistingPrAdoptionRequest(JSON.parse(raw) as ExistingPrAdoptionRequest);
  if (request.digest !== digest || request.claim.taskId !== taskId) {
    throw new Error("Existing PR adoption request identity changed");
  }
  return request;
}

async function readContext(
  command: CommandContext,
  taskId: string,
  cwd: string,
  rootOverride?: string,
) {
  const prepared = requirePreparedAgentWorkOrder(
    await prepareAgentWorkOrder({
      command_ctx: command,
      cwd,
      root_override: rootOverride ?? null,
      task_id: taskId,
      include_remote: true,
    }),
  );
  const task = await loadTaskFromContext({
    ctx: command,
    taskId,
    preferBranchSnapshot: command.config.workflow_mode === "branch_pr",
  });
  assertAdoptionTaskAuthority(task);
  return { fingerprint: prepared.work_order.state_fingerprint, task };
}

export function makeRunPrAdoptHandler(getContext: (command: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: PrAdoptParsed): Promise<number> => {
    const command = await getContext(`pr adopt ${parsed.action}`);
    const root = await resolveAdoptionControlRoot(command.resolvedProject.gitRoot);
    const common = await resolveCommandGitCommonDir(command);
    const { fingerprint, task } = await readContext(
      command,
      parsed.taskId,
      ctx.cwd,
      ctx.rootOverride ?? undefined,
    );
    if (parsed.action === "prepare") {
      const claim = JSON.parse(
        await readStableRegularTextNoFollow(
          path.resolve(ctx.cwd, parsed.file!),
          "existing PR adoption claim",
        ),
      ) as ExistingPrAdoptionTarget;
      if (claim.taskId !== parsed.taskId) throw new Error("Existing PR adoption task ID changed");
      const prepared = await prepareExistingPrAdoptionFromProvider({
        gitRoot: root,
        claim,
        fingerprint,
        preparedAt: new Date().toISOString(),
      });
      const directory = requestDirectory(common, parsed.taskId, prepared.request.digest);
      await mkdir(directory, { recursive: true, mode: 0o700 });
      const bytes = `${JSON.stringify(prepared.request)}\n`;
      const target = path.join(directory, "request.json");
      if (
        !(await publishNewStableRegularFileNoFollow(
          target,
          bytes,
          "existing PR adoption request",
        )) &&
        (await readStableRegularTextNoFollow(target, "existing PR adoption request")) !== bytes
      ) {
        throw new Error("Retained existing PR adoption request changed");
      }
      process.stdout.write(`${JSON.stringify(prepared)}\n`);
      return 0;
    }
    const request = await readRequest(common, parsed.taskId, parsed.requestDigest!);
    if (parsed.action === "approve") {
      const lease = await tryAcquireSupervisorExecutionLease({
        journal_path: path.join(
          common,
          "agentplane/pr-adoptions",
          parsed.taskId,
          "authority-lock.json",
        ),
      });
      if (!lease) throw new Error("Existing PR adoption authority update is already in progress");
      try {
        const loaded = await loadSideEffectAuthorityState({
          gitRoot: root,
          commonGitDir: common,
          taskId: parsed.taskId,
          task,
        });
        if (!loaded.state) throw new Error("Existing PR adoption authority store is invalid");
        const operation = existingPrAdoptionOperation(request);
        if (
          loaded.state.grants.some(
            (entry) => entry.operationDigest === workflowOperationAuthorityDigest(operation),
          )
        ) {
          throw new Error(
            "Existing PR adoption approval already exists; preserve its identity for replay",
          );
        }
        const now = new Date().toISOString();
        const grant = approveExistingPrAdoption({
          request,
          approvedDigest: parsed.approvalDigest!,
          actor: parsed.by!,
          fingerprint,
          issuedAt: now,
          expiresAt: new Date(Date.now() + parsed.ttlMinutes * 60_000).toISOString(),
        });
        const state = appendSideEffectAuthorityAudit({
          state: { ...loaded.state, grants: [...loaded.state.grants, grant] },
          at: now,
          actor: "USER",
          operation,
          fingerprint,
          authority: grant,
          outcome: "approved",
        });
        await persistSideEffectAuthorityState({
          gitRoot: root,
          taskId: parsed.taskId,
          state,
          expected: loaded,
        });
        process.stdout.write(
          `${JSON.stringify({ request_digest: request.digest, authority: grant })}\n`,
        );
        return 0;
      } finally {
        await lease.release();
      }
    }
    const hydrated = await hydrateTaskSideEffectAuthority({
      gitRoot: root,
      commonGitDir: common,
      taskId: parsed.taskId,
      task,
    });
    const operationDigest = workflowOperationAuthorityDigest(existingPrAdoptionOperation(request));
    const grant = await loadSideEffectAuthorityState({
      gitRoot: root,
      commonGitDir: common,
      taskId: parsed.taskId,
      task,
    });
    const matching = grant.state?.grants.find((entry) => entry.operationDigest === operationDigest);
    if (!matching) throw new Error("Existing PR adoption has no matching retained USER grant");
    const outcome = await applyExistingPrAdoptionRequestFromProvider({
      request,
      task: hydrated,
      fingerprint,
      grant: matching,
      observedAt: new Date().toISOString(),
      gitRoot: root,
      store: createExistingPrAdoptionStore({
        gitRoot: root,
        workflowDir: command.config.paths.workflow_dir,
      }),
    });
    process.stdout.write(`${JSON.stringify(outcome)}\n`);
    return 0;
  };
}
