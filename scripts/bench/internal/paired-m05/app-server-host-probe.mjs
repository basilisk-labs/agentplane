import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, mkdirSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { writeIsolationPolicy } from "./isolation.mjs";

test("the real app-server initializes inside the external boundary without a provider turn", async (t) => {
  const { createIsolatedAppServer } = await import("./app-server-port.mjs");
  const { realpathSync } = await import("node:fs");
  const { execFileSync } = await import("node:child_process");
  const binary = realpathSync(
    execFileSync("python3", ["-I", "-c", "import shutil;print(shutil.which('codex'))"], {
      encoding: "utf8",
    }).trim(),
  );
  const root = mkdtempSync(path.join(os.tmpdir(), "m05-server-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const home = path.join(root, "runtime");
  const subject = path.join(root, "subject");
  mkdirSync(home);
  mkdirSync(subject);
  const policy = path.join(root, "policy.json");
  writeIsolationPolicy(policy, { cwd: subject, readOnly: [subject, binary], writable: [home] });
  const port = await createIsolatedAppServer({
    policyPath: policy,
    codexBinary: binary,
    cwd: subject,
    env: { ...process.env, CODEX_HOME: home },
    timeoutMs: 5000,
  });
  try {
    assert.deepEqual(await port.turnOptions(), {
      sandboxPolicy: { type: "externalSandbox", networkAccess: "restricted" },
    });
  } finally {
    await port.close();
  }
});
