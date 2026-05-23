import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

import { parseScriptArgs } from "../lib/script-runtime.mjs";

function runJson(cmd, args) {
  return JSON.parse(execFileSync(cmd, args, { encoding: "utf8", env: process.env }));
}

function readJsonFile(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function runOptionalJson(cmd, args) {
  try {
    return {
      ok: true,
      value: runJson(cmd, args),
      detail: null,
    };
  } catch (error) {
    return {
      ok: false,
      value: null,
      detail: String(error?.stderr ?? error?.message ?? error).trim(),
    };
  }
}

function loadReleaseState(flags) {
  const fixturePath = process.env.AGENTPLANE_TEST_RELEASE_STATE_PATH;
  if (fixturePath) return readJsonFile(fixturePath);

  return runJson("node", [
    "scripts/release/state.mjs",
    "--json",
    ...(flags["check-registry"] === true ? ["--check-registry"] : []),
  ]);
}

function loadRecoveryReport(flags) {
  const fixturePath = process.env.AGENTPLANE_TEST_RELEASE_RECOVERY_REPORT_PATH;
  if (fixturePath) return readJsonFile(fixturePath);
  if (flags["check-github"] !== true) return null;

  const args = [
    "scripts/check-release-recovery-state.mjs",
    "--json",
    "--check-github",
    ...(flags["check-registry"] === true ? ["--check-registry"] : []),
  ];
  if (typeof flags["github-repo"] === "string" && flags["github-repo"].trim()) {
    args.push("--github-repo", flags["github-repo"].trim());
  }
  if (typeof flags["github-sha"] === "string" && flags["github-sha"].trim()) {
    args.push("--github-sha", flags["github-sha"].trim());
  }
  return runJson("node", args);
}

function githubReleaseStatus(tag, flags) {
  const fixturePath = process.env.AGENTPLANE_TEST_GITHUB_RELEASE_STATUS_PATH;
  if (fixturePath) return readJsonFile(fixturePath);
  if (flags["check-github"] !== true) {
    return { state: "skipped", detail: "pass --check-github to inspect GitHub release truth" };
  }
  if (!tag) return { state: "unknown", detail: "release tag is unavailable" };
  const repo = typeof flags["github-repo"] === "string" ? flags["github-repo"].trim() : "";

  const result = runOptionalJson("gh", [
    "release",
    "view",
    tag,
    "--json",
    "tagName,url,publishedAt",
    ...(repo ? ["--repo", repo] : []),
  ]);
  if (result.ok) {
    return {
      state: "present",
      tagName: result.value.tagName ?? tag,
      url: result.value.url ?? null,
      publishedAt: result.value.publishedAt ?? null,
    };
  }
  if (/not found|could not resolve|HTTP 404/iu.test(result.detail ?? "")) {
    return { state: "missing", detail: result.detail };
  }
  return { state: "unavailable", detail: result.detail };
}

function registrySummary(state) {
  if (!state.registry?.checked) return "skipped";
  const packages = Array.isArray(state.registry.packages) ? state.registry.packages : [];
  if (packages.length === 0) return "checked, no public packages reported";
  const published = packages.filter((pkg) => pkg.published === true).map((pkg) => pkg.name);
  const missing = packages.filter((pkg) => pkg.published !== true).map((pkg) => pkg.name);
  if (published.length === packages.length) return `published (${published.join(", ")})`;
  if (missing.length === packages.length) return `not published (${missing.join(", ")})`;
  return `partial: published ${published.join(", ") || "none"}; missing ${missing.join(", ") || "none"}`;
}

function releaseReadySummary(report) {
  const ready = report?.current?.github?.releaseReady;
  if (!ready) return "skipped";
  const run = ready.runId ? ` run=${ready.runId}` : "";
  const artifact = ready.artifactName ? ` artifact=${ready.artifactName}` : "";
  return `${ready.state}${run}${artifact}`;
}

function publishSummary(report) {
  const publish = report?.current?.github?.publish;
  if (!publish) return "skipped";
  const conclusion = publish.conclusion ? ` conclusion=${publish.conclusion}` : "";
  return `${publish.state}${conclusion}`;
}

function publishResultSummary(report) {
  const result = report?.current?.github?.publishResult;
  if (!result) return "skipped";
  const success = typeof result.success === "boolean" ? ` success=${result.success}` : "";
  const reason = result.reasonCode ? ` reason=${result.reasonCode}` : "";
  return `${result.state}${success}${reason}`;
}

function tagSummary(report, tag) {
  if (!report) return `local/current only (${tag})`;
  const local = report.current?.localTagPresent === true ? "present" : "missing";
  const remoteName = report.current?.remote?.name ?? "origin";
  const remote = report.current?.remote?.tagPresent === true ? "present" : "missing";
  return `local=${local}; ${remoteName}/${tag}=${remote}`;
}

function commandFromAction(action, state, report) {
  if (report?.summary?.nextAction) return report.summary.nextAction;
  return action.command ?? "inspect release state";
}

function renderText(result) {
  const lines = [
    "Release next action",
    `Target: ${result.target.tag} (${result.target.version})`,
    `Branch: ${result.git.branch}`,
    `Release SHA: ${result.releaseSha ?? "unknown"}`,
    `Release-ready: ${result.truth.releaseReady}`,
    `Publish workflow: ${result.truth.publish}`,
    `Publish result: ${result.truth.publishResult}`,
    `NPM registry: ${result.truth.registry}`,
    `Git tag: ${result.truth.tag}`,
    `GitHub release: ${result.truth.githubRelease.state}`,
    `Next action: ${result.action}`,
    `Command: ${result.command}`,
  ];
  if (result.truth.githubRelease.url)
    lines.splice(9, 0, `GitHub release URL: ${result.truth.githubRelease.url}`);
  return `${lines.join("\n")}\n`;
}

function main() {
  const { flags } = parseScriptArgs(process.argv.slice(2), {
    booleanFlags: ["check-registry", "check-github", "json"],
    valueFlags: ["github-repo", "github-sha"],
  });
  const state = loadReleaseState(flags);
  const recovery = loadRecoveryReport(flags);
  const releaseSha = recovery?.current?.github?.releaseSha ?? state.git.head ?? null;
  const githubRelease = githubReleaseStatus(state.release.tag, flags);

  let action = "run release candidate preparation";
  let command = "bun run release:candidate:prepare -- --write";
  if (state.git.tracked_dirty) {
    action = "clean tracked working tree before release work";
    command = "git status --short --untracked-files=no";
  } else if (state.git.upstream?.behind > 0) {
    action = "fast-forward local branch before release planning";
    command = "git pull --ff-only";
  } else if (state.release.latest_plan?.nextTag === state.release.tag) {
    action = "generate a fresh release plan for the next patch";
    command = "ap release plan --patch";
  } else if (!state.parity.ok) {
    action = "restore release version parity";
    command = "bun run release:parity";
  } else if (!state.release.notes_exists) {
    action = "write release notes for the target tag";
    command = `docs/releases/${state.release.tag}.md`;
  } else if (
    state.registry.checked &&
    state.registry.packages.some((pkg) => pkg.published === false) &&
    state.registry.packages.some((pkg) => pkg.published === true)
  ) {
    action = "recover partial npm publication";
    command = "bun run release:recover -- --check-github --check-registry";
  } else if (
    state.registry.checked &&
    state.registry.packages.every((pkg) => pkg.published === true) &&
    !state.release.publish_result_exists
  ) {
    action = "collect hosted publish evidence";
    command = "bun run release:evidence:collect";
  }

  const result = {
    schema_version: 2,
    action: recovery?.summary?.state ?? action,
    command: commandFromAction({ action, command }, state, recovery),
    target: {
      version: state.release.version,
      tag: state.release.tag,
    },
    git: {
      branch: state.git.branch,
      head: state.git.head,
    },
    releaseSha,
    truth: {
      releaseReady: releaseReadySummary(recovery),
      publish: publishSummary(recovery),
      publishResult: publishResultSummary(recovery),
      registry: registrySummary(state),
      tag: tagSummary(recovery, state.release.tag),
      githubRelease,
    },
    state,
    recovery,
  };
  if (flags.json === true) {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return;
  }
  process.stdout.write(renderText(result));
}

try {
  main();
} catch (error) {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
