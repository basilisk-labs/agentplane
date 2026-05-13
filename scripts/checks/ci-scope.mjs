import { execFileSync } from "node:child_process";
import path from "node:path";

const SCOPES = {
  agentplane: {
    format: ["packages/agentplane"],
    lint: ["packages/agentplane/src", "packages/agentplane/bin"],
    typecheck: ["packages/agentplane/tsconfig.json"],
    testDir: "packages/agentplane/src",
  },
  core: {
    format: ["packages/core"],
    lint: ["packages/core/src"],
    typecheck: ["packages/core/tsconfig.json"],
    testDir: "packages/core/src",
  },
  recipes: {
    format: ["packages/recipes"],
    lint: ["packages/recipes/src"],
    typecheck: ["packages/recipes/tsconfig.json"],
    testDir: "packages/recipes/src",
  },
  spec: {
    format: ["packages/spec"],
    lint: ["packages/spec"],
    typecheck: ["packages/spec/tsconfig.json"],
    testDir: null,
  },
  testkit: {
    format: ["packages/testkit"],
    lint: ["packages/testkit/src"],
    typecheck: ["packages/testkit/tsconfig.json"],
    testDir: "packages/testkit/src",
  },
};

function usage() {
  console.log("Usage: node scripts/ci-scope.mjs --scope <name>");
  console.log(`Available scopes: ${Object.keys(SCOPES).join(", ")}`);
}

function run(cmd, args) {
  execFileSync(cmd, args, { stdio: "inherit" });
}

function runPrettier(paths) {
  if (paths.length === 0) return;
  run("bun", ["x", "prettier", ...paths, "--check"]);
}

function runEslint(paths) {
  if (paths.length === 0) return;
  run("bun", ["x", "eslint", ...paths]);
}

function runTypecheck(configs) {
  if (configs.length === 0) return;
  run("bun", ["x", "tsc", "-b", ...configs]);
}

function listTestFiles(dir) {
  if (!dir) return [];
  try {
    const output = execFileSync("rg", ["--files", "-g", "*.test.ts", dir], {
      encoding: "utf8",
    });
    return output
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  } catch {
    const output = execFileSync("find", [dir, "-type", "f", "-name", "*.test.ts"], {
      encoding: "utf8",
    });
    return output
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }
}

function runVitest(dir) {
  if (!dir) return;
  const files = listTestFiles(dir);
  if (files.length === 0) {
    throw new Error(`No test files found under ${dir}`);
  }
  run("bun", ["x", "vitest", "run", "--testTimeout", "30000", ...files]);
}

const argv = process.argv.slice(2);
const scopeIndex = argv.indexOf("--scope");
if (scopeIndex === -1 || !argv[scopeIndex + 1]) {
  usage();
  throw new Error("Missing required --scope argument");
}

const scope = argv[scopeIndex + 1];
const config = SCOPES[scope];
if (!config) {
  console.error(`Unknown scope: ${scope}`);
  usage();
  throw new Error(`Unknown scope: ${scope}`);
}

const cwd = process.cwd();
const formatPaths = config.format.map((p) => path.resolve(cwd, p));
const lintPaths = config.lint.map((p) => path.resolve(cwd, p));
const typecheckPaths = config.typecheck.map((p) => path.resolve(cwd, p));
const testDir = config.testDir ? path.resolve(cwd, config.testDir) : null;

runPrettier(formatPaths);
runEslint(lintPaths);
runTypecheck(typecheckPaths);
runVitest(testDir);
