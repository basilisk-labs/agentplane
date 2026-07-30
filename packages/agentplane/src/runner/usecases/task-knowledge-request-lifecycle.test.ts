import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { defaultConfig } from "@agentplaneorg/core/config";
import { mkGitRepoRoot, writeConfig } from "@agentplane/testkit";
import { writeRunnerExecutable } from "@agentplane/testkit/runner";
import { afterEach, describe, expect, it } from "vitest";

import { loadCommandContext } from "../../commands/shared/task-backend.js";
import { cmdContextReindex } from "../../context/reindex.js";
import { loadTaskKnowledgeRequestAudits } from "./task-knowledge-request.js";
import { serveRunnerKnowledgeRequest } from "./task-knowledge-request-lifecycle.js";
import { createDoingRunnerTask } from "./task-run-lifecycle.testkit.js";
import { executeTaskRunnerExecution } from "./task-run.js";

const originalPath = process.env.PATH;

afterEach(() => {
  process.env.PATH = originalPath;
});

function needsContextSemanticResult(workOrderId: string): string {
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
      query: "bounded retrieval continuation",
      reason: "The next semantic decision depends on the canonical retrieval boundary.",
      desired_kind: "wiki",
      scope: "task_context",
      blocking: true,
    },
  });
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
      result: {
        status: "success",
        exit_code: 0,
        started_at: "2026-07-30T00:00:00.000Z",
        ended_at: "2026-07-30T00:00:01.000Z",
        semantic_result: {
          provenance: "agent_reported",
          value: JSON.parse(
            needsContextSemanticResult(executed.invocation.work_order_id),
          ) as NonNullable<typeof executed.result.semantic_result>["value"],
        },
      },
    });
    expect(continuation.knowledge_response).toMatchObject({
      round: 2,
      outcome: "served",
      run: { run_id: "run-knowledge-lifecycle-002" },
    });
  });
});
