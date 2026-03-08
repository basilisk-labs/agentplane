import { execFileSync } from "node:child_process";
import path from "node:path";

import { eslintTargets, prettierTargets } from "./lib/pre-commit-staged-files.mjs";

function run(command, args, env) {
  execFileSync(command, args, {
    stdio: "inherit",
    env: env ? { ...process.env, ...env } : process.env,
  });
}

function repoRoot() {
  return execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();
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

function localBin(root, name) {
  const ext = process.platform === "win32" ? ".cmd" : "";
  return path.join(root, "node_modules", ".bin", `${name}${ext}`);
}

const root = repoRoot();
const files = stagedFiles();

const prettierFiles = prettierTargets(files);
if (prettierFiles.length > 0) {
  run(localBin(root, "prettier"), ["--check", ...prettierFiles]);
} else {
  process.stdout.write("pre-commit: no staged files for Prettier, skipping.\n");
}

const eslintFiles = eslintTargets(files);
if (eslintFiles.length > 0) {
  run(localBin(root, "eslint"), eslintFiles);
} else {
  process.stdout.write("pre-commit: no staged files for ESLint, skipping.\n");
}
