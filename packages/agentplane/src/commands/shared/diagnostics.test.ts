import { describe, expect, it } from "vitest";

import {
  readDiagnosticContext,
  renderDiagnosticFinding,
  withDiagnosticContext,
} from "./diagnostics.js";

describe("diagnostics", () => {
  it("round-trips structured diagnostic context", () => {
    const context = withDiagnosticContext(
      { command: "release apply" },
      {
        state: "release tag already exists locally",
        likelyCause: "a previous release attempt already created the target tag",
        hint: "Inspect the existing tag before bumping again.",
        nextAction: {
          command: "git show --stat --oneline v0.3.2",
          reason: "inspect the existing release tag before deciding whether to reuse or replace it",
          reasonCode: "release_tag_exists",
        },
      },
    );

    expect(readDiagnosticContext(context)).toEqual({
      state: "release tag already exists locally",
      likelyCause: "a previous release attempt already created the target tag",
      hint: "Inspect the existing tag before bumping again.",
      nextAction: {
        command: "git show --stat --oneline v0.3.2",
        reason: "inspect the existing release tag before deciding whether to reuse or replace it",
        reasonCode: "release_tag_exists",
      },
    });
  });

  it("renders doctor-style findings in state/cause/action form", () => {
    expect(
      renderDiagnosticFinding({
        severity: "ERROR",
        state: "framework-managed policy tree is incomplete",
        likelyCause: "the gateway file was updated without applying the matching framework files",
        nextAction: {
          command: "agentplane upgrade --yes",
          reason: "reinstall the managed policy tree from the active framework bundle",
        },
        details: ["Missing files: .agentplane/policy/workflow.upgrade.md"],
      }),
    ).toContain("Next action: agentplane upgrade --yes");
  });
});
