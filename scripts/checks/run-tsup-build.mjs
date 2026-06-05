import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const TSUP_NODE_HEAP_OPTION = "--max-old-space-size=4096";

function findUp(relativePath) {
  let current = process.cwd();
  while (true) {
    const candidate = path.join(current, relativePath);
    if (existsSync(candidate)) return candidate;
    const parent = path.dirname(current);
    if (parent === current) return null;
    current = parent;
  }
}

const localTsupEntrypoint = findUp(path.join("node_modules", "tsup", "dist", "cli-default.js"));

if (localTsupEntrypoint === null) {
  throw new Error(
    "tsup entrypoint not found under node_modules/tsup/dist/cli-default.js. Run the repository install step before retrying.",
  );
}

const existingNodeOptions = process.env.NODE_OPTIONS ?? "";
const nodeOptions = existingNodeOptions.includes("--max-old-space-size")
  ? existingNodeOptions
  : [TSUP_NODE_HEAP_OPTION, existingNodeOptions].filter(Boolean).join(" ");

const result = spawnSync(process.execPath, [localTsupEntrypoint, ...process.argv.slice(2)], {
  cwd: process.cwd(),
  stdio: "inherit",
  env: {
    ...process.env,
    NODE_OPTIONS: nodeOptions,
  },
});

if (result.error) {
  throw result.error;
}
if (result.signal) {
  throw new Error(
    `tsup build terminated: signal=${result.signal}. Retry with the repository CI Node version and sufficient memory before treating this as a bundler error.`,
  );
}
if (result.status !== 0) {
  throw new Error(`tsup build failed: exit=${result.status ?? 1}`);
}
