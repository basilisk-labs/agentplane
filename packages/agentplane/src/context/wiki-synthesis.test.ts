import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { cmdContextWikiLint } from "../commands/context/wiki.js";
import { applyContextExtractionResult } from "./extraction-writer.js";

let roots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-wiki-synthesis-"));
  roots.push(root);
  return root;
}

afterEach(async () => {
  for (const root of roots) await rm(root, { recursive: true, force: true });
  roots = [];
});

async function write(root: string, rel: string, content: string): Promise<void> {
  const abs = path.join(root, rel);
  await mkdir(path.dirname(abs), { recursive: true });
  await writeFile(abs, content, "utf8");
}

function extraction(factSummary = "Meridian coordinates Atlas.") {
  const source = { path: "context/raw/research/meridian.md", lines: "1-40" };
  return {
    schema_version: 2,
    kind: "context_extraction",
    task_id: "202607221118-WIKI",
    reasoning: [{ label: "compile", summary: "Compile linked atomic context." }],
    source_refs: [source],
    extracted_items: [
      {
        id: "entity.meridian",
        kind: "graph_entity",
        summary: "Meridian is the coordinating service.",
        source_refs: [{ ...source, lines: "1-4" }],
        status: "accepted",
        entity: {
          id: "entity.meridian",
          kind: "service",
          label: "Meridian",
          aliases: ["Meridian Relay"],
        },
      },
      {
        id: "entity.atlas",
        kind: "graph_entity",
        summary: "Atlas is the destination registry.",
        source_refs: [{ ...source, lines: "5-8" }],
        status: "accepted",
        entity: { id: "entity.atlas", kind: "service", label: "Atlas" },
      },
      {
        id: "fact.meridian-atlas",
        kind: "fact",
        summary: factSummary,
        source_refs: [{ ...source, lines: "9-12" }],
        status: "accepted",
        validity: "current",
        target_path: "context/wiki/services/meridian.md",
        canonical_refs: ["entity.meridian", "entity.atlas"],
        supersedes: ["fact.meridian-atlas.v0"],
      },
      {
        id: "contradiction.atlas-port",
        kind: "contradiction",
        summary: "Sources disagree about the Atlas port.",
        source_refs: [{ ...source, lines: "13-18" }],
        status: "conflict",
        validity: "conflicting",
        target_path: "context/wiki/services/atlas.md",
        canonical_refs: ["entity.atlas"],
        contradicts: ["fact.atlas-port-443", "fact.atlas-port-8443"],
        conflict_markers: ["443_vs_8443"],
      },
      {
        id: "edge.meridian-atlas",
        kind: "graph_edge",
        summary: "Meridian coordinates Atlas.",
        source_refs: [{ ...source, lines: "9-12" }],
        status: "accepted",
        edge: {
          id: "edge.meridian-atlas",
          from: "entity.meridian",
          to: "entity.atlas",
          relation: "coordinates",
        },
      },
      {
        id: "page.atlas",
        kind: "page_creation",
        summary: "Create the Atlas service page.",
        source_refs: [{ ...source, lines: "5-18" }],
        span_refs: ["span.meridian.2"],
        status: "proposed",
        page_creation: {
          path: "context/wiki/services/atlas.md",
          page_type: "entity",
          family_id: "family.services",
          decision: "create_or_update",
          canonical_entity_ids: ["entity.atlas"],
        },
      },
      {
        id: "page.meridian",
        kind: "page_creation",
        summary: "Create the Meridian service page.",
        source_refs: [{ ...source, lines: "1-12" }],
        span_refs: ["span.meridian.1"],
        status: "proposed",
        page_creation: {
          path: "context/wiki/services/meridian.md",
          page_type: "entity",
          family_id: "family.services",
          decision: "create_or_update",
          canonical_entity_ids: ["entity.meridian"],
        },
      },
    ],
  };
}

describe("atomic linked wiki synthesis", () => {
  it("upserts stable atoms, links entities, preserves prose, and deduplicates the log", async () => {
    const root = await tempRoot();
    await write(
      root,
      "context/wiki/services/meridian.md",
      "# Meridian\n\n## Operator notes\n\nKeep this human-authored paragraph.\n",
    );

    const first = await applyContextExtractionResult({
      root,
      raw: extraction(),
      synthesizeWiki: true,
      generatedAt: "2026-07-22T12:00:00.000Z",
    });
    expect(first.wiki_pages).toBe(2);
    expect(first.wiki_atoms).toBe(5);
    expect(first.wiki_log_entries).toBe(1);
    expect(first.changed_paths).toContain("context/wiki/services/meridian.md");

    const meridian = await readFile(path.join(root, "context/wiki/services/meridian.md"), "utf8");
    expect(meridian).toContain("Keep this human-authored paragraph.");
    expect(meridian).toContain("### `fact.meridian-atlas`");
    expect(meridian).toContain("[[services/atlas|Atlas]]");
    expect(meridian).toContain("supersedes `fact.meridian-atlas.v0`");
    expect(meridian).toContain("entities:\n      - entity.atlas\n      - entity.meridian");

    const atlas = await readFile(path.join(root, "context/wiki/services/atlas.md"), "utf8");
    expect(atlas).toContain("### `contradiction.atlas-port`");
    expect(atlas).toContain("contradicts `fact.atlas-port-443`");
    expect(atlas).toContain("conflicts:\n    - contradiction.atlas-port");

    const index = await readFile(path.join(root, "context/wiki/services/index.md"), "utf8");
    expect(index).toContain("[Meridian](meridian.md) — Meridian coordinates Atlas.");
    expect(index).toMatch(/\(sources: \d+\)/u);

    const logBefore = await readFile(path.join(root, "context/wiki/log.md"), "utf8");
    expect(logBefore).toContain("## [2026-07-22] ingest | 202607221118-WIKI |");
    expect(logBefore).toContain("agentplane-context-sources:start");
    expect(logBefore.match(/^## \[2026-07-22\] ingest/gmu)).toHaveLength(1);
    await cmdContextWikiLint({ cwd: root, parsed: { path: "context/wiki" } });

    const second = await applyContextExtractionResult({
      root,
      raw: extraction(),
      synthesizeWiki: true,
      generatedAt: "2026-07-23T12:00:00.000Z",
    });
    expect(second.changed_paths).toEqual([]);
    expect(second.wiki_log_entries).toBe(0);
    expect(await readFile(path.join(root, "context/wiki/log.md"), "utf8")).toBe(logBefore);
  });

  it("appends a new operation for changed knowledge without duplicating stable atom ids", async () => {
    const root = await tempRoot();
    await applyContextExtractionResult({
      root,
      raw: extraction(),
      synthesizeWiki: true,
      generatedAt: "2026-07-22T12:00:00.000Z",
    });
    const followup = extraction("Meridian coordinates Atlas through the registry API.");
    followup.extracted_items = followup.extracted_items.filter(
      (item) => item.id !== "contradiction.atlas-port",
    );
    await applyContextExtractionResult({
      root,
      raw: followup,
      synthesizeWiki: true,
      generatedAt: "2026-07-23T12:00:00.000Z",
    });

    const meridian = await readFile(path.join(root, "context/wiki/services/meridian.md"), "utf8");
    expect(meridian.match(/^### `fact\.meridian-atlas`$/gmu)).toHaveLength(1);
    expect(meridian).toContain("through the registry API");
    const atlas = await readFile(path.join(root, "context/wiki/services/atlas.md"), "utf8");
    expect(atlas).toContain("### `contradiction.atlas-port`");
    expect(atlas).toContain("epistemic_status: disputed");
    const log = await readFile(path.join(root, "context/wiki/log.md"), "utf8");
    expect(log.match(/^## \[2026-07-2[23]\] ingest/gmu)).toHaveLength(2);
  });

  it("rolls back formal and wiki artifacts together when promotion fails", async () => {
    const root = await tempRoot();
    await applyContextExtractionResult({
      root,
      raw: extraction(),
      synthesizeWiki: true,
      generatedAt: "2026-07-22T12:00:00.000Z",
    });
    const factsPath = path.join(root, ".agentplane/context/derived/facts/facts.jsonl");
    const wikiPath = path.join(root, "context/wiki/services/meridian.md");
    const factsBefore = await readFile(factsPath, "utf8");
    const wikiBefore = await readFile(wikiPath, "utf8");

    await expect(
      applyContextExtractionResult({
        root,
        raw: extraction("Changed content that must be rolled back."),
        synthesizeWiki: true,
        generatedAt: "2026-07-23T12:00:00.000Z",
        transactionHooks: {
          afterPromote: (artifact) => {
            if (artifact.relativePath === "context/wiki/services/meridian.md") {
              throw new Error("injected cross-surface failure");
            }
          },
        },
      }),
    ).rejects.toThrow("injected cross-surface failure");

    await expect(readFile(factsPath, "utf8")).resolves.toBe(factsBefore);
    await expect(readFile(wikiPath, "utf8")).resolves.toBe(wikiBefore);
  });
});
