import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
export type ScenarioRunParsed = {
    recipeId: string;
    scenarioId: string;
};
export declare const scenarioRunSpec: CommandSpec<ScenarioRunParsed>;
export declare const runScenarioRun: CommandHandler<ScenarioRunParsed>;
//# sourceMappingURL=run.command.d.ts.map