import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { setMarkdownSection } from "./task-doc.js";
import { updateTaskReadmeAtomic, withTaskReadmeTransaction } from "./task-readme-io.js";
import { parseTaskReadme } from "./task-readme.js";

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

  it("serializes concurrent updates so neither section change is lost", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "agentplane-core-"));
    const readmePath = path.join(dir, "README.md");
    await writeFile(readmePath, `${BASE}\n## Notes\n\nOriginal note\n`, "utf8");

    await Promise.all([
      updateTaskReadmeAtomic(readmePath, async ({ frontmatter, body }) => {
        await new Promise((resolve) => setTimeout(resolve, 75));
        return {
          frontmatter,
          body: setMarkdownSection(body, "Summary", "Updated summary"),
        };
      }),
      updateTaskReadmeAtomic(readmePath, ({ frontmatter, body }) => ({
        frontmatter,
        body: setMarkdownSection(body, "Notes", "Updated notes"),
      })),
    ]);

    const next = await readFile(readmePath, "utf8");
    expect(next).toContain("Updated summary");
    expect(next).toContain("Updated notes");
    expect(parseTaskReadme(next).frontmatter.revision).toBe(3);
  });

  it("retains a crashed-owner lock fail-closed instead of risking split-brain recovery", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-core-lock-"));
    const taskDir = path.join(root, "202601010101-ABCDE");
    const readmePath = path.join(taskDir, "README.md");
    const lockPath = path.join(root, ".202601010101-ABCDE.README.md.lock");
    await writeFile(
      lockPath,
      `${JSON.stringify({
        schema_version: 1,
        generation: "crashed-owner",
        process_instance_id: "crashed-owner",
        owner_pid: 2_147_483_647,
        owner_command: "missing",
        owner_started_at: "2026-01-01T00:00:00.000Z",
        acquired_at: "2026-01-01T00:00:00.000Z",
      })}\n`,
      "utf8",
    );

    try {
      await expect(
        withTaskReadmeTransaction(readmePath, () => null, {
          timeoutMs: 20,
          retryMs: 1,
        }),
      ).rejects.toThrow(/owner_status=(?:stale|unverified); stale locks are retained fail-closed/u);
      expect(await readFile(lockPath, "utf8")).toContain('"generation":"crashed-owner"');
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
