import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import {
  buildAgentSemanticResultV2ValidFixtures,
  buildAgentWorkOrderV2ValidFixture,
} from "@agentplaneorg/core/schemas";
import { afterEach, describe, expect, it, vi } from "vitest";

import { cmdContextReindex } from "../../context/reindex.js";
import {
  persistTaskKnowledgeRequestAudit,
  serveTaskKnowledgeRequest,
  validateTaskKnowledgeRequestResponse,
  type TaskKnowledgeRequestAudit,
} from "./task-knowledge-request.js";

let tempRoots: string[] = [];

async function tempRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-knowledge-request-"));
  tempRoots.push(root);
  return root;
}

async function write(root: string, relative: string, contents: string): Promise<void> {
  const target = path.join(root, relative);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, contents, "utf8");
}

function requestResult(opts: { work_order_id: string; query?: string }) {
  return {
    ...buildAgentSemanticResultV2ValidFixtures(opts.work_order_id).needs_context,
    knowledge_request: {
      schema_version: 1 as const,
      kind: "knowledge_request" as const,
      query: opts.query ?? "canonical retrieval boundary",
      reason: "The current episode needs one canonical source before it can continue.",
      desired_kind: "wiki" as const,
      scope: "task_context" as const,
      blocking: true,
    },
  };
}

function input(
  opts: {
    semantic_result?: unknown;
    prior_audits?: readonly TaskKnowledgeRequestAudit[];
    role?: "EXECUTOR" | "EVALUATOR";
  } = {},
) {
  const workOrder = buildAgentWorkOrderV2ValidFixture();
  if (opts.role) workOrder.role = opts.role;
  return {
    work_order: workOrder,
    invocation: {
      run_id: "run-knowledge-001",
      work_order_id: workOrder.work_order_id,
      state_fingerprint_digest: workOrder.state_fingerprint.digest,
    },
    semantic_result:
      opts.semantic_result ?? requestResult({ work_order_id: workOrder.work_order_id }),
    ...(opts.prior_audits ? { prior_audits: opts.prior_audits } : {}),
  };
}

afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(
    tempRoots.map(async (root) => await rm(root, { recursive: true, force: true })),
  );
  tempRoots = [];
});

describe("bounded task knowledge requests", () => {
  it("returns digest-valid scoped references and persists a run-bound audit", async () => {
    const root = await tempRoot();
    await write(
      root,
      "context/wiki/retrieval.md",
      "# Retrieval Boundary\n\nThe canonical retrieval boundary keeps CLI-owned context retrieval bounded for a semantic episode.\n",
    );
    const stdout = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    await cmdContextReindex({
      cwd: root,
      parsed: { includeTasks: false, includeRaw: false, reset: false },
    });
    stdout.mockRestore();

    const served = await serveTaskKnowledgeRequest({ repository_root: root, ...input() });

    expect(served.omissions).toEqual([]);
    expect(served).toMatchObject({
      outcome: "served",
      run: { run_id: "run-knowledge-001", role: "EXECUTOR" },
      round: 1,
    });
    expect(served.knowledge_refs).toEqual(
      expect.arrayContaining([expect.objectContaining({ ref: "context/wiki/retrieval.md" })]),
    );
    expect(served.prepared_evidence).toHaveLength(served.knowledge_refs.length);
    expect(served.usage.estimated_response_tokens).toBeLessThanOrEqual(
      served.usage.max_response_tokens,
    );
    expect(validateTaskKnowledgeRequestResponse(served)).toEqual(served);

    const auditPath = path.join(root, "audit.json");
    await persistTaskKnowledgeRequestAudit({ file_path: auditPath, audit: served });
    expect(JSON.parse(await readFile(auditPath, "utf8"))).toEqual(served);
  });

  it("accepts an EVALUATOR request under the same bounded policy", async () => {
    const root = await tempRoot();
    const response = await serveTaskKnowledgeRequest({
      repository_root: root,
      ...input({ role: "EVALUATOR" }),
    });

    expect(response).toMatchObject({
      outcome: "unresolved",
      run: { role: "EVALUATOR" },
    });
    expect(response.omissions).toEqual([
      expect.objectContaining({ code: "projection_unavailable" }),
    ]);
  });

  it("denies a result that is not bound to the current work order", async () => {
    const root = await tempRoot();
    const base = input();
    const denied = await serveTaskKnowledgeRequest({
      repository_root: root,
      ...base,
      semantic_result: requestResult({ work_order_id: "stale-work-order" }),
    });

    expect(denied).toMatchObject({
      outcome: "denied",
      omissions: [expect.objectContaining({ code: "work_order_mismatch" })],
    });
  });

  it("denies a stale invocation fingerprint without querying the repository", async () => {
    const root = await tempRoot();
    const base = input();
    const denied = await serveTaskKnowledgeRequest({
      repository_root: root,
      ...base,
      invocation: { ...base.invocation, state_fingerprint_digest: "sha256:stale" },
    });

    expect(denied).toMatchObject({
      outcome: "denied",
      omissions: [expect.objectContaining({ code: "state_fingerprint_mismatch" })],
    });
  });

  it("escalates a repeated unresolved blocking request instead of retrying it", async () => {
    const root = await tempRoot();
    const first = await serveTaskKnowledgeRequest({ repository_root: root, ...input() });
    const second = await serveTaskKnowledgeRequest({
      repository_root: root,
      ...input({ prior_audits: [first] }),
    });

    expect(first).toMatchObject({ outcome: "unresolved" });
    expect(second.outcome).toBe("escalated");
    expect(second.round).toBe(2);
    expect(second.omissions).toEqual([expect.objectContaining({ code: "repeated_unresolved" })]);
    expect(second.blocker?.recommended_action).toContain("Escalate");
  });

  it("returns a typed denial for a forbidden request scope and exhausted rounds", async () => {
    const root = await tempRoot();
    const forbidden = requestResult({ work_order_id: input().work_order.work_order_id });
    const forbiddenResponse = await serveTaskKnowledgeRequest({
      repository_root: root,
      ...input({
        semantic_result: {
          ...forbidden,
          knowledge_request: { ...forbidden.knowledge_request, scope: "repository" },
        },
      }),
    });
    const first = await serveTaskKnowledgeRequest({
      repository_root: root,
      ...input({
        semantic_result: requestResult({
          work_order_id: "work-order-example-001",
          query: "first gap",
        }),
      }),
    });
    const second = await serveTaskKnowledgeRequest({
      repository_root: root,
      ...input({
        semantic_result: requestResult({
          work_order_id: "work-order-example-001",
          query: "second gap",
        }),
        prior_audits: [first],
      }),
    });
    const exhausted = await serveTaskKnowledgeRequest({
      repository_root: root,
      ...input({
        semantic_result: requestResult({
          work_order_id: "work-order-example-001",
          query: "third gap",
        }),
        prior_audits: [first, second],
      }),
    });

    expect(forbiddenResponse).toMatchObject({
      outcome: "denied",
      omissions: [expect.objectContaining({ code: "invalid_semantic_result" })],
    });
    expect(exhausted).toMatchObject({
      outcome: "denied",
      omissions: [expect.objectContaining({ code: "round_budget_exhausted" })],
    });
  });

  it("rejects a tampered CLI response digest", async () => {
    const root = await tempRoot();
    const response = await serveTaskKnowledgeRequest({ repository_root: root, ...input() });

    expect(() =>
      validateTaskKnowledgeRequestResponse({ ...response, digest: "sha256:tampered" }),
    ).toThrow(/digest or version is invalid/u);
  });
});
