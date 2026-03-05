import { execFileSync } from "node:child_process";

function run(command, args, env) {
  execFileSync(command, args, {
    stdio: "inherit",
    env: env ? { ...process.env, ...env } : process.env,
  });
}

function stagedFiles() {
  const out = execFileSync("git", ["diff", "--cached", "--name-only", "--diff-filter=ACMR"], {
    encoding: "utf8",
  }).trim();
  if (!out) return [];
  return out
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function commitMsgPath() {
  const fromArg = process.argv[2]?.trim();
  if (fromArg) return fromArg;
  return execFileSync("git", ["rev-parse", "--git-path", "COMMIT_EDITMSG"], {
    encoding: "utf8",
  }).trim();
}

const files = stagedFiles();
const msg = commitMsgPath();
if (files.length === 0) {
  process.stdout.write("commit-msg: no staged files detected.\n");
}

run("node", ["packages/agentplane/bin/agentplane.js", "hooks", "run", "commit-msg", "--", msg]);
