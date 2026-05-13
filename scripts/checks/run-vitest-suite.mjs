import { execFileSync, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { pathToFileURL } from "node:url";

import {
  TEST_ROUTE_REGISTRY_ROOT as REPO_ROOT,
  VITEST_SUITES as ROUTE_SUITES,
} from "../lib/test-route-registry.mjs";
export { listVitestSuiteFiles } from "../lib/test-route-registry.mjs";

const VITEST_TIMEOUT_MS = "60000";
export const VITEST_CHUNK_TIMEOUT_MS = 10 * 60 * 1000;
export const SUITES = ROUTE_SUITES;

function printHelp() {
  process.stdout.write(`Usage: node scripts/run-vitest-suite.mjs <suite> [vitest args...]

Suites:
${Object.keys(SUITES)
  .toSorted((a, b) => a.localeCompare(b))
  .map((name) => `  - ${name}`)
  .join("\n")}
`);
}

function buildVitestArgs(suite, files, extraArgs) {
  return [
    "vitest",
    "--config",
    suite.config ?? "vitest.workspace.ts",
    "run",
    ...files,
    `--pool=${suite.pool}`,
    "--maxWorkers",
    suite.maxWorkers,
    "--testTimeout",
    suite.testTimeout ?? VITEST_TIMEOUT_MS,
    "--hookTimeout",
    suite.hookTimeout ?? VITEST_TIMEOUT_MS,
    ...extraArgs,
  ];
}

function chunkFiles(files, chunkSize, isolatedPatterns = []) {
  const chunks = [];
  let pending = [];
  const flushPending = () => {
    if (pending.length === 0) return;
    chunks.push(pending);
    pending = [];
  };
  for (const file of files) {
    if (isolatedPatterns.some((pattern) => pattern.test(file))) {
      flushPending();
      chunks.push([file]);
      continue;
    }
    pending.push(file);
    if (pending.length === chunkSize) {
      flushPending();
    }
  }
  flushPending();
  return chunks;
}

function runVitest(args, files) {
  const startedAt = performance.now();
  execFileSync("bunx", args, {
    cwd: REPO_ROOT,
    env: process.env,
    stdio: "inherit",
  });
  return {
    durationMs: Math.round(performance.now() - startedAt),
    files,
    summary: "",
  };
}

function runVitestCaptured(args, files) {
  const startedAt = performance.now();
  const result = spawnSync("bunx", args, {
    cwd: REPO_ROOT,
    encoding: "utf8",
    env: process.env,
    maxBuffer: 64 * 1024 * 1024,
    timeout: VITEST_CHUNK_TIMEOUT_MS,
  });
  const output = [result.stdout, result.stderr].filter(Boolean).join("");
  const fileList = files.join(", ");
  if (result.error) {
    if (output) process.stdout.write(output);
    throw new Error(`Vitest failed for ${fileList}: ${result.error.message}`, {
      cause: result.error,
    });
  }
  if (result.status !== 0 || result.signal) {
    if (output) process.stdout.write(output);
    throw new Error(
      `Vitest failed for ${fileList} with status=${result.status ?? "null"} signal=${result.signal ?? "none"}`,
    );
  }
  return {
    durationMs: Math.round(performance.now() - startedAt),
    files,
    output,
    summary: summarizeVitestOutput(output),
  };
}

function summarizeVitestOutput(output) {
  return output
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^(Test Files|Tests|Duration)\b/.test(line))
    .join("; ");
}

function formatChunkFileLabel(files) {
  return `: ${files.join(", ")}`;
}

function parseRunnerArgs(args) {
  const vitestArgs = [];
  let reportJson = null;
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--report-json") {
      reportJson = args[index + 1] ?? "";
      index += 1;
      continue;
    }
    if (arg.startsWith("--report-json=")) {
      reportJson = arg.slice("--report-json=".length);
      continue;
    }
    vitestArgs.push(arg);
  }
  if (reportJson !== null && reportJson.trim() === "") {
    throw new Error("--report-json requires an output path");
  }
  return { reportJson, vitestArgs };
}

async function writeReport(reportJson, suiteName, chunks) {
  if (!reportJson) return;
  const reportPath = path.resolve(REPO_ROOT, reportJson);
  await mkdir(path.dirname(reportPath), { recursive: true });
  await writeFile(
    reportPath,
    `${JSON.stringify(
      {
        suite: suiteName,
        totalDurationMs: chunks.reduce((total, chunk) => total + chunk.durationMs, 0),
        chunks: chunks.map((chunk, index) => ({
          index: index + 1,
          durationMs: chunk.durationMs,
          files: chunk.files,
          summary: chunk.summary,
        })),
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  process.stdout.write(`Vitest suite ${suiteName}: wrote report ${reportJson}\n`);
}

async function main(argv = process.argv.slice(2)) {
  const suiteName = argv[0];
  if (suiteName === "--help" || suiteName === "-h") {
    printHelp();
    return;
  } else if (suiteName) {
    const suite = SUITES[suiteName];
    if (!suite) {
      printHelp();
      throw new Error(`Unknown Vitest suite: ${suiteName}`);
    }

    if (suite.files.length === 0) {
      throw new Error(`Vitest suite has no test files: ${suiteName}`);
    }

    const missingFiles = suite.files.filter(
      (filePath) => !existsSync(path.join(REPO_ROOT, filePath)),
    );
    if (missingFiles.length > 0) {
      throw new Error(
        `Vitest suite ${suiteName} references missing files: ${missingFiles.join(", ")}`,
      );
    }

    const { reportJson, vitestArgs: extraArgs } = parseRunnerArgs(argv.slice(1));
    const results = [];
    if (Number.isInteger(suite.chunkSize) && suite.chunkSize > 0) {
      const chunks = chunkFiles(suite.files, suite.chunkSize, suite.isolatedPatterns ?? []);
      for (const [index, files] of chunks.entries()) {
        process.stdout.write(
          `Vitest suite ${suiteName}: chunk ${index + 1}/${chunks.length} (${files.length} files)${formatChunkFileLabel(files)}\n`,
        );
        const result = runVitestCaptured(buildVitestArgs(suite, files, extraArgs), files);
        results.push(result);
        const summary = result.summary;
        process.stdout.write(
          `Vitest suite ${suiteName}: chunk ${index + 1}/${chunks.length} passed in ${result.durationMs}ms${summary ? ` (${summary})` : ""}\n`,
        );
      }
    } else {
      const result = reportJson
        ? runVitestCaptured(buildVitestArgs(suite, suite.files, extraArgs), suite.files)
        : runVitest(buildVitestArgs(suite, suite.files, extraArgs), suite.files);
      results.push(result);
    }
    await writeReport(reportJson, suiteName, results);
  } else {
    printHelp();
    throw new Error("Missing Vitest suite name.");
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
