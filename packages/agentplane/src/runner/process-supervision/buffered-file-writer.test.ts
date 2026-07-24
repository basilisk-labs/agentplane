import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { waitForCondition } from "@agentplane/testkit";
import { afterEach, describe, expect, it } from "vitest";

import { BufferedFileWriter } from "./buffered-file-writer.js";

const tempRoots: string[] = [];

afterEach(async () => {
  await Promise.all(
    tempRoots.splice(0).map(async (root) => await rm(root, { recursive: true, force: true })),
  );
});

describe("BufferedFileWriter", () => {
  it("fails closed when pending trace output exceeds the bounded queue", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-buffered-writer-"));
    tempRoots.push(root);
    let releaseFirstWrite: (() => void) | undefined;
    const firstWriteGate = new Promise<void>((resolve) => {
      releaseFirstWrite = resolve;
    });
    const errors: Error[] = [];
    const writer = new BufferedFileWriter({
      file_path: path.join(root, "trace.jsonl"),
      max_pending_bytes: 8,
      before_write: async () => await firstWriteGate,
      on_error: (error) => {
        errors.push(error instanceof Error ? error : new Error(String(error)));
      },
    });

    writer.append("first");
    writer.append("123456789");

    await expect(writer.flush()).rejects.toThrow("max_pending_bytes=8");
    expect(errors.map((error) => error.message)).toContain(
      "Runner buffered trace queue exceeded max_pending_bytes=8.",
    );

    releaseFirstWrite?.();
    await expect(
      waitForCondition({
        description: "first bounded writer chunk",
        timeoutMs: 1000,
        pollMs: 10,
        read: async () => await readFile(path.join(root, "trace.jsonl"), "utf8").catch(() => ""),
        predicate: (contents) => contents === "first",
      }),
    ).resolves.toBe("first");
  });
});
