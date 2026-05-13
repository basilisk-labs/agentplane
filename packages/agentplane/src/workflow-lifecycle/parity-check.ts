import { readFile } from "node:fs/promises";
import path from "node:path";

import { requireBlueprint } from "../blueprints/registry.js";
import { renderQuickstart } from "../cli/command-guide.js";
import {
  CODE_WORKFLOW_LIFECYCLE_CONTRACTS,
  lifecycleBlueprintNodeKinds,
  type WorkflowLifecycleContract,
} from "./contract.js";

export type LifecycleParityFinding = {
  code: string;
  message: string;
  file?: string;
};

type SurfaceCheck = {
  file: string;
  mode: keyof typeof CODE_WORKFLOW_LIFECYCLE_CONTRACTS;
  order: readonly string[];
};

const BRANCH_PR_SURFACES: readonly SurfaceCheck[] = [
  {
    file: "packages/agentplane/assets/AGENTS.md",
    mode: "branch_pr",
    order: CODE_WORKFLOW_LIFECYCLE_CONTRACTS.branch_pr.gatewayCommandOrder,
  },
  {
    file: "docs/user/workflow.mdx",
    mode: "branch_pr",
    order: CODE_WORKFLOW_LIFECYCLE_CONTRACTS.branch_pr.docsCommandOrder,
  },
  {
    file: "docs/user/task-lifecycle.mdx",
    mode: "branch_pr",
    order: CODE_WORKFLOW_LIFECYCLE_CONTRACTS.branch_pr.docsCommandOrder,
  },
  {
    file: "docs/user/commands.mdx",
    mode: "branch_pr",
    order: CODE_WORKFLOW_LIFECYCLE_CONTRACTS.branch_pr.docsCommandOrder,
  },
  {
    file: "docs/user/branching-and-pr-artifacts.mdx",
    mode: "branch_pr",
    order: CODE_WORKFLOW_LIFECYCLE_CONTRACTS.branch_pr.docsCommandOrder,
  },
  {
    file: "docs/workflow-guides/branch-pr.mdx",
    mode: "branch_pr",
    order: CODE_WORKFLOW_LIFECYCLE_CONTRACTS.branch_pr.docsCommandOrder,
  },
];

const DIRECT_SURFACES: readonly SurfaceCheck[] = [
  {
    file: "packages/agentplane/assets/AGENTS.md",
    mode: "direct",
    order: CODE_WORKFLOW_LIFECYCLE_CONTRACTS.direct.gatewayCommandOrder,
  },
];

const FORBIDDEN_BRANCH_PR_DOC_PATTERNS = [
  "git push -u origin task/<task-id>",
  "gh pr create --base main --head task/<task-id>",
  "Hosted GitHub PR creation still uses",
  "push the task branch",
  "open a hosted PR",
] as const;

function relativePath(root: string, absolutePath: string): string {
  return path.relative(root, absolutePath).replaceAll("\\", "/");
}

function orderedMissingOrDrift(text: string, order: readonly string[]): string | null {
  let cursor = -1;
  for (const marker of order) {
    const next = text.indexOf(marker, cursor + 1);
    if (next < 0) {
      return `missing or out of order marker: ${marker}`;
    }
    cursor = next;
  }
  return null;
}

function markdownCodeFences(text: string): string[] {
  const fences: string[] = [];
  const pattern = /```(?:bash|text)?\n([\s\S]*?)```/gu;
  for (const match of text.matchAll(pattern)) {
    const body = match[1];
    if (body) fences.push(body);
  }
  return fences;
}

function hasOrderedSurface(text: string, order: readonly string[]): boolean {
  return [text, ...markdownCodeFences(text)].some(
    (candidate) => !orderedMissingOrDrift(candidate, order),
  );
}

function checkBlueprintRoute(contract: WorkflowLifecycleContract): LifecycleParityFinding[] {
  const blueprint = requireBlueprint(contract.blueprintId);
  const actual = blueprint.nodes.map((node) => node.kind);
  const expected = lifecycleBlueprintNodeKinds(contract.mode);
  if (actual.join(" -> ") === expected.join(" -> ")) return [];

  return [
    {
      code: "blueprint_lifecycle_order_drift",
      message: `${contract.blueprintId} route drifted from lifecycle contract: expected ${expected.join(
        " -> ",
      )}; actual ${actual.join(" -> ")}`,
    },
  ];
}

async function checkTextSurface(
  root: string,
  check: SurfaceCheck,
): Promise<LifecycleParityFinding[]> {
  const absolutePath = path.join(root, check.file);
  const text = await readFile(absolutePath, "utf8");
  if (hasOrderedSurface(text, check.order)) return [];

  return [
    {
      code: "text_lifecycle_order_drift",
      file: relativePath(root, absolutePath),
      message: `${check.mode} lifecycle order drift: no snippet contains ${check.order.join(
        " -> ",
      )}`,
    },
  ];
}

function checkQuickstart(): LifecycleParityFinding[] {
  const text = renderQuickstart();
  const findings: LifecycleParityFinding[] = [];

  for (const mode of ["direct", "branch_pr"] as const) {
    const drift = orderedMissingOrDrift(
      text,
      CODE_WORKFLOW_LIFECYCLE_CONTRACTS[mode].quickstartCommandOrder,
    );
    if (drift) {
      findings.push({
        code: "quickstart_lifecycle_order_drift",
        message: `${mode} quickstart lifecycle order drift: ${drift}`,
      });
    }
  }

  return findings;
}

async function checkForbiddenBranchPrDocs(root: string): Promise<LifecycleParityFinding[]> {
  const findings: LifecycleParityFinding[] = [];
  for (const check of BRANCH_PR_SURFACES) {
    const absolutePath = path.join(root, check.file);
    const text = await readFile(absolutePath, "utf8");
    for (const pattern of FORBIDDEN_BRANCH_PR_DOC_PATTERNS) {
      if (text.includes(pattern)) {
        findings.push({
          code: "branch_pr_manual_remote_step_drift",
          file: relativePath(root, absolutePath),
          message: `branch_pr docs contain obsolete manual remote step: ${pattern}`,
        });
      }
    }
  }
  return findings;
}

export async function collectLifecycleParityFindings(
  root = process.cwd(),
): Promise<LifecycleParityFinding[]> {
  const findings: LifecycleParityFinding[] = [
    ...checkBlueprintRoute(CODE_WORKFLOW_LIFECYCLE_CONTRACTS.direct),
    ...checkBlueprintRoute(CODE_WORKFLOW_LIFECYCLE_CONTRACTS.branch_pr),
    ...checkQuickstart(),
  ];

  for (const surface of [...DIRECT_SURFACES, ...BRANCH_PR_SURFACES]) {
    findings.push(...(await checkTextSurface(root, surface)));
  }
  findings.push(...(await checkForbiddenBranchPrDocs(root)));

  return findings;
}

export function formatLifecycleParityFindings(findings: readonly LifecycleParityFinding[]): string {
  if (findings.length === 0) return "workflow lifecycle parity OK";

  const lines = [
    "Workflow lifecycle parity violation: lifecycle contract, blueprints, quickstart, or docs drifted.",
    "",
  ];
  for (const finding of findings) {
    const location = finding.file ? `${finding.file}: ` : "";
    lines.push(`- ${location}${finding.code}: ${finding.message}`);
  }
  return lines.join("\n");
}
