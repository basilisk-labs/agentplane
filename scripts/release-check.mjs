import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultCacheDir = path.resolve(__dirname, "..", ".agentplane", ".npm-cache");

const releasePackages = ["core", "agentplane"];
const command = "npm";
const args = ["pack", "--dry-run"];

function makeNpmPackEnv() {
  const cacheDir = process.env.NPM_CONFIG_CACHE || defaultCacheDir;
  mkdirSync(cacheDir, { recursive: true });
  return {
    ...process.env,
    NPM_CONFIG_CACHE: cacheDir,
  };
}

function runNpmPack(packageName) {
  const cwd = path.resolve(process.cwd(), "packages", packageName);
  const env = makeNpmPackEnv();
  execFileSync(command, args, {
    cwd,
    env,
    stdio: "inherit",
  });
}

for (const packageName of releasePackages) {
  runNpmPack(packageName);
}
