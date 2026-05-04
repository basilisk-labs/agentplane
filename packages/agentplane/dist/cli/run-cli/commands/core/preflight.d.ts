import type { CommandHandler, CommandSpec } from "../../../spec/spec.js";
import { type PreflightMode } from "./preflight-report.js";
type PreflightParsed = {
    json: boolean;
    mode: PreflightMode;
};
export declare const preflightSpec: CommandSpec<PreflightParsed>;
export declare const runPreflight: CommandHandler<PreflightParsed>;
export {};
//# sourceMappingURL=preflight.d.ts.map