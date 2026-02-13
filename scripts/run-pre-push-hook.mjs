import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

function run(command, args) {
  execFileSync(command, args, { stdio: "inherit" });
}

function hasReleaseTagPush() {
  const stdin = readFileSync(0, "utf8").trim();
  if (!stdin) return false;
  return stdin
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .some((line) => {
      const parts = line.split(/\s+/);
      const remoteRef = parts[2] ?? "";
      return remoteRef.startsWith("refs/tags/");
    });
}

const envRelease =
  String(process.env.AGENTPLANE_HOOKS_RELEASE ?? "")
    .trim()
    .toLowerCase() === "1";
const envFull =
  String(process.env.AGENTPLANE_HOOKS_FULL ?? "")
    .trim()
    .toLowerCase() === "1";
const isReleasePush = envRelease || envFull || hasReleaseTagPush();
const mode = isReleasePush ? "release" : "standard";
process.stdout.write(`Running pre-push checks in ${mode} mode.\n`);

run("node", ["scripts/check-release-notes.mjs"]);
run("bun", ["run", "test:critical"]);

if (isReleasePush) {
  run("bun", ["run", "test:full"]);
}
