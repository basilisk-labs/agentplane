import { resolveBaseBranch, gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

import { exitCodeForError } from "../../../cli/exit-codes.js";
import { CliError } from "../../../shared/errors.js";
import { resolvePublicationRemote } from "./git-host-identity.js";

const FULL_COMMIT_OID = /^(?:[0-9a-f]{40}|[0-9a-f]{64})$/iu;

function normalizeFullCommitOid(value: string): string | null {
  const trimmed = value.trim();
  return FULL_COMMIT_OID.test(trimmed) ? trimmed.toLowerCase() : null;
}

async function resolveCommit(gitRoot: string, ref: string): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("git", ["rev-parse", "--verify", `${ref}^{commit}`], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    const head = stdout.trim();
    return normalizeFullCommitOid(head);
  } catch {
    return null;
  }
}

async function resolveProviderHead(opts: {
  gitRoot: string;
  remote: string;
  branch: string;
}): Promise<string | null> {
  try {
    const ref = `refs/heads/${opts.branch}`;
    const { stdout } = await execFileAsync("git", ["ls-remote", "--exit-code", opts.remote, ref], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    });
    const rows = stdout
      .split(/\r?\n/u)
      .map((row) => row.trim())
      .filter(Boolean);
    if (rows.length !== 1) return null;
    const [oid, observedRef] = rows[0]!.split(/\s+/u);
    return observedRef === ref ? normalizeFullCommitOid(oid ?? "") : null;
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
  branch: string;
  baseRef: string | null;
  baseSha: string | null;
}): Promise<string | null> {
  const baseRef = opts.baseRef?.trim() ?? "";
  const exactBaseRef = normalizeFullCommitOid(baseRef);
  if (!baseRef || !exactBaseRef) return baseRef || null;

  const frozenSha = normalizeFullCommitOid(opts.baseSha ?? "") ?? "";
  if (!frozenSha || frozenSha !== exactBaseRef) {
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
  if (!branch || normalizeFullCommitOid(branch)) {
    return invalidExactBase("Exact-SHA PR base cannot resolve a configured provider base branch.");
  }

  const remote = await resolvePublicationRemote({ gitRoot: opts.gitRoot, branch: opts.branch });
  const [localHead, providerHead] = await Promise.all([
    resolveCommit(opts.gitRoot, `refs/heads/${branch}`),
    resolveProviderHead({ gitRoot: opts.gitRoot, remote, branch }),
  ]);
  if (!localHead || !providerHead) {
    return invalidExactBase(
      `Exact-SHA PR base ${baseRef} requires both local ${branch} and live ${remote}/${branch} evidence.`,
    );
  }
  if (localHead !== providerHead) {
    return invalidExactBase(
      `Exact-SHA PR base is ambiguous because local ${branch} and live ${remote}/${branch} resolve to different commits.`,
    );
  }
  if (localHead !== frozenSha) {
    return invalidExactBase(
      `Exact-SHA PR base ${baseRef} does not match configured provider base branch ${branch} at ${localHead}.`,
    );
  }
  return branch;
}
