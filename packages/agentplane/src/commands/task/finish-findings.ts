import { applyTaskMutation } from "../shared/task-mutation.js";
import type { CommandContext } from "../shared/task-backend.js";

import { buildStructuredFindingMutationPlan } from "./findings.js";

export type FinishStructuredFindingInput = {
  observation: string;
  impact: string;
  resolution: string;
  promote: boolean;
  external: boolean;
  localOnly: boolean;
  repoFixable: boolean;
  incidentScope?: string;
  incidentTags: string[];
  incidentMatch: string[];
  incidentAdvice?: string;
  incidentRule?: string;
};

export async function appendFinishStructuredFinding(opts: {
  ctx: CommandContext;
  taskId: string;
  author: string;
  finding: FinishStructuredFindingInput;
}): Promise<void> {
  await applyTaskMutation({
    ctx: opts.ctx,
    taskId: opts.taskId,
    build: (current) => {
      const plan = buildStructuredFindingMutationPlan({
        current,
        config: opts.ctx.config,
        observation: opts.finding.observation,
        impact: opts.finding.impact,
        resolution: opts.finding.resolution,
        promote: opts.finding.promote,
        external: opts.finding.external,
        fixability: opts.finding.repoFixable ? "repo-fixable" : null,
        incidentScope: opts.finding.incidentScope,
        incidentTags: opts.finding.incidentTags,
        incidentMatch: opts.finding.incidentMatch,
        incidentAdvice: opts.finding.incidentAdvice,
        incidentRule: opts.finding.incidentRule,
        updatedBy: opts.author,
      });
      return plan ? { intents: plan.intents } : null;
    },
  });
}
