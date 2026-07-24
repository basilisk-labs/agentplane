import { lstat, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";

import { afterEach, describe, expect, it, vi } from "vitest";

import { captureStdIO, installRunCliIntegrationHarness } from "@agentplane/testkit";

import { runCli } from "../../cli/run-cli.js";
import { loadCommandContext } from "../../commands/shared/task-backend.js";
import { evolveRunnerRunState, writeRunnerRunState } from "../artifacts.js";
import { readObservedProcessIdentity } from "../process-supervision/signals.js";

import { readTaskRunnerActiveClaim } from "./task-run-active-claim.js";
import { reconcileTaskRunnerActiveClaim } from "./task-run-active-claim-runtime.js";
import {
  configureCustomRunner,
  createDoingTask,
  mkGitRepoRoot,
  staleClaim,
  writeActiveClaim,
  writeTerminalSuccess,
} from "./task-run-active-claim.testkit.js";
import { prepareTaskRunnerExecution } from "./task-run.js";

installRunCliIntegrationHarness();
const originalPath = process.env.PATH;

afterEach(() => {
  process.env.PATH = originalPath;
  vi.restoreAllMocks();
});

describe("task-run active claim reconciliation", () => {
  it("reports and reconciles a no-run stale claim without provider or termination signals", async () => {
    const root = await mkGitRepoRoot();
    const providerMarker = path.join(root, "provider-must-not-start");
    await configureCustomRunner({
      root,
      script_lines: [
        "#!/bin/sh",
        "set -eu",
        String.raw`printf 'started\n' > "$TEST_RECONCILE_PROVIDER_MARKER"`,
        "cat >/dev/null",
        "exit 0",
      ],
      env: { TEST_RECONCILE_PROVIDER_MARKER: providerMarker },
    });
    const taskId = await createDoingTask(root, "Reconcile a no-run stale claim");
    const claim = staleClaim({ task_id: taskId, run_id: "run-crashed-before-directory" });
    await writeActiveClaim(root, claim);

    {
      const io = captureStdIO();
      try {
        expect(await runCli(["task", "run", "status", taskId, "--json", "--root", root])).toBe(0);
        expect(JSON.parse(io.stdout)).toMatchObject({
          task_id: taskId,
          run_id: null,
          status: null,
          active_claim_present: true,
          active_claim: {
            run_id: claim.run_id,
            generation: claim.generation,
            owner_status: "stale",
          },
          claimed_run_authority: "absent",
          recovery_lease: { status: "absent", owner_status: null },
          execution_blocked: true,
          next_safe_action: "task_run_reconcile",
        });
      } finally {
        io.restore();
      }
    }

    const killSpy = vi.spyOn(process, "kill");
    const io = captureStdIO();
    try {
      expect(await runCli(["task", "run", "reconcile", taskId, "--json", "--root", root])).toBe(0);
      expect(JSON.parse(io.stdout)).toMatchObject({
        status: "recovered",
        task_id: taskId,
        run_id: claim.run_id,
        claimed_run_authority: "absent",
      });
    } finally {
      io.restore();
    }
    expect(
      killSpy.mock.calls.filter(([, signal]) => signal === "SIGTERM" || signal === "SIGKILL"),
    ).toEqual([]);
    await expect(lstat(providerMarker)).rejects.toMatchObject({ code: "ENOENT" });
    await expect(
      readTaskRunnerActiveClaim({
        git_root: root,
        workflow_dir: ".agentplane/tasks",
        task_id: taskId,
        run_id: claim.run_id,
      }),
    ).resolves.toBeNull();
  });

  it("surfaces stale and invalid recovery leases without stealing either", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Inspect blocked recovery authority");
    const claim = staleClaim({ task_id: taskId, run_id: "run-recovery-lease-blocked" });
    const { paths } = await writeActiveClaim(root, claim);
    const leasePath = path.join(
      paths.task_dir,
      `.active-run-claim.${claim.generation}.recovery-lease.json`,
    );
    await writeFile(
      leasePath,
      `${JSON.stringify({
        schema_version: 1,
        target_generation: claim.generation,
        lease_generation: "00000000-0000-4000-8000-000000000099",
        owner_pid: 2_147_483_647,
        owner_command: "terminated-recovery-owner",
        owner_started_at: new Date(0).toISOString(),
        claimed_at: new Date(0).toISOString(),
      })}\n`,
      "utf8",
    );

    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    {
      const io = captureStdIO();
      try {
        expect(await runCli(["task", "run", "status", taskId, "--json", "--root", root])).toBe(0);
        expect(JSON.parse(io.stdout)).toMatchObject({
          active_claim_present: true,
          recovery_lease: {
            status: "held",
            owner_status: "stale",
          },
          execution_blocked: true,
          next_safe_action: "manual_repair_required",
        });
      } finally {
        io.restore();
      }
    }
    await expect(reconcileTaskRunnerActiveClaim({ ctx, task_id: taskId })).rejects.toMatchObject({
      code: "E_RUNTIME",
      context: { recovery_lease_owner_status: "stale" },
    });
    expect(JSON.parse(await readFile(leasePath, "utf8"))).toMatchObject({
      target_generation: claim.generation,
    });

    await writeFile(leasePath, "{not-json\n", "utf8");
    {
      const io = captureStdIO();
      try {
        expect(await runCli(["task", "run", "status", taskId, "--json", "--root", root])).toBe(0);
        expect(JSON.parse(io.stdout)).toMatchObject({
          recovery_lease: {
            status: "invalid",
            owner_status: null,
          },
          execution_blocked: true,
          next_safe_action: "manual_repair_required",
        });
      } finally {
        io.restore();
      }
    }
    await expect(reconcileTaskRunnerActiveClaim({ ctx, task_id: taskId })).rejects.toMatchObject({
      code: "E_RUNTIME",
      context: { recovery_lease_path: leasePath },
    });
    await expect(readFile(leasePath, "utf8")).resolves.toBe("{not-json\n");
  });

  it("prefers task-level claim truth over a newer dry-run while preserving explicit selection", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Expose a masked retained claim");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const claimed = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-claimed-terminal",
    });
    await writeTerminalSuccess(claimed, "terminal result awaiting reconciliation");
    const claim = staleClaim({ task_id: taskId, run_id: claimed.invocation.run_id });
    await writeActiveClaim(root, claim);
    await delay(5);
    const later = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "dry_run",
      run_id: "run-later-dry-run",
    });

    const io = captureStdIO();
    try {
      expect(await runCli(["task", "run", "status", taskId, "--json", "--root", root])).toBe(0);
      expect(JSON.parse(io.stdout)).toMatchObject({
        run_id: claimed.invocation.run_id,
        status: "success",
        active_claim_present: true,
        active_claim_selected_run: true,
        active_claim: { run_id: claim.run_id, owner_status: "stale" },
        claimed_run_authority: "terminal",
        execution_blocked: true,
        next_safe_action: "task_run_reconcile",
      });
    } finally {
      io.restore();
    }

    const explicitIo = captureStdIO();
    try {
      expect(
        await runCli([
          "task",
          "run",
          "status",
          taskId,
          "--run-id",
          later.invocation.run_id,
          "--json",
          "--root",
          root,
        ]),
      ).toBe(0);
      expect(JSON.parse(explicitIo.stdout)).toMatchObject({
        run_id: later.invocation.run_id,
        status: "prepared",
        active_claim_present: true,
        active_claim_selected_run: false,
        active_claim: { run_id: claim.run_id, owner_status: "stale" },
        claimed_run_authority: "terminal",
        execution_blocked: true,
        next_safe_action: "task_run_reconcile",
      });
    } finally {
      explicitIo.restore();
    }
  });

  it("reports a retained terminal claim reached while following logs and exits nonzero", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Follow logs into retained terminal state");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-follow-retained-terminal",
    });
    await writeRunnerRunState({
      state_path: prepared.invocation.state_path,
      state: evolveRunnerRunState({
        state: prepared.state,
        status: "running",
        updated_at: new Date().toISOString(),
      }),
    });
    const owner = await readObservedProcessIdentity(process.pid);
    expect(owner?.command).toBeTruthy();
    expect(owner?.started_at).toBeTruthy();
    await writeActiveClaim(root, {
      ...staleClaim({ task_id: taskId, run_id: prepared.invocation.run_id }),
      claimed_at: new Date().toISOString(),
      owner_pid: process.pid,
      owner_command: owner!.command!,
      owner_started_at: owner!.started_at!,
    });

    const io = captureStdIO();
    try {
      const following = runCli([
        "task",
        "run",
        "logs",
        taskId,
        "--run-id",
        prepared.invocation.run_id,
        "--stream",
        "events",
        "--follow",
        "--root",
        root,
      ]);
      await delay(100);
      await writeTerminalSuccess(prepared, "terminal result with retained claim");
      await expect(following).resolves.toBe(1);
      expect(io.stderr).toContain("TaskData projection is pending");
      expect(io.stderr).toContain("reconciliation is required");
    } finally {
      io.restore();
    }
  });
});
