import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";

import { createTask, listTasks, readTask } from "./index.js";

async function mkGitRepoRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-task-store-test-"));
  await mkdir(path.join(root, ".git"), { recursive: true });
  return root;
}

describe("task-store", () => {
  it("createTask writes task README and can be read back", async () => {
    const root = await mkGitRepoRoot();

    const created = await createTask({
      cwd: root,
      rootOverride: root,
      title: "My task",
      description: "Why it matters",
      owner: "CODER",
      priority: "med",
      tags: ["nodejs"],
      dependsOn: [],
      verify: [],
    });

    expect(created.id).toMatch(/^\d{12}-[A-Z0-9]{6}$/);

    const readme = await readFile(created.readmePath, "utf8");
    expect(readme).toContain(`id: "${created.id}"`);
    expect(readme).toContain('status: "TODO"');

    const loaded = await readTask({ cwd: root, rootOverride: root, taskId: created.id });
    expect(loaded.frontmatter.title).toBe("My task");
    expect(loaded.frontmatter.owner).toBe("CODER");
    expect(loaded.frontmatter.tags).toEqual(["nodejs"]);
  });

  it("listTasks returns tasks sorted by id", async () => {
    const root = await mkGitRepoRoot();

    const a = await createTask({
      cwd: root,
      rootOverride: root,
      title: "A",
      description: "A",
      owner: "CODER",
      priority: "med",
      tags: ["nodejs"],
      dependsOn: [],
      verify: [],
    });
    const b = await createTask({
      cwd: root,
      rootOverride: root,
      title: "B",
      description: "B",
      owner: "CODER",
      priority: "med",
      tags: ["nodejs"],
      dependsOn: [],
      verify: [],
    });

    const tasks = await listTasks({ cwd: root, rootOverride: root });
    const ids = tasks.map((t) => t.id);
    expect(ids).toContain(a.id);
    expect(ids).toContain(b.id);
    expect(ids).toEqual([...ids].toSorted((x, y) => x.localeCompare(y)));
  });

  it("createTask retries on id collision and listTasks skips broken readmes", async () => {
    const root = await mkGitRepoRoot();

    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));

    const randomSpy = vi.spyOn(Math, "random");
    let calls = 0;
    randomSpy.mockImplementation(() => {
      calls++;
      return calls <= 6 ? 0 : 0.5;
    });

    try {
      const collisionId = "202601010000-AAAAAA";
      const collisionReadme = path.join(root, ".agentplane", "tasks", collisionId, "README.md");
      await mkdir(path.dirname(collisionReadme), { recursive: true });
      await writeFile(collisionReadme, "already exists\n", "utf8");

      const created = await createTask({
        cwd: root,
        rootOverride: root,
        title: "My task",
        description: "Why it matters",
        owner: "CODER",
        priority: "med",
        tags: ["nodejs"],
        dependsOn: [],
        verify: [],
      });
      expect(created.id).not.toBe(collisionId);

      const brokenReadme = path.join(root, ".agentplane", "tasks", "BROKEN", "README.md");
      await mkdir(path.dirname(brokenReadme), { recursive: true });
      await writeFile(brokenReadme, "# no frontmatter\n", "utf8");

      const tasks = await listTasks({ cwd: root, rootOverride: root });
      expect(tasks.some((t) => t.id === "BROKEN")).toBe(false);
      expect(tasks.some((t) => t.id === created.id)).toBe(true);
    } finally {
      randomSpy.mockRestore();
      vi.useRealTimers();
    }
  });

  it("createTask throws after too many id collisions", async () => {
    const root = await mkGitRepoRoot();

    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));

    const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0);

    try {
      const collisionId = "202601010000-AAAAAA";
      const collisionReadme = path.join(root, ".agentplane", "tasks", collisionId, "README.md");
      await mkdir(path.dirname(collisionReadme), { recursive: true });
      await writeFile(collisionReadme, "already exists\n", "utf8");

      await expect(
        createTask({
          cwd: root,
          rootOverride: root,
          title: "My task",
          description: "Why it matters",
          owner: "CODER",
          priority: "med",
          tags: ["nodejs"],
          dependsOn: [],
          verify: [],
        }),
      ).rejects.toThrow(/unique task id/i);
    } finally {
      randomSpy.mockRestore();
      vi.useRealTimers();
    }
  });
});
