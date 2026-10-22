import { lstat, readdir } from "node:fs/promises";
import path from "node:path";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { AGENT_SEMANTIC_RESULT_ZOD_SCHEMA } from "@agentplaneorg/core/schemas";
import type { CommandContext } from "../shared/task-backend.js";
import { resolveCommandGitCommonDir } from "../shared/task-backend.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import {
  amendedScopeIntake,
  scopeIntakeDigest,
} from "../../adapters/task-backend/kernel-scope-intake.js";
import { captureKernelSemanticStop } from "./kernel-recovery-evidence.js";
import type { KernelRead } from "../../adapters/task-backend/kernel-record.js";
import type { NativeAuthorityContext } from "../../ports/kernel-authority.js";
import type { KernelRepositoryObservation } from "../../runner/observation/kernel-repository.js";

interface ScopeRequestReadPorts {
  read(taskId: string): Promise<KernelRead>;
  observe(): Promise<KernelRepositoryObservation>;
  readContext(taskId: string): Promise<NativeAuthorityContext>;
}

/** Approval-time checks complement the existing execution authority boundary. */
export async function validateScopeRequestPaths(
  gitRoot: string,
  scopeRoots: readonly string[],
  protectedRoots: readonly string[],
) {
  let visited = 0;
  const inspect = async (file: string, depth: number): Promise<void> => {
    if (++visited > 20_000 || depth > 32)
      throw new Error("Scope path inspection exceeds its bounded limit");
    let stat;
    try {
      stat = await lstat(file);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return;
      throw error;
    }
    if (stat.isSymbolicLink())
      throw new Error("Scope request traverses or contains a symbolic link");
    if (!stat.isDirectory()) return;
    for (const child of await readdir(file)) {
      if ([".git", ".agentplane", "AGENTS.md"].includes(child))
        throw new Error("Scope request contains protected policy or native state");
      await inspect(path.join(file, child), depth + 1);
    }
  };
  for (const root of scopeRoots) {
    if (
      protectedRoots.some(
        (protectedRoot) =>
          root === protectedRoot ||
          root.startsWith(`${protectedRoot}/`) ||
          protectedRoot.startsWith(`${root}/`),
      )
    )
      throw new Error("Scope request intersects protected policy or native state");
    let current = gitRoot;
    for (const part of root.split("/")) {
      current = path.join(current, part);
      try {
        const stat = await lstat(current);
        if (stat.isSymbolicLink()) throw new Error("Scope request traverses a symbolic link");
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
        break;
      }
    }
    await inspect(path.join(gitRoot, root), 0);
  }
}

export async function readKernelScopeRequest(
  command: CommandContext,
  taskId: string,
  workItemId: string,
  ports: ScopeRequestReadPorts,
) {
  const read = await ports.read(taskId);
  if (read.kind !== "canonical") throw new Error("Scope request requires a canonical Task");
  const { record, task } = read;
  const aggregate = record.aggregate;
  const item = aggregate.work_items[workItemId];
  const parent = aggregate.authority_lineage?.at(-1)?.authority;
  if (
    aggregate.state !== "ACTIVE" ||
    aggregate.current_plan?.state !== "APPROVED" ||
    item?.state !== "BLOCKED" ||
    !item.claim_id ||
    !item.definition.contract_digest ||
    !parent
  )
    throw new Error("Scope request requires a blocked implementation in an approved Plan");
  const kernelRoot = path.join(await resolveCommandGitCommonDir(command), "agentplane", "kernel");
  const stop = await captureKernelSemanticStop(kernelRoot, record, workItemId);
  const result = AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse(
    JSON.parse(
      await readStableRegularTextNoFollow(
        path.join(
          kernelRoot,
          "exchanges",
          taskId,
          stop.work_order_id.slice(7),
          "received-result.json",
        ),
        "scope request result",
      ),
    ),
  );
  const wanted = result.blocker?.scope_extension_request;
  if (result.status !== "blocked" || !wanted || k.kernelDigest(result) !== stop.result_digest)
    throw new Error("No authenticated blocked scope request exists");
  const scopeRoots = [...new Set(wanted.scope_roots)].toSorted();
  const effects = [...new Set(wanted.repository_effects)].toSorted();
  const next = amendedScopeIntake(task, scopeRoots, effects);
  const protectedRoots = [
    ".git",
    ".agentplane",
    "AGENTS.md",
    command.config.paths.workflow_dir,
    command.config.paths.tasks_path,
    command.config.paths.worktrees_dir,
  ];
  await validateScopeRequestPaths(command.resolvedProject.gitRoot, scopeRoots, protectedRoots);
  if (k.kernelDigest(next) === k.kernelDigest(task.execution_contract))
    throw new Error("Scope request is already admitted");
  const observation = await ports.observe();
  if (observation.fingerprint !== parent.repository_fingerprint)
    throw new Error(
      "Scope request requires an unchanged repository checkpoint; resolve baseline drift separately",
    );
  const context = await ports.readContext(taskId);
  if (k.kernelDigest(context.ceiling.policy_digests) !== k.kernelDigest(parent.policy_digests))
    throw new Error("Scope request policy changed");
  const request: k.ProspectiveScopeRequest = {
    task_id: taskId,
    record_digest: record.digest,
    task_revision: aggregate.revision,
    plan_revision: aggregate.current_plan.revision,
    plan_digest: aggregate.current_plan.digest,
    work_item_id: workItemId,
    attempt: item.attempt,
    claim_id: item.claim_id,
    contract_digest: item.definition.contract_digest,
    work_order_id: stop.work_order_id as k.Sha256Digest,
    result_digest: stop.result_digest,
    result_authentication: stop.result_authentication,
    stop_receipt_digest: k.kernelDigest(
      aggregate.mutation_receipts[String(`semantic-stop:${stop.work_order_id}`)],
    ),
    parent_authority_digest: parent.digest,
    repository_fingerprint: parent.repository_fingerprint,
    intake_before_digest: scopeIntakeDigest(task.execution_contract),
    intake_after_digest: scopeIntakeDigest(next),
    scope_roots: scopeRoots,
    repository_effects: effects,
  };
  return { request, parent, record, requestDigest: k.kernelDigest(request) };
}
