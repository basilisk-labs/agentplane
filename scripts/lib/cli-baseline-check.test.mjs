import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  parseBaselineArgs,
  compareMeasurementToBaseline,
  readJson,
  runMeasurement,
} from "./cli-baseline-check.mjs";
import { parseDistributionArgs } from "./release-distribution-render.mjs";
for (const cold of [true, false]) {
  const settings = {
    cold,
    mode: cold ? "cli_cold_path_v1" : "cli_walltime_v1",
    schemaVersion: cold ? 2 : 1,
    repoRoot: "/repo",
    baselinePath: "/baseline",
  };
  test(`baseline defaults and strict numeric flags cold=${cold}`, () => {
    const parsed = parseBaselineArgs([], settings);
    assert.equal(parsed.runs, 3);
    assert.equal(parsed.warmups, 0);
    assert.equal(parsed.attempts, 1);
    assert.equal(cold ? parsed.timeoutMs : parsed.suite, cold ? 0 : "cli_walltime_baseline");
    for (const value of ["1x", "01", "0", "-1", "1.5", "9007199254740992"])
      assert.throws(() => parseBaselineArgs(["--runs", value], settings), /integer >= 1/);
    assert.throws(() => parseBaselineArgs(["extra"], settings), /unexpected positional/);
    assert.throws(() => parseBaselineArgs([cold ? "--suite" : "--timeout-ms", "1"], settings));
  });
  test(`baseline comparison boundaries and diagnostics cold=${cold}`, () => {
    const baseline = {
      schema_version: settings.schemaVersion,
      mode: settings.mode,
      metric: "median_ms",
      commands: [{ id: "x", max_median_ms: 10, max_p95_ms: 12 }],
    };
    const measurement = {
      mode: settings.mode,
      commands: [{ id: "x", median_ms: 10, p95_ms: 12, exit_code: 0 }],
    };
    const compare = () => compareMeasurementToBaseline(measurement, baseline, settings);
    assert.deepEqual(compare().failures, []);
    measurement.commands[0].median_ms = 11;
    assert.deepEqual(compare().failures, ["x: median_ms=11 exceeds max_median_ms=10"]);
    measurement.commands[0].median_ms = "bad";
    assert.match(compare().failures[0], /must be numeric/);
    measurement.commands[0] = {
      id: "x",
      median_ms: 10,
      p95_ms: 13,
      exit_code: 2,
      timed_out: true,
      timeout_ms: 20,
    };
    assert.deepEqual(
      compare().failures,
      cold
        ? ["x: timed out after 20ms", "x: exit_code=2, expected=0"]
        : ["x: exit_code=2, expected=0", "x: p95_ms=13 exceeds max_p95_ms=12"],
    );
    measurement.commands = [];
    assert.deepEqual(compare().failures, ["x: missing from measurement"]);
    measurement.mode = "other";
    assert.throws(compare, /measurement must be/);
    baseline.schema_version = 99;
    assert.throws(compare, /baseline must use/);
  });
}
test("JSON read errors preserve context", () =>
  assert.throws(
    () => readJson("/nonexistent-baseline-file", "baseline"),
    /failed to read baseline JSON/,
  ));
test("distribution defaults, overrides and argument failures", () => {
  const defaults = parseDistributionArgs([], "/repo", "out");
  assert.equal(defaults.outDir, "/repo/out");
  assert.equal(
    defaults.manifestPath,
    "/repo/.agentplane/.release/publish/distribution/release-distribution.json",
  );
  assert.deepEqual(
    parseDistributionArgs(
      ["--out", "custom", "--manifest", "m.json", "--check", "--json", "--help"],
      "/repo",
      "out",
    ),
    { manifestPath: "/repo/m.json", outDir: "/repo/custom", check: true, json: true, help: true },
  );
  assert.throws(() => parseDistributionArgs(["--unknown"], "/repo", "out"));
  assert.throws(() => parseDistributionArgs(["--manifest"], "/repo", "out"));
});

test("measurement subprocess preserves mode arguments, environment and failed JSON payload", () => {
  const root = mkdtempSync(path.join(os.tmpdir(), "baseline-measurement-"));
  try {
    const script = path.join(root, "measure.mjs");
    writeFileSync(
      script,
      "console.log(JSON.stringify({args: process.argv.slice(2), update: process.env.AGENTPLANE_NO_UPDATE_CHECK})); process.exitCode = 1;",
    );
    for (const cold of [true, false]) {
      const result = runMeasurement(
        {
          root,
          runs: 2,
          warmups: 1,
          timeoutMs: cold ? 15 : undefined,
          cliPath: "cli",
          suite: "suite",
        },
        { repoRoot: root, measureScript: script, cold },
      );
      assert.deepEqual(result.args, [
        ...(cold ? [] : ["--suite", "suite"]),
        "--root",
        root,
        "--runs",
        "2",
        "--warmups",
        "1",
        ...(cold ? ["--timeout-ms", "15"] : []),
        "--cli",
        "cli",
      ]);
      assert.equal(result.update, "1");
    }
    writeFileSync(script, 'process.stdout.write("invalid-json"); process.exitCode = 3;');
    assert.throws(
      () =>
        runMeasurement({ root, runs: 1 }, { repoRoot: root, measureScript: script, cold: true }),
      (error) => error.status === 3,
    );
    writeFileSync(script, "{bad");
    assert.throws(() => readJson(script, "measurement"), /failed to read measurement JSON/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
