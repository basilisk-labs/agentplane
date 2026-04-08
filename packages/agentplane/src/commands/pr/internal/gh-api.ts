import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { exitCodeForError } from "../../../cli/exit-codes.js";
import { CliError } from "../../../shared/errors.js";
import { gitEnv } from "../../shared/git.js";
import { normalizeGhTransportError, withGhTransportRetry } from "../../shared/gh-transport.js";

const execFileAsyncRaw = promisify(execFile);

function parseGithubRepoFromRemoteUrl(remoteUrl: string): string | null {
  const trimmed = remoteUrl.trim();
  if (!trimmed) return null;
  const httpsMatch = /^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/.exec(trimmed);
  if (httpsMatch) return `${httpsMatch[1]}/${httpsMatch[2]}`;
  const sshMatch = /^git@github\.com:([^/]+)\/([^/]+?)(?:\.git)?$/.exec(trimmed);
  if (sshMatch) return `${sshMatch[1]}/${sshMatch[2]}`;
  return null;
}

export function ghEnv(): NodeJS.ProcessEnv {
  const env = gitEnv();
  // Make the auth/session contract explicit for nested repo-local invocations.
  if (typeof process.env.GH_TOKEN === "string") env.GH_TOKEN = process.env.GH_TOKEN;
  if (typeof process.env.GITHUB_TOKEN === "string") env.GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (typeof process.env.GH_CONFIG_DIR === "string") env.GH_CONFIG_DIR = process.env.GH_CONFIG_DIR;
  if (typeof process.env.XDG_CONFIG_HOME === "string")
    env.XDG_CONFIG_HOME = process.env.XDG_CONFIG_HOME;
  if (typeof process.env.HOME === "string") env.HOME = process.env.HOME;
  return env;
}

export async function resolveDefaultGithubRepo(cwd: string): Promise<string> {
  const { stdout } = await execFileAsyncRaw("git", ["remote", "get-url", "origin"], {
    cwd,
    env: gitEnv(),
    maxBuffer: 10 * 1024 * 1024,
  });
  const repo = parseGithubRepoFromRemoteUrl(stdout);
  if (!repo) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: "Could not derive GitHub owner/repo from git remote origin.",
    });
  }
  return repo;
}

export async function runGhApiJson<T>(cwd: string, args: string[]): Promise<T> {
  const { stdout } = await withGhTransportRetry(
    () =>
      execFileAsyncRaw("gh", ["api", ...args], {
        cwd,
        env: ghEnv(),
        maxBuffer: 10 * 1024 * 1024,
      }),
    {
      label: `running gh api ${args[0] ?? ""}`,
    },
  );
  return JSON.parse(stdout) as T;
}

export async function runGhApiNoOutput(cwd: string, args: string[]): Promise<void> {
  await withGhTransportRetry(
    () =>
      execFileAsyncRaw("gh", ["api", ...args], {
        cwd,
        env: ghEnv(),
        maxBuffer: 10 * 1024 * 1024,
      }),
    {
      label: `running gh api ${args[0] ?? ""}`,
    },
  );
}

export function isGhNotFound(err: unknown): boolean {
  return /\b404\b/.test(normalizeGhTransportError(err));
}
