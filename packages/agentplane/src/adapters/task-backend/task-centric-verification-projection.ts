import {
  setMarkdownSection,
  type PlanRefinement,
  type TaskAggregate,
} from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";

const VERIFY_STEPS_FALLBACK_MARKER = "PLANNER fallback scaffold";

function taskSpecificVerifySteps(task: TaskAggregate): string | null {
  const validation = task.current_plan?.proposal.top_level_validation;
  if (!validation || validation.checks.length === 0) return null;
  return validation.checks
    .map((check, index) => {
      const expectations = validation.criteria
        .filter((criterion) => criterion.check_ids.includes(check.id))
        .map((criterion) => criterion.description.trim())
        .filter(Boolean);
      const expected = expectations.length > 0 ? expectations.join(" ") : "The check succeeds.";
      return check.command
        ? `${index + 1}. Run \`${check.command}\`. Expected: ${expected}`
        : `${index + 1}. Exercise \`${check.capability}\`. Expected: ${expected}`;
    })
    .join("\n");
}

export function verificationAmendmentProjection(opts: {
  current: TaskData;
  next: TaskAggregate;
  refinement: PlanRefinement;
  actor_id: string;
  at: string;
}): Pick<TaskData, "doc" | "sections" | "doc_updated_at" | "doc_updated_by"> | null {
  const currentSteps = opts.current.sections?.["Verify Steps"] ?? "";
  if (
    !opts.refinement.operations.includes("clarify") ||
    !currentSteps.includes(VERIFY_STEPS_FALLBACK_MARKER)
  ) {
    return null;
  }
  const verifySteps = taskSpecificVerifySteps(opts.next);
  if (!verifySteps) return null;
  return {
    doc: setMarkdownSection(opts.current.doc ?? "", "Verify Steps", verifySteps),
    sections: { ...(opts.current.sections ?? {}), "Verify Steps": verifySteps },
    doc_updated_at: opts.at,
    doc_updated_by: opts.actor_id,
  };
}
