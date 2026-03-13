import { execFile } from "node:child_process";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import {
  readLatestWorkflowStatus,
  resolveGithubApiBase,
  resolveGithubRepo,
  resolveGithubToken,
} from "./lib/github-actions-workflow-status.mjs";

const execFileAsync = promisify(execFile);

function usage() {
  return [
    "Usage: node scripts/check-release-recovery-state.mjs [options]",
    "",
    "Inspect the latest release plan and the current repository state, then report",
    "partial-release recovery states with explicit next actions.",
    "",
    "Options:",
    "  --plan <path>          Use a specific release plan directory",
    "  --remote <name>        Git remote to inspect for release tag state (default: origin)",
    "  --check-registry       Run the npm version availability check for the target version",
    "  --check-github         Inspect GitHub workflow state for the release SHA",
    "  --github-repo <slug>   GitHub repository slug (default: $GITHUB_REPOSITORY)",
    "  --github-sha <sha>     Override the release SHA used for GitHub workflow inspection",
    "  --core-workflow <id>   Core CI workflow file or ID (default: ci.yml)",
    "  --publish-workflow <id> Publish workflow file or ID (default: publish.yml)",
    "  --json                 Emit a machine-readable report",
    "  --help, -h            Show this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const out = {
    plan: null,
    remote: "origin",
    checkRegistry: false,
    checkGithub: false,
    githubRepo: process.env.GITHUB_REPOSITORY ?? null,
    githubSha: null,
    coreWorkflow: "ci.yml",
    publishWorkflow: "publish.yml",
    json: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index] ?? "";
    if (arg === "--plan") {
      out.plan = path.resolve(argv[index + 1] ?? "");
      index += 1;
      continue;
    }
    if (arg === "--remote") {
      out.remote = String(argv[index + 1] ?? "").trim() || "origin";
      index += 1;
      continue;
    }
    if (arg === "--check-registry") {
      out.checkRegistry = true;
      continue;
    }
    if (arg === "--check-github") {
      out.checkGithub = true;
      continue;
    }
    if (arg === "--github-repo") {
      out.githubRepo = argv[index + 1] ?? out.githubRepo;
      index += 1;
      continue;
    }
    if (arg === "--github-sha") {
      out.githubSha = argv[index + 1] ?? out.githubSha;
      index += 1;
      continue;
    }
    if (arg === "--core-workflow") {
      out.coreWorkflow = argv[index + 1] ?? out.coreWorkflow;
      index += 1;
      continue;
    }
    if (arg === "--publish-workflow") {
      out.publishWorkflow = argv[index + 1] ?? out.publishWorkflow;
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

async function fileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

function assertNonEmptyString(value, label) {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) throw new Error(`invalid ${label}`);
  return text;
}

function parseVersionPlan(raw) {
  if (!raw || typeof raw !== "object") throw new Error("invalid version plan");
  return {
    prevTag: raw.prevTag === null ? null : typeof raw.prevTag === "string" ? raw.prevTag : null,
    prevVersion: assertNonEmptyString(raw.prevVersion, "prevVersion"),
    nextTag: assertNonEmptyString(raw.nextTag, "nextTag"),
    nextVersion: assertNonEmptyString(raw.nextVersion, "nextVersion"),
    bump: assertNonEmptyString(raw.bump, "bump"),
  };
}

async function findLatestPlanDir(repoRoot) {
  const base = path.join(repoRoot, ".agentplane", ".release", "plan");
  const dirEntries = await readdir(base);
  const entries = dirEntries
    .map((entry) => entry.trim())
    .filter(Boolean)
    .toSorted();
  const latest = entries.at(-1);
  if (!latest) {
    throw new Error("no release plan runs found under .agentplane/.release/plan");
  }
  return path.join(base, latest);
}

async function readPackageVersion(pkgPath) {
  const raw = await readJson(pkgPath);
  return assertNonEmptyString(raw.version, `version in ${pkgPath}`);
}

async function gitProbe(repoRoot, args) {
  try {
    const result = await execFileAsync("git", args, {
      cwd: repoRoot,
      env: process.env,
      maxBuffer: 20 * 1024 * 1024,
    });
    return {
      ok: true,
      stdout: String(result.stdout ?? "").trim(),
      stderr: String(result.stderr ?? "").trim(),
    };
  } catch (error) {
    return {
      ok: false,
      stdout: String(error?.stdout ?? "").trim(),
      stderr: String(error?.stderr ?? error?.message ?? "").trim(),
    };
  }
}

async function checkRegistryAvailability(repoRoot, version) {
  const scriptPath = path.join(repoRoot, "scripts", "check-npm-version-availability.mjs");
  if (!(await fileExists(scriptPath))) {
    return {
      status: "unavailable",
      detail: `registry check script is missing: ${scriptPath}`,
    };
  }

  try {
    const result = await execFileAsync("node", [scriptPath, "--version", version], {
      cwd: repoRoot,
      env: process.env,
      maxBuffer: 20 * 1024 * 1024,
    });
    return {
      status: "available",
      detail: String(result.stdout ?? "").trim(),
    };
  } catch (error) {
    const detail = `${String(error?.stderr ?? "").trim()}\n${String(error?.stdout ?? "").trim()}`
      .trim()
      .replaceAll(/\n+/gu, "\n");
    return {
      status: "blocked",
      detail,
    };
  }
}

function pushFinding(report, finding) {
  report.findings.push(finding);
}

async function readLatestApplyReport(repoRoot) {
  const latestPath = path.join(repoRoot, ".agentplane", ".release", "apply", "latest.json");
  if (!(await fileExists(latestPath))) return null;

  const raw = await readJson(latestPath);
  if (!raw || typeof raw !== "object") return null;
  return {
    path: latestPath,
    planDir: typeof raw.plan_dir === "string" ? raw.plan_dir : "",
    nextTag: typeof raw.next_tag === "string" ? raw.next_tag : "",
    nextVersion: typeof raw.next_version === "string" ? raw.next_version : "",
    commitHash:
      raw.commit && typeof raw.commit === "object" && typeof raw.commit.hash === "string"
        ? raw.commit.hash.trim()
        : "",
  };
}

function deriveRecoverySummary(report, args) {
  if (
    report.current.github.checked &&
    report.current.github.publish.state === "success" &&
    report.current.github.coreCi.state === "completed_not_success"
  ) {
    return {
      state: "release_already_published_with_red_core_ci",
      likelyCause:
        "the GitHub publish workflow already succeeded for the release SHA, but sibling Core CI completed red on the same commit",
      nextAction:
        "Do not rerun publish for this version. Fix the failing Core CI issue on a follow-up commit, then use workflow_dispatch publish only if a newer recovery SHA still needs publication.",
    };
  }

  if (report.current.github.checked && report.current.github.publish.state === "success") {
    return {
      state: "release_publish_already_succeeded",
      likelyCause:
        "the GitHub publish workflow already completed successfully for the release SHA, so this is not an unpublished-release state",
      nextAction:
        "Do not rerun publish unless registry checks prove the target version is still missing from npm.",
    };
  }

  if (
    report.current.github.checked &&
    report.current.github.publish.state === "completed_not_success"
  ) {
    return {
      state: "release_publish_workflow_failed",
      likelyCause:
        "the GitHub publish workflow for the release SHA completed without success, so release recovery should inspect that workflow directly",
      nextAction:
        "Inspect the failed publish workflow run, fix the blocking issue, and retry publish only after Core CI is green for the intended recovery SHA.",
    };
  }

  if (report.current.registry.checked && report.current.registry.status === "blocked") {
    return {
      state: "release_npm_version_burned",
      likelyCause:
        "the target npm version is already unavailable for publish, so the prepared release plan cannot complete safely",
      nextAction:
        "Pick a new patch version, rerun `agentplane release plan`, and regenerate release notes for the new target tag before retrying publish.",
    };
  }

  if (
    report.current.localTagPresent &&
    report.current.remote.configured &&
    !report.current.remote.tagPresent
  ) {
    return {
      state: "release_committed_locally_not_pushed",
      likelyCause:
        "the release commit and local tag were created, but the push step did not complete against the configured remote",
      nextAction: `If this release is correct, run: git push ${args.remote} HEAD && git push ${args.remote} ${report.target.nextTag}`,
    };
  }

  if (report.current.localTagPresent && !report.current.remote.configured) {
    return {
      state: "release_created_locally_without_remote",
      likelyCause:
        "release apply completed local mutation, but there is no configured remote to receive the release refs",
      nextAction: `Configure ${args.remote}, then push HEAD and ${report.target.nextTag} intentionally once the remote target is confirmed.`,
    };
  }

  if (report.current.coreVersion === report.target.nextVersion && !report.current.localTagPresent) {
    return {
      state: "release_versions_bumped_without_local_tag",
      likelyCause:
        "version files were bumped to the target release, but the local tag creation step never completed",
      nextAction: `Inspect the recent release commit, then either create ${report.target.nextTag} intentionally or rerun \`agentplane release plan\` from the current repo state.`,
    };
  }

  if (
    report.current.coreVersion !== report.target.prevVersion &&
    report.current.coreVersion !== report.target.nextVersion
  ) {
    return {
      state: "release_plan_drifted",
      likelyCause:
        "the repository version moved away from both the release-plan baseline and target, so the current plan is no longer authoritative",
      nextAction:
        "Run `agentplane release plan` again and use the new plan as the only recovery baseline.",
    };
  }

  if (
    report.current.agentplaneVersion !== report.current.coreVersion ||
    report.current.coreDependencyVersion !== report.current.coreVersion
  ) {
    return {
      state: "release_version_parity_drift",
      likelyCause:
        "release-related package versions no longer agree, which usually means a partial local mutation or manual edit interrupted parity",
      nextAction:
        "Restore package version parity first, then rerun `agentplane release plan` before any publish or push step.",
    };
  }

  if (!report.current.notesPresent) {
    return {
      state: "release_notes_missing",
      likelyCause:
        "the release plan exists, but the release notes artifact for the target tag was never written into docs/releases",
      nextAction: `Write ${path.relative(report.repoRoot, report.current.notesPath)} before retrying release apply or push recovery.`,
    };
  }

  return {
    state: "release_recovery_clean",
    likelyCause: "no partial release state was detected for the latest release plan",
    nextAction:
      "Continue with the normal release flow or inspect the latest apply report if recovery is still needed.",
  };
}

async function buildReport(repoRoot, args) {
  const planDir = args.plan ?? (await findLatestPlanDir(repoRoot));
  const versionJson = await readJson(path.join(planDir, "version.json"));
  const plan = parseVersionPlan(versionJson);
  const notesPath = path.join(repoRoot, "docs", "releases", `${plan.nextTag}.md`);
  const corePkgPath = path.join(repoRoot, "packages", "core", "package.json");
  const cliPkgPath = path.join(repoRoot, "packages", "agentplane", "package.json");
  const cliPkg = await readJson(cliPkgPath);
  const dependencyVersion =
    typeof cliPkg.dependencies?.["@agentplaneorg/core"] === "string"
      ? cliPkg.dependencies["@agentplaneorg/core"].trim()
      : "";

  const [coreVersion, agentplaneVersion] = await Promise.all([
    readPackageVersion(corePkgPath),
    readPackageVersion(cliPkgPath),
  ]);

  const localTag = await gitProbe(repoRoot, [
    "rev-parse",
    "-q",
    "--verify",
    `refs/tags/${plan.nextTag}`,
  ]);
  const localTagCommit = localTag.ok
    ? await gitProbe(repoRoot, ["rev-list", "-n", "1", `refs/tags/${plan.nextTag}`])
    : { ok: false, stdout: "", stderr: "local tag is missing" };
  const remoteExists = await gitProbe(repoRoot, ["remote", "get-url", args.remote]);
  const remoteTag = remoteExists.ok
    ? await gitProbe(repoRoot, ["ls-remote", "--tags", args.remote, `refs/tags/${plan.nextTag}`])
    : { ok: false, stdout: "", stderr: "remote is not configured" };
  const applyReport = await readLatestApplyReport(repoRoot);
  const applyMatchesPlan =
    Boolean(applyReport) &&
    applyReport.nextTag === plan.nextTag &&
    applyReport.nextVersion === plan.nextVersion;
  const githubSha =
    (typeof args.githubSha === "string" ? args.githubSha.trim() : "") ||
    (applyMatchesPlan ? (applyReport?.commitHash ?? "") : "") ||
    (localTagCommit.ok ? localTagCommit.stdout.trim() : "");

  const report = {
    repoRoot,
    planDir,
    target: {
      prevTag: plan.prevTag,
      prevVersion: plan.prevVersion,
      nextTag: plan.nextTag,
      nextVersion: plan.nextVersion,
      bump: plan.bump,
    },
    current: {
      coreVersion,
      agentplaneVersion,
      coreDependencyVersion: dependencyVersion,
      notesPath,
      notesPresent: await fileExists(notesPath),
      localTagPresent: localTag.ok,
      localTagCommit: localTagCommit.ok ? localTagCommit.stdout.trim() : null,
      remote: {
        name: args.remote,
        configured: remoteExists.ok,
        tagPresent: remoteExists.ok ? remoteTag.stdout.length > 0 : false,
      },
      apply: {
        present: Boolean(applyReport),
        path: applyReport ? path.relative(repoRoot, applyReport.path) : null,
        matchesPlan: applyMatchesPlan,
        commitHash: applyReport?.commitHash || null,
      },
      registry: {
        checked: false,
        status: "skipped",
        detail: "registry check was not requested",
      },
      github: {
        checked: false,
        repo: typeof args.githubRepo === "string" ? args.githubRepo.trim() || null : null,
        releaseSha: githubSha || null,
        coreWorkflow: args.coreWorkflow,
        publishWorkflow: args.publishWorkflow,
        coreCi: {
          state: "skipped",
          status: null,
          conclusion: null,
          url: null,
        },
        publish: {
          state: "skipped",
          status: null,
          conclusion: null,
          url: null,
        },
      },
    },
    findings: [],
  };

  if (!report.current.notesPresent) {
    pushFinding(report, {
      level: "warn",
      code: "release_notes_missing",
      message: `Release notes are missing for ${plan.nextTag}: ${path.relative(repoRoot, notesPath)}`,
      nextAction: `Write ${path.relative(repoRoot, notesPath)} or rerun agentplane release plan if the target version changed.`,
    });
  }

  if (coreVersion !== plan.prevVersion && coreVersion !== plan.nextVersion) {
    pushFinding(report, {
      level: "warn",
      code: "release_plan_drifted",
      message: `Current package version ${coreVersion} no longer matches the plan baseline ${plan.prevVersion} or target ${plan.nextVersion}.`,
      nextAction:
        "Run `agentplane release plan` to generate a fresh release plan for the current repo state.",
    });
  }

  if (coreVersion === plan.nextVersion && !report.current.localTagPresent) {
    pushFinding(report, {
      level: "warn",
      code: "release_versions_bumped_without_local_tag",
      message: `Package versions already equal ${plan.nextVersion}, but the local release tag ${plan.nextTag} does not exist.`,
      nextAction: `Inspect recent release commits, then either create ${plan.nextTag} intentionally or re-plan the release.`,
    });
  }

  if (report.current.localTagPresent && !report.current.remote.configured) {
    pushFinding(report, {
      level: "warn",
      code: "release_remote_missing",
      message: `Local release tag ${plan.nextTag} exists, but remote ${args.remote} is not configured.`,
      nextAction: `Configure ${args.remote} or push the local release refs to the intended remote manually.`,
    });
  }

  if (
    report.current.localTagPresent &&
    report.current.remote.configured &&
    !report.current.remote.tagPresent
  ) {
    pushFinding(report, {
      level: "warn",
      code: "release_local_tag_not_pushed",
      message: `Local release tag ${plan.nextTag} exists, but ${args.remote}/${plan.nextTag} is missing.`,
      nextAction: `If this local release should continue, run: git push ${args.remote} HEAD && git push ${args.remote} ${plan.nextTag}`,
    });
  }

  if (agentplaneVersion !== coreVersion || dependencyVersion !== coreVersion) {
    pushFinding(report, {
      level: "warn",
      code: "release_version_parity_drift",
      message: `Release package parity is drifted: core=${coreVersion}, agentplane=${agentplaneVersion}, dependency=${dependencyVersion || "missing"}.`,
      nextAction:
        "Restore release version parity before retrying publish or planning the next release.",
    });
  }

  if (args.checkRegistry) {
    const registry = await checkRegistryAvailability(repoRoot, plan.nextVersion);
    report.current.registry = {
      checked: true,
      status: registry.status,
      detail: registry.detail,
    };
    if (registry.status === "blocked") {
      pushFinding(report, {
        level: "warn",
        code: "release_npm_version_burned",
        message: `The target npm version ${plan.nextVersion} is not publishable.`,
        nextAction:
          "Inspect the registry-check output, then choose a new patch version and rerun `agentplane release plan`.",
      });
    }
  } else {
    pushFinding(report, {
      level: "info",
      code: "release_registry_check_skipped",
      message: "Registry check skipped; pass --check-registry to diagnose burned npm versions.",
      nextAction: `Run: node scripts/check-release-recovery-state.mjs --check-registry --remote ${args.remote}`,
    });
  }

  if (args.checkGithub) {
    const repo = resolveGithubRepo(args.githubRepo);
    const token = resolveGithubToken();
    const apiBase = resolveGithubApiBase();
    const releaseSha = report.current.github.releaseSha;
    report.current.github.checked = true;
    report.current.github.repo = repo;

    if (releaseSha) {
      const [coreCi, publish] = await Promise.all([
        readLatestWorkflowStatus({
          apiBase,
          repo,
          workflow: args.coreWorkflow,
          headSha: releaseSha,
          token,
        }),
        readLatestWorkflowStatus({
          apiBase,
          repo,
          workflow: args.publishWorkflow,
          headSha: releaseSha,
          token,
        }),
      ]);

      report.current.github.coreCi = {
        state: coreCi.state,
        status: coreCi.run?.status ?? null,
        conclusion: coreCi.run?.conclusion ?? null,
        url: coreCi.run?.url ?? null,
      };
      report.current.github.publish = {
        state: publish.state,
        status: publish.run?.status ?? null,
        conclusion: publish.run?.conclusion ?? null,
        url: publish.run?.url ?? null,
      };

      switch (publish.state) {
        case "success": {
          pushFinding(report, {
            level: "info",
            code: "release_publish_workflow_succeeded",
            message: `GitHub workflow ${args.publishWorkflow} succeeded for ${releaseSha}.`,
            nextAction:
              "Treat this release as already published unless registry evidence proves otherwise.",
          });
          break;
        }
        case "completed_not_success": {
          pushFinding(report, {
            level: "warn",
            code: "release_publish_workflow_failed",
            message: `GitHub workflow ${args.publishWorkflow} completed with conclusion=${publish.run?.conclusion ?? "unknown"} for ${releaseSha}.`,
            nextAction:
              "Inspect the publish workflow failure before retrying npm publication for any recovery SHA.",
          });
          break;
        }
        case "missing": {
          pushFinding(report, {
            level: "warn",
            code: "release_publish_workflow_missing",
            message: `No GitHub workflow ${args.publishWorkflow} run was found for ${releaseSha}.`,
            nextAction:
              "Confirm the release SHA and inspect the Actions history before assuming publish failed.",
          });
          break;
        }
        default: {
          break;
        }
      }

      if (publish.state === "success" && coreCi.state === "completed_not_success") {
        pushFinding(report, {
          level: "warn",
          code: "release_core_ci_failed_after_publish",
          message: `GitHub workflow ${args.coreWorkflow} completed with conclusion=${coreCi.run?.conclusion ?? "unknown"} after publish already succeeded for ${releaseSha}.`,
          nextAction:
            "Fix the failing Core CI issue separately; do not rerun publish for the same released version.",
        });
      } else if (coreCi.state === "completed_not_success") {
        pushFinding(report, {
          level: "warn",
          code: "release_core_ci_failed",
          message: `GitHub workflow ${args.coreWorkflow} completed with conclusion=${coreCi.run?.conclusion ?? "unknown"} for ${releaseSha}.`,
          nextAction: "Repair Core CI before relying on this SHA as a release recovery baseline.",
        });
      } else if (coreCi.state === "missing") {
        pushFinding(report, {
          level: "info",
          code: "release_core_ci_missing",
          message: `No GitHub workflow ${args.coreWorkflow} run was found for ${releaseSha}.`,
          nextAction:
            "Ensure the release SHA actually ran through Core CI before using it as a publish candidate.",
        });
      }
    } else {
      pushFinding(report, {
        level: "warn",
        code: "release_github_sha_unresolved",
        message:
          "GitHub workflow inspection was requested, but the release SHA could not be derived from the apply report, local tag, or explicit --github-sha.",
        nextAction:
          "Pass --github-sha <commit> or restore the release apply report before retrying GitHub recovery diagnostics.",
      });
    }
  } else {
    pushFinding(report, {
      level: "info",
      code: "release_github_check_skipped",
      message:
        "GitHub workflow check skipped; pass --check-github to distinguish publish success from sibling CI failures.",
      nextAction: "Run: bun run release:recover -- --check-github",
    });
  }

  if (report.findings.length === 0) {
    pushFinding(report, {
      level: "info",
      code: "release_recovery_clean",
      message: "No partial release state was detected for the latest plan.",
      nextAction:
        "Continue with the normal release flow or inspect the latest apply report if recovery is still needed.",
    });
  }

  report.summary = deriveRecoverySummary(report, args);
  return report;
}

function formatWorkflowStatus(result) {
  if (result.state === "skipped") return "skipped";
  if (result.state === "missing") return "missing";
  if (result.state === "completed_not_success") {
    return `completed_not_success (conclusion=${result.conclusion ?? "unknown"})`;
  }
  if (result.state === "success") return "success";
  return result.status ? `${result.state} (status=${result.status})` : result.state;
}

function renderText(report) {
  const lines = [
    "Release recovery report",
    `State: ${report.summary.state}`,
    `Likely cause: ${report.summary.likelyCause}`,
    `Next safe action: ${report.summary.nextAction}`,
    "",
    `Plan dir: ${path.relative(report.repoRoot, report.planDir) || "."}`,
    `Target: ${report.target.nextTag} / ${report.target.nextVersion} (prev: ${report.target.prevTag ?? "none"} / ${report.target.prevVersion})`,
    `Current versions: core=${report.current.coreVersion}, agentplane=${report.current.agentplaneVersion}, dependency=${report.current.coreDependencyVersion || "missing"}`,
    `Release notes: ${report.current.notesPresent ? "present" : "missing"} (${path.relative(report.repoRoot, report.current.notesPath)})`,
    `Local tag ${report.target.nextTag}: ${report.current.localTagPresent ? "present" : "missing"}`,
    `Local tag commit: ${report.current.localTagCommit ?? "unknown"}`,
    `Remote ${report.current.remote.name}: ${report.current.remote.configured ? "configured" : "missing"}`,
    `Remote tag ${report.current.remote.name}/${report.target.nextTag}: ${report.current.remote.tagPresent ? "present" : "missing"}`,
    `Apply report: ${report.current.apply.present ? `present (${report.current.apply.path})` : "missing"}`,
    `Apply report matches plan: ${report.current.apply.matchesPlan ? "yes" : "no"}`,
    `Apply report commit: ${report.current.apply.commitHash ?? "unknown"}`,
    `Registry check: ${report.current.registry.checked ? report.current.registry.status : "skipped"}`,
    `GitHub check: ${report.current.github.checked ? "enabled" : "skipped"}`,
    `GitHub repo: ${report.current.github.repo ?? "unknown"}`,
    `GitHub release SHA: ${report.current.github.releaseSha ?? "unknown"}`,
    `GitHub Core CI (${report.current.github.coreWorkflow}): ${formatWorkflowStatus(report.current.github.coreCi)}`,
    `GitHub Publish (${report.current.github.publishWorkflow}): ${formatWorkflowStatus(report.current.github.publish)}`,
    "",
    "Findings:",
  ];

  if (report.current.github.coreCi.url) {
    lines.push(`Core CI URL: ${report.current.github.coreCi.url}`);
  }
  if (report.current.github.publish.url) {
    lines.push(`Publish URL: ${report.current.github.publish.url}`);
  }

  for (const finding of report.findings) {
    lines.push(`- [${finding.level.toUpperCase()}] ${finding.code}: ${finding.message}`);
    if (finding.nextAction) lines.push(`  Next: ${finding.nextAction}`);
  }

  return `${lines.join("\n")}\n`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }

  const repoRoot = process.cwd();
  const report = await buildReport(repoRoot, args);
  if (args.json) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }
  process.stdout.write(renderText(report));
}

main().catch((error) => {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
