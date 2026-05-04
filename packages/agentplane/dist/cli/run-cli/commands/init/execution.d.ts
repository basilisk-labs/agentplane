import { type InitClackPrompts } from "./prompts.js";
import type { InitFlags, InitParsed } from "./model.js";
import type { InitAnswers } from "./answers.js";
export type ResolvedInitPaths = {
    gitRoot: string;
    agentplaneDir: string;
    workflowPath: string;
    backendPath: string;
};
export declare function resolveInitPaths(opts: {
    cwd: string;
    rootOverride?: string;
    backend: NonNullable<InitFlags["backend"]>;
    ensureGitRoot: (opts: {
        initRoot: string;
        baseBranchFallback: string;
    }) => Promise<{
        gitRoot: string;
        gitRootExisted: boolean;
    }>;
}): Promise<ResolvedInitPaths & {
    gitRootExisted: boolean;
}>;
export declare function collectInitAndHookConflicts(opts: {
    paths: ResolvedInitPaths;
    answers: InitAnswers;
}): Promise<string[]>;
export declare function maybeConfirmInteractiveApply(opts: {
    clack: InitClackPrompts | null;
    flags: InitParsed;
    answers: InitAnswers;
}): Promise<void>;
export declare function resolveConflictStrategy(opts: {
    clack: InitClackPrompts | null;
    flags: InitParsed;
    gitRoot: string;
    conflicts: string[];
}): Promise<{
    backup: boolean;
    force: boolean;
}>;
export declare function applyInitPlan(opts: {
    cwd: string;
    rootOverride?: string;
    flags: InitParsed;
    clack: InitClackPrompts | null;
    answers: InitAnswers;
    paths: ResolvedInitPaths;
    initBaseBranch: string;
}): Promise<void>;
//# sourceMappingURL=execution.d.ts.map