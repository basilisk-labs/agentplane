import { spawnSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";

import depcruiseConfig from "../../depcruise.config.cjs";

void depcruiseConfig;

const AGENTPLANE_SRC = "packages/agentplane/src";
const AGENTPLANE_COMMANDS = "packages/agentplane/src/commands";
const DEPCRUISE_NODE_HEAP_OPTION = "--max-old-space-size=4096";

function assertSupportedNodeVersion() {
  const major = Number.parseInt(process.versions.node.split(".")[0] ?? "", 10);
  if (!Number.isInteger(major) || major < 24) {
    throw new Error(
      `dependency-cruiser arch check requires Node >=24; current node=${process.version}. ` +
        "Use a runtime supported by the repository engines contract before retrying release validation.",
    );
  }
}

function childPaths(root) {
  return readdirSync(root)
    .map((name) => path.join(root, name))
    .toSorted();
}

function isDirectory(filePath) {
  return statSync(filePath).isDirectory();
}

function isTypeScriptFile(filePath) {
  return statSync(filePath).isFile() && filePath.endsWith(".ts");
}

function depcruiseEnv() {
  const existingNodeOptions = process.env.NODE_OPTIONS ?? "";
  const nodeOptions = existingNodeOptions.includes("--max-old-space-size")
    ? existingNodeOptions
    : [DEPCRUISE_NODE_HEAP_OPTION, existingNodeOptions].filter(Boolean).join(" ");
  return {
    ...process.env,
    NODE_OPTIONS: nodeOptions,
  };
}

const agentplaneTopLevelGroups = childPaths(AGENTPLANE_SRC)
  .filter((filePath) => filePath !== AGENTPLANE_COMMANDS)
  .map((filePath) => ({ label: filePath, roots: [filePath] }));
const agentplaneCommandDirectoryGroups = childPaths(AGENTPLANE_COMMANDS)
  .filter((filePath) => isDirectory(filePath))
  .map((filePath) => ({ label: filePath, roots: [filePath] }));
const agentplaneCommandRootFiles = childPaths(AGENTPLANE_COMMANDS).filter((filePath) =>
  isTypeScriptFile(filePath),
);

const ROOT_GROUPS = [
  ...agentplaneTopLevelGroups,
  ...agentplaneCommandDirectoryGroups,
  {
    label: "packages/agentplane/src/commands/*.ts",
    roots: agentplaneCommandRootFiles,
  },
  { label: "packages/core/src", roots: ["packages/core/src"] },
  { label: "packages/recipes/src", roots: ["packages/recipes/src"] },
  { label: "packages/testkit/src", roots: ["packages/testkit/src"] },
].filter((group) => group.roots.length > 0);

const configPath = process.argv[2] ?? "depcruise.config.cjs";

assertSupportedNodeVersion();

const BASE_ARGS = [
  "--config",
  configPath,
  "--ignore-known",
  ".dependency-cruiser-known-violations.json",
  "--include-only",
  "^packages/(agentplane|core|recipes|testkit)/src",
  "--exclude",
  "(^|/)(dist|node_modules)/",
];

function runForGroup(group) {
  process.stdout.write(`dependency-cruiser: ${group.label}\n`);
  const result = spawnSync(
    path.join("node_modules", ".bin", "depcruise"),
    [...BASE_ARGS, ...group.roots],
    {
      stdio: "inherit",
      env: depcruiseEnv(),
    },
  );

  if (result.signal) {
    throw new Error(`dependency-cruiser terminated for ${group.label}: signal=${result.signal}`);
  }
  if (result.status !== 0) {
    throw new Error(`dependency-cruiser failed for ${group.label}: exit=${result.status ?? 1}`);
  }
}

for (const group of ROOT_GROUPS) {
  runForGroup(group);
}
