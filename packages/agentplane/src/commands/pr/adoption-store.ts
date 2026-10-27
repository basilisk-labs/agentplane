import { mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";

import { validateTaskPrMeta } from "@agentplaneorg/core/schemas";
import { listWorktrees } from "@agentplaneorg/core/git";

import { readContainedStableTextNoFollow } from "../../shared/contained-stable-file.js";
import { writeTextIfChanged } from "../../shared/write-if-changed.js";
import type { AdoptedPrIdentity } from "./adoption-identity.js";
import type { ExistingPrAdoptionStore } from "./adoption-route.js";

type AdoptionMeta = ReturnType<typeof validateTaskPrMeta> & {
  adoption?: AdoptedPrIdentity;
};

function validateMeta(taskId: string, raw: unknown): AdoptionMeta {
  const meta = validateTaskPrMeta(raw) as AdoptionMeta;
  if (meta.task_id !== taskId) throw new Error("Existing PR metadata task ID changed");
  return meta;
}

/** Adoption evidence belongs to the primary control checkout, never the hosted or task worktree. */
export async function resolveAdoptionControlRoot(gitRoot: string): Promise<string> {
  const worktrees = await listWorktrees(gitRoot);
  const primary = worktrees[0]?.path;
  if (!primary) throw new Error("Existing PR adoption has no registered primary checkout");
  return path.resolve(primary);
}

/** An adopted provider branch is never the task-owned artifact publication branch. */
export function assertTaskOwnedPrSync(meta: AdoptionMeta | null): void {
  if (meta?.adoption) {
    throw new Error(
      "Adopted PR requires its dedicated readback/update route; task-owned PR sync is forbidden",
    );
  }
}

function sameHostedPr(left: AdoptedPrIdentity, right: AdoptedPrIdentity): boolean {
  return (
    left.provider === right.provider &&
    left.hostname === right.hostname &&
    left.source_project === right.source_project &&
    left.target_project === right.target_project &&
    left.pr_number === right.pr_number
  );
}

/** The task PR metadata is the durable receipt; no live head overwrites adoption evidence. */
export function createExistingPrAdoptionStore(opts: {
  gitRoot: string;
  workflowDir: string;
}): ExistingPrAdoptionStore & {
  readMetadata: (taskId: string) => Promise<AdoptionMeta | null>;
  recordUpdatedHead: (
    taskId: string,
    expectedHeadSha: string,
    updatedHeadSha: string,
  ) => Promise<void>;
  recordMerged: (
    taskId: string,
    headSha: string,
    mergeCommit: string,
    mergedAt: string,
  ) => Promise<void>;
  readMerged: (
    taskId: string,
  ) => Promise<{ headSha: string; mergeCommit: string; mergedAt: string } | null>;
} {
  const tasksRoot = path.resolve(opts.gitRoot, opts.workflowDir);
  const metaPath = (taskId: string) => {
    if (!/^[A-Za-z0-9][A-Za-z0-9_-]*$/u.test(taskId)) {
      throw new Error("Existing PR adoption task ID is invalid");
    }
    return path.join(tasksRoot, taskId, "pr", "meta.json");
  };
  const readRawMeta = async (taskId: string): Promise<unknown> => {
    let raw: string;
    try {
      raw = await readContainedStableTextNoFollow({
        repository_root: opts.gitRoot,
        file_path: metaPath(taskId),
        label: "existing PR adoption metadata",
        max_bytes: 1024 * 1024,
      });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return undefined;
      throw error;
    }
    return JSON.parse(raw) as unknown;
  };
  const readMeta = async (taskId: string): Promise<AdoptionMeta | null> => {
    const raw = await readRawMeta(taskId);
    return raw === undefined ? null : validateMeta(taskId, raw);
  };
  const readAdoptionMeta = async (taskId: string): Promise<AdoptionMeta | null> => {
    const raw = await readRawMeta(taskId);
    if (raw === undefined || raw === null || typeof raw !== "object" || !("adoption" in raw))
      return null;
    return validateMeta(taskId, raw);
  };
  const findBinding = async (identity: AdoptedPrIdentity) => {
    for (const entry of await readdir(tasksRoot, { withFileTypes: true })) {
      if (!entry.isDirectory() || !/^[A-Za-z0-9][A-Za-z0-9_-]*$/u.test(entry.name)) continue;
      const meta = await readAdoptionMeta(entry.name);
      const retained = meta?.adoption;
      if (retained && sameHostedPr(retained, identity)) return { task_id: entry.name };
    }
    return null;
  };
  return {
    readMetadata: readMeta,
    recordUpdatedHead: async (taskId, expectedHeadSha, updatedHeadSha) => {
      if (
        !/^[a-f0-9]{40,64}$/u.test(expectedHeadSha) ||
        !/^[a-f0-9]{40,64}$/u.test(updatedHeadSha) ||
        expectedHeadSha === updatedHeadSha
      )
        throw new Error("Adopted PR updated head receipt is invalid");
      const lockPath = path.join(tasksRoot, ".existing-pr-adoption.lock");
      await mkdir(lockPath);
      try {
        const meta = await readMeta(taskId);
        if (meta?.adoption?.task_id !== taskId || meta.status !== "OPEN") {
          throw new Error("Adopted PR update has no open immutable task binding");
        }
        if (meta.head_sha === updatedHeadSha) return;
        if ((meta.head_sha ?? meta.adoption.head_sha) !== expectedHeadSha) {
          throw new Error("Adopted PR update changed the retained current head");
        }
        await writeTextIfChanged(
          metaPath(taskId),
          `${JSON.stringify(
            {
              ...meta,
              head_sha: updatedHeadSha,
              last_verified_sha: null,
              last_verified_at: null,
              verify: undefined,
              updated_at: new Date().toISOString(),
            },
            null,
            2,
          )}\n`,
          { containedRoot: opts.gitRoot, label: "adopted PR updated head metadata" },
        );
      } finally {
        await rm(lockPath, { recursive: true, force: true });
      }
    },
    readTask: async (taskId) => {
      const meta = await readAdoptionMeta(taskId);
      return meta?.adoption ?? null;
    },
    readMerged: async (taskId) => {
      const meta = await readMeta(taskId);
      if (!meta?.adoption || meta.status !== "MERGED" || !meta.merge_commit || !meta.merged_at)
        return null;
      return {
        headSha: meta.head_sha ?? meta.adoption.head_sha,
        mergeCommit: meta.merge_commit,
        mergedAt: meta.merged_at,
      };
    },
    findBinding,
    createIfUnbound: async (identity) => {
      // A single task-root lock serializes duplicate claims across task IDs.
      const lockPath = path.join(tasksRoot, ".existing-pr-adoption.lock");
      await mkdir(tasksRoot, { recursive: true });
      await mkdir(lockPath);
      try {
        const previous = await readMeta(identity.task_id);
        if (previous?.adoption || (await findBinding(identity))) {
          throw new Error("Existing PR adoption already has a task or provider binding");
        }
        if (
          previous &&
          (previous.pr_number !== undefined ||
            previous.provider !== undefined ||
            previous.branch !== undefined ||
            previous.base !== undefined)
        ) {
          throw new Error("Task already has PR metadata; adoption cannot replace it");
        }
        const meta: AdoptionMeta = {
          ...(previous ?? {
            schema_version: 1,
            task_id: identity.task_id,
            created_at: identity.observed_at,
            updated_at: identity.observed_at,
          }),
          branch: identity.head_ref,
          base: identity.base_ref,
          pr_number: identity.pr_number,
          provider: {
            schema_version: 1,
            kind: identity.provider,
            hostname: identity.hostname,
            remote: identity.remote,
            source_project: identity.source_project,
            target_project: identity.target_project,
          },
          status: "OPEN",
          adoption: identity,
        };
        const target = metaPath(identity.task_id);
        await mkdir(path.dirname(target), { recursive: true });
        await writeTextIfChanged(target, `${JSON.stringify(meta, null, 2)}\n`, {
          containedRoot: opts.gitRoot,
          label: "existing PR adoption metadata",
        });
      } finally {
        await rm(lockPath, { recursive: true, force: true });
      }
    },
    recordMerged: async (taskId, headSha, mergeCommit, mergedAt) => {
      if (
        !/^[a-f0-9]{40,64}$/u.test(headSha) ||
        !/^[a-f0-9]{40,64}$/u.test(mergeCommit) ||
        !Number.isFinite(Date.parse(mergedAt))
      ) {
        throw new Error("Adopted PR merge receipt is invalid");
      }
      const lockPath = path.join(tasksRoot, ".existing-pr-adoption.lock");
      await mkdir(lockPath);
      try {
        const meta = await readMeta(taskId);
        if (
          meta?.adoption?.task_id !== taskId ||
          (meta.head_sha ?? meta.adoption.head_sha) !== headSha
        ) {
          throw new Error("Adopted PR merge no longer matches the retained task and exact head");
        }
        if (
          meta.status === "MERGED" &&
          meta.merge_commit === mergeCommit &&
          meta.merged_at === mergedAt
        )
          return;
        if (meta.status !== "OPEN")
          throw new Error("Adopted PR merge metadata is already closed with different evidence");
        const next: AdoptionMeta = {
          ...meta,
          status: "MERGED",
          merged_at: mergedAt,
          merge_commit: mergeCommit,
          updated_at: mergedAt,
        };
        await writeTextIfChanged(metaPath(taskId), `${JSON.stringify(next, null, 2)}\n`, {
          containedRoot: opts.gitRoot,
          label: "adopted PR merge metadata",
        });
      } finally {
        await rm(lockPath, { recursive: true, force: true });
      }
    },
  };
}
