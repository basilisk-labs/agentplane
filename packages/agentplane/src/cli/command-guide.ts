import { COMMAND_SNIPPETS } from "./command-snippets.js";
import { BOOTSTRAP_PREFLIGHT_COMMANDS } from "./bootstrap-guide.js";

type RoleGuide = {
  role: string;
  lines: string[];
};

export type RoleProfileGuide = {
  filename?: string;
  id?: string;
  role?: string;
  description?: string;
  inputs?: readonly string[];
  outputs?: readonly string[];
  permissions?: readonly string[];
  workflow?: readonly string[];
};

const SHARED_STARTUP_NOTE = `- Normal route: use \`${COMMAND_SNIPPETS.core.taskActive}\` to select ready work, then \`agentplane task advance <task-id> --agent-json\` for one bounded external-agent episode or \`agentplane task run <task-id>\` for the configured managed runner.`;

const ROUTE_ORACLE_NOTE =
  "- Diagnostics only: an operator may use `agentplane task brief <task-id>`, `agentplane task status <task-id> --route`, or `agentplane task next-action <task-id> --explain` when the supervisor explicitly returns a recovery boundary.";

const SEMANTIC_EPISODE_NOTE =
  "- During an `agent_episode`, perform only the supplied semantic objective, stay inside its authority and writable roots, write the typed result to the supplied result path, and request a fresh packet.";

const NO_CHOREOGRAPHY_NOTE =
  "- Do not run manual task lifecycle, branch/worktree, Git publication, PR, verification persistence, integration, cleanup, or release commands during a normal semantic episode; those are supervisor-owned operator/recovery interfaces.";

function renderQuickstartCommandBlock(commands: readonly string[]): string[] {
  return ["```bash", ...commands, "```"];
}

const ROLE_GUIDES: RoleGuide[] = [
  {
    role: "ORCHESTRATOR",
    lines: [
      SHARED_STARTUP_NOTE,
      ROUTE_ORACLE_NOTE,
      SEMANTIC_EPISODE_NOTE,
      NO_CHOREOGRAPHY_NOTE,
      "- Resolve only the planning, approval-summary, or scope decision requested by the current packet; the supervisor owns formal transitions and handoffs.",
    ],
  },
  {
    role: "PLANNER",
    lines: [
      SHARED_STARTUP_NOTE,
      ROUTE_ORACLE_NOTE,
      SEMANTIC_EPISODE_NOTE,
      NO_CHOREOGRAPHY_NOTE,
      "- Return an executable semantic plan with explicit scope, acceptance criteria, evidence, risks, and stop conditions only when the packet requests planning.",
    ],
  },
  {
    role: "CODER",
    lines: [
      SHARED_STARTUP_NOTE,
      ROUTE_ORACLE_NOTE,
      SEMANTIC_EPISODE_NOTE,
      NO_CHOREOGRAPHY_NOTE,
      "- Implement only inside the checkout and writable roots named by the WorkOrder; report changed paths, checks, and unresolved risks in the typed result.",
    ],
  },
  {
    role: "TESTER",
    lines: [
      SHARED_STARTUP_NOTE,
      ROUTE_ORACLE_NOTE,
      SEMANTIC_EPISODE_NOTE,
      NO_CHOREOGRAPHY_NOTE,
      "- Run only the checks supplied by the WorkOrder, evaluate their evidence independently, and return pass, rework, blocked, or human review without mutating lifecycle state.",
    ],
  },
  {
    role: "DOCS",
    lines: [
      SHARED_STARTUP_NOTE,
      ROUTE_ORACLE_NOTE,
      SEMANTIC_EPISODE_NOTE,
      NO_CHOREOGRAPHY_NOTE,
      "- For implementation tasks, verify generated/help surfaces after changing CLI-facing text.",
      "- The docs site may expand CLI behavior, but installed runtime guidance must stay self-contained and must not depend on repo-only docs paths.",
    ],
  },
  {
    role: "REVIEWER",
    lines: [
      SHARED_STARTUP_NOTE,
      ROUTE_ORACLE_NOTE,
      SEMANTIC_EPISODE_NOTE,
      NO_CHOREOGRAPHY_NOTE,
      "- Focus on regressions, lifecycle drift, and missing verification evidence.",
    ],
  },
  {
    role: "INTEGRATOR",
    lines: [
      SHARED_STARTUP_NOTE,
      ROUTE_ORACLE_NOTE,
      SEMANTIC_EPISODE_NOTE,
      NO_CHOREOGRAPHY_NOTE,
      "- Assess only the integration or conflict-resolution question supplied by the packet; the supervisor owns the merge lane, hosted gates, close tail, and cleanup.",
    ],
  },
  {
    role: "CREATOR",
    lines: [
      SHARED_STARTUP_NOTE,
      SEMANTIC_EPISODE_NOTE,
      NO_CHOREOGRAPHY_NOTE,
      "- Create only the requested agent artifacts inside the supplied writable roots.",
    ],
  },
  {
    role: "UPDATER",
    lines: [
      SHARED_STARTUP_NOTE,
      SEMANTIC_EPISODE_NOTE,
      "- Read-only role: inspect the supplied context and return the requested update without mutating repository or task state.",
    ],
  },
];

export function listRoles(): string[] {
  return ROLE_GUIDES.map((guide) => guide.role);
}

export function getRoleSupplementLines(roleRaw: string): string[] | null {
  const trimmed = roleRaw.trim();
  if (!trimmed) return null;
  const normalized = trimmed.toUpperCase();
  switch (normalized) {
    case "ORCHESTRATOR": {
      return ROLE_GUIDES[0]?.lines ?? null;
    }
    case "PLANNER": {
      return ROLE_GUIDES[1]?.lines ?? null;
    }
    case "CODER": {
      return ROLE_GUIDES[2]?.lines ?? null;
    }
    case "TESTER": {
      return ROLE_GUIDES[3]?.lines ?? null;
    }
    case "DOCS": {
      return ROLE_GUIDES[4]?.lines ?? null;
    }
    case "REVIEWER": {
      return ROLE_GUIDES[5]?.lines ?? null;
    }
    case "INTEGRATOR": {
      return ROLE_GUIDES[6]?.lines ?? null;
    }
    case "CREATOR": {
      return ROLE_GUIDES[7]?.lines ?? null;
    }
    case "UPDATER": {
      return ROLE_GUIDES[8]?.lines ?? null;
    }
    default: {
      return null;
    }
  }
}

function renderRoleList(title: string, items: readonly string[] | undefined): string[] {
  return items && items.length > 0 ? ["", `${title}:`, ...items.map((item) => `- ${item}`)] : [];
}

export function renderRole(
  roleRaw: string,
  opts: { profile?: RoleProfileGuide | null } = {},
): string | null {
  const trimmed = roleRaw.trim();
  if (!trimmed) return null;
  const normalized = trimmed.toUpperCase();
  const supplementLines = getRoleSupplementLines(normalized);
  const profile = opts.profile ?? null;
  if (!supplementLines && !profile) return null;

  const heading = (typeof profile?.id === "string" && profile.id.trim()) || normalized;
  const role = typeof profile?.role === "string" ? profile.role.trim() : "";
  const description = typeof profile?.description === "string" ? profile.description.trim() : "";

  const lines: string[] = [
    `### ${heading}`,
    ...(role ? [`Role: ${role}`] : []),
    ...(description ? [`Description: ${description}`] : []),
    ...renderRoleList("Inputs", profile?.inputs),
    ...renderRoleList("Outputs", profile?.outputs),
    ...renderRoleList("Permissions", profile?.permissions),
    ...renderRoleList("Workflow", profile?.workflow),
    ...(supplementLines ? ["", "CLI/runtime notes:", ...supplementLines] : []),
    ...(profile?.filename
      ? [
          "",
          `Source: .agentplane/agents/${profile.filename} (role-specific content); policy gateway files still have higher priority.`,
        ]
      : []),
  ];
  return lines.join("\n").trimEnd();
}

export function renderQuickstart(): string {
  return renderQuickstartForMode();
}

type QuickstartWorkflowMode = "direct" | "branch_pr" | null;

function renderQuickstartWorkflowNotes(mode: QuickstartWorkflowMode): string[] {
  const intro =
    "- Agentplane reads the configured workflow mode and owns its formal transitions; agents do not need to reconstruct the state machine.";
  const shared = [
    "- Use `agentplane task active` to pick ready work, then `agentplane task advance <task-id> --agent-json` for one bounded external-agent action or `agentplane task run <task-id>` for managed execution.",
    "- During an agent episode, follow only the supplied objective, authority, context references, output schema, and stop rule. Return the typed result and request a fresh packet.",
    "- Manual lifecycle, branch/worktree, Git publication, PR, verification persistence, integration, cleanup, and release commands are operator/recovery interfaces, not the normal agent route.",
  ];
  const branchPr = [
    "- `branch_pr`: the supervisor prepares or selects the task worktree, publishes the PR, waits for hosted checks, integrates, and closes the task. The WorkOrder names the authoritative checkout and writable roots.",
  ];
  const direct = [
    "- `direct`: the supervisor keeps work in the current checkout and owns start, verification persistence, and closeout; the agent receives only the semantic boundary.",
  ];
  if (mode === "branch_pr") return [intro, ...shared, ...branchPr];
  if (mode === "direct") return [intro, ...shared, ...direct];
  return [intro, ...shared, ...branchPr, ...direct];
}

export function renderQuickstartForMode(mode: QuickstartWorkflowMode = null): string {
  return [
    "# agentplane quickstart",
    "",
    "The policy gateway file (AGENTS.md or CLAUDE.md) is the source of truth for agent policy; `.agentplane/WORKFLOW.md` is the single repo-local workflow/config source.",
    "`agentplane config show` is the runtime readback of `.agentplane/WORKFLOW.md`; `agentplane quickstart` is startup guidance, not a second config source.",
    "Keep this first screen short: use it for startup only, then go deeper with `agentplane role <ROLE>` or `agentplane help <command>`.",
    "Do not edit `.agentplane/tasks.json` by hand.",
    "If the repository is not initialized yet, stop and run `agentplane init` first.",
    "",
    `Canonical installed startup surface: \`${COMMAND_SNIPPETS.core.quickstart}\`.`,
    "",
    "## First screen",
    "",
    "Select work through the compact supervisor surface:",
    "",
    ...renderQuickstartCommandBlock(BOOTSTRAP_PREFLIGHT_COMMANDS),
    "",
    "Workflow route notes:",
    "",
    ...renderQuickstartWorkflowNotes(mode),
    "",
    "## First visible payoff",
    "",
    `After \`agentplane init\`, run \`${COMMAND_SNIPPETS.core.demo}\` to create a harmless local task that shows the artifact shape, verification record, and ACR before giving a coding agent broad edit scope:`,
    "",
    ...renderQuickstartCommandBlock([
      "agentplane demo",
      "agentplane acr validate <task-id> --mode local",
    ]),
    "",
    "For a real first task, create it without synthetic planning, then request one compact action:",
    "",
    ...renderQuickstartCommandBlock([
      'agentplane task new --title "Inspect AgentPlane artifacts" --description "Review the generated task record" --owner DOCS --tag docs',
      "agentplane task advance <task-id> --agent-json",
    ]),
    "",
    "The payoff is a repo-visible task record:",
    "",
    "```text",
    ".agentplane/tasks/<task-id>/",
    "|-- README.md        task, plan, verification, rollback, findings",
    "|-- acr.json         Agent Change Record for local evidence review",
    "`-- pr/             branch_pr review artifacts when that mode is active",
    "```",
    "",
    "The compact packet lets Claude Code, Codex, Cursor, Aider, or another coding agent focus on the requested semantic step while Agentplane retains formal lifecycle state.",
    "",
    "## Go deeper",
    "",
    "- `agentplane task run <task-id>` lets the configured managed runner consume the same supervisor state and stop at human or external boundaries.",
    `- \`${COMMAND_SNIPPETS.core.taskBrief}\` for a human-readable diagnostic brief.`,
    "- `agentplane blueprint examples` to inspect how analysis, content, docs, code, and release tasks resolve to different routes.",
    "- `agentplane help <command>` for flags, examples, and exceptional/manual flows.",
    "- Keep installed runtime guidance self-contained; do not depend on repo-only docs files.",
    "- If you need the docs site, treat it as a public reference surface rather than a required local file.",
    "",
    "## Non-default",
    "",
    "- Operators may use `agentplane task brief <task-id>`, `agentplane task status <task-id> --route`, and `agentplane task next-action <task-id> --explain` for diagnostics or explicit recovery.",
    "- Recovery/mixed state: use `agentplane doctor`, `agentplane upgrade`, and `agentplane runtime explain`.",
    "- Manual close or allowlist details belong in command-specific help, not on this first screen.",
  ].join("\n");
}
