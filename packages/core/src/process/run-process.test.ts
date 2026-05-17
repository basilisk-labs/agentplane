import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { execFileAsync, runProcess, runProcessSync } from "./run-process.js";

describe("run-process", () => {
  it("returns utf8 stdout without stripping the trailing newline", async () => {
    const result = await runProcess({
      command: "node",
      args: ["-e", String.raw`process.stdout.write('hello\n')`],
      encoding: "utf8",
    });
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toBe("hello\n");
  });

  it("supports buffered output for execFile compatibility", async () => {
    const result = await execFileAsync(
      "node",
      ["-e", "process.stdout.write(Buffer.from([0x61,0x62]))"],
      {
        encoding: "buffer",
      },
    );
    expect(Buffer.isBuffer(result.stdout)).toBe(true);
    expect(result.stdout.toString("utf8")).toBe("ab");
  });

  it("surfaces numeric exit codes from failures", async () => {
    await expect(
      execFileAsync("node", ["-e", "process.exit(7)"], {
        encoding: "utf8",
      }),
    ).rejects.toMatchObject({ code: 7 });
  });

  it("supports sync execution for metadata lookups", () => {
    const result = runProcessSync({
      command: "node",
      args: ["-e", "process.stdout.write('sync')"],
      encoding: "utf8",
    });
    expect(result.stdout).toBe("sync");
  });

  it("rejects executable names that cannot be passed safely as argv", async () => {
    await expect(
      runProcess({
        command: "node\necho unsafe",
        args: ["-e", "process.stdout.write('nope')"],
      }),
    ).rejects.toThrow(/invalid characters/);
  });

  it("rejects non-allowlisted executable names", async () => {
    await expect(
      runProcess({
        command: "custom-runner",
        args: ["--version"],
      }),
    ).rejects.toThrow(/allowed executable set/);
  });

  it("keeps supported shell runtimes allowlisted", async () => {
    await expect(
      runProcess({
        command: "bash",
        args: ["-lc", "printf bash-ok"],
        encoding: "utf8",
      }),
    ).resolves.toMatchObject({ stdout: "bash-ok" });
  });

  it("rejects git upload-pack option injection", async () => {
    await expect(
      runProcess({
        command: "git",
        args: ["clone", "--upload-pack=echo unsafe", "https://example.invalid/repo.git"],
      }),
    ).rejects.toThrow(/upload-pack/);
  });

  it("keeps cmd.exe out of the generic process allowlist", async () => {
    await expect(
      runProcess({
        command: "cmd.exe",
        args: ["/c", "echo unsafe"],
      }),
    ).rejects.toThrow(/allowed executable set/);
  });

  it("normalizes the current node executable path to the supported node runtime", async () => {
    const result = await runProcess({
      command: process.execPath,
      args: ["-e", "process.stdout.write('node-path')"],
      encoding: "utf8",
    });
    expect(result.stdout).toBe("node-path");
  });

  it("normalizes absolute node executable candidates to the supported node runtime", async () => {
    const result = await runProcess({
      command: path.join(os.tmpdir(), "agentplane-test-bin", "node"),
      args: ["-e", "process.stdout.write('absolute-node-path')"],
      encoding: "utf8",
    });
    expect(result.stdout).toBe("absolute-node-path");
  });
});
