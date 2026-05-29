import type { HostedChecksSummary } from "./hosted-checks.js";
import type { PrFlowStatusReport } from "./flow-status.js";

type ReportRow = { label: string; value: string };
type RemotePrStatus = PrFlowStatusReport["pr"];
type CloseTailStatus = PrFlowStatusReport["closeTail"];
type ReviewThreadsStatus = PrFlowStatusReport["reviewThreads"];
type QueueStatus = PrFlowStatusReport["queue"];
type HandoffStatus = PrFlowStatusReport["handoff"];

function shortSha(value: string | null | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  return trimmed ? trimmed.slice(0, 12) : null;
}

function renderHostedChecksLine(status: HostedChecksSummary): string {
  if (!status.checked) return `unchecked: ${status.reason}`;
  return `total=${status.total} passing=${status.passing} pending=${status.pending} failing=${status.failing}`;
}

function renderReviewThreadsLine(status: ReviewThreadsStatus): string {
  if (!status.checked) return `unchecked: ${status.reason}`;
  return `unresolved=${status.unresolved}`;
}

function renderQueueLine(status: QueueStatus): string {
  if (!status.present) return "not_queued";
  return `${status.status}${status.reason ? `: ${status.reason}` : ""}`;
}

function renderHandoffLine(status: HandoffStatus): string {
  if (!status.present) return "none";
  return `${status.routeStatus ?? "recorded"}: ${status.reason}`;
}

function renderPrLine(pr: RemotePrStatus): string {
  if (pr.state === "not_found") return `github: not_found (source=${pr.source})`;
  const number = pr.prNumber ? `#${pr.prNumber}` : "no-number";
  const url = pr.prUrl ? ` ${pr.prUrl}` : "";
  return `github: ${pr.state} ${number}${url} (source=${pr.source})`;
}

function renderCloseTailLine(closeTail: CloseTailStatus): string {
  if (closeTail.state === "not_applicable") return `not_applicable: ${closeTail.reason}`;
  if (closeTail.state === "recorded_on_base") return `recorded_on_base: ${closeTail.base}`;
  const number = closeTail.prNumber ? ` #${closeTail.prNumber}` : "";
  const url = closeTail.prUrl ? ` ${closeTail.prUrl}` : "";
  return `${closeTail.state}: ${closeTail.branch}${number}${url}`;
}

export function renderPrFlowStatusRows(report: PrFlowStatusReport): ReportRow[] {
  return [
    { label: "task", value: `${report.task.id} ${report.task.status}` },
    { label: "verification", value: report.task.verification ?? "pending" },
    { label: "branch", value: report.branch.name ?? "missing" },
    { label: "branch_head", value: shortSha(report.branch.headSha) ?? "unknown" },
    { label: "meta_head", value: shortSha(report.branch.metaHeadSha) ?? "unknown" },
    { label: "remote_pr", value: renderPrLine(report.pr) },
    { label: "hosted_checks", value: renderHostedChecksLine(report.hostedChecks) },
    { label: "review_threads", value: renderReviewThreadsLine(report.reviewThreads) },
    { label: "queue", value: renderQueueLine(report.queue) },
    { label: "handoff", value: renderHandoffLine(report.handoff) },
    { label: "close_tail", value: renderCloseTailLine(report.closeTail) },
    { label: "next", value: report.nextAction },
  ];
}
