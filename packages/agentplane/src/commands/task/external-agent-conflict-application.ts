import path from "node:path";
import { runProcess } from "@agentplaneorg/core/process";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import { taskCentricDigest } from "@agentplaneorg/core/tasks";
import { CliError } from "../../shared/errors.js";

import type { resolveConflictReworkSemanticInput } from "../pr/conflict-rework-semantic-input.js";
import {
  applyConflictResolution,
  prepareConflictResolutionTree,
  resolveConflictResolutionSnapshot,
} from "../pr/conflict-rework-merge.js";
import { refreshExternalAgentRoute } from "./external-agent-result-routing.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { ExternalAgentExchange } from "./external-agent-exchange.js";

import type { readDirectRepositoryStatus } from "./direct-task-finalization.js";
import { readDirectTaskHead } from "./direct-task-finalization.js";

export function authorityPath(value: string, cwd: string): string | null {
  const relative = path.relative(cwd, path.resolve(cwd, value)).replaceAll("\\", "/");
  if (relative === "") return ".";
  if (relative === ".." || relative.startsWith("../") || path.posix.isAbsolute(relative)) {
    return null;
  }
  return relative.replace(/\/$/u, "");
}

export function pathAllowed(value: string, allowed: readonly string[]): boolean {
  return allowed.some((root) => root === "." || value === root || value.startsWith(`${root}/`));
}

export function conflictEvidenceAuthority(decision: TaskRouteDecision): string {
  const fingerprint = decision.workflowStep.preconditionFingerprint;
  return taskCentricDigest({
    task_id: fingerprint.task_id,
    task_revision: fingerprint.task_revision,
    worktree: fingerprint.worktree,
    provider: decision.prFlow?.providerObservation ?? null,
    // The evidence commit changes Git cleanliness, check-target SHA and derived route authority.
    // Task, plan, backend, policy and provider identity must remain exact.
    components: Object.fromEntries(
      Object.entries(fingerprint.components).filter(
        ([key]) => !["git", "authority", "provider"].includes(key),
      ),
    ),
  });
}

type ConflictApplication = {
  command: CommandContext;
  decision: TaskRouteDecision;
  exchange: ExternalAgentExchange;
  work_order: AgentWorkOrderV2;
};
type ConflictContext = NonNullable<ReturnType<typeof resolveConflictReworkSemanticInput>>;

export async function recoverExternalConflictEvidence(
  opts: ConflictApplication,
  conflictContext: ConflictContext | null,
  head: string | null,
  status: Awaited<ReturnType<typeof readDirectRepositoryStatus>>,
): Promise<boolean> {
  const resultTrailer = conflictContext
    ? `AgentPlane-Result: ${opts.exchange.result_digest}`
    : null;
  if (conflictContext && !/^sha256:[0-9a-f]{64}$/u.test(opts.exchange.result_digest ?? "")) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Conflict result has no persisted digest.",
    });
  }
  if (resultTrailer && head && head !== opts.exchange.baseline.head) {
    const message = await runProcess({
      command: "git",
      args: ["show", "-s", "--format=%B", head],
      cwd: opts.exchange.checkout,
    });
    const trailers = message.stdout
      .split("\n")
      .filter((line) => line.startsWith("AgentPlane-Result:"));
    if (trailers.length !== 1 || trailers[0] !== resultTrailer) {
      throw new CliError({
        code: "E_VALIDATION",
        message: "Conflict snapshot does not match the persisted semantic result.",
      });
    }
    if (
      message.stdout.split("\n")[0] ===
      `🚧 ${opts.exchange.task_id.split("-").at(-1)} task: record external implementation evidence`
    ) {
      const git = async (args: string[]) => {
        const result = await runProcess({ command: "git", args, cwd: opts.exchange.checkout });
        return result.stdout.trim();
      };
      const authorityTrailers = message.stdout
        .split("\n")
        .filter((line) => line.startsWith("AgentPlane-Postcondition:"));
      const parent = await git(["show", "-s", "--format=%P", head]);
      if (
        !opts.exchange.baseline.head ||
        !/^[0-9a-f]{40}(?:[0-9a-f]{24})?$/u.test(parent) ||
        status?.lines.length !== 0 ||
        authorityTrailers.length !== 1 ||
        authorityTrailers[0] !==
          `AgentPlane-Postcondition: ${conflictEvidenceAuthority(opts.decision)}` ||
        (await git(["symbolic-ref", "--short", "HEAD"])) !==
          conflictContext!.task_worktree.branch ||
        (await git([
          "rev-parse",
          "--verify",
          "--end-of-options",
          conflictContext!.provider.base,
        ])) !== conflictContext!.local.base_head_sha
      ) {
        throw new CliError({
          code: "E_VALIDATION",
          message: "Conflict evidence postcondition changed.",
        });
      }
      const snapshot = await resolveConflictResolutionSnapshot({
        cwd: opts.exchange.checkout,
        task_id: opts.exchange.task_id,
        baseline: opts.exchange.baseline.head,
        head: parent,
        base: conflictContext!.local.base_head_sha,
        result_digest: opts.exchange.result_digest!,
      });
      const allowed = opts.work_order.authority.writable_roots
        .map((root) => authorityPath(root, opts.exchange.checkout))
        .filter((root): root is string => root !== null);
      const prefix = `.agentplane/tasks/${opts.exchange.task_id}/`;
      const prepared = await prepareConflictResolutionTree({
        cwd: opts.exchange.checkout,
        task_head: opts.exchange.baseline.head,
        resolution_snapshot: snapshot,
        base: conflictContext!.local.base_head_sha,
        merge_base: conflictContext!.local.merge_base_sha,
        allowed_path: (file) => pathAllowed(file, allowed) || file.startsWith(prefix),
      });
      const changedOutput = await git(["diff", "--name-only", "--no-renames", "-z", parent, head]);
      const changed = changedOutput.split("\0").filter(Boolean);
      if (
        (await git(["show", "-s", "--format=%P", parent])) !==
          `${snapshot} ${conflictContext!.local.base_head_sha}` ||
        (await git(["show", "-s", "--format=%T", parent])) !== prepared.tree ||
        changed.some((file) => !file.startsWith(prefix))
      ) {
        throw new CliError({
          code: "E_VALIDATION",
          message: "Conflict evidence does not match the applied resolution.",
        });
      }
      return true;
    }
  }
  return false;
}

export async function applyExternalConflictResolution(
  opts: ConflictApplication,
  conflictContext: ConflictContext,
): Promise<string> {
  const baseline = opts.exchange.baseline.head;
  const currentHead = await readDirectTaskHead(opts.exchange.checkout);
  if (!baseline || !currentHead || !opts.exchange.result_digest) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Conflict application has no bound snapshot.",
    });
  }
  const snapshot = await resolveConflictResolutionSnapshot({
    cwd: opts.exchange.checkout,
    task_id: opts.exchange.task_id,
    baseline,
    head: currentHead,
    base: conflictContext.local.base_head_sha,
    result_digest: opts.exchange.result_digest,
  });
  const allowed = opts.work_order.authority.writable_roots
    .map((root) => authorityPath(root, opts.exchange.checkout))
    .filter((root): root is string => root !== null);
  return await applyConflictResolution({
    cwd: opts.exchange.checkout,
    task_id: opts.exchange.task_id,
    task_branch: conflictContext.task_worktree.branch,
    base_ref: conflictContext.provider.base,
    task_head: baseline,
    resolution_snapshot: snapshot,
    base: conflictContext.local.base_head_sha,
    merge_base: conflictContext.local.merge_base_sha,
    semantic_result_digest: opts.exchange.result_digest,
    allowed_path: (file) =>
      pathAllowed(file, allowed) || file.startsWith(`.agentplane/tasks/${opts.exchange.task_id}/`),
    assert_authority: async () => {
      const current = await refreshExternalAgentRoute({
        cwd: opts.exchange.checkout,
        task_id: opts.exchange.task_id,
        include_remote: true,
      });
      const fingerprint = current.workflowStep.preconditionFingerprint;
      const expected = opts.work_order.state_fingerprint;
      const observed = current.prFlow?.providerObservation;
      if (
        fingerprint.task_id !== expected.task_id ||
        fingerprint.task_revision !== expected.task_revision ||
        fingerprint.components.task.digest !== expected.components.task.digest ||
        fingerprint.components.backend_projection.digest !==
          expected.components.backend_projection.digest ||
        observed?.state !== "found" ||
        observed.pr.provider !== conflictContext.provider.name ||
        observed.pr.status !== "OPEN" ||
        observed.pr.prNumber !== conflictContext.provider.pr_number ||
        observed.pr.headSha !== conflictContext.provider.head_sha ||
        observed.pr.headRef !== conflictContext.provider.branch ||
        observed.pr.base !== conflictContext.provider.base ||
        observed.pr.baseSha !== conflictContext.provider.base_sha
      ) {
        throw new CliError({
          code: "E_VALIDATION",
          message: "Conflict application task or provider authority is stale.",
        });
      }
    },
  });
}
