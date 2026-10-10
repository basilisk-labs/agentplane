import assert from "node:assert/strict";
import { PassThrough } from "node:stream";
import { test } from "node:test";

import {
  describeFullCiGroupLaunch,
  lintNodeOptions,
  resolveFullCiResourceProfile,
} from "./local-ci-resource-profile.mjs";
import {
  classifyVerificationGroupFailure,
  classifyVerificationGroupFailures,
  runVerificationGroups,
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

test("later sequential waves report the remaining native deadline rather than the original budget", () => {
  const startedAt = 1_000_000;
  const profile = resolveFullCiResourceProfile(
    { AGENTPLANE_NATIVE_CHECK_TIMEOUT_MS: String(90 * 60_000) },
    12 * GIB,
    startedAt,
  );
  const build = describeFullCiGroupLaunch(profile, ["build"], startedAt);
  assert.equal(build.group_timeout_ms, 60 * 60_000);
  assert.equal(build.outer_remaining_ms, 90 * 60_000);
  assert.equal(build.limiting_deadline, "local_group");

  const core = describeFullCiGroupLaunch(profile, ["docs-schema", "core"], startedAt + 40 * 60_000);
  assert.equal(core.outer_remaining_ms, 50 * 60_000);
  assert.equal(core.limiting_deadline, "native_check");
  const expired = describeFullCiGroupLaunch(profile, ["cli"], startedAt + 91 * 60_000);
  assert.equal(expired.outer_remaining_ms, 0);
  assert.equal(expired.limiting_deadline, "native_check");
});

test("queued groups report the deadline when each group actually starts", async () => {
  const startedAt = 1_000_000;
  const profile = resolveFullCiResourceProfile(
    { AGENTPLANE_NATIVE_CHECK_TIMEOUT_MS: String(90 * 60_000) },
    12 * GIB,
    startedAt,
  );
  const launches = [];
  const result = await runVerificationGroups(
    [
      { id: "docs-schema", command: process.execPath, args: ["-e", ""] },
      { id: "core", command: process.execPath, args: ["-e", ""] },
    ],
    {
      concurrency: 1,
      onGroupStart: (group) => {
        const elapsedMs = launches.length === 0 ? 0 : 40 * 60_000;
        launches.push(describeFullCiGroupLaunch(profile, [group.id], startedAt + elapsedMs));
      },
    },
  );
  assert.equal(result.ok, true);
  assert.deepEqual(
    launches.map((launch) => [launch.groups[0], launch.limiting_deadline]),
    [
      ["docs-schema", "local_group"],
      ["core", "native_check"],
    ],
  );
});

test("expired deadline skips the group and records a timeout", async () => {
  const result = await runVerificationGroups([{ id: "expired", command: "does-not-exist" }], {
    onGroupStart: () => false,
  });
  assert.equal(result.ok, false);
  assert.deepEqual(result.results[0].failure_kinds, ["timeout"]);
  assert.equal(result.results[0].timed_out, true);
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
  const quoted = { NODE_OPTIONS: '"--max_old_space_size=2048" --trace-warnings' };
  assert.equal(resolveFullCiResourceProfile(quoted, 8 * GIB).lint_heap_mb, 2048);
  assert.equal(
    lintNodeOptions(quoted, resolveFullCiResourceProfile(quoted, 8 * GIB)),
    quoted.NODE_OPTIONS,
  );
  const repeated = {
    NODE_OPTIONS: "--max-old-space-size=4096 --max_old_space_size=2048",
  };
  assert.equal(resolveFullCiResourceProfile(repeated, 8 * GIB).lint_heap_mb, 2048);
  assert.throws(
    () => resolveFullCiResourceProfile({ NODE_OPTIONS: "--max_old_space_size 2048" }, 8 * GIB),
    /unsupported or ambiguous/u,
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
  assert.deepEqual(
    classifyVerificationGroupFailures({
      exit_code: 1,
      timed_out: false,
      stderr: "FAIL example.test.ts\nTest timed out in 60000ms\nTests 1 failed",
    }),
    ["timeout"],
  );
  assert.deepEqual(
    classifyVerificationGroupFailures({
      exit_code: 1,
      timed_out: false,
      stderr: "Test timed out in 60000ms\n FAIL packages/example.test.ts\n AssertionError",
    }),
    ["timeout", "assertion_failure"],
  );
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

test("mixed timeout and assertion diagnostics retain every failed group", async () => {
  const stdout = new PassThrough();
  const stderr = new PassThrough();
  let output = "";
  stdout.on("data", (chunk) => (output += chunk.toString()));
  stderr.resume();
  await writeVerificationGroupResults(
    [
      {
        id: "core",
        exit_code: 1,
        timed_out: false,
        duration_ms: 1,
        stdout: "",
        stderr: "Test timed out in 60000ms\n FAIL example.test.ts\n AssertionError",
      },
      {
        id: "cli",
        exit_code: 1,
        timed_out: false,
        duration_ms: 1,
        stdout: "",
        stderr: "ECONNRESET",
      },
    ],
    { stdout, stderr },
  );
  assert.match(
    output,
    /"id":"core","failure_kind":"timeout","failure_kinds":\["timeout","assertion_failure"\]/u,
  );
  assert.match(output, /"id":"cli","failure_kind":"infrastructure_failure"/u);
});
