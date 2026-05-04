import type { CommandSpec } from "../cli/spec/spec.js";
export type IntegrateParsed = {
    taskId: string;
    branch: string | null;
    base: string | null;
    mergeStrategy: "squash" | "merge" | "rebase";
    runVerify: boolean;
    dryRun: boolean;
    quiet: boolean;
};
export declare const integrateSpec: CommandSpec<IntegrateParsed>;
//# sourceMappingURL=integrate.spec.d.ts.map