import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { defaultConfig } from "@agentplaneorg/core/config";
import { mkGitRepoRoot, writeConfig } from "@agentplane/testkit";
import { writeRunnerExecutable } from "@agentplane/testkit/runner";
import { afterEach, describe, expect, it } from "vitest";

import { loadCommandContext } from "../../commands/shared/task-backend.js";
import { cmdContextReindex } from "../../context/reindex.js";
import type { RunnerResult } from "../types.js";
import {
  loadTaskKnowledgeRequestAudits,
  validateTaskKnowledgeRequestResponse,
  withTaskKnowledgeRequestAuditReservation,
} from "./task-knowledge-request.js";
import { serveRunnerKnowledgeRequest } from "./task-knowledge-request-lifecycle.js";
import { createDoingRunnerTask } from "./task-run-lifecycle.testkit.js";
import { executeTaskRunnerExecution } from "./task-run.js";

const originalPath = process.env.PATH;

afterEach(() => {
  process.env.PATH = originalPath;
});

function needsContextSemanticResult(
  workOrderId: string,
  query = "bounded retrieval continuation",
): string {
  return JSON.stringify({
    schema_version: 2,
    kind: "agent_semantic_result",
    work_order_id: workOrderId,
    status: "needs_context",
    summary: "The executor needs a bounded canonical retrieval result.",
    findings: ["The selected task context contains the requested retrieval document."],
    uncertainty: [],
    knowledge_request: {
      schema_version: 1,
      kind: "knowledge_request",
      query,
      reason: "The next semantic decision depends on the canonical retrieval boundary.",
      desired_kind: "wiki",
      scope: "task_context",
      blocking: true,
    },
  });
}

function needsContextRunnerResult(workOrderId: string, query?: string): RunnerResult {
  return {
    status: "success",
    exit_code: 0,
    started_at: "2026-07-30T00:00:00.000Z",
    ended_at: "2026-07-30T00:00:01.000Z",
    semantic_result: {
      provenance: "agent_reported",
      value: JSON.parse(needsContextSemanticResult(workOrderId, query)) as NonNullable<
        RunnerResult["semantic_result"]
      >["value"],
    },
  };
}

async function configureNeedsContextRunner(root: string): Promise<void> {
  const config = defaultConfig();
  config.runner.default_adapter = "custom";
  config.runner.custom = { command: ["custom-needs-context"] };
  await writeConfig(root, config);
  await writeRunnerExecutable(root, "custom-needs-context", [
    "#!/bin/sh",
    "set -eu",
    "cat >/dev/null",
    String.raw`printf '%s\n' '${needsContextSemanticResult("__WORK_ORDER_ID__")}' | sed "s/__WORK_ORDER_ID__/$AGENTPLANE_RUNNER_WORK_ORDER_ID/g" > "$AGENTPLANE_RUNNER_RESULT_PATH"`,
  ]);
  process.env.PATH = `${path.join(root, "bin")}${path.delimiter}${process.env.PATH ?? ""}`;
}

describe("runner knowledge-request lifecycle", () => {
  it("serves and persists a bounded response after a real needs_context runner result", async () => {
    const root = await mkGitRepoRoot();
    await configureNeedsContextRunner(root);
    await mkdir(path.join(root, "context", "wiki"), { recursive: true });
    await writeFile(
      path.join(root, "context", "wiki", "retrieval.md"),
      "# Bounded retrieval continuation\n\nCLI owns the canonical bounded retrieval response.\n",
      "utf8",
    );
    await cmdContextReindex({
      cwd: root,
      parsed: { includeTasks: false, includeRaw: false, reset: false },
    });
    const taskId = await createDoingRunnerTask({
      root,
      title: "Bounded retrieval continuation",
      plan_text: "Return bounded context to the executor.",
    });
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const executed = await executeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: "run-knowledge-lifecycle-001",
    });

    expect(executed.result.knowledge_response).toMatchObject({
      outcome: "served",
      run: { run_id: "run-knowledge-lifecycle-001" },
    });
    expect(executed.result.knowledge_response?.knowledge_refs).toEqual(
      expect.arrayContaining([expect.objectContaining({ ref: "context/wiki/retrieval.md" })]),
    );
    const auditPath =
      typeof executed.result.evidence?.knowledge_request?.audit_path === "string"
        ? executed.result.evidence.knowledge_request.audit_path
        : null;
    expect(auditPath).toBeTruthy();
    expect(JSON.parse(await readFile(auditPath!, "utf8"))).toEqual(
      executed.result.knowledge_response,
    );
    expect(executed.result.artifacts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: auditPath, label: "knowledge-request-audit" }),
      ]),
    );

    await expect(
      loadTaskKnowledgeRequestAudits({
        runs_dir: path.dirname(executed.invocation.run_dir),
        invocation: {
          run_id: executed.invocation.run_id,
          work_order_id: executed.invocation.work_order_id,
          state_fingerprint_digest: executed.bundle.work_order!.state_fingerprint.digest,
        },
        role: executed.bundle.work_order!.role,
      }),
    ).resolves.toEqual([executed.result.knowledge_response]);

    const continuation = await serveRunnerKnowledgeRequest({
      repository_root: root,
      invocation: {
        run_id: "run-knowledge-lifecycle-002",
        run_dir: path.join(
          path.dirname(executed.invocation.run_dir),
          "run-knowledge-lifecycle-002",
        ),
        work_order_id: executed.invocation.work_order_id,
      },
      work_order: executed.bundle.work_order,
      result: needsContextRunnerResult(executed.invocation.work_order_id),
    });
    expect(continuation.knowledge_response).toMatchObject({
      round: 2,
      outcome: "served",
      run: { run_id: "run-knowledge-lifecycle-002" },
    });

    const runsDir = path.dirname(executed.invocation.run_dir);
    const concurrentWorkOrder = {
      ...executed.bundle.work_order!,
      work_order_id: "work-order-knowledge-concurrent-001",
    };
    const concurrentInvocations = [
      {
        run_id: "run-knowledge-concurrent-001",
        run_dir: path.join(runsDir, "run-knowledge-concurrent-001"),
        work_order_id: concurrentWorkOrder.work_order_id,
      },
      {
        run_id: "run-knowledge-concurrent-002",
        run_dir: path.join(runsDir, "run-knowledge-concurrent-002"),
        work_order_id: concurrentWorkOrder.work_order_id,
      },
    ];
    const concurrent = await Promise.all(
      concurrentInvocations.map(
        async (invocation) =>
          await serveRunnerKnowledgeRequest({
            repository_root: root,
            invocation,
            work_order: concurrentWorkOrder,
            result: needsContextRunnerResult(concurrentWorkOrder.work_order_id),
          }),
      ),
    );
    expect(
      concurrent
        .map((result) => result.knowledge_response?.round)
        .toSorted((left, right) => (left ?? 0) - (right ?? 0)),
    ).toEqual([1, 2]);

    const unresolvedWorkOrder = {
      ...concurrentWorkOrder,
      work_order_id: "work-order-knowledge-unresolved-001",
    };
    const unresolvedInvocations = [
      {
        run_id: "run-knowledge-unresolved-001",
        run_dir: path.join(runsDir, "run-knowledge-unresolved-001"),
        work_order_id: unresolvedWorkOrder.work_order_id,
      },
      {
        run_id: "run-knowledge-unresolved-002",
        run_dir: path.join(runsDir, "run-knowledge-unresolved-002"),
        work_order_id: unresolvedWorkOrder.work_order_id,
      },
    ];
    const unresolved = await Promise.all(
      unresolvedInvocations.map(
        async (invocation) =>
          await serveRunnerKnowledgeRequest({
            repository_root: root,
            invocation,
            work_order: unresolvedWorkOrder,
            result: needsContextRunnerResult(
              unresolvedWorkOrder.work_order_id,
              "unmatched concurrent knowledge gap",
            ),
          }),
      ),
    );
    const unresolvedByRound = unresolved
      .map((result) => result.knowledge_response)
      .toSorted((left, right) => (left?.round ?? 0) - (right?.round ?? 0));
    expect(unresolvedByRound).toMatchObject([
      { round: 1, outcome: "unresolved" },
      { round: 2, outcome: "escalated" },
    ]);
  });

  it("keeps a held reservation exclusive and returns a bounded typed escalation on timeout", async () => {
    const root = await mkGitRepoRoot();
    await configureNeedsContextRunner(root);
    await mkdir(path.join(root, "context", "wiki"), { recursive: true });
    await writeFile(
      path.join(root, "context", "wiki", "retrieval.md"),
      "# Bounded retrieval continuation\n\nCLI owns the canonical bounded retrieval response.\n",
      "utf8",
    );
    await cmdContextReindex({
      cwd: root,
      parsed: { includeTasks: false, includeRaw: false, reset: false },
    });
    const taskId = await createDoingRunnerTask({
      root,
      title: "Bounded retrieval continuation",
      plan_text: "Keep a knowledge request reservation exclusive.",
    });
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const executed = await executeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: "run-knowledge-reservation-base",
    });
    const workOrder = executed.bundle.work_order!;
    const runsDir = path.dirname(executed.invocation.run_dir);
    const invocation = {
      run_id: "run-knowledge-reservation-held",
      run_dir: path.join(runsDir, "run-knowledge-reservation-held"),
      work_order_id: workOrder.work_order_id,
    };
    let release!: () => void;
    let markHeld!: () => void;
    const held = new Promise<void>((resolve) => {
      markHeld = resolve;
    });
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    const holder = withTaskKnowledgeRequestAuditReservation({
      repository_root: root,
      invocation: {
        run_id: invocation.run_id,
        work_order_id: invocation.work_order_id,
        state_fingerprint_digest: workOrder.state_fingerprint.digest,
      },
      role: workOrder.role,
      work: async () => {
        markHeld();
        await gate;
        return "released";
      },
    });
    await held;

    const contended = await serveRunnerKnowledgeRequest({
      repository_root: root,
      invocation: {
        ...invocation,
        run_id: "run-knowledge-reservation-contended",
        run_dir: path.join(runsDir, "run-knowledge-reservation-contended"),
      },
      reservation_wait_ms: 25,
      work_order: workOrder,
      result: needsContextRunnerResult(workOrder.work_order_id),
    });
    expect(contended.knowledge_response).toMatchObject({
      round: 0,
      outcome: "escalated",
      omissions: [{ code: "reservation_unavailable" }],
    });
    expect(validateTaskKnowledgeRequestResponse(contended.knowledge_response)).toEqual(
      contended.knowledge_response,
    );
    expect(typeof contended.knowledge_response?.blocker?.recommended_action).toBe("string");

    release();
    await expect(holder).resolves.toMatchObject({ status: "reserved", value: "released" });
    const recovered = await serveRunnerKnowledgeRequest({
      repository_root: root,
      invocation,
      reservation_wait_ms: 25,
      work_order: workOrder,
      result: needsContextRunnerResult(workOrder.work_order_id),
    });
    expect(recovered.knowledge_response).toMatchObject({ round: 2, outcome: "served" });
  });
});
