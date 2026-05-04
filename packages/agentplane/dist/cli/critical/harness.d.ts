export type RunCliResult = {
    code: number;
    stdout: string;
    stderr: string;
};
export declare function makeTempDir(prefix?: string): Promise<string>;
export declare function ensureDir(dir: string): Promise<void>;
export declare function writeText(filePath: string, content: string): Promise<void>;
export declare function readText(filePath: string): Promise<string>;
export declare function real(p: string): Promise<string>;
export declare function pathExists(filePath: string): Promise<boolean>;
export declare function listDirRecursive(root: string): Promise<string[]>;
export declare function gitInit(repoRoot: string, branch?: string): Promise<void>;
export declare function gitCommitAll(repoRoot: string, message: string): Promise<void>;
export declare function gitHead(repoRoot: string): Promise<string>;
export declare function runCli(args: string[], opts: {
    cwd: string;
    extraEnv?: Record<string, string>;
}): Promise<RunCliResult>;
export declare function expectCliError(result: RunCliResult, code: number, errCode: string): void;
export declare function cleanGitEnv(): NodeJS.ProcessEnv;
//# sourceMappingURL=harness.d.ts.map