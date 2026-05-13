import { execFile } from "node:child_process";
import { promisify } from "node:util";

import {
  GH_LOOKUP_BASE_DELAY_MS,
  GH_LOOKUP_MAX_ATTEMPTS,
  normalizeGhTransportError,
  withGhTransportRetry,
} from "./lib/gh-transport.mjs";

const execFileAsync = promisify(execFile);

const DEFAULT_MAX_ATTEMPTS = 60;
const DEFAULT_INTERVAL_MS = 5000;
const DEFAULT_STABLE_POLLS = 2;

const IGNORED_LEGACY_FLAGS = new Set(["--watch", "--required", "--fail-fast"]);

function usage() {
  process.stdout.write(
    [
      "Usage: bun run workflow:wait-remote-checks -- [<number>|<url>|<branch>]... [--repo <owner/name>]",
      "",
      "Wait for required GitHub PR checks before integrate/finish in branch_pr workflow.",
      "This command polls PR check state with bounded retries and explicit status output.",
      "Pass one or more PR targets; they are resolved and waited in input order.",
      "",
      "Examples:",
      "  bun run workflow:wait-remote-checks",
      "  bun run workflow:wait-remote-checks -- task/202603241919-QVGXZ5/remote-check-wait",
      "  bun run workflow:wait-remote-checks -- 123 --repo basilisk-labs/agentplane",
      "  bun run workflow:wait-remote-checks -- 123 456 --repo basilisk-labs/agentplane",
    ].join("\n"),
  );
}

function parsePositiveInteger(value, fallback) {
  if (typeof value !== "string" || value.trim().length === 0) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function parseNonNegativeInteger(value, fallback) {
  if (typeof value !== "string" || value.trim().length === 0) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : fallback;
}

function parseArgs(argv) {
  const options = {
    help: false,
    repo: null,
    targetArgs: [],
    intervalMs: parseNonNegativeInteger(
      process.env.AGENTPLANE_REMOTE_CHECK_INTERVAL_MS,
      DEFAULT_INTERVAL_MS,
    ),
    maxAttempts: parsePositiveInteger(
      process.env.AGENTPLANE_REMOTE_CHECK_MAX_ATTEMPTS,
      DEFAULT_MAX_ATTEMPTS,
    ),
    stablePolls: parsePositiveInteger(
      process.env.AGENTPLANE_REMOTE_CHECK_STABLE_POLLS,
      DEFAULT_STABLE_POLLS,
    ),
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }
    if (arg === "--repo") {
      const value = argv[index + 1];
      if (!value) throw new Error("Missing value for --repo");
      options.repo = value;
      index += 1;
      continue;
    }
    if (arg === "--pr") {
      const value = argv[index + 1];
      if (!value) throw new Error("Missing value for --pr");
      options.targetArgs.push(value);
      index += 1;
      continue;
    }
    if (arg === "--stable-polls") {
      const value = argv[index + 1];
      if (!value) throw new Error("Missing value for --stable-polls");
      const parsed = parsePositiveInteger(value, Number.NaN);
      if (!Number.isInteger(parsed)) throw new Error("Invalid value for --stable-polls");
      options.stablePolls = parsed;
      index += 1;
      continue;
    }
    if (arg.startsWith("--repo=")) {
      const value = arg.slice("--repo=".length);
      if (!value) throw new Error("Missing value for --repo");
      options.repo = value;
      continue;
    }
    if (arg.startsWith("--pr=")) {
      const value = arg.slice("--pr=".length);
      if (!value) throw new Error("Missing value for --pr");
      options.targetArgs.push(value);
      continue;
    }
    if (arg.startsWith("--stable-polls=")) {
      const value = arg.slice("--stable-polls=".length);
      if (!value) throw new Error("Missing value for --stable-polls");
      const parsed = parsePositiveInteger(value, Number.NaN);
      if (!Number.isInteger(parsed)) throw new Error("Invalid value for --stable-polls");
      options.stablePolls = parsed;
      continue;
    }
    if (IGNORED_LEGACY_FLAGS.has(arg)) {
      continue;
    }
    if (arg.startsWith("--")) {
      throw new Error(`Unknown option: ${arg}`);
    }
    options.targetArgs.push(arg);
  }

  return options;
}

function compactText(value) {
  return typeof value === "string" ? value.trim() : "";
}

async function sleep(ms) {
  if (ms <= 0) return;
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function withGhLookupRetry(operation, label) {
  return withGhTransportRetry(operation, {
    label,
    maxAttempts: GH_LOOKUP_MAX_ATTEMPTS,
    baseDelayMs: GH_LOOKUP_BASE_DELAY_MS,
    onRetry: ({ attempt, maxAttempts, error, label: retryLabel }) => {
      process.stderr.write(
        `warning: transient GitHub transport error while ${retryLabel} (attempt ${attempt}/${maxAttempts}): ${normalizeGhTransportError(error)}\n`,
      );
    },
  });
}

async function runGh(args) {
  const result = await execFileAsync("gh", args, {
    cwd: process.cwd(),
    env: process.env,
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });
  return String(result.stdout ?? "");
}

async function runGhJson(args) {
  const output = await runGh(args);
  const text = output.trim();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Failed to parse gh JSON for args: ${args.join(" ")}`);
  }
}

async function runGhJsonWithRetry(args) {
  return withGhLookupRetry(() => runGhJson(args), `running gh ${args.join(" ")}`);
}

async function resolveRepositorySlug(explicitRepo) {
  if (explicitRepo && explicitRepo.trim()) return explicitRepo.trim();

  const fromEnv = process.env.GITHUB_REPOSITORY?.trim();
  if (fromEnv) return fromEnv;

  const payload = await runGhJsonWithRetry(["repo", "view", "--json", "nameWithOwner"]);
  const repo =
    payload && typeof payload === "object" && !Array.isArray(payload)
      ? String(payload.nameWithOwner ?? "").trim()
      : "";
  if (!repo) {
    throw new Error("Unable to resolve repository slug. Pass --repo or set GITHUB_REPOSITORY.");
  }
  return repo;
}

async function resolveDefaultPrTarget() {
  const envBranch = process.env.GITHUB_HEAD_REF?.trim() || process.env.BRANCH_NAME?.trim() || "";
  if (envBranch) return envBranch;

  const result = await execFileAsync("git", ["branch", "--show-current"], {
    cwd: process.cwd(),
    env: process.env,
    encoding: "utf8",
    maxBuffer: 1024 * 1024,
  });
  const branch = String(result.stdout ?? "").trim();
  if (branch && branch !== "HEAD") return branch;

  throw new Error(
    "Unable to resolve current branch for gh pr view. Pass a PR number/url/branch explicitly or set GITHUB_HEAD_REF.",
  );
}

async function resolvePullRequest(targetArg, repoSlug) {
  const prArgs = ["pr", "view"];
  if (typeof targetArg === "string" && targetArg.trim().length > 0) {
    prArgs.push(targetArg.trim());
  }
  prArgs.push(
    "--repo",
    repoSlug,
    "--json",
    "number,headRefOid,baseRefName,url,title,mergeStateStatus",
  );

  const payload = await runGhJsonWithRetry([...prArgs]);

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("gh pr view returned an unexpected payload.");
  }

  const number = Number(payload.number);
  const headRefOid = typeof payload.headRefOid === "string" ? payload.headRefOid.trim() : "";
  const baseRefName = typeof payload.baseRefName === "string" ? payload.baseRefName.trim() : "";
  if (!Number.isInteger(number) || number <= 0 || !headRefOid || !baseRefName) {
    throw new Error("gh pr view did not return a usable PR number, head SHA, or base branch.");
  }

  return {
    number,
    headRefOid,
    baseRefName,
    url: typeof payload.url === "string" ? payload.url : null,
    title: typeof payload.title === "string" ? payload.title : null,
    mergeStateStatus:
      typeof payload.mergeStateStatus === "string" ? payload.mergeStateStatus.trim() : null,
  };
}

async function resolvePullRequests(targetArgs, repoSlug) {
  if (targetArgs.length === 0) {
    return [await resolvePullRequest(await resolveDefaultPrTarget(), repoSlug)];
  }

  const prs = [];
  for (const targetArg of targetArgs) {
    prs.push(await resolvePullRequest(targetArg, repoSlug));
  }
  return prs;
}

async function loadRequiredContexts(repoSlug, baseBranch) {
  try {
    const payload = await runGhJsonWithRetry([
      "api",
      `repos/${repoSlug}/branches/${baseBranch}/protection`,
    ]);
    const required =
      payload && typeof payload === "object" && !Array.isArray(payload)
        ? payload.required_status_checks
        : null;
    if (!required || typeof required !== "object" || Array.isArray(required)) return [];

    const checks = Array.isArray(required.checks) ? required.checks : [];
    const contexts = Array.isArray(required.contexts) ? required.contexts : [];
    const explicit = checks
      .map((entry) => String(entry?.context ?? "").trim())
      .filter((value) => value.length > 0);
    const fallback = contexts
      .map((entry) => String(entry).trim())
      .filter((value) => value.length > 0);
    return explicit.length > 0 ? explicit : fallback;
  } catch (error) {
    const text = normalizeGhTransportError(error);
    if (/\b404\b|\b451\b/i.test(text)) return [];
    throw error;
  }
}

async function loadCurrentCheckState(repoSlug, headSha) {
  const [statusPayload, checkRunsPayload] = await Promise.all([
    runGhJsonWithRetry(["api", `repos/${repoSlug}/commits/${headSha}/status`]),
    runGhJsonWithRetry(["api", `repos/${repoSlug}/commits/${headSha}/check-runs`]),
  ]);

  const statuses = Array.isArray(statusPayload?.statuses) ? statusPayload.statuses : [];
  const checkRuns = Array.isArray(checkRunsPayload?.check_runs) ? checkRunsPayload.check_runs : [];

  const normalized = [];

  for (const status of statuses) {
    const context = compactText(status?.context);
    if (!context) continue;
    const state = compactText(status?.state).toLowerCase();
    const details = compactText(status?.description);
    const updatedAt = compactText(status?.updated_at);
    let outcome = "pending";
    switch (state) {
      case "success": {
        outcome = "success";
        break;
      }
      case "pending": {
        outcome = "pending";
        break;
      }
      case "failure":
      case "error": {
        outcome = "failure";
        break;
      }
      default: {
        outcome = "pending";
        break;
      }
    }
    normalized.push({
      name: context,
      outcome,
      details,
      progressKey: `status|${state}|${details}|${updatedAt}`,
    });
  }

  const checkRunProgress = await Promise.all(
    checkRuns.map(async (checkRun) => ({
      checkRun,
      progressKey: await loadCheckRunProgressKey(repoSlug, checkRun),
    })),
  );

  for (const { checkRun, progressKey } of checkRunProgress) {
    const name = compactText(checkRun?.name);
    if (!name) continue;
    const status = compactText(checkRun?.status).toLowerCase();
    const conclusion = compactText(checkRun?.conclusion).toLowerCase();
    const details = compactText(checkRun?.details_url);
    let outcome = "pending";
    switch (true) {
      case status !== "completed": {
        outcome = status === "in_progress" ? "in_progress" : "pending";
        break;
      }
      case ["success", "neutral", "skipped"].includes(conclusion): {
        outcome = "success";
        break;
      }
      case ["failure", "cancelled", "timed_out", "action_required", "stale"].includes(conclusion): {
        outcome = "failure";
        break;
      }
      default: {
        outcome = "pending";
        break;
      }
    }
    normalized.push({
      name,
      outcome,
      details,
      progressKey:
        progressKey ||
        `check-run|${status}|${conclusion}|${compactText(checkRun?.started_at)}|${compactText(checkRun?.completed_at)}|${details}`,
    });
  }

  return normalized;
}

function extractGithubActionsJobId(detailsUrl) {
  const match = compactText(detailsUrl).match(/\/actions\/runs\/\d+\/job\/(\d+)/u);
  return match?.[1] ?? null;
}

async function loadCheckRunProgressKey(repoSlug, checkRun) {
  const jobId = extractGithubActionsJobId(checkRun?.details_url);
  if (!jobId) return "";

  const payload = await runGhJsonWithRetry(["api", `repos/${repoSlug}/actions/jobs/${jobId}`]);
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return "";

  const steps = Array.isArray(payload.steps) ? payload.steps : [];
  const normalizedSteps = steps.map((step) => ({
    number: Number.isInteger(step?.number) ? step.number : null,
    name: compactText(step?.name),
    status: compactText(step?.status).toLowerCase(),
    conclusion: compactText(step?.conclusion).toLowerCase(),
    completed_at: compactText(step?.completed_at),
  }));

  return JSON.stringify({
    status: compactText(payload.status).toLowerCase(),
    conclusion: compactText(payload.conclusion).toLowerCase(),
    started_at: compactText(payload.started_at),
    completed_at: compactText(payload.completed_at),
    steps: normalizedSteps,
  });
}

function summarizeChecks(checks, requiredContexts) {
  const byName = new Map();
  for (const check of checks) {
    const current = byName.get(check.name) ?? [];
    current.push(check);
    byName.set(check.name, current);
  }

  const contexts = requiredContexts.length > 0 ? requiredContexts : [...byName.keys()];
  const items = contexts.map((name) => {
    const states = byName.get(name) ?? [];
    if (states.some((entry) => entry.outcome === "failure")) {
      return { name, outcome: "failure", progressKey: "" };
    }
    if (states.some((entry) => entry.outcome === "in_progress")) {
      return {
        name,
        outcome: "in_progress",
        progressKey: states
          .filter((entry) => entry.outcome === "in_progress" || entry.outcome === "pending")
          .map((entry) => compactText(entry.progressKey))
          .toSorted()
          .join("||"),
      };
    }
    if (states.some((entry) => entry.outcome === "pending")) {
      return {
        name,
        outcome: "pending",
        progressKey: states
          .filter((entry) => entry.outcome === "pending")
          .map((entry) => compactText(entry.progressKey))
          .toSorted()
          .join("||"),
      };
    }
    if (states.some((entry) => entry.outcome === "success")) {
      return { name, outcome: "success", progressKey: "" };
    }
    return { name, outcome: "pending", progressKey: "" };
  });

  const failures = items.filter((item) => item.outcome === "failure");
  const pending = items.filter((item) => item.outcome !== "failure" && item.outcome !== "success");
  const ready = items.length > 0 && pending.length === 0 && failures.length === 0;

  return {
    items,
    failures,
    pending,
    ready,
  };
}

function formatSummary(items) {
  if (items.length === 0) return "no checks reported yet";
  return items.map((item) => `${item.name}=${item.outcome}`).join(", ");
}

function pendingFingerprint(items) {
  return items
    .filter((item) => item.outcome === "pending" || item.outcome === "in_progress")
    .map((item) => `${item.name}:${item.outcome}:${compactText(item.progressKey)}`)
    .toSorted()
    .join("##");
}

function checksFingerprint(items) {
  return items
    .map((item) => `${item.name}:${item.outcome}`)
    .toSorted()
    .join("##");
}

function formatPullRequestPrefix(pr, index, total) {
  const title = pr.title ? ` (${pr.title})` : "";
  const position = total > 1 ? ` [${index}/${total}]` : "";
  return `PR #${pr.number}${position}${title}`;
}

async function waitForPullRequestChecks(repoSlug, pr, requiredContexts, options, prefix) {
  if (pr.mergeStateStatus === "DIRTY") {
    process.stderr.write(
      `error: ${prefix} is not mergeable (mergeStateStatus=DIRTY); resolve conflicts before waiting for checks.\n`,
    );
    return { ok: false };
  }

  let poll = 0;
  let idleAttempts = 0;
  let lastFingerprint = "";
  let lastReadyFingerprint = "";
  let stableReadyPolls = 0;

  while (idleAttempts < options.maxAttempts) {
    poll += 1;
    const checks = await loadCurrentCheckState(repoSlug, pr.headRefOid);
    const summary = summarizeChecks(checks, requiredContexts);
    const fingerprint = pendingFingerprint(summary.items);
    const progressObserved = fingerprint.length > 0 && fingerprint !== lastFingerprint;
    idleAttempts = fingerprint.length === 0 ? 0 : progressObserved ? 1 : idleAttempts + 1;
    process.stdout.write(
      `${prefix} poll ${poll} (idle ${idleAttempts}/${options.maxAttempts}): ${formatSummary(summary.items)}\n`,
    );

    if (summary.failures.length > 0) {
      process.stderr.write(
        `error: required checks failed for ${prefix}: ${formatSummary(summary.failures)}\n`,
      );
      return { ok: false };
    }

    if (summary.ready) {
      const readyFingerprint = checksFingerprint(summary.items);
      stableReadyPolls = readyFingerprint === lastReadyFingerprint ? stableReadyPolls + 1 : 1;
      lastReadyFingerprint = readyFingerprint;
      if (stableReadyPolls >= options.stablePolls) {
        process.stdout.write(`required checks passed for ${prefix}\n`);
        return { ok: true };
      }
      process.stdout.write(
        `${prefix} ready; waiting for stable check set (${stableReadyPolls}/${options.stablePolls})\n`,
      );
      lastFingerprint = fingerprint;
      await sleep(options.intervalMs);
      continue;
    }

    lastFingerprint = fingerprint;
    if (idleAttempts < options.maxAttempts) await sleep(options.intervalMs);
  }

  process.stderr.write(
    `error: timed out waiting for required checks after ${options.maxAttempts} idle polls for ${prefix}\n`,
  );
  return { ok: false };
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes("--help") || argv.includes("-h")) {
    usage();
    return;
  }

  const options = parseArgs(argv);
  const repoSlug = await resolveRepositorySlug(options.repo);
  const prs = await resolvePullRequests(options.targetArgs, repoSlug);
  const requiredContextsByBase = new Map();

  for (let index = 0; index < prs.length; index += 1) {
    const pr = prs[index];
    let requiredContexts = requiredContextsByBase.get(pr.baseRefName);
    if (!requiredContexts) {
      requiredContexts = await loadRequiredContexts(repoSlug, pr.baseRefName);
      requiredContextsByBase.set(pr.baseRefName, requiredContexts);
    }

    const prefix = formatPullRequestPrefix(pr, index + 1, prs.length);
    const result = await waitForPullRequestChecks(repoSlug, pr, requiredContexts, options, prefix);
    if (!result.ok) {
      process.exitCode = 1;
      return;
    }
  }

  process.exitCode = 0;
}

try {
  await main();
} catch (error) {
  const text = normalizeGhTransportError(error);
  if (/ENOENT/.test(text)) {
    process.stderr.write(
      [
        "error: Missing required gh CLI.",
        "Install GitHub CLI and authenticate before waiting for remote checks.",
      ].join("\n") + "\n",
    );
    process.exitCode = 1;
  } else {
    process.stderr.write(`error: ${text}\n`);
    process.exitCode = 1;
  }
}
