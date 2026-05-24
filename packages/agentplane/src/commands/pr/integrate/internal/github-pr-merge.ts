import { execFileAsync } from "@agentplaneorg/core/process";

import { exitCodeForError } from "../../../../cli/exit-codes.js";
import { CliError } from "../../../../shared/errors.js";
import { isDotEnvLoadedKey } from "../../../../shared/env.js";
import { normalizeGhTransportError } from "../../../shared/gh-transport.js";
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

type GithubGraphqlResponse<T> = {
  data?: T;
  errors?: { message?: string }[];
};

type ProtectedBaseGithubMergeResult = {
  status: "merged" | "auto_merge_enabled";
  detail: string;
};

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const GITHUB_REST_URL = "https://api.github.com";
const GITHUB_CLI_INSTALL_HINT =
  "Install GitHub CLI yourself (macOS: `brew install gh`; Windows: `winget install --id GitHub.cli`; Linux: see `https://cli.github.com/manual/installation`), then run `gh auth login`.";

function summarizeGithubFailure(err: unknown): string {
  const text = normalizeGhTransportError(err).trim();
  return text || "unknown failure";
}

function isAlreadyMergedGithubPrFailure(err: unknown): boolean {
  const text = summarizeGithubFailure(err).toLowerCase();
  return /\bpull request\b/.test(text) && /\balready merged\b/.test(text);
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
  try {
    await execFileAsync("gh", ["--version"], { cwd, env: ghEnv() });
  } catch (err) {
    return {
      ok: false,
      reason: `GitHub CLI is not available: ${summarizeGithubFailure(err)}. ${GITHUB_CLI_INSTALL_HINT}`,
    };
  }
  try {
    await execFileAsync("gh", ["auth", "status", "--hostname", "github.com"], {
      cwd,
      env: ghEnv(),
    });
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
}): Promise<ProtectedBaseGithubMergeResult> {
  const cli = await checkGithubCli(opts.gitRoot);
  if (!cli.ok) throw new Error(cli.reason);
  let autoRebaseErr: unknown = null;
  try {
    await execFileAsync(
      "gh",
      ["pr", "merge", "--auto", "--rebase", "--delete-branch", opts.prTarget],
      {
        cwd: opts.gitRoot,
        env: ghEnv(),
      },
    );
    return {
      status: "auto_merge_enabled",
      detail: `GitHub PR merge queued with gh --auto --rebase: ${opts.prTarget}`,
    };
  } catch (autoErr) {
    autoRebaseErr = autoErr;
  }

  let directRebaseErr: unknown = null;
  try {
    await execFileAsync("gh", ["pr", "merge", "--rebase", "--delete-branch", opts.prTarget], {
      cwd: opts.gitRoot,
      env: ghEnv(),
    });
    return {
      status: "merged",
      detail: `GitHub PR merged with gh --rebase: ${opts.prTarget}`,
    };
  } catch (directErr) {
    if (isAlreadyMergedGithubPrFailure(directErr)) {
      return {
        status: "merged",
        detail: `GitHub PR was already merged with gh --rebase: ${opts.prTarget}`,
      };
    }
    directRebaseErr = directErr;
  }

  try {
    await execFileAsync(
      "gh",
      ["pr", "merge", "--auto", "--merge", "--delete-branch", opts.prTarget],
      {
        cwd: opts.gitRoot,
        env: ghEnv(),
      },
    );
    return {
      status: "auto_merge_enabled",
      detail: `GitHub PR merge queued with gh --auto --merge fallback: ${opts.prTarget}`,
    };
  } catch (autoMergeErr) {
    try {
      await execFileAsync("gh", ["pr", "merge", "--merge", "--delete-branch", opts.prTarget], {
        cwd: opts.gitRoot,
        env: ghEnv(),
      });
      return {
        status: "merged",
        detail: `GitHub PR merged with gh --merge fallback: ${opts.prTarget}`,
      };
    } catch (directErr) {
      if (isAlreadyMergedGithubPrFailure(directErr)) {
        return {
          status: "merged",
          detail: `GitHub PR was already merged with gh --merge fallback: ${opts.prTarget}`,
        };
      }
      throw new Error(
        `gh auto_rebase=${summarizeGithubFailure(autoRebaseErr)}; gh direct_rebase=${summarizeGithubFailure(directRebaseErr)}; gh auto_merge=${summarizeGithubFailure(autoMergeErr)}; gh direct_merge=${summarizeGithubFailure(directErr)}`,
      );
    }
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

async function githubGraphql<T>(opts: {
  token: GithubToken;
  query: string;
  variables: Record<string, unknown>;
}): Promise<T> {
  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      accept: "application/vnd.github+json",
      authorization: `Bearer ${opts.token.token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ query: opts.query, variables: opts.variables }),
  });
  const payload = await readJsonResponse<GithubGraphqlResponse<T>>(response, "GitHub GraphQL");
  if (payload.errors && payload.errors.length > 0) {
    throw new Error(
      `GitHub GraphQL errors: ${payload.errors
        .map((error) => error.message ?? "unknown error")
        .join("; ")}`,
    );
  }
  if (!payload.data) throw new Error("GitHub GraphQL returned no data");
  return payload.data;
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
}): Promise<ProtectedBaseGithubMergeResult> {
  const token = getGithubToken();
  if (!token) {
    throw new Error(
      "No explicit GH_TOKEN or GITHUB_TOKEN is available for the GitHub API fallback.",
    );
  }
  const pr = await resolveGithubPrRef(opts);
  const ownerRepo = `${pr.owner}/${pr.repo}`;
  let pullRequestId: string | null = null;
  let autoRebaseErr: unknown = null;
  try {
    const data = await githubGraphql<{
      repository?: { pullRequest?: { id?: string } | null } | null;
    }>({
      token,
      query:
        "query($owner:String!,$repo:String!,$number:Int!){repository(owner:$owner,name:$repo){pullRequest(number:$number){id}}}",
      variables: { owner: pr.owner, repo: pr.repo, number: pr.number },
    });
    const resolvedPullRequestId = data.repository?.pullRequest?.id?.trim() ?? "";
    pullRequestId = resolvedPullRequestId.length > 0 ? resolvedPullRequestId : null;
    if (!pullRequestId) throw new Error(`GitHub PR #${pr.number} was not found in ${ownerRepo}`);
    await githubGraphql({
      token,
      query:
        "mutation($pullRequestId:ID!){enablePullRequestAutoMerge(input:{pullRequestId:$pullRequestId,mergeMethod:REBASE}){pullRequest{number}}}",
      variables: { pullRequestId },
    });
    return {
      status: "auto_merge_enabled",
      detail: `GitHub PR rebase merge queued through GitHub API auto-merge: ${ownerRepo}#${pr.number}`,
    };
  } catch (autoErr) {
    autoRebaseErr = autoErr;
  }

  let directRebaseErr: unknown = null;
  try {
    await githubRestJson({
      token,
      method: "PUT",
      path: `/repos/${encodeURIComponent(pr.owner)}/${encodeURIComponent(pr.repo)}/pulls/${pr.number}/merge`,
      body: { merge_method: "rebase" },
    });
    return {
      status: "merged",
      detail: `GitHub PR rebase-merged through GitHub API: ${ownerRepo}#${pr.number}`,
    };
  } catch (directErr) {
    directRebaseErr = directErr;
  }

  let autoMergeErr: unknown = null;
  if (pullRequestId) {
    try {
      await githubGraphql({
        token,
        query:
          "mutation($pullRequestId:ID!){enablePullRequestAutoMerge(input:{pullRequestId:$pullRequestId,mergeMethod:MERGE}){pullRequest{number}}}",
        variables: { pullRequestId },
      });
      return {
        status: "auto_merge_enabled",
        detail: `GitHub PR merge queued through GitHub API auto-merge fallback: ${ownerRepo}#${pr.number}`,
      };
    } catch (err) {
      autoMergeErr = err;
    }
  } else {
    autoMergeErr = new Error(
      "skipped GitHub API auto-merge fallback because pullRequestId was not resolved",
    );
  }

  try {
    await githubRestJson({
      token,
      method: "PUT",
      path: `/repos/${encodeURIComponent(pr.owner)}/${encodeURIComponent(pr.repo)}/pulls/${pr.number}/merge`,
      body: { merge_method: "merge" },
    });
    return {
      status: "merged",
      detail: `GitHub PR merged through GitHub API fallback: ${ownerRepo}#${pr.number}`,
    };
  } catch (directErr) {
    throw new Error(
      `api auto_rebase=${summarizeGithubFailure(autoRebaseErr)}; api direct_rebase=${summarizeGithubFailure(directRebaseErr)}; api auto_merge=${summarizeGithubFailure(autoMergeErr)}; api direct_merge=${summarizeGithubFailure(directErr)}`,
    );
  }
}

export async function runProtectedBaseGithubMerge(opts: {
  gitRoot: string;
  prTarget: string;
}): Promise<ProtectedBaseGithubMergeResult> {
  const prNumber = /^[1-9]\d*$/.test(opts.prTarget.trim())
    ? Number(opts.prTarget.trim())
    : (parseGithubPrUrl(opts.prTarget)?.number ?? null);
  const reviewThreads = await checkGithubUnresolvedReviewThreads({
    gitRoot: opts.gitRoot,
    prNumber,
  });
  if (reviewThreads.checked && prNumber !== null) {
    throwIfGithubReviewThreadsUnresolved({
      prNumber,
      unresolved: reviewThreads.unresolved,
    });
  }

  const failures: string[] = [];
  try {
    return await runGhCliMerge(opts);
  } catch (err) {
    failures.push(summarizeGithubFailure(err));
  }
  try {
    return await runGithubApiMerge(opts);
  } catch (err) {
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
