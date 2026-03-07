import { describe, expect, it } from "vitest";

import { renderBootstrapDoc } from "./bootstrap-guide.js";
import { listRoles, renderQuickstart, renderRole } from "./command-guide.js";

const listRolesTyped = listRoles as () => string[];
const renderRoleTyped = renderRole as (role: string) => string | null;
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
  });

  it("returns null for missing or unknown roles", () => {
    expect(renderRoleTyped("")).toBeNull();
    expect(renderRoleTyped("unknown")).toBeNull();
  });

  it("renders the canonical bootstrap path in quickstart", () => {
    const text = renderQuickstartTyped();
    expect(text).toContain("Canonical bootstrap doc");
    expect(text).toContain("## 1. Preflight");
    expect(text).toContain("agentplane task start-ready");
  });

  it("renders the generated bootstrap doc", () => {
    const text = renderBootstrapDoc();
    expect(text).toContain('title: "Agent bootstrap"');
    expect(text).toContain("## 1. Preflight");
    expect(text).toContain("## Copy-paste start block");
  });
});
