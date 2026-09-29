import { readdir } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import {
  AGENT_WORK_ORDER_V2_ZOD_SCHEMA,
  validateAgentSemanticResultForWorkOrder,
  validateSupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type { TaskData } from "../../backends/task-backend.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import { resolveCommandGitCommonDir, type CommandContext } from "../shared/task-backend.js";
import { canonicalPlanFromProposal } from "./kernel-plan-proposal.js";
import { suppliedKernelProposal } from "./create-plan-proposal.js";

async function readJson(file: string): Promise<unknown> {
  return JSON.parse(await readStableRegularTextNoFollow(file, "planning evidence")) as unknown;
}

async function entries(directory: string) {
  try {
    return await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

/** Local evidence is a lower bound, not a claim about unobserved external model calls. */
export async function readKernelPlanningEvidence(command: CommandContext, record: KernelRecord) {
  const taskId = record.aggregate.id;
  if (!/^[A-Za-z0-9_-]+$/u.test(taskId)) throw new Error("Invalid planning evidence task ID");
  const common = await resolveCommandGitCommonDir(command);
  const root = path.join(common, "agentplane", "kernel", "exchanges", taskId);
  const orders: string[] = [];
  const failed: string[] = [];
  const accepted: string[] = [];
  const currentAccepted: string[] = [];
  const results = new Set<string>();
  const issues: string[] = [];
  const plans = [
    ...record.aggregate.plan_history,
    ...(record.aggregate.current_plan ? [record.aggregate.current_plan] : []),
  ];
  for (const entry of await entries(root)) {
    if (!entry.isDirectory() || !/^[a-f0-9]{64}$/u.test(entry.name)) continue;
    const directory = path.join(root, entry.name);
    try {
      const order = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
        await readJson(path.join(directory, "work-order.json")),
      );
      if (order.task.id !== taskId || order.work_order_id !== "sha256:" + entry.name)
        throw new Error("Planning WorkOrder identity mismatch");
      if (order.role !== "PLANNER") continue;
      orders.push(order.work_order_id);
      for (const artifact of await entries(directory)) {
        if (
          !artifact.isFile() ||
          !(
            artifact.name === "received-result.json" ||
            /^planning-result-[a-f0-9]{64}\.json$/u.test(artifact.name)
          )
        )
          continue;
        const result = validateAgentSemanticResultForWorkOrder({
          work_order: order,
          semantic_result: await readJson(path.join(directory, artifact.name)),
        });
        const digest = k.kernelDigest(result);
        if (
          artifact.name.startsWith("planning-result-") &&
          artifact.name !== "planning-result-" + digest.slice(7) + ".json"
        )
          throw new Error("Planning result digest mismatch");
        if (results.has(digest)) continue;
        results.add(digest);
        if (result.status !== "completed") failed.push(digest);
        else if (result.canonical_plan && order.canonical_binding) {
          const proposed = canonicalPlanFromProposal(
            result.canonical_plan,
            order.canonical_binding.plan_revision + 1,
          );
          if (plans.some((plan) => plan.digest === proposed.digest)) accepted.push(digest);
          if (
            record.aggregate.current_plan?.digest === proposed.digest &&
            ["PROPOSED", "APPROVED"].includes(record.aggregate.current_plan.state)
          )
            currentAccepted.push(digest);
        }
      }
    } catch (error) {
      issues.push(`${entry.name}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  let managedAttempts: number | null = null;
  let managedFailures: number | null = null;
  let journalDigest: string | null = null;
  try {
    const { resolveSupervisorExecutionEpisodePath } =
      await import("../shared/supervisor-execution-episode.js");
    const journal = validateSupervisorExecutionEpisodeJournal(
      await readJson(
        await resolveSupervisorExecutionEpisodePath({
          git_root: command.resolvedProject.gitRoot,
          common_git_dir: common,
          task_id: taskId,
        }),
      ),
    );
    if (journal.task_id !== taskId) throw new Error("Planning journal task mismatch");
    const planning = journal.operations.filter((operation) => operation.role === "PLANNER");
    managedAttempts = planning.length;
    managedFailures = planning.filter((operation) => operation.status === "failed").length;
    journalDigest = journal.digest;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT")
      issues.push(`journal: ${error instanceof Error ? error.message : String(error)}`);
  }
  return {
    issued_work_orders: orders.toSorted(),
    received_results: [...results].toSorted(),
    failed_results: failed.toSorted(),
    accepted_results: accepted.toSorted(),
    current_accepted_results: currentAccepted.toSorted(),
    managed_attempts: managedAttempts,
    managed_failed_attempts: managedFailures,
    journal_digest: journalDigest,
    evidence_issues: issues.toSorted(),
  };
}

export async function projectKernelPlanning(
  command: CommandContext,
  task: TaskData,
  record: KernelRecord,
) {
  const evidence = await readKernelPlanningEvidence(command, record);
  const plan = record.aggregate.current_plan;
  const digests = new Set(
    plan?.work_items.map(
      (item) => record.documents?.contracts[String(item.contract_digest)]?.plan_input_digest,
    ),
  );
  const inputDigest = digests.size === 1 ? [...digests][0] : undefined;
  const input = inputDigest ? record.documents?.plan_inputs?.[inputDigest] : undefined;
  let supplied = false;
  if (plan && input) {
    try {
      const proposal = canonicalPlanFromProposal(
        suppliedKernelProposal(input, task),
        plan.revision,
      );
      supplied = k.kernelDigest(proposal.work_items) === k.kernelDigest(plan.work_items);
    } catch {
      // An unprovable source is unknown. It cannot be advertised as omitted planning.
    }
  }
  const policy = z.boolean().optional().safeParse(command.config.agents.approvals.require_planner);
  const mandatory = !policy.success || policy.data === true;
  const failed = evidence.failed_results.length > 0 || (evidence.managed_failed_attempts ?? 0) > 0;
  const passed = evidence.current_accepted_results.length > 0;
  const notRequired =
    supplied &&
    plan !== null &&
    ["PROPOSED", "APPROVED"].includes(plan.state) &&
    !mandatory &&
    !failed &&
    (evidence.managed_attempts ?? 0) === 0 &&
    evidence.issued_work_orders.length === 0 &&
    evidence.evidence_issues.length === 0;
  return {
    schema_version: 1,
    requirement: notRequired ? "not_required" : "required",
    outcome: passed ? "passed" : failed ? "failed" : notRequired ? "not_required" : "missing",
    plan_origin: supplied
      ? "caller_supplied"
      : evidence.accepted_results.length > 0
        ? "planner"
        : plan
          ? "unknown"
          : "missing",
    supplied_input_present: Boolean(record.documents?.intent.plan_input_digest),
    plan_input_digest: inputDigest ?? null,
    plan_digest: plan?.digest ?? null,
    plan_state: plan?.state ?? null,
    evidence_freshness: passed
      ? "current"
      : evidence.accepted_results.length > 0
        ? "historical"
        : "missing",
    ...evidence,
    external_attempts: null,
    total_attempts: null,
    accounting: "local_evidence_only",
  };
}
