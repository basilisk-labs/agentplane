import {
  clearPinnedBaseBranch,
  getPinnedBaseBranch,
  loadConfig,
  resolveBaseBranch,
  resolveProject,
  setPinnedBaseBranch,
} from "@agentplaneorg/core";

import { mapCoreError } from "../../cli/error-map.js";
import { CliError } from "../../shared/errors.js";
import { gitBranchExists, gitCurrentBranch } from "../shared/git-ops.js";

export async function cmdBranchBaseGet(opts: {
  cwd: string;
  rootOverride?: string;
}): Promise<number> {
  try {
    const pinned = await getPinnedBaseBranch({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    if (!pinned) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "Base branch is not pinned (use `agentplane branch base set`).",
      });
    }
    process.stdout.write(`${pinned}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "branch base get", root: opts.rootOverride ?? null });
  }
}

export async function cmdBranchBaseSet(opts: {
  cwd: string;
  rootOverride?: string;
  value?: string;
  useCurrent?: boolean;
}): Promise<number> {
  const trimmed = (opts.value ?? "").trim();
  if (trimmed.length === 0 && !opts.useCurrent) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Missing base branch value (pass <name> or --current).",
    });
  }
  try {
    let nextValue = trimmed;
    if (opts.useCurrent) {
      const resolved = await resolveProject({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
      });
      nextValue = await gitCurrentBranch(resolved.gitRoot);
    }
    const value = await setPinnedBaseBranch({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      value: nextValue,
    });
    process.stdout.write(`${value}\n`);
    return 0;
  } catch (err) {
    throw mapCoreError(err, { command: "branch base set", root: opts.rootOverride ?? null });
  }
}

export async function cmdBranchBaseClear(opts: {
  cwd: string;
  rootOverride?: string;
}): Promise<number> {
  try {
    const cleared = await clearPinnedBaseBranch({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    process.stdout.write(`${cleared ? "cleared" : "no-op"}\n`);
    return 0;
  } catch (err) {
    throw mapCoreError(err, { command: "branch base clear", root: opts.rootOverride ?? null });
  }
}

export async function cmdBranchBaseExplain(opts: {
  cwd: string;
  rootOverride?: string;
}): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    let current: string | null = null;
    try {
      current = await gitCurrentBranch(resolved.gitRoot);
    } catch {
      current = null;
    }

    const pinned = await getPinnedBaseBranch({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const effective = await resolveBaseBranch({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      cliBaseOpt: null,
      mode: loaded.config.workflow_mode,
    });

    const warnings: string[] = [];
    if (pinned && !(await gitBranchExists(resolved.gitRoot, pinned))) {
      warnings.push(`Pinned base branch not found: ${pinned}`);
    }
    if (effective && !(await gitBranchExists(resolved.gitRoot, effective))) {
      warnings.push(`Effective base branch not found: ${effective}`);
    }

    process.stdout.write(`current_branch=${current ?? "-"}\n`);
    process.stdout.write(`pinned_base=${pinned ?? "-"}\n`);
    process.stdout.write(`effective_base=${effective ?? "-"}\n`);
    if (warnings.length > 0) {
      for (const warning of warnings) {
        process.stdout.write(`warning=${warning}\n`);
      }
    }
    return 0;
  } catch (err) {
    throw mapCoreError(err, { command: "branch base explain", root: opts.rootOverride ?? null });
  }
}
