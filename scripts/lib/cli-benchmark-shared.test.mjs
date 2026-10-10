import assert from "node:assert/strict";
import { test } from "node:test";
import { summarizeDurations, parseSuiteArgs } from "./cli-benchmark-shared.mjs";
test("existing benchmark aggregation preserves samples and nearest-rank percentiles", () => {
  const samples = [4, 1, 3, 2];
  const actual = summarizeDurations(samples);
  assert.equal(actual.median_ms, 2.5);
  assert.equal(actual.avg_ms, 2.5);
  assert.equal(actual.p95_ms, 4);
  assert.equal(actual.min_ms, 1);
  assert.deepEqual(samples, [4, 1, 3, 2]);
  assert.equal(summarizeDurations([]).median_ms, 0);
});
test("benchmark defaults remain independent of baseline-check options", () => {
  const opts = parseSuiteArgs([], { suite: "s", suiteConfig: "c", root: "r", cliPath: "cli" });
  assert.equal(opts.runs, 3);
  assert.equal(opts.warmups, 0);
  assert.equal(opts.suite, "s");
  assert.throws(() => parseSuiteArgs(["--runs", "0"], {}), /expected integer >= 1/);
});
