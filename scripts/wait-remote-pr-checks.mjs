import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const DEFAULT_MAX_ATTEMPTS = 60;
const DEFAULT_INTERVAL_MS = 5000;
const GH_LOOKUP_MAX_ATTEMPTS = 3;
const GH_LOOKUP_BASE_DELAY_MS = 250;

const GH_TRANSIENT_ERROR_PATTERNS = [
  /eof\b/i,
  /tls handshake timeout/i,
  /ssl_error_syscall/i,
  /connection reset by peer/i,
  /\beconnreset\b/i,
  /\betimedout\b/i,
  /socket hang up/i,
  /temporary failure in name resolution/i,
  /network is unreachable/i,
  /server closed the connection/i,
];

const GH_PERMANENT_ERROR_PATTERNS = [
  /authentication required/i,
  /not logged into github/i,
  /could not resolve to a pull request/i,
  /graphql: field/i,
  /bad credentials/i,
  /permission denied/i,
  /\b403\b/i,
  /\b401\b/i,
  /unknown command/i,
  /usage:/i,
];

const IGNORED_LEGACY_FLAGS = new Set(["--watch", "--required", "--fail-fast"]);

function usage() {
  process.stdout.write(
    [
      "Usage: bun run workflow:wait-remote-checks -- [<number>|<url>|<branch>] [--repo <owner/name>]",
      "",
      "Wait for required GitHub PR checks before integrate/finish in branch_pr workflow.",
      "This command polls PR check state with bounded retries and explicit status output.",
      "",
      "Examples:",
      "  bun run workflow:wait-remote-checks",
      "  bun run workflow:wait-remote-checks -- task/202603241919-QVGXZ5/remote-check-wait",
      "  bun run workflow:wait-remote-checks -- 123 --repo basilisk-labs/agentplane",
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
    if (arg.startsWith("--repo=")) {
      const value = arg.slice("--repo=".length);
      if (!value) throw new Error("Missing value for --repo");
      options.repo = value;
      continue;
    }
    if (IGNORED_LEGACY_FLAGS.has(arg)) {
      continue;
    }
    options.targetArgs.push(arg);
  }

  return options;
}

function normalizeErrorText(err) {
  if (err instanceof Error) {
    const parts = [err.name, err.message];
    const stderr = err.stderr;
    const stdout = err.stdout;
    if (typeof stderr === "string" && stderr.trim()) parts.push(stderr);
    if (typeof stdout === "string" && stdout.trim()) parts.push(stdout);
    return parts.filter((part) => part.trim().length > 0).join("\n");
  }
  return String(err);
}

function isTransientGhTransportError(err) {
  const text = normalizeErrorText(err);
  if (GH_PERMANENT_ERROR_PATTERNS.some((pattern) => pattern.test(text))) return false;
  return GH_TRANSIENT_ERROR_PATTERNS.some((pattern) => pattern.test(text));
}

async function sleep(ms) {
  if (ms <= 0) return;
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function withGhLookupRetry(operation, label) {
  let lastError = null;
  for (let attempt = 1; attempt <= GH_LOOKUP_MAX_ATTEMPTS; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (!isTransientGhTransportError(error) || attempt === GH_LOOKUP_MAX_ATTEMPTS) {
        throw error;
      }
      process.stderr.write(
        `warning: transient GitHub transport error while ${label} (attempt ${attempt}/${GH_LOOKUP_MAX_ATTEMPTS}): ${normalizeErrorText(error)}\n`,
      );
      await sleep(GH_LOOKUP_BASE_DELAY_MS * attempt);
    }
  }
  throw lastError instanceof Error ? lastError : new Error(String(lastError));
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
  const repo = payload && typeof payload === "object" && !Array.isArray(payload)
    ? String(payload.nameWithOwner ?? "").trim()
    : "";
  if (!repo) {
    throw new Error("Unable to resolve repository slug. Pass --repo or set GITHUB_REPOSITORY.");
  }
  return repo;
}

async function resolvePullRequest(targetArgs, repoSlug) {
  const payload = await runGhJsonWithRetry([
    "pr",
    "view",
    ...targetArgs,
    "--repo",
    repoSlug,
    "--json",
    "number,headRefOid,baseRefName,url,title",
  ]);

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
  };
}

async function loadRequiredContexts(repoSlug, baseBranch) {
  try {
    const payload = await runGhJsonWithRetry([
      "api",
      `repos/${repoSlug}/branches/${baseBranch}/protection`,
    ]);
    const required = payload && typeof payload === "object" && !Array.isArray(payload)
      ? payload.required_status_checks
      : null;
    if (!required || typeof required !== "object" || Array.isArray(required)) return [];

    const checks = Array.isArray(required.checks) ? required.checks : [];
    const contexts = Array.isArray(required.contexts) ? required.contexts : [];
    const explicit = checks
      .map((entry) => String(entry?.context ?? "").trim())
      .filter((value) => value.length > 0);
    const fallback = contexts.map((entry) => String(entry).trim()).filter((value) => value.length > 0);
    return explicit.length > 0 ? explicit : fallback;
  } catch (error) {
    const text = normalizeErrorText(error);
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
    const context = typeof status?.context === "string" ? status.context.trim() : "";
    if (!context) continue;
    const state = typeof status?.state === "string" ? status.state.trim().toLowerCase() : "";
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
      details: typeof status?.description === "string" ? status.description.trim() : "",
    });
  }

  for (const checkRun of checkRuns) {
    const name = typeof checkRun?.name === "string" ? checkRun.name.trim() : "";
    if (!name) continue;
    const status = typeof checkRun?.status === "string" ? checkRun.status.trim().toLowerCase() : "";
    const conclusion =
      typeof checkRun?.conclusion === "string" ? checkRun.conclusion.trim().toLowerCase() : "";
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
      details: typeof checkRun?.details_url === "string" ? checkRun.details_url.trim() : "",
    });
  }

  return normalized;
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
      return { name, outcome: "failure" };
    }
    if (states.some((entry) => entry.outcome === "in_progress" || entry.outcome === "pending")) {
      return { name, outcome: "pending" };
    }
    if (states.some((entry) => entry.outcome === "success")) {
      return { name, outcome: "success" };
    }
    return { name, outcome: "pending" };
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

async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes("--help") || argv.includes("-h")) {
    usage();
    return;
  }

  const options = parseArgs(argv);
  const repoSlug = await resolveRepositorySlug(options.repo);
  const pr = await resolvePullRequest(options.targetArgs, repoSlug);
  const requiredContexts = await loadRequiredContexts(repoSlug, pr.baseRefName);

  for (let attempt = 1; attempt <= options.maxAttempts; attempt += 1) {
    const checks = await loadCurrentCheckState(repoSlug, pr.headRefOid);
    const summary = summarizeChecks(checks, requiredContexts);
    const prefix = `PR #${pr.number}${pr.title ? ` (${pr.title})` : ""}`;
    process.stdout.write(
      `${prefix} attempt ${attempt}/${options.maxAttempts}: ${formatSummary(summary.items)}\n`,
    );

    if (summary.failures.length > 0) {
      process.stderr.write(
        `error: required checks failed for ${prefix}: ${formatSummary(summary.failures)}\n`,
      );
      process.exitCode = 1;
      return;
    }

    if (summary.ready) {
      process.stdout.write(`required checks passed for ${prefix}\n`);
      process.exitCode = 0;
      return;
    }

    if (attempt < options.maxAttempts) {
      await sleep(options.intervalMs);
    }
  }

  process.stderr.write(
    `error: timed out waiting for required checks after ${options.maxAttempts} attempts for PR #${pr.number}\n`,
  );
  process.exitCode = 1;
}

try {
  await main();
} catch (error) {
  const text = normalizeErrorText(error);
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
