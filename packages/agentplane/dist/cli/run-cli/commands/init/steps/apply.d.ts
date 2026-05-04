import type { InitClackPrompts } from "../prompts.js";
type InitApplyClack = Pick<InitClackPrompts, "spinner">;
type InitApplyStepWriter = () => Promise<void | readonly string[]>;
type InitApplyInstallCommitWriter = (installPaths: readonly string[]) => Promise<void>;
type InitApplyPlan = {
    config: InitApplyStepWriter;
    agents: InitApplyStepWriter;
    workflow: InitApplyStepWriter;
    gitignore: InitApplyStepWriter;
    hooks?: InitApplyStepWriter;
    ideSync: InitApplyStepWriter;
    recipes: InitApplyStepWriter;
    installCommit?: InitApplyInstallCommitWriter;
};
export declare function withStep<T>(opts: {
    clack?: InitApplyClack | null;
    start: string;
    success?: string;
    failure?: string;
    run: (setProgress: (message: string) => void) => Promise<T>;
}): Promise<T>;
export declare function applyInitWithProgress(opts: {
    clack?: InitApplyClack | null;
    plan: InitApplyPlan;
    includeInstallCommit: boolean;
}): Promise<{
    installPaths: string[];
}>;
export {};
//# sourceMappingURL=apply.d.ts.map