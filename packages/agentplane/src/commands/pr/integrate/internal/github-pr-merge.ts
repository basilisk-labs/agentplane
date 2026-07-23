import { execFileAsync } from "@agentplaneorg/core/process";

import { exitCodeForError } from "../../../../cli/exit-codes.js";
import { CliError } from "../../../../shared/errors.js";
import { isDotEnvLoadedKey } from "../../../../shared/env.js";
import { normalizeGhTransportError, resolveGhCommand } from "../../../shared/gh-transport.js";
import {
  checkGithubUnresolvedReviewThreads,
  throwIfGithubReviewThreadsUnresolved,
} from "../../internal/github-review-threads.js";
import { ghEnv, resolveDefaultGithubRepo } from "../../internal/gh-api.js";

type GithubPrRef = {
  owner: string;
  repo: string;
  number: number;
};

type GithubToken = {
  source: "GH_TOKEN" | "GITHUB_TOKEN";
  token: string;
};

type ProtectedBaseGithubMergeResult = {
  status: "merged";
  detail: string;
};

type PreMutationGuard = () => Promise<void>;

class PreMutationGuardFailure extends Error {
  readonly originalError: Error;

  constructor(error: unknown) {
    const originalError = error instanceof Error ? error : new Error(String(error));
    super(originalError.message);
    this.name = "PreMutationGuardFailure";
    this.originalError = originalError;
  }
}

const GITHUB_REST_URL = "https://api.github.com";
const GITHUB_CLI_INSTALL_HINT =
  "Install GitHub CLI yourself (macOS: `brew install gh`; Windows: `winget install --id GitHub.cli`; Linux: see `https://cli.github.com/manual/installation`), then run `gh auth login`.";

function summarizeGithubFailure(err: unknown): string {
  const text = normalizeGhTransportError(err).trim();
  return text || "unknown failure";
}

function getGithubToken(): GithubToken | null {
  if (
    typeof process.env.GH_TOKEN === "string" &&
    process.env.GH_TOKEN.trim().length > 0 &&
    !isDotEnvLoadedKey("GH_TOKEN")
  ) {
    return { source: "GH_TOKEN", token: process.env.GH_TOKEN };
  }
  if (
    typeof process.env.GITHUB_TOKEN === "string" &&
    process.env.GITHUB_TOKEN.trim().length > 0 &&
    !isDotEnvLoadedKey("GITHUB_TOKEN")
  ) {
    return { source: "GITHUB_TOKEN", token: process.env.GITHUB_TOKEN };
  }
  return null;
}

async function checkGithubCli(cwd: string): Promise<{ ok: true } | { ok: false; reason: string }> {
  const gh = resolveGhCommand();
  try {
    await execFileAsync(gh.command, [...gh.argsPrefix, "--version"], { cwd, env: ghEnv() });
  } catch (err) {
    return {
      ok: false,
      reason: `GitHub CLI is not available: ${summarizeGithubFailure(err)}. ${GITHUB_CLI_INSTALL_HINT}`,
    };
  }
  try {
    await execFileAsync(
      gh.command,
      [...gh.argsPrefix, "auth", "status", "--hostname", "github.com"],
      {
        cwd,
        env: ghEnv(),
      },
    );
  } catch (err) {
    return {
      ok: false,
      reason: `GitHub CLI auth is not ready: ${summarizeGithubFailure(err)}. Run \`gh auth login\` or provide an explicit GH_TOKEN/GITHUB_TOKEN for the API fallback.`,
    };
  }
  return { ok: true };
}

async function runGhCliMerge(opts: {
  gitRoot: string;
  prTarget: string;
  expectedHeadSha: string;
  preMutationGuard: PreMutationGuard;
}): Promise<ProtectedBaseGithubMergeResult> {
  const cli = await checkGithubCli(opts.gitRoot);
  if (!cli.ok) throw new Error(cli.reason);
  const gh = resolveGhCommand();
  const pr = await resolveGithubPrRef(opts);
  const endpoint = `repos/${pr.owner}/${pr.repo}/pulls/${pr.number}/merge`;

  let directRebaseErr: unknown = null;
  await runPreMutationGuard(opts.preMutationGuard);
  try {
    const { stdout } = await execFileAsync(
      gh.command,
      [
        ...gh.argsPrefix,
        "api",
        "-X",
        "PUT",
        endpoint,
        "-f",
        "merge_method=rebase",
        "-f",
        `sha=${opts.expectedHeadSha}`,
      ],
      {
        cwd: opts.gitRoot,
        env: ghEnv(),
      },
    );
    assertImmediateMergeReceipt(stdout, "gh api rebase merge");
    return {
      status: "merged",
      detail: `GitHub PR rebase-merged immediately with gh api: ${opts.prTarget}`,
    };
  } catch (directErr) {
    directRebaseErr = directErr;
  }

  await runPreMutationGuard(opts.preMutationGuard);
  try {
    const { stdout } = await execFileAsync(
      gh.command,
      [
        ...gh.argsPrefix,
        "api",
        "-X",
        "PUT",
        endpoint,
        "-f",
        "merge_method=merge",
        "-f",
        `sha=${opts.expectedHeadSha}`,
      ],
      {
        cwd: opts.gitRoot,
        env: ghEnv(),
      },
    );
    assertImmediateMergeReceipt(stdout, "gh api merge");
    return {
      status: "merged",
      detail: `GitHub PR merged immediately with gh api fallback: ${opts.prTarget}`,
    };
  } catch (directErr) {
    throw new Error(
      `gh direct_rebase=${summarizeGithubFailure(directRebaseErr)}; gh direct_merge=${summarizeGithubFailure(directErr)}`,
    );
  }
}

async function runPreMutationGuard(preMutationGuard: PreMutationGuard): Promise<void> {
  try {
    await preMutationGuard();
  } catch (error) {
    throw new PreMutationGuardFailure(error);
  }
}

function throwOriginalPreMutationGuardFailure(error: unknown): void {
  if (error instanceof PreMutationGuardFailure) {
    throw error.originalError;
  }
}

function assertImmediateMergeReceipt(stdout: string, label: string): void {
  let parsed: { merged?: unknown; message?: unknown };
  try {
    parsed = JSON.parse(stdout) as { merged?: unknown; message?: unknown };
  } catch {
    throw new Error(`${label} returned an invalid JSON receipt`);
  }
  if (parsed.merged !== true) {
    throw new Error(
      `${label} did not confirm an immediate merge: ${
        typeof parsed.message === "string" ? parsed.message : "merged=true is missing"
      }`,
    );
  }
}

function parseGithubPrUrl(value: string): GithubPrRef | null {
  const match = /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/pull\/([1-9]\d*)\/?$/.exec(value.trim());
  if (!match) return null;
  return { owner: match[1] ?? "", repo: match[2] ?? "", number: Number(match[3]) };
}

async function resolveGithubPrRef(opts: {
  gitRoot: string;
  prTarget: string;
}): Promise<GithubPrRef> {
  const urlRef = parseGithubPrUrl(opts.prTarget);
  if (urlRef) return urlRef;
  if (!/^[1-9]\d*$/.test(opts.prTarget.trim())) {
    throw new Error(`Cannot resolve GitHub PR target for API fallback: ${opts.prTarget}`);
  }
  const repoSlug = await resolveDefaultGithubRepo(opts.gitRoot);
  const [owner, repo] = repoSlug.split("/");
  if (!owner || !repo) throw new Error(`Cannot resolve GitHub repository: ${repoSlug}`);
  return { owner, repo, number: Number(opts.prTarget.trim()) };
}

async function readJsonResponse<T>(response: Response, label: string): Promise<T> {
  const body = await response.text();
  if (!response.ok) {
    throw new Error(
      `${label} failed (${response.status} ${response.statusText}): ${body.slice(0, 500)}`,
    );
  }
  return (body.trim().length > 0 ? JSON.parse(body) : {}) as T;
}

async function githubRestJson<T>(opts: {
  token: GithubToken;
  method: "PUT";
  path: string;
  body: Record<string, unknown>;
}): Promise<T> {
  const response = await fetch(`${GITHUB_REST_URL}${opts.path}`, {
    method: opts.method,
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${opts.token.token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(opts.body),
  });
  return await readJsonResponse<T>(response, "GitHub REST");
}

async function runGithubApiMerge(opts: {
  gitRoot: string;
  prTarget: string;
  expectedHeadSha: string;
  preMutationGuard: PreMutationGuard;
}): Promise<ProtectedBaseGithubMergeResult> {
  const token = getGithubToken();
  if (!token) {
    throw new Error(
      "No explicit GH_TOKEN or GITHUB_TOKEN is available for the GitHub API fallback.",
    );
  }
  const pr = await resolveGithubPrRef(opts);
  const ownerRepo = `${pr.owner}/${pr.repo}`;
  let directRebaseErr: unknown = null;
  await runPreMutationGuard(opts.preMutationGuard);
  try {
    const receipt = await githubRestJson<{ merged?: unknown; message?: unknown }>({
      token,
      method: "PUT",
      path: `/repos/${encodeURIComponent(pr.owner)}/${encodeURIComponent(pr.repo)}/pulls/${pr.number}/merge`,
      body: { merge_method: "rebase", sha: opts.expectedHeadSha },
    });
    if (receipt.merged !== true) {
      throw new Error(
        `GitHub REST rebase merge did not confirm merged=true: ${
          typeof receipt.message === "string" ? receipt.message : "missing receipt"
        }`,
      );
    }
    return {
      status: "merged",
      detail: `GitHub PR rebase-merged through GitHub API: ${ownerRepo}#${pr.number}`,
    };
  } catch (directErr) {
    directRebaseErr = directErr;
  }

  await runPreMutationGuard(opts.preMutationGuard);
  try {
    const receipt = await githubRestJson<{ merged?: unknown; message?: unknown }>({
      token,
      method: "PUT",
      path: `/repos/${encodeURIComponent(pr.owner)}/${encodeURIComponent(pr.repo)}/pulls/${pr.number}/merge`,
      body: { merge_method: "merge", sha: opts.expectedHeadSha },
    });
    if (receipt.merged !== true) {
      throw new Error(
        `GitHub REST merge did not confirm merged=true: ${
          typeof receipt.message === "string" ? receipt.message : "missing receipt"
        }`,
      );
    }
    return {
      status: "merged",
      detail: `GitHub PR merged through GitHub API fallback: ${ownerRepo}#${pr.number}`,
    };
  } catch (directErr) {
    throw new Error(
      `api direct_rebase=${summarizeGithubFailure(directRebaseErr)}; api direct_merge=${summarizeGithubFailure(directErr)}`,
    );
  }
}

export async function runProtectedBaseGithubMerge(opts: {
  gitRoot: string;
  prTarget: string;
  expectedHeadSha: string;
  preMutationGuard: PreMutationGuard;
}): Promise<ProtectedBaseGithubMergeResult> {
  const prNumber = /^[1-9]\d*$/.test(opts.prTarget.trim())
    ? Number(opts.prTarget.trim())
    : (parseGithubPrUrl(opts.prTarget)?.number ?? null);
  const reviewThreads = await checkGithubUnresolvedReviewThreads({
    gitRoot: opts.gitRoot,
    prNumber,
  });
  if (!reviewThreads.checked || prNumber === null) {
    throw new CliError({
      exitCode: exitCodeForError("E_NETWORK"),
      code: "E_NETWORK",
      message:
        "GitHub review-thread state is unavailable; refusing exact-head merge until it can be checked",
      context: {
        reason_code: "github_review_threads_unavailable",
        pr_target: opts.prTarget,
      },
    });
  }
  throwIfGithubReviewThreadsUnresolved({
    prNumber,
    unresolved: reviewThreads.unresolved,
  });

  const failures: string[] = [];
  try {
    return await runGhCliMerge(opts);
  } catch (err) {
    throwOriginalPreMutationGuardFailure(err);
    failures.push(summarizeGithubFailure(err));
  }
  try {
    return await runGithubApiMerge(opts);
  } catch (err) {
    throwOriginalPreMutationGuardFailure(err);
    failures.push(summarizeGithubFailure(err));
  }
  throw new CliError({
    exitCode: exitCodeForError("E_HANDOFF"),
    code: "E_HANDOFF",
    message:
      "Unable to drive the branch_pr GitHub PR merge route automatically. " +
      `Transports tried: ${failures.join("; ")}`,
  });
}
