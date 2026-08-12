import { execFileSync } from "node:child_process";

const parentSha = String(process.env.AGENTPLANE_REUSE_SHA ?? "").trim();
const token = String(process.env.GITHUB_TOKEN ?? "").trim();
const repository = String(process.env.GITHUB_REPOSITORY ?? "").trim();
const apiUrl = String(process.env.GITHUB_API_URL ?? "https://api.github.com").replace(/\/$/u, "");

if (!/^[0-9a-f]{40}$/u.test(parentSha) || !token || !repository) {
  throw new Error("Verified-parent reuse requires an exact parent SHA and GitHub read token.");
}

const changed = execFileSync("git", ["diff", "--name-only", parentSha, "HEAD"], {
  encoding: "utf8",
})
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean);
if (changed.length === 0 || changed.some((filePath) => !/^\.agentplane\/tasks\//u.test(filePath))) {
  throw new Error("Verification reuse is restricted to lifecycle-only task artifacts.");
}

const response = await fetch(`${apiUrl}/repos/${repository}/commits/${parentSha}/check-runs`, {
  headers: {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
  },
});
if (!response.ok) {
  throw new Error(`Could not read parent checks: GitHub returned ${response.status}.`);
}
const payload = await response.json();
const aggregate = Array.isArray(payload.check_runs)
  ? payload.check_runs.find(
      (check) => check?.name === "PR verification" && check?.conclusion === "success",
    )
  : null;
if (!aggregate) {
  throw new Error(`Parent ${parentSha} has no successful PR verification aggregate.`);
}
process.stdout.write(
  `${JSON.stringify({
    schema_version: 1,
    kind: "verified_parent_reuse",
    parent_sha: parentSha,
    current_sha: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
    changed_files: changed,
    source_check_url: aggregate.html_url,
  })}\n`,
);
