import { describe, expect, it } from "vitest";

import { createTaskNewParsed, type ContextWorkspaceMode } from "./ingest-task.js";
import type { ContextIngestParsed, ManifestEntry } from "./ingest.js";

const parsed: ContextIngestParsed = {
  sources: [],
  mode: "changed",
  dryRun: false,
  indexOnly: false,
};

const sourceRows: ManifestEntry[] = [
  {
    path: "context/raw/notes.md",
    sha256: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    size_bytes: 42,
    mtime: "2026-07-02T00:00:00.000Z",
    content_type: "text/markdown",
    status: "changed",
  },
];

describe("context ingest task creation", () => {
  it.each<ContextWorkspaceMode | undefined>([
    undefined,
    "adaptive",
    "minimal",
    "wiki",
    "codebase",
    "research",
    "maximum-assimilation",
  ])("maps workspace mode %s to maximum-assimilation", (workspaceMode) => {
    const task = createTaskNewParsed(parsed, sourceRows, workspaceMode);
    const context = task.extensions?.["agentplane.context"] as {
      mode?: string;
      blueprint?: { id?: string; required_gates?: string[] };
      prompt_modules?: { content: string }[];
      allowed_outputs?: string[];
      wiki?: {
        maintenance_mode?: string;
        raw_deletion_resilience_required?: boolean;
        line_refs_required?: boolean;
        entity_relation_first?: boolean;
        canonical_glossary_required?: boolean;
      };
    };

    expect(task.blueprintRequest).toBe("context.maximum_assimilation");
    expect(context.mode).toBe("maximum_assimilation");
    expect(context.blueprint?.id).toBe("context.maximum_assimilation");
    expect(context.blueprint?.required_gates).toContain("entity_relation_first_extraction");
    expect(context.wiki).toMatchObject({
      maintenance_mode: "maximum_assimilation",
      raw_deletion_resilience_required: true,
      line_refs_required: true,
      entity_relation_first: true,
      canonical_glossary_required: true,
    });
    expect(task.description).not.toContain("Blueprint: context.assimilation");
    expect(task.description.length).toBeLessThan(1500);
    expect(context.prompt_modules?.[0]?.content.length).toBeLessThan(6500);
    expect(context.prompt_modules?.[0]?.content).toContain("extraction-contract.json");
    expect(context.allowed_outputs).toContain(
      ".agentplane/tasks/${taskId}/extraction-contract.json",
    );
    expect(task.verify).toEqual(
      expect.arrayContaining([
        "agentplane context wiki report context/wiki",
        expect.stringContaining("agentplane evaluator run <created-task-id>"),
        "agentplane context finalize-task <created-task-id>",
      ]),
    );
    const qualityReviewStep = task.verify.find((step) => step.includes("evaluator run"));
    expect(qualityReviewStep).toContain("--provenance human_supplied");
    expect(qualityReviewStep).toContain("--verdict <pass|rework|blocked|human_review>");
    expect(qualityReviewStep).not.toContain("--verdict pass");
    expect(qualityReviewStep).not.toContain("Maximum-assimilation context lifecycle verified.");
    expect(qualityReviewStep).not.toContain(
      "Curated context, topology, coverage, and evaluator scenarios satisfy the task contract.",
    );
  });

  it("records deprecated workspace mode aliases without weakening the task", () => {
    const task = createTaskNewParsed(parsed, sourceRows, "adaptive");

    expect(task.description).toContain("Deprecated workspace mode alias: adaptive");
    expect(task.description).toContain("Context ingest now always creates maximum-assimilation");
    expect(task.description).toContain("extraction-contract.json");
  });
});
