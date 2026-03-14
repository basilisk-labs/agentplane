import { lstat, mkdir, readlink, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { saveConfig, setByDottedKey } from "@agentplaneorg/core";

import { backupPath, fileExists } from "../../cli/fs-utils.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { withDiagnosticContext } from "../../shared/diagnostics.js";
import { CliError } from "../../shared/errors.js";
import { protectedPathKindForFile } from "../../shared/protected-paths.js";
import { execFileAsync, gitEnv } from "../shared/git.js";

import type { UpgradeReviewRecord } from "./types.js";

async function safeRemovePath(targetPath: string): Promise<void> {
  try {
    await rm(targetPath, { recursive: true, force: true });
  } catch {
    // best-effort cleanup
  }
}

export async function cleanupAutoUpgradeArtifacts(opts: {
  upgradeStateDir: string;
  createdBackups: string[];
}): Promise<void> {
  for (const backupPath of opts.createdBackups) {
    await safeRemovePath(backupPath);
  }
  await safeRemovePath(path.join(opts.upgradeStateDir, "agent"));
}

export async function ensureCleanTrackedTreeForUpgrade(gitRoot: string): Promise<void> {
  const { stdout } = await execFileAsync("git", ["status", "--short", "--untracked-files=no"], {
    cwd: gitRoot,
    env: gitEnv(),
    maxBuffer: 10 * 1024 * 1024,
  });
  const dirty = String(stdout ?? "")
    .split(/\r?\n/u)
    .map((line) => line.trimEnd())
    .filter((line) => line.length > 0);
  if (dirty.length === 0) return;
  throw new CliError({
    exitCode: exitCodeForError("E_GIT"),
    code: "E_GIT",
    message:
      "Upgrade --auto requires a clean tracked working tree.\n" +
      `Found tracked changes:\n${dirty.map((line) => `  ${line}`).join("\n")}`,
    context: withDiagnosticContext(
      { command: "upgrade" },
      {
        state: "managed upgrade cannot apply over tracked local edits",
        likelyCause:
          "auto-apply upgrade is about to replace framework-managed files, but the repository already has tracked modifications",
        nextAction: {
          command: "git status --short --untracked-files=no",
          reason: "inspect or clear tracked changes before rerunning `agentplane upgrade --yes`",
          reasonCode: "upgrade_dirty_tree",
        },
      },
    ),
  });
}

export async function createUpgradeCommit(opts: {
  gitRoot: string;
  paths: string[];
  tasksPath: string;
  workflowDir: string;
  versionLabel: string;
  source: "local_assets" | "upgrade_bundle" | "repo_tarball";
  additions: number;
  updates: number;
  unchanged: number;
  incidentsAppendedCount: number;
}): Promise<{ hash: string; subject: string } | null> {
  const uniquePaths = [...new Set(opts.paths.filter(Boolean))];
  if (uniquePaths.length === 0) return null;
  await execFileAsync("git", ["add", "--", ...uniquePaths], {
    cwd: opts.gitRoot,
    env: gitEnv(),
    maxBuffer: 10 * 1024 * 1024,
  });

  const { stdout: stagedOut } = await execFileAsync(
    "git",
    ["diff", "--cached", "--name-only", "-z"],
    {
      cwd: opts.gitRoot,
      env: gitEnv(),
      encoding: "buffer",
      maxBuffer: 10 * 1024 * 1024,
    },
  );
  const staged = (Buffer.isBuffer(stagedOut) ? stagedOut.toString("utf8") : String(stagedOut ?? ""))
    .split("\0")
    .map((entry) => entry.trim())
    .some(Boolean);
  if (!staged) return null;

  const subject = `⬆️ upgrade: apply framework ${opts.versionLabel}`;
  const body =
    `Upgrade-Version: ${opts.versionLabel}\n` +
    `Source: ${opts.source}\n` +
    `Managed-Changes: add=${opts.additions}, update=${opts.updates}, unchanged=${opts.unchanged}\n` +
    `Incidents-Appended: ${opts.incidentsAppendedCount}\n`;
  const allow = {
    allowTasks: false,
    allowPolicy: false,
    allowConfig: false,
    allowHooks: false,
    allowCI: false,
  };
  for (const filePath of uniquePaths) {
    const kind = protectedPathKindForFile({
      filePath,
      tasksPath: opts.tasksPath,
      workflowDir: opts.workflowDir,
    });
    if (kind === "tasks") allow.allowTasks = true;
    if (kind === "policy") allow.allowPolicy = true;
    if (kind === "config") allow.allowConfig = true;
    if (kind === "hooks") allow.allowHooks = true;
    if (kind === "ci") allow.allowCI = true;
  }
  try {
    await execFileAsync("git", ["commit", "-m", subject, "-m", body], {
      cwd: opts.gitRoot,
      env: {
        ...gitEnv(),
        AGENTPLANE_ALLOW_TASKS: allow.allowTasks ? "1" : "0",
        AGENTPLANE_ALLOW_POLICY: allow.allowPolicy ? "1" : "0",
        AGENTPLANE_ALLOW_CONFIG: allow.allowConfig ? "1" : "0",
        AGENTPLANE_ALLOW_HOOKS: allow.allowHooks ? "1" : "0",
        AGENTPLANE_ALLOW_CI: allow.allowCI ? "1" : "0",
      },
      maxBuffer: 10 * 1024 * 1024,
    });
  } catch (err) {
    const details = (err as { stderr?: string; message?: string } | null)?.stderr ?? "";
    throw new CliError({
      exitCode: exitCodeForError("E_GIT"),
      code: "E_GIT",
      message:
        "Upgrade applied but failed to create the upgrade commit.\n" +
        "Fix commit policy/hook issues and commit the staged upgrade files as a dedicated upgrade commit.\n" +
        (String(details).trim() ? `Details:\n${String(details).trim()}` : ""),
      context: withDiagnosticContext(
        { command: "upgrade" },
        {
          state: "managed files were updated, but the upgrade commit was blocked",
          likelyCause:
            "the generated upgrade commit hit a git hook or commit policy failure after the framework files were already staged",
          nextAction: {
            command: `git commit -m "⬆️ upgrade: apply framework ${opts.versionLabel}"`,
            reason:
              "record the already-staged framework changes as one dedicated upgrade commit after fixing the blocking hook or policy",
            reasonCode: "upgrade_commit_blocked",
          },
        },
      ),
    });
  }

  const { stdout: hashOut } = await execFileAsync("git", ["rev-parse", "HEAD"], {
    cwd: opts.gitRoot,
    env: gitEnv(),
  });
  return { hash: String(hashOut ?? "").trim(), subject };
}

export async function applyManagedFiles(opts: {
  gitRoot: string;
  additions: string[];
  updates: string[];
  backup: boolean;
  fileContents: Map<string, Buffer>;
  baselineDir: string;
  createdBackups: string[];
  toBaselineKey: (rel: string) => string | null;
}): Promise<void> {
  for (const rel of [...opts.additions, ...opts.updates]) {
    const destPath = path.join(opts.gitRoot, rel);
    if (opts.backup && (await fileExists(destPath))) {
      const backup = await backupPath(destPath);
      opts.createdBackups.push(backup);
    }
    await mkdir(path.dirname(destPath), { recursive: true });
    const data = opts.fileContents.get(rel);
    if (data) {
      if (rel === "AGENTS.md" || rel === "CLAUDE.md") {
        try {
          const st = await lstat(destPath);
          if (st.isSymbolicLink()) {
            const linkTarget = await readlink(destPath);
            const targetAbs = path.resolve(path.dirname(destPath), linkTarget);
            const relFromRoot = path.relative(opts.gitRoot, targetAbs);
            if (relFromRoot.startsWith("..") || path.isAbsolute(relFromRoot)) {
              throw new CliError({
                exitCode: exitCodeForError("E_VALIDATION"),
                code: "E_VALIDATION",
                message:
                  `Refusing to overwrite symlinked ${rel} target outside repo: ${linkTarget}. ` +
                  "Replace the symlink with a regular file and retry.",
              });
            }
          }
        } catch (err) {
          const code = (err as { code?: string } | null)?.code;
          if (code !== "ENOENT") throw err;
        }
      }

      await writeFile(destPath, data);
    }

    const baselineKey = opts.toBaselineKey(rel);
    if (baselineKey && data) {
      const baselinePath = path.join(opts.baselineDir, baselineKey);
      await mkdir(path.dirname(baselinePath), { recursive: true });
      await writeFile(baselinePath, data);
    }
  }
}

export async function persistUpgradeState(opts: {
  agentplaneDir: string;
  rawConfig: Record<string, unknown>;
  normalizedSourceToPersist: string | null;
  expectedCliVersionToPersist: string | null;
  hasManagedMutations: boolean;
  statePath: string;
  upgradeStateDir: string;
  source: "local_assets" | "upgrade_bundle" | "repo_tarball";
  reviewRecords: UpgradeReviewRecord[];
  additions: number;
  updates: number;
  skipped: number;
}): Promise<boolean> {
  const hasSourceMigration = opts.normalizedSourceToPersist !== null;
  const shouldMutateConfig = opts.hasManagedMutations || hasSourceMigration;
  if (shouldMutateConfig) {
    const raw = { ...opts.rawConfig };
    if (opts.normalizedSourceToPersist) {
      setByDottedKey(raw, "framework.source", opts.normalizedSourceToPersist);
    }
    setByDottedKey(raw, "framework.last_update", new Date().toISOString());
    if (opts.expectedCliVersionToPersist) {
      setByDottedKey(raw, "framework.cli.expected_version", opts.expectedCliVersionToPersist);
    }
    await saveConfig(opts.agentplaneDir, raw);
  }
  await writeFile(
    opts.statePath,
    JSON.stringify(
      {
        applied_at: new Date().toISOString(),
        source: opts.source,
        updated: { add: opts.additions, update: opts.updates, unchanged: opts.skipped },
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );
  await writeFile(
    path.join(opts.upgradeStateDir, "last-review.json"),
    JSON.stringify(
      {
        generated_at: new Date().toISOString(),
        counts: {
          total: opts.reviewRecords.length,
          needsSemanticReview: opts.reviewRecords.filter((r) => r.needsSemanticReview).length,
        },
        files: opts.reviewRecords,
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );
  return shouldMutateConfig;
}
