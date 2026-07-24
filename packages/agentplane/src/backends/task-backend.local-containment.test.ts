import { mkdir, readFile, rm, symlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { renderTaskReadme } from "@agentplaneorg/core/tasks";
import { mkTempDir } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { LocalBackend } from "./task-backend.js";

describe("LocalBackend containment", () => {
  it("does not follow task README symlinks while normalizing", async () => {
    const root = await mkTempDir();
    const outside = await mkTempDir();
    const backend = new LocalBackend({ dir: root, updatedBy: "tester" });
    const taskId = "202601300012-ABCD";
    const taskDirectory = path.join(root, taskId);
    const outsideReadme = path.join(outside, "README.md");
    const outsideText = renderTaskReadme(
      {
        id: taskId,
        title: "Outside",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "tester",
        depends_on: [],
        tags: [],
        verify: [],
        doc_version: 3,
        doc_updated_at: "2026-01-30T00:00:00Z",
        doc_updated_by: "tester",
      },
      "",
    );
    await mkdir(taskDirectory, { recursive: true });
    await writeFile(outsideReadme, outsideText, "utf8");
    await symlink(outsideReadme, path.join(taskDirectory, "README.md"));

    try {
      await expect(backend.normalizeTasks()).resolves.toEqual({ scanned: 0, changed: 0 });
      await expect(readFile(outsideReadme, "utf8")).resolves.toBe(outsideText);
    } finally {
      await rm(root, { recursive: true, force: true });
      await rm(outside, { recursive: true, force: true });
    }
  });
});
