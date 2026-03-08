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

  it("renders role blocks case-insensitively", () => {
    const text = renderRoleTyped("coder");
    expect(text).toContain("### CODER");
    expect(text).toContain("CLI/runtime notes:");
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
    expect(text).toContain("## Go deeper");
    expect(text).toContain("agentplane task start-ready");
    expect(text).not.toContain("docs/user/agent-bootstrap.generated.mdx");
    expect(text).not.toContain("## Commit message format");
  });

  it("renders the generated bootstrap doc", () => {
    const text = renderBootstrapDoc();
    expect(text).toContain('title: "Agent bootstrap"');
    expect(text).toContain("## 1. Preflight");
    expect(text).toContain("## Copy-paste start block");
  });
});
