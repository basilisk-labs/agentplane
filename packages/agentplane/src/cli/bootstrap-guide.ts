import { COMMAND_SNIPPETS } from "./command-snippets.js";

export const AGENT_BOOTSTRAP_DOC_PATH = "docs/user/agent-bootstrap.generated.mdx";
export const AGENT_BOOTSTRAP_RUNTIME_SURFACE = "agentplane quickstart";

export type BootstrapSection = {
  heading: string;
  summary: string;
  commands: readonly string[];
  notes?: readonly string[];
};

export const BOOTSTRAP_PREFLIGHT_COMMANDS = [
  "agentplane config show",
  "agentplane quickstart",
  "agentplane task list",
  "git status --short --untracked-files=no",
  "git rev-parse --abbrev-ref HEAD",
] as const;

export const BOOTSTRAP_TASK_PREP_COMMANDS = [
  COMMAND_SNIPPETS.core.taskNew,
  'agentplane task plan set <task-id> --text "..." --updated-by <ROLE>',
  "agentplane task plan approve <task-id> --by ORCHESTRATOR",
];

export const BOOTSTRAP_DIRECT_HAPPY_PATH_COMMANDS = [
  ...BOOTSTRAP_TASK_PREP_COMMANDS,
  COMMAND_SNIPPETS.core.startTask,
  "agentplane task verify-show <task-id>",
  COMMAND_SNIPPETS.core.verifyTask,
  'agentplane finish <task-id> --author <ROLE> --body "Verified: ..." --result "..." --commit <git-rev>',
] as const;

export const BOOTSTRAP_RECOVERY_COMMANDS = [
  "agentplane doctor",
  "agentplane upgrade --dry-run",
  "agentplane upgrade",
] as const;

export const BOOTSTRAP_SECTIONS: readonly BootstrapSection[] = [
  {
    heading: "1. Preflight",
    summary:
      "Establish workflow mode, current branch, current task state, and tracked working-tree state.",
    commands: BOOTSTRAP_PREFLIGHT_COMMANDS,
    notes: [
      "Run this before any mutation.",
      "If the project is not initialized, stop and use `agentplane init` first.",
    ],
  },
  {
    heading: "2. Direct happy path",
    summary:
      "Use one short direct-mode route: create the task, approve it, start it, verify it, and finish it.",
    commands: BOOTSTRAP_DIRECT_HAPPY_PATH_COMMANDS,
    notes: [
      "Use `task doc set` to fill required README sections before approval.",
      "For dependent tasks, wait until upstream tasks are DONE before `task start-ready`.",
      "`task plan approve` and `task start-ready` must run sequentially, never in parallel.",
      "In `direct`, `finish` creates the deterministic close commit by default.",
      "Treat `task verify-show` as the verification contract right before `verify` and `finish`.",
    ],
  },
  {
    heading: "3. Fallbacks and recovery",
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

export function renderBootstrapReferenceLine(): string {
  return `Canonical installed startup surface: \`${AGENT_BOOTSTRAP_RUNTIME_SURFACE}\`.`;
}

export function renderBootstrapSectionLines(sections: readonly BootstrapSection[]): string[] {
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
    "After preflight, stay on the direct happy path unless the repository state is broken or you are explicitly in `branch_pr`.",
    "",
    ...renderBootstrapSectionLines(BOOTSTRAP_SECTIONS),
    "",
    "## Non-default paths",
    "",
    "- `direct`: the default route is `task new/plan approve/start-ready -> task verify-show -> verify -> finish`.",
    "- `branch_pr`: start a task branch/worktree, maintain PR artifacts, and let INTEGRATOR close on base.",
    "- Use manual close flags only when a specific policy or recovery situation requires them.",
    "",
  ];
  return `${lines.join("\n")}\n`;
}
