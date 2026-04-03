import { describe, expect, it } from "vitest";

import { resolvePolicyActionDescriptor } from "./taxonomy.js";

describe("policy/taxonomy", () => {
  it("classifies task lifecycle actions as mutating task policy surfaces", () => {
    expect(resolvePolicyActionDescriptor("task_start")).toMatchObject({
      id: "task_start",
      family: "task",
      mutates_state: true,
      risky: false,
      approval: null,
      enforcement: "none",
      source: "builtin",
    });
  });

  it("classifies recipe and backend remote actions as approval-gated network policy surfaces", () => {
    expect(resolvePolicyActionDescriptor("recipe_install")).toMatchObject({
      family: "recipe",
      risky: true,
      approval: "network_access",
      enforcement: "approval_only",
    });
    expect(resolvePolicyActionDescriptor("backend_sync")).toMatchObject({
      family: "backend",
      risky: true,
      approval: "network_access",
      enforcement: "approval_only",
    });
  });

  it("classifies runner actions separately from task mutations", () => {
    expect(resolvePolicyActionDescriptor("task_run")).toMatchObject({
      family: "runner",
      mutates_state: true,
      risky: true,
    });
    expect(resolvePolicyActionDescriptor("scenario_execute")).toMatchObject({
      family: "runner",
      mutates_state: true,
      risky: true,
    });
  });

  it("falls back to a custom descriptor for unknown actions", () => {
    expect(resolvePolicyActionDescriptor("custom_action")).toMatchObject({
      id: "custom_action",
      family: "custom",
      mutates_state: false,
      risky: false,
      approval: null,
      source: "custom",
    });
  });
});
