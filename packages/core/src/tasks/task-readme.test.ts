import { describe, expect, it } from "vitest";

import { renderTaskDocFromSections, taskDocToSectionMap } from "./task-doc.js";
import { parseTaskReadme, renderTaskReadme, taskReadmeDocBody } from "./task-readme.js";

describe("task README frontmatter", () => {
  const sample = `---
id: "202601270905-8V7XF4"
title: "Define code quality gates + switch toolchain to bun"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "nodejs"
  - "tooling"
  - "quality"
commit:
  hash: "80f68e162a6963667157f14a1b739ed8d6a3f22d"
  message: "✨ 8V7XF4 task: define quality gates"
comments:
  -
    author: "CODER"
    body: "Start: defining quality gates (lint/format/typecheck/tests/coverage) and switching workspace tooling/docs to bun."
  -
    author: "CODER"
    body: "verified: bun run ci passed."
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
    const duplicate = sample.replace("## Summary", "---\nextra: true\n---\n## Summary");
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

  it("renders append-only events in deterministic order", () => {
    const parsed = parseTaskReadme(sample);
    const withEvents = {
      ...parsed.frontmatter,
      events: [
        {
          type: "status",
          at: "2026-02-07T10:00:00.000Z",
          author: "CODER",
          from: "TODO",
          to: "DOING",
          note: "Start: work in progress.",
        },
        {
          type: "verify",
          at: "2026-02-07T12:00:00.000Z",
          author: "TESTER",
          state: "ok",
          note: "Looks good.",
        },
      ],
    };

    const rendered = renderTaskReadme(withEvents as Record<string, unknown>, parsed.body);
    expect(rendered).toContain("events:");
    expect(rendered).toContain('type: "status"');
    expect(rendered).toContain('at: "2026-02-07T10:00:00.000Z"');
    expect(rendered).toContain('author: "CODER"');
    expect(rendered).toContain('from: "TODO"');
    expect(rendered).toContain('to: "DOING"');
    expect(rendered).toContain('note: "Start: work in progress."');
  });

  it("renders multiline human-facing frontmatter as YAML block scalars", () => {
    const parsed = parseTaskReadme(sample);
    const withMultiline = {
      ...parsed.frontmatter,
      description: String.raw`Line one\n\nLine two`,
      comments: [
        {
          author: "CODER",
          body: String.raw`Start line 1\nStart line 2\nStart line 3`,
        },
      ],
      verification: {
        state: "ok",
        updated_at: "2026-03-08T13:00:00.000Z",
        updated_by: "TESTER",
        note: String.raw`First line\nSecond line\nThird line`,
      },
    };

    const rendered = renderTaskReadme(withMultiline as Record<string, unknown>, parsed.body);
    expect(rendered).toContain("description: |-");
    expect(rendered).toContain("  Line one");
    expect(rendered).toContain("  Line two");
    expect(rendered).toContain("body: |-");
    expect(rendered).toContain("note: |-");

    const roundtrip = parseTaskReadme(rendered).frontmatter;
    expect(roundtrip.description).toBe("Line one\n\nLine two");
    expect((roundtrip.comments as Record<string, unknown>[])[0]?.body).toBe(
      "Start line 1\nStart line 2\nStart line 3",
    );
    expect((roundtrip.verification as Record<string, unknown>).note).toBe(
      "First line\nSecond line\nThird line",
    );
  });

  it("renders origin metadata in deterministic order and roundtrips it", () => {
    const parsed = parseTaskReadme(sample);
    const withOrigin = {
      ...parsed.frontmatter,
      origin: {
        system: "recipe",
        recipe_id: "viewer",
        scenario_id: "demo",
        recipe_version: "1.2.3",
        run_id: "run-123",
      },
    };

    const rendered = renderTaskReadme(withOrigin as Record<string, unknown>, parsed.body);
    expect(rendered).toContain("origin:");
    expect(rendered.indexOf('system: "recipe"')).toBeLessThan(
      rendered.indexOf('recipe_id: "viewer"'),
    );
    expect(rendered.indexOf('recipe_id: "viewer"')).toBeLessThan(
      rendered.indexOf('scenario_id: "demo"'),
    );

    const roundtrip = parseTaskReadme(rendered).frontmatter;
    expect(roundtrip.origin).toEqual({
      system: "recipe",
      recipe_id: "viewer",
      scenario_id: "demo",
      recipe_version: "1.2.3",
      run_id: "run-123",
    });
  });

  it("renders canonical sections in task-doc order and roundtrips them", () => {
    const parsed = parseTaskReadme(sample);
    const withCanonicalSections = {
      ...parsed.frontmatter,
      revision: 1,
      sections: {
        Findings: "Track residual risk.",
        Summary: "Top level summary.",
        "Verify Steps": "1. Run focused checks.",
        Plan: "1. Ship schema v1.",
      },
    };

    const rendered = renderTaskReadme(
      withCanonicalSections as Record<string, unknown>,
      parsed.body,
    );
    expect(rendered).toContain("revision: 1");
    expect(rendered).toContain("sections:");
    expect(rendered.indexOf('Summary: "Top level summary."')).toBeLessThan(
      rendered.indexOf('Plan: "1. Ship schema v1."'),
    );
    expect(rendered.indexOf('Plan: "1. Ship schema v1."')).toBeLessThan(
      rendered.indexOf('Verify Steps: "1. Run focused checks."'),
    );

    const roundtrip = parseTaskReadme(rendered).frontmatter;
    expect((roundtrip.sections as Record<string, unknown>).Summary).toBe("Top level summary.");
    expect(renderTaskDocFromSections(roundtrip.sections as Record<string, string>)).toContain(
      "## Verify Steps",
    );
  });

  it("converts markdown task docs into canonical section maps", () => {
    const doc = [
      "## Summary",
      "",
      "One",
      "",
      "## Verify Steps",
      "",
      "1. Run",
      "",
      "## Findings",
      "",
      "Note",
    ].join("\n");

    expect(taskDocToSectionMap(doc)).toEqual({
      Summary: "One",
      "Verify Steps": "1. Run",
      Findings: "Note",
    });
  });

  it("keeps canonical sections in frontmatter without duplicating them into the body", () => {
    const canonicalBody = renderTaskDocFromSections({
      Summary: "Canonical summary",
      Findings: "Canonical finding",
    });
    const rendered = renderTaskReadme(
      {
        id: "202603130000-TEST",
        title: "Schema sample",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        revision: 1,
        depends_on: [],
        tags: [],
        verify: [],
        plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null },
        verification: { state: "pending", updated_at: null, updated_by: null, note: null },
        comments: [],
        doc_version: 3,
        doc_updated_at: "2026-03-13T00:00:00.000Z",
        doc_updated_by: "CODER",
        description: "sample",
        sections: {
          Summary: "Canonical summary",
          Findings: "Canonical finding",
        },
      },
      canonicalBody,
    );

    expect(rendered).toContain("sections:");
    expect(rendered).toContain('Summary: "Canonical summary"');
    expect(rendered).toContain("## Summary");
    expect(rendered).toContain("## Findings");
  });

  it("drops stale rendered task-doc body when canonical sections exist", () => {
    const rendered = renderTaskReadme(
      {
        id: "202603130001-TEST",
        title: "Schema sample",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        revision: 1,
        depends_on: [],
        tags: [],
        verify: [],
        plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null },
        verification: { state: "pending", updated_at: null, updated_by: null, note: null },
        comments: [],
        doc_version: 3,
        doc_updated_at: "2026-03-13T00:00:00.000Z",
        doc_updated_by: "CODER",
        description: "sample",
        sections: {
          Summary: "Canonical summary",
          Findings: "Canonical finding",
        },
      },
      "## Summary\n\nstale body\n",
    );

    expect(rendered).toContain('Summary: "Canonical summary"');
    expect(rendered).toContain("## Summary");
    expect(rendered).not.toContain("stale body");
  });

  it("fills missing canonical frontmatter sections from the README body", () => {
    const body = [
      "## Summary",
      "",
      "stale summary",
      "",
      "## Scope",
      "",
      "- Preserve body scope.",
      "",
      "## Plan",
      "",
      "1. Preserve body plan.",
      "",
    ].join("\n");
    const frontmatter = {
      doc_version: 3,
      sections: {
        Summary: "Canonical summary",
      },
    };

    const doc = taskReadmeDocBody(frontmatter, body);
    expect(doc).toContain("## Summary\n\nCanonical summary");
    expect(doc).toContain("## Scope\n\n- Preserve body scope.");
    expect(doc).toContain("## Plan\n\n1. Preserve body plan.");
    expect(doc).not.toContain("stale summary");
  });

  it("preserves contextual prose body when canonical sections exist", () => {
    const contextualBody = [
      "# Context",
      "",
      "This README keeps only non-canonical reading context in Markdown.",
      "",
      "## References",
      "",
      "- docs/user/branching-and-pr-artifacts.mdx",
      "",
    ].join("\n");
    const rendered = renderTaskReadme(
      {
        id: "202603130002-TEST",
        title: "Schema sample",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        revision: 1,
        depends_on: [],
        tags: [],
        verify: [],
        plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null },
        verification: { state: "pending", updated_at: null, updated_by: null, note: null },
        comments: [],
        doc_version: 3,
        doc_updated_at: "2026-03-13T00:00:00.000Z",
        doc_updated_by: "CODER",
        description: "sample",
        sections: {
          Summary: "Canonical summary",
          Findings: "Canonical finding",
        },
      },
      contextualBody,
    );

    expect(rendered).toContain('Summary: "Canonical summary"');
    expect(rendered).toContain("# Context");
    expect(rendered).toContain("## References");
    expect(rendered).not.toContain("## Summary");
  });

  it("preserves freeform context when pruning stale canonical task sections", () => {
    const mixedBody = [
      "# Context",
      "",
      "Introductory prose that is not part of a task-doc section.",
      "",
      "## Summary",
      "",
      "stale summary",
      "",
      "## References",
      "",
      "- docs/user/tasks-and-backends.mdx",
      "",
      "Trailing prose.",
      "",
      "## Verification",
      "",
      "stale verification",
      "",
    ].join("\n");

    const rendered = renderTaskReadme(
      {
        id: "202603130003-TEST",
        title: "Schema sample",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        revision: 1,
        depends_on: [],
        tags: [],
        verify: [],
        plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null },
        verification: { state: "pending", updated_at: null, updated_by: null, note: null },
        comments: [],
        doc_version: 3,
        doc_updated_at: "2026-03-13T00:00:00.000Z",
        doc_updated_by: "CODER",
        description: "sample",
        sections: {
          Summary: "Canonical summary",
          Verification: "<!-- BEGIN VERIFICATION RESULTS -->\n<!-- END VERIFICATION RESULTS -->",
        },
      },
      mixedBody,
    );

    expect(rendered).toContain("# Context");
    expect(rendered).toContain("Introductory prose");
    expect(rendered).toContain("## References");
    expect(rendered).toContain("Trailing prose.");
    expect(rendered).toContain("## Summary");
    expect(rendered).not.toContain("stale summary");
    expect(rendered).toContain("## Verification");
    expect(rendered).not.toContain("stale verification");
  });

  it("preserves v3 Notes and Risks as contextual Markdown sections", () => {
    const rendered = renderTaskReadme(
      {
        id: "202603130004-TEST",
        title: "Schema sample",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        revision: 1,
        depends_on: [],
        tags: [],
        verify: [],
        plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null },
        verification: { state: "pending", updated_at: null, updated_by: null, note: null },
        comments: [],
        doc_version: 3,
        doc_updated_at: "2026-03-13T00:00:00.000Z",
        doc_updated_by: "CODER",
        description: "sample",
        sections: { Summary: "Canonical summary", Findings: "Canonical finding" },
      },
      [
        "## Summary",
        "",
        "stale",
        "",
        "## Notes",
        "",
        "Keep notes.",
        "",
        "## Risks",
        "",
        "Keep risks.",
      ].join("\n"),
    );

    expect(rendered).not.toContain("stale");
    expect(rendered).toContain("## Notes\n\nKeep notes.");
    expect(rendered).toContain("## Risks\n\nKeep risks.");
  });

  it("preserves contextual prose before canonical headings", () => {
    const rendered = renderTaskReadme(
      {
        id: "202603130004-TEST",
        title: "Schema sample",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        revision: 1,
        depends_on: [],
        tags: [],
        verify: [],
        plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null },
        verification: { state: "pending", updated_at: null, updated_by: null, note: null },
        comments: [],
        doc_version: 3,
        doc_updated_at: "2026-03-13T00:00:00.000Z",
        doc_updated_by: "CODER",
        description: "sample",
        sections: { Summary: "Canonical summary", Findings: "Canonical finding" },
      },
      [
        "Read this first.",
        "",
        "## Summary",
        "",
        "stale",
        "",
        "## References",
        "",
        "- docs/ref",
      ].join("\n"),
    );

    expect(rendered).toContain("Read this first.");
    expect(rendered).toContain("## References\n\n- docs/ref");
    expect(rendered).not.toContain("stale");
  });

  it("finds the first markdown section without regex search backtracking", () => {
    const rendered = renderTaskReadme(
      {
        id: "202603130005-TEST",
        title: "Schema sample",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        revision: 1,
        depends_on: [],
        tags: [],
        verify: [],
        plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null },
        verification: { state: "pending", updated_at: null, updated_by: null, note: null },
        comments: [],
        doc_version: 3,
        doc_updated_at: "2026-03-13T00:00:00.000Z",
        doc_updated_by: "CODER",
        description: "sample",
        sections: { Summary: "Canonical summary", Findings: "Canonical finding" },
      },
      ["## References", "x".repeat(50_000), "## Summary", "", "stale"].join("\n"),
    );

    expect(rendered).toContain("## References");
    expect(rendered).not.toContain("stale");
  });
});
