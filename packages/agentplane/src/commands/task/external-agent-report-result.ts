import path from "node:path";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import { canonicalizeJson } from "@agentplaneorg/core/tasks";
import { CliError } from "../../shared/errors.js";
import { readContainedStableTextNoFollow } from "../../shared/contained-stable-file.js";
import { writeTextIfChanged } from "../../shared/write-if-changed.js";
import { authorityPath, pathAllowed } from "./external-agent-conflict-application.js";
import {
  externalAgentResultDigest,
  type ExternalAgentExchange,
} from "./external-agent-exchange.js";

type ReportResultContext = {
  exchange: ExternalAgentExchange;
  work_order: AgentWorkOrderV2;
};

export function externalReportResultPath(opts: ReportResultContext): string | null {
  const { exchange, work_order: order } = opts;
  const result = exchange.result;
  if (
    !["implementation", "implementation_rework"].includes(exchange.purpose) ||
    !order.task.work_item_id ||
    result?.result.status !== "completed" ||
    result.result.plan_refinement ||
    result.result.work_order_id !== order.work_order_id ||
    exchange.work_order_id !== order.work_order_id ||
    exchange.task_id !== order.task.id ||
    !/^sha256:[a-f0-9]{64}$/u.test(exchange.result_digest ?? "") ||
    externalAgentResultDigest(result) !== exchange.result_digest
  )
    return null;
  const taskRoot = `.agentplane/tasks/${exchange.task_id}`;
  const roots = order.authority.writable_roots.map((root) =>
    authorityPath(root, exchange.checkout),
  );
  const outputs = order.required_outputs.filter((output) => output.kind !== "semantic_result");
  if (
    !roots.includes(taskRoot) ||
    !roots.every((root) => root !== null && pathAllowed(root, [taskRoot])) ||
    !outputs.some((output) => output.required && output.kind === "report") ||
    outputs.some((output) => output.kind !== "report")
  )
    return null;
  return `${taskRoot}/semantic-report-${exchange.result_digest!.slice(7)}.json`;
}

export async function materializeExternalReportResult(
  opts: ReportResultContext & { changed_paths: readonly string[] },
): Promise<string[]> {
  const relative = externalReportResultPath(opts);
  if (!relative) return [...opts.changed_paths];
  if (opts.changed_paths.some((entry) => entry !== relative)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Report-only result changed unrelated paths.",
    });
  }
  const target = path.join(opts.exchange.checkout, relative);
  const content = `${JSON.stringify(canonicalizeJson(opts.exchange.result), null, 2)}\n`;
  const assertReportIdentity = async () => {
    let existing: string;
    try {
      existing = await readContainedStableTextNoFollow({
        repository_root: opts.exchange.checkout,
        file_path: target,
        label: "semantic report",
        max_bytes: 256 * 1024 * 1024,
      });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return;
      throw error;
    }
    if (existing !== content) {
      throw new CliError({
        code: "E_VALIDATION",
        message: "Semantic report differs from the accepted result.",
      });
    }
  };
  await assertReportIdentity();
  await writeTextIfChanged(target, content, {
    containedRoot: opts.exchange.checkout,
    label: "semantic report",
    beforePublication: assertReportIdentity,
  });
  return [relative];
}
