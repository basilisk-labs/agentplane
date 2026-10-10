import { appendFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { afterEach, describe, expect, it, vi } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";
import { AGENT_WORK_ORDER_V2_ZOD_SCHEMA } from "@agentplaneorg/core/schemas";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  commitAll,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";
import { runJson } from "../../cli/task-create-planner-intent.testkit.js";
import { ensureRuntimeGitignore } from "../../runtime/shared/runtime-gitignore.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { createKernelRuntime } from "./kernel-runtime-context.js";
import { requireKernelReportOnlyCompletion } from "./kernel-report-only-completion.js";
import { recoverKernelOperationalProjection } from "./kernel-operational-projection-recovery.js";

function packetMessage(packet: Record<string, unknown>): string {
  const action = packet.action as Record<string, unknown>;
  return JSON.stringify({
    kind: action.kind,
    reason: action.reason,
    summary: action.summary,
    detail: action.detail,
  });
}

installRunCliIntegrationHarness();
afterEach(() => vi.restoreAllMocks());

describe("report-only canonical completion", { timeout: 180_000 }, () => {
  it.each(["ops", "code"])(
    "completes %s report outputs without a source commit and survives restart",
    async (taskKind) => {
      const root = await mkGitRepoRootWithBranch("main");
      await configureGitUser(root);
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);
      await writeFile(
        path.join(root, "package.json"),
        JSON.stringify({ scripts: { test: "node --version" } }),
      );
      await writeFile(
        path.join(root, "verify-report.cjs"),
        "require('node:assert/strict').equal(JSON.parse(require('node:fs').readFileSync('.agentplane/tmp/report.json', 'utf8')).summary, 'Reviewed current repository');",
      );
      await ensureRuntimeGitignore({ gitRoot: root });
      // Linked-worktree bootstrap installs test runtime support outside the task's source scope.
      await appendFile(
        path.join(root, ".gitignore"),
        "\n.agentplane/bin\n.agentplane/cache.sqlite*\nnode_modules\npackages/agentplane/bin\npackages/agentplane/dist\npackages/agentplane/package.json\npackages/core/dist\npackages/core/package.json\npackages/recipes/dist\npackages/recipes/package.json\n",
      );
      await writeFile(path.join(root, "source with spaces.ts"), "export const fixture = true;\n");
      await commitAll(root, "report fixture");
      const created = await runJson(root, [
        "task",
        "create",
        "Review repository report",
        "--route",
        "branch_pr",
        "--task-kind",
        taskKind,
        "--mutation-scope",
        taskKind,
        ...(taskKind === "ops" ? ["--risk", "security"] : []),
        "--scope-root",
        ".agentplane/tmp/report.json",
        "--repository-effect",
        "source_code",
        "--capability",
        "repository_write",
        "--json",
      ]);
      const id = String(created.task_id);
      let cwd = root;
      let packet = await runJson(cwd, ["task", "advance", id, "--agent-json"]);
      const followCheckout = async () => {
        const action = packet.action as { must_run_from?: string };
        if (action.must_run_from) {
          cwd = action.must_run_from;
          packet = await runJson(cwd, ["task", "advance", id, "--agent-json"]);
        }
      };
      await followCheckout();
      const submit = async (fields: Record<string, unknown>) => {
        expect(packet.action, packetMessage(packet)).toMatchObject({
          kind: "agent_episode",
        });
        const exchange = packet.exchange as { directory: string; result_path: string };
        const order = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
          JSON.parse(await readFile(path.join(exchange.directory, "work-order.json"), "utf8")),
        );
        await writeFile(
          exchange.result_path,
          JSON.stringify({
            work_order_id: order.work_order_id,
            status: "completed",
            summary: "Reviewed report",
            findings: [],
            uncertainty: [],
            ...fields,
          }),
        );
        packet = await runJson(cwd, [
          "task",
          "advance",
          id,
          "--result",
          exchange.result_path,
          "--agent-json",
        ]);
        return { exchange, order };
      };
      await submit({
        canonical_plan: {
          work_items: [
            {
              id: "report",
              depends_on: [],
              required_inputs: [],
              expected_outputs: ["report"],
              optional: false,
              execution_requirements: {
                scope_roots: [".agentplane/tmp/report.json"],
                repository_effects: ["source_code"],
                external_effects: [],
                capabilities: ["repository_write"],
                resources: [],
              },
              contract: {
                role: "EXECUTOR",
                objective: "Produce a report",
                acceptance_criteria: ["Report inspected"],
                verification_commands:
                  taskKind === "code" ? ["node verify-report.cjs"] : ["node --version"],
              },
            },
          ],
        },
      });
      expect(packet.action, packetMessage(packet)).toMatchObject({
        kind: "approval_required",
      });
      expect(
        await runCliSilent(["task", "plan", "approve", id, "--by", "USER", "--root", cwd]),
      ).toBe(0);
      packet = await runJson(cwd, ["task", "advance", id, "--agent-json"]);
      await followCheckout();
      const initialHead = execFileSync("git", ["rev-parse", "HEAD"], {
        cwd,
        encoding: "utf8",
      }).trim();
      const output = { summary: "Reviewed current repository" };
      if (taskKind === "code") {
        await mkdir(path.join(cwd, ".agentplane/tmp"), { recursive: true });
        await writeFile(path.join(cwd, ".agentplane/tmp/report.json"), JSON.stringify(output));
      }
      const implementation = await submit({
        canonical_outputs: [{ id: "report", kind: "report", digest: k.kernelDigest(output) }],
      });
      const inspection = await submit({
        findings: ["The report satisfies its contract and native checks passed."],
        review: { verdict: "pass", missing_tests: [], hidden_assumptions: [], residual_risks: [] },
      });
      expect(packet.action, packetMessage(packet)).toMatchObject({
        kind: "terminal",
        reason: "kernel_task_completed",
      });
      expect(execFileSync("git", ["rev-parse", "HEAD"], { cwd, encoding: "utf8" }).trim()).toBe(
        initialHead,
      );
      packet = await runJson(cwd, ["task", "advance", id, "--agent-json"]);
      expect(packet.action, packetMessage(packet)).toMatchObject({
        kind: "terminal",
        reason: "kernel_task_completed",
      });
      const command = await loadCommandContext({ cwd, rootOverride: cwd });
      const runtime = await createKernelRuntime({
        command,
        task_id: id,
        transport: "host",
        operation_id: "report-restart",
      });
      const read = await runtime.adapter.read(id);
      if (read.kind !== "canonical") throw new Error("Missing report task");
      expect(read.record.aggregate.final_validation?.status).toBe("PASSED");
      expect(read.task.commit).toBeFalsy();
      expect(read.task.status).toBe("DONE");
      expect(read.task.execution_route?.repository_mode).toBe("branch_pr");
      const plan = read.record.aggregate.current_plan!;
      const incomplete = {
        ...read.record,
        aggregate: {
          ...read.record.aggregate,
          current_plan: {
            ...plan,
            work_items: [...plan.work_items, { ...plan.work_items[0]!, id: "missing-required" }],
          },
        },
      };
      expect(
        await recoverKernelOperationalProjection(command, incomplete, read.task),
      ).toMatchObject({ kind: "stop" });
      await expect(
        requireKernelReportOnlyCompletion(
          command,
          read.record,
          vi.fn().mockResolvedValue({
            implementation: {
              canonical_outputs: [
                { id: "report", kind: "report" },
                { id: "source", kind: "source" },
              ],
            },
            order: { state_fingerprint: { git_head: initialHead } },
          }),
        ),
      ).rejects.toThrow("report or artifact outputs");
      const resultPath = path.join(implementation.exchange.directory, "received-result.json");
      const resultText = await readFile(resultPath, "utf8");
      const changedResult = JSON.parse(resultText) as { canonical_outputs: { digest: string }[] };
      changedResult.canonical_outputs[0]!.digest = k.kernelDigest("changed output");
      await writeFile(resultPath, JSON.stringify(changedResult));
      expect(
        await recoverKernelOperationalProjection(command, read.record, read.task),
      ).toMatchObject({ kind: "stop" });
      await writeFile(resultPath, resultText);
      const moved = `.agentplane/tasks/${id}/moved report.ts`;
      execFileSync("git", ["mv", "source with spaces.ts", moved], { cwd });
      expect(
        execFileSync("git", ["status", "--porcelain", "--untracked-files=all"], {
          cwd,
          encoding: "utf8",
        }),
      ).toContain("R ");
      expect(
        await recoverKernelOperationalProjection(command, read.record, read.task),
      ).toMatchObject({
        kind: "stop",
        action: {
          detail: "Report completion requires unchanged source and task-only metadata changes",
        },
      });
      execFileSync("git", ["restore", "--staged", "--", "source with spaces.ts", moved], { cwd });
      execFileSync("git", ["restore", "--", "source with spaces.ts"], { cwd });
      await rm(path.join(cwd, moved));
      if (process.platform !== "win32") {
        const deceptive = path.join(cwd, `.agentplane\\tasks\\${id}\\outside.ts`);
        await writeFile(deceptive, "unreviewed source");
        expect(
          await recoverKernelOperationalProjection(command, read.record, read.task),
        ).toMatchObject({
          kind: "stop",
          action: {
            detail: "Report completion requires unchanged source and task-only metadata changes",
          },
        });
        await rm(deceptive);
      }
      const validationPath = path.join(inspection.exchange.directory, "validation.json");
      const validationText = await readFile(validationPath, "utf8");
      await writeFile(
        validationPath,
        JSON.stringify({
          ...(JSON.parse(validationText) as Record<string, unknown>),
          review_digest: k.kernelDigest("tampered"),
        }),
      );
      expect(
        await recoverKernelOperationalProjection(command, read.record, read.task),
      ).toMatchObject({ kind: "stop" });
      await writeFile(validationPath, validationText);
      await writeFile(path.join(cwd, "unreviewed.txt"), "unreviewed");
      expect(
        await recoverKernelOperationalProjection(command, read.record, read.task),
      ).toMatchObject({ kind: "stop" });
      execFileSync("git", ["add", "unreviewed.txt"], { cwd });
      execFileSync("git", ["-c", "core.hooksPath=/dev/null", "commit", "-m", "unreviewed source"], {
        cwd,
      });
      expect(
        await recoverKernelOperationalProjection(command, read.record, read.task),
      ).toMatchObject({
        kind: "stop",
        action: { detail: "Report completion repository differs from its retained inspection" },
      });
    },
  );
});
