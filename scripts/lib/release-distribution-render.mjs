import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";

export async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

export function requireString(value, label) {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) throw new Error(`Missing ${label}`);
  return text;
}

export function findPlatformAsset(manifest, platform, arch) {
  const asset = (manifest.bunAssets ?? manifest.platformAssets ?? []).find(
    (entry) =>
      entry?.kind === "bun_executable" && entry?.platform === platform && entry?.arch === arch,
  );
  if (!asset) throw new Error(`Missing Bun platform asset: ${platform}-${arch}`);
  return {
    url: requireString(asset.url, `${platform}-${arch} Bun URL`),
    sha256: requireString(asset.sha256, `${platform}-${arch} Bun sha256`),
    name: requireString(asset.name, `${platform}-${arch} Bun asset name`),
  };
}

export function runDistributionGenerator(repoRoot, outDir) {
  execFileSync(
    "node",
    ["scripts/generate-release-distribution.mjs", "--out", outDir, "--standalone-check-mode"],
    {
      cwd: repoRoot,
      stdio: "ignore",
      env: process.env,
    },
  );
  return path.join(outDir, "release-distribution.json");
}
