import { setTimeout as delay } from "node:timers/promises";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv, gitProofEnv } from "@agentplaneorg/core/git";
import { CliError } from "../../shared/errors.js";
import { withGitMutationMutex } from "../../shared/git-mutation.js";
import { observeExistingChangeRequestByNumber } from "./internal/change-request-provider.js";
import { runGlabApiJson } from "./internal/glab-api.js";
import { readGitLabCurrentTargetHead } from "./internal/sync-gitlab.js";
import {
  reconcileProviderUpdateLocalHead,
  validateProviderUpdateLocalState,
} from "./provider-update-branch-local.js";
import type { ObservedChangeRequest } from "./internal/change-request-model.js";
import type { GitHostIdentity } from "./internal/git-host-identity.js";
import type {
  ProviderUpdateBranchRequest,
  ProviderUpdateBranchResult,
} from "./provider-update-branch.js";

const OID = /^(?:[a-f0-9]{40}|[a-f0-9]{64})$/u;
const TASK_ID = /^\d{12}-[A-Z0-9]{6}$/u;
type NotApplied = Extract<ProviderUpdateBranchResult, { state: "not_applied" }>;

async function git(request: ProviderUpdateBranchRequest, args: string[], proof = false) {
  const result = await execFileAsync("git", args, {
    cwd: request.worktreePath ?? request.gitRoot,
    env: proof ? gitProofEnv() : gitEnv(),
    maxBuffer: 16 * 1024 * 1024,
  });
  return result.stdout.trim();
}

function notApplied(
  reason: NotApplied["reason"],
  detail: string,
  observed: ObservedChangeRequest | null = null,
): NotApplied {
  return { state: "not_applied", reason, detail, observed };
}

export function throwGitLabUpdateEffectInDoubt(
  request: Pick<ProviderUpdateBranchRequest, "prNumber" | "expectedHeadSha" | "expectedBaseSha">,
  candidate: string | null,
  message = "GitLab update has an unproven effect. Preserve the original intent and reconcile its exact hosted head before any replacement.",
): never {
  throw new CliError({
    code: "E_RUNTIME",
    message,
    context: {
      reason_code: "provider_update_effect_in_doubt",
      pr_number: request.prNumber,
      original_head_sha: request.expectedHeadSha,
      original_base_sha: request.expectedBaseSha,
      candidate_head_sha: candidate,
    },
  });
}

async function hostedAncestor(
  request: ProviderUpdateBranchRequest,
  ancestor: string,
  descendant: string,
): Promise<boolean> {
  if (ancestor === descendant) return true;
  const query = new URLSearchParams({ "refs[]": ancestor });
  query.append("refs[]", descendant);
  const result = await runGlabApiJson<{ id?: string }>({
    cwd: request.gitRoot,
    hostname: request.identity.hostname,
    endpoint: `projects/${encodeURIComponent(request.identity.targetProject)}/repository/merge_base?${query.toString()}`,
  });
  return result.id === ancestor;
}

/** Prove the hosted H/R merge and its natural tree before adopting any local branch. */
export async function verifyGitLabProviderUpdate(opts: {
  request: ProviderUpdateBranchRequest;
  observedHeadSha: string;
  observedBaseSha: string;
  allowAdvancedBase?: boolean;
}): Promise<boolean> {
  const { request, observedHeadSha: head, observedBaseSha: base } = opts;
  if (
    request.identity.provider !== "gitlab" ||
    request.identity.sourceProject !== request.identity.targetProject ||
    !OID.test(head) ||
    !OID.test(base) ||
    head === request.expectedHeadSha
  )
    return false;
  const commit = await runGlabApiJson<{ id?: string; parent_ids?: string[] }>({
    cwd: request.gitRoot,
    hostname: request.identity.hostname,
    endpoint: `projects/${encodeURIComponent(request.identity.targetProject)}/repository/commits/${head}`,
  });
  if (
    commit.id !== head ||
    commit.parent_ids?.length !== 2 ||
    commit.parent_ids[0] !== request.expectedHeadSha ||
    commit.parent_ids[1] !== request.expectedBaseSha ||
    !(await hostedAncestor(request, request.expectedHeadSha, head)) ||
    !(await hostedAncestor(request, request.expectedBaseSha, head)) ||
    !(await hostedAncestor(request, request.expectedBaseSha, base)) ||
    (!opts.allowAdvancedBase && !(await hostedAncestor(request, base, head)))
  )
    return false;

  // Fetch immutable objects only. A moving source cannot replace a local ref here.
  await git(request, [
    "fetch",
    "--no-tags",
    "--no-prune",
    "--no-write-fetch-head",
    "--",
    request.identity.sourceUrl,
    `refs/heads/${request.branch}`,
  ]);
  const parents = await git(request, ["rev-list", "--parents", "-n", "1", head], true);
  if (parents !== `${head} ${request.expectedHeadSha} ${request.expectedBaseSha}`) return false;
  const tree = await git(request, ["rev-parse", `${head}^{tree}`], true);
  const expected = await git(
    request,
    [
      "merge-tree",
      "--write-tree",
      "--no-messages",
      request.expectedHeadSha,
      request.expectedBaseSha,
    ],
    true,
  );
  return OID.test(expected) && tree === expected;
}

async function observe(request: ProviderUpdateBranchRequest): Promise<ObservedChangeRequest> {
  const result = await observeExistingChangeRequestByNumber({
    gitRoot: request.gitRoot,
    identity: request.identity,
    prNumber: request.prNumber,
    branch: request.branch,
    baseBranch: request.baseBranch,
  });
  if (result.state !== "found") throw new Error("Exact GitLab MR observation is unavailable");
  const observed = result.pr;
  const identityKeys = [
    "provider",
    "hostname",
    "remote",
    "sourceProject",
    "targetProject",
    "sourceUrl",
    "targetUrl",
  ] as const satisfies readonly (keyof GitHostIdentity)[];
  const url = new URL(observed.prUrl ?? "");
  if (
    observed.provider !== "gitlab" ||
    !identityKeys.every((key) => observed.identity[key] === request.identity[key]) ||
    observed.status !== "OPEN" ||
    observed.prNumber !== request.prNumber ||
    observed.headRef !== request.branch ||
    observed.base !== request.baseBranch ||
    !OID.test(observed.headSha ?? "") ||
    !["https:", "http:"].includes(url.protocol) ||
    url.host !== request.identity.hostname ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== `/${request.identity.targetProject}/-/merge_requests/${request.prNumber}`
  )
    throw new Error("Exact GitLab MR identity is unproven");
  return {
    ...observed,
    baseSha: await readGitLabCurrentTargetHead({
      gitRoot: request.gitRoot,
      identity: request.identity,
      baseBranch: request.baseBranch,
    }),
  };
}

async function alignedResult(
  request: ProviderUpdateBranchRequest,
  observed: ObservedChangeRequest,
  effect: "applied" | "reconciled",
): Promise<ProviderUpdateBranchResult> {
  const head = observed.headSha!;
  const base = observed.baseSha!;
  if (
    !(await verifyGitLabProviderUpdate({
      request,
      observedHeadSha: head,
      observedBaseSha: base,
    }))
  )
    throwGitLabUpdateEffectInDoubt(request, head);
  const failure = await reconcileProviderUpdateLocalHead(request, head, base);
  if (failure) throwGitLabUpdateEffectInDoubt(request, head);
  // Confirm hosted identity after the local fast-forward as well.
  const after = await observe(request);
  if (after.headSha !== head || after.baseSha !== base)
    throwGitLabUpdateEffectInDoubt(request, head);
  return {
    state: "updated",
    effect,
    observed: after,
    evidence: {
      provider: "gitlab",
      targetProject: request.identity.targetProject,
      prNumber: request.prNumber,
      branch: request.branch,
      baseBranch: request.baseBranch,
      expectedHeadSha: request.expectedHeadSha,
      expectedBaseSha: request.expectedBaseSha,
      observedHeadSha: head,
      containsExpectedHead: true,
      containsExpectedBase: true,
    },
  };
}

export async function updateGitLabProviderBranch(
  request: ProviderUpdateBranchRequest,
): Promise<ProviderUpdateBranchResult> {
  if (request.adoption || request.identity.sourceProject !== request.identity.targetProject)
    return notApplied(
      "unsupported_provider",
      "GitLab update requires a same-project task checkout.",
    );
  const ids = request.branch.split("/").filter((part) => TASK_ID.test(part));
  if (
    request.identity.provider !== "gitlab" ||
    !/^[A-Za-z0-9_.-]+(?:\/[A-Za-z0-9_.-]+)+$/u.test(request.identity.targetProject) ||
    !Number.isInteger(request.prNumber) ||
    request.prNumber <= 0 ||
    ids.length !== 1 ||
    !request.baseBranch.trim() ||
    !OID.test(request.expectedHeadSha) ||
    !OID.test(request.expectedBaseSha) ||
    (request.reconcileHeadSha !== undefined &&
      (!OID.test(request.reconcileHeadSha) || request.reconcileHeadSha === request.expectedHeadSha))
  )
    return notApplied("invalid_request", "Exact GitLab task, head, base and project are required.");

  return withGitMutationMutex(
    {
      repoRoot: request.worktreePath ?? request.gitRoot,
      operation: "gitlab-provider-update",
      workflowMode: "branch_pr",
      mutationKind: "integration",
      taskId: ids[0],
    },
    async () => {
      const failure = await validateProviderUpdateLocalState(request, [
        request.expectedHeadSha,
        ...(request.reconcileHeadSha ? [request.reconcileHeadSha] : []),
      ]);
      if (failure) return notApplied("local_state_unavailable", failure);
      let before: ObservedChangeRequest;
      try {
        before = await observe(request);
      } catch {
        return notApplied("observation_unavailable", "Exact hosted GitLab state is unproven.");
      }
      if (request.reconcileHeadSha) {
        if (before.headSha !== request.reconcileHeadSha)
          return notApplied("head_drift", "The exact reconciliation-only head changed.", before);
        return alignedResult(request, before, "reconciled");
      }
      if (before.headSha !== request.expectedHeadSha)
        return notApplied("head_drift", "The approved GitLab source head changed.", before);
      if (before.baseSha !== request.expectedBaseSha)
        return notApplied("base_drift", "The approved GitLab target head changed.", before);
      if (
        before.mergeability?.state !== "not_conflicting" ||
        before.mergeability.mergeable !== true ||
        before.mergeability.providerState !== "need_rebase"
      )
        return notApplied("conflict", "GitLab has no coherent need_rebase observation.", before);

      let candidate: string;
      try {
        await git(request, [
          "fetch",
          "--no-tags",
          "--no-prune",
          "--no-write-fetch-head",
          "--",
          request.identity.targetUrl,
          `refs/heads/${request.baseBranch}`,
        ]);
        const tree = await git(
          request,
          [
            "merge-tree",
            "--write-tree",
            "--no-messages",
            request.expectedHeadSha,
            request.expectedBaseSha,
          ],
          true,
        );
        if (!OID.test(tree)) throw new Error("No exact conflict-free merge tree");
        const author = await git(request, ["var", "GIT_AUTHOR_IDENT"]);
        const signoff = /^([^\r\n]+ <[^<>\r\n]+>) \d+ [+-]\d{4}$/u.exec(author)?.[1];
        if (!signoff) throw new Error("DCO identity is unavailable");
        candidate = await git(
          request,
          [
            "commit-tree",
            tree,
            "-p",
            request.expectedHeadSha,
            "-p",
            request.expectedBaseSha,
            "-m",
            `🔀 ${ids[0]!.slice(-6)} task: update exact GitLab base\n\nTask-ID: ${ids[0]}\n\nSigned-off-by: ${signoff}`,
          ],
          true,
        );
        if (!OID.test(candidate)) throw new Error("No exact merge commit");
      } catch {
        return notApplied(
          "conflict",
          "The exact natural GitLab merge could not be prepared.",
          before,
        );
      }
      const local = await validateProviderUpdateLocalState(request, [request.expectedHeadSha]);
      if (local) return notApplied("local_state_unavailable", local, before);
      let fresh: ObservedChangeRequest;
      try {
        fresh = await observe(request);
      } catch {
        return notApplied(
          "observation_unavailable",
          "GitLab state became unavailable before push.",
        );
      }
      if (fresh.headSha !== request.expectedHeadSha)
        return notApplied("head_drift", "GitLab source moved before push.", fresh);
      if (fresh.baseSha !== request.expectedBaseSha)
        return notApplied("base_drift", "GitLab target moved before push.", fresh);

      let acknowledged = false;
      try {
        // Normal hooks and non-force receive-pack checks remain active.
        await git(request, [
          "push",
          "--porcelain",
          "--no-follow-tags",
          "--",
          request.identity.sourceUrl,
          `${candidate}:refs/heads/${request.branch}`,
        ]);
        acknowledged = true;
      } catch {
        // A transport or hook error is not proof of a remote non-effect.
      }
      for (let attempt = 0; attempt < 4; attempt += 1) {
        if (attempt) await delay(250 * attempt);
        try {
          const after = await observe(request);
          if (after.headSha === candidate)
            return await alignedResult(request, after, acknowledged ? "applied" : "reconciled");
          if (after.headSha !== request.expectedHeadSha)
            throwGitLabUpdateEffectInDoubt(request, candidate);
        } catch (error) {
          if (error instanceof CliError) throw error;
        }
      }
      throwGitLabUpdateEffectInDoubt(request, candidate);
    },
  );
}
