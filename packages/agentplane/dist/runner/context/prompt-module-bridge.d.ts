import type { PromptModule, PromptModuleGraph } from "../../runtime/prompt-modules/index.js";
import type { RunnerPromptBlock, RunnerPromptRole } from "../types.js";
export type RunnerPromptBlockModuleContent = {
    id: string;
    role: RunnerPromptRole;
    content: string;
    priority: number;
    title?: string;
    source?: string;
    surface?: RunnerPromptBlock["surface"];
    strength?: RunnerPromptBlock["strength"];
    resolution?: RunnerPromptBlock["resolution"];
};
export type RunnerPromptModule = PromptModule<RunnerPromptBlockModuleContent>;
export declare function runnerPromptBlockToModule(block: RunnerPromptBlock): RunnerPromptModule;
export declare function runnerPromptBlocksToModuleGraph(blocks: RunnerPromptBlock[]): PromptModuleGraph;
export declare function compileRunnerPromptModuleGraph(graph: PromptModuleGraph): RunnerPromptBlock[];
export declare function compileRunnerPromptBlocksThroughModules(blocks: RunnerPromptBlock[]): RunnerPromptBlock[];
//# sourceMappingURL=prompt-module-bridge.d.ts.map