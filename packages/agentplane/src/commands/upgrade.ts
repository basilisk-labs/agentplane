import {
  lstat,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  readlink,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadConfig, resolveProject, saveConfig, setByDottedKey } from "@agentplaneorg/core";

import { backupPath, fileExists, getPathKind } from "../cli/fs-utils.js";
import { downloadToFile, fetchJson } from "../cli/http.js";
import { parseSha256Text, sha256File } from "../cli/checksum.js";
import { extractArchive } from "../cli/archive.js";
import {
  invalidFieldMessage,
  invalidValueMessage,
  requiredFieldMessage,
  warnMessage,
} from "../cli/output.js";
import { exitCodeForError } from "../cli/exit-codes.js";
import { CliError } from "../shared/errors.js";
import { ensureNetworkApproved } from "./shared/network-approval.js";

const DEFAULT_UPGRADE_ASSET = "agentplane-upgrade.tar.gz";
const DEFAULT_UPGRADE_CHECKSUM_ASSET = "agentplane-upgrade.tar.gz.sha256";
const UPGRADE_DOWNLOAD_TIMEOUT_MS = 60_000;

export type UpgradeFlags = {
  source?: string;
  tag?: string;
  bundle?: string;
  checksum?: string;
  asset?: string;
  checksumAsset?: string;
  dryRun: boolean;
  backup: boolean;
  yes: boolean;
};

type GitHubRelease = {
  assets?: { name?: string; browser_download_url?: string }[];
  tarball_url?: string;
};

type FrameworkManifest = {
  schema_version: 1;
  files: FrameworkManifestEntry[];
};

type FrameworkManifestEntry = {
  path: string;
  source_path?: string;
  type: "markdown" | "json" | "text";
  merge_strategy: "agents_policy_markdown" | "agent_json_3way" | "agent_json_merge";
  required?: boolean;
};

const ASSETS_DIR_URL = new URL("../../assets/", import.meta.url);

async function loadFrameworkManifestFromPath(manifestPath: string): Promise<FrameworkManifest> {
  const text = await readFile(manifestPath, "utf8");
  const parsed = JSON.parse(text) as FrameworkManifest;
  if (parsed?.schema_version !== 1 || !Array.isArray(parsed?.files)) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: "Invalid framework.manifest.json (expected schema_version=1 and files array).",
    });
  }
  return parsed;
}

function isDeniedUpgradePath(relPath: string): boolean {
  if (relPath === ".agentplane/config.json") return true;
  if (relPath === ".agentplane/tasks.json") return true;
  if (relPath.startsWith(".agentplane/backends/")) return true;
  if (relPath.startsWith(".agentplane/worktrees/")) return true;
  if (relPath.startsWith(".agentplane/recipes/")) return true;
  if (relPath.startsWith(".agentplane/tasks/")) return true;
  if (relPath.startsWith(".agentplane/.upgrade/")) return true;
  if (relPath === ".git" || relPath.startsWith(".git/")) return true;
  return false;
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

export function normalizeFrameworkSourceForUpgrade(source: string): {
  source: string;
  owner: string;
  repo: string;
  migrated: boolean;
} {
  const { owner, repo } = parseGitHubRepo(source);
  if (owner === "basilisk-labs" && repo === "agent-plane") {
    return {
      source: `https://github.com/${owner}/agentplane`,
      owner,
      repo: "agentplane",
      migrated: true,
    };
  }
  return { source: `https://github.com/${owner}/${repo}`, owner, repo, migrated: false };
}

export function resolveUpgradeDownloadFromRelease(opts: {
  release: GitHubRelease;
  owner: string;
  repo: string;
  assetName: string;
  checksumName: string;
}):
  | { kind: "assets"; bundleUrl: string; checksumUrl: string }
  | { kind: "tarball"; tarballUrl: string } {
  const assets = Array.isArray(opts.release.assets) ? opts.release.assets : [];
  const asset = assets.find((a) => a?.name === opts.assetName);
  const checksumAsset = assets.find((a) => a?.name === opts.checksumName);
  if (asset?.browser_download_url && checksumAsset?.browser_download_url) {
    return {
      kind: "assets",
      bundleUrl: asset.browser_download_url,
      checksumUrl: checksumAsset.browser_download_url,
    };
  }

  const tarballUrl = typeof opts.release.tarball_url === "string" ? opts.release.tarball_url : "";
  if (!tarballUrl) {
    throw new CliError({
      exitCode: exitCodeForError("E_NETWORK"),
      code: "E_NETWORK",
      message: `Upgrade assets not found in ${opts.owner}/${opts.repo} release`,
    });
  }
  return { kind: "tarball", tarballUrl };
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

function isAllowedUpgradePath(relPath: string): boolean {
  if (relPath === "AGENTS.md") return true;
  if (relPath.startsWith(".agentplane/agents/") && relPath.endsWith(".json")) return true;
  return false;
}

const LOCAL_OVERRIDES_START = "<!-- AGENTPLANE:LOCAL-START -->";
const LOCAL_OVERRIDES_END = "<!-- AGENTPLANE:LOCAL-END -->";

function extractLocalOverridesBlock(text: string): string | null {
  const start = text.indexOf(LOCAL_OVERRIDES_START);
  const end = text.indexOf(LOCAL_OVERRIDES_END);
  if (start === -1 || end === -1 || end < start) return null;
  return text.slice(start + LOCAL_OVERRIDES_START.length, end).trim();
}

function withLocalOverridesBlock(base: string, localOverrides: string): string {
  const start = base.indexOf(LOCAL_OVERRIDES_START);
  const end = base.indexOf(LOCAL_OVERRIDES_END);
  if (start === -1 || end === -1 || end < start) {
    const suffix =
      "\n\n## Local Overrides (preserved across upgrades)\n\n" +
      `${LOCAL_OVERRIDES_START}\n` +
      (localOverrides.trim() ? `${localOverrides.trim()}\n` : "") +
      `${LOCAL_OVERRIDES_END}\n`;
    return `${base.trimEnd()}${suffix}`;
  }
  const before = base.slice(0, start + LOCAL_OVERRIDES_START.length);
  const after = base.slice(end);
  return `${before}\n${localOverrides.trim() ? `${localOverrides.trim()}\n` : ""}${after}`;
}

function parseH2Sections(text: string): Map<string, string> {
  const lines = text.replaceAll("\r\n", "\n").split("\n");
  const sections = new Map<string, string>();
  let current: string | null = null;
  let buf: string[] = [];

  const flush = () => {
    if (!current) return;
    if (!sections.has(current)) {
      sections.set(current, buf.join("\n").trimEnd());
    }
  };

  for (const line of lines) {
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (m) {
      flush();
      current = (m[1] ?? "").trim();
      buf = [];
      continue;
    }
    if (current) buf.push(line);
  }
  flush();
  return sections;
}

function mergeAgentsPolicyMarkdown(incoming: string, current: string): string {
  const local = extractLocalOverridesBlock(current);
  if (local !== null) {
    return withLocalOverridesBlock(incoming, local);
  }

  // Fallback: if the user edited AGENTS.md without the local markers, preserve their changes by
  // appending differing/extra sections into a dedicated local overrides block.
  const incomingSections = parseH2Sections(incoming);
  const currentSections = parseH2Sections(current);
  const overrides: string[] = [];
  for (const [title, body] of currentSections.entries()) {
    const incomingBody = incomingSections.get(title);
    if (incomingBody === undefined) {
      overrides.push(`### Added section: ${title}\n\n${body.trim()}\n`);
      continue;
    }
    if (incomingBody.trim() !== body.trim()) {
      overrides.push(`### Local edits for: ${title}\n\n${body.trim()}\n`);
    }
  }

  if (overrides.length === 0) return incoming;
  return withLocalOverridesBlock(incoming, overrides.join("\n"));
}

function isJsonRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function mergeAgentJson(incomingText: string, currentText: string): string | null {
  let incoming: unknown;
  let current: unknown;
  try {
    incoming = JSON.parse(incomingText);
    current = JSON.parse(currentText);
  } catch {
    return null;
  }
  if (!isJsonRecord(incoming) || !isJsonRecord(current)) return null;

  const out: Record<string, unknown> = { ...incoming };
  for (const [k, curVal] of Object.entries(current)) {
    const incVal = incoming[k];
    if (incVal === undefined) {
      out[k] = curVal;
      continue;
    }
    if (Array.isArray(incVal) && Array.isArray(curVal)) {
      const merged = [...(incVal as unknown[])] as unknown[];
      for (const item of curVal) {
        if (!merged.some((x) => JSON.stringify(x) === JSON.stringify(item))) merged.push(item);
      }
      out[k] = merged;
      continue;
    }
    if (isJsonRecord(incVal) && isJsonRecord(curVal)) {
      out[k] = { ...incVal, ...curVal };
      continue;
    }
    if (curVal !== incVal && curVal !== null && curVal !== "") {
      out[k] = curVal;
      continue;
    }
    out[k] = incVal;
  }

  return JSON.stringify(out, null, 2) + "\n";
}

function mergeAgentJson3Way(opts: {
  incomingText: string;
  currentText: string;
  baseText: string;
}): string | null {
  let incoming: unknown;
  let current: unknown;
  let base: unknown;
  try {
    incoming = JSON.parse(opts.incomingText);
    current = JSON.parse(opts.currentText);
    base = JSON.parse(opts.baseText);
  } catch {
    return null;
  }
  if (!isJsonRecord(incoming) || !isJsonRecord(current) || !isJsonRecord(base)) return null;

  const keys = new Set([...Object.keys(incoming), ...Object.keys(current), ...Object.keys(base)]);
  const out: Record<string, unknown> = {};

  for (const key of keys) {
    const incVal = incoming[key];
    const curVal = current[key];
    const baseVal = base[key];

    // Arrays: always take incoming as base; if user changed vs base, append user-only items.
    if (Array.isArray(incVal) && Array.isArray(curVal) && Array.isArray(baseVal)) {
      const merged = [...(incVal as unknown[])] as unknown[];
      const userChanged = JSON.stringify(curVal) !== JSON.stringify(baseVal);
      if (userChanged) {
        for (const item of curVal) {
          if (!merged.some((x) => JSON.stringify(x) === JSON.stringify(item))) merged.push(item);
        }
      }
      out[key] = merged;
      continue;
    }

    // Objects: shallow merge; for each subkey, prefer incoming unless user changed vs base.
    if (isJsonRecord(incVal) && isJsonRecord(curVal) && isJsonRecord(baseVal)) {
      const merged: Record<string, unknown> = { ...incVal };
      const subKeys = new Set([
        ...Object.keys(incVal),
        ...Object.keys(curVal),
        ...Object.keys(baseVal),
      ]);
      for (const sk of subKeys) {
        const incSub = incVal[sk];
        const curSub = curVal[sk];
        const baseSub = baseVal[sk];
        const userChanged = JSON.stringify(curSub) !== JSON.stringify(baseSub);
        if (userChanged) merged[sk] = curSub;
        else if (incSub !== undefined) merged[sk] = incSub;
        else if (curSub !== undefined) merged[sk] = curSub;
      }
      out[key] = merged;
      continue;
    }

    // Scalars: prefer incoming unless the user changed vs base.
    if (JSON.stringify(curVal) !== JSON.stringify(baseVal)) {
      if (curVal !== undefined) out[key] = curVal;
      else if (incVal !== undefined) out[key] = incVal;
      continue;
    }
    if (incVal !== undefined) out[key] = incVal;
    else if (curVal !== undefined) out[key] = curVal;
  }

  return JSON.stringify(out, null, 2) + "\n";
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
    await ensureNetworkApproved({ config: loaded.config, yes: flags.yes, reason });
    networkApproved = true;
  };

  const hasBundle = Boolean(flags.bundle);
  const hasRemoteHints =
    Boolean(flags.source) ||
    Boolean(flags.tag) ||
    Boolean(flags.asset) ||
    Boolean(flags.checksumAsset);
  const useRemote = flags.remote === true || hasRemoteHints;

  let tempRoot: string | null = null;
  let extractRoot: string | null = null;

  try {
    tempRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-upgrade-"));
    let bundlePath = "";
    let checksumPath = "";
    let bundleLayout: "local_assets" | "upgrade_bundle" | "repo_tarball" = "upgrade_bundle";
    let bundleRoot = "";
    let normalizedSourceToPersist: string | null = null;

    if (!hasBundle && !useRemote) {
      bundleLayout = "local_assets";
      bundleRoot = fileURLToPath(ASSETS_DIR_URL);
    } else if (flags.bundle) {
      const isUrl = flags.bundle.startsWith("http://") || flags.bundle.startsWith("https://");
      bundlePath = isUrl ? path.join(tempRoot, "bundle.tar.gz") : path.resolve(flags.bundle);
      if (isUrl) {
        await ensureApproved("upgrade downloads the bundle/checksum from the network");
        await downloadToFile(flags.bundle, bundlePath, UPGRADE_DOWNLOAD_TIMEOUT_MS);
      }
      const checksumValue = flags.checksum ?? "";
      const checksumIsUrl =
        checksumValue.startsWith("http://") || checksumValue.startsWith("https://");
      checksumPath = checksumIsUrl
        ? path.join(tempRoot, "bundle.tar.gz.sha256")
        : path.resolve(checksumValue);
      if (checksumIsUrl) {
        await ensureApproved("upgrade downloads the bundle/checksum from the network");
        await downloadToFile(checksumValue, checksumPath, UPGRADE_DOWNLOAD_TIMEOUT_MS);
      }
    } else {
      const sourceFromFlags = typeof flags.source === "string" && flags.source.trim().length > 0;
      const originalSource = flags.source ?? loaded.config.framework.source;
      const normalized = normalizeFrameworkSourceForUpgrade(originalSource);
      if (!sourceFromFlags && normalized.migrated) {
        normalizedSourceToPersist = normalized.source;
      }
      if (normalized.migrated) {
        process.stderr.write(
          `${warnMessage(
            `config.framework.source uses deprecated repo basilisk-labs/agent-plane; using ${normalized.source}`,
          )}\n`,
        );
      }

      const { owner, repo } = normalized;
      const releaseUrl = flags.tag
        ? `https://api.github.com/repos/${owner}/${repo}/releases/tags/${flags.tag}`
        : `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
      await ensureApproved(
        "upgrade fetches release metadata and downloads assets from the network",
      );
      const assetName = flags.asset ?? DEFAULT_UPGRADE_ASSET;
      const checksumName = flags.checksumAsset ?? DEFAULT_UPGRADE_CHECKSUM_ASSET;
      const release = (await fetchJson(releaseUrl)) as GitHubRelease;
      const download = resolveUpgradeDownloadFromRelease({
        release,
        owner,
        repo,
        assetName,
        checksumName,
      });

      if (download.kind === "assets") {
        bundlePath = path.join(tempRoot, assetName);
        checksumPath = path.join(tempRoot, checksumName);
        await downloadToFile(download.bundleUrl, bundlePath, UPGRADE_DOWNLOAD_TIMEOUT_MS);
        await downloadToFile(download.checksumUrl, checksumPath, UPGRADE_DOWNLOAD_TIMEOUT_MS);
      } else {
        process.stderr.write(
          `${warnMessage(
            `upgrade release does not include ${assetName}/${checksumName}; falling back to tarball_url without checksum verification`,
          )}\n`,
        );
        bundleLayout = "repo_tarball";
        bundlePath = path.join(tempRoot, "source.tar.gz");
        await downloadToFile(download.tarballUrl, bundlePath, UPGRADE_DOWNLOAD_TIMEOUT_MS);
        checksumPath = "";
      }
    }

    if (bundleLayout !== "local_assets" && checksumPath) {
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
    }
    if (bundleLayout !== "local_assets") {
      extractRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-upgrade-extract-"));
      await extractArchive({
        archivePath: bundlePath,
        destDir: extractRoot,
      });
      const extractedRoot = await resolveUpgradeRoot(extractRoot);
      bundleRoot =
        bundleLayout === "repo_tarball"
          ? path.join(extractedRoot, "packages", "agentplane", "assets")
          : extractedRoot;
    }
    const manifestPath =
      bundleLayout === "local_assets"
        ? fileURLToPath(new URL("../../assets/framework.manifest.json", import.meta.url))
        : path.join(bundleRoot, "framework.manifest.json");
    const manifest = await loadFrameworkManifestFromPath(manifestPath);

    const additions: string[] = [];
    const updates: string[] = [];
    const skipped: string[] = [];
    const fileContents = new Map<string, Buffer>();
    const merged: string[] = [];
    const missingRequired: string[] = [];

    const readBaselineText = async (baselineKey: string): Promise<string | null> => {
      try {
        return await readFile(path.join(baselineDirNew, baselineKey), "utf8");
      } catch {
        // Back-compat: older upgrades wrote baselines under .agentplane/upgrade/baseline.
        try {
          return await readFile(path.join(baselineDirLegacy, baselineKey), "utf8");
        } catch {
          return null;
        }
      }
    };

    const toBaselineKey = (rel: string): string | null => {
      if (rel === "AGENTS.md") return "AGENTS.md";
      if (rel.startsWith(".agentplane/")) return rel.slice(".agentplane/".length);
      return null;
    };

    for (const entry of manifest.files) {
      const rel = entry.path.replaceAll("\\", "/").trim();
      if (!rel || rel.startsWith("..") || path.isAbsolute(rel)) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Invalid manifest path: ${entry.path}`,
        });
      }
      if (isDeniedUpgradePath(rel)) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Manifest includes a denied path: ${rel}`,
        });
      }
      if (!isAllowedUpgradePath(rel)) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Manifest path not allowed: ${rel}`,
        });
      }

      const destPath = path.join(resolved.gitRoot, rel);
      const kind = await getPathKind(destPath);
      if (kind === "dir") {
        throw new CliError({
          exitCode: exitCodeForError("E_IO"),
          code: "E_IO",
          message: `Upgrade target is a directory: ${rel}`,
        });
      }

      const sourceRel = (entry.source_path ?? entry.path).replaceAll("\\", "/").trim();
      const sourcePath = path.join(bundleRoot, sourceRel);
      let data: Buffer;
      try {
        data = await readFile(sourcePath);
      } catch {
        if (entry.required) missingRequired.push(rel);
        continue;
      }

      if (kind !== null) {
        const existingText = await readFile(destPath, "utf8");
        if (entry.merge_strategy === "agents_policy_markdown" && rel === "AGENTS.md") {
          const mergedText = mergeAgentsPolicyMarkdown(data.toString("utf8"), existingText);
          data = Buffer.from(mergedText, "utf8");
          merged.push(rel);
        } else if (
          entry.merge_strategy === "agent_json_3way" &&
          rel.startsWith(".agentplane/agents/") &&
          rel.endsWith(".json")
        ) {
          const baselineKey = toBaselineKey(rel);
          let mergedText: string | null = null;
          if (baselineKey) {
            try {
              const baselineText = await readBaselineText(baselineKey);
              if (!baselineText) throw new Error("missing baseline");
              mergedText = mergeAgentJson3Way({
                incomingText: data.toString("utf8"),
                currentText: existingText,
                baseText: baselineText,
              });
            } catch {
              mergedText = null;
            }
          }
          mergedText ??= mergeAgentJson(data.toString("utf8"), existingText);
          if (mergedText) {
            data = Buffer.from(mergedText, "utf8");
            merged.push(rel);
          }
        }
      }

      fileContents.set(rel, data);
      if (kind === null) additions.push(rel);
      else {
        const existingBuf = await readFile(destPath);
        if (Buffer.compare(existingBuf, data) === 0) skipped.push(rel);
        else updates.push(rel);
      }
    }

    if (missingRequired.length > 0) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `Upgrade bundle is missing required managed files: ${missingRequired.join(", ")}`,
      });
    }

    if (flags.dryRun) {
      process.stdout.write(
        `Upgrade dry-run: ${additions.length} add, ${updates.length} update, ${skipped.length} unchanged\n`,
      );
      for (const rel of additions) process.stdout.write(`ADD ${rel}\n`);
      for (const rel of updates) process.stdout.write(`UPDATE ${rel}\n`);
      for (const rel of skipped) process.stdout.write(`SKIP ${rel}\n`);
      for (const rel of merged) process.stdout.write(`MERGE ${rel}\n`);
      return 0;
    }

    for (const rel of [...additions, ...updates]) {
      const destPath = path.join(resolved.gitRoot, rel);
      if (flags.backup && (await fileExists(destPath))) {
        await backupPath(destPath);
      }
      await mkdir(path.dirname(destPath), { recursive: true });
      const data = fileContents.get(rel);
      if (data) {
        if (rel === "AGENTS.md") {
          // Write the managed copy under .agentplane/ and keep the workspace-root policy path
          // as a symlink to it.
          const managedPath = path.join(resolved.agentplaneDir, "AGENTS.md");
          await mkdir(path.dirname(managedPath), { recursive: true });
          await writeFile(managedPath, data);

          // Replace AGENTS.md with a symlink if needed.
          const relTarget = path.relative(resolved.gitRoot, managedPath);
          try {
            const st = await lstat(destPath);
            if (st.isSymbolicLink()) {
              const currentTarget = await readlink(destPath);
              if (currentTarget !== relTarget) {
                await rm(destPath, { force: true });
              }
            } else {
              // If it's a regular file, remove it (backup already happened above when enabled).
              await rm(destPath, { force: true });
            }
          } catch {
            // destPath doesn't exist
          }
          if (!(await fileExists(destPath))) {
            await symlink(relTarget, destPath);
          }
        } else {
          await writeFile(destPath, data);
        }
      }

      // Record a baseline copy for future three-way merges.
      const baselineKey = toBaselineKey(rel);
      if (baselineKey && data) {
        const baselinePath = path.join(baselineDirNew, baselineKey);
        await mkdir(path.dirname(baselinePath), { recursive: true });
        await writeFile(baselinePath, data);
      }
    }

    const raw = { ...loaded.raw };
    if (normalizedSourceToPersist) {
      setByDottedKey(raw, "framework.source", normalizedSourceToPersist);
    }
    setByDottedKey(raw, "framework.last_update", new Date().toISOString());
    await saveConfig(resolved.agentplaneDir, raw);
    await writeFile(
      statePath,
      JSON.stringify(
        {
          applied_at: new Date().toISOString(),
          source: bundleLayout,
          updated: { add: additions.length, update: updates.length, unchanged: skipped.length },
        },
        null,
        2,
      ) + "\n",
      "utf8",
    );

    process.stdout.write(
      `Upgrade applied: ${additions.length} add, ${updates.length} update, ${skipped.length} unchanged\n`,
    );
    return 0;
  } finally {
    if (extractRoot) await rm(extractRoot, { recursive: true, force: true });
    if (tempRoot) await rm(tempRoot, { recursive: true, force: true });
    if (lockAcquired) {
      try {
        await rm(lockPath, { force: true });
      } catch {
        // best-effort cleanup
      }
    }
  }
}
