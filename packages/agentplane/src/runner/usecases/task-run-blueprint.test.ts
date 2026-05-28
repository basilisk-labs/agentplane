import { describe, expect, it } from "vitest";

import { makeRunnerContextBundle } from "@agentplane/testkit/runner";

import { buildRunnerExecutionPlaybookContract } from "../playbooks.js";
import { assertRunnerBlueprintPolicyModuleBudget, renderTaskRunnerBootstrap } from "./task-run.js";

describe("runner blueprint guards", () => {
  it("starts codex task bootstraps with the /goal slash command", () => {
    const bundle = makeRunnerContextBundle({
      adapterId: "codex",
      taskId: "202605271519-3ES6T7",
      title: "Start Codex runner prompts with /goal",
    });

    const bootstrap = renderTaskRunnerBootstrap(bundle);

    expect(bootstrap.split("\n")[0]).toBe(
      "/goal Execute AgentPlane task 202605271519-3ES6T7: Start Codex runner prompts with /goal",
    );
    expect(bootstrap).toContain("# agentplane runner bootstrap");
    expect(bootstrap).toContain(
      "- bundle_path: /repo/.agentplane/tasks/202605271519-3ES6T7/runs/run-123/bundle.json",
    );
    expect(bootstrap).toContain(
      "- result_path: /repo/.agentplane/tasks/202605271519-3ES6T7/runs/run-123/result.json",
    );
    expect(bootstrap).toContain("Keep lifecycle authority with the parent AgentPlane workflow");
    expect(bootstrap).toContain("Assume sibling runners may be executing concurrently");
    expect(bootstrap).toContain("report possible write conflicts in the result manifest");
  });

  it("leaves non-codex task bootstraps on the standard runner heading", () => {
    const bundle = makeRunnerContextBundle({
      adapterId: "custom",
      taskId: "202605271519-3ES6T7",
      title: "Start Codex runner prompts with /goal",
    });

    const bootstrap = renderTaskRunnerBootstrap(bundle);

    expect(bootstrap.split("\n")[0]).toBe("# agentplane runner bootstrap");
    expect(bootstrap).not.toContain("/goal");
  });

  it("renders route oracle fields into the runner bootstrap", () => {
    const bundle = makeRunnerContextBundle();
    bundle.route_decision = {
      oracle: {
        phase: "worktree_needed",
        authoritativeCheckout: "base_checkout",
        authoritativeCheckoutPath: "/repo",
        mutationPathHint: "/repo",
        blocker: {
          code: "missing_pr_branch",
          summary: "branch_pr task has no recorded PR branch",
        },
        nextCommand: "agentplane work start 202603231410-ABC123 --agent CODER --worktree",
      },
      executionPacket: { safeToMutate: true },
      nextAction: {
        code: "start_or_recover_worktree",
        command: "agentplane work start 202603231410-ABC123 --agent CODER --worktree",
      },
      workspace: { checkoutRole: "base" },
      approval: { effectiveMutationApprovalRequired: false },
    };

    const bootstrap = renderTaskRunnerBootstrap(bundle);

    expect(bootstrap).toContain("- route_phase: worktree_needed");
    expect(bootstrap).toContain("- route_authoritative_checkout: base_checkout");
    expect(bootstrap).toContain("- route_authoritative_checkout_path: /repo");
    expect(bootstrap).toContain("- route_mutation_path_hint: /repo");
    expect(bootstrap).toContain("- route_safe_to_mutate: true");
    expect(bootstrap).toContain("- route_primary_blocker: missing_pr_branch");
    expect(bootstrap).toContain("run it from route_authoritative_checkout_path");
    expect(bootstrap).toContain("use absolute paths under route_mutation_path_hint");
    expect(bootstrap).toContain("route_decision.oracle.nextCommand");
  });

  it("rejects bundle policy modules that exceed the resolved blueprint budget", () => {
    const bundle = makeRunnerContextBundle();
    bundle.blueprint = {
      schemaVersion: 1,
      blueprintId: "code.branch_pr",
      blueprintVersion: 1,
      title: "Code PR",
      taskIntent: {},
      whySelected: [],
      states: [],
      requiredEvidence: [],
      policyModules: [".agentplane/policy/security.must.md", ".agentplane/policy/dod.core.md"],
      allowedCommands: [],
      contextBudget: { maxPolicyModules: 1, maxPromptBlocks: 8, rationale: "test budget" },
      contextManifest: [
        {
          id: ".agentplane/policy/security.must.md",
          kind: "policy_module",
          reason: "test",
          source: ".agentplane/policy/security.must.md",
        },
        {
          id: ".agentplane/policy/dod.core.md",
          kind: "policy_module",
          reason: "test",
          source: ".agentplane/policy/dod.core.md",
        },
      ],
      acceptedRecipeExtensions: [],
      rejectedRecipeExtensions: [],
      stopReasons: [],
    };

    expect(() => assertRunnerBlueprintPolicyModuleBudget(bundle)).toThrow(
      "Runner blueprint policy module budget exceeded.",
    );
  });

  it("renders blueprint stop rules into the runner bootstrap", () => {
    const bundle = makeRunnerContextBundle();
    bundle.blueprint = {
      schemaVersion: 1,
      blueprintId: "analysis.light",
      blueprintVersion: 1,
      title: "Analysis",
      taskIntent: {},
      whySelected: [],
      states: [],
      requiredEvidence: [],
      policyModules: [],
      allowedCommands: [],
      contextBudget: { maxPolicyModules: 0, maxPromptBlocks: 8, rationale: "test budget" },
      contextManifest: [],
      acceptedRecipeExtensions: [],
      rejectedRecipeExtensions: [],
      stopReasons: [{ id: "scope_drift", severity: "hard", reason: "Task scope changed." }],
    };

    expect(renderTaskRunnerBootstrap(bundle)).toContain("Blueprint stop rules:");
    expect(renderTaskRunnerBootstrap(bundle)).toContain("hard: Task scope changed. (scope_drift)");
  });

  it("renders execution playbook verifier checks into the runner bootstrap", () => {
    const bundle = makeRunnerContextBundle({
      title: "Capture inbox item",
      description: "Create capture, distill card, thread update, and retire the source.",
    });
    bundle.playbook = buildRunnerExecutionPlaybookContract(bundle);

    const bootstrap = renderTaskRunnerBootstrap(bundle);

    expect(bootstrap).toContain("Execution playbook contract:");
    expect(bootstrap).toContain("selected_playbook: knowledge_capture_pipeline");
    expect(bootstrap).toContain("source_retired");
  });
});
