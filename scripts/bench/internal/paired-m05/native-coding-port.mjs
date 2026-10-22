import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
const execute = promisify(execFile);

// The host supplies the qualified installed executable and initialized fixture.
// Only an exact supervisor-issued resume is executable here. Installation,
// Recipe retention, approval and provider boundaries remain operator actions.
export function nativeCodingPort({ executable, cwd, env, taskId, timeoutMs }) {
  assert.ok(path.isAbsolute(executable) && path.isAbsolute(cwd));
  assert.ok(Number.isSafeInteger(timeoutMs) && timeoutMs > 0);
  return async function resumeExact(argv) {
    assert.ok(["ap", "agentplane"].includes(argv[0]));
    assert.deepEqual(argv.slice(1, 4), ["task", "advance", taskId]);
    assert.ok(argv.includes("--result") && argv.includes("--agent-json"));
    assert.ok(
      !argv.includes("--by") && !argv.includes("--remote"),
      "External/operator action requires handoff",
    );
    const result = await execute(executable, argv.slice(1), {
      cwd,
      env,
      timeout: timeoutMs,
      maxBuffer: 8 * 1024 * 1024,
      encoding: "utf8",
    });
    return JSON.parse(result.stdout);
  };
}
