import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { buildExecutionProfile, defaultConfig } from "@agentplaneorg/core/config";
import { afterEach, describe, expect, it } from "vitest";

import { resolveExecutionProfileRuntime } from "../../runtime/execution-profile/index.js";
import {
  collectRunnerBasePrompts,
  compileRunnerPromptModuleGraph,
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
          "id": "base.framework_runner",
          "priority": 100,
          "role": "system",
          "source": "bundled:runner-prompt:RUNNER.md",
          "title": "Framework Runner Prompt",
        },
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
    expect(prompts[0]?.content).toContain(
      "Treat `bundle.json` as the authoritative input contract.",
    );
    expect(prompts[0]?.content).toContain("Do not run repository startup commands");
    expect(prompts[0]?.content).toContain("Treat `text_verbosity` as the output");
    expect(prompts[0]?.content).toContain('phase: "commentary"');
    expect(prompts[0]?.content).not.toContain("ap:fragment");
    expect(prompts[0]?.resolution?.winner.layer).toBe("builtin");
    expect(prompts[1]?.content).toBe("# Repo Policy\n\nFollow the workspace contract.\n");
    expect(prompts[1]?.resolution?.winner.layer).toBe("harness");
    expect(prompts[1]?.resolution?.conflicts[0]?.layer).toBe("builtin");
    expect(prompts[2]?.content).toContain('"role": "Repo-local coder profile"');
    expect(prompts[2]?.resolution?.winner.layer).toBe("user");
  });

  it("falls back cleanly to bundled defaults when repo-local prompt files are absent", async () => {
    const root = await makeTempRepo();

    const prompts = await collectRunnerBasePrompts({
      git_root: root,
      owner_id: "CODER",
    });

    expect(prompts).toHaveLength(3);
    expect(prompts[0]?.source).toBe("bundled:runner-prompt:RUNNER.md");
    expect(prompts[0]?.title).toBe("Framework Runner Prompt");
    expect(prompts[1]?.source).toBe("bundled:policy-gateway:AGENTS.md");
    expect(prompts[1]?.title).toBe("Bundled Policy Gateway Fallback (AGENTS.md)");
    expect(prompts[1]?.content).toContain("AGENTS.md");
    expect(prompts[1]?.resolution?.winner.layer).toBe("builtin");
    expect(prompts[2]?.source).toBe("bundled:agent-profile:CODER.json");
    expect(prompts[2]?.content).toContain('"id": "CODER"');
    expect(prompts[2]?.resolution?.winner.layer).toBe("builtin");
  });

  it("reuses static bundled framework prompt assembly across repeated collections", async () => {
    const root = await makeTempRepo();

    const first = await collectRunnerBasePrompts({
      git_root: root,
      owner_id: "CODER",
    });
    const second = await collectRunnerBasePrompts({
      git_root: root,
      owner_id: "CODER",
    });

    expect(second.find((prompt) => prompt.id === "base.framework_runner")).toBe(
      first.find((prompt) => prompt.id === "base.framework_runner"),
    );
  });

  it("invalidates cached repo-local prompt files when their content changes", async () => {
    const root = await makeTempRepo();
    const agentsDir = path.join(root, ".agentplane", "agents");
    await mkdir(agentsDir, { recursive: true });
    await writeFile(path.join(root, "AGENTS.md"), "# Repo Policy\n\nInitial policy.\n");
    await writeFile(
      path.join(agentsDir, "CODER.json"),
      JSON.stringify({ id: "CODER", role: "Initial profile" }, null, 2),
    );

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

    await writeFile(
      path.join(root, "AGENTS.md"),
      "# Repo Policy\n\nUpdated policy with a different byte length.\n",
    );
    await writeFile(
      path.join(agentsDir, "CODER.json"),
      JSON.stringify({ id: "CODER", role: "Updated profile with extra bytes" }, null, 2),
    );

    const updated = await collectRunnerBasePrompts({
      git_root: root,
      owner_id: "CODER",
    });
    expect(updated.find((prompt) => prompt.id === "base.policy_gateway")?.content).toContain(
      "Updated policy",
    );
    expect(updated.find((prompt) => prompt.id === "base.owner_profile")?.content).toContain(
      "Updated profile",
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
      "base.framework_runner",
      "base.policy_gateway",
      "base.owner_profile",
      "project.skills_index",
    ]);
    expect(prompts[3]).toMatchObject({
      role: "context",
      priority: 350,
      source: "skills/*/SKILL.md",
      title: "Repository Skill Discovery",
    });
    expect(prompts[3]?.content).toContain('"name": "release-operator"');
    expect(prompts[3]?.content).toContain(
      '"description": "Use when release packaging needs validation."',
    );
    expect(prompts[3]?.content).toContain('"source": "skills/release-operator/SKILL.md"');
    expect(prompts[3]?.content).not.toContain("Long body");
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
      "base.framework_runner",
      "base.policy_gateway",
      "base.execution_profile",
      "base.owner_profile",
    ]);
    expect(prompts[2]).toMatchObject({
      role: "policy",
      priority: 250,
      source: "runtime:execution-profile:conservative",
      title: "Execution Profile Runtime (conservative)",
    });
    expect(prompts[2]?.content).toContain('"reasoning_effort": "high"');
    expect(prompts[2]?.content).toContain('"text_verbosity": "medium"');
    expect(prompts[2]?.content).toContain('"require_force": true');
    expect(prompts[2]?.content).toContain('"terminate_grace_ms": 5000');
    expect(prompts[2]?.resolution?.winner.layer).toBe("harness");
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
      "base.framework_runner",
      "base.policy_gateway",
      "base.owner_profile",
      "project.skills_index",
      "recipe.execution_context",
      "recipe.agent.RECIPE_AGENT",
      "recipe.skill.RECIPE_SKILL",
      "recipe.tools_summary",
    ]);
    expect(prompts[4]?.content).toContain('"goal": "Preview installed tasks."');
    expect(prompts[5]?.source).toBe(".agentplane/recipes/viewer/agents/recipe.md");
    expect(prompts[5]?.content).toContain("Use recipe local policy.");
    expect(prompts[5]?.resolution?.winner.layer).toBe("extension");
    expect(prompts[5]?.resolution?.conflicts[0]?.source).toBe("recipe:viewer:agent:RECIPE_AGENT");
    expect(prompts[6]?.source).toBe(".agentplane/recipes/viewer/skills/analysis.md");
    expect(prompts[6]?.content).toContain("Inspect bundle.");
    expect(prompts[6]?.resolution?.winner.layer).toBe("extension");
    expect(prompts[7]?.content).toContain('"entrypoint": "tools/run.js"');

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

    const task = {
      task_id: "TASK-1",
      data: {
        id: "TASK-1",
        title: "Fix runner",
        status: "DOING",
        owner: "CODER",
        tags: ["bug"],
      },
      frontmatter: {},
      doc: "",
      sections: {},
      comments: [],
      events: [],
    };

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
  });
});
