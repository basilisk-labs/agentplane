export type ReleaseCommandLabel = "release apply" | "release candidate";
export declare function releasePushDescription(commandLabel: ReleaseCommandLabel): string;
export declare function ensureCleanTrackedTree(gitRoot: string, commandLabel?: ReleaseCommandLabel): Promise<void>;
export declare function ensureTagDoesNotExist(gitRoot: string, tag: string, commandLabel?: ReleaseCommandLabel): Promise<void>;
export declare function ensureRemoteExists(gitRoot: string, remote: string, commandLabel?: ReleaseCommandLabel): Promise<void>;
export declare function ensureRemoteTagDoesNotExist(gitRoot: string, remote: string, tag: string, commandLabel?: ReleaseCommandLabel): Promise<void>;
//# sourceMappingURL=apply.preflight.git.d.ts.map