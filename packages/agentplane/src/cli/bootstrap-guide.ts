import { COMMAND_SNIPPETS } from "./command-snippets.js";

export const AGENT_BOOTSTRAP_DOC_PATH = "docs/user/agent-bootstrap.generated.mdx";

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

export const BOOTSTRAP_TASK_LIFECYCLE_COMMANDS = [
  ...BOOTSTRAP_TASK_PREP_COMMANDS,
  COMMAND_SNIPPETS.core.startTask,
  COMMAND_SNIPPETS.core.verifyTask,
  'agentplane finish <task-id> --author <ROLE> --body "Verified: ..." --result "..." --commit <git-rev>',
] as const;

export const BOOTSTRAP_VERIFY_AND_FINISH_COMMANDS = [
  "agentplane task verify-show <task-id>",
  COMMAND_SNIPPETS.core.verifyTask,
  'agentplane finish <task-id> --author <ROLE> --body "Verified: ..." --result "..." --commit <git-rev>',
] as const;

export const BOOTSTRAP_VERIFICATION_COMMANDS = [
  "agentplane task verify-show <task-id>",
  COMMAND_SNIPPETS.core.verifyTask,
  "agentplane doctor",
  "node .agentplane/policy/check-routing.mjs",
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
    heading: "2. Prepare executable task scope",
    summary:
      "Work only through executable task ids. Create the task, fill plan/docs, then approve the plan.",
    commands: BOOTSTRAP_TASK_PREP_COMMANDS,
    notes: [
      "Use `task doc set` to fill required README sections before approval.",
      "For dependent tasks, wait until upstream tasks are DONE before `task start-ready`.",
    ],
  },
  {
    heading: "3. Start work deterministically",
    summary: "Move the task to DOING only after plan approval succeeds.",
    commands: [COMMAND_SNIPPETS.core.startTask],
    notes: ["`task plan approve` and `task start-ready` must run sequentially, never in parallel."],
  },
  {
    heading: "4. Verify and finish",
    summary:
      "Treat Verify Steps as the contract, then record verification and close with traceable metadata.",
    commands: BOOTSTRAP_VERIFY_AND_FINISH_COMMANDS,
    notes: [
      "In `direct`, `finish` creates the deterministic close commit by default.",
      "Use `--no-close-commit` only for explicit manual close handling.",
    ],
  },
  {
    heading: "5. Recover mixed or broken state",
    summary:
      "Use diagnostics before manual repair, especially after framework upgrades or partial edits.",
    commands: BOOTSTRAP_RECOVERY_COMMANDS,
    notes: [
      "Run `doctor` before touching managed policy files by hand.",
      "`upgrade` applies the managed framework files from the installed CLI bundle.",
    ],
  },
] as const;

export function renderBootstrapReferenceLine(): string {
  return `Canonical bootstrap doc: \`${AGENT_BOOTSTRAP_DOC_PATH}\`.`;
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
    "Use it as the single startup path for agents. `AGENTS.md`, `agentplane quickstart`, and `agentplane role <ROLE>` should point here instead of restating lifecycle prose.",
    "",
    "## Copy-paste start block",
    "",
    ...renderCommandBlock(BOOTSTRAP_PREFLIGHT_COMMANDS),
    "",
    "After preflight, continue with the smallest task flow that matches your mode and role.",
    "",
    ...renderBootstrapSectionLines(BOOTSTRAP_SECTIONS),
    "",
    "## Direct vs branch_pr",
    "",
    "- `direct`: work in the current checkout and finish the task yourself.",
    "- `branch_pr`: start a task branch/worktree, maintain PR artifacts, and let INTEGRATOR close on base.",
    "",
  ];
  return `${lines.join("\n")}\n`;
}
