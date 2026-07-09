import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { commitExtractionArtifacts } from "./extraction-transaction.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-extraction-transaction-"));
  tempRoots.push(root);
  return root;
}

afterEach(async () => {
  for (const root of tempRoots) await rm(root, { recursive: true, force: true });
  tempRoots = [];
});

async function write(root: string, rel: string, text: string): Promise<string> {
  const target = path.join(root, rel);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, text, "utf8");
  return target;
}

describe("context extraction artifact transaction", () => {
  it("validates every staged artifact before replacing existing files", async () => {
    const root = await tempRoot();
    const factsPath = await write(
      root,
      ".agentplane/context/derived/facts/facts.jsonl",
      '{"id":"fact.old"}\n',
    );

    await expect(
      commitExtractionArtifacts({
        root,
        artifacts: [{ path: factsPath, content: "not-json\n", format: "jsonl" }],
      }),
    ).rejects.toThrow("Unexpected token");

    await expect(readFile(factsPath, "utf8")).resolves.toBe('{"id":"fact.old"}\n');
  });

  it("restores every original when promotion fails after the first artifact", async () => {
    const root = await tempRoot();
    const factsPath = await write(
      root,
      ".agentplane/context/derived/facts/facts.jsonl",
      '{"id":"fact.old"}\n',
    );
    const entitiesPath = await write(
      root,
      ".agentplane/context/derived/graph/entities.jsonl",
      '{"id":"entity.old"}\n',
    );

    await expect(
      commitExtractionArtifacts({
        root,
        artifacts: [
          { path: factsPath, content: '{"id":"fact.new"}\n', format: "jsonl" },
          { path: entitiesPath, content: '{"id":"entity.new"}\n', format: "jsonl" },
        ],
        hooks: {
          afterPromote: (_artifact, index) => {
            if (index === 0) throw new Error("injected promotion failure");
          },
        },
      }),
    ).rejects.toThrow("injected promotion failure");

    await expect(readFile(factsPath, "utf8")).resolves.toBe('{"id":"fact.old"}\n');
    await expect(readFile(entitiesPath, "utf8")).resolves.toBe('{"id":"entity.old"}\n');
  });
});
