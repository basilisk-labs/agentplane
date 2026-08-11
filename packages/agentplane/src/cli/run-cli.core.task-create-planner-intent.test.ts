import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  writeConfig,
} from "@agentplane/testkit";

import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();

type AgentPacket = {
  task_id: string;
  transition_id: string;
  state_fingerprint: string;
  action: { kind: string; instruction: string };
  exchange?: {
    directory: string;
    work_order_ref: string;
    result_ref: string;
  };
};

async function runJson(root: string, argv: string[]): Promise<Record<string, unknown>> {
  const io = captureStdIO();
  try {
    const code = await runCli([...argv, "--root", root]);
    expect(code, io.stderr).toBe(0);
    return JSON.parse(io.stdout) as Record<string, unknown>;
  } finally {
    io.restore();
  }
}

async function writePlannerResult(opts: {
  packet: AgentPacket;
  summary: string;
  includeIntent: boolean;
}): Promise<string> {
  const exchange = opts.packet.exchange;
  if (!exchange) throw new Error("expected external-agent exchange");
  const workOrder = JSON.parse(
    await readFile(path.join(exchange.directory, exchange.work_order_ref), "utf8"),
  ) as { work_order_id: string; role: string };
  const resultPath = path.join(exchange.directory, exchange.result_ref);
  await writeFile(
    resultPath,
    `${JSON.stringify(
      {
        schema_version: 1,
        kind: "agent_action_result",
        task_id: opts.packet.task_id,
        transition_id: opts.packet.transition_id,
        state_fingerprint: opts.packet.state_fingerprint,
        role: workOrder.role,
        result: {
          schema_version: 2,
          kind: "agent_semantic_result",
          work_order_id: workOrder.work_order_id,
          status: "completed",
          summary: opts.summary,
          findings: [],
          uncertainty: [],
          ...(opts.includeIntent
            ? {
                task_intent: {
                  task_kind: "code",
                  mutation_scope: "code",
                  risk_flags: [],
                  tags: ["cli", "parser"],
                },
              }
            : {}),
        },
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  return resultPath;
}

describe("task create planner intent", { timeout: 60_000 }, () => {
  it("preserves a reusable envelope and re-resolves the route from typed intent", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const created = await runJson(root, [
      "task",
      "create",
      "Исправить разбор конфигурации CLI",
      "--description",
      "Пользовательский запрос не должен классифицироваться проверкой слов.",
      "--route",
      "auto",
      "--verify",
      "bun run test:critical",
      "--json",
    ]);
    const taskId = created.task_id as string;
    const issued = (await runJson(root, [
      "task",
      "advance",
      taskId,
      "--agent-json",
    ])) as AgentPacket;
    expect(issued.action.instruction).toContain("result.task_intent");
    const plan = "1. Inspect the parser. 2. Implement the fix. 3. Run the declared checks.";

    const incompletePath = await writePlannerResult({
      packet: issued,
      summary: plan,
      includeIntent: false,
    });
    const incompleteIo = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "advance",
        taskId,
        "--result",
        incompletePath,
        "--agent-json",
        "--root",
        root,
      ]);
      expect(code).not.toBe(0);
      expect(incompleteIo.stderr).toContain("must include task_intent");
    } finally {
      incompleteIo.restore();
    }
    if (!issued.exchange) throw new Error("expected external-agent exchange");
    expect(
      JSON.parse(await readFile(path.join(issued.exchange.directory, "exchange.json"), "utf8")),
    ).toMatchObject({ status: "issued", result_digest: null });

    const resultPath = await writePlannerResult({
      packet: issued,
      summary: plan,
      includeIntent: true,
    });
    const accepted = await runJson(root, [
      "task",
      "advance",
      taskId,
      "--result",
      resultPath,
      "--agent-json",
    ]);
    expect((accepted.action as { kind: string }).kind).toBe("approval_required");
    const readme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(readme).toContain('task_kind: "code"');
    expect(readme).toContain('mutation_scope: "code"');
    expect(readme).toContain('requested_mode: "auto"');
    expect(readme).not.toContain("mutation_scope_unknown");
    const brief = await runJson(root, ["task", "brief", taskId, "--json"]);
    expect((brief.blueprint as { blueprint_id: string }).blueprint_id).toBe("code.branch_pr");
  });
});
