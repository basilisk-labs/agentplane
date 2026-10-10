import path from "node:path";
import {
  validateStateFingerprint,
  AGENT_WORK_ORDER_V2_ZOD_SCHEMA,
} from "@agentplaneorg/core/schemas";
import type { taskKernel as k } from "@agentplaneorg/core/tasks";
import { createKernelRuntime } from "./kernel-runtime-context.js";
import { readPinnedReviewedBaseOrder } from "./kernel-reviewed-base-import.js";
import { authenticateCandidateAttempt } from "./candidate-publication-request.js";
import { hydrateTaskSideEffectAuthority } from "../shared/side-effect-authority-store.js";
import { resolveCommandGitCommonDir, type CommandContext } from "../shared/task-backend.js";

export function candidateDirectory(common: string, taskId: string, digest: string) {
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/u.test(taskId) || !/^sha256:[a-f0-9]{64}$/u.test(digest))
    throw new Error("Invalid candidate storage identity");
  return path.join(common, "agentplane", "candidate-publication", taskId, digest.slice(7));
}

/** Reads native identity and retained issuance evidence without performing a lifecycle transition. */
export async function readCandidateContext(
  command: CommandContext,
  taskId: string,
  digest: k.Sha256Digest,
  revokeOnly = false,
) {
  const common = await resolveCommandGitCommonDir(command);
  candidateDirectory(common, taskId, digest);
  const runtime = await createKernelRuntime({
    command,
    task_id: taskId,
    transport: "manual",
    operation_id: `candidate:${taskId}`,
  });
  const read = await runtime.adapter.read(taskId);
  if (read.kind !== "canonical") throw new Error("Candidate publication requires a canonical task");
  const { raw } = await readPinnedReviewedBaseOrder(
    path.join(common, "agentplane/kernel/exchanges", taskId),
    digest,
  );
  const proof = revokeOnly
    ? { order: AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(raw) }
    : authenticateCandidateAttempt({
        raw,
        record: read.record,
        root: command.resolvedProject.gitRoot,
        work_order_digest: digest,
      });
  const parent = read.record.aggregate.authority_lineage?.at(-1)?.authority;
  if (
    !revokeOnly &&
    (!parent || (parent.expires_at !== null && Date.parse(parent.expires_at) <= Date.now()))
  )
    throw new Error("Candidate native authority is unavailable or expired");
  return {
    raw,
    record: read.record,
    fingerprint: validateStateFingerprint(proof.order.state_fingerprint),
    task: await hydrateTaskSideEffectAuthority({
      gitRoot: command.resolvedProject.gitRoot,
      commonGitDir: common,
      taskId,
      task: read.task,
    }),
  };
}
