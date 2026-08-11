import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";
import { parse as parseYaml } from "yaml";

const WORKFLOWS_DIR = path.resolve(process.cwd(), ".github/workflows");
const CI_WORKFLOW_PATH = path.join(WORKFLOWS_DIR, "ci.yml");
const NODE_ENGINE_CONTRACTS = {
  "package.json": ">=24",
  "packages/agentplane/package.json": ">=24",
  "packages/core/package.json": ">=20.5.0",
  "packages/recipes/package.json": ">=20",
  "website/package.json": ">=24",
} as const;
const DEPCRUISE_SCRIPT_PATH = path.resolve(process.cwd(), "scripts/checks/run-depcruise-arch.mjs");

type WorkflowStep = {
  name?: string;
  uses?: string;
  env?: Record<string, unknown>;
  with?: Record<string, unknown>;
  run?: string;
};

type WorkflowJob = {
  needs?: string[];
  steps?: WorkflowStep[];
};

type WorkflowDocument = {
  jobs?: Record<string, WorkflowJob>;
};

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
  it("keeps Node 20 selection isolated to the explicit package compatibility matrix", async () => {
    const workflowFiles = await listWorkflowFiles(WORKFLOWS_DIR);
    expect(workflowFiles.length).toBeGreaterThan(0);
    let setupNodeSteps = 0;

    for (const workflowPath of workflowFiles) {
      const workflow = parseYaml(await readFile(workflowPath, "utf8")) as WorkflowDocument;
      for (const [jobId, job] of Object.entries(workflow.jobs ?? {})) {
        for (const [stepIndex, step] of (job.steps ?? []).entries()) {
          if (!step.uses?.startsWith("actions/setup-node@")) continue;
          setupNodeSteps += 1;
          const label = `${workflowPath} jobs.${jobId}.steps[${stepIndex}]`;
          const nodeVersion = step.with?.["node-version"];
          if (workflowPath === CI_WORKFLOW_PATH && jobId === "verify-package-node-runtime") {
            expect(["20.0.0", "20.5.0", "24"], label).toContain(nodeVersion);
          } else {
            expect(nodeVersion, label).toBe("24");
          }
        }
      }
    }
    expect(setupNodeSteps).toBeGreaterThan(0);
  });

  it("backs every advertised package range with packed-artifact runtime checks", async () => {
    for (const [relativePath, expectedEngine] of Object.entries(NODE_ENGINE_CONTRACTS)) {
      const packagePath = path.resolve(process.cwd(), relativePath);
      const packageJson = JSON.parse(await readFile(packagePath, "utf8")) as {
        engines?: { node?: string };
      };
      expect(packageJson.engines?.node, packagePath).toBe(expectedEngine);
    }

    const workflow = parseYaml(await readFile(CI_WORKFLOW_PATH, "utf8")) as WorkflowDocument;
    const compatibilityJob = workflow.jobs?.["verify-package-node-runtime"];
    expect(compatibilityJob?.needs).toBe("plan");
    const setupNodeVersions = (compatibilityJob?.steps ?? [])
      .filter((step) => step.uses?.startsWith("actions/setup-node@"))
      .map((step) => step.with?.["node-version"]);
    expect(setupNodeVersions).toEqual(["24", "20.5.0", "24", "20.0.0", "24"]);
    const commands = (compatibilityJob?.steps ?? []).map((step) => step.run ?? "").join("\n");
    expect(commands).toContain("npm pack --json");
    expect(commands).toContain("check-package-node-runtime.mjs");
    expect(commands).toContain("--package-dir packages/core");
    expect(commands).toContain("--package-dir packages/recipes");
    expect(commands).toContain('--tarball-dir "$RUNNER_TEMP/package-node-runtime/core"');
    expect(commands).toContain('--tarball-dir "$RUNNER_TEMP/package-node-runtime/recipes"');

    const aggregateJob = workflow.jobs?.["pr-verification"];
    expect(aggregateJob?.needs).toContain("verify-package-node-runtime");
    const aggregateRun =
      aggregateJob?.steps?.find((step) => step.name === "Evaluate aggregate verification")?.run ??
      "";
    expect(aggregateRun).toBe("node scripts/checks/evaluate-github-ci.mjs");
    const aggregateEnv =
      aggregateJob?.steps?.find((step) => step.name === "Evaluate aggregate verification") ?? {};
    expect(aggregateEnv).toMatchObject({
      env: {
        AGENTPLANE_CI_PLAN_JSON: "${{ needs.plan.outputs.plan_json }}",
      },
    });
    expect(String(aggregateEnv.env?.AGENTPLANE_CI_RESULTS_JSON)).toContain(
      '"verify-package-node-runtime":"${{ needs.verify-package-node-runtime.result }}"',
    );

    const depcruiseScript = await readFile(DEPCRUISE_SCRIPT_PATH, "utf8");

    expect(depcruiseScript).toContain("major < 24");
    expect(depcruiseScript).not.toContain("major !== 24");
    expect(depcruiseScript).toContain("requires Node >=24");
  });
});
