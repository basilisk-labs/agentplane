import { describe, expect, it } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import {
  buildTaskStatusTransition,
  buildTaskVerificationTransition,
} from "./shared/workflow-transition-service.js";

function mkTask(overrides: Partial<TaskData> = {}): TaskData {
  return {
    id: "T-1",
    title: "Title",
    description: "Desc",
    status: "TODO",
    priority: "normal",
    owner: "CODER",
    depends_on: [],
    tags: [],
    verify: [],
    comments: [],
    events: [],
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
    doc_version: 3,
    doc_updated_at: "2026-03-27T00:00:00.000Z",
    doc_updated_by: "CODER",
    ...overrides,
  };
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
      updated_at: "2026-03-27T01:10:00.000Z",
      updated_by: "REVIEWER",
      note: "Fix the parser edge case.",
    });
    expect(transition.nextTask.doc).toBe(nextDoc);
  });
});
