import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { toTaskSummary, type TaskData } from "./task-backend.js";
import { buildTaskIndexEntry, loadTaskIndex } from "./task-index.js";

describe("task index", () => {
  it("stores the exact TaskSummary projection required by read-heavy queries", () => {
    const task: TaskData = {
      id: "202601300012-ABCD",
      title: "Projection cache",
      description: "Desc",
      status: "TODO",
      priority: "med",
      owner: "tester",
      depends_on: ["202601300001-ABCD"],
      tags: ["backend", "refactor"],
      verify: ["bun test"],
      comments: [{ author: "DOCS", body: "keep comment searchability" }],
      events: [
        {
          type: "status",
          at: "2026-01-30T00:00:00.000Z",
          author: "DOCS",
          from: "TODO",
          to: "DOING",
        },
      ],
      doc: "## Summary\n\nBody",
      result_summary: "pending",
      risk_level: "med",
      breaking: false,
    };

    const entry = buildTaskIndexEntry(
      task,
      "/repo/.agentplane/tasks/202601300012-ABCD/README.md",
      123,
    );

    expect(entry.task).toEqual(toTaskSummary(task));
  });

  it("invalidates v2 cache entries that predate comments projection coverage", async () => {
    const tempDir = await mkdtemp(path.join(tmpdir(), "agentplane-task-index-"));
    const indexPath = path.join(tempDir, "tasks-index.v2.json");

    try {
      await writeFile(
        indexPath,
        JSON.stringify({
          schema_version: 2,
          byId: {
            "202601300013-ABCD": {
              task: {
                id: "202601300013-ABCD",
                title: "Legacy projection",
                description: "Desc",
                status: "TODO",
                owner: "tester",
                priority: "med",
                depends_on: [],
                tags: [],
                verify: [],
              },
              readmePath: "/repo/.agentplane/tasks/202601300013-ABCD/README.md",
              mtimeMs: 123,
            },
          },
          byPath: {
            "/repo/.agentplane/tasks/202601300013-ABCD/README.md": "202601300013-ABCD",
          },
        }),
        "utf8",
      );

      await expect(loadTaskIndex(indexPath)).resolves.toBeNull();
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  });
});
