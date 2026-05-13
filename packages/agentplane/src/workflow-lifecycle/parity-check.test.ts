import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { collectLifecycleParityFindings, formatLifecycleParityFindings } from "./parity-check.js";

async function copySurfaceFiles(root: string, destination: string): Promise<void> {
  const files = [
    "packages/agentplane/assets/AGENTS.md",
    "docs/user/workflow.mdx",
    "docs/user/task-lifecycle.mdx",
    "docs/user/commands.mdx",
    "docs/user/branching-and-pr-artifacts.mdx",
    "docs/workflow-guides/branch-pr.mdx",
  ];

  for (const file of files) {
    const source = path.join(root, file);
    const target = path.join(destination, file);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, await readFile(source, "utf8"));
  }
}

describe("workflow lifecycle parity checker", () => {
  it("passes for the repository lifecycle surfaces", async () => {
    await expect(collectLifecycleParityFindings()).resolves.toEqual([]);
  });

  it("reports stale branch_pr manual remote guidance", async () => {
    const root = process.cwd();
    const tmp = await mkdtemp(path.join(os.tmpdir(), "agentplane-lifecycle-parity-"));
    await copySurfaceFiles(root, tmp);

    const workflowPath = path.join(tmp, "docs/user/workflow.mdx");
    await writeFile(
      workflowPath,
      `${await readFile(workflowPath, "utf8")}\n\ngit push -u origin task/<task-id>/<slug>\n`,
    );

    const findings = await collectLifecycleParityFindings(tmp);

    expect(findings).toContainEqual(
      expect.objectContaining({
        code: "branch_pr_manual_remote_step_drift",
        file: "docs/user/workflow.mdx",
      }),
    );
    expect(formatLifecycleParityFindings(findings)).toContain(
      "Workflow lifecycle parity violation",
    );
  });
});
