import { resolveBaseBranch, gitEnv, gitProofEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

import { exitCodeForError } from "../../../cli/exit-codes.js";
import { CliError } from "../../../shared/errors.js";
import type { GitHostIdentity } from "./git-host-identity.js";

function commitOid(value: string): string | null {
  const trimmed = value.trim();
  return /^(?:[0-9a-f]{40}|[0-9a-f]{64})$/iu.test(trimmed) ? trimmed.toLowerCase() : null;
}

function invalidBase(message: string): never {
  throw new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message,
  });
}

export async function resolvePrMetadataBaseBranch(opts: {
  gitRoot: string;
  baseRef: string | null;
  baseSha: string | null;
}): Promise<string | null> {
  const baseRef = opts.baseRef?.trim() ?? "";
  const exactBase = commitOid(baseRef);
  if (!exactBase) return baseRef || null;
  if (commitOid(opts.baseSha ?? "") !== exactBase) {
    return invalidBase(
      "Exact-SHA PR base is inconsistent with the frozen Task execution base_sha.",
    );
  }
  const configuredBase = await resolveBaseBranch({
    cwd: opts.gitRoot,
    rootOverride: null,
    cliBaseOpt: null,
    mode: "branch_pr",
  });
  const branch = configuredBase?.trim();
  if (!branch || commitOid(branch)) {
    return invalidBase("Exact-SHA PR base cannot resolve a configured provider base branch.");
  }
  return branch;
}

/** A live target observation does not change the Task's immutable comparison boundary. */
export async function resolveCurrentProviderBaseHead(opts: {
  gitRoot: string;
  branch: string;
  identity: GitHostIdentity;
}): Promise<string> {
  const branch = opts.branch;
  const ref = `refs/heads/${branch}`;
  let localHead: string | null = null;
  let providerHead: string | null = null;
  try {
    await execFileAsync("git", ["check-ref-format", ref], { cwd: opts.gitRoot, env: gitEnv() });
    const local = await execFileAsync("git", ["rev-parse", "--verify", `${ref}^{commit}`], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    });
    localHead = commitOid(local.stdout.trim());
    // Use the resolved target URL, not the source fork or a stale tracking ref.
    const remote = await execFileAsync(
      "git",
      ["ls-remote", "--exit-code", "--", opts.identity.targetUrl, ref],
      { cwd: opts.gitRoot, env: gitEnv() },
    );
    const rows = remote.stdout.trim().split(/\r?\n/u);
    if (rows.length === 1) {
      const [oid, observedRef] = rows[0]!.split(/\s+/u);
      if (observedRef === ref) providerHead = commitOid(oid ?? "");
    }
  } catch {
    return invalidBase(
      `Exact-SHA PR base requires local and live provider evidence for ${branch}.`,
    );
  }
  if (!localHead || !providerHead) {
    return invalidBase(
      `Exact-SHA PR base requires local and live provider evidence for ${branch}.`,
    );
  }
  if (localHead !== providerHead) {
    return invalidBase(`Exact-SHA PR base is ambiguous: local and live ${branch} differ.`);
  }
  return localHead;
}

export async function resolveProviderBaseBranch(opts: {
  gitRoot: string;
  baseRef: string | null;
  baseSha: string | null;
  identity: GitHostIdentity;
}): Promise<string | null> {
  const branch = await resolvePrMetadataBaseBranch(opts);
  const exactBase = commitOid(opts.baseRef?.trim() ?? "");
  if (!exactBase) return branch;
  const current = { gitRoot: opts.gitRoot, branch: branch!, identity: opts.identity };
  const head = await resolveCurrentProviderBaseHead(current);
  try {
    await execFileAsync("git", ["merge-base", "--is-ancestor", exactBase, head], {
      cwd: opts.gitRoot,
      env: gitProofEnv(),
    });
  } catch {
    return invalidBase(
      `Exact-SHA PR base ${exactBase} is not a proven ancestor of provider base branch ${branch}.`,
    );
  }
  if ((await resolveCurrentProviderBaseHead(current)) !== head)
    return invalidBase(`Provider base branch ${branch} changed during ancestry observation.`);
  return branch;
}
