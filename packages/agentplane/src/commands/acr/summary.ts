import type { AgentChangeRecord } from "@agentplaneorg/core/schemas";

export function summarizeAcr(record: AgentChangeRecord) {
  const nativeIdentity = (record.extensions?.["agentplane.native-identity"] ??
    record.extensions?.["agentplane.native_identity"]) as
    | {
        identity?: { plan?: { revision?: unknown; digest?: unknown }; digest?: unknown };
        review_identity?: { digest?: unknown } | null;
      }
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
    native_identity:
      typeof nativeIdentity?.identity?.digest === "string"
        ? {
            digest: nativeIdentity.identity.digest,
            plan_revision:
              typeof nativeIdentity.identity.plan?.revision === "number"
                ? nativeIdentity.identity.plan.revision
                : null,
            plan_digest:
              typeof nativeIdentity.identity.plan?.digest === "string"
                ? nativeIdentity.identity.plan.digest
                : null,
            review_digest:
              typeof nativeIdentity.review_identity?.digest === "string"
                ? nativeIdentity.review_identity.digest
                : null,
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
    ...(summary.native_identity
      ? [
          `Native identity: ${summary.native_identity.digest}`,
          `Plan: revision ${summary.native_identity.plan_revision ?? "unknown"}, ${summary.native_identity.plan_digest ?? "missing"}`,
          `Review identity: ${summary.native_identity.review_digest ?? "missing"}`,
        ]
      : []),
    `Digest: ${summary.record_digest}`,
    "",
  ].join("\n");
}
