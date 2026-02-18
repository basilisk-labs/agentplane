import os from "node:os";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as git from "./git.js";
import { resolveShellInvocation, runShellCommand } from "./pr-meta.js";

describe("pr-meta shell invocations", () => {
  let originalComspec: string | undefined;

  beforeEach(() => {
    originalComspec = process.env.COMSPEC;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    process.env.COMSPEC = originalComspec;
  });

  it("uses POSIX shell on non-Windows", () => {
    vi.spyOn(os, "platform").mockReturnValue("linux");
    expect(resolveShellInvocation("echo hello")).toEqual({
      command: "sh",
      args: ["-lc", "echo hello"],
    });
  });

  it("uses cmd.exe on Windows", () => {
    vi.spyOn(os, "platform").mockReturnValue("win32");
    expect(resolveShellInvocation("echo hello")).toEqual({
      command: "cmd.exe",
      args: ["/d", "/s", "/c", "echo hello"],
    });
  });

  it("uses COMSPEC when provided", () => {
    vi.spyOn(os, "platform").mockReturnValue("win32");
    process.env.COMSPEC = "custom-cmd.exe";
    expect(resolveShellInvocation("echo hello")).toEqual({
      command: "custom-cmd.exe",
      args: ["/d", "/s", "/c", "echo hello"],
    });
  });

  it("uses current shell invocation for command execution", async () => {
    vi.spyOn(os, "platform").mockReturnValue("win32");
    const execFileAsync = vi.spyOn(git, "execFileAsync").mockResolvedValue({
      stdout: "ok",
      stderr: "",
    });

    const result = await runShellCommand("echo hello", process.cwd());

    expect(execFileAsync).toHaveBeenCalledWith(
      "cmd.exe",
      ["/d", "/s", "/c", "echo hello"],
      expect.objectContaining({ cwd: process.cwd() }),
    );
    expect(result).toEqual({ code: 0, output: "ok" });
  });
});
