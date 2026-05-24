import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { mkTempDir, silenceStdIO } from "@agentplane/testkit";

import { LocalBackend } from "./task-backend.js";

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

  it("ignores handoff-only task directories when listing tasks", async () => {
    const backend = new LocalBackend({ dir: tempDir });

    await mkdir(path.join(tempDir, "202601300000-HANDOF", "handoff"), { recursive: true });
    await writeFile(
      path.join(tempDir, "202601300000-HANDOF", "handoff", "latest.json"),
      "{}",
      "utf8",
    );
    await mkdir(path.join(tempDir, "NO_README"), { recursive: true });

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
    expect(warnings).not.toContain("skip:202601300000-HANDOF: missing_or_unreadable_readme");
  });
});
