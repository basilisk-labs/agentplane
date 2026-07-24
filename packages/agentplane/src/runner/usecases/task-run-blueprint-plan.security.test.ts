import { mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { makeRunnerContextBundle, setRunnerBundleRunDir } from "@agentplane/testkit/runner";
import { describe, expect, it } from "vitest";

import { buildBlueprintPlanArtifact, resolveBlueprint } from "../../blueprints/index.js";
import { writeTaskBlueprintSnapshot } from "./task-run-blueprint-plan.js";

describe("runner blueprint prepared-artifact security", () => {
  it.skipIf(process.platform === "win32")(
    "refuses a pre-created final-component symlink without overwriting its target",
    async () => {
      const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-blueprint-symlink-"));
      try {
        const runDir = path.join(root, "runs", "run-blueprint-symlink");
        await mkdir(runDir, { recursive: true });
        const victimPath = path.join(root, "victim.json");
        await writeFile(victimPath, "sentinel\n", "utf8");

        const bundle = makeRunnerContextBundle({
          gitRoot: root,
          runId: "run-blueprint-symlink",
        });
        setRunnerBundleRunDir(bundle, runDir);
        const resolved = resolveBlueprint({
          input: {
            taskId: bundle.task!.task_id,
            tags: ["code"],
            taskKind: "code",
            mutation: "code",
            workflowMode: "branch_pr",
          },
        });
        bundle.blueprint = buildBlueprintPlanArtifact({
          resolved,
          input: {
            taskId: bundle.task!.task_id,
            tags: ["code"],
            taskKind: "code",
            mutation: "code",
            workflowMode: "branch_pr",
          },
          workflowMode: "branch_pr",
        });
        await symlink(victimPath, bundle.execution.artifact_paths.blueprint_plan_path, "file");

        await expect(writeTaskBlueprintSnapshot(bundle)).rejects.toThrow(
          /Refusing pre-existing or non-regular runner blueprint plan/u,
        );
        expect(await readFile(victimPath, "utf8")).toBe("sentinel\n");
      } finally {
        await rm(root, { recursive: true, force: true });
      }
    },
  );
});
