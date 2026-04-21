import { loadConfig, resolveProject } from "@agentplaneorg/core";
import {
  clearPinnedBaseBranch,
  getPinnedBaseBranch,
  resolveBaseBranch,
  setPinnedBaseBranch,
} from "@agentplaneorg/core/git";

import { mapCoreError } from "../../cli/error-map.js";
import { createCliEmitter } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { gitBranchExists, gitCurrentBranch } from "../shared/git-ops.js";
const output = createCliEmitter();

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
    output.line(pinned);
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
    output.line(value);
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
    output.line(cleared ? "cleared" : "no-op");
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

    output.lines([
      `current_branch=${current ?? "-"}`,
      `pinned_base=${pinned ?? "-"}`,
      `effective_base=${effective ?? "-"}`,
    ]);
    if (warnings.length > 0) {
      for (const warning of warnings) {
        output.line(`warning=${warning}`);
      }
    }
    return 0;
  } catch (err) {
    throw mapCoreError(err, { command: "branch base explain", root: opts.rootOverride ?? null });
  }
}
