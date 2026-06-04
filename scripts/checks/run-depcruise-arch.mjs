import { spawnSync } from "node:child_process";
import path from "node:path";

const PACKAGE_ROOTS = [
  "packages/agentplane/src",
  "packages/core/src",
  "packages/recipes/src",
  "packages/testkit/src",
];

const BASE_ARGS = [
  "--config",
  "depcruise.config.cjs",
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
    process.stderr.write(`dependency-cruiser terminated for ${root}: signal=${result.signal}\n`);
    process.exit(128);
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

for (const root of PACKAGE_ROOTS) {
  runForRoot(root);
}
