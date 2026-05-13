import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

function usage() {
  return [
    "Usage: node scripts/resolve-canonical-release-sha.mjs [options]",
    "",
    "Resolve the canonical first-parent release commit for the current workspace version.",
    "",
    "Options:",
    "  --ref <git-ref>        Git ref to inspect (default: HEAD)",
    "  --max-count <n>        Maximum first-parent commits to inspect (default: 128)",
    "  --json                 Emit machine-readable output",
    "  --help, -h             Show this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const out = {
    ref: "HEAD",
    maxCount: 128,
    json: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index] ?? "";
    if (arg === "--ref") {
      out.ref = argv[index + 1] ?? out.ref;
      index += 1;
      continue;
    }
    if (arg === "--max-count") {
      const value = Number.parseInt(argv[index + 1] ?? "", 10);
      if (!Number.isFinite(value) || value <= 0) {
        throw new Error("invalid --max-count");
      }
      out.maxCount = value;
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

function safeTrim(value) {
  return typeof value === "string" ? value.trim() : "";
}

async function git(args, cwd) {
  const result = await execFileAsync("git", args, {
    cwd,
    env: process.env,
    maxBuffer: 20 * 1024 * 1024,
  });
  return safeTrim(String(result.stdout ?? ""));
}

async function gitMaybe(args, cwd) {
  try {
    return {
      ok: true,
      stdout: await git(args, cwd),
    };
  } catch (error) {
    return {
      ok: false,
      stdout: safeTrim(String(error?.stdout ?? "")),
      stderr: safeTrim(String(error?.stderr ?? error?.message ?? "")),
    };
  }
}

async function readJsonAtCommit(cwd, sha, filePath) {
  const result = await gitMaybe(["show", `${sha}:${filePath}`], cwd);
  if (!result.ok || !result.stdout) return null;
  return JSON.parse(result.stdout);
}

async function readReleaseState(cwd, sha) {
  const corePackage = await readJsonAtCommit(cwd, sha, "packages/core/package.json");
  const cliPackage = await readJsonAtCommit(cwd, sha, "packages/agentplane/package.json");
  if (!corePackage || !cliPackage) return null;

  const coreVersion = safeTrim(corePackage.version);
  const cliVersion = safeTrim(cliPackage.version);
  const coreDependencyVersion = safeTrim(cliPackage.dependencies?.["@agentplaneorg/core"]);
  if (!coreVersion || !cliVersion) return null;

  const tag = `v${cliVersion}`;
  const notesPath = `docs/releases/${tag}.md`;
  const notes = await gitMaybe(["show", `${sha}:${notesPath}`], cwd);

  return {
    sha,
    coreVersion,
    cliVersion,
    coreDependencyVersion,
    tag,
    notesPath,
    notesPresent: notes.ok && Boolean(notes.stdout),
  };
}

function isReadySurfaceForVersion(state, version) {
  return Boolean(
    state &&
    state.coreVersion === version &&
    state.cliVersion === version &&
    state.coreDependencyVersion === version &&
    state.notesPresent,
  );
}

function buildOutcome({
  ok,
  sha = null,
  version,
  tag,
  notesPath,
  maxCount,
  message,
  nextAction = null,
}) {
  return {
    ok,
    sha,
    version,
    tag,
    notesPath,
    maxCount,
    message,
    nextAction,
  };
}

async function resolveCanonicalReleaseSha(cwd, ref, maxCount) {
  const headState = await readReleaseState(cwd, ref);
  if (!headState) {
    return buildOutcome({
      ok: false,
      version: null,
      tag: null,
      notesPath: null,
      maxCount,
      message: `Current ref ${ref} does not contain a readable release workspace.`,
      nextAction:
        "Checkout the intended repository root before resolving the canonical release SHA.",
    });
  }

  const targetVersion = headState.cliVersion;
  if (!isReadySurfaceForVersion(headState, targetVersion)) {
    return buildOutcome({
      ok: false,
      version: targetVersion,
      tag: headState.tag,
      notesPath: headState.notesPath,
      maxCount,
      message: `Current ref ${ref} is not release-ready for ${headState.tag}.`,
      nextAction:
        "Restore version parity and release notes on the current ref before resolving a canonical publish SHA.",
    });
  }

  const rawHistory = await git(
    ["rev-list", "--first-parent", "--parents", `--max-count=${maxCount}`, ref],
    cwd,
  );
  const entries = rawHistory
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [sha, parent = null] = line.split(/\s+/u);
      return { sha, parent };
    });

  for (const entry of entries) {
    const state = await readReleaseState(cwd, entry.sha);
    if (!isReadySurfaceForVersion(state, targetVersion)) continue;
    const parentState = entry.parent ? await readReleaseState(cwd, entry.parent) : null;
    if (isReadySurfaceForVersion(parentState, targetVersion)) continue;
    return buildOutcome({
      ok: true,
      sha: entry.sha,
      version: targetVersion,
      tag: state?.tag ?? `v${targetVersion}`,
      notesPath: state?.notesPath ?? `docs/releases/v${targetVersion}.md`,
      maxCount,
      message: `Resolved canonical release SHA ${entry.sha} for ${state?.tag ?? `v${targetVersion}`}.`,
    });
  }

  return buildOutcome({
    ok: false,
    version: targetVersion,
    tag: headState.tag,
    notesPath: headState.notesPath,
    maxCount,
    message: `No canonical release commit was found within ${maxCount} first-parent commits for ${headState.tag}.`,
    nextAction:
      "Inspect first-parent history and confirm where this release version first entered main before retrying publish recovery.",
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }

  const outcome = await resolveCanonicalReleaseSha(process.cwd(), args.ref, args.maxCount);
  if (args.json) {
    process.stdout.write(`${JSON.stringify(outcome)}\n`);
  } else {
    process.stdout.write(`${outcome.message}\n`);
    if (outcome.nextAction) {
      process.stdout.write(`Next action: ${outcome.nextAction}\n`);
    }
  }

  if (!outcome.ok) {
    process.exitCode = 1;
  }
}

await main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
