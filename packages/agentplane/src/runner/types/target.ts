export type RunnerTarget =
  | {
      kind: "task";
      task_id: string;
    }
  | {
      kind: "loop_step";
      task_id: string;
      loop_id: string;
      loop_version?: string;
      step_id: string;
      step_type: string;
      prompt_module?: string | null;
      contract?: Record<string, unknown> | null;
    }
  | {
      kind: "recipe_scenario";
      recipe_id: string;
      scenario_id: string;
      task_id?: string;
    };
