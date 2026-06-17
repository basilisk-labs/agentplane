import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";
import {
  captureStdIO,
  expectAgentJsonEnvelope,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  parseAgentJsonEnvelope,
  pathExists,
} from "@agentplane/testkit";

import { runCli } from "./run-cli.js";

function normalizeSlashes(value: string): string {
  return value.replaceAll("\\", "/");
}

async function writeAgentplaneFixture(root: string): Promise<void> {
  await writeFile(path.join(root, "AGENTS.md"), "# Agents\n\nUse AgentPlane discipline.\n", "utf8");
  await mkdir(path.join(root, ".agentplane", "agents"), { recursive: true });
  await writeFile(
    path.join(root, ".agentplane", "agents", "CODER.json"),
    JSON.stringify(
      {
        id: "CODER",
        role: "Implement approved task scope with the smallest coherent diff.",
        description: "Task-scoped implementation role.",
        inputs: ["Task id"],
        outputs: ["Scoped code changes"],
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );
}

installRunCliIntegrationHarness();

describe("platform sync", () => {
  it("lists platform instruction-surface integrations", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["platform", "list"]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("codex");
      expect(io.stdout).toContain("claude");
      expect(io.stdout).toContain("openclaw");
      expect(io.stdout).toContain("hermes");
    } finally {
      io.restore();
    }
  });

  it("prints structured platform data in json output mode", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["--output", "json", "platform", "list"]);
      expect(code).toBe(0);
      const payload = parseAgentJsonEnvelope(io.stdout);
      expectAgentJsonEnvelope(payload, {
        command: "platform list",
        ok: true,
        exitCode: 0,
        hasData: true,
      });
      expect(payload.data).toMatchObject({
        platforms: expect.arrayContaining([
          expect.objectContaining({ id: "codex" }),
          expect.objectContaining({ id: "cline" }),
        ]),
      });
    } finally {
      io.restore();
    }
  });

  it("dry-runs selected platform targets without writing files", async () => {
    const root = await mkGitRepoRoot();
    await writeAgentplaneFixture(root);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "--output",
        "json",
        "platform",
        "sync",
        "--platform",
        "cursor",
        "--platform",
        "cline",
        "--dry-run",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = parseAgentJsonEnvelope(io.stdout);
      expectAgentJsonEnvelope(payload, {
        command: "platform sync",
        ok: true,
        exitCode: 0,
        hasData: true,
      });
      expect(payload.data).toMatchObject({
        source: "AGENTS.md",
        dry_run: true,
        platforms: ["cursor", "cline"],
        targets: [
          expect.objectContaining({ path: ".cursor/rules/agentplane.mdc", status: "planned" }),
          expect.objectContaining({ path: ".clinerules/00-agentplane.md", status: "planned" }),
        ],
      });
    } finally {
      io.restore();
    }

    expect(await pathExists(path.join(root, ".cursor", "rules", "agentplane.mdc"))).toBe(false);
    expect(await pathExists(path.join(root, ".clinerules", "00-agentplane.md"))).toBe(false);
  });

  it("writes generated projections and records external plugin adapters", async () => {
    const root = await mkGitRepoRoot();
    await writeAgentplaneFixture(root);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "platform",
        "sync",
        "--platform",
        "claude,gemini,copilot,cursor,windsurf,cline,kiro,openclaw,hermes",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const output = normalizeSlashes(io.stdout);
      expect(output).toContain("written\tclaude\tCLAUDE.md");
      expect(output).toContain("written\tcursor\t.cursor/rules/agentplane.mdc");
      expect(output).toContain("external\topenclaw\thttps://github.com/basilisk-labs/agentplane-openclaw-plugin");
      expect(output).toContain("external\thermes\thttps://github.com/basilisk-labs/agentplane-hermes-plugin");
    } finally {
      io.restore();
    }

    const expectedPaths = [
      "CLAUDE.md",
      "GEMINI.md",
      ".github/copilot-instructions.md",
      ".github/instructions/agentplane-state.instructions.md",
      ".cursor/rules/agentplane.mdc",
      ".devin/rules/agentplane.md",
      ".windsurf/rules/agentplane.md",
      ".clinerules/00-agentplane.md",
      ".kiro/steering/agentplane.md",
    ];
    for (const rel of expectedPaths) {
      expect(await pathExists(path.join(root, rel))).toBe(true);
    }

    const cursorText = await readFile(path.join(root, ".cursor/rules/agentplane.mdc"), "utf8");
    expect(cursorText).toContain("AUTOGENERATED by agentplane platform sync.");
    expect(cursorText).toContain("# Agents");
    expect(cursorText).toContain("## Synced Role Activation");
  });

  it("keeps ide sync as a Cursor and Windsurf compatibility wrapper", async () => {
    const root = await mkGitRepoRoot();
    await writeAgentplaneFixture(root);

    const io = captureStdIO();
    try {
      const code = await runCli(["ide", "sync", "--root", root]);
      expect(code).toBe(0);
      const output = normalizeSlashes(io.stdout);
      expect(output).toContain(".cursor/rules/agentplane.mdc");
      expect(output).toContain(".devin/rules/agentplane.md");
      expect(output).toContain(".windsurf/rules/agentplane.md");
    } finally {
      io.restore();
    }

    const cursorText = await readFile(path.join(root, ".cursor/rules/agentplane.mdc"), "utf8");
    expect(cursorText).toContain("AUTOGENERATED by agentplane ide sync.");
  });

  it("explains external plugin-backed platforms", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["platform", "explain", "openclaw"]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("AgentPlane OpenClaw plugin");
      expect(io.stdout).toContain("https://github.com/basilisk-labs/agentplane-openclaw-plugin");
    } finally {
      io.restore();
    }
  });
});
