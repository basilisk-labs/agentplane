import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { CommandContext } from "../shared/task-backend.js";
import { cmdContextVerifyTask } from "./verify-task.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-context-max-verify-"));
  tempRoots.push(root);
  return root;
}

afterEach(async () => {
  vi.restoreAllMocks();
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

async function writeMaximumAssimilationArtifacts(root: string, opts?: { glossary?: boolean }) {
  await write(
    root,
    "context/wiki/index.md",
    [
      "---",
      "agentplane_context:",
      "schema_version: 1",
      "artifact_type: wiki_page",
      'canonical_id: "wiki.index"',
      "modality: definition",
      "epistemic_status: draft",
      "source_refs:",
      '  - "[Payment API](../raw/specs/payment-api.md#lines=1-6)"',
      "---",
      "# Context wiki",
      "",
      "Topology decision:",
      "- source_shape: product docs",
      "- canonical_families: entities, workflows",
      "- page_vs_heading granularity: standalone pages for reusable entities.",
    ].join("\n"),
  );
  if (opts?.glossary !== false) {
    await write(
      root,
      "context/wiki/glossary.md",
      [
        "---",
        "agentplane_context:",
        "schema_version: 1",
        "artifact_type: wiki_page",
        'canonical_id: "wiki.glossary"',
        "modality: definition",
        "epistemic_status: draft",
        "source_refs:",
        '  - "[Payment API](../raw/specs/payment-api.md#lines=1-6)"',
        "---",
        "# Glossary",
        "",
        "- [[Payment API]]: canonical product API entity.",
      ].join("\n"),
    );
  }
  await write(
    root,
    "context/wiki/entities/payment-api.md",
    [
      "---",
      "agentplane_context:",
      "schema_version: 1",
      "artifact_type: wiki_page",
      'canonical_id: "entity.payment_api"',
      "modality: definition",
      "epistemic_status: draft",
      "source_refs:",
      '  - "[Payment API](../../raw/specs/payment-api.md#lines=1-6)"',
      "graph_refs:",
      "  entities:",
      '    - "entity.payment_api"',
      "---",
      "# Payment API",
      "",
      "[[Payment API]] exposes the [[Payment Workflow]] contract.",
    ].join("\n"),
  );
  await write(
    root,
    "context/wiki/reports/coverage.md",
    [
      "---",
      "agentplane_context:",
      "schema_version: 1",
      "artifact_type: wiki_page",
      'canonical_id: "report.coverage"',
      "modality: observation",
      "epistemic_status: draft",
      "source_refs:",
      '  - "[Payment API](../../raw/specs/payment-api.md#lines=1-6)"',
      "---",
      "# Coverage",
      "",
      "coverage: covered [[Payment API]] semantics; omitted none; redacted none.",
    ].join("\n"),
  );
  await write(
    root,
    ".agentplane/context/derived/graph/entities.jsonl",
    [
      {
        id: "entity.payment_api",
        label: "Payment API",
        target_path: "context/wiki/entities/payment-api.md",
        source_refs: ["context/raw/specs/payment-api.md#lines=1-3"],
      },
      {
        id: "entity.payment_workflow",
        label: "Payment Workflow",
        no_page_reason: "Covered on the Payment API page.",
        source_refs: ["context/raw/specs/payment-api.md#L4-L6"],
      },
    ]
      .map((row) => JSON.stringify(row))
      .join("\n") + "\n",
  );
  await write(
    root,
    ".agentplane/context/derived/graph/edges.jsonl",
    JSON.stringify({
      id: "edge.payment_api.workflow",
      from: "entity.payment_api",
      to: "entity.payment_workflow",
      relation: "defines",
      source_refs: ["context/raw/specs/payment-api.md#lines=2-6"],
    }) + "\n",
  );
  await write(
    root,
    ".agentplane/context/derived/graph/provenance_edges.jsonl",
    JSON.stringify({
      id: "prov.payment_api",
      target: "entity.payment_api",
      source_refs: ["context/raw/specs/payment-api.md#lines=1-6"],
    }) + "\n",
  );
  await write(
    root,
    ".agentplane/context/derived/facts/facts.jsonl",
    JSON.stringify({
      id: "fact.payment_api.public_source",
      summary: "Payment API semantics are covered by the public source.",
      confidence: 0.9,
      status: "accepted",
      source_refs: ["context/raw/specs/payment-api.md#lines=1-6"],
    }) + "\n",
  );
  await write(
    root,
    ".agentplane/context/derived/reports/coverage.jsonl",
    JSON.stringify({
      id: "coverage.payment_api",
      source_path: "context/raw/specs/payment-api.md",
      span_id: "span.payment-api.0001",
      coverage_status: "covered",
      reason: "Payment API semantics are represented by wiki, fact, and graph artifacts.",
      covered_item_ids: [
        "entity.payment_api",
        "entity.payment_workflow",
        "fact.payment_api.public_source",
      ],
      target_paths: ["context/wiki/entities/payment-api.md"],
      source_refs: ["context/raw/specs/payment-api.md#lines=1-6"],
    }) + "\n",
  );
  await write(
    root,
    ".agentplane/tasks/202605191451-CTXMAX/source-spans.skeleton.jsonl",
    JSON.stringify({
      span_id: "span.payment-api.0001",
      source_path: "context/raw/specs/payment-api.md",
      line_start: 1,
      line_end: 6,
      text_hash: "sha256:1111111111111111111111111111111111111111111111111111111111111111",
    }) + "\n",
  );
  await write(
    root,
    ".agentplane/context/derived/ontology/entity-resolution.jsonl",
    [
      {
        id: "resolution.payment_api",
        source_term: "Payment API",
        resolution: "new_entity_proposal",
        proposed_entity_id: "entity.payment_api",
        candidate_entities_checked: [{ entity_id: "entity.payment_workflow" }],
        why_not_existing: "Payment API is the canonical source entity.",
        source_refs: ["context/raw/specs/payment-api.md#lines=1-3"],
      },
      {
        id: "resolution.payment_workflow",
        source_term: "Payment Workflow",
        resolution: "new_entity_proposal",
        proposed_entity_id: "entity.payment_workflow",
        candidate_entities_checked: [{ entity_id: "entity.payment_api" }],
        why_not_existing: "Payment Workflow is a separate workflow concept.",
        source_refs: ["context/raw/specs/payment-api.md#L4-L6"],
      },
    ]
      .map((row) => JSON.stringify(row))
      .join("\n") + "\n",
  );
  await write(
    root,
    ".agentplane/context/derived/ontology/page-creation.jsonl",
    JSON.stringify({
      id: "page.payment-api",
      path: "context/wiki/entities/payment-api.md",
      page_type: "concept",
      family_id: "family.entities",
      canonical_entity_ids: ["entity.payment_api"],
      decision: "create_new_page",
      span_refs: ["span.payment-api.0001"],
      source_refs: ["context/raw/specs/payment-api.md#lines=1-6"],
    }) + "\n",
  );
  await write(
    root,
    ".agentplane/context/derived/wiki/topology.plan.json",
    JSON.stringify(
      {
        schema_version: 1,
        mode: "maximum_assimilation",
        topology_version: 1,
        generated_by_task_id: "202605191451-CTXMAX",
        source_shape: {
          primary: "product_docs",
          rationale: "Payment API source is product documentation.",
          evidence_span_ids: ["span.payment-api.0001"],
        },
        canonical_page_families: [
          {
            family_id: "family.entities",
            path_template: "context/wiki/entities/{slug}.md",
            page_type: "concept",
            creation_rule: "Create pages for reusable product entities.",
            page_vs_heading_rule: "Keep local details as headings.",
            source_evidence_span_ids: ["span.payment-api.0001"],
          },
        ],
        canonical_pages: [
          {
            path: "context/wiki/entities/payment-api.md",
            page_type: "concept",
            canonical_entity_ids: ["entity.payment_api"],
            required_sections: ["Sources"],
            source_evidence_span_ids: ["span.payment-api.0001"],
          },
        ],
        forbidden_creation_patterns: ["one page per minor fact"],
      },
      null,
      2,
    ) + "\n",
  );
}

function maxAssimilationTask() {
  return {
    id: "202605191451-CTXMAX",
    status: "DOING",
    owner: "CURATOR",
    task_kind: "context",
    mutation_scope: "context",
    blueprint_request: "context.maximum_assimilation",
    extensions: {
      "agentplane.context": {
        task_type: "context_assimilation",
        mode: "maximum_assimilation",
        allowed_outputs: [
          "context/wiki/**",
          ".agentplane/context/derived/facts/**",
          ".agentplane/context/derived/graph/**",
          ".agentplane/context/derived/reports/**",
        ],
        source_set: {
          files: [{ path: "context/raw/specs/payment-api.md", sha256: "sha256:abc123" }],
        },
      },
    },
    runner: {
      evidence: {
        changed_paths: [
          "context/wiki/index.md",
          "context/wiki/glossary.md",
          "context/wiki/entities/payment-api.md",
          "context/wiki/reports/coverage.md",
          ".agentplane/context/derived/facts/facts.jsonl",
          ".agentplane/context/derived/graph/entities.jsonl",
          ".agentplane/context/derived/graph/edges.jsonl",
          ".agentplane/context/derived/graph/provenance_edges.jsonl",
          ".agentplane/context/derived/reports/coverage.jsonl",
        ],
      },
    },
  };
}

function contextFor(root: string, task: ReturnType<typeof maxAssimilationTask>): CommandContext {
  return {
    resolvedProject: { gitRoot: root },
    config: { paths: { workflow_dir: ".agentplane/tasks" } },
    taskBackend: { getTask: () => Promise.resolve(task) },
    backendId: "local",
    backendConfigPath: path.join(root, ".agentplane/backends/local/backend.json"),
    memo: {},
  } as unknown as CommandContext;
}

describe("maximum-assimilation context verify-task gates", () => {
  it("accepts tasks with glossary, topology, coverage, wikilinks, and graph artifacts", async () => {
    const root = await tempRoot();
    await write(root, "context/raw/specs/payment-api.md", "# Payment API\n\nPublic source.\n");
    await writeMaximumAssimilationArtifacts(root);
    const task = maxAssimilationTask();
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await cmdContextVerifyTask({
      ctx: contextFor(root, task),
      cwd: root,
      parsed: { taskId: task.id },
    });

    expect(out.mock.calls.map((call) => String(call[0])).join("")).toContain(
      "context verify-task 202605191451-CTXMAX: ok",
    );
  });

  it("rejects tasks that skip the root glossary gate", async () => {
    const root = await tempRoot();
    await write(root, "context/raw/specs/payment-api.md", "# Payment API\n\nPublic source.\n");
    await writeMaximumAssimilationArtifacts(root, { glossary: false });
    const task = maxAssimilationTask();
    task.runner.evidence.changed_paths = task.runner.evidence.changed_paths.filter(
      (rel) => rel !== "context/wiki/glossary.md",
    );

    await expect(
      cmdContextVerifyTask({
        ctx: contextFor(root, task),
        cwd: root,
        parsed: { taskId: task.id },
      }),
    ).rejects.toThrow(/maximum-assimilation requires a root glossary file/u);
  });
});
