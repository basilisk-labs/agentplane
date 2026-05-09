import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import { makeTaskFixture } from "@agentplane/testkit/task";
import {
  buildTaskStatusTransition,
  executeTaskStatusTransitionRequest,
  buildTaskVerificationTransition,
  executeTaskVerificationTransitionRequest,
} from "./shared/workflow-transition-service.js";

function mkTask(overrides: Partial<TaskData> = {}): TaskData {
  return makeTaskFixture({
    doc: [
      "## Summary",
      "x",
      "",
      "## Verify Steps",
      "1. do the thing",
      "",
      "## Verification",
      "<!-- BEGIN VERIFICATION RESULTS -->",
      "<!-- END VERIFICATION RESULTS -->",
    ].join("\n"),
    doc_updated_at: "2026-03-27T00:00:00.000Z",
    ...overrides,
  });
}

describe("workflow transition service", () => {
  it("buildTaskStatusTransition returns one canonical update for store and backend paths", () => {
    const task = mkTask({ status: "DOING" });
    const transition = buildTaskStatusTransition({
      task,
      at: "2026-03-27T01:00:00.000Z",
      toStatus: "BLOCKED",
      eventAuthor: "CODER",
      updatedBy: "CODER",
      note: "Blocked: waiting on upstream fix.",
      comment: { author: "CODER", body: "Blocked: waiting on upstream fix." },
      extraFields: { result_summary: "paused" },
    });

    expect(transition.currentStatus).toBe("DOING");
    expect(transition.intents.map((intent) => intent.kind)).toEqual([
      "set-task-fields",
      "append-comments",
      "append-events",
      "touch-doc-meta",
    ]);
    expect(transition.nextTask.status).toBe("BLOCKED");
    expect(transition.nextTask.result_summary).toBe("paused");
    expect(transition.nextTask.comments).toEqual([
      { author: "CODER", body: "Blocked: waiting on upstream fix." },
    ]);
    expect(transition.nextTask.events).toEqual([
      {
        type: "status",
        at: "2026-03-27T01:00:00.000Z",
        author: "CODER",
        from: "DOING",
        to: "BLOCKED",
        note: "Blocked: waiting on upstream fix.",
      },
    ]);
  });

  it("buildTaskVerificationTransition keeps one canonical verification write", () => {
    const task = mkTask({
      status: "DONE",
      commit: { hash: "abc1234", message: "old" },
    });
    const nextDoc = [
      "## Summary",
      "x",
      "",
      "## Verify Steps",
      "1. do the thing",
      "",
      "## Verification",
      "<!-- BEGIN VERIFICATION RESULTS -->",
      "### 2026-03-27T01:10:00.000Z — VERIFY — needs_rework",
      "",
      "By: REVIEWER",
      "",
      "Note: Fix the parser edge case.",
      "",
      "<!-- END VERIFICATION RESULTS -->",
    ].join("\n");
    const transition = buildTaskVerificationTransition({
      task,
      at: "2026-03-27T01:10:00.000Z",
      by: "REVIEWER",
      note: "Fix the parser edge case.",
      state: "needs_rework",
      attempts: 1,
      maxReworkAttempts: 3,
      verificationSection: [
        "<!-- BEGIN VERIFICATION RESULTS -->",
        "### 2026-03-27T01:10:00.000Z — VERIFY — needs_rework",
        "",
        "By: REVIEWER",
        "",
        "Note: Fix the parser edge case.",
        "",
        "<!-- END VERIFICATION RESULTS -->",
      ].join("\n"),
      nextDoc,
      requiredSections: ["Summary", "Verify Steps", "Verification"],
    });

    expect(transition.intents.map((intent) => intent.kind)).toEqual([
      "set-task-fields",
      "set-section",
      "append-events",
      "touch-doc-meta",
    ]);
    expect(transition.nextTask.status).toBe("DOING");
    expect(transition.nextTask.commit).toBeNull();
    expect(transition.nextTask.verification).toEqual({
      state: "needs_rework",
      attempts: 1,
      updated_at: "2026-03-27T01:10:00.000Z",
      updated_by: "REVIEWER",
      note: "Fix the parser edge case.",
    });
    expect(transition.nextTask.doc).toBe(nextDoc);
  });

  it("executeTaskStatusTransitionRequest centralizes status validation and deferred commit warnings", async () => {
    const config = defaultConfig();
    config.status_commit_policy = "warn";
    const backend: Pick<TaskBackend, "getTask" | "getTasks"> = {
      getTask: () => Promise.resolve(null),
      getTasks: () => Promise.resolve([]),
    };

    const execution = await executeTaskStatusTransitionRequest({
      task: mkTask({ status: "DOING" }),
      backend,
      config,
      at: "2026-03-27T01:20:00.000Z",
      toStatus: "BLOCKED",
      eventAuthor: "CODER",
      updatedBy: "CODER",
      note: "Blocked: waiting on upstream fix.",
      comment: { author: "CODER", body: "Blocked: waiting on upstream fix." },
      force: false,
      dependencyPolicy: { kind: "none" },
      commentCommitPolicy: {
        enabled: true,
        action: "block",
        confirmed: false,
        quiet: false,
      },
    });

    expect(execution.currentStatus).toBe("DOING");
    expect(execution.dependencyState).toBeNull();
    expect(execution.deferredWarnings).toEqual([
      "block: status/comment-driven commit requested; policy=warn (pass --confirm-status-commit to acknowledge)",
    ]);
    expect(execution.nextTask.status).toBe("BLOCKED");
  });

  it("executeTaskStatusTransitionRequest blocks not-ready dependency transitions with shared warnings", async () => {
    const config = defaultConfig();
    const backend: Pick<TaskBackend, "getTask" | "getTasks"> = {
      getTask: () => Promise.resolve(null),
      getTasks: () => Promise.resolve([null, mkTask({ id: "DEP-2", status: "DOING" })]),
    };

    await expect(
      executeTaskStatusTransitionRequest({
        task: mkTask({ depends_on: ["DEP-1", "DEP-2"] }),
        backend,
        config,
        at: "2026-03-27T01:30:00.000Z",
        toStatus: "DOING",
        eventAuthor: "CODER",
        updatedBy: "CODER",
        note: "Start: move forward.",
        comment: { author: "CODER", body: "Start: move forward." },
        force: false,
        dependencyPolicy: { kind: "require-ready" },
      }),
    ).rejects.toMatchObject({
      code: "E_USAGE",
      message: "Task is not ready: T-1 (use --force to override)",
      context: {
        reason_code: "task_transition_dependencies_not_ready",
        deferred_warnings: ["missing deps: DEP-1", "incomplete deps: DEP-2"],
      },
    });
  });

  it("executeTaskStatusTransitionRequest rejects invalid transitions before applying writes", async () => {
    const config = defaultConfig();
    const backend: Pick<TaskBackend, "getTask" | "getTasks"> = {
      getTask: () => Promise.resolve(null),
      getTasks: () => Promise.resolve([]),
    };

    await expect(
      executeTaskStatusTransitionRequest({
        task: mkTask({ status: "TODO" }),
        backend,
        config,
        at: "2026-03-27T01:40:00.000Z",
        toStatus: "DONE",
        eventAuthor: "CODER",
        updatedBy: "CODER",
        force: false,
        dependencyPolicy: { kind: "none" },
      }),
    ).rejects.toMatchObject({
      code: "E_USAGE",
      message: "Refusing status transition TODO -> DONE (use --force to override)",
    });
  });

  it("executeTaskVerificationTransitionRequest builds one canonical verification transition", () => {
    const execution = executeTaskVerificationTransitionRequest({
      task: mkTask({
        status: "DONE",
        commit: { hash: "abc1234", message: "old" },
        doc_updated_at: "2026-03-27T00:00:00.000Z",
      }),
      at: "2026-03-27T02:00:00.000Z",
      by: "REVIEWER",
      note: "Fix the parser edge case.",
      state: "needs_rework",
      details: "Run focused parser tests",
      doc: [
        "## Summary",
        "x",
        "",
        "## Verify Steps",
        "1. do the thing",
        "",
        "## Verification",
        "<!-- BEGIN VERIFICATION RESULTS -->",
        "<!-- END VERIFICATION RESULTS -->",
      ].join("\n"),
      requiredSections: ["Summary", "Verify Steps", "Verification"],
    });

    expect(execution.verificationSection).toContain("VERIFY — needs_rework");
    expect(execution.verificationSection).toContain("Details:");
    expect(execution.nextDoc).toContain("VerifyStepsRef:");
    expect(execution.nextTask.status).toBe("DOING");
    expect(execution.nextTask.commit).toBeNull();
    expect(execution.intents.map((intent) => intent.kind)).toEqual([
      "set-task-fields",
      "set-section",
      "append-events",
      "touch-doc-meta",
    ]);
  });

  it("keeps rework DOING through the configured max and blocks when the next attempt exceeds it", () => {
    const withinLimit = executeTaskVerificationTransitionRequest({
      task: mkTask({
        status: "DONE",
        verification: {
          state: "needs_rework",
          attempts: 2,
          updated_at: "2026-03-27T01:00:00.000Z",
          updated_by: "REVIEWER",
          note: "Prior review.",
        },
      }),
      at: "2026-03-27T02:00:00.000Z",
      by: "REVIEWER",
      note: "One more rework pass.",
      state: "needs_rework",
      doc: mkTask().doc ?? "",
      requiredSections: ["Summary", "Verify Steps", "Verification"],
      maxReworkAttempts: 3,
    });

    expect(withinLimit.nextTask.status).toBe("DOING");
    expect(withinLimit.nextTask.verification).toMatchObject({
      state: "needs_rework",
      attempts: 3,
    });
    expect(withinLimit.verificationSection).toContain("VERIFY — needs_rework");
    expect(withinLimit.verificationSection).toContain("Attempts: 3");

    const exceededLimit = executeTaskVerificationTransitionRequest({
      task: mkTask({
        status: "DONE",
        verification: {
          state: "needs_rework",
          attempts: 3,
          updated_at: "2026-03-27T01:00:00.000Z",
          updated_by: "REVIEWER",
          note: "Prior review.",
        },
      }),
      at: "2026-03-27T03:00:00.000Z",
      by: "REVIEWER",
      note: "Limit exceeded.",
      state: "needs_rework",
      doc: mkTask().doc ?? "",
      requiredSections: ["Summary", "Verify Steps", "Verification"],
      maxReworkAttempts: 3,
    });

    expect(exceededLimit.nextTask.status).toBe("BLOCKED");
    expect(exceededLimit.nextTask.commit).toBeNull();
    expect(exceededLimit.nextTask.verification).toMatchObject({
      state: "blocked_external",
      attempts: 4,
    });
    expect(exceededLimit.verificationSection).toContain("VERIFY — blocked_external");
    expect(exceededLimit.verificationSection).toContain("Attempts: 4");
  });
});
