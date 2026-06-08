import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { captureStdIO, mkTempDir } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { runCli } from "../../cli/run-cli.js";

async function mkProject(): Promise<string> {
  const root = await mkTempDir();
  await mkdir(path.join(root, ".git"));
  await mkdir(path.join(root, ".agentplane"), { recursive: true });
  await writeFile(
    path.join(root, ".agentplane", "config.json"),
    '{\n  "schema_version": 1,\n  "workflow_mode": "direct"\n}\n',
    "utf8",
  );
  return root;
}

async function createTask(root: string): Promise<string> {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      "Fix checkout discount behavior",
      "--description",
      "Checkout fails when discount code is empty.",
      "--owner",
      "CODER",
      "--tag",
      "bug",
      "--tag",
      "test",
      "--task-kind",
      "code",
      "--mutation-scope",
      "code",
      "--verify",
      "bun test checkout",
      "--root",
      root,
    ]);
    expect(code).toBe(0);
    return io.stdout.trim();
  } finally {
    io.restore();
  }
}

describe("runCli loop commands", () => {
  it("lists and shows built-in loops", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["loop", "list", "--json"]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout);
      expect(payload.loops.map((loop: { id: string }) => loop.id)).toContain("tdd.fix");
    } finally {
      io.restore();
    }

    const io2 = captureStdIO();
    try {
      const code = await runCli(["loop", "show", "tdd.fix"]);
      expect(code).toBe(0);
      expect(io2.stdout).toContain("tdd.fix@0.1.0");
      expect(io2.stdout).toContain("steps:");
    } finally {
      io2.restore();
    }
  });

  it("plans a loop for synthetic task input", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli([
        "loop",
        "plan",
        "--kind",
        "code",
        "--tag",
        "bug",
        "--tag",
        "test",
        "--verify-steps-present",
        "--json",
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout);
      expect(payload.selected.loopId).toBe("tdd.fix");
      expect(payload.selected.total).toBeGreaterThan(0.45);
    } finally {
      io.restore();
    }
  });

  it("validates project-local loop JSON", async () => {
    const root = await mkProject();
    const loopDir = path.join(root, ".agentplane", "loops");
    await mkdir(loopDir, { recursive: true });
    await writeFile(
      path.join(loopDir, "custom-docs.json"),
      `${JSON.stringify(
        {
          schema_version: 1,
          id: "docs.custom",
          version: "0.1.0",
          title: "Custom docs loop",
          description: "Custom docs loop.",
          kind: "implementation",
          status: "experimental",
          applies_to: { task_tags: ["docs"] },
          permissions: { canEditFiles: true },
          budgets: { maxIterations: 2 },
          steps: [{ id: "load", type: "context.load" }],
          transitions: [{ from: "load", if: "ready", to: "finish", decision: "finish" }],
          outputs: { required: ["loop-run.json"] },
          stop_conditions: [{ id: "done", reason: "Done.", decision: "finish" }],
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    const io = captureStdIO();
    try {
      const code = await runCli(["loop", "validate", "--project", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("project loops valid: 1 file");
    } finally {
      io.restore();
    }
  });

  it("creates dry-run LoopRun evidence for a task", async () => {
    const root = await mkProject();
    const taskId = await createTask(root);
    const io = captureStdIO();
    try {
      const code = await runCli([
        "loop",
        "run",
        taskId,
        "--loop",
        "tdd.fix",
        "--dry-run",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout);
      expect(payload.taskId).toBe(taskId);
      expect(payload.loopId).toBe("tdd.fix");
      expect(payload.dryRun).toBe(true);
      const loopRunPath = path.join(root, payload.artifacts.loopRunPath);
      const eventsPath = path.join(root, payload.artifacts.eventsPath);
      expect(JSON.parse(await readFile(loopRunPath, "utf8")).runId).toBe(payload.runId);
      expect(await readFile(eventsPath, "utf8")).toContain("loop.started");
    } finally {
      io.restore();
    }
  });
});
