import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { defaultConfig } from "@agentplaneorg/core/config";
import { execFileAsync } from "@agentplaneorg/core/process";
import {
  makeRunnerContextBundle,
  setRunnerBundleRunDir,
  writeRunnerExecutable,
} from "@agentplane/testkit/runner";
import { describe, expect, it } from "vitest";

import { writePreparedRunnerArtifacts } from "../artifacts.js";
import { createRunnerAdapter } from "./index.js";

async function makeGitTempRoot(prefix: string): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), prefix));
  await execFileAsync("git", ["init", "--quiet"], { cwd: root });
  return root;
}

describe("CustomRunnerAdapter work-order binding", () => {
  it("keeps v2 semantic-result work-order matching strict", async () => {
    const config = defaultConfig();
    config.runner.default_adapter = "custom";
    config.runner.custom = { command: ["custom-runner"] };
    const adapter = createRunnerAdapter(config);
    const root = await makeGitTempRoot("agentplane-custom-adapter-work-order-mismatch-");
    const fakeBinDir = path.join(root, "bin");
    const bundle = makeRunnerContextBundle({
      adapterId: "custom",
      taskId: "202607261710-WORKORDER",
      runId: "run-v2-work-order-mismatch",
      title: "Work-order mismatch",
      description: "Reject a semantic result bound to another work order.",
      status: "DOING",
    });
    bundle.repository.git_root = root;
    bundle.execution.mode = "execute";
    setRunnerBundleRunDir(bundle, path.join(root, "runs", "run-v2-work-order-mismatch"));
    await writeRunnerExecutable(root, "custom-runner", [
      [
        "#!/bin/sh",
        String.raw`printf '{"schema_version":2,"kind":"agent_semantic_result","work_order_id":"unexpected-work-order","status":"completed","summary":"Wrong work order.","findings":[],"uncertainty":[],"claimed_checks":[]}\n' > "$AGENTPLANE_RUNNER_RESULT_PATH"`,
        "cat >/dev/null",
        "exit 0",
      ].join("\n"),
    ]);

    const invocation = await adapter.prepare(bundle);
    invocation.env.PATH = `${fakeBinDir}:${process.env.PATH ?? ""}`;
    await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "Read the bundle from env.\n",
      invocation,
    });

    const result = await adapter.execute(invocation);

    expect(result).toMatchObject({
      status: "failed",
      exit_code: 8,
      execution_receipt: { verification_state: "rejected" },
    });
    expect(result.stderr_summary).toContain("does not match the supervised invocation");
    expect(
      await readFile(
        path.join(bundle.execution.artifact_paths.run_dir, "result.source.json"),
        "utf8",
      ),
    ).toContain('"work_order_id":"unexpected-work-order"');

    await rm(root, { recursive: true, force: true });
  });
});
