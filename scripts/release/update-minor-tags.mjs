import { execFileSync } from "node:child_process";
import { parseReleaseSemver } from "../lib/release-semver.mjs";
import {
  defineScript,
  isDirectRun,
  parseScriptArgs,
  runScriptMain,
} from "../lib/script-runtime.mjs";

export function planMinorTags(releases, remoteOutput) {
  const refs = new Map(
    remoteOutput
      .trim()
      .split(/\r?\n/u)
      .filter(Boolean)
      .map((line) => {
        const [sha, ref] = line.split(/\s+/u);
        return [ref, sha];
      }),
  );
  const latest = new Map();
  for (const release of releases) {
    if (release.draft || release.prerelease || !release.tag_name.startsWith("v")) continue;
    const version = parseReleaseSemver(release.tag_name.slice(1));
    if (!version || version.prerelease.length || version.build.length) continue;
    const series = `${version.major}.${version.minor}`;
    if (!latest.has(series) || version.patch > latest.get(series).patch) {
      latest.set(series, { patch: version.patch, tag: release.tag_name });
    }
  }
  return [...latest].flatMap(([series, { tag }]) => {
    const fullRef = `refs/tags/${tag}`;
    const sha = refs.get(`${fullRef}^{}`) ?? refs.get(fullRef);
    if (!sha) throw new Error(`Published release tag is missing: ${tag}`);
    return [series, `v${series}`].map((alias) => {
      const ref = `refs/tags/${alias}`;
      return { ref, sha, tag, previous: refs.get(ref) ?? "" };
    });
  });
}

export function applyMinorTags(plan, git) {
  const updates = plan.filter(({ previous, sha }) => previous !== sha);
  if (!updates.length) return;
  // Exact leases reject a stale snapshot; atomic push prevents partial alias updates.
  git([
    "push",
    "--atomic",
    ...updates.map(({ ref, previous }) => `--force-with-lease=${ref}:${previous}`),
    "origin",
    ...updates.map(({ ref, sha }) => `${sha}:${ref}`),
  ]);
}

const main = defineScript({
  name: "update-minor-tags",
  run({ argv, stdout }) {
    const { flags } = parseScriptArgs(argv, { booleanFlags: ["apply"] });
    const git = (args) => execFileSync("git", args, { encoding: "utf8" });
    const pages = JSON.parse(
      execFileSync("gh", ["api", "--paginate", "--slurp", "repos/{owner}/{repo}/releases"], {
        encoding: "utf8",
        maxBuffer: 32 * 1024 * 1024,
      }),
    );
    const plan = planMinorTags(pages.flat(), git(["ls-remote", "--tags", "origin"]));
    stdout.write(`${JSON.stringify(plan, null, 2)}\n`);
    if (flags.apply) {
      // Fetch objects without modifying existing local tag refs.
      for (const sha of new Set(plan.map((entry) => entry.sha)))
        git(["fetch", "--no-tags", "origin", sha]);
      applyMinorTags(plan, git);
      const observed = git(["ls-remote", "--tags", "origin"]);
      for (const { ref, sha } of plan) {
        if (!observed.split(/\r?\n/u).some((line) => line === `${sha}\t${ref}`)) {
          throw new Error(`Remote alias verification failed: ${ref}`);
        }
      }
      stdout.write(`Verified ${plan.length} minor aliases.\n`);
    }
  },
});

if (isDirectRun(import.meta.url)) runScriptMain(main);
