import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { CommandContext } from "../commands/shared/task-backend.js";
import type { TaskNewParsed } from "../commands/task/new.js";
import { cmdContextIngest } from "./ingest.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-ingest-pack-"));
  tempRoots.push(root);
  return root;
}

afterEach(async () => {
  vi.restoreAllMocks();
  for (const root of tempRoots) await rm(root, { recursive: true, force: true });
  tempRoots = [];
});

async function write(root: string, rel: string, text: string): Promise<void> {
  const target = path.join(root, rel);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, text, "utf8");
}

async function readJson<T>(root: string, rel: string): Promise<T> {
  return JSON.parse(await readFile(path.join(root, rel), "utf8")) as T;
}

describe("context ingest task pack", () => {
  it("creates task-bound source lock, canonical snapshot, span skeleton, context pack, and expected artifacts", async () => {
    const root = await tempRoot();
    await write(root, "context/raw/specs/payment-api.md", "# Payment API\n\nStable contract.\n");
    await write(
      root,
      "context/wiki/payments.md",
      "---\ntitle: Payments\n---\n\n# Payments\n\nSee [[payment-api|Payment API]].\n",
    );
    await write(
      root,
      ".agentplane/context/derived/graph/entities.jsonl",
      `${JSON.stringify({
        id: "entity.payments",
        kind: "concept",
        label: "Payments",
        summary: "Canonical payments concept.",
        source_refs: ["context/raw/specs/legacy-payments.md#L1-L4"],
      })}\n`,
    );
    await write(
      root,
      ".agentplane/context/derived/ontology/aliases.jsonl",
      `${JSON.stringify({
        id: "alias.payments.billing",
        alias: "Billing",
        canonical_entity_id: "entity.payments",
      })}\n`,
    );
    await write(
      root,
      ".agentplane/context/derived/graph/edges.jsonl",
      `${JSON.stringify({
        id: "edge.payments.uses.ledger",
        from: "entity.payments",
        to: "entity.ledger",
        relation: "uses",
      })}\n`,
    );
    await write(
      root,
      ".agentplane/context/derived/wiki/page-manifests.jsonl",
      `${JSON.stringify({
        id: "page.payments",
        path: "context/wiki/payments.md",
        canonical_entity_ids: ["entity.payments"],
      })}\n`,
    );
    await write(
      root,
      ".agentplane/context/derived/facts/facts.jsonl",
      `${JSON.stringify({ id: "fact.payments", summary: "Payments are documented." })}\n`,
    );
    vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    const tasks: { id: string; owner: string }[] = [];
    let parsedAllowedOutputs: string[] = [];
    let parsedTaskDocSections: TaskNewParsed["taskDocSections"];
    const createTask = vi.fn(({ parsed }: { parsed: TaskNewParsed }) => {
      const contextExtension = parsed.extensions?.["agentplane.context"] as
        | { allowed_outputs?: string[] }
        | undefined;
      parsedAllowedOutputs = contextExtension?.allowed_outputs ?? [];
      parsedTaskDocSections = parsed.taskDocSections;
      tasks.push({ id: "202607021200-CTXPACK", owner: "CURATOR" });
    });
    const ctx = {
      resolvedProject: { gitRoot: root },
      config: { paths: { workflow_dir: ".agentplane/tasks" } },
      taskBackend: { listTasks: () => Promise.resolve([...tasks]) },
      backendId: "local",
      backendConfigPath: path.join(root, ".agentplane/backends/local/backend.json"),
      memo: {},
    } as unknown as CommandContext;

    await cmdContextIngest({
      ctx,
      cwd: root,
      parsed: { sources: [], mode: "changed", dryRun: false, indexOnly: false },
      createTask,
    });

    const taskRoot = ".agentplane/tasks/202607021200-CTXPACK";
    const sourceLock = await readJson<{ files: { path: string }[] }>(
      root,
      `${taskRoot}/source-set.lock.json`,
    );
    const expectedArtifacts = await readJson<{ required: string[] }>(
      root,
      `${taskRoot}/expected-artifacts.json`,
    );
    const extractionContract = await readJson<{
      version: number;
      sgr_schema_version: number;
      typed_payloads: Record<string, string[]>;
      conditional_required: { when: { equals: string }; required: string[] }[];
      example: { extracted_items: { kind: string }[] };
    }>(root, `${taskRoot}/extraction-contract.json`);
    const canonicalSnapshot = await readJson<{
      version: number;
      surfaces: {
        wiki: { file_count: number; sha256: string };
        facts: { row_count: number; sha256: string };
        graph_entities: { row_count: number; sha256: string };
      };
      candidates: {
        wiki_pages: { path: string; title: string }[];
        graph_entities: { id: string; label: string }[];
      };
    }>(root, `${taskRoot}/canonical-snapshot.json`);
    const canonicalEntityCatalog = await readJson<{
      version: number;
      entity_count: number;
      catalog_sha256: string;
      entities: {
        id: string;
        label: string;
        aliases: string[];
        source_refs: string[];
        wiki_paths: string[];
        relations: unknown[];
      }[];
    }>(root, `${taskRoot}/canonical-entity-catalog.json`);
    const skeletonText = await readFile(
      path.join(root, taskRoot, "source-spans.skeleton.jsonl"),
      "utf8",
    );
    const spans = skeletonText
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line) as { span_id: string; source_path: string });
    const contextPack = await readFile(path.join(root, taskRoot, "context-pack.md"), "utf8");

    expect(sourceLock.files).toMatchObject([{ path: "context/raw/specs/payment-api.md" }]);
    expect(spans[0]).toMatchObject({ source_path: "context/raw/specs/payment-api.md" });
    expect(spans[0]?.span_id).toMatch(/^span\.[a-f0-9]{12}\.[a-f0-9]{12}\.1$/u);
    expect(contextPack).toContain("Generated spans: 1.");
    expect(contextPack).toContain("exact SGR v2 payload requirements");
    expect(contextPack).toContain("CURATOR must decide meaning");
    expect(contextPack).toContain("stable ID equality");
    expect(extractionContract).toMatchObject({ version: 2, sgr_schema_version: 2 });
    expect(extractionContract.typed_payloads.topology_decision).toContain(
      "topology_decision.source_shape.rationale",
    );
    expect(extractionContract.conditional_required).toContainEqual({
      when: {
        field: "entity_resolution.resolution",
        equals: "new_entity_proposal",
      },
      required: [
        "entity_resolution.proposed_entity_id",
        "entity_resolution.why_not_existing|why_not_alias_of_existing",
      ],
    });
    expect(extractionContract.example.extracted_items.map((item) => item.kind)).toEqual(
      expect.arrayContaining([
        "entity_resolution",
        "page_creation",
        "topology_decision",
        "coverage",
      ]),
    );
    expect(canonicalSnapshot).toMatchObject({
      version: 2,
      surfaces: {
        wiki: { file_count: 1 },
        facts: { row_count: 1 },
        graph_entities: { row_count: 1 },
      },
      candidates: {
        wiki_pages: [{ path: "context/wiki/payments.md", title: "Payments" }],
        graph_entities: [{ id: "entity.payments", label: "Payments" }],
      },
    });
    expect(canonicalSnapshot.surfaces.wiki.sha256).toMatch(/^sha256:[a-f0-9]{64}$/u);
    expect(canonicalSnapshot.surfaces.facts.sha256).toMatch(/^sha256:[a-f0-9]{64}$/u);
    expect(canonicalSnapshot.surfaces.graph_entities.sha256).toMatch(/^sha256:[a-f0-9]{64}$/u);
    expect(canonicalEntityCatalog).toMatchObject({
      version: 1,
      entity_count: 1,
      entities: [
        {
          id: "entity.payments",
          label: "Payments",
          aliases: ["Billing"],
          source_refs: ["context/raw/specs/legacy-payments.md#L1-L4"],
          wiki_paths: ["context/wiki/payments.md"],
          relations: [
            {
              direction: "outgoing",
              relation: "uses",
              entity_id: "entity.ledger",
              edge_id: "edge.payments.uses.ledger",
            },
          ],
        },
      ],
    });
    expect(canonicalEntityCatalog.catalog_sha256).toMatch(/^sha256:[a-f0-9]{64}$/u);
    expect(expectedArtifacts.required).toContain(`${taskRoot}/source-spans.skeleton.jsonl`);
    expect(expectedArtifacts.required).toContain(`${taskRoot}/extraction-contract.json`);
    expect(expectedArtifacts.required).toContain(`${taskRoot}/canonical-entity-catalog.json`);
    expect(expectedArtifacts.required).toEqual(
      expect.arrayContaining([
        ".agentplane/context/derived/ontology/entity-resolution.jsonl",
        ".agentplane/context/derived/ontology/page-creation.jsonl",
        ".agentplane/context/derived/sources/source-spans.jsonl",
        ".agentplane/context/derived/wiki/topology.plan.json",
        ".agentplane/context/derived/wiki/link-index.jsonl",
        ".agentplane/context/derived/wiki/orphan-report.jsonl",
        ".agentplane/context/derived/reports/evaluator.jsonl",
        "context/wiki/reports/topology.md",
        "context/wiki/reports/coverage.md",
        "context/wiki/reports/conflicts.md",
        "context/wiki/reports/open-questions.md",
        "context/wiki/reports/evaluator-review.md",
      ]),
    );
    expect(parsedAllowedOutputs).toEqual(
      expect.arrayContaining([
        ".agentplane/context/derived/claims/**",
        ".agentplane/context/derived/ontology/**",
        ".agentplane/context/derived/sources/**",
        ".agentplane/context/derived/wiki/**",
        ".agentplane/tasks/${taskId}/context-pack.md",
        ".agentplane/tasks/${taskId}/extraction-contract.json",
        ".agentplane/tasks/${taskId}/canonical-snapshot.json",
        ".agentplane/tasks/${taskId}/canonical-entity-catalog.json",
        ".agentplane/tasks/${taskId}/source-set.lock.json",
        ".agentplane/tasks/${taskId}/source-spans.skeleton.jsonl",
        ".agentplane/tasks/${taskId}/expected-artifacts.json",
      ]),
    );
    expect(parsedTaskDocSections?.Plan).toContain("Let CURATOR reconcile");
    expect(parsedTaskDocSections?.["Verify Steps"]).toContain(
      "same_as/alias_of reuse an existing canonical ID",
    );
    expect(parsedTaskDocSections?.Findings).toContain("Semantic identity is agent-owned");
  });
});
