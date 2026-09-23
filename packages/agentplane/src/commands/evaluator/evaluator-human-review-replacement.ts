import {
  reopenSupervisorExecutionEpisodeAfterHumanReviewStateChange,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";

import type { CommandCtx } from "../../cli/spec/spec.js";
import { CliError } from "../../shared/errors.js";
import type { SupervisorEpisodeStore } from "../shared/supervisor-execution-episode.js";
import type { EvaluatorArtifactPreparationPort } from "./evaluator-artifact-port.js";

type PreparedEvaluator = Awaited<
  ReturnType<EvaluatorArtifactPreparationPort["prepare"]>
>["prepared"];

export async function prepareHumanReviewEvaluatorReplacement(opts: {
  journal: SupervisorExecutionEpisodeJournal;
  store: SupervisorEpisodeStore;
  artifacts: EvaluatorArtifactPreparationPort;
  ctx: CommandCtx;
  taskId: string;
  evaluatorId: string;
  stateFingerprintDigest: string;
}): Promise<{ journal: SupervisorExecutionEpisodeJournal; prepared: PreparedEvaluator }> {
  const { prepared } = await opts.artifacts.prepare({
    ctx: opts.ctx,
    taskId: opts.taskId,
    evaluatorId: opts.evaluatorId,
    provenance: "evaluator_supplied",
  });
  const reopened = reopenSupervisorExecutionEpisodeAfterHumanReviewStateChange({
    journal: opts.journal,
    state_fingerprint_digest: opts.stateFingerprintDigest,
    replacement_effect_ref: prepared.work_order.work_order_id,
  });
  if (!(await opts.store.compareAndSwap(opts.journal.digest, reopened))) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        "Evaluator human-review replacement changed concurrently; no provider episode was started.",
    });
  }
  return { journal: reopened, prepared };
}
