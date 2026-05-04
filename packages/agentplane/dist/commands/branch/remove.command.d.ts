import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
export type BranchRemoveParsed = {
    branch: string | null;
    worktree: string | null;
    force: boolean;
    yes: boolean;
    quiet: boolean;
};
export declare const branchRemoveSpec: CommandSpec<BranchRemoveParsed>;
export declare const runBranchRemove: CommandHandler<BranchRemoveParsed>;
//# sourceMappingURL=remove.command.d.ts.map