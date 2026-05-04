import type { ResolvedVerifyRecordInput, VerifyCommandName } from "./verify-record.types.js";
export declare function resolveVerifyRecordInput(opts: {
    cwd: string;
    by: string;
    note: string;
    noteFile?: string;
    details?: string;
    file?: string;
    command: VerifyCommandName;
}): Promise<ResolvedVerifyRecordInput>;
//# sourceMappingURL=verify-record-input.d.ts.map