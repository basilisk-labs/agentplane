export declare function replacePackageVersionInFile(pkgJsonPath: string, nextVersion: string): Promise<void>;
export declare function replaceRecipesRuntimeVersionInFile(sourcePath: string, nextVersion: string): Promise<void>;
export declare function replaceAgentplanePackageMetadata(pkgJsonPath: string, nextVersion: string): Promise<void>;
export declare function replacePackageDependencyVersion(pkgJsonPath: string, dependencyName: string, nextVersion: string): Promise<void>;
export declare function packageDependencyExists(pkgJsonPath: string, dependencyName: string): Promise<boolean>;
export declare function maybeUpdateBunLockfile(gitRoot: string, fileExists: (p: string) => Promise<boolean>): Promise<void>;
export declare function maybeRefreshGeneratedReference(gitRoot: string, fileExists: (p: string) => Promise<boolean>): Promise<boolean>;
export declare function maybePersistExpectedCliVersion(agentplaneDir: string, nextVersion: string): Promise<boolean>;
export declare function cleanHookEnv(): NodeJS.ProcessEnv;
//# sourceMappingURL=apply.mutation.d.ts.map