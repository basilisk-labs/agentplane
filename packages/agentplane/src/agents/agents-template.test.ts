import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "./agents-template.js";

const LOCAL_CLI = "node packages/agentplane/bin/agentplane.js";

describe("agents-template", () => {
  it("bundled AGENTS.md matches framework assets AGENTS.md", async () => {
    const assetsText = await readFile(
      path.join(process.cwd(), "packages", "agentplane", "assets", "AGENTS.md"),
      "utf8",
    );
    const bundledText = await loadAgentsTemplate();
    expect(bundledText).toBe(`${assetsText.trimEnd()}\n`);
  });

  it("repo AGENTS.md matches bundled AGENTS.md (system CLI)", async () => {
    const repoText = await readFile(path.join(process.cwd(), "AGENTS.md"), "utf8");
    const bundledText = await loadAgentsTemplate();
    expect(repoText).not.toContain(LOCAL_CLI);
    expect(bundledText).not.toContain(LOCAL_CLI);
    expect(`${repoText.trimEnd()}\n`).toBe(bundledText);
  });

  it("bundled agents match framework assets/agents", async () => {
    const assetsAgentsDir = path.join(process.cwd(), "packages", "agentplane", "assets", "agents");
    const entries = await readdir(assetsAgentsDir);
    const jsonEntries = entries.filter((entry) => entry.endsWith(".json"));
    const bundled = await loadAgentTemplates();

    for (const agent of bundled) {
      expect(jsonEntries).toContain(agent.fileName);
      const assetPath = path.join(assetsAgentsDir, agent.fileName);
      const assetText = await readFile(assetPath, "utf8");
      expect(agent.contents).toBe(`${assetText.trimEnd()}\n`);
      expect(agent.contents).not.toContain(LOCAL_CLI);
    }
  });

  it("installed agents prefer system CLI", async () => {
    const repoAgentsDir = path.join(process.cwd(), ".agentplane", "agents");
    const entries = await readdir(repoAgentsDir);
    const jsonEntries = entries.filter((entry) => entry.endsWith(".json"));
    const systemCommandRe = /`agentplane(?:\s|`)/;

    for (const entry of jsonEntries) {
      const repoPath = path.join(repoAgentsDir, entry);
      const repoText = await readFile(repoPath, "utf8");
      expect(repoText).not.toContain(LOCAL_CLI);
      expect(repoText).toMatch(systemCommandRe);
    }
  });

  it("repo .agentplane/agents stays in sync with assets/agents", async () => {
    const assetsAgentsDir = path.join(process.cwd(), "packages", "agentplane", "assets", "agents");
    const repoAgentsDir = path.join(process.cwd(), ".agentplane", "agents");
    const assetDirEntries = await readdir(assetsAgentsDir);
    const assetEntries = assetDirEntries
      .filter((entry) => entry.endsWith(".json"))
      .toSorted((a, b) => a.localeCompare(b));
    const repoDirEntries = await readdir(repoAgentsDir);
    const repoEntries = repoDirEntries
      .filter((entry) => entry.endsWith(".json"))
      .toSorted((a, b) => a.localeCompare(b));
    expect(repoEntries).toEqual(assetEntries);

    for (const fileName of assetEntries) {
      const assetRaw = await readFile(path.join(assetsAgentsDir, fileName), "utf8");
      const repoRaw = await readFile(path.join(repoAgentsDir, fileName), "utf8");
      const assetText = `${assetRaw.trimEnd()}\n`;
      const repoText = `${repoRaw.trimEnd()}\n`;
      expect(repoText).toBe(assetText);
    }
  });

  it("filters workflow-specific sections for direct mode", () => {
    const template = [
      "## A) direct mode (single checkout)",
      "Direct text.",
      "## B) branch_pr mode (parallel work)",
      "Branch text.",
      "## INTEGRATION & CLOSURE (branch_pr)",
      "Integration text.",
      "## Other",
      "Other text.",
    ].join("\n");

    const filtered = filterAgentsByWorkflow(template, "direct");
    expect(filtered).toContain("A) direct mode (single checkout)");
    expect(filtered).not.toContain("branch_pr mode (parallel work)");
    expect(filtered).not.toContain("INTEGRATION & CLOSURE (branch_pr)");
    expect(filtered).toContain("Other text.");
  });

  it("filters workflow-specific sections for branch_pr mode", () => {
    const template = [
      "## A) direct mode (single checkout)",
      "Direct text.",
      "## B) branch_pr mode (parallel work)",
      "Branch text.",
      "## Other",
      "Other text.",
    ].join("\n");

    const filtered = filterAgentsByWorkflow(template, "branch_pr");
    expect(filtered).not.toContain("A) direct mode (single checkout)");
    expect(filtered).toContain("branch_pr mode (parallel work)");
    expect(filtered).toContain("Other text.");
  });

  it("keeps templates unchanged when no workflow sections exist", () => {
    const template = ["# Title", "No workflow sections here."].join("\n");
    expect(filterAgentsByWorkflow(template, "direct")).toBe(`${template}\n`);
  });
});
