import { z } from "zod";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import {
  readStableRegularTextNoFollow,
  publishNewStableRegularFileNoFollow,
} from "../../shared/stable-file.js";
import { resolveCommandGitCommonDir, type CommandContext } from "../shared/task-backend.js";
import {
  loadSideEffectAuthorityState,
  persistSideEffectAuthorityState,
} from "../shared/side-effect-authority-store.js";
import {
  appendSideEffectAuthorityAudit,
  workflowOperationAuthorityDigest,
} from "../shared/side-effect-authority.js";
import { tryAcquireSupervisorExecutionLease } from "../shared/supervisor-execution-episode.js";
import {
  prepareCandidatePublication,
  admitCandidatePublication,
  candidatePublicationOperation,
} from "./candidate-publication-admission.js";
import { candidatePublicationRequestSchema } from "./candidate-publication-request.js";
import { publishCandidateWithJournal } from "./candidate-publication-executor.js";
import { candidateDirectory, readCandidateContext } from "./candidate-publication-context.js";

const sha = z.templateLiteral(["sha256:", z.string().regex(/^[a-f0-9]{64}$/u)]);
const inputSchema = z.strictObject({
  work_order_digest: sha,
  base_commit: z.string(),
  commit: z.string(),
  frozen_files_digest: sha,
  review_digest: sha,
  remote_url: z.string(),
  candidate_ref: z.string(),
});
type Action = "prepare" | "approve" | "publish" | "revoke";
export type CandidateParsed = {
  action: Action;
  taskId: string;
  file?: string;
  digest?: string;
  approval?: string;
  by?: string;
  ttl: number;
};

function spec(action: Action): CommandSpec<CandidateParsed> {
  const file = action === "prepare" || action === "approve";
  const approve = action === "approve";
  const actor = approve || action === "revoke";
  const value: CommandSpec<CandidateParsed> = {
    id: ["task", "candidate", action],
    group: "Task",
    summary: {
      prepare: "Prepare an inert immutable candidate publication request.",
      approve: "Approve one exact candidate publication as USER.",
      publish: "Publish or reconcile an approved immutable candidate; never complete the task.",
      revoke: "Revoke one candidate publication approval without changing the task.",
    }[action],
    args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
    options: [
      {
        kind: "string",
        name: file ? "file" : "request-digest",
        required: true,
        valueHint: file ? "<json>" : "<sha256>",
        description: file
          ? "Reviewed preparation input or exact request JSON."
          : "Exact retained candidate request digest.",
      },
      ...(actor
        ? [
            {
              kind: "string" as const,
              name: "by",
              required: true,
              valueHint: "USER",
              description: "Explicit operator actor; must be USER.",
            },
          ]
        : []),
      ...(approve
        ? [
            {
              kind: "string" as const,
              name: "approval-digest",
              required: true,
              valueHint: "<sha256>",
              description: "Exact approval digest from prepare.",
            },
            {
              kind: "string" as const,
              name: "ttl-minutes",
              valueHint: "<1-60>",
              description: "Approval lifetime, default 15 minutes.",
            },
          ]
        : []),
    ],
    validateRaw(raw) {
      if (actor && raw.opts.by !== "USER")
        throw usageError({
          spec: value,
          message: "Candidate authority requires explicit --by USER.",
        });
      const ttl = raw.opts["ttl-minutes"];
      if (
        ttl !== undefined &&
        (typeof ttl !== "string" || !/^\d+$/u.test(ttl) || Number(ttl) < 1 || Number(ttl) > 60)
      )
        throw usageError({ spec: value, message: "--ttl-minutes must be 1 through 60." });
    },
    parse: (raw) => ({
      action,
      taskId: String(raw.args["task-id"]),
      file: typeof raw.opts.file === "string" ? raw.opts.file : undefined,
      digest:
        typeof raw.opts["request-digest"] === "string" ? raw.opts["request-digest"] : undefined,
      approval:
        typeof raw.opts["approval-digest"] === "string" ? raw.opts["approval-digest"] : undefined,
      by: typeof raw.opts.by === "string" ? raw.opts.by : undefined,
      ttl: Number(raw.opts["ttl-minutes"] ?? 15),
    }),
  };
  return value;
}
export const taskCandidatePrepareSpec = spec("prepare");
export const taskCandidateApproveSpec = spec("approve");
export const taskCandidatePublishSpec = spec("publish");
export const taskCandidateRevokeSpec = spec("revoke");

async function readJson(file: string) {
  return JSON.parse(
    await readStableRegularTextNoFollow(file, "candidate operator input"),
  ) as unknown;
}

export function makeRunTaskCandidateHandler(getContext: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: CandidateParsed): Promise<number> => {
    const command = await getContext(`task candidate ${parsed.action}`);
    const root = command.resolvedProject.gitRoot;
    const common = await resolveCommandGitCommonDir(command);
    if (parsed.action === "prepare") {
      const input = inputSchema.parse(await readJson(path.resolve(ctx.cwd, parsed.file!)));
      const context = await readCandidateContext(command, parsed.taskId, input.work_order_digest);
      const prepared = await prepareCandidatePublication({ root, ...context, ...input });
      process.stdout.write(`${JSON.stringify(prepared)}\n`);
      return 0;
    }
    const request = candidatePublicationRequestSchema.parse(
      await readJson(
        parsed.action === "approve"
          ? path.resolve(ctx.cwd, parsed.file!)
          : path.join(candidateDirectory(common, parsed.taskId, parsed.digest!), "request.json"),
      ),
    );
    if (request.task_id !== parsed.taskId || (parsed.digest && request.digest !== parsed.digest))
      throw new Error("Candidate request identity changed");
    const directory = candidateDirectory(common, parsed.taskId, request.digest);
    const readContext = () =>
      readCandidateContext(command, parsed.taskId, sha.parse(request.work_order_digest));
    if (parsed.action === "publish") {
      const receipt = await publishCandidateWithJournal({ root, directory, request, readContext });
      process.stdout.write(`${JSON.stringify(receipt)}\n`);
      return 0;
    }
    if (parsed.by !== "USER") throw new Error("Candidate authority requires USER");
    // Serialize candidate approvals and revocations for this task. Publication rechecks this store.
    const lease = await tryAcquireSupervisorExecutionLease({
      journal_path: path.join(
        common,
        "agentplane/candidate-publication",
        parsed.taskId,
        "authority-lock.json",
      ),
    });
    if (!lease) throw new Error("Candidate authority update is already in progress");
    try {
      const context = await readCandidateContext(
        command,
        parsed.taskId,
        sha.parse(request.work_order_digest),
        parsed.action === "revoke",
      );
      const loaded = await loadSideEffectAuthorityState({
        gitRoot: root,
        commonGitDir: common,
        taskId: parsed.taskId,
        task: context.task,
      });
      if (!loaded.state) throw new Error("Candidate authority store is invalid");
      if (
        parsed.action === "approve" &&
        loaded.state.grants.some(
          (entry) =>
            entry.operationDigest ===
            workflowOperationAuthorityDigest(candidatePublicationOperation(request)),
        )
      )
        throw new Error(
          "Candidate approval already exists; preserve its identity for reconciliation or explicitly revoke it first",
        );
      const now = new Date().toISOString();
      const operation = candidatePublicationOperation(request);
      const grant =
        parsed.action === "approve"
          ? await admitCandidatePublication({
              request,
              ...context,
              root,
              actor: parsed.by,
              approved_digest: parsed.approval!,
              issued_at: now,
              expires_at: new Date(Date.now() + parsed.ttl * 60_000).toISOString(),
            })
          : null;
      if (grant) {
        await mkdir(directory, { recursive: true, mode: 0o700 });
        const bytes = `${JSON.stringify(request)}\n`;
        const target = path.join(directory, "request.json");
        if (
          !(await publishNewStableRegularFileNoFollow(target, bytes, "candidate request")) &&
          (await readStableRegularTextNoFollow(target, "candidate request")) !== bytes
        )
          throw new Error("Retained candidate request changed");
      }
      const grants = loaded.state.grants.filter(
        (entry) => entry.operationDigest !== workflowOperationAuthorityDigest(operation),
      );
      const state = appendSideEffectAuthorityAudit({
        state: { ...loaded.state, grants: grant ? [...grants, grant] : grants },
        at: now,
        actor: parsed.by,
        operation,
        fingerprint: context.fingerprint,
        authority: grant,
        outcome: grant ? "approved" : "denied",
      });
      await persistSideEffectAuthorityState({
        gitRoot: root,
        taskId: parsed.taskId,
        state,
        expected: loaded,
      });
      process.stdout.write(
        `${JSON.stringify({ request_digest: request.digest, authority: grant, revoked: !grant })}\n`,
      );
      return 0;
    } finally {
      await lease.release();
    }
  };
}
