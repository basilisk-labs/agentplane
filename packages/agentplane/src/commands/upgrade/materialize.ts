import { mkdtemp, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { downloadToFile, fetchJson } from "../../cli/http.js";
import { parseSha256Text, sha256File } from "../../cli/checksum.js";
import { extractArchive } from "../../cli/archive.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { warnMessage } from "../../cli/output.js";
import { getVersion } from "../../meta/version.js";
import { CliError } from "../../shared/errors.js";

import { normalizeUpgradeVersionLabel } from "./policy.js";
import {
  loadFrameworkManifestFromPath,
  normalizeFrameworkSourceForUpgrade,
  resolveRepoTarballUrl,
  resolveUpgradeDownloadFromRelease,
  resolveUpgradeRoot,
} from "./source.js";
import type { FrameworkManifest, GitHubRelease } from "./types.js";

const DEFAULT_UPGRADE_ASSET = "agentplane-upgrade.tar.gz";
const DEFAULT_UPGRADE_CHECKSUM_ASSET = "agentplane-upgrade.tar.gz.sha256";
const UPGRADE_DOWNLOAD_TIMEOUT_MS = 60_000;
const UPGRADE_RELEASE_METADATA_TIMEOUT_MS = 15_000;

type MaterializeFlags = {
  source?: string;
  tag?: string;
  bundle?: string;
  checksum?: string;
  asset?: string;
  checksumAsset?: string;
  remote: boolean;
  allowTarball: boolean;
};

export type MaterializedUpgrade = {
  tempRoot: string;
  extractRoot: string | null;
  bundleLayout: "local_assets" | "upgrade_bundle" | "repo_tarball";
  bundleRoot: string;
  manifest: FrameworkManifest;
  normalizedSourceToPersist: string | null;
  upgradeVersionLabel: string;
};

export async function materializeUpgradeSource(opts: {
  flags: MaterializeFlags;
  frameworkSource: string;
  assetsDirUrl: URL;
  ensureApproved: (reason: string) => Promise<void>;
}): Promise<MaterializedUpgrade> {
  const { flags } = opts;
  const hasBundle = Boolean(flags.bundle);
  const hasRemoteHints =
    Boolean(flags.source) ||
    Boolean(flags.tag) ||
    Boolean(flags.asset) ||
    Boolean(flags.checksumAsset);
  const useRemote = flags.remote === true || hasRemoteHints;

  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-upgrade-"));
  let extractRoot: string | null = null;
  let bundleLayout: MaterializedUpgrade["bundleLayout"] = "upgrade_bundle";
  let bundleRoot = "";
  let normalizedSourceToPersist: string | null = null;
  let upgradeVersionLabel = normalizeUpgradeVersionLabel(getVersion());
  let manifestPath = "";

  if (!hasBundle && !useRemote) {
    bundleLayout = "local_assets";
    bundleRoot = fileURLToPath(opts.assetsDirUrl);
    manifestPath = fileURLToPath(new URL("framework.manifest.json", opts.assetsDirUrl));
  } else {
    let bundlePath = "";
    let checksumPath = "";

    if (flags.bundle) {
      const bundleIsUrl = flags.bundle.startsWith("http://") || flags.bundle.startsWith("https://");
      bundlePath = bundleIsUrl ? path.join(tempRoot, "bundle.tar.gz") : path.resolve(flags.bundle);
      if (bundleIsUrl) {
        await opts.ensureApproved("upgrade downloads the bundle/checksum from the network");
        await downloadToFile(flags.bundle, bundlePath, UPGRADE_DOWNLOAD_TIMEOUT_MS);
      }

      const checksumValue = flags.checksum ?? "";
      const checksumIsUrl =
        checksumValue.startsWith("http://") || checksumValue.startsWith("https://");
      checksumPath = checksumIsUrl
        ? path.join(tempRoot, "bundle.tar.gz.sha256")
        : path.resolve(checksumValue);
      if (checksumIsUrl) {
        await opts.ensureApproved("upgrade downloads the bundle/checksum from the network");
        await downloadToFile(checksumValue, checksumPath, UPGRADE_DOWNLOAD_TIMEOUT_MS);
      }
    } else {
      const originalSource = flags.source ?? opts.frameworkSource;
      const normalized = normalizeFrameworkSourceForUpgrade(originalSource);

      const releaseUrl = flags.tag
        ? `https://api.github.com/repos/${normalized.owner}/${normalized.repo}/releases/tags/${flags.tag}`
        : `https://api.github.com/repos/${normalized.owner}/${normalized.repo}/releases/latest`;
      await opts.ensureApproved(
        "upgrade fetches release metadata and downloads assets from the network",
      );
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
        owner: normalized.owner,
        repo: normalized.repo,
        assetName: flags.asset ?? DEFAULT_UPGRADE_ASSET,
        checksumName: flags.checksumAsset ?? DEFAULT_UPGRADE_CHECKSUM_ASSET,
      });

      if (download.kind === "assets") {
        bundlePath = path.join(tempRoot, flags.asset ?? DEFAULT_UPGRADE_ASSET);
        checksumPath = path.join(tempRoot, flags.checksumAsset ?? DEFAULT_UPGRADE_CHECKSUM_ASSET);
        await downloadToFile(download.bundleUrl, bundlePath, UPGRADE_DOWNLOAD_TIMEOUT_MS);
        await downloadToFile(download.checksumUrl, checksumPath, UPGRADE_DOWNLOAD_TIMEOUT_MS);
      } else {
        if (!flags.allowTarball) {
          throw new CliError({
            exitCode: exitCodeForError("E_NETWORK"),
            code: "E_NETWORK",
            message:
              `Upgrade assets ${flags.asset ?? DEFAULT_UPGRADE_ASSET}/${flags.checksumAsset ?? DEFAULT_UPGRADE_CHECKSUM_ASSET} not found in ${normalized.owner}/${normalized.repo} release. ` +
              "Publish the upgrade bundle assets, or re-run with --allow-tarball to download a repo tarball (no checksum verification).",
          });
        }
        process.stderr.write(
          `${warnMessage(
            `upgrade release does not include ${flags.asset ?? DEFAULT_UPGRADE_ASSET}/${flags.checksumAsset ?? DEFAULT_UPGRADE_CHECKSUM_ASSET}; falling back to repo tarball without checksum verification`,
          )}\n`,
        );
        bundleLayout = "repo_tarball";
        bundlePath = path.join(tempRoot, "source.tar.gz");
        const tarballUrl = resolveRepoTarballUrl({
          release,
          owner: normalized.owner,
          repo: normalized.repo,
          explicitTag: flags.tag,
        });
        await downloadToFile(tarballUrl, bundlePath, UPGRADE_DOWNLOAD_TIMEOUT_MS);
        checksumPath = "";
      }
    }

    if (checksumPath) {
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
    manifestPath = path.join(bundleRoot, "framework.manifest.json");
  }

  const manifest = await loadFrameworkManifestFromPath(manifestPath);
  return {
    tempRoot,
    extractRoot,
    bundleLayout,
    bundleRoot,
    manifest,
    normalizedSourceToPersist,
    upgradeVersionLabel,
  };
}
