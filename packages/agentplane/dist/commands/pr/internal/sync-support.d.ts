export declare function nowIso(): string;
export declare function readTextIfExists(filePath: string): Promise<string | null>;
export declare function restoreIncidentRegistryIfNeeded(opts: {
    gitRoot: string;
    previousText: string | null;
}): Promise<void>;
//# sourceMappingURL=sync-support.d.ts.map