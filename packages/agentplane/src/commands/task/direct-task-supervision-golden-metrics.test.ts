import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { recordDirectTaskSupervisionGoldenMetrics } from "./direct-task-supervision-golden-metrics.js";
import { directTaskSupervisorMetrics } from "./direct-task-supervision-measurement.js";

const temporaryRoots: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryRoots.splice(0).map(async (root) => await rm(root, { recursive: true })),
  );
});

describe("direct task supervision golden metrics", () => {
  it("persists an observed cost and safety comparison beside the direct task", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-direct-metrics-"));
    temporaryRoots.push(root);

    const evidence = await recordDirectTaskSupervisionGoldenMetrics({
      command: {
        config: { paths: { workflow_dir: ".agentplane/tasks" } },
        resolvedProject: { gitRoot: root },
      } as never,
      task_id: "202607290000-RF10A1",
      metrics: directTaskSupervisorMetrics({
        provider_episodes: 2,
        executor_lifecycle_event_delta: 0,
        declared_checks: 3,
        lifecycle_calls: 3,
        tool_calls: 4,
        duplicate_executor_context_bytes: 0,
      }),
      verified_success: true,
      committed_scope_enforced: true,
    });

    expect(evidence).toMatchObject({
      artifact_path: ".agentplane/tasks/202607290000-RF10A1/supervision/golden-metrics.json",
      comparison: { passed: true },
    });
    const artifact = JSON.parse(
      await readFile(path.join(root, evidence.artifact_path), "utf8"),
    ) as {
      baseline: { compatibility_release: string; costs: { lifecycle_calls: number } };
      observed: {
        costs: {
          lifecycle_calls: number;
          tool_calls: number;
          duplicate_executor_context_bytes: number;
        };
        quality_safety: {
          verified_success: boolean;
          executor_lifecycle_event_delta: number | null;
        };
      };
      comparison: { passed: boolean };
    };
    expect(artifact).toMatchObject({
      baseline: { compatibility_release: "0.6.24", costs: { lifecycle_calls: 7 } },
      observed: {
        costs: { lifecycle_calls: 3, tool_calls: 4, duplicate_executor_context_bytes: 0 },
        quality_safety: { verified_success: true, executor_lifecycle_event_delta: 0 },
      },
      comparison: { passed: true },
    });
  });

  it("fails the persisted comparison when ownership was not observed", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-direct-metrics-"));
    temporaryRoots.push(root);

    const evidence = await recordDirectTaskSupervisionGoldenMetrics({
      command: {
        config: { paths: { workflow_dir: ".agentplane/tasks" } },
        resolvedProject: { gitRoot: root },
      } as never,
      task_id: "202607290000-RF10A2",
      metrics: directTaskSupervisorMetrics({
        executor_lifecycle_event_delta: null,
        lifecycle_calls: 3,
        tool_calls: 4,
        duplicate_executor_context_bytes: 0,
      }),
      verified_success: true,
      committed_scope_enforced: true,
    });

    expect(evidence.comparison).toMatchObject({
      lifecycle_ownership_preserved: false,
      passed: false,
    });
  });
});
