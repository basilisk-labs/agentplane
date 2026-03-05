import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { defaultConfig, saveConfig } from "@agentplaneorg/core";
import { describe, expect, it } from "vitest";

import { DEFAULT_WORKFLOW_TEMPLATE } from "./build.js";
import {
  publishWorkflowCandidate,
  resolveWorkflowPaths,
  restoreWorkflowFromLastKnownGood,
  validateWorkflowAtPath,
} from "./index.js";

async function setupRepo(): Promise<string> {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "agentplane-workflow-"));
  const agentplaneDir = path.join(root, ".agentplane");
  await fs.mkdir(path.join(agentplaneDir, "agents"), { recursive: true });
  await fs.writeFile(path.join(agentplaneDir, "agents", "ORCHESTRATOR.json"), "{}\n", "utf8");
  const cfg = defaultConfig();
  cfg.workflow_mode = "direct";
  await saveConfig(agentplaneDir, cfg);
  return root;
}

describe("workflow-runtime/file-ops", () => {
  it("publishes candidate atomically and creates last-known-good", async () => {
    const root = await setupRepo();
    try {
      const published = await publishWorkflowCandidate(root, DEFAULT_WORKFLOW_TEMPLATE);
      expect(published.ok).toBe(true);

      const paths = resolveWorkflowPaths(root);
      const workflow = await fs.readFile(paths.workflowPath, "utf8");
      const lkg = await fs.readFile(paths.lastKnownGoodPath, "utf8");
      expect(workflow).toContain("## Prompt Template");
      expect(lkg).toBe(workflow);

      const validation = await validateWorkflowAtPath(root);
      expect(validation.ok).toBe(true);
    } finally {
      await fs.rm(root, { recursive: true, force: true });
    }
  });

  it("restores workflow from last-known-good", async () => {
    const root = await setupRepo();
    try {
      const paths = resolveWorkflowPaths(root);
      await publishWorkflowCandidate(root, DEFAULT_WORKFLOW_TEMPLATE);
      await fs.writeFile(paths.workflowPath, "---\nmode: broken\n---\n", "utf8");

      const restored = await restoreWorkflowFromLastKnownGood(root);
      expect(restored.ok).toBe(true);

      const workflow = await fs.readFile(paths.workflowPath, "utf8");
      expect(workflow).toContain("## Prompt Template");
    } finally {
      await fs.rm(root, { recursive: true, force: true });
    }
  });
});
