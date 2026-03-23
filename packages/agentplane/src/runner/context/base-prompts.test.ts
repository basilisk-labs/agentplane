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
    expect(prompts[0]?.content).toBe("# Repo Policy\n\nFollow the workspace contract.\n");
    expect(prompts[1]?.content).toContain('"role": "Repo-local coder profile"');
  });

  it("falls back cleanly to bundled defaults when repo-local prompt files are absent", async () => {
    const root = await makeTempRepo();

    const prompts = await collectRunnerBasePrompts({
      git_root: root,
      owner_id: "CODER",
    });

    expect(prompts).toHaveLength(2);
    expect(prompts[0]?.source).toBe("bundled:policy-gateway:AGENTS.md");
    expect(prompts[0]?.title).toBe("Bundled Policy Gateway Fallback (AGENTS.md)");
    expect(prompts[0]?.content).toContain("AGENTS.md");
    expect(prompts[1]?.source).toBe("bundled:agent-profile:CODER.json");
    expect(prompts[1]?.content).toContain('"id": "CODER"');
  });
});
