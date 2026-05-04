import type { CommandSpec } from "../../cli/spec/spec.js";
export type GuardCommitParsed = {
    taskId: string;
    message: string;
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
};
export declare const guardCommitSpec: CommandSpec<GuardCommitParsed>;
//# sourceMappingURL=commit.spec.d.ts.map