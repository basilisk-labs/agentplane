import type { RunnerPromptBlock, RunnerTaskContext } from "../types.js";
export declare function collectOverlayPromptBlocks(opts: {
    git_root: string;
    task?: RunnerTaskContext;
    command?: string;
}): Promise<RunnerPromptBlock[]>;
//# sourceMappingURL=overlay-prompt-blocks.d.ts.map