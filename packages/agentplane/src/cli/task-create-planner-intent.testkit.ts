import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { captureStdIO } from "@agentplane/testkit";
import { expect } from "vitest";

import { runCli } from "./run-cli.js";

const execFileAsync = promisify(execFile);

export async function runJson(root: string, argv: string[]): Promise<Record<string, unknown>> {
  const io = captureStdIO();
  try {
    const code = await runCli([...argv, "--root", root]);
    const statusResult =
      code === 0 ? undefined : await execFileAsync("git", ["status", "--short"], { cwd: root });
    const status = statusResult?.stdout ?? "";
    expect(code, `${io.stderr}\n${status}`).toBe(0);
    return JSON.parse(io.stdout) as Record<string, unknown>;
  } finally {
    io.restore();
  }
}
