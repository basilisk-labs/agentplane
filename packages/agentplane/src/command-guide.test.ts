import { describe, expect, it } from "vitest";

import { listRoles, renderQuickstart, renderRole } from "./command-guide";

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

  it("includes the cheat sheet in the quickstart", () => {
    const text = renderQuickstartTyped();
    expect(text).toContain("## Agent cheat sheet");
    expect(text).toContain("Operation | Command");
  });
});
