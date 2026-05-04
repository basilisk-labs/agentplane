import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { type GroupCommandParsed } from "../../cli/group-command.js";
type BranchBaseGroupParsed = GroupCommandParsed;
export declare const branchBaseSpec: CommandSpec<BranchBaseGroupParsed>;
export declare const branchBaseGetSpec: CommandSpec<Record<string, never>>;
export declare const branchBaseClearSpec: CommandSpec<Record<string, never>>;
export declare const branchBaseExplainSpec: CommandSpec<Record<string, never>>;
export type BranchBaseSetParsed = {
    value: string | null;
    useCurrent: boolean;
};
export declare const branchBaseSetSpec: CommandSpec<BranchBaseSetParsed>;
export declare const runBranchBase: CommandHandler<BranchBaseGroupParsed>;
export declare const runBranchBaseGet: CommandHandler<Record<string, never>>;
export declare const runBranchBaseClear: CommandHandler<Record<string, never>>;
export declare const runBranchBaseExplain: CommandHandler<Record<string, never>>;
export declare const runBranchBaseSet: CommandHandler<BranchBaseSetParsed>;
export {};
//# sourceMappingURL=base.command.d.ts.map