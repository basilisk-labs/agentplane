import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, expect, it, vi } from "vitest";

import { cmdContextReindex } from "./reindex.js";
import { cmdContextSearch } from "./search.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-context-raw-deletion-"));
  tempRoots.push(root);
  return root;
}

async function write(root: string, rel: string, text: string): Promise<void> {
  const target = path.join(root, rel);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, text, "utf8");
}

afterEach(async () => {
  vi.restoreAllMocks();
  for (const root of tempRoots) await rm(root, { recursive: true, force: true });
  tempRoots = [];
});

it("keeps curated search usable after the raw corpus is removed", async () => {
  const root = await tempRoot();
  await write(root, "context/raw/specs/payment-api.md", "# Raw\n\nrawonlysentinel\n");
  await write(
    root,
    "context/wiki/payment-api.md",
    "# Payment API\n\nDurable curated payment contract sentinel.\n",
  );
  await write(
    root,
    ".agentplane/context/derived/facts/facts.jsonl",
    JSON.stringify({
      id: "fact.payment-api.durable",
      summary: "Durable curated payment contract sentinel.",
      source_refs: ["context/raw/specs/payment-api.md#L1-L3"],
    }) + "\n",
  );
  await cmdContextReindex({
    cwd: root,
    parsed: { includeTasks: false, includeRaw: true, reset: true },
  });
  await rm(path.join(root, "context/raw/specs/payment-api.md"));
  await cmdContextReindex({
    cwd: root,
    parsed: { includeTasks: false, includeRaw: false, reset: true },
  });
  const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

  await cmdContextSearch({
    cwd: root,
    parsed: {
      query: "durable curated payment contract",
      scope: "wiki,facts,graph,capabilities",
      format: "json",
      explain: false,
    },
  });
  await cmdContextSearch({
    cwd: root,
    parsed: { query: "rawonlysentinel", scope: "raw", format: "json", explain: false },
  });

  const payloads = out.mock.calls
    .map((call) => String(call[0]))
    .join("")
    .trim()
    .split(/\n(?=\{)/u)
    .map((chunk) => JSON.parse(chunk) as { results: { ref: string }[] });
  expect(payloads[0]?.results.some((result) => result.ref.startsWith("context/wiki/"))).toBe(true);
  expect(payloads[1]?.results).toEqual([]);
});
