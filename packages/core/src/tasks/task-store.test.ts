import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";

import {
  defaultConfig,
  createTask,
  listTasks,
  readTask,
  saveConfig,
  setTaskDocSection,
  validateTaskDocMetadata,
} from "../index.js";

async function mkGitRepoRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-task-store-test-"));
  await mkdir(path.join(root, ".git"), { recursive: true });
  const agentplaneDir = path.join(root, ".agentplane");
  await mkdir(agentplaneDir, { recursive: true });
  await saveConfig(agentplaneDir, defaultConfig());
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

    try {
      const collisionId = "202601010000-000000";
      const collisionReadme = path.join(root, ".agentplane", "tasks", collisionId, "README.md");
      await mkdir(path.dirname(collisionReadme), { recursive: true });
      await writeFile(collisionReadme, "already exists\n", "utf8");

      const idGenerator = async (opts: {
        attempts: number;
        isAvailable?: (taskId: string) => boolean | Promise<boolean>;
      }) => {
        const candidates = ["202601010000-000000", "202601010000-111111"];
        for (let i = 0; i < opts.attempts; i += 1) {
          const candidate = candidates[i];
          if (!candidate) break;
          if (await opts.isAvailable?.(candidate)) return candidate;
        }
        throw new Error("Failed to generate a unique task id (exhausted attempts)");
      };

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
        idGenerator,
      });
      expect(created.id).not.toBe(collisionId);

      const brokenReadme = path.join(root, ".agentplane", "tasks", "BROKEN", "README.md");
      await mkdir(path.dirname(brokenReadme), { recursive: true });
      await writeFile(brokenReadme, "# no frontmatter\n", "utf8");

      const tasks = await listTasks({ cwd: root, rootOverride: root });
      expect(tasks.some((t) => t.id === "BROKEN")).toBe(false);
      expect(tasks.some((t) => t.id === created.id)).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });

  it("createTask throws after too many id collisions", async () => {
    const root = await mkGitRepoRoot();

    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));

    try {
      const collisionId = "202601010000-000000";
      const collisionReadme = path.join(root, ".agentplane", "tasks", collisionId, "README.md");
      await mkdir(path.dirname(collisionReadme), { recursive: true });
      await writeFile(collisionReadme, "already exists\n", "utf8");

      const idGenerator = async (opts: {
        attempts: number;
        isAvailable?: (taskId: string) => boolean | Promise<boolean>;
      }) => {
        const candidate = "202601010000-000000";
        for (let i = 0; i < opts.attempts; i += 1) {
          if (await opts.isAvailable?.(candidate)) return candidate;
        }
        throw new Error("Failed to generate a unique task id (exhausted attempts)");
      };

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
          idGenerator,
        }),
      ).rejects.toThrow(/unique task id/i);
    } finally {
      vi.useRealTimers();
    }
  });

  it("setTaskDocSection updates the section and bumps doc metadata", async () => {
    const root = await mkGitRepoRoot();

    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));

    try {
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

      const before = await readTask({ cwd: root, rootOverride: root, taskId: created.id });
      expect(before.frontmatter.doc_updated_at).toBe("2026-01-01T00:00:00.000Z");
      expect(before.frontmatter.doc_updated_by).toBe("CODER");

      vi.setSystemTime(new Date("2026-01-01T00:00:01Z"));

      await setTaskDocSection({
        cwd: root,
        rootOverride: root,
        taskId: created.id,
        section: "Summary",
        text: "Hello",
        updatedBy: "CODER",
      });

      const after = await readTask({ cwd: root, rootOverride: root, taskId: created.id });
      expect(after.frontmatter.doc_updated_at).toBe("2026-01-01T00:00:01.000Z");
      expect(after.frontmatter.doc_updated_by).toBe("CODER");

      const readme = await readFile(after.readmePath, "utf8");
      expect(readme).toContain("## Summary");
      expect(readme).toContain("Hello");
    } finally {
      vi.useRealTimers();
    }
  });

  it("setTaskDocSection dedupes repeated section headings", async () => {
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

    const original = await readFile(created.readmePath, "utf8");
    const duplicated = `${original}\n## Summary\n\nOld summary\n\n## Scope\n\nOld scope\n`;
    await writeFile(created.readmePath, duplicated, "utf8");

    await setTaskDocSection({
      cwd: root,
      rootOverride: root,
      taskId: created.id,
      section: "Summary",
      text: "Updated summary",
      updatedBy: "CODER",
    });

    const updated = await readFile(created.readmePath, "utf8");
    expect((updated.match(/^## Summary$/gm) ?? []).length).toBe(1);
    expect((updated.match(/^## Scope$/gm) ?? []).length).toBe(1);
    expect(updated).toContain("Updated summary");
  });

  it("setTaskDocSection splits concatenated headings", async () => {
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

    const original = await readFile(created.readmePath, "utf8");
    const duplicated = `${original}\n## Summary## Summary\n\nOld summary\n\n## Scope\n\nOld scope\n`;
    await writeFile(created.readmePath, duplicated, "utf8");

    await setTaskDocSection({
      cwd: root,
      rootOverride: root,
      taskId: created.id,
      section: "Summary",
      text: "Updated summary",
      updatedBy: "CODER",
    });

    const updated = await readFile(created.readmePath, "utf8");
    expect(updated).not.toContain("## Summary## Summary");
    expect((updated.match(/^## Summary$/gm) ?? []).length).toBe(1);
    expect((updated.match(/^## Scope$/gm) ?? []).length).toBe(1);
    expect(updated).toContain("Updated summary");
  });

  it("setTaskDocSection defaults doc_updated_by to last comment author", async () => {
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

    const original = await readFile(created.readmePath, "utf8");
    const withComment = original.replace(
      "comments: []",
      `comments:
  - { author: "DOCS", body: "Note" }`,
    );
    await writeFile(created.readmePath, withComment, "utf8");

    await setTaskDocSection({
      cwd: root,
      rootOverride: root,
      taskId: created.id,
      section: "Summary",
      text: "Updated summary",
    });

    const updated = await readTask({ cwd: root, rootOverride: root, taskId: created.id });
    expect(updated.frontmatter.doc_updated_by).toBe("DOCS");
  });

  it("setTaskDocSection appends a missing section and validates inputs", async () => {
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

    await setTaskDocSection({
      cwd: root,
      rootOverride: root,
      taskId: created.id,
      section: "Notes",
      text: "More details",
      updatedBy: "CODER",
    });

    const readme = await readFile(created.readmePath, "utf8");
    expect(readme).toContain("## Notes");
    expect(readme).toContain("More details");

    await expect(
      setTaskDocSection({
        cwd: root,
        rootOverride: root,
        taskId: created.id,
        section: "Nope",
        text: "x",
        updatedBy: "CODER",
      }),
    ).rejects.toThrow(/unknown doc section/i);

    await expect(
      setTaskDocSection({
        cwd: root,
        rootOverride: root,
        taskId: created.id,
        section: "Summary",
        text: "x",
        updatedBy: "   ",
      }),
    ).rejects.toThrow(/doc_updated_by/i);
  });

  it("validateTaskDocMetadata reports missing required metadata", () => {
    const errors = validateTaskDocMetadata({
      doc_version: 1,
      doc_updated_at: "nope",
      doc_updated_by: "",
    });
    expect(errors).toEqual([
      "doc_version must be 2",
      "doc_updated_at must be an ISO timestamp",
      "doc_updated_by must be a non-empty string",
    ]);
  });

  it("validateTaskDocMetadata returns no errors for valid metadata", () => {
    const errors = validateTaskDocMetadata({
      doc_version: 2,
      doc_updated_at: "2026-02-05T00:00:00Z",
      doc_updated_by: "CODER",
    });
    expect(errors).toEqual([]);
  });

  it("setTaskDocSection prefers existing doc_updated_by when available", async () => {
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

    const original = await readFile(created.readmePath, "utf8");
    const withDocAuthor = original.replace('doc_updated_by: "CODER"', 'doc_updated_by: "DOCS"');
    await writeFile(created.readmePath, withDocAuthor, "utf8");

    await setTaskDocSection({
      cwd: root,
      rootOverride: root,
      taskId: created.id,
      section: "Summary",
      text: "Updated summary",
    });

    const updated = await readTask({ cwd: root, rootOverride: root, taskId: created.id });
    expect(updated.frontmatter.doc_updated_by).toBe("DOCS");
  });

  it("setTaskDocSection falls back to owner when doc_updated_by is agentplane", async () => {
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

    const original = await readFile(created.readmePath, "utf8");
    const withAgentplane = original.replace(
      'doc_updated_by: "CODER"',
      'doc_updated_by: "agentplane"',
    );
    await writeFile(created.readmePath, withAgentplane, "utf8");

    await setTaskDocSection({
      cwd: root,
      rootOverride: root,
      taskId: created.id,
      section: "Summary",
      text: "Updated summary",
    });

    const updated = await readTask({ cwd: root, rootOverride: root, taskId: created.id });
    expect(updated.frontmatter.doc_updated_by).toBe("CODER");
  });
});
