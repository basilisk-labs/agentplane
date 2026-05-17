import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import { runGhApiJson } from "../pr/internal/gh-api.js";

import type { InsightsReport } from "./insights.command.js";

export type FeedbackIssueTransport = "github" | "cloud" | "auto";

export type FeedbackGithubIssuesSettings = {
  enabled: boolean;
  repository: string;
  transport?: FeedbackIssueTransport;
  cloud_endpoint?: string;
  allow_anonymous_cloud?: boolean;
  include_insights_report: boolean;
  labels: string[];
};

export type FeedbackIssuePayload = {
  repository: string;
  title: string;
  body: string;
  labels: string[];
};

type GithubIssueResponse = {
  number: number;
  html_url?: string;
};

type CloudIssueResponse = {
  intake_id?: string;
  issue_url?: string;
  status?: string;
};

export type CreatedFeedbackIssue = {
  transport: "github" | "cloud";
  issue: string;
  url: string;
};

function trimOptional(value: string | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  return trimmed || null;
}

export function normalizeIssueTransport(raw: string | undefined): FeedbackIssueTransport {
  return raw === "cloud" || raw === "auto" || raw === "github" ? raw : "github";
}

export function feedbackCloudEndpoint(settings: FeedbackGithubIssuesSettings): string {
  return trimOptional(settings.cloud_endpoint) ?? "https://agentplane.cloud/api/feedback/issues";
}

function cloudIntakeBody(opts: {
  payload: FeedbackIssuePayload;
  report: InsightsReport;
  anonymous: boolean;
}): Record<string, unknown> {
  return {
    schema: "agentplane.feedback.issue.v1",
    anonymous: opts.anonymous,
    repository: opts.payload.repository,
    title: opts.payload.title,
    body: opts.payload.body,
    labels: opts.payload.labels,
    client: {
      agentplane_version: opts.report.environment.agentplane_version,
      node_major: opts.report.environment.node_major,
      platform: opts.report.environment.platform,
      arch: opts.report.environment.arch,
    },
    failure: opts.report.failure,
    diagnostics: {
      workflow_mode: opts.report.project.workflow_mode,
      backend: opts.report.project.backend.id,
      git_branch: opts.report.git.branch,
      git_dirty: opts.report.git.dirty,
      dedupe_signature: opts.report.failure.dedupe_signature,
    },
    privacy: opts.report.privacy,
  };
}

async function createGithubIssue(
  root: string,
  settings: FeedbackGithubIssuesSettings,
  payload: FeedbackIssuePayload,
): Promise<CreatedFeedbackIssue> {
  const issue = await runGhApiJson<GithubIssueResponse>(root, [
    `repos/${settings.repository}/issues`,
    "-X",
    "POST",
    "-f",
    `title=${payload.title}`,
    "-f",
    `body=${payload.body}`,
    ...settings.labels.flatMap((label) => ["-f", `labels[]=${label}`]),
  ]);
  return {
    transport: "github",
    issue: `#${issue.number}`,
    url: issue.html_url ?? "unknown",
  };
}

async function createCloudIssue(opts: {
  endpoint: string;
  payload: FeedbackIssuePayload;
  report: InsightsReport;
}): Promise<CreatedFeedbackIssue> {
  const response = await fetch(opts.endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(
      cloudIntakeBody({ payload: opts.payload, report: opts.report, anonymous: true }),
    ),
  });
  const text = await response.text();
  const parsed = text.trim() ? (JSON.parse(text) as CloudIssueResponse) : {};
  if (!response.ok) {
    throw new CliError({
      exitCode: exitCodeForError("E_NETWORK"),
      code: "E_NETWORK",
      message: `Feedback cloud intake failed with HTTP ${response.status}.`,
      context: {
        command: "insights issue",
        reason_code: "feedback_cloud_intake_failed",
      },
    });
  }
  return {
    transport: "cloud",
    issue: parsed.intake_id ? `intake:${parsed.intake_id}` : (parsed.status ?? "accepted"),
    url: parsed.issue_url ?? "pending",
  };
}

export async function createFeedbackIssue(opts: {
  root: string;
  settings: FeedbackGithubIssuesSettings;
  payload: FeedbackIssuePayload;
  report: InsightsReport;
  transport: FeedbackIssueTransport;
  endpoint: string;
}): Promise<CreatedFeedbackIssue> {
  if (opts.transport === "cloud") {
    return await createCloudIssue({
      endpoint: opts.endpoint,
      payload: opts.payload,
      report: opts.report,
    });
  }
  if (opts.transport === "auto") {
    return await createGithubIssue(opts.root, opts.settings, opts.payload).catch(() =>
      createCloudIssue({ endpoint: opts.endpoint, payload: opts.payload, report: opts.report }),
    );
  }
  return await createGithubIssue(opts.root, opts.settings, opts.payload);
}
