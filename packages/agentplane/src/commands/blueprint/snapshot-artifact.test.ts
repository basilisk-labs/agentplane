import { mkdtemp, readFile } from "node:fs/promises";
import path from "node:path";
import { tmpdir } from "node:os";

import { makeTaskCommandContext, makeTaskFixture } from "@agentplane/testkit/task";
import { describe, expect, it } from "vitest";

import {
  checkTaskBlueprintSnapshotDrift,
  refreshTaskBlueprintResolvedSnapshot,
  taskBlueprintSnapshotPath,
  writeTaskBlueprintResolvedSnapshot,
} from "./snapshot-artifact.js";

describe("blueprint snapshot artifacts", () => {
  it("writes a resolved blueprint snapshot under the task artifact directory", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-blueprint-"));
    const ctx = makeTaskCommandContext({
      resolvedProject: {
        gitRoot: root,
        agentplaneDir: path.join(root, ".agentplane"),
      } as ReturnType<typeof makeTaskCommandContext>["resolvedProject"],
      configureConfig: (config) => {
        config.workflow_mode = "branch_pr";
      },
    });
    const task = makeTaskFixture({
      id: "202605060915-0EDRBK",
      title: "Persist resolved blueprint snapshot on task start",
      tags: ["blueprints", "code", "lifecycle"],
      task_kind: "code",
      mutation_scope: "code",
    });

    const result = await writeTaskBlueprintResolvedSnapshot({ ctx, task });
    const expectedPath = taskBlueprintSnapshotPath({ ctx, taskId: task.id });
    const parsed = JSON.parse(await readFile(expectedPath, "utf8")) as {
      artifactKind?: string;
      selectedBlueprint?: { id?: string };
      digest?: { value?: string };
    };

    expect(result.path).toBe(expectedPath);
    expect(parsed.artifactKind).toBe("agentplane.blueprint.resolved_snapshot");
    expect(parsed.selectedBlueprint?.id).toBe("code.branch_pr");
    expect(parsed.digest?.value).toMatch(/^[a-f0-9]{64}$/);
  });

  it("reports old and new digest state when refreshing a snapshot", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-blueprint-refresh-"));
    const ctx = makeTaskCommandContext({
      resolvedProject: {
        gitRoot: root,
        agentplaneDir: path.join(root, ".agentplane"),
      } as ReturnType<typeof makeTaskCommandContext>["resolvedProject"],
      configureConfig: (config) => {
        config.workflow_mode = "branch_pr";
      },
    });
    const task = makeTaskFixture({
      id: "202605060915-3NBTGG",
      title: "Add explicit blueprint snapshot refresh command",
      tags: ["blueprints", "cli", "lifecycle"],
      task_kind: "code",
      mutation_scope: "code",
    });

    const first = await refreshTaskBlueprintResolvedSnapshot({ ctx, task });
    const second = await refreshTaskBlueprintResolvedSnapshot({ ctx, task });

    expect(first.previous.exists).toBe(false);
    expect(first.changed).toBe(true);
    expect(first.routeChanged).toBeNull();
    expect(second.previous.exists).toBe(true);
    expect(second.previous.valid).toBe(true);
    expect(second.previous.digest).toBe(second.next.digest);
    expect(second.changed).toBe(false);
    expect(second.routeChanged).toBe(false);
  });

  it("detects missing, current, and stale snapshot states without rewriting", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-blueprint-drift-"));
    const ctx = makeTaskCommandContext({
      resolvedProject: {
        gitRoot: root,
        agentplaneDir: path.join(root, ".agentplane"),
      } as ReturnType<typeof makeTaskCommandContext>["resolvedProject"],
      configureConfig: (config) => {
        config.workflow_mode = "branch_pr";
      },
    });
    const task = makeTaskFixture({
      id: "202605060915-RQFY8Y",
      title: "Detect blueprint snapshot drift",
      tags: ["blueprints", "code", "doctor"],
      task_kind: "code",
      mutation_scope: "code",
    });

    const missing = await checkTaskBlueprintSnapshotDrift({ ctx, task });
    expect(missing.state).toBe("missing");
    expect(missing.safeCommand).toBe(`agentplane blueprint snapshot ${task.id}`);

    await writeTaskBlueprintResolvedSnapshot({ ctx, task });
    const current = await checkTaskBlueprintSnapshotDrift({ ctx, task });
    expect(current.state).toBe("current");
    expect(current.routeChanged).toBe(false);

    const stale = await checkTaskBlueprintSnapshotDrift({
      ctx,
      task: { ...task, mutation_scope: "none", task_kind: "analysis", tags: ["analysis"] },
    });
    expect(stale.state).toBe("stale");
    expect(stale.routeChanged).toBe(true);
  });
});
