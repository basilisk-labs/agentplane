import type { CommandSpec } from "../cli/spec/spec.js";
export type CommitParsed = {
    taskId: string;
    message?: string;
    close: boolean;
    allow: string[];
    autoAllow: boolean;
    allowTasks: boolean;
    allowBase: boolean;
    allowPolicy: boolean;
    allowConfig: boolean;
    allowHooks: boolean;
    allowCI: boolean;
    requireClean: boolean;
    quiet: boolean;
    closeUnstageOthers: boolean;
    closeCheckOnly: boolean;
};
export declare const commitSpec: CommandSpec<CommitParsed>;
//# sourceMappingURL=commit.spec.d.ts.map