import type { AgentWorkOrderRole } from "@agentplaneorg/core/schemas";

import type { PromptMarkdownFragment } from "../../runtime/prompt-fragments/index.js";
import type { RunnerPromptBlock, RunnerTaskContext } from "../types.js";

type ProcessChoreographyMatch = {
  id: string;
  match: string;
};

const PROCESS_CHOREOGRAPHY_PATTERNS = [
  {
    id: "task_command",
    pattern: /\b(?:ap|agentplane)\s+task\s+(?!run\s+tool\b)[a-z][\w-]*\b/giu,
  },
  { id: "work_command", pattern: /\b(?:ap|agentplane)\s+work(?:\s+[a-z][\w-]*)?\b/giu },
  { id: "pr_command", pattern: /\b(?:ap|agentplane)\s+pr(?:\s+[a-z][\w-]*)?\b/giu },
  {
    id: "supervisor_control",
    pattern:
      /\b(?:ap|agentplane)\s+(?:verify|finish|integrate|cleanup|release|publish|doctor|flow|context|branch)(?:\s+[a-z][\w-]*)?\b/giu,
  },
  { id: "config_command", pattern: /\b(?:ap|agentplane)\s+config(?:\s+[a-z][\w-]*)?\b/giu },
  { id: "quickstart", pattern: /\b(?:ap|agentplane)\s+quickstart\b/giu },
  { id: "evaluator_execute", pattern: /\b(?:ap|agentplane)\s+evaluator\s+execute\b/giu },
  {
    id: "package_publish",
    pattern: /\b(?:npm|bun)\s+publish\b/giu,
  },
  {
    id: "git_control",
    pattern:
      /\bgit\s+(?:commit|push|merge|rebase|checkout|switch|branch|worktree|status|rev-parse)\b/giu,
  },
  { id: "github_pr", pattern: /\bgh\s+pr\b/giu },
] as const;

const PROCESS_REPAIR_AUTHORITY_TAG = "process-mechanism-repair";
const PROCESS_REPAIR_INTENT =
  /\b(?:lifecycle|orchestration|provider prompt|process choreography|supervisor protocol)\b/iu;

const SEMANTIC_GATEWAY_BODY_FRAGMENT_IDS = new Set(["gateway.agents.body.shared.prompt.contract"]);

const SEMANTIC_ROLE_CONTRACTS: Record<AgentWorkOrderRole, string[]> = {
  PLANNER: [
    "Produce the semantic plan, acceptance criteria, unresolved questions, and risk notes requested by the work order.",
    "Do not perform repository mutations or formal state transitions.",
  ],
  CURATOR: [
    "Resolve the supplied sources into bounded semantic context with explicit provenance and uncertainty.",
    "Write only the context outputs granted by the work order.",
  ],
  EXECUTOR: [
    "Implement only the supplied objective inside the granted writable roots.",
    "Return claims and check results through the declared semantic result schema.",
  ],
  EVALUATOR: [
    "Judge the supplied implementation and evidence against the acceptance and verification intent.",
    "Remain read-only and return a typed verdict with concrete findings and residual risk.",
  ],
};

function normalizeText(value: string): string {
  const trimmed = value.trim();
  return trimmed ? `${trimmed}\n` : "";
}

function processChoreographyMatches(value: string): ProcessChoreographyMatch[] {
  const matches: ProcessChoreographyMatch[] = [];
  for (const rule of PROCESS_CHOREOGRAPHY_PATTERNS) {
    for (const match of value.matchAll(rule.pattern)) {
      matches.push({ id: rule.id, match: match[0] });
    }
  }
  return matches;
}

function semanticTextHasProcessChoreography(value: string): boolean {
  return processChoreographyMatches(value).length > 0;
}

function projectSemanticFragmentText(value: string): string {
  const projected = value
    .split("\n")
    .flatMap((line) => {
      if (!semanticTextHasProcessChoreography(line)) return [line];

      const prefix = /^\s*(?:(?:[-*+] |\d+\.\s+))?/u.exec(line)?.[0] ?? "";
      const body = line.slice(prefix.length);
      const safeSegments = body
        .split(/(?<=[.!?;])\s+/u)
        .filter((segment) => segment.trim() && !semanticTextHasProcessChoreography(segment));
      if (safeSegments.length === 0) return [];
      return [`${prefix}${safeSegments.join(" ")}`.trimEnd()];
    })
    .join("\n")
    .replaceAll(/```[^\n]*\n\s*```/gu, "")
    .trim();
  return projected;
}

function isSemanticGatewayFragment(fragment: PromptMarkdownFragment): boolean {
  if (fragment.id === "gateway.user.instructions") return false;
  if (fragment.id === "gateway.agents.hard_constraint.size.budget") return false;
  if (fragment.slot === "purpose" || fragment.slot === "hard_constraint") return true;
  return fragment.slot === "body" && SEMANTIC_GATEWAY_BODY_FRAGMENT_IDS.has(fragment.id);
}

function projectGatewayBlock(block: RunnerPromptBlock): RunnerPromptBlock {
  const fragments = (block.fragments ?? [])
    .filter((fragment) => isSemanticGatewayFragment(fragment))
    .map((fragment) => projectSemanticFragmentText(fragment.text))
    .filter(Boolean);
  const projected = fragments.join("\n\n");
  return {
    ...block,
    title: "Semantic Policy Gateway Projection",
    source: `${block.source ?? block.id}#phase=semantic_episode`,
    content: normalizeText(
      [
        "# Semantic policy projection",
        "",
        "Only policy that constrains the current semantic episode is projected here.",
        projected,
      ]
        .filter(Boolean)
        .join("\n"),
    ),
    fragments: undefined,
  };
}

function projectOwnerProfileBlock(
  block: RunnerPromptBlock,
  role: AgentWorkOrderRole,
): RunnerPromptBlock {
  let sourceId: string = role;
  try {
    const parsed = JSON.parse(block.content) as { id?: unknown };
    if (typeof parsed.id === "string" && parsed.id.trim()) sourceId = parsed.id.trim();
  } catch {
    // The provider receives a normalized semantic role even when a custom profile is malformed.
  }
  return {
    ...block,
    title: `Semantic Role Projection (${role})`,
    source: `${block.source ?? block.id}#phase=semantic_episode`,
    content: normalizeText(
      JSON.stringify(
        {
          id: sourceId,
          semantic_role: role,
          phase: "semantic_episode",
          contract: SEMANTIC_ROLE_CONTRACTS[role],
        },
        null,
        2,
      ),
    ),
    fragments: undefined,
  };
}

function projectExecutionProfileBlock(block: RunnerPromptBlock): RunnerPromptBlock {
  let projected: Record<string, unknown> = {};
  try {
    const parsed = JSON.parse(block.content) as Record<string, unknown>;
    projected = {
      profile: parsed.profile,
      reasoning_effort: parsed.reasoning_effort,
      text_verbosity: parsed.text_verbosity,
      budget: parsed.budget,
      unsafe_actions_requiring_explicit_user_ok: parsed.unsafe_actions_requiring_explicit_user_ok,
    };
  } catch {
    projected = { phase: "semantic_episode" };
  }
  return {
    ...block,
    title: "Semantic Execution Profile Projection",
    source: `${block.source ?? block.id}#phase=semantic_episode`,
    content: normalizeText(JSON.stringify(projected, null, 2)),
    fragments: undefined,
  };
}

export function projectRunnerPromptsForSemanticEpisode(opts: {
  prompts: RunnerPromptBlock[];
  role: AgentWorkOrderRole;
}): RunnerPromptBlock[] {
  return opts.prompts.flatMap((block) => {
    if (block.id === "base.policy_gateway") return [projectGatewayBlock(block)];
    if (block.id === "base.owner_profile") return [projectOwnerProfileBlock(block, opts.role)];
    if (block.id === "base.execution_profile") return [projectExecutionProfileBlock(block)];
    if (block.id === "gateway.user.instructions") return [{ ...block, fragments: undefined }];
    if (semanticTextHasProcessChoreography(block.content)) return [];
    return [{ ...block, fragments: undefined }];
  });
}

export function hasExplicitProcessMechanismRepairAuthority(
  task: RunnerTaskContext | undefined,
): boolean {
  if (!task) return false;
  const hasExplicitAuthority = task.metadata.tags.some(
    (tag) => tag.toLowerCase() === PROCESS_REPAIR_AUTHORITY_TAG,
  );
  if (!hasExplicitAuthority) return false;
  const intent = [
    task.narrative.title,
    task.narrative.description,
    ...task.narrative.sections.map((section) => section.text),
  ].join("\n");
  return PROCESS_REPAIR_INTENT.test(intent);
}

export function assertSemanticProviderPromptHasNoProcessChoreography(opts: {
  prompt: string;
  process_mechanism_repair_authorized?: boolean;
}): void {
  if (opts.process_mechanism_repair_authorized) return;
  const matches = processChoreographyMatches(opts.prompt);
  if (matches.length === 0) return;
  const summary = matches
    .map((match) => `${match.id}:${JSON.stringify(match.match)}`)
    .filter((entry, index, values) => values.indexOf(entry) === index)
    .join(", ");
  throw new Error(
    `Semantic provider prompt contains supervisor-owned process choreography (${summary}).`,
  );
}
