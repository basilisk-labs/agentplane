import { describe, expect, it } from "vitest";

import {
  renderIntegrationQueueDoctorResult,
  renderIntegrationQueueListResult,
} from "./integrate-queue-render.js";
import type { IntegrationQueueDoctorResult } from "./integrate-queue-doctor-command.js";
import type { IntegrationQueueListResult } from "./integrate-queue-list.js";
import { renderReleasePlanResult } from "./release/plan.render.js";
import type { ReleasePlanResult } from "./release/plan.command.js";

const queue = {
  schema_version: 1 as const,
  entries: [
    {
      task_id: "T-1",
      branch: "task/T-1/work",
      base: "main",
      head_sha: "head-sha",
      base_sha: "base-sha",
      changed_paths: ["src/work.ts"],
      pr_number: 101,
      pr_url: "https://example.invalid/pull/101",
      priority: 0,
      status: "queued" as const,
      enqueued_at: "2026-08-01T00:00:00.000Z",
      updated_at: "2026-08-01T00:00:00.000Z",
    },
  ],
};

describe("typed provider and release result renderers", () => {
  it("preserves integration queue human and JSON payload compatibility without exposing audit internals", () => {
    const result: IntegrationQueueListResult = {
      schema: "agentplane.integration_queue.list.v1",
      operation: "integrate.queue.list",
      queue,
      active_entries: queue.entries,
      audit: { authority: "local_read", attempts: 1, effects_applied: 0 },
    };

    expect(renderIntegrationQueueListResult(result, true)).toEqual([
      { kind: "json", value: queue },
    ]);
    expect(renderIntegrationQueueListResult(result, false)).toEqual([
      {
        kind: "line",
        text: "queued  T-1 #101 priority=0 branch=task/T-1/work",
      },
    ]);
  });

  it("maps a typed doctor outcome to one exit code while keeping audit and disposition out of JSON", () => {
    const result: IntegrationQueueDoctorResult = {
      schema: "agentplane.integration_queue.doctor.v1",
      operation: "integrate.queue.doctor",
      findings: [
        {
          task_id: "T-1",
          status: "queued",
          reason: "provider merge is complete",
          repair: "mark_done",
          disposition: "would_apply",
        },
      ],
      applied: false,
      mutex: {
        state: "absent",
        lock_path: "/repo/.agentplane/cache/locks/integration-queue.lock",
        manual_recovery_required: false,
      },
      exit_code: 0,
      audit: {
        authority: "provider_read",
        attempts: 1,
        effects_applied: 0,
        requested_fix: true,
        dry_run: true,
      },
    };

    expect(renderIntegrationQueueDoctorResult(result, true)).toEqual([
      {
        kind: "json",
        value: {
          findings: [
            {
              task_id: "T-1",
              status: "queued",
              reason: "provider merge is complete",
              repair: "mark_done",
            },
          ],
          applied: false,
          mutex: result.mutex,
        },
      },
    ]);
    expect(renderIntegrationQueueDoctorResult(result, false)).toEqual([
      {
        kind: "line",
        text: "T-1 queued: provider merge is complete repair=mark_done would_apply",
      },
    ]);
  });

  it("renders release artifacts from exact typed SHA provenance", () => {
    const result: ReleasePlanResult = {
      schema: "agentplane.release.plan.v1",
      operation: "release.plan",
      previous_tag: "v0.6.24",
      previous_version: "0.6.24",
      next_tag: "v0.6.25",
      next_version: "0.6.25",
      bump: "patch",
      base_sha: "0123456789abcdef",
      plan_dir: ".agentplane/.release/plan/run-1",
      artifact_paths: [".agentplane/.release/plan/run-1/version.json"],
      change_count: 1,
      minimum_release_note_bullets: 1,
      audit: { authority: "local_release_plan", attempts: 1, effects_applied: 4 },
    };

    expect(renderReleasePlanResult(result)).toEqual([
      { kind: "line", text: "Release plan written: .agentplane/.release/plan/run-1" },
      { kind: "line", text: "Next tag: v0.6.25" },
      {
        kind: "line",
        text: "Hint: Create a DOCS task to write docs/releases/v0.6.25.md based on this plan.",
      },
    ]);
    expect(result.base_sha).toBe("0123456789abcdef");
  });
});
