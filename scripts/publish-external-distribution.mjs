import { execFile } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { mkdir, writeFile, copyFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { defineScript, parseScriptArgs, runScriptMain } from "./lib/script-runtime.mjs";

const execFileAsync = promisify(execFile);

function usage() {
  return [
    "Usage: node scripts/publish-external-distribution.mjs [options]",
    "",
    "Open or update an external distribution repository PR from generated release artifacts.",
    "",
    "Options:",
    "  --module <name>         Evidence module name",
    "  --repo <owner/name>     Target GitHub repository",
    "  --source <dir>          Generated artifact source directory",
    "  --copy <from:to>        Copy source-relative file to target-relative file; repeatable",
    "  --version <version>     Release version",
    "  --tag <tag>             Release tag",
    "  --sha <sha>             Release commit SHA",
    "  --token-env <name>      Environment variable containing target repo token",
    "  --out <path>            Evidence JSON path",
    "  --json                  Emit evidence JSON to stdout",
    "  --help, -h              Show this help text",
  ].join("\n");
}

function parseArgs(argv, repoRoot) {
  const copyArgs = [];
  const passthroughArgs = [];
  for (let index = 0; index < argv.length; index += 1) {
    const raw = argv[index] ?? "";
    if (raw === "--copy") {
      const value = argv[index + 1];
      if (!value) throw new Error("Missing value for --copy");
      copyArgs.push(value);
      index += 1;
      continue;
    }
    if (raw.startsWith("--copy=")) {
      copyArgs.push(raw.slice("--copy=".length));
      continue;
    }
    passthroughArgs.push(raw);
  }
  const { flags } = parseScriptArgs(passthroughArgs, {
    valueFlags: ["module", "repo", "source", "version", "tag", "sha", "token-env", "out"],
    booleanFlags: ["json", "help"],
  });
  return {
    module: String(flags.module ?? "").trim(),
    repo: String(flags.repo ?? "").trim(),
    sourceDir: path.resolve(repoRoot, String(flags.source ?? "")),
    copies: copyArgs,
    version: String(flags.version ?? "").trim(),
    tag: String(flags.tag ?? "").trim(),
    sha: String(flags.sha ?? "").trim(),
    tokenEnv: String(flags["token-env"] ?? "").trim(),
    outPath: path.resolve(repoRoot, String(flags.out ?? "")),
    json: Boolean(flags.json),
    help: Boolean(flags.help),
  };
}

function requireNonEmpty(value, label) {
  if (!value) throw new Error(`Missing required ${label}.`);
  return value;
}

function parseCopySpec(value) {
  const index = value.indexOf(":");
  if (index <= 0 || index === value.length - 1) {
    throw new Error(`Invalid --copy value: ${value}`);
  }
  const from = value.slice(0, index);
  const to = value.slice(index + 1);
  if (path.isAbsolute(from) || path.isAbsolute(to) || from.includes("..") || to.includes("..")) {
    throw new Error(`Unsafe --copy value: ${value}`);
  }
  return { from, to };
}

async function run(command, args, opts = {}) {
  return execFileAsync(command, args, {
    cwd: opts.cwd,
    env: opts.env ?? process.env,
    maxBuffer: 20 * 1024 * 1024,
  });
}

async function writeEvidence(outPath, evidence) {
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, `${JSON.stringify(evidence, null, 2)}\n`, "utf8");
}

async function copyArtifacts(opts) {
  for (const spec of opts.copies) {
    const from = path.join(opts.sourceDir, spec.from);
    const to = path.join(opts.cloneDir, spec.to);
    await mkdir(path.dirname(to), { recursive: true });
    await copyFile(from, to);
  }
}

async function publishExternal(args) {
  requireNonEmpty(args.module, "module");
  requireNonEmpty(args.repo, "repo");
  requireNonEmpty(args.sourceDir, "source");
  requireNonEmpty(args.version, "version");
  requireNonEmpty(args.tag, "tag");
  requireNonEmpty(args.sha, "sha");
  requireNonEmpty(args.tokenEnv, "token env");
  requireNonEmpty(args.outPath, "out path");
  if (args.copies.length === 0) throw new Error("At least one --copy is required.");

  const token = String(process.env[args.tokenEnv] ?? "").trim();
  const baseEvidence = {
    schemaVersion: 1,
    module: args.module,
    repository: args.repo,
    version: args.version,
    tag: args.tag,
    sha: args.sha,
    requiredSecret: args.tokenEnv,
  };
  if (!token) {
    return {
      ...baseEvidence,
      status: "skipped_missing_credentials",
      nextAction: `Add ${args.tokenEnv} and rerun this distribution publication module.`,
    };
  }

  const tempRoot = mkdtempSync(path.join(os.tmpdir(), "agentplane-external-dist-"));
  const cloneDir = path.join(tempRoot, "repo");
  const branch = `agentplane/${args.tag}`;
  const env = { ...process.env, GH_TOKEN: token, GITHUB_TOKEN: token };
  try {
    await run("gh", ["repo", "clone", args.repo, cloneDir, "--", "--depth", "1"], { env });
    await run("gh", ["auth", "setup-git", "--hostname", "github.com"], { cwd: cloneDir, env });
    await run("git", ["switch", "-C", branch], { cwd: cloneDir, env });
    await copyArtifacts({
      sourceDir: args.sourceDir,
      cloneDir,
      copies: args.copies.map((copy) => parseCopySpec(copy)),
    });
    const { stdout: statusStdout } = await run("git", ["status", "--short"], {
      cwd: cloneDir,
      env,
    });
    if (!statusStdout.trim()) {
      return {
        ...baseEvidence,
        status: "unchanged",
        branch,
        nextAction: "No external distribution repository changes were needed.",
      };
    }
    await run("git", ["config", "user.name", "github-actions[bot]"], { cwd: cloneDir, env });
    await run("git", ["config", "user.email", "github-actions[bot]@users.noreply.github.com"], {
      cwd: cloneDir,
      env,
    });
    await run("git", ["add", "."], { cwd: cloneDir, env });
    await run("git", ["commit", "-m", `agentplane: publish ${args.version}`], {
      cwd: cloneDir,
      env,
    });
    await run("git", ["push", "--set-upstream", "origin", branch, "--force-with-lease"], {
      cwd: cloneDir,
      env,
    });

    const { stdout: existingPr } = await run(
      "gh",
      [
        "pr",
        "list",
        "--repo",
        args.repo,
        "--state",
        "open",
        "--head",
        branch,
        "--json",
        "url",
        "--jq",
        '.[0].url // ""',
      ],
      { cwd: cloneDir, env },
    );
    const existingPrUrl = existingPr.trim();
    let createdPrUrl = "";
    if (!existingPrUrl) {
      const createdPr = await run(
        "gh",
        [
          "pr",
          "create",
          "--repo",
          args.repo,
          "--base",
          "main",
          "--head",
          branch,
          "--title",
          `agentplane: publish ${args.version}`,
          "--body",
          `Publish AgentPlane ${args.version} from ${args.sha}.`,
        ],
        { cwd: cloneDir, env },
      );
      createdPrUrl = createdPr.stdout.trim();
    }
    const prUrl = existingPrUrl || createdPrUrl;
    return {
      ...baseEvidence,
      status: "pr_opened",
      branch,
      prUrl,
      nextAction: `Review and merge ${prUrl}.`,
    };
  } finally {
    rmSync(tempRoot, { recursive: true, force: true });
  }
}

const main = defineScript({
  name: "publish-external-distribution",
  async run(context) {
    const args = parseArgs(context.argv, context.cwd);
    if (args.help) {
      context.stdout.write(`${usage()}\n`);
      return;
    }
    const evidence = await publishExternal(args);
    await writeEvidence(args.outPath, evidence);
    if (args.json) {
      context.stdout.write(`${JSON.stringify(evidence)}\n`);
      return;
    }
    context.stdout.write(`${args.module} external publish ${evidence.status}\n`);
  },
});

runScriptMain(main);
