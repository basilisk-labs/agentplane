import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { mkTempDir, silenceStdIO } from "@agentplane/testkit";

import { LocalBackend } from "./task-backend.js";
import { putEvaluatorEvidenceObject } from "../commands/evaluator/evaluator-evidence-store.js";

describe("LocalBackend handoff artifacts", () => {
  let tempDir = "";
  let restoreStdIO: (() => void) | null = null;

  beforeEach(async () => {
    restoreStdIO = silenceStdIO();
    tempDir = await mkTempDir();
  });

  afterEach(async () => {
    restoreStdIO?.();
    restoreStdIO = null;
    if (tempDir) {
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  it("ignores handoff-only and empty task directories when listing tasks", async () => {
    const backend = new LocalBackend({ dir: tempDir });

    await mkdir(path.join(tempDir, "202601300000-HANDOF", "handoff"), { recursive: true });
    await writeFile(
      path.join(tempDir, "202601300000-HANDOF", "handoff", "latest.json"),
      "{}",
      "utf8",
    );
    await mkdir(path.join(tempDir, "202601300000-EMPTY"), { recursive: true });
    await mkdir(path.join(tempDir, "NO_README"), { recursive: true });
    await writeFile(path.join(tempDir, "NO_README", "artifact.txt"), "not a task readme", "utf8");

    await backend.writeTask({
      id: "202601300000-ABCD",
      title: "Valid",
      description: "",
      status: "TODO",
      priority: "med",
      owner: "tester",
      depends_on: [],
      tags: [],
      verify: [],
    });

    const tasks = await backend.listTasks();
    const warnings = backend.getLastListWarnings();

    expect(tasks.map((task) => task.id)).toEqual(["202601300000-ABCD"]);
    expect(warnings).toContain("skip:NO_README: missing_or_unreadable_readme");
    expect(warnings).not.toContain("skip:202601300000-EMPTY: missing_or_unreadable_readme");
    expect(warnings).not.toContain("skip:202601300000-HANDOF: missing_or_unreadable_readme");
  });

  it.each(["empty", "nonempty", "symlink", "file", "unknown_sibling", "readme"])(
    "handles native schema staging without hiding unsafe contents: %s",
    async (scenario) => {
      const taskId = "202601300000-STAGED";
      const tasksRoot = path.join(tempDir, ".agentplane", "tasks");
      const taskRoot = path.join(tasksRoot, taskId);
      const backend = new LocalBackend({ dir: tasksRoot });
      const contents = JSON.stringify({
        $id: "https://agentplane.org/schemas/agent-semantic-payload.schema.json",
        $schema: "http://json-schema.org/draft-07/schema#",
        type: "object",
      });
      const artifact = await putEvaluatorEvidenceObject({
        gitRoot: tempDir,
        taskQualityRoot: path.join(taskRoot, "quality"),
        logicalName: "semantic-payload-schema",
        kind: "result_schema",
        extension: ".json",
        mediaType: "application/schema+json",
        contents,
      });
      const objects = path.join(taskRoot, "quality", "objects");
      const staging = path.join(objects, ".staging");
      expect(await readdir(staging)).toEqual([]);
      if (scenario === "nonempty") await writeFile(path.join(staging, "pending.tmp"), "pending");
      if (scenario === "symlink" || scenario === "file") {
        await rm(staging, { recursive: true });
        if (scenario === "file") await writeFile(staging, "unexpected");
        else {
          const target = path.join(tempDir, "outside-staging");
          await mkdir(target);
          await symlink(target, staging, process.platform === "win32" ? "junction" : "dir");
        }
      }
      if (scenario === "unknown_sibling") await mkdir(path.join(objects, "unexpected"));
      if (scenario === "readme") await mkdir(path.join(taskRoot, "README.md"));
      const expectedWarnings =
        scenario === "empty" ? [] : [`skip:${taskId}: missing_or_unreadable_readme`];
      expect(await backend.listTasks()).toEqual([]);
      expect(backend.getLastListWarnings()).toEqual(expectedWarnings);
      await backend.listProjectionTasks();
      expect(backend.getLastListWarnings()).toEqual(expectedWarnings);
      expect(await readFile(path.resolve(tempDir, artifact.path), "utf8")).toBe(contents);
      if (scenario === "nonempty")
        expect(await readFile(path.join(staging, "pending.tmp"), "utf8")).toBe("pending");
    },
  );

  it.each(
    ["agent-semantic-result", "agent-semantic-payload"].flatMap((schemaName) =>
      ["valid", "tampered", "not_schema", "unknown_schema", "mixed", "symlink", "readme"].map(
        (scenario) => [schemaName, scenario] as const,
      ),
    ),
  )("recognizes only intact schema-only directories: %s / %s", async (schemaName, scenario) => {
    const backend = new LocalBackend({ dir: tempDir });
    const taskId = "202601300000-SCHEMA";
    const directory = path.join(tempDir, taskId);
    const objectRoot = path.join(directory, "quality", "objects", "sha256");
    await mkdir(objectRoot, { recursive: true });
    const contents = JSON.stringify(
      scenario === "not_schema"
        ? { kind: "task", status: "DOING" }
        : {
            $id: `https://agentplane.org/schemas/${scenario === "unknown_schema" ? "unknown" : schemaName}.schema.json`,
            $schema: "http://json-schema.org/draft-07/schema#",
            type: "object",
          },
    );
    const objectPath = path.join(
      objectRoot,
      `${createHash("sha256").update(contents).digest("hex")}.json`,
    );
    if (scenario === "symlink") {
      const target = path.join(tempDir, "schema.json");
      await writeFile(target, contents);
      await symlink(target, objectPath);
    } else await writeFile(objectPath, scenario === "tampered" ? "{}" : contents);
    if (scenario === "mixed") await writeFile(path.join(directory, "task-state.json"), "{}");
    if (scenario === "readme") await mkdir(path.join(directory, "README.md"));

    expect(await backend.listTasks()).toEqual([]);
    const warnings = backend.getLastListWarnings();
    if (scenario === "valid") expect(warnings).toEqual([]);
    else expect(warnings).toContain(`skip:${taskId}: missing_or_unreadable_readme`);
    // A warm projection must not erase a scan warning.
    await backend.listProjectionTasks();
    if (scenario === "valid") expect(backend.getLastListWarnings()).toEqual([]);
    else
      expect(backend.getLastListWarnings()).toContain(
        `skip:${taskId}: missing_or_unreadable_readme`,
      );
  });
});
