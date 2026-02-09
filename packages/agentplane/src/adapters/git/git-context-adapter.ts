import type { GitPort } from "../../ports/git-port.js";
import type { GitContext } from "../../commands/shared/git-context.js";

export class GitContextAdapter implements GitPort {
  private readonly inner: GitContext;

  constructor(inner: GitContext) {
    this.inner = inner;
  }

  statusChangedPaths(): Promise<string[]> {
    return this.inner.statusChangedPaths();
  }

  statusStagedPaths(): Promise<string[]> {
    return this.inner.statusStagedPaths();
  }

  statusUnstagedTrackedPaths(): Promise<string[]> {
    return this.inner.statusUnstagedTrackedPaths();
  }

  headCommit(): Promise<string> {
    return this.inner.headCommit();
  }

  headHashSubject() {
    return this.inner.headHashSubject();
  }

  stage(paths: string[]): Promise<void> {
    return this.inner.stage(paths);
  }

  commit(opts: { message: string; body?: string; env?: NodeJS.ProcessEnv }): Promise<void> {
    return this.inner.commit(opts);
  }
}
