import { execFileAsync } from "@agentplaneorg/core/process";
import {
  isTransientGhTransportError,
  normalizeGhTransportError,
  withGhTransportRetry,
} from "../../shared/gh-transport.js";
import { ghEnv } from "./gh-api.js";

type GithubPullLookupRecord = {
  number?: number;
  html_url?: string | null;
  state?: string | null;
  merged_at?: string | null;
  merge_commit_sha?: string | null;
  head?: {
    ref?: string | null;
    sha?: string | null;
  } | null;
  base?: {
    ref?: string | null;
  } | null;
};

export type ObservedGithubPr = {
  prNumber: number;
  prUrl: string | null;
  status: "OPEN" | "CLOSED" | "MERGED";
  mergedAt: string | null;
  mergeCommit: string | null;
  base: string | null;
  headSha: string | null;
};

function parseGithubRepoFromRemoteUrl(remoteUrl: string): string | null {
  const trimmed = remoteUrl.trim();
  if (!trimmed) return null;
  const httpsMatch = /^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/.exec(trimmed);
  if (httpsMatch) return `${httpsMatch[1]}/${httpsMatch[2]}`;
  const sshMatch = /^git@github\.com:([^/]+)\/([^/]+?)(?:\.git)?$/.exec(trimmed);
  if (sshMatch) return `${sshMatch[1]}/${sshMatch[2]}`;
  return null;
}

async function resolveGithubRepoFromOrigin(gitRoot: string): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("git", ["remote", "get-url", "origin"], {
      cwd: gitRoot,
      env: process.env,
    });
    return parseGithubRepoFromRemoteUrl(stdout);
  } catch {
    return null;
  }
}

function normalizeObservedGithubPr(record: GithubPullLookupRecord): ObservedGithubPr | null {
  const number = Number(record.number);
  if (!Number.isInteger(number) || number <= 0) return null;
  const state = record.state?.trim().toLowerCase() ?? "";
  const mergedAt = record.merged_at?.trim() ?? null;
  const status =
    mergedAt && mergedAt.length > 0
      ? "MERGED"
      : state === "open"
        ? "OPEN"
        : state === "closed"
          ? "CLOSED"
          : null;
  if (!status) return null;
  const prUrl = record.html_url?.trim() ?? null;
  const mergeCommit = record.merge_commit_sha?.trim() ?? null;
  const base = record.base?.ref?.trim() ?? null;
  const headSha = record.head?.sha?.trim() ?? null;
  return {
    prNumber: number,
    prUrl,
    status,
    mergedAt,
    mergeCommit,
    base,
    headSha,
  };
}

export async function tryLookupExistingGithubPrByBranch(opts: {
  gitRoot: string;
  branch: string;
  baseBranch?: string | null;
}): Promise<ObservedGithubPr | null> {
  const repo = await resolveGithubRepoFromOrigin(opts.gitRoot);
  if (!repo) return null;
  const owner = repo.split("/")[0]?.trim() ?? "";
  if (!owner) return null;

  const query = new URLSearchParams({ state: "all", head: `${owner}:${opts.branch}` });
  const baseBranch = opts.baseBranch?.trim() ?? "";
  if (baseBranch) query.set("base", baseBranch);
  const endpoint = `repos/${repo}/pulls?${query.toString()}`;

  try {
    const { stdout } = await withGhTransportRetry(
      () =>
        execFileAsync("gh", ["api", endpoint], {
          cwd: opts.gitRoot,
          env: ghEnv(),
          maxBuffer: 10 * 1024 * 1024,
        }),
      { label: `running gh api ${endpoint}` },
    );
    const parsed = JSON.parse(stdout) as GithubPullLookupRecord[];
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    for (const record of parsed) {
      const observed = normalizeObservedGithubPr(record);
      if (observed) return observed;
    }
    return null;
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return null;
    const message = normalizeGhTransportError(err);
    if (message.trim().length > 0) return null;
    return null;
  }
}

export async function tryLookupExistingGithubPrByBranchPrefix(opts: {
  gitRoot: string;
  branchPrefix: string;
  baseBranch?: string | null;
}): Promise<ObservedGithubPr | null> {
  const repo = await resolveGithubRepoFromOrigin(opts.gitRoot);
  if (!repo) return null;
  const query = new URLSearchParams({ state: "all", per_page: "100" });
  const baseBranch = opts.baseBranch?.trim() ?? "";
  if (baseBranch) query.set("base", baseBranch);
  const endpoint = `repos/${repo}/pulls?${query.toString()}`;
  const branchPrefix = opts.branchPrefix.trim();
  if (!branchPrefix) return null;

  try {
    const { stdout } = await withGhTransportRetry(
      () =>
        execFileAsync("gh", ["api", endpoint], {
          cwd: opts.gitRoot,
          env: ghEnv(),
          maxBuffer: 10 * 1024 * 1024,
        }),
      { label: `running gh api ${endpoint}` },
    );
    const parsed = JSON.parse(stdout) as GithubPullLookupRecord[];
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    for (const record of parsed) {
      const headRef = record.head && "ref" in record.head ? String(record.head.ref ?? "") : "";
      if (!headRef.startsWith(branchPrefix)) continue;
      const observed = normalizeObservedGithubPr(record);
      if (observed?.status === "OPEN" || observed?.status === "MERGED") return observed;
    }
    return null;
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return null;
    const message = normalizeGhTransportError(err);
    if (message.trim().length > 0) return null;
    return null;
  }
}

export function formatGithubPrLink(
  prNumber: number,
  prUrl: string | null,
  verb: "linked to" | "created",
): string {
  return prUrl?.trim()
    ? `${verb} GitHub PR #${prNumber}: ${prUrl.trim()}`
    : `${verb} GitHub PR #${prNumber}`;
}

export function shouldPersistObservedGithubPrIdentity(observed: ObservedGithubPr | null): boolean {
  return observed?.status === "MERGED";
}

export function formatUnpublishedRemoteHeadReason(branch: string): string {
  return (
    `task branch ${branch} is not yet published on origin; push it with ` +
    `\`git push -u origin ${branch}\` and rerun \`agentplane pr open\``
  );
}

function isMissingRemoteHeadCreateError(err: unknown): boolean {
  const text = normalizeGhTransportError(err);
  if (!/\b422\b/i.test(text)) return false;
  return (
    /head sha/i.test(text) ||
    /head ref/i.test(text) ||
    /head.*must be a branch/i.test(text) ||
    /head.*not found/i.test(text) ||
    /field["']?\s*:\s*["']head["']/i.test(text) ||
    /field\s+head\b/i.test(text) ||
    /no commits between/i.test(text)
  );
}

function summarizeGithubPrCreateFailure(err: unknown): string {
  const text = normalizeGhTransportError(err);
  if ((err as { code?: string } | null)?.code === "ENOENT") {
    return "gh CLI is unavailable";
  }
  if (
    /authentication required/i.test(text) ||
    /not logged into github/i.test(text) ||
    /bad credentials/i.test(text) ||
    /permission denied/i.test(text) ||
    /\b401\b/i.test(text) ||
    /\b403\b/i.test(text)
  ) {
    return "GitHub auth or permissions unavailable";
  }
  if (isTransientGhTransportError(err)) {
    return "GitHub transport failed; retry `agentplane pr open`";
  }
  return "GitHub PR creation failed";
}

export async function tryCreateGithubPr(opts: {
  gitRoot: string;
  branch: string;
  baseBranch: string | null;
  title: string;
  body: string;
}): Promise<{
  observed: ObservedGithubPr | null;
  stagedReason: string | null;
  artifactState: "remote_staged" | "remote_failed" | null;
}> {
  const repo = await resolveGithubRepoFromOrigin(opts.gitRoot);
  if (!repo) {
    return {
      observed: null,
      stagedReason: "GitHub origin repo unavailable",
      artifactState: "remote_staged",
    };
  }
  const baseBranch = opts.baseBranch?.trim() ?? "";
  if (!baseBranch) {
    return {
      observed: null,
      stagedReason: "base branch unresolved",
      artifactState: "remote_staged",
    };
  }
  try {
    const { stdout } = await withGhTransportRetry(
      () =>
        execFileAsync(
          "gh",
          [
            "api",
            `repos/${repo}/pulls`,
            "-X",
            "POST",
            "-f",
            `title=${opts.title}`,
            "-f",
            `body=${opts.body}`,
            "-f",
            `head=${opts.branch}`,
            "-f",
            `base=${baseBranch}`,
          ],
          {
            cwd: opts.gitRoot,
            env: ghEnv(),
            maxBuffer: 10 * 1024 * 1024,
          },
        ),
      { label: `running gh api repos/${repo}/pulls` },
    );
    return {
      observed: normalizeObservedGithubPr(JSON.parse(stdout) as GithubPullLookupRecord),
      stagedReason: null,
      artifactState: null,
    };
  } catch (err) {
    if (isMissingRemoteHeadCreateError(err)) {
      return {
        observed: null,
        stagedReason: formatUnpublishedRemoteHeadReason(opts.branch),
        artifactState: "remote_staged",
      };
    }
    return {
      observed: null,
      stagedReason: summarizeGithubPrCreateFailure(err),
      artifactState: "remote_failed",
    };
  }
}
