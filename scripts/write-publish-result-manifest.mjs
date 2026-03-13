import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

function usage() {
  return [
    "Usage: node scripts/write-publish-result-manifest.mjs [options]",
    "",
    "Emit a machine-readable publish-result artifact for the GitHub publish workflow.",
    "",
    "Options:",
    "  --out <path>                 Output path for publish-result.json",
    "  --sha <git-sha>             Exact release SHA",
    "  --version <semver>          Released package version",
    "  --tag <tag>                 Release tag (vX.Y.Z)",
    "  --release-ready-run-id <id> Core CI run id that produced release-ready",
    "  --job-status <status>       Current GitHub job status",
    "  --core-prepublished <bool>  Whether @agentplaneorg/core was already published before this run",
    "  --cli-prepublished <bool>   Whether agentplane was already published before this run",
    "  --core-outcome <outcome>    Step outcome for @agentplaneorg/core publish",
    "  --cli-outcome <outcome>     Step outcome for agentplane publish",
    "  --smoke-outcome <outcome>   Step outcome for post-publish npm smoke",
    "  --tag-exists <bool>         Whether the release tag already existed on origin",
    "  --tag-outcome <outcome>     Step outcome for pushing the release tag",
    "  --release-outcome <outcome> Step outcome for GitHub release creation",
    "  --json                      Emit JSON to stdout",
    "  --help, -h                  Show this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const out = {
    outPath: null,
    sha: null,
    version: null,
    tag: null,
    releaseReadyRunId: null,
    jobStatus: process.env.AGENTPLANE_PUBLISH_JOB_STATUS ?? null,
    corePrepublished: false,
    cliPrepublished: false,
    coreOutcome: "unknown",
    cliOutcome: "unknown",
    smokeOutcome: "unknown",
    tagExists: false,
    tagOutcome: "unknown",
    releaseOutcome: "unknown",
    json: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index] ?? "";
    const next = argv[index + 1];
    if (arg === "--out") {
      out.outPath = path.resolve(next ?? "");
      index += 1;
      continue;
    }
    if (arg === "--sha") {
      out.sha = next ?? out.sha;
      index += 1;
      continue;
    }
    if (arg === "--version") {
      out.version = next ?? out.version;
      index += 1;
      continue;
    }
    if (arg === "--tag") {
      out.tag = next ?? out.tag;
      index += 1;
      continue;
    }
    if (arg === "--release-ready-run-id") {
      out.releaseReadyRunId = next ?? out.releaseReadyRunId;
      index += 1;
      continue;
    }
    if (arg === "--job-status") {
      out.jobStatus = next ?? out.jobStatus;
      index += 1;
      continue;
    }
    if (arg === "--core-prepublished") {
      out.corePrepublished = parseBoolean(next, "core-prepublished");
      index += 1;
      continue;
    }
    if (arg === "--cli-prepublished") {
      out.cliPrepublished = parseBoolean(next, "cli-prepublished");
      index += 1;
      continue;
    }
    if (arg === "--core-outcome") {
      out.coreOutcome = next ?? out.coreOutcome;
      index += 1;
      continue;
    }
    if (arg === "--cli-outcome") {
      out.cliOutcome = next ?? out.cliOutcome;
      index += 1;
      continue;
    }
    if (arg === "--smoke-outcome") {
      out.smokeOutcome = next ?? out.smokeOutcome;
      index += 1;
      continue;
    }
    if (arg === "--tag-exists") {
      out.tagExists = parseBoolean(next, "tag-exists");
      index += 1;
      continue;
    }
    if (arg === "--tag-outcome") {
      out.tagOutcome = next ?? out.tagOutcome;
      index += 1;
      continue;
    }
    if (arg === "--release-outcome") {
      out.releaseOutcome = next ?? out.releaseOutcome;
      index += 1;
      continue;
    }
    if (arg === "--json") {
      out.json = true;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      out.help = true;
      continue;
    }
    throw new Error(`unknown argument: ${arg}`);
  }

  return out;
}

function assertNonEmpty(value, label) {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) {
    throw new Error(`Missing required ${label}.`);
  }
  return text;
}

function parseBoolean(value, label) {
  const text = String(value ?? "")
    .trim()
    .toLowerCase();
  if (text === "true") return true;
  if (text === "false") return false;
  throw new Error(`Invalid boolean for ${label}: ${String(value ?? "")}`);
}

function normalizeOutcome(value) {
  const text = String(value ?? "").trim();
  return text || "unknown";
}

function derivePackageResult({ prepublished, outcome }) {
  if (prepublished) {
    return {
      alreadyPublished: true,
      stepOutcome: normalizeOutcome(outcome),
      published: true,
      source: "preexisting",
    };
  }
  if (outcome === "success") {
    return {
      alreadyPublished: false,
      stepOutcome: "success",
      published: true,
      source: "published_in_run",
    };
  }
  return {
    alreadyPublished: false,
    stepOutcome: normalizeOutcome(outcome),
    published: false,
    source: "not_confirmed",
  };
}

function buildManifest(args) {
  const core = derivePackageResult({
    prepublished: args.corePrepublished,
    outcome: normalizeOutcome(args.coreOutcome),
  });
  const cli = derivePackageResult({
    prepublished: args.cliPrepublished,
    outcome: normalizeOutcome(args.cliOutcome),
  });

  const smokeOutcome = normalizeOutcome(args.smokeOutcome);
  const tagOutcome = normalizeOutcome(args.tagOutcome);
  const releaseOutcome = normalizeOutcome(args.releaseOutcome);
  const tagEnsured = args.tagExists || tagOutcome === "success";
  const smokePassed = smokeOutcome === "success";
  const releaseCreated = releaseOutcome === "success";
  const jobStatus = assertNonEmpty(args.jobStatus, "job status");

  const failures = [];
  if (!core.published) failures.push("@agentplaneorg/core publish not confirmed");
  if (!cli.published) failures.push("agentplane publish not confirmed");
  if (!smokePassed) failures.push(`post-publish smoke outcome=${smokeOutcome}`);
  if (!tagEnsured) failures.push(`release tag not ensured (outcome=${tagOutcome})`);
  if (!releaseCreated) failures.push(`GitHub release outcome=${releaseOutcome}`);
  if (jobStatus !== "success") failures.push(`publish job status=${jobStatus}`);

  const success = failures.length === 0;

  return {
    schemaVersion: 1,
    success,
    reasonCode: success ? "publish_succeeded" : "publish_incomplete",
    message: success
      ? `Publish result recorded for ${args.tag} (${args.version}) at ${args.sha}.`
      : `Publish result for ${args.tag} is incomplete: ${failures.join("; ")}.`,
    nextAction: success
      ? "Use this artifact as the canonical post-publish outcome for the release SHA."
      : "Inspect the publish-result fields and the publish workflow logs before retrying release recovery actions.",
    sha: assertNonEmpty(args.sha, "release SHA"),
    version: assertNonEmpty(args.version, "release version"),
    tag: assertNonEmpty(args.tag, "release tag"),
    releaseReady: {
      runId: args.releaseReadyRunId ? String(args.releaseReadyRunId).trim() || null : null,
    },
    job: {
      status: jobStatus,
      workflow: process.env.GITHUB_WORKFLOW ?? null,
      runId: process.env.GITHUB_RUN_ID ?? null,
      runAttempt: process.env.GITHUB_RUN_ATTEMPT ?? null,
      eventName: process.env.GITHUB_EVENT_NAME ?? null,
      generatedAt: new Date().toISOString(),
    },
    packages: {
      core,
      cli,
    },
    checks: {
      npmSmoke: {
        outcome: smokeOutcome,
        passed: smokePassed,
      },
      tag: {
        alreadyExisted: args.tagExists,
        outcome: tagOutcome,
        ensured: tagEnsured,
      },
      githubRelease: {
        outcome: releaseOutcome,
        created: releaseCreated,
      },
    },
    failures,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }

  const manifest = buildManifest(args);

  if (args.outPath) {
    await mkdir(path.dirname(args.outPath), { recursive: true });
    await writeFile(args.outPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  }

  if (args.json) {
    process.stdout.write(`${JSON.stringify(manifest)}\n`);
    return;
  }

  process.stdout.write(`${manifest.message}\n`);
  process.stdout.write(`State: ${manifest.success ? "success" : "incomplete"}\n`);
  process.stdout.write(`Reason: ${manifest.reasonCode}\n`);
  process.stdout.write(`Next action: ${manifest.nextAction}\n`);
}

await main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
