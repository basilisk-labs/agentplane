type ArchiveType = "tar" | "zip";
export type ArchiveEntryIssue = {
    entry: string;
    reason: string;
};
export declare function validateArchive(archivePath: string, type: ArchiveType): Promise<ArchiveEntryIssue[]>;
export declare function detectArchiveType(filePath: string): ArchiveType | null;
export declare function extractArchive(opts: {
    archivePath: string;
    destDir: string;
}): Promise<void>;
export declare function validateArchiveEntries(entries: string[], symlinks: string[]): ArchiveEntryIssue[];
export {};
//# sourceMappingURL=archive.d.ts.map