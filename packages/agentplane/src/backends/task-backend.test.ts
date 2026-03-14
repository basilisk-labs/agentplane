import { readFile, rm } from "node:fs/promises";
import path from "node:path";

import { type TaskRecord } from "@agentplaneorg/core";
import { describe, expect, it } from "vitest";

import {
  buildTasksExportSnapshotFromTasks,
  extractTaskDoc,
  mergeTaskDoc,
  taskRecordToData,
  writeTasksExportFromTasks,
  type TaskData,
} from "./task-backend.js";
import { installTaskBackendTestHarness, makeTempDir } from "./task-backend.test-helpers.js";

installTaskBackendTestHarness();

describe("task-backend helpers", () => {
  it("extractTaskDoc returns the doc section and excludes auto summary", () => {
    const body = [
      "# Title",
      "",
      "## Summary",
      "",
      "Doc line 1",
      "Doc line 2",
      "",
      "## Changes Summary (auto)",
      "- item",
    ].join("\n");
    expect(extractTaskDoc(body)).toBe("## Summary\n\nDoc line 1\nDoc line 2");
  });

  it("extractTaskDoc returns empty when summary is missing", () => {
    expect(extractTaskDoc("No summary here")).toBe("");
  });

  it("extractTaskDoc returns empty for empty body", () => {
    expect(extractTaskDoc("")).toBe("");
  });

  it("extractTaskDoc returns summary when auto summary is absent", () => {
    const body = ["# Header", "", "## Summary", "", "Doc line"].join("\n");
    expect(extractTaskDoc(body)).toBe("## Summary\n\nDoc line");
  });

  it("extractTaskDoc dedupes repeated section blocks", () => {
    const body = [
      "## Summary",
      "",
      "## Scope",
      "",
      "## Risks",
      "",
      "## Summary",
      "",
      "Doc line",
    ].join("\n");
    const doc = extractTaskDoc(body);
    expect((doc.match(/^## Summary$/gm) ?? []).length).toBe(1);
    expect(doc).toContain("Doc line");
  });

  it("extractTaskDoc normalizes concatenated summary heading", () => {
    const body = [
      "# Title",
      "",
      "## Summary## Summary",
      "",
      "Doc line",
      "",
      "## Changes Summary (auto)",
      "- item",
    ].join("\n");
    expect(extractTaskDoc(body)).toBe("## Summary\n\nDoc line");
  });

  it("mergeTaskDoc keeps prefix and auto summary blocks", () => {
    const body = [
      "# Header",
      "",
      "## Summary",
      "Old doc",
      "",
      "## Changes Summary (auto)",
      "- auto",
    ].join("\n");
    const merged = mergeTaskDoc(body, "## Summary\n\nNew doc");
    expect(merged).toContain("# Header");
    expect(merged).toContain("## Summary\n\nNew doc");
    expect(merged).toContain("## Changes Summary (auto)");
  });

  it("mergeTaskDoc returns original body when doc is empty", () => {
    const body = "## Summary\n\nBody\n";
    expect(mergeTaskDoc(body, "")).toBe(body);
  });

  it("mergeTaskDoc treats null doc as empty", () => {
    const body = "## Summary\n\nBody\n";
    expect(mergeTaskDoc(body, null as unknown as string)).toBe(body);
  });

  it("mergeTaskDoc replaces concatenated summary heading", () => {
    const body = [
      "## Summary## Summary",
      "Old doc",
      "",
      "## Changes Summary (auto)",
      "- auto",
    ].join("\n");
    const merged = mergeTaskDoc(body, "## Summary\n\nNew doc");
    expect(merged).not.toContain("## Summary## Summary");
    expect(merged).toContain("## Summary\n\nNew doc");
    expect(merged).toContain("## Changes Summary (auto)");
  });

  it("mergeTaskDoc inserts doc when no prefix or auto summary exists", () => {
    const body = ["## Summary", "", "Old doc"].join("\n");
    const merged = mergeTaskDoc(body, "## Summary\n\nNew doc");
    expect(merged).toBe("## Summary\n\nNew doc\n");
  });

  it("taskRecordToData tolerates missing or invalid frontmatter fields", () => {
    const record = {
      id: "202601300000-ABCD",
      frontmatter: {
        id: 123,
        title: 456,
        description: 789,
        status: 42,
        priority: {},
        owner: 77,
        depends_on: "nope",
        tags: 99,
        verify: null,
        commit: { hash: "abc", message: 123 },
        comments: "bad",
      },
      body: "No summary here",
    } as unknown as TaskRecord;
    const data = taskRecordToData(record);
    expect(data.commit).toBeNull();
    expect(data.comments).toEqual([]);
    expect(data.doc).toBeUndefined();
    expect(data.title).toBe("");
    expect(data.description).toBe("");
    expect(data.owner).toBe("");
    expect(data.priority).toBe("");
  });

  it("taskRecordToData treats depends_on ['[]'] as empty", () => {
    const record = {
      id: "202601300000-ABCD",
      frontmatter: {
        id: "202601300000-ABCD",
        title: "Task",
        description: "Desc",
        status: "TODO",
        priority: "med",
        owner: "tester",
        depends_on: ["[]"],
        tags: [],
        verify: [],
      },
      body: "## Summary\n\nDoc text\n",
    } as unknown as TaskRecord;
    const data = taskRecordToData(record);
    expect(data.depends_on).toEqual([]);
  });

  it("buildTasksExportSnapshotFromTasks normalizes task fields", () => {
    const snapshot = buildTasksExportSnapshotFromTasks([
      {
        id: "202601300000-ABCD",
        title: "Title",
        description: "Desc",
        status: "TODO",
        priority: 2,
        owner: "CODER",
        depends_on: "nope" as unknown as string[],
        tags: ["ok", 1 as unknown as string],
        verify: null as unknown as string[],
        comments: [
          { author: "a", body: "b" },
          { author: 1 as unknown as string, body: "c" },
        ],
      },
    ]);

    const task = snapshot.tasks[0];
    if (!task) throw new Error("missing task");
    expect(task.priority).toBe("2");
    expect(task.depends_on).toEqual([]);
    expect(task.tags).toEqual(["ok"]);
    expect(task.verify).toEqual([]);
    expect(task.comments).toEqual([{ author: "a", body: "b" }]);
    expect(task.doc_version).toBe(3);
    expect(task.doc_updated_by).toBe("a");
    expect(task.dirty).toBe(false);
    expect(task.id_source).toBe("generated");
  });
  it("taskRecordToData parses doc, comments, commit, and dirty", () => {
    const record = {
      id: "202601300000-ABCD",
      frontmatter: {
        id: "202601300000-ABCD",
        title: "Task",
        description: "Desc",
        status: "TODO",
        priority: "med",
        owner: "tester",
        depends_on: [],
        tags: ["a"],
        verify: ["echo ok"],
        commit: { hash: "abc", message: "msg" },
        comments: [{ author: "me", body: "note" }],
        dirty: true,
      },
      body: "## Summary\n\nDoc text\n",
    } as unknown as TaskRecord;
    const data = taskRecordToData(record);
    expect(data.doc).toBe("## Summary\n\nDoc text");
    expect(data.commit).toEqual({ hash: "abc", message: "msg" });
    expect(data.comments).toEqual([{ author: "me", body: "note" }]);
    expect(data.dirty).toBe(true);
  });

  it("taskRecordToData prefers canonical frontmatter sections over README body", () => {
    const record = {
      id: "202601300000-CANON",
      frontmatter: {
        id: "202601300000-CANON",
        title: "Task",
        description: "Desc",
        status: "TODO",
        priority: "med",
        owner: "tester",
        revision: 1,
        sections: {
          Summary: "Canonical summary",
          Plan: "Canonical plan",
        },
      },
      body: "## Summary\n\nLegacy summary\n",
    } as unknown as TaskRecord;

    const data = taskRecordToData(record);
    expect(data.revision).toBe(1);
    expect(data.doc).toBe("## Summary\n\nCanonical summary\n\n## Plan\n\nCanonical plan");
    expect(data.sections).toEqual({
      Summary: "Canonical summary",
      Plan: "Canonical plan",
    });
  });

  it("taskRecordToData derives canonical sections from legacy README body", () => {
    const record = {
      id: "202601300000-LEGACY",
      frontmatter: {
        id: "202601300000-LEGACY",
        title: "Task",
        description: "Desc",
        status: "TODO",
        priority: "med",
        owner: "tester",
      },
      body: ["## Summary", "", "Legacy summary", "", "## Findings", "", "Legacy finding"].join(
        "\n",
      ),
    } as unknown as TaskRecord;

    const data = taskRecordToData(record);
    expect(data.revision).toBe(1);
    expect(data.sections).toEqual({
      Summary: "Legacy summary",
      Findings: "Legacy finding",
    });
  });

  it("taskRecordToData defaults missing or invalid fields", () => {
    const record = {
      id: 123,
      frontmatter: {
        id: 456,
        title: 1,
        description: null,
        status: 9,
        priority: {},
        owner: false,
        depends_on: "nope",
        tags: 5,
        verify: null,
        commit: { hash: 1, message: true },
        comments: [{ author: "ok", body: 2 }],
        doc_version: "2",
        doc_updated_at: 123,
        doc_updated_by: 456,
        dirty: "yes",
        id_source: 9,
      },
      body: "",
    } as unknown as TaskRecord;
    const data = taskRecordToData(record);
    expect(data.id).toBe("");
    expect(data.status).toBe("TODO");
    expect(data.priority).toBe("");
    expect(data.commit).toBeNull();
    expect(data.comments).toEqual([]);
  });

  it("taskRecordToData falls back to record.id when frontmatter id is missing", () => {
    const record = {
      id: "202601300000-ABCD",
      frontmatter: {
        id: 123,
        title: "Task",
        description: "Desc",
        status: "TODO",
        priority: "med",
        owner: "tester",
      },
      body: "",
    } as unknown as TaskRecord;
    const data = taskRecordToData(record);
    expect(data.id).toBe("202601300000-ABCD");
  });

  it("buildTasksExportSnapshotFromTasks produces checksum and stable order", () => {
    const tasks: TaskData[] = [
      {
        id: "202601300000-BCDE",
        title: "B",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "o",
        depends_on: [],
        tags: [],
        verify: [],
      },
      {
        id: "202601300000-ABCD",
        title: "A",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "o",
        depends_on: [],
        tags: [],
        verify: [],
      },
    ];
    const snapshot = buildTasksExportSnapshotFromTasks(tasks);
    expect(snapshot.tasks[0]?.id).toBe("202601300000-ABCD");
    expect(snapshot.meta.checksum).toHaveLength(64);
  });

  it("writeTasksExportFromTasks writes a stable snapshot", async () => {
    const outDir = await makeTempDir();
    const outPath = path.join(outDir, "tasks.json");
    await writeTasksExportFromTasks({
      outputPath: outPath,
      tasks: [
        {
          id: "202601300000-ABCD",
          title: "Task",
          description: "",
          status: "TODO",
          priority: "med",
          owner: "o",
          depends_on: [],
          tags: [],
          verify: [],
        },
      ],
    });
    const raw = JSON.parse(await readFile(outPath, "utf8")) as {
      tasks: TaskData[];
      meta: { checksum: string };
    };
    expect(raw.tasks).toHaveLength(1);
    expect(raw.meta.checksum).toHaveLength(64);
    await rm(outDir, { recursive: true, force: true });
  });
});
