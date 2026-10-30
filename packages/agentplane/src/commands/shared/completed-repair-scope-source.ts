import path from "node:path";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitProofIsAncestor, gitProofEnv, gitShowFile } from "@agentplaneorg/core/git";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  digestSupervisorEpisodeValue,
  validateSupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import {
  completedScopeBytesDigest,
  readCompletedScopePrivateFile,
  authenticateCompletedScopeTask,
  type CompletedScopeSource,
} from "../../adapters/task-backend/completed-scope-admission.js";
import { resolveSupervisorExecutionEpisodePath } from "./supervisor-execution-episode.js";
import {
  parseTaskScopeExtensionRequestState,
  createTaskScopeExtensionRequestState,
  scopeExtensionReceiptForState,
} from "./task-scope-extension-request-state.js";
import { canonicalBlockerReadmeProjection } from "./canonical-blocker-readme-projection.js";
import {
  externalAgentResultDigest,
  externalAgentIssueDigest,
  readExternalAgentExchange,
  readExternalAgentWorkOrder,
  validateExternalAgentResultEnvelope,
} from "../task/external-agent-exchange.js";

type CompletedScopeReaderContext = {
  git_root: string;
  common_git_dir: string;
  workflow_dir: string;
};
function fail(reason = "native blocker/source"): never {
  throw new CliError({
    code: "E_VALIDATION",
    message: `Completed repair scope requires the exact consumed native blocker and unchanged checkout (${reason}).`,
  });
}

/** Authenticate raw native evidence. Never recurse through a decorated backend. */
export async function completedRepairScopeRequest(
  context: CompletedScopeReaderContext,
  task: TaskData,
  source: {
    raw: string;
    head: string;
    checkout: string;
    retained?: boolean;
    operation_key?: string;
    work_order_ref?: string;
  },
) {
  const pending = parseTaskScopeExtensionRequestState(task);
  if (task.status !== "DONE" || pending?.status !== "pending" || pending.work_item_id !== null)
    return null;
  const root = context.git_root,
    common = context.common_git_dir;
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: root,
    common_git_dir: common,
    task_id: task.id,
  });
  const journal = validateSupervisorExecutionEpisodeJournal(
    JSON.parse(await readCompletedScopePrivateFile(common, journalPath)),
  );
  if (journal.task_id !== task.id) return fail("journal Task");
  if (!source.retained && (journal.status !== "running" || journal.cursor.phase !== "ready"))
    return fail("busy journal");
  for (const op of journal.operations.toReversed()) {
    if (
      op.status !== "completed" ||
      op.kind !== "agent_episode" ||
      op.role !== "EXECUTOR" ||
      !op.work_order_ref
    )
      continue;
    if (source.operation_key && op.operation_key !== source.operation_key) continue;
    if (source.work_order_ref && op.work_order_ref !== source.work_order_ref) continue;
    const exchangePath = path.join(path.dirname(op.work_order_ref), "exchange.json");
    await readCompletedScopePrivateFile(common, exchangePath);
    await readCompletedScopePrivateFile(common, op.work_order_ref);
    const exchange = await readExternalAgentExchange(exchangePath);
    if (exchange?.transition_id !== pending.transition_id) continue;
    if (
      !exchange ||
      !["consumed", "retired"].includes(exchange.status) ||
      exchange.purpose !== "implementation_rework" ||
      exchange.task_id !== task.id ||
      exchange.checkout !== (source.checkout ?? root) ||
      exchange.state_fingerprint !== pending.blocker_state_fingerprint ||
      exchange.work_order_ref !== op.work_order_ref ||
      op.precondition_fingerprint_digest !== exchange.state_fingerprint ||
      !exchange.baseline.head ||
      exchange.baseline.changed_paths.length > 0 ||
      exchange.result?.result.status !== "blocked" ||
      exchange.result_digest !== externalAgentResultDigest(exchange.result) ||
      op.postcondition_fingerprint_digest !== exchange.postcondition_fingerprint ||
      op.result_digest !==
        digestSupervisorEpisodeValue({
          work_order_id: exchange.work_order_id,
          semantic_status: "blocked",
          result_digest: exchange.result_digest,
        })
    )
      return fail();
    const order = await readExternalAgentWorkOrder(exchange.work_order_ref);
    const envelope = validateExternalAgentResultEnvelope({
      raw: exchange.result,
      exchange,
      work_order: order,
    });
    const request = envelope.result.blocker?.scope_extension_request;
    if (
      order.task.work_item_id ||
      !request ||
      externalAgentResultDigest(envelope) !== exchange.result_digest ||
      op.effect_ref !==
        `external-agent-issue:${externalAgentIssueDigest({ exchange, work_order: order })}`
    )
      return fail("issue receipt");
    const expectedPending = createTaskScopeExtensionRequestState({
      request,
      transition_id: exchange.transition_id,
      state_fingerprint: exchange.state_fingerprint,
      work_item_id: null,
    });
    if (k.kernelDigest(expectedPending) !== k.kernelDigest(pending)) return fail("request binding");
    const recommendation = envelope.result.blocker?.recommended_action?.trim();
    const body =
      `Blocked: external ${exchange.role} could not complete the scoped implementation. ${envelope.result.summary.trim()}` +
      (recommendation ? ` Recommended action: ${recommendation}` : "") +
      ` Requested scope: roots=${pending.request.scope_roots.join(",") || "unchanged"}; repository effects=${pending.request.repository_effects.join(",") || "unchanged"}; request digest=${pending.request_digest}. ${scopeExtensionReceiptForState(pending)}`;
    const relative = `${context.workflow_dir}/${task.id}/README.md`;
    const baseline = await gitShowFile(root, exchange.baseline.head, relative);
    if (
      exchange.baseline.task_artifacts?.["README.md"]?.split(":").at(-1) !==
      completedScopeBytesDigest(baseline).slice(7)
    )
      return fail("issued beforeimage");
    if (
      !canonicalBlockerReadmeProjection({
        baseline,
        current: source.raw,
        body,
        pending: expectedPending,
      })
    )
      return fail("unrecorded blocker");
    const head = source.head;
    if (!(await gitProofIsAncestor(root, exchange.baseline.head, head)))
      return fail("source ancestry");
    const history = await execFileAsync(
      "git",
      [
        "log",
        "--format=",
        "--name-only",
        "--no-renames",
        "--full-history",
        "--diff-merges=separate",
        `${exchange.baseline.head}..${head}`,
      ],
      { cwd: root, env: gitProofEnv(), maxBuffer: 16 * 1024 * 1024 },
    );
    if (
      history.stdout
        .split("\n")
        .filter(Boolean)
        .some((file) => file !== relative)
    )
      return fail("changed source history");
    if (!source.retained) {
      const status = await execFileAsync("git", ["status", "--short", "--untracked-files=all"], {
        cwd: root,
        env: gitProofEnv(),
        maxBuffer: 16 * 1024 * 1024,
      });
      if (status.stdout.trim()) return fail("dirty checkout");
    }
    return { pending, operation_key: op.operation_key, work_order_ref: op.work_order_ref, journal };
  }
  return fail("consumed operation missing");
}

export async function authenticateCompletedScopeSource(
  context: CompletedScopeReaderContext,
  task: TaskData,
  source: CompletedScopeSource,
) {
  return await authenticateCompletedScopeTask({
    task,
    source,
    authenticate_blocker: async (before, admission) => {
      const pin = admission.identity;
      if (
        (await gitShowFile(context.git_root, pin.before_commit, pin.readme_relative)) !==
        admission.before_readme
      )
        fail("Git beforeimage");
      const native = await completedRepairScopeRequest(context, before, {
        raw: admission.before_readme,
        head: pin.head_sha,
        checkout: pin.checkout,
        retained: true,
        operation_key: pin.blocker_operation_key,
        work_order_ref: pin.blocker_work_order_ref,
      });
      if (!native) fail("retained blocker");
    },
  });
}
