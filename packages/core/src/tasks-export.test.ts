import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  computeTasksChecksum,
  createTask,
  type TasksExportTask,
  writeTasksExport,
} from "./index.js";

async function mkGitRepoRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-tasks-export-test-"));
  await mkdir(path.join(root, ".git"), { recursive: true });
  return root;
}

describe("tasks-export", () => {
  it("computeTasksChecksum matches the spec example (python canonicalization parity)", async () => {
    const raw = await readFile(
      path.join(process.cwd(), "packages", "spec", "examples", "tasks.json"),
      "utf8",
    );
    const parsed = JSON.parse(raw) as { tasks: TasksExportTask[] };

    const checksum = computeTasksChecksum(parsed.tasks);
    expect(checksum).toBe("6e37f07cf2b1a6b2295946722fa1a29362a28c564d0bc2ba48f48d324f9d6670");
  });

  it("validates the agentctl tasks.json fixture checksum", async () => {
    const raw = await readFile(
      path.join(process.cwd(), "packages", "core", "testdata", "agentctl", "tasks.json"),
      "utf8",
    );
    const parsed = JSON.parse(raw) as {
      tasks: TasksExportTask[];
      meta: { checksum: string; managed_by: string };
    };

    expect(parsed.meta.managed_by).toBe("agentctl");
    const checksum = computeTasksChecksum(parsed.tasks);
    expect(checksum).toBe(parsed.meta.checksum);
  });

  it("writeTasksExport writes .agentplane/tasks.json with matching checksum", async () => {
    const root = await mkGitRepoRoot();

    const created = await createTask({
      cwd: root,
      rootOverride: root,
      title: "My task",
      description: "Why it matters",
      owner: "CODER",
      priority: "med",
      tags: ["nodejs"],
      dependsOn: ["202601010101-ABCDE"],
      verify: ["bun run ci"],
    });

    const before = await readFile(created.readmePath, "utf8");
    const withComment = before.replace(
      "comments: []",
      'comments:\n  - { author: "owner", body: "Context about the task." }',
    );
    await writeFile(created.readmePath, withComment, "utf8");

    const malformedId = "MALFORMED";
    const malformedReadme = path.join(root, ".agentplane", "tasks", malformedId, "README.md");
    await mkdir(path.dirname(malformedReadme), { recursive: true });
    await writeFile(
      malformedReadme,
      [
        "---",
        "id: 123",
        "title: 456",
        "status: TODO",
        "priority: med",
        "owner: CODER",
        'depends_on: "nope"',
        'tags: "nope"',
        'verify: "nope"',
        'commit: { hash: "abc1234", message: "done" }',
        "comments:",
        '  - { author: "owner", body: "ok" }',
        '  - "bad"',
        "doc_version: 2",
        "doc_updated_at: 123",
        "doc_updated_by: 456",
        "description: 789",
        "---",
        "## Summary",
        "",
      ].join("\n"),
      "utf8",
    );

    const { path: outPath, snapshot } = await writeTasksExport({ cwd: root, rootOverride: root });
    expect(outPath).toBe(path.join(root, ".agentplane", "tasks.json"));
    expect(snapshot.meta.checksum).toBe(computeTasksChecksum(snapshot.tasks));

    const text = await readFile(outPath, "utf8");
    const loaded = JSON.parse(text) as typeof snapshot;
    expect(loaded.meta.checksum).toBe(snapshot.meta.checksum);
    expect(Array.isArray(loaded.tasks)).toBe(true);

    const malformed = snapshot.tasks.find((t) => t.id === malformedId);
    expect(malformed?.commit).toEqual({ hash: "abc1234", message: "done" });
    expect(malformed?.comments).toEqual([{ author: "owner", body: "ok" }]);
  });

  it("buildTasksExportSnapshot drops invalid commit and comments", async () => {
    const root = await mkGitRepoRoot();

    const taskId = "202601010101-ABCDE";
    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    await mkdir(path.dirname(readmePath), { recursive: true });
    await writeFile(
      readmePath,
      [
        "---",
        `id: "${taskId}"`,
        "title: 123",
        "status: TODO",
        "priority: med",
        "owner: CODER",
        "depends_on: []",
        'tags: ["ok", 1]',
        'verify: ["run", 2]',
        'commit: { hash: "", message: "" }',
        "comments: nope",
        "doc_version: 2",
        `doc_updated_at: "${new Date().toISOString()}"`,
        "doc_updated_by: tester",
        "description: 999",
        "---",
        "## Summary",
      ].join("\n"),
      "utf8",
    );

    const { snapshot } = await writeTasksExport({ cwd: root, rootOverride: root });
    const exported = snapshot.tasks.find((t) => t.id === taskId);
    expect(exported?.commit).toBeNull();
    expect(exported?.comments).toEqual([]);
    expect(exported?.tags).toEqual(["ok"]);
    expect(exported?.verify).toEqual(["run"]);
    expect(exported?.title).toBe("");
    expect(exported?.description).toBe("");
  });
});
