import { execFileSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";

import { parseScriptArgs } from "../lib/script-runtime.mjs";

const ROOT = process.cwd();
const PACKAGES = ["@agentplaneorg/core", "@agentplaneorg/recipes", "agentplane"];

function run(cmd, args) {
  try {
    const stdout = execFileSync(cmd, args, {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      env: process.env,
    }).trim();
    return { ok: true, stdout };
  } catch (error) {
    return {
      ok: false,
      stdout: String(error?.stdout ?? "").trim(),
      stderr: String(error?.stderr ?? error?.message ?? "").trim(),
    };
  }
}

function readVersion() {
  return run("node", [
    "-p",
    "JSON.parse(require('node:fs').readFileSync('packages/agentplane/package.json','utf8')).version",
  ]).stdout;
}

function parseJsonResult(result) {
  if (!result.ok) return null;
  try {
    return JSON.parse(result.stdout);
  } catch {
    return null;
  }
}

function readJson(filePath) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

function findFileByName(root, fileName) {
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      const nested = findFileByName(fullPath, fileName);
      if (nested) return nested;
      continue;
    }
    if (entry.isFile() && entry.name === fileName) return fullPath;
  }
  return null;
}

function resolveGithubRepo(explicitRepo) {
  const requested = typeof explicitRepo === "string" ? explicitRepo.trim() : "";
  if (requested) return requested;
  const result = run("gh", ["repo", "view", "--json", "nameWithOwner", "--jq", ".nameWithOwner"]);
  return result.ok ? result.stdout : "";
}

function matchingPublishResult(manifest, version, tag, releaseSha) {
  return (
    manifest?.success === true &&
    manifest?.version === version &&
    manifest?.tag === tag &&
    manifest?.sha === releaseSha
  );
}

function resolvePublishResult({ destinationPath, version, tag, releaseSha, repo, workflow }) {
  const existing = existsSync(destinationPath) ? readJson(destinationPath) : null;
  if (!repo) {
    return {
      ok: false,
      path: destinationPath,
      source: "missing",
      workflow: { ok: false, stderr: "GitHub repository slug is unavailable" },
      run_id: null,
    };
  }

  const workflowResult = run("gh", [
    "run",
    "list",
    "--repo",
    repo,
    "--workflow",
    workflow,
    "--commit",
    releaseSha,
    "--limit",
    "20",
    "--json",
    "databaseId,headSha,status,conclusion,createdAt",
  ]);
  const runs = parseJsonResult(workflowResult);
  const publishRun = Array.isArray(runs)
    ? runs.find(
        (entry) =>
          entry?.headSha === releaseSha &&
          entry?.status === "completed" &&
          entry?.conclusion === "success" &&
          entry?.databaseId,
      )
    : null;
  if (!publishRun) {
    return {
      ok: false,
      path: destinationPath,
      source: "missing",
      workflow: workflowResult.ok
        ? {
            ok: false,
            stdout: workflowResult.stdout,
            stderr: "no successful exact-SHA publish run",
          }
        : workflowResult,
      run_id: null,
    };
  }
  if (matchingPublishResult(existing, version, tag, releaseSha)) {
    return {
      ok: true,
      path: destinationPath,
      source: "local",
      workflow: workflowResult,
      run_id: publishRun.databaseId,
    };
  }

  const tempDir = mkdtempSync(path.join(os.tmpdir(), "agentplane-release-evidence-"));
  try {
    const download = run("gh", [
      "run",
      "download",
      String(publishRun.databaseId),
      "--repo",
      repo,
      "--name",
      "publish-result",
      "--dir",
      tempDir,
    ]);
    if (!download.ok) {
      return {
        ok: false,
        path: destinationPath,
        source: "download_failed",
        workflow: workflowResult,
        download,
        run_id: publishRun.databaseId,
      };
    }
    const downloadedPath = findFileByName(tempDir, "publish-result.json");
    if (!downloadedPath) {
      return {
        ok: false,
        path: destinationPath,
        source: "artifact_missing",
        workflow: workflowResult,
        download,
        run_id: publishRun.databaseId,
      };
    }
    mkdirSync(path.dirname(destinationPath), { recursive: true });
    copyFileSync(downloadedPath, destinationPath);
    return {
      ok: true,
      path: destinationPath,
      source: "github_artifact",
      workflow: workflowResult,
      download,
      run_id: publishRun.databaseId,
    };
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
}

function main() {
  const { flags } = parseScriptArgs(process.argv.slice(2), {
    valueFlags: [
      "version",
      "out",
      "publish-result",
      "github-repo",
      "github-sha",
      "publish-workflow",
    ],
    booleanFlags: ["json"],
  });
  const version = String(flags.version ?? readVersion()).trim();
  if (!version) throw new Error("missing release version");
  const tag = `v${version}`;
  const outPath = path.resolve(
    ROOT,
    String(flags.out ?? `.agentplane/.release/evidence/${tag}.json`),
  );
  const publishResultPath = path.resolve(
    ROOT,
    String(flags["publish-result"] ?? ".agentplane/.release/publish/publish-result.json"),
  );
  const localTag = run("git", ["rev-list", "-n", "1", `refs/tags/${tag}`]);
  const releaseSha = String(flags["github-sha"] ?? localTag.stdout).trim();
  const repo = resolveGithubRepo(flags["github-repo"]);
  const publishResult = releaseSha
    ? resolvePublishResult({
        destinationPath: publishResultPath,
        version,
        tag,
        releaseSha,
        repo,
        workflow: String(flags["publish-workflow"] ?? "publish.yml"),
      })
    : {
        ok: false,
        path: publishResultPath,
        source: "missing",
        workflow: { ok: false, stderr: "release SHA is unavailable" },
        run_id: null,
      };
  const manifest = existsSync(publishResultPath) ? readJson(publishResultPath) : null;
  const remoteTag = run("git", [
    "ls-remote",
    "--tags",
    "origin",
    `refs/tags/${tag}`,
    `refs/tags/${tag}^{}`,
  ]);
  const githubRelease = run("gh", [
    "release",
    "view",
    tag,
    "--repo",
    repo,
    "--json",
    "tagName,name,url,isDraft,isPrerelease",
  ]);
  const githubReleasePayload = parseJsonResult(githubRelease);
  const npm = PACKAGES.map((name) => ({
    name,
    result: run("npm", ["view", `${name}@${version}`, "version"]),
  }));
  const postpublishAudit = existsSync(publishResultPath)
    ? run("bun", [
        "run",
        "release:postpublish:audit",
        "--",
        "--publish-result",
        path.relative(ROOT, publishResultPath),
        "--json",
      ])
    : { ok: false, stdout: "", stderr: "publish-result.json is missing" };
  const postpublishAuditPayload = parseJsonResult(postpublishAudit);

  const failures = [];
  if (!localTag.ok || !releaseSha) failures.push(`local tag ${tag} is missing`);
  if (localTag.ok && releaseSha !== localTag.stdout) {
    failures.push(`release SHA ${releaseSha} does not match local tag ${localTag.stdout}`);
  }
  if (!remoteTag.ok || !remoteTag.stdout.includes(releaseSha)) {
    failures.push(`origin/${tag} does not resolve to ${releaseSha || "a known SHA"}`);
  }
  if (!repo) failures.push("GitHub repository slug is unavailable");
  if (!githubRelease.ok || githubReleasePayload?.tagName !== tag) {
    failures.push(`GitHub Release ${tag} is unavailable or mismatched`);
  }
  if (githubReleasePayload?.isDraft === true)
    failures.push(`GitHub Release ${tag} is still a draft`);
  if (!publishResult.ok) failures.push("exact-SHA publish-result artifact is unavailable");
  if (!matchingPublishResult(manifest, version, tag, releaseSha)) {
    failures.push("publish-result identity or success state does not match the current release");
  }
  for (const entry of npm) {
    if (!entry.result.ok || entry.result.stdout !== version) {
      failures.push(`${entry.name}@${version} is not confirmed in npm`);
    }
  }
  if (!postpublishAudit.ok || postpublishAuditPayload?.ok !== true) {
    failures.push("post-publish platform audit failed");
  }

  const evidence = {
    schema_version: 2,
    generated_at: new Date().toISOString(),
    ok: failures.length === 0,
    failures,
    version,
    tag,
    release_sha: releaseSha || null,
    git: {
      head: run("git", ["rev-parse", "HEAD"]),
      local_tag: localTag,
      remote_tag: remoteTag,
    },
    npm,
    github_release: githubRelease,
    publish_result: {
      path: path.relative(ROOT, publishResultPath),
      exists: existsSync(publishResultPath),
      source: publishResult.source,
      run_id: publishResult.run_id,
      workflow: publishResult.workflow,
      download: publishResult.download ?? null,
      identity_matches: matchingPublishResult(manifest, version, tag, releaseSha),
    },
    postpublish_audit: postpublishAudit,
  };

  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, `${JSON.stringify(evidence, null, 2)}\n`, "utf8");

  if (flags.json === true) {
    process.stdout.write(`${JSON.stringify(evidence, null, 2)}\n`);
  } else {
    process.stdout.write(`release evidence: ${path.relative(ROOT, outPath)}\n`);
    for (const failure of failures) process.stderr.write(`error: ${failure}\n`);
  }
  if (!evidence.ok) process.exitCode = 1;
}

try {
  main();
} catch (error) {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
