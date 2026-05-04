import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
export type BranchStatusParsed = {
    branch: string | null;
    base: string | null;
};
export declare const branchStatusSpec: CommandSpec<BranchStatusParsed>;
export declare const runBranchStatus: CommandHandler<BranchStatusParsed>;
//# sourceMappingURL=status.command.d.ts.map