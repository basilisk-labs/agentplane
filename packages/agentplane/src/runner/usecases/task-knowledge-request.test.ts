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
  loadTaskKnowledgeRequestAudits,
  persistTaskKnowledgeRequestAudit,
  serveTaskKnowledgeRequest,
  taskKnowledgeRequestAuditPath,
  validateTaskKnowledgeRequestResponse,
  type TaskKnowledgeRequestAudit,
} from "./task-knowledge-request.js";
import { digestJson } from "./task-knowledge-request-codec.js";
import { materializeKnowledgeRef } from "../../context/knowledge-ref.js";

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
    knowledge_ref?: string;
  } = {},
) {
  const workOrder = buildAgentWorkOrderV2ValidFixture();
  if (opts.role) workOrder.role = opts.role;
  if (opts.knowledge_ref) {
    workOrder.knowledge_refs = workOrder.knowledge_refs.map((knowledge) => ({
      ...knowledge,
      ref: opts.knowledge_ref!,
    }));
  }
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

async function inputWithVerifiedKnowledgeRef(
  root: string,
  opts: Parameters<typeof input>[0] & { ref: string },
) {
  const request = await inputWithVerifiedKnowledgeRefs(root, { ...opts, refs: [opts.ref] });
  return request;
}

async function inputWithVerifiedKnowledgeRefs(
  root: string,
  opts: Parameters<typeof input>[0] & { refs: readonly string[] },
) {
  const request = input(opts);
  request.work_order.knowledge_refs = await Promise.all(
    opts.refs.map(
      async (ref) =>
        await materializeKnowledgeRef({
          repository_root: root,
          ref,
          kind: "wiki",
          reason: "test digest-bound task context",
          retrieval: "fts",
          required: false,
        }),
    ),
  );
  return request;
}

function serializedTokenEstimate(value: unknown): number {
  return Math.ceil(Buffer.byteLength(JSON.stringify(value), "utf8") / 4);
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

    const request = await inputWithVerifiedKnowledgeRef(root, {
      ref: "context/wiki/retrieval.md",
    });
    const served = await serveTaskKnowledgeRequest({ repository_root: root, ...request });

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

    const auditPath = taskKnowledgeRequestAuditPath({
      run_dir: path.join(root, "runs", request.invocation.run_id),
      audit: served,
    });
    await persistTaskKnowledgeRequestAudit({ file_path: auditPath, audit: served });
    expect(JSON.parse(await readFile(auditPath, "utf8"))).toEqual(served);
    await write(root, "runs/tampered/knowledge-requests/bad.json", "{}");
    await expect(
      loadTaskKnowledgeRequestAudits({
        runs_dir: path.join(root, "runs"),
        invocation: request.invocation,
        role: request.work_order.role,
      }),
    ).resolves.toEqual([served]);
  });

  it("denies an FTS candidate outside the digest-bound task context", async () => {
    const root = await tempRoot();
    await write(
      root,
      "context/wiki/allowed.md",
      "# Allowed\n\nOnly the approved context is visible.\n",
    );
    await write(
      root,
      "context/wiki/unrelated.md",
      "# Unrelated\n\nCross-task private retrieval marker.\n",
    );
    const stdout = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    await cmdContextReindex({
      cwd: root,
      parsed: { includeTasks: false, includeRaw: false, reset: false },
    });
    stdout.mockRestore();

    const request = await inputWithVerifiedKnowledgeRef(root, {
      ref: "context/wiki/allowed.md",
      semantic_result: requestResult({
        work_order_id: "work-order-example-001",
        query: "cross task private retrieval marker",
      }),
    });
    const denied = await serveTaskKnowledgeRequest({
      repository_root: root,
      ...request,
    });

    expect(denied).toMatchObject({
      outcome: "denied",
      knowledge_refs: [],
      omissions: [expect.objectContaining({ code: "reference_outside_task_context" })],
    });
  });

  it("continues FTS pages until it finds an authorized lower-ranked task-context result", async () => {
    const root = await tempRoot();
    await Promise.all(
      Array.from(
        { length: 7 },
        async (_, index) =>
          await write(
            root,
            `context/wiki/aaa-outside-${index}.md`,
            "# Outside\n\nRanking boundary marker. Ranking boundary marker.\n",
          ),
      ),
    );
    await write(root, "context/wiki/zzz-allowed.md", "# Allowed\n\nRanking boundary marker.\n");
    const stdout = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    await cmdContextReindex({
      cwd: root,
      parsed: { includeTasks: false, includeRaw: false, reset: false },
    });
    stdout.mockRestore();

    const request = await inputWithVerifiedKnowledgeRef(root, {
      ref: "context/wiki/zzz-allowed.md",
      semantic_result: requestResult({
        work_order_id: "work-order-example-001",
        query: "ranking boundary marker",
      }),
    });
    const served = await serveTaskKnowledgeRequest({ repository_root: root, ...request });

    expect(served).toMatchObject({
      outcome: "served",
      knowledge_refs: [expect.objectContaining({ ref: "context/wiki/zzz-allowed.md" })],
    });
  });

  it("rejects post-work-order content drift instead of returning a fresh digest", async () => {
    const root = await tempRoot();
    await write(root, "context/wiki/drift.md", "# Drift\n\nOriginal bounded context.\n");
    const stdout = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    await cmdContextReindex({
      cwd: root,
      parsed: { includeTasks: false, includeRaw: false, reset: false },
    });
    stdout.mockRestore();

    const request = await inputWithVerifiedKnowledgeRef(root, {
      ref: "context/wiki/drift.md",
      semantic_result: requestResult({
        work_order_id: "work-order-example-001",
        query: "original bounded context",
      }),
    });
    await write(root, "context/wiki/drift.md", "# Drift\n\nChanged content after work order.\n");

    const rejected = await serveTaskKnowledgeRequest({ repository_root: root, ...request });

    expect(rejected).toMatchObject({
      outcome: "unresolved",
      knowledge_refs: [],
      omissions: [expect.objectContaining({ code: "excerpt_not_included" })],
    });
    expect(rejected.omissions[0]?.detail).toContain("digest_mismatch");
  });

  it("keeps six long task-context candidates, metadata, and omission receipts within the response budget", async () => {
    const root = await tempRoot();
    const refs = [
      "context/wiki/aaa-stale.md",
      ...Array.from({ length: 6 }, (_, index) => `context/wiki/valid-${index}.md`),
    ];
    await Promise.all(
      refs.map(
        async (ref) =>
          await write(
            root,
            ref,
            `# ${path.basename(ref)}\n\nComplete response budget marker ${"evidence ".repeat(5)}\n`,
          ),
      ),
    );
    const stdout = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    await cmdContextReindex({
      cwd: root,
      parsed: { includeTasks: false, includeRaw: false, reset: false },
    });
    stdout.mockRestore();
    const request = await inputWithVerifiedKnowledgeRefs(root, {
      refs,
      semantic_result: requestResult({
        work_order_id: "work-order-example-001",
        query: "complete response budget marker",
      }),
    });
    await write(
      root,
      "context/wiki/aaa-stale.md",
      "# Stale\n\nChanged after the work order was created.\n",
    );

    const served = await serveTaskKnowledgeRequest({ repository_root: root, ...request });

    expect(served).toMatchObject({ outcome: "served" });
    expect(served.knowledge_refs).toHaveLength(2);
    expect(served.omissions).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "excerpt_not_included" })]),
    );
    expect(serializedTokenEstimate(served)).toBe(served.usage.estimated_response_tokens);
    expect(served.usage.estimated_response_tokens).toBeLessThanOrEqual(
      served.usage.max_response_tokens,
    );
    expect(validateTaskKnowledgeRequestResponse(served)).toEqual(served);
  });

  it("leaves a matching excerpt out when complete-response metadata uses the remaining budget", async () => {
    const root = await tempRoot();
    const refs = ["context/wiki/first.md", "context/wiki/second.md"];
    await Promise.all(
      refs.map(
        async (ref) =>
          await write(
            root,
            ref,
            `# ${path.basename(ref)}\n\nMetadata response budget marker ${"payload ".repeat(190)}\n`,
          ),
      ),
    );
    const stdout = vi.spyOn(process.stdout, "write").mockImplementation(() => true);
    await cmdContextReindex({
      cwd: root,
      parsed: { includeTasks: false, includeRaw: false, reset: false },
    });
    stdout.mockRestore();
    const request = await inputWithVerifiedKnowledgeRefs(root, {
      refs,
      semantic_result: requestResult({
        work_order_id: "work-order-example-001",
        query: "metadata response budget marker",
      }),
    });

    const served = await serveTaskKnowledgeRequest({ repository_root: root, ...request });

    expect(served).toMatchObject({ outcome: "served" });
    expect(served.knowledge_refs).toHaveLength(1);
    expect(served.omissions).toEqual([expect.objectContaining({ code: "excerpt_not_included" })]);
    expect(served.omissions[0]?.detail).toContain("complete response token budget");
    expect(serializedTokenEstimate(served)).toBe(served.usage.estimated_response_tokens);
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

    const { digest: _digest, ...unsigned } = response;
    const underreported = {
      ...unsigned,
      usage: { ...unsigned.usage, estimated_response_tokens: 0 },
    };
    expect(() =>
      validateTaskKnowledgeRequestResponse({
        ...underreported,
        digest: digestJson(underreported),
      }),
    ).toThrow(/exceeded its token budget/u);
  });
});
