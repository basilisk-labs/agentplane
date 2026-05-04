import type { ReleaseApplyReport } from "./apply.types.js";
export declare function writeReleaseApplyReport(gitRoot: string, report: ReleaseApplyReport): Promise<string>;
export declare function pushReleaseRefs(gitRoot: string, remote: string, tag: string): Promise<void>;
export declare function pushReleaseCandidateBranch(gitRoot: string, remote: string): Promise<void>;
//# sourceMappingURL=apply.reporting.d.ts.map