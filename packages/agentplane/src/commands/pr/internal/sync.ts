import { mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";

import { resolveBaseBranch } from "@agentplaneorg/core";

import { mapBackendError } from "../../../cli/error-map.js";
import { exitCodeForError } from "../../../cli/exit-codes.js";
import { fileExists } from "../../../cli/fs-utils.js";
import { workflowModeMessage } from "../../../cli/output.js";
import { CliError } from "../../../shared/errors.js";
import { writeJsonStableIfChanged, writeTextIfChanged } from "../../../shared/write-if-changed.js";
import { execFileAsync, gitEnv } from "../../shared/git.js";
import { gitCurrentBranch } from "../../shared/git-ops.js";
import { parseTaskIdFromBranch } from "../../shared/git-worktree.js";
import {
  isTransientGhTransportError,
  normalizeGhTransportError,
  withGhTransportRetry,
} from "../../shared/gh-transport.js";
import { INCIDENTS_POLICY_PATH } from "../../incidents/shared.js";
import {
  buildObservedGithubPrMeta,
  buildOpenedPrMeta,
  buildUpdatedPrMeta,
  parsePrMeta,
  type PrMeta,
} from "../../shared/pr-meta.js";
import {
  loadBackendTask,
  loadCommandContext,
  type CommandContext,
} from "../../shared/task-backend.js";

import { resolvePrPaths } from "./pr-paths.js";
import { readPrHandoffNotes } from "./note-store.js";
import { ghEnv } from "./gh-api.js";
import {
  buildGithubPrTitle,
  renderGithubPrBody,
  renderPrAutoSummary,
  renderPrReviewDocument,
} from "./review-template.js";

function nowIso(): string {
  return new Date().toISOString();
}

async function readTextIfExists(filePath: string): Promise<string | null> {
  try {
    return await readFile(filePath, "utf8");
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}

async function restoreIncidentRegistryIfNeeded(opts: {
  gitRoot: string;
  previousText: string | null;
}): Promise<void> {
  const incidentsPath = path.join(opts.gitRoot, INCIDENTS_POLICY_PATH);
  const nextText = await readTextIfExists(incidentsPath);
  if (nextText === opts.previousText) return;
  if (opts.previousText === null) {
    await rm(incidentsPath, { force: true });
    return;
  }
  await writeTextIfChanged(incidentsPath, opts.previousText);
}

function isUnknownRevisionError(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err);
  return /unknown revision or path not in the working tree/i.test(message);
}

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
      env: gitEnv(),
    });
    return parseGithubRepoFromRemoteUrl(stdout);
  } catch {
    return null;
  }
}

type GithubPullLookupRecord = {
  number?: number;
  html_url?: string | null;
  state?: string | null;
  merged_at?: string | null;
  merge_commit_sha?: string | null;
  head?: {
    sha?: string | null;
  } | null;
  base?: {
    ref?: string | null;
  } | null;
};

export type PrRemoteMode = "auto" | "sync-only";

export type PrOpenOutcome = {
  action: "linked-existing" | "created" | "sync-only" | "staged";
  message: string;
};

function normalizeObservedGithubPr(record: GithubPullLookupRecord): {
  prNumber: number;
  prUrl: string | null;
  status: "OPEN" | "CLOSED" | "MERGED";
  mergedAt: string | null;
  mergeCommit: string | null;
  base: string | null;
  headSha: string | null;
} | null {
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

async function tryLookupExistingGithubPrByBranch(opts: {
  gitRoot: string;
  branch: string;
  baseBranch?: string | null;
}): Promise<ReturnType<typeof normalizeObservedGithubPr>> {
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

function formatGithubPrLink(
  prNumber: number,
  prUrl: string | null,
  verb: "linked to" | "created",
): string {
  return prUrl?.trim()
    ? `${verb} GitHub PR #${prNumber}: ${prUrl.trim()}`
    : `${verb} GitHub PR #${prNumber}`;
}

function formatUnpublishedRemoteHeadReason(branch: string): string {
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

async function tryCreateGithubPr(opts: {
  gitRoot: string;
  branch: string;
  baseBranch: string | null;
  title: string;
  body: string;
}): Promise<{
  observed: ReturnType<typeof normalizeObservedGithubPr>;
  stagedReason: string | null;
}> {
  const repo = await resolveGithubRepoFromOrigin(opts.gitRoot);
  if (!repo) {
    return {
      observed: null,
      stagedReason: "GitHub origin repo unavailable",
    };
  }
  const baseBranch = opts.baseBranch?.trim() ?? "";
  if (!baseBranch) {
    return {
      observed: null,
      stagedReason: "base branch unresolved",
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
    };
  } catch (err) {
    if (isMissingRemoteHeadCreateError(err)) {
      return {
        observed: null,
        stagedReason: formatUnpublishedRemoteHeadReason(opts.branch),
      };
    }
    return {
      observed: null,
      stagedReason: summarizeGithubPrCreateFailure(err),
    };
  }
}

async function resolveBranchHeadSha(opts: {
  gitRoot: string;
  branch: string;
}): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("git", ["rev-parse", opts.branch], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    });
    return stdout.trim() || null;
  } catch (err) {
    if (!isUnknownRevisionError(err)) throw err;
    return null;
  }
}

type PrSyncMode = "open" | "update";

type ResolvedPrSyncBranch = {
  branch: string | null;
  source: "explicit" | "meta" | "current" | "none";
};

async function resolvePrSyncBranch(opts: {
  resolved: { gitRoot: string };
  metaPath: string;
  taskId: string;
  branch?: string;
}): Promise<ResolvedPrSyncBranch> {
  const explicitBranch = opts.branch?.trim() ?? "";
  if (explicitBranch) {
    return { branch: explicitBranch, source: "explicit" };
  }

  if (await fileExists(opts.metaPath)) {
    const metaBranch =
      parsePrMeta(await readFile(opts.metaPath, "utf8"), opts.taskId).branch?.trim() ?? "";
    if (metaBranch) {
      return { branch: metaBranch, source: "meta" };
    }
  }

  const currentBranchValue = await gitCurrentBranch(opts.resolved.gitRoot);
  const currentBranch = currentBranchValue.trim();
  if (currentBranch) {
    return { branch: currentBranch, source: "current" };
  }

  return { branch: null, source: "none" };
}

export async function ensurePrArtifactsSynced(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author?: string;
  branch?: string;
}): Promise<{
  branch: string;
  prDir: string;
  resolved: { gitRoot: string };
} | null> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const { resolved, config, prDir, metaPath } = await resolvePrPaths({ ...opts, ctx });
  if (config.workflow_mode !== "branch_pr") return null;

  const resolvedBranch = await resolvePrSyncBranch({
    resolved,
    metaPath,
    taskId: opts.taskId,
    branch: opts.branch,
  });
  const branch = resolvedBranch.branch?.trim() ?? "";
  if (!branch) return null;
  if (
    resolvedBranch.source === "current" &&
    parseTaskIdFromBranch(config.branch.task_prefix, branch) !== opts.taskId
  ) {
    return null;
  }

  const baseBranch = await resolveBaseBranch({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    cliBaseOpt: null,
    mode: config.workflow_mode,
  });
  if (resolvedBranch.source === "current" && baseBranch && branch === baseBranch) {
    return null;
  }

  const reviewPath = path.join(prDir, "review.md");
  const artifactsExist = (await fileExists(metaPath)) && (await fileExists(reviewPath));
  if (!artifactsExist) {
    await syncPrArtifacts({
      ...opts,
      ctx,
      mode: "open",
      author: opts.author,
      branch,
      remoteMode: "sync-only",
    });
  }
  const result = await syncPrArtifacts({
    ...opts,
    ctx,
    mode: "update",
    branch,
  });
  return { ...result, branch };
}

export async function syncPrArtifacts(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  mode: PrSyncMode;
  author?: string;
  branch?: string;
  remoteMode?: PrRemoteMode;
}): Promise<{
  meta: PrMeta;
  prDir: string;
  resolved: { gitRoot: string };
  openOutcome?: PrOpenOutcome;
}> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const { task } = await loadBackendTask({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    const {
      resolved,
      config,
      prDir,
      metaPath,
      diffstatPath,
      notesPath,
      verifyLogPath,
      reviewPath,
      githubTitlePath,
      githubBodyPath,
    } = await resolvePrPaths({ ...opts, ctx });
    const incidentsTextBefore = await readTextIfExists(
      path.join(resolved.gitRoot, INCIDENTS_POLICY_PATH),
    );

    try {
      if (config.workflow_mode !== "branch_pr") {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message: workflowModeMessage(config.workflow_mode, "branch_pr"),
        });
      }

      const resolvedBranch = await resolvePrSyncBranch({
        resolved,
        metaPath,
        taskId: task.id,
        branch: opts.branch,
      });
      const branch = resolvedBranch.branch?.trim() ?? "";
      if (!branch) {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message: "Branch could not be resolved (use --branch).",
        });
      }

      const metaExists = await fileExists(metaPath);
      const reviewExists = await fileExists(reviewPath);
      if (opts.mode === "update" && (!metaExists || !reviewExists)) {
        const missing: string[] = [];
        if (!metaExists) missing.push(path.relative(resolved.gitRoot, metaPath));
        if (!reviewExists) missing.push(path.relative(resolved.gitRoot, reviewPath));
        throw new CliError({
          exitCode: exitCodeForError("E_VALIDATION"),
          code: "E_VALIDATION",
          message: `PR artifacts missing: ${missing.join(", ")} (run \`agentplane pr open\`)`,
        });
      }

      await mkdir(prDir, { recursive: true });

      const existingMeta =
        metaExists && (await fileExists(metaPath))
          ? parsePrMeta(await readFile(metaPath, "utf8"), task.id)
          : null;
      const handoffNotes = await readPrHandoffNotes(notesPath);
      const now = nowIso();
      const createdAt = existingMeta?.created_at ?? now;
      const baseBranch = await resolveBaseBranch({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
        cliBaseOpt: null,
        mode: config.workflow_mode,
      });
      const headSha = await resolveBranchHeadSha({ gitRoot: resolved.gitRoot, branch });
      const preservedRenderUpdatedAt =
        existingMeta &&
        (existingMeta.branch ?? null) === branch &&
        (existingMeta.base ?? null) === (baseBranch ?? null) &&
        (existingMeta.head_sha ?? null) === (headSha ?? null)
          ? existingMeta.updated_at
          : null;
      const renderUpdatedAt = preservedRenderUpdatedAt ?? now;

      if (opts.mode === "open") {
        const remoteMode = opts.remoteMode ?? "auto";
        let nextMeta: PrMeta = buildOpenedPrMeta({
          taskId: task.id,
          branch,
          at: now,
          previousMeta: existingMeta,
          base: baseBranch,
          headSha,
        });
        const linkedExistingOutcome =
          typeof nextMeta.pr_number === "number" && nextMeta.pr_number > 0
            ? {
                action: "linked-existing" as const,
                message: formatGithubPrLink(
                  nextMeta.pr_number,
                  nextMeta.pr_url ?? null,
                  "linked to",
                ),
              }
            : null;
        let openOutcome: PrOpenOutcome | undefined;
        const githubTitle = buildGithubPrTitle(task);
        const githubBody = renderGithubPrBody({
          task,
          handoffNotes,
          autoSummary: renderPrAutoSummary({
            updatedAt: renderUpdatedAt,
            branch,
            headSha,
            diffstat: "",
          }),
        });
        const observedGithubPr = await tryLookupExistingGithubPrByBranch({
          gitRoot: resolved.gitRoot,
          branch,
          baseBranch,
        });
        if (observedGithubPr) {
          nextMeta = buildObservedGithubPrMeta({
            meta: nextMeta,
            observed: observedGithubPr,
            at: now,
          });
          openOutcome = {
            action: "linked-existing",
            message: formatGithubPrLink(
              observedGithubPr.prNumber,
              observedGithubPr.prUrl,
              "linked to",
            ),
          };
        } else if (remoteMode === "sync-only") {
          openOutcome = linkedExistingOutcome ?? {
            action: "sync-only",
            message: "local PR artifacts synced; remote PR creation skipped (--sync-only)",
          };
        } else {
          const createdGithubPr = await tryCreateGithubPr({
            gitRoot: resolved.gitRoot,
            branch,
            baseBranch,
            title: githubTitle,
            body: githubBody,
          });
          if (createdGithubPr.observed) {
            nextMeta = buildObservedGithubPrMeta({
              meta: nextMeta,
              observed: createdGithubPr.observed,
              at: now,
            });
            openOutcome = {
              action: "created",
              message: formatGithubPrLink(
                createdGithubPr.observed.prNumber,
                createdGithubPr.observed.prUrl,
                "created",
              ),
            };
          } else {
            openOutcome = linkedExistingOutcome ?? {
              action: "staged",
              message: `local PR artifacts synced; remote PR creation staged (${createdGithubPr.stagedReason ?? "remote creation unavailable"})`,
            };
          }
        }
        const nextAutoSummary = renderPrAutoSummary({
          updatedAt: renderUpdatedAt,
          branch,
          headSha,
          diffstat: "",
        });
        const nextReview = renderPrReviewDocument({
          task,
          author: opts.author,
          createdAt,
          branch,
          handoffNotes,
          autoSummary: nextAutoSummary,
        });
        const nextGithubBody = renderGithubPrBody({
          task,
          handoffNotes,
          autoSummary: nextAutoSummary,
        });
        await writeJsonStableIfChanged(metaPath, nextMeta);
        if (!(await fileExists(diffstatPath))) {
          await writeTextIfChanged(diffstatPath, "");
        }
        if (!(await fileExists(notesPath))) {
          await writeTextIfChanged(notesPath, "");
        }
        if (!(await fileExists(verifyLogPath))) {
          await writeTextIfChanged(verifyLogPath, "");
        }
        await writeTextIfChanged(reviewPath, nextReview);
        await writeTextIfChanged(githubTitlePath, `${githubTitle}\n`);
        await writeTextIfChanged(githubBodyPath, nextGithubBody);
        return { meta: nextMeta, prDir, resolved, openOutcome };
      }

      if (!baseBranch) {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message: "Base branch could not be resolved (use `agentplane branch base set`).",
        });
      }

      let diffstat = "";
      try {
        const { stdout: diffStatOut } = await execFileAsync(
          "git",
          ["diff", "--stat", `${baseBranch}...${branch}`],
          { cwd: resolved.gitRoot, env: gitEnv() },
        );
        diffstat = diffStatOut.trimEnd();
      } catch (err) {
        if (!isUnknownRevisionError(err)) throw err;
      }
      let nextMeta: PrMeta = buildUpdatedPrMeta({
        meta: existingMeta!,
        branch,
        at: now,
        base: baseBranch,
        headSha,
      });
      const observedGithubPr = await tryLookupExistingGithubPrByBranch({
        gitRoot: resolved.gitRoot,
        branch,
        baseBranch,
      });
      if (observedGithubPr) {
        nextMeta = buildObservedGithubPrMeta({
          meta: nextMeta,
          observed: observedGithubPr,
          at: now,
        });
      }
      const nextAutoSummary = renderPrAutoSummary({
        updatedAt: nextMeta.updated_at,
        branch,
        headSha,
        diffstat,
      });
      const nextReview = renderPrReviewDocument({
        task,
        createdAt,
        branch,
        handoffNotes,
        autoSummary: nextAutoSummary,
      });
      const githubTitle = buildGithubPrTitle(task);
      const githubBody = renderGithubPrBody({
        task,
        handoffNotes,
        autoSummary: nextAutoSummary,
      });

      await writeTextIfChanged(diffstatPath, diffstat ? `${diffstat}\n` : "");
      await writeTextIfChanged(reviewPath, nextReview);
      await writeTextIfChanged(githubTitlePath, `${githubTitle}\n`);
      await writeTextIfChanged(githubBodyPath, githubBody);
      await writeJsonStableIfChanged(metaPath, nextMeta);
      return { meta: nextMeta, prDir, resolved };
    } finally {
      await restoreIncidentRegistryIfNeeded({
        gitRoot: resolved.gitRoot,
        previousText: incidentsTextBefore,
      });
    }
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "pr sync", root: opts.rootOverride ?? null });
  }
}
