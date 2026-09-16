import { readFileSync } from "node:fs";

import { compareReleaseSemver, parseReleaseSemver } from "../lib/release-semver.mjs";
import { defineScript, isDirectRun, runScriptMain } from "../lib/script-runtime.mjs";

function requireStableVersion(value, label) {
  const parsed = parseReleaseSemver(value);
  if (!parsed || parsed.prerelease.length > 0 || parsed.build.length > 0) {
    throw new Error(`${label} must be a stable SemVer without build metadata: ${String(value)}`);
  }
  return parsed.raw;
}

function exactReleaseTag(version) {
  return `release-v${version}`;
}

export function stableVersionsFromGithubReleases(releases) {
  if (!Array.isArray(releases)) throw new Error("GitHub releases payload must be an array.");
  return releases
    .filter((release) => !release?.draft && !release?.prerelease)
    .map((release) => String(release?.tag_name ?? ""))
    .filter((tag) => tag.startsWith("v"))
    .map((tag) => tag.slice(1))
    .filter((version) => {
      const parsed = parseReleaseSemver(version);
      return parsed && parsed.prerelease.length === 0 && parsed.build.length === 0;
    });
}

export function planStableChannelPromotion({ candidate, observed = [] }) {
  const candidateVersion = requireStableVersion(candidate, "candidate");
  const observations = observed.map((entry, index) => {
    if (!entry || typeof entry !== "object") {
      throw new Error(`observed[${index}] must be an object.`);
    }
    const source = String(entry.source ?? "").trim();
    if (!source) throw new Error(`observed[${index}].source is required.`);
    return { source, version: requireStableVersion(entry.version, `observed ${source}`) };
  });
  let highestObservedStable = null;
  for (const entry of observations) {
    if (
      highestObservedStable === null ||
      compareReleaseSemver(entry.version, highestObservedStable) > 0
    ) {
      highestObservedStable = entry.version;
    }
  }
  const promotesStableChannel =
    highestObservedStable === null ||
    compareReleaseSemver(candidateVersion, highestObservedStable) >= 0;

  return {
    schemaVersion: 1,
    candidate: candidateVersion,
    highestObservedStable,
    promotesStableChannel,
    npmTag: promotesStableChannel ? "latest" : exactReleaseTag(candidateVersion),
    reasonCode: promotesStableChannel
      ? highestObservedStable === null
        ? "no_published_stable_observed"
        : compareReleaseSemver(candidateVersion, highestObservedStable) === 0
          ? "candidate_matches_stable_channel"
          : "candidate_advances_stable_channel"
      : "candidate_precedes_stable_channel",
    observations,
  };
}

function parseObserved(values) {
  return values.map((value) => {
    const separator = value.indexOf("=");
    if (separator <= 0 || separator === value.length - 1) {
      throw new Error(`--observed must use <source>=<version>: ${value}`);
    }
    return { source: value.slice(0, separator), version: value.slice(separator + 1) };
  });
}

function parseArgs(argv) {
  const args = { candidate: null, githubReleases: null, observed: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === "--candidate" || arg === "--github-releases" || arg === "--observed") {
      if (!next) throw new Error(`Missing value for ${arg}`);
      if (arg === "--candidate") args.candidate = next;
      if (arg === "--github-releases") args.githubReleases = next;
      if (arg === "--observed") args.observed.push(next);
      index += 1;
      continue;
    }
    throw new Error(`unknown argument: ${arg}`);
  }
  return args;
}

function githubReleaseObservations(filePath) {
  if (!filePath) return [];
  const payload = JSON.parse(readFileSync(filePath, "utf8"));
  const releases =
    Array.isArray(payload) && payload.every((entry) => Array.isArray(entry))
      ? payload.flat()
      : payload;
  return stableVersionsFromGithubReleases(releases).map((version) => ({
    source: `github-release:v${version}`,
    version,
  }));
}

const main = defineScript({
  name: "stable-channel-policy",
  run({ argv, stdout }) {
    const args = parseArgs(argv);
    const plan = planStableChannelPromotion({
      candidate: args.candidate,
      observed: [
        ...parseObserved(args.observed),
        ...githubReleaseObservations(args.githubReleases),
      ],
    });
    stdout.write(`${JSON.stringify(plan, null, 2)}\n`);
  },
});

if (isDirectRun(import.meta.url)) runScriptMain(main);
