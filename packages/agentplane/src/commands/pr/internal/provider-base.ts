import { resolveBaseBranch, gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

import { exitCodeForError } from "../../../cli/exit-codes.js";
import { CliError } from "../../../shared/errors.js";
import { isCanonicalFullCommitOid } from "../../shared/git-ops.js";

async function resolveCommit(gitRoot: string, ref: string): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync(
      "git",
      ["rev-parse", "--verify", `${ref}^{commit}`],
      { cwd: gitRoot, env: gitEnv() },
    );
    const head = stdout.trim();
    return isCanonicalFullCommitOid(head) ? head.toLowerCase() : null;
  } catch {
    return null;
  }
}

function invalidExactBase(message: string): never {
  throw new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message,
  });
}

export async function resolveProviderBaseBranch(opts: {
  gitRoot: string;
  cwd: string;
  rootOverride?: string | null;
  workflowMode: "direct" | "branch_pr";
  baseRef: string | null;
  baseSha: string | null;
}): Promise<string | null> {
  const baseRef = opts.baseRef?.trim() ?? "";
  if (!baseRef || !isCanonicalFullCommitOid(baseRef)) return baseRef || null;

  const frozenSha = opts.baseSha?.trim().toLowerCase() ?? "";
  if (!isCanonicalFullCommitOid(frozenSha) || frozenSha !== baseRef.toLowerCase()) {
    return invalidExactBase(
      "Exact-SHA PR base is inconsistent with the frozen Task execution base_sha.",
    );
  }

  const candidate = await resolveBaseBranch({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    cliBaseOpt: null,
    mode: opts.workflowMode,
  });
  const branch = candidate?.trim() ?? "";
  if (!branch || isCanonicalFullCommitOid(branch)) {
    return invalidExactBase(
      "Exact-SHA PR base cannot resolve a configured provider base branch.",
    );
  }

  const [localHead, providerTrackingHead] = await Promise.all([
    resolveCommit(opts.gitRoot, `refs/heads/${branch}`),
    resolveCommit(opts.gitRoot, `refs/remotes/origin/${branch}`),
  ]);
  if (!localHead || !providerTrackingHead) {
    return invalidExactBase(
      `Exact-SHA PR base ${baseRef} requires both local ${branch} and origin/${branch} evidence.`,
    );
  }
  if (localHead !== providerTrackingHead) {
    return invalidExactBase(
      `Exact-SHA PR base is ambiguous because ${branch} and origin/${branch} resolve to different commits.`,
    );
  }
  if (localHead !== frozenSha) {
    return invalidExactBase(
      `Exact-SHA PR base ${baseRef} does not match configured provider base branch ${branch} at ${localHead}.`,
    );
  }
  return branch;
}
