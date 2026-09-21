export type TaskRunExecutionPreview = {
  route: {
    requested_mode: string;
    selected_mode: string;
    reason_codes: string[];
  };
  context: {
    task_profile: string | null;
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
