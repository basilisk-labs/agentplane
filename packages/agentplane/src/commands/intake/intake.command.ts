import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { RunDeps } from "../../cli/run-cli/command-catalog/kernel.js";
import { wrapCommand } from "../../cli/run-cli/commands/wrap-command.js";

import { buildIntakeReport, writeTaskIntakeManifest, type IntakeReport } from "./intake-report.js";

export type IntakeParsed = {
  request: string;
  json: boolean;
  search: boolean;
  noGit: boolean;
  taskId?: string;
  writeManifest: boolean;
  includeRawRequest: boolean;
};

const output = createCliEmitter();
const TASK_ID_RE = /^\d{12}-[A-Z0-9]{6}$/;

export const intakeSpec: CommandSpec<IntakeParsed> = {
  id: ["intake"],
  group: "Diagnostics",
  summary: "Build a deterministic intake envelope for a raw request.",
  description:
    "Extracts explicit file context, current git context, optional search candidates, default constraints, and quality warnings. This command does not use an LLM.",
  args: [{ name: "request", required: true, variadic: true, valueHint: "<request>" }],
  options: [
    { kind: "boolean", name: "json", default: false, description: "Emit machine-readable JSON." },
    {
      kind: "boolean",
      name: "search",
      default: false,
      description: "Add low-confidence rg-based file candidates from request keywords.",
    },
    {
      kind: "boolean",
      name: "no-git",
      default: false,
      description: "Do not include current git status files in the intake context.",
    },
    {
      kind: "string",
      name: "task",
      valueHint: "<task-id>",
      description: "Existing task id for manifest writing.",
    },
    {
      kind: "boolean",
      name: "write-manifest",
      default: false,
      description: "Write .agentplane/tasks/<task-id>/context/file-manifest.json. Requires --task.",
    },
    {
      kind: "boolean",
      name: "include-raw-request",
      default: false,
      description:
        "Persist the raw request in the task manifest. By default manifest raw text is redacted.",
    },
  ],
  examples: [
    {
      cmd: 'agentplane intake "Fix parser edge case in packages/agentplane/src/parser.ts; must keep public API"',
      why: "Inspect request quality and explicit file context before creating or running a task.",
    },
    {
      cmd: 'agentplane intake "Improve task quality diagnostics" --search --json',
      why: "Emit a machine-readable intake envelope with low-confidence search candidates.",
    },
    {
      cmd: 'agentplane intake "Implement approved scope" --task 202606080633-RA63N8 --write-manifest',
      why: "Persist a task-local context manifest without changing task lifecycle state.",
    },
  ],
  notes: [
    "Search candidates are evidence hints, not authority.",
    "`--write-manifest` writes a task-local artifact only; task creation remains owned by `agentplane task new` and `agentplane task begin`.",
  ],
  validateRaw: (raw) => {
    const request = Array.isArray(raw.args.request)
      ? raw.args.request.join(" ").trim()
      : String(raw.args.request ?? "").trim();
    if (!request) {
      throw usageError({ spec: intakeSpec, message: "Invalid value for request: empty." });
    }
    if (raw.opts["write-manifest"] === true && typeof raw.opts.task !== "string") {
      throw usageError({
        spec: intakeSpec,
        message: "--write-manifest requires --task <task-id>.",
      });
    }
    if (raw.opts["include-raw-request"] === true && raw.opts["write-manifest"] !== true) {
      throw usageError({
        spec: intakeSpec,
        message: "--include-raw-request requires --write-manifest.",
      });
    }
    if (
      raw.opts["write-manifest"] === true &&
      typeof raw.opts.task === "string" &&
      !TASK_ID_RE.test(raw.opts.task.trim())
    ) {
      throw usageError({
        spec: intakeSpec,
        message: "Invalid value for --task: expected task id like 202606080633-RA63N8.",
      });
    }
  },
  parse: (raw) => ({
    request: Array.isArray(raw.args.request)
      ? raw.args.request.join(" ")
      : String(raw.args.request ?? ""),
    json: raw.opts.json === true,
    search: raw.opts.search === true,
    noGit: raw.opts["no-git"] === true,
    taskId: raw.opts.task as string | undefined,
    writeManifest: raw.opts["write-manifest"] === true,
    includeRawRequest: raw.opts["include-raw-request"] === true,
  }),
};

function renderIntakeReport(
  report: IntakeReport,
): { label: string; value: string | number | boolean }[] {
  return [
    { label: "schema", value: report.schema },
    { label: "request_chars", value: report.request.chars },
    { label: "request_words", value: report.request.words },
    { label: "has_explicit_files", value: report.quality.has_explicit_files },
    { label: "has_acceptance_criteria", value: report.quality.has_acceptance_criteria },
    { label: "has_constraints", value: report.quality.has_constraints },
    { label: "likely_broad_scope", value: report.quality.likely_broad_scope },
    {
      label: "files",
      value:
        report.files.length > 0
          ? report.files
              .map((file) => `${file.path} (${file.source}/${file.confidence})`)
              .join(", ")
          : "none",
    },
    {
      label: "warnings",
      value:
        report.warnings.length > 0
          ? report.warnings.map((warning) => `${warning.code}:${warning.severity}`).join(", ")
          : "none",
    },
    { label: "manifest_path", value: report.manifest_path ?? "not_written" },
  ];
}

export function makeRunIntakeHandler(deps: RunDeps): CommandHandler<IntakeParsed> {
  return async (ctx, parsed) =>
    wrapCommand({ command: "intake", rootOverride: ctx.rootOverride }, async () => {
      const [resolved, loaded] = await Promise.all([
        deps.getResolvedProject("intake"),
        deps.getLoadedConfig("intake"),
      ]);
      let report = await buildIntakeReport({
        root: resolved.gitRoot,
        request: parsed.request,
        includeGit: !parsed.noGit,
        includeSearch: parsed.search,
      });
      if (parsed.writeManifest) {
        const taskId = parsed.taskId?.trim();
        if (!taskId) {
          throw usageError({ spec: intakeSpec, message: "--write-manifest requires --task." });
        }
        const manifestPath = await writeTaskIntakeManifest({
          root: resolved.gitRoot,
          workflowDir: loaded.config.paths.workflow_dir,
          taskId,
          report,
          includeRawRequest: parsed.includeRawRequest,
        });
        report = { ...report, manifest_path: manifestPath };
      }
      if (parsed.json) {
        output.json(report);
      } else {
        output.report(renderIntakeReport(report), {
          header: infoMessage("intake: deterministic request envelope"),
        });
        for (const warning of report.warnings) {
          output.line(`warning: ${warning.code}: ${warning.message}`);
        }
      }
      return 0;
    });
}
