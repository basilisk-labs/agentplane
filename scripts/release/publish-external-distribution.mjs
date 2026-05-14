import { execFile } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { mkdir, writeFile, copyFile, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { defineScript, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";

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
    "  --repo-topics <list>    Comma-separated topics to set on target repository",
    "  --repo-description <text>  Repository description to apply",
    "  --repo-homepage <url>   Repository homepage URL to apply",
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
    valueFlags: [
      "module",
      "repo",
      "source",
      "version",
      "tag",
      "sha",
      "token-env",
      "repo-topics",
      "repo-description",
      "repo-homepage",
      "out",
    ],
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
    topics: parseCommaList(String(flags["repo-topics"] ?? "")),
    description: String(flags["repo-description"] ?? "").trim(),
    homepage: String(flags["repo-homepage"] ?? "").trim(),
    outPath: path.resolve(repoRoot, String(flags.out ?? "")),
    json: Boolean(flags.json),
    help: Boolean(flags.help),
  };
}

function parseCommaList(value) {
  return [
    ...new Set(
      value
        .split(",")
        .map((entry) => entry.trim())
        .filter((entry) => entry.length > 0)
        .map((entry) => entry.replace(/^["']/, "").replace(/["']$/, "")),
    ),
  ];
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
    input: opts.input,
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

  function classifyMetadataError(error) {
    const stdout = String(error?.stdout ?? "").trim();
    const stderr = String(error?.stderr ?? "").trim();
    const message =
      `${stderr}\n${stdout}\n${error instanceof Error ? error.message : String(error)}`
        .trim()
        .replaceAll(/\n+/gu, "\n");
    if (/HTTP 403|Resource not accessible by personal access token/iu.test(message)) {
      return {
        status: "permission_denied",
        reasonCode: "external_metadata_permission_denied",
        message,
      };
    }
    return {
      status: "failed",
      reasonCode: "external_metadata_update_failed",
      message,
    };
  }

  async function syncRepositoryMetadata(cloneDir) {
    const updates = [];
    const warnings = [];
    if (args.topics.length > 0) {
      const topicsPayloadPath = path.join(tempRoot, "repository-topics.json");
      await writeFile(topicsPayloadPath, `${JSON.stringify({ names: args.topics })}\n`, "utf8");
      try {
        await run(
          "gh",
          [
            "api",
            "--method",
            "PUT",
            `/repos/${args.repo}/topics`,
            "-H",
            "Accept: application/vnd.github+json",
            "--input",
            topicsPayloadPath,
          ],
          { cwd: cloneDir, env },
        );
        updates.push("topics");
      } catch (error) {
        warnings.push({
          target: "topics",
          ...classifyMetadataError(error),
        });
      }
    }
    const patchFields = [];
    if (args.description) patchFields.push("-f", `description=${args.description}`);
    if (args.homepage) patchFields.push("-f", `homepage=${args.homepage}`);
    if (patchFields.length > 0) {
      try {
        await run("gh", ["api", "--method", "PATCH", `/repos/${args.repo}`, ...patchFields], {
          cwd: cloneDir,
          env,
        });
        updates.push("repository");
      } catch (error) {
        warnings.push({
          target: "repository",
          ...classifyMetadataError(error),
        });
      }
    }
    return {
      attempted: args.topics.length > 0 || patchFields.length > 0,
      updated: updates,
      warnings,
      ok: warnings.length === 0,
    };
  }

  async function verifyDefaultBranchPublished(cloneDir) {
    await run("git", ["fetch", "origin", "main"], { cwd: cloneDir, env });
    await run("git", ["switch", "main"], { cwd: cloneDir, env });
    await run("git", ["pull", "--ff-only", "origin", "main"], { cwd: cloneDir, env });
    const mismatches = [];
    for (const copy of args.copies.map((entry) => parseCopySpec(entry))) {
      const source = await readFile(path.join(args.sourceDir, copy.from), "utf8");
      const target = await readFile(path.join(cloneDir, copy.to), "utf8").catch(() => null);
      if (target !== source) mismatches.push(copy.to);
    }
    if (mismatches.length > 0) {
      return {
        ok: false,
        mismatches,
      };
    }
    const { stdout } = await run("git", ["rev-parse", "HEAD"], { cwd: cloneDir, env });
    return {
      ok: true,
      branch: "main",
      sha: stdout.trim(),
      mismatches,
    };
  }

  async function ensureSetupAgentplaneTag(cloneDir) {
    if (args.module !== "setup-agentplane") return null;
    const tagRef = `refs/tags/${args.tag}`;
    try {
      const { stdout: headStdout } = await run("git", ["rev-parse", "HEAD"], {
        cwd: cloneDir,
        env,
      });
      const headSha = headStdout.trim();
      const { stdout: existingStdout } = await run(
        "git",
        ["ls-remote", "--tags", "origin", tagRef],
        {
          cwd: cloneDir,
          env,
        },
      );
      const existingSha = existingStdout
        .trim()
        .split(/\s+/u)
        .find((entry) => /^[0-9a-f]{40}$/iu.test(entry));
      if (existingSha) {
        return {
          status: existingSha === headSha ? "published" : "failed",
          tag: args.tag,
          sha: existingSha,
          message:
            existingSha === headSha
              ? "setup-agentplane tag already points at the published commit."
              : `setup-agentplane tag ${args.tag} points at ${existingSha}, expected ${headSha}.`,
        };
      }
      await run("git", ["tag", args.tag], { cwd: cloneDir, env });
      await run("git", ["push", "origin", `${tagRef}:${tagRef}`], {
        cwd: cloneDir,
        env,
      });
      const { stdout: pushedStdout } = await run("git", ["ls-remote", "--tags", "origin", tagRef], {
        cwd: cloneDir,
        env,
      });
      const pushedSha = pushedStdout
        .trim()
        .split(/\s+/u)
        .find((entry) => /^[0-9a-f]{40}$/iu.test(entry));
      return {
        status: pushedSha === headSha ? "published" : "not_confirmed",
        tag: args.tag,
        sha: pushedSha ?? null,
      };
    } catch (error) {
      return {
        status: "failed",
        tag: args.tag,
        message: String(error?.stderr ?? error?.message ?? error).trim(),
      };
    }
  }

  async function mergeAndVerifyExternalPr(cloneDir, prUrl) {
    const mergeAttempts = [];
    try {
      await run("gh", ["pr", "merge", "--repo", args.repo, "--merge", "--delete-branch", prUrl], {
        cwd: cloneDir,
        env,
      });
      mergeAttempts.push({ mode: "merge", status: "success" });
    } catch (error) {
      mergeAttempts.push({
        mode: "merge",
        status: "failed",
        message: String(error?.stderr ?? error?.message ?? error).trim(),
      });
      try {
        await run(
          "gh",
          ["pr", "merge", "--repo", args.repo, "--auto", "--merge", "--delete-branch", prUrl],
          { cwd: cloneDir, env },
        );
        mergeAttempts.push({ mode: "auto_merge", status: "enabled" });
      } catch (autoError) {
        mergeAttempts.push({
          mode: "auto_merge",
          status: "failed",
          message: String(autoError?.stderr ?? autoError?.message ?? autoError).trim(),
        });
      }
      return {
        status: "pr_opened",
        mergeAttempts,
        verification: null,
        setupTag: null,
      };
    }

    const verification = await verifyDefaultBranchPublished(cloneDir);
    const setupTag = verification.ok ? await ensureSetupAgentplaneTag(cloneDir) : null;
    if (!verification.ok) {
      return {
        status: "merge_unverified",
        mergeAttempts,
        verification,
        setupTag,
      };
    }
    if (setupTag && setupTag.status !== "published") {
      return {
        status: "tag_unverified",
        mergeAttempts,
        verification,
        setupTag,
      };
    }
    return {
      status: "published",
      mergeAttempts,
      verification,
      setupTag,
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
      const metadata = await syncRepositoryMetadata(cloneDir);
      return {
        ...baseEvidence,
        status: "unchanged",
        branch,
        metadata,
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
    const metadata = await syncRepositoryMetadata(cloneDir);
    const publication = await mergeAndVerifyExternalPr(cloneDir, prUrl);
    return {
      ...baseEvidence,
      status: publication.status,
      branch,
      prUrl,
      metadata,
      mergeAttempts: publication.mergeAttempts,
      verification: publication.verification,
      setupTag: publication.setupTag,
      nextAction:
        publication.status === "published"
          ? `External distribution published through ${prUrl}.`
          : `Review and merge ${prUrl}; this channel is not published until main contains ${args.version}.`,
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
