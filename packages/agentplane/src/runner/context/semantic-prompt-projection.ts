import { readFile } from "node:fs/promises";
import path from "node:path";

import type { AgentWorkOrderRole } from "@agentplaneorg/core/schemas";

import {
  parsePromptMarkdownFragments,
  type PromptMarkdownFragment,
} from "../../runtime/prompt-fragments/index.js";
import type { RunnerPromptBlock, RunnerTaskContext } from "../types.js";

type ProcessChoreographyMatch = {
  id: string;
  match: string;
};

const GIT_SUPERVISOR_SUBCOMMANDS = [
  "add",
  "am",
  "apply",
  "archive",
  "bisect",
  "branch",
  "bundle",
  "checkout",
  "cherry-pick",
  "clean",
  "clone",
  "commit",
  "config",
  "fast-import",
  "fetch",
  "filter-branch",
  "format-patch",
  "gc",
  "init",
  "maintenance",
  "merge",
  "mergetool",
  "mv",
  "notes",
  "pull",
  "push",
  "rebase",
  "remote",
  "repack",
  "replace",
  "request-pull",
  "reset",
  "restore",
  "rev-parse",
  "revert",
  "rm",
  "send-email",
  "sparse-checkout",
  "stash",
  "status",
  "submodule",
  "switch",
  "tag",
  "update-index",
  "update-ref",
  "worktree",
] as const;

const GIT_SUPERVISOR_COMMAND_PATTERN = new RegExp(
  String.raw`\bgit\s+(?:${GIT_SUPERVISOR_SUBCOMMANDS.join("|")})\b`,
  "giu",
);

const PROCESS_CHOREOGRAPHY_PATTERNS = [
  {
    id: "task_command",
    pattern: /\b(?:ap|agentplane)\s+task\s+(?:run\s+tool\s+[a-z][\w-]*|[a-z][\w-]*)\b/giu,
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
    pattern: /\b(?:npm|bun)\s+(?:publish|version)\b/giu,
  },
  {
    id: "changeset_release",
    pattern: /\b(?:npx|bunx)?\s*changeset\s+(?:publish|version)\b/giu,
  },
  { id: "github_release", pattern: /\bgh\s+release\b/giu },
  {
    id: "git_supervisor_command",
    pattern: GIT_SUPERVISOR_COMMAND_PATTERN,
  },
  { id: "github_pr", pattern: /\bgh\s+pr\b/giu },
  {
    id: "supervisor_persistence_artifact",
    pattern:
      /\b(?:bootstrap_path|bundle_path|events_path|receipt_path|result_path|state_path|stderr_path|trace_path)\b/giu,
  },
] as const;

const PROCESS_REPAIR_AUTHORITY_TAG = "process-mechanism-repair";
const PROCESS_REPAIR_INTENT =
  /\b(?:lifecycle|orchestration|provider prompt|process choreography|supervisor protocol)\b/iu;

const CANONICAL_SEMANTIC_GATEWAY_FRAGMENT_IDS = new Set([
  "gateway.agents.purpose.purpose",
  "gateway.agents.hard_constraint.scope.boundary",
]);

const PROCESS_POLICY_PROSE_PATTERNS = [
  /\b(?:result|receipt)[\s_-]+paths?\b/iu,
  /\bfresh\s+(?:supervisor\s+)?packets?\b/iu,
  /\b(?:formal|lifecycle|state)\s+transitions?\b/iu,
  /\bverification\s+persistence\b/iu,
  /\bresume(?:\s+with)?\s+(?:the\s+)?(?:packet(?:'s)?\s+)?(?:exact\s+)?argv\b/iu,
];

const SEMANTIC_ROLE_CONTRACTS: Record<AgentWorkOrderRole, string[]> = {
  PLANNER: [
    "Produce the semantic plan, acceptance criteria, unresolved questions, and risk notes requested by the work order.",
    "Remain read-only and return only the requested semantic plan.",
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
  return (
    processChoreographyMatches(value).length > 0 ||
    PROCESS_POLICY_PROSE_PATTERNS.some((pattern) => pattern.test(value))
  );
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

function isSecurityPolicyModule(modulePath: string, fragments: PromptMarkdownFragment[]): boolean {
  return (
    path.posix.basename(modulePath.replaceAll("\\", "/")) === "security.must.md" ||
    fragments.some((fragment) => fragment.id.startsWith("policy.security."))
  );
}

export async function collectSemanticPolicyModulePrompts(opts: {
  git_root: string;
  policy_modules: readonly string[];
}): Promise<RunnerPromptBlock[]> {
  const gitRoot = path.resolve(opts.git_root);
  const blocks: RunnerPromptBlock[] = [];
  for (const [index, modulePath] of [...new Set(opts.policy_modules)].toSorted().entries()) {
    const absolutePath = path.resolve(gitRoot, modulePath);
    const relativePath = path.relative(gitRoot, absolutePath);
    if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
      throw new Error(`Semantic policy module escapes repository root: ${modulePath}`);
    }
    const source = await readFile(absolutePath, "utf8");
    const parsed = parsePromptMarkdownFragments(source, {
      source_ref: modulePath,
      fallback_id: `policy.security.module.${index + 1}`,
      fallback_slot: "hard_constraint",
    });
    if (!isSecurityPolicyModule(modulePath, parsed.fragments)) continue;
    const constraints = parsed.fragments
      .filter((fragment) => fragment.slot === "hard_constraint")
      .map((fragment) => projectSemanticFragmentText(fragment.text))
      .filter(Boolean)
      .join("\n\n");
    if (!constraints) continue;
    blocks.push({
      id: `semantic.security_policy.${index + 1}`,
      role: "policy",
      title: "Semantic Security Policy Projection",
      source: `${modulePath}#phase=semantic_episode`,
      priority: 205,
      content: normalizeText(
        [
          "# Semantic security constraints",
          "",
          "These constraints are selected by the resolved blueprint and apply to this episode.",
          constraints,
        ].join("\n"),
      ),
    });
  }
  return blocks;
}

function isSemanticGatewayFragment(fragment: PromptMarkdownFragment): boolean {
  if (fragment.id.startsWith("gateway.agents.")) {
    return CANONICAL_SEMANTIC_GATEWAY_FRAGMENT_IDS.has(fragment.id);
  }
  return fragment.slot === "purpose" || fragment.slot === "hard_constraint";
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
  declared_phase_tool_invocations?: string[];
}): void {
  if (opts.process_mechanism_repair_authorized) return;
  const declaredPhaseTools = new Set(
    (opts.declared_phase_tool_invocations ?? []).map((invocation) =>
      invocation.trim().replaceAll(/\s+/gu, " ").toLowerCase(),
    ),
  );
  const matches = processChoreographyMatches(opts.prompt).filter((match) => {
    if (match.id !== "task_command") return true;
    const normalized = match.match.trim().replaceAll(/\s+/gu, " ").toLowerCase();
    return !declaredPhaseTools.has(normalized);
  });
  if (matches.length === 0) return;
  const summary = matches
    .map((match) => `${match.id}:${JSON.stringify(match.match)}`)
    .filter((entry, index, values) => values.indexOf(entry) === index)
    .join(", ");
  throw new Error(
    `Semantic provider prompt contains supervisor-owned process choreography (${summary}).`,
  );
}
