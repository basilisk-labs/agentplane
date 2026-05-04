export declare const AGENTPLANE_CODEX_HOME_ENV = "AGENTPLANE_CODEX_HOME";
export type CodexPluginInstallScope = "user" | "repo";
export type CodexPluginInstallResult = {
    scope: CodexPluginInstallScope;
    installRoot: string;
    pluginRoot: string;
    manifestPath: string;
    marketplacePath: string;
    copiedAssets: string[];
};
type JsonObject = Record<string, unknown>;
export declare function buildCodexPluginManifest(version?: string): JsonObject;
export declare function resolveCodexInstallRoot(opts: {
    scope: CodexPluginInstallScope;
    repoRoot?: string;
    env?: NodeJS.ProcessEnv;
}): string;
export declare function resolveCodexPluginRoot(installRoot: string): string;
export declare function resolveCodexMarketplacePath(installRoot: string): string;
export declare function installBundledCodexPlugin(opts: {
    scope: CodexPluginInstallScope;
    installRoot: string;
    version?: string;
}): Promise<CodexPluginInstallResult>;
export {};
//# sourceMappingURL=plugin-install.d.ts.map