import { chmod, mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";

import { infoMessage } from "./output.js";
import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";

installRunCliIntegrationHarness();

type HandoffPayload = {
  task_id: string;
  created_at: string;
  from_role: string;
  to_role?: string | null;
  reason: string;
  branch?: string | null;
  base_branch?: string | null;
  head_sha?: string | null;
  pr_branch?: string | null;
  next_actions?: string[];
  risks?: string[];
  open_questions?: string[];
  evidence_paths?: string[];
  runner?: {
    run_id?: string | null;
    status?: string | null;
    next_action?: string | null;
    next_command?: string | null;
  };
};

function field(label: string, value: string): string {
  return `${`${label}:`.padEnd(21)}${value}`;
}

function renderExpectedHandoffShowText(taskId: string, handoff: HandoffPayload): string {
  const lines = [
    infoMessage(`task handoff show: ${taskId}`),
    field("from", handoff.from_role),
    field("to", handoff.to_role ?? "unassigned"),
    field("created_at", handoff.created_at),
    field("reason", handoff.reason),
  ];
  if (handoff.branch) lines.push(field("branch", handoff.branch));
  if (handoff.base_branch) lines.push(field("base_branch", handoff.base_branch));
  if (handoff.head_sha) lines.push(field("head_sha", handoff.head_sha));
  if (handoff.pr_branch) lines.push(field("pr_branch", handoff.pr_branch));
  if (handoff.runner?.run_id) {
    lines.push(
      field("run_id", handoff.runner.run_id),
      field("runner_status", handoff.runner.status ?? "unknown"),
      field("runner_next_action", handoff.runner.next_action ?? "none"),
    );
    if (handoff.runner.next_command) {
      lines.push(field("runner_next_command", handoff.runner.next_command));
    }
  }
  for (const action of handoff.next_actions ?? []) lines.push(field("next_action", action));
  for (const risk of handoff.risks ?? []) lines.push(field("risk", risk));
  for (const question of handoff.open_questions ?? []) lines.push(field("open_question", question));
  for (const evidence of handoff.evidence_paths ?? []) lines.push(field("evidence_path", evidence));
  return `${lines.join("\n")}\n`;
}

describe("runCli task handoff and recovery", () => {
  it("task reclaim records a deterministic handoff for a task without runner state", async () => {
    const root = await mkGitRepoRoot();
    await writeConfig(root, defaultConfig());

    let taskId = "";
    {
      const io = captureStdIO();
      try {
        expect(
          await runCli([
            "task",
            "new",
            "--title",
            "Handoff without run",
            "--description",
            "Capture reclaim state without any runner artifacts yet.",
            "--owner",
            "CODER",
            "--tag",
            "workflow",
            "--root",
            root,
          ]),
        ).toBe(0);
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: move the task into DOING before reclaiming it through the handoff surface.",
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      expect(
        await runCli([
          "task",
          "reclaim",
          taskId,
          "--author",
          "CODER",
          "--reason",
          "Original agent disconnected before any runner execution started.",
          "--json",
          "--root",
          root,
        ]),
      ).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        task_id: string;
        to_role?: string | null;
        runner?: { next_action?: string | null; next_command?: string | null };
      };
      expect(payload.task_id).toBe(taskId);
      expect(payload.to_role).toBe("CODER");
      expect(payload.runner?.next_action).toBe("run");
      expect(payload.runner?.next_command).toBe(`agentplane task run ${taskId}`);
      expect(io.stdout).toBe(`${JSON.stringify(payload, null, 2)}\n`);
    } finally {
      io.restore();
    }
  });

  it("task handoff record/show/resume-context reuse the latest failed runner state", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.runner.default_adapter = "custom";
    config.runner.custom = {
      command: ["custom-runner"],
    };
    await writeConfig(root, config);

    let taskId = "";
    {
      const io = captureStdIO();
      try {
        expect(
          await runCli([
            "task",
            "new",
            "--title",
            "Handoff failed run",
            "--description",
            "Capture deterministic recovery hints from the latest failed runner run.",
            "--owner",
            "CODER",
            "--tag",
            "workflow",
            "--root",
            root,
          ]),
        ).toBe(0);
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: move the task into DOING before creating a failed runner run for handoff testing.",
      "--root",
      root,
    ]);

    const fakeBinDir = path.join(root, "bin");
    const fakeRunnerPath = path.join(fakeBinDir, "custom-runner");
    await mkdir(fakeBinDir, { recursive: true });
    await writeFile(
      fakeRunnerPath,
      "#!/bin/sh\ncat >/dev/null\nprintf 'runner failed\\n' 1>&2\nexit 1\n",
      "utf8",
    );
    await chmod(fakeRunnerPath, 0o755);

    const originalPath = process.env.PATH;
    try {
      process.env.PATH = `${fakeBinDir}${path.delimiter}${originalPath ?? ""}`;
      expect(await runCliSilent(["task", "run", taskId, "--root", root])).toBe(1);
    } finally {
      process.env.PATH = originalPath;
    }

    const runsRoot = path.join(root, ".agentplane", "tasks", taskId, "runs");
    const runEntries = await readdir(runsRoot);
    const runIds = runEntries.toSorted();
    const runId = runIds[0] ?? "";
    expect(runId).toBeTruthy();
    let recordedHandoff: HandoffPayload | null = null;
    let shownHandoff: HandoffPayload | null = null;

    {
      const io = captureStdIO();
      try {
        expect(
          await runCli([
            "task",
            "handoff",
            "record",
            taskId,
            "--from",
            "CODER",
            "--to",
            "CODER",
            "--reason",
            "Agent disconnected after a failed run and needs deterministic recovery hints.",
            "--json",
            "--root",
            root,
          ]),
        ).toBe(0);
        const payload = JSON.parse(io.stdout) as {
          task_id: string;
          runner?: {
            run_id?: string | null;
            status?: string | null;
            next_action?: string | null;
            retry_command?: string | null;
          };
        };
        expect(payload.task_id).toBe(taskId);
        expect(payload.runner?.run_id).toBe(runId);
        expect(payload.runner?.status).toBe("failed");
        expect(payload.runner?.next_action).toBe("retry");
        expect(payload.runner?.retry_command).toBe(`agentplane task run retry ${taskId} ${runId}`);
        expect(io.stdout).toBe(`${JSON.stringify(payload, null, 2)}\n`);
        recordedHandoff = payload as HandoffPayload;
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        expect(await runCli(["task", "handoff", "show", taskId, "--json", "--root", root])).toBe(0);
        const payload = JSON.parse(io.stdout) as HandoffPayload;
        expect(payload.runner?.run_id).toBe(runId);
        expect(io.stdout).toBe(`${JSON.stringify(payload, null, 2)}\n`);
        expect(payload).toEqual(recordedHandoff);
        shownHandoff = payload;
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        expect(await runCli(["task", "handoff", "show", taskId, "--root", root])).toBe(0);
        const handoffForRender = shownHandoff ?? recordedHandoff;
        expect(handoffForRender).toBeTruthy();
        if (!handoffForRender)
          throw new Error("Expected recorded handoff for plain-text rendering");
        expect(io.stdout).toBe(renderExpectedHandoffShowText(taskId, handoffForRender));
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        expect(await runCli(["task", "resume-context", taskId, "--json", "--root", root])).toBe(0);
        const payload = JSON.parse(io.stdout) as {
          task_id: string;
          latest_handoff?: { reason?: string } | null;
          runner?: { next_action?: string | null; next_command?: string | null };
        };
        expect(payload.task_id).toBe(taskId);
        expect(payload.latest_handoff?.reason).toContain("Agent disconnected");
        expect(payload.runner?.next_action).toBe("retry");
        expect(payload.runner?.next_command).toBe(`agentplane task run retry ${taskId} ${runId}`);
        expect(io.stdout).toBe(`${JSON.stringify(payload, null, 2)}\n`);
      } finally {
        io.restore();
      }
    }
  }, 60_000);
});
