import { runProcess } from "@agentplaneorg/core/process";

import { CliError } from "../../shared/errors.js";
import { normalizeGhTransportError, resolveGhCommand } from "../shared/gh-transport.js";
import { ghEnv } from "./internal/gh-api.js";
import {
  observeExistingChangeRequestByNumber,
  resolveChangeRequestIdentity,
} from "./internal/change-request-provider.js";
import type { RecordedGitHostIdentity } from "./internal/git-host-identity.js";
import { runGlabApiJson } from "./internal/glab-api.js";

type HostedCheckRow = { name?: string | null; state?: string | null };

type GitLabPipeline = {
  id?: number | null;
  project_id?: number | null;
  sha?: string | null;
  status?: string | null;
};

type GitLabJob = { name?: string | null; status?: string | null };

type GitLabProject = {
  only_allow_merge_if_pipeline_succeeds?: boolean | null;
};

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

function isFailingGhCheckState(state: string): boolean {
  return [
    "FAIL",
    "FAILED",
    "FAILURE",
    "ERROR",
    "TIMED_OUT",
    "CANCELED",
    "CANCELLED",
    "ACTION_REQUIRED",
  ].includes(state);
}

function isPassingGhCheckState(state: string): boolean {
  return ["SUCCESS", "SKIPPED", "NEUTRAL"].includes(state);
}

function summarizeHostedChecks(
  checks: HostedCheckRow[],
  requiredChecks: readonly string[] = [],
): Extract<HostedChecksSummary, { checked: true }> {
  const failing = checks.filter((check) =>
    isFailingGhCheckState((check.state ?? "").toUpperCase()),
  ).length;
  const passing = checks.filter((check) =>
    isPassingGhCheckState((check.state ?? "").toUpperCase()),
  ).length;
  const pending = checks.length - failing - passing;
  const names = new Set(checks.map((check) => (check.name ?? "").trim()).filter(Boolean));
  const missingRequired = requiredChecks
    .map((name) => name.trim())
    .filter((name) => name.length > 0 && !names.has(name));
  return {
    checked: true,
    total: checks.length,
    pending,
    failing,
    passing,
    missingRequired,
    rows: checks,
  };
}

export async function resolveHostedChecksStatus(opts: {
  gitRoot: string;
  prNumber: number | null;
  requiredChecks?: readonly string[];
  branch?: string | null;
  expectedHeadSha?: string | null;
  recordedProvider?: RecordedGitHostIdentity | null;
}): Promise<HostedChecksSummary> {
  if (opts.prNumber === null || opts.prNumber <= 0) {
    return {
      checked: false,
      reason: "Hosted change-request number is not recorded in PR metadata",
    };
  }
  const branch = opts.branch?.trim() ?? "";
  let githubRepo: string | null = null;
  if (branch) {
    try {
      const identity = await resolveChangeRequestIdentity({
        gitRoot: opts.gitRoot,
        branch,
        recorded: opts.recordedProvider,
      });
      if (identity.provider === "gitlab") {
        const project = encodeURIComponent(identity.targetProject);
        const pipelines = await runGlabApiJson<GitLabPipeline[]>({
          cwd: opts.gitRoot,
          hostname: identity.hostname,
          endpoint: `projects/${project}/merge_requests/${opts.prNumber}/pipelines`,
        });
        if (!Array.isArray(pipelines)) {
          return { checked: false, reason: "GitLab MR pipeline lookup returned invalid data" };
        }
        const expectedHeadSha = opts.expectedHeadSha?.trim() ?? "";
        const pipeline = pipelines.find(
          (candidate) => !expectedHeadSha || candidate.sha?.trim() === expectedHeadSha,
        );
        if (!pipeline || !Number.isInteger(pipeline.id) || Number(pipeline.id) <= 0) {
          const hasRequiredChecks = (opts.requiredChecks ?? []).some(
            (name) => name.trim().length > 0,
          );
          if (!hasRequiredChecks) {
            const projectPolicy = await runGlabApiJson<GitLabProject>({
              cwd: opts.gitRoot,
              hostname: identity.hostname,
              endpoint: `projects/${project}`,
            });
            if (projectPolicy.only_allow_merge_if_pipeline_succeeds === false) {
              return summarizeHostedChecks([
                { name: "GitLab pipeline not required", state: "SKIPPED" },
              ]);
            }
          }
          return {
            checked: false,
            reason: expectedHeadSha
              ? `GitLab has no MR pipeline for exact head ${expectedHeadSha}`
              : "GitLab MR has no pipeline",
          };
        }
        const projectId = Number(pipeline.project_id);
        const jobs = await runGlabApiJson<GitLabJob[]>({
          cwd: opts.gitRoot,
          hostname: identity.hostname,
          endpoint: `projects/${Number.isInteger(projectId) && projectId > 0 ? projectId : project}/pipelines/${pipeline.id}/jobs?per_page=100`,
        });
        const rows: HostedCheckRow[] = Array.isArray(jobs)
          ? jobs.map((job) => ({ name: job.name ?? null, state: job.status ?? null }))
          : [];
        if (rows.length === 0) {
          rows.push({ name: `GitLab pipeline #${pipeline.id}`, state: pipeline.status ?? null });
        }
        return summarizeHostedChecks(rows, opts.requiredChecks ?? []);
      }
      githubRepo = identity.targetProject;
      const expectedHeadSha = opts.expectedHeadSha?.trim() ?? "";
      if (expectedHeadSha) {
        const observation = await observeExistingChangeRequestByNumber({
          gitRoot: opts.gitRoot,
          branch,
          prNumber: opts.prNumber,
          identity,
        });
        if (observation.state !== "found") {
          return {
            checked: false,
            reason:
              observation.state === "unavailable"
                ? observation.reason
                : `GitHub PR #${opts.prNumber} was not found for ${branch}`,
          };
        }
        if (observation.pr.headSha !== expectedHeadSha) {
          return {
            checked: false,
            reason: `GitHub PR #${opts.prNumber} is not at exact head ${expectedHeadSha}`,
          };
        }
      }
    } catch (error) {
      return {
        checked: false,
        reason: error instanceof Error ? error.message : String(error),
      };
    }
  }
  const gh = resolveGhCommand();
  try {
    const result = await runProcess({
      command: gh.command,
      args: [
        ...gh.argsPrefix,
        "pr",
        "checks",
        String(opts.prNumber),
        ...(githubRepo ? ["--repo", githubRepo] : []),
        "--json",
        "name,state",
      ],
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
  branch?: string | null;
  expectedHeadSha?: string | null;
  recordedProvider?: RecordedGitHostIdentity | null;
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
      branch: opts.branch,
      expectedHeadSha: opts.expectedHeadSha,
      recordedProvider: opts.recordedProvider,
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

  const message = `${renderHostedCheckFailure(lastStatus)} after ${timeoutMs}ms`;
  if (!lastStatus.checked) {
    throw new CliError({
      code: "E_NETWORK",
      message,
      context: { reason_code: "hosted_checks_unavailable" },
    });
  }
  throw new CliError({
    code: "E_HANDOFF",
    message,
    context: { reason_code: "hosted_checks_pending" },
  });
}
