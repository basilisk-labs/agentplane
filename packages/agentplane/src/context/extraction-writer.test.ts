import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { applyContextExtractionResult } from "./extraction-writer.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-extraction-writer-"));
  tempRoots.push(root);
  return root;
}

afterEach(async () => {
  for (const root of tempRoots) await rm(root, { recursive: true, force: true });
  tempRoots = [];
});

async function write(root: string, rel: string, text: string): Promise<void> {
  const target = path.join(root, rel);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, text, "utf8");
}

describe("context extraction writer", () => {
  it("reports dry-run paths and overwrites duplicate typed IDs deterministically", async () => {
    const root = await tempRoot();
    const raw = {
      schema_version: 2,
      kind: "context_extraction",
      reasoning: [{ label: "typed", summary: "Typed decision records are merged by id." }],
      source_refs: [{ path: "context/raw/source.md", lines: "1-4" }],
      extracted_items: [
        {
          id: "decision.same",
          kind: "decision",
          summary: "Older decision text.",
          source_refs: [{ path: "context/raw/source.md", lines: "1-2" }],
          confidence: 0.7,
          status: "accepted",
        },
        {
          id: "decision.same",
          kind: "decision",
          summary: "Newer decision text.",
          source_refs: [{ path: "context/raw/source.md", lines: "3-4" }],
          confidence_vector: {
            extraction: 0.9,
            source_quality: 0.9,
            entity_resolution: 0.8,
            freshness: 0.95,
          },
          status: "accepted",
        },
      ],
    };

    const dryRun = await applyContextExtractionResult({
      root,
      raw,
      taskId: "202607021729-1F4FNM",
      dryRun: true,
    });

    expect(dryRun.changed_paths).toContain(".agentplane/context/derived/claims/decisions.jsonl");
    await expect(
      stat(path.join(root, ".agentplane/context/derived/claims/decisions.jsonl")),
    ).rejects.toThrow();

    await write(root, ".agentplane/context/derived/claims/decisions.jsonl", "");
    await applyContextExtractionResult({
      root,
      raw,
      taskId: "202607021729-1F4FNM",
      dryRun: false,
    });

    const decisions = await readFile(
      path.join(root, ".agentplane/context/derived/claims/decisions.jsonl"),
      "utf8",
    );
    expect(decisions).toContain("Newer decision text");
    expect(decisions).not.toContain("Older decision text");
  });

  it("keeps canonical row identity when structured payloads contain reserved fields", async () => {
    const root = await tempRoot();
    await write(
      root,
      ".agentplane/context/derived/graph/entities.jsonl",
      `${JSON.stringify({
        id: "entity.context_writer",
        kind: "workflow",
        label: "Context writer",
        status: "active",
      })}\n`,
    );
    const raw = {
      schema_version: 2,
      kind: "context_extraction",
      reasoning: [{ label: "typed", summary: "Entity resolution rows preserve item identity." }],
      source_refs: [{ path: "context/raw/source.md", lines: "1-4" }],
      extracted_items: [
        {
          id: "resolution.context-writer",
          kind: "entity_resolution",
          summary: "Context writer source term resolves to an existing entity.",
          source_refs: [{ path: "context/raw/source.md", lines: "1-4" }],
          confidence: 0.86,
          status: "accepted",
          entity_resolution: {
            id: "payload.supplied-id",
            status: "payload-status",
            source_refs: ["payload-source"],
            source_term: "context writer",
            resolution: "alias_of",
            canonical_entity_id: "entity.context_writer",
            candidate_entities_checked: [
              {
                entity_id: "entity.context_writer",
                reason: "The source term identifies the existing workflow.",
              },
            ],
            comparison_dimensions: ["kind", "scope", "defining_properties"],
            evidence_for: ["The existing workflow has the same defining behavior."],
            evidence_against: [],
            decision_rationale: "The source term is an alias of the canonical workflow entity.",
          },
        },
      ],
    };

    await applyContextExtractionResult({
      root,
      raw,
      taskId: "202607021729-1F4FNM",
      dryRun: false,
    });

    const entityResolutionText = await readFile(
      path.join(root, ".agentplane/context/derived/ontology/entity-resolution.jsonl"),
      "utf8",
    );
    const rows = entityResolutionText
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line) as Record<string, unknown>);

    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      id: "resolution.context-writer",
      status: "accepted",
      source_refs: ["context/raw/source.md#lines=1-4"],
      source_term: "context writer",
      canonical_entity_id: "entity.context_writer",
    });
    const graphEntities = (
      await readFile(path.join(root, ".agentplane/context/derived/graph/entities.jsonl"), "utf8")
    )
      .trim()
      .split("\n")
      .filter(Boolean);
    expect(graphEntities).toHaveLength(1);
    expect(
      await readFile(path.join(root, ".agentplane/context/derived/ontology/aliases.jsonl"), "utf8"),
    ).toContain('"canonical_entity_id":"entity.context_writer"');
  });

  it("rejects semantic alias decisions whose canonical target is absent", async () => {
    const root = await tempRoot();
    await expect(
      applyContextExtractionResult({
        root,
        raw: {
          schema_version: 2,
          kind: "context_extraction",
          reasoning: [{ label: "resolve", summary: "Resolve a semantic alias." }],
          source_refs: [{ path: "context/raw/source.md", lines: "1-4" }],
          extracted_items: [
            {
              id: "resolution.missing",
              kind: "entity_resolution",
              summary: "The target candidate is not present in the canonical graph.",
              source_refs: [{ path: "context/raw/source.md", lines: "1-4" }],
              status: "accepted",
              entity_resolution: {
                source_term: "missing alias",
                resolution: "alias_of",
                canonical_entity_id: "entity.missing",
                candidate_entities_checked: [
                  {
                    entity_id: "entity.missing",
                    reason: "The candidate was named but is absent from the task baseline.",
                  },
                ],
                comparison_dimensions: ["kind", "scope"],
                evidence_for: ["The source claims equivalence."],
                evidence_against: [],
                decision_rationale: "The claimed target must exist before apply.",
              },
            },
          ],
        },
      }),
    ).rejects.toThrow("absent from the pre-write canonical graph");
  });
});
