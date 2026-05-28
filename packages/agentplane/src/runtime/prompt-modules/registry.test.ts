import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  compilePromptModuleGraph,
  loadFrameworkPromptModuleRegistry,
  loadFrameworkPromptModules,
} from "./index.js";
import {
  loadAgentTemplates,
  loadPolicyGatewayTemplate,
  loadPolicyTemplates,
  renderMarkdownPromptTemplate,
} from "../../agents/agents-template.js";
import type { PromptModule } from "./index.js";
import type { ResolvedExecutionProfileRuntime } from "../execution-profile/index.js";

function sha256(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

function moduleAddressValues(modules: Awaited<ReturnType<typeof loadFrameworkPromptModules>>) {
  return modules.map((module) => module.address.value);
}

function assembleStringModules(modules: PromptModule[]): string {
  return modules
    .toSorted((left, right) => {
      const orderDiff =
        (left.provenance.fragment_index ?? 0) - (right.provenance.fragment_index ?? 0);
      if (orderDiff !== 0) return orderDiff;
      return left.address.value.localeCompare(right.address.value);
    })
    .map((module) => (typeof module.content === "string" ? module.content : ""))
    .join("");
}

function sampleExecutionProfile(): ResolvedExecutionProfileRuntime {
  return {
    profile: "balanced",
    reasoning_effort: "medium",
    text_verbosity: "medium",
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

    expect(addresses).toContain(
      "framework/gateway/AGENTS.md/purpose/gateway.agents.purpose.purpose",
    );
    expect(addresses).toContain(
      "framework/gateway/CLAUDE.md/purpose/gateway.agents.purpose.purpose",
    );
    expect(addresses).toContain(
      "framework/runner/runner.bundle/body/runner.bundle.body.framework.runner",
    );
    expect(addresses).toContain(
      "framework/agent_profile/.agentplane~agents/workflow/agent.coder.workflow.goal",
    );
    expect(addresses).not.toContain("framework/gateway/AGENTS.md/body/template");
    expect(
      modules.filter((module) => module.address.surface === "agent_profile").length,
    ).toBeGreaterThan(agentTemplates.length);
    expect(modules.filter((module) => module.address.surface === "policy").length).toBeGreaterThan(
      policyTemplates.length,
    );
    expect(new Set(addresses).size).toBe(addresses.length);
    expect(modules.every((module) => module.owner.kind === "framework")).toBe(true);
    expect(modules.every((module) => module.provenance.content_hash)).toBe(true);
    expect(
      modules.some(
        (module) => module.provenance.fragment_id === "gateway.agents.load_rules.load.rules",
      ),
    ).toBe(true);
  });

  it("preserves source parity for bundled runner and agent profile content", async () => {
    const modules = await loadFrameworkPromptModules();
    const runner = modules.find(
      (module) =>
        module.address.value ===
        "framework/runner/runner.bundle/body/runner.bundle.body.framework.runner",
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
    const runnerAsset = renderMarkdownPromptTemplate(runnerAssetRaw, {
      source_ref: "packages/agentplane/assets/RUNNER.md",
    }).contents;
    const agentTemplates = await loadAgentTemplates();
    const coderAsset = agentTemplates.find(
      (template) => template.fileName === "CODER.json",
    )?.contents;

    expect(runner?.content).toBe(runnerAsset);
    expect(runner?.provenance.content_hash).toBe(sha256(runnerAsset));
    expect(runner?.provenance.fragment_id).toBe("runner.bundle.body.framework.runner");
    expect(coder?.content).toBe(coderAsset);
    expect(coder?.content).toBe(`${coderAssetRaw.trimEnd()}\n`);
    expect(coder?.provenance.source_ref).toBe("packages/agentplane/assets/agents/CODER.json");
  });

  it("uses load conditions for gateway flavor and workflow-specific policy modules", async () => {
    const registry = await loadFrameworkPromptModuleRegistry();
    const policyTemplates = await loadPolicyTemplates();
    const compiled = compilePromptModuleGraph({
      graph: registry,
      context: {
        policy_gateway: "codex",
        workflow_mode: "branch_pr",
      },
    });
    const addresses = compiled.nodes.map((node) => node.module.address.value);

    expect(compiled.ok).toBe(true);
    expect(addresses).toContain(
      "framework/gateway/AGENTS.md/load_rules/gateway.agents.load_rules.load.rules",
    );
    expect(addresses).not.toContain(
      "framework/gateway/CLAUDE.md/load_rules/gateway.agents.load_rules.load.rules",
    );
    expect(addresses).toContain(
      "framework/policy/.agentplane~policy/workflow/policy.workflow.branch_pr.workflow.required.sequence",
    );
    expect(addresses).not.toContain(
      "framework/policy/.agentplane~policy/workflow/policy.workflow.direct.workflow.required.sequence",
    );
    expect(addresses).not.toContain(
      "framework/policy/.agentplane~policy/body/policy.framework_dev.body.framework.dev",
    );
    expect(addresses).not.toContain(
      "framework/policy/.agentplane~policy/body/policy.context.must.body.context.must",
    );

    const compiledModules = compiled.nodes.map((node) => node.module);
    const gatewayText = assembleStringModules(
      compiledModules.filter(
        (module) => module.address.surface === "gateway" && module.address.target === "AGENTS.md",
      ),
    );
    expect(gatewayText).toBe(await loadPolicyGatewayTemplate("codex"));

    const branchPolicyText = assembleStringModules(
      compiledModules.filter(
        (module) =>
          module.address.surface === "policy" &&
          module.provenance.source_ref.startsWith(
            "packages/agentplane/assets/policy/workflow.branch_pr.md#",
          ),
      ),
    );
    expect(branchPolicyText).toBe(
      policyTemplates.find((template) => template.relativePath === "workflow.branch_pr.md")
        ?.contents,
    );

    const contextCompiled = compilePromptModuleGraph({
      graph: registry,
      context: {
        command: "context",
        commands: ["context"],
        policy_gateway: "codex",
        workflow_mode: "branch_pr",
      },
    });
    const contextAddresses = contextCompiled.nodes.map((node) => node.module.address.value);
    expect(contextCompiled.ok).toBe(true);
    expect(contextAddresses).toContain(
      "framework/policy/.agentplane~policy/body/policy.context.must.body.context.must",
    );
  });

  it("loads framework development policy only for framework repo type", async () => {
    const registry = await loadFrameworkPromptModuleRegistry();
    const normal = compilePromptModuleGraph({
      graph: registry,
      context: {
        policy_gateway: "codex",
        workflow_mode: "branch_pr",
      },
    });
    const framework = compilePromptModuleGraph({
      graph: registry,
      context: {
        policy_gateway: "codex",
        workflow_mode: "branch_pr",
        repo_type: "framework",
      },
    });
    const normalAddresses = normal.nodes.map((node) => node.module.address.value);
    const frameworkAddresses = framework.nodes.map((node) => node.module.address.value);
    const frameworkPolicyAddress =
      "framework/policy/.agentplane~policy/body/policy.framework_dev.body.framework.dev";

    expect(normal.ok).toBe(true);
    expect(framework.ok).toBe(true);
    expect(normalAddresses).not.toContain(frameworkPolicyAddress);
    expect(frameworkAddresses).toContain(frameworkPolicyAddress);
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
    expect(executionProfile?.content).toContain('"text_verbosity": "medium"');
  });
});
