import { beforeEach, describe, expect, it, vi } from "vitest";

import * as commands from "./commands.js";

const TEST_ENV = Object.fromEntries(
  Object.entries(process.env)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => [key, String(value)]),
) as Record<string, string>;

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("scenario tool invocation", () => {
  it("resolves node runtime invocation", () => {
    expect(
      commands.resolveRecipeToolInvocation("node", "/path/tool.js", ["--foo", "bar"]).command,
    ).toBe("node");
    expect(
      commands.resolveRecipeToolInvocation("node", "/path/tool.js", ["--foo", "bar"]).args,
    ).toEqual(["/path/tool.js", "--foo", "bar"]);
  });

  it("resolves bash runtime invocation", () => {
    expect(commands.resolveRecipeToolInvocation("bash", "/path/tool.sh", ["a"]).command).toBe(
      "bash",
    );
    expect(commands.resolveRecipeToolInvocation("bash", "/path/tool.sh", ["a"]).args).toEqual([
      "/path/tool.sh",
      "a",
    ]);
  });

  it("returns a diagnostics error when runtime command is missing", async () => {
    const resolveInvocation = vi.spyOn(commands, "resolveRecipeToolInvocation");
    resolveInvocation.mockReturnValue({ command: "non-existent-runtime", args: [] });

    const result = await commands.executeRecipeTool({
      runtime: "node",
      entrypoint: "non-existent-runtime.js",
      args: [],
      cwd: process.cwd(),
      env: TEST_ENV,
    });

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toBe("Runtime command not found: non-existent-runtime");
    expect(result.stdout).toBe("");

    resolveInvocation.mockRestore();
  });
});
