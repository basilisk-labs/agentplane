import { describe, expect, it } from "vitest";

import { buildAgentWorkOrderV2ValidFixture } from "@agentplaneorg/core/schemas";
import { makeRunnerContextBundle } from "@agentplane/testkit/runner";

import { CODEX_RUN_PROFILE_CAPABILITIES } from "../adapters/codex-preparation.js";
import { buildCustomCapabilities } from "../adapters/custom-preparation.js";
import { RUNNER_PHASE_TOOL_NAMES, type RunnerAdapterCapabilities } from "../types.js";
import { buildRunnerPhaseToolManifest } from "./contract.js";

const TOKEN = {
  id: "token-1",
  issued_at: "2026-07-31T00:00:00.000Z",
  expires_at: "2026-07-31T00:30:00.000Z",
  terminal_reports_revoke: true,
} as const;

function manifestFor(capabilities: RunnerAdapterCapabilities) {
  const workOrder = buildAgentWorkOrderV2ValidFixture();
  const bundle = makeRunnerContextBundle({
    taskId: workOrder.task.id,
    runId: "run-phase-tools",
    status: "DOING",
    owner: "CODER",
    mode: "execute",
  });
  bundle.work_order = workOrder;
  bundle.execution.adapter_capabilities = capabilities;
  return buildRunnerPhaseToolManifest({
    bundle,
    token: TOKEN,
    grant_path: "/protected/run/phase-tools/grant.json",
    audit_directory: "/protected/run/phase-tools/audits",
  });
}

describe("runner phase-tool contract", () => {
  it("declares every Codex phase tool as an exact supervisor-enforced run command", () => {
    const manifest = manifestFor(CODEX_RUN_PROFILE_CAPABILITIES);

    expect(manifest).not.toBeNull();
    expect(manifest?.global_help_required).toBe(false);
    expect(manifest?.tools.map((tool) => tool.name)).toEqual(RUNNER_PHASE_TOOL_NAMES);
    for (const [index, name] of RUNNER_PHASE_TOOL_NAMES.entries()) {
      expect(manifest?.tools[index]).toMatchObject({
        name,
        allowed: true,
        transport: "run_scoped_command",
        enforcement: "supervisor",
        invocation: `agentplane task run tool ${name}`,
        input_mode: "stdin_json",
        reason: null,
      });
    }
    expect(manifest?.repository_tool_classes).toEqual([
      "git_read",
      "repository_read",
      "run_checks",
      "workspace_write",
    ]);
  });

  it("states custom-adapter interactive limitations instead of implying support", () => {
    const manifest = manifestFor(buildCustomCapabilities(undefined));
    const byName = new Map(manifest?.tools.map((tool) => [tool.name, tool]));

    expect(byName.get("report_result")).toMatchObject({
      allowed: true,
      transport: "terminal_result",
      invocation: null,
      input_mode: "terminal_result",
    });
    expect(byName.get("request_knowledge")).toMatchObject({
      allowed: true,
      transport: "terminal_result",
      invocation: null,
    });
    for (const name of ["knowledge_search", "knowledge_show"] as const) {
      expect(byName.get(name)).toMatchObject({
        allowed: false,
        transport: "none",
        invocation: null,
      });
      expect(byName.get(name)?.reason).toContain("does not declare");
    }
  });

  it("keeps work-order authority narrower than adapter capability", () => {
    const workOrder = buildAgentWorkOrderV2ValidFixture();
    workOrder.authority.allowed_tool_classes = workOrder.authority.allowed_tool_classes.filter(
      (toolClass) => toolClass !== "report_blocker",
    );
    const bundle = makeRunnerContextBundle({
      taskId: workOrder.task.id,
      runId: "run-narrow-authority",
      mode: "execute",
    });
    bundle.work_order = workOrder;
    bundle.execution.adapter_capabilities = CODEX_RUN_PROFILE_CAPABILITIES;

    const manifest = buildRunnerPhaseToolManifest({
      bundle,
      token: TOKEN,
      grant_path: "/protected/run/phase-tools/grant.json",
      audit_directory: "/protected/run/phase-tools/audits",
    });
    const reportBlocker = manifest?.tools.find((tool) => tool.name === "report_blocker");

    expect(reportBlocker).toMatchObject({
      allowed: false,
      transport: "run_scoped_command",
      invocation: null,
    });
    expect(reportBlocker?.reason).toContain("does not grant report_blocker");
  });
});
