import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core";
import { createIncidentRegistrySkeleton } from "../runtime/incidents/index.js";

import { runCli } from "./run-cli.js";
import {
  approveTaskPlan,
  captureStdIO,
  installRunCliIntegrationHarness,
  recordVerificationOk,
  runCliSilent,
  writeAndConfigureRoot,
  writeConfig,
} from "./run-cli.test-helpers.js";

const execFileAsync = promisify(execFile);

installRunCliIntegrationHarness();

describe("runCli", () => {
  it("task hosted-close closes a merged branch_pr task exactly once", async () => {
    const root = await writeAndConfigureRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await mkdir(path.join(root, "packages", "agentplane", "assets", "policy"), {
      recursive: true,
    });
    await writeFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
      createIncidentRegistrySkeleton(),
      "utf8",
    );
    await writeFile(
      path.join(root, "packages", "agentplane", "assets", "policy", "incidents.md"),
      createIncidentRegistrySkeleton(),
      "utf8",
    );
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });
    const { stdout: baseBranchStdout } = await execFileAsync(
      "git",
      ["rev-parse", "--abbrev-ref", "HEAD"],
      { cwd: root },
    );
    const baseBranch = baseBranchStdout.trim();

    const taskId = "202603271940-EG3B0C";
    const branch = `task/${taskId}/hosted-close`;
    const addCode = await runCliSilent([
      "task",
      "add",
      taskId,
      "--title",
      "Hosted close task",
      "--description",
      "Exercise hosted branch_pr closure",
      "--priority",
      "high",
      "--owner",
      "CODER",
      "--tag",
      "workflow",
      "--root",
      root,
    ]);
    expect(addCode).toBe(0);

    for (const [section, text] of [
      ["Verify Steps", "1. Run task hosted-close against a merged branch_pr task."],
      [
        "Findings",
        [
          "- Observation: hosted close automation can still depend on manual GitHub-side cleanup when the task PR merged but the closure branch could not be created automatically.",
          "  Impact: operators repeat the same reconciliation steps for equivalent hosted-close tails.",
          "  Resolution: inspect the merged PR state first, then create the missing closure branch only when the close metadata is absent.",
          "  Fixability: external",
        ].join("\n"),
      ],
    ] as const) {
      const code = await runCliSilent([
        "task",
        "doc",
        "set",
        taskId,
        "--section",
        section,
        "--text",
        text,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    }

    await approveTaskPlan(root, taskId);
    const startCode = await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: exercise hosted branch_pr closure from a merged PR event.",
      "--root",
      root,
    ]);
    expect(startCode).toBe(0);
    await recordVerificationOk(root, taskId);

    const prOpenCode = await runCliSilent([
      "pr",
      "open",
      taskId,
      "--branch",
      branch,
      "--author",
      "CODER",
      "--root",
      root,
    ]);
    expect(prOpenCode).toBe(0);

    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    const touchedFile = path.join(root, "src", "hosted-close.ts");
    await mkdir(path.dirname(touchedFile), { recursive: true });
    await writeFile(touchedFile, "export const hostedClose = true;\n", "utf8");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "feat: hosted close fixture"], { cwd: root });
    const { stdout: branchHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const branchHead = branchHeadStdout.trim();

    await execFileAsync("git", ["checkout", baseBranch], { cwd: root });
    await execFileAsync("git", ["merge", "--no-ff", branch, "-m", "Merge task branch"], {
      cwd: root,
    });
    const { stdout: mergeHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const mergeSha = mergeHeadStdout.trim();

    const eventDir = await mkdtemp(path.join(tmpdir(), "agentplane-hosted-close-event-"));
    const eventPath = path.join(eventDir, "event.json");
    await writeFile(
      eventPath,
      `${JSON.stringify(
        {
          pull_request: {
            merged: true,
            number: 88,
            title: "Hosted close task",
            merge_commit_sha: mergeSha,
            merged_at: "2026-03-27T20:00:00.000Z",
            head: { ref: branch, sha: branchHead },
            base: { ref: baseBranch },
          },
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    const { stdout: beforeCloseStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const beforeCloseHead = beforeCloseStdout.trim();
    expect(beforeCloseHead).toBe(mergeSha);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "hosted-close",
        "--event-json",
        eventPath,
        "--root",
        root,
      ]);
      if (code !== 0) {
        const { stdout: statusStdout } = await execFileAsync("git", ["status", "--short"], {
          cwd: root,
        });
        throw new Error(
          `hosted-close failed: code=${code} stderr=${io.stderr} status=${statusStdout}`,
        );
      }
      expect(code).toBe(0);
      expect(io.stdout).toContain(`task hosted close ${taskId}`);
      expect(io.stdout).toContain("incident registry updated (1 promoted)");
    } finally {
      io.restore();
    }

    const { stdout: afterCloseStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const closeHead = afterCloseStdout.trim();
    expect(closeHead).not.toBe(mergeSha);

    const taskShow = captureStdIO();
    try {
      const code = await runCli(["task", "show", taskId, "--root", root]);
      expect(code).toBe(0);
      const task = JSON.parse(taskShow.stdout) as {
        status?: string;
        result_summary?: string;
        commit?: { hash?: string } | null;
      };
      expect(task.status).toBe("DONE");
      expect(task.result_summary).toBe("Merged via PR #88.");
      expect(task.commit?.hash).toBe(mergeSha);
    } finally {
      taskShow.restore();
    }

    const metaRaw = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"),
      "utf8",
    );
    expect(metaRaw).toContain('"status": "MERGED"');
    expect(metaRaw).toContain(`"merge_commit": "${mergeSha}"`);
    const incidents = await readFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
      "utf8",
    );
    const incidentsAsset = await readFile(
      path.join(root, "packages", "agentplane", "assets", "policy", "incidents.md"),
      "utf8",
    );
    expect(incidents).toContain(`source_task: ${taskId}`);
    expect(incidents).toContain("fixability: external");
    expect(incidents).toContain("state: open");
    expect(incidents).toContain(
      "inspect the merged PR state first, then create the missing closure branch only when the close metadata is absent",
    );
    expect(incidentsAsset).toBe(incidents);

    const rerunIo = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "hosted-close",
        "--event-json",
        eventPath,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(rerunIo.stdout).toContain("hosted close skipped");
    } finally {
      rerunIo.restore();
    }

    const { stdout: afterRerunStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    expect(afterRerunStdout.trim()).toBe(closeHead);
  }, 120_000);

  it("task hosted-close falls back when the merge commit object is absent locally", async () => {
    const root = await writeAndConfigureRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
      createIncidentRegistrySkeleton(),
      "utf8",
    );
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });
    const { stdout: baseBranchStdout } = await execFileAsync(
      "git",
      ["rev-parse", "--abbrev-ref", "HEAD"],
      { cwd: root },
    );
    const baseBranch = baseBranchStdout.trim();

    const taskId = "202604062228-9JBSSW";
    const branch = `task/${taskId}/missing-merge-object`;
    expect(
      await runCliSilent([
        "task",
        "add",
        taskId,
        "--title",
        "Hosted close fallback task",
        "--description",
        "Exercise hosted-close when merge object is missing locally",
        "--priority",
        "high",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]),
    ).toBe(0);
    expect(
      await runCliSilent([
        "task",
        "doc",
        "set",
        taskId,
        "--section",
        "Verify Steps",
        "--text",
        "1. Run task hosted-close against a merged branch_pr task whose merge object is absent locally.",
        "--root",
        root,
      ]),
    ).toBe(0);
    await approveTaskPlan(root, taskId);
    expect(
      await runCliSilent([
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: exercise hosted-close fallback when merge object is absent locally.",
        "--root",
        root,
      ]),
    ).toBe(0);
    await recordVerificationOk(root, taskId);

    expect(
      await runCliSilent([
        "pr",
        "open",
        taskId,
        "--branch",
        branch,
        "--author",
        "CODER",
        "--root",
        root,
      ]),
    ).toBe(0);

    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    const touchedFile = path.join(root, "src", "missing-merge-object.ts");
    await mkdir(path.dirname(touchedFile), { recursive: true });
    await writeFile(touchedFile, "export const missingMergeObject = true;\n", "utf8");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "feat: missing merge object fixture"], {
      cwd: root,
    });
    const { stdout: branchHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const branchHead = branchHeadStdout.trim();
    await execFileAsync("git", ["checkout", baseBranch], { cwd: root });
    await execFileAsync("git", ["merge", "--no-ff", branch, "-m", "Merge fallback task branch"], {
      cwd: root,
    });

    const mergeSha = "1234567890abcdef1234567890abcdef12345678";
    const eventDir = await mkdtemp(path.join(tmpdir(), "agentplane-hosted-close-missing-merge-"));
    const eventPath = path.join(eventDir, "event.json");
    await writeFile(
      eventPath,
      `${JSON.stringify(
        {
          pull_request: {
            merged: true,
            number: 91,
            title: "Hosted close fallback task",
            merge_commit_sha: mergeSha,
            merged_at: "2026-04-06T22:14:40.000Z",
            head: { ref: branch, sha: branchHead },
            base: { ref: baseBranch },
          },
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "hosted-close",
        "--event-json",
        eventPath,
        "--root",
        root,
      ]);
      if (code !== 0) {
        const { stdout: statusStdout } = await execFileAsync("git", ["status", "--short"], {
          cwd: root,
        });
        throw new Error(
          `hosted-close fallback failed: code=${code} stderr=${io.stderr} status=${statusStdout}`,
        );
      }
      expect(code).toBe(0);
      expect(io.stdout).toContain(`task hosted close ${taskId}`);
      expect(io.stdout).toContain("incident registry unchanged");
    } finally {
      io.restore();
    }

    const taskShow = captureStdIO();
    try {
      const code = await runCli(["task", "show", taskId, "--root", root]);
      expect(code).toBe(0);
      const task = JSON.parse(taskShow.stdout) as {
        status?: string;
        result_summary?: string;
        commit?: { hash?: string; message?: string } | null;
      };
      expect(task.status).toBe("DONE");
      expect(task.result_summary).toBe("Merged via PR #91.");
      expect(task.commit?.hash).toBe(mergeSha);
      expect(task.commit?.message).toBe("Hosted close fallback task");
    } finally {
      taskShow.restore();
    }

    const metaRaw = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"),
      "utf8",
    );
    expect(metaRaw).toContain('"status": "MERGED"');
    expect(metaRaw).toContain(`"merge_commit": "${mergeSha}"`);
  }, 120_000);
});
