import { describe, expect, it } from "vitest";

import { parseTaskReadme, renderTaskReadme } from "./task-readme.js";

describe("task README frontmatter", () => {
  const sample = `---
id: "202601270905-8V7XF4"
title: "Define code quality gates + switch toolchain to bun"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["nodejs", "tooling", "quality"]
commit: { hash: "80f68e162a6963667157f14a1b739ed8d6a3f22d", message: "✨ 8V7XF4 quality gates + bun" }
comments:
  - { author: "CODER", body: "Start: defining quality gates (lint/format/typecheck/tests/coverage) and switching workspace tooling/docs to bun." }
  - { author: "CODER", body: "verified: bun run ci passed." }
doc_version: 2
doc_updated_at: "2026-01-27T09:05:55+00:00"
doc_updated_by: "agentplane"
description: "Document and enforce code quality criteria (lint/format/typecheck/tests/coverage) and standardize on bun for installs and scripts."
flag: true
mixed: ["x", { y: "z" }]
nested: ["x", [1, 2]]
nothing: null
---
## Summary

Hello world.
`;

  it("roundtrips without changing bytes", () => {
    const parsed = parseTaskReadme(sample);
    const rendered = renderTaskReadme(parsed.frontmatter, parsed.body);
    expect(rendered).toBe(sample);
  });

  it("renders updates deterministically", () => {
    const parsed = parseTaskReadme(sample);
    const updated = renderTaskReadme({ ...parsed.frontmatter, title: "New title" }, parsed.body);
    expect(updated).toContain('title: "New title"');
    expect(parseTaskReadme(updated).frontmatter.title).toBe("New title");
  });

  it("rejects markdown without frontmatter", () => {
    expect(() => parseTaskReadme("# hello\n")).toThrow(/frontmatter/i);
  });

  it("rejects non-mapping frontmatter", () => {
    const bad = `---\n- item\n---\n## Summary\n`;
    expect(() => parseTaskReadme(bad)).toThrow(/frontmatter must be a YAML mapping/i);
  });

  it("strips duplicate frontmatter blocks from the body", () => {
    const duplicate = sample.replace(
      "## Summary",
      "---\nextra: true\n---\n## Summary",
    );
    const parsed = parseTaskReadme(duplicate);
    expect(parsed.body.trimStart().startsWith("## Summary")).toBe(true);
    expect(parsed.body).not.toContain("extra: true");
  });

  it("rejects unsupported scalar values", () => {
    const parsed = parseTaskReadme(sample);
    const bad = { ...parsed.frontmatter, weird: Symbol("x") as unknown };
    expect(() => renderTaskReadme(bad as Record<string, unknown>, parsed.body)).toThrow(
      /Unsupported scalar type/,
    );
  });
});
