import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
export type ScenarioInfoParsed = {
    recipeId: string;
    scenarioId: string;
};
export declare const scenarioInfoSpec: CommandSpec<ScenarioInfoParsed>;
export declare const runScenarioInfo: CommandHandler<ScenarioInfoParsed>;
//# sourceMappingURL=info.command.d.ts.map