import { resolveProject } from "@agentplaneorg/core/project";
export { executeRecipeTool, resolveRecipeToolInvocation } from "./scenario-tool-runtime.js";
export declare function cmdScenarioListParsed(opts: {
    cwd: string;
    rootOverride?: string;
}): Promise<number>;
export declare function cmdScenarioInfoParsed(opts: {
    cwd: string;
    rootOverride?: string;
    recipeId: string;
    scenarioId: string;
}): Promise<number>;
export declare function cmdScenarioRunParsed(opts: {
    cwd: string;
    rootOverride?: string;
    recipeId: string;
    scenarioId: string;
    resolved?: Awaited<ReturnType<typeof resolveProject>>;
}): Promise<number>;
//# sourceMappingURL=commands.d.ts.map