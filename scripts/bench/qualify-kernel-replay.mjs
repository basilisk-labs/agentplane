import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtempSync, mkdirSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { collectReplayHarnessFiles } from "../lib/agent-efficiency-replay-harness.mjs";
import { initializeAnchorCheckout } from "./internal/agent-efficiency-capture-runtime.mjs";
import {
  linkReplayDependencies,
  summarizeReplayReport,
} from "./internal/kernel-replay-isolation.mjs";
import {
  createReplayDependencyManifest,
  assertReplayDependencyManifestUnchanged,
} from "./internal/agent-efficiency-dependency-manifest.mjs";

import { qualifyKernelCorpus } from "./internal/kernel-qualification-manifest.mjs";

const sourceRoot = realpathSync(process.cwd());
const anchor = process.argv[2];
const captureOutput =
  process.argv[3] === "--capture" && process.argv.length === 5
    ? path.resolve(process.argv[4])
    : null;
if (process.argv.length > 3 && !captureOutput)
  throw new Error("Expected --capture <new-output-file>");
if (!anchor || !/^[a-f0-9]{40}$/u.test(anchor))
  throw new Error("Pass an exact committed replay anchor.");
const relativeDriver = "scripts/bench/qualify-kernel-replay.mjs";
const driver = readFileSync(fileURLToPath(import.meta.url));
const anchoredDriver = execFileSync("git", ["show", `${anchor}:${relativeDriver}`], {
  cwd: sourceRoot,
});
if (!driver.equals(anchoredDriver))
  throw new Error("Replay driver does not match the requested anchor.");
const harnessFiles = collectReplayHarnessFiles(sourceRoot, relativeDriver);
const sha256 = (bytes) => `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
function captureHarness() {
  return harnessFiles.map((file) => {
    const bytes = readFileSync(path.join(sourceRoot, file));
    const anchored = execFileSync("git", ["show", `${anchor}:${file}`], { cwd: sourceRoot });
    if (!bytes.equals(anchored)) throw new Error(`Replay helper differs from anchor: ${file}`);
    return { path: file, digest: sha256(bytes) };
  });
}
const harness = captureHarness();
const runnerSeeds = [
  { label: "node_modules/vitest", path: path.join(sourceRoot, "node_modules/vitest") },
];
const dependencies = createReplayDependencyManifest(sourceRoot, runnerSeeds);
const temporary = realpathSync(mkdtempSync(path.join(os.tmpdir(), "qualified-kernel-replay-")));
const checkout = path.join(temporary, "checkout");
try {
  // The existing exact-anchor helper removes the origin and checks the committed tree.
  mkdirSync(checkout);
  initializeAnchorCheckout(sourceRoot, checkout, anchor);
  const { modules, mappings } = linkReplayDependencies(sourceRoot, checkout);
  const config = path.join(checkout, ".kernel-replay.config.mjs");
  const reportFile = path.join(temporary, "report.json");
  const capturedFile = path.join(temporary, "persistence-corpus.json");
  // The anchored config resolves workspace packages from this checkout. Reject a source leak.
  writeFileSync(
    config,
    `import original from ${JSON.stringify(path.join(checkout, "vitest.config.ts"))};
export default {
  ...original,
  resolve: { ...original.resolve, alias: [
    { find: /^@agentplaneorg\\/recipes$/, replacement: ${JSON.stringify(path.join(checkout, "packages/recipes/src/index.ts"))} },
    ...(original.resolve?.alias ?? []),
  ] },
  plugins: [...(original.plugins ?? []), {
    name: 'kernel-replay-source-containment', enforce: 'pre',
    transform(_code, id) {
      const file = id.split('?')[0];
      if (file.startsWith('/') && !file.startsWith(${JSON.stringify(checkout + path.sep)}) && !file.startsWith(${JSON.stringify(modules + path.sep)})) {
        throw new Error('Replay source resolved outside the exact checkout: ' + file);
      }
    },
  }],
  test: { ...original.test, reporters: ['json'], outputFile: ${JSON.stringify(reportFile)} },
};\n`,
  );
  const tests = [
    "packages/agentplane/src/adapters/task-backend/kernel-replay.test.ts",
    "packages/agentplane/src/adapters/task-backend/kernel-replay-persistence.test.ts",
    "packages/agentplane/src/adapters/task-backend/kernel-replay-migration.test.ts",
    "packages/agentplane/src/adapters/task-backend/kernel-migration.test.ts",
    "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts",
    "packages/core/src/tasks/task-kernel/kernel.test.ts",
    "packages/core/src/tasks/task-kernel/invariants.test.ts",
    "packages/core/src/tasks/task-kernel/model.test.ts",
  ];
  const command = [
    path.join(modules, "vitest/vitest.mjs"),
    "run",
    "--root",
    checkout,
    "--config",
    config,
    ...tests,
  ];
  let failure = null;
  try {
    execFileSync(process.execPath, command, {
      cwd: checkout,
      timeout: 600_000,
      maxBuffer: 32 * 1024 * 1024,
      stdio: "pipe",
      env: {
        ...process.env,
        AGENTPLANE_KERNEL_CAPTURE_OUTPUT: capturedFile,
        AGENTPLANE_KERNEL_CAPTURE_ANCHOR: anchor,
      },
    });
  } catch (error) {
    failure = error;
  }
  let reportBytes = null;
  let report = null;
  let reportFailure = null;
  try {
    reportBytes = readFileSync(reportFile);
    report = JSON.parse(reportBytes.toString("utf8"));
  } catch (error) {
    reportFailure = `Unable to read the test report: ${error.message}`;
  }
  const runnerFailure = failure
    ? [failure.message, failure.stderr?.toString()].filter(Boolean).join("\n").slice(-16_000)
    : reportFailure;
  const outcome = summarizeReplayReport(report, runnerFailure);
  assertReplayDependencyManifestUnchanged(
    dependencies,
    createReplayDependencyManifest(sourceRoot, runnerSeeds),
  );
  if (JSON.stringify(harness) !== JSON.stringify(captureHarness()))
    throw new Error("Replay harness changed during qualification.");
  const dirty = execFileSync("git", ["status", "--porcelain", "--untracked-files=no"], {
    cwd: checkout,
    encoding: "utf8",
  });
  if (dirty !== "") throw new Error("Replay changed exact-anchor tracked files.");
  let qualification = null;
  let capturedBytes = null;
  if (outcome.success) {
    try {
      capturedBytes = readFileSync(capturedFile);
      const corpus = (name) =>
        JSON.parse(
          readFileSync(
            path.join(checkout, "packages/agentplane/src/adapters/task-backend", name),
            "utf8",
          ),
        );
      qualification = qualifyKernelCorpus({
        anchor,
        captured: JSON.parse(capturedBytes.toString("utf8")),
        kernel: corpus("kernel-replay.corpus.json"),
        migration: corpus("kernel-replay-migration.corpus.json"),
        evidence: corpus("kernel-replay-evidence.corpus.json"),
        persistence: corpus("kernel-replay-persistence.corpus.json"),
      });
    } catch (error) {
      outcome.success = false;
      outcome.first_failure = "qualification_manifest";
      outcome.failure_details = [error.message];
    }
  }
  // Export only after tests, complete family coverage and all isolation checks pass.
  if (captureOutput && outcome.success) writeFileSync(captureOutput, capturedBytes, { flag: "wx" });
  const corpusPaths = [
    "kernel-replay.corpus.json",
    "kernel-replay-migration.corpus.json",
    "kernel-replay-evidence.corpus.json",
    "kernel-replay-persistence.corpus.json",
  ];
  process.stdout.write(
    JSON.stringify(
      {
        schema_version: 1,
        kind: "kernel_replay_qualification",
        implementation_anchor: anchor,
        tree: execFileSync("git", ["rev-parse", "HEAD^{tree}"], {
          cwd: checkout,
          encoding: "utf8",
        }).trim(),
        driver_digest: sha256(driver),
        harness,
        dependency_mappings: mappings,
        dependency_manifest: dependencies,
        corpus: corpusPaths.map((name) => ({
          path: name,
          digest: sha256(
            readFileSync(
              path.join(checkout, "packages/agentplane/src/adapters/task-backend", name),
            ),
          ),
        })),
        report_digest: reportBytes ? sha256(reportBytes) : null,
        capture_digest: capturedBytes ? sha256(capturedBytes) : null,
        qualification,
        ...outcome,
        reproduction_command: `node ${relativeDriver} ${anchor}`,
        limitations: [
          "Provider effects use explicit fakes.",
          "This is not the M3 production cutover, self-hosting or release-drill proof.",
        ],
      },
      null,
      2,
    ) + "\n",
  );
  if (!outcome.success) process.exitCode = 1;
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
