export type RunnerTarget =
  | {
      kind: "task";
      task_id: string;
    }
  | {
      kind: "recipe_scenario";
      recipe_id: string;
      scenario_id: string;
      task_id?: string;
    };
