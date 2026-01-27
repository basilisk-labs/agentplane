import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplane/core";

import {
  formatCommentBodyForCommit,
  normalizeCommentBodyForCommit,
  splitSummaryAndDetails,
} from "./comment-format.js";

describe("comment-format", () => {
  const config = defaultConfig();

  it("normalizes comment bodies", () => {
    const body = "Start: line one\n\nline two";
    expect(normalizeCommentBodyForCommit(body)).toBe("Start: line one | line two");
  });

  it("formats empty comments as empty strings", () => {
    expect(formatCommentBodyForCommit("", config)).toBe("");
  });

  it("formats comments with | details", () => {
    const body = "Start: summary | detail";
    expect(formatCommentBodyForCommit(body, config)).toBe("start: summary | details: detail");
  });

  it("formats comments with semicolon details", () => {
    const body = "Start: summary; detail one; detail two";
    expect(formatCommentBodyForCommit(body, config)).toBe(
      "start: summary | details: detail one; detail two",
    );
  });

  it("formats comments with -- separators", () => {
    const body = "Start: summary -- detail";
    expect(formatCommentBodyForCommit(body, config)).toBe("start: summary | details: detail");
  });

  it("formats comments with dash separators", () => {
    const body = "Start: summary - detail";
    expect(formatCommentBodyForCommit(body, config)).toBe("start: summary | details: detail");
  });

  it("formats comments with multiple sentences", () => {
    const body = "Start: summary. Follow-up sentence.";
    expect(formatCommentBodyForCommit(body, config)).toBe(
      "start: summary. | details: Follow-up sentence.",
    );
  });

  it("keeps non-prefixed comments without label", () => {
    const body = "Update: just a note";
    expect(formatCommentBodyForCommit(body, config)).toBe("Update: just a note");
  });

  it("formats non-prefixed comments with multiple sentences", () => {
    const body = "Note: first sentence. Second sentence.";
    expect(formatCommentBodyForCommit(body, config)).toBe(
      "Note: first sentence. | details: Second sentence.",
    );
  });

  it("drops the label when only the prefix is provided", () => {
    const body = "Start:";
    expect(formatCommentBodyForCommit(body, config)).toBe("Start:");
  });

  it("formats comments with pipe details and extra whitespace", () => {
    const body = "Start: summary   |   detail ";
    expect(formatCommentBodyForCommit(body, config)).toBe("start: summary | details: detail");
  });

  it("splitSummaryAndDetails handles pipe-separated summaries", () => {
    const result = splitSummaryAndDetails("summary | detail one | detail two");
    expect(result.summary).toBe("summary");
    expect(result.details).toEqual(["detail one", "detail two"]);
  });

  it("splitSummaryAndDetails handles sentence splitting", () => {
    const result = splitSummaryAndDetails("Summary sentence. Second sentence.");
    expect(result.summary).toBe("Summary sentence.");
    expect(result.details).toEqual(["Second sentence."]);
  });
});
