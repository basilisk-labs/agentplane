import { createHash } from "node:crypto";
import { mkdir, mkdtemp, rename, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it, vi } from "vitest";

import * as stableFile from "../../shared/stable-file.js";
import {
  AGENT_WORK_ORDER_V2_VALID_FIXTURE,
  buildAgentSemanticResultV2ValidFixtures,
} from "@agentplaneorg/core/schemas";
import { externalAgentResultIdentity } from "./external-agent-result-routing.js";
import {
  resolveExternalAgentExchangePaths,
  validateExternalAgentResultEnvelope,
  externalAgentIssueDigest,
  type ExternalAgentExchange,
} from "./external-agent-exchange.js";
import { captureExternalTaskArtifacts } from "./external-agent-task-artifact-baseline.js";

describe("resolveExternalAgentExchangePaths", () => {
  it("reuses a preobserved common Git directory", async () => {
    const commonGitDir = path.resolve("/repo/.git");
    const fingerprint = `sha256:${"a".repeat(64)}`;

    const paths = await resolveExternalAgentExchangePaths({
      git_root: "/not-a-repository",
      common_git_dir: commonGitDir,
      task_id: "202608040001-EXCHAN",
      transition_id: "tr_0123456789abcdef0123456789abcdef",
      state_fingerprint: fingerprint,
    });

    expect(paths.directory).toBe(
      path.join(
        commonGitDir,
        "agentplane",
        "external-agent",
        "202608040001-EXCHAN",
        "tr_0123456789abcdef0123456789abcdef",
        "a".repeat(64),
      ),
    );
  });
});

describe("external exchange task artifact snapshot", () => {
  it.each(["regular", "symlink"])("rejects a %s replacement before reading", async (kind) => {
    const root = await mkdtemp(path.join(os.tmpdir(), "exchange-artifacts-"));
    const taskId = "202608040001-EXCHAN";
    const directory = path.join(root, ".agentplane/tasks", taskId);
    const file = path.join(directory, "binary.dat");
    const bytes = Buffer.from([0, 255, 128, 10]);
    let spy;
    try {
      await mkdir(directory, { recursive: true });
      await writeFile(file, bytes);
      const baseline = await captureExternalTaskArtifacts(root, taskId);
      expect(baseline["binary.dat"]).toMatch(
        new RegExp(`^file:[0-9]+:${createHash("sha256").update(bytes).digest("hex")}$`, "u"),
      );
      const original = stableFile.readStableRegularFileNoFollow;
      spy = vi
        .spyOn(stableFile, "readStableRegularFileNoFollow")
        .mockImplementationOnce(async (target, label, opts) => {
          const moved = path.join(root, "original.dat");
          await rename(file, moved);
          if (kind === "symlink") await symlink(moved, file);
          else await writeFile(file, bytes);
          return original(target, label, opts);
        });
      await expect(captureExternalTaskArtifacts(root, taskId)).rejects.toThrow(
        /changed|non-regular/u,
      );
    } finally {
      spy?.mockRestore();
      await rm(root, { recursive: true, force: true });
    }
  });
});

describe("compact external result admission", () => {
  it("requires issuance opt-in and binds the normalized envelope to immutable identity", () => {
    const order = AGENT_WORK_ORDER_V2_VALID_FIXTURE;
    const exchange: ExternalAgentExchange = {
      schema_version: 1,
      kind: "external_agent_exchange",
      status: "issued",
      issue_digest_version: 2,
      task_id: order.task.id,
      transition_id: `tr_${"b".repeat(32)}`,
      state_fingerprint: order.state_fingerprint.digest,
      role: order.role,
      purpose: "implementation",
      checkout: "/repo",
      work_order_id: order.work_order_id,
      work_order_ref: "work-order.json",
      result_schema_ref: "result-schema.json",
      result_ref: "result.json",
      evaluator_work_order_ref: null,
      baseline: { head: null, changed_paths: [] },
      result_digest: null,
      result: null,
      postcondition_fingerprint: null,
      created_at: "2026-09-08T00:00:00Z",
      updated_at: "2026-09-08T00:00:00Z",
    };
    const result = buildAgentSemanticResultV2ValidFixtures(order.work_order_id).completed;
    const { schema_version: _version, kind: _kind, ...payload } = result;
    const compact = { ...exchange, result_format: "semantic_payload_v1" as const };
    const envelope = {
      schema_version: 1,
      kind: "agent_action_result",
      task_id: exchange.task_id,
      transition_id: exchange.transition_id,
      state_fingerprint: exchange.state_fingerprint,
      role: exchange.role,
      result,
    };
    const validate = (raw: unknown, issued = compact) =>
      validateExternalAgentResultEnvelope({ raw, exchange: issued, work_order: order });
    expect(validate(payload)).toEqual(envelope);
    expect(validate(envelope)).toEqual(envelope);
    expect(
      validateExternalAgentResultEnvelope({ raw: envelope, exchange, work_order: order }),
    ).toEqual(envelope);
    expect(() =>
      validateExternalAgentResultEnvelope({ raw: payload, exchange, work_order: order }),
    ).toThrow();
    expect(externalAgentIssueDigest({ exchange: compact, work_order: order })).not.toBe(
      externalAgentIssueDigest({ exchange, work_order: order }),
    );
    for (const raw of [
      { ...payload, work_order_id: "foreign" },
      { ...payload, role: "PLANNER" },
      { ...envelope, task_id: "foreign" },
    ])
      expect(() => validate(raw)).toThrow();
    const root = "/repo/.git/agentplane/external-agent";
    const issuedPath = {
      exchange_root: root,
      task_id: order.task.id,
      result_path: path.join(
        root,
        order.task.id,
        exchange.transition_id,
        exchange.state_fingerprint.slice(7),
        "result.json",
      ),
    };
    expect(externalAgentResultIdentity(payload, issuedPath)).toEqual({
      task_id: exchange.task_id,
      transition_id: exchange.transition_id,
      state_fingerprint: exchange.state_fingerprint,
    });
    for (const result_path of [
      "/tmp/result.json",
      path.join(
        root,
        "foreign",
        exchange.transition_id,
        exchange.state_fingerprint.slice(7),
        "result.json",
      ),
    ]) {
      expect(() => externalAgentResultIdentity(payload, { ...issuedPath, result_path })).toThrow(
        "issued result path",
      );
    }
  });
});
