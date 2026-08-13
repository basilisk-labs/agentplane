import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

import { cleanGitEnv, mkGitRepoRoot, splitOutputLines } from "./cli.js";

const execFileAsync = promisify(execFile);

describe("@agentplane/testkit/cli", () => {
  it("exports CLI harness helpers", () => {
    expect(cleanGitEnv).toBeTypeOf("function");
    expect(splitOutputLines("a\nb\n")).toEqual(["a", "b"]);
  });

  it("creates deterministic main-branch repositories without host Git configuration", async () => {
    const root = await mkGitRepoRoot();
    const { stdout } = await execFileAsync("git", ["symbolic-ref", "--short", "HEAD"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    expect(stdout.trim()).toBe("main");
  });
});
