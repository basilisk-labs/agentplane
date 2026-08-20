import { describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ execFile: vi.fn() }));
vi.mock("node:child_process", () => ({ execFile: mocks.execFile }));

import { runGlabApiJson } from "./glab-api.js";

describe("glab-api", () => {
  it("passes hostname explicitly for every API invocation", async () => {
    mocks.execFile.mockImplementation(
      (
        _command: string,
        _args: string[],
        _options: Record<string, unknown>,
        callback: (error: Error | null, stdout: string, stderr: string) => void,
      ) => callback(null, '{"iid":42}', ""),
    );
    await expect(
      runGlabApiJson({
        cwd: "/repo",
        hostname: "gitlab.example.test",
        endpoint: "projects/group%2Frepo/merge_requests/42",
        method: "PUT",
        inputPath: "/tmp/payload.json",
      }),
    ).resolves.toEqual({ iid: 42 });
    expect(mocks.execFile).toHaveBeenCalledWith(
      "glab",
      [
        "api",
        "--hostname",
        "gitlab.example.test",
        "projects/group%2Frepo/merge_requests/42",
        "--method",
        "PUT",
        "--input",
        "/tmp/payload.json",
      ],
      expect.objectContaining({ cwd: "/repo", encoding: "utf8" }),
      expect.any(Function),
    );
  });
});
