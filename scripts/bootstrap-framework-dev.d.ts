export type FrameworkDevExec = (repoRoot: string, cmd: string, args: string[]) => void;

export declare function resolveRepoRoot(cwd?: string): string;
export declare function runFrameworkDevBootstrap(cwd?: string, exec?: FrameworkDevExec): void;
