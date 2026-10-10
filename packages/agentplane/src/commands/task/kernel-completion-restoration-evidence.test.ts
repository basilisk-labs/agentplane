import { mkdir, symlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { mkTempDir } from "@agentplane/testkit";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { readCompletionRestorationProof } from "./kernel-completion-restoration-evidence.js";

describe("completion restoration proof path guards", () => {
  it.each(["directory", "symlink"])(
    "rejects a %s before reading inspection content",
    async (kind) => {
      const root = await mkTempDir();
      const selector = `sha256:${"a".repeat(64)}`;
      const directory = path.join(root, "exchanges", "task", selector.slice(7));
      await mkdir(directory, { recursive: true });
      const file = path.join(directory, "inspection-result.json");
      if (kind === "directory") await mkdir(file);
      else {
        const target = path.join(root, "untrusted.json");
        await writeFile(target, "{}");
        await symlink(target, file, "file");
      }
      // The path guard must reject before any other record fields are consumed.
      const record = { aggregate: { id: "task" } } as KernelRecord;
      await expect(readCompletionRestorationProof(root, record, "item", selector)).rejects.toThrow(
        /non-regular|symbolic link|ELOOP/u,
      );
    },
  );
});
