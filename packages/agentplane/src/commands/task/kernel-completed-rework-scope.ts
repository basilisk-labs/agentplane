import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { CommandContext } from "../shared/task-backend.js";
import { createKernelRuntime, requireKernelCommit } from "./kernel-runtime-context.js";
import { readCompletedReworkScopeRequest } from "./kernel-completed-rework-scope-evidence.js";

export async function approveCompletedReworkScopeRequest(
  command: CommandContext,
  opts: {
    taskId: string;
    requestDigest: string;
    scopeRoots: readonly string[];
    repositoryEffects: readonly string[];
    by: string;
  },
) {
  if (opts.by !== "USER") throw new Error("Completed rework scope requires USER authority");
  const runtime = await createKernelRuntime({
    command,
    task_id: opts.taskId,
    transport: "manual",
    operation_id: `completed-rework-scope:${opts.requestDigest}`,
  });
  const prepared = await readCompletedReworkScopeRequest(command, opts.taskId, {
    read: (id) => runtime.adapter.read(id),
    observe: runtime.observe,
    readContext: (id) => runtime.native.readContext(id),
  });
  if (
    prepared.request.blocker_request_digest !== opts.requestDigest ||
    k.kernelDigest(prepared.request.scope_roots) !==
      k.kernelDigest([...new Set(opts.scopeRoots)].toSorted()) ||
    k.kernelDigest(prepared.request.repository_effects) !==
      k.kernelDigest([...new Set(opts.repositoryEffects)].toSorted())
  )
    throw new Error("Completed rework scope approval is stale or does not match the blocker");
  const { request, parent } = prepared;
  const contents = {
    ...parent,
    scope_roots: [...new Set([...parent.scope_roots, ...request.scope_roots])].toSorted(),
    repository_effects: [
      ...new Set([...parent.repository_effects, ...request.repository_effects]),
    ].toSorted(),
    provenance: {
      ...parent.provenance,
      kind: "USER" as const,
      actor_id: opts.by,
      parent_authority_digest: parent.digest,
    },
  };
  const record: k.CanonicalAuthorityRecord = {
    authority: { ...contents, digest: k.authorityDigest(contents) },
    approval_mode: "manual_operator",
    observation: {
      kind: "completed_rework_scope_request",
      evidence_digest: k.completedReworkScopeApprovalEvidence(request, opts.by),
      previous_fingerprint: parent.repository_fingerprint,
      changed_paths: [],
      request_digest: prepared.requestDigest,
      completed_rework_scope_request: request,
    },
  };
  const input = await runtime.input(
    { kind: "approve_completed_rework_scope", record },
    `completed-rework-scope:${prepared.requestDigest}`,
  );
  requireKernelCommit(
    await runtime.adapter.execute({
      ...input,
      authority: null,
      actor: { ...input.actor, kind: "USER", id: opts.by, transport: "manual" },
    }),
  );
  process.stdout.write(
    "Completed rework scope admitted. Submit a fresh Plan for USER approval before expanded work.\n",
  );
}
