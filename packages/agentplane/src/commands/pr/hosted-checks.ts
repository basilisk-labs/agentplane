import { runProcess } from "@agentplaneorg/core/process";

import { CliError } from "../../shared/errors.js";
import { normalizeGhTransportError } from "../shared/gh-transport.js";
import { ghEnv } from "./internal/gh-api.js";

type HostedCheckRow = { name?: string | null; state?: string | null };

export type HostedChecksSummary =
  | {
      checked: true;
      total: number;
      pending: number;
      failing: number;
      passing: number;
      missingRequired: string[];
      rows: HostedCheckRow[];
    }
  | { checked: false; reason: string };

const DEFAULT_HOSTED_POLL_INTERVAL_MS = 5000;
const DEFAULT_HOSTED_TIMEOUT_MS = 10 * 60 * 1000;

function sleep(ms: number): Promise<void> {
  return ms <= 0 ? Promise.resolve() : new Promise((resolve) => setTimeout(resolve, ms));
}

function parseGhPrChecks(stdout: string): HostedCheckRow[] {
  const rows = JSON.parse(stdout) as HostedCheckRow[];
  return Array.isArray(rows) ? rows : [];
}

function isPendingGhCheckState(state: string): boolean {
  return ["PENDING", "QUEUED", "IN_PROGRESS", "WAITING", "REQUESTED", "EXPECTED"].includes(state);
}

function isFailingGhCheckState(state: string): boolean {
  return ["FAIL", "FAILURE", "ERROR", "TIMED_OUT", "CANCELLED", "ACTION_REQUIRED"].includes(state);
}

function summarizeHostedChecks(
  checks: HostedCheckRow[],
  requiredChecks: readonly string[] = [],
): Extract<HostedChecksSummary, { checked: true }> {
  const pending = checks.filter((check) =>
    isPendingGhCheckState((check.state ?? "").toUpperCase()),
  ).length;
  const failing = checks.filter((check) =>
    isFailingGhCheckState((check.state ?? "").toUpperCase()),
  ).length;
  const names = new Set(checks.map((check) => (check.name ?? "").trim()).filter(Boolean));
  const missingRequired = requiredChecks
    .map((name) => name.trim())
    .filter((name) => name.length > 0 && !names.has(name));
  return {
    checked: true,
    total: checks.length,
    pending,
    failing,
    passing: Math.max(0, checks.length - pending - failing),
    missingRequired,
    rows: checks,
  };
}

export async function resolveHostedChecksStatus(opts: {
  gitRoot: string;
  prNumber: number | null;
  requiredChecks?: readonly string[];
}): Promise<HostedChecksSummary> {
  if (opts.prNumber === null || opts.prNumber <= 0) {
    return { checked: false, reason: "GitHub PR number is not recorded in PR metadata" };
  }
  try {
    const result = await runProcess({
      command: "gh",
      args: ["pr", "checks", String(opts.prNumber), "--json", "name,state"],
      cwd: opts.gitRoot,
      env: ghEnv(),
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
      reject: false,
    });
    if (result.exitCode === 0 || result.exitCode === 8) {
      return summarizeHostedChecks(
        parseGhPrChecks(String(result.stdout)),
        opts.requiredChecks ?? [],
      );
    }
    return { checked: false, reason: normalizeGhTransportError(result.stderr || result.stdout) };
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    return {
      checked: false,
      reason: code === "ENOENT" ? "gh CLI is unavailable" : normalizeGhTransportError(err),
    };
  }
}

function hostedChecksReady(
  status: HostedChecksSummary,
): status is Extract<HostedChecksSummary, { checked: true }> {
  return (
    status.checked &&
    status.total > 0 &&
    status.pending === 0 &&
    status.failing === 0 &&
    status.missingRequired.length === 0
  );
}

function hostedChecksFailed(status: HostedChecksSummary): boolean {
  return status.checked && status.failing > 0;
}

function renderHostedCheckFailure(status: HostedChecksSummary): string {
  if (!status.checked) return `hosted checks unavailable: ${status.reason}`;
  const missing =
    status.missingRequired.length > 0
      ? ` missing_required=${status.missingRequired.join(",")}`
      : "";
  return `hosted checks not ready: total=${status.total} passing=${status.passing} pending=${status.pending} failing=${status.failing}${missing}`;
}

export async function waitForHostedChecks(opts: {
  gitRoot: string;
  prNumber: number | null;
  stablePolls: number;
  pollIntervalMs?: number | null;
  timeoutMs?: number | null;
  requiredChecks?: readonly string[];
  quiet?: boolean;
}): Promise<Extract<HostedChecksSummary, { checked: true }>> {
  const stableTarget = Math.max(1, opts.stablePolls);
  const pollIntervalMs = opts.pollIntervalMs ?? DEFAULT_HOSTED_POLL_INTERVAL_MS;
  const timeoutMs = opts.timeoutMs ?? DEFAULT_HOSTED_TIMEOUT_MS;
  const startedAt = Date.now();
  let stableCount = 0;
  let lastStatus: HostedChecksSummary = { checked: false, reason: "not checked yet" };

  while (Date.now() - startedAt <= timeoutMs) {
    lastStatus = await resolveHostedChecksStatus({
      gitRoot: opts.gitRoot,
      prNumber: opts.prNumber,
      requiredChecks: opts.requiredChecks ?? [],
    });
    if (hostedChecksFailed(lastStatus)) {
      const message = renderHostedCheckFailure(lastStatus);
      if (!opts.quiet) process.stderr.write(`${message}\n`);
      throw new CliError({ code: "E_VALIDATION", message });
    }
    if (hostedChecksReady(lastStatus)) {
      stableCount += 1;
      if (!opts.quiet) {
        process.stderr.write(
          `hosted checks stable poll ${stableCount}/${stableTarget}: total=${lastStatus.total} passing=${lastStatus.passing}\n`,
        );
      }
      if (stableCount >= stableTarget) return lastStatus;
    } else {
      stableCount = 0;
      if (!opts.quiet) process.stderr.write(`${renderHostedCheckFailure(lastStatus)}\n`);
    }
    await sleep(Math.min(pollIntervalMs, Math.max(1, timeoutMs - (Date.now() - startedAt))));
  }

  throw new CliError({
    code: "E_VALIDATION",
    message: `${renderHostedCheckFailure(lastStatus)} after ${timeoutMs}ms`,
  });
}
