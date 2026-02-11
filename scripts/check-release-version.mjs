import fs from "node:fs";
import path from "node:path";

const parseArgs = (args) => {
  let tagArg = null;
  for (let i = 0; i < args.length; i += 1) {
    const value = args[i];
    if (value === "--tag" && args[i + 1]) {
      tagArg = args[i + 1];
      i += 1;
    }
  }
  return { tagArg };
};

const resolveTag = (tagArg) => {
  if (tagArg) return tagArg;
  if (process.env.GITHUB_REF_TYPE === "tag" && process.env.GITHUB_REF_NAME) {
    return process.env.GITHUB_REF_NAME;
  }
  let input = "";
  try {
    input = fs.readFileSync(0, "utf8");
  } catch {
    input = "";
  }
  for (const line of input.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const parts = line.trim().split(/\s+/);
    if (parts.length < 3) continue;
    const remoteRef = parts[2];
    if (remoteRef && remoteRef.startsWith("refs/tags/")) {
      return remoteRef.replace("refs/tags/", "");
    }
  }
  return null;
};

const getPackageJson = (rootDir, pkgPath) => {
  const fullPath = path.join(rootDir, pkgPath, "package.json");
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
};

const run = () => {
  const { tagArg } = parseArgs(process.argv.slice(2));
  const tag = resolveTag(tagArg);
  if (!tag) {
    throw new Error("Missing release tag. Provide --tag vX.Y.Z or run under tag ref.");
  }
  const match = tag.match(/^v(\d+\.\d+\.\d+)(?:-.+)?$/);
  if (!match) {
    throw new Error(`Tag ${tag} does not match vX.Y.Z format.`);
  }
  const version = match[1];
  const rootDir = process.cwd();
  const agentplanePkg = getPackageJson(rootDir, "packages/agentplane");
  const corePkg = getPackageJson(rootDir, "packages/core");
  const versions = {
    agentplane: agentplanePkg.version,
    core: corePkg.version,
  };
  const coreDependency = agentplanePkg.dependencies?.["@agentplaneorg/core"] ?? null;

  const errors = [];
  if (versions.agentplane !== version) {
    errors.push(
      `packages/agentplane version ${versions.agentplane} does not match tag ${version}.`,
    );
  }
  if (versions.core !== version) {
    errors.push(`packages/core version ${versions.core} does not match tag ${version}.`);
  }
  if (coreDependency !== version) {
    errors.push(
      `packages/agentplane dependency @agentplaneorg/core=${String(
        coreDependency,
      )} does not match required release version ${version}.`,
    );
  }
  if (errors.length > 0) {
    const details = ["Release version check failed:", ...errors.map((message) => `- ${message}`)];
    throw new Error(details.join("\n"));
  }
};

run();
