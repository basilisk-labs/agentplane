import { describe, expect, it } from "vitest";

import { buildCloudPullPlan, readMergedOpenConflicts, readOpenConflicts } from "./cloud-pull.js";
import type { TaskData } from "./shared.js";

const TASK_ID = "202607241245-R3V1";

function localTask(): TaskData {
  return {
    id: TASK_ID,
    title: "Existing",
    description: "Cloud revision projection",
    status: "TODO",
    priority: "med",
    owner: "CODER",
    depends_on: [],
    tags: ["cloud"],
    verify: [],
    sync: {
      version: 1,
      external_refs: [
        {
          connector_kind: "cloud",
          provider: "github-projects",
          remote_id: "remote-1",
          remote_revision: "revision-1",
        },
      ],
      field_policies: {},
      freshness: {
        provider_revision: "revision-1",
      },
      conflicts: [],
    },
  };
}

describe("cloud pull projection validation", () => {
  it("projects revision-only changes for existing tasks into provider freshness", () => {
    const plan = buildCloudPullPlan(
      [localTask()],
      [
        {
          id: TASK_ID,
          remote_id: "remote-1",
          revision: "revision-2",
          title: "Existing",
          status: "TODO",
          priority: "med",
          owner: "CODER",
          tags: ["cloud"],
        },
      ],
      { provider: "github-projects", remoteCreatePolicy: "ignore" },
    );

    expect(plan.changedSummaries).toEqual([{ taskId: TASK_ID, fields: ["sync"] }]);
    expect(plan.changed).toHaveLength(1);
    expect(plan.changed[0]?.sync?.freshness).toMatchObject({
      provider_revision: "revision-2",
      stale: false,
    });
    expect(plan.changed[0]?.sync?.external_refs).toEqual([
      expect.objectContaining({
        connector_kind: "cloud",
        provider: "github-projects",
        remote_id: "remote-1",
        remote_revision: "revision-2",
      }),
    ]);
  });

  it("marks provider freshness unavailable when an existing remote task omits its revision", () => {
    const plan = buildCloudPullPlan(
      [localTask()],
      [{ id: TASK_ID, remote_id: "remote-1", title: "Existing" }],
      { provider: "github-projects", remoteCreatePolicy: "ignore" },
    );

    expect(plan.changed[0]?.sync?.freshness).toMatchObject({
      stale: true,
      reason: "cloud_pull_provider_revision_missing",
    });
    expect(plan.changed[0]?.sync?.freshness?.provider_revision).toBeUndefined();
  });

  it("normalizes numeric provider revisions for newly imported tasks", () => {
    const plan = buildCloudPullPlan(
      [],
      [
        {
          id: TASK_ID,
          remote_id: "remote-1",
          revision: 42,
          title: "Imported",
          status: "TODO",
        },
      ],
      { provider: "github-projects", remoteCreatePolicy: "import" },
    );

    expect(plan.added[0]?.sync?.freshness).toMatchObject({
      provider_revision: "42",
      stale: false,
    });
    expect(plan.added[0]?.sync?.external_refs[0]).toMatchObject({
      remote_revision: "42",
    });
  });

  it.each([{ open: true }, "unknown", -1, 1.5])(
    "rejects malformed conflict payloads instead of treating them as empty: %j",
    (payload) => {
      expect(() => readOpenConflicts(payload)).toThrow("Cloud conflict payload is invalid");
    },
  );

  it("merges top-level and data conflict envelopes without letting an empty envelope win", () => {
    const open = { task_id: TASK_ID, field: "status", state: "open" };
    expect(readMergedOpenConflicts([], [open])).toEqual([open]);
    expect(readMergedOpenConflicts([open], [open])).toEqual([open]);
  });

  it("rejects a malformed nested conflict envelope even when the top-level envelope is empty", () => {
    expect(() => readMergedOpenConflicts([], { count: 0 })).toThrow(
      "Cloud conflict payload is invalid",
    );
  });

  it("keeps a conflict open when state and status fields disagree", () => {
    const conflict = { state: "resolved", status: "open" };
    expect(readOpenConflicts([conflict])).toEqual([conflict]);
  });

  it.each(["UNKNOWN", 42, null])(
    "rejects invalid remote status instead of silently normalizing it: %j",
    (status) => {
      expect(() =>
        buildCloudPullPlan([localTask()], [{ id: TASK_ID, status }], {
          provider: "github-projects",
          remoteCreatePolicy: "ignore",
        }),
      ).toThrow("invalid status");
    },
  );

  it.each([
    ["title", { title: 42 }],
    ["priority", { priority: { level: "high" } }],
    ["priority", { priority: Number.NaN }],
    ["owner", { owner: null }],
    ["tags", { tags: ["cloud", 42] }],
  ])("rejects malformed present remote %s instead of silently ignoring it", (field, patch) => {
    expect(() =>
      buildCloudPullPlan([localTask()], [{ id: TASK_ID, ...patch }], {
        provider: "github-projects",
        remoteCreatePolicy: "ignore",
      }),
    ).toThrow(`invalid ${field}`);
  });

  it.each([
    ["description", { description: 42 }],
    ["depends_on", { depends_on: "task-1" }],
    ["verify", { verify: ["ok", 42] }],
    ["provider", { provider: "" }],
    ["remote_id", { remote_id: null }],
    ["remote_url", { remote_url: 42 }],
    ["url", { url: {} }],
    ["remote_revision", { remote_revision: {} }],
    ["revision", { revision: null }],
    ["projected_at", { projected_at: "not-a-timestamp" }],
    ["state", { state: 42 }],
  ])("rejects malformed present remote metadata %s", (field, patch) => {
    expect(() =>
      buildCloudPullPlan([localTask()], [{ id: TASK_ID, ...patch }], {
        provider: "github-projects",
        remoteCreatePolicy: "ignore",
      }),
    ).toThrow(`invalid ${field}`);
  });

  it.each([
    [
      "revision",
      {
        remote_revision: "revision-2",
        revision: "revision-3",
      },
    ],
    [
      "URL",
      {
        remote_url: "https://example.test/remote-1",
        url: "https://example.test/remote-2",
      },
    ],
    [
      "state",
      {
        state: "DONE",
        status: "TODO",
      },
    ],
  ])("rejects conflicting %s aliases", (_label, patch) => {
    expect(() =>
      buildCloudPullPlan([localTask()], [{ id: TASK_ID, ...patch }], {
        provider: "github-projects",
        remoteCreatePolicy: "ignore",
      }),
    ).toThrow("conflicting");
  });

  it("rejects a remote provider that conflicts with the configured provider", () => {
    expect(() =>
      buildCloudPullPlan([localTask()], [{ id: TASK_ID, provider: "linear" }], {
        provider: "github-projects",
        remoteCreatePolicy: "ignore",
      }),
    ).toThrow("conflicts with configured provider");
  });

  it("accepts equivalent revision, URL, and normalized state aliases", () => {
    expect(() =>
      buildCloudPullPlan(
        [localTask()],
        [
          {
            id: TASK_ID,
            remote_revision: 2,
            revision: "2",
            remote_url: "https://example.test/remote-1",
            url: "https://example.test/remote-1",
            state: "doing",
            status: "DOING",
          },
        ],
        {
          provider: "github-projects",
          remoteCreatePolicy: "ignore",
        },
      ),
    ).not.toThrow();
  });

  it("normalizes a valid remote status before constructing the write plan", () => {
    const plan = buildCloudPullPlan([localTask()], [{ id: TASK_ID, status: " doing " }], {
      provider: "github-projects",
      remoteCreatePolicy: "ignore",
    });

    expect(plan.changed[0]?.status).toBe("DOING");
  });

  it.each([
    ["path traversal", "../escape"],
    ["leading whitespace", ` ${TASK_ID}`],
    ["lowercase suffix", "202607241245-abcd"],
    ["non-Crockford suffix", "202607241245-OILU"],
  ])("rejects %s task ids before constructing deletion effects", (_label, id) => {
    expect(() =>
      buildCloudPullPlan([localTask()], [{ id }], {
        provider: "github-projects",
        remoteCreatePolicy: "ignore",
      }),
    ).toThrow("Cloud pull projection is invalid");
  });

  it("rejects duplicate canonical task ids before constructing deletion effects", () => {
    expect(() =>
      buildCloudPullPlan([localTask()], [{ id: TASK_ID }, { id: TASK_ID }], {
        provider: "github-projects",
        remoteCreatePolicy: "ignore",
      }),
    ).toThrow("duplicate task id");
  });
});
