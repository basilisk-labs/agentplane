import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const REQUIRED_ENV_KEYS = [
  "AGENTPLANE_REDMINE_URL",
  "AGENTPLANE_REDMINE_API_KEY",
  "AGENTPLANE_REDMINE_PROJECT_ID",
  "AGENTPLANE_REDMINE_CUSTOM_FIELDS_TASK_ID",
];

function parseDotEnv(text) {
  const out = {};
  for (const rawLine of text.split(/\r?\n/u)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx <= 0) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      const quote = value[0];
      value = value.slice(1, -1);
      if (quote === '"') {
        value = value
          .replaceAll(String.raw`\n`, "\n")
          .replaceAll(String.raw`\r`, "\r")
          .replaceAll(String.raw`\t`, "\t")
          .replaceAll(String.raw`\"`, '"')
          .replaceAll(String.raw`\\`, "\\");
      }
    }
    if (key) out[key] = value;
  }
  return out;
}

function loadRepoDotEnv(rootDir) {
  const envPath = path.join(rootDir, ".env");
  if (!existsSync(envPath)) return;
  const parsed = parseDotEnv(readFileSync(envPath, "utf8"));
  for (const [key, value] of Object.entries(parsed)) {
    process.env[key] ??= value;
  }
}

function missingRequiredEnv() {
  return REQUIRED_ENV_KEYS.filter((key) => {
    const value = process.env[key];
    return typeof value !== "string" || value.trim().length === 0;
  });
}

function main() {
  const rootDir = process.cwd();
  loadRepoDotEnv(rootDir);

  const missing = missingRequiredEnv();
  if (missing.length > 0) {
    console.log(
      `[agentplane] skipping live Redmine backend suite; missing env: ${missing.join(", ")}`,
    );
    return;
  }

  const result = spawnSync(
    "bunx",
    [
      "vitest",
      "run",
      "packages/agentplane/src/backends/task-backend/redmine/live.test.ts",
      "--pool=forks",
      "--hookTimeout",
      "60000",
      "--testTimeout",
      "60000",
    ],
    {
      stdio: "inherit",
      cwd: rootDir,
      env: process.env,
    },
  );

  if (typeof result.status === "number") {
    process.exitCode = result.status;
    return;
  }

  throw new Error("live Redmine backend suite terminated without an exit status");
}

main();
