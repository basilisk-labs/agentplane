import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { commitAll, mkGitRepoRootWithCommit, writeConfig } from "@agentplane/testkit";
import { AGENT_WORK_ORDER_V2_ZOD_SCHEMA } from "@agentplaneorg/core/schemas";
import { defaultConfig } from "./core-imports.js";
import { runJson } from "./task-create-planner-intent.testkit.js";
import { compactPlanInput } from "../commands/task/create-plan-input.testkit.js";

export async function createSuppliedCliTask(
  options: {
    requirePlanner?: boolean;
    missing?: boolean;
    unresolved?: boolean;
  } = {},
) {
  const root = await mkGitRepoRootWithCommit();
  const config = defaultConfig();
  config.agents.approvals.require_plan = true;
  if (options.requirePlanner) config.agents.approvals.require_planner = true;
  await writeConfig(root, config);
  const supplied = compactPlanInput();
  supplied.criteria[0]!.description = "result.txt contains the report";
  supplied.work_items[0]!.scope_roots = ["result.txt"];
  if (options.unresolved) Object.assign(supplied, { unresolved_questions: ["Which report?"] });
  await writeFile(path.join(root, "supplied.json"), JSON.stringify(supplied));
  await commitAll(root, "seed supplied CLI fixture");
  const created = await runJson(root, [
    "task",
    "create",
    "Produce a report",
    "--description",
    "Write the requested report",
    "--task-kind",
    "code",
    "--mutation-scope",
    "code",
    "--scope-root",
    "result.txt",
    "--repository-effect",
    "source_code",
    "--verify",
    "node --version",
    ...(options.missing ? [] : ["--plan-file", path.join(root, "supplied.json")]),
    "--json",
  ]);
  return { root, id: String(created.task_id) };
}

export async function readSuppliedCliOrder(packet: Record<string, unknown>) {
  const exchange = packet.exchange as { directory: string; result_path: string } | undefined;
  if (!exchange) throw new Error("Expected semantic exchange");
  const order = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
    JSON.parse(await readFile(path.join(exchange.directory, "work-order.json"), "utf8")),
  );
  return { exchange, order };
}
