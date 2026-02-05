import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { loadConfig, resolveProject, saveConfig, setByDottedKey } from "@agentplaneorg/core";

import { backupPath, fileExists, getPathKind } from "../cli/fs-utils.js";
import { downloadToFile, fetchJson } from "../cli/http.js";
import { parseSha256Text, sha256File } from "../cli/checksum.js";
import { extractArchive } from "../cli/archive.js";
import {
  invalidFieldMessage,
  invalidValueMessage,
  missingValueMessage,
  requiredFieldMessage,
  usageMessage,
} from "../cli/output.js";
import { exitCodeForError } from "../cli/exit-codes.js";
import { CliError } from "../shared/errors.js";

const DEFAULT_UPGRADE_ASSET = "agentplane-upgrade.tar.gz";
const DEFAULT_UPGRADE_CHECKSUM_ASSET = "agentplane-upgrade.tar.gz.sha256";
const UPGRADE_USAGE =
  "Usage: agentplane upgrade [--tag <tag>] [--dry-run] [--no-backup] [--source <repo-url>] [--bundle <path|url>] [--checksum <path|url>]";
const UPGRADE_USAGE_EXAMPLE = "agentplane upgrade --tag v0.1.4 --dry-run";

type UpgradeFlags = {
  source?: string;
  tag?: string;
  bundle?: string;
  checksum?: string;
  asset?: string;
  checksumAsset?: string;
  dryRun: boolean;
  backup: boolean;
};

function parseUpgradeFlags(args: string[]): UpgradeFlags {
  const out: UpgradeFlags = { dryRun: false, backup: true };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (!arg.startsWith("--")) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(UPGRADE_USAGE, UPGRADE_USAGE_EXAMPLE),
      });
    }
    if (arg === "--dry-run") {
      out.dryRun = true;
      continue;
    }
    if (arg === "--no-backup") {
      out.backup = false;
      continue;
    }
    const next = args[i + 1];
    if (!next) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage(arg) });
    }
    switch (arg) {
      case "--source": {
        out.source = next;
        break;
      }
      case "--tag": {
        out.tag = next;
        break;
      }
      case "--bundle": {
        out.bundle = next;
        break;
      }
      case "--checksum": {
        out.checksum = next;
        break;
      }
      case "--asset": {
        out.asset = next;
        break;
      }
      case "--checksum-asset": {
        out.checksumAsset = next;
        break;
      }
      default: {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: usageMessage(UPGRADE_USAGE, UPGRADE_USAGE_EXAMPLE),
        });
      }
    }
    i++;
  }
  if ((out.bundle && !out.checksum) || (!out.bundle && out.checksum)) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(UPGRADE_USAGE, UPGRADE_USAGE_EXAMPLE),
    });
  }
  return out;
}

function parseGitHubRepo(source: string): { owner: string; repo: string } {
  const trimmed = source.trim();
  if (!trimmed) throw new Error(requiredFieldMessage("config.framework.source"));
  if (!trimmed.includes("github.com")) {
    throw new Error(invalidFieldMessage("config.framework.source", "GitHub URL"));
  }
  try {
    const url = new URL(trimmed);
    const parts = url.pathname.replaceAll(".git", "").split("/").filter(Boolean);
    if (parts.length < 2)
      throw new Error(invalidValueMessage("GitHub repo URL", trimmed, "owner/repo"));
    return { owner: parts[0], repo: parts[1] };
  } catch {
    throw new Error(invalidValueMessage("GitHub repo URL", trimmed, "owner/repo"));
  }
}

async function resolveUpgradeRoot(extractedDir: string): Promise<string> {
  const entries = await readdir(extractedDir, { withFileTypes: true });
  const dirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  const files = entries.filter((entry) => entry.isFile()).map((entry) => entry.name);
  if (files.length === 0 && dirs.length === 1) {
    return path.join(extractedDir, dirs[0]);
  }
  return extractedDir;
}

async function listFilesRecursive(rootDir: string): Promise<string[]> {
  const out: string[] = [];
  const entries = await readdir(rootDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await listFilesRecursive(fullPath)));
    } else if (entry.isFile()) {
      out.push(fullPath);
    }
  }
  return out;
}

function isAllowedUpgradePath(relPath: string): boolean {
  if (relPath === "AGENTS.md") return true;
  return relPath.startsWith(".agentplane/");
}

export async function cmdUpgrade(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseUpgradeFlags(opts.args);

  const resolved = await resolveProject({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const loaded = await loadConfig(resolved.agentplaneDir);
  const source = flags.source ?? loaded.config.framework.source;

  let tempRoot: string | null = null;
  let extractRoot: string | null = null;

  try {
    tempRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-upgrade-"));
    let bundlePath = "";
    let checksumPath = "";

    if (flags.bundle) {
      const isUrl = flags.bundle.startsWith("http://") || flags.bundle.startsWith("https://");
      bundlePath = isUrl ? path.join(tempRoot, "bundle.tar.gz") : path.resolve(flags.bundle);
      if (isUrl) {
        await downloadToFile(flags.bundle, bundlePath);
      }
      const checksumValue = flags.checksum ?? "";
      const checksumIsUrl =
        checksumValue.startsWith("http://") || checksumValue.startsWith("https://");
      checksumPath = checksumIsUrl
        ? path.join(tempRoot, "bundle.tar.gz.sha256")
        : path.resolve(checksumValue);
      if (checksumIsUrl) {
        await downloadToFile(checksumValue, checksumPath);
      }
    } else {
      const { owner, repo } = parseGitHubRepo(source);
      const releaseUrl = flags.tag
        ? `https://api.github.com/repos/${owner}/${repo}/releases/tags/${flags.tag}`
        : `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
      const release = (await fetchJson(releaseUrl)) as {
        assets?: { name?: string; browser_download_url?: string }[];
      };
      const assets = Array.isArray(release.assets) ? release.assets : [];
      const assetName = flags.asset ?? DEFAULT_UPGRADE_ASSET;
      const checksumName = flags.checksumAsset ?? DEFAULT_UPGRADE_CHECKSUM_ASSET;
      const asset = assets.find((entry) => entry.name === assetName);
      const checksumAsset = assets.find((entry) => entry.name === checksumName);
      if (!asset?.browser_download_url || !checksumAsset?.browser_download_url) {
        throw new CliError({
          exitCode: exitCodeForError("E_NETWORK"),
          code: "E_NETWORK",
          message: `Upgrade assets not found in ${owner}/${repo} release`,
        });
      }
      bundlePath = path.join(tempRoot, assetName);
      checksumPath = path.join(tempRoot, checksumName);
      await downloadToFile(asset.browser_download_url, bundlePath);
      await downloadToFile(checksumAsset.browser_download_url, checksumPath);
    }

    const expected = parseSha256Text(await readFile(checksumPath, "utf8"));
    if (!expected) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: "Upgrade checksum file is empty or invalid",
      });
    }
    const actual = await sha256File(bundlePath);
    if (actual !== expected) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `Upgrade checksum mismatch (expected ${expected}, got ${actual})`,
      });
    }

    extractRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-upgrade-extract-"));
    await extractArchive({
      archivePath: bundlePath,
      destDir: extractRoot,
      usage: UPGRADE_USAGE,
      example: UPGRADE_USAGE_EXAMPLE,
    });
    const bundleRoot = await resolveUpgradeRoot(extractRoot);

    const files = await listFilesRecursive(bundleRoot);
    const additions: string[] = [];
    const updates: string[] = [];
    const skipped: string[] = [];
    const fileContents = new Map<string, Buffer>();

    for (const filePath of files) {
      let rel = path.relative(bundleRoot, filePath).replaceAll("\\", "/");
      if (!rel || rel.startsWith("..") || path.isAbsolute(rel)) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Invalid bundle path: ${filePath}`,
        });
      }
      if (rel === ".git" || rel.startsWith(".git/")) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Upgrade bundle cannot write to .git (${rel})`,
        });
      }
      if (!isAllowedUpgradePath(rel)) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Upgrade bundle path not allowed: ${rel}`,
        });
      }

      const destPath = path.join(resolved.gitRoot, rel);
      const kind = await getPathKind(destPath);
      if (kind === "dir") {
        throw new CliError({
          exitCode: 5,
          code: "E_IO",
          message: `Upgrade target is a directory: ${rel}`,
        });
      }

      const data = await readFile(filePath);
      fileContents.set(rel, data);
      if (kind === null) {
        additions.push(rel);
      } else {
        const existing = await readFile(destPath);
        if (Buffer.compare(existing, data) === 0) {
          skipped.push(rel);
        } else {
          updates.push(rel);
        }
      }
    }

    if (flags.dryRun) {
      process.stdout.write(
        `Upgrade dry-run: ${additions.length} add, ${updates.length} update, ${skipped.length} unchanged\n`,
      );
      for (const rel of additions) process.stdout.write(`ADD ${rel}\n`);
      for (const rel of updates) process.stdout.write(`UPDATE ${rel}\n`);
      for (const rel of skipped) process.stdout.write(`SKIP ${rel}\n`);
      return 0;
    }

    for (const rel of [...additions, ...updates]) {
      const destPath = path.join(resolved.gitRoot, rel);
      if (flags.backup && (await fileExists(destPath))) {
        await backupPath(destPath);
      }
      await mkdir(path.dirname(destPath), { recursive: true });
      const data = fileContents.get(rel);
      if (data) await writeFile(destPath, data);
    }

    const raw = { ...loaded.raw };
    setByDottedKey(raw, "framework.last_update", new Date().toISOString());
    await saveConfig(resolved.agentplaneDir, raw);

    process.stdout.write(
      `Upgrade applied: ${additions.length} add, ${updates.length} update, ${skipped.length} unchanged\n`,
    );
    return 0;
  } finally {
    if (extractRoot) await rm(extractRoot, { recursive: true, force: true });
    if (tempRoot) await rm(tempRoot, { recursive: true, force: true });
  }
}
