import { COMMAND_SNIPPETS } from "./command-snippets.js";

export const AGENT_BOOTSTRAP_DOC_PATH = "docs/user/agent-bootstrap.generated.mdx";
export const BRANCH_PR_HOSTED_GATE_GUIDANCE =
  "confirm hosted required checks through the repository's configured CI/provider gate; optional framework-maintainer helper when present: `bun run workflow:wait-remote-checks`";

type BootstrapSection = {
  heading: string;
  summary: string;
  commands: readonly string[];
  notes?: readonly string[];
};

export const BOOTSTRAP_PREFLIGHT_COMMANDS = [
  COMMAND_SNIPPETS.core.configShow,
  COMMAND_SNIPPETS.core.quickstart,
  COMMAND_SNIPPETS.core.taskList,
  COMMAND_SNIPPETS.core.taskActive,
  "git status --short --untracked-files=no",
  "git rev-parse --abbrev-ref HEAD",
] as const;

const BOOTSTRAP_CONTEXT_COMMANDS = [
  COMMAND_SNIPPETS.core.taskActive,
  COMMAND_SNIPPETS.core.taskBrief,
] as const;

export const BOOTSTRAP_TASK_PREP_COMMANDS = [
  COMMAND_SNIPPETS.core.taskNew,
  COMMAND_SNIPPETS.core.taskPlanSet,
  COMMAND_SNIPPETS.core.taskPlanApprove,
];

export const BOOTSTRAP_DIRECT_HAPPY_PATH_COMMANDS = [
  ...BOOTSTRAP_TASK_PREP_COMMANDS,
  COMMAND_SNIPPETS.core.startTask,
  COMMAND_SNIPPETS.core.taskVerifyShow,
  COMMAND_SNIPPETS.core.verifyTask,
  'agentplane finish <task-id> --author <ROLE> --body "Verified: ..." --result "..." --commit <git-rev>',
] as const;

export const BOOTSTRAP_VERIFICATION_COMMANDS = [
  COMMAND_SNIPPETS.core.taskVerifyShow,
  COMMAND_SNIPPETS.core.verifyTask,
  COMMAND_SNIPPETS.core.incidentsAdvise,
  `${COMMAND_SNIPPETS.core.incidentsCollect} --check`,
  "agentplane doctor",
  "node .agentplane/policy/check-routing.mjs",
] as const;

const BOOTSTRAP_RECOVERY_COMMANDS = [
  "agentplane doctor",
  "agentplane upgrade --dry-run",
  "agentplane upgrade",
] as const;

const BOOTSTRAP_SECTIONS: readonly BootstrapSection[] = [
  {
    heading: "1. Preflight",
    summary:
      "Establish workflow mode, current branch, active task candidates, and tracked working-tree state.",
    commands: BOOTSTRAP_PREFLIGHT_COMMANDS,
    notes: [
      "Run this before any mutation.",
      "If the project is not initialized, stop and use `agentplane init` first.",
      "`task active` ranks ready work after `task list`; use `task brief <task-id>` before owner-scoped execution.",
    ],
  },
  {
    heading: "2. Agent context",
    summary:
      "Load the task-specific context surface before manually combining task docs, route status, verify steps, PR metadata, and policy notes.",
    commands: BOOTSTRAP_CONTEXT_COMMANDS,
    notes: [
      "`task active` is the backlog selector for agents; it does not mutate task state.",
      "`task brief` is local-first by default and includes route, Verify Steps, policy modules, blueprint evidence, and source confidence labels.",
      "Use `task brief <task-id> --remote` only when hosted PR/check/review state is needed for the decision.",
    ],
  },
  {
    heading: "3. Direct happy path",
    summary:
      "When a repository is intentionally configured for direct mode, use one short route: create the task, approve it, start it, verify it, and finish it.",
    commands: BOOTSTRAP_DIRECT_HAPPY_PATH_COMMANDS,
    notes: [
      "Use `agentplane role ORCHESTRATOR` during planning, then switch to `agentplane role <OWNER>` before owner-scoped execution.",
      "Use `task doc set` to fill required README sections before approval.",
      "For dependent tasks, wait until upstream tasks are DONE before `task start-ready`.",
      "`task plan approve` and `task start-ready` must run sequentially, never in parallel.",
      "In `direct`, `finish` creates the deterministic close commit by default.",
      "Treat `task verify-show` as the verification contract right before `verify` and `finish`.",
    ],
  },
  {
    heading: "4. Verification and incident reuse",
    summary:
      "Reuse historical incident advice only through targeted lookup, and validate promotable resolved external findings before `finish`.",
    commands: BOOTSTRAP_VERIFICATION_COMMANDS,
    notes: [
      "Use `agentplane incidents advise <task-id>` after `start-ready` when analogous scope or tags might have prior external failure modes.",
      'Use `agentplane task findings add <task-id> --observation "..." --impact "..." --resolution "..."` to append task-local structured Findings without replacing the whole README; add `--promote --external` or `--repo-fixable` only for real reusable incidents.',
      "Use `agentplane incidents collect <task-id> --check` before `finish` when task `Findings` contains reusable external `Observation` / `Impact` / `Resolution` blocks. Plain prose in `Findings` stays task-local and does not update `.agentplane/policy/incidents.md`.",
      "Keep repository-fixable defects task-local; only external or process incidents belong in `.agentplane/policy/incidents.md`.",
    ],
  },
  {
    heading: "5. Fallbacks and recovery",
    summary:
      "Keep exceptional paths out of the normal route: use these only for recovery, framework upgrades, or branch_pr work.",
    commands: BOOTSTRAP_RECOVERY_COMMANDS,
    notes: [
      "Run `doctor` before touching managed policy files by hand.",
      "`upgrade` applies the managed framework files from the installed CLI bundle.",
      "Manual close handling (`--no-close-commit`, `--close-unstage-others`) belongs here, not in the default direct path.",
    ],
  },
] as const;

function renderBootstrapSectionLines(sections: readonly BootstrapSection[]): string[] {
  const lines: string[] = [];
  for (const section of sections) {
    lines.push(`## ${section.heading}`, "", section.summary, "");
    for (const command of section.commands) {
      lines.push(`- \`${command}\``);
    }
    if (section.notes && section.notes.length > 0) {
      lines.push("");
      for (const note of section.notes) {
        lines.push(`- ${note}`);
      }
    }
    lines.push("");
  }
  if (lines.at(-1) === "") lines.pop();
  return lines;
}

function renderCommandBlock(commands: readonly string[]): string[] {
  return ["```bash", ...commands, "```"];
}

export function renderBootstrapDoc(): string {
  const lines = [
    "---",
    'title: "Agent bootstrap"',
    'description: "The shortest canonical startup path for agent work in an Agent Plane repository."',
    "---",
    "",
    "This page is generated from `packages/agentplane/src/cli/bootstrap-guide.ts`.",
    "",
    "This is the docs-site rendering of the CLI bootstrap model. Installed repositories should rely on `agentplane quickstart` and `agentplane role <ROLE>` instead of requiring this file to exist locally.",
    "",
    "## Copy-paste start block",
    "",
    ...renderCommandBlock(BOOTSTRAP_PREFLIGHT_COMMANDS),
    "",
    `After preflight, use \`${COMMAND_SNIPPETS.core.taskActive}\` to choose ready work and \`${COMMAND_SNIPPETS.core.taskBrief}\` to load the task context surface. Then follow the configured workflow mode. In repositories configured for \`branch_pr\`, start with \`agentplane help work start\`, keep local PR artifacts current with \`agentplane pr ...\`, ${BRANCH_PR_HOSTED_GATE_GUIDANCE}, and let base-checkout \`integrate\` drive the task GitHub PR merge; use the direct-mode route below only when \`workflow_mode=direct\` is intentional.`,
    "",
    ...renderBootstrapSectionLines(BOOTSTRAP_SECTIONS),
    "",
    "## Non-default paths",
    "",
    `- \`branch_pr\`: in repositories configured this way, use \`${COMMAND_SNIPPETS.core.taskBrief}\` first, start a task branch/worktree, maintain PR artifacts, ${BRANCH_PR_HOSTED_GATE_GUIDANCE}, and finalize through the task GitHub PR merge plus Task Hosted Close.`,
    "- `direct`: use `task new/plan approve/start-ready -> task verify-show -> verify -> finish` only when `workflow_mode=direct` is intentional.",
    "- Use manual close flags only when a specific policy or recovery situation requires them.",
    "",
  ];
  return `${lines.join("\n")}\n`;
}
