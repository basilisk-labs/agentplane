import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv, gitRefreshBranchTrackingRef } from "@agentplaneorg/core/git";

import { gitBranchUpstream, gitCurrentBranch } from "../shared/git-ops.js";
import {
  observeExistingGithubPrByBranch,
  parseGithubRepoFromRemoteUrl,
} from "./internal/sync-github.js";

const GIT_OBJECT_ID_PATTERN = /^[0-9a-f]{40}(?:[0-9a-f]{24})?$/i;

async function gitResolveBranchHead(gitRoot: string, branch: string): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("git", ["rev-parse", `refs/heads/${branch}`], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    const trimmed = stdout.trim();
    return trimmed.length > 0 ? trimmed : null;
  } catch {
    return null;
  }
}

async function gitResolveRemoteBranchHead(
  gitRoot: string,
  remoteTarget: string,
  branch: string,
): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync(
      "git",
      ["ls-remote", "--heads", remoteTarget, `refs/heads/${branch}`],
      {
        cwd: gitRoot,
        env: gitEnv(),
      },
    );
    const trimmed = stdout.trim();
    if (!trimmed) return null;
    const [head] = trimmed.split(/\s+/, 1);
    return head?.trim() || null;
  } catch {
    return null;
  }
}

async function gitResolveRemotePushTarget(gitRoot: string, remote: string): Promise<string> {
  try {
    const { stdout } = await execFileAsync("git", ["remote", "get-url", "--push", remote], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    const trimmed = stdout.trim();
    return trimmed.length > 0 ? trimmed : remote;
  } catch {
    return remote;
  }
}

async function gitResolveRemoteUrls(opts: {
  gitRoot: string;
  remote: string;
}): Promise<{ fetchUrl: string; pushUrl: string } | null> {
  try {
    const [{ stdout: fetchStdout }, { stdout: pushStdout }] = await Promise.all([
      execFileAsync("git", ["remote", "get-url", "--all", opts.remote], {
        cwd: opts.gitRoot,
        env: gitEnv(),
      }),
      execFileAsync("git", ["remote", "get-url", "--push", "--all", opts.remote], {
        cwd: opts.gitRoot,
        env: gitEnv(),
      }),
    ]);
    const fetchUrls = fetchStdout
      .split(/\r?\n/)
      .map((value) => value.trim())
      .filter(Boolean);
    const pushUrls = pushStdout
      .split(/\r?\n/)
      .map((value) => value.trim())
      .filter(Boolean);
    if (fetchUrls.length !== 1 || pushUrls.length !== 1) return null;
    return { fetchUrl: fetchUrls[0]!, pushUrl: pushUrls[0]! };
  } catch {
    return null;
  }
}

async function remoteTargetsShareGithubRepository(opts: {
  gitRoot: string;
  remote: string;
}): Promise<boolean> {
  const urls = await gitResolveRemoteUrls(opts);
  if (!urls) return false;
  const fetchRepo = parseGithubRepoFromRemoteUrl(urls.fetchUrl);
  const pushRepo = parseGithubRepoFromRemoteUrl(urls.pushUrl);
  return Boolean(fetchRepo && pushRepo && fetchRepo === pushRepo);
}

async function gitSetBranchUpstream(opts: {
  gitRoot: string;
  branch: string;
  remote: string;
  remoteBranch: string;
}): Promise<void> {
  await execFileAsync("git", ["config", `branch.${opts.branch}.remote`, opts.remote], {
    cwd: opts.gitRoot,
    env: gitEnv(),
  });
  await execFileAsync(
    "git",
    ["config", `branch.${opts.branch}.merge`, `refs/heads/${opts.remoteBranch}`],
    {
      cwd: opts.gitRoot,
      env: gitEnv(),
    },
  );
}

async function resolvePublicationHeads(opts: {
  gitRoot: string;
  branch: string;
  remote: string;
}): Promise<{ localHead: string | null; remoteHead: string | null }> {
  const remoteTarget = await gitResolveRemotePushTarget(opts.gitRoot, opts.remote);
  const [localHead, remoteHead] = await Promise.all([
    gitResolveBranchHead(opts.gitRoot, opts.branch),
    gitResolveRemoteBranchHead(opts.gitRoot, remoteTarget, opts.branch),
  ]);
  return { localHead, remoteHead };
}

async function canReuseMatchingRemoteHead(opts: {
  gitRoot: string;
  branch: string;
  remote: string;
}): Promise<boolean> {
  const { localHead, remoteHead } = await resolvePublicationHeads(opts);
  return Boolean(localHead && remoteHead && localHead === remoteHead);
}

async function pushRebasedBranchWithObservedLease(opts: {
  gitRoot: string;
  branch: string;
  baseBranch: string | null;
  prNumber: number | null;
  upstream: string;
  remote: string;
}): Promise<boolean> {
  const baseBranch = opts.baseBranch?.trim() ?? "";
  if (
    !baseBranch ||
    !Number.isInteger(opts.prNumber) ||
    Number(opts.prNumber) <= 0 ||
    opts.remote !== "origin" ||
    opts.upstream !== `origin/${opts.branch}`
  ) {
    return false;
  }
  if (
    !(await remoteTargetsShareGithubRepository({
      gitRoot: opts.gitRoot,
      remote: opts.remote,
    }))
  ) {
    return false;
  }

  const observation = await observeExistingGithubPrByBranch({
    gitRoot: opts.gitRoot,
    branch: opts.branch,
    baseBranch,
  });
  if (
    observation.state !== "found" ||
    observation.pr.status !== "OPEN" ||
    observation.pr.prNumber !== opts.prNumber
  ) {
    return false;
  }

  const { localHead, remoteHead } = await resolvePublicationHeads({
    gitRoot: opts.gitRoot,
    branch: opts.branch,
    remote: opts.remote,
  });
  const observedHead = observation.pr.headSha?.trim() ?? "";
  if (
    !localHead ||
    !remoteHead ||
    localHead === remoteHead ||
    remoteHead !== observedHead ||
    !GIT_OBJECT_ID_PATTERN.test(localHead) ||
    !GIT_OBJECT_ID_PATTERN.test(remoteHead)
  ) {
    return false;
  }

  const remoteRef = `refs/heads/${opts.branch}`;
  await execFileAsync(
    "git",
    [
      "push",
      "--no-verify",
      `--force-with-lease=${remoteRef}:${remoteHead}`,
      opts.remote,
      `${localHead}:${remoteRef}`,
    ],
    {
      cwd: opts.gitRoot,
      env: gitEnv(),
    },
  );
  return true;
}

export async function pushTaskBranchUpstreamIfConfigured(opts: {
  gitRoot: string;
  branch: string;
  baseBranch?: string | null;
  prNumber?: number | null;
}): Promise<boolean> {
  const currentBranch = await gitCurrentBranch(opts.gitRoot).catch(() => "");
  if (currentBranch.trim() !== opts.branch.trim()) return false;

  const upstream = await gitBranchUpstream(opts.gitRoot, opts.branch);
  const trimmedUpstream = upstream?.trim() ?? "";
  let remote = "origin";
  if (trimmedUpstream) {
    const slashIndex = trimmedUpstream.indexOf("/");
    if (slashIndex > 0 && slashIndex < trimmedUpstream.length - 1) {
      const upstreamRemote = trimmedUpstream.slice(0, slashIndex);
      const upstreamBranch = trimmedUpstream.slice(slashIndex + 1);
      if (upstreamBranch === opts.branch) remote = upstreamRemote;
    }
  }

  try {
    try {
      await execFileAsync("git", ["remote", "get-url", remote], {
        cwd: opts.gitRoot,
        env: gitEnv(),
      });
    } catch {
      return false;
    }
    await execFileAsync(
      "git",
      ["push", "--no-verify", "-u", remote, `HEAD:refs/heads/${opts.branch}`],
      {
        cwd: opts.gitRoot,
        env: gitEnv(),
      },
    );
  } catch (err) {
    const canReuseRemote = await canReuseMatchingRemoteHead({
      gitRoot: opts.gitRoot,
      branch: opts.branch,
      remote,
    });
    if (canReuseRemote) {
      await gitSetBranchUpstream({
        gitRoot: opts.gitRoot,
        branch: opts.branch,
        remote,
        remoteBranch: opts.branch,
      });
      return true;
    }

    const publishedRebasedBranch = await pushRebasedBranchWithObservedLease({
      gitRoot: opts.gitRoot,
      branch: opts.branch,
      baseBranch: opts.baseBranch ?? null,
      prNumber: opts.prNumber ?? null,
      upstream: trimmedUpstream,
      remote,
    });
    if (!publishedRebasedBranch) throw err;
  }
  await gitRefreshBranchTrackingRef(opts.gitRoot, opts.branch);
  return true;
}
