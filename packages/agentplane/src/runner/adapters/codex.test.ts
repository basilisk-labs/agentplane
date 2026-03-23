import { defaultConfig } from "@agentplaneorg/core";
import { describe, expect, it } from "vitest";

import type { RunnerContextBundle } from "../types.js";
import { createRunnerAdapter } from "./index.js";

function makeBundle(): RunnerContextBundle {
  return {
    schema_version: 1,
    runner_api_version: "1",
    target: { kind: "task", task_id: "202603231410-ABC123" },
    base_prompts: [
      {
        id: "base.policy_gateway",
        role: "policy",
        content: "do not inline this policy text into argv",
        priority: 200,
      },
    ],
    repository: {
      git_root: "/repo",
      workflow_dir: ".agentplane/tasks",
      backend_id: "local",
      backend_config_path: "/repo/.agentplane/backends/local/backend.json",
      branch: "main",
      head_commit: null,
    },
    task: {
      task_id: "202603231410-ABC123",
      data: {
        id: "202603231410-ABC123",
        title: "Adapter test",
        description: "Adapter test task",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["code"],
        verify: [],
      },
      frontmatter: { id: "202603231410-ABC123", title: "Adapter test" },
      doc: "## Summary\n",
      sections: { Summary: "" },
      comments: [],
      events: [],
    },
    execution: {
      adapter_id: "codex",
      mode: "dry_run",
      run_id: "run-123",
      artifact_paths: {
        run_dir: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123",
        bundle_path: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/bundle.json",
        bootstrap_path: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/bootstrap.md",
        state_path: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/run-state.json",
        events_path: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/events.jsonl",
      },
    },
  };
}

describe("CodexRunnerAdapter", () => {
  it("returns normalized invocation metadata from bundle path and config-selected adapter", async () => {
    const adapter = createRunnerAdapter(defaultConfig());
    const bundle = makeBundle();

    const invocation = await adapter.prepare(bundle);

    expect(invocation).toMatchObject({
      adapter_id: "codex",
      run_id: "run-123",
      run_dir: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123",
      bundle_path: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/bundle.json",
      bootstrap_path: "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/bootstrap.md",
      dry_run: true,
      env: {
        AGENTPLANE_RUNNER_ADAPTER: "codex",
        AGENTPLANE_RUNNER_MODE: "dry_run",
        AGENTPLANE_RUNNER_API_VERSION: "1",
        AGENTPLANE_RUNNER_TARGET: "task",
      },
    });
    expect(invocation.argv).toEqual([
      "codex",
      "runner",
      "--bundle",
      "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123/bundle.json",
      "--run-dir",
      "/repo/.agentplane/tasks/202603231410-ABC123/runs/run-123",
    ]);
    expect(invocation.argv.join(" ")).not.toContain("do not inline this policy text into argv");
  });

  it("maps adapter execution errors into the shared runner result contract", async () => {
    const adapter = createRunnerAdapter(defaultConfig());

    const result = await adapter.execute({
      adapter_id: "codex",
      run_id: "run-123",
      run_dir: "",
      bundle_path: "",
      bootstrap_path: null,
      argv: [],
      env: {},
      dry_run: true,
    });

    expect(result.status).toBe("failed");
    expect(result.exit_code).toBe(1);
    expect(result.stderr_summary).toContain("bundle_path");
    expect(result.started_at).toMatch(/T/);
    expect(result.ended_at).toMatch(/T/);
  });
});
