import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
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

  it("routes SGR v2 typed records to claims, ontology, sources, and wiki outputs", async () => {
    const root = await tempRoot();
    await write(
      root,
      "context/extraction-v2.json",
      JSON.stringify({
        schema_version: 2,
        kind: "context_extraction",
        task_id: "202607021729-1F4FNM",
        reasoning: [{ label: "typed", summary: "Typed records drive maximum assimilation." }],
        source_refs: [{ path: "context/raw/research/source.md", lines: "1-20" }],
        extracted_items: [
          {
            id: "decision.context-writer",
            kind: "decision",
            summary: "Context writer materializes typed records before wiki synthesis.",
            source_refs: [{ path: "context/raw/research/source.md", lines: "1-4" }],
            span_refs: ["span.source.1"],
            confidence_vector: {
              extraction: 0.9,
              source_quality: 0.8,
              entity_resolution: 0.85,
              freshness: 0.95,
            },
            status: "accepted",
            validity: "current",
            target_path: "context/wiki/workflows/context-writer.md",
          },
          {
            id: "resolution.context-writer",
            kind: "entity_resolution",
            summary: "Source-local term resolves to an existing canonical entity.",
            source_refs: [{ path: "context/raw/research/source.md", lines: "5-8" }],
            confidence: 0.88,
            status: "accepted",
            entity_resolution: {
              source_term: "context writer",
              resolution: "alias_of",
              canonical_entity_id: "entity.context_writer",
            },
          },
          {
            id: "page.context-writer",
            kind: "page_creation",
            summary: "Workflow page creation is source-backed.",
            source_refs: [{ path: "context/raw/research/source.md", lines: "9-12" }],
            confidence: 0.82,
            status: "proposed",
            page_creation: {
              path: "context/wiki/workflows/context-writer.md",
              page_type: "workflow",
              decision: "create",
            },
          },
          {
            id: "topology.context",
            kind: "topology_decision",
            summary: "Context wiki topology is workflow-shaped.",
            source_refs: [{ path: "context/raw/research/source.md", lines: "13-16" }],
            confidence: 0.8,
            status: "accepted",
            topology_decision: {
              source_shape: { primary: "codebase_and_task_history" },
              canonical_page_families: [{ family_id: "family.workflows" }],
            },
          },
          {
            id: "coverage.span-source",
            kind: "coverage",
            summary: "Span-level coverage points to typed records.",
            source_refs: [{ path: "context/raw/research/source.md", lines: "1-20" }],
            confidence: 0.91,
            status: "accepted",
            coverage: {
              source_path: "context/raw/research/source.md",
              span_id: "span.source.1",
              status: "covered",
              reason: "Typed decision and ontology rows cover this span.",
              covered_item_ids: ["decision.context-writer", "resolution.context-writer"],
              target_paths: ["context/wiki/workflows/context-writer.md"],
            },
          },
        ],
      }),
    );

    await cmdContextExtractionApply({
      cwd: root,
      parsed: { file: "context/extraction-v2.json", taskId: "202607021729-1F4FNM", dryRun: true },
    });
    await expect(
      stat(path.join(root, ".agentplane/context/derived/claims/decisions.jsonl")),
    ).rejects.toThrow();

    await cmdContextExtractionApply({
      cwd: root,
      parsed: { file: "context/extraction-v2.json", taskId: "202607021729-1F4FNM", dryRun: false },
    });

    const decisions = await readFile(
      path.join(root, ".agentplane/context/derived/claims/decisions.jsonl"),
      "utf8",
    );
    const entityResolution = await readFile(
      path.join(root, ".agentplane/context/derived/ontology/entity-resolution.jsonl"),
      "utf8",
    );
    const aliases = await readFile(
      path.join(root, ".agentplane/context/derived/ontology/aliases.jsonl"),
      "utf8",
    );
    const sourceSpans = await readFile(
      path.join(root, ".agentplane/context/derived/sources/source-spans.jsonl"),
      "utf8",
    );
    const topologyPlan = JSON.parse(
      await readFile(
        path.join(root, ".agentplane/context/derived/wiki/topology.plan.json"),
        "utf8",
      ),
    ) as { mode: string; source_shape: { primary: string } };

    expect(decisions).toContain("decision.context-writer");
    expect(decisions).toContain("confidence_vector");
    expect(entityResolution).toContain("resolution.context-writer");
    expect(aliases).toContain("entity.context_writer");
    expect(sourceSpans).toContain("span.source.1");
    expect(sourceSpans).toContain("target_paths");
    expect(topologyPlan.mode).toBe("maximum_assimilation");
    expect(topologyPlan.source_shape.primary).toBe("codebase_and_task_history");
  });

  it("keeps natural SGR system entities and tests relations graph-valid", async () => {
    const root = await tempRoot();
    await write(
      root,
      "context/extraction-system.json",
      JSON.stringify({
        schema_version: 2,
        kind: "context_extraction",
        task_id: "202607030734-7S66KX",
        reasoning: [{ label: "system", summary: "Extract system tool relations." }],
        source_refs: [{ path: "context/raw/public/tool.md", lines: "1-12" }],
        extracted_items: [
          {
            id: "entity.protocol",
            kind: "graph_entity",
            summary: "The protocol is the target of the tool.",
            source_refs: [{ path: "context/raw/public/tool.md", lines: "1-4" }],
            confidence: 0.82,
            status: "accepted",
            entity: {
              id: "entity.protocol",
              kind: "concept",
              label: "Protocol",
            },
          },
          {
            id: "entity.inspector",
            kind: "graph_entity",
            summary: "The inspector is a system used to test the protocol.",
            source_refs: [{ path: "context/raw/public/tool.md", lines: "5-8" }],
            confidence: 0.8,
            status: "accepted",
            entity: {
              id: "entity.inspector",
              kind: "system",
              label: "Inspector",
            },
          },
          {
            id: "edge.inspector.tests.protocol",
            kind: "graph_edge",
            summary: "The inspector tests the protocol.",
            source_refs: [{ path: "context/raw/public/tool.md", lines: "9-12" }],
            confidence: 0.78,
            status: "accepted",
            edge: {
              id: "edge.inspector.tests.protocol",
              from: "entity.inspector",
              to: "entity.protocol",
              relation: "tests",
            },
          },
        ],
      }),
    );

    await cmdContextExtractionApply({
      cwd: root,
      parsed: {
        file: "context/extraction-system.json",
        taskId: "202607030734-7S66KX",
        dryRun: false,
      },
    });

    await cmdContextGraphValidate({ cwd: root, parsed: {} });

    const entities = await readFile(
      path.join(root, ".agentplane/context/derived/graph/entities.jsonl"),
      "utf8",
    );
    const edges = await readFile(
      path.join(root, ".agentplane/context/derived/graph/edges.jsonl"),
      "utf8",
    );
    expect(entities).toContain('"kind":"system"');
    expect(edges).toContain('"relation":"tests"');
  });

  it("surfaces concrete graph validation issue lines", async () => {
    const root = await tempRoot();
    await write(
      root,
      ".agentplane/context/derived/graph/entities.jsonl",
      `${JSON.stringify({ id: "entity.invalid", kind: "invalid", label: "Invalid" })}\n`,
    );
    await write(
      root,
      ".agentplane/context/derived/graph/edges.jsonl",
      `${JSON.stringify({
        id: "edge.invalid",
        from: "entity.invalid",
        to: "entity.missing",
        relation: "invalid",
      })}\n`,
    );
    await write(root, ".agentplane/context/derived/graph/provenance_edges.jsonl", "");

    await expect(cmdContextGraphValidate({ cwd: root, parsed: {} })).rejects.toThrow(
      /graph validation failed: 3 issue\(s\)\n- entity invalid kind: entity\.invalid\n- edge invalid relation invalid: edge\.invalid\n- edge references missing entity: entity\.missing/u,
    );
  });
});
