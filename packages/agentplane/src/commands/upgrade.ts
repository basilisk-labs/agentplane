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
import { withDiagnosticContext } from "../shared/diagnostics.js";
import { CliError } from "../shared/errors.js";
import { ensureNetworkApproved } from "./shared/network-approval.js";
import { execFileAsync, gitEnv } from "./shared/git.js";
import { getVersion } from "../meta/version.js";

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
    | "parseFailed"
    | "incidentsAppend";
};

function describeUpgradeSource(opts: {
  bundleLayout: "local_assets" | "upgrade_bundle" | "repo_tarball";
  hasExplicitBundle: boolean;
  useRemote: boolean;
}): string {
  if (opts.bundleLayout === "local_assets") return "local installed agentplane CLI assets";
  if (opts.bundleLayout === "repo_tarball") return "GitHub repo tarball fallback";
  if (opts.hasExplicitBundle) return "explicit upgrade bundle";
  if (opts.useRemote) return "GitHub release bundle";
  return "upgrade bundle";
}

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
  if (relPath === "CLAUDE.md") return true;
  if (relPath.startsWith(".agentplane/agents/") && relPath.endsWith(".json")) return true;
  if (
    relPath.startsWith(".agentplane/policy/") &&
    (relPath.endsWith(".md") ||
      relPath.endsWith(".ts") ||
      relPath.endsWith(".js") ||
      relPath.endsWith(".mjs"))
  ) {
    return true;
  }
  return false;
}

const INCIDENTS_POLICY_PATH = ".agentplane/policy/incidents.md";
const INCIDENTS_APPEND_MARKER = "<!-- AGENTPLANE:UPGRADE-APPEND incidents.md -->";
const CONFIG_REL_PATH = ".agentplane/config.json";

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

function parseIncidentEntryBlocks(entriesBody: string): string[] {
  const lines = entriesBody.replaceAll("\r\n", "\n").split("\n");
  const starts: number[] = [];
  for (const [index, line] of lines.entries()) {
    if (/^\s*-\s*id:\s+/i.test(line ?? "")) starts.push(index);
  }
  const blocks: string[] = [];
  for (const [idx, start] of starts.entries()) {
    const end = starts.at(idx + 1) ?? lines.length;
    const slice = lines.slice(start, end);
    while (slice.length > 0 && !(slice[0] ?? "").trim()) slice.shift();
    while (slice.length > 0 && !(slice.at(-1) ?? "").trim()) slice.pop();
    const block = slice.join("\n").trim();
    if (block) blocks.push(block);
  }
  return blocks;
}

function normalizeEntryBlock(block: string): string {
  return block
    .replaceAll("\r\n", "\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trim();
}

function splitEntriesSection(text: string): {
  before: string;
  entriesBody: string;
  after: string;
} | null {
  const lines = text.replaceAll("\r\n", "\n").split("\n");
  const headingIndex = lines.findIndex((line) => /^\s*##\s+Entries\s*$/i.test(line));
  if (headingIndex === -1) return null;

  let nextHeadingIndex = lines.length;
  for (let i = headingIndex + 1; i < lines.length; i++) {
    if (/^\s*##\s+/.test(lines[i] ?? "")) {
      nextHeadingIndex = i;
      break;
    }
  }

  return {
    before: lines.slice(0, headingIndex + 1).join("\n"),
    entriesBody: lines.slice(headingIndex + 1, nextHeadingIndex).join("\n"),
    after: lines.slice(nextHeadingIndex).join("\n"),
  };
}

function mergeIncidentsPolicy(opts: {
  incomingText: string;
  currentText: string;
  baselineText: string | null;
}): {
  nextText: string;
  appended: boolean;
  appendedCount: number;
} {
  const incomingTrimmed = opts.incomingText.trim();
  if (!incomingTrimmed) return { nextText: opts.currentText, appended: false, appendedCount: 0 };

  const incomingSection = splitEntriesSection(opts.incomingText);
  const currentSection = splitEntriesSection(opts.currentText);
  if (!incomingSection || !currentSection) {
    return { nextText: opts.incomingText, appended: false, appendedCount: 0 };
  }

  const incomingBlocks = parseIncidentEntryBlocks(incomingSection.entriesBody).map((block) =>
    normalizeEntryBlock(block),
  );
  const currentBlocks = parseIncidentEntryBlocks(currentSection.entriesBody).map((block) =>
    normalizeEntryBlock(block),
  );
  if (currentBlocks.length === 0) {
    return { nextText: opts.incomingText, appended: false, appendedCount: 0 };
  }

  const baselineSection = opts.baselineText ? splitEntriesSection(opts.baselineText) : null;
  const baselineBlocks = baselineSection
    ? parseIncidentEntryBlocks(baselineSection.entriesBody).map((block) =>
        normalizeEntryBlock(block),
      )
    : [];
  const baselineSet = new Set(baselineBlocks);
  const incomingSet = new Set(incomingBlocks);

  const userAdded = currentBlocks.filter((block) => {
    if (baselineSet.size > 0 && baselineSet.has(block)) return false;
    return true;
  });
  const toAppend = userAdded.filter((block) => !incomingSet.has(block));
  if (toAppend.length === 0) {
    return { nextText: opts.incomingText, appended: false, appendedCount: 0 };
  }

  const mergedBlocks = [...incomingBlocks, ...toAppend];
  const renderedEntries =
    mergedBlocks.length > 0 ? `\n\n${mergedBlocks.join("\n\n")}\n` : "\n\n- None yet.\n";
  const afterSuffix = incomingSection.after ? `\n${incomingSection.after.trimStart()}` : "";
  const nextText =
    `${incomingSection.before.trimEnd()}` +
    `${renderedEntries}` +
    `${INCIDENTS_APPEND_MARKER}\n` +
    `${afterSuffix}` +
    `\n`;
  return { nextText, appended: true, appendedCount: toAppend.length };
}

function normalizeUpgradeVersionLabel(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "unknown";
  if (/^v\d/i.test(trimmed)) return trimmed;
  return `v${trimmed}`;
}

async function ensureCleanTrackedTreeForUpgrade(gitRoot: string): Promise<void> {
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

async function createUpgradeCommit(opts: {
  gitRoot: string;
  paths: string[];
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
  try {
    await execFileAsync("git", ["commit", "-m", subject, "-m", body], {
      cwd: opts.gitRoot,
      env: gitEnv(),
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
    let upgradeVersionLabel = normalizeUpgradeVersionLabel(getVersion());

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
      const releaseTag =
        (typeof release.tag_name === "string" && release.tag_name.trim()) ||
        (typeof flags.tag === "string" && flags.tag.trim()) ||
        "";
      if (releaseTag) {
        upgradeVersionLabel = normalizeUpgradeVersionLabel(releaseTag);
      }
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
    const modeLabel = flags.dryRun ? "dry-run" : flags.mode === "agent" ? "review" : "apply";
    process.stdout.write(
      `Upgrade source: ${describeUpgradeSource({
        bundleLayout,
        hasExplicitBundle: hasBundle,
        useRemote,
      })}\n` +
        `Upgrade version: ${upgradeVersionLabel}\n` +
        `Upgrade mode: ${modeLabel}\n`,
    );

    const additions: string[] = [];
    const updates: string[] = [];
    const skipped: string[] = [];
    const fileContents = new Map<string, Buffer>();
    const merged: string[] = [];
    const missingRequired: string[] = [];
    const reviewRecords: UpgradeReviewRecord[] = [];
    let incidentsAppendedCount = 0;

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
      if (rel === "CLAUDE.md") return "CLAUDE.md";
      if (rel.startsWith(".agentplane/")) return rel.slice(".agentplane/".length);
      return null;
    };

    const policyGatewayRel = (await fileExists(path.join(resolved.gitRoot, "AGENTS.md")))
      ? "AGENTS.md"
      : (await fileExists(path.join(resolved.gitRoot, "CLAUDE.md")))
        ? "CLAUDE.md"
        : "AGENTS.md";

    const remapManagedGatewayRel = (rel: string): string => {
      if (rel === "AGENTS.md" && policyGatewayRel === "CLAUDE.md") return "CLAUDE.md";
      return rel;
    };

    for (const entry of manifest.files) {
      const relRaw = entry.path.replaceAll("\\", "/").trim();
      if (!relRaw || relRaw.startsWith("..") || path.isAbsolute(relRaw)) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Invalid manifest path: ${entry.path}`,
        });
      }
      if (isDeniedUpgradePath(relRaw)) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Manifest includes a denied path: ${relRaw}`,
        });
      }
      if (!isAllowedUpgradePath(relRaw)) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Manifest path not allowed: ${relRaw}`,
        });
      }
      const rel = remapManagedGatewayRel(relRaw);

      const destPath = path.join(resolved.gitRoot, rel);
      const kind = await getPathKind(destPath);
      if (kind === "dir") {
        throw new CliError({
          exitCode: exitCodeForError("E_IO"),
          code: "E_IO",
          message: `Upgrade target is a directory: ${rel}`,
        });
      }

      let data: Buffer;
      {
        const sourceRelRaw = (entry.source_path ?? entry.path).replaceAll("\\", "/").trim();
        const mappedSourceRel =
          rel === "CLAUDE.md" && sourceRelRaw === "AGENTS.md" ? "CLAUDE.md" : sourceRelRaw;
        const sourceCandidates = [...new Set([mappedSourceRel, sourceRelRaw])];
        let loaded: Buffer | null = null;
        for (const candidate of sourceCandidates) {
          try {
            loaded = await readFile(path.join(bundleRoot, candidate));
            break;
          } catch {
            // try next candidate
          }
        }
        if (!loaded) {
          if (entry.required) missingRequired.push(rel);
          continue;
        }
        data = loaded;
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
      const hasBaseline = baselineText !== null;
      const changedCurrentVsBaseline =
        hasBaseline && currentTextForReview !== null
          ? textChangedForType({
              type: entry.type,
              aText: currentTextForReview,
              bText: baselineText,
            })
          : null;
      const changedIncomingVsBaseline = hasBaseline
        ? textChangedForType({
            type: entry.type,
            aText: incomingTextOriginal,
            bText: baselineText,
          })
        : null;
      const currentAndIncomingEqual =
        currentTextForReview === null
          ? false
          : textChangedForType({
              type: entry.type,
              aText: currentTextForReview,
              bText: incomingTextOriginal,
            }) === false;
      // Fast-path: incoming already equals local.
      if (currentTextForReview !== null && currentAndIncomingEqual) {
        skipped.push(rel);
        reviewRecords.push({
          relPath: rel,
          mergeStrategy: entry.merge_strategy,
          hasBaseline,
          changedCurrentVsBaseline,
          changedIncomingVsBaseline,
          currentDiffersFromIncoming: false,
          needsSemanticReview: false,
          mergeApplied: false,
          mergePath: "none",
        });
        continue;
      }

      // No local edits vs baseline: file can be safely replaced with incoming.
      if (currentTextForReview !== null && changedCurrentVsBaseline === false) {
        updates.push(rel);
        fileContents.set(rel, data);
        reviewRecords.push({
          relPath: rel,
          mergeStrategy: entry.merge_strategy,
          hasBaseline,
          changedCurrentVsBaseline,
          changedIncomingVsBaseline,
          currentDiffersFromIncoming: true,
          needsSemanticReview: false,
          mergeApplied: false,
          mergePath: "none",
        });
        continue;
      }

      let mergeApplied = false;
      let mergePath: UpgradeReviewRecord["mergePath"] = "none";

      // Simplified policy for upgrade:
      // - All managed files are replaced with incoming bundle content.
      // - incidents.md is append-only when local file already has content.
      if (existingBuf && rel === INCIDENTS_POLICY_PATH) {
        existingText = existingBuf.toString("utf8");
        const mergedIncidents = mergeIncidentsPolicy({
          incomingText: data.toString("utf8"),
          currentText: existingText,
          baselineText,
        });
        data = Buffer.from(mergedIncidents.nextText, "utf8");
        if (mergedIncidents.appended) {
          merged.push(rel);
          mergeApplied = true;
          mergePath = "incidentsAppend";
          incidentsAppendedCount += mergedIncidents.appendedCount;
        }
      }

      const currentDiffersFromIncoming =
        currentTextForReview === null
          ? false
          : textChangedForType({
              type: entry.type,
              aText: currentTextForReview,
              bText: incomingTextOriginal,
            });

      const needsSemanticReview = false;

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

    const needsReview = reviewRecords.filter((r) => r.needsSemanticReview);

    if (flags.mode === "agent") {
      // Fast no-op path: nothing to apply and no semantic review candidates.
      // Skip generating per-run artifacts to keep agent-mode upgrades cheap.
      if (additions.length === 0 && updates.length === 0 && needsReview.length === 0) {
        process.stdout.write("Upgrade plan: no managed changes detected\n");
        return 0;
      }

      const agentDir = path.join(upgradeStateDir, "agent");
      const runId = new Date().toISOString().replaceAll(":", "-").replaceAll(".", "-");
      const runDir = path.join(agentDir, runId);
      await mkdir(runDir, { recursive: true });

      const managedFiles = manifest.files.map((f) => f.path.replaceAll("\\", "/").trim());
      const planMd =
        `# agentplane upgrade plan (${runId})\n\n` +
        `Mode: agent-assisted review (no files modified)\n\n` +
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
        `2. Apply changes manually or re-run without \`--agent\` to apply managed files.\n` +
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
        `- The policy gateway file at workspace root is AGENTS.md or CLAUDE.md.\n`;

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

      const relRunDir = path.relative(resolved.gitRoot, runDir);
      process.stdout.write(`Upgrade plan written: ${relRunDir}\n`);
      process.stdout.write(`Review-required files: ${needsReview.length}\n`);
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
        if (rel === "AGENTS.md" || rel === "CLAUDE.md") {
          // If policy gateway file is a symlink, avoid overwriting an arbitrary external target.
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

      // Record a baseline copy for future three-way merges.
      const baselineKey = toBaselineKey(rel);
      if (baselineKey && data) {
        const baselinePath = path.join(baselineDirNew, baselineKey);
        await mkdir(path.dirname(baselinePath), { recursive: true });
        await writeFile(baselinePath, data);
      }
    }

    const hasManagedMutations = additions.length > 0 || updates.length > 0;
    const hasSourceMigration = normalizedSourceToPersist !== null;
    const shouldMutateConfig = hasManagedMutations || hasSourceMigration;
    if (shouldMutateConfig) {
      const raw = { ...loaded.raw };
      if (normalizedSourceToPersist) {
        setByDottedKey(raw, "framework.source", normalizedSourceToPersist);
      }
      setByDottedKey(raw, "framework.last_update", new Date().toISOString());
      await saveConfig(resolved.agentplaneDir, raw);
    }
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
    const commitPaths = [
      ...new Set([...additions, ...updates, ...(shouldMutateConfig ? [CONFIG_REL_PATH] : [])]),
    ];
    const commit = await createUpgradeCommit({
      gitRoot: resolved.gitRoot,
      paths: commitPaths,
      versionLabel: upgradeVersionLabel,
      source: bundleLayout,
      additions: additions.length,
      updates: updates.length,
      unchanged: skipped.length,
      incidentsAppendedCount,
    });
    await cleanupAutoUpgradeArtifacts({ upgradeStateDir, createdBackups });

    process.stdout.write(
      `Upgrade applied: ${additions.length} add, ${updates.length} update, ${skipped.length} unchanged\n`,
    );
    if (commit) {
      process.stdout.write(`Upgrade commit: ${commit.hash.slice(0, 12)} ${commit.subject}\n`);
    }
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
