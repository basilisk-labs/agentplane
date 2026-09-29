import assert from "node:assert/strict";
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { materializeM01Campaign } from "./paired-m01-materialize.mjs";

function executable(root, name) {
  const filePath = path.join(root, name);
  writeFileSync(filePath, "#!/usr/bin/env node\n");
  chmodSync(filePath, 0o755);
  return filePath;
}

test("materializes a pinned five-pair token campaign", () => {
  const root = mkdtempSync(path.join(os.tmpdir(), "agentplane-m01-materialize-"));
  const outputRoot = path.join(root, "output");
  const previousRuntimeRoot = path.join(root, "previous");
  mkdirSync(previousRuntimeRoot);
  writeFileSync(path.join(previousRuntimeRoot, "agentplane.tgz"), "archive");
  writeFileSync(path.join(previousRuntimeRoot, "package.json"), "{}\n");
  writeFileSync(path.join(previousRuntimeRoot, "package-lock.json"), "{}\n");
  const authorityPath = path.join(root, "authority.json");
  writeFileSync(authorityPath, "{}\n");
  const candidateRoot = path.join(root, "candidate");
  mkdirSync(path.join(candidateRoot, "bin"), { recursive: true });
  mkdirSync(path.join(candidateRoot, "dist"), { recursive: true });
  const candidateCliPath = executable(path.join(candidateRoot, "bin"), "agentplane.js");
  for (const relativePath of [
    "package.json",
    "dist/.build-manifest.json",
    "dist/cli.js",
    "dist/deferred-runtime.js",
    "dist/command-catalog.js",
  ]) {
    writeFileSync(path.join(candidateRoot, relativePath), "{}\n");
  }

  const { manifest } = materializeM01Campaign({
    authorityPath,
    campaignId: "M01-test-v2",
    candidateCliPath,
    candidateSourceSha: "c".repeat(40),
    codexPath: executable(root, "codex"),
    launcherPath: executable(root, "launcher.mjs"),
    oraclePath: executable(root, "oracle.mjs"),
    outputRoot,
    previousRuntimeRoot,
  });

  assert.equal(manifest.runs.length, 15);
  assert.equal(manifest.campaign_id, "M01-test-v2");
  assert.equal(new Set(manifest.runs.map((run) => run.pair_id)).size, 5);
  assert.equal(manifest.claim_policy.minimum_paired_successes, 5);
  assert.equal(manifest.constants.retry_limit, 0);
  assert.equal(manifest.constants.network, "deny");
  assert.ok(manifest.runs.every((run) => run.transport === "external"));
  assert.ok(readFileSync(manifest.target.repository_path).length > 0);
});
