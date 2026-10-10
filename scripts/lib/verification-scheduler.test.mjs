import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { runVerificationGroups } from "./verification-scheduler.mjs";

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), "verification-scheduler-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  return root;
}
const group = (id, code) => ({ id, command: process.execPath, args: ["-e", code] });

test("multiple waves retain separate failing groups including early long failures", async (t) => {
  const root = await fixture(t);
  const options = { observationDirectory: root, concurrency: 2, timeoutMs: 3000 };
  const first = await runVerificationGroups(
    [
      group(
        "first",
        'console.error("FIRST FAILURE\\n" + "wrapper\\n".repeat(2000)); process.exit(1)',
      ),
      group("second", 'console.error("SECOND FAILURE"); process.exit(2)'),
    ],
    options,
  );
  const second = await runVerificationGroups([group("third", 'console.log("ok")')], options);
  assert.equal(first.ok, false);
  assert.equal(second.ok, true);
  assert.deepEqual(
    first.results.map((r) => r.exit_code),
    [1, 2],
  );
  for (const result of [...first.results, ...second.results])
    assert.equal(result.observation.status, "retained");
  const log = await readFile(
    path.join(path.dirname(first.results[0].observation.manifest_path), "stderr.jsonl"),
    "utf8",
  );
  assert.ok(log.includes("FIRST FAILURE"));
  assert.ok(log.length > 4000);
  const entries = await readdir(root);
  assert.equal(entries.filter((entry) => entry.startsWith("run-")).length, 3);
});

test("silent child produces independent status heartbeat and retains timeout", async (t) => {
  const root = await fixture(t);
  const pending = runVerificationGroups([group("silent", "setInterval(()=>{},1000)")], {
    observationDirectory: root,
    timeoutMs: 300,
    heartbeatMs: 25,
    killGraceMs: 20,
  });
  await new Promise((resolve) => setTimeout(resolve, 100));
  const status = JSON.parse(await readFile(path.join(root, "run-000", "status.json"), "utf8"));
  assert.equal(status.state, "running");
  assert.equal(status.success, false);
  assert.ok(status.updated_at_ms > status.started_at_ms);
  const result = await pending;
  assert.equal(result.results[0].exit_code, 124);
  const manifest = JSON.parse(await readFile(result.results[0].observation.manifest_path, "utf8"));
  assert.equal(manifest.state, "timed_out");
});

test("cancellation terminates child and persists cancellation without success", async (t) => {
  const root = await fixture(t);
  const controller = new AbortController();
  const pending = runVerificationGroups([group("cancel", "setInterval(()=>{},1000)")], {
    observationDirectory: root,
    timeoutMs: 5000,
    signal: controller.signal,
    killGraceMs: 20,
  });
  setTimeout(() => controller.abort(), 100);
  const result = await pending;
  assert.equal(result.ok, false);
  assert.equal(result.results[0].exit_code, 130);
  const status = JSON.parse(await readFile(path.join(root, "run-000", "status.json"), "utf8"));
  assert.equal(status.state, "cancelled");
  assert.equal(status.success, false);
});
