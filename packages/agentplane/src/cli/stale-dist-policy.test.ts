import { describe, expect, it } from "vitest";

import { classifyStaleDistPolicy } from "../../bin/stale-dist-policy.js";

describe("stale-dist command policy", () => {
  it("allows doctor as a warning-only diagnostic command", () => {
    expect(classifyStaleDistPolicy(["node", "agentplane", "doctor"])).toEqual({
      mode: "warn_and_run",
      reason: "read_only_diagnostic",
    });
  });

  it("allows runtime explain and its flags as a warning-only diagnostic command", () => {
    expect(classifyStaleDistPolicy(["node", "agentplane", "runtime", "explain", "--json"])).toEqual(
      {
        mode: "warn_and_run",
        reason: "read_only_diagnostic",
      },
    );
  });

  it("allows safe inspection commands needed during framework development", () => {
    expect(classifyStaleDistPolicy(["node", "agentplane", "task", "list"])).toEqual({
      mode: "warn_and_run",
      reason: "read_only_diagnostic",
    });
    expect(
      classifyStaleDistPolicy(["node", "agentplane", "task", "show", "20260307-ABC123"]),
    ).toEqual({
      mode: "warn_and_run",
      reason: "read_only_diagnostic",
    });
    expect(
      classifyStaleDistPolicy(["node", "agentplane", "task", "doc", "show", "20260307-ABC123"]),
    ).toEqual({
      mode: "warn_and_run",
      reason: "read_only_diagnostic",
    });
    expect(classifyStaleDistPolicy(["node", "agentplane", "task", "next"])).toEqual({
      mode: "warn_and_run",
      reason: "read_only_diagnostic",
    });
    expect(classifyStaleDistPolicy(["node", "agentplane", "task", "search", "cli"])).toEqual({
      mode: "warn_and_run",
      reason: "read_only_diagnostic",
    });
    expect(classifyStaleDistPolicy(["node", "agentplane", "ready", "20260307-ABC123"])).toEqual({
      mode: "warn_and_run",
      reason: "read_only_diagnostic",
    });
    expect(classifyStaleDistPolicy(["node", "agentplane", "config", "show"])).toEqual({
      mode: "warn_and_run",
      reason: "read_only_diagnostic",
    });
    expect(classifyStaleDistPolicy(["node", "agentplane", "quickstart"])).toEqual({
      mode: "warn_and_run",
      reason: "read_only_diagnostic",
    });
    expect(classifyStaleDistPolicy(["node", "agentplane", "preflight", "--mode", "quick"])).toEqual(
      {
        mode: "warn_and_run",
        reason: "read_only_diagnostic",
      },
    );
    expect(classifyStaleDistPolicy(["node", "agentplane", "--version"])).toEqual({
      mode: "warn_and_run",
      reason: "read_only_diagnostic",
    });
  });

  it("keeps mutating commands strict", () => {
    expect(classifyStaleDistPolicy(["node", "agentplane", "verify", "20260307-ABC123"])).toEqual({
      mode: "warn_and_run",
      reason: "task_artifact_mutation",
    });
    expect(
      classifyStaleDistPolicy(["node", "agentplane", "task", "plan", "set", "20260307-ABC123"]),
    ).toEqual({
      mode: "warn_and_run",
      reason: "task_artifact_mutation",
    });
    expect(
      classifyStaleDistPolicy(["node", "agentplane", "task", "doc", "set", "20260307-ABC123"]),
    ).toEqual({
      mode: "warn_and_run",
      reason: "task_artifact_mutation",
    });
    expect(
      classifyStaleDistPolicy(["node", "agentplane", "task", "start-ready", "20260307-ABC123"]),
    ).toEqual({
      mode: "warn_and_run",
      reason: "task_artifact_mutation",
    });
    expect(
      classifyStaleDistPolicy(["node", "agentplane", "task", "verify", "ok", "20260307-ABC123"]),
    ).toEqual({
      mode: "warn_and_run",
      reason: "task_artifact_mutation",
    });
  });

  it("keeps risky mutating commands strict", () => {
    expect(classifyStaleDistPolicy(["node", "agentplane", "finish", "20260307-ABC123"])).toEqual({
      mode: "strict",
      reason: "default",
    });
    expect(classifyStaleDistPolicy(["node", "agentplane", "task", "doc", "set"])).toEqual({
      mode: "warn_and_run",
      reason: "task_artifact_mutation",
    });
    expect(
      classifyStaleDistPolicy(["node", "agentplane", "work", "start", "20260307-ABC123"]),
    ).toEqual({
      mode: "strict",
      reason: "default",
    });
  });
});
