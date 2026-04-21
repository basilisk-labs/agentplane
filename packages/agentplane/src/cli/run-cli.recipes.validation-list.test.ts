import { generateKeyPairSync } from "node:crypto";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  createRecipeArchiveWithManifest,
  createUnsafeRecipeArchive,
  getAgentplaneHome,
  mkGitRepoRoot,
  registerAgentplaneHome,
  resetAgentplaneHomeRecipes,
  runCliSilent,
  silenceStdIO,
  writeDefaultConfig,
} from "../testing/index.js";

registerAgentplaneHome();

const agentplaneHomePath = () => getAgentplaneHome() ?? "";
const originalRecipesKeys = process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS;
let restoreStdIO: (() => void) | null = null;

beforeEach(() => {
  restoreStdIO = silenceStdIO();
  const { publicKey } = generateKeyPairSync("ed25519");
  const publicPem = publicKey.export({ type: "spki", format: "pem" }).toString();
  process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS = JSON.stringify({ "test-key": publicPem });
});

afterEach(() => {
  restoreStdIO?.();
  restoreStdIO = null;
  if (originalRecipesKeys === undefined) {
    delete process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS;
  } else {
    process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS = originalRecipesKeys;
  }
});

describe("runCli recipes validation and list output", () => {
  it("rejects tar archives with path traversal entries", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const archivePath = await createUnsafeRecipeArchive({ format: "tar" });

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "install", "--path", archivePath, "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Unsafe archive entry");
    } finally {
      io.restore();
    }
  });

  it("rejects zip archives with path traversal entries", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const archivePath = await createUnsafeRecipeArchive({ format: "zip" });

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "install", "--path", archivePath, "--root", root]);
      expect(code).toBe(4);
      expect(io.stderr).toContain("invalid relative path");
    } finally {
      io.restore();
    }
  });

  it("recipes list reports when no recipes are cached", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await resetAgentplaneHomeRecipes();
    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "list", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("No cached recipes found.");
    } finally {
      io.restore();
    }
  });

  it("recipes list supports --full output", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await resetAgentplaneHomeRecipes();
    const archivePath = await createRecipeArchiveWithManifest({
      manifest: {
        schema_version: "1",
        id: "full",
        version: "1.0.0",
        name: "Full recipe",
        summary: "Full summary",
        description: "Full description",
        agents: [
          {
            id: "FULL_AGENT",
            display_name: "Full Agent",
            role: "executor",
            summary: "Full agent",
            file: "agents/full.md",
          },
        ],
        scenarios: [
          {
            id: "FULL_SCENARIO",
            name: "Full Scenario",
            summary: "Full scenario",
            use_when: ["Full recipe fixture"],
            required_inputs: [],
            outputs: [],
            permissions: [],
            artifacts: [],
            agents_involved: ["FULL_AGENT"],
            skills_used: [],
            tools_used: [],
            run_profile: { mode: "analysis" },
            file: "scenarios/full.json",
          },
        ],
      },
      files: {
        "agents/full.md": "# Full Agent\n\nUse the full recipe fixture.\n",
        "scenarios/full.json": JSON.stringify(
          {
            schema_version: "1",
            id: "FULL_SCENARIO",
            goal: "Full scenario goal",
            task_template: {
              title: "Full scenario task",
              description: "Materialize the full recipe scenario.",
              owner: "CODER",
            },
            inputs: [],
            outputs: [],
            steps: [],
          },
          null,
          2,
        ),
      },
    });
    await runCliSilent(["recipes", "install", "--path", archivePath, "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "list", "--full", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain('"id": "full"');
      expect(io.stdout).toContain('"version": "1.0.0"');
    } finally {
      io.restore();
    }
  });

  it("recipes list rejects empty tag values", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "list", "--tag", " ", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Option --tag must not be empty.");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane recipes list");
      expect(io.stderr).toContain("agentplane help recipes list --compact");
    } finally {
      io.restore();
    }
  });

  it("recipes list rejects invalid cached recipes payloads", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeFile(
      path.join(agentplaneHomePath(), "recipes.json"),
      JSON.stringify(
        { schema_version: 1, updated_at: "2026-02-05T00:00:00Z", recipes: [{ id: "bad" }] },
        null,
        2,
      ),
      "utf8",
    );

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "list", "--root", root]);
      expect(code).toBe(4);
      expect(io.stderr).toContain("Invalid field manifest: expected object");
    } finally {
      io.restore();
    }
  });

  it("recipes install rejects invalid manifest tags", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await resetAgentplaneHomeRecipes();
    const archivePath = await createRecipeArchiveWithManifest({
      manifest: {
        schema_version: "1",
        id: "invalid-tags",
        version: "1.0.0",
        name: "Invalid Tags",
        summary: "Invalid",
        description: "Invalid",
        tags: "nope",
      },
    });

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "install", "--path", archivePath, "--root", root]);
      expect(code).toBe(4);
      expect(io.stderr).toContain("Invalid field manifest.tags: expected string[]");
    } finally {
      io.restore();
    }
  });

  it("recipes install rejects invalid manifest id", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await resetAgentplaneHomeRecipes();
    const archivePath = await createRecipeArchiveWithManifest({
      manifest: {
        schema_version: "1",
        id: "bad/path",
        version: "1.0.0",
        name: "Invalid Id",
        summary: "Invalid",
        description: "Invalid",
      },
    });

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "install", "--path", archivePath, "--root", root]);
      expect(code).toBe(4);
      expect(io.stderr).toContain("Invalid manifest.id: must not contain path separators");
    } finally {
      io.restore();
    }
  });

  it("recipes install rejects invalid agent and scenario assets", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const cases: {
      manifest: Record<string, unknown>;
      files?: Record<string, string>;
      pattern: RegExp;
    }[] = [
      {
        manifest: {
          schema_version: "1",
          id: "bad-agent-id",
          version: "1.0.0",
          name: "Bad Agent",
          summary: "Bad Agent",
          description: "Bad Agent",
          agents: [
            {
              id: "bad/id",
              display_name: "Bad Agent",
              role: "executor",
              summary: "Bad",
              file: "agents/bad.md",
            },
          ],
          scenarios: [
            {
              id: "BAD_AGENT_SCENARIO",
              name: "Bad Agent Scenario",
              summary: "Bad agent scenario",
              use_when: ["Validation fixture"],
              required_inputs: [],
              outputs: [],
              permissions: [],
              artifacts: [],
              agents_involved: ["bad/id"],
              skills_used: [],
              tools_used: [],
              run_profile: { mode: "analysis" },
              file: "scenarios/bad-agent.json",
            },
          ],
        },
        files: { "agents/bad.md": "# Bad Agent\n\nBroken id fixture.\n" },
        pattern: /Invalid agent\.id: must not contain path separators/,
      },
      {
        manifest: {
          schema_version: "1",
          id: "missing-agent-file",
          version: "1.0.0",
          name: "Missing Agent",
          summary: "Missing Agent",
          description: "Missing Agent",
          agents: [
            {
              id: "AGENT",
              display_name: "Agent",
              role: "executor",
              summary: "Agent",
              file: "agents/missing.md",
            },
          ],
          scenarios: [
            {
              id: "MISSING_AGENT_SCENARIO",
              name: "Missing Agent Scenario",
              summary: "Missing agent scenario",
              use_when: ["Validation fixture"],
              required_inputs: [],
              outputs: [],
              permissions: [],
              artifacts: [],
              agents_involved: ["AGENT"],
              skills_used: [],
              tools_used: [],
              run_profile: { mode: "analysis" },
              file: "scenarios/missing-agent.json",
            },
          ],
        },
        pattern: /Missing recipe agent file/,
      },
      {
        manifest: {
          schema_version: "1",
          id: "bad-agent-markdown",
          version: "1.0.0",
          name: "Bad Agent Markdown",
          summary: "Bad Agent Markdown",
          description: "Bad Agent Markdown",
          agents: [
            {
              id: "AGENT",
              display_name: "Agent",
              role: "executor",
              summary: "Agent",
              file: "agents/bad.md",
            },
          ],
          scenarios: [
            {
              id: "BAD_AGENT_MARKDOWN_SCENARIO",
              name: "Bad Agent Markdown Scenario",
              summary: "Bad agent markdown scenario",
              use_when: ["Validation fixture"],
              required_inputs: [],
              outputs: [],
              permissions: [],
              artifacts: [],
              agents_involved: ["AGENT"],
              skills_used: [],
              tools_used: [],
              run_profile: { mode: "analysis" },
              file: "scenarios/bad-agent.json",
            },
          ],
        },
        files: { "agents/bad.md": "   \n" },
        pattern: /Invalid field recipe agent file: expected non-empty markdown document/,
      },
      {
        manifest: {
          schema_version: "1",
          id: "bad-skill-markdown",
          version: "1.0.0",
          name: "Bad Skill Markdown",
          summary: "Bad Skill Markdown",
          description: "Bad Skill Markdown",
          agents: [
            {
              id: "AGENT",
              display_name: "Agent",
              role: "executor",
              summary: "Agent",
              skills: ["SKILL"],
              file: "agents/agent.md",
            },
          ],
          skills: [
            {
              id: "SKILL",
              summary: "Skill",
              file: "skills/bad.md",
            },
          ],
          scenarios: [
            {
              id: "BAD_SKILL_SCENARIO",
              name: "Bad Skill Scenario",
              summary: "Bad skill scenario",
              use_when: ["Validation fixture"],
              required_inputs: [],
              outputs: [],
              permissions: [],
              artifacts: [],
              agents_involved: ["AGENT"],
              skills_used: ["SKILL"],
              tools_used: [],
              run_profile: { mode: "analysis" },
              file: "scenarios/bad-skill.json",
            },
          ],
        },
        files: {
          "agents/agent.md": "# Agent\n\nExercise skill validation.\n",
          "skills/bad.md": "",
        },
        pattern: /Invalid field recipe skill file: expected non-empty markdown document/,
      },
      {
        manifest: {
          schema_version: "1",
          id: "bad-scenario-id",
          version: "1.0.0",
          name: "Bad Scenario",
          summary: "Bad Scenario",
          description: "Bad Scenario",
          agents: [
            {
              id: "AGENT",
              display_name: "Agent",
              role: "executor",
              summary: "Agent",
              tools: ["TOOL"],
              file: "agents/agent.md",
            },
          ],
          tools: [{ id: "TOOL", summary: "Tool", runtime: "bash", entrypoint: "tools/run.sh" }],
          scenarios: [
            {
              id: "BAD_SCENARIO",
              name: "Bad Scenario",
              summary: "Bad scenario",
              use_when: ["Validation fixture"],
              required_inputs: [],
              outputs: [],
              permissions: [],
              artifacts: [],
              agents_involved: ["AGENT"],
              skills_used: [],
              tools_used: ["TOOL"],
              run_profile: { mode: "analysis" },
              file: "scenarios/bad.json",
            },
          ],
        },
        files: {
          "agents/agent.md": "# Agent\n\nRun the scenario validation fixture.\n",
          "tools/run.sh": "#!/usr/bin/env bash\n",
          "scenarios/bad.json": JSON.stringify(
            {
              schema_version: "1",
              id: "..",
              summary: "Bad",
              goal: "Goal",
              task_template: {
                title: "Bad scenario task",
                description: "Broken scenario fixture.",
                owner: "CODER",
              },
              inputs: [],
              outputs: [],
              steps: [{ tool: "TOOL" }],
            },
            null,
            2,
          ),
        },
        pattern: /Invalid scenario\.id: must not be '\.' or '\.\.'/,
      },
    ];

    for (const entry of cases) {
      await resetAgentplaneHomeRecipes();
      const archivePath = await createRecipeArchiveWithManifest({
        manifest: entry.manifest,
        files: entry.files,
      });
      const io = captureStdIO();
      try {
        const code = await runCli(["recipes", "install", "--path", archivePath, "--root", root]);
        expect(code).toBe(4);
        expect(io.stderr).toMatch(entry.pattern);
      } finally {
        io.restore();
      }
    }
  });
});
