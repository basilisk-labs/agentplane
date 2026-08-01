import type { CommandCtx } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
import { loadTaskFromContext } from "../shared/task-backend.js";

import { CliError } from "../../shared/errors.js";
import { loadEvaluatorCatalogForCommand } from "./evaluator-catalog.command.js";
import {
  prepareEvaluatorReview,
  type PreparedEvaluatorReview,
} from "./evaluator-review-usecase.js";
import type { EvaluatorRunProvenance } from "./evaluator.spec.js";

export type EvaluatorArtifactPreparationRequest = {
  ctx: CommandCtx;
  taskId: string;
  evaluatorId: string;
  provenance: EvaluatorRunProvenance;
};

export type PreparedEvaluatorArtifactPacket = Readonly<{
  git_root: string;
  prepared: PreparedEvaluatorReview;
}>;

/**
 * Path-confined evaluator preparation authority.
 *
 * The caller can request one canonical evidence packet for an existing task.
 * It cannot choose an output path or access the underlying task, Git, backend,
 * approval, or full CommandContext services.
 */
export type EvaluatorArtifactPreparationPort = Readonly<{
  prepare: (
    request: EvaluatorArtifactPreparationRequest,
  ) => Promise<PreparedEvaluatorArtifactPacket>;
}>;

export function createEvaluatorArtifactPreparationPort(
  command: CommandContext,
): EvaluatorArtifactPreparationPort {
  return Object.freeze({
    prepare: async (
      request: EvaluatorArtifactPreparationRequest,
    ): Promise<PreparedEvaluatorArtifactPacket> => {
      const evaluators = await loadEvaluatorCatalogForCommand(request.ctx, true);
      const evaluator = evaluators.find((candidate) => candidate.id === request.evaluatorId);
      if (!evaluator) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Unknown evaluator id: ${request.evaluatorId}`,
        });
      }
      const task = await loadTaskFromContext({ ctx: command, taskId: request.taskId });
      const prepared = await prepareEvaluatorReview({
        ctx: command,
        task,
        evaluator,
        provenance: request.provenance,
      });
      return Object.freeze({
        git_root: command.resolvedProject.gitRoot,
        prepared,
      });
    },
  });
}
