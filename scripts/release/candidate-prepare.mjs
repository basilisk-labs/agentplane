import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import { parseScriptArgs } from "../lib/script-runtime.mjs";

const PLAN_ROOT = path.join(".agentplane", ".release", "plan");

function planDirectories() {
  try {
    return readdirSync(PLAN_ROOT, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }
}

function readCreatedPlan(previousDirectories, args) {
  const created = planDirectories().filter((name) => !previousDirectories.includes(name));
  if (created.length !== 1) {
    throw new Error("Expected exactly one new native release plan directory");
  }
  const directory = path.join(PLAN_ROOT, created[0]);
  const plan = JSON.parse(readFileSync(path.join(directory, "version.json"), "utf8"));
  if (
    !plan ||
    typeof plan.nextVersion !== "string" ||
    !/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/u.test(plan.nextVersion) ||
    plan.nextTag !== `v${plan.nextVersion}` ||
    typeof plan.prevVersion !== "string" ||
    plan.prevVersion.trim() === "" ||
    plan.bump !== args.bump
  ) {
    throw new Error("Invalid native release plan version metadata");
  }
  if (args.version && args.version !== plan.nextVersion) {
    throw new Error(
      `Requested version ${args.version} does not match planned version ${plan.nextVersion}`,
    );
  }
  return { directory, version: plan.nextVersion };
}

function run(cmd, args, opts = {}) {
  if (opts.dryRun) {
    process.stdout.write(`dry-run: ${cmd} ${args.join(" ")}\n`);
    return "";
  }
  return execFileSync(cmd, args, { encoding: "utf8", stdio: opts.inherit ? "inherit" : "pipe" });
}

function parse() {
  const { flags } = parseScriptArgs(process.argv.slice(2), {
    valueFlags: ["bump", "version"],
    booleanFlags: ["write", "push", "yes", "json"],
  });
  return {
    bump: String(flags.bump ?? "patch"),
    version: flags.version ? String(flags.version) : null,
    write: flags.write === true,
    push: flags.push === true,
    yes: flags.yes === true,
    json: flags.json === true,
  };
}

function main() {
  const args = parse();
  if (!["patch", "minor", "major"].includes(args.bump)) {
    throw new Error(`Invalid --bump value: ${args.bump}`);
  }
  if (args.push && !args.yes) {
    throw new Error("--push requires --yes");
  }
  if (args.bump !== "patch" && !args.yes) {
    throw new Error(`--bump ${args.bump} requires --yes`);
  }

  const dryRun = !args.write;
  const commands = [
    ["bun", ["run", "release:state"]],
    ["bun", ["run", "release:tasks:check"]],
    ["bun", ["run", "release:incidents:check"]],
    ["ap", ["release", "plan", `--${args.bump}`, ...(args.yes ? ["--yes"] : [])]],
    ["bun", ["run", "release:check:registry", "--", "--version", "<planned-version>"]],
    ["bun", ["run", "release:prepublish:fast"]],
    [
      "ap",
      [
        "release",
        "candidate",
        "--plan",
        "<generated-plan-directory>",
        ...(args.push ? ["--push"] : []),
        ...(args.yes ? ["--yes"] : []),
      ],
    ],
  ];

  if (args.json) {
    process.stdout.write(
      `${JSON.stringify({ schema_version: 1, dry_run: dryRun, commands }, null, 2)}\n`,
    );
    return;
  }

  process.stdout.write(`${dryRun ? "dry-run" : "running"} release candidate preparation\n`);
  let plan = null;
  for (const [cmd, argv] of commands) {
    const createsPlan = cmd === "ap" && argv[1] === "plan";
    const previousDirectories = !dryRun && createsPlan ? planDirectories() : null;
    const resolvedArgv = argv.map((arg) => {
      if (arg === "<planned-version>" && plan) return plan.version;
      if (arg === "<generated-plan-directory>" && plan) return plan.directory;
      return arg;
    });
    run(cmd, resolvedArgv, { dryRun, inherit: true });
    if (previousDirectories) plan = readCreatedPlan(previousDirectories, args);
  }
}

try {
  main();
} catch (error) {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
