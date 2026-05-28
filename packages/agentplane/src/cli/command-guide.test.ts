import { describe, expect, it } from "vitest";

import { renderBootstrapDoc } from "./bootstrap-guide.js";
import { listRoles, renderQuickstart, renderRole } from "./command-guide.js";

const listRolesTyped = listRoles as () => string[];
const renderRoleTyped = renderRole as (
  role: string,
  opts?: {
    profile?: {
      filename?: string;
      id?: string;
      role?: string;
      description?: string;
      inputs?: readonly string[];
      outputs?: readonly string[];
      permissions?: readonly string[];
      workflow?: readonly string[];
    } | null;
  },
) => string | null;
const renderQuickstartTyped = renderQuickstart as () => string;

describe("command-guide", () => {
  it("lists known roles", () => {
    const roles = listRolesTyped();
    expect(roles).toContain("ORCHESTRATOR");
    expect(roles).toContain("CODER");
  });

  it("documents merge-preserving branch_pr integration by default", () => {
    const text = renderRoleTyped("integrator");
    expect(text).toContain("Route oracle contract:");
    expect(text).toContain("run it from `authoritative_checkout`");
    expect(text).toContain(
      "agentplane integrate queue run-next --run-verify --drain --wait --poll-interval-ms 30000 --timeout-ms 600000",
    );
    expect(text).toContain("primary integration route is the task GitHub PR");
    expect(text).toContain("gh pr merge --auto --rebase");
    expect(text).not.toContain("--merge-strategy squash --run-verify");
  });

  it("renders role blocks case-insensitively", () => {
    const text = renderRoleTyped("coder");
    expect(text).toContain("### CODER");
    expect(text).toContain("CLI/runtime notes:");
    expect(text).toContain("agentplane task next-action <task-id> --explain");
    expect(text).toContain("primary_blocker");
  });

  it("returns null for missing or unknown roles", () => {
    expect(renderRoleTyped("")).toBeNull();
    expect(renderRoleTyped("unknown")).toBeNull();
  });

  it("renders installed profile content and CLI/runtime supplements together", () => {
    const text = renderRoleTyped("coder", {
      profile: {
        filename: "CODER.json",
        id: "CODER",
        role: "Implement approved task scope with the smallest coherent diff.",
        description: "Task-scoped implementation role.",
        inputs: ["Task id"],
        outputs: ["Scoped code changes"],
      },
    });
    expect(text).toContain("Role: Implement approved task scope with the smallest coherent diff.");
    expect(text).toContain("Inputs:");
    expect(text).toContain("CLI/runtime notes:");
    expect(text).toContain("Source: .agentplane/agents/CODER.json");
  });

  it("renders the canonical bootstrap path in quickstart", () => {
    const text = renderQuickstartTyped();
    expect(text).toContain("Canonical installed startup surface");
    expect(text).toContain("## First screen");
    expect(text).toContain("## First visible payoff");
    expect(text).toContain("agentplane demo");
    expect(text).toContain("agentplane acr validate <task-id> --mode local");
    expect(text).toContain('agentplane task begin "Inspect AgentPlane artifacts"');
    expect(text).toContain("agentplane task complete <task-id>");
    expect(text).toContain(".agentplane/tasks/<task-id>/");
    expect(text).toContain("acr.json");
    expect(text).toContain("## Go deeper");
    expect(text).toContain("activate ORCHESTRATOR for planning and the task owner role");
    expect(text).toContain("agentplane task active");
    expect(text).toContain("agentplane task brief <task-id>");
    expect(text).toContain("agentplane task next-action <task-id> --explain");
    expect(text).toContain("authoritative_checkout");
    expect(text).toContain("primary_blocker");
    expect(text).toContain("git status --short --untracked-files=no");
    expect(text).toContain("\ngit status --short\n");
    expect(text).toContain("source confidence");
    expect(text).toContain("agentplane task start-ready");
    expect(text).toContain("agentplane pr check <task-id>");
    expect(text).toContain("GitHub CLI");
    expect(text).toContain("GH_TOKEN");
    expect(text).toContain("Framework maintainers may use repo-local helper scripts");
    expect(text).toContain("workflow:wait-remote-checks");
    expect(text).not.toContain(
      "wait for hosted required checks with `bun run workflow:wait-remote-checks`",
    );
    expect(text).not.toContain("docs/user/agent-bootstrap.generated.mdx");
    expect(text).not.toContain("## Commit message format");
  });

  it("renders the generated bootstrap doc", () => {
    const text = renderBootstrapDoc();
    expect(text).toContain('title: "Agent bootstrap"');
    expect(text).toContain("## 1. Preflight");
    expect(text).toContain("## 2. Agent context");
    expect(text).toContain("## Copy-paste start block");
    expect(text).toContain("## 4. Verification and incident reuse");
    expect(text).toContain("agentplane task active");
    expect(text).toContain("agentplane task brief <task-id>");
    expect(text).toContain("task next-action <task-id> --explain");
    expect(text).toContain("next_command");
    expect(text).toContain("authoritative_checkout");
    expect(text).toContain("tracked-only cleanliness");
    expect(text).toContain("git status --short --untracked-files=no");
    expect(text).toContain("\n- `git status --short`\n");
    expect(text).toContain("source confidence labels");
    expect(text).toContain("Use `agentplane role ORCHESTRATOR` during planning");
    expect(text).toContain("agentplane incidents advise <task-id>");
    expect(text).toContain("agentplane incidents collect <task-id> --check");
    expect(text).toContain(
      "add `--promote --external` or `--repo-fixable` only for real reusable incidents",
    );
    expect(text).toContain("Plain prose in `Findings` stays task-local");
    expect(text).toContain("configured CI/provider gate");
    expect(text).toContain("workflow:wait-remote-checks");
    expect(text).not.toContain(
      "wait for hosted required checks with `bun run workflow:wait-remote-checks`",
    );
  });

  it("updates the planner role guidance to the explicit findings promotion flow", () => {
    const text = renderRoleTyped("planner");
    expect(text).toContain(
      "add `--promote --external` or `--repo-fixable` only for real reusable incidents",
    );
  });
});
