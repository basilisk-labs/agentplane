export declare function collectHooksInstallConflicts(opts: {
    gitRoot: string;
    agentplaneDir: string;
}): Promise<string[]>;
export declare function cmdHooksInstall(opts: {
    cwd: string;
    rootOverride?: string;
    quiet: boolean;
}): Promise<number>;
export declare function cmdHooksUninstall(opts: {
    cwd: string;
    rootOverride?: string;
    quiet: boolean;
}): Promise<number>;
//# sourceMappingURL=install.d.ts.map