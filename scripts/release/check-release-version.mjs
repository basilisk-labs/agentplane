import fs from "node:fs";
import { defineCheck, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";
import { assertReleaseParity } from "../lib/release-version-parity.mjs";
import { parseReleaseSemver } from "../lib/release-semver.mjs";

const parseArgs = (args) => {
  const { flags } = parseScriptArgs(args, {
    valueFlags: ["tag"],
    booleanFlags: ["stable-only"],
  });
  return { tagArg: flags.tag ?? null, stableOnly: flags["stable-only"] === true };
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

const main = defineCheck({
  name: "check-release-version",
  parseArgs,
  check({ options }) {
    const { stableOnly, tagArg } = options;
    const tag = resolveTag(tagArg);
    if (!tag) {
      throw new Error(
        "Missing release tag. Provide --tag vX.Y.Z[-prerelease][+build] or run under tag ref.",
      );
    }
    if (!tag.startsWith("v")) {
      throw new Error(`Tag ${tag} does not match vX.Y.Z[-prerelease][+build] format.`);
    }
    const version = tag.slice(1);
    const parsed = parseReleaseSemver(version);
    if (!parsed) {
      throw new Error(`Tag ${tag} does not match vX.Y.Z[-prerelease][+build] format.`);
    }
    if (stableOnly && parsed.prerelease.length > 0) {
      throw new Error(
        `Refusing to publish prerelease ${tag} through the stable release workflow. ` +
          "Prepare a stable X.Y.Z release version before publishing with npm tag latest.",
      );
    }
    return assertReleaseParity(process.cwd(), { requiredVersion: version });
  },
});

runScriptMain(main);
