import {
  loadDirectSubcommandNames,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type { CommandHandler } from "../../cli/spec/spec.js";
import type { RunDeps } from "../../cli/run-cli/command-catalog/kernel.js";
import { wrapCommand } from "../../cli/run-cli/commands/wrap-command.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";

import {
  insightsSpec,
  type InsightsIssueParsed,
  type InsightsReportParsed,
} from "./insights.spec.js";
import { resolveAgentContext } from "./insights-issue-context.js";
import { renderIssueBody, sanitizeIssueTitle, trimOptional } from "./insights-issue-render.js";
import {
  createFeedbackIssue,
  feedbackCloudEndpoint,
  normalizeIssueTransport,
  type FeedbackGithubIssuesSettings,
} from "./insights-issue-publish.js";
import { buildInsightsReport, renderInsightsReport } from "./insights-report.js";

export { insightsIssueSpec, insightsReportSpec, insightsSpec } from "./insights.spec.js";
export type { InsightsReport } from "./insights-report.js";

const output = createCliEmitter();

export const runInsights: CommandHandler<GroupCommandParsed> = async (_ctx, p) => {
  throwGroupCommandUsage({
    spec: insightsSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["insights"]),
    command: "insights",
    contextCommand: "insights",
  });
};

export function makeRunInsightsReportHandler(deps: RunDeps): CommandHandler<InsightsReportParsed> {
  return async (ctx, parsed) =>
    wrapCommand({ command: "insights report", rootOverride: ctx.rootOverride }, async () => {
      const report = await buildInsightsReport({ deps, recentLimit: parsed.recentLimit });
      if (parsed.json) {
        output.json(report);
      } else {
        output.report(renderInsightsReport(report), {
          header: infoMessage("insights report: local diagnostic summary"),
        });
      }
      return 0;
    });
}

export function makeRunInsightsIssueHandler(deps: RunDeps): CommandHandler<InsightsIssueParsed> {
  return async (ctx, parsed) =>
    wrapCommand({ command: "insights issue", rootOverride: ctx.rootOverride }, async () => {
      const [resolved, loaded] = await Promise.all([
        deps.getResolvedProject("insights issue"),
        deps.getLoadedConfig("insights issue"),
      ]);
      const settings = (loaded.config.feedback as { github_issues: FeedbackGithubIssuesSettings })
        .github_issues;
      if (!settings.enabled && !parsed.dryRun && !parsed.allowDisabledFeedback) {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message: [
            "Feedback GitHub issues are disabled.",
            "Fix: enable with `agentplane config set feedback.github_issues.enabled true`, or pass `--allow-disabled-feedback` for this issue only.",
          ].join("\n"),
          context: {
            command: "insights issue",
            reason_code: "feedback_github_issues_disabled",
          },
        });
      }

      const agentContext = await resolveAgentContext({
        inline: parsed.agentContext,
        file: parsed.agentContextFile,
        root: resolved.gitRoot,
      });
      const errorCode = trimOptional(parsed.errorCode);
      if (
        errorCode === "E_INTERNAL" &&
        !agentContext &&
        !parsed.dryRun &&
        !parsed.allowMissingAgentContext
      ) {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message:
            "E_INTERNAL feedback issues require sanitized agent context. Pass --agent-context, --agent-context-file, or --allow-missing-agent-context.",
          context: {
            command: "insights issue",
            reason_code: "feedback_agent_context_required",
          },
        });
      }

      const report = await buildInsightsReport({
        deps,
        recentLimit: 8,
        failure: {
          errorCode: parsed.errorCode,
          commandId: parsed.failureCommand,
          phase: parsed.failurePhase,
          reasonCode: parsed.failureReasonCode,
          messageClass: parsed.failureMessageClass,
          argvShape: parsed.failureArgvShape,
        },
      });
      const title = sanitizeIssueTitle(parsed.title, parsed.errorCode);
      const body = renderIssueBody({
        body: parsed.body,
        errorCode: parsed.errorCode,
        report,
        includeInsightsReport: settings.include_insights_report,
        agentContext,
      });
      const payload = {
        repository: settings.repository,
        title,
        body,
        labels: settings.labels,
      };
      const transport = parsed.transport ?? normalizeIssueTransport(settings.transport);
      const endpoint = feedbackCloudEndpoint(settings);

      if (parsed.dryRun) {
        output.json({
          dry_run: true,
          transport,
          cloud_endpoint: transport === "cloud" || transport === "auto" ? endpoint : undefined,
          anonymous_cloud_allowed: settings.allow_anonymous_cloud === true,
          ...payload,
        });
        return 0;
      }

      if (transport === "cloud" && settings.allow_anonymous_cloud !== true) {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message:
            "Anonymous cloud feedback issue intake is disabled. Enable with `agentplane config set feedback.github_issues.allow_anonymous_cloud true`, then retry.",
          context: {
            command: "insights issue",
            reason_code: "feedback_anonymous_cloud_disabled",
          },
        });
      }

      const created = await createFeedbackIssue({
        root: resolved.gitRoot,
        settings,
        payload,
        report,
        transport,
        endpoint,
      });
      output.report(
        [
          { label: "transport", value: created.transport },
          { label: "repository", value: settings.repository },
          { label: "issue", value: created.issue },
          { label: "url", value: created.url },
        ],
        { header: infoMessage("feedback issue created") },
      );
      return 0;
    });
}
