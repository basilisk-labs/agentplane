import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { defaultConfig, renderTaskReadme, writeTasksExport } from "@agentplaneorg/core";

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

function baseReadme(taskId: string, title: string, docVersion: 2 | 3 = 2): string {
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
    doc_version: docVersion,
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

  it("preserves doc_version=3 across task-store updates and task export", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-taskstore-"));
    await mkdir(path.join(root, ".git"), { recursive: true });
    const taskId = "202602070000-V3OK";
    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    await mkdir(path.dirname(readmePath), { recursive: true });
    await writeFile(readmePath, baseReadme(taskId, "before", 3), "utf8");

    const ctx = makeCtx(root);
    const store = new TaskStore(ctx);

    const result = await store.update(taskId, (current) => {
      return { ...current, doc: `${current.doc ?? ""}\nUpdated.`, doc_version: 3 };
    });

    expect(result.task.doc_version).toBe(3);

    const final = await readFile(readmePath, "utf8");
    expect(final).toContain("doc_version: 3");

    const { snapshot } = await writeTasksExport({ cwd: root, rootOverride: root });
    const exported = snapshot.tasks.find((task) => task.id === taskId);
    expect(exported?.doc_version).toBe(3);
  });

  it("rejects concurrent writes to the same README section via semantic patch preconditions", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-taskstore-"));
    const taskId = "202602070000-CONF";
    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    await mkdir(path.dirname(readmePath), { recursive: true });
    const initial = renderTaskReadme(
      {
        id: taskId,
        title: "Task",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: [],
        plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null },
        verification: { state: "pending", updated_at: null, updated_by: null, note: null },
        comments: [],
        doc_version: 3,
        doc_updated_at: "2026-02-07T00:00:00Z",
        doc_updated_by: "CODER",
        description: "",
      },
      ["## Summary", "before", "", "## Plan", "plan", ""].join("\n"),
    );
    await writeFile(readmePath, `${initial}\n`, "utf8");

    const ctx = makeCtx(root);
    const store = new TaskStore(ctx);

    let didInterfere = false;
    let expectedSummary: string | null | undefined;
    await expect(
      store.patch(taskId, async (current) => {
        expectedSummary ??= /## Summary\s+before/u.test(String(current.doc ?? ""))
          ? "before"
          : null;
        if (!didInterfere) {
          didInterfere = true;
          await new Promise((resolve) => setTimeout(resolve, 10));
          await writeFile(
            readmePath,
            `${renderTaskReadme(
              {
                id: taskId,
                title: "Task",
                status: "TODO",
                priority: "med",
                owner: "CODER",
                depends_on: [],
                tags: [],
                verify: [],
                plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null },
                verification: { state: "pending", updated_at: null, updated_by: null, note: null },
                comments: [],
                doc_version: 3,
                doc_updated_at: "2026-02-07T00:00:00Z",
                doc_updated_by: "CODER",
                description: "",
              },
              ["## Summary", "other writer", "", "## Plan", "plan", ""].join("\n"),
            )}\n`,
            "utf8",
          );
        }
        return {
          doc: {
            kind: "set-section",
            section: "Summary",
            text: "my update",
            requiredSections: ["Summary", "Plan"],
            expectedCurrentText: expectedSummary,
          },
          docMeta: { touch: true, updatedBy: "CODER", version: 3 },
        };
      }),
    ).rejects.toMatchObject({
      code: "E_VALIDATION",
      context: { reason_code: "task_readme_section_conflict", section: "Summary" },
    });
    expect(didInterfere).toBe(true);
  });

  it("rejects concurrent full-doc replacements via semantic patch preconditions", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-taskstore-"));
    const taskId = "202602070000-FULL";
    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    await mkdir(path.dirname(readmePath), { recursive: true });
    const initial = renderTaskReadme(
      {
        id: taskId,
        title: "Task",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: [],
        plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null },
        verification: { state: "pending", updated_at: null, updated_by: null, note: null },
        comments: [],
        doc_version: 3,
        doc_updated_at: "2026-02-07T00:00:00Z",
        doc_updated_by: "CODER",
        description: "",
      },
      ["## Summary", "before", "", "## Plan", "plan", ""].join("\n"),
    );
    await writeFile(readmePath, `${initial}\n`, "utf8");

    const ctx = makeCtx(root);
    const store = new TaskStore(ctx);

    let didInterfere = false;
    let expectedDoc: string | undefined;
    await expect(
      store.patch(taskId, async (current) => {
        expectedDoc ??= String(current.doc ?? "");
        if (!didInterfere) {
          didInterfere = true;
          await new Promise((resolve) => setTimeout(resolve, 10));
          await writeFile(
            readmePath,
            `${renderTaskReadme(
              {
                id: taskId,
                title: "Task",
                status: "TODO",
                priority: "med",
                owner: "CODER",
                depends_on: [],
                tags: [],
                verify: [],
                plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null },
                verification: { state: "pending", updated_at: null, updated_by: null, note: null },
                comments: [],
                doc_version: 3,
                doc_updated_at: "2026-02-07T00:00:00Z",
                doc_updated_by: "CODER",
                description: "",
              },
              ["## Summary", "other writer", "", "## Plan", "plan", ""].join("\n"),
            )}\n`,
            "utf8",
          );
        }
        return {
          doc: {
            kind: "replace-doc",
            doc: ["## Summary", "my replacement", "", "## Plan", "plan", ""].join("\n"),
            expectedCurrentDoc: expectedDoc,
          },
          docMeta: { touch: true, updatedBy: "CODER", version: 3 },
        };
      }),
    ).rejects.toMatchObject({
      code: "E_VALIDATION",
      context: { reason_code: "task_readme_conflict" },
    });
    expect(didInterfere).toBe(true);
  });

  it("preserves concurrent writes to other README sections when a semantic patch targets a different section", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-taskstore-"));
    const taskId = "202602070000-KEEP";
    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    await mkdir(path.dirname(readmePath), { recursive: true });
    const initial = renderTaskReadme(
      {
        id: taskId,
        title: "Task",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: [],
        plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null },
        verification: { state: "pending", updated_at: null, updated_by: null, note: null },
        comments: [],
        doc_version: 3,
        doc_updated_at: "2026-02-07T00:00:00Z",
        doc_updated_by: "CODER",
        description: "",
      },
      ["## Summary", "before", "", "## Plan", "plan", ""].join("\n"),
    );
    await writeFile(readmePath, `${initial}\n`, "utf8");

    const ctx = makeCtx(root);
    const store = new TaskStore(ctx);

    let didInterfere = false;
    let expectedSummary: string | null | undefined;
    const result = await store.patch(taskId, async (current) => {
      expectedSummary ??= /## Summary\s+before/u.test(String(current.doc ?? "")) ? "before" : null;
      if (!didInterfere) {
        didInterfere = true;
        await new Promise((resolve) => setTimeout(resolve, 10));
        await writeFile(
          readmePath,
          `${renderTaskReadme(
            {
              id: taskId,
              title: "Task",
              status: "TODO",
              priority: "med",
              owner: "CODER",
              depends_on: [],
              tags: [],
              verify: [],
              plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null },
              verification: { state: "pending", updated_at: null, updated_by: null, note: null },
              comments: [],
              doc_version: 3,
              doc_updated_at: "2026-02-07T00:00:00Z",
              doc_updated_by: "CODER",
              description: "",
            },
            ["## Summary", "before", "", "## Plan", "concurrent plan", ""].join("\n"),
          )}\n`,
          "utf8",
        );
      }
      return {
        doc: {
          kind: "set-section",
          section: "Summary",
          text: "my update",
          requiredSections: ["Summary", "Plan"],
          expectedCurrentText: expectedSummary,
        },
        docMeta: { touch: true, updatedBy: "CODER", version: 3 },
      };
    });

    expect(result.changed).toBe(true);
    const final = await readFile(readmePath, "utf8");
    expect(final).toContain("## Summary");
    expect(final).toContain("my update");
    expect(final).toContain("## Plan");
    expect(final).toContain("concurrent plan");
  });

  it("merges append-safe semantic patches after concurrent retries", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-taskstore-"));
    const taskId = "202602070000-APPND";
    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    await mkdir(path.dirname(readmePath), { recursive: true });
    await writeFile(readmePath, baseReadme(taskId, "Task", 3), "utf8");

    const ctx = makeCtx(root);
    const store = new TaskStore(ctx);

    let didInterfere = false;
    const result = await store.patch(taskId, async () => {
      if (!didInterfere) {
        didInterfere = true;
        await new Promise((resolve) => setTimeout(resolve, 10));
        await store.update(taskId, (current) => ({
          ...current,
          comments: [...(current.comments ?? []), { author: "OTHER", body: "external" }],
        }));
      }
      return {
        appendComments: [{ author: "ME", body: "mine" }],
        docMeta: { touch: true, updatedBy: "CODER", version: 3 },
      };
    });

    expect(result.changed).toBe(true);
    expect(result.task.comments).toEqual([
      { author: "OTHER", body: "external" },
      { author: "ME", body: "mine" },
    ]);
  });
});
