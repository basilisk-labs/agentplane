import { writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { readTask } from "@agentplaneorg/core";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  runCliSilent,
} from "./run-cli.test-helpers.js";
import { writeAndConfigureRoot } from "./run-cli.core.tasks.test-helpers.js";

installRunCliIntegrationHarness();

describe("runCli", () => {
  it("task normalize and migrate support quiet/force flags", async () => {
    const root = await writeAndConfigureRoot();
    const taskId = "202602011330-NRM01";

    const addCode = await runCliSilent([
      "task",
      "add",
      taskId,
      "--title",
      "Normalize task",
      "--description",
      "Normalize test",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "nodejs",
      "--root",
      root,
    ]);
    expect(addCode).toBe(0);

    const ioNormalize = captureStdIO();
    try {
      const code = await runCli(["task", "normalize", "--quiet", "--force", "--root", root]);
      expect(code).toBe(0);
      expect(ioNormalize.stdout).toBe("");
    } finally {
      ioNormalize.restore();
    }

    const exportPath = path.join(root, "tasks-export.json");
    await writeFile(
      exportPath,
      JSON.stringify(
        {
          tasks: [
            {
              id: "202602011330-MGR01",
              title: "Migrated task",
              description: "Migrate test",
              status: "TODO",
              priority: "med",
              owner: "CODER",
              depends_on: [],
              tags: ["nodejs"],
              verify: [],
              comments: [],
              doc_version: 2,
              doc_updated_at: new Date().toISOString(),
              doc_updated_by: "agentplane",
            },
          ],
        },
        null,
        2,
      ),
      "utf8",
    );

    const ioMigrate = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "migrate",
        "--source",
        path.relative(root, exportPath),
        "--quiet",
        "--force",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(ioMigrate.stdout).toBe("");
    } finally {
      ioMigrate.restore();
    }

    const migrated = await readTask({
      cwd: root,
      rootOverride: root,
      taskId: "202602011330-MGR01",
    });
    expect(migrated?.id).toBe("202602011330-MGR01");
  }, 15_000);

  it("task normalize and migrate reject unknown flags and missing source values", async () => {
    const root = await writeAndConfigureRoot();

    const cases: { args: string[]; msg: string }[] = [
      { args: ["task", "normalize", "--nope"], msg: "Unknown option: --nope." },
      { args: ["task", "migrate", "--source"], msg: "Missing value after --source" },
      { args: ["task", "migrate", "--nope"], msg: "Unknown option: --nope." },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli([...entry.args, "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain(entry.msg);
      } finally {
        io.restore();
      }
    }
  });
});
