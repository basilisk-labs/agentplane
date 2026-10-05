import {
  createRepositorySnapshot,
  normalizeTaskPlanProposal,
  TASK_PLAN_PROPOSAL_INPUT_ZOD_SCHEMA,
  taskKernel as k,
  type ParsedTaskPlanProposal,
} from "@agentplaneorg/core/tasks";
import { validateRecipePlanForAdmission } from "../../runner/context/recipe-plan-binding.js";
import type { RecipeApplicabilityObservers } from "../../runner/context/recipe-applicability.js";
import { captureGitSnapshot } from "../../runner/observation/git-snapshot.js";
import type { CommandContext } from "../shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import type { z } from "zod";

export function parseSuppliedPlanInput(value: unknown) {
  const parsed = TASK_PLAN_PROPOSAL_INPUT_ZOD_SCHEMA.safeParse(value);
  if (parsed.success) return parsed.data;
  const format = (issues: readonly z.core.$ZodIssue[]): string[] =>
    issues.flatMap((issue) =>
      issue.code === "invalid_union"
        ? issue.errors.flatMap((nested) => format(nested))
        : [`${issue.path.join(".") || "plan"}: ${issue.message}`],
    );
  throw new CliError({
    code: "E_VALIDATION",
    message: `Invalid supplied Plan: ${[...new Set(format(parsed.error.issues))].join("; ")}`,
  });
}

/** The caller supplies intent. The controller supplies task identity and current observations. */
export async function prepareSuppliedPlan(
  command: CommandContext,
  taskId: string,
  value: unknown,
  previous?: ParsedTaskPlanProposal,
  nativeRecipeObservers?: RecipeApplicabilityObservers,
): Promise<ParsedTaskPlanProposal> {
  const input = parseSuppliedPlanInput(value);
  if (input.schema_version === 1 && input.recipe_provenance) {
    await validateRecipePlanForAdmission({
      gitRoot: command.resolvedProject.gitRoot,
      proposal: input,
      observers: nativeRecipeObservers,
    });
  }
  const git = await captureGitSnapshot({
    repository_root: command.resolvedProject.gitRoot,
    excluded_roots: [
      command.config.paths.workflow_dir,
      command.config.paths.tasks_path,
      command.config.paths.worktrees_dir,
    ],
    fingerprint_tracked_paths: true,
  });
  if (git.state !== "available" || git.errors.length > 0)
    throw new CliError({
      code: "E_VALIDATION",
      message: "Supplied Plan requires a current Git observation.",
    });
  const normalized = normalizeTaskPlanProposal(input, {
    task_id: taskId,
    rebind: true,
    planning_baseline: createRepositorySnapshot({
      git: git.head_commit
        ? { kind: "commit", sha: git.head_commit, ref: null }
        : { kind: "unborn", ref: null },
      dirty_paths: git.dirty_paths,
      policy_digest: null,
      config_digest: k.kernelDigest(command.config),
      context_digest: git.snapshot_sha256 as `sha256:${string}` | null,
      task_history_cursor: null,
      captured_at: git.captured_at,
    }),
  });
  if (previous) {
    const materialBaseline = (proposal: ParsedTaskPlanProposal) =>
      k.kernelDigest({ ...proposal.planning_baseline, captured_at: null, digest: null });
    if (
      materialBaseline(previous) === materialBaseline(normalized) &&
      k.kernelDigest(
        normalizeTaskPlanProposal(previous, {
          task_id: taskId,
          planning_baseline: normalized.planning_baseline,
          rebind: true,
        }),
      ) === k.kernelDigest(normalized)
    )
      return previous;
  }
  return normalized;
}
