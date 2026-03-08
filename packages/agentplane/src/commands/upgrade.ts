import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadConfig, resolveProject } from "@agentplaneorg/core";

import { fileExists, getPathKind } from "../cli/fs-utils.js";
import { downloadToFile, fetchJson } from "../cli/http.js";
import { parseSha256Text, sha256File } from "../cli/checksum.js";
import { extractArchive } from "../cli/archive.js";
import { exitCodeForError } from "../cli/exit-codes.js";
import { warnMessage } from "../cli/output.js";
import { CliError } from "../shared/errors.js";
import { ensureWorkflowArtifacts } from "../shared/workflow-artifacts.js";
import { ensureNetworkApproved } from "./shared/network-approval.js";
import { getVersion } from "../meta/version.js";
import {
  applyManagedFiles,
  cleanupAutoUpgradeArtifacts,
  createUpgradeCommit,
  ensureCleanTrackedTreeForUpgrade,
  persistUpgradeState,
} from "./upgrade/apply.js";
import { printUpgradeDryRun, writeUpgradeAgentReview } from "./upgrade/report.js";
import {
  describeUpgradeSource,
  loadFrameworkManifestFromPath,
  normalizeFrameworkSourceForUpgrade,
  resolveRepoTarballUrl,
  resolveUpgradeDownloadFromRelease,
  resolveUpgradeRoot,
} from "./upgrade/source.js";
import type {
  FrameworkManifestEntry,
  GitHubRelease,
  UpgradeReviewRecord,
} from "./upgrade/types.js";

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

const ASSETS_DIR_URL = new URL("../../assets/", import.meta.url);

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

function normalizeVersionForConfig(input: string): string | null {
  const trimmed = input.trim().replace(/^v/i, "");
  return trimmed.length > 0 ? trimmed : null;
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
      printUpgradeDryRun({ additions, updates, skipped, merged });
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

      const { relRunDir, needsReviewCount } = await writeUpgradeAgentReview({
        gitRoot: resolved.gitRoot,
        runRoot: path.join(upgradeStateDir, "agent"),
        manifest,
        additions,
        updates,
        skipped,
        merged,
        reviewRecords,
      });
      process.stdout.write(`Upgrade plan written: ${relRunDir}\n`);
      process.stdout.write(`Review-required files: ${needsReviewCount}\n`);
      return 0;
    }

    await applyManagedFiles({
      gitRoot: resolved.gitRoot,
      additions,
      updates,
      backup: flags.backup,
      fileContents,
      baselineDir: baselineDirNew,
      createdBackups,
      toBaselineKey,
    });

    const hasManagedMutations = additions.length > 0 || updates.length > 0;
    const shouldMutateConfig = await persistUpgradeState({
      agentplaneDir: resolved.agentplaneDir,
      rawConfig: loaded.raw,
      normalizedSourceToPersist,
      expectedCliVersionToPersist: normalizeVersionForConfig(upgradeVersionLabel),
      hasManagedMutations,
      statePath,
      upgradeStateDir,
      source: bundleLayout,
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
        ...workflowArtifacts.commitPaths,
        ...(shouldMutateConfig ? [CONFIG_REL_PATH] : []),
      ]),
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
    if (workflowArtifacts.changedPaths.length > 0) {
      process.stdout.write(
        `Workflow artifacts refreshed: ${workflowArtifacts.commitPaths.join(", ")}\n`,
      );
    }
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

export {
  normalizeFrameworkSourceForUpgrade,
  resolveRepoTarballUrl,
  resolveUpgradeDownloadFromRelease,
} from "./upgrade/source.js";
