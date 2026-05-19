import { execFileSync } from "node:child_process";

import { parseScriptArgs } from "../lib/script-runtime.mjs";

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
  if (args.push && !args.yes) {
    throw new Error("--push requires --yes");
  }

  const dryRun = !args.write;
  const commands = [
    ["bun", ["run", "release:state"]],
    ["bun", ["run", "release:tasks:check"]],
    ["bun", ["run", "release:incidents:check"]],
    ["ap", ["release", "plan", `--${args.bump}`, ...(args.bump === "patch" ? [] : ["--yes"])]],
    [
      "bun",
      [
        "run",
        "release:version:bump",
        "--",
        ...(args.version ? ["--version", args.version] : ["--bump", args.bump]),
        "--write",
      ],
    ],
    [
      "bun",
      ["run", "release:check:registry", "--", ...(args.version ? ["--version", args.version] : [])],
    ],
    ["bun", ["run", "release:prepublish:fast"]],
    ["ap", ["release", "candidate", ...(args.push ? ["--push", "--yes"] : [])]],
  ];

  if (args.json) {
    process.stdout.write(
      `${JSON.stringify({ schema_version: 1, dry_run: dryRun, commands }, null, 2)}\n`,
    );
    return;
  }

  process.stdout.write(`${dryRun ? "dry-run" : "running"} release candidate preparation\n`);
  for (const [cmd, argv] of commands) {
    run(cmd, argv, { dryRun, inherit: true });
  }
}

try {
  main();
} catch (error) {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
