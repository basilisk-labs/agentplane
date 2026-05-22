import { setByDottedKey, saveConfig } from "@agentplaneorg/core/config";
import { lstat, mkdir, readlink, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { backupPath, fileExists } from "../../cli/fs-utils.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { withDiagnosticContext } from "../shared/diagnostics.js";
import { CliError } from "../../shared/errors.js";
import { protectedPathKindForFile } from "../../shared/protected-paths.js";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";

import type { UpgradeReviewRecord } from "./types.js";

const RUNTIME_SQLITE_GITIGNORE_LINES = new Set([
  ".agentplane/cache.sqlite",
  ".agentplane/cache.sqlite-wal",
  ".agentplane/cache.sqlite-shm",
]);

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

function parseGitStatusPath(line: string): string | null {
  const trimmed = line.trimEnd();
  if (trimmed.length < 4) return null;
  const rawPath = trimmed.slice(3).trim();
  if (!rawPath) return null;
  const renameArrow = " -> ";
  const normalized = rawPath.includes(renameArrow) ? rawPath.split(renameArrow).at(-1) : rawPath;
  return normalized?.replaceAll("\\", "/") ?? null;
}

async function isRuntimeSqliteGitignoreOnlyDiff(
  gitRoot: string,
  dirty: string[],
): Promise<boolean> {
  const dirtyPaths = dirty
    .map((line) => parseGitStatusPath(line))
    .filter((relPath): relPath is string => relPath !== null);
  if (dirtyPaths.length === 0 || dirtyPaths.some((relPath) => relPath !== ".gitignore")) {
    return false;
  }
  const { stdout } = await execFileAsync("git", ["diff", "HEAD", "--", ".gitignore"], {
    cwd: gitRoot,
    env: gitEnv(),
    maxBuffer: 10 * 1024 * 1024,
  });
  const changedLines = String(stdout ?? "")
    .split(/\r?\n/u)
    .filter((line) => /^[+-](?![+-]{2})/u.test(line))
    .map((line) => line.slice(1).trim());
  return (
    changedLines.length > 0 &&
    changedLines.every((line) => RUNTIME_SQLITE_GITIGNORE_LINES.has(line))
  );
}

export type PreparedTrackedTreeForUpgrade = {
  dirtyLines: string[];
  dirtyPaths: string[];
  patchRelPath: string | null;
  unstagedPaths: string[];
};

function parseGitStatusIndex(line: string): string {
  return line.length > 0 ? (line[0] ?? " ") : " ";
}

type TrackedStatusEntry = {
  display: string;
  indexStatus: string;
  relPath: string;
};

function parseGitStatusPorcelainZ(raw: Buffer | string): TrackedStatusEntry[] {
  const text = Buffer.isBuffer(raw) ? raw.toString("utf8") : String(raw ?? "");
  const records = text.split("\0").filter((record) => record.length > 0);
  const entries: TrackedStatusEntry[] = [];
  for (let i = 0; i < records.length; i += 1) {
    const record = records[i] ?? "";
    if (record.length < 4) continue;
    const status = record.slice(0, 2);
    const relPath = record.slice(3).replaceAll("\\", "/");
    entries.push({
      display: `${status} ${relPath}`,
      indexStatus: status[0] ?? " ",
      relPath,
    });
    if (status.includes("R") || status.includes("C")) {
      i += 1;
    }
  }
  return entries;
}

async function writeDirtyTrackedPatch(opts: {
  gitRoot: string;
  upgradeStateDir: string;
  dirtyLines: string[];
  dirtyPaths: string[];
}): Promise<string | null> {
  const { stdout } = await execFileAsync(
    "git",
    ["diff", "HEAD", "--binary", "--", ...opts.dirtyPaths],
    {
      cwd: opts.gitRoot,
      env: gitEnv(),
      maxBuffer: 20 * 1024 * 1024,
    },
  );
  const patch = String(stdout ?? "");
  if (patch.trim().length === 0) return null;

  const dirtyDir = path.join(opts.upgradeStateDir, "user-dirty");
  await mkdir(dirtyDir, { recursive: true });
  const patchPath = path.join(dirtyDir, "tracked.patch");
  const statusPath = path.join(dirtyDir, "status.txt");
  await writeFile(patchPath, patch, "utf8");
  await writeFile(statusPath, `${opts.dirtyLines.join("\n")}\n`, "utf8");
  return path.relative(opts.gitRoot, patchPath).replaceAll("\\", "/");
}

export async function prepareTrackedTreeForUpgrade(opts: {
  gitRoot: string;
  upgradeStateDir: string;
}): Promise<PreparedTrackedTreeForUpgrade> {
  const { stdout } = await execFileAsync(
    "git",
    ["status", "--porcelain", "-z", "--untracked-files=no"],
    {
      cwd: opts.gitRoot,
      env: gitEnv(),
      encoding: "buffer",
      maxBuffer: 10 * 1024 * 1024,
    },
  );
  const statusEntries = parseGitStatusPorcelainZ(stdout);
  const dirty = statusEntries.map((entry) => entry.display);
  if (dirty.length === 0 || (await isRuntimeSqliteGitignoreOnlyDiff(opts.gitRoot, dirty))) {
    return { dirtyLines: [], dirtyPaths: [], patchRelPath: null, unstagedPaths: [] };
  }

  const dirtyPaths = [...new Set(statusEntries.map((entry) => entry.relPath))];
  const stagedPaths = [
    ...new Set(
      statusEntries
        .filter((entry) => parseGitStatusIndex(entry.indexStatus) !== " ")
        .map((entry) => entry.relPath),
    ),
  ];
  const patchRelPath = await writeDirtyTrackedPatch({
    gitRoot: opts.gitRoot,
    upgradeStateDir: opts.upgradeStateDir,
    dirtyLines: dirty,
    dirtyPaths,
  });

  if (stagedPaths.length > 0) {
    await execFileAsync("git", ["reset", "HEAD", "--", ...stagedPaths], {
      cwd: opts.gitRoot,
      env: gitEnv(),
      maxBuffer: 10 * 1024 * 1024,
    });
  }

  return {
    dirtyLines: dirty,
    dirtyPaths,
    patchRelPath,
    unstagedPaths: stagedPaths,
  };
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
  removals: number;
  unchanged: number;
  incidentsAppendedCount: number;
}): Promise<{ hash: string; subject: string } | null> {
  const uniquePaths = [...new Set(opts.paths.filter(Boolean))];
  if (uniquePaths.length === 0) return null;

  const stageablePaths: string[] = [];
  for (const rel of uniquePaths) {
    if (await fileExists(path.join(opts.gitRoot, rel))) {
      stageablePaths.push(rel);
      continue;
    }
    try {
      await execFileAsync("git", ["ls-files", "--error-unmatch", "--", rel], {
        cwd: opts.gitRoot,
        env: gitEnv(),
      });
      stageablePaths.push(rel);
    } catch {
      // Removed untracked files do not need staging.
    }
  }
  if (stageablePaths.length === 0) return null;
  await execFileAsync("git", ["add", "-A", "--", ...stageablePaths], {
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
  if (staged === false) return null;

  const subject = `⬆️ upgrade: apply framework ${opts.versionLabel}`;
  const body =
    `Upgrade-Version: ${opts.versionLabel}\n` +
    `Source: ${opts.source}\n` +
    `Managed-Changes: add=${opts.additions}, update=${opts.updates}, remove=${opts.removals}, unchanged=${opts.unchanged}\n` +
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
        AGENTPLANE_ALLOW_UPGRADE: "1",
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
  removals: string[];
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

  for (const rel of opts.removals) {
    const destPath = path.join(opts.gitRoot, rel);
    if (opts.backup && (await fileExists(destPath))) {
      const backup = await backupPath(destPath);
      opts.createdBackups.push(backup);
    }
    await rm(destPath, { force: true });

    const baselineKey = opts.toBaselineKey(rel);
    if (baselineKey) {
      await rm(path.join(opts.baselineDir, baselineKey), { force: true });
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
