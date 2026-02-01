import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { loadAgentTemplates, loadAgentsTemplate } from "./agents-template.js";

describe("agents-template", () => {
  it("bundled AGENTS.md matches repo AGENTS.md", async () => {
    const repoText = await readFile(path.join(process.cwd(), "AGENTS.md"), "utf8");
    const bundledText = await loadAgentsTemplate();
    expect(bundledText).toBe(`${repoText.trimEnd()}\n`);
  });

  it("bundled agents match .agent-plane/agents", async () => {
    const repoAgentsDir = path.join(process.cwd(), ".agent-plane", "agents");
    const entries = await readdir(repoAgentsDir);
    const jsonEntries = entries.filter((entry) => entry.endsWith(".json"));
    const bundled = await loadAgentTemplates();

    expect(jsonEntries.toSorted()).toEqual(bundled.map((entry) => entry.fileName).toSorted());

    for (const agent of bundled) {
      const repoPath = path.join(repoAgentsDir, agent.fileName);
      const repoText = await readFile(repoPath, "utf8");
      expect(agent.contents).toBe(`${repoText.trimEnd()}\n`);
    }
  });
});
