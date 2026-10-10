import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { writeIsolationPolicy } from "./isolation.mjs";
import { runBrokerWorker } from "./broker-worker.mjs";

function fixture(t) {
  const root = mkdtempSync(path.join(os.tmpdir(), "m05-worker-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const policy = path.join(root, "policy.json");
  writeIsolationPolicy(policy, { cwd: root, readOnly: [root], writable: [root] });
  return { root, policy };
}
test("worker deadline kills descendants instead of leaving background effects", async (t) => {
  const { root, policy } = fixture(t);
  const result = await runBrokerWorker(
    policy,
    [
      "/usr/bin/python3",
      "-I",
      "-c",
      "import os,time; pid=os.fork(); time.sleep(2); open('survived','w').write(str(pid))",
    ],
    { timeout: 300 },
  );
  assert.equal(result.error, "ETIMEDOUT");
  await delay(2100);
  assert.equal(existsSync(path.join(root, "survived")), false);
});
test("worker cancellation stops execution and retains bounded output", async (t) => {
  const { policy } = fixture(t);
  const controller = new AbortController();
  const running = runBrokerWorker(
    policy,
    ["/usr/bin/python3", "-I", "-c", "import time; time.sleep(30)"],
    { timeout: 5000, signal: controller.signal },
  );
  controller.abort();
  const cancelled = await running;
  assert.equal(cancelled.error, "ABORT_ERR");
  const noisy = await runBrokerWorker(
    policy,
    ["/usr/bin/python3", "-I", "-c", "print('x'*2000000)"],
    { timeout: 3000 },
  );
  assert.equal(noisy.error, "OUTPUT_LIMIT");
  assert.ok(Buffer.byteLength(noisy.stdout) + Buffer.byteLength(noisy.stderr) <= 1024 * 1024);
});
