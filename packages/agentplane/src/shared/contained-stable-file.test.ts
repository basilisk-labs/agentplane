import { mkdir, mkdtemp, rename, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { readContainedStableTextNoFollow } from "./contained-stable-file.js";

async function temporaryDirectory(label: string): Promise<string> {
  return await mkdtemp(path.join(os.tmpdir(), `agentplane-${label}-`));
}

describe("readContainedStableTextNoFollow", () => {
  it("reads a bounded regular file from a canonical repository root alias", async () => {
    const parent = await temporaryDirectory("contained-file-parent");
    try {
      const root = path.join(parent, "repository");
      const alias = path.join(parent, "repository-alias");
      const filePath = path.join(root, "config", "value.txt");
      await mkdir(path.dirname(filePath), { recursive: true });
      await writeFile(filePath, "inside\n", "utf8");
      await symlink(root, alias);

      await expect(
        readContainedStableTextNoFollow({
          repository_root: alias,
          file_path: path.join(alias, "config", "value.txt"),
          label: "test file",
          max_bytes: 64,
        }),
      ).resolves.toBe("inside\n");
    } finally {
      await rm(parent, { recursive: true, force: true });
    }
  });

  it("rejects both internal and escaping descendant symlinks", async () => {
    const root = await temporaryDirectory("contained-file-repo");
    const outside = await temporaryDirectory("contained-file-outside");
    try {
      const insideTarget = path.join(root, "inside.txt");
      const outsideTarget = path.join(outside, "outside.txt");
      await Promise.all([
        writeFile(insideTarget, "inside\n", "utf8"),
        writeFile(outsideTarget, "outside\n", "utf8"),
      ]);
      await Promise.all([
        symlink(insideTarget, path.join(root, "internal-link.txt")),
        symlink(outsideTarget, path.join(root, "escaping-link.txt")),
      ]);

      for (const name of ["internal-link.txt", "escaping-link.txt"]) {
        await expect(
          readContainedStableTextNoFollow({
            repository_root: root,
            file_path: path.join(root, name),
            label: "test file",
            max_bytes: 64,
          }),
        ).rejects.toMatchObject({ code: "ELOOP" });
      }
    } finally {
      await Promise.all([
        rm(root, { recursive: true, force: true }),
        rm(outside, { recursive: true, force: true }),
      ]);
    }
  });

  it("rejects an ancestor swap before reading external bytes", async () => {
    const root = await temporaryDirectory("contained-file-repo");
    const outside = await temporaryDirectory("contained-file-outside");
    try {
      const observedDirectory = path.join(root, "config");
      const retiredDirectory = path.join(root, "config-retired");
      const filePath = path.join(observedDirectory, "value.txt");
      await Promise.all([
        mkdir(observedDirectory, { recursive: true }),
        writeFile(path.join(outside, "value.txt"), "external secret\n", "utf8"),
      ]);
      await writeFile(filePath, "inside\n", "utf8");

      await expect(
        readContainedStableTextNoFollow({
          repository_root: root,
          file_path: filePath,
          label: "test file",
          max_bytes: 64,
          after_containment_check: async () => {
            await rename(observedDirectory, retiredDirectory);
            await symlink(outside, observedDirectory);
          },
        }),
      ).rejects.toThrow(/path changed before it could be read/u);
    } finally {
      await Promise.all([
        rm(root, { recursive: true, force: true }),
        rm(outside, { recursive: true, force: true }),
      ]);
    }
  });

  it("treats disappearance after the initial snapshot as unsafe instead of missing", async () => {
    const root = await temporaryDirectory("contained-file-repo");
    try {
      const filePath = path.join(root, "value.txt");
      await writeFile(filePath, "inside\n", "utf8");

      await expect(
        readContainedStableTextNoFollow({
          repository_root: root,
          file_path: filePath,
          label: "test file",
          max_bytes: 64,
          after_containment_check: async () => {
            await rm(filePath);
          },
        }),
      ).rejects.toMatchObject({ code: "ELOOP" });
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("enforces the byte budget before returning file contents", async () => {
    const root = await temporaryDirectory("contained-file-repo");
    try {
      const filePath = path.join(root, "value.txt");
      await writeFile(filePath, "12345", "utf8");

      await expect(
        readContainedStableTextNoFollow({
          repository_root: root,
          file_path: filePath,
          label: "test file",
          max_bytes: 4,
        }),
      ).rejects.toThrow(/exceeds the 4-byte observation budget/u);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
