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
      executionPacket: {
        safeToMutate: true,
        mustRunFrom: "/repo",
        exactArgv: [
          "agentplane",
          "work",
          "start",
          "202603231410-ABC123",
          "--agent",
          "CODER",
          "--worktree",
        ],
        returnControlWhen:
          "after the exact command exits; recompute task next-action before any further step",
        staleStateCheck: "agentplane task next-action 202603231410-ABC123 --explain",
        mustNot: ["do not execute raw shell when exactArgv is null"],
      },
      nextAction: {
        code: "start_or_recover_worktree",
        command: "agentplane work start 202603231410-ABC123 --agent CODER --worktree",
      },
      workspace: { checkoutRole: "base" },
      approval: { effectiveMutationApprovalRequired: false },
    };

    const bootstrap = renderTaskRunnerBootstrap(bundle);

    expect(bootstrap).toContain("- route_phase: worktree_needed");
    expect(bootstrap).toContain("- route_mutation_path_hint: /repo");
    expect(bootstrap).toContain("- route_safe_to_mutate: true");
    expect(bootstrap).toContain("- route_must_run_from: /repo");
    expect(bootstrap).toContain("- route_return_control_when: after the exact command exits");
    expect(bootstrap).toContain(
      "Treat the rendered route fields as supervisor-resolved constraints",
    );
    expect(bootstrap).toContain("Do not recompute workflow state");
    expect(bootstrap).toContain("use absolute paths under route_mutation_path_hint");
    expect(bootstrap).toContain("the parent supervisor owns the next state transition");
    expect(bootstrap).toContain("Route must-not rules:");
    expect(bootstrap).not.toContain("- route_next_command:");
    expect(bootstrap).not.toContain("- route_exact_argv:");
    expect(bootstrap).not.toContain("- route_stale_state_check:");
    expect(bootstrap).not.toContain("- route_requires_provider_action:");
    expect(bootstrap).not.toContain(
      "run `agentplane task next-action <task-id> --explain` before mutating",
    );
  });

  it("renders configured evaluator skepticism into the runner bootstrap", () => {
    const bundle = makeRunnerContextBundle({
      execution: { evaluator_skepticism_level: "paranoid" },
    });

    const bootstrap = renderTaskRunnerBootstrap(bundle);

    expect(bootstrap).toContain("Evaluator skepticism contract:");
    expect(bootstrap).toContain("- evaluator_skepticism_level: paranoid");
    expect(bootstrap).toContain(
      "assume the implementation is incomplete until each critical claim is backed by direct code",
    );
    expect(bootstrap).toContain("Prefer rework over pass for ambiguous ownership");
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
