import type { HostedMergedPr, HostedMergeTarget } from "./model.js";
export declare function resolveHostedMergeTargetFromEvent(opts: {
    event: unknown;
    branchPrefix: string;
}): HostedMergeTarget | null;
export declare function resolveHostedMergedPr(opts: {
    cwd: string;
    branch: string;
}): Promise<HostedMergedPr | null>;
//# sourceMappingURL=github.d.ts.map