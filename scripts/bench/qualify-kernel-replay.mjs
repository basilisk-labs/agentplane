import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { initializeAnchorCheckout } from "./internal/agent-efficiency-capture-runtime.mjs";
import {
  createReplayDependencyManifest,
  assertReplayDependencyManifestUnchanged,
} from "./internal/agent-efficiency-dependency-manifest.mjs";

const sourceRoot = process.cwd();
const anchor = process.argv[2];
if (!anchor || !/^[a-f0-9]{40}$/u.test(anchor))
  throw new Error("Pass an exact committed replay anchor.");
const relativeDriver = "scripts/bench/qualify-kernel-replay.mjs";
const driver = readFileSync(fileURLToPath(import.meta.url));
const anchoredDriver = execFileSync("git", ["show", `${anchor}:${relativeDriver}`], {
  cwd: sourceRoot,
});
if (!driver.equals(anchoredDriver))
  throw new Error("Replay driver does not match the requested anchor.");
const dependencies = createReplayDependencyManifest(sourceRoot);
const temporary = mkdtempSync(path.join(os.tmpdir(), "qualified-kernel-replay-"));
const checkout = path.join(temporary, "checkout");
const sha256 = (bytes) => `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
try {
  // The existing exact-anchor helper removes the origin and checks the committed tree.
  mkdirSync(checkout);
  initializeAnchorCheckout(sourceRoot, checkout, anchor);
  const modules = realpathSync(path.join(sourceRoot, "node_modules"));
  symlinkSync(modules, path.join(checkout, "node_modules"), "dir");
  const config = path.join(checkout, ".kernel-replay.config.mjs");
  const reportFile = path.join(temporary, "report.json");
  // The anchored config resolves workspace packages from this checkout. Reject a source leak.
  writeFileSync(
    config,
    `import original from ${JSON.stringify(path.join(checkout, "vitest.config.ts"))};
export default {
  ...original,
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
    "packages/agentplane/src/adapters/task-backend/kernel-backend-adapter.test.ts",
    "packages/core/src/tasks/task-kernel/kernel.test.ts",
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
    });
  } catch (error) {
    failure = error;
  }
  const reportBytes = readFileSync(reportFile);
  const report = JSON.parse(reportBytes.toString("utf8"));
  assertReplayDependencyManifestUnchanged(dependencies, createReplayDependencyManifest(sourceRoot));
  const dirty = execFileSync("git", ["status", "--porcelain", "--untracked-files=no"], {
    cwd: checkout,
    encoding: "utf8",
  });
  if (dirty !== "") throw new Error("Replay changed exact-anchor tracked files.");
  const firstFailure = report.testResults
    ?.flatMap((suite) => suite.assertionResults ?? [])
    .find((result) => result.status === "failed");
  const corpusPaths = [
    "kernel-replay.corpus.json",
    "kernel-replay-migration.corpus.json",
    "kernel-replay-evidence.corpus.json",
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
        dependency_manifest: dependencies,
        corpus: corpusPaths.map((name) => ({
          path: name,
          digest: sha256(
            readFileSync(
              path.join(checkout, "packages/agentplane/src/adapters/task-backend", name),
            ),
          ),
        })),
        report_digest: sha256(reportBytes),
        success: !failure && report.success === true,
        tests: {
          passed: report.numPassedTests,
          failed: report.numFailedTests,
          total: report.numTotalTests,
        },
        first_failure: firstFailure?.fullName ?? null,
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
  if (failure || report.success !== true) process.exitCode = 1;
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
