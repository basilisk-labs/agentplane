import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";
import { captureStdIO, installRunCliIntegrationHarness } from "./run-cli.test-helpers.js";
import { writeAndConfigureRoot } from "./run-cli.core.tasks.test-helpers.js";

installRunCliIntegrationHarness();

describe("runCli", () => {
  it("task scaffold writes and enforces overwrite", async () => {
    const root = await writeAndConfigureRoot();
    const taskId = "202602011330-SCAF01";

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "scaffold", taskId, "--force", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("wrote");
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("doc_version: 3");
    expect(readme).toContain("## Verify Steps");
    expect(readme).toContain("<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->");
    expect(readme).toContain("1. <Action>. Expected: <observable result>.");
    expect(readme).toContain("## Verification");
    expect(readme).toContain("## Findings");
    expect(readme).toContain("<!-- BEGIN VERIFICATION RESULTS -->");
    expect(readme).toContain("<!-- END VERIFICATION RESULTS -->");
    expect(readme.indexOf("## Verify Steps")).toBeLessThan(readme.indexOf("## Verification"));

    const ioOverwrite = captureStdIO();
    try {
      const code = await runCli(["task", "scaffold", taskId, "--root", root]);
      expect(code).toBe(2);
      expect(ioOverwrite.stderr).toContain("File already exists");
    } finally {
      ioOverwrite.restore();
    }

    const ioForce = captureStdIO();
    try {
      const code = await runCli(["task", "scaffold", taskId, "--overwrite", "--root", root]);
      expect(code).toBe(0);
    } finally {
      ioForce.restore();
    }
  });

  it("task scaffold supports quiet and title", async () => {
    const root = await writeAndConfigureRoot();
    const taskId = "202602011330-SCAF02";
    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "scaffold",
        taskId,
        "--title",
        "Custom title",
        "--force",
        "--quiet",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toBe("");
      expect(io.stderr).toBe("");
    } finally {
      io.restore();
    }

    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("Custom title");
  });

  it("task scaffold rejects missing title values and unknown flags", async () => {
    const root = await writeAndConfigureRoot();
    const taskId = "202602011330-SCAF03";
    const cases: { args: string[]; msg: string }[] = [
      { args: ["task", "scaffold", taskId, "--title"], msg: "Missing value after --title" },
      { args: ["task", "scaffold", taskId, "--nope", "x"], msg: "Unknown option: --nope." },
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

  it("task derive sets depends_on and task list shows wait deps until spike is DONE", async () => {
    const root = await writeAndConfigureRoot();

    const ioSpike = captureStdIO();
    let spikeId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Spike task",
        "--description",
        "Exploration",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "spike",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      spikeId = ioSpike.stdout.trim();
      expect(spikeId).toContain("-");
    } finally {
      ioSpike.restore();
    }

    const ioDerive = captureStdIO();
    let derivedId = "";
    try {
      const code = await runCli([
        "task",
        "derive",
        spikeId,
        "--title",
        "Implementation task",
        "--description",
        "Build the thing",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      derivedId = ioDerive.stdout.trim();
      expect(derivedId).toContain("-");
    } finally {
      ioDerive.restore();
    }

    const ioShow = captureStdIO();
    try {
      const code = await runCli(["task", "show", derivedId, "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(ioShow.stdout) as { depends_on?: string[] };
      expect(parsed.depends_on ?? []).toContain(spikeId);
    } finally {
      ioShow.restore();
    }

    const ioList = captureStdIO();
    try {
      const code = await runCli(["task", "list", "--root", root]);
      expect(code).toBe(0);
      expect(ioList.stdout).toContain(`deps=wait:${spikeId}`);
    } finally {
      ioList.restore();
    }
  });
});
