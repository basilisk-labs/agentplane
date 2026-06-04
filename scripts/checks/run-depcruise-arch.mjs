import { spawnSync } from "node:child_process";
import path from "node:path";

import depcruiseConfig from "../../depcruise.config.cjs";

void depcruiseConfig;

const PACKAGE_ROOTS = [
  "packages/agentplane/src",
  "packages/core/src",
  "packages/recipes/src",
  "packages/testkit/src",
];

const configPath = process.argv[2] ?? "depcruise.config.cjs";

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

function runForRoot(root) {
  process.stdout.write(`dependency-cruiser: ${root}\n`);
  const result = spawnSync(path.join("node_modules", ".bin", "depcruise"), [...BASE_ARGS, root], {
    stdio: "inherit",
    env: process.env,
  });

  if (result.signal) {
    throw new Error(`dependency-cruiser terminated for ${root}: signal=${result.signal}`);
  }
  if (result.status !== 0) {
    throw new Error(`dependency-cruiser failed for ${root}: exit=${result.status ?? 1}`);
  }
}

for (const root of PACKAGE_ROOTS) {
  runForRoot(root);
}
