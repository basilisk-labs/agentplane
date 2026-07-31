import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const TSC_NODE_HEAP_OPTION = "--max-old-space-size=4096";
const DEFAULT_TYPESCRIPT_PACKAGE = "@typescript/native";
const FALLBACK_TYPESCRIPT_PACKAGE = "typescript";
const allowedTypescriptPackages = new Set([
  DEFAULT_TYPESCRIPT_PACKAGE,
  FALLBACK_TYPESCRIPT_PACKAGE,
]);

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

const typescriptPackage = process.env.AGENTPLANE_TYPESCRIPT_PACKAGE || DEFAULT_TYPESCRIPT_PACKAGE;

if (!allowedTypescriptPackages.has(typescriptPackage)) {
  throw new Error(
    `Unsupported AGENTPLANE_TYPESCRIPT_PACKAGE=${JSON.stringify(typescriptPackage)}. Expected ${DEFAULT_TYPESCRIPT_PACKAGE} or ${FALLBACK_TYPESCRIPT_PACKAGE}.`,
  );
}

const localTscEntrypoint = findUp(
  path.join("node_modules", ...typescriptPackage.split("/"), "bin", "tsc"),
);

if (localTscEntrypoint === null) {
  throw new Error(
    `TypeScript entrypoint not found for ${typescriptPackage}. Run the repository install step before retrying.`,
  );
}

const existingNodeOptions = process.env.NODE_OPTIONS ?? "";
const nodeOptions = existingNodeOptions.includes("--max-old-space-size")
  ? existingNodeOptions
  : [TSC_NODE_HEAP_OPTION, existingNodeOptions].filter(Boolean).join(" ");

const cliArgs = process.argv.slice(2);
const directInvocation =
  cliArgs[0] === "-p" ||
  cliArgs[0] === "--project" ||
  cliArgs[0] === "-v" ||
  cliArgs[0] === "--version" ||
  cliArgs[0] === "-h" ||
  cliArgs[0] === "--help";
const tscArgs = directInvocation ? cliArgs : ["-b", ...cliArgs];

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
