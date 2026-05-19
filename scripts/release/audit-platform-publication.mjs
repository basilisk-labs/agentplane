import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

function usage() {
  return [
    "Usage: node scripts/release/audit-platform-publication.mjs --publish-result <path> [options]",
    "",
    "Fail-closed audit for the canonical publish-result artifact before release task closure.",
    "",
    "Options:",
    "  --publish-result <path>  Path to publish-result.json from the Publish release workflow",
    "  --github-release-assets <path>",
    "                           JSON file with live GitHub Release asset evidence",
    "  --json                   Emit machine-readable JSON",
    "  --help, -h               Show this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const out = {
    publishResultPath: "",
    githubReleaseAssetsPath: "",
    json: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index] ?? "";
    if (arg === "--publish-result") {
      out.publishResultPath = argv[index + 1] ?? out.publishResultPath;
      index += 1;
      continue;
    }
    if (arg === "--github-release-assets") {
      out.githubReleaseAssetsPath = argv[index + 1] ?? out.githubReleaseAssetsPath;
      index += 1;
      continue;
    }
    if (arg === "--json") {
      out.json = true;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      out.help = true;
      continue;
    }
    throw new Error(`unknown argument: ${arg}`);
  }
  return out;
}

function assertObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`invalid ${label}: expected object`);
  }
  return value;
}

function checkPackage(failures, manifest, key, label) {
  const payload = manifest.packages?.[key];
  if (!payload?.published) failures.push(`${label} npm package not confirmed`);
}

function assetNamesFromGithubReleasePayload(payload) {
  if (Array.isArray(payload)) {
    return new Set(
      payload.map((asset) => (typeof asset === "string" ? asset : asset?.name)).filter(Boolean),
    );
  }
  if (payload && typeof payload === "object" && Array.isArray(payload.assets)) {
    return assetNamesFromGithubReleasePayload(payload.assets);
  }
  throw new Error("invalid GitHub Release assets payload: expected array or object.assets");
}

async function readGithubReleaseAssetNames(assetPath) {
  if (!assetPath) return null;
  return assetNamesFromGithubReleasePayload(
    JSON.parse(await readFile(path.resolve(assetPath), "utf8")),
  );
}

async function fetchGithubReleaseAssetNames(tag) {
  if (!tag) return null;
  if (process.env.AGENTPLANE_POSTPUBLISH_AUDIT_SKIP_GH === "1") return null;
  try {
    const { stdout } = await execFileAsync(
      "gh",
      ["release", "view", tag, "--json", "assets", "--jq", ".assets"],
      {
        cwd: process.cwd(),
        env: process.env,
      },
    );
    return assetNamesFromGithubReleasePayload(JSON.parse(stdout));
  } catch {
    return null;
  }
}

function embeddedReleaseAssetNames(manifest) {
  const distribution = manifest.distribution;
  if (!distribution?.loaded || !distribution.manifest) {
    return null;
  }
  const assets = Array.isArray(distribution.manifest.releaseAssets)
    ? distribution.manifest.releaseAssets
    : [];
  return new Set(assets.map((asset) => asset?.name).filter(Boolean));
}

function checkReleaseAssets(failures, manifest, liveAssetNames) {
  const embeddedAssetNames = embeddedReleaseAssetNames(manifest);
  if (!embeddedAssetNames) {
    failures.push("release-distribution.json not loaded in publish-result");
    return;
  }
  const assetNames = liveAssetNames ?? embeddedAssetNames;
  for (const required of ["release-distribution.json", "SHA256SUMS", "install.sh", "install.ps1"]) {
    if (!assetNames.has(required)) failures.push(`GitHub Release asset not confirmed: ${required}`);
  }
  const channels = assertObject(
    manifest.distribution.manifest.channels ?? {},
    "distribution channels",
  );
  for (const channel of ["npm", "githubRelease", "ghcr"]) {
    if (!channels[channel]?.required)
      failures.push(`required channel missing from manifest: ${channel}`);
  }
}

function checkExternalModules(failures, manifest) {
  if (!manifest.external?.requested) {
    failures.push("external distribution module evidence not requested");
    return;
  }
  const modules = Array.isArray(manifest.external.modules) ? manifest.external.modules : [];
  const required = new Set(["homebrew", "scoop", "setup-agentplane"]);
  for (const module of modules) required.delete(module?.name);
  for (const name of required) failures.push(`external distribution module missing: ${name}`);
  for (const module of modules) {
    if (!module?.loaded) {
      failures.push(`external distribution ${module?.name ?? "unknown"} result not loaded`);
      continue;
    }
    if (!["published", "unchanged"].includes(module.status)) {
      failures.push(
        `external distribution ${module.name} not confirmed (status=${module.status}${
          module.reasonCode ? ` reason=${module.reasonCode}` : ""
        })`,
      );
    }
    if (module.name === "setup-agentplane" && module.setupTag?.status !== "published") {
      failures.push(
        `external distribution setup-agentplane tag not confirmed (status=${
          module.setupTag?.status ?? "missing"
        })`,
      );
    }
  }
}

function auditPublishResult(manifest, liveAssetNames) {
  const failures = [];
  if (manifest.success !== true) {
    failures.push(`publish-result is not successful (reason=${manifest.reasonCode ?? "unknown"})`);
  }
  checkPackage(failures, manifest, "core", "@agentplaneorg/core");
  checkPackage(failures, manifest, "recipes", "@agentplaneorg/recipes");
  checkPackage(failures, manifest, "cli", "agentplane");
  if (manifest.checks?.npmSmoke?.passed !== true)
    failures.push("published npm smoke not confirmed");
  if (manifest.checks?.ghcr?.published !== true) failures.push("GHCR publication not confirmed");
  if (manifest.checks?.tag?.ensured !== true) failures.push("release tag not confirmed");
  if (manifest.checks?.githubRelease?.created !== true) {
    failures.push("GitHub Release publication not confirmed");
  }
  checkReleaseAssets(failures, manifest, liveAssetNames);
  checkExternalModules(failures, manifest);

  return {
    ok: failures.length === 0,
    tag: manifest.tag ?? null,
    sha: manifest.sha ?? null,
    version: manifest.version ?? null,
    failures,
    nextAction:
      failures.length === 0
        ? "Record this audit output in the release task verification before closing."
        : "Do not close the release task; resolve the missing channel evidence or create explicit recovery tasks.",
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }
  if (!args.publishResultPath) throw new Error("Missing required --publish-result");
  const publishResultPath = path.resolve(args.publishResultPath);
  const manifest = JSON.parse(await readFile(publishResultPath, "utf8"));
  const liveAssetNames =
    (await readGithubReleaseAssetNames(args.githubReleaseAssetsPath)) ??
    (await fetchGithubReleaseAssetNames(manifest.tag));
  const report = auditPublishResult(assertObject(manifest, "publish-result"), liveAssetNames);
  if (args.json) {
    process.stdout.write(`${JSON.stringify(report)}\n`);
  } else {
    process.stdout.write(
      `${report.ok ? "ok" : "fail"}: post-publish platform audit for ${report.tag ?? "unknown tag"}\n`,
    );
    for (const failure of report.failures) process.stdout.write(`- ${failure}\n`);
    process.stdout.write(`Next action: ${report.nextAction}\n`);
  }
  if (!report.ok) process.exitCode = 1;
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
