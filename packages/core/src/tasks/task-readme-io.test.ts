import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { updateTaskReadmeAtomic } from "./task-readme-io.js";

const BASE = `---
id: "202601010101-ABCDE"
title: "Example task title"
status: "TODO"
priority: "med"
owner: "CODER"
depends_on: []
tags: []
doc_version: 2
doc_updated_at: "2026-01-27T00:00:00Z"
doc_updated_by: "agentplane"
description: "x"
---

## Summary
`;

describe("updateTaskReadmeAtomic", () => {
  it("updates frontmatter+body and preserves trailing newline", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "agentplane-core-"));
    const readmePath = path.join(dir, "README.md");
    await writeFile(readmePath, BASE, "utf8");

    await updateTaskReadmeAtomic(readmePath, ({ frontmatter, body }) => ({
      frontmatter: { ...frontmatter, title: "Updated" },
      body: `${body}\n## Notes\n\nHello\n`,
    }));

    const next = await readFile(readmePath, "utf8");
    expect(next).toContain('title: "Updated"');
    expect(next).toContain("## Notes");
    expect(next.endsWith("\n")).toBe(true);
  });
});
