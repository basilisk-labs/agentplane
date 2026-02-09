import { describe, expect, it } from "vitest";

import {
  ensureDocSections,
  extractTaskDoc,
  docChanged,
  mergeTaskDoc,
  normalizeTaskDoc,
  parseDocSections,
  setMarkdownSection,
  splitCombinedHeadingLines,
} from "./task-doc.js";

describe("task-doc", () => {
  it("docChanged normalizes undefined/null inputs via internal normalizeDoc", () => {
    // The public signature is string, but runtime callers can pass nullish values; normalizeDoc defends against it.
    expect(docChanged(undefined as unknown as string, "")).toBe(false);
    expect(docChanged(null as unknown as string, "x")).toBe(true);
  });

  it("splitCombinedHeadingLines splits multiple headings on one line (outside fences)", () => {
    const input = ["## Summary ## Context", "Text"].join("\n");
    expect(splitCombinedHeadingLines(input)).toEqual(["## Summary", "## Context", "Text"]);
  });

  it("splitCombinedHeadingLines does not split headings inside fenced blocks", () => {
    const input = ["```md", "## Summary ## Context", "```", "## Summary", "OK"].join("\n");
    expect(splitCombinedHeadingLines(input)).toEqual([
      "```md",
      "## Summary ## Context",
      "```",
      "## Summary",
      "OK",
    ]);
  });

  it("normalizeTaskDoc merges duplicate sections and inserts a separator when needed", () => {
    const doc = ["## Summary", "A", "", "## Summary", "B", "", "## Context", "C"].join("\n");
    const normalized = normalizeTaskDoc(doc);
    expect(normalized).toContain(["## Summary", "", "A", "", "B"].join("\n"));
    expect(normalized).toContain(["## Context", "", "C"].join("\n"));
  });

  it("normalizeTaskDoc preserves non-section text when there are no headings", () => {
    expect(normalizeTaskDoc("hello\nworld\n")).toBe("hello\nworld");
  });

  it("normalizeTaskDoc normalizes blank lines around fenced code blocks in sections", () => {
    const doc = ["## Summary", "", "a", "", "```md", "code", "```", "", "b"].join("\n");
    const normalized = normalizeTaskDoc(doc);
    // The blank line before the fence should be preserved, and the fence should keep its internal lines untouched.
    expect(normalized).toContain(
      ["## Summary", "", "a", "", "```md", "code", "```", "", "b"].join("\n"),
    );
  });

  it("extractTaskDoc normalizes the Summary header and stops at the auto summary header", () => {
    const body = [
      "# Task",
      "",
      "##   Summary   ",
      "Hello",
      "",
      "## Changes Summary (auto)",
      "auto text",
    ].join("\n");
    expect(extractTaskDoc(body)).toBe(["## Summary", "", "Hello"].join("\n"));
  });

  it("extractTaskDoc returns empty when body is empty or missing a Summary header", () => {
    expect(extractTaskDoc("")).toBe("");
    expect(extractTaskDoc("# Task\n\n## Context\nx\n")).toBe("");
  });

  it("mergeTaskDoc preserves prefix and auto block and replaces the doc section", () => {
    const body = [
      "---",
      "frontmatter",
      "---",
      "",
      "## Summary",
      "",
      "Old",
      "",
      "## Changes Summary (auto)",
      "auto",
    ].join("\n");
    const merged = mergeTaskDoc(body, ["## Summary", "", "New"].join("\n"));
    expect(merged).toBe(
      [
        "---",
        "frontmatter",
        "---",
        "",
        "## Summary",
        "",
        "New",
        "",
        "## Changes Summary (auto)",
        "auto",
        "",
      ].join("\n"),
    );
  });

  it("mergeTaskDoc returns the original body when the provided doc is empty after normalization", () => {
    const body = ["X", "## Summary", "Y"].join("\n");
    // Only newline-only content normalizes to empty; whitespace-only content does not.
    expect(mergeTaskDoc(body, "\n")).toBe(body);
  });

  it("mergeTaskDoc inserts doc when body has no existing Summary section", () => {
    const out = mergeTaskDoc("prefix only\n", ["## Summary", "", "S"].join("\n"));
    // When the body has no Summary section, mergeTaskDoc replaces the doc section and does not preserve prefix text.
    expect(out).toBe(["## Summary", "", "S", ""].join("\n"));
  });

  it("setMarkdownSection appends a new section when missing", () => {
    const out = setMarkdownSection("Hello", "Context", "Line1\n\nLine2");
    expect(out).toBe(["Hello", "", "## Context", "", "Line1", "", "Line2", "", ""].join("\n"));
  });

  it("setMarkdownSection replaces an existing section and preserves the rest", () => {
    const body = ["## Summary", "", "S", "", "## Context", "", "Old", "", "## Risks", "", "R"].join(
      "\n",
    );
    const out = setMarkdownSection(body, "Context", "New");
    expect(out).toBe(
      ["## Summary", "", "S", "", "## Context", "", "New", "", "## Risks", "", "R", ""].join("\n"),
    );
  });

  it("ensureDocSections adds required sections and normalizes existing headings", () => {
    const out = ensureDocSections("## Summary\nX\n", ["Summary", "Context"]);
    expect(out).toContain("## Summary");
    expect(out).toContain("## Context");
    expect(out.endsWith("\n")).toBe(true);
  });

  it("ensureDocSections returns template blocks when doc is empty", () => {
    const out = ensureDocSections("", ["Summary", "Context"]);
    expect(out).toBe(["## Summary", "", "## Context", ""].join("\n"));
  });

  it("parseDocSections returns sections map and order", () => {
    const doc = ["## Summary", "A", "## Context", "B"].join("\n");
    const { sections, order } = parseDocSections(doc);
    expect(order).toEqual(["summary", "context"]);
    expect(sections.get("summary")?.title).toBe("Summary");
    expect(sections.get("summary")?.lines.join("\n").trim()).toBe("A");
  });

  it("ensureDocSections inserts separators for duplicate sections and adds empty headings", () => {
    const doc = ["## Summary", "A", "", "## Summary", "B", "", "## Context"].join("\n");
    const out = ensureDocSections(doc, ["Summary", "Context", "Risks"]);
    // Duplicate Summary should include a separator, Context should have at least an empty line, and Risks is added.
    expect(out).toContain(["## Summary", "A", "", "", "B"].join("\n"));
    expect(out).toContain(["## Context", ""].join("\n"));
    expect(out).toContain("## Risks");
  });
});
