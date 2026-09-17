import { exitCodeForError } from "../../cli/exit-codes.js";
import { nativeTaskContextBudgetProblems } from "../../runtime/task-obligations/index.js";
import { CliError } from "../../shared/errors.js";
import type { RunnerContextBundle } from "../types.js";

export function assertRunnerNativeContextBudget(bundle: RunnerContextBundle): void {
  const obligations = bundle.task_obligations;
  if (!obligations) return;
  const policyModuleCount = obligations.policy_modules.filter(
    (item) => item.trim().length > 0,
  ).length;
  const policyLimit = obligations.context_budget.max_policy_modules;
  const promptLimit = obligations.context_budget.max_prompt_blocks;
  const failures = nativeTaskContextBudgetProblems(obligations, bundle.base_prompts.length);
  if (failures.length === 0) return;
  throw new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message: [
      "Runner native semantic context budget exceeded.",
      `profile=${obligations.profile}`,
      ...failures,
      "Fix: reduce optional context or use an execution profile that preserves every required policy module.",
    ].join("\n"),
    context: {
      reason_code: "native_context_budget_exceeded",
      task_profile: obligations.profile,
      policy_modules: policyModuleCount,
      prompt_blocks: bundle.base_prompts.length,
      max_policy_modules: policyLimit,
      max_prompt_blocks: promptLimit,
    },
  });
}
