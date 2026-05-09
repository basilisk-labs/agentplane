import type { AgentChangeRecord } from "@agentplaneorg/core/schemas";

export function summarizeAcr(record: AgentChangeRecord) {
  const blueprint = record.extensions?.["agentplane.blueprint"] as
    | { blueprint_id?: unknown; route?: unknown }
    | undefined;
  return {
    task_id: record.task.task_id,
    title: record.task.title,
    agent: `${record.agent.name}${record.agent.model ? ` / ${record.agent.model.provider} / ${record.agent.model.name}` : ""}`,
    plan: record.plan.status,
    work_range: `${record.repository.base_commit}..${record.repository.work_commit}`,
    policy: {
      pass: record.policy.decisions.filter((item) => item.decision === "pass").length,
      fail: record.policy.decisions.filter((item) => item.decision === "fail").length,
      warning: record.policy.decisions.filter((item) => item.decision === "warning").length,
      manual_override: record.policy.decisions.filter((item) => item.decision === "manual_override")
        .length,
    },
    verification: record.verification.status,
    merge_ready: record.result.merge_ready,
    blueprint:
      typeof blueprint?.blueprint_id === "string"
        ? {
            id: blueprint.blueprint_id,
            route: Array.isArray(blueprint.route)
              ? blueprint.route.filter((item): item is string => typeof item === "string")
              : [],
          }
        : null,
    record_digest: record.integrity.record_digest,
  };
}

export function renderAcrSummary(summary: ReturnType<typeof summarizeAcr>): string {
  return [
    "Agent Change Record",
    `Task: ${summary.task_id}`,
    `Title: ${summary.title}`,
    `Agent: ${summary.agent}`,
    `Plan: ${summary.plan}`,
    `Work range: ${summary.work_range}`,
    `Policy: ${summary.policy.pass} pass, ${summary.policy.fail} fail, ${summary.policy.warning} warning, ${summary.policy.manual_override} manual override`,
    `Verification: ${summary.verification}`,
    `Merge ready: ${summary.merge_ready ? "yes" : "no"}`,
    ...(summary.blueprint
      ? [
          `Blueprint: ${summary.blueprint.id}`,
          `Blueprint route: ${summary.blueprint.route.join(" -> ")}`,
        ]
      : []),
    `Digest: ${summary.record_digest}`,
    "",
  ].join("\n");
}
