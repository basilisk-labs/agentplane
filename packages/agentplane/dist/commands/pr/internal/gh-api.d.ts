export declare function ghEnv(): NodeJS.ProcessEnv;
export declare function resolveDefaultGithubRepo(cwd: string): Promise<string>;
export declare function runGhApiJson<T>(cwd: string, args: string[]): Promise<T>;
export declare function runGhApiNoOutput(cwd: string, args: string[]): Promise<void>;
export declare function isGhNotFound(err: unknown): boolean;
//# sourceMappingURL=gh-api.d.ts.map