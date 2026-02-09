export type GitHead = { hash: string; subject: string };

export type GitPort = {
  statusChangedPaths(): Promise<string[]>;
  statusStagedPaths(): Promise<string[]>;
  statusUnstagedTrackedPaths(): Promise<string[]>;
  headCommit(): Promise<string>;
  headHashSubject(): Promise<GitHead>;
  stage(paths: string[]): Promise<void>;
  commit(opts: { message: string; body?: string; env?: NodeJS.ProcessEnv }): Promise<void>;
};
