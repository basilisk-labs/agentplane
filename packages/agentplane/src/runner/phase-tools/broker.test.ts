import { access, mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

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

    const response = await invokeRunnerPhaseToolThroughBroker({
      directory: brokerDirectory,
      token: grant.token,
      tool: "report_blocker",
      input: {
        summary: "The requested lifecycle operation is outside the delegated phase.",
        recommended_action: "Return control to the parent workflow.",
      },
    });

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
    await broker.stop();
    await expect(access(brokerDirectory)).rejects.toMatchObject({ code: "ENOENT" });
  });
});
