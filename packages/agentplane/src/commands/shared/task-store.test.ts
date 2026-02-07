import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { defaultConfig, renderTaskReadme } from "@agentplaneorg/core";

import { LocalBackend } from "../../backends/task-backend.js";
import type { CommandContext } from "./task-backend.js";
import { TaskStore } from "./task-store.js";

function makeCtx(root: string): CommandContext {
  const config = defaultConfig();
  const backend = new LocalBackend({ dir: path.join(root, ".agentplane", "tasks") });
  return {
    resolvedProject: { gitRoot: root, agentplaneDir: path.join(root, ".agentplane") } as never,
    config: config as never,
    taskBackend: backend,
    backendId: "local",
    backendConfigPath: path.join(root, ".agentplane", "backends", "local", "backend.json"),
    git: { gitRoot: root } as never,
    memo: {},
    resolved: { gitRoot: root, agentplaneDir: path.join(root, ".agentplane") } as never,
    backend,
  };
}

function baseReadme(taskId: string, title: string): string {
  const fm = {
    id: taskId,
    title,
    status: "TODO",
    priority: "med",
    owner: "CODER",
    depends_on: [],
    tags: [],
    verify: [],
    plan_approval: { state: "approved", updated_at: null, updated_by: null, note: null },
    verification: { state: "pending", updated_at: null, updated_by: null, note: null },
    comments: [],
    doc_version: 2,
    doc_updated_at: "2026-02-07T00:00:00Z",
    doc_updated_by: "CODER",
    description: "",
  };
  const body = "## Summary\n\nx\n";
  const rendered = renderTaskReadme(fm, body);
  return rendered.endsWith("\n") ? rendered : `${rendered}\n`;
}

describe("commands/shared/TaskStore", () => {
  it("retries once on concurrent modification and succeeds", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-taskstore-"));
    const taskId = "202602070000-ABCD";
    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    await mkdir(path.dirname(readmePath), { recursive: true });
    const initial = baseReadme(taskId, "before");
    await writeFile(readmePath, initial, "utf8");

    const ctx = makeCtx(root);
    const store = new TaskStore(ctx);

    let didInterfere = false;
    const result = await store.update(taskId, async (current) => {
      if (!didInterfere) {
        didInterfere = true;
        await new Promise((resolve) => setTimeout(resolve, 10));
        await writeFile(readmePath, `${initial}\n# external\n`, "utf8");
      }
      return { ...current, title: "after" };
    });

    expect(didInterfere).toBe(true);
    expect(result.changed).toBe(true);
    const final = await readFile(readmePath, "utf8");
    expect(final).toContain('title: "after"');
    expect(final).toContain("# external");
  });

  it("fails when the README keeps changing between read and write", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-taskstore-"));
    const taskId = "202602070000-WXYZ";
    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    await mkdir(path.dirname(readmePath), { recursive: true });
    const initial = baseReadme(taskId, "before");
    await writeFile(readmePath, initial, "utf8");

    const ctx = makeCtx(root);
    const store = new TaskStore(ctx);

    await expect(
      store.update(taskId, async (current) => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        await writeFile(readmePath, `${initial}\n# external\n`, "utf8");
        return { ...current, title: "after" };
      }),
    ).rejects.toMatchObject({ code: "E_IO" });
  });
});
