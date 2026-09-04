import { execFile } from "node:child_process";
import { cp, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import { taskCentricAggregateFromExtensions } from "@agentplaneorg/core/tasks";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";
import { loadCommandContext } from "../commands/shared/task-backend.js";
import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();
const exec = promisify(execFile);

type Packet = {
  transition_id: string;
  state_fingerprint: string;
  authority: { role: string };
  exchange: { directory: string; result_path: string; resume_argv: string[] };
};

async function invoke(root: string, argv: string[]) {
  const io = captureStdIO();
  try {
    const code = await runCli([...argv, "--root", root]);
    return { code, stdout: io.stdout, stderr: io.stderr };
  } finally {
    io.restore();
  }
}

async function episode(root: string, taskId: string) {
  const response = await invoke(root, ["task", "advance", taskId, "--agent-json"]);
  expect(response.code, response.stderr).toBe(0);
  const packet = JSON.parse(response.stdout) as Packet;
  const order = JSON.parse(
    await readFile(path.join(packet.exchange.directory, "work-order.json"), "utf8"),
  ) as AgentWorkOrderV2;
  return { packet, order };
}

async function returnResult(
  root: string,
  taskId: string,
  current: Awaited<ReturnType<typeof episode>>,
  fields: Record<string, unknown> = {},
) {
  const { packet, order } = current;
  await writeFile(
    packet.exchange.result_path,
    JSON.stringify({
      schema_version: 1,
      kind: "agent_action_result",
      task_id: taskId,
      transition_id: packet.transition_id,
      state_fingerprint: packet.state_fingerprint,
      role: packet.authority.role,
      result: {
        schema_version: 2,
        kind: "agent_semantic_result",
        work_order_id: order.work_order_id,
        status: "completed",
        summary: "Verify the committed implementation with durable supervisor evidence.",
        findings: [],
        uncertainty: [],
        ...fields,
      },
    }),
  );
  return invoke(root, packet.exchange.resume_argv.slice(1));
}

describe("branch implementation clean verification", { timeout: 180_000 }, () => {
  it.each([false, true])(
    "preserves the implementation and rejects unrelated dirt: %s",
    async (foreign) => {
      const root = await mkGitRepoRootWithBranch("main");
      const git = async (...args: string[]) =>
        (await exec("git", args, { cwd: root })).stdout.trim();
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);
      expect(await runCliSilent(["branch", "base", "set", "main", "--root", root])).toBe(0);
      const created = await invoke(root, [
        "task",
        "new",
        "--title",
        "Clean verification fixture",
        "--description",
        "Preserve implementation provenance before clean checks.",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--verify",
        "bun run test:critical",
      ]);
      expect(created.code, created.stderr).toBe(0);
      const taskId = created.stdout.trim();
      await cp(
        path.join(process.cwd(), "packages/agentplane/assets/policy"),
        path.join(root, ".agentplane/policy"),
        { recursive: true },
      );
      await writeFile(
        path.join(root, ".gitignore"),
        `${await readFile(path.join(root, ".gitignore"), "utf8")}\n.agentplane/bin/\n.agentplane/cache.sqlite*\nagentplane-recipes\nnode_modules\npackages/\nwebsite/\n`,
      );
      await writeFile(
        path.join(root, "package.json"),
        JSON.stringify({
          scripts: {
            "test:critical":
              "node -e \"const c=require('node:child_process'); if(c.execFileSync('git',['status','--porcelain']).toString().trim()) process.exit(1); console.log('1 passed');\"",
          },
        }),
      );
      await git("add", ".agentplane", "package.json", ".gitignore");
      await git("commit", "-m", "test: seed clean-check fixture");
      const planning = await episode(root, taskId);
      const criterion = {
        id: "clean",
        description: "Checks see a clean checkout.",
        required: true,
        check_ids: ["check"],
      };
      const validation = {
        schema_version: 1,
        criteria: [criterion],
        checks: [
          {
            id: "check",
            kind: "deterministic",
            required: true,
            capability: "task.verify",
            command: "bun run test:critical",
          },
        ],
        evidence_fingerprint: planning.order.planning_context!.repository_snapshot.digest,
      };
      const planned = await returnResult(root, taskId, planning, {
        task_intent: {
          task_kind: "code",
          mutation_scope: "code",
          risk_flags: [],
          tags: ["code"],
          execution: {
            schema_version: 2,
            preferred_mode: "branch_pr",
            scope_roots: ["feature.ts"],
            repository_effects: ["repository_write", "source_code"],
            external_effects: [],
            requirements_uncertainty: "bounded",
            implementation_uncertainty: "bounded",
            reversibility: "reversible",
            rationale: ["Only the feature file may change."],
          },
        },
        task_plan_proposal: {
          schema_version: 1,
          task_id: taskId,
          planning_baseline: planning.order.planning_context!.repository_snapshot,
          work_items: {
            schema_version: 1,
            work_items: [
              {
                id: "feature",
                objective: "Implement the feature with clean verification.",
                depends_on: [],
                required_inputs: [],
                expected_outputs: ["feature"],
                scope_roots: ["feature.ts"],
                acceptance_criteria: [criterion],
                validation,
                context: {
                  required_sources: [],
                  optional_sources: [],
                  symbol_hints: [],
                  max_bytes: 65_536,
                },
                risk: "low",
                capabilities: ["task.verify"],
                resource_claims: [{ kind: "workspace", resource: ".", mode: "write" }],
                optional: false,
                priority: 1,
              },
            ],
          },
          assumptions: [],
          unresolved_questions: [],
          top_level_validation: validation,
        },
      });
      expect(planned.code, planned.stderr).toBe(0);
      expect(
        await runCliSilent(["task", "plan", "approve", taskId, "--by", "USER", "--root", root]),
      ).toBe(0);
      await git("add", ".agentplane");
      await git("commit", "-m", "test: persist approved plan");
      const implementation = await episode(root, taskId);
      const checkout = implementation.order.state_fingerprint.worktree;
      const checkoutGit = async (...args: string[]) =>
        (await exec("git", args, { cwd: checkout })).stdout.trim();
      await writeFile(path.join(checkout, "feature.ts"), "export const feature = true;\n");
      if (foreign) await writeFile(path.join(checkout, "unrelated.txt"), "must survive\n");
      const result = await returnResult(root, taskId, implementation);
      if (foreign) {
        expect(result.code).not.toBe(0);
        expect(await readFile(path.join(checkout, "unrelated.txt"), "utf8")).toBe("must survive\n");
        expect(await checkoutGit("ls-files", "unrelated.txt")).toBe("");
        return;
      }
      expect(result.code, result.stderr).toBe(0);
      const checks = JSON.parse(
        await readFile(
          path.join(checkout, `.agentplane/tasks/${taskId}/supervision/declared-checks.json`),
          "utf8",
        ),
      );
      expect(checks.checks).toHaveLength(1);
      expect(checks.checks[0]).toMatchObject({ command: "bun run test:critical", exit_code: 0 });
      const ctx = await loadCommandContext({ cwd: checkout, rootOverride: checkout });
      const task = await ctx.taskBackend.getTask(taskId);
      expect(taskCentricAggregateFromExtensions(task?.extensions)?.work_items.feature?.state).toBe(
        "COMPLETED",
      );
      const evidencePath = `.agentplane/tasks/${taskId}/supervision/implementation-evidence.json`;
      const evidence = JSON.parse(await readFile(path.join(checkout, evidencePath), "utf8")) as {
        implementation_commit: string;
      };
      expect(task?.commit).toMatchObject({ hash: evidence.implementation_commit });
      expect(await checkoutGit("show", `${evidence.implementation_commit}:feature.ts`)).toBe(
        "export const feature = true;",
      );
      expect(await checkoutGit("rev-parse", "HEAD")).not.toBe(evidence.implementation_commit);
      expect(await checkoutGit("show", `HEAD:${evidencePath}`)).toContain(
        evidence.implementation_commit,
      );
      expect(await checkoutGit("status", "--porcelain", "--", "feature.ts")).toBe("");
    },
  );
});
