import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { validateEntityResolution } from "./maximum-assimilation-artifacts-validation-ontology.js";

const roots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-semantic-resolution-"));
  roots.push(root);
  return root;
}

async function write(root: string, rel: string, text: string): Promise<void> {
  const target = path.join(root, rel);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, text, "utf8");
}

afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

describe("maximum-assimilation semantic entity validation", () => {
  it("accepts a reproducible same-entity decision against an existing canonical target", async () => {
    const root = await tempRoot();
    await write(
      root,
      ".agentplane/context/derived/graph/entities.jsonl",
      `${JSON.stringify({ id: "entity.payments", kind: "service", label: "Payments" })}\n`,
    );
    await write(
      root,
      ".agentplane/context/derived/ontology/entity-resolution.jsonl",
      `${JSON.stringify({
        id: "resolution.billing",
        source_term: "Billing",
        resolution: "same_as",
        canonical_entity_id: "entity.payments",
        candidate_entities_checked: [
          {
            entity_id: "entity.payments",
            reason: "Kind, scope, ownership, behavior, and graph neighborhood match.",
          },
        ],
        comparison_dimensions: ["kind", "scope", "ownership", "graph_neighborhood"],
        evidence_for: ["Both names identify the invoice-charging service."],
        evidence_against: [],
        decision_rationale: "Billing is a product-facing name for Payments.",
        source_refs: ["context/raw/specs/billing.md#L1-L4"],
      })}\n`,
    );

    const errors: string[] = [];
    await validateEntityResolution(root, errors);
    expect(errors).toEqual([]);
  });

  it("rejects a merge without evidence and a canonical graph target", async () => {
    const root = await tempRoot();
    await write(root, ".agentplane/context/derived/graph/entities.jsonl", "");
    await write(
      root,
      ".agentplane/context/derived/ontology/entity-resolution.jsonl",
      `${JSON.stringify({
        id: "resolution.guessed",
        source_term: "Billing",
        resolution: "same_as",
        canonical_entity_id: "entity.missing",
        candidate_entities_checked: [
          { entity_id: "entity.missing", reason: "The labels look similar." },
        ],
        source_refs: ["context/raw/specs/billing.md#L1-L4"],
      })}\n`,
    );

    const errors: string[] = [];
    await validateEntityResolution(root, errors);
    expect(errors.join("\n")).toContain("semantic decision requires comparison_dimensions");
    expect(errors.join("\n")).toContain("same_as requires positive identity evidence");
    expect(errors.join("\n")).toContain("canonical entity entity.missing does not exist");
  });
});
