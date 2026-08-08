import { mkdtemp, readFile, readdir, readlink, rm, writeFile } from "node:fs/promises";
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

async function currentProcessDomainId(): Promise<string | null> {
  const currentHostname = os.hostname().trim();
  if (!currentHostname) return null;
  if (process.platform !== "linux") return `${process.platform}:${currentHostname}`;
  try {
    const pidNamespaceLink = await readlink("/proc/self/ns/pid");
    const pidNamespace = pidNamespaceLink.trim();
    return pidNamespace ? `${process.platform}:${currentHostname}:${pidNamespace}` : null;
  } catch {
    return null;
  }
}

async function crashedLockRecord(
  generation: string,
  ownerProcessDomainId?: string | null,
): Promise<string> {
  const resolvedProcessDomainId =
    ownerProcessDomainId === undefined ? await currentProcessDomainId() : ownerProcessDomainId;
  return `${JSON.stringify({
    schema_version: 2,
    generation,
    process_instance_id: "crashed-owner",
    owner_process_domain_id: resolvedProcessDomainId,
    owner_pid: 2_147_483_647,
    owner_command: "missing",
    owner_started_at: "2026-01-01T00:00:00.000Z",
    acquired_at: "2026-01-01T00:00:00.000Z",
  })}\n`;
}

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

  it("recovers a lock whose exact owning process is no longer alive", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-core-lock-"));
    const taskDir = path.join(root, "202601010101-ABCDE");
    const readmePath = path.join(taskDir, "README.md");
    const lockPath = path.join(root, ".202601010101-ABCDE.README.md.lock");
    await writeFile(lockPath, await crashedLockRecord("crashed-owner"), "utf8");

    try {
      let called = false;
      await withTaskReadmeTransaction(
        readmePath,
        () => {
          called = true;
        },
        { timeoutMs: 20, retryMs: 1 },
      );
      expect(called).toBe(true);
      await expect(readFile(lockPath, "utf8")).rejects.toMatchObject({ code: "ENOENT" });
      const entries = await readdir(root);
      expect(entries.filter((name) => name.includes(".recovery"))).toEqual([]);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("retains an unverifiable lock fail-closed", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-core-lock-"));
    const readmePath = path.join(root, "202601010101-ABCDE", "README.md");
    const lockPath = path.join(root, ".202601010101-ABCDE.README.md.lock");
    await writeFile(lockPath, "not a lock record\n", "utf8");

    try {
      await expect(
        withTaskReadmeTransaction(readmePath, () => null, { timeoutMs: 20, retryMs: 1 }),
      ).rejects.toThrow(/owner_status=unverified; unverifiable locks are retained fail-closed/u);
      expect(await readFile(lockPath, "utf8")).toBe("not a lock record\n");
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("does not reclaim a stale-looking lock from another process domain", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-core-lock-"));
    const readmePath = path.join(root, "202601010101-ABCDE", "README.md");
    const lockPath = path.join(root, ".202601010101-ABCDE.README.md.lock");
    const lockRecord = await crashedLockRecord(
      "foreign-owner",
      `${process.platform}:another-host:another-pid-namespace`,
    );
    await writeFile(lockPath, lockRecord, "utf8");

    try {
      await expect(
        withTaskReadmeTransaction(readmePath, () => null, { timeoutMs: 20, retryMs: 1 }),
      ).rejects.toThrow(/owner_status=unverified; unverifiable locks are retained fail-closed/u);
      expect(await readFile(lockPath, "utf8")).toBe(lockRecord);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("serializes concurrent recoverers without overlapping transactions", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-core-lock-"));
    const readmePath = path.join(root, "202601010101-ABCDE", "README.md");
    const lockPath = path.join(root, ".202601010101-ABCDE.README.md.lock");
    await writeFile(lockPath, await crashedLockRecord("crashed-owner"), "utf8");
    let active = 0;
    let maximumActive = 0;
    const operation = async (): Promise<void> => {
      active += 1;
      maximumActive = Math.max(maximumActive, active);
      await new Promise((resolve) => setTimeout(resolve, 40));
      active -= 1;
    };

    try {
      await Promise.all([
        withTaskReadmeTransaction(readmePath, operation, { timeoutMs: 250, retryMs: 1 }),
        withTaskReadmeTransaction(readmePath, operation, { timeoutMs: 250, retryMs: 1 }),
      ]);
      expect(maximumActive).toBe(1);
      const entries = await readdir(root);
      expect(entries.filter((name) => name.includes(".lock"))).toEqual([]);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
