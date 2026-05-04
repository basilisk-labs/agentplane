import type { CommandSpec } from "../cli/spec/spec.js";
import { type VerifyCommonParsed } from "./task/verify-command-shared.js";
type VerifyState = "ok" | "needs_rework";
export type VerifyParsed = VerifyCommonParsed & {
    taskId: string;
    state: VerifyState;
};
export declare const verifySpec: CommandSpec<VerifyParsed>;
export {};
//# sourceMappingURL=verify.spec.d.ts.map