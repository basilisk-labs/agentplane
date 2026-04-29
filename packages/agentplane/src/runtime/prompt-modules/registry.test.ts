import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  compilePromptModuleGraph,
  loadFrameworkPromptModuleRegistry,
  loadFrameworkPromptModules,
} from "./index.js";
import { loadAgentTemplates, loadPolicyTemplates } from "../../agents/agents-template.js";
import type { ResolvedExecutionProfileRuntime } from "../execution-profile/index.js";

function sha256(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

function moduleAddressValues(modules: Awaited<ReturnType<typeof loadFrameworkPromptModules>>) {
  return modules.map((module) => module.address.value);
}

function sampleExecutionProfile(): ResolvedExecutionProfileRuntime {
  return {
    profile: "balanced",
    reasoning_effort: "medium",
    budget: {
      discovery: { limit: 6, used: 0, remaining: 6, exhausted: false },
      implementation: { limit: 10, used: 0, remaining: 10, exhausted: false },
      verification: { limit: 6, used: 0, remaining: 6, exhausted: false },
    },
    approvals: {
      require_plan: false,
      require_network: true,
      require_verify: false,
    },
    stop_conditions: ["Stop on scope drift."],
    handoff_conditions: ["Handoff on role boundary."],
    unsafe_actions_requiring_explicit_user_ok: ["Destructive git history operations."],
    runner: {
      trace_policy: {
        enabled: true,
        persist_raw_events: true,
        persist_summaries: true,
      },
      timeout_policy: {
        idle_timeout_ms: 60_000,
        max_runtime_ms: 120_000,
      },
    },
  };
}

describe("framework prompt module registry", () => {
  it("wraps bundled gateway, policy, agent profile, and runner sources as framework modules", async () => {
    const modules = await loadFrameworkPromptModules();
    const addresses = moduleAddressValues(modules);
    const agentTemplates = await loadAgentTemplates();
    const policyTemplates = await loadPolicyTemplates();

    expect(addresses).toContain("framework/gateway/AGENTS.md/body/template");
    expect(addresses).toContain("framework/gateway/CLAUDE.md/body/template");
    expect(addresses).toContain("framework/runner/runner.bundle/body/framework_runner");
    expect(modules.filter((module) => module.address.surface === "agent_profile")).toHaveLength(
      agentTemplates.length,
    );
    expect(modules.filter((module) => module.address.surface === "policy")).toHaveLength(
      policyTemplates.length,
    );
    expect(new Set(addresses).size).toBe(addresses.length);
    expect(modules.every((module) => module.owner.kind === "framework")).toBe(true);
    expect(modules.every((module) => module.provenance.content_hash)).toBe(true);
  });

  it("preserves source parity for bundled runner and agent profile content", async () => {
    const modules = await loadFrameworkPromptModules();
    const runner = modules.find(
      (module) => module.address.value === "framework/runner/runner.bundle/body/framework_runner",
    );
    const coder = modules.find(
      (module) =>
        module.address.value === "framework/agent_profile/.agentplane~agents/identity/CODER",
    );
    const runnerAssetRaw = await readFile(
      path.join(process.cwd(), "packages", "agentplane", "assets", "RUNNER.md"),
      "utf8",
    );
    const coderAssetRaw = await readFile(
      path.join(process.cwd(), "packages", "agentplane", "assets", "agents", "CODER.json"),
      "utf8",
    );
    const runnerAsset = `${runnerAssetRaw.trimEnd()}\n`;
    const coderAsset = `${coderAssetRaw.trimEnd()}\n`;

    expect(runner?.content).toBe(runnerAsset);
    expect(runner?.provenance.content_hash).toBe(sha256(runnerAsset));
    expect(coder?.content).toBe(coderAsset);
    expect(coder?.provenance.source_ref).toBe("packages/agentplane/assets/agents/CODER.json");
  });

  it("uses load conditions for gateway flavor and workflow-specific policy modules", async () => {
    const registry = await loadFrameworkPromptModuleRegistry();
    const compiled = compilePromptModuleGraph({
      graph: registry,
      context: {
        policy_gateway: "codex",
        workflow_mode: "branch_pr",
      },
    });
    const addresses = compiled.nodes.map((node) => node.module.address.value);

    expect(compiled.ok).toBe(true);
    expect(addresses).toContain("framework/gateway/AGENTS.md/body/template");
    expect(addresses).not.toContain("framework/gateway/CLAUDE.md/body/template");
    expect(addresses).toContain("framework/policy/.agentplane~policy/body/workflow.branch_pr.md");
    expect(addresses).not.toContain("framework/policy/.agentplane~policy/body/workflow.direct.md");
  });

  it("can include runtime execution profile prompt content without changing the default registry", async () => {
    const withoutRuntime = await loadFrameworkPromptModules();
    const withRuntime = await loadFrameworkPromptModules({
      execution_profile: sampleExecutionProfile(),
    });
    const executionProfile = withRuntime.find(
      (module) =>
        module.address.value === "framework/runner/runner.bundle/context/execution_profile",
    );

    expect(moduleAddressValues(withoutRuntime)).not.toContain(
      "framework/runner/runner.bundle/context/execution_profile",
    );
    expect(executionProfile?.content_kind).toBe("json");
    expect(executionProfile?.provenance.source_kind).toBe("runtime");
    expect(typeof executionProfile?.content).toBe("string");
    expect(executionProfile?.content).toContain('"profile": "balanced"');
  });
});
