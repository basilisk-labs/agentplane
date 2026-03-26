import { execFileSync } from "node:child_process";

const EXPECTED_CHECKS = ["Core CI / test", "Core CI / test-windows", "Docs CI / docs"];

function usage() {
  process.stdout.write(
    [
      "Usage: bun run workflow:github-protection:check -- [--repo <owner/name>] [--branch <name>]",
      "",
      "Audit the GitHub branch protection contract for the canonical branch_pr merge gate.",
      "This command validates that the protected branch requires the expected GitHub Actions",
      "check-runs and that each required check is bound to a concrete GitHub app instead of",
      "an unbound legacy status context.",
      "",
      "Examples:",
      "  bun run workflow:github-protection:check",
      "  bun run workflow:github-protection:check -- --repo basilisk-labs/agentplane --branch main",
    ].join("\n"),
  );
}

function parseArgs(argv) {
  const options = {
    branch: "main",
    repo: "basilisk-labs/agentplane",
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
    if (arg === "--branch") {
      const value = argv[index + 1];
      if (!value) throw new Error("Missing value for --branch");
      options.branch = value;
      index += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

function runGh(args) {
  try {
    return execFileSync("gh", args, {
      cwd: process.cwd(),
      env: process.env,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      throw new Error(
        "Missing required gh CLI. Install GitHub CLI and authenticate before running this audit.",
      );
    }
    const stderr =
      error && typeof error === "object" && "stderr" in error ? String(error.stderr ?? "") : "";
    throw new Error(stderr.trim() || `gh api failed for args: ${args.join(" ")}`);
  }
}

function normalizeChecks(payload) {
  const required = payload?.required_status_checks;
  if (!required) {
    throw new Error("Branch protection does not define required_status_checks.");
  }
  const checks = Array.isArray(required.checks) ? required.checks : [];
  const contexts = Array.isArray(required.contexts) ? required.contexts : [];
  return {
    strict: required.strict === true,
    checks: checks.map((entry) => ({
      appId: typeof entry?.app_id === "number" ? entry.app_id : null,
      context: String(entry?.context ?? ""),
    })),
    contexts: contexts.map(String),
  };
}

function compareExpected(actualContexts) {
  const missing = EXPECTED_CHECKS.filter((name) => !actualContexts.includes(name));
  const extras = actualContexts.filter((name) => !EXPECTED_CHECKS.includes(name));
  return { extras, missing };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    usage();
    return;
  }

  const protectionJson = runGh([
    "api",
    `repos/${options.repo}/branches/${options.branch}/protection`,
  ]);
  const normalized = normalizeChecks(JSON.parse(protectionJson));
  const expected = compareExpected(normalized.contexts);

  const errors = [];
  if (!normalized.strict) {
    errors.push("required_status_checks.strict must be true.");
  }
  if (expected.missing.length > 0) {
    errors.push(`Missing required checks: ${expected.missing.join(", ")}`);
  }
  if (expected.extras.length > 0) {
    errors.push(`Unexpected required checks: ${expected.extras.join(", ")}`);
  }

  for (const check of normalized.checks) {
    if (!EXPECTED_CHECKS.includes(check.context)) continue;
    if (check.appId === null) {
      errors.push(
        `Required check '${check.context}' is not bound to a concrete GitHub app (app_id=null).`,
      );
    }
  }

  if (errors.length > 0) {
    throw new Error(
      [
        `GitHub protection contract mismatch for ${options.repo}#${options.branch}`,
        ...errors.map((line) => `- ${line}`),
        "",
        "Expected canonical required checks:",
        ...EXPECTED_CHECKS.map((name) => `- ${name}`),
      ].join("\n"),
    );
  }

  const appBindings = normalized.checks
    .filter((entry) => EXPECTED_CHECKS.includes(entry.context))
    .map((entry) => `${entry.context} [app_id=${entry.appId}]`);

  process.stdout.write(
    [
      `GitHub protection contract OK for ${options.repo}#${options.branch}`,
      `strict=true`,
      ...appBindings,
    ].join("\n") + "\n",
  );
}

try {
  main();
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
