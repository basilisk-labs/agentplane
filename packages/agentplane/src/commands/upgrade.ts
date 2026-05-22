import { resolveProject } from "@agentplaneorg/core/project";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadConfig } from "@agentplaneorg/core/config";
import { gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

import { fileExists } from "../cli/fs-utils.js";
import { exitCodeForError } from "../cli/exit-codes.js";
import { warnMessage } from "../cli/output.js";
import { CliError } from "../shared/errors.js";
import { ensureWorkflowArtifacts } from "../shared/workflow-artifacts.js";
import { checkTaskReadmeMigrationState } from "./doctor/workspace.js";
import { runOperatorPipeline } from "./shared/operator-pipeline.js";
import { loadCommandContext } from "./shared/task-backend.js";
import { ensureNetworkApproved } from "./shared/network-approval.js";
import { ensureRuntimeSqliteGitignore } from "../runtime/shared/runtime-gitignore.js";
import { migrateTaskDocsInWorkspace } from "./task/migrate-doc.js";
import {
  applyManagedFiles,
  cleanupAutoUpgradeArtifacts,
  createUpgradeCommit,
  ensureCleanTrackedTreeForUpgrade,
  persistUpgradeState,
} from "./upgrade/apply.js";
import { materializeUpgradeSource, type MaterializedUpgrade } from "./upgrade/materialize.js";
import { planManagedUpgrade } from "./upgrade/plan.js";
import {
  CONFIG_REL_PATH,
  WORKFLOW_REL_PATH,
  isAllowedUpgradePath,
  normalizeVersionForConfig,
  toUpgradeBaselineKey,
} from "./upgrade/policy.js";
import { printUpgradeDryRun, writeUpgradeAgentReview } from "./upgrade/report.js";
import { describeUpgradeSource } from "./upgrade/source.js";
import { resolveAgentplaneAssetDirUrl } from "../shared/package-paths.js";

export type UpgradeFlags = {
  source?: string;
  tag?: string;
  bundle?: string;
  checksum?: string;
  asset?: string;
  checksumAsset?: string;
  mode: "agent" | "auto";
  remote: boolean;
  allowTarball: boolean;
  dryRun: boolean;
  backup: boolean;
  migrateTaskDocs: boolean;
  yes: boolean;
};

const ASSETS_DIR_URL = resolveAgentplaneAssetDirUrl();

async function isTrackedFile(gitRoot: string, relPath: string): Promise<boolean> {
  try {
    await execFileAsync("git", ["ls-files", "--error-unmatch", "--", relPath], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    return true;
  } catch {
    return false;
  }
}

function parseGitStatusPath(line: string): string | null {
  const trimmed = line.trimEnd();
  if (trimmed.length < 4) return null;
  const rawPath = trimmed.slice(3).trim();
  if (!rawPath) return null;
  const renameArrow = " -> ";
  const normalized = rawPath.includes(renameArrow) ? rawPath.split(renameArrow).at(-1) : rawPath;
  return normalized?.replaceAll("\\", "/") ?? null;
}

function isUpgradeAutoCommitPath(relPath: string): boolean {
  if (relPath === ".gitignore") return true;
  if (relPath === CONFIG_REL_PATH || relPath === WORKFLOW_REL_PATH) return true;
  return isAllowedUpgradePath(relPath);
}

async function listUpgradeAutoCommitTrackedDiff(gitRoot: string): Promise<string[]> {
  const { stdout } = await execFileAsync("git", ["status", "--short", "--untracked-files=no"], {
    cwd: gitRoot,
    env: gitEnv(),
    maxBuffer: 10 * 1024 * 1024,
  });
  const lines = String(stdout ?? "")
    .split(/\r?\n/u)
    .map((line) => line.trimEnd())
    .filter(Boolean);
  return lines
    .map((line) => parseGitStatusPath(line))
    .filter((relPath): relPath is string => relPath !== null)
    .filter((relPath) => isUpgradeAutoCommitPath(relPath));
}

export async function cmdUpgradeParsed(opts: {
  cwd: string;
  rootOverride?: string;
  flags: UpgradeFlags;
}): Promise<number> {
  const flags = opts.flags;
  if ((flags.bundle && !flags.checksum) || (!flags.bundle && flags.checksum)) {
    // Defensive: cli2 spec validate should prevent this, but keep invariant enforcement
    // for any non-CLI callers.
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Options --bundle and --checksum must be provided together (or omitted together).",
    });
  }

  const resolved = await resolveProject({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const loaded = await loadConfig(resolved.agentplaneDir);
  if (flags.mode === "auto" && !flags.dryRun) {
    await ensureCleanTrackedTreeForUpgrade(resolved.gitRoot);
  }
  const commandCtx = await loadCommandContext({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    resolvedProject: resolved,
    config: loaded.config,
  });
  const upgradeStateDir = path.join(resolved.agentplaneDir, ".upgrade");
  const lockPath = path.join(upgradeStateDir, "lock.json");
  const statePath = path.join(upgradeStateDir, "state.json");
  const baselineDirNew = path.join(upgradeStateDir, "baseline");
  const baselineDirLegacy = path.join(resolved.agentplaneDir, "upgrade", "baseline");

  await mkdir(upgradeStateDir, { recursive: true });
  if (await fileExists(lockPath)) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Upgrade is locked (found ${path.relative(resolved.gitRoot, lockPath)})`,
    });
  }
  await writeFile(
    lockPath,
    JSON.stringify({ pid: process.pid, started_at: new Date().toISOString() }, null, 2) + "\n",
    "utf8",
  );
  let lockAcquired = true;
  let networkApproved = false;
  const ensureApproved = async (reason: string): Promise<void> => {
    if (networkApproved) return;
    await ensureNetworkApproved({
      action: "upgrade_apply",
      config: loaded.config,
      yes: flags.yes,
      reason,
    });
    networkApproved = true;
  };

  const hasBundle = Boolean(flags.bundle);
  const hasRemoteHints =
    Boolean(flags.source) ||
    Boolean(flags.tag) ||
    Boolean(flags.asset) ||
    Boolean(flags.checksumAsset);
  const useRemote = flags.remote === true || hasRemoteHints;

  const createdBackups: string[] = [];
  let materialized: MaterializedUpgrade | null = null;

  return await runOperatorPipeline({
    init: () => null,
    materialize: async () => {
      materialized = await materializeUpgradeSource({
        flags,
        frameworkSource: loaded.config.framework.source,
        assetsDirUrl: ASSETS_DIR_URL,
        ensureApproved,
      });
      const modeLabel = flags.dryRun ? "dry-run" : flags.mode === "agent" ? "plan" : "apply";
      process.stdout.write(
        `Upgrade source: ${describeUpgradeSource({
          bundleLayout: materialized.bundleLayout,
          hasExplicitBundle: hasBundle,
          useRemote,
        })}\n` +
          `Upgrade version: ${materialized.upgradeVersionLabel}\n` +
          `Upgrade mode: ${modeLabel}\n`,
      );
    },
    execute: async () => {
      if (!materialized) {
        throw new CliError({
          exitCode: exitCodeForError("E_IO"),
          code: "E_IO",
          message: "Upgrade bundle did not materialize correctly",
        });
      }
      const {
        additions,
        updates,
        removals,
        skipped,
        merged,
        fileContents,
        reviewRecords,
        incidentsAppendedCount,
      } = await planManagedUpgrade({
        gitRoot: resolved.gitRoot,
        manifest: materialized.manifest,
        bundleRoot: materialized.bundleRoot,
        baselineDirNew,
        baselineDirLegacy,
      });

      if (flags.dryRun) {
        printUpgradeDryRun({ additions, updates, removals, skipped, merged });
        return 0;
      }

      if (flags.mode === "agent") {
        // Fast no-op path: nothing to apply.
        // Skip generating per-run artifacts to keep agent-mode upgrades cheap.
        if (additions.length === 0 && updates.length === 0 && removals.length === 0) {
          process.stdout.write("Upgrade plan: no managed changes detected\n");
          return 0;
        }

        const { relRunDir } = await writeUpgradeAgentReview({
          gitRoot: resolved.gitRoot,
          runRoot: path.join(upgradeStateDir, "agent"),
          manifest: materialized.manifest,
          additions,
          updates,
          removals,
          skipped,
          merged,
          reviewRecords,
        });
        process.stdout.write(`Upgrade plan written: ${relRunDir}\n`);
        return 0;
      }

      await applyManagedFiles({
        gitRoot: resolved.gitRoot,
        additions,
        updates,
        removals,
        backup: flags.backup,
        fileContents,
        baselineDir: baselineDirNew,
        createdBackups,
        toBaselineKey: toUpgradeBaselineKey,
      });
      const migratedTaskDocs = flags.migrateTaskDocs
        ? await migrateTaskDocsInWorkspace({
            cwd: opts.cwd,
            rootOverride: opts.rootOverride ?? null,
            all: true,
            taskIds: [],
            resolvedProject: resolved,
            config: loaded.config,
          })
        : { changed: 0, changedPaths: [] };
      if (flags.migrateTaskDocs) {
        const details =
          migratedTaskDocs.changed > 0 ? `changed=${migratedTaskDocs.changed}` : "already current";
        process.stdout.write(`Task README migration: ${details}\n`);
      }
      await ensureRuntimeSqliteGitignore({ gitRoot: resolved.gitRoot });

      const hasManagedMutations = additions.length > 0 || updates.length > 0 || removals.length > 0;
      const legacyConfigWasTracked = await isTrackedFile(resolved.gitRoot, CONFIG_REL_PATH);
      const shouldMutateConfig = await persistUpgradeState({
        agentplaneDir: resolved.agentplaneDir,
        rawConfig: loaded.raw,
        normalizedSourceToPersist: materialized.normalizedSourceToPersist,
        expectedCliVersionToPersist: normalizeVersionForConfig(materialized.upgradeVersionLabel),
        hasManagedMutations,
        statePath,
        upgradeStateDir,
        source: materialized.bundleLayout,
        reviewRecords,
        additions: additions.length,
        updates: updates.length,
        skipped: skipped.length,
      });
      const orchestratorProfilePath = path.join(
        resolved.agentplaneDir,
        "agents",
        "ORCHESTRATOR.json",
      );
      const workflowArtifacts = (await fileExists(orchestratorProfilePath))
        ? await ensureWorkflowArtifacts({
            gitRoot: resolved.gitRoot,
            workflowMode: loaded.config.workflow_mode,
            approvals: {
              requirePlanApproval: loaded.config.agents?.approvals?.require_plan ?? true,
              requireVerifyApproval: loaded.config.agents?.approvals?.require_verify ?? true,
              requireNetworkApproval: loaded.config.agents?.approvals?.require_network ?? true,
            },
          })
        : { installPaths: [], commitPaths: [], changedPaths: [] };
      const commitPaths = [
        ...new Set([
          ...additions,
          ...updates,
          ...removals,
          ...migratedTaskDocs.changedPaths,
          ...workflowArtifacts.commitPaths,
          ...(shouldMutateConfig ? [WORKFLOW_REL_PATH] : []),
          ...(shouldMutateConfig && legacyConfigWasTracked ? [CONFIG_REL_PATH] : []),
          ...(await listUpgradeAutoCommitTrackedDiff(resolved.gitRoot)),
        ]),
      ];
      const commit = await createUpgradeCommit({
        gitRoot: resolved.gitRoot,
        paths: commitPaths,
        tasksPath: loaded.config.paths.tasks_path,
        workflowDir: loaded.config.paths.workflow_dir,
        versionLabel: materialized.upgradeVersionLabel,
        source: materialized.bundleLayout,
        additions: additions.length,
        updates: updates.length,
        removals: removals.length,
        unchanged: skipped.length,
        incidentsAppendedCount,
      });
      await cleanupAutoUpgradeArtifacts({ upgradeStateDir, createdBackups });

      process.stdout.write(
        `Upgrade applied: ${additions.length} add, ${updates.length} update, ${removals.length} remove, ${skipped.length} unchanged\n`,
      );
      if (workflowArtifacts.changedPaths.length > 0) {
        process.stdout.write(
          `Workflow artifacts refreshed: ${workflowArtifacts.commitPaths.join(", ")}\n`,
        );
      }
      if (commit) {
        process.stdout.write(`Upgrade commit: ${commit.hash.slice(0, 12)} ${commit.subject}\n`);
      }
      const taskReadmeMigrationFindings = await checkTaskReadmeMigrationState(
        resolved.gitRoot,
        commandCtx,
      );
      if (taskReadmeMigrationFindings.length > 0) {
        process.stderr.write(
          `${warnMessage("upgrade post-check: task README migration follow-up detected")}\n`,
        );
        for (const finding of taskReadmeMigrationFindings) {
          process.stderr.write(`- ${finding}\n`);
        }
      }
      return 0;
    },
    cleanup: async () => {
      if (materialized?.extractRoot) {
        await rm(materialized.extractRoot, { recursive: true, force: true });
      }
      if (materialized?.tempRoot) {
        await rm(materialized.tempRoot, { recursive: true, force: true });
      }
      if (lockAcquired) {
        try {
          await rm(lockPath, { force: true });
        } catch {
          // best-effort cleanup
        }
      }
    },
  });
}

export {
  normalizeFrameworkSourceForUpgrade,
  resolveRepoTarballUrl,
  resolveUpgradeDownloadFromRelease,
} from "./upgrade/source.js";
