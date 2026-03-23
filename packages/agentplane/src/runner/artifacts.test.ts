import { mkdtemp, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { appendRunnerEvent, writePreparedRunnerArtifacts } from "./artifacts.js";
import { resolveTaskRunnerPaths } from "./task-run-paths.js";
import type { RunnerContextBundle } from "./types.js";
import { RUNNER_API_VERSION, RUNNER_BUNDLE_SCHEMA_VERSION } from "./types.js";

describe("runner artifacts", () => {
  let tempDir = "";

  afterEach(async () => {
    if (tempDir) {
      const { rm } = await import("node:fs/promises");
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  it("writes bundle, bootstrap, state, and events layout deterministically", async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-runner-artifacts-"));
    const paths = resolveTaskRunnerPaths({
      git_root: tempDir,
      workflow_dir: ".agentplane/tasks",
      task_id: "202603231310-NT5V5C",
      run_id: "2026-03-23T13-00-00-000Z",
    });

    const bundle: RunnerContextBundle = {
      schema_version: RUNNER_BUNDLE_SCHEMA_VERSION,
      runner_api_version: RUNNER_API_VERSION,
      target: { kind: "task", task_id: "202603231310-NT5V5C" },
      base_prompts: [],
      repository: {
        git_root: tempDir,
        workflow_dir: ".agentplane/tasks",
        backend_id: "local",
        backend_config_path: path.join(tempDir, ".agentplane/backends/local/backend.json"),
      },
      task: {
        task_id: "202603231310-NT5V5C",
        data: {
          id: "202603231310-NT5V5C",
          title: "R3",
          description: "Define runner bundle contract",
          status: "DOING",
          priority: "high",
          owner: "CODER",
          depends_on: [],
          tags: ["runner"],
          verify: [],
        },
        frontmatter: { id: "202603231310-NT5V5C", status: "DOING" },
        doc: "## Summary\n\nBundle contract",
        sections: { Summary: "Bundle contract" },
        comments: [],
        events: [],
        readme_path: path.join(tempDir, ".agentplane/tasks/202603231310-NT5V5C/README.md"),
      },
      execution: {
        adapter_id: "codex",
        mode: "dry_run",
        run_id: "2026-03-23T13-00-00-000Z",
        artifact_paths: paths,
      },
    };
    const invocation = {
      adapter_id: "codex",
      run_id: "2026-03-23T13-00-00-000Z",
      run_dir: paths.run_dir,
      bundle_path: paths.bundle_path,
      state_path: paths.state_path,
      events_path: paths.events_path,
      bootstrap_path: paths.bootstrap_path,
      output_last_message_path: path.join(paths.run_dir, "codex-last-message.md"),
      argv: ["codex", "exec", "-"],
      env: {
        AGENTPLANE_RUNNER_ADAPTER: "codex",
        AGENTPLANE_RUNNER_MODE: "dry_run",
      },
      dry_run: true,
    };

    const state = await writePreparedRunnerArtifacts({
      bundle,
      bootstrap_markdown: "# bootstrap\n",
      created_at: "2026-03-23T13:00:00.000Z",
      invocation,
    });

    expect(state.status).toBe("prepared");
    expect(state.bundle_path).toBe(paths.bundle_path);
    expect(state.prepared_metadata).toMatchObject({
      prompt_count: 0,
      has_task_context: true,
      has_recipe_context: false,
      invocation: {
        executable: "codex",
        argv_count: 3,
        env_keys: ["AGENTPLANE_RUNNER_ADAPTER", "AGENTPLANE_RUNNER_MODE"],
        cwd: paths.run_dir,
        has_output_last_message_path: true,
      },
    });

    const writtenBundle = JSON.parse(
      await readFile(paths.bundle_path, "utf8"),
    ) as RunnerContextBundle;
    expect(writtenBundle.execution.artifact_paths.run_dir).toBe(paths.run_dir);

    const writtenState = JSON.parse(await readFile(paths.state_path, "utf8")) as {
      status: string;
      run_id: string;
      created_at: string;
    };
    expect(writtenState).toMatchObject({
      status: "prepared",
      run_id: "2026-03-23T13-00-00-000Z",
      created_at: "2026-03-23T13:00:00.000Z",
    });

    expect(await readFile(paths.bootstrap_path, "utf8")).toBe("# bootstrap\n");
    const initialEvents = await readFile(paths.events_path, "utf8");
    expect(initialEvents).toContain('"type":"runner_prepared"');
    expect(initialEvents).toContain('"bundle_sha256"');

    await appendRunnerEvent({
      events_path: paths.events_path,
      event: {
        at: "2026-03-23T13:00:01.000Z",
        type: "bundle_written",
        message: "bundle.json created",
      },
    });
    expect(await readFile(paths.events_path, "utf8")).toContain('"type":"bundle_written"');
  });
});
