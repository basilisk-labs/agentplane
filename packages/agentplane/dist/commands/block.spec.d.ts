import type { CommandSpec } from "../cli/spec/spec.js";
export type BlockParsed = {
    taskId: string;
    author: string;
    body?: string;
    bodyFile?: string;
    commitFromComment: boolean;
    commitEmoji?: string;
    commitAllow: string[];
    commitAutoAllow: boolean;
    commitAllowTasks: boolean;
    commitRequireClean: boolean;
    confirmStatusCommit: boolean;
    force: boolean;
    yes: boolean;
    quiet: boolean;
};
export declare const blockSpec: CommandSpec<BlockParsed>;
//# sourceMappingURL=block.spec.d.ts.map