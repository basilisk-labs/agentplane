import { setByDottedKey, saveConfig } from "@agentplaneorg/core/config";
import { lstat, mkdir, readlink, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { backupPath, fileExists } from "../../cli/fs-utils.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";

import type { UpgradeReviewRecord } from "./types.js";
export { createUpgradeCommit, prepareTrackedTreeForUpgrade } from "./apply-git.js";

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
