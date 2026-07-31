import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  buildAgentSemanticResultV2ValidFixtures,
  buildAgentWorkOrderV2ValidFixture,
} from "@agentplaneorg/core/schemas";
import { makeRunnerContextBundle, setRunnerBundleRunDir } from "@agentplane/testkit/runner";

import { writePreparedRunnerArtifacts } from "../artifacts.js";
import { CODEX_RUN_PROFILE_CAPABILITIES } from "../adapters/codex-preparation.js";
import { readRunnerResultManifest } from "../result-manifest.js";
import type {
  RunnerContextBundle,
  RunnerPhaseToolName,
  RunnerPhaseToolResponse,
} from "../types.js";
import { invokeRunnerPhaseTool } from "./dispatch.js";
import {
  issueRunnerPhaseToolGrant,
  readRunnerPhaseToolGrant,
  type RunnerPhaseToolGrant,
} from "./token.js";

const roots: string[] = [];
const ISSUED_AT = new Date("2026-07-31T00:00:00.000Z");
const INVOKED_AT = new Date("2026-07-31T00:00:01.000Z");

type PreparedPhaseToolRun = {
  root: string;
  run_dir: string;
  bundle: RunnerContextBundle;
  grant: RunnerPhaseToolGrant;
};

async function preparePhaseToolRun(
  opts: {
    ttl_ms?: number;
    mutate_after_grant?: (bundle: RunnerContextBundle) => void;
  } = {},
): Promise<PreparedPhaseToolRun> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-phase-tools-"));
  roots.push(root);
  const workOrder = buildAgentWorkOrderV2ValidFixture();
  const bundle = makeRunnerContextBundle({
    gitRoot: root,
    taskId: workOrder.task.id,
    runId: `run-${roots.length}`,
    status: "DOING",
    owner: "CODER",
    mode: "execute",
  });
  bundle.work_order = workOrder;
  bundle.execution.adapter_capabilities = structuredClone(CODEX_RUN_PROFILE_CAPABILITIES);
  const runDir = path.join(
    root,
    ".agentplane",
    "tasks",
    workOrder.task.id,
    "runs",
    bundle.execution.run_id,
  );
  setRunnerBundleRunDir(bundle, runDir);
  const grant = await issueRunnerPhaseToolGrant({
    bundle,
    now: ISSUED_AT,
    ttl_ms: opts.ttl_ms ?? 60_000,
  });
  if (!grant) throw new Error("Expected a phase-tool grant.");
  bundle.execution.phase_tools = grant.manifest;
  opts.mutate_after_grant?.(bundle);
  await writePreparedRunnerArtifacts({
    bundle,
    created_at: ISSUED_AT.toISOString(),
  });
  return { root, run_dir: runDir, bundle, grant };
}

async function invoke(
  prepared: PreparedPhaseToolRun,
  tool: string,
  input: unknown,
  opts: { token?: string; now?: Date; repository_root?: string } = {},
): Promise<RunnerPhaseToolResponse> {
  return await invokeRunnerPhaseTool({
    repository_root: opts.repository_root ?? prepared.root,
    run_dir: prepared.run_dir,
    token: opts.token ?? prepared.grant.token,
    tool,
    input,
    now: opts.now ?? INVOKED_AT,
  });
}

async function expectLinkedAudit(
  response: RunnerPhaseToolResponse,
  tool: RunnerPhaseToolName,
): Promise<void> {
  expect(response).toMatchObject({
    status: "ok",
    code: "accepted",
    tool,
  });
  expect(response.audit).not.toBeNull();
  expect(response.audit?.digest).toMatch(/^sha256:[0-9a-f]{64}$/u);
  const audit = JSON.parse(await readFile(response.audit!.path, "utf8")) as Record<string, unknown>;
  expect(audit).toMatchObject({
    kind: "runner_phase_tool_audit",
    tool,
    outcome: "ok",
    code: "accepted",
    digest: response.audit!.digest,
  });
}

function tamperSignature(token: string): string {
  const [prefix, payload, signature] = token.split(".");
  if (!prefix || !payload || !signature) throw new Error("Expected a signed phase-tool token.");
  const first = signature.startsWith("a") ? "b" : "a";
  return `${prefix}.${payload}.${first}${signature.slice(1)}`;
}

afterEach(async () => {
  await Promise.all(roots.splice(0).map(async (root) => await rm(root, { recursive: true })));
});

describe("runner phase-tool dispatch", () => {
  it.each([
    [
      "request_knowledge",
      {
        query: "execution boundary",
        reason: "Need the prepared execution boundary.",
        desired_kind: "wiki",
        blocking: false,
      },
    ],
    ["knowledge_search", { query: "execution boundary", desired_kind: "wiki" }],
  ] as const)("serves %s through bounded typed context with linked audits", async (tool, input) => {
    const prepared = await preparePhaseToolRun();

    const response = await invoke(prepared, tool, input);

    await expectLinkedAudit(response, tool);
    expect(response.data).toMatchObject({
      response: {
        kind: "task_knowledge_response",
        run: {
          run_id: prepared.bundle.execution.run_id,
          work_order_id: prepared.bundle.work_order?.work_order_id,
        },
      },
    });
    expect(
      await readRunnerResultManifest(prepared.bundle.execution.artifact_paths.result_path),
    ).toBeNull();
  });

  it("shows only an exact digest-bound work-order knowledge reference", async () => {
    const prepared = await preparePhaseToolRun();
    const knowledgeRef = prepared.bundle.work_order!.knowledge_refs[0]!;

    const response = await invoke(prepared, "knowledge_show", {
      ref: knowledgeRef.ref,
      digest: knowledgeRef.digest,
    });

    await expectLinkedAudit(response, "knowledge_show");
    expect(response.data).toMatchObject({
      knowledge_ref: knowledgeRef,
      excerpt: {
        kind: "prepared_knowledge_excerpt",
      },
    });
  });

  it("writes one completed result, audits it, and revokes the token", async () => {
    const prepared = await preparePhaseToolRun();
    const semantic = buildAgentSemanticResultV2ValidFixtures(
      prepared.bundle.work_order!.work_order_id,
    ).completed;

    const response = await invoke(prepared, "report_result", semantic);

    await expectLinkedAudit(response, "report_result");
    expect(response.data).toMatchObject({ status: "completed", token_revoked: true });
    expect(
      await readRunnerResultManifest(prepared.bundle.execution.artifact_paths.result_path),
    ).toMatchObject({
      semantic_result: { value: semantic },
    });
    expect(await readRunnerPhaseToolGrant(prepared.run_dir)).toMatchObject({
      revoked_at: INVOKED_AT.toISOString(),
      revoke_reason: "terminal_report",
    });

    const reused = await invoke(prepared, "report_result", semantic);
    expect(reused).toMatchObject({
      status: "denied",
      code: "token_revoked",
      audit: null,
    });
  });

  it("writes a typed blocked result and revokes the token", async () => {
    const prepared = await preparePhaseToolRun();

    const response = await invoke(prepared, "report_blocker", {
      summary: "The required provider action is outside the delegated scope.",
      recommended_action: "Return control to the parent workflow.",
      findings: ["No lifecycle operation was attempted."],
      uncertainty: [],
    });

    await expectLinkedAudit(response, "report_blocker");
    expect(
      await readRunnerResultManifest(prepared.bundle.execution.artifact_paths.result_path),
    ).toMatchObject({
      semantic_result: {
        value: {
          work_order_id: prepared.bundle.work_order?.work_order_id,
          status: "blocked",
        },
      },
    });
  });

  it.each([
    ["tampered token", "invalid_token"],
    ["expired token", "token_expired"],
    ["lifecycle tool", "tool_not_allowed"],
  ] as const)("denies a %s before target effects", async (scenario, expectedCode) => {
    const prepared = await preparePhaseToolRun({
      ttl_ms: scenario === "expired token" ? 1000 : 60_000,
    });
    const token =
      scenario === "tampered token" ? tamperSignature(prepared.grant.token) : prepared.grant.token;
    const now = scenario === "expired token" ? new Date(ISSUED_AT.getTime() + 2000) : INVOKED_AT;
    const tool = scenario === "lifecycle tool" ? "finish" : "report_result";

    const response = await invoke(prepared, tool, {}, { token, now });

    expect(response).toMatchObject({
      status: "denied",
      code: expectedCode,
      audit: null,
    });
    expect(
      await readRunnerResultManifest(prepared.bundle.execution.artifact_paths.result_path),
    ).toBeNull();
  });

  it("denies role drift after grant issuance", async () => {
    const prepared = await preparePhaseToolRun({
      mutate_after_grant: (bundle) => {
        bundle.work_order!.role = "EVALUATOR";
      },
    });

    const response = await invoke(prepared, "knowledge_search", {
      query: "execution boundary",
    });

    expect(response).toMatchObject({
      status: "denied",
      code: "role_forbidden",
    });
    expect(
      await readRunnerResultManifest(prepared.bundle.execution.artifact_paths.result_path),
    ).toBeNull();
  });

  it("denies state-fingerprint drift after grant issuance", async () => {
    const prepared = await preparePhaseToolRun({
      mutate_after_grant: (bundle) => {
        bundle.work_order!.state_fingerprint.digest = `sha256:${"2".repeat(64)}`;
      },
    });

    const response = await invoke(prepared, "knowledge_search", {
      query: "execution boundary",
    });

    expect(response).toMatchObject({
      status: "denied",
      code: "state_fingerprint_mismatch",
    });
  });

  it("closes every phase tool when a terminal result already exists", async () => {
    const prepared = await preparePhaseToolRun();
    const semantic = buildAgentSemanticResultV2ValidFixtures(
      prepared.bundle.work_order!.work_order_id,
    ).completed;
    await writeFile(
      prepared.bundle.execution.artifact_paths.result_path,
      `${JSON.stringify(semantic)}\n`,
      "utf8",
    );

    const response = await invoke(prepared, "knowledge_search", {
      query: "execution boundary",
    });

    expect(response).toMatchObject({
      status: "denied",
      code: "terminal_result_exists",
      audit: null,
    });
  });
});
