import { execFileSync } from "node:child_process";
import path from "node:path";

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

function hasAnyFileWithExt(files, extensions) {
  return files.some((file) => extensions.some((ext) => file.endsWith(ext)));
}

function filesWithExt(files, extensions) {
  return files.filter((file) => extensions.some((ext) => file.endsWith(ext)));
}

const root = repoRoot();
const files = stagedFiles();

const prettierExts = [
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".mjs",
  ".cjs",
  ".json",
  ".yml",
  ".yaml",
  ".md",
  ".mdx",
];
if (hasAnyFileWithExt(files, prettierExts)) {
  run(localBin(root, "prettier"), ["--check", ...filesWithExt(files, prettierExts)]);
} else {
  process.stdout.write("pre-commit: no staged files for Prettier, skipping.\n");
}

const eslintExts = [".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs"];
if (hasAnyFileWithExt(files, eslintExts)) {
  run(localBin(root, "eslint"), filesWithExt(files, eslintExts));
} else {
  process.stdout.write("pre-commit: no staged files for ESLint, skipping.\n");
}
