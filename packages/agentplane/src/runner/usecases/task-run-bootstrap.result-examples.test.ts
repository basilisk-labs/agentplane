import { describe, expect, it } from "vitest";

import {
  AGENT_SEMANTIC_RESULT_STATUS_VALUES,
  AGENT_SEMANTIC_RESULT_V2_INVALID_FIXTURES,
  buildAgentWorkOrderV2ValidFixture,
} from "@agentplaneorg/core/schemas";
import { makeRunnerContextBundle } from "@agentplane/testkit/runner";

import {
  InvalidRunnerResultManifestError,
  parseRunnerResultManifestText,
} from "../result-manifest.js";
import { renderTaskRunnerBootstrap } from "./task-run.js";

function extractResultExamples(bootstrap: string): Map<string, string> {
  return new Map(
    bootstrap
      .split("\n")
      .map((line) => /^- ([a-z_]+): (\{.*\})$/u.exec(line))
      .filter((match): match is RegExpExecArray => match !== null)
      .map((match) => [match[1]!, match[2]!]),
  );
}

describe("runner bootstrap result examples", () => {
  it("round-trips every advertised v2 example through the production parser", () => {
    const bundle = makeRunnerContextBundle({ runId: "run-bootstrap-examples" });
    const bootstrap = renderTaskRunnerBootstrap(bundle);
    const examples = extractResultExamples(bootstrap);

    expect([...examples.keys()]).toEqual(AGENT_SEMANTIC_RESULT_STATUS_VALUES);
    for (const status of AGENT_SEMANTIC_RESULT_STATUS_VALUES) {
      const raw = examples.get(status);
      expect(raw).toBeDefined();
      const parsed = parseRunnerResultManifestText(raw!, `${status}/result.json`);
      const rawObject = JSON.parse(raw!) as Record<string, unknown>;
      expect(parsed.source_schema_version).toBe(2);
      expect(parsed.semantic_result.value).toMatchObject({
        work_order_id: "run-bootstrap-examples",
        status,
      });
      for (const supervisorOwnedField of [
        "artifacts",
        "changed_paths",
        "evidence",
        "exit_code",
        "metrics",
      ]) {
        expect(rawObject).not.toHaveProperty(supervisorOwnedField);
      }
    }
    expect(
      [...examples.values()].map(
        (raw) => (JSON.parse(raw) as { schema_version: number }).schema_version,
      ),
    ).toEqual(AGENT_SEMANTIC_RESULT_STATUS_VALUES.map(() => 2));
  });

  it("binds examples to the prepared invocation and renders deterministically", () => {
    const bundle = makeRunnerContextBundle({ runId: "bundle-run" });
    const invocation = {
      adapter_id: "custom",
      run_id: "invocation-run",
      work_order_id: "work-order-current",
      repository_root: "/repo",
      run_dir: "/repo/run",
      bundle_path: "/repo/run/bundle.json",
      state_path: "/repo/run/run-state.json",
      events_path: "/repo/run/events.jsonl",
      result_path: "/repo/run/result.json",
      receipt_path: "/repo/run/execution-receipt.json",
      trace_path: "/repo/run/trace.jsonl",
      stderr_path: "/repo/run/stderr.log",
      trace_policy: bundle.execution.trace_policy,
      timeout_policy: bundle.execution.timeout_policy,
      argv: ["runner"],
      env: {},
      dry_run: false,
    } as const;

    const first = renderTaskRunnerBootstrap(bundle, invocation);
    const second = renderTaskRunnerBootstrap(bundle, invocation);

    expect(first).toBe(second);
    for (const raw of extractResultExamples(first).values()) {
      expect(JSON.parse(raw)).toMatchObject({ work_order_id: "work-order-current" });
    }
  });

  it("routes every Codex semantic output through the supervisor", () => {
    const bundle = makeRunnerContextBundle({ runId: "read-only-run" });
    bundle.execution.sandbox_policy = {
      requested: "read-only",
      source: "role_default",
      role: "EVALUATOR",
      authority: {
        danger_full_access_authorized: false,
        provenance: null,
        source: null,
      },
    };

    const bootstrap = renderTaskRunnerBootstrap(bundle);

    expect(bootstrap).toContain("Do not attempt to write result_path.");
    expect(bootstrap).toContain("the supervisor writes and validates result_path");
    expect(bootstrap).toContain(
      "The parent CLI owns those actions. The only exception is an exact run-scoped phase-tool invocation listed below.",
    );
    expect(bootstrap).not.toContain(
      "Execute-mode runs must write a valid AgentSemanticResult v2 JSON manifest",
    );

    bundle.execution.sandbox_policy.requested = "workspace-write";
    const workspaceWriteBootstrap = renderTaskRunnerBootstrap(bundle);
    expect(workspaceWriteBootstrap).toContain("Do not attempt to write result_path.");
    expect(workspaceWriteBootstrap).not.toContain(
      "Execute-mode runs must write a valid AgentSemanticResult v2 JSON manifest",
    );
  });

  it("renders the complete exact run-scoped API without depending on global help", () => {
    const bundle = makeRunnerContextBundle({ runId: "phase-tool-bootstrap" });
    const workOrder = buildAgentWorkOrderV2ValidFixture();
    bundle.work_order = workOrder;
    bundle.execution.phase_tools = {
      schema_version: 1,
      kind: "runner_phase_tool_manifest",
      run_id: bundle.execution.run_id,
      work_order_id: workOrder.work_order_id,
      task_id: bundle.task!.metadata.task_id,
      phase: "semantic_episode",
      role: workOrder.role,
      global_help_required: false,
      token: {
        id: "token-1",
        issued_at: "2026-07-31T00:00:00.000Z",
        expires_at: "2026-07-31T00:30:00.000Z",
        terminal_reports_revoke: true,
      },
      tools: [
        {
          name: "report_result",
          allowed: true,
          transport: "run_scoped_command",
          enforcement: "supervisor",
          invocation: "agentplane task run tool report_result",
          input_mode: "stdin_json",
          input_schema: {
            $ref: "https://agentplane.org/schemas/agent-semantic-result.schema.json",
          },
          reason: null,
        },
        {
          name: "knowledge_show",
          allowed: false,
          transport: "none",
          enforcement: "advisory",
          invocation: null,
          input_mode: "terminal_result",
          input_schema: { type: "object" },
          reason: "The adapter does not expose this phase tool.",
        },
      ],
      repository_tool_classes: ["repository_read", "workspace_write"],
      grant_path: "/protected/run/phase-tools/grant.json",
      audit_directory: "/protected/run/phase-tools/audits",
    };

    const bootstrap = renderTaskRunnerBootstrap(bundle);

    expect(bootstrap).toContain("Run-scoped phase tool contract:");
    expect(bootstrap).toContain("- global_help_required: false");
    expect(bootstrap).toContain(
      "report_result: transport=run_scoped_command enforcement=supervisor invocation=agentplane task run tool report_result",
    );
    expect(bootstrap).toContain("knowledge_show: unavailable");
    expect(bootstrap).toContain("Never print the token or pass it on argv.");
    expect(bootstrap).not.toContain("agentplane help");

    const reportResult = bundle.execution.phase_tools.tools[0]!;
    reportResult.transport = "terminal_result";
    reportResult.enforcement = "adapter";
    reportResult.invocation = null;
    reportResult.input_mode = "terminal_result";
    const terminalOnlyBootstrap = renderTaskRunnerBootstrap(bundle);
    expect(terminalOnlyBootstrap).toContain("This adapter exposes no run_scoped_command transport");
    expect(terminalOnlyBootstrap).not.toContain(
      "The supervisor injects the signed token and a checkout-local broker channel",
    );
  });

  it.each([
    [
      "blocked without blocker",
      AGENT_SEMANTIC_RESULT_V2_INVALID_FIXTURES.blocked_without_blocker,
      "blocker",
    ],
    [
      "needs_context without knowledge_request",
      AGENT_SEMANTIC_RESULT_V2_INVALID_FIXTURES.needs_context_without_knowledge_request,
      "knowledge_request",
    ],
    [
      "supervisor-owned exit_code",
      AGENT_SEMANTIC_RESULT_V2_INVALID_FIXTURES.supervisor_owned_exit_code,
      "exit_code",
    ],
  ])(
    "rejects the explicit negative fixture %s with the typed parser error",
    (_name, fixture, expectedReason) => {
      const raw = JSON.stringify(fixture);
      let error: InvalidRunnerResultManifestError | null = null;
      try {
        parseRunnerResultManifestText(raw, "negative/result.json");
      } catch (caught) {
        error = caught as InvalidRunnerResultManifestError;
      }

      expect(error).toBeInstanceOf(InvalidRunnerResultManifestError);
      expect(error?.result_path).toBe("negative/result.json");
      expect(error?.raw_content).toBe(raw);
      expect(error?.reason).toContain(expectedReason);
    },
  );

  it("rejects malformed JSON with the typed parser error", () => {
    expect(() =>
      parseRunnerResultManifestText('{"schema_version":2', "malformed/result.json"),
    ).toThrow(InvalidRunnerResultManifestError);
  });
});
