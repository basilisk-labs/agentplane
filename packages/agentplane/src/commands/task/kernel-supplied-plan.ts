import { resolvePlanningObligation, taskKernel as k } from "@agentplaneorg/core/tasks";
import { z } from "zod";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type { TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { prepareSuppliedPlan } from "./create-plan-input.js";
import { suppliedKernelProposal } from "./create-plan-proposal.js";
import { setCanonicalPlan } from "./kernel-plan.js";
import { readKernelPlanningEvidence } from "./kernel-planning-view.js";

const requirePlannerPolicy = z.boolean().optional();

/** A supplied proposal changes neither approval policy nor the required review stage. */
export async function materializeSuppliedPlan(opts: {
  command: CommandContext;
  task: TaskData;
  record: KernelRecord;
}): Promise<boolean> {
  const { command, record, task } = opts;
  if (record.aggregate.state !== "PLANNING" || record.aggregate.current_plan !== null) return false;
  const digest = record.documents?.intent.plan_input_digest;
  const supplied = digest ? record.documents?.plan_inputs?.[digest] : undefined;
  if (!supplied) return false;
  const evidence = await readKernelPlanningEvidence(command, record);
  if (
    evidence.issued_work_orders.length > 0 ||
    (evidence.managed_attempts ?? 0) > 0 ||
    evidence.evidence_issues.length > 0
  )
    return false;
  const policy = requirePlannerPolicy.safeParse(command.config.agents.approvals.require_planner);
  const current = await prepareSuppliedPlan(command, task.id, supplied, supplied);
  const obligation = resolvePlanningObligation({
    policy: {
      allow_supplied_plan: true,
      require_planner: !policy.success || policy.data === true,
    },
    plan: {
      origin: "supplied",
      semantic_resolution:
        supplied.unresolved_questions.length === 0 &&
        task.execution_contract?.declaration.requirements_uncertainty === "bounded"
          ? "resolved"
          : "unresolved",
      freshness: k.kernelDigest(current) === digest ? "current" : "stale",
    },
    attempt: { outcome: "not_attempted", freshness: "missing" },
  });
  if (obligation.requirement !== "not_required") return false;
  try {
    suppliedKernelProposal(supplied, task);
  } catch (error) {
    // Missing declared verification or execution intent remains a planning question.
    if (error instanceof CliError && error.code === "E_VALIDATION") return false;
    throw error;
  }
  await setCanonicalPlan(command, task.id, supplied, { expectedSuppliedInputDigest: digest });
  return true;
}
