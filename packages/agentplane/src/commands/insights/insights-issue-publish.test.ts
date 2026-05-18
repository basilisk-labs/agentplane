import { beforeEach, describe, expect, it, vi } from "vitest";

const gh = vi.hoisted(() => ({
  runGhApiJson: vi.fn<() => Promise<{ number: number; html_url?: string }>>(),
}));

vi.mock("../pr/internal/gh-api.js", () => gh);

import { createFeedbackIssue } from "./insights-issue-publish.js";

import type { InsightsReport } from "./insights.command.js";

function reportFixture(): InsightsReport {
  return {
    schema: "agentplane.insights.report.v1",
    generated_at: "2026-05-17T00:00:00.000Z",
    local_only: true,
    network: "not_used",
    environment: {
      agentplane_version: "0.0.0-test",
      node_major: 20,
      platform: "darwin",
      arch: "arm64",
    },
    project: {
      workflow_mode: "branch_pr",
      backend: { id: "local", config_path: ".agentplane/backends/local/backend.json" },
      initialized: true,
    },
    git: {
      branch: "main",
      dirty: false,
      remotes: "redacted",
    },
    tasks: {
      total: 0,
      by_status: {},
      by_owner: {},
      by_tag: {},
    },
    failure: {
      error_code: "E_INTERNAL",
      command_id: "task start-ready",
      phase: "resolve_context",
      reason_code: "test_failure",
      message_class: "internal",
      argv_shape: ["task", "start-ready"],
      dedupe_signature: "sha256:test",
    },
    privacy: {
      excludes: ["environment variables"],
      redactions: ["remotes"],
    },
  };
}

describe("insights issue publishing", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("lets auto transport publish through GitHub without anonymous cloud opt-in", async () => {
    gh.runGhApiJson.mockResolvedValue({ number: 42, html_url: "https://github.test/issues/42" });

    await expect(
      createFeedbackIssue({
        root: "/repo",
        settings: {
          enabled: true,
          repository: "example/repo",
          transport: "auto",
          allow_anonymous_cloud: false,
          include_insights_report: true,
          labels: ["agentplane-feedback"],
        },
        payload: {
          repository: "example/repo",
          title: "Feedback issue",
          body: "Body",
          labels: ["agentplane-feedback"],
        },
        report: reportFixture(),
        transport: "auto",
        endpoint: "https://cloud.example/feedback",
      }),
    ).resolves.toEqual({
      transport: "github",
      issue: "#42",
      url: "https://github.test/issues/42",
    });
    expect(gh.runGhApiJson).toHaveBeenCalledOnce();
  });

  it("blocks auto transport cloud fallback only after GitHub publishing fails", async () => {
    gh.runGhApiJson.mockRejectedValue(new Error("gh auth missing"));

    await expect(
      createFeedbackIssue({
        root: "/repo",
        settings: {
          enabled: true,
          repository: "example/repo",
          transport: "auto",
          allow_anonymous_cloud: false,
          include_insights_report: true,
          labels: ["agentplane-feedback"],
        },
        payload: {
          repository: "example/repo",
          title: "Feedback issue",
          body: "Body",
          labels: ["agentplane-feedback"],
        },
        report: reportFixture(),
        transport: "auto",
        endpoint: "https://cloud.example/feedback",
      }),
    ).rejects.toThrow("GitHub feedback issue publishing failed");
    expect(gh.runGhApiJson).toHaveBeenCalledOnce();
  });
});
