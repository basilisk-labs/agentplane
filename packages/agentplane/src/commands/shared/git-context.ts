import { execFileAsync, gitEnv } from "./git.js";

type PorcelainStatus = {
  changedPaths: string[];
  stagedPaths: string[];
  unstagedTrackedPaths: string[];
  untrackedPaths: string[];
};

function uniqSorted(paths: string[]): string[] {
  return [...new Set(paths)].toSorted((a, b) => a.localeCompare(b));
}

function parsePorcelainV1Z(output: Buffer | string): PorcelainStatus {
  const text = Buffer.isBuffer(output) ? output.toString("utf8") : output;
  const parts = text.split("\0").filter((p) => p.length > 0);

  const changed: string[] = [];
  const staged: string[] = [];
  const unstagedTracked: string[] = [];
  const untracked: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    const entry = parts[i] ?? "";
    if (entry.length < 3) continue;
    const x = entry[0] ?? " ";
    const y = entry[1] ?? " ";

    // Porcelain v1: `XY <path>` (or `XY <orig>` NUL `<path>` for renames/copies).
    if (entry[2] !== " ") continue;
    const pathA = entry.slice(3);
    if (!pathA) continue;

    if (x === "!" && y === "!") {
      // Ignored file (`!!`): not a "changed path" for guard/staging semantics.
      continue;
    }

    const isUntracked = x === "?" && y === "?";
    if (isUntracked) {
      changed.push(pathA);
      untracked.push(pathA);
      continue;
    }

    const isRenameOrCopy = x === "R" || x === "C";
    if (isRenameOrCopy) {
      const pathB = parts[i + 1] ?? "";
      if (pathB) {
        // Include both sides so allowlist staging can cover renames across prefixes.
        changed.push(pathA, pathB);
        staged.push(pathA, pathB);
      } else {
        changed.push(pathA);
        staged.push(pathA);
      }
      i++;
      continue;
    }

    changed.push(pathA);
    if (x !== " ") staged.push(pathA);
    if (y !== " ") unstagedTracked.push(pathA);
  }

  return {
    changedPaths: uniqSorted(changed),
    stagedPaths: uniqSorted(staged),
    unstagedTrackedPaths: uniqSorted(unstagedTracked),
    untrackedPaths: uniqSorted(untracked),
  };
}

export class GitContext {
  readonly gitRoot: string;

  private memo: {
    status?: Promise<PorcelainStatus>;
    headCommit?: Promise<string>;
  } = {};

  constructor(opts: { gitRoot: string }) {
    this.gitRoot = opts.gitRoot;
  }

  private async statusPorcelainZ(): Promise<PorcelainStatus> {
    this.memo.status ??= (async () => {
      // `--untracked-files=all` is required so allowlist staging can match individual files
      // under untracked directories (tests + real-world "new task" flows).
      const { stdout } = await execFileAsync(
        "git",
        ["status", "--porcelain", "-z", "--untracked-files=all"],
        {
          cwd: this.gitRoot,
          env: gitEnv(),
          encoding: "buffer",
          maxBuffer: 10 * 1024 * 1024,
        },
      );
      return parsePorcelainV1Z(stdout);
    })();
    return await this.memo.status;
  }

  async statusChangedPaths(): Promise<string[]> {
    const status = await this.statusPorcelainZ();
    return status.changedPaths;
  }

  async statusStagedPaths(): Promise<string[]> {
    const status = await this.statusPorcelainZ();
    return status.stagedPaths;
  }

  async statusUnstagedTrackedPaths(): Promise<string[]> {
    const status = await this.statusPorcelainZ();
    return status.unstagedTrackedPaths;
  }

  headCommit(): Promise<string> {
    this.memo.headCommit ??= (async () => {
      const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: this.gitRoot,
        env: gitEnv(),
      });
      return String(stdout).trim();
    })();
    return this.memo.headCommit;
  }

  async stage(paths: string[]): Promise<void> {
    const unique = uniqSorted(paths.map((p) => p.trim()).filter(Boolean));
    if (unique.length === 0) return;
    await execFileAsync("git", ["add", "-A", "--", ...unique], {
      cwd: this.gitRoot,
      env: gitEnv(),
    });
    // Invalidate memoized status: staging changes index state.
    this.memo.status = undefined;
  }

  async commit(opts: { message: string; body?: string; env?: NodeJS.ProcessEnv }): Promise<void> {
    const args = ["commit", "-m", opts.message];
    if (opts.body) args.push("-m", opts.body);
    await execFileAsync("git", args, {
      cwd: this.gitRoot,
      env: opts.env ?? gitEnv(),
      // Commit hooks can produce large output (lint/test logs).
      maxBuffer: 50 * 1024 * 1024,
    });
    // Invalidate memoized values: commit updates HEAD and working tree state.
    this.memo.status = undefined;
    this.memo.headCommit = undefined;
  }

  async commitAmendNoEdit(opts?: { env?: NodeJS.ProcessEnv }): Promise<void> {
    await execFileAsync("git", ["commit", "--amend", "--no-edit"], {
      cwd: this.gitRoot,
      env: opts?.env ?? gitEnv(),
      // Amend triggers hooks too; keep buffer aligned with regular commit.
      maxBuffer: 50 * 1024 * 1024,
    });
    this.memo.status = undefined;
    this.memo.headCommit = undefined;
  }

  async headHashSubject(): Promise<{ hash: string; subject: string }> {
    const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%H%x00%s"], {
      cwd: this.gitRoot,
      env: gitEnv(),
      encoding: "buffer",
      maxBuffer: 1024 * 1024,
    });
    const text = Buffer.isBuffer(stdout) ? stdout.toString("utf8") : String(stdout);
    const [hash = "", subject = ""] = text.split("\0", 2);
    return { hash: hash.trim(), subject: subject.trim() };
  }
}
