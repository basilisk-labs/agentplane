import { describe, expect, it, vi } from "vitest";
import * as clack from "@clack/prompts";

import { InitAborted } from "../prompts.js";

import { promptAdvancedSettingsStep } from "./advanced-settings.js";
import { promptBackendStep } from "./backend.js";
import { promptBlueprintSelectionStep } from "./blueprint-selection.js";
import { promptIdeStep } from "./ide.js";
import { promptPolicyGatewayStep } from "./policy-gateway.js";
import { promptRecipeSelectionStep } from "./recipe-selection.js";
import { promptSetupProfileStep } from "./setup-profile.js";
import { promptWorkflowStep } from "./workflow.js";
import type { InitPromptClack } from "./contracts.js";

const mocks = vi.hoisted(() => {
  const cancelSymbol = Symbol("cancel");
  return {
    cancelSymbol,
    cancelMock: vi.fn(),
    confirmMock: vi.fn(),
    isCancelMock: vi.fn((value: unknown) => value === cancelSymbol),
    selectMock: vi.fn(),
    textMock: vi.fn(),
  };
});

vi.mock("@clack/prompts", () => ({
  cancel: mocks.cancelMock,
  confirm: mocks.confirmMock,
  isCancel: mocks.isCancelMock,
  select: mocks.selectMock,
  text: mocks.textMock,
}));

function clackMock(): InitPromptClack {
  return clack as InitPromptClack;
}

function resetPromptMocks(): void {
  mocks.cancelMock.mockReset();
  mocks.confirmMock.mockReset();
  mocks.isCancelMock.mockClear();
  mocks.selectMock.mockReset();
  mocks.textMock.mockReset();
}

describe("init prompt steps", () => {
  it("collects the happy path for full-harness interactive setup", async () => {
    resetPromptMocks();
    mocks.selectMock
      .mockResolvedValueOnce("full-harness")
      .mockResolvedValueOnce("claude")
      .mockResolvedValueOnce("cursor")
      .mockResolvedValueOnce("branch_pr")
      .mockResolvedValueOnce("redmine")
      .mockResolvedValueOnce("aggressive");
    mocks.confirmMock
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false);
    mocks.textMock
      .mockResolvedValueOnce("recipe-a, recipe-b")
      .mockResolvedValueOnce("pack:enterprise-baseline");
    const prompt = clackMock();

    const setup = await promptSetupProfileStep({ clack: prompt, flags: {} });
    const policy = await promptPolicyGatewayStep({ clack: prompt, flags: {} });
    const ide = await promptIdeStep({ clack: prompt, flags: {} });
    const workflow = await promptWorkflowStep({
      clack: prompt,
      flags: {},
      setupProfileMode: setup.setupProfileMode,
    });
    const backend = await promptBackendStep({ clack: prompt, flags: {} });
    const advanced = await promptAdvancedSettingsStep({
      clack: prompt,
      flags: {},
      setupProfilePreset: setup.setupProfilePreset,
      setupProfileMode: setup.setupProfileMode,
    });
    const recipes = await promptRecipeSelectionStep({
      clack: prompt,
      flags: {},
      setupProfilePreset: setup.setupProfilePreset,
      setupProfileMode: setup.setupProfileMode,
      cachedRecipes: ["recipe-a", "recipe-b"],
    });
    const blueprints = await promptBlueprintSelectionStep({
      clack: prompt,
      flags: {},
      setupProfilePreset: setup.setupProfilePreset,
      setupProfileMode: setup.setupProfileMode,
      cachedBlueprints: ["blueprint:analysis-external", "pack:enterprise-baseline"],
    });

    expect(setup).toEqual({ setupProfilePreset: "full-harness", setupProfileMode: "full" });
    expect(policy).toEqual({ policyGateway: "claude" });
    expect(ide).toEqual({ ide: "cursor" });
    expect(workflow).toEqual({
      workflow: "branch_pr",
      directCloseDirtyPolicy: "allow_other_task_readmes",
    });
    expect(backend).toEqual({ backend: "redmine" });
    expect(advanced).toEqual({
      hooks: true,
      requirePlanApproval: true,
      requireNetworkApproval: true,
      requireVerifyApproval: true,
      feedbackGithubIssues: true,
      feedbackAnonymousCloud: false,
      executionProfile: "aggressive",
      strictUnsafeConfirm: false,
    });
    expect(recipes).toEqual({ recipes: ["recipe-a", "recipe-b"] });
    expect(blueprints).toEqual({ blueprints: ["pack:enterprise-baseline"] });
  });

  it("skips prompts when flags or compact profile defaults already answer a step", async () => {
    resetPromptMocks();
    const prompt = clackMock();

    await expect(
      promptSetupProfileStep({ clack: prompt, flags: { setupProfile: "light" } }),
    ).resolves.toEqual({ setupProfilePreset: "light", setupProfileMode: "compact" });
    await expect(
      promptPolicyGatewayStep({ clack: prompt, flags: { policyGateway: "claude" } }),
    ).resolves.toEqual({ policyGateway: "claude" });
    await expect(promptIdeStep({ clack: prompt, flags: { ide: "windsurf" } })).resolves.toEqual({
      ide: "windsurf",
    });
    await expect(
      promptWorkflowStep({
        clack: prompt,
        flags: {},
        setupProfileMode: "compact",
      }),
    ).resolves.toEqual({
      workflow: "direct",
      directCloseDirtyPolicy: "allow_other_task_readmes",
    });
    await expect(
      promptBackendStep({ clack: prompt, flags: { backend: "redmine" } }),
    ).resolves.toEqual({ backend: "redmine" });
    await expect(
      promptAdvancedSettingsStep({
        clack: prompt,
        flags: {},
        setupProfilePreset: "light",
        setupProfileMode: "compact",
      }),
    ).resolves.toEqual({
      hooks: false,
      requirePlanApproval: false,
      requireNetworkApproval: false,
      requireVerifyApproval: false,
      feedbackGithubIssues: false,
      feedbackAnonymousCloud: false,
      executionProfile: "aggressive",
      strictUnsafeConfirm: false,
    });
    await expect(
      promptRecipeSelectionStep({
        clack: prompt,
        flags: {},
        setupProfilePreset: "light",
        setupProfileMode: "compact",
        cachedRecipes: ["recipe-a"],
      }),
    ).resolves.toEqual({ recipes: [] });
    await expect(
      promptBlueprintSelectionStep({
        clack: prompt,
        flags: {},
        setupProfilePreset: "light",
        setupProfileMode: "compact",
        cachedBlueprints: ["pack:baseline"],
      }),
    ).resolves.toEqual({ blueprints: [] });

    expect(mocks.selectMock).not.toHaveBeenCalled();
    expect(mocks.confirmMock).not.toHaveBeenCalled();
    expect(mocks.textMock).not.toHaveBeenCalled();
  });

  it("prompts direct close policy only for full direct workflow", async () => {
    resetPromptMocks();
    mocks.selectMock.mockResolvedValueOnce("direct").mockResolvedValueOnce("strict");

    await expect(
      promptWorkflowStep({
        clack: clackMock(),
        flags: {},
        setupProfileMode: "full",
      }),
    ).resolves.toEqual({ workflow: "direct", directCloseDirtyPolicy: "strict" });
  });

  it("skips recipe prompt when full setup has no cached recipes", async () => {
    resetPromptMocks();

    await expect(
      promptRecipeSelectionStep({
        clack: clackMock(),
        flags: {},
        setupProfilePreset: "full-harness",
        setupProfileMode: "full",
        cachedRecipes: [],
      }),
    ).resolves.toEqual({ recipes: [] });
    expect(mocks.textMock).not.toHaveBeenCalled();
  });

  it("skips blueprint prompt when full setup has no cached blueprint catalog entries", async () => {
    resetPromptMocks();

    await expect(
      promptBlueprintSelectionStep({
        clack: clackMock(),
        flags: {},
        setupProfilePreset: "full-harness",
        setupProfileMode: "full",
        cachedBlueprints: [],
      }),
    ).resolves.toEqual({ blueprints: [] });
    expect(mocks.textMock).not.toHaveBeenCalled();
  });

  it("accepts undefined validation input for cached recipe selection", async () => {
    resetPromptMocks();
    mocks.textMock.mockImplementationOnce(
      (opts?: { validate?: (value: string) => string | void }) => {
        expect(opts?.validate?.(undefined as never)).toBeUndefined();
        return "recipe-a";
      },
    );

    await expect(
      promptRecipeSelectionStep({
        clack: clackMock(),
        flags: {},
        setupProfilePreset: "full-harness",
        setupProfileMode: "full",
        cachedRecipes: ["recipe-a", "recipe-b"],
      }),
    ).resolves.toEqual({ recipes: ["recipe-a"] });
  });

  it("propagates cancellation through InitAborted", async () => {
    resetPromptMocks();
    mocks.selectMock.mockResolvedValueOnce(mocks.cancelSymbol);

    await expect(promptBackendStep({ clack: clackMock(), flags: {} })).rejects.toBeInstanceOf(
      InitAborted,
    );
    expect(mocks.cancelMock).toHaveBeenCalledWith("Task backend selection cancelled.");
  });
});
