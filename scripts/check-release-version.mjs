import fs from "node:fs";
import { assertReleaseParity } from "./lib/release-version-parity.mjs";

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
  return assertReleaseParity(process.cwd(), { requiredVersion: version });
};

run().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
