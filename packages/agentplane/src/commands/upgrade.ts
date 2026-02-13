import {
  lstat,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  readlink,
  rm,
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
const UPGRADE_RELEASE_METADATA_TIMEOUT_MS = 15_000;

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
  yes: boolean;
};

type GitHubRelease = {
  tag_name?: string;
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

type UpgradeReviewRecord = {
  relPath: string;
  mergeStrategy: FrameworkManifestEntry["merge_strategy"];
  hasBaseline: boolean;
  changedCurrentVsBaseline: boolean | null;
  changedIncomingVsBaseline: boolean | null;
  currentDiffersFromIncoming: boolean;
  needsSemanticReview: boolean;
  mergeApplied: boolean;
  mergePath:
    | "none"
    | "markdownOverrides"
    | "3way"
    | "incomingWins"
    | "incomingWinsFallback"
    | "parseFailed";
};

async function safeRemovePath(targetPath: string): Promise<void> {
  try {
    await rm(targetPath, { recursive: true, force: true });
  } catch {
    // best-effort cleanup
  }
}

async function cleanupAutoUpgradeArtifacts(opts: {
  upgradeStateDir: string;
  createdBackups: string[];
}): Promise<void> {
  for (const backupPath of opts.createdBackups) {
    await safeRemovePath(backupPath);
  }
  // Keep durable state files at .upgrade root; remove transient per-run agent artifacts.
  await safeRemovePath(path.join(opts.upgradeStateDir, "agent"));
}

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

function buildCodeloadTarGzUrl(opts: { owner: string; repo: string; tag: string }): string {
  // Prefer codeload over api.github.com tarball_url. It is less brittle and does not require
  // GitHub API-specific behavior/rate limits.
  const tag = opts.tag.trim();
  if (!tag) throw new Error("tag is required");
  return `https://codeload.github.com/${opts.owner}/${opts.repo}/tar.gz/${encodeURIComponent(tag)}`;
}

export function resolveRepoTarballUrl(opts: {
  release: GitHubRelease;
  owner: string;
  repo: string;
  explicitTag?: string;
}): string {
  const tag =
    (typeof opts.explicitTag === "string" && opts.explicitTag.trim()) ||
    (typeof opts.release.tag_name === "string" && opts.release.tag_name.trim()) ||
    "";
  if (tag) return buildCodeloadTarGzUrl({ owner: opts.owner, repo: opts.repo, tag });

  const tarballUrl = typeof opts.release.tarball_url === "string" ? opts.release.tarball_url : "";
  if (tarballUrl) return tarballUrl;

  throw new CliError({
    exitCode: exitCodeForError("E_NETWORK"),
    code: "E_NETWORK",
    message:
      "GitHub release did not provide tag_name or tarball_url; cannot fall back to repo tarball.",
  });
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

function canonicalizeJson(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((v) => canonicalizeJson(v));
  if (isJsonRecord(value)) {
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(value).toSorted()) {
      out[k] = canonicalizeJson(value[k]);
    }
    return out;
  }
  return value;
}

function jsonEqual(a: unknown, b: unknown): boolean {
  const ca = JSON.stringify(canonicalizeJson(a)) ?? "__undefined__";
  const cb = JSON.stringify(canonicalizeJson(b)) ?? "__undefined__";
  return ca === cb;
}

function textChangedForType(opts: {
  type: FrameworkManifestEntry["type"];
  aText: string | null;
  bText: string | null;
}): boolean {
  if (opts.aText === null && opts.bText === null) return false;
  if (opts.aText === null || opts.bText === null) return true;
  if (opts.type === "json") {
    try {
      const a: unknown = JSON.parse(opts.aText);
      const b: unknown = JSON.parse(opts.bText);
      return !jsonEqual(a, b);
    } catch {
      return opts.aText.trim() !== opts.bText.trim();
    }
  }
  return opts.aText.trimEnd() !== opts.bText.trimEnd();
}

// Used as a fallback for 3-way merges when no baseline is available. Incoming (upstream) values
// win for scalar/object conflicts, while user-added keys and array items are preserved.
function mergeAgentJsonIncomingWins(incomingText: string, currentText: string): string | null {
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
      const seen = new Set<string>();
      for (const x of merged) seen.add(JSON.stringify(canonicalizeJson(x)));
      for (const item of curVal) {
        const key = JSON.stringify(canonicalizeJson(item));
        if (!seen.has(key)) {
          merged.push(item);
          seen.add(key);
        }
      }
      out[k] = merged;
      continue;
    }
    if (isJsonRecord(incVal) && isJsonRecord(curVal)) {
      // Preserve user-only subkeys but let upstream win for conflicts.
      out[k] = { ...curVal, ...incVal };
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
      const userChanged = !jsonEqual(curVal, baseVal);
      if (userChanged) {
        const seen = new Set<string>();
        for (const x of merged) seen.add(JSON.stringify(canonicalizeJson(x)));
        for (const item of curVal) {
          const k = JSON.stringify(canonicalizeJson(item));
          if (!seen.has(k)) {
            merged.push(item);
            seen.add(k);
          }
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
        const userChanged = !jsonEqual(curSub, baseSub);
        if (userChanged) merged[sk] = curSub;
        else if (incSub !== undefined) merged[sk] = incSub;
        else if (curSub !== undefined) merged[sk] = curSub;
      }
      out[key] = merged;
      continue;
    }

    // Scalars: prefer incoming unless the user changed vs base.
    if (!jsonEqual(curVal, baseVal)) {
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
  const createdBackups: string[] = [];

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
      const release = (await fetchJson(
        releaseUrl,
        UPGRADE_RELEASE_METADATA_TIMEOUT_MS,
      )) as GitHubRelease;
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
        if (!flags.allowTarball) {
          throw new CliError({
            exitCode: exitCodeForError("E_NETWORK"),
            code: "E_NETWORK",
            message:
              `Upgrade assets ${assetName}/${checksumName} not found in ${owner}/${repo} release. ` +
              "Publish the upgrade bundle assets, or re-run with --allow-tarball to download a repo tarball (no checksum verification).",
          });
        }
        process.stderr.write(
          `${warnMessage(
            `upgrade release does not include ${assetName}/${checksumName}; falling back to repo tarball without checksum verification`,
          )}\n`,
        );
        bundleLayout = "repo_tarball";
        bundlePath = path.join(tempRoot, "source.tar.gz");
        const tarballUrl = resolveRepoTarballUrl({
          release,
          owner,
          repo,
          explicitTag: flags.tag,
        });
        await downloadToFile(tarballUrl, bundlePath, UPGRADE_DOWNLOAD_TIMEOUT_MS);
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
    const reviewRecords: UpgradeReviewRecord[] = [];
    const reviewSnapshots = new Map<
      string,
      {
        incomingText: string;
        currentText: string | null;
        baselineText: string | null;
        proposedText: string;
      }
    >();

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

      let existingBuf: Buffer | null = null;
      let existingText: string | null = null;
      if (kind !== null) {
        existingBuf = await readFile(destPath);
      }

      const incomingTextOriginal = data.toString("utf8");
      const currentTextForReview = existingBuf ? existingBuf.toString("utf8") : null;
      const baselineKey = toBaselineKey(rel);
      const baselineText = baselineKey ? await readBaselineText(baselineKey) : null;

      let mergeApplied = false;
      let mergePath: UpgradeReviewRecord["mergePath"] = "none";

      // Merge logic only needs text for a small subset of managed files.
      if (existingBuf) {
        if (entry.merge_strategy === "agents_policy_markdown" && rel === "AGENTS.md") {
          existingText = existingBuf.toString("utf8");
          const mergedText = mergeAgentsPolicyMarkdown(data.toString("utf8"), existingText);
          data = Buffer.from(mergedText, "utf8");
          merged.push(rel);
          mergeApplied = true;
          mergePath = "markdownOverrides";
        } else if (
          entry.merge_strategy === "agent_json_3way" &&
          rel.startsWith(".agentplane/agents/") &&
          rel.endsWith(".json")
        ) {
          existingText = existingBuf.toString("utf8");
          let mergedText: string | null = null;
          if (baselineText !== null) {
            try {
              mergedText = mergeAgentJson3Way({
                incomingText: data.toString("utf8"),
                currentText: existingText,
                baseText: baselineText,
              });
            } catch {
              mergedText = null;
            }
          }
          if (mergedText) {
            mergePath = "3way";
          } else {
            mergedText = mergeAgentJsonIncomingWins(data.toString("utf8"), existingText);
            if (mergedText) {
              mergePath = baselineText === null ? "incomingWins" : "incomingWinsFallback";
            }
          }
          if (mergedText) {
            data = Buffer.from(mergedText, "utf8");
            merged.push(rel);
            mergeApplied = true;
          } else {
            mergePath = "parseFailed";
          }
        }
      }

      const hasBaseline = baselineText !== null;
      let changedCurrentVsBaseline: boolean | null = null;
      let changedIncomingVsBaseline: boolean | null = null;
      if (baselineText !== null) {
        changedCurrentVsBaseline = textChangedForType({
          type: entry.type,
          aText: currentTextForReview,
          bText: baselineText,
        });
        changedIncomingVsBaseline = textChangedForType({
          type: entry.type,
          aText: incomingTextOriginal,
          bText: baselineText,
        });
      }

      const proposedText = data.toString("utf8");
      const currentDiffersFromIncoming =
        currentTextForReview === null
          ? false
          : textChangedForType({
              type: entry.type,
              aText: currentTextForReview,
              bText: incomingTextOriginal,
            });

      const baselineConflict =
        baselineText === null
          ? false
          : currentDiffersFromIncoming &&
            Boolean(changedCurrentVsBaseline) &&
            Boolean(changedIncomingVsBaseline);
      const unresolvedLocalEditsConflict =
        baselineText === null
          ? false
          : currentDiffersFromIncoming && Boolean(changedCurrentVsBaseline) && !mergeApplied;
      const parseFailedConflict = mergePath === "parseFailed";
      const needsSemanticReview =
        baselineConflict || unresolvedLocalEditsConflict || parseFailedConflict;

      reviewRecords.push({
        relPath: rel,
        mergeStrategy: entry.merge_strategy,
        hasBaseline,
        changedCurrentVsBaseline,
        changedIncomingVsBaseline,
        currentDiffersFromIncoming,
        needsSemanticReview,
        mergeApplied,
        mergePath,
      });

      if (flags.mode === "agent" && needsSemanticReview) {
        reviewSnapshots.set(rel, {
          incomingText: incomingTextOriginal,
          currentText: currentTextForReview,
          baselineText,
          proposedText,
        });
      }

      fileContents.set(rel, data);
      if (kind === null) additions.push(rel);
      else if (existingBuf && Buffer.compare(existingBuf, data) === 0) skipped.push(rel);
      else updates.push(rel);
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

    if (flags.mode === "agent") {
      const agentDir = path.join(upgradeStateDir, "agent");
      const runId = new Date().toISOString().replaceAll(":", "-").replaceAll(".", "-");
      const runDir = path.join(agentDir, runId);
      await mkdir(runDir, { recursive: true });

      const managedFiles = manifest.files.map((f) => f.path.replaceAll("\\", "/").trim());
      const planMd =
        `# agentplane upgrade plan (${runId})\n\n` +
        `Mode: agent-assisted (no files modified)\n\n` +
        `## Summary\n\n` +
        `- additions: ${additions.length}\n` +
        `- updates: ${updates.length}\n` +
        `- unchanged: ${skipped.length}\n` +
        `- merged (auto-safe transforms already applied to incoming): ${merged.length}\n\n` +
        `## Managed files (manifest)\n\n` +
        managedFiles.map((p) => `- ${p}`).join("\n") +
        `\n\n` +
        `## Proposed changes\n\n` +
        additions.map((p) => `- ADD ${p}`).join("\n") +
        (additions.length > 0 ? "\n" : "") +
        updates.map((p) => `- UPDATE ${p}`).join("\n") +
        (updates.length > 0 ? "\n" : "") +
        merged.map((p) => `- MERGE ${p}`).join("\n") +
        (merged.length > 0 ? "\n" : "") +
        skipped.map((p) => `- SKIP ${p}`).join("\n") +
        (skipped.length > 0 ? "\n" : "") +
        `\n` +
        `## Next steps\n\n` +
        `1. Review the proposed changes list.\n` +
        `2. Apply changes manually or re-run with \`agentplane upgrade --auto\` to apply managed files.\n` +
        `3. Run \`agentplane doctor\` (or \`agentplane doctor --fix\`) and ensure checks pass.\n`;

      const constraintsMd =
        `# Upgrade constraints\n\n` +
        `This upgrade is restricted to framework-managed files only.\n\n` +
        `## Must not touch\n\n` +
        `- .agentplane/tasks/** (task data)\n` +
        `- .agentplane/tasks.json (export snapshot)\n` +
        `- .agentplane/backends/** (backend configuration)\n` +
        `- .agentplane/config.json (project config)\n` +
        `- .git/**\n\n` +
        `## Notes\n\n` +
        `- The upgrade bundle is validated against framework.manifest.json.\n` +
        `- AGENTS.md is the canonical policy file at the workspace root.\n`;

      const reportMd =
        `# Upgrade report (${runId})\n\n` +
        `## Actions taken\n\n` +
        `- [ ] Reviewed plan.md\n` +
        `- [ ] Applied changes (manual or --auto)\n` +
        `- [ ] Ran doctor\n` +
        `- [ ] Ran tests / lint\n\n` +
        `## Notes\n\n` +
        `- \n`;

      await writeFile(path.join(runDir, "plan.md"), planMd, "utf8");
      await writeFile(path.join(runDir, "constraints.md"), constraintsMd, "utf8");
      await writeFile(path.join(runDir, "report.md"), reportMd, "utf8");
      await writeFile(
        path.join(runDir, "files.json"),
        JSON.stringify({ additions, updates, skipped, merged }, null, 2) + "\n",
        "utf8",
      );

      const needsReview = reviewRecords.filter((r) => r.needsSemanticReview);
      await writeFile(
        path.join(runDir, "review.json"),
        JSON.stringify(
          {
            generated_at: new Date().toISOString(),
            counts: {
              total: reviewRecords.length,
              needsSemanticReview: needsReview.length,
            },
            files: reviewRecords,
          },
          null,
          2,
        ) + "\n",
        "utf8",
      );

      if (needsReview.length > 0) {
        const snapshotsRoot = path.join(runDir, "snapshots");
        for (const [rel, snap] of reviewSnapshots.entries()) {
          const variants: [string, string | null][] = [
            ["current", snap.currentText],
            ["incoming", snap.incomingText],
            ["baseline", snap.baselineText],
            ["proposed", snap.proposedText],
          ];
          for (const [variant, text] of variants) {
            if (text === null) continue;
            const outPath = path.join(snapshotsRoot, variant, rel);
            await mkdir(path.dirname(outPath), { recursive: true });
            await writeFile(outPath, text, "utf8");
          }
        }
      }

      const relRunDir = path.relative(resolved.gitRoot, runDir);
      process.stdout.write(`Upgrade plan written: ${relRunDir}\n`);
      process.stdout.write(`Prompt merge required: ${needsReview.length} files\n`);
      if (needsReview.length > 0) {
        process.stdout.write(`Hint: Create an UPGRADER task and attach ${relRunDir}\n`);
      }
      return 0;
    }

    for (const rel of [...additions, ...updates]) {
      const destPath = path.join(resolved.gitRoot, rel);
      if (flags.backup && (await fileExists(destPath))) {
        const backup = await backupPath(destPath);
        createdBackups.push(backup);
      }
      await mkdir(path.dirname(destPath), { recursive: true });
      const data = fileContents.get(rel);
      if (data) {
        if (rel === "AGENTS.md") {
          // If AGENTS.md is a symlink, avoid overwriting an arbitrary external target.
          // This permits repo-internal symlinks (e.g. the agentplane repo itself) while
          // keeping user workspaces safe.
          try {
            const st = await lstat(destPath);
            if (st.isSymbolicLink()) {
              const linkTarget = await readlink(destPath);
              const targetAbs = path.resolve(path.dirname(destPath), linkTarget);
              const relFromRoot = path.relative(resolved.gitRoot, targetAbs);
              if (relFromRoot.startsWith("..") || path.isAbsolute(relFromRoot)) {
                throw new CliError({
                  exitCode: exitCodeForError("E_VALIDATION"),
                  code: "E_VALIDATION",
                  message:
                    `Refusing to overwrite symlinked AGENTS.md target outside repo: ${linkTarget}. ` +
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
    await writeFile(
      path.join(upgradeStateDir, "last-review.json"),
      JSON.stringify(
        {
          generated_at: new Date().toISOString(),
          counts: {
            total: reviewRecords.length,
            needsSemanticReview: reviewRecords.filter((r) => r.needsSemanticReview).length,
          },
          files: reviewRecords,
        },
        null,
        2,
      ) + "\n",
      "utf8",
    );
    await cleanupAutoUpgradeArtifacts({ upgradeStateDir, createdBackups });

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
