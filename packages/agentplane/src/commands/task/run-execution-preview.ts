import type { RunnerContextBundle } from "../../runner/types.js";

export type TaskRunExecutionPreview = {
  route: {
    requested_mode: string;
    selected_mode: string;
    reason_codes: string[];
  };
  context: {
    blueprint_id: string | null;
    task_sections: number;
    task_context_bytes: number;
    duplicate_bytes_removed: number;
    prompt_blocks: number;
    policy_modules: number;
    knowledge_refs: number;
  };
  approvals: {
    plan: boolean;
    verify: boolean;
    network: boolean;
    force: boolean;
  };
  checks: string[];
  budgets: {
    token: {
      state: "unavailable";
      reason: string;
    };
    context: {
      max_policy_modules: number;
      max_prompt_blocks: number | null;
    } | null;
    tools: Record<string, { limit: number; remaining: number }>;
  };
};

export function buildTaskRunExecutionPreview(bundle: RunnerContextBundle): TaskRunExecutionPreview {
  const persistedRoute = bundle.route_decision?.task.execution_route;
  const persistedContract = bundle.route_decision?.task.execution_contract;
  const fallbackRoute = bundle.blueprint?.workflowMode ?? "direct";
  const toolBudget = Object.fromEntries(
    Object.entries(bundle.execution.profile_runtime?.budget ?? {}).map(([phase, budget]) => [
      phase,
      { limit: budget.limit, remaining: budget.remaining },
    ]),
  );
  return {
    route: {
      requested_mode: persistedRoute?.requested_mode ?? "repository",
      selected_mode:
        persistedContract?.selected_mode ?? persistedRoute?.selected_mode ?? fallbackRoute,
      reason_codes: [
        ...(persistedContract?.reason_codes ??
          persistedRoute?.reason_codes ?? ["repository_mode_selected"]),
      ],
    },
    context: {
      blueprint_id: bundle.blueprint?.blueprintId ?? null,
      task_sections: bundle.task?.narrative.sections.length ?? 0,
      task_context_bytes: bundle.task?.compaction.serialized.emitted_bytes ?? 0,
      duplicate_bytes_removed: bundle.task?.compaction.serialized.duplicate_bytes_removed ?? 0,
      prompt_blocks: bundle.base_prompts.length,
      policy_modules: bundle.blueprint?.policyModules.length ?? 0,
      knowledge_refs: bundle.knowledge_refs?.length ?? 0,
    },
    approvals: {
      plan: bundle.execution.approvals?.require_plan === true,
      verify: bundle.execution.approvals?.require_verify === true,
      network: bundle.execution.approvals?.require_network === true,
      force: bundle.execution.approvals?.require_force === true,
    },
    checks: [...(bundle.task?.verification.commands ?? [])],
    budgets: {
      token: {
        state: "unavailable",
        reason: "provider token budget is assigned by the semantic supervisor at execution time",
      },
      context: bundle.blueprint
        ? {
            max_policy_modules: bundle.blueprint.contextBudget.maxPolicyModules,
            max_prompt_blocks: bundle.blueprint.contextBudget.maxPromptBlocks ?? null,
          }
        : null,
      tools: toolBudget,
    },
  };
}
