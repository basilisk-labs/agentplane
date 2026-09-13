import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { chmodSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  readM01ProductArtifact,
  summarizeCodexJsonl,
  validateM01Authority,
} from "./paired-live-codex-launcher.mjs";

function sha256(value) {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function writeArtifact(root, name, value, mode = 0o600) {
  const filePath = path.join(root, name);
  writeFileSync(filePath, typeof value === "string" ? value : `${JSON.stringify(value)}\n`);
  chmodSync(filePath, mode);
  return { path: filePath, sha256: sha256(readFileSync(filePath)) };
}

test("reads all provider token fields without double-counting subsets", () => {
  const stdout = [
    JSON.stringify({
      type: "item.completed",
      item: { type: "agent_message", text: '{"status":"done"}' },
    }),
    JSON.stringify({
      type: "turn.completed",
      usage: {
        input_tokens: 100,
        cached_input_tokens: 40,
        output_tokens: 30,
        reasoning_output_tokens: 12,
        total_tokens: 130,
      },
    }),
  ].join("\n");

  assert.deepEqual(summarizeCodexJsonl(stdout, { status: 0 }), {
    finalStatus: "done",
    tokenUsage: {
      input_tokens: 100,
      cached_input_tokens: 40,
      output_tokens: 30,
      reasoning_tokens: 12,
      total_tokens: 130,
      total_tokens_source: "provider",
      state: "observed",
    },
    violations: [],
  });
});

test("derives total tokens when Codex reports input and output components", () => {
  const stdout = [
    JSON.stringify({
      type: "item.completed",
      item: { type: "agent_message", text: '{"status":"done"}' },
    }),
    JSON.stringify({
      type: "turn.completed",
      usage: {
        input_tokens: 100,
        cached_input_tokens: 40,
        output_tokens: 30,
        reasoning_output_tokens: 12,
      },
    }),
  ].join("\n");

  const result = summarizeCodexJsonl(stdout, { status: 0 });
  assert.equal(result.tokenUsage.state, "observed");
  assert.equal(result.tokenUsage.total_tokens, 130);
  assert.equal(result.tokenUsage.total_tokens_source, "derived_input_plus_output");
});

test("keeps incomplete provider usage partial and visible", () => {
  const stdout = JSON.stringify({
    type: "turn.completed",
    usage: { input_tokens: 10, output_tokens: 4 },
  });
  const result = summarizeCodexJsonl(stdout, { status: 1 });
  assert.equal(result.tokenUsage.state, "partial");
  assert.equal(result.tokenUsage.input_tokens, 10);
  assert.equal(result.tokenUsage.total_tokens, 14);
  assert.equal(result.tokenUsage.total_tokens_source, "derived_input_plus_output");
  assert.ok(result.violations.includes("codex_final_status_not_done"));
  assert.ok(result.violations.includes("codex_process_exit_1"));
});

test("binds live authority to the exact campaign", () => {
  const root = mkdtempSync(path.join(os.tmpdir(), "agentplane-m01-authority-"));
  const receipt = writeArtifact(root, "authority.json", {
    schema_version: 1,
    kind: "agentplane.m01_live_authority",
    status: "approved",
    campaign_id: "M01-test",
    authentication: "chatgpt_subscription",
    provider_attempts: 15,
    retry_limit: 0,
    sandbox: "workspace-write",
    network: "deny",
    token_caps: {
      max_input_tokens: null,
      max_output_tokens: null,
      max_total_tokens: null,
    },
  });
  const manifest = {
    campaign_id: "M01-test",
    constants: {
      authority_digest: receipt.sha256,
      retry_limit: 0,
      sandbox: "workspace-write",
      network: "deny",
    },
    runs: Array.from({ length: 15 }, () => ({})),
  };

  assert.equal(validateM01Authority(manifest, receipt.path).status, "approved");
  manifest.runs.pop();
  assert.throws(() => validateM01Authority(manifest, receipt.path), /does not authorize/u);
});

test("pins the product descriptor and its runtime source identity", () => {
  const root = mkdtempSync(path.join(os.tmpdir(), "agentplane-m01-product-"));
  const sourceSha = "a".repeat(40);
  const descriptor = writeArtifact(root, "product.json", {
    schema_version: 1,
    kind: "agentplane.m01_product_artifact",
    arm: "candidate",
    source_sha: sourceSha,
    runtime: { type: "agentplane_cli" },
  });
  const product = {
    arm: "candidate",
    artifact_path: descriptor.path,
    artifact_sha256: descriptor.sha256,
    source_sha: sourceSha,
  };

  assert.equal(readM01ProductArtifact(product).artifact.arm, "candidate");
  product.source_sha = "b".repeat(40);
  assert.throws(() => readM01ProductArtifact(product), /invalid/u);
});
