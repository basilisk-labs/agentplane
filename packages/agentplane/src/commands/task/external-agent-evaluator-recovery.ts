import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { gitShowFile, gitProofEnv } from "@agentplaneorg/core/git";
import { runProcess } from "@agentplaneorg/core/process";
import { parseTaskReadme, renderTaskReadme } from "@agentplaneorg/core/tasks";
import {
  retireSupervisorExecutionEpisodeIntentAfterStateDrift,
  validateSupervisorExecutionEpisodeJournal,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";

import { CliError } from "../../shared/errors.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { readWorkOrder } from "../evaluator/evaluator-work-order.js";
import {
  createSupervisorEpisodeStore,
  tryAcquireSupervisorExecutionLease,
} from "../shared/supervisor-execution-episode.js";
import { isExternalEvaluatorResultApplied } from "./external-agent-evaluator.js";
import { assertExternalAgentSupervisorIntent } from "./external-agent-exchange-authority.js";
import {
  readExternalAgentExchange,
  readExternalAgentWorkOrder,
  writeExternalAgentExchange,
  type ExternalAgentExchange,
  type ExternalAgentExchangePaths,
} from "./external-agent-exchange.js";

function digest(bytes: Buffer | string): string {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

/** Recover only the single review mutation, not a later state carrying its evidence reference. */
export async function isRecoverableAppliedEvaluatorResult(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  work_order: AgentWorkOrderV2;
  decision: TaskRouteDecision;
}): Promise<boolean> {
  const { exchange, work_order: order } = opts;
  if (!(await isExternalEvaluatorResultApplied(opts))) return false;
  if (!exchange.baseline.head || !exchange.evaluator_work_order_ref) return false;
  const current = opts.decision.workflowStep.preconditionFingerprint;
  // The next operation changes route authority. The exact plan and grant stay in the task comparison.
  for (const key of ["policy", "blueprint", "knowledge", "provider"] as const) {
    if (current.components[key].digest !== order.state_fingerprint.components[key].digest)
      return false;
  }
  const frozenRef = order.required_inputs.find((input) => input.id === "evaluator-work-order");
  const frozenBytes = await readFile(exchange.evaluator_work_order_ref);
  if (digest(frozenBytes) !== frozenRef?.digest) return false;
  const frozen = readWorkOrder(JSON.parse(frozenBytes.toString("utf8")));
  const doc = frozen.evidence.find((entry) => entry.kind === "task_document");
  if (!doc) return false;
  const beforeText = await gitShowFile(exchange.checkout, exchange.baseline.head, doc.path);
  const before = parseTaskReadme(beforeText);
  const after = parseTaskReadme(await readFile(path.join(exchange.checkout, doc.path), "utf8"));
  if (order.task.revision === null || after.frontmatter.revision !== order.task.revision + 1)
    return false;
  // Direct verification may leave the pre-review README uncommitted. Undo only the
  // one review mutation in memory and prove the entire original document by its frozen hash.
  after.frontmatter.revision = order.task.revision;
  if (Object.hasOwn(before.frontmatter, "quality_review"))
    after.frontmatter.quality_review = before.frontmatter.quality_review;
  else delete after.frontmatter.quality_review;
  const restored = renderTaskReadme(after.frontmatter, after.body);
  if (digest(restored.endsWith("\n") ? restored : restored + "\n") !== doc.sha256) return false;
  for (const evidence of frozen.evidence) {
    if (evidence === doc) continue;
    if (digest(await readFile(path.join(exchange.checkout, evidence.path))) !== evidence.sha256)
      return false;
  }
  const git = async (args: string[]) =>
    runProcess({
      command: "git",
      args,
      cwd: exchange.checkout,
      env: gitProofEnv(),
      reject: false,
    });
  if (current.git_head !== exchange.baseline.head) {
    const identity = await git(["show", "-s", "--format=%P%n%s", "HEAD"]);
    if (
      identity.exitCode !== 0 ||
      identity.stdout.trim() !==
        `${exchange.baseline.head}\n🚧 ${exchange.task_id.split("-").at(-1)} task: record external evaluator result`
    )
      return false;
  }
  const changes = await git(["diff", "--name-only", exchange.baseline.head, "--"]);
  const status = await git(["status", "--short", "--untracked-files=all"]);
  const prefix = path.posix.dirname(doc.path) + "/quality/";
  const baselineArtifacts = new Set(
    exchange.baseline.changed_paths
      .map((line) => line.slice(3).trim())
      .filter((file) => file.startsWith(path.posix.dirname(doc.path) + "/")),
  );
  const allowed = (file: string) =>
    file === doc.path || file.startsWith(prefix) || baselineArtifacts.has(file);
  const valid =
    changes.exitCode === 0 &&
    status.exitCode === 0 &&
    changes.stdout
      .trim()
      .split("\n")
      .filter(Boolean)
      .every((file) => allowed(file)) &&
    status.stdout
      .split("\n")
      .filter(Boolean)
      .every(
        (line) => exchange.baseline.changed_paths.includes(line) || allowed(line.slice(3).trim()),
      );
  return valid;
}

export function isStaleUnappliedEvaluatorCandidate(
  exchange: ExternalAgentExchange,
  currentFingerprint: string,
): boolean {
  return (
    exchange.purpose === "quality_review" &&
    exchange.role === "EVALUATOR" &&
    (exchange.status === "issued" || exchange.status === "result_received") &&
    exchange.state_fingerprint !== currentFingerprint
  );
}

/** Retire an obsolete review intent. Never apply or rewrite its semantic result. */
export async function retireStaleEvaluatorExchange(opts: {
  command: CommandContext;
  decision: TaskRouteDecision;
  exchange: ExternalAgentExchange;
  paths: ExternalAgentExchangePaths;
  journal_path: string;
}): Promise<void> {
  const currentFingerprint = opts.decision.workflowStep.preconditionFingerprint.digest;
  if (!isStaleUnappliedEvaluatorCandidate(opts.exchange, currentFingerprint)) return;
  const lease = await tryAcquireSupervisorExecutionLease({ journal_path: opts.journal_path });
  if (!lease) {
    throw new CliError({
      code: "E_RUNTIME",
      message: "Another supervisor owns evaluator recovery; retry after its operation completes.",
    });
  }
  try {
    const store = createSupervisorEpisodeStore(opts.journal_path);
    const rawJournal = await store.read();
    const exchange = await readExternalAgentExchange(opts.paths.exchange);
    if (!rawJournal || !exchange) return;
    const journal = validateSupervisorExecutionEpisodeJournal(rawJournal);
    const operation = journal.operations.at(-1);
    if (
      operation?.status !== "intent" ||
      operation.work_order_ref !== opts.paths.work_order ||
      exchange.transition_id !== opts.exchange.transition_id ||
      !isStaleUnappliedEvaluatorCandidate(exchange, currentFingerprint)
    )
      return;
    const workOrder = await readExternalAgentWorkOrder(opts.paths.work_order);
    assertExternalAgentSupervisorIntent({
      journal,
      exchange,
      paths: opts.paths,
      work_order: workOrder,
      task_id: opts.decision.task.id,
      state_fingerprint: opts.exchange.state_fingerprint,
    });
    // A crash after applying the review must resume its existing idempotent closeout.
    const command = await loadCommandContext({ cwd: exchange.checkout, rootOverride: null });
    if (
      await isRecoverableAppliedEvaluatorResult({
        command,
        exchange,
        work_order: workOrder,
        decision: opts.decision,
      })
    )
      return;
    const retired = retireSupervisorExecutionEpisodeIntentAfterStateDrift({
      journal,
      state_fingerprint_digest: currentFingerprint,
      result: {
        classification: "evaluator_state_fingerprint_drift",
        transition_id: exchange.transition_id,
        previous_state_fingerprint: exchange.state_fingerprint,
        current_state_fingerprint: currentFingerprint,
      },
    });
    // Persist this first so existing retired-exchange recovery can finish a crash here.
    await writeExternalAgentExchange(opts.paths.exchange, {
      ...exchange,
      status: "retired",
      postcondition_fingerprint: currentFingerprint,
      updated_at: new Date().toISOString(),
    });
    if (!(await store.compareAndSwap(journal.digest, retired))) {
      throw new CliError({
        code: "E_RUNTIME",
        message: "External-agent supervisor changed while retiring the stale evaluator result.",
      });
    }
    throw new CliError({
      code: "E_RUNTIME",
      message:
        "The evaluator input changed. AgentPlane retired the stale result; run: " +
        `agentplane task advance ${exchange.task_id} --replacement --agent-json`,
      context: {
        task_id: exchange.task_id,
        exact_argv: [
          "agentplane",
          "task",
          "advance",
          exchange.task_id,
          "--replacement",
          "--agent-json",
        ],
      },
    });
  } finally {
    await lease.release();
  }
}
