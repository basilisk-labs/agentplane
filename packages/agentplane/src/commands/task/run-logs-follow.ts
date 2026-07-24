import { performance } from "node:perf_hooks";

import type { CliEmitter } from "../../cli/output.js";
import type { LoadedTaskRunnerInspection } from "../../runner/usecases/task-run-inspect.js";
import type { TaskRunLogsParsed } from "./run-parse.js";
import {
  isTerminalRunnerStatus,
  loadRunnerLogText,
  renderRunnerStatusPayload,
  runnerReconciliationWarning,
} from "./run-render.js";

const PREPARED_FOLLOW_TIMEOUT_MS = 30_000;
const FOLLOW_POLL_INTERVAL_MS = 1000;
const TERMINAL_CLAIM_SETTLE_TIMEOUT_MS = 1000;
const TERMINAL_CLAIM_POLL_INTERVAL_MS = 100;

type FollowRunnerLogsDependencies = {
  wait: (ms: number) => Promise<void>;
  monotonic_now: () => number;
  load_log_text: typeof loadRunnerLogText;
  render_status: typeof renderRunnerStatusPayload;
};

type FollowRunnerLogsOptions = {
  initial_inspection: LoadedTaskRunnerInspection;
  stream: TaskRunLogsParsed["stream"];
  emitted_chars: number;
  output: Pick<CliEmitter, "lines" | "warn">;
  reload: (runId: string) => Promise<LoadedTaskRunnerInspection>;
  prepared_timeout_ms?: number;
  poll_interval_ms?: number;
  terminal_claim_settle_timeout_ms?: number;
  terminal_claim_poll_interval_ms?: number;
  dependencies?: Partial<FollowRunnerLogsDependencies>;
};

function defaultWait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function authorityWarning(inspection: LoadedTaskRunnerInspection): string | null {
  const claim = inspection.active_claim;
  if (!claim) {
    return `task runner run ${inspection.run_id} has no active claim while ${inspection.state.status}; refusing to follow without execution authority.`;
  }
  if (claim.run_id !== inspection.run_id) {
    return (
      `task runner run ${inspection.run_id} is not the claimed run ` +
      `(${claim.run_id}); refusing to follow ambiguous execution authority.`
    );
  }
  if (inspection.active_claim_owner_status !== "active") {
    return (
      `task runner run ${inspection.run_id} claim owner is ` +
      `${inspection.active_claim_owner_status ?? "unknown"}; refusing to follow unverified execution authority.`
    );
  }
  return null;
}

async function reloadAndEmit(opts: {
  inspection: LoadedTaskRunnerInspection;
  stream: TaskRunLogsParsed["stream"];
  emitted_chars: number;
  output: Pick<CliEmitter, "lines">;
  reload: FollowRunnerLogsOptions["reload"];
  load_log_text: typeof loadRunnerLogText;
}): Promise<{ inspection: LoadedTaskRunnerInspection; emitted_chars: number }> {
  const inspection = await opts.reload(opts.inspection.run_id);
  const text = await opts.load_log_text(inspection, opts.stream);
  if (text.length <= opts.emitted_chars) {
    return { inspection, emitted_chars: opts.emitted_chars };
  }
  opts.output.lines(
    text
      .slice(opts.emitted_chars)
      .replaceAll("\r\n", "\n")
      .split("\n")
      .filter((line) => line.length > 0),
  );
  return { inspection, emitted_chars: text.length };
}

export async function followRunnerLogs(opts: FollowRunnerLogsOptions): Promise<number> {
  const wait = opts.dependencies?.wait ?? defaultWait;
  const monotonicNow = opts.dependencies?.monotonic_now ?? (() => performance.now());
  const loadLogText = opts.dependencies?.load_log_text ?? loadRunnerLogText;
  const renderStatus = opts.dependencies?.render_status ?? renderRunnerStatusPayload;
  const pollIntervalMs = opts.poll_interval_ms ?? FOLLOW_POLL_INTERVAL_MS;
  let inspection = opts.initial_inspection;
  let emittedChars = opts.emitted_chars;

  if (inspection.state.status === "prepared" && inspection.state.mode === "dry_run") {
    opts.output.warn(
      `task runner run ${inspection.run_id} is prepared in dry-run mode; nothing to follow until it is running.`,
      "stderr",
    );
    return 0;
  }

  const preparedDeadline =
    monotonicNow() + (opts.prepared_timeout_ms ?? PREPARED_FOLLOW_TIMEOUT_MS);
  while (inspection.state.status === "prepared") {
    const warning = authorityWarning(inspection);
    if (warning) {
      opts.output.warn(warning, "stderr");
      return 1;
    }
    const remainingMs = preparedDeadline - monotonicNow();
    if (remainingMs <= 0) {
      opts.output.warn(
        `task runner run ${inspection.run_id} remained prepared past the bounded follow wait; refusing to assume it started.`,
        "stderr",
      );
      return 1;
    }
    await wait(Math.min(pollIntervalMs, remainingMs));
    ({ inspection, emitted_chars: emittedChars } = await reloadAndEmit({
      inspection,
      stream: opts.stream,
      emitted_chars: emittedChars,
      output: opts.output,
      reload: opts.reload,
      load_log_text: loadLogText,
    }));
  }

  while (inspection.state.status === "running") {
    const warning = authorityWarning(inspection);
    if (warning) {
      opts.output.warn(warning, "stderr");
      return 1;
    }
    await wait(pollIntervalMs);
    ({ inspection, emitted_chars: emittedChars } = await reloadAndEmit({
      inspection,
      stream: opts.stream,
      emitted_chars: emittedChars,
      output: opts.output,
      reload: opts.reload,
      load_log_text: loadLogText,
    }));
  }

  if (!isTerminalRunnerStatus(inspection.state.status)) {
    opts.output.warn(
      `task runner run ${inspection.run_id} entered unsupported state ${inspection.state.status}; refusing to infer completion.`,
      "stderr",
    );
    return 1;
  }

  const claimDeadline =
    monotonicNow() + (opts.terminal_claim_settle_timeout_ms ?? TERMINAL_CLAIM_SETTLE_TIMEOUT_MS);
  for (;;) {
    const payload = await renderStatus(inspection);
    if (!payload.active_claim_retained || payload.active_claim?.owner_status !== "active") break;
    const remainingMs = claimDeadline - monotonicNow();
    if (remainingMs <= 0) break;
    await wait(
      Math.min(
        opts.terminal_claim_poll_interval_ms ?? TERMINAL_CLAIM_POLL_INTERVAL_MS,
        remainingMs,
      ),
    );
    ({ inspection, emitted_chars: emittedChars } = await reloadAndEmit({
      inspection,
      stream: opts.stream,
      emitted_chars: emittedChars,
      output: opts.output,
      reload: opts.reload,
      load_log_text: loadLogText,
    }));
  }
  const terminalPayload = await renderStatus(inspection);
  const terminalWarning = runnerReconciliationWarning(terminalPayload);
  if (terminalWarning) opts.output.warn(terminalWarning, "stderr");
  return inspection.state.status === "success" && !terminalWarning ? 0 : 1;
}
