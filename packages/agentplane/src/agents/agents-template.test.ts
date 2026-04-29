import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
  loadPolicyTemplates,
  renderMarkdownPromptTemplate,
} from "./agents-template.js";

const LOCAL_CLI = "node packages/agentplane/bin/agentplane.js";

async function listMarkdownFiles(dirPath: string, relPrefix = ""): Promise<string[]> {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries.toSorted((left, right) => left.name.localeCompare(right.name))) {
    const relPath = relPrefix ? `${relPrefix}/${entry.name}` : entry.name;
    const absPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listMarkdownFiles(absPath, relPath)));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".md")) files.push(relPath);
  }

  return files;
}

describe("agents-template", () => {
  it("bundled AGENTS.md matches framework assets AGENTS.md", async () => {
    const assetsText = await readFile(
      path.join(process.cwd(), "packages", "agentplane", "assets", "AGENTS.md"),
      "utf8",
    );
    const bundledText = await loadAgentsTemplate();
    const renderedAsset = renderMarkdownPromptTemplate(assetsText, {
      source_ref: "packages/agentplane/assets/AGENTS.md",
    });
    expect(bundledText).toBe(renderedAsset.contents);
    expect(bundledText).not.toContain("ap:fragment");
  });

  it("repo AGENTS.md source renders to bundled AGENTS.md (system CLI)", async () => {
    const repoText = await readFile(path.join(process.cwd(), "AGENTS.md"), "utf8");
    const bundledText = await loadAgentsTemplate();
    const renderedRepo = renderMarkdownPromptTemplate(repoText, {
      source_ref: "AGENTS.md",
    });
    expect(renderedRepo.contents).toBe(bundledText);
    expect(bundledText).not.toContain("ap:fragment");
  });

  it("bundled AGENTS.md keeps workflow guidance derived from config instead of hardcoding a mode", async () => {
    const bundledText = await loadAgentsTemplate();
    expect(bundledText).toContain(
      "The guarded route is determined by `workflow_mode` in `.agentplane/config.json`;",
    );
    expect(bundledText).not.toContain("In this repository, `workflow_mode=branch_pr`");
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
      expect(agent.sourceContents).toBe(`${assetText.trimEnd()}\n`);
      expect(agent.fragments.length).toBeGreaterThan(0);
      expect(agent.contents).not.toContain(LOCAL_CLI);
      expect(agent.contents).not.toContain('"mutability"');
    }
  });

  it("renders bundled agent fragment objects as installed string-array profiles", async () => {
    const bundled = await loadAgentTemplates();
    const coder = bundled.find((agent) => agent.fileName === "CODER.json");
    expect(coder?.fragments.map((fragment) => fragment.id)).toContain(
      "agent.coder.workflow.keep-diffs-minimal-task-scoped-easy-review",
    );

    const parsed = JSON.parse(coder?.contents ?? "{}") as {
      workflow?: unknown[];
    };
    expect(parsed.workflow?.every((entry) => typeof entry === "string")).toBe(true);
    expect(coder?.contents).toContain("Keep diffs minimal, task-scoped, and easy to review;");
    expect(coder?.contents).not.toContain("agent.coder.workflow.keep-diffs-minimal");
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
    const bundled = await loadAgentTemplates();

    for (const fileName of assetEntries) {
      const rendered = bundled.find((agent) => agent.fileName === fileName);
      const repoRaw = await readFile(path.join(repoAgentsDir, fileName), "utf8");
      const renderedText = rendered?.contents;
      const repoText = `${repoRaw.trimEnd()}\n`;
      expect(repoText).toBe(renderedText);
    }
  });

  it("bundled policy templates match framework assets/policy", async () => {
    const assetsPolicyDir = path.join(process.cwd(), "packages", "agentplane", "assets", "policy");
    const bundled = await loadPolicyTemplates();

    for (const policy of bundled) {
      const assetPath = path.join(assetsPolicyDir, policy.relativePath);
      const assetText = await readFile(assetPath, "utf8");
      if (policy.relativePath.endsWith(".md")) {
        const renderedAsset = renderMarkdownPromptTemplate(assetText, {
          source_ref: `packages/agentplane/assets/policy/${policy.relativePath}`,
        });
        expect(policy.contents).toBe(renderedAsset.contents);
        expect(policy.sourceContents).toBe(renderedAsset.sourceContents);
        expect(policy.fragments).toEqual(renderedAsset.fragments);
        expect(policy.contents).not.toContain("ap:fragment");
      } else {
        expect(policy.contents).toBe(`${assetText.trimEnd()}\n`);
      }
      expect(policy.relativePath.startsWith(".")).toBe(false);
    }
  });

  it("repo .agentplane/policy stays in sync with assets/policy", async () => {
    const assetsPolicyDir = path.join(process.cwd(), "packages", "agentplane", "assets", "policy");
    const repoPolicyDir = path.join(process.cwd(), ".agentplane", "policy");
    const bundled = await loadPolicyTemplates();

    for (const policy of bundled) {
      const repoText = await readFile(path.join(repoPolicyDir, policy.relativePath), "utf8");
      expect(`${repoText.trimEnd()}\n`).toBe(policy.contents);
    }
  });

  it("bundled markdown prompt assets use valid unique declared fragments", async () => {
    const assetsDir = path.join(process.cwd(), "packages", "agentplane", "assets");
    const policyMarkdownFiles = (await listMarkdownFiles(path.join(assetsDir, "policy"))).map(
      (entry) => `policy/${entry}`,
    );
    const markdownFiles = ["AGENTS.md", "RUNNER.md", ...policyMarkdownFiles];
    const seen = new Map<string, string>();

    for (const relativePath of markdownFiles) {
      const assetText = await readFile(path.join(assetsDir, relativePath), "utf8");
      const rendered = renderMarkdownPromptTemplate(assetText, {
        source_ref: `packages/agentplane/assets/${relativePath}`,
      });
      expect(rendered.fragments.length, relativePath).toBeGreaterThan(0);
      expect(rendered.contents).not.toContain("ap:fragment");

      for (const fragment of rendered.fragments) {
        expect(fragment.id_source).toBe("declared");
        const existing = seen.get(fragment.id);
        expect(existing, `${fragment.id} duplicated in ${relativePath}`).toBeUndefined();
        seen.set(fragment.id, relativePath);
      }
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
