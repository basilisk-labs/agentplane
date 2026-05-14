/* eslint-disable @typescript-eslint/require-await */
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { CommandContext } from "../shared/task-backend.js";
import { cmdContextIngest } from "./ingest.js";
import { cmdContextReindex, readContextProjection } from "./reindex.js";
import { cmdContextSearch } from "./search.js";
import { cmdContextShow } from "./show.js";
import { cmdContextVerifyTask } from "./verify-task.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-context-release-"));
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

describe("context release readiness guards", () => {
  it("indexes stable section refs and excludes private raw files from projection", async () => {
    const root = await tempRoot();
    await write(
      root,
      "context/wiki/payments.md",
      "# Payments\n\nIntro\n\n## Refund Idempotency\n\nRefunds are idempotent.\n\n## Refund Idempotency\n\nDuplicate heading stays addressable.\n",
    );
    await write(root, "context/raw/specs/payment-api.md", "# Payment API\n\nPublic source.\n");
    await write(root, "context/raw/private/secret.md", "# Secret\n\nDo not index.\n");

    await cmdContextReindex({
      cwd: root,
      parsed: { includeTasks: false, includeRaw: true, reset: false },
    });

    const projection = await readContextProjection(root);
    expect(
      projection?.rows.some((row) => row.path === "context/wiki/payments.md#section=payments"),
    ).toBe(true);
    expect(
      projection?.rows.some(
        (row) => row.path === "context/wiki/payments.md#section=refund-idempotency",
      ),
    ).toBe(true);
    expect(
      projection?.rows.some(
        (row) => row.path === "context/wiki/payments.md#section=refund-idempotency-2",
      ),
    ).toBe(true);
    const fileRow = projection?.rows.find((row) => row.path === "context/wiki/payments.md");
    const sectionRow = projection?.rows.find(
      (row) => row.path === "context/wiki/payments.md#section=refund-idempotency",
    );
    expect(sectionRow?.sha256).toBe(fileRow?.sha256);
    expect(projection?.rows.some((row) => row.path.includes("context/raw/private"))).toBe(false);
  });

  it("does not mark fresh markdown section projection rows as stale", async () => {
    const root = await tempRoot();
    await write(
      root,
      "context/wiki/payments.md",
      "# Payments\n\nIntro\n\n## Refund Idempotency\n\nRefunds are idempotent.\n",
    );
    await cmdContextReindex({
      cwd: root,
      parsed: { includeTasks: false, includeRaw: true, reset: false },
    });
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await cmdContextSearch({
      cwd: root,
      parsed: {
        query: "refunds",
        scope: "context",
        format: "json",
        explain: false,
      },
    });

    const payload = JSON.parse(out.mock.calls.map((call) => String(call[0])).join("")) as {
      results: { ref: string; freshness: { stale: boolean } }[];
    };
    const sectionResult = payload.results.find(
      (result) => result.ref === "context/wiki/payments.md#section=refund-idempotency",
    );
    expect(sectionResult?.freshness.stale).toBe(false);
  });

  it("does not mark fresh JSONL fact and graph projection rows as stale", async () => {
    const root = await tempRoot();
    await write(
      root,
      ".agentplane/context/derived/facts/facts.jsonl",
      [
        {
          id: "fact:meridian-relay:stages",
          subject: "Meridian Relay",
          predicate: "has_stages",
          object: "capture, normalize, curator review",
          confidence: 0.94,
          status: "active",
          source_refs: ["context/raw/research/meridian-relay.md"],
        },
        {
          id: 42,
          subject: "Numeric Meridian Relay",
          predicate: "has_numeric_id",
          object: "true",
          confidence: 0.9,
          status: "active",
          source_refs: ["context/raw/research/meridian-relay.md"],
        },
      ]
        .map((row) => JSON.stringify(row))
        .join("\n") + "\n",
    );
    await write(
      root,
      ".agentplane/context/derived/graph/entities.jsonl",
      `${JSON.stringify({
        id: "concept:meridian-relay",
        kind: "concept",
        label: "Meridian Relay",
        status: "active",
        source_refs: ["context/raw/research/meridian-relay.md"],
      })}\n`,
    );
    await cmdContextReindex({
      cwd: root,
      parsed: { includeTasks: false, includeRaw: true, reset: false },
    });
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await cmdContextSearch({
      cwd: root,
      parsed: {
        query: "meridian relay",
        scope: "context",
        format: "json",
        explain: false,
      },
    });

    const payload = JSON.parse(out.mock.calls.map((call) => String(call[0])).join("")) as {
      results: { ref: string; freshness: { stale: boolean } }[];
    };
    const factResult = payload.results.find((result) =>
      result.ref.endsWith("facts.jsonl#fact=fact:meridian-relay:stages"),
    );
    const entityResult = payload.results.find((result) =>
      result.ref.endsWith("entities.jsonl#entity=concept:meridian-relay"),
    );
    const numericIdResult = payload.results.find((result) =>
      result.ref.endsWith("facts.jsonl#fact=42"),
    );
    expect(factResult?.freshness.stale).toBe(false);
    expect(entityResult?.freshness.stale).toBe(false);
    expect(numericIdResult?.freshness.stale).toBe(false);
  });

  it("resolves markdown sections by slug", async () => {
    const root = await tempRoot();
    await write(
      root,
      "context/wiki/payments.md",
      "# Payments\n\nIntro\n\n## Refund Idempotency\n\nRefunds are idempotent.\n\n## Other\n\nSkip.\n",
    );
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    await cmdContextShow({
      cwd: root,
      parsed: { ref: "context/wiki/payments.md#section=refund-idempotency" },
    });

    const text = out.mock.calls.map((call) => String(call[0])).join("");
    expect(text).toContain("Refunds are idempotent.");
    expect(text).not.toContain("Skip.");
  });

  it("rejects context facts without provenance fields", async () => {
    const root = await tempRoot();
    await write(
      root,
      ".agentplane/context/derived/facts/facts.jsonl",
      JSON.stringify({ id: "fact_1", confidence: 0.8, status: "active" }) + "\n",
    );
    const task = {
      id: "202605130501-CTX001",
      status: "TODO",
      owner: "CURATOR",
      task_kind: "context",
      mutation_scope: "context",
      blueprint_request: "context.assimilation",
      extensions: {
        "agentplane.context": {
          source_set: {
            files: [
              {
                path: "context/raw/specs/payment-api.md",
                sha256: "sha256:1111111111111111111111111111111111111111111111111111111111111111",
              },
            ],
          },
        },
      },
      runner: {
        evidence: {
          changed_paths: [".agentplane/context/derived/facts/facts.jsonl"],
        },
      },
    };
    const ctx = {
      resolvedProject: { gitRoot: root },
      config: { paths: { workflow_dir: ".agentplane/tasks" } },
      taskBackend: { getTask: async () => task },
      backendId: "local",
      backendConfigPath: path.join(root, ".agentplane/backends/local/backend.json"),
      memo: {},
    } as unknown as CommandContext;

    await expect(
      cmdContextVerifyTask({
        ctx,
        cwd: root,
        parsed: { taskId: task.id },
      }),
    ).rejects.toThrow(/fact row has no source_ref/u);
  });

  it("hands context ingest --run to the task runner after creating a CURATOR task", async () => {
    const root = await tempRoot();
    await write(root, "context/raw/specs/payment-api.md", "# Payment API\n\nPublic source.\n");
    const out = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    const tasks: { id: string; owner: string }[] = [];
    const createTask = vi.fn(async () => {
      tasks.push({ id: "202605130501-CTXRUN", owner: "CURATOR" });
    });
    const approveTaskPlan = vi.fn(async () => 0);
    const startTask = vi.fn(async () => 0);
    const runTask = vi.fn(async () => 0);
    const ctx = {
      resolvedProject: { gitRoot: root },
      config: { paths: { workflow_dir: ".agentplane/tasks" } },
      taskBackend: {
        listTasks: async () => [...tasks],
      },
      backendId: "local",
      backendConfigPath: path.join(root, ".agentplane/backends/local/backend.json"),
      memo: {},
    } as unknown as CommandContext;

    await cmdContextIngest({
      ctx,
      cwd: root,
      parsed: {
        sources: [],
        mode: "changed",
        dryRun: false,
        indexOnly: false,
        runTask: true,
        includePrivate: false,
      },
      createTask,
      approveTaskPlan,
      startTask,
      runTask,
    });

    expect(createTask).toHaveBeenCalledOnce();
    expect(approveTaskPlan).toHaveBeenCalledWith(
      expect.objectContaining({
        cwd: root,
        rootOverride: undefined,
        taskId: "202605130501-CTXRUN",
        by: "ORCHESTRATOR",
      }),
    );
    expect(startTask).toHaveBeenCalledWith(
      expect.objectContaining({
        cwd: root,
        rootOverride: undefined,
        taskId: "202605130501-CTXRUN",
        author: "CURATOR",
      }),
    );
    expect(runTask).toHaveBeenCalledWith(
      { cwd: root, rootOverride: undefined },
      { taskId: "202605130501-CTXRUN", dryRun: false },
    );
    expect(out.mock.calls.map((call) => String(call[0])).join("")).toContain(
      "context ingestion task created: 202605130501-CTXRUN",
    );
  });
});
