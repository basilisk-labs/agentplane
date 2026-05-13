import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import type { TaskSummary } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import {
  cleanObsidianTaskProjection,
  cmdTaskObsidian,
  cmdTaskObsidianClean,
  renderObsidianTaskProjection,
  writeObsidianTaskProjection,
} from "./obsidian.js";

const tempRoots: string[] = [];

afterEach(async () => {
  await Promise.all(tempRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

async function mkRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-obsidian-"));
  tempRoots.push(root);
  return root;
}

function task(input: Partial<TaskSummary> & Pick<TaskSummary, "id">): TaskSummary {
  return {
    id: input.id,
    title: input.title ?? input.id,
    description: input.description ?? "",
    status: input.status ?? "TODO",
    priority: input.priority ?? "med",
    owner: input.owner ?? "CODER",
    depends_on: input.depends_on ?? [],
    tags: input.tags ?? [],
    verify: input.verify ?? [],
    comments: input.comments ?? [],
  };
}

function mkCtx(
  root: string,
  tasks: TaskSummary[],
): {
  ctx: CommandContext;
  listProjectionTasks: ReturnType<typeof vi.fn<() => Promise<TaskSummary[]>>>;
} {
  const listProjectionTasks = vi.fn(() => Promise.resolve(tasks));
  return {
    ctx: {
      resolvedProject: { gitRoot: root } as CommandContext["resolvedProject"],
      config: {
        paths: { workflow_dir: ".agentplane/tasks", tasks_path: ".agentplane/tasks.json" },
      } as CommandContext["config"],
      taskBackend: {
        id: "mock",
        capabilities: {
          canonical_source: "local",
          projection: "canonical",
          projection_read_mode: "native",
          reads_from_projection_by_default: true,
          supports_task_revisions: true,
          supports_revision_guarded_writes: true,
          may_access_network_on_read: false,
          may_access_network_on_write: false,
          supports_projection_refresh: false,
          supports_push_sync: false,
          supports_snapshot_export: true,
        },
        listTasks: vi.fn(),
        listProjectionTasks,
        getTask: vi.fn(),
        writeTask: vi.fn(),
        getLastListWarnings: vi.fn(() => []),
      } as unknown as CommandContext["taskBackend"],
      backendId: "mock",
      backendConfigPath: path.join(root, ".agentplane", "backends", "mock", "backend.json"),
      git: {} as CommandContext["git"],
      memo: {},
    },
    listProjectionTasks,
  };
}

describe("Obsidian task projection", () => {
  it("renders deterministic task, status, tag, owner, and dependency links", () => {
    const result = renderObsidianTaskProjection([
      task({
        id: "202605050001-BBBBBB",
        title: "Second",
        status: "DONE",
        owner: "DOCS",
        tags: ["docs"],
        depends_on: ["202605050001-AAAAAA"],
      }),
      task({
        id: "202605050001-AAAAAA",
        title: "First | task",
        status: "TODO",
        owner: "CODER",
        tags: ["code", "docs"],
      }),
    ]);

    const taskList = result.files.find((file) => file.path === "tasks.md")?.content ?? "";
    expect(taskList).toContain("[202605050001-AAAAAA](../../tasks/202605050001-AAAAAA/README.md)");
    expect(taskList).toContain(String.raw`First \| task`);
    expect(taskList).toContain("[202605050001-AAAAAA](../../tasks/202605050001-AAAAAA/README.md)");

    const docsTag = result.files.find((file) => file.path === "by-tag/docs.md")?.content ?? "";
    expect(docsTag).toContain("[Index](../index.md)");
    expect(docsTag).toContain(
      "[202605050001-BBBBBB](../../../tasks/202605050001-BBBBBB/README.md)",
    );
    expect(docsTag).toContain(
      "[202605050001-AAAAAA](../../../tasks/202605050001-AAAAAA/README.md)",
    );

    expect(result.files.map((file) => file.path)).toEqual([
      "index.md",
      "tasks.md",
      "by-status/todo.md",
      "by-status/done.md",
      "by-tag/code.md",
      "by-tag/docs.md",
      "by-owner/coder.md",
      "by-owner/docs.md",
    ]);
  });

  it("writes the projection under .agentplane/generated and removes stale group pages", async () => {
    const root = await mkRoot();
    await writeObsidianTaskProjection({
      root,
      tasks: [task({ id: "202605050001-AAAAAA", tags: ["code"] })],
    });
    await mkdir(path.join(root, ".agentplane", "generated", "obsidian", "by-tag"), {
      recursive: true,
    });
    await writeFile(
      path.join(root, ".agentplane", "generated", "obsidian", "by-tag", "manual.md"),
      "# Manual\n",
      "utf8",
    );
    await writeObsidianTaskProjection({
      root,
      tasks: [task({ id: "202605050001-BBBBBB", tags: ["docs"] })],
    });

    await expect(
      readFile(
        path.join(root, ".agentplane", "generated", "obsidian", "by-tag", "code.md"),
        "utf8",
      ),
    ).rejects.toThrow();
    const manual = await readFile(
      path.join(root, ".agentplane", "generated", "obsidian", "by-tag", "manual.md"),
      "utf8",
    );
    expect(manual).toBe("# Manual\n");
    const docs = await readFile(
      path.join(root, ".agentplane", "generated", "obsidian", "by-tag", "docs.md"),
      "utf8",
    );
    expect(docs).toContain("[202605050001-BBBBBB](../../../tasks/202605050001-BBBBBB/README.md)");
  });

  it("cleans generated projection files without removing canonical or manual files", async () => {
    const root = await mkRoot();
    await writeObsidianTaskProjection({
      root,
      tasks: [task({ id: "202605050001-AAAAAA", tags: ["code"] })],
    });
    await mkdir(path.join(root, ".agentplane", "tasks", "202605050001-AAAAAA"), {
      recursive: true,
    });
    await writeFile(
      path.join(root, ".agentplane", "tasks", "202605050001-AAAAAA", "README.md"),
      "# Canonical\n",
      "utf8",
    );
    await writeFile(
      path.join(root, ".agentplane", "generated", "obsidian", "by-tag", "manual.md"),
      "# Manual\n",
      "utf8",
    );

    const result = await cleanObsidianTaskProjection({ root });

    expect(result.deleted).toEqual(
      expect.arrayContaining([
        ".agentplane/generated/obsidian/index.md",
        ".agentplane/generated/obsidian/tasks.md",
        ".agentplane/generated/obsidian/by-tag/code.md",
      ]),
    );
    expect(result.deleted).not.toContain(".agentplane/tasks/202605050001-AAAAAA/README.md");
    await expect(
      readFile(path.join(root, ".agentplane", "generated", "obsidian", "index.md"), "utf8"),
    ).rejects.toThrow();
    const canonical = await readFile(
      path.join(root, ".agentplane", "tasks", "202605050001-AAAAAA", "README.md"),
      "utf8",
    );
    expect(canonical).toBe("# Canonical\n");
    const manual = await readFile(
      path.join(root, ".agentplane", "generated", "obsidian", "by-tag", "manual.md"),
      "utf8",
    );
    expect(manual).toBe("# Manual\n");
  });

  it("does not delete top-level files that are not generated by task obsidian", async () => {
    const root = await mkRoot();
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "index.md"), "# Manual index\n", "utf8");

    const result = await cleanObsidianTaskProjection({ root });

    expect(result).toEqual({
      deleted: [],
      preserved: [".agentplane/index.md"],
    });
    const index = await readFile(path.join(root, ".agentplane", "index.md"), "utf8");
    expect(index).toBe("# Manual index\n");
  });

  it("command reads the backend projection once and prints output summary", async () => {
    const root = await mkRoot();
    const { ctx, listProjectionTasks } = mkCtx(root, [
      task({ id: "202605050001-AAAAAA", owner: "CODER", tags: ["code"] }),
    ]);
    const stdout = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    try {
      const code = await cmdTaskObsidian({ ctx, cwd: root });
      expect(code).toBe(0);
      expect(listProjectionTasks).toHaveBeenCalledTimes(1);
      expect(stdout).toHaveBeenCalledWith(
        ".agentplane/generated/obsidian/index.md\n.agentplane/generated/obsidian/tasks.md\nfiles=5 tasks=1\n",
      );
    } finally {
      stdout.mockRestore();
    }

    const index = await readFile(
      path.join(root, ".agentplane", "generated", "obsidian", "index.md"),
      "utf8",
    );
    expect(index).toContain(
      "Task README files under `.agentplane/tasks/<task-id>/README.md` remain canonical.",
    );
  });

  it("clean command prints a deletion summary", async () => {
    const root = await mkRoot();
    await writeObsidianTaskProjection({
      root,
      tasks: [task({ id: "202605050001-AAAAAA", owner: "CODER", tags: ["code"] })],
    });
    const { ctx } = mkCtx(root, []);
    const stdout = vi.spyOn(process.stdout, "write").mockImplementation(() => true);

    try {
      const code = await cmdTaskObsidianClean({ ctx, cwd: root });
      expect(code).toBe(0);
      expect(stdout).toHaveBeenCalledWith("deleted=8 preserved=0\n");
    } finally {
      stdout.mockRestore();
    }
  });
});
