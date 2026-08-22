import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { readStructuredContextJsonl } from "./task-knowledge-retrieval.js";

const roots: string[] = [];

async function root(): Promise<string> {
  const value = await mkdtemp(path.join(os.tmpdir(), "agentplane-context-retrieval-"));
  roots.push(value);
  return value;
}

afterEach(async () => {
  await Promise.all(
    roots.splice(0).map(async (entry) => await rm(entry, { recursive: true, force: true })),
  );
});

describe("typed structured context retrieval", () => {
  it("distinguishes missing, malformed, and oversize sources from empty success", async () => {
    const repository = await root();
    await expect(readStructuredContextJsonl(repository, "missing.jsonl")).resolves.toMatchObject({
      rows: [],
      omissions: [{ reason_code: "source_missing" }],
    });

    await writeFile(path.join(repository, "malformed.jsonl"), '{"id":"ok"}\nnot-json\n', "utf8");
    await expect(readStructuredContextJsonl(repository, "malformed.jsonl")).resolves.toMatchObject({
      rows: [{ id: "ok" }],
      omissions: [{ reason_code: "source_malformed" }],
    });

    await writeFile(
      path.join(repository, "oversize.jsonl"),
      "x".repeat(2 * 1024 * 1024 + 1),
      "utf8",
    );
    await expect(readStructuredContextJsonl(repository, "oversize.jsonl")).resolves.toMatchObject({
      rows: [],
      omissions: [{ reason_code: "source_oversize" }],
    });
  });

  it("returns valid empty JSONL as available empty data without an omission", async () => {
    const repository = await root();
    await mkdir(path.join(repository, "context"), { recursive: true });
    await writeFile(path.join(repository, "context", "empty.jsonl"), "\n", "utf8");
    await expect(readStructuredContextJsonl(repository, "context/empty.jsonl")).resolves.toEqual({
      rows: [],
      omissions: [],
    });
  });
});
