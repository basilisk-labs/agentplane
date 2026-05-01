import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { defineScript, parseScriptArgs, runScriptMain } from "./lib/script-runtime.mjs";

const DEFAULT_MANIFEST_PATH = ".agentplane/.release/publish/distribution/release-distribution.json";
const DEFAULT_OUT_DIR = ".agentplane/.release/publish/ghcr";
const DOCKERFILE_PATH = "packages/agentplane/Dockerfile";
const CLI_PACKAGE_DIR = "packages/agentplane";
const LOCAL_TARBALL_NAME = "agentplane.tgz";
const LOCAL_TARBALL_SHA256_NAME = "agentplane.tgz.sha256";

function usage() {
  return [
    "Usage: node scripts/render-ghcr-image-metadata.mjs [options]",
    "",
    "Render AgentPlane GHCR image metadata from release-distribution.json.",
    "",
    "Options:",
    "  --manifest <path>       release-distribution.json path",
    "  --out <dir>             Output directory (default: .agentplane/.release/publish/ghcr)",
    "  --status <status>       Override evidence status after publication",
    "  --check                 Generate into a temporary directory and validate outputs",
    "  --json                  Emit module evidence JSON to stdout",
    "  --help, -h              Show this help text",
  ].join("\n");
}

function parseArgs(argv, repoRoot) {
  const { flags } = parseScriptArgs(argv, {
    valueFlags: ["manifest", "out", "status"],
    booleanFlags: ["check", "json", "help"],
  });
  return {
    manifestPath: path.resolve(repoRoot, flags.manifest ?? DEFAULT_MANIFEST_PATH),
    outDir: path.resolve(repoRoot, flags.out ?? DEFAULT_OUT_DIR),
    status: typeof flags.status === "string" ? flags.status.trim() : "",
    check: Boolean(flags.check),
    json: Boolean(flags.json),
    help: Boolean(flags.help),
  };
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

function requireString(value, label) {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) throw new Error(`Missing ${label}`);
  return text;
}

function shellQuote(value) {
  return `'${String(value).replaceAll("'", String.raw`'\''`)}'`;
}

function sha256File(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function runDistributionGenerator(repoRoot, outDir) {
  execFileSync("node", ["scripts/generate-release-distribution.mjs", "--out", outDir], {
    cwd: repoRoot,
    stdio: "ignore",
    env: process.env,
  });
  return path.join(outDir, "release-distribution.json");
}

function packCliPackage(repoRoot, outDir) {
  const stdout = execFileSync("npm", ["pack", "--json", "--pack-destination", outDir], {
    cwd: path.join(repoRoot, CLI_PACKAGE_DIR),
    encoding: "utf8",
    env: {
      ...process.env,
      NPM_CONFIG_CACHE: path.join(repoRoot, ".agentplane", ".npm-cache"),
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  const jsonMatch = /(^|\n)(\[\s*\{[\s\S]*\]\s*)$/u.exec(stdout);
  if (!jsonMatch) {
    throw new Error("npm pack did not emit JSON for the agentplane package");
  }
  const [entry] = JSON.parse(jsonMatch[2]);
  const filename = String(entry?.filename ?? "");
  if (!filename) throw new Error("npm pack did not report a filename for agentplane");
  return path.join(outDir, filename);
}

function buildImageMetadata(manifest) {
  const version = requireString(manifest.version, "release version");
  const tag = requireString(manifest.tag, "release tag");
  const repository = requireString(manifest.repository, "release repository").toLowerCase();
  const pkg = manifest.packages?.agentplane;
  const tarballUrl = requireString(pkg?.npmTarballUrl, "agentplane npm tarball URL");
  const tarballSha256 = requireString(pkg?.npmTarballSha256, "agentplane npm tarball sha256");
  const image = (process.env.GHCR_IMAGE ?? `ghcr.io/${repository}`).toLowerCase();
  return {
    version,
    tag,
    sha: manifest.sha ?? null,
    image,
    tags: [`${image}:${version}`, `${image}:${tag}`, `${image}:latest`],
    tarballUrl,
    tarballSha256,
  };
}

async function renderGhcr(repoRoot, args) {
  const tempRoot = args.check ? mkdtempSync(path.join(os.tmpdir(), "agentplane-ghcr-")) : null;
  const outDir = tempRoot ? path.join(tempRoot, "ghcr") : args.outDir;
  const manifestPath = tempRoot
    ? runDistributionGenerator(repoRoot, path.join(tempRoot, "distribution"))
    : args.manifestPath;
  const manifest = await readJson(manifestPath);
  const metadata = buildImageMetadata(manifest);
  const dockerfile = path.join(repoRoot, DOCKERFILE_PATH);
  const channel = manifest.channels?.ghcr ?? {};
  const status = args.status || channel.status || "unknown";
  await mkdir(outDir, { recursive: true });
  const packedTarballPath = packCliPackage(repoRoot, outDir);
  const packedTarballSha256 = sha256File(packedTarballPath);
  if (packedTarballSha256 !== metadata.tarballSha256) {
    throw new Error(
      `GHCR tarball sha256 drift: manifest=${metadata.tarballSha256} packed=${packedTarballSha256}`,
    );
  }
  const localTarballPath = path.join(outDir, LOCAL_TARBALL_NAME);
  const localTarballSha256Path = path.join(outDir, LOCAL_TARBALL_SHA256_NAME);
  await copyFile(packedTarballPath, localTarballPath);
  await writeFile(localTarballSha256Path, `${packedTarballSha256}  ${LOCAL_TARBALL_NAME}\n`);

  const envLines = [
    ["AGENTPLANE_VERSION", metadata.version],
    ["AGENTPLANE_TARBALL_FILE", path.relative(repoRoot, localTarballPath)],
    ["AGENTPLANE_TARBALL_SHA256_FILE", path.relative(repoRoot, localTarballSha256Path)],
    ["GHCR_IMAGE", metadata.image],
    ["GHCR_VERSION_TAG", metadata.tags[0]],
    ["GHCR_RELEASE_TAG", metadata.tags[1]],
    ["GHCR_LATEST_TAG", metadata.tags[2]],
  ].map(([key, value]) => `${key}=${shellQuote(value)}`);
  await writeFile(path.join(outDir, "docker-build-args.env"), `${envLines.join("\n")}\n`, "utf8");
  await writeFile(path.join(outDir, "docker-tags.txt"), `${metadata.tags.join("\n")}\n`, "utf8");

  const evidence = {
    schemaVersion: 1,
    module: "ghcr_image",
    status,
    requiredPermission: "packages: write",
    registry: "ghcr.io",
    image: metadata.image,
    tags: metadata.tags,
    version: metadata.version,
    tag: metadata.tag,
    sha: metadata.sha,
    dockerfile: DOCKERFILE_PATH,
    localTarballPath,
    localTarballSha256Path,
    npmTarballUrl: metadata.tarballUrl,
    npmTarballSha256: metadata.tarballSha256,
    nextAction:
      status === "published"
        ? "Verify the GHCR image tags resolve and agentplane --version works in the container."
        : "Run the GHCR image build and push step with packages: write permission for this manifest.",
  };
  await writeFile(path.join(outDir, "ghcr-result.json"), `${JSON.stringify(evidence, null, 2)}\n`);

  if (args.check) {
    if (!existsSync(dockerfile)) throw new Error(`Missing ${DOCKERFILE_PATH}`);
    if (!metadata.tags.every((tagName) => tagName.startsWith("ghcr.io/"))) {
      throw new Error("GHCR image tags must target ghcr.io");
    }
    rmSync(tempRoot, { recursive: true, force: true });
  }

  return evidence;
}

const main = defineScript({
  name: "render-ghcr-image-metadata",
  async run(context) {
    const args = parseArgs(context.argv, context.cwd);
    if (args.help) {
      context.stdout.write(`${usage()}\n`);
      return;
    }
    const evidence = await renderGhcr(context.cwd, args);
    if (args.json) {
      context.stdout.write(`${JSON.stringify(evidence)}\n`);
      return;
    }
    context.stdout.write(
      `ghcr image metadata ${args.check ? "check" : "rendered"} (${evidence.status})\n`,
    );
  },
});

runScriptMain(main);
