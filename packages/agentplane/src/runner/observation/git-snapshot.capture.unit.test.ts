import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ execFileAsync: vi.fn() }));

vi.mock("@agentplaneorg/core/process", () => ({ execFileAsync: mocks.execFileAsync }));

import { captureGitSnapshot } from "./git-snapshot/capture.js";

const tempRoots: string[] = [];

afterEach(async () => {
  mocks.execFileAsync.mockReset();
  await Promise.all(tempRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

describe("Git snapshot capture scheduling", () => {
  it("starts independent root, HEAD, canonical status, and index observations before awaiting results", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-git-snapshot-parallel-"));
    tempRoots.push(root);
    let releaseObservations: (() => void) | undefined;
    const observationsReleased = new Promise<void>((resolve) => {
      releaseObservations = resolve;
    });

    mocks.execFileAsync.mockImplementation(
      async (_command: string, args: readonly string[], options: { cwd?: string }) => {
        await observationsReleased;
        if (args[0] === "rev-parse" && args[1] === "--show-toplevel") {
          return { stdout: `${options.cwd ?? root}\n`, stderr: "" };
        }
        if (args[0] === "rev-parse") {
          return { stdout: `${"a".repeat(40)}\n`, stderr: "" };
        }
        return { stdout: Buffer.alloc(0), stderr: Buffer.alloc(0) };
      },
    );

    const capture = captureGitSnapshot({ repository_root: root });
    await vi.waitFor(() => expect(mocks.execFileAsync).toHaveBeenCalledTimes(4));
    const calls = mocks.execFileAsync.mock.calls as unknown as [
      string,
      readonly string[],
      { cwd?: string },
    ][];
    expect(calls.map(([, args]) => args[0])).toEqual([
      "rev-parse",
      "rev-parse",
      "status",
      "ls-files",
    ]);
    expect(calls[2]?.[1]).toContain("--untracked-files=all");
    expect(calls.some(([, args]) => args.includes("--untracked-files=no"))).toBe(false);
    expect(calls.some(([, args]) => args.includes("--others"))).toBe(false);

    releaseObservations?.();
    const snapshot = await capture;

    expect(snapshot.state).toBe("available");
    expect(snapshot.head_commit).toBe("a".repeat(40));
    expect(snapshot.status_entries).toEqual([]);
    expect(snapshot.index_entries).toEqual([]);
  });
});
