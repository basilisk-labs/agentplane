import { parseScriptArgs } from "../lib/script-runtime.mjs";
import { applyNextDevelopmentVersion } from "../lib/next-development-version.mjs";

function usage() {
  return [
    "Usage: node scripts/release/open-next-development-version.mjs --published-version <semver> [--write] [--skip-install] [--json]",
    "",
    "After a successful stable publish, open the next patch development line as X.Y.(Z+1)-beta.1.",
    "The operation is dry-run by default and idempotent when the workspace is already at or beyond that version.",
  ].join("\n");
}

function main() {
  const { flags } = parseScriptArgs(process.argv.slice(2), {
    valueFlags: ["published-version"],
    booleanFlags: ["write", "skip-install", "json", "help"],
  });
  if (flags.help === true) {
    process.stdout.write(`${usage()}\n`);
    return;
  }
  const publishedVersion = String(flags["published-version"] ?? "").trim();
  if (!publishedVersion) throw new Error("Missing --published-version.");
  const result = applyNextDevelopmentVersion(process.cwd(), publishedVersion, {
    write: flags.write === true,
    skipInstall: flags["skip-install"] === true,
    quiet: flags.json === true,
  });
  const payload = {
    schema_version: 1,
    operation: "release.open_next_development_version",
    action: result.action,
    reason: result.reason,
    dry_run: result.dryRun,
    published_version: result.publishedVersion,
    previous_version: result.currentVersion,
    next_version: result.nextVersion,
    changed_paths: result.changedPaths,
  };
  if (flags.json === true) {
    process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
    return;
  }
  process.stdout.write(
    `${payload.action}: ${payload.previous_version} -> ${payload.next_version ?? "unchanged"} (${payload.reason})\n`,
  );
}

try {
  main();
} catch (error) {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.stderr.write(`${usage()}\n`);
  process.exitCode = 1;
}
