import { type FrameworkBinaryContext } from "../../../bin/runtime-context.js";
export type RuntimeMode = "global-installed" | "global-in-framework" | "global-forced-in-framework" | "repo-local" | "repo-local-handoff";
export type ResolvedPackageInfo = {
    name: string;
    version: string | null;
    packageRoot: string | null;
    packageJsonPath: string | null;
};
export type RuntimeSourceInfo = {
    cwd: string;
    activeBinaryPath: string | null;
    handoffFromBinaryPath: string | null;
    mode: RuntimeMode;
    framework: FrameworkBinaryContext;
    frameworkSources: {
        repoRoot: string | null;
        agentplaneRoot: string | null;
        coreRoot: string | null;
    };
    agentplane: ResolvedPackageInfo;
    core: ResolvedPackageInfo;
};
export type ResolveRuntimeSourceInfoOptions = {
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    activeBinaryPath?: string | null;
    entryModuleUrl?: string;
    agentplanePackageRoot?: string | null;
    corePackageJsonPath?: string | null;
};
export declare function describeRuntimeMode(mode: RuntimeMode): string;
export declare function resolveRuntimeSourceInfo(options?: ResolveRuntimeSourceInfoOptions): RuntimeSourceInfo;
//# sourceMappingURL=runtime-source.d.ts.map