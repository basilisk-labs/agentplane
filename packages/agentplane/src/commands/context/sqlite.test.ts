import { Writable } from "node:stream";

import { beforeEach, describe, expect, it, vi } from "vitest";

const spawnMock = vi.fn();

vi.mock("node:child_process", () => ({
  spawn: spawnMock,
}));

class MockWritable extends Writable {
  _write(
    _chunk: Buffer | string,
    _encoding: BufferEncoding,
    callback: (error?: Error | null) => void,
  ) {
    callback();
  }
}

type MockOutputStream = {
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  setEncoding: () => void;
};

type MockChildProcess = {
  stdin: MockWritable;
  stdout: MockOutputStream;
  stderr: MockOutputStream;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  emit: (event: string, ...args: unknown[]) => void;
};

function makeChildProcess() {
  const handlers = new Map<string, ((...args: unknown[]) => void)[]>();
  const child: MockChildProcess = {
    stdin: new MockWritable(),
    stdout: { on: vi.fn(), setEncoding: vi.fn() },
    stderr: { on: vi.fn(), setEncoding: vi.fn() },
    on: (event, handler) => {
      handlers.set(event, [...(handlers.get(event) ?? []), handler]);
    },
    emit: (event, ...args) => {
      for (const handler of handlers.get(event) ?? []) {
        handler(...args);
      }
    },
  };
  return child;
}

describe("sqlite projection CLI wrapper", () => {
  beforeEach(() => {
    spawnMock.mockReset();
  });

  it("reports sqlite stdin EPIPE as a handled rejection", async () => {
    const { writeSqliteProjection } = await import("./sqlite.js");
    const child = makeChildProcess();
    spawnMock.mockReturnValueOnce(child);
    const ep = Object.assign(new Error("write EPIPE"), {
      code: "EPIPE",
      errno: -32,
      syscall: "write",
    });
    vi.spyOn(child.stdin, "end").mockImplementation(() => {
      queueMicrotask(() => {
        child.stdin.emit("error", ep);
        child.emit("close", 0);
      });
      return child.stdin;
    });

    await expect(
      writeSqliteProjection("/tmp/context.sqlite", {
        metadata: {
          projection_version: 1,
          generated_at: "2026-05-13T00:00:00.000Z",
          workspace_hash: "sha256:test",
          include_tasks: false,
          include_raw: false,
        },
        rows: [],
      }),
    ).rejects.toThrow("sqlite3 stdin write failed: write EPIPE");
  });
});
