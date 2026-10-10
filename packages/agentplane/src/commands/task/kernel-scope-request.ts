import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { CommandContext } from "../shared/task-backend.js";
import { createKernelRuntime, requireKernelCommit } from "./kernel-runtime-context.js";
import { readKernelScopeRequest } from "./kernel-scope-request-evidence.js";
export { validateScopeRequestPaths } from "./kernel-scope-request-evidence.js";

export async function prepareKernelScopeRequest(
  command: CommandContext,
  taskId: string,
  workItemId: string,
) {
  const runtime = await createKernelRuntime({
    command,
    task_id: taskId,
    transport: "manual",
    operation_id: "scope-request-inspect",
  });
  const prepared = await readKernelScopeRequest(command, taskId, workItemId, {
    read: (id) => runtime.adapter.read(id),
    observe: runtime.observe,
    readContext: (id) => runtime.native.readContext(id),
  });
  return { runtime, ...prepared };
}

export async function scopeRequestOperatorAction(
  command: CommandContext,
  taskId: string,
  workItemId: string,
) {
  const prepared = await prepareKernelScopeRequest(command, taskId, workItemId);
  return {
    kind: "approve_scope_request" as const,
    argv: [
      "agentplane",
      "task",
      "scope",
      "approve-request",
      taskId,
      "--work-item",
      workItemId,
      "--request-digest",
      prepared.requestDigest,
      "--state-digest",
      prepared.record.digest,
      "--by",
      "USER",
    ],
    request: prepared.request,
  };
}

export async function approveKernelScopeRequest(
  command: CommandContext,
  opts: {
    taskId: string;
    workItemId: string;
    requestDigest: string;
    stateDigest: string;
    by: string;
  },
) {
  if (opts.by !== "USER") throw new Error("Scope request requires explicit USER authority");
  const prepared = await prepareKernelScopeRequest(command, opts.taskId, opts.workItemId);
  if (prepared.requestDigest !== opts.requestDigest || prepared.record.digest !== opts.stateDigest)
    throw new Error("Scope request approval is stale or does not match the exact request");
  const { request, parent, runtime } = prepared;
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
      kind: "prospective_scope_request",
      evidence_digest: k.prospectiveScopeApprovalEvidence(request, opts.by),
      previous_fingerprint: parent.repository_fingerprint,
      changed_paths: [],
      request_digest: prepared.requestDigest,
      scope_request: request,
    },
  };
  const input = await runtime.input(
    { kind: "approve_scope_request", record },
    `scope-request:${prepared.requestDigest}`,
  );
  requireKernelCommit(
    await runtime.adapter.execute({
      ...input,
      authority: null,
      actor: { ...input.actor, kind: "USER", id: opts.by, transport: "manual" },
    }),
  );
  process.stdout.write(
    "Scope request admitted. Submit the revised Plan for fresh approval before resuming expanded work.\n",
  );
}

export async function pendingScopeRequestAction(
  command: CommandContext,
  taskId: string,
  workItemId: string,
) {
  try {
    return await scopeRequestOperatorAction(command, taskId, workItemId);
  } catch (error) {
    if (
      error instanceof Error &&
      [
        "No authenticated blocked scope request exists",
        "Recovery requires a retained semantic stop for this WorkItem attempt",
      ].includes(error.message)
    )
      return null;
    return {
      kind: "scope_request_unavailable" as const,
      detail: error instanceof Error ? error.message : String(error),
    };
  }
}
