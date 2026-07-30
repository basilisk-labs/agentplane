import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { CommandContext } from "../commands/shared/task-backend.js";
import type { TaskNewParsed } from "../commands/task/new.js";
import { writeSqliteProjection } from "../commands/context/sqlite.js";
import { cmdContextIngest } from "./ingest.js";
import { inspectContextIngestRuns } from "./ingest-run-diagnostics.js";
import { writeContextExtractionContract, writeContextTaskPack } from "./ingest-task-pack.js";
import { PROJECTION_VERSION } from "./reindex.js";

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
  it("keeps the standalone extraction-contract writer available for compatibility callers", async () => {
    const root = await tempRoot();
    const taskId = "202607021200-CONTRACT";

    const relativePath = await writeContextExtractionContract({ root, taskId });

    expect(relativePath).toBe(`.agentplane/tasks/${taskId}/extraction-contract.json`);
    await expect(readFile(path.join(root, relativePath), "utf8")).resolves.toContain(
      '"sgr_schema_version": 2',
    );
  });

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
      const taskId = "202607021200-CTXPACK";
      tasks.push({ id: taskId, owner: "CURATOR" });
      return {
        task_id: taskId,
        revision: 1,
        backend_id: "local",
        artifact_paths: [`.agentplane/tasks/${taskId}/README.md`],
      };
    });
    const listTasks = vi.fn(() => Promise.resolve([...tasks]));
    const ctx = {
      resolvedProject: { gitRoot: root },
      config: { paths: { workflow_dir: ".agentplane/tasks" } },
      taskBackend: { listTasks },
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
    expect(listTasks).not.toHaveBeenCalled();

    const taskRoot = ".agentplane/tasks/202607021200-CTXPACK";
    const sourceLock = await readJson<{ files: { path: string }[] }>(
      root,
      `${taskRoot}/source-set.lock.json`,
    );
    const expectedArtifacts = await readJson<{ required: string[] }>(
      root,
      `${taskRoot}/expected-artifacts.json`,
    );
    const creationReceipt = await readJson<{
      task_id: string;
      revision: number | null;
      backend_id: string;
      artifact_paths: string[];
    }>(root, `${taskRoot}/task-creation.json`);
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
    }>(root, `${taskRoot}/canonical-snapshot.json`);
    const reconciliationCandidates = await readJson<{
      version: number;
      index: { available: boolean; digest: string | null; fts_results_per_query: number };
      candidate_digest: string;
      semantic_decision_owner: string;
      candidate_groups: {
        query: string;
        source_paths: string[];
        source_span_ids: string[];
        candidates: unknown[];
      }[];
    }>(root, `${taskRoot}/canonical-reconciliation-candidates.json`);
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
    expect(creationReceipt).toEqual({
      task_id: "202607021200-CTXPACK",
      revision: 1,
      backend_id: "local",
      artifact_paths: [".agentplane/tasks/202607021200-CTXPACK/README.md"],
      version: 1,
    });
    expect(spans[0]).toMatchObject({ source_path: "context/raw/specs/payment-api.md" });
    expect(spans[0]?.span_id).toMatch(/^span\.[a-f0-9]{12}\.[a-f0-9]{12}\.1$/u);
    expect(contextPack).toContain("Generated spans: 1.");
    expect(contextPack).toContain("CLI-owned receipt");
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
      version: 3,
      surfaces: {
        wiki: { file_count: 1 },
        facts: { row_count: 1 },
        graph_entities: { row_count: 1 },
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
    expect(reconciliationCandidates).toMatchObject({
      version: 1,
      index: { available: false, digest: null, fts_results_per_query: 20 },
      semantic_decision_owner: "CURATOR",
    });
    expect(reconciliationCandidates.candidate_digest).toMatch(/^sha256:[a-f0-9]{64}$/u);
    expect(reconciliationCandidates.candidate_groups).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          query: "payment api",
          source_paths: ["context/raw/specs/payment-api.md"],
          source_span_ids: [expect.stringMatching(/^span\./u)],
        }),
      ]),
    );
    expect(expectedArtifacts.required).toContain(`${taskRoot}/source-spans.skeleton.jsonl`);
    expect(expectedArtifacts.required).toContain(`${taskRoot}/task-creation.json`);
    expect(expectedArtifacts.required).toContain(`${taskRoot}/extraction-contract.json`);
    expect(expectedArtifacts.required).toContain(`${taskRoot}/canonical-entity-catalog.json`);
    expect(expectedArtifacts.required).toContain(
      `${taskRoot}/canonical-reconciliation-candidates.json`,
    );
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
        ".agentplane/tasks/${taskId}/canonical-reconciliation-candidates.json",
        ".agentplane/tasks/${taskId}/source-set.lock.json",
        ".agentplane/tasks/${taskId}/source-spans.skeleton.jsonl",
        ".agentplane/tasks/${taskId}/expected-artifacts.json",
      ]),
    );
    expect(parsedAllowedOutputs).not.toContain(".agentplane/tasks/${taskId}/task-creation.json");
    expect(parsedTaskDocSections?.Plan).toContain("Let CURATOR reconcile");
    expect(parsedTaskDocSections?.["Verify Steps"]).toContain("CLI-owned `task-creation.json`");
    expect(parsedTaskDocSections?.["Verify Steps"]).toContain(
      "same_as/alias_of reuse an existing canonical ID",
    );
    expect(parsedTaskDocSections?.Findings).toContain("Semantic identity is agent-owned");
  });

  it("builds stable source-driven candidates beyond the former alphabetical first-50 slice", async () => {
    const root = await tempRoot();
    const taskId = "202607021203-CANDID";
    const sourcePath = "context/raw/specs/payment-api.md";
    const structuredSourcePath = "context/raw/specs/payment-terms.json";
    const deletedSourcePath = "context/raw/specs/removed-payment-api.md";
    const unreadableSourcePath = "context/raw/specs/unreadable-payment-api.md";
    await write(
      root,
      sourcePath,
      "# Payment API\n\nUse the legacy Payment Gateway name only in migration notes.\n",
    );
    await write(
      root,
      "context/wiki/payment-api.md",
      "# Payment API\n\nCanonical payment contract.\n",
    );
    await write(root, structuredSourcePath, JSON.stringify({ title: "Payment Gateway" }));
    const fillerEntities = Array.from({ length: 55 }, (_, index) => ({
      id: `entity.${String(index).padStart(3, "0")}`,
      kind: "concept",
      label: `Filler ${index}`,
    }));
    const paymentApi = {
      id: "entity.zz-payment-api",
      kind: "service",
      label: "Payment API",
      source_refs: ["context/raw/specs/legacy-payments.md#L1-L4"],
    };
    await write(
      root,
      ".agentplane/context/derived/graph/entities.jsonl",
      [...fillerEntities, paymentApi].map((row) => JSON.stringify(row)).join("\n") + "\n",
    );
    await write(
      root,
      ".agentplane/context/derived/ontology/aliases.jsonl",
      `${JSON.stringify({
        id: "alias.payment-gateway",
        alias: "Payment Gateway",
        canonical_entity_id: paymentApi.id,
      })}\n`,
    );
    await write(
      root,
      ".agentplane/context/derived/graph/edges.jsonl",
      `${JSON.stringify({
        id: "edge.payment-api.uses.ledger",
        from: paymentApi.id,
        to: "entity.010",
        relation: "uses",
      })}\n`,
    );
    await write(
      root,
      ".agentplane/context/derived/wiki/page-manifests.jsonl",
      `${JSON.stringify({
        id: "page.payment-api",
        path: "context/wiki/payment-api.md",
        canonical_entity_ids: [paymentApi.id],
      })}\n`,
    );
    await writeSqliteProjection(path.join(root, ".agentplane", "cache.sqlite"), {
      metadata: {
        projection_version: PROJECTION_VERSION,
        generated_at: "2026-07-02T12:03:00.000Z",
        workspace_hash: "fixture-reconciliation-index",
        include_tasks: false,
        include_raw: false,
        source_bytes: 100,
        search_text_bytes: 100,
        preview_text_bytes: 100,
        projection_elapsed_ms: 1,
      },
      rows: [
        {
          path: ".agentplane/context/derived/graph/entities.jsonl#entity=entity.zz-payment-api",
          sha256: "payment-api-graph-row",
          content_type: "application/json",
          projection_version: PROJECTION_VERSION,
          indexed_at: "2026-07-02T12:03:00.000Z",
          size_bytes: 50,
          kind: "jsonl-row",
          search_text: "Payment API service",
          preview_text: "Payment API service",
          source_refs: paymentApi.source_refs,
        },
        {
          path: "context/wiki/payment-api.md#section=payment-api",
          sha256: "payment-api-wiki-row",
          content_type: "text/markdown",
          projection_version: PROJECTION_VERSION,
          indexed_at: "2026-07-02T12:03:00.000Z",
          size_bytes: 50,
          kind: "markdown-section",
          search_text: "Payment API canonical contract",
          preview_text: "Payment API canonical contract",
          source_refs: ["context/wiki/payment-api.md#section=payment-api"],
        },
      ],
    });
    const sources = [
      {
        path: sourcePath,
        sha256: "sha256:payment-api-source",
        size_bytes: 74,
        mtime: "2026-07-02T12:03:00.000Z",
        content_type: "text/markdown",
        status: "new" as const,
      },
      {
        path: structuredSourcePath,
        sha256: "sha256:payment-terms-source",
        size_bytes: 27,
        mtime: "2026-07-02T12:03:00.000Z",
        content_type: "application/json",
        status: "new" as const,
      },
      {
        path: deletedSourcePath,
        sha256: "sha256:removed-payment-api-source",
        size_bytes: 0,
        mtime: "2026-07-02T12:03:00.000Z",
        content_type: "text/markdown",
        status: "deleted" as const,
      },
      {
        path: unreadableSourcePath,
        sha256: "sha256:unreadable-payment-api-source",
        size_bytes: 32,
        mtime: "2026-07-02T12:03:00.000Z",
        content_type: "text/markdown",
        status: "new" as const,
      },
    ];
    const creation = {
      task_id: taskId,
      revision: 1,
      backend_id: "local",
      artifact_paths: [`.agentplane/tasks/${taskId}/README.md`],
    };
    const generatedAt = "2026-07-02T12:03:00.000Z";
    await writeContextTaskPack({ root, taskId, sources, creation, generatedAt });
    const first = await readJson<{
      index: { available: boolean; digest: string | null };
      candidate_digest: string;
      candidate_groups: {
        query: string;
        origins: string[];
        candidates: {
          canonical_entity_id: string;
          score: number;
          reasons: string[];
          evidence_refs: string[];
        }[];
      }[];
    }>(root, `.agentplane/tasks/${taskId}/canonical-reconciliation-candidates.json`);
    await writeContextTaskPack({ root, taskId, sources, creation, generatedAt });
    const second = await readJson(
      root,
      `.agentplane/tasks/${taskId}/canonical-reconciliation-candidates.json`,
    );

    const paymentGroup = first.candidate_groups.find((group) => group.query === "payment api");
    const paymentCandidate = paymentGroup?.candidates.find(
      (candidate) => candidate.canonical_entity_id === paymentApi.id,
    );
    const aliasGroup = first.candidate_groups.find((group) => group.query === "payment gateway");
    const aliasCandidate = aliasGroup?.candidates.find(
      (candidate) => candidate.canonical_entity_id === paymentApi.id,
    );
    if (!paymentCandidate || !aliasGroup || !aliasCandidate) {
      throw new Error("expected source-driven payment candidates are missing");
    }
    expect(paymentCandidate.score).toBeTypeOf("number");
    for (const reason of ["label_exact", "fts_graph_entity", "fts_page_family"]) {
      expect(paymentCandidate.reasons).toContain(reason);
    }
    for (const ref of [
      ".agentplane/context/derived/graph/entities.jsonl#entity=entity.zz-payment-api",
      "context/wiki/payment-api.md#section=payment-api",
    ]) {
      expect(paymentCandidate.evidence_refs).toContain(ref);
    }
    expect(first.index.available).toBe(true);
    expect(first.index.digest).toMatch(/^sha256:/u);
    expect(aliasGroup.origins).toContain("structured_field");
    expect(aliasCandidate.reasons).toContain("alias_exact");
    expect(first.candidate_groups).not.toContainEqual(
      expect.objectContaining({ query: "removed payment api" }),
    );
    expect(first.candidate_groups).not.toContainEqual(
      expect.objectContaining({ query: "unreadable payment api" }),
    );
    expect(first.candidate_digest).toMatch(/^sha256:[a-f0-9]{64}$/u);
    expect(second).toEqual(first);
  });

  it("persists the exact creation receipt before a later task-pack failure", async () => {
    const root = await tempRoot();
    await write(root, "context/raw/partial.md", "# Partial\n\nKeep the task identity.\n");
    const taskId = "202607021201-RECOVR";
    const ctx = {
      resolvedProject: { gitRoot: root },
      config: { paths: { workflow_dir: ".agentplane/tasks" } },
      taskBackend: { listTasks: vi.fn(() => Promise.resolve([])) },
      backendId: "local",
      backendConfigPath: path.join(root, ".agentplane/backends/local/backend.json"),
      memo: {},
    } as unknown as CommandContext;

    await expect(
      cmdContextIngest({
        ctx,
        cwd: root,
        parsed: { sources: [], mode: "changed", dryRun: false, indexOnly: false },
        createTask: () =>
          Promise.resolve({
            task_id: taskId,
            revision: 1,
            backend_id: "local",
            artifact_paths: [`.agentplane/tasks/${taskId}/README.md`],
          }),
        writeTaskPack: () => Promise.reject(new Error("forced task-pack failure")),
      }),
    ).rejects.toThrow(/forced task-pack failure/u);

    await expect(
      readJson<{
        task_id: string;
        revision: number | null;
        backend_id: string;
        artifact_paths: string[];
      }>(root, `.agentplane/tasks/${taskId}/task-creation.json`),
    ).resolves.toMatchObject({
      task_id: taskId,
      revision: 1,
      backend_id: "local",
      artifact_paths: [`.agentplane/tasks/${taskId}/README.md`],
    });
  });

  it("resumes a journaled task creation after task-pack failure without creating a duplicate task", async () => {
    const root = await tempRoot();
    await write(root, "context/raw/retry.md", "# Retry\n\nPersisted source.\n");
    const taskId = "202607021202-RETRY1";
    const ctx = {
      resolvedProject: { gitRoot: root },
      config: { paths: { workflow_dir: ".agentplane/tasks" } },
      taskBackend: { listTasks: vi.fn(() => Promise.resolve([])) },
      backendId: "local",
      backendConfigPath: path.join(root, ".agentplane/backends/local/backend.json"),
      memo: {},
    } as unknown as CommandContext;
    const createTask = vi.fn(() =>
      Promise.resolve({
        task_id: taskId,
        revision: 1,
        backend_id: "local",
        artifact_paths: [`.agentplane/tasks/${taskId}/README.md`],
      }),
    );
    let packAttempt = 0;
    const writeTaskPack = vi.fn(() => {
      packAttempt += 1;
      if (packAttempt === 1) throw new Error("forced task-pack failure");
      return Promise.resolve({
        taskDir: path.join(root, ".agentplane/tasks", taskId),
        spanCount: 1,
      });
    });
    const parsed = { sources: [], mode: "changed" as const, dryRun: false, indexOnly: false };

    await expect(
      cmdContextIngest({ ctx, cwd: root, parsed, createTask, writeTaskPack }),
    ).rejects.toThrow(/forced task-pack failure/u);
    await expect(
      cmdContextIngest({ ctx, cwd: root, parsed, createTask, writeTaskPack }),
    ).resolves.toBe(0);

    expect(createTask).toHaveBeenCalledTimes(1);
    expect(writeTaskPack).toHaveBeenCalledTimes(2);
    const ingestRunDirectory = await readdir(path.join(root, ".agentplane/context/ingest-runs"));
    const journalFiles = ingestRunDirectory.filter((entry) => entry.endsWith(".json"));
    expect(journalFiles).toHaveLength(1);
    await expect(
      readJson<{ phase: string }>(root, `.agentplane/context/ingest-runs/${journalFiles[0]}`),
    ).resolves.toMatchObject({
      phase: "pack_written",
    });
  });

  it("keeps task creation fail-closed when a backend error may follow a persisted write", async () => {
    const root = await tempRoot();
    await write(
      root,
      "context/raw/unknown-task.md",
      "# Unknown\n\nBackend outcome is uncertain.\n",
    );
    const ctx = {
      resolvedProject: { gitRoot: root },
      config: { paths: { workflow_dir: ".agentplane/tasks" } },
      taskBackend: { listTasks: vi.fn(() => Promise.resolve([])) },
      backendId: "cloud",
      backendConfigPath: path.join(root, ".agentplane/backends/cloud/backend.json"),
      memo: {},
    } as unknown as CommandContext;
    const createTask = vi.fn(() => Promise.reject(new Error("forced backend push failure")));
    const parsed = { sources: [], mode: "changed" as const, dryRun: false, indexOnly: false };

    await expect(cmdContextIngest({ ctx, cwd: root, parsed, createTask })).rejects.toThrow(
      /forced backend push failure/u,
    );
    await expect(cmdContextIngest({ ctx, cwd: root, parsed, createTask })).rejects.toThrow(
      /unknown task creation outcome/u,
    );

    expect(createTask).toHaveBeenCalledTimes(1);
    const diagnostics = await inspectContextIngestRuns(root);
    expect(
      diagnostics.some(
        (diagnostic) =>
          diagnostic.level === "issue" &&
          diagnostic.message.includes("unknown task creation outcome"),
      ),
    ).toBe(true);
  });

  it("rejects a concurrent retry of the same resumable run while its executor is active", async () => {
    const root = await tempRoot();
    await write(
      root,
      "context/raw/concurrent.md",
      "# Concurrent\n\nOnly one task may be created.\n",
    );
    const ctx = {
      resolvedProject: { gitRoot: root },
      config: { paths: { workflow_dir: ".agentplane/tasks" } },
      taskBackend: { listTasks: vi.fn(() => Promise.resolve([])) },
      backendId: "local",
      backendConfigPath: path.join(root, ".agentplane/backends/local/backend.json"),
      memo: {},
    } as unknown as CommandContext;
    const taskId = "202607021207-CONCUR";
    const createTask = vi.fn(() =>
      Promise.resolve({
        task_id: taskId,
        revision: 1,
        backend_id: "local",
        artifact_paths: [`.agentplane/tasks/${taskId}/README.md`],
      }),
    );
    const parsed = { sources: [], mode: "changed" as const, dryRun: false, indexOnly: false };
    let releaseFirst: (() => void) | undefined;
    const firstPaused = new Promise<void>((resolve) => {
      releaseFirst = resolve;
    });
    let signalFirstPhase: (() => void) | undefined;
    const firstReachedPhase = new Promise<void>((resolve) => {
      signalFirstPhase = resolve;
    });
    const first = cmdContextIngest({
      ctx,
      cwd: root,
      parsed,
      createTask,
      afterJournalPhase: async (phase) => {
        if (phase !== "source_set_locked") return;
        signalFirstPhase?.();
        await firstPaused;
      },
    });
    await firstReachedPhase;

    await expect(cmdContextIngest({ ctx, cwd: root, parsed, createTask })).rejects.toThrow(
      /already executing/u,
    );
    releaseFirst?.();
    await expect(first).resolves.toBe(0);
    expect(createTask).toHaveBeenCalledTimes(1);
  });

  for (const crashPhase of [
    "source_set_locked",
    "task_created",
    "pack_writing",
    "pack_written",
  ] as const) {
    it(`resumes safely after a crash at the ${crashPhase} journal boundary`, async () => {
      const root = await tempRoot();
      await write(
        root,
        `context/raw/${crashPhase}.md`,
        `# ${crashPhase}\n\nPersist this source.\n`,
      );
      const taskId = `20260702120-${crashPhase.slice(0, 6)}`;
      const ctx = {
        resolvedProject: { gitRoot: root },
        config: { paths: { workflow_dir: ".agentplane/tasks" } },
        taskBackend: { listTasks: vi.fn(() => Promise.resolve([])) },
        backendId: "local",
        backendConfigPath: path.join(root, ".agentplane/backends/local/backend.json"),
        memo: {},
      } as unknown as CommandContext;
      const createTask = vi.fn(() =>
        Promise.resolve({
          task_id: taskId,
          revision: 1,
          backend_id: "local",
          artifact_paths: [`.agentplane/tasks/${taskId}/README.md`],
        }),
      );
      const writeTaskPack = vi.fn(() =>
        Promise.resolve({ taskDir: path.join(root, ".agentplane/tasks", taskId), spanCount: 1 }),
      );
      const parsed = { sources: [], mode: "changed" as const, dryRun: false, indexOnly: false };

      await expect(
        cmdContextIngest({
          ctx,
          cwd: root,
          parsed,
          createTask,
          writeTaskPack,
          afterJournalPhase: (phase) => {
            if (phase === crashPhase) throw new Error(`forced ${crashPhase} crash`);
          },
        }),
      ).rejects.toThrow(`forced ${crashPhase} crash`);
      await expect(
        cmdContextIngest({ ctx, cwd: root, parsed, createTask, writeTaskPack }),
      ).resolves.toBe(0);

      expect(createTask).toHaveBeenCalledTimes(1);
      expect(writeTaskPack).toHaveBeenCalledTimes(1);
    });
  }

  it("rejects a resume when the journaled source fingerprint changed", async () => {
    const root = await tempRoot();
    await write(root, "context/raw/fingerprint.md", "# Fingerprint\n\nFirst version.\n");
    const taskId = "202607021203-FINGER";
    const ctx = {
      resolvedProject: { gitRoot: root },
      config: { paths: { workflow_dir: ".agentplane/tasks" } },
      taskBackend: { listTasks: vi.fn(() => Promise.resolve([])) },
      backendId: "local",
      backendConfigPath: path.join(root, ".agentplane/backends/local/backend.json"),
      memo: {},
    } as unknown as CommandContext;
    const createTask = vi.fn(() =>
      Promise.resolve({
        task_id: taskId,
        revision: 1,
        backend_id: "local",
        artifact_paths: [`.agentplane/tasks/${taskId}/README.md`],
      }),
    );
    const parsed = { sources: [], mode: "changed" as const, dryRun: false, indexOnly: false };

    await expect(
      cmdContextIngest({
        ctx,
        cwd: root,
        parsed,
        createTask,
        writeTaskPack: () => Promise.reject(new Error("forced task-pack failure")),
      }),
    ).rejects.toThrow(/forced task-pack failure/u);
    await write(root, "context/raw/fingerprint.md", "# Fingerprint\n\nChanged version.\n");

    await expect(
      cmdContextIngest({
        ctx,
        cwd: root,
        parsed,
        createTask,
        writeTaskPack: vi.fn(),
      }),
    ).rejects.toThrow(/selected source fingerprint changed/u);
    expect(createTask).toHaveBeenCalledTimes(1);
  });

  it("diagnoses manifest/run divergence before a resumable task creation continues", async () => {
    const root = await tempRoot();
    await write(root, "context/raw/manifest.md", "# Manifest\n\nKeep the locked source set.\n");
    const ctx = {
      resolvedProject: { gitRoot: root },
      config: { paths: { workflow_dir: ".agentplane/tasks" } },
      taskBackend: { listTasks: vi.fn(() => Promise.resolve([])) },
      backendId: "local",
      backendConfigPath: path.join(root, ".agentplane/backends/local/backend.json"),
      memo: {},
    } as unknown as CommandContext;
    const parsed = { sources: [], mode: "changed" as const, dryRun: false, indexOnly: false };

    await expect(
      cmdContextIngest({
        ctx,
        cwd: root,
        parsed,
        afterJournalPhase: (phase) => {
          if (phase === "source_set_locked") throw new Error("forced source-lock crash");
        },
      }),
    ).rejects.toThrow(/forced source-lock crash/u);
    await write(
      root,
      ".agentplane/context/manifest.lock.json",
      JSON.stringify({
        version: 1,
        generated_at: new Date(0).toISOString(),
        workspace_hash: "sha256:manually-diverged",
        sources: [],
      }),
    );

    await expect(cmdContextIngest({ ctx, cwd: root, parsed })).rejects.toThrow(
      /manifest\/run fingerprints diverged/u,
    );
    const diagnostics = await inspectContextIngestRuns(root);
    expect(
      diagnostics.some(
        (diagnostic) =>
          diagnostic.level === "issue" && diagnostic.message.includes("manifest/run divergence"),
      ),
    ).toBe(true);
  });

  it("keeps a single source-set lock while a different ingestion request is incomplete", async () => {
    const root = await tempRoot();
    await write(root, "context/raw/first.md", "# First\n\nFirst ingestion request.\n");
    await write(root, "context/raw/second.md", "# Second\n\nSecond ingestion request.\n");
    const ctx = {
      resolvedProject: { gitRoot: root },
      config: { paths: { workflow_dir: ".agentplane/tasks" } },
      taskBackend: { listTasks: vi.fn(() => Promise.resolve([])) },
      backendId: "local",
      backendConfigPath: path.join(root, ".agentplane/backends/local/backend.json"),
      memo: {},
    } as unknown as CommandContext;
    const createTask = vi.fn();

    await expect(
      cmdContextIngest({
        ctx,
        cwd: root,
        parsed: {
          sources: ["context/raw/first.md"],
          mode: "sources",
          dryRun: false,
          indexOnly: false,
        },
        createTask,
        afterJournalPhase: (phase) => {
          if (phase === "source_set_locked") throw new Error("forced source-lock crash");
        },
      }),
    ).rejects.toThrow(/forced source-lock crash/u);

    await expect(
      cmdContextIngest({
        ctx,
        cwd: root,
        parsed: {
          sources: ["context/raw/second.md"],
          mode: "sources",
          dryRun: false,
          indexOnly: false,
        },
        createTask,
      }),
    ).rejects.toThrow(/owns the source-set lock/u);
    expect(createTask).not.toHaveBeenCalled();
    await expect(
      readdir(path.join(root, ".agentplane/context/ingest-runs/active")),
    ).resolves.toEqual(["source-set.lock.json"]);
  });

  it("reports task and receipt divergence after a crash at the task-created boundary", async () => {
    const root = await tempRoot();
    await write(root, "context/raw/divergence.md", "# Divergence\n\nKeep evidence.\n");
    const taskId = "202607021204-DIVRGN";
    const ctx = {
      resolvedProject: { gitRoot: root },
      config: { paths: { workflow_dir: ".agentplane/tasks" } },
      taskBackend: { listTasks: vi.fn(() => Promise.resolve([])) },
      backendId: "local",
      backendConfigPath: path.join(root, ".agentplane/backends/local/backend.json"),
      memo: {},
    } as unknown as CommandContext;

    await expect(
      cmdContextIngest({
        ctx,
        cwd: root,
        parsed: { sources: [], mode: "changed", dryRun: false, indexOnly: false },
        createTask: () =>
          Promise.resolve({
            task_id: taskId,
            revision: 1,
            backend_id: "local",
            artifact_paths: [`.agentplane/tasks/${taskId}/README.md`],
          }),
        afterJournalPhase: (phase) => {
          if (phase === "task_created") throw new Error("forced task-created crash");
        },
      }),
    ).rejects.toThrow(/forced task-created crash/u);

    const diagnostics = await inspectContextIngestRuns(root);
    expect(
      diagnostics.some(
        (diagnostic) =>
          diagnostic.level === "issue" && diagnostic.message.includes("task/receipt divergence"),
      ),
    ).toBe(true);
  });
});
