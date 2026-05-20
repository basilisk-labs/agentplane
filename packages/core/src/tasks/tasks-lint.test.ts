import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  computeTasksChecksum,
  createTask,
  defaultConfig,
  buildTasksExportSnapshot,
  lintTasksFile,
  lintTasksSnapshot,
  lintTaskVerifyStepsSection,
  saveConfig,
  type TasksExportSnapshot,
} from "../index.js";

async function mkGitRepoRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-tasks-lint-test-"));
  await mkdir(path.join(root, ".git"), { recursive: true });
  const agentplaneDir = path.join(root, ".agentplane");
  await mkdir(agentplaneDir, { recursive: true });
  await saveConfig(agentplaneDir, defaultConfig());
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

    const snapshot = await buildTasksExportSnapshot({ cwd: root, rootOverride: root });
    await writeFile(
      path.join(root, ".agentplane", "tasks.json"),
      `${JSON.stringify(snapshot, null, 2)}\n`,
      "utf8",
    );
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

    const outPath = path.join(root, ".agentplane", "tasks.json");
    const snapshot = await buildTasksExportSnapshot({ cwd: root, rootOverride: root });
    await writeFile(outPath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
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

    const outPath = path.join(root, ".agentplane", "tasks.json");
    const snapshot = await buildTasksExportSnapshot({ cwd: root, rootOverride: root });
    await writeFile(outPath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");

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
    expect(joined).toContain("depends_on cycle detected");
    expect(joined).toContain("owner must be non-empty");
  });

  it("accepts legacy UTC offsets and no-op DONE records without commits", () => {
    const config = defaultConfig();
    const task = {
      id: "202603140729-ZN5YSS",
      title: "Bookkeeping duplicate",
      status: "DONE",
      priority: "med",
      owner: "CODER",
      depends_on: [],
      tags: ["code"],
      verify: [],
      plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null },
      verification: {
        state: "pending",
        attempts: 0,
        updated_at: null,
        updated_by: null,
        note: null,
      },
      commit: null,
      comments: [
        {
          author: "ORCHESTRATOR",
          body: "Verified: closed as duplicate; no implementation changes are expected.",
        },
      ],
      result_summary: "Closed as duplicate of another task.",
      doc_version: 3,
      doc_updated_at: "2026-01-11T08:06:07+00:00",
      doc_updated_by: "agentctl",
      description: "Historical duplicate task",
      dirty: false,
      id_source: "custom",
    };
    const snapshot = {
      tasks: [task],
      meta: {
        schema_version: 1,
        managed_by: "agentplane",
        checksum_algo: "sha256",
        checksum: computeTasksChecksum([task]),
      },
    };

    const result = lintTasksSnapshot(snapshot as never, config);

    expect(result.errors).toEqual([]);
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
      doc_version: 3,
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
    expect(joined).toContain("A: doc_version must be 3");
    expect(joined).toContain("A: doc_updated_at must be ISO date-time");
    expect(joined).toContain("A: doc_updated_by must be non-empty");
    expect(joined).toContain("A: description must be string");
    expect(joined).toContain("A: dirty must be boolean");
    expect(joined).toContain("A: id_source must be non-empty");
    expect(joined).toContain("A: comments must be {author,body}[]");
    expect(joined).toContain("B: verify must be a string[]");
    expect(joined).toContain("duplicate task id: B");
    expect(joined).toContain("A: depends_on references missing task: MISSING");
  });

  it("lintTaskVerifyStepsSection rejects executed output and empty Run commands", () => {
    const errors = lintTaskVerifyStepsSection({
      taskId: "202605201001-3TVWFX",
      text: [
        "1. Run",
        " RUN  v4.1.6 /repo",
        " Test Files  2 passed (2)",
        '3. Run {"schemaVersion":1,"ready":false}; expected: ready=false',
      ].join("\n"),
    });

    const joined = errors.join("\n");
    expect(joined).toContain("empty Run command");
    expect(joined).toContain("contains test output");
    expect(joined).toContain("appears to contain execution output");
  });
});
