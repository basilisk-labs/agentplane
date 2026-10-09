import assert from "node:assert/strict";
import { PassThrough } from "node:stream";
import { test } from "node:test";

import { lintNodeOptions, resolveFullCiResourceProfile } from "./local-ci-resource-profile.mjs";
import {
  classifyVerificationGroupFailure,
  summarizeVerificationGroupResults,
  writeVerificationGroupResults,
} from "./verification-scheduler.mjs";

const GIB = 1024 ** 3;

test("full CI has a finite inner budget above the former 15-minute limit and below native default", () => {
  const profile = resolveFullCiResourceProfile(
    { AGENTPLANE_NATIVE_CHECK_TIMEOUT_MS: String(90 * 60_000) },
    12 * GIB,
  );
  assert.equal(profile.group_timeout_ms, 60 * 60_000);
  assert.ok(31 * 60_000 < profile.group_timeout_ms);
  assert.ok(profile.group_timeout_ms < profile.outer_timeout_ms);
  assert.equal(profile.limiting_deadline, "local_group");
  assert.equal(profile.lint_heap_mb, 4096);
  assert.equal(profile.lint_heap_source, "default");
});

test("explicit shorter local and native deadlines retain precedence and provenance", () => {
  const local = resolveFullCiResourceProfile(
    {
      AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS: "300000",
      AGENTPLANE_NATIVE_CHECK_TIMEOUT_MS: String(90 * 60_000),
    },
    12 * GIB,
  );
  assert.equal(local.group_timeout_ms, 300_000);
  assert.equal(local.group_timeout_source, "AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS");
  assert.equal(local.limiting_deadline, "local_group");

  const native = resolveFullCiResourceProfile(
    {
      AGENTPLANE_NATIVE_CHECK_TIMEOUT_MS: "300000",
      AGENTPLANE_NATIVE_CHECK_TIMEOUT_SOURCE: "declared_command",
    },
    12 * GIB,
  );
  assert.equal(native.limiting_deadline, "native_check");
  assert.equal(native.outer_timeout_source, "declared_command");
  assert.throws(
    () =>
      resolveFullCiResourceProfile(
        { AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS: "invalid" },
        12 * GIB,
      ),
    /must be a positive integer/u,
  );
});

test("lint heap respects an explicit Node limit and rejects insufficient capacity", () => {
  const env = { NODE_OPTIONS: "--trace-warnings --max-old-space-size=3072" };
  const profile = resolveFullCiResourceProfile(env, 8 * GIB);
  assert.equal(profile.lint_heap_mb, 3072);
  assert.equal(profile.lint_heap_source, "NODE_OPTIONS");
  assert.equal(lintNodeOptions(env, profile), env.NODE_OPTIONS);
  assert.equal(
    lintNodeOptions({}, resolveFullCiResourceProfile({}, 8 * GIB)),
    "--max-old-space-size=4096",
  );
  assert.throws(() => resolveFullCiResourceProfile({}, 4 * GIB), /requires at least 5632 MiB/u);
  assert.throws(
    () => resolveFullCiResourceProfile({ ...env, AGENTPLANE_LOCAL_LINT_HEAP_MB: "4096" }, 8 * GIB),
    /conflicts/u,
  );
});

test("group summaries distinguish timeout, heap exhaustion, assertion, infrastructure and command errors", () => {
  const inputs = [
    { exit_code: 124, timed_out: true, stdout: "", stderr: "" },
    {
      exit_code: 1,
      timed_out: false,
      stdout: "",
      stderr: "FATAL ERROR: Ineffective mark-compacts near heap limit",
    },
    { exit_code: 1, timed_out: false, stdout: "Test Files  2 failed", stderr: "" },
    { exit_code: 1, timed_out: false, stdout: "", stderr: "request failed: EAI_AGAIN" },
    { exit_code: 1, timed_out: false, stdout: "", stderr: "eslint configuration error" },
  ];
  const expected = [
    "timeout",
    "out_of_memory",
    "assertion_failure",
    "infrastructure_failure",
    "command_failure",
  ];
  assert.deepEqual(
    inputs.map((input) => classifyVerificationGroupFailure(input)),
    expected,
  );
  const summary = summarizeVerificationGroupResults(
    inputs.map((input, index) => ({ ...input, id: `group-${index}`, duration_ms: 1 })),
  );
  assert.equal(summary.ok, false);
  assert.equal(summary.groups.length, expected.length);
  assert.ok(summary.groups.every((group) => !Object.hasOwn(group, "failure_kind")));
  assert.equal(classifyVerificationGroupFailure({ exit_code: 0, timed_out: false }), null);
});

test("failure classification is emitted separately before the unchanged summary", async () => {
  const stdout = new PassThrough();
  const stderr = new PassThrough();
  let output = "";
  stdout.on("data", (chunk) => (output += chunk.toString()));
  stderr.resume();
  const summary = await writeVerificationGroupResults(
    [
      {
        id: "core",
        exit_code: 1,
        timed_out: false,
        duration_ms: 100,
        stdout: "",
        stderr: "JavaScript heap out of memory",
      },
    ],
    { stdout, stderr },
  );
  assert.match(output, /"kind":"verification_group_failure_classification"/u);
  assert.match(output, /"failure_kind":"out_of_memory"/u);
  assert.ok(output.endsWith(`${JSON.stringify(summary)}\n`));
  assert.ok(!Object.hasOwn(summary.groups[0], "failure_kind"));
});
