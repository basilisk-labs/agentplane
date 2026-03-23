import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { collectRunnerBasePrompts } from "./base-prompts.js";

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
    expect(prompts[1]?.content).toBe("# Repo Policy\n\nFollow the workspace contract.\n");
    expect(prompts[2]?.content).toContain('"role": "Repo-local coder profile"');
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
    expect(prompts[2]?.source).toBe("bundled:agent-profile:CODER.json");
    expect(prompts[2]?.content).toContain('"id": "CODER"');
  });

  it("adds recipe-aware prompt blocks after framework, policy, and owner prompts", async () => {
    const root = await makeTempRepo();
    const agentsDir = path.join(root, ".agentplane", "agents");
    const recipeDir = path.join(root, ".agentplane", "recipes", "viewer");
    await mkdir(agentsDir, { recursive: true });
    await mkdir(path.join(recipeDir, "agents"), { recursive: true });
    await mkdir(path.join(recipeDir, "skills"), { recursive: true });
    await writeFile(path.join(root, "AGENTS.md"), "# Repo Policy\n");
    await writeFile(
      path.join(agentsDir, "CODER.json"),
      JSON.stringify({ id: "CODER", role: "Repo-local coder profile" }, null, 2),
    );
    await writeFile(
      path.join(recipeDir, "agents", "recipe.json"),
      JSON.stringify(
        { id: "RECIPE_AGENT", role: "Recipe agent", prompt: "Use recipe local policy." },
        null,
        2,
      ),
    );
    await writeFile(
      path.join(recipeDir, "skills", "analysis.json"),
      JSON.stringify(
        { id: "RECIPE_SKILL", summary: "Recipe skill prompt", instructions: ["Inspect bundle"] },
        null,
        2,
      ),
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
        agents: [{ id: "RECIPE_AGENT", file: "agents/recipe.json", summary: "Recipe agent" }],
        skills: [{ id: "RECIPE_SKILL", file: "skills/analysis.json", summary: "Recipe skill" }],
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
      "recipe.execution_context",
      "recipe.agent.RECIPE_AGENT",
      "recipe.skill.RECIPE_SKILL",
      "recipe.tools_summary",
    ]);
    expect(prompts[3]?.content).toContain('"goal": "Preview installed tasks."');
    expect(prompts[4]?.source).toBe(".agentplane/recipes/viewer/agents/recipe.json");
    expect(prompts[4]?.content).toContain('"prompt": "Use recipe local policy."');
    expect(prompts[5]?.source).toBe(".agentplane/recipes/viewer/skills/analysis.json");
    expect(prompts[6]?.content).toContain('"entrypoint": "tools/run.js"');
  });
});
