import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const TSC_NODE_HEAP_OPTION = "--max-old-space-size=4096";
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

const localTscEntrypoint = findUp(path.join("node_modules", "typescript", "bin", "tsc"));

if (localTscEntrypoint === null) {
  throw new Error(
    "TypeScript entrypoint not found under node_modules/typescript/bin/tsc. Run the repository install step before retrying.",
  );
}

const existingNodeOptions = process.env.NODE_OPTIONS ?? "";
const nodeOptions = existingNodeOptions.includes("--max-old-space-size")
  ? existingNodeOptions
  : [TSC_NODE_HEAP_OPTION, existingNodeOptions].filter(Boolean).join(" ");

const cliArgs = process.argv.slice(2);
const tscArgs =
  cliArgs[0] === "-p" || cliArgs[0] === "--project" ? cliArgs : ["-b", ...cliArgs];

const result = spawnSync(process.execPath, [localTscEntrypoint, ...tscArgs], {
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
    `TypeScript build terminated: signal=${result.signal}. Retry with the repository CI Node version and sufficient memory before treating this as a type error.`,
  );
}
if (result.status !== 0) {
  throw new Error(`TypeScript build failed: exit=${result.status ?? 1}`);
}
