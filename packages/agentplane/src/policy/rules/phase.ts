import type { PolicyActionId } from "../taxonomy.js";
import type { PolicyContext, PolicyPhase, PolicyProblem, PolicyResult } from "../model.js";

type PhaseContract = {
  defaultPhase: PolicyPhase | null;
  allowedPhases: readonly PolicyPhase[];
};

const ALL_LIFECYCLE_PHASES: readonly PolicyPhase[] = [
  "preflight",
  "plan",
  "implement",
  "verify",
  "finish",
  "integrate",
];

const ACTION_PHASES: Partial<Record<PolicyActionId, PhaseContract>> = {
  task_list: { defaultPhase: "preflight", allowedPhases: ["preflight", "plan"] },
  task_new: { defaultPhase: "plan", allowedPhases: ["plan"] },
  task_plan_set: { defaultPhase: "plan", allowedPhases: ["plan"] },
  task_plan_approve: { defaultPhase: "plan", allowedPhases: ["plan"] },
  task_plan_reject: { defaultPhase: "plan", allowedPhases: ["plan"] },
  task_mutation: { defaultPhase: null, allowedPhases: ALL_LIFECYCLE_PHASES },
  task_status_transition: { defaultPhase: null, allowedPhases: ALL_LIFECYCLE_PHASES },
  task_start: { defaultPhase: "implement", allowedPhases: ["implement"] },
  task_block: { defaultPhase: "implement", allowedPhases: ["implement", "verify", "finish"] },
  task_set_status: { defaultPhase: null, allowedPhases: ALL_LIFECYCLE_PHASES },
  task_verify: { defaultPhase: "verify", allowedPhases: ["verify"] },
  task_finish: { defaultPhase: "finish", allowedPhases: ["finish"] },
  task_run: { defaultPhase: "implement", allowedPhases: ["implement"] },
  scenario_execute: { defaultPhase: "implement", allowedPhases: ["implement"] },
  integrate: { defaultPhase: "integrate", allowedPhases: ["integrate"] },
  work_start: { defaultPhase: "implement", allowedPhases: ["implement"] },
};

function phasePolicyError(message: string): PolicyProblem {
  return { code: "E_PHASE_POLICY", exitCode: 2, message };
}

export function resolvePolicyPhase(
  action: PolicyActionId,
  phase?: PolicyPhase,
): PolicyPhase | null {
  return phase ?? ACTION_PHASES[action]?.defaultPhase ?? null;
}

export function evaluatePhasePolicy(ctx: PolicyContext): PolicyResult {
  const contract = ACTION_PHASES[ctx.action];
  if (!contract) return { ok: true, errors: [], warnings: [] };

  const effectivePhase = resolvePolicyPhase(ctx.action, ctx.phase);
  const errors: PolicyProblem[] = [];
  if (effectivePhase && !contract.allowedPhases.includes(effectivePhase)) {
    errors.push(
      phasePolicyError(
        `${ctx.action} is not allowed during ${effectivePhase} phase; allowed phases: ${contract.allowedPhases.join(", ")}`,
      ),
    );
  }

  if (
    ctx.action === "task_start" &&
    ctx.config.agents?.approvals?.require_plan === true &&
    ctx.task?.planApprovalState !== undefined &&
    ctx.task.planApprovalState !== "approved"
  ) {
    errors.push(
      phasePolicyError(`${ctx.taskId}: cannot start implementation before plan approval`),
    );
  }

  return { ok: errors.length === 0, errors, warnings: [] };
}
