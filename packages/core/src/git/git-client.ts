import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { execFileAsync } from "../process/run-process.js";

// Avoid leaking worktree/index overrides into nested git subprocesses.
export function gitEnv(): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { ...process.env };
  delete env.GIT_DIR;
  delete env.GIT_WORK_TREE;
  delete env.GIT_COMMON_DIR;
  delete env.GIT_INDEX_FILE;
  delete env.GIT_OBJECT_DIRECTORY;
  delete env.GIT_ALTERNATE_OBJECT_DIRECTORIES;
  return env;
}

function uniqSorted(paths: string[]): string[] {
  return [...new Set(paths)].toSorted((a, b) => a.localeCompare(b));
}

type PorcelainStatus = {
  changedPaths: string[];
  stagedPaths: string[];
  unstagedTrackedPaths: string[];
  untrackedPaths: string[];
};

function parsePorcelainV1Z(output: Buffer | string): PorcelainStatus {
  const text = Buffer.isBuffer(output) ? output.toString("utf8") : output;
  const parts = text.split("\0").filter((part) => part.length > 0);

  const changed: string[] = [];
  const staged: string[] = [];
  const unstagedTracked: string[] = [];
  const untracked: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    const entry = parts[i] ?? "";
    if (entry.length < 3 || entry[2] !== " ") continue;

    const x = entry[0] ?? " ";
    const y = entry[1] ?? " ";
    const pathA = entry.slice(3);
    if (!pathA) continue;

    if (x === "!" && y === "!") continue;

    if (x === "?" && y === "?") {
      changed.push(pathA);
      untracked.push(pathA);
      continue;
    }

    if (x === "R" || x === "C") {
      const pathB = parts[i + 1] ?? "";
      if (pathB) {
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

export async function gitRevParse(cwd: string, args: string[]): Promise<string> {
  const { stdout } = await execFileAsync("git", ["rev-parse", ...args], { cwd, env: gitEnv() });
  const trimmed = String(stdout).trim();
  if (!trimmed) throw new Error("Failed to resolve git path");
  return trimmed;
}

export async function gitMergeBase(cwd: string, left: string, right: string): Promise<string> {
  const { stdout } = await execFileAsync("git", ["merge-base", left, right], {
    cwd,
    env: gitEnv(),
  });
  const trimmed = String(stdout).trim();
  if (!trimmed) throw new Error("Failed to resolve git merge-base");
  return trimmed;
}

export async function gitConfigGet(cwd: string, key: string): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("git", ["config", "--get", key], {
      cwd,
      env: gitEnv(),
    });
    const trimmed = String(stdout).trim();
    return trimmed.length > 0 ? trimmed : null;
  } catch (err) {
    const code = (err as { code?: number | string } | null)?.code;
    if (code === 1) return null;
    throw err;
  }
}

export async function gitCurrentBranch(cwd: string): Promise<string> {
  try {
    const { stdout } = await execFileAsync("git", ["symbolic-ref", "--short", "HEAD"], {
      cwd,
      env: gitEnv(),
    });
    const trimmed = String(stdout).trim();
    if (trimmed) return trimmed;
  } catch {
    // fall through
  }

  const { stdout } = await execFileAsync("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
    cwd,
    env: gitEnv(),
  });
  const trimmed = String(stdout).trim();
  if (!trimmed || trimmed === "HEAD") {
    throw new Error("Detached HEAD: failed to resolve current branch");
  }
  return trimmed;
}

export async function gitBranchExists(cwd: string, branch: string): Promise<boolean> {
  const branches = await gitListBranches(cwd);
  return branches.includes(branch);
}

export async function gitIsAncestor(
  cwd: string,
  maybeAncestor: string,
  descendant: string,
): Promise<boolean> {
  try {
    await execFileAsync("git", ["merge-base", "--is-ancestor", maybeAncestor, descendant], {
      cwd,
      env: gitEnv(),
    });
    return true;
  } catch (err) {
    const code = (err as { code?: number | string } | null)?.code;
    if (code === 1) return false;
    if (
      code === 128 &&
      String((err as { stderr?: string } | null)?.stderr ?? "").includes("Not a valid commit name")
    ) {
      return false;
    }
    throw err;
  }
}

export async function gitBranchUpstream(cwd: string, branch: string): Promise<string | null> {
  const { stdout } = await execFileAsync(
    "git",
    ["for-each-ref", "--format=%(refname:short)%00%(upstream:short)", "refs/heads"],
    { cwd, env: gitEnv() },
  );
  for (const line of String(stdout).split("\n")) {
    const [name, upstream = ""] = line.split("\0");
    if (name === branch) return upstream.trim() || null;
  }
  return null;
}

export async function gitListBranches(cwd: string): Promise<string[]> {
  const { stdout } = await execFileAsync("git", ["branch", "--format=%(refname:short)"], {
    cwd,
    env: gitEnv(),
  });
  return String(stdout)
    .split("\n")
    .map((line: string) => line.trim())
    .filter((line: string) => line.length > 0);
}

export async function gitStagedPaths(cwd: string): Promise<string[]> {
  const { stdout } = await execFileAsync("git", ["diff", "--cached", "--name-only"], {
    cwd,
    env: gitEnv(),
  });
  return String(stdout)
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export async function gitAddPaths(cwd: string, paths: string[]): Promise<void> {
  if (paths.length === 0) return;
  await execFileAsync("git", ["add", "--", ...paths], { cwd, env: gitEnv() });
}

export async function gitCommit(
  cwd: string,
  message: string,
  opts?: { env?: NodeJS.ProcessEnv; skipHooks?: boolean },
): Promise<void> {
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-commit-message-"));
  const messagePath = path.join(tmpDir, "message.txt");
  await writeFile(messagePath, message, { encoding: "utf8", mode: 0o600 });
  const args = ["commit", "--file", messagePath];
  if (opts?.skipHooks) args.push("--no-verify");
  const env = opts?.env ? { ...gitEnv(), ...opts.env } : gitEnv();
  try {
    await execFileAsync("git", args, { cwd, env });
  } finally {
    await rm(tmpDir, { recursive: true, force: true });
  }
}

export async function gitInitRepo(cwd: string, branch: string): Promise<void> {
  try {
    await execFileAsync("git", ["init", "-q", "-b", branch], { cwd, env: gitEnv() });
    return;
  } catch {
    await execFileAsync("git", ["init", "-q"], { cwd, env: gitEnv() });
  }

  try {
    const current = await gitCurrentBranch(cwd);
    if (current !== branch) {
      await execFileAsync("git", ["checkout", "-q", "-b", branch], { cwd, env: gitEnv() });
    }
  } catch {
    await execFileAsync("git", ["checkout", "-q", "-b", branch], { cwd, env: gitEnv() });
  }
}

export async function resolveInitBaseBranch(gitRoot: string, fallback: string): Promise<string> {
  let current: string | null = null;
  try {
    current = await gitCurrentBranch(gitRoot);
  } catch {
    current = null;
  }
  const branches = await gitListBranches(gitRoot);
  if (current) return current;
  if (branches.includes(fallback)) return fallback;
  if (branches.length > 0) {
    const first = branches[0];
    if (first) return first;
  }
  return fallback;
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

  async statusUntrackedPaths(): Promise<string[]> {
    const status = await this.statusPorcelainZ();
    return status.untrackedPaths;
  }

  async statusUnstagedTrackedPaths(): Promise<string[]> {
    const status = await this.statusPorcelainZ();
    return status.unstagedTrackedPaths;
  }

  invalidateStatus(): void {
    this.memo.status = undefined;
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
    const unique = uniqSorted(paths.map((path) => path.trim()).filter(Boolean));
    if (unique.length === 0) return;
    await execFileAsync("git", ["add", "-A", "--", ...unique], {
      cwd: this.gitRoot,
      env: gitEnv(),
    });
    this.invalidateStatus();
  }

  async commit(opts: { message: string; body?: string; env?: NodeJS.ProcessEnv }): Promise<void> {
    const args = ["commit", "-m", opts.message];
    if (opts.body) args.push("-m", opts.body);
    await execFileAsync("git", args, {
      cwd: this.gitRoot,
      env: opts.env ?? gitEnv(),
      maxBuffer: 50 * 1024 * 1024,
    });
    this.memo.status = undefined;
    this.memo.headCommit = undefined;
  }

  async commitAmendNoEdit(opts?: { env?: NodeJS.ProcessEnv }): Promise<void> {
    await execFileAsync("git", ["commit", "--amend", "--no-edit"], {
      cwd: this.gitRoot,
      env: opts?.env ?? gitEnv(),
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
