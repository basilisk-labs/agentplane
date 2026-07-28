import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { gitRevParse } from "@agentplaneorg/core/git";

import { isRecord } from "../../shared/guards.js";
import {
  readSideEffectAuthorityState,
  type SideEffectAuthorityState,
} from "./side-effect-authority.js";

const AUTHORITY_STORE_SCHEMA_VERSION = 1;
const AUTHORITY_STORE_DIR = ["agentplane", "side-effect-authority"];

type StoredAuthorityEnvelope = {
  schemaVersion: 1;
  kind: "side_effect_authority_store";
  taskId: string;
  state: SideEffectAuthorityState;
};

export type SideEffectAuthorityStateLoadResult =
  | { state: SideEffectAuthorityState; source: "git_common_dir" | "task_extension" }
  | { state: null; source: "invalid"; reason: string };

function assertSafeTaskId(taskId: string): void {
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/u.test(taskId)) {
    throw new Error("Authority store task id must be a portable task identifier.");
  }
}

async function authorityStorePath(opts: { gitRoot: string; taskId: string }): Promise<string> {
  assertSafeTaskId(opts.taskId);
  const commonDir = await gitRevParse(opts.gitRoot, ["--path-format=absolute", "--git-common-dir"]);
  return path.join(commonDir, ...AUTHORITY_STORE_DIR, `${opts.taskId}.json`);
}

function parseStoredAuthorityEnvelope(
  value: unknown,
  taskId: string,
): SideEffectAuthorityState | null {
  if (
    !isRecord(value) ||
    value.schemaVersion !== AUTHORITY_STORE_SCHEMA_VERSION ||
    value.kind !== "side_effect_authority_store" ||
    value.taskId !== taskId
  ) {
    return null;
  }
  return readSideEffectAuthorityState({
    extensions: { "agentplane.side_effect_authority": value.state },
  });
}

async function readStoredAuthorityState(opts: {
  gitRoot: string;
  taskId: string;
}): Promise<{ state: SideEffectAuthorityState | null; exists: boolean }> {
  const target = await authorityStorePath(opts);
  let raw: string;
  try {
    raw = await readFile(target, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") {
      return { state: null, exists: false };
    }
    throw error;
  }
  try {
    return {
      state: parseStoredAuthorityEnvelope(JSON.parse(raw) as unknown, opts.taskId),
      exists: true,
    };
  } catch {
    return { state: null, exists: true };
  }
}

/**
 * Authority is local control-plane state: linked worktrees share the Git common
 * directory, while the task branch and its protected CI status remain unchanged.
 * Existing task extensions stay as a read-only migration source until a new grant.
 */
export async function loadSideEffectAuthorityState(opts: {
  gitRoot: string;
  taskId: string;
  task: { extensions?: Record<string, unknown> };
}): Promise<SideEffectAuthorityStateLoadResult> {
  const stored = await readStoredAuthorityState({ gitRoot: opts.gitRoot, taskId: opts.taskId });
  if (stored.exists) {
    return stored.state
      ? { state: stored.state, source: "git_common_dir" }
      : { state: null, source: "invalid", reason: "persisted authority state is malformed" };
  }
  const legacy = readSideEffectAuthorityState(opts.task);
  return legacy
    ? { state: legacy, source: "task_extension" }
    : { state: null, source: "invalid", reason: "task authority state is malformed" };
}

export async function persistSideEffectAuthorityState(opts: {
  gitRoot: string;
  taskId: string;
  state: SideEffectAuthorityState;
}): Promise<void> {
  const target = await authorityStorePath(opts);
  const parent = path.dirname(target);
  const temporary = path.join(parent, `.${opts.taskId}.${process.pid}.${randomUUID()}.tmp`);
  const payload: StoredAuthorityEnvelope = {
    schemaVersion: 1,
    kind: "side_effect_authority_store",
    taskId: opts.taskId,
    state: opts.state,
  };
  await mkdir(parent, { recursive: true, mode: 0o700 });
  try {
    await writeFile(temporary, `${JSON.stringify(payload, null, 2)}\n`, {
      encoding: "utf8",
      mode: 0o600,
      flag: "wx",
    });
    await rename(temporary, target);
  } finally {
    await rm(temporary, { force: true });
  }
}
