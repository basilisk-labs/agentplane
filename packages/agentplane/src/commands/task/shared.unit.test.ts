import { defaultConfig, type AgentplaneConfig } from "@agentplaneorg/core";
import { describe, expect, it, vi } from "vitest";

import type { TaskData, TaskEvent } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import {
  VERIFY_STEPS_PLACEHOLDER,
  appendTaskEvent,
  buildDependencyState,
  defaultCommitEmojiForStatus,
  enforceStatusCommitPolicy,
  ensurePlanApprovedIfRequired,
  ensureVerificationSatisfiedIfRequired,
  extractDocSection,
  formatTaskLine,
  isMajorStatusCommitTransition,
  isTransitionAllowed,
  isVerifyStepsFilled,
  normalizeDependsOnInput,
  normalizeTaskStatus,
  parseTaskListFilters,
  resolvePrimaryTag,
  requireStructuredComment,
  requiresVerify,
  taskTextBlob,
  toStringArray,
} from "./shared.js";

function mkTask(overrides: Partial<TaskData>): TaskData {
  return {
    id: "T-1",
    title: "Title",
    description: "Desc",
    status: "TODO",
    priority: "normal",
    owner: "me",
    depends_on: [],
    tags: [],
    verify: [],
    ...overrides,
  };
}

function mkConfig(): AgentplaneConfig {
  // Always start from a schema-valid config to avoid test brittle-ness.
  return defaultConfig();
}

describe("task shared helpers", () => {
  it("extractDocSection returns null when section missing and extracts until next heading when present", () => {
    const doc = ["## Summary", "S", "", "## Context", "C"].join("\n");
    expect(extractDocSection(doc, "Risks")).toBeNull();
    expect(extractDocSection(doc, "Summary")).toBe("S");
    expect(extractDocSection(doc, "Context")).toBe("C");
  });

  it("isVerifyStepsFilled rejects empty/placeholder and accepts real text", () => {
    expect(isVerifyStepsFilled(null)).toBe(false);
    expect(isVerifyStepsFilled("")).toBe(false);
    expect(isVerifyStepsFilled(`x\n${VERIFY_STEPS_PLACEHOLDER}\n`)).toBe(false);
    expect(isVerifyStepsFilled("Run: bun test")).toBe(true);
  });

  it("normalizeDependsOnInput parses single token and treats empty/[] as none", () => {
    expect(normalizeDependsOnInput("")).toEqual([]);
    expect(normalizeDependsOnInput("  []  ")).toEqual([]);
    expect(normalizeDependsOnInput("T-1")).toEqual(["T-1"]);
  });

  it("normalizeTaskStatus enforces allowed statuses", () => {
    expect(normalizeTaskStatus("todo")).toBe("TODO");
    expect(normalizeTaskStatus(" Doing ")).toBe("DOING");
    expect(() => normalizeTaskStatus("nope")).toThrow(CliError);
  });

  it("toStringArray returns trimmed strings and drops non-strings", () => {
    expect(toStringArray("x")).toEqual([]);
    expect(toStringArray([" a ", 1, null, "b"])).toEqual(["a", "b"]);
  });

  it("requiresVerify matches required tags case-insensitively and handles empty requirements", () => {
    expect(requiresVerify(["code"], [])).toBe(false);
    expect(requiresVerify(["  CoDe "], ["backend", "code"])).toBe(true);
    expect(requiresVerify(["docs"], ["code"])).toBe(false);
  });

  it("resolvePrimaryTag selects exactly one primary and supports fallback mode", () => {
    const cfg = mkConfig();
    const ctx = { config: cfg } as unknown as Parameters<typeof resolvePrimaryTag>[1];

    expect(resolvePrimaryTag(["code", "backend"], ctx)).toEqual({
      primary: "code",
      matched: ["code"],
      usedFallback: false,
    });

    expect(resolvePrimaryTag(["backend", "etl"], ctx)).toEqual({
      primary: "meta",
      matched: [],
      usedFallback: true,
    });
  });

  it("resolvePrimaryTag rejects missing primary in strict mode and multi-primary tags", () => {
    const cfg = mkConfig();
    (
      (cfg.tasks as unknown as Record<string, unknown>).tags as Record<string, unknown>
    ).strict_primary = true;
    const strictCtx = { config: cfg } as unknown as Parameters<typeof resolvePrimaryTag>[1];
    expect(() => resolvePrimaryTag(["backend"], strictCtx)).toThrow(CliError);

    const relaxed = mkConfig();
    const relaxedCtx = { config: relaxed } as unknown as Parameters<typeof resolvePrimaryTag>[1];
    expect(() => resolvePrimaryTag(["code", "docs"], relaxedCtx)).toThrow(CliError);
  });

  it("appendTaskEvent filters invalid events and appends new event", () => {
    const task = mkTask({
      events: [
        null as unknown as TaskEvent,
        { type: "status" } as unknown as TaskEvent,
        { type: "status", at: "2026-02-09T00:00:00Z", author: "A" },
      ],
    });
    const appended = appendTaskEvent(task, {
      type: "verify",
      at: "2026-02-09T01:00:00Z",
      author: "B",
    });
    expect(appended.map((e) => e.type)).toEqual(["status", "verify"]);
  });

  it("ensurePlanApprovedIfRequired and ensureVerificationSatisfiedIfRequired enforce config gates", () => {
    const base = mkTask({});

    const planOff = mkConfig();
    planOff.agents = {
      approvals: { require_plan: false, require_network: true, require_verify: false },
    };
    expect(() => ensurePlanApprovedIfRequired(base, planOff)).not.toThrow();

    const verifyOff = mkConfig();
    verifyOff.agents = {
      approvals: { require_plan: false, require_network: true, require_verify: false },
    };
    expect(() => ensureVerificationSatisfiedIfRequired(base, verifyOff)).not.toThrow();

    const planOn = mkConfig();
    planOn.agents = {
      approvals: { require_plan: true, require_network: true, require_verify: false },
    };
    expect(() =>
      ensurePlanApprovedIfRequired(
        mkTask({
          plan_approval: { state: "approved", updated_at: null, updated_by: null, note: null },
        }),
        planOn,
      ),
    ).not.toThrow();
    expect(() => ensurePlanApprovedIfRequired(base, planOn)).toThrow(CliError);

    const verifyOn = mkConfig();
    verifyOn.agents = {
      approvals: { require_plan: false, require_network: true, require_verify: true },
    };
    expect(() =>
      ensureVerificationSatisfiedIfRequired(
        mkTask({ verification: { state: "ok", updated_at: null, updated_by: null, note: null } }),
        verifyOn,
      ),
    ).not.toThrow();
    expect(() =>
      ensureVerificationSatisfiedIfRequired({ ...base, tags: ["code"] }, verifyOn),
    ).toThrow(CliError);
  });

  it("buildDependencyState computes missing and incomplete deps", () => {
    const a = mkTask({ id: "A", depends_on: ["B", "C"] });
    const b = mkTask({ id: "B", status: "DONE" });
    const state = buildDependencyState([a, b]);
    expect(state.get("A")).toEqual({ dependsOn: ["B", "C"], missing: ["C"], incomplete: [] });
  });

  it("formatTaskLine includes optional extras (owner/prio/deps/tags/verify) and defaults title", () => {
    const dep = { dependsOn: ["X"], missing: [], incomplete: [] };
    const line = formatTaskLine(
      mkTask({
        title: "",
        status: "doing",
        owner: "me",
        priority: "high",
        tags: ["a", "a"],
        verify: ["x", "y"],
      }),
      dep,
    );
    expect(line).toContain("T-1 [DOING]");
    expect(line).toContain("(untitled task)");
    expect(line).toContain("owner=me");
    expect(line).toContain("prio=high");
    expect(line).toContain("deps=ready");
    expect(line).toContain("tags=a");
    expect(line).toContain("verify=2");
  });

  it("isTransitionAllowed encodes allowed lifecycle transitions", () => {
    expect(isTransitionAllowed("TODO", "TODO")).toBe(true);
    expect(isTransitionAllowed("TODO", "DOING")).toBe(true);
    expect(isTransitionAllowed("TODO", "DONE")).toBe(false);
    expect(isTransitionAllowed("DOING", "DONE")).toBe(true);
    expect(isTransitionAllowed("DOING", "TODO")).toBe(false);
    expect(isTransitionAllowed("BLOCKED", "TODO")).toBe(true);
    expect(isTransitionAllowed("DONE", "DOING")).toBe(false);
    expect(isTransitionAllowed("???", "TODO")).toBe(false);
  });

  it("requireStructuredComment enforces prefix and minimum length", () => {
    expect(() => requireStructuredComment("nope", "Start:", 10)).toThrow(CliError);
    expect(() => requireStructuredComment("Start: x", "Start:", 20)).toThrow(CliError);
    expect(() =>
      requireStructuredComment("Start: this is long enough", "Start:", 10),
    ).not.toThrow();
  });

  it("enforceStatusCommitPolicy supports off/warn/confirm for major transitions", () => {
    const stderrSpy = vi.spyOn(process.stderr, "write").mockImplementation(() => true);

    expect(() =>
      enforceStatusCommitPolicy({
        policy: "off",
        action: "start",
        confirmed: false,
        quiet: false,
        statusFrom: "TODO",
        statusTo: "DOING",
      }),
    ).not.toThrow();

    // warn: prints only when not quiet and not confirmed
    enforceStatusCommitPolicy({
      policy: "warn",
      action: "start",
      confirmed: false,
      quiet: true,
      statusFrom: "TODO",
      statusTo: "DOING",
    });
    expect(stderrSpy).not.toHaveBeenCalled();
    enforceStatusCommitPolicy({
      policy: "warn",
      action: "start",
      confirmed: true,
      quiet: false,
      statusFrom: "TODO",
      statusTo: "DOING",
    });
    expect(stderrSpy).not.toHaveBeenCalled();
    enforceStatusCommitPolicy({
      policy: "warn",
      action: "start",
      confirmed: false,
      quiet: false,
      statusFrom: "TODO",
      statusTo: "DOING",
    });
    expect(stderrSpy).toHaveBeenCalled();

    expect(() =>
      enforceStatusCommitPolicy({
        policy: "confirm",
        action: "finish",
        confirmed: false,
        quiet: false,
        statusFrom: "DOING",
        statusTo: "DONE",
      }),
    ).toThrow(CliError);
    expect(() =>
      enforceStatusCommitPolicy({
        policy: "confirm",
        action: "finish",
        confirmed: true,
        quiet: false,
        statusFrom: "DOING",
        statusTo: "DONE",
      }),
    ).not.toThrow();

    stderrSpy.mockRestore();
  });

  it("enforceStatusCommitPolicy rejects non-major transitions", () => {
    expect(() =>
      enforceStatusCommitPolicy({
        policy: "warn",
        action: "task set-status",
        confirmed: true,
        quiet: true,
        statusFrom: "TODO",
        statusTo: "BLOCKED",
      }),
    ).toThrow(CliError);
  });

  it("isMajorStatusCommitTransition maps allowed transitions", () => {
    expect(isMajorStatusCommitTransition("todo", "doing")).toBe(true);
    expect(isMajorStatusCommitTransition("doing", "blocked")).toBe(true);
    expect(isMajorStatusCommitTransition("blocked", "doing")).toBe(true);
    expect(isMajorStatusCommitTransition("doing", "done")).toBe(true);
    expect(isMajorStatusCommitTransition("done", "verified")).toBe(false);
    expect(isMajorStatusCommitTransition("todo", "blocked")).toBe(false);
  });

  it("defaultCommitEmojiForStatus maps known statuses", () => {
    expect(defaultCommitEmojiForStatus("doing")).toBe("🚧");
    expect(defaultCommitEmojiForStatus("done")).toBe("✅");
    expect(defaultCommitEmojiForStatus("blocked")).toBe("⛔");
    expect(defaultCommitEmojiForStatus("todo")).toBe("🧩");
  });

  it("parseTaskListFilters parses flags and rejects invalid inputs", () => {
    expect(
      parseTaskListFilters(["--quiet", "--status", "TODO", "--owner", "me", "--tag", "x"]),
    ).toEqual({
      status: ["TODO"],
      owner: ["me"],
      tag: ["x"],
      quiet: true,
    });

    expect(() => parseTaskListFilters(["--status"])).toThrow(CliError);
    expect(() => parseTaskListFilters(["--owner"])).toThrow(CliError);
    expect(() => parseTaskListFilters(["--tag"])).toThrow(CliError);
    expect(() => parseTaskListFilters(["--limit", "10"], { allowLimit: false })).toThrow(CliError);
    expect(() => parseTaskListFilters(["--limit"], { allowLimit: true })).toThrow(CliError);
    expect(() => parseTaskListFilters(["--limit", "NaN"], { allowLimit: true })).toThrow(CliError);
    expect(parseTaskListFilters(["--limit", "5"], { allowLimit: true }).limit).toBe(5);
    expect(() => parseTaskListFilters(["--nope"])).toThrow(CliError);
  });

  it("taskTextBlob concatenates key fields, tags, comments, and commit metadata", () => {
    const blob = taskTextBlob(
      mkTask({
        id: "T-1",
        title: "Title",
        description: "Desc",
        status: "TODO",
        priority: "high",
        owner: "me",
        tags: ["a", " ", "b"],
        comments: [{ author: "A", body: "Hi" }],
        commit: { hash: "abc", message: "msg" },
      }),
    );
    expect(blob).toContain("T-1");
    expect(blob).toContain("Title");
    expect(blob).toContain("a");
    expect(blob).toContain("b");
    expect(blob).toContain("A");
    expect(blob).toContain("Hi");
    expect(blob).toContain("abc");
    expect(blob).toContain("msg");
  });
});
