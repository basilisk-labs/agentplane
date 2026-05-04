export type ProtectedPathKind = "tasks" | "policy" | "config" | "hooks" | "ci";
export type ProtectedPathOverride = {
    kind: ProtectedPathKind;
    cliFlag: string;
    envVar: string;
};
export declare function taskArtifactPrefixes(opts: {
    tasksPath: string;
    workflowDir?: string;
    taskId?: string;
}): string[];
export declare const POLICY_PATH_PREFIXES: readonly ["AGENTS.md", "CLAUDE.md", "packages/agentplane/assets/AGENTS.md", "packages/agentplane/assets/policy", ".agentplane/policy", ".agentplane/agents"];
export declare const CONFIG_PATH_PREFIXES: readonly [".agentplane/config.json", ".agentplane/backends"];
export declare const HOOK_PATH_PREFIXES: readonly ["lefthook.yml"];
export declare const CI_PATH_PREFIXES: readonly [".github/workflows", ".github/actions"];
export declare function protectedPathAllowPrefixes(opts: {
    tasksPath: string;
    workflowDir?: string;
    taskId?: string;
    allowTasks?: boolean;
    allowPolicy?: boolean;
    allowConfig?: boolean;
    allowHooks?: boolean;
    allowCI?: boolean;
}): string[];
export declare function getProtectedPathOverride(kind: ProtectedPathKind): ProtectedPathOverride;
export declare function protectedPathKindForFile(opts: {
    filePath: string;
    tasksPath: string;
    workflowDir?: string;
    taskId?: string;
}): ProtectedPathKind | null;
//# sourceMappingURL=protected-paths.d.ts.map