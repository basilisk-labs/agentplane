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
});
