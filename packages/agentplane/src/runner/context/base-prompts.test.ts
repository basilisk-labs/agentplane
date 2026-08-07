import { mkdir, mkdtemp, rm, stat, utimes, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { buildExecutionProfile, defaultConfig } from "@agentplaneorg/core/config";
import { makeRunnerContextBundle } from "@agentplane/testkit/runner";
import { afterEach, describe, expect, it } from "vitest";

import { resolveExecutionProfileRuntime } from "../../runtime/execution-profile/index.js";
import type { RunnerTaskContext } from "../types.js";
import {
  assertSemanticProviderPromptHasNoProcessChoreography,
  collectSemanticPolicyModulePrompts,
  collectRunnerBasePrompts,
  compileRunnerPromptModuleGraph,
  hasExplicitProcessMechanismRepairAuthority,
  projectRunnerPromptsForSemanticEpisode,
  resolveOwnerProfilePromptSource,
  resolvePolicyGatewayPromptSource,
  runnerPromptBlocksToModuleGraph,
} from "./base-prompts.js";

const tempDirs = new Set<string>();

async function makeTempRepo(): Promise<string> {
  const dir = await mkdtemp(path.join(os.tmpdir(), "agentplane-runner-base-prompts-"));
  tempDirs.add(dir);
  return dir;
}

afterEach(async () => {
  const dirs = [...tempDirs];
  tempDirs.clear();
  await Promise.all(dirs.map(async (dir) => rm(dir, { recursive: true, force: true })));
});

describe("collectRunnerBasePrompts", () => {
  it("projects structured gateway fragments and role constraints for semantic episodes", async () => {
    const root = await makeTempRepo();
    const agentsDir = path.join(root, ".agentplane", "agents");
    await mkdir(agentsDir, { recursive: true });
    await writeFile(
      path.join(root, "AGENTS.md"),
      [
        '<!-- ap:fragment id="project.purpose" slot="purpose" mutability="replaceable" -->',
        "# Project purpose",
        "Build the bounded requested behavior.",
        "<!-- /ap:fragment -->",
        '<!-- ap:fragment id="project.scope" slot="hard_constraint" mutability="append_only" -->',
        "Stay inside the supplied writable roots.",
        "Keep secrets out of logs. Run agentplane task start-ready TASK only from recovery mode.",
        "Preserve API compatibility. Return typed output to the supplied result path.",
        "Keep failure evidence. Request a fresh packet after a state transition.",
        "<!-- /ap:fragment -->",
        '<!-- ap:fragment id="project.commands" slot="commands" mutability="replaceable" -->',
        "agentplane task start-ready TASK --author CODER",
        "git commit -m implementation",
        "<!-- /ap:fragment -->",
      ].join("\n"),
    );
    await writeFile(
      path.join(agentsDir, "CODER.json"),
      JSON.stringify(
        {
          id: "CODER",
          role: "Run agentplane verify and agentplane finish after implementation.",
        },
        null,
        2,
      ),
    );

    const prompts = await collectRunnerBasePrompts({
      git_root: root,
      owner_id: "CODER",
    });
    const projected = projectRunnerPromptsForSemanticEpisode({
      prompts,
      role: "EXECUTOR",
    });
    const serialized = projected.map((prompt) => prompt.content).join("\n");

    expect(projected.find((prompt) => prompt.id === "base.policy_gateway")?.content).toContain(
      "Build the bounded requested behavior.",
    );
    expect(serialized).toContain("Stay inside the supplied writable roots.");
    expect(serialized).toContain("Keep secrets out of logs.");
    expect(serialized).toContain("Preserve API compatibility.");
    expect(serialized).toContain("Keep failure evidence.");
    expect(serialized).toContain('"semantic_role": "EXECUTOR"');
    expect(serialized).not.toContain("task start-ready");
    expect(serialized).not.toContain("git commit");
    expect(serialized).not.toContain("agentplane verify");
    expect(serialized).not.toMatch(/result path|fresh packet|state transition/iu);
    expect(() =>
      assertSemanticProviderPromptHasNoProcessChoreography({ prompt: serialized }),
    ).not.toThrow();
  });

  it.each(["PLANNER", "EXECUTOR", "EVALUATOR"] as const)(
    "allowlists only canonical semantic gateway fragments for %s",
    async (role) => {
      const root = await makeTempRepo();
      await writeFile(
        path.join(root, "AGENTS.md"),
        [
          '<!-- ap:fragment id="gateway.agents.purpose.purpose" slot="purpose" mutability="replaceable" -->',
          "Build the requested product behavior.",
          "<!-- /ap:fragment -->",
          '<!-- ap:fragment id="gateway.agents.purpose.project" slot="purpose" mutability="replaceable" -->',
          "Return output to the supplied result path and request a fresh packet.",
          "<!-- /ap:fragment -->",
          '<!-- ap:fragment id="gateway.agents.hard_constraint.scope.boundary" slot="hard_constraint" mutability="append_only" -->',
          "Stay inside the repository and granted writable roots.",
          "<!-- /ap:fragment -->",
          '<!-- ap:fragment id="gateway.agents.hard_constraint.must.must.not" slot="hard_constraint" mutability="append_only" -->',
          "Defer every formal transition and verification persistence operation.",
          "<!-- /ap:fragment -->",
        ].join("\n"),
      );
      const prompts = await collectRunnerBasePrompts({
        git_root: root,
        owner_id: role === "EXECUTOR" ? "CODER" : role,
      });
      const serialized = projectRunnerPromptsForSemanticEpisode({ prompts, role })
        .map((prompt) => prompt.content)
        .join("\n");

      expect(serialized).toContain("Build the requested product behavior.");
      expect(serialized).toContain("Stay inside the repository and granted writable roots.");
      expect(serialized).not.toMatch(
        /result path|fresh packet|formal transition|verification persistence/iu,
      );
    },
  );

  it.each(["PLANNER", "EXECUTOR", "EVALUATOR"] as const)(
    "projects applicable security policy constraints without lifecycle prose for %s",
    async (role) => {
      const root = await makeTempRepo();
      const policyRoot = path.join(root, ".agentplane", "policy");
      await mkdir(policyRoot, { recursive: true });
      await writeFile(
        path.join(policyRoot, "security.must.md"),
        [
          '<!-- ap:fragment id="policy.security.must.hard_constraint.rules" slot="hard_constraint" mutability="append_only" -->',
          "# Security rules",
          "- Keep secrets, credentials, and private keys out of commits.",
          "- Access outside-repository files only with explicit user approval.",
          "- Use the network only when the required approval is granted.",
          "- Change authentication, cryptography, or security-critical paths only within explicit scope.",
          "- Report security-sensitive drift and stop before mutation.",
          "<!-- /ap:fragment -->",
        ].join("\n"),
      );
      await writeFile(
        path.join(policyRoot, "workflow.direct.md"),
        [
          '<!-- ap:fragment id="policy.workflow.direct.hard_constraint.route" slot="hard_constraint" mutability="append_only" -->',
          "Run agentplane verify, finish, and integrate after implementation.",
          "<!-- /ap:fragment -->",
        ].join("\n"),
      );

      const projected = await collectSemanticPolicyModulePrompts({
        git_root: root,
        policy_modules: [
          ".agentplane/policy/security.must.md",
          ".agentplane/policy/workflow.direct.md",
        ],
      });
      const serialized = [
        ...projectRunnerPromptsForSemanticEpisode({ prompts: [], role }),
        ...projected,
      ]
        .map((prompt) => prompt.content)
        .join("\n");

      expect(projected).toHaveLength(1);
      expect(serialized).toContain("secrets, credentials, and private keys");
      expect(serialized).toContain("outside-repository files only with explicit user approval");
      expect(serialized).toContain("network only when the required approval is granted");
      expect(serialized).toContain("authentication, cryptography, or security-critical paths");
      expect(serialized).toContain("security-sensitive drift and stop before mutation");
      expect(serialized).not.toMatch(/agentplane verify|finish|integrate/iu);
      expect(() =>
        assertSemanticProviderPromptHasNoProcessChoreography({ prompt: serialized }),
      ).not.toThrow();
    },
  );

  it.each(["PLANNER", "EXECUTOR", "EVALUATOR"] as const)(
    "rejects process choreography in an exact %s provider prompt",
    (role) => {
      const safePrompt = `semantic_role=${role}\nobjective=Implement the supplied behavior.`;
      expect(() =>
        assertSemanticProviderPromptHasNoProcessChoreography({ prompt: safePrompt }),
      ).not.toThrow();
      expect(() =>
        assertSemanticProviderPromptHasNoProcessChoreography({
          prompt: `${safePrompt}\nagentplane task next-action TASK --explain`,
        }),
      ).toThrow(/process choreography/u);
      expect(() =>
        assertSemanticProviderPromptHasNoProcessChoreography({
          prompt: `${safePrompt}\n- result_path: /repo/.agentplane/run/result.json`,
        }),
      ).toThrow(/process choreography/u);
      expect(() =>
        assertSemanticProviderPromptHasNoProcessChoreography({
          prompt: `${safePrompt}\n- receipt_path: /repo/.agentplane/run/receipt.json`,
        }),
      ).toThrow(/process choreography/u);
    },
  );

  it.each([
    "agentplane config show",
    "ap quickstart",
    "agentplane task create --title Fix",
    "ap task brief TASK",
    "agentplane task active",
    "ap task advance TASK --agent-json",
    "agentplane task run TASK",
    "ap task plan approve TASK --by ORCHESTRATOR",
    "agentplane task verify-show TASK",
    "ap evaluator execute TASK",
    "git status --short",
    "git rev-parse HEAD",
    "git commit -m implementation",
    "git push origin task/TASK/fix",
    "git worktree remove /tmp/worktree",
    "git clean -fd",
    "git reset --hard",
    "git tag v0.7.5",
    "git cherry-pick deadbeef",
    "Run `git clean -fd` before continuing.",
    "Commit changes with git commit -m implementation.",
    "After editing, git push origin task/TASK/fix.",
    "agentplane pr update TASK",
    "gh pr create --fill",
    "gh release create v0.7.5",
    "agentplane verify TASK --ok --by TESTER",
    "agentplane integrate TASK --branch task/TASK/fix",
    "agentplane cleanup TASK",
    "agentplane release plan --patch",
    "ap doctor",
    "agentplane context search query",
    "ap flow repair TASK",
    "npm publish",
    "npm version patch",
    "changeset publish",
  ])("rejects forbidden provider choreography: %s", (command) => {
    expect(() => assertSemanticProviderPromptHasNoProcessChoreography({ prompt: command })).toThrow(
      /process choreography/u,
    );
  });

  it("allows the exact supervisor-issued phase-tool transport", () => {
    expect(() =>
      assertSemanticProviderPromptHasNoProcessChoreography({
        prompt: "Review the Git repository and run git diff --check.",
      }),
    ).not.toThrow();
    expect(() =>
      assertSemanticProviderPromptHasNoProcessChoreography({
        prompt: "agentplane task run tool report_result",
        declared_phase_tool_invocations: ["agentplane task run tool report_result"],
      }),
    ).not.toThrow();
    expect(() =>
      assertSemanticProviderPromptHasNoProcessChoreography({
        prompt: "agentplane task run tool arbitrary",
        declared_phase_tool_invocations: ["agentplane task run tool report_result"],
      }),
    ).toThrow(/process choreography/u);
    expect(() =>
      assertSemanticProviderPromptHasNoProcessChoreography({
        prompt: "agentplane task run tool report_result",
      }),
    ).toThrow(/process choreography/u);
  });

  it("requires an explicit process-repair authority tag before allowing mechanism evidence", () => {
    const genericTask = {
      metadata: { tags: ["prompts", "supervisor"] },
      narrative: {
        title: "Review provider prompts",
        description: "Inspect process choreography in the supervisor protocol.",
        sections: [],
      },
    } as unknown as RunnerTaskContext;
    const explicitTask = {
      ...genericTask,
      metadata: { tags: ["prompts", "process-mechanism-repair"] },
    } as unknown as RunnerTaskContext;

    expect(hasExplicitProcessMechanismRepairAuthority(genericTask)).toBe(false);
    expect(hasExplicitProcessMechanismRepairAuthority(explicitTask)).toBe(true);
  });

  it("keeps the bundled semantic projection materially smaller than the internal policy graph", async () => {
    const root = await makeTempRepo();
    const prompts = await collectRunnerBasePrompts({
      git_root: root,
      owner_id: "CODER",
    });
    const projected = projectRunnerPromptsForSemanticEpisode({
      prompts,
      role: "EXECUTOR",
    });
    const fullBytes = Buffer.byteLength(JSON.stringify(prompts), "utf8");
    const projectedBytes = Buffer.byteLength(JSON.stringify(projected), "utf8");

    expect(projectedBytes).toBeLessThan(fullBytes * 0.5);
    expect(projected.map((prompt) => prompt.content).join("\n")).not.toContain(
      "agentplane task start-ready",
    );
  });

  it("exposes precedence traces for owner profile and policy gateway source selection", async () => {
    const root = await makeTempRepo();
    const agentsDir = path.join(root, ".runtime", "agents");
    await mkdir(agentsDir, { recursive: true });
    await writeFile(path.join(root, "AGENTS.md"), "# Repo Policy\n");
    await writeFile(
      path.join(agentsDir, "CODER.json"),
      JSON.stringify({ id: "CODER", role: "Repo-local coder profile" }, null, 2),
    );

    const owner = await resolveOwnerProfilePromptSource({
      git_root: root,
      agents_dir: ".runtime/agents",
      owner_id: "CODER",
    });
    const gateway = await resolvePolicyGatewayPromptSource({
      git_root: root,
      fallback_flavor: "codex",
    });

    expect(owner.winner.layer).toBe("user");
    expect(owner.conflicts[0]?.layer).toBe("builtin");
    expect(gateway.winner.layer).toBe("harness");
    expect(gateway.conflicts[0]?.layer).toBe("builtin");
  });

  it("prefers repo-local gateway and owner profile sources over bundled fallbacks", async () => {
    const root = await makeTempRepo();
    const agentsDir = path.join(root, ".runtime", "agents");
    await mkdir(agentsDir, { recursive: true });
    await writeFile(
      path.join(root, "AGENTS.md"),
      "# Repo Policy\n\nFollow the workspace contract.\n",
    );
    await writeFile(
      path.join(agentsDir, "CODER.json"),
      JSON.stringify({ id: "CODER", role: "Repo-local coder profile" }, null, 2),
    );

    const prompts = await collectRunnerBasePrompts({
      git_root: root,
      owner_id: "coder",
      agents_dir: ".runtime/agents",
    });

    expect(
      prompts.map((prompt) => ({
        id: prompt.id,
        role: prompt.role,
        priority: prompt.priority,
        source: prompt.source,
        title: prompt.title,
      })),
    ).toMatchInlineSnapshot(`
      [
        {
          "id": "base.policy_gateway",
          "priority": 200,
          "role": "policy",
          "source": "AGENTS.md",
          "title": "Repository Policy Gateway (AGENTS.md)",
        },
        {
          "id": "base.owner_profile",
          "priority": 300,
          "role": "profile",
          "source": ".runtime/agents/CODER.json",
          "title": "Owner Agent Profile (CODER)",
        },
      ]
    `);
    expect(prompts.map((prompt) => prompt.id)).not.toContain("base.framework_runner");
    expect(prompts[0]?.content).toBe("# Repo Policy\n\nFollow the workspace contract.\n");
    expect(prompts[0]?.resolution?.winner.layer).toBe("harness");
    expect(prompts[0]?.resolution?.conflicts[0]?.layer).toBe("builtin");
    expect(prompts[1]?.content).toContain('"role": "Repo-local coder profile"');
    expect(prompts[1]?.resolution?.winner.layer).toBe("user");
  });

  it("falls back cleanly to bundled defaults when repo-local prompt files are absent", async () => {
    const root = await makeTempRepo();

    const prompts = await collectRunnerBasePrompts({
      git_root: root,
      owner_id: "CODER",
    });

    expect(prompts).toHaveLength(2);
    expect(prompts.map((prompt) => prompt.id)).not.toContain("base.framework_runner");
    expect(prompts[0]?.source).toBe("bundled:policy-gateway:AGENTS.md");
    expect(prompts[0]?.title).toBe("Bundled Policy Gateway Fallback (AGENTS.md)");
    expect(prompts[0]?.content).toContain("AGENTS.md");
    expect(prompts[0]?.resolution?.winner.layer).toBe("builtin");
    expect(prompts[1]?.source).toBe("bundled:agent-profile:CODER.json");
    expect(prompts[1]?.content).toContain('"id": "CODER"');
    expect(prompts[1]?.resolution?.winner.layer).toBe("builtin");
  });

  it("assembles runner prompts without an initialized local context workspace", async () => {
    const root = await makeTempRepo();
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, "AGENTS.md"), "# Repo Policy\n\nNo local context layer.\n");

    const prompts = await collectRunnerBasePrompts({
      git_root: root,
      owner_id: "CODER",
    });

    expect(prompts.map((prompt) => prompt.id)).toEqual([
      "base.policy_gateway",
      "base.owner_profile",
    ]);
    expect(prompts.find((prompt) => prompt.id === "base.policy_gateway")?.content).toContain(
      "No local context layer",
    );
  });

  it("keeps the framework runner prompt out of default collections", async () => {
    const root = await makeTempRepo();

    const prompts = await collectRunnerBasePrompts({
      git_root: root,
      owner_id: "CODER",
    });

    expect(prompts.map((prompt) => prompt.id)).not.toContain("base.framework_runner");
  });

  it("includes the framework runner prompt only for active parallel-codex recipes", async () => {
    const root = await makeTempRepo();

    const prompts = await collectRunnerBasePrompts({
      git_root: root,
      owner_id: "CODER",
      recipe: {
        recipe_id: "parallel-codex",
        scenario_id: "fanout",
        recipe_name: "Parallel Codex Runners",
        recipe_version: "1.0.0",
        recipe_dir: path.join(root, ".agentplane", "recipes", "parallel-codex"),
        scenario_file: null,
        selection_reasons: ["explicit recipe activation"],
        run_profile: { mode: "execution" },
        scenario: {
          goal: "Run independent Codex task runners.",
          summary: "Parallel Codex fanout",
        },
        agents: [],
        skills: [],
        tools: [],
      },
    });

    expect(prompts[0]).toMatchObject({
      id: "base.framework_runner",
      source: "bundled:runner-prompt:RUNNER.md",
      title: "Framework Runner Prompt",
    });
    expect(prompts[0]?.content).toContain("This prompt is not part of default agent guidance.");
  });

  it("reloads repo-local prompts when size and mtime are unchanged", async () => {
    const root = await makeTempRepo();
    const agentsDir = path.join(root, ".agentplane", "agents");
    const policyPath = path.join(root, "AGENTS.md");
    const profilePath = path.join(agentsDir, "CODER.json");
    await mkdir(agentsDir, { recursive: true });
    await writeFile(policyPath, "# Repo Policy\n\nInitial policy.\n");
    await writeFile(profilePath, JSON.stringify({ id: "CODER", role: "Initial profile" }, null, 2));
    const [policyStat, profileStat] = await Promise.all([stat(policyPath), stat(profilePath)]);

    const initial = await collectRunnerBasePrompts({
      git_root: root,
      owner_id: "CODER",
    });
    expect(initial.find((prompt) => prompt.id === "base.policy_gateway")?.content).toContain(
      "Initial policy",
    );
    expect(initial.find((prompt) => prompt.id === "base.owner_profile")?.content).toContain(
      "Initial profile",
    );

    await writeFile(policyPath, "# Repo Policy\n\nChanged policy.\n");
    await writeFile(profilePath, JSON.stringify({ id: "CODER", role: "Changed profile" }, null, 2));
    await Promise.all([
      utimes(policyPath, policyStat.atime, policyStat.mtime),
      utimes(profilePath, profileStat.atime, profileStat.mtime),
    ]);

    const updated = await collectRunnerBasePrompts({
      git_root: root,
      owner_id: "CODER",
    });
    expect(updated.find((prompt) => prompt.id === "base.policy_gateway")?.content).toContain(
      "Changed policy",
    );
    expect(updated.find((prompt) => prompt.id === "base.owner_profile")?.content).toContain(
      "Changed profile",
    );
  });

  it("adds project-local skill metadata when skills are present", async () => {
    const root = await makeTempRepo();
    const skillDir = path.join(root, "skills", "release-operator");
    await mkdir(skillDir, { recursive: true });
    await writeFile(
      path.join(skillDir, "SKILL.md"),
      [
        "---",
        "name: release-operator",
        "description: Use when release packaging needs validation.",
        "---",
        "",
        "# Release Operator",
        "",
        "Long body should stay out of the discovery prompt.",
      ].join("\n"),
    );

    const prompts = await collectRunnerBasePrompts({
      git_root: root,
      owner_id: "CODER",
    });

    expect(prompts.map((prompt) => prompt.id)).toEqual([
      "base.policy_gateway",
      "base.owner_profile",
      "project.skills_index",
    ]);
    expect(prompts[2]).toMatchObject({
      role: "context",
      priority: 350,
      source: "skills/*/SKILL.md",
      title: "Repository Skill Discovery",
    });
    expect(prompts[2]?.content).toContain('"name": "release-operator"');
    expect(prompts[2]?.content).toContain(
      '"description": "Use when release packaging needs validation."',
    );
    expect(prompts[2]?.content).toContain('"source": "skills/release-operator/SKILL.md"');
    expect(prompts[2]?.content).not.toContain("Long body");
  });

  it("inserts execution profile runtime constraints before the owner profile when provided", async () => {
    const root = await makeTempRepo();
    const config = defaultConfig();
    config.execution = buildExecutionProfile("conservative");
    const executionProfile = resolveExecutionProfileRuntime(config);

    const prompts = await collectRunnerBasePrompts({
      git_root: root,
      owner_id: "CODER",
      execution_profile: executionProfile,
    });

    expect(prompts.map((prompt) => prompt.id)).toEqual([
      "base.policy_gateway",
      "base.execution_profile",
      "base.owner_profile",
    ]);
    expect(prompts[1]).toMatchObject({
      role: "policy",
      priority: 250,
      source: "runtime:execution-profile:conservative",
      title: "Execution Profile Runtime (conservative)",
    });
    expect(prompts[1]?.content).toContain('"reasoning_effort": "high"');
    expect(prompts[1]?.content).toContain('"text_verbosity": "medium"');
    expect(prompts[1]?.content).toContain('"require_force": true');
    expect(prompts[1]?.content).toContain('"terminate_grace_ms": 5000');
    expect(prompts[1]?.resolution?.winner.layer).toBe("harness");
  });

  it("adds recipe-aware prompt blocks after framework, policy, and owner prompts", async () => {
    const root = await makeTempRepo();
    const agentsDir = path.join(root, ".agentplane", "agents");
    const projectSkillDir = path.join(root, "skills", "release-operator");
    const recipeDir = path.join(root, ".agentplane", "recipes", "viewer");
    await mkdir(agentsDir, { recursive: true });
    await mkdir(projectSkillDir, { recursive: true });
    await mkdir(path.join(recipeDir, "agents"), { recursive: true });
    await mkdir(path.join(recipeDir, "skills"), { recursive: true });
    await writeFile(path.join(root, "AGENTS.md"), "# Repo Policy\n");
    await writeFile(
      path.join(agentsDir, "CODER.json"),
      JSON.stringify({ id: "CODER", role: "Repo-local coder profile" }, null, 2),
    );
    await writeFile(
      path.join(projectSkillDir, "SKILL.md"),
      [
        "---",
        "name: release-operator",
        "description: Use when release packaging needs validation.",
        "---",
      ].join("\n"),
    );
    await writeFile(
      path.join(recipeDir, "agents", "recipe.md"),
      "# Recipe Agent\n\nUse recipe local policy.\n",
    );
    await writeFile(
      path.join(recipeDir, "skills", "analysis.md"),
      "# Recipe Skill\n\nInspect bundle.\n",
    );

    const prompts = await collectRunnerBasePrompts({
      git_root: root,
      owner_id: "CODER",
      recipe: {
        recipe_id: "viewer",
        scenario_id: "RECIPE_SCENARIO",
        recipe_name: "Viewer Recipe",
        recipe_version: "1.0.0",
        recipe_dir: recipeDir,
        scenario_file: path.join(recipeDir, "scenarios", "recipe-scenario.json"),
        selection_reasons: ["recipe compatibility satisfied"],
        run_profile: { mode: "analysis" },
        scenario: {
          goal: "Preview installed tasks.",
          summary: "Recipe scenario",
        },
        agents: [{ id: "RECIPE_AGENT", file: "agents/recipe.md", summary: "Recipe agent" }],
        skills: [{ id: "RECIPE_SKILL", file: "skills/analysis.md", summary: "Recipe skill" }],
        tools: [
          {
            id: "RECIPE_TOOL",
            summary: "Recipe tool",
            runtime: "node",
            entrypoint: "tools/run.js",
            permissions: ["filesystem-write"],
          },
        ],
      },
    });

    expect(prompts.map((prompt) => prompt.id)).toEqual([
      "base.policy_gateway",
      "base.owner_profile",
      "project.skills_index",
      "recipe.execution_context",
      "recipe.agent.RECIPE_AGENT",
      "recipe.skill.RECIPE_SKILL",
      "recipe.tools_summary",
    ]);
    expect(prompts[3]?.content).toContain('"goal": "Preview installed tasks."');
    expect(prompts[4]?.source).toBe(".agentplane/recipes/viewer/agents/recipe.md");
    expect(prompts[4]?.content).toContain("Use recipe local policy.");
    expect(prompts[4]?.resolution?.winner.layer).toBe("extension");
    expect(prompts[4]?.resolution?.conflicts[0]?.source).toBe("recipe:viewer:agent:RECIPE_AGENT");
    expect(prompts[5]?.source).toBe(".agentplane/recipes/viewer/skills/analysis.md");
    expect(prompts[5]?.content).toContain("Inspect bundle.");
    expect(prompts[5]?.resolution?.winner.layer).toBe("extension");
    expect(prompts[6]?.content).toContain('"entrypoint": "tools/run.js"');

    const graph = runnerPromptBlocksToModuleGraph(prompts);
    expect(compileRunnerPromptModuleGraph(graph)).toEqual(prompts);
    expect(
      graph.nodes.every((node) => typeof node.module.provenance.content_hash === "string"),
    ).toBe(true);

    const gatewayModule = graph.nodes.find(
      (node) => node.module.address.name === "base.policy_gateway",
    )?.module;
    expect(gatewayModule).toMatchObject({
      address: {
        namespace: "project",
        surface: "gateway",
        target: "AGENTS.md",
        slot: "body",
      },
      owner: { kind: "project" },
      provenance: {
        source_kind: "project_file",
        source_ref: "AGENTS.md",
      },
    });

    const projectSkillModule = graph.nodes.find(
      (node) => node.module.address.name === "project.skills_index",
    )?.module;
    expect(projectSkillModule).toMatchObject({
      owner: { kind: "project" },
      provenance: {
        source_kind: "generated",
        generated_by: "runner.project_skill_prompt_blocks",
      },
    });

    const recipeAgentModule = graph.nodes.find(
      (node) => node.module.address.name === "recipe.agent.RECIPE_AGENT",
    )?.module;
    expect(recipeAgentModule).toMatchObject({
      address: {
        namespace: "recipe.viewer",
        surface: "agent_profile",
        target: ".agentplane/agents",
        slot: "identity",
      },
      owner: { kind: "recipe", recipe_id: "viewer" },
      provenance: {
        source_kind: "recipe_asset",
        recipe_id: "viewer",
      },
    });
  });

  it("filters overlay prompt fragments by conjunctive when predicates including command", async () => {
    const root = await makeTempRepo();
    await mkdir(path.join(root, ".agentplane", "generated"), { recursive: true });
    await writeFile(path.join(root, "package.json"), '{"name":"repo"}\n');
    await writeFile(
      path.join(root, ".agentplane", "generated", "overlay-bundle.json"),
      JSON.stringify(
        {
          schema_version: 1,
          kind: "overlay_bundle",
          active: [{ id: "viewer", version: "1.0.0", name: "Viewer", summary: "Viewer overlay" }],
          surfaces: {
            planning: [
              {
                recipe_id: "viewer",
                recipe_name: "Viewer",
                recipe_version: "1.0.0",
                surface: "planning",
                id: "task-run",
                file: "prompts/task-run.md",
                source: "recipes/viewer/prompts/task-run.md",
                order: 0,
                strength: "required",
                content: "Task run overlay",
                when: {
                  task_kinds: ["bugfix"],
                  commands: ["task run"],
                  tags_any: ["bug"],
                  repo_types: ["node"],
                },
              },
              {
                recipe_id: "viewer",
                recipe_name: "Viewer",
                recipe_version: "1.0.0",
                surface: "planning",
                id: "scenario-run",
                file: "prompts/scenario-run.md",
                source: "recipes/viewer/prompts/scenario-run.md",
                order: 1,
                strength: "required",
                content: "Scenario overlay",
                when: {
                  task_kinds: ["bugfix"],
                  commands: ["recipes scenario execute"],
                  tags_any: ["bug"],
                  repo_types: ["node"],
                },
              },
            ],
            execution: [],
            coding: [],
            debugging: [],
            review: [],
            verification: [],
            docs: [],
            finish: [],
          },
          validators: [],
          templates: {},
          agents: [],
          tools: [],
          trace: [],
        },
        null,
        2,
      ),
    );

    const task = makeRunnerContextBundle({
      taskId: "TASK-1",
      title: "Fix runner",
      status: "DOING",
      owner: "CODER",
      tags: ["bug"],
    }).task;

    const taskRunPrompts = await collectRunnerBasePrompts({
      git_root: root,
      owner_id: "CODER",
      task,
      command: "task run",
    });
    const scenarioPrompts = await collectRunnerBasePrompts({
      git_root: root,
      owner_id: "CODER",
      task,
      command: "recipes scenario execute",
    });

    expect(taskRunPrompts.map((prompt) => prompt.id)).toContain("overlay.viewer.task-run");
    expect(taskRunPrompts.map((prompt) => prompt.id)).not.toContain("overlay.viewer.scenario-run");
    expect(scenarioPrompts.map((prompt) => prompt.id)).toContain("overlay.viewer.scenario-run");
    expect(scenarioPrompts.map((prompt) => prompt.id)).not.toContain("overlay.viewer.task-run");

    const incompleteTask = { task_id: "TASK-1" } as unknown as RunnerTaskContext;
    const incompleteTaskPrompts = await collectRunnerBasePrompts({
      git_root: root,
      owner_id: "CODER",
      task: incompleteTask,
      command: "task run",
    });

    expect(incompleteTaskPrompts.map((prompt) => prompt.id)).not.toContain(
      "overlay.viewer.task-run",
    );
  });
});
