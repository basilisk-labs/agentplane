import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, rm, symlink } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createVerificationObservation, observationDigest } from "./verification-observation.mjs";

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), "verification-observation-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  return root;
}
const binding = {
  kind: "test",
  command: "node check.mjs",
  deadline_ms: Date.now() + 60_000,
  implementation: { head: "abc" },
};

test("durable logs retain early failures beyond 4KB and redact split secrets before writing", async (t) => {
  const root = await fixture(t);
  const secret = 'sensitive"value';
  const observation = createVerificationObservation({
    directory: root,
    binding,
    env: { API_TOKEN: secret },
  });
  observation.write("stderr", "first failure\nBearer abc");
  observation.write("stderr", "def123\nAPI_TOKEN=" + secret.slice(0, 6));
  observation.write("stderr", secret.slice(6) + "\n" + "late wrapper\n".repeat(1000));
  observation.failure({ file: "bad.test.ts", errors: [{ message: secret }] });
  observation.structured("complete");
  const reference = observation.finish("failed");
  assert.equal(reference.status, "retained");
  const serialized = await readFile(reference.manifest_path, "utf8");
  assert.equal(observationDigest(serialized), reference.digest);
  const manifest = JSON.parse(serialized);
  const retained = await readFile(path.join(observation.directory, "stderr.jsonl"), "utf8");
  assert.ok(retained.length > 4000);
  assert.ok(retained.includes("first failure"));
  assert.ok(!retained.includes(secret));
  assert.ok(!retained.includes("abcdef123"));
  const failures = await readFile(path.join(observation.directory, "failures.jsonl"), "utf8");
  assert.ok(!failures.includes("sensitive"));
  assert.equal(manifest.structured_failures.status, "complete");
  assert.equal(manifest.binding.command_digest, observationDigest(binding.command));
  for (const file of manifest.files)
    assert.equal(
      observationDigest(await readFile(path.join(observation.directory, file.path))),
      file.digest,
    );
});

test("caps logs, oversized lines and structured records with explicit omission counts", async (t) => {
  const root = await fixture(t);
  const observation = createVerificationObservation({ directory: root, binding });
  observation.write("stdout", "x".repeat(40_000));
  observation.write("stdout", "\n" + "failure details\n".repeat(40_000));
  for (let i = 0; i < 1300; i++) observation.failure({ name: `failure-${i}` });
  observation.structured("complete");
  const reference = observation.finish("failed");
  const manifest = JSON.parse(await readFile(reference.manifest_path, "utf8"));
  assert.equal(manifest.truncation.stdout.truncated, true);
  assert.equal(manifest.truncation.stdout.oversized_lines, 1);
  assert.ok(manifest.truncation.stdout.retained_bytes <= 256 * 1024);
  assert.equal(manifest.structured_failures.status, "incomplete");
  assert.equal(manifest.structured_failures.omitted, 276);
});

test("heartbeats expose silence without success and restart keeps immutable prior evidence", async (t) => {
  const root = await fixture(t);
  const observation = createVerificationObservation({ directory: root, binding, heartbeatMs: 25 });
  await new Promise((resolve) => setTimeout(resolve, 80));
  const status = JSON.parse(
    await readFile(path.join(observation.directory, "status.json"), "utf8"),
  );
  assert.equal(status.state, "running");
  assert.equal(status.success, false);
  assert.ok(status.updated_at_ms > status.started_at_ms);
  assert.equal(status.last_activity_at_ms, status.started_at_ms);
  const first = observation.finish("interrupted");
  const second = createVerificationObservation({ directory: root, binding });
  second.finish("passed");
  assert.notEqual(second.directory, observation.directory);
  assert.equal(observationDigest(await readFile(first.manifest_path)), first.digest);
});

test("rejects symlink destinations and storage admission exhaustion", async (t) => {
  const root = await fixture(t);
  await symlink(root, path.join(root, "link"));
  assert.throws(() =>
    createVerificationObservation({ directory: path.join(root, "link"), binding }),
  );
  const one = createVerificationObservation({ directory: root, binding, maxRuns: 1 });
  one.finish("passed");
  assert.throws(() => createVerificationObservation({ directory: root, binding, maxRuns: 1 }));
  const entries = await readdir(root);
  assert.ok(entries.includes("run-000"));
});

test("real Vitest reporter retains failed cases and collection errors without changing failure exit", async (t) => {
  const { execFile } = await import("node:child_process");
  const { promisify } = await import("node:util");
  const { createRequire } = await import("node:module");
  const { writeFile, mkdir } = await import("node:fs/promises");
  const require = createRequire(import.meta.url);
  const root = await fixture(t);
  const evidence = path.join(root, "evidence");
  await mkdir(evidence);
  const reporter = new URL("verification-failures-reporter.mjs", import.meta.url).pathname;
  await writeFile(
    path.join(root, "vitest.config.mjs"),
    `export default { test: { globals: true, include: ['*.test.mjs'], maxWorkers: 1, reporters: ['default', ${JSON.stringify(reporter)}] } };`,
  );
  await writeFile(
    path.join(root, "failure.test.mjs"),
    "for(let i=0;i<80;i++) test('failure-'+i,()=>expect('actual').toBe('expected')); ",
  );
  await writeFile(path.join(root, "collection.test.mjs"), "throw new Error('collection broke');");
  const binary =
    process.env.AGENTPLANE_TEST_VITEST_BIN ??
    path.join(path.dirname(require.resolve("vitest/package.json")), "vitest.mjs");
  const result = await promisify(execFile)(
    process.execPath,
    [binary, "run", "--config", path.join(root, "vitest.config.mjs")],
    {
      cwd: root,
      env: { ...process.env, AGENTPLANE_VERIFICATION_OBSERVATION_DIR: evidence },
      timeout: 30_000,
      maxBuffer: 2 * 1024 * 1024,
    },
  ).then(
    (value) => ({ ...value, code: 0 }),
    (error) => error,
  );
  assert.equal(result.code, 1);
  assert.match(result.stdout, /80 failed/);
  const manifest = JSON.parse(
    await readFile(path.join(evidence, "run-000", "manifest.json"), "utf8"),
  );
  const failureText = await readFile(path.join(evidence, "run-000", "failures.jsonl"), "utf8");
  const failures = failureText
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));
  assert.equal(manifest.structured_failures.status, "complete");
  assert.equal(failures.filter((entry) => entry.kind === "test").length, 80);
  assert.ok(
    failures.some(
      (entry) => entry.kind === "module" && entry.errors[0].message === "collection broke",
    ),
  );
  assert.equal(manifest.state, "failed");
});

test("oversized PEM begin lines cannot expose following key bodies across chunks", async (t) => {
  const root = await fixture(t);
  const observation = createVerificationObservation({ directory: root, binding });
  observation.write("stderr", "x".repeat(20_000) + "-----BE");
  observation.write("stderr", "GIN RSA PRIVATE KEY-----\nprivate-body-one\nprivate-");
  observation.write("stderr", "body-two-----END RSA PRIVATE ");
  observation.write("stderr", "KEY-----\npublic diagnostic\n");
  const reference = observation.finish("failed");
  const output = await readFile(
    path.join(path.dirname(reference.manifest_path), "stderr.jsonl"),
    "utf8",
  );
  assert.ok(!output.includes("private-body-one"));
  assert.ok(!output.includes("private-body-two"));
  assert.ok(output.includes("public diagnostic"));
  assert.ok(!observation.tail("stderr").includes("private-body"));
});

test("missing child manifests never imply complete structured evidence", async (t) => {
  const root = await fixture(t);
  const parent = createVerificationObservation({ directory: root, binding });
  const child = createVerificationObservation({
    directory: path.join(parent.directory, "children"),
    budgetDirectory: root,
    binding,
  });
  const reference = parent.finish("failed");
  child.finish("interrupted");
  const manifest = JSON.parse(await readFile(reference.manifest_path, "utf8"));
  assert.equal(manifest.child_evidence_complete, false);
  assert.equal(manifest.structured_failures.status, "incomplete");
  assert.equal(manifest.children.at(0).incomplete, true);
});
