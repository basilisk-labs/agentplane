import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  computeTasksChecksum,
  createTask,
  defaultConfig,
  lintTasksFile,
  lintTasksSnapshot,
  writeTasksExport,
  type TasksExportSnapshot,
} from "../index.js";

async function mkGitRepoRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-tasks-lint-test-"));
  await mkdir(path.join(root, ".git"), { recursive: true });
  return root;
}

describe("tasks-lint", () => {
  it("lintTasksSnapshot rejects invalid shape", () => {
    const result = lintTasksSnapshot({} as unknown as TasksExportSnapshot, defaultConfig());
    expect(result.errors).toEqual(["tasks.json must have { tasks: [], meta: {} }"]);
  });

  it("lintTasksFile passes on an exported snapshot", async () => {
    const root = await mkGitRepoRoot();

    await createTask({
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

    await writeTasksExport({ cwd: root, rootOverride: root });
    const result = await lintTasksFile({ cwd: root, rootOverride: root });
    expect(result.errors).toEqual([]);
  });

  it("lintTasksFile detects checksum mismatch", async () => {
    const root = await mkGitRepoRoot();

    await createTask({
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

    const { path: outPath } = await writeTasksExport({ cwd: root, rootOverride: root });
    const text = await readFile(outPath, "utf8");
    const parsed = JSON.parse(text) as { tasks: unknown[]; meta: { checksum: string } };
    parsed.meta.checksum = "bad";
    await writeFile(outPath, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");

    const result = await lintTasksFile({ cwd: root, rootOverride: root });
    expect(result.errors.join("\n")).toContain("meta.checksum does not match");
  });

  it("lintTasksFile reports structural invariants (DONE commit, verify-required tags, cycles)", async () => {
    const root = await mkGitRepoRoot();

    await createTask({
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

    const { path: outPath, snapshot } = await writeTasksExport({ cwd: root, rootOverride: root });

    const a = snapshot.tasks[0];
    if (!a) throw new Error("expected task");

    const b = { ...a, id: "B", depends_on: [a.id], tags: ["code"], verify: [], status: "TODO" };
    a.depends_on = ["B"];
    a.status = "DONE";
    a.commit = null;
    a.owner = "";

    const tasks = [a, b];
    const checksum = computeTasksChecksum(tasks);

    const mutated = { ...snapshot, tasks, meta: { ...snapshot.meta, checksum } };
    await writeFile(outPath, `${JSON.stringify(mutated, null, 2)}\n`, "utf8");

    const result = await lintTasksFile({ cwd: root, rootOverride: root });
    const joined = result.errors.join("\n");
    expect(joined).toContain("DONE tasks must have commit");
    expect(joined).toContain("verify is required");
    expect(joined).toContain("depends_on cycle detected");
    expect(joined).toContain("owner must be non-empty");
  });

  it("lintTasksSnapshot reports meta and task validation errors", () => {
    const config = defaultConfig();
    const now = new Date().toISOString();

    const taskA = {
      id: "A",
      title: "",
      status: "NOPE",
      priority: "ultra",
      owner: "",
      depends_on: ["MISSING"],
      tags: ["code"],
      verify: [],
      commit: null,
      comments: [{ author: "", body: "x" }],
      doc_version: 1,
      doc_updated_at: "nope",
      doc_updated_by: "",
      description: 1,
      dirty: "no",
      id_source: "",
    };

    const taskB = {
      id: "B",
      title: "B",
      status: "TODO",
      priority: "med",
      owner: "OWNER",
      depends_on: [],
      tags: ["nodejs"],
      verify: [""],
      commit: null,
      comments: [],
      doc_version: 2,
      doc_updated_at: now,
      doc_updated_by: "DOCS",
      description: "ok",
      dirty: false,
      id_source: "manual",
    };

    const snapshot = {
      tasks: [taskA, taskB, { ...taskB }],
      meta: { schema_version: 2, managed_by: "", checksum_algo: "md5", checksum: "bad" },
    };

    const result = lintTasksSnapshot(snapshot as never, config);
    const joined = result.errors.join("\n");

    expect(joined).toContain("meta.schema_version must be 1");
    expect(joined).toContain("meta.managed_by must be non-empty");
    expect(joined).toContain("meta.checksum_algo must be 'sha256'");
    expect(joined).toContain("meta.checksum does not match");
    expect(joined).toContain("A: title must be non-empty");
    expect(joined).toContain("A: status must be TODO|DOING|DONE|BLOCKED");
    expect(joined).toContain("A: priority must be low|normal|med|high");
    expect(joined).toContain("A: owner must be non-empty");
    expect(joined).toContain("A: doc_version must be 2");
    expect(joined).toContain("A: doc_updated_at must be ISO date-time");
    expect(joined).toContain("A: doc_updated_by must be non-empty");
    expect(joined).toContain("A: description must be string");
    expect(joined).toContain("A: dirty must be boolean");
    expect(joined).toContain("A: id_source must be non-empty");
    expect(joined).toContain("A: comments must be {author,body}[]");
    expect(joined).toContain("A: verify is required for tags");
    expect(joined).toContain("B: verify must be a string[]");
    expect(joined).toContain("duplicate task id: B");
    expect(joined).toContain("A: depends_on references missing task: MISSING");
  });
});
