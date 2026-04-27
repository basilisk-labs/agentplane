import { defaultConfig } from "@agentplaneorg/core/config";
import type { ResolvedProject } from "@agentplaneorg/core/project";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import { GitContext } from "@agentplaneorg/core/git";
import type { CommandContext } from "../shared/task-backend.js";
import { createIncidentRegistrySkeleton } from "../../runtime/incidents/index.js";

import { collectTaskIncidents } from "./shared.js";

const tempRoots: string[] = [];

function mkTask(): TaskData {
  return {
    id: "TASK-INC-1",
    title: "Promote incident without manual follow-up",
    description: "Exercise incident registry mirror writes",
    status: "DONE",
    priority: "normal",
    owner: "CODER",
    depends_on: [],
    tags: ["workflow"],
    verify: [],
    commit: { hash: "abc123", message: "feat: task" },
    doc: [
      "## Scope",
      "Incident registry promotion.",
      "",
      "## Findings",
      "- Observation: incident promotion left hidden policy drift for the next hook.",
      "  Impact: operators needed manual prettier and agents:sync follow-up.",
      "  Resolution: keep incident registry mirrors converged in the write path itself.",
      "  Fixability: external",
      "",
    ].join("\n"),
  };
}

function mkCtx(root: string, task: TaskData): CommandContext {
  const config = defaultConfig();
  const backend: TaskBackend = {
    id: "mock",
    capabilities: {
      canonical_source: "local",
      projection: "canonical",
      projection_read_mode: "native",
      reads_from_projection_by_default: true,
      writes_task_readmes: true,
      supports_task_revisions: true,
      supports_revision_guarded_writes: true,
      may_access_network_on_read: false,
      may_access_network_on_write: false,
      supports_projection_refresh: false,
      supports_push_sync: false,
      supports_snapshot_export: true,
    },
    listTasks: () => Promise.resolve([task]),
    getTask: (taskId) => Promise.resolve(taskId === task.id ? task : null),
    writeTask: () => Promise.resolve(),
  };
  const resolved = {
    gitRoot: root,
    agentplaneDir: path.join(root, ".agentplane"),
  } as unknown as ResolvedProject;
  return {
    resolvedProject: resolved,
    config,
    taskBackend: backend,
    backendId: "mock",
    backendConfigPath: path.join(root, ".agentplane", "backends", "local", "backend.json"),
    git: new GitContext({ gitRoot: root }),
    memo: {},
    resolved,
    backend,
  };
}

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("incident registry mirror writes", () => {
  it("keeps canonical and mirrored incidents registries byte-identical after promotion", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-incidents-"));
    tempRoots.push(root);
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await mkdir(path.join(root, "packages", "agentplane", "assets", "policy"), {
      recursive: true,
    });
    const registryText = createIncidentRegistrySkeleton();
    await writeFile(path.join(root, ".agentplane", "policy", "incidents.md"), registryText, "utf8");
    await writeFile(
      path.join(root, "packages", "agentplane", "assets", "policy", "incidents.md"),
      `${registryText.trimEnd()}\n`,
      "utf8",
    );

    const task = mkTask();
    const ctx = mkCtx(root, task);
    const result = await collectTaskIncidents({
      ctx,
      taskId: task.id,
      task,
      write: true,
    });

    expect(result.wrote).toBe(true);
    expect(result.registryPaths).toEqual([
      ".agentplane/policy/incidents.md",
      "packages/agentplane/assets/policy/incidents.md",
    ]);

    const mirrored = await readFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
      "utf8",
    );
    const canonical = await readFile(
      path.join(root, "packages", "agentplane", "assets", "policy", "incidents.md"),
      "utf8",
    );

    expect(mirrored).toBe(canonical);
    expect(mirrored).toContain("incident promotion left hidden policy drift");
    expect(mirrored.endsWith("\n")).toBe(true);
  });
});
