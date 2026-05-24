import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { cmdContextExtractionApply } from "./extraction.js";
import { cmdContextGraphValidate } from "./graph.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-context-extraction-"));
  tempRoots.push(root);
  return root;
}

afterEach(async () => {
  for (const root of tempRoots) {
    await rm(root, { recursive: true, force: true });
  }
  tempRoots = [];
});

async function write(root: string, rel: string, text: string): Promise<void> {
  const target = path.join(root, rel);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, text, "utf8");
}

describe("context extraction apply", () => {
  it("materializes facts, graph rows, provenance, and coverage from context_extraction SGR", async () => {
    const root = await tempRoot();
    const otherCwd = await tempRoot();
    await write(
      root,
      "context/extraction.json",
      JSON.stringify({
        schema_version: 1,
        kind: "context_extraction",
        task_id: "202605130501-CTXMAX",
        reasoning: [{ label: "entity-first", summary: "Extract before wiki synthesis." }],
        source_refs: [{ path: "context/raw/research/source.md", lines: "1-6" }],
        extracted_items: [
          {
            id: "entity.maximum-assimilation",
            kind: "graph_entity",
            summary: "Maximum assimilation is the workflow under test.",
            source_refs: [{ path: "context/raw/research/source.md", lines: "1-2" }],
            confidence: 0.9,
            status: "accepted",
            entity: {
              id: "entity.maximum-assimilation",
              kind: "concept",
              label: "Maximum assimilation",
              aliases: ["maximum-assimilation"],
            },
          },
          {
            id: "entity.derived-graph",
            kind: "graph_entity",
            summary: "Derived graph stores formal extraction rows.",
            source_refs: [{ path: "context/raw/research/source.md", lines: "3-4" }],
            confidence: 0.88,
            status: "accepted",
            entity: { id: "entity.derived-graph", kind: "concept", label: "Derived graph" },
          },
          {
            id: "fact.maximum-assimilation.entity-first",
            kind: "fact",
            summary: "Maximum assimilation extracts formal rows before narrative wiki synthesis.",
            source_refs: [{ path: "context/raw/research/source.md", lines: "1-6" }],
            confidence: 0.92,
            status: "accepted",
          },
          {
            id: "edge.maximum-assimilation.produces.derived-graph",
            kind: "graph_edge",
            summary: "Maximum assimilation produces a derived graph layer.",
            source_refs: [{ path: "context/raw/research/source.md", lines: "5-6" }],
            confidence: 0.87,
            status: "accepted",
            edge: {
              from: "entity.maximum-assimilation",
              to: "entity.derived-graph",
              relation: "produces",
            },
          },
          {
            id: "coverage.research-source",
            kind: "coverage",
            summary: "The source was covered by formal extraction rows before wiki synthesis.",
            source_refs: [{ path: "context/raw/research/source.md", lines: "1-6" }],
            confidence: 0.9,
            status: "accepted",
            coverage: {
              source_path: "context/raw/research/source.md",
              status: "covered",
              reason: "Entities, fact, and relation rows cover the selected source.",
              covered_item_ids: [
                "entity.maximum-assimilation",
                "entity.derived-graph",
                "fact.maximum-assimilation.entity-first",
                "edge.maximum-assimilation.produces.derived-graph",
              ],
            },
          },
        ],
      }),
    );

    await cmdContextExtractionApply({
      cwd: otherCwd,
      rootOverride: root,
      parsed: { file: "context/extraction.json", taskId: "202605130501-CTXMAX", dryRun: false },
    });
    await cmdContextGraphValidate({ cwd: root, parsed: {} });

    const facts = await readFile(
      path.join(root, ".agentplane/context/derived/facts/facts.jsonl"),
      "utf8",
    );
    const entities = await readFile(
      path.join(root, ".agentplane/context/derived/graph/entities.jsonl"),
      "utf8",
    );
    const edges = await readFile(
      path.join(root, ".agentplane/context/derived/graph/edges.jsonl"),
      "utf8",
    );
    const provenance = await readFile(
      path.join(root, ".agentplane/context/derived/graph/provenance_edges.jsonl"),
      "utf8",
    );
    const coverage = await readFile(
      path.join(root, ".agentplane/context/derived/reports/coverage.jsonl"),
      "utf8",
    );

    expect(facts).toContain("fact.maximum-assimilation.entity-first");
    expect(entities).toContain("entity.maximum-assimilation");
    expect(edges).toContain("edge.maximum-assimilation.produces.derived-graph");
    expect(provenance).toContain("context/raw/research/source.md#lines=1-6");
    expect(coverage).toContain("coverage.research-source");
    expect(coverage).toContain("context/raw/research/source.md");
  });
});
