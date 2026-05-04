export declare function collectInitConflicts(opts: {
    initDirs: string[];
    initFiles: string[];
}): Promise<string[]>;
export declare function handleInitConflicts(opts: {
    gitRoot: string;
    conflicts: string[];
    backup: boolean;
    force: boolean;
}): Promise<void>;
//# sourceMappingURL=conflicts.d.ts.map