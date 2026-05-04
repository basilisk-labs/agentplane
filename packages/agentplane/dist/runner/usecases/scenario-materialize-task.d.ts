import type { TaskData } from "../../backends/task-backend.js";
import { type CommandContext } from "../../commands/shared/task-backend.js";
import type { RunnerRecipeContext } from "../types.js";
import { type RunnerRecipeContextEnvelope } from "../context/recipe-context.js";
export type MaterializedRecipeScenarioTask = {
    task: TaskData;
    task_id: string;
    run_id: string;
    readme_path: string;
    recipe_context: RunnerRecipeContext;
    selection: RunnerRecipeContextEnvelope["selection"];
    scenario: RunnerRecipeContextEnvelope["scenario"];
    entry: RunnerRecipeContextEnvelope["entry"];
};
export declare function buildMaterializedRecipeTask(opts: {
    envelope: RunnerRecipeContextEnvelope;
    task_id: string;
    run_id: string;
    created_at?: string;
}): TaskData;
export declare function materializeRecipeScenarioTask(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string | null;
    recipe_id: string;
    scenario_id: string;
    run_id?: string;
}): Promise<MaterializedRecipeScenarioTask>;
//# sourceMappingURL=scenario-materialize-task.d.ts.map