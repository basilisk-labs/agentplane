import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const DEFAULT_DISCOVERY_ATTEMPTS = 40;
const DEFAULT_MERGE_ATTEMPTS = 40;
const DEFAULT_POLL_INTERVAL_MS = 15_000;
const RUN_JSON_FIELDS = "databaseId,createdAt,event,headBranch,headSha,status,url";

function usage() {
  process.stdout.write(
    [
      "Usage: node scripts/workflow/verify-release-evidence-pr.mjs --workflow <file> --ref <branch> --sha <sha> --pr-url <url> --repo <owner/name>",
      "",
      "Dispatch exact-SHA Core CI, publish the required PR check, and merge the release-evidence PR.",
      "The dispatched run is discovered from a baseline delta instead of relying on optional gh output.",
      "",
      "Options:",
      "  --discovery-attempts <count>  New-run discovery poll budget. Default: 40.",
      "  --merge-attempts <count>      PR merge-state poll budget. Default: 40.",
      "  --poll-interval-ms <ms>       Poll interval. Default: 15000.",
      "  --json                        Print the final result as JSON.",
    ].join("\n"),
  );
}

function parseInteger(value, name, { allowZero = false } = {}) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  const valid = Number.isInteger(parsed) && (allowZero ? parsed >= 0 : parsed > 0);
  if (!valid) throw new Error(`Invalid value for ${name}: ${value ?? "missing"}`);
  return parsed;
}

function parseArgs(argv) {
  const options = {
    help: false,
    json: false,
    workflow: "",
    ref: "",
    sha: "",
    prUrl: "",
    repo: "",
    discoveryAttempts: DEFAULT_DISCOVERY_ATTEMPTS,
    mergeAttempts: DEFAULT_MERGE_ATTEMPTS,
    pollIntervalMs: DEFAULT_POLL_INTERVAL_MS,
  };

  const valueOptions = new Map([
    ["--workflow", "workflow"],
    ["--ref", "ref"],
    ["--sha", "sha"],
    ["--pr-url", "prUrl"],
    ["--repo", "repo"],
  ]);

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }
    if (arg === "--json") {
      options.json = true;
      continue;
    }
    if (valueOptions.has(arg)) {
      const value = argv[index + 1];
      if (!value) throw new Error(`Missing value for ${arg}`);
      options[valueOptions.get(arg)] = value;
      index += 1;
      continue;
    }
    if (arg === "--discovery-attempts") {
      options.discoveryAttempts = parseInteger(argv[index + 1], arg);
      index += 1;
      continue;
    }
    if (arg === "--merge-attempts") {
      options.mergeAttempts = parseInteger(argv[index + 1], arg);
      index += 1;
      continue;
    }
    if (arg === "--poll-interval-ms") {
      options.pollIntervalMs = parseInteger(argv[index + 1], arg, { allowZero: true });
      index += 1;
      continue;
    }
    throw new Error(`Unknown option: ${arg}`);
  }

  return options;
}

function requireInputs(options) {
  for (const [key, label] of [
    ["workflow", "--workflow"],
    ["ref", "--ref"],
    ["sha", "--sha"],
    ["prUrl", "--pr-url"],
    ["repo", "--repo"],
  ]) {
    if (!options[key].trim()) throw new Error(`Missing required option: ${label}`);
  }
  if (!/^[0-9a-f]{40,64}$/u.test(options.sha)) {
    throw new Error(`Invalid exact release-evidence SHA: ${options.sha}`);
  }
  if (!/^[^/\s]+\/[^/\s]+$/u.test(options.repo)) {
    throw new Error(`Invalid repository slug: ${options.repo}`);
  }
}

async function runGh(args, { allowFailure = false } = {}) {
  try {
    const result = await execFileAsync("gh", args, {
      cwd: process.cwd(),
      env: process.env,
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
    });
    return {
      ok: true,
      stdout: String(result.stdout ?? ""),
      stderr: String(result.stderr ?? ""),
    };
  } catch (error) {
    const execError = error;
    if (allowFailure) {
      return {
        ok: false,
        stdout: typeof execError.stdout === "string" ? execError.stdout : "",
        stderr: typeof execError.stderr === "string" ? execError.stderr : String(error),
      };
    }
    const detail =
      typeof execError.stderr === "string" && execError.stderr.trim()
        ? execError.stderr.trim()
        : String(error);
    throw new Error(`gh ${args.join(" ")} failed: ${detail}`);
  }
}

async function runGhJson(args) {
  const result = await runGh(args);
  const text = result.stdout.trim();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`gh ${args.join(" ")} returned invalid JSON`);
  }
}

function runListArgs(options) {
  return [
    "run",
    "list",
    "--repo",
    options.repo,
    "--workflow",
    options.workflow,
    "--branch",
    options.ref,
    "--commit",
    options.sha,
    "--event",
    "workflow_dispatch",
    "--limit",
    "100",
    "--json",
    RUN_JSON_FIELDS,
  ];
}

function normalizeRuns(payload) {
  if (!Array.isArray(payload)) return [];
  return payload
    .map((entry) => ({
      databaseId: Number(entry?.databaseId),
      createdAt: typeof entry?.createdAt === "string" ? entry.createdAt : "",
      event: typeof entry?.event === "string" ? entry.event : "",
      headBranch: typeof entry?.headBranch === "string" ? entry.headBranch : "",
      headSha: typeof entry?.headSha === "string" ? entry.headSha : "",
      status: typeof entry?.status === "string" ? entry.status : "",
      url: typeof entry?.url === "string" ? entry.url : "",
    }))
    .filter((entry) => Number.isInteger(entry.databaseId) && entry.databaseId > 0);
}

function selectNewExactRun(runs, baselineIds, options) {
  return runs
    .filter(
      (run) =>
        !baselineIds.has(run.databaseId) &&
        run.event === "workflow_dispatch" &&
        run.headBranch === options.ref &&
        run.headSha.toLowerCase() === options.sha.toLowerCase() &&
        /\/actions\/runs\/[0-9]+$/u.test(run.url),
    )
    .toSorted((left, right) => {
      const byCreatedAt = left.createdAt.localeCompare(right.createdAt);
      return byCreatedAt || left.databaseId - right.databaseId;
    })[0];
}

async function sleep(ms) {
  if (ms <= 0) return;
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function discoverDispatchedRun(options, baselineIds) {
  for (let attempt = 1; attempt <= options.discoveryAttempts; attempt += 1) {
    const runs = normalizeRuns(await runGhJson(runListArgs(options)));
    const selected = selectNewExactRun(runs, baselineIds, options);
    if (selected) return selected;
    process.stderr.write(
      `Waiting for exact-SHA Core CI dispatch (${attempt}/${options.discoveryAttempts})\n`,
    );
    if (attempt < options.discoveryAttempts) await sleep(options.pollIntervalMs);
  }
  throw new Error(
    `No new ${options.workflow} workflow_dispatch run appeared for ${options.ref}@${options.sha}`,
  );
}

async function publishRequiredCheck(options, run) {
  await runGh([
    "api",
    `repos/${options.repo}/check-runs`,
    "--method",
    "POST",
    "-f",
    "name=PR verification",
    "-f",
    `head_sha=${options.sha}`,
    "-f",
    "status=completed",
    "-f",
    "conclusion=success",
    "-f",
    `details_url=${run.url}`,
    "-f",
    "output[title]=Release evidence verification passed",
    "-f",
    "output[summary]=The exact release-evidence closure SHA passed Core CI.",
  ]);
}

async function mergePullRequest(options) {
  await runGh([
    "pr",
    "checks",
    options.prUrl,
    "--repo",
    options.repo,
    "--watch",
    "--interval",
    "15",
  ]);

  const immediate = await runGh(
    ["pr", "merge", options.prUrl, "--repo", options.repo, "--merge", "--delete-branch"],
    { allowFailure: true },
  );
  if (!immediate.ok) {
    process.stderr.write("Immediate release-evidence merge unavailable; enabling auto-merge.\n");
    await runGh([
      "pr",
      "merge",
      options.prUrl,
      "--repo",
      options.repo,
      "--auto",
      "--merge",
      "--delete-branch",
    ]);
  }

  for (let attempt = 1; attempt <= options.mergeAttempts; attempt += 1) {
    const payload = await runGhJson([
      "pr",
      "view",
      options.prUrl,
      "--repo",
      options.repo,
      "--json",
      "state,mergedAt,mergeCommit",
    ]);
    const state = typeof payload?.state === "string" ? payload.state.toUpperCase() : "";
    if (state === "MERGED") return payload;
    if (state === "CLOSED") {
      throw new Error(`Release-evidence PR closed without merge: ${options.prUrl}`);
    }
    process.stderr.write(
      `Waiting for release-evidence PR merge (${attempt}/${options.mergeAttempts})\n`,
    );
    if (attempt < options.mergeAttempts) await sleep(options.pollIntervalMs);
  }
  throw new Error(`Release-evidence PR did not merge within the configured poll budget`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    usage();
    return;
  }
  requireInputs(options);

  const baselineRuns = normalizeRuns(await runGhJson(runListArgs(options)));
  const baselineIds = new Set(baselineRuns.map((run) => run.databaseId));

  await runGh([
    "workflow",
    "run",
    options.workflow,
    "--repo",
    options.repo,
    "--ref",
    options.ref,
    "-f",
    `sha=${options.sha}`,
  ]);

  const run = await discoverDispatchedRun(options, baselineIds);
  await runGh([
    "run",
    "watch",
    String(run.databaseId),
    "--repo",
    options.repo,
    "--exit-status",
    "--interval",
    "15",
  ]);
  await publishRequiredCheck(options, run);
  const merge = await mergePullRequest(options);

  const result = {
    schema_version: 1,
    state: "merged",
    repo: options.repo,
    pr_url: options.prUrl,
    closure_sha: options.sha,
    ci_run_id: run.databaseId,
    ci_run_url: run.url,
    merge_commit: merge?.mergeCommit ?? null,
    merged_at: merge?.mergedAt ?? null,
  };
  if (options.json) {
    process.stdout.write(`${JSON.stringify(result)}\n`);
  } else {
    process.stdout.write(
      `Release-evidence PR merged after exact-SHA Core CI: ${options.prUrl} (${run.url})\n`,
    );
  }
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
