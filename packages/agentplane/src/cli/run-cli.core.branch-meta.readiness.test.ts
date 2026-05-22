/* eslint-disable @typescript-eslint/no-unused-vars */
import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import {
  chmod,
  copyFile,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";
import { defaultConfig, extractTaskSuffix, type ResolvedProject } from "./core-imports.js";
import { readTask, renderTaskReadme } from "@agentplaneorg/core/tasks";

import { runCli } from "./run-cli.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../agents/agents-template.js";
import * as taskBackend from "../backends/task-backend.js";
import {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  createUpgradeBundle,
  getAgentplaneHome,
  gitBranchExists,
  installRunCliIntegrationHarness,
  runCliSilent,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  mkTempDir,
  pathExists,
  stageGitignoreIfPresent,
  stubTaskBackend,
  writeConfig,
  writeDefaultConfig,
} from "@agentplane/testkit";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import * as prompts from "./prompts.js";

installRunCliIntegrationHarness();

describe("runCli", () => {
  const READY_DETAILS_TIMEOUT_MS = 120_000;

  it("ready reports readiness details", { timeout: READY_DETAILS_TIMEOUT_MS }, async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const depId = "202601301111-READY01";
    const taskId = "202601301111-READY02";

    await runCliSilent([
      "task",
      "add",
      depId,
      "--title",
      "Dep task",
      "--description",
      "Dep",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "nodejs",
      "--root",
      root,
    ]);
    await runCliSilent([
      "task",
      "add",
      taskId,
      "--title",
      "Main task",
      "--description",
      "Main",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "nodejs",
      "--depends-on",
      depId,
      "--root",
      root,
    ]);
    await runCliSilent([
      "task",
      "plan",
      "set",
      depId,
      "--text",
      "1. Complete dependency fixture\n2. Verify readiness fixture",
      "--updated-by",
      "ORCHESTRATOR",
      "--quiet",
      "--root",
      root,
    ]);
    await runCliSilent([
      "task",
      "plan",
      "approve",
      depId,
      "--by",
      "ORCHESTRATOR",
      "--quiet",
      "--root",
      root,
    ]);
    await runCliSilent([
      "task",
      "start-ready",
      depId,
      "--author",
      "CODER",
      "--body",
      "Start: dependency fixture for readiness details.",
      "--quiet",
      "--root",
      root,
    ]);
    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });
    await runCliSilent([
      "verify",
      depId,
      "--ok",
      "--by",
      "EVALUATOR",
      "--note",
      "Ok to finish dependency; EVALUATOR quality gate passed with cited evidence.",
      "--quiet",
      "--root",
      root,
    ]);
    await runCliSilent(["blueprint", "snapshot", depId, "--root", root]);
    const finishIo = captureStdIO();
    try {
      const finishCode = await runCli([
        "finish",
        depId,
        "--author",
        "INTEGRATOR",
        "--body",
        "Verified: dependency completed for readiness test; checks done locally; no issues found.",
        "--result",
        "ready: finish dependency",
        "--commit",
        "HEAD",
        "--quiet",
        "--root",
        root,
      ]);
      expect(finishCode, `${finishIo.stdout}\n${finishIo.stderr}`).toBe(0);
    } finally {
      finishIo.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli(["ready", taskId, "--root", root]);
      expect(code, `${io.stdout}\n${io.stderr}`).toBe(0);
      expect(io.stdout).toContain(`Task: ${taskId}`);
      expect(io.stdout).toContain("✅ ready");
    } finally {
      io.restore();
    }
  });

  it("ready reports missing dependencies", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const taskId = "202601301111-READY03";
    await runCliSilent([
      "task",
      "add",
      taskId,
      "--title",
      "Waiting task",
      "--description",
      "Waiting",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "nodejs",
      "--depends-on",
      "202601301111-MISSING",
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli(["ready", taskId, "--root", root]);
      expect(code).toBe(2);
      expect(io.stdout).toContain("missing deps");
      expect(io.stdout).toContain("⚠️ not ready");
    } finally {
      io.restore();
    }
  });

  it("quickstart prints CLI help output", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["quickstart", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("agentplane quickstart");
      expect(io.stdout).toContain("agentplane init");
    } finally {
      io.restore();
    }
  });

  it("quickstart --json emits compact machine-readable payload", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["quickstart", "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        source_of_truth?: { workflow_policy?: string };
        lines?: string[];
      };
      expect(payload.source_of_truth?.workflow_policy).toBe("AGENTS.md|CLAUDE.md");
      expect(Array.isArray(payload.lines)).toBe(true);
      expect((payload.lines ?? []).some((line) => line.includes("agentplane init"))).toBe(true);
    } finally {
      io.restore();
    }
  });

  it("preflight --json aggregates readiness in one command", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["preflight", "--json", "--mode", "full", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        mode?: unknown;
        project_detected?: unknown;
        config_loaded?: { ok?: unknown };
        quickstart_loaded?: { ok?: unknown };
        task_list_loaded?: { ok?: unknown };
        current_branch?: { ok?: unknown };
        workflow_mode?: unknown;
        harness_health?: { status?: string; reasons?: string[] };
        next_actions?: unknown;
      };
      expect(payload.mode).toBe("full");
      expect(payload.project_detected).toBe(true);
      expect(payload.config_loaded).toMatchObject({ ok: true });
      expect(payload.quickstart_loaded).toMatchObject({ ok: true });
      expect(payload.task_list_loaded).toMatchObject({ ok: true });
      expect(payload.current_branch).toMatchObject({ ok: true });
      expect(payload.workflow_mode).toBe("direct");
      expect(payload.harness_health?.status).toBe("warn");
      expect(payload.harness_health?.reasons).toContain("workflow_contract_invalid");
      expect(Array.isArray(payload.next_actions)).toBe(true);
    } finally {
      io.restore();
    }
  });

  it("preflight --json uses quick mode by default and skips task backend probe", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["preflight", "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        mode?: unknown;
        task_list_loaded?: { ok?: unknown; error?: string };
        harness_health?: { status?: string; reasons?: string[] };
      };
      expect(payload.mode).toBe("quick");
      expect(payload.task_list_loaded?.ok).toBe(false);
      expect(payload.task_list_loaded?.error).toContain("skipped in quick mode");
      expect(payload.harness_health?.status).toBe("warn");
      expect(payload.harness_health?.reasons).toEqual(
        expect.arrayContaining(["workflow_contract_invalid"]),
      );
    } finally {
      io.restore();
    }
  });

  it("preflight --json surfaces task artifact drift even when tracked status is clean", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const otherTaskDir = path.join(root, ".agentplane", "tasks", "202604100023-OTHER");
    await mkdir(otherTaskDir, { recursive: true });
    await writeFile(path.join(otherTaskDir, "README.md"), "drift\n", "utf8");
    const io = captureStdIO();
    try {
      const code = await runCli(["preflight", "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        working_tree_clean_tracked?: { value?: boolean };
        task_artifact_drift?: {
          present?: boolean;
          actionable?: boolean;
          task_ids?: string[];
          paths?: string[];
          counts?: { unknown_task_artifact?: number };
          items?: { classification?: string; action?: string; status?: string }[];
        };
        harness_health?: { status?: string; reasons?: string[] };
        next_actions?: { command?: string; reason?: string }[];
      };
      expect(payload.working_tree_clean_tracked?.value).toBe(true);
      expect(payload.task_artifact_drift).toMatchObject({
        present: true,
        task_ids: ["202604100023-OTHER"],
      });
      expect(payload.task_artifact_drift?.paths).toContain(
        ".agentplane/tasks/202604100023-OTHER/README.md",
      );
      expect(payload.task_artifact_drift?.actionable).toBe(true);
      expect(payload.task_artifact_drift?.counts?.unknown_task_artifact).toBe(1);
      expect(payload.task_artifact_drift?.items?.[0]).toMatchObject({
        classification: "unknown_task_artifact",
        action: "inspect",
        status: "unknown",
      });
      expect(payload.harness_health?.status).toBe("warn");
      expect(payload.harness_health?.reasons).toContain("task_artifact_drift");
      expect(payload.next_actions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            command: "git status --short --untracked-files=all -- .agentplane/tasks",
          }),
        ]),
      );
    } finally {
      io.restore();
    }
  });

  it("preflight --json treats active task artifacts as parallel-agent context, not harness drift", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202604100023-ACTIVE";
    const taskDir = path.join(root, ".agentplane", "tasks", taskId);
    await mkdir(taskDir, { recursive: true });
    await writeFile(
      path.join(taskDir, "README.md"),
      renderTaskReadme(
        {
          id: taskId,
          title: "Parallel agent task",
          status: "TODO",
          priority: "med",
          owner: "CODER",
          depends_on: [],
          tags: ["code"],
          verify: [],
          comments: [],
          doc_version: 3,
          doc_updated_at: "2026-04-10T00:23:00.000Z",
          doc_updated_by: "ORCHESTRATOR",
          description: "Active task artifact from another agent.",
          sections: {
            Summary: "Parallel agent task",
            Scope: "- In scope: active task artifact.",
            Plan: "Keep this artifact visible without warning on harness health.",
            "Verify Steps": "1. Run preflight.",
            Verification: "<!-- BEGIN VERIFICATION RESULTS -->\n<!-- END VERIFICATION RESULTS -->",
            "Rollback Plan": "- Remove the artifact.",
            Findings: "",
          },
        },
        "## Summary\n\nParallel agent task\n",
      ),
      "utf8",
    );
    const io = captureStdIO();
    try {
      const code = await runCli(["preflight", "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        task_artifact_drift?: {
          present?: boolean;
          actionable?: boolean;
          counts?: { active_parallel_task_artifact?: number };
          items?: { classification?: string; action?: string; status?: string }[];
        };
        harness_health?: { reasons?: string[] };
        next_actions?: { command?: string; reason?: string }[];
      };
      expect(payload.task_artifact_drift?.present).toBe(true);
      expect(payload.task_artifact_drift?.actionable).toBe(false);
      expect(payload.task_artifact_drift?.counts?.active_parallel_task_artifact).toBe(1);
      expect(payload.task_artifact_drift?.items?.[0]).toMatchObject({
        classification: "active_parallel_task_artifact",
        action: "ignore_parallel_agent",
        status: "TODO",
      });
      expect(payload.harness_health?.reasons ?? []).not.toContain("task_artifact_drift");
      expect(payload.next_actions ?? []).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            command: "git status --short --untracked-files=all -- .agentplane/tasks",
          }),
        ]),
      );
    } finally {
      io.restore();
    }
  });

  it("preflight --json keeps non-README active task artifacts actionable", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202604100023-ACTIVE";
    const taskDir = path.join(root, ".agentplane", "tasks", taskId);
    const handoffDir = path.join(taskDir, "handoff");
    await mkdir(handoffDir, { recursive: true });
    await writeFile(
      path.join(taskDir, "README.md"),
      renderTaskReadme(
        {
          id: taskId,
          title: "Active task with handoff residue",
          status: "DOING",
          priority: "med",
          owner: "CODER",
          depends_on: [],
          tags: ["code"],
          verify: [],
          comments: [],
          doc_version: 3,
          doc_updated_at: "2026-04-10T00:23:00.000Z",
          doc_updated_by: "CODER",
          description: "Active task with a non-README artifact.",
          sections: {
            Summary: "Active task with handoff residue",
            Scope: "- In scope: active handoff artifact.",
            Plan: "Keep non-README artifacts inspectable.",
            "Verify Steps": "1. Run preflight.",
            Verification: "<!-- BEGIN VERIFICATION RESULTS -->\n<!-- END VERIFICATION RESULTS -->",
            "Rollback Plan": "- Remove the artifact.",
            Findings: "",
          },
        },
        "## Summary\n\nActive task with handoff residue\n",
      ),
      "utf8",
    );
    await writeFile(path.join(handoffDir, "latest.json"), "{}\n", "utf8");
    const io = captureStdIO();
    try {
      const code = await runCli(["preflight", "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        task_artifact_drift?: {
          actionable?: boolean;
          counts?: { unknown_task_artifact?: number };
          items?: {
            path?: string;
            artifact_kind?: string;
            classification?: string;
            action?: string;
            status?: string;
          }[];
        };
        harness_health?: { reasons?: string[] };
      };
      expect(payload.task_artifact_drift?.actionable).toBe(true);
      expect(payload.task_artifact_drift?.counts?.unknown_task_artifact).toBe(1);
      expect(payload.task_artifact_drift?.items).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: `.agentplane/tasks/${taskId}/handoff/latest.json`,
            artifact_kind: "handoff",
            classification: "unknown_task_artifact",
            action: "inspect",
            status: "DOING",
          }),
        ]),
      );
      expect(payload.harness_health?.reasons).toContain("task_artifact_drift");
    } finally {
      io.restore();
    }
  });

  it("preflight --json classifies blueprint artifacts as task evidence", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202604100023-BLUEPT";
    const taskDir = path.join(root, ".agentplane", "tasks", taskId);
    const blueprintDir = path.join(taskDir, "blueprint");
    await mkdir(blueprintDir, { recursive: true });
    await writeFile(
      path.join(taskDir, "README.md"),
      renderTaskReadme(
        {
          id: taskId,
          title: "Task with blueprint evidence",
          status: "DOING",
          priority: "med",
          owner: "CODER",
          depends_on: [],
          tags: ["code"],
          verify: [],
          comments: [],
          doc_version: 3,
          doc_updated_at: "2026-04-10T00:23:00.000Z",
          doc_updated_by: "CODER",
          description: "Active task with blueprint evidence.",
          sections: {
            Summary: "Task with blueprint evidence",
            Scope: "- In scope: blueprint artifact classification.",
            Plan: "Classify blueprint evidence explicitly.",
            "Verify Steps": "1. Run preflight.",
            Verification: "<!-- BEGIN VERIFICATION RESULTS -->\n<!-- END VERIFICATION RESULTS -->",
            "Rollback Plan": "- Remove the artifact.",
            Findings: "",
          },
        },
        "## Summary\n\nTask with blueprint evidence\n",
      ),
      "utf8",
    );
    await writeFile(path.join(blueprintDir, "resolved-snapshot.json"), "{}\n", "utf8");
    const io = captureStdIO();
    try {
      const code = await runCli(["preflight", "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        task_artifact_drift?: {
          actionable?: boolean;
          counts?: { task_blueprint_evidence?: number; unknown_task_artifact?: number };
          items?: {
            path?: string;
            artifact_kind?: string;
            classification?: string;
            action?: string;
            status?: string;
            reason?: string;
          }[];
        };
      };
      expect(payload.task_artifact_drift?.actionable).toBe(true);
      expect(payload.task_artifact_drift?.counts?.task_blueprint_evidence).toBe(1);
      expect(payload.task_artifact_drift?.counts?.unknown_task_artifact).toBe(0);
      expect(payload.task_artifact_drift?.items).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: `.agentplane/tasks/${taskId}/blueprint/resolved-snapshot.json`,
            artifact_kind: "blueprint",
            classification: "task_blueprint_evidence",
            action: "commit_with_task_evidence",
            status: "DOING",
          }),
        ]),
      );
      expect(payload.task_artifact_drift?.items?.[0]?.reason).toContain(
        "task-local verification evidence",
      );
    } finally {
      io.restore();
    }
  });

  it("preflight --json classifies completed-task handoff artifacts as cleanup candidates", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202604100023-DONE01";
    const taskDir = path.join(root, ".agentplane", "tasks", taskId);
    const handoffDir = path.join(taskDir, "handoff");
    await mkdir(handoffDir, { recursive: true });
    await writeFile(
      path.join(taskDir, "README.md"),
      renderTaskReadme(
        {
          id: taskId,
          title: "Completed task",
          status: "DONE",
          priority: "med",
          owner: "CODER",
          depends_on: [],
          tags: ["code"],
          verify: [],
          comments: [],
          doc_version: 3,
          doc_updated_at: "2026-04-10T00:23:00.000Z",
          doc_updated_by: "INTEGRATOR",
          description: "Completed task with stale handoff residue.",
          sections: {
            Summary: "Completed task",
            Scope: "- In scope: completed task.",
            Plan: "Classify handoff residue.",
            "Verify Steps": "1. Run preflight.",
            Verification: "<!-- BEGIN VERIFICATION RESULTS -->\n<!-- END VERIFICATION RESULTS -->",
            "Rollback Plan": "- Remove the artifact.",
            Findings: "",
          },
        },
        "## Summary\n\nCompleted task\n",
      ),
      "utf8",
    );
    await writeFile(path.join(handoffDir, "latest.json"), "{}\n", "utf8");
    const io = captureStdIO();
    try {
      const code = await runCli(["preflight", "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        task_artifact_drift?: {
          actionable?: boolean;
          counts?: { stale_done_handoff?: number };
          items?: { path?: string; classification?: string; action?: string; status?: string }[];
        };
        harness_health?: { reasons?: string[] };
      };
      expect(payload.task_artifact_drift?.actionable).toBe(true);
      expect(payload.task_artifact_drift?.counts?.stale_done_handoff).toBe(1);
      expect(payload.task_artifact_drift?.items).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: `.agentplane/tasks/${taskId}/handoff/latest.json`,
            classification: "stale_done_handoff",
            action: "cleanup_candidate",
            status: "DONE",
          }),
        ]),
      );
      expect(payload.harness_health?.reasons).toContain("task_artifact_drift");
    } finally {
      io.restore();
    }
  });

  it("preflight text output calls out task artifact drift explicitly", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const otherTaskDir = path.join(root, ".agentplane", "tasks", "202604100023-OTHER");
    await mkdir(otherTaskDir, { recursive: true });
    await writeFile(path.join(otherTaskDir, "README.md"), "drift\n", "utf8");
    const io = captureStdIO();
    try {
      const code = await runCli(["preflight", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(
        "- task artifact drift: tasks=202604100023-OTHER; active_parallel=0; stale_done_handoff=0; blueprint_evidence=0; unknown=1; actionable=yes",
      );
      expect(io.stdout).toContain(
        "- git status --short --untracked-files=all -- .agentplane/tasks: actionable task artifact drift detected for 202604100023-OTHER",
      );
    } finally {
      io.restore();
    }
  });

  it("preflight --json guards changed PR title artifacts against the canonical message format", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202604100023-ABC123";
    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    await mkdir(prDir, { recursive: true });
    await writeFile(
      path.join(prDir, "github-title.txt"),
      `task: stale artifact [${taskId}]\n`,
      "utf8",
    );
    const io = captureStdIO();
    try {
      const code = await runCli(["preflight", "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        message_format_guard?: { ok?: boolean; checked_paths?: string[]; errors?: string[] };
        harness_health?: { status?: string; reasons?: string[] };
        next_actions?: { command?: string; reason?: string }[];
      };
      expect(payload.message_format_guard?.ok).toBe(false);
      expect(payload.message_format_guard?.checked_paths).toContain(
        ".agentplane/tasks/202604100023-ABC123/pr/github-title.txt",
      );
      expect(payload.message_format_guard?.errors?.join("\n")).toContain(
        "Invalid GitHub PR title format",
      );
      expect(payload.harness_health?.reasons).toContain("message_format_guard_failed");
      expect(payload.next_actions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            command: "agentplane pr update <task-id>",
          }),
        ]),
      );
    } finally {
      io.restore();
    }
  });

  it("preflight --json supports workflow kill-switch via env", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const prev = process.env.AGENTPLANE_WORKFLOW_ENFORCEMENT;
    process.env.AGENTPLANE_WORKFLOW_ENFORCEMENT = "off";
    const io = captureStdIO();
    try {
      const code = await runCli(["preflight", "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        workflow_loaded?: { ok?: boolean; error?: string };
        harness_health?: { status?: string; reasons?: string[] };
      };
      expect(payload.workflow_loaded?.ok).toBe(true);
      expect(payload.workflow_loaded?.error).toContain("workflow checks disabled");
      expect(payload.harness_health?.status).toBe("ok");
      expect(payload.harness_health?.reasons).toEqual([]);
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_WORKFLOW_ENFORCEMENT;
      else process.env.AGENTPLANE_WORKFLOW_ENFORCEMENT = prev;
    }
  });

  it("preflight --json in non-project suggests init", async () => {
    const root = await mkTempDir();
    const io = captureStdIO();
    try {
      const code = await runCli(["preflight", "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        project_detected?: unknown;
        next_actions?: { command?: string }[];
      };
      expect(payload.project_detected).toBe(false);
      const commands = Array.isArray(payload.next_actions)
        ? payload.next_actions.map((v) => String(v.command ?? ""))
        : [];
      expect(commands).toContain("agentplane init");
    } finally {
      io.restore();
    }
  });
});
