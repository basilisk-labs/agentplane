import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import {
  atomicWriteFile,
  loadConfig,
  resolveBaseBranch,
  resolveProject,
  type AgentplaneConfig,
} from "@agentplaneorg/core";

import { mapBackendError, mapCoreError } from "../../cli/error-map.js";
import { fileExists } from "../../cli/fs-utils.js";
import {
  successMessage,
  unknownEntityMessage,
  usageMessage,
  workflowModeMessage,
} from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { writeJsonStableIfChanged, writeTextIfChanged } from "../../shared/write-if-changed.js";
import { ensureGitClean } from "../guard/index.js";
import { execFileAsync, gitEnv } from "../shared/git.js";
import { gitDiffNames, gitDiffStat, gitShowFile, toGitPath } from "../shared/git-diff.js";
import { gitBranchExists, gitCurrentBranch, gitRevParse } from "../shared/git-ops.js";
import { findWorktreeForBranch } from "../shared/git-worktree.js";
import {
  appendVerifyLog,
  extractLastVerifiedSha,
  parsePrMeta,
  runShellCommand,
  type PrMeta,
} from "../shared/pr-meta.js";
import { isPathWithin } from "../shared/path.js";
import { loadBackendTask } from "../shared/task-backend.js";
import { cmdFinish } from "../task/index.js";
import {
  ensurePlanApprovedIfRequired,
  ensureVerificationSatisfiedIfRequired,
} from "../task/shared.js";

export const PR_OPEN_USAGE = "Usage: agentplane pr open <task-id> --author <id> [--branch <name>]";
export const PR_OPEN_USAGE_EXAMPLE = "agentplane pr open 202602030608-F1Q8AB --author CODER";
export const PR_UPDATE_USAGE = "Usage: agentplane pr update <task-id>";
export const PR_UPDATE_USAGE_EXAMPLE = "agentplane pr update 202602030608-F1Q8AB";
export const PR_CHECK_USAGE = "Usage: agentplane pr check <task-id>";
export const PR_CHECK_USAGE_EXAMPLE = "agentplane pr check 202602030608-F1Q8AB";
export const PR_NOTE_USAGE = "Usage: agentplane pr note <task-id> --author <id> --body <text>";
export const PR_NOTE_USAGE_EXAMPLE =
  'agentplane pr note 202602030608-F1Q8AB --author REVIEWER --body "..."';
export const INTEGRATE_USAGE =
  "Usage: agentplane integrate <task-id> [--branch <name>] [--base <name>] [--merge-strategy squash|merge|rebase] [--run-verify] [--dry-run] [--quiet]";
export const INTEGRATE_USAGE_EXAMPLE = "agentplane integrate 202602030608-F1Q8AB --run-verify";

function nowIso(): string {
  return new Date().toISOString();
}

function renderPrReviewTemplate(opts: {
  author: string;
  createdAt: string;
  branch: string;
}): string {
  return [
    "# PR Review",
    "",
    `Opened by ${opts.author} on ${opts.createdAt}`,
    `Branch: ${opts.branch}`,
    "",
    "## Summary",
    "",
    "- ",
    "",
    "## Checklist",
    "",
    "- [ ] Tests added/updated",
    "- [ ] Lint/format passes",
    "- [ ] Verify passed",
    "- [ ] Docs updated (if needed)",
    "",
    "## Handoff Notes",
    "",
    "<!-- Add review notes here. -->",
    "",
    "<!-- BEGIN AUTO SUMMARY -->",
    "<!-- END AUTO SUMMARY -->",
    "",
  ].join("\n");
}

function updateAutoSummaryBlock(text: string, summary: string): string {
  const start = "<!-- BEGIN AUTO SUMMARY -->";
  const end = "<!-- END AUTO SUMMARY -->";
  const startIdx = text.indexOf(start);
  const endIdx = text.indexOf(end);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    return `${text.trimEnd()}\n\n${start}\n${summary}\n${end}\n`;
  }
  const before = text.slice(0, startIdx + start.length);
  const after = text.slice(endIdx);
  return `${before}\n${summary}\n${after}`;
}

function appendHandoffNote(review: string, note: string): string {
  const marker = "## Handoff Notes";
  const idx = review.indexOf(marker);
  if (idx === -1) return `${review.trimEnd()}\n\n${marker}\n\n- ${note}\n`;
  const head = review.slice(0, idx + marker.length);
  const tail = review.slice(idx + marker.length);
  const trimmedTail = tail.startsWith("\n") ? tail.slice(1) : tail;
  return `${head}\n\n- ${note}\n${trimmedTail}`;
}

async function resolvePrPaths(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<{
  resolved: { gitRoot: string; agentplaneDir: string };
  config: AgentplaneConfig;
  prDir: string;
  metaPath: string;
  diffstatPath: string;
  verifyLogPath: string;
  reviewPath: string;
}> {
  const resolved = await resolveProject({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const loaded = await loadConfig(resolved.agentplaneDir);
  const taskDir = path.join(resolved.gitRoot, loaded.config.paths.workflow_dir, opts.taskId);
  const prDir = path.join(taskDir, "pr");
  return {
    resolved,
    config: loaded.config,
    prDir,
    metaPath: path.join(prDir, "meta.json"),
    diffstatPath: path.join(prDir, "diffstat.txt"),
    verifyLogPath: path.join(prDir, "verify.log"),
    reviewPath: path.join(prDir, "review.md"),
  };
}

async function readPrArtifact(opts: {
  resolved: { gitRoot: string };
  prDir: string;
  fileName: string;
  branch: string;
}): Promise<string | null> {
  const filePath = path.join(opts.prDir, opts.fileName);
  if (await fileExists(filePath)) {
    return await readFile(filePath, "utf8");
  }
  const rel = toGitPath(path.relative(opts.resolved.gitRoot, filePath));
  try {
    return await gitShowFile(opts.resolved.gitRoot, opts.branch, rel);
  } catch {
    return null;
  }
}

function validateReviewContents(review: string, errors: string[]): void {
  const requiredSections = ["## Summary", "## Checklist", "## Handoff Notes"];
  for (const section of requiredSections) {
    if (!review.includes(section)) errors.push(`Missing section: ${section}`);
  }
  if (!review.includes("<!-- BEGIN AUTO SUMMARY -->")) {
    errors.push("Missing auto summary start marker");
  }
  if (!review.includes("<!-- END AUTO SUMMARY -->")) {
    errors.push("Missing auto summary end marker");
  }
}

export async function cmdPrOpen(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  branch?: string;
}): Promise<number> {
  try {
    const author = opts.author.trim();
    if (!author)
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(PR_OPEN_USAGE, PR_OPEN_USAGE_EXAMPLE),
      });

    const { task } = await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    const { resolved, config, prDir, metaPath, diffstatPath, verifyLogPath, reviewPath } =
      await resolvePrPaths(opts);

    if (config.workflow_mode !== "branch_pr") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: workflowModeMessage(config.workflow_mode, "branch_pr"),
      });
    }

    const branch = (opts.branch ?? (await gitCurrentBranch(resolved.gitRoot))).trim();
    if (!branch)
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(PR_OPEN_USAGE, PR_OPEN_USAGE_EXAMPLE),
      });

    await mkdir(prDir, { recursive: true });

    const now = nowIso();
    let meta: PrMeta | null = null;
    if (await fileExists(metaPath)) {
      const raw = await readFile(metaPath, "utf8");
      meta = parsePrMeta(raw, task.id);
    }
    const createdAt = meta?.created_at ?? now;
    const nextMeta: PrMeta = {
      schema_version: 1,
      task_id: task.id,
      branch,
      created_at: createdAt,
      updated_at: now,
      last_verified_sha: meta?.last_verified_sha ?? null,
      last_verified_at: meta?.last_verified_at ?? null,
      verify: meta?.verify ?? { status: "skipped" },
    };
    await writeJsonStableIfChanged(metaPath, nextMeta);

    await writeTextIfChanged(diffstatPath, "");
    await writeTextIfChanged(verifyLogPath, "");
    if (!(await fileExists(reviewPath))) {
      const review = renderPrReviewTemplate({ author, createdAt, branch });
      await atomicWriteFile(reviewPath, review, "utf8");
    }

    process.stdout.write(`${successMessage("pr open", path.relative(resolved.gitRoot, prDir))}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "pr open", root: opts.rootOverride ?? null });
  }
}

export async function cmdPrUpdate(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<number> {
  try {
    await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    const { resolved, config, prDir, metaPath, diffstatPath, reviewPath } =
      await resolvePrPaths(opts);

    if (config.workflow_mode !== "branch_pr") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: workflowModeMessage(config.workflow_mode, "branch_pr"),
      });
    }

    if (!(await fileExists(metaPath)) || !(await fileExists(reviewPath))) {
      const missing: string[] = [];
      if (!(await fileExists(metaPath))) missing.push(path.relative(resolved.gitRoot, metaPath));
      if (!(await fileExists(reviewPath)))
        missing.push(path.relative(resolved.gitRoot, reviewPath));
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `PR artifacts missing: ${missing.join(", ")} (run \`agentplane pr open\`)`,
      });
    }

    const baseBranch = await resolveBaseBranch({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      cliBaseOpt: null,
      mode: config.workflow_mode,
    });
    if (!baseBranch) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "Base branch could not be resolved (use `agentplane branch base set`).",
      });
    }
    const branch = await gitCurrentBranch(resolved.gitRoot);
    const { stdout: diffStatOut } = await execFileAsync(
      "git",
      ["diff", "--stat", `${baseBranch}...HEAD`],
      { cwd: resolved.gitRoot, env: gitEnv() },
    );
    const diffstat = diffStatOut.trimEnd();
    await writeTextIfChanged(diffstatPath, diffstat ? `${diffstat}\n` : "");

    const { stdout: headOut } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: resolved.gitRoot,
      env: gitEnv(),
    });
    const headSha = headOut.trim();
    const summaryLines = [
      `- Updated: ${nowIso()}`,
      `- Branch: ${branch}`,
      `- Head: ${headSha.slice(0, 12)}`,
      "- Diffstat:",
      "```",
      diffstat || "No changes detected.",
      "```",
    ];
    const reviewText = await readFile(reviewPath, "utf8");
    const nextReview = updateAutoSummaryBlock(reviewText, summaryLines.join("\n"));
    await writeTextIfChanged(reviewPath, nextReview);

    const rawMeta = await readFile(metaPath, "utf8");
    const meta = parsePrMeta(rawMeta, opts.taskId);
    const nextMeta: PrMeta = {
      ...meta,
      branch,
      updated_at: nowIso(),
      last_verified_sha: meta.last_verified_sha ?? null,
      last_verified_at: meta.last_verified_at ?? null,
    };
    await writeJsonStableIfChanged(metaPath, nextMeta);

    process.stdout.write(
      `${successMessage("pr update", path.relative(resolved.gitRoot, prDir))}\n`,
    );
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "pr update", root: opts.rootOverride ?? null });
  }
}

export async function cmdPrCheck(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<number> {
  try {
    const { task } = await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    const { resolved, config, prDir, metaPath, diffstatPath, verifyLogPath, reviewPath } =
      await resolvePrPaths(opts);

    if (config.workflow_mode !== "branch_pr") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: workflowModeMessage(config.workflow_mode, "branch_pr"),
      });
    }

    const errors: string[] = [];
    const relPrDir = path.relative(resolved.gitRoot, prDir);
    const relMetaPath = path.relative(resolved.gitRoot, metaPath);
    const relDiffstatPath = path.relative(resolved.gitRoot, diffstatPath);
    const relVerifyLogPath = path.relative(resolved.gitRoot, verifyLogPath);
    const relReviewPath = path.relative(resolved.gitRoot, reviewPath);
    if (!(await fileExists(prDir))) errors.push(`Missing PR directory: ${relPrDir}`);
    if (!(await fileExists(metaPath))) errors.push(`Missing ${relMetaPath}`);
    if (!(await fileExists(diffstatPath))) errors.push(`Missing ${relDiffstatPath}`);
    if (!(await fileExists(verifyLogPath))) errors.push(`Missing ${relVerifyLogPath}`);
    if (!(await fileExists(reviewPath))) errors.push(`Missing ${relReviewPath}`);

    let meta: PrMeta | null = null;
    if (await fileExists(metaPath)) {
      try {
        meta = parsePrMeta(await readFile(metaPath, "utf8"), task.id);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        errors.push(message);
      }
    }

    if (await fileExists(reviewPath)) {
      const review = await readFile(reviewPath, "utf8");
      validateReviewContents(review, errors);
    }

    if (task.verify && task.verify.length > 0) {
      if (meta?.verify?.status !== "pass") {
        errors.push("Verify requirements not satisfied (meta.verify.status != pass)");
      }
      if (!meta?.last_verified_sha || !meta.last_verified_at) {
        errors.push("Verify metadata missing (last_verified_sha/last_verified_at)");
      }
    }

    if (errors.length > 0) {
      throw new CliError({ exitCode: 3, code: "E_VALIDATION", message: errors.join("\n") });
    }

    process.stdout.write(`${successMessage("pr check", path.relative(resolved.gitRoot, prDir))}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "pr check", root: opts.rootOverride ?? null });
  }
}

export async function cmdPrNote(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  body: string;
}): Promise<number> {
  try {
    const author = opts.author.trim();
    const body = opts.body.trim();
    if (!author || !body) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(PR_NOTE_USAGE, PR_NOTE_USAGE_EXAMPLE),
      });
    }

    const { config, reviewPath, resolved } = await resolvePrPaths(opts);
    if (config.workflow_mode !== "branch_pr") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: workflowModeMessage(config.workflow_mode, "branch_pr"),
      });
    }

    if (!(await fileExists(reviewPath))) {
      const relReviewPath = path.relative(resolved.gitRoot, reviewPath);
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `Missing ${relReviewPath} (run \`agentplane pr open\`)`,
      });
    }

    const review = await readFile(reviewPath, "utf8");
    const updated = appendHandoffNote(review, `${author}: ${body}`);
    await atomicWriteFile(reviewPath, updated, "utf8");

    process.stdout.write(`${successMessage("pr note", opts.taskId)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "pr note", root: opts.rootOverride ?? null });
  }
}

export async function cmdIntegrate(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  branch?: string;
  base?: string;
  mergeStrategy: "squash" | "merge" | "rebase";
  runVerify: boolean;
  dryRun: boolean;
  quiet: boolean;
}): Promise<number> {
  let tempWorktreePath: string | null = null;
  let createdTempWorktree = false;
  try {
    const { task } = await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    if (loaded.config.workflow_mode !== "branch_pr") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: workflowModeMessage(loaded.config.workflow_mode, "branch_pr"),
      });
    }

    ensurePlanApprovedIfRequired(task, loaded.config);
    ensureVerificationSatisfiedIfRequired(task, loaded.config);

    await ensureGitClean({ cwd: opts.cwd, rootOverride: opts.rootOverride });

    if (opts.base?.trim().length === 0) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(INTEGRATE_USAGE, INTEGRATE_USAGE_EXAMPLE),
      });
    }

    const baseBranch = await resolveBaseBranch({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      cliBaseOpt: opts.base ?? null,
      mode: loaded.config.workflow_mode,
    });
    if (!baseBranch) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "Base branch could not be resolved (use `agentplane branch base set` or --base).",
      });
    }
    const currentBranch = await gitCurrentBranch(resolved.gitRoot);
    if (currentBranch !== baseBranch) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: `integrate must run on base branch ${baseBranch} (current: ${currentBranch})`,
      });
    }

    const { prDir, metaPath, diffstatPath, verifyLogPath } = await resolvePrPaths({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });

    let meta: PrMeta | null = null;
    let branch = (opts.branch ?? "").trim();
    if (await fileExists(metaPath)) {
      meta = parsePrMeta(await readFile(metaPath, "utf8"), task.id);
      if (!branch) branch = (meta.branch ?? "").trim();
    }
    if (!branch) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(INTEGRATE_USAGE, INTEGRATE_USAGE_EXAMPLE),
      });
    }
    if (!(await gitBranchExists(resolved.gitRoot, branch))) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: unknownEntityMessage("branch", branch),
      });
    }

    const metaSource =
      meta ??
      parsePrMeta(
        await gitShowFile(
          resolved.gitRoot,
          branch,
          toGitPath(path.relative(resolved.gitRoot, metaPath)),
        ),
        task.id,
      );
    const baseCandidate =
      opts.base ?? (metaSource as Record<string, unknown>).base_branch ?? baseBranch;
    const base =
      typeof baseCandidate === "string" && baseCandidate.trim().length > 0
        ? baseCandidate.trim()
        : baseBranch;

    const errors: string[] = [];
    const relDiffstat = path.relative(resolved.gitRoot, path.join(prDir, "diffstat.txt"));
    const relVerifyLog = path.relative(resolved.gitRoot, path.join(prDir, "verify.log"));
    const relReview = path.relative(resolved.gitRoot, path.join(prDir, "review.md"));
    const diffstatText = await readPrArtifact({
      resolved,
      prDir,
      fileName: "diffstat.txt",
      branch,
    });
    if (diffstatText === null) errors.push(`Missing ${relDiffstat}`);
    const verifyLogText = await readPrArtifact({
      resolved,
      prDir,
      fileName: "verify.log",
      branch,
    });
    if (verifyLogText === null) errors.push(`Missing ${relVerifyLog}`);
    const reviewText = await readPrArtifact({
      resolved,
      prDir,
      fileName: "review.md",
      branch,
    });
    if (reviewText === null) errors.push(`Missing ${relReview}`);
    if (reviewText) validateReviewContents(reviewText, errors);
    if (errors.length > 0) {
      throw new CliError({ exitCode: 3, code: "E_VALIDATION", message: errors.join("\n") });
    }

    const changedPaths = await gitDiffNames(resolved.gitRoot, base, branch);
    const tasksPath = loaded.config.paths.tasks_path;
    if (changedPaths.includes(tasksPath)) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: `Branch ${branch} modifies ${tasksPath} (single-writer violation)`,
      });
    }

    const rawVerify = task.verify;
    const verifyCommands = Array.isArray(rawVerify)
      ? rawVerify
          .filter((item): item is string => typeof item === "string")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];
    let branchHeadSha = await gitRevParse(resolved.gitRoot, [branch]);
    let alreadyVerifiedSha: string | null = null;
    if (verifyCommands.length > 0) {
      const metaVerified = metaSource?.last_verified_sha ?? null;
      if (metaVerified && metaVerified === branchHeadSha) {
        alreadyVerifiedSha = branchHeadSha;
      } else if (verifyLogText) {
        const logSha = extractLastVerifiedSha(verifyLogText);
        if (logSha && logSha === branchHeadSha) alreadyVerifiedSha = logSha;
      }
    }
    let shouldRunVerify =
      opts.runVerify || (verifyCommands.length > 0 && alreadyVerifiedSha === null);

    if (opts.dryRun) {
      if (!opts.quiet) {
        process.stdout.write(
          `${successMessage(
            "integrate dry-run",
            task.id,
            `base=${base} branch=${branch} verify=${shouldRunVerify ? "yes" : "no"}`,
          )}\n`,
        );
      }
      return 0;
    }

    let worktreePath = await findWorktreeForBranch(resolved.gitRoot, branch);
    if (opts.mergeStrategy === "rebase" && !worktreePath) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "rebase strategy requires an existing worktree for the task branch",
      });
    }

    if (shouldRunVerify && !worktreePath) {
      const worktreesDir = path.resolve(resolved.gitRoot, loaded.config.paths.worktrees_dir);
      if (!isPathWithin(resolved.gitRoot, worktreesDir)) {
        throw new CliError({
          exitCode: 5,
          code: "E_GIT",
          message: `worktrees_dir must be inside the repo: ${worktreesDir}`,
        });
      }
      tempWorktreePath = path.join(worktreesDir, `_integrate_tmp_${task.id}`);
      const tempExists = await fileExists(tempWorktreePath);
      if (tempExists) {
        const registered = await findWorktreeForBranch(resolved.gitRoot, branch);
        if (!registered) {
          throw new CliError({
            exitCode: 5,
            code: "E_GIT",
            message: `Temp worktree path exists but is not registered: ${tempWorktreePath}`,
          });
        }
      } else {
        await mkdir(worktreesDir, { recursive: true });
        await execFileAsync("git", ["worktree", "add", tempWorktreePath, branch], {
          cwd: resolved.gitRoot,
          env: gitEnv(),
        });
        createdTempWorktree = true;
      }
      worktreePath = tempWorktreePath;
    }

    const verifyEntries: { header: string; content: string }[] = [];
    if (opts.mergeStrategy !== "rebase" && shouldRunVerify && verifyCommands.length > 0) {
      if (!worktreePath) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: "Unable to locate or create a worktree for verify execution",
        });
      }
      for (const command of verifyCommands) {
        if (!opts.quiet) {
          process.stdout.write(`$ ${command}\n`);
        }
        const timestamp = nowIso();
        const result = await runShellCommand(command, worktreePath);
        const shaPrefix = branchHeadSha ? `sha=${branchHeadSha} ` : "";
        verifyEntries.push({
          header: `[${timestamp}] ${shaPrefix}$ ${command}`.trimEnd(),
          content: result.output,
        });
        if (result.code !== 0) {
          throw new CliError({
            exitCode: result.code || 1,
            code: "E_IO",
            message: `Verify command failed: ${command}`,
          });
        }
      }
      if (branchHeadSha) {
        verifyEntries.push({
          header: `[${nowIso()}] ✅ verified_sha=${branchHeadSha}`,
          content: "",
        });
      }
      if (!opts.quiet) {
        process.stdout.write(`${successMessage("verify passed", task.id)}\n`);
      }
    }

    const baseShaBeforeMerge = await gitRevParse(resolved.gitRoot, [base]);
    const headBeforeMerge = await gitRevParse(resolved.gitRoot, ["HEAD"]);
    let mergeHash = "";

    if (opts.mergeStrategy === "squash") {
      try {
        await execFileAsync("git", ["merge", "--squash", branch], {
          cwd: resolved.gitRoot,
          env: gitEnv(),
        });
      } catch (err) {
        await execFileAsync("git", ["reset", "--hard", headBeforeMerge], {
          cwd: resolved.gitRoot,
          env: gitEnv(),
        });
        const message = err instanceof Error ? err.message : "git merge --squash failed";
        throw new CliError({ exitCode: 2, code: "E_GIT", message });
      }
      const { stdout: staged } = await execFileAsync("git", ["diff", "--cached", "--name-only"], {
        cwd: resolved.gitRoot,
        env: gitEnv(),
      });
      if (!staged.trim()) {
        await execFileAsync("git", ["reset", "--hard", headBeforeMerge], {
          cwd: resolved.gitRoot,
          env: gitEnv(),
        });
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Nothing to integrate: ${branch} is already merged into ${base}`,
        });
      }
      const { stdout: subjectOut } = await execFileAsync(
        "git",
        ["log", "-1", "--pretty=format:%s", branch],
        { cwd: resolved.gitRoot, env: gitEnv() },
      );
      let subject = subjectOut.trim();
      if (!subject.includes(task.id)) {
        subject = `🧩 ${task.id} integrate ${branch}`;
      }
      const env = {
        ...process.env,
        AGENTPLANE_TASK_ID: task.id,
        AGENTPLANE_ALLOW_BASE: "1",
        AGENTPLANE_ALLOW_TASKS: "0",
      };
      try {
        await execFileAsync("git", ["commit", "-m", subject], {
          cwd: resolved.gitRoot,
          env,
        });
      } catch (err) {
        await execFileAsync("git", ["reset", "--hard", headBeforeMerge], {
          cwd: resolved.gitRoot,
          env: gitEnv(),
        });
        const message = err instanceof Error ? err.message : "git commit failed";
        throw new CliError({ exitCode: 2, code: "E_GIT", message });
      }
      mergeHash = await gitRevParse(resolved.gitRoot, ["HEAD"]);
    } else if (opts.mergeStrategy === "merge") {
      const env = {
        ...process.env,
        AGENTPLANE_TASK_ID: task.id,
        AGENTPLANE_ALLOW_BASE: "1",
        AGENTPLANE_ALLOW_TASKS: "0",
      };
      try {
        await execFileAsync(
          "git",
          ["merge", "--no-ff", branch, "-m", `🔀 ${task.id} merge ${branch}`],
          {
            cwd: resolved.gitRoot,
            env,
          },
        );
      } catch (err) {
        await execFileAsync("git", ["merge", "--abort"], { cwd: resolved.gitRoot, env: gitEnv() });
        const message = err instanceof Error ? err.message : "git merge failed";
        throw new CliError({ exitCode: 2, code: "E_GIT", message });
      }
      mergeHash = await gitRevParse(resolved.gitRoot, ["HEAD"]);
    } else {
      if (!worktreePath) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: "rebase strategy requires an existing worktree for the task branch",
        });
      }
      try {
        await execFileAsync("git", ["rebase", base], { cwd: worktreePath, env: gitEnv() });
      } catch (err) {
        await execFileAsync("git", ["rebase", "--abort"], { cwd: worktreePath, env: gitEnv() });
        const message = err instanceof Error ? err.message : "git rebase failed";
        throw new CliError({ exitCode: 2, code: "E_GIT", message });
      }
      branchHeadSha = await gitRevParse(resolved.gitRoot, [branch]);
      if (!opts.runVerify && verifyCommands.length > 0) {
        alreadyVerifiedSha = null;
        const metaVerified = metaSource?.last_verified_sha ?? null;
        if (metaVerified && metaVerified === branchHeadSha) {
          alreadyVerifiedSha = branchHeadSha;
        } else if (verifyLogText) {
          const logSha = extractLastVerifiedSha(verifyLogText);
          if (logSha && logSha === branchHeadSha) alreadyVerifiedSha = logSha;
        }
        shouldRunVerify = alreadyVerifiedSha === null;
      }
      if (shouldRunVerify && verifyCommands.length > 0) {
        if (!worktreePath) {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: "Unable to locate or create a worktree for verify execution",
          });
        }
        for (const command of verifyCommands) {
          if (!opts.quiet) {
            process.stdout.write(`$ ${command}\n`);
          }
          const timestamp = nowIso();
          const result = await runShellCommand(command, worktreePath);
          const shaPrefix = branchHeadSha ? `sha=${branchHeadSha} ` : "";
          verifyEntries.push({
            header: `[${timestamp}] ${shaPrefix}$ ${command}`.trimEnd(),
            content: result.output,
          });
          if (result.code !== 0) {
            throw new CliError({
              exitCode: result.code || 1,
              code: "E_IO",
              message: `Verify command failed: ${command}`,
            });
          }
        }
        if (branchHeadSha) {
          verifyEntries.push({
            header: `[${nowIso()}] ✅ verified_sha=${branchHeadSha}`,
            content: "",
          });
        }
        if (!opts.quiet) {
          process.stdout.write(`${successMessage("verify passed", task.id)}\n`);
        }
      }
      try {
        await execFileAsync("git", ["merge", "--ff-only", branch], {
          cwd: resolved.gitRoot,
          env: gitEnv(),
        });
      } catch (err) {
        await execFileAsync("git", ["reset", "--hard", headBeforeMerge], {
          cwd: resolved.gitRoot,
          env: gitEnv(),
        }).catch(() => null);
        const message = err instanceof Error ? err.message : "git merge --ff-only failed";
        throw new CliError({ exitCode: 2, code: "E_GIT", message });
      }
      mergeHash = await gitRevParse(resolved.gitRoot, ["HEAD"]);
    }

    if (!(await fileExists(prDir))) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `Missing PR artifact dir after merge: ${path.relative(resolved.gitRoot, prDir)}`,
      });
    }

    if (verifyEntries.length > 0) {
      for (const entry of verifyEntries) {
        await appendVerifyLog(verifyLogPath, entry.header, entry.content);
      }
    }

    const rawMeta = await readFile(metaPath, "utf8");
    const mergedMeta = parsePrMeta(rawMeta, task.id);
    const now = nowIso();
    const nextMeta: Record<string, unknown> = {
      ...mergedMeta,
      branch,
      base_branch: base,
      merge_strategy: opts.mergeStrategy,
      status: "MERGED",
      merged_at: (mergedMeta as Record<string, unknown>).merged_at ?? now,
      merge_commit: mergeHash,
      head_sha: branchHeadSha,
      updated_at: now,
    };
    if (verifyCommands.length > 0 && (shouldRunVerify || alreadyVerifiedSha)) {
      nextMeta.last_verified_sha = branchHeadSha;
      nextMeta.last_verified_at = now;
      nextMeta.verify = mergedMeta.verify
        ? { ...mergedMeta.verify, status: "pass" }
        : { status: "pass", command: verifyCommands.join(" && ") };
    }
    await writeJsonStableIfChanged(metaPath, nextMeta);

    const diffstat = await gitDiffStat(resolved.gitRoot, baseShaBeforeMerge, branch);
    await writeTextIfChanged(diffstatPath, diffstat ? `${diffstat}\n` : "");

    const verifyDesc =
      verifyCommands.length === 0
        ? "skipped(no commands)"
        : shouldRunVerify
          ? "ran"
          : alreadyVerifiedSha
            ? `skipped(already verified_sha=${alreadyVerifiedSha})`
            : "skipped";
    const finishBody = `Verified: Integrated via ${opts.mergeStrategy}; verify=${verifyDesc}; pr=${path.relative(
      resolved.gitRoot,
      prDir,
    )}.`;
    await cmdFinish({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskIds: [task.id],
      author: "INTEGRATOR",
      body: finishBody,
      commit: undefined,
      skipVerify: false,
      force: false,
      noRequireTaskIdInCommit: false,
      commitFromComment: false,
      commitEmoji: undefined,
      commitAllow: [],
      commitAutoAllow: false,
      commitAllowTasks: false,
      commitRequireClean: false,
      statusCommit: false,
      statusCommitEmoji: undefined,
      statusCommitAllow: [],
      statusCommitAutoAllow: false,
      statusCommitRequireClean: false,
      confirmStatusCommit: false,
      quiet: opts.quiet,
    });

    if (!opts.quiet) {
      process.stdout.write(
        `${successMessage("integrate", task.id, `merge=${mergeHash.slice(0, 12)}`)}\n`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "integrate", root: opts.rootOverride ?? null });
  } finally {
    if (createdTempWorktree && tempWorktreePath) {
      try {
        await execFileAsync("git", ["worktree", "remove", "--force", tempWorktreePath], {
          cwd: opts.cwd,
          env: gitEnv(),
        });
      } catch {
        // ignore cleanup errors
      }
    }
  }
}
