import { loadCommandContext } from "./commands/shared/task-backend.js";
import type { KernelPlanProposal } from "@agentplaneorg/core/tasks";
import type { RecipeV1Audit, ScenarioV2Definition } from "@agentplaneorg/recipes";
import {
  prepareRecipeV1ConversionSource as prepareSource,
  prepareRecipeV1ConversionPlan as preparePlan,
  readReviewedRecipeV1Conversion as readReviewed,
} from "./commands/recipes/impl/v1-conversion.js";

type RepositoryTask = { repository_root: string; task_id: string };
export type RecipeV1SourceReference = {
  schema_version: 1;
  kind: "recipe_v1_source_reference";
  task_id: string;
  source_digest: string;
  artifact: {
    logical_name: string;
    kind:
      | "actual_diff"
      | "observed_checks"
      | "blueprint"
      | "plan"
      | "prompt"
      | "result_schema"
      | "recipe_closure";
    path: string;
    sha256: string;
    size_bytes: number;
    media_type: string;
  };
};
const context = (root: string) => loadCommandContext({ cwd: root, rootOverride: root });

/** Retain exact source bytes for an existing Task. The repository owner must commit them. */
export async function prepareRecipeV1ConversionSource(
  opts: RepositoryTask & { source_path: string; expected_source_digest: string },
): Promise<RecipeV1SourceReference> {
  return prepareSource({ ...opts, command: await context(opts.repository_root) });
}

/** Prepare an ordinary native proposal. This grants no approval or execution authority. */
export async function prepareRecipeV1ConversionPlan(
  opts: RepositoryTask & { reference: unknown },
): Promise<{ audit: RecipeV1Audit; proposal: KernelPlanProposal }> {
  return preparePlan({ ...opts, command: await context(opts.repository_root) });
}

/** Resolve the exact independently reviewed native draft without installing or activating it. */
export async function readReviewedRecipeV1Conversion(
  opts: RepositoryTask & { work_item_id: string; reference: unknown; result: unknown },
): Promise<{
  kind: "reviewed_recipe_v2_candidate";
  scenario: ScenarioV2Definition;
  source_digest: string;
  draft_digest: string;
  review: {
    task_id: string;
    work_item_id: string;
    result_digest: string;
    validation_digest: string;
  };
  next: string;
}> {
  return readReviewed({ ...opts, command: await context(opts.repository_root) });
}
