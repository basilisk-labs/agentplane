export declare function maybeSyncIde(opts: {
    cwd: string;
    rootOverride?: string;
    ide: "codex" | "cursor" | "windsurf";
    gitRoot: string;
}): Promise<{
    installPaths: string[];
}>;
//# sourceMappingURL=ide-sync.d.ts.map