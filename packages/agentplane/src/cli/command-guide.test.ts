import { describe, expect, it } from "vitest";

import { renderBootstrapDoc } from "./bootstrap-guide.js";
import {
  listRoles,
  renderQuickstart,
  renderQuickstartForMode,
  renderRole,
} from "./command-guide.js";

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
const renderQuickstartForModeTyped = renderQuickstartForMode as (
  mode?: "direct" | "branch_pr" | null,
) => string;

describe("command-guide", () => {
  it("lists known roles", () => {
    const roles = listRolesTyped();
    expect(roles).toContain("ORCHESTRATOR");
    expect(roles).toContain("CODER");
  });

  it("documents merge-preserving branch_pr integration by default", () => {
    const text = renderRoleTyped("integrator");
    expect(text).toContain("the supervisor owns the merge lane");
    expect(text).toContain("agentplane task advance <task-id> --agent-json");
    expect(text).toContain("agentplane task run <task-id>");
    expect(text).not.toContain("integrate queue");
  });

  it("renders role blocks case-insensitively", () => {
    const text = renderRoleTyped("coder");
    expect(text).toContain("### CODER");
    expect(text).toContain("CLI/runtime notes:");
    expect(text).toContain("agentplane task advance <task-id> --agent-json");
    expect(text).toContain("perform only the supplied semantic objective");
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
    expect(text).toContain("Workflow route notes:");
    expect(text).toContain("Agentplane reads the configured workflow mode");
    expect(text).toContain("## First visible payoff");
    expect(text).toContain("agentplane demo");
    expect(text).toContain("agentplane acr validate <task-id> --mode local");
    expect(text).toContain('agentplane task create "Inspect AgentPlane artifacts"');
    expect(text).toContain("agentplane task advance <task-id> --agent-json");
    expect(text).toContain("agentplane task run <task-id>");
    expect(text).toContain(".agentplane/tasks/<task-id>/");
    expect(text).toContain("acr.json");
    expect(text).toContain("## Go deeper");
    expect(text).toContain("agentplane task active");
    expect(text).toContain("agentplane task brief <task-id>");
    expect(text).toContain("agentplane task next-action <task-id> --explain");
    expect(text).toContain("supervisor prepares or selects the task worktree");
    expect(text).not.toContain("agentplane task start-ready");
    expect(text).not.toContain("agentplane work start");
    expect(text).not.toContain("agentplane verify");
    expect(text).not.toContain("agentplane finish");
    expect(text).not.toContain("agentplane integrate");
    expect(text).not.toContain("git commit");
    expect(text).not.toContain(
      "wait for hosted required checks with `bun run workflow:wait-remote-checks`",
    );
    expect(text).not.toContain("docs/user/agent-bootstrap.generated.mdx");
    expect(text).not.toContain("## Commit message format");
  });

  it("renders direct quickstart notes without branch_pr-only route guidance", () => {
    const text = renderQuickstartForModeTyped("direct");
    expect(text).toContain("Workflow route notes:");
    expect(text).toContain("`direct`: the supervisor keeps work in the current checkout");
    expect(text).not.toContain("`branch_pr`: the supervisor prepares");
  });

  it("renders branch_pr quickstart notes without direct-only route guidance", () => {
    const text = renderQuickstartForModeTyped("branch_pr");
    expect(text).toContain("Workflow route notes:");
    expect(text).toContain("`branch_pr`: the supervisor prepares or selects the task worktree");
    expect(text).not.toContain("`direct`: the supervisor keeps work in the current checkout");
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
    expect(text).toContain("agentplane task advance <task-id> --agent-json");
    expect(text).toContain("agentplane task run <task-id>");
    expect(text).toContain("state fingerprint");
    expect(text).toContain("authority boundary");
    expect(text).toContain("exchange.directory/exchange.result_ref");
    expect(text).toContain("exchange.return_invocation");
    expect(text).toContain("semantic_input_required");
    expect(text).toContain("Agentplane owns verification records and terminal state");
    expect(text).toContain("expanded diagnostic evidence");
    expect(text).not.toContain("agentplane verify");
    expect(text).not.toContain("agentplane finish");
  });

  it("keeps the planner role focused on semantic planning", () => {
    const text = renderRoleTyped("planner");
    expect(text).toContain("Return an executable semantic plan");
    expect(text).not.toContain("task plan set");
  });
});
