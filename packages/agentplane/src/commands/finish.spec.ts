import type { CommandSpec } from "../cli/spec/spec.js";
import { verifyFindingOptions } from "./task/verify-command-shared.js";

import { parseFinishRaw, type FinishParsed, validateFinishRaw } from "./finish.spec.shared.js";

export type { FinishParsed } from "./finish.spec.shared.js";

export const finishSpec: CommandSpec<FinishParsed> = {
  id: ["finish"],
  group: "Lifecycle",
  summary: "Mark task(s) as DONE and record a structured Verified comment.",
  args: [
    {
      name: "task-id",
      required: true,
      variadic: true,
      valueHint: "<task-id>",
      description: "One or more existing task ids.",
    },
  ],
  options: [
    {
      kind: "string",
      name: "author",
      valueHint: "<id>",
      required: true,
      description: "Comment author id (e.g. INTEGRATOR).",
    },
    {
      kind: "string",
      name: "body",
      valueHint: "<text>",
      required: true,
      description: "Structured comment body (must match the configured Verified: prefix).",
    },
    {
      kind: "string",
      name: "result",
      valueHint: "<one-line>",
      description:
        "One-line result summary stored in task metadata (required for non-spike tasks when finishing a single task).",
    },
    {
      kind: "string",
      name: "risk",
      valueHint: "<low|med|high>",
      choices: ["low", "med", "high"],
      description: "Optional. Risk level stored in task metadata.",
    },
    {
      kind: "boolean",
      name: "breaking",
      default: false,
      description: "Optional. Mark the change as breaking in task metadata.",
    },
    {
      kind: "string",
      name: "commit",
      valueHint: "<hash>",
      description: "Commit hash to record on the task (optional).",
    },
    { kind: "boolean", name: "force", default: false, description: "Force finish despite gates." },
    {
      kind: "boolean",
      name: "yes",
      default: false,
      description: "Auto-approve force-action approval checks when required.",
    },
    {
      kind: "boolean",
      name: "commit-from-comment",
      default: false,
      description: "Create a commit using the comment body (requires exactly one task id).",
    },
    {
      kind: "string",
      name: "commit-emoji",
      valueHint: "<emoji>",
      description: "Override the commit emoji (used with --commit-from-comment).",
    },
    {
      kind: "string",
      name: "commit-allow",
      valueHint: "<path-prefix>",
      repeatable: true,
      description:
        "Repeatable. Allowlist path prefixes to stage for the commit (used with --commit-from-comment). Use minimal prefixes; '.' is rejected.",
    },
    {
      kind: "boolean",
      name: "commit-auto-allow",
      default: false,
      description: "Deprecated. Disabled for safety; pass explicit --commit-allow prefixes.",
      deprecated: "disabled",
    },
    {
      kind: "boolean",
      name: "commit-allow-tasks",
      default: true,
      hidden: true,
      description: "Deprecated. Tasks are always allowed for status commits.",
      deprecated: "no-op",
    },
    {
      kind: "boolean",
      name: "commit-require-clean",
      default: false,
      description: "Require a clean working tree for the commit (used with --commit-from-comment).",
    },
    {
      kind: "boolean",
      name: "status-commit",
      default: false,
      description: "Create a separate status commit (requires exactly one task id).",
    },
    {
      kind: "string",
      name: "status-commit-emoji",
      valueHint: "<emoji>",
      description: "Override the status commit emoji (used with --status-commit).",
    },
    {
      kind: "string",
      name: "status-commit-allow",
      valueHint: "<path-prefix>",
      repeatable: true,
      description:
        "Repeatable. Allowlist path prefixes to stage for the status commit (used with --status-commit). Use minimal prefixes; '.' is rejected.",
    },
    {
      kind: "boolean",
      name: "status-commit-auto-allow",
      default: false,
      description: "Deprecated. Disabled for safety; pass explicit --status-commit-allow prefixes.",
      deprecated: "disabled",
    },
    {
      kind: "boolean",
      name: "status-commit-require-clean",
      default: false,
      description:
        "Require a clean working tree for the status commit (used with --status-commit).",
    },
    {
      kind: "boolean",
      name: "confirm-status-commit",
      default: false,
      description:
        "Confirm status commit creation when status_commit_policy=confirm (used with --commit-from-comment or --status-commit).",
    },
    {
      kind: "boolean",
      name: "close-commit",
      default: false,
      description:
        "After finishing, run a deterministic close commit for the task README (single-task only).",
    },
    {
      kind: "boolean",
      name: "no-close-commit",
      default: false,
      description:
        "Disable the default deterministic close commit in direct mode (single-task only).",
    },
    {
      kind: "boolean",
      name: "close-unstage-others",
      default: false,
      description:
        "With --close-commit: unstage any currently staged paths before staging the task README.",
    },
    {
      kind: "string",
      name: "base",
      valueHint: "<branch>",
      description:
        "Optional explicit base branch override for branch_pr finish validation and close-commit reconciliation.",
    },
    ...verifyFindingOptions,
    { kind: "boolean", name: "quiet", default: false, description: "Suppress output." },
  ],
  examples: [
    {
      cmd: 'agentplane finish 202602030608-F1Q8AB --author INTEGRATOR --body "Verified: all checks passed" --commit abcdef123456',
      why: "Finish a task and record commit metadata.",
    },
    {
      cmd: 'agentplane finish 202602030608-F1Q8AB --author INTEGRATOR --body "Verified: all checks passed" --commit-from-comment --commit-allow packages/agentplane/src',
      why: "Finish and create a commit from the comment (single-task only).",
    },
    {
      cmd: 'agentplane finish 202602030608-F1Q8AB --author INTEGRATOR --body "Verified: all checks passed" --commit abcdef123456 --observation "Recurring manual recovery remained easy to miss." --impact "incidents.md stayed stale until a second command." --resolution "Capture the closeout finding during finish itself."',
      why: "Finish a task while appending a structured finding that can promote into incidents.md.",
    },
  ],
  validateRaw: (raw) => validateFinishRaw(raw, finishSpec),
  parse: parseFinishRaw,
};
