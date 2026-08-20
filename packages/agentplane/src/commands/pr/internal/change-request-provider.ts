import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { normalizeGhTransportError } from "../../shared/gh-transport.js";
import { CliError } from "../../../shared/errors.js";
import type {
  ChangeRequestLookupResult,
  ChangeRequestMutationResult,
  ObservedChangeRequest,
} from "./change-request-model.js";
import {
  resolveGitHostIdentity,
  type GitHostIdentity,
  type RecordedGitHostIdentity,
} from "./git-host-identity.js";
import { runGhApiJson } from "./gh-api.js";
import {
  observeExistingGithubPrByBranch,
  observeExistingGithubPrByNumber,
  shouldPersistObservedGithubPrIdentity,
  tryCreateGithubPr,
  type GithubPrLookupResult,
  type ObservedGithubPr,
} from "./sync-github.js";
import {
  observeExistingGitLabMrByBranch,
  observeExistingGitLabMrByNumber,
  tryCreateGitLabMr,
  tryUpdateGitLabMr,
} from "./sync-gitlab.js";

function normalizeGithubObservation(
  identity: GitHostIdentity,
  observed: ObservedGithubPr,
): ObservedChangeRequest {
  return {
    ...observed,
    provider: "github",
    identity,
  };
}

function normalizeGithubLookup(
  identity: GitHostIdentity,
  lookup: GithubPrLookupResult,
): ChangeRequestLookupResult {
  return lookup.state === "found"
    ? { state: "found", pr: normalizeGithubObservation(identity, lookup.pr) }
    : lookup;
}

export async function resolveChangeRequestIdentity(opts: {
  gitRoot: string;
  branch: string;
  recorded?: RecordedGitHostIdentity | null;
}): Promise<GitHostIdentity> {
  return resolveGitHostIdentity(opts);
}

async function resolveLookupIdentity(opts: {
  gitRoot: string;
  branch: string;
  recorded?: RecordedGitHostIdentity | null;
}): Promise<{ identity: GitHostIdentity } | { unavailable: string }> {
  try {
    return { identity: await resolveChangeRequestIdentity(opts) };
  } catch (error) {
    if (error instanceof CliError && error.context?.reason_code === "git_host_identity_drift") {
      throw error;
    }
    return {
      unavailable:
        error instanceof Error ? error.message : "Git host identity could not be resolved",
    };
  }
}

export async function observeExistingChangeRequestByBranch(opts: {
  gitRoot: string;
  branch: string;
  baseBranch?: string | null;
  requireUnique?: boolean;
  identity?: GitHostIdentity;
  recorded?: RecordedGitHostIdentity | null;
}): Promise<ChangeRequestLookupResult> {
  const resolution = opts.identity
    ? { identity: opts.identity }
    : await resolveLookupIdentity({
        gitRoot: opts.gitRoot,
        branch: opts.branch,
        recorded: opts.recorded,
      });
  if ("unavailable" in resolution) {
    return { state: "unavailable", reason: resolution.unavailable };
  }
  const { identity } = resolution;
  if (identity.provider === "gitlab") {
    return observeExistingGitLabMrByBranch({ ...opts, identity });
  }
  return normalizeGithubLookup(
    identity,
    await observeExistingGithubPrByBranch({ ...opts, identity }),
  );
}

export async function observeExistingChangeRequestByNumber(opts: {
  gitRoot: string;
  branch: string;
  baseBranch?: string | null;
  prNumber: number;
  identity?: GitHostIdentity;
  recorded?: RecordedGitHostIdentity | null;
}): Promise<ChangeRequestLookupResult> {
  const resolution = opts.identity
    ? { identity: opts.identity }
    : await resolveLookupIdentity({
        gitRoot: opts.gitRoot,
        branch: opts.branch,
        recorded: opts.recorded,
      });
  if ("unavailable" in resolution) {
    return { state: "unavailable", reason: resolution.unavailable };
  }
  const { identity } = resolution;
  if (identity.provider === "gitlab") {
    return observeExistingGitLabMrByNumber({ ...opts, identity });
  }
  return normalizeGithubLookup(
    identity,
    await observeExistingGithubPrByNumber({ ...opts, identity }),
  );
}

export async function tryLookupExistingChangeRequestByBranch(opts: {
  gitRoot: string;
  branch: string;
  baseBranch?: string | null;
  identity?: GitHostIdentity;
  recorded?: RecordedGitHostIdentity | null;
}): Promise<ObservedChangeRequest | null> {
  try {
    const result = await observeExistingChangeRequestByBranch(opts);
    return result.state === "found" ? result.pr : null;
  } catch {
    return null;
  }
}

export function shouldPersistObservedChangeRequestIdentity(
  observed: ObservedChangeRequest | null,
): boolean {
  return (
    observed !== null &&
    shouldPersistObservedGithubPrIdentity({
      ...observed,
      mergeability: observed.mergeability,
    })
  );
}

export function formatChangeRequestLink(
  observed: Pick<ObservedChangeRequest, "provider" | "prNumber" | "prUrl">,
  verb: "linked to" | "created" | "updated",
): string {
  const label = observed.provider === "gitlab" ? "GitLab MR" : "GitHub PR";
  return observed.prUrl?.trim()
    ? `${verb} ${label} #${observed.prNumber}: ${observed.prUrl.trim()}`
    : `${verb} ${label} #${observed.prNumber}`;
}

function githubMutationFailure(
  error: unknown,
): Pick<ChangeRequestMutationResult, "stagedReason" | "artifactState"> {
  const message = normalizeGhTransportError(error);
  if ((error as { code?: string } | null)?.code === "ENOENT") {
    return { stagedReason: "gh CLI is unavailable", artifactState: "remote_failed" };
  }
  if (/\b401\b|\b403\b|authentication|not logged|permission denied/i.test(message)) {
    return {
      stagedReason: "GitHub auth or permissions unavailable",
      artifactState: "remote_failed",
    };
  }
  return {
    stagedReason: message ? `GitHub PR mutation failed: ${message}` : "GitHub PR mutation failed",
    artifactState: "remote_failed",
  };
}

async function withJsonPayload<T>(
  label: string,
  payload: Record<string, unknown>,
  run: (payloadPath: string) => Promise<T>,
): Promise<T> {
  const directory = await mkdtemp(path.join(os.tmpdir(), `agentplane-${label}-`));
  const payloadPath = path.join(directory, "payload.json");
  try {
    await writeFile(payloadPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
    return await run(payloadPath);
  } finally {
    await rm(directory, { recursive: true, force: true }).catch(() => null);
  }
}

export async function tryCreateChangeRequest(opts: {
  gitRoot: string;
  branch: string;
  baseBranch: string | null;
  title: string;
  body: string;
  identity: GitHostIdentity;
}): Promise<ChangeRequestMutationResult> {
  if (opts.identity.provider === "gitlab") return tryCreateGitLabMr(opts);
  const created = await tryCreateGithubPr(opts);
  if (created.observed) {
    return {
      observed: normalizeGithubObservation(opts.identity, created.observed),
      stagedReason: null,
      artifactState: null,
    };
  }
  const recovered = await observeExistingGithubPrByBranch({
    gitRoot: opts.gitRoot,
    branch: opts.branch,
    baseBranch: opts.baseBranch,
    identity: opts.identity,
  });
  if (recovered.state === "found") {
    return {
      observed: normalizeGithubObservation(opts.identity, recovered.pr),
      stagedReason: null,
      artifactState: null,
    };
  }
  return {
    observed: null,
    stagedReason: created.stagedReason,
    artifactState: created.artifactState,
  };
}

export async function tryUpdateChangeRequest(opts: {
  gitRoot: string;
  identity: GitHostIdentity;
  observed: ObservedChangeRequest;
  title: string;
  body: string;
}): Promise<ChangeRequestMutationResult> {
  if (opts.identity.provider === "gitlab") return tryUpdateGitLabMr(opts);
  if (opts.observed.status !== "OPEN") {
    return { observed: opts.observed, stagedReason: null, artifactState: null };
  }
  try {
    await withJsonPayload(
      "github-pr-update",
      { title: opts.title, body: opts.body },
      (payloadPath) =>
        runGhApiJson<Record<string, unknown>>(opts.gitRoot, [
          `repos/${opts.identity.targetProject}/pulls/${opts.observed.prNumber}`,
          "-X",
          "PATCH",
          "--input",
          payloadPath,
        ]),
    );
    const refreshed = await observeExistingChangeRequestByNumber({
      gitRoot: opts.gitRoot,
      branch: opts.observed.headRef ?? "",
      baseBranch: opts.observed.base,
      prNumber: opts.observed.prNumber,
      identity: opts.identity,
    });
    return refreshed.state === "found"
      ? { observed: refreshed.pr, stagedReason: null, artifactState: null }
      : {
          observed: null,
          stagedReason: "GitHub PR update could not be confirmed",
          artifactState: "remote_failed",
        };
  } catch (error) {
    const recovered = await observeExistingChangeRequestByNumber({
      gitRoot: opts.gitRoot,
      branch: opts.observed.headRef ?? "",
      baseBranch: opts.observed.base,
      prNumber: opts.observed.prNumber,
      identity: opts.identity,
    }).catch(() => null);
    return {
      observed: recovered?.state === "found" ? recovered.pr : null,
      ...githubMutationFailure(error),
    };
  }
}
