import { describe, expect, it } from "vitest";
import { chmod, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";
import {
  applyConflictResolution,
  assertConflictMaterializationState,
  prepareConflictResolutionTree,
} from "./conflict-rework-merge.js";

const taskId = "202607252223-THDN0G";
describe("provider conflict merge application", () => {
  it.each(["shared.txt", ":(glob)shared.txt"])(
    "prepares an exact resolution tree without changing the checkout: %s",
    async (sharedPath) => {
      const cwd = await mkdtemp(path.join(os.tmpdir(), "agentplane-conflict-tree-"));
      const git = async (...args: string[]) => {
        const result = await execFileAsync("git", args, { cwd, env: gitEnv() });
        return result.stdout.trim();
      };
      try {
        await git("init", "-b", "main");
        await git("config", "user.name", "Fixture");
        await git("config", "user.email", "fixture@example.invalid");
        await writeFile(path.join(cwd, sharedPath), "original\n");
        await writeFile(path.join(cwd, ".gitignore"), ".agentplane/cache/\n");
        await writeFile(path.join(cwd, "obsolete.txt"), "original obsolete\n");
        await git("add", ".");
        await git("commit", "-m", "seed");
        const mergeBase = await git("rev-parse", "HEAD");
        await git("checkout", "-b", "task/fixture");
        await writeFile(path.join(cwd, sharedPath), "task\n");
        await git("commit", "-am", "task edit");
        const taskHead = await git("rev-parse", "HEAD");
        await git("checkout", "main");
        await writeFile(path.join(cwd, sharedPath), "base\n");
        await writeFile(path.join(cwd, "base-only.txt"), "preserve base\n");
        await rm(path.join(cwd, "obsolete.txt"));
        await git("add", ".");
        await git("commit", "-m", "advance base");
        const base = await git("rev-parse", "HEAD");
        await git("checkout", "task/fixture");
        await writeFile(path.join(cwd, sharedPath), "resolved task and base\n");
        await git(
          "commit",
          "-am",
          `🚧 ${taskId.split("-").at(-1)} task: apply external agent result\n\nAgentPlane-Result: sha256:${"a".repeat(64)}`,
        );
        const snapshot = await git("rev-parse", "HEAD");
        const options = {
          cwd,
          task_head: taskHead,
          resolution_snapshot: snapshot,
          base,
          merge_base: mergeBase,
          allowed_path: (file: string) => file === sharedPath,
        };
        const prepared = await prepareConflictResolutionTree(options);
        expect(prepared.conflict_paths).toEqual([sharedPath]);
        expect(prepared.conflict_stages).toEqual(
          [
            `100644 ${await git("rev-parse", `${mergeBase}:${sharedPath}`)} 1\t${sharedPath}`,
            `100644 ${await git("rev-parse", `${snapshot}:${sharedPath}`)} 2\t${sharedPath}`,
            `100644 ${await git("rev-parse", `${base}:${sharedPath}`)} 3\t${sharedPath}`,
          ].toSorted(),
        );
        expect(await git("show", `${prepared.tree}:${sharedPath}`)).toBe("resolved task and base");
        expect(await git("show", `${prepared.tree}:base-only.txt`)).toBe("preserve base");
        expect(await prepareConflictResolutionTree(options)).toEqual(prepared);
        const materialization = { cwd, snapshot, resolved_tree: prepared.tree };
        await expect(assertConflictMaterializationState(materialization)).resolves.toBeUndefined();
        await writeFile(path.join(cwd, "obsolete.txt"), "foreign obsolete\n");
        await expect(assertConflictMaterializationState(materialization)).rejects.toThrow(
          "remove foreign",
        );
        await writeFile(path.join(cwd, "obsolete.txt"), "original obsolete\n");
        await writeFile(path.join(cwd, "base-only.txt"), "foreign content\n");
        await expect(assertConflictMaterializationState(materialization)).rejects.toThrow(
          "foreign untracked",
        );
        await writeFile(path.join(cwd, ".git/info/exclude"), "base-only.txt\n");
        await expect(assertConflictMaterializationState(materialization)).rejects.toThrow(
          "foreign untracked",
        );
        await writeFile(path.join(cwd, ".git/info/exclude"), "");
        await writeFile(path.join(cwd, "base-only.txt"), "preserve base\n");
        await rm(path.join(cwd, "obsolete.txt"));
        await expect(assertConflictMaterializationState(materialization)).resolves.toBeUndefined();
        await git("add", ".");
        await expect(assertConflictMaterializationState(materialization)).resolves.toBeUndefined();
        await writeFile(path.join(cwd, sharedPath), "foreign resolution\n");
        await expect(assertConflictMaterializationState(materialization)).rejects.toThrow(
          "foreign workspace",
        );
        await git("add", ".");
        await expect(assertConflictMaterializationState(materialization)).rejects.toThrow(
          "foreign index",
        );
        // Restore only the fixture's known snapshot before exercising independent preparation cases.
        await git("read-tree", "--reset", "-u", snapshot);
        await writeFile(path.join(cwd, "foreign.txt"), "unowned\n");
        await expect(assertConflictMaterializationState(materialization)).rejects.toThrow(
          "foreign untracked",
        );
        await rm(path.join(cwd, "foreign.txt"));
        const unchangedChoice = await prepareConflictResolutionTree({
          ...options,
          resolution_snapshot: taskHead,
        });
        expect(await git("show", `${unchangedChoice.tree}:${sharedPath}`)).toBe("task");
        await expect(
          prepareConflictResolutionTree({
            ...options,
            resolution_snapshot: taskHead,
            allowed_path: () => false,
          }),
        ).rejects.toThrow("outside the semantic scope");
        await expect(
          prepareConflictResolutionTree({ ...options, allowed_path: () => false }),
        ).rejects.toThrow("authority");
        await expect(
          prepareConflictResolutionTree({ ...options, merge_base: base }),
        ).rejects.toThrow("identity");
        expect(await git("rev-parse", "HEAD")).toBe(snapshot);
        expect(await git("status", "--porcelain", "--untracked-files=all")).toBe("");
        const application = {
          ...options,
          task_id: taskId,
          task_branch: "task/fixture",
          base_ref: "main",
          semantic_result_digest: `sha256:${"a".repeat(64)}`,
          assert_authority: () => Promise.resolve(),
        };
        await expect(
          applyConflictResolution({
            ...application,
            base_ref: "task/fixture",
          }),
        ).rejects.toThrow("identity changed");
        await expect(
          applyConflictResolution({
            ...application,
            assert_authority: () => Promise.reject(new Error("stale authority")),
          }),
        ).rejects.toThrow("stale authority");
        const hook = path.join(cwd, ".git/hooks/pre-commit");
        await writeFile(hook, "#!/bin/sh\nexit 1\n");
        await chmod(hook, 0o755);
        await expect(applyConflictResolution(application)).rejects.toThrow("Git operation failed");
        expect(await git("rev-parse", "HEAD")).toBe(snapshot);
        expect(await git("rev-parse", "MERGE_HEAD")).toBe(base);
        expect(await git("write-tree")).toBe(prepared.tree);
        await rm(hook);
        const applied = await applyConflictResolution(application);
        expect(await git("show", "-s", "--format=%P", applied)).toBe(`${snapshot} ${base}`);
        expect(await git("show", "-s", "--format=%T", applied)).toBe(prepared.tree);
        expect(await applyConflictResolution(application)).toBe(applied);
        await expect(
          applyConflictResolution({
            ...application,
            semantic_result_digest: `sha256:${"b".repeat(64)}`,
          }),
        ).rejects.toThrow("bound result");
        expect(await git("rev-parse", "HEAD")).toBe(applied);
        // The remaining cases deliberately create invalid snapshots in this isolated fixture.
        await git("reset", "--hard", snapshot);
        expect(await readFile(path.join(cwd, sharedPath), "utf8")).toBe("resolved task and base\n");
        await writeFile(
          path.join(cwd, sharedPath),
          "<<<<<<< task\ntask\n=======\nbase\n>>>>>>> main\n",
        );
        await git("commit", "-am", "unresolved snapshot");
        const unresolved = await git("rev-parse", "HEAD");
        await expect(
          prepareConflictResolutionTree({ ...options, resolution_snapshot: unresolved }),
        ).rejects.toThrow("preparation failed");
        expect(await git("rev-parse", "HEAD")).toBe(unresolved);
        expect(await git("status", "--porcelain", "--untracked-files=all")).toBe("");
      } finally {
        await rm(cwd, { recursive: true, force: true });
      }
    },
  );
});
