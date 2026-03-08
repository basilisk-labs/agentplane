import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import {
  invalidFieldMessage,
  invalidValueMessage,
  requiredFieldMessage,
} from "../../cli/output.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";

import type { FrameworkManifest, GitHubRelease } from "./types.js";

export function describeUpgradeSource(opts: {
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

export async function loadFrameworkManifestFromPath(
  manifestPath: string,
): Promise<FrameworkManifest> {
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

export async function resolveUpgradeRoot(extractedDir: string): Promise<string> {
  const entries = await readdir(extractedDir, { withFileTypes: true });
  const dirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  const files = entries.filter((entry) => entry.isFile()).map((entry) => entry.name);
  if (files.length === 0 && dirs.length === 1) {
    return path.join(extractedDir, dirs[0]);
  }
  return extractedDir;
}
