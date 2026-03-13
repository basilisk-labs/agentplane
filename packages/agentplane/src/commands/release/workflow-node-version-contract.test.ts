import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

const WORKFLOWS_DIR = path.resolve(process.cwd(), ".github/workflows");

async function listWorkflowFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listWorkflowFiles(fullPath)));
      continue;
    }
    if (entry.isFile() && /\.(?:yml|yaml)$/u.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files.toSorted();
}

describe("workflow Node runtime contract", () => {
  it("keeps actions/setup-node pinned to Node 24 across repository workflows", async () => {
    const workflowFiles = await listWorkflowFiles(WORKFLOWS_DIR);
    expect(workflowFiles.length).toBeGreaterThan(0);

    for (const workflowPath of workflowFiles) {
      const workflow = await readFile(workflowPath, "utf8");
      if (!workflow.includes("actions/setup-node@v4")) {
        continue;
      }
      expect(workflow, workflowPath).toContain('node-version: "24"');
      expect(workflow, workflowPath).not.toContain('node-version: "20"');
    }
  });
});
