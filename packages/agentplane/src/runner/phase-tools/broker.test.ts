import { access, mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import type * as StableFileModule from "../stable-file.js";

const stableFileMock = vi.hoisted(() => ({ responseReadCollisions: 0 }));

vi.mock("../stable-file.js", async (importOriginal) => {
  const actual = await importOriginal<typeof StableFileModule>();
  return {
    ...actual,
    readStableRegularTextNoFollow: async (
      ...args: Parameters<typeof actual.readStableRegularTextNoFollow>
    ) => {
      if (
        stableFileMock.responseReadCollisions > 0 &&
        args[1] === "runner phase-tool broker response"
      ) {
        stableFileMock.responseReadCollisions -= 1;
        throw new Error(`${args[1]} changed while it was being read: ${args[0]}`);
      }
      return await actual.readStableRegularTextNoFollow(...args);
    },
  };
});

import { buildAgentWorkOrderV2ValidFixture } from "@agentplaneorg/core/schemas";
import { makeRunnerContextBundle, setRunnerBundleRunDir } from "@agentplane/testkit/runner";

import { CODEX_RUN_PROFILE_CAPABILITIES } from "../adapters/codex-preparation.js";
import { writePreparedRunnerArtifacts } from "../artifacts.js";
import { readRunnerResultManifest } from "../result-manifest.js";
import {
  invokeRunnerPhaseToolThroughBroker,
  runnerPhaseToolBrokerDirectory,
  startRunnerPhaseToolBroker,
} from "./broker.js";
import { issueRunnerPhaseToolGrant } from "./token.js";

const roots: string[] = [];

afterEach(async () => {
  stableFileMock.responseReadCollisions = 0;
  await Promise.all(roots.splice(0).map(async (root) => await rm(root, { recursive: true })));
});

describe("runner phase-tool broker", () => {
  it("keeps protected result writes in the parent supervisor", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-phase-broker-"));
    roots.push(root);
    const workOrder = buildAgentWorkOrderV2ValidFixture();
    const bundle = makeRunnerContextBundle({
      gitRoot: root,
      taskId: workOrder.task.id,
      runId: "run-broker",
      status: "DOING",
      owner: "CODER",
      mode: "execute",
    });
    bundle.work_order = workOrder;
    bundle.execution.adapter_capabilities = CODEX_RUN_PROFILE_CAPABILITIES;
    const runDir = path.join(
      root,
      ".git",
      "agentplane",
      "runner",
      "tasks",
      workOrder.task.id,
      "runs",
      bundle.execution.run_id,
    );
    setRunnerBundleRunDir(bundle, runDir);
    const grant = await issueRunnerPhaseToolGrant({ bundle });
    if (!grant) throw new Error("Expected a phase-tool grant.");
    bundle.execution.phase_tools = grant.manifest;
    await writePreparedRunnerArtifacts({ bundle });
    const brokerDirectory = runnerPhaseToolBrokerDirectory({
      repository_root: root,
      run_id: bundle.execution.run_id,
      token_id: grant.record.claims.token_id,
    });
    const broker = await startRunnerPhaseToolBroker({
      repository_root: root,
      run_dir: runDir,
      directory: brokerDirectory,
    });

    stableFileMock.responseReadCollisions = 1;
    try {
      const response = await invokeRunnerPhaseToolThroughBroker({
        directory: brokerDirectory,
        token: grant.token,
        tool: "report_blocker",
        input: {
          summary: "The requested lifecycle operation is outside the delegated phase.",
          recommended_action: "Return control to the parent workflow.",
        },
      });

      expect(stableFileMock.responseReadCollisions).toBe(0);
      expect(response).toMatchObject({
        status: "ok",
        code: "accepted",
        tool: "report_blocker",
      });
      expect(response.audit?.digest).toMatch(/^sha256:[0-9a-f]{64}$/u);
      expect(
        await readRunnerResultManifest(bundle.execution.artifact_paths.result_path),
      ).toMatchObject({
        semantic_result: {
          value: {
            work_order_id: workOrder.work_order_id,
            status: "blocked",
          },
        },
      });
    } finally {
      await broker.stop();
    }
    await expect(access(brokerDirectory)).rejects.toMatchObject({ code: "ENOENT" });
  });
});
