import { resolveBaseBranch, gitEnv } from "@agentplaneorg/core/git";
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

export async function resolveProviderBaseBranch(opts: {
  gitRoot: string;
  baseRef: string | null;
  baseSha: string | null;
  identity: GitHostIdentity;
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
  const ref = `refs/heads/${branch}`;
  let localHead: string | null = null;
  let providerHead: string | null = null;
  try {
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
  if (localHead !== exactBase) {
    return invalidBase(
      `Exact-SHA PR base ${baseRef} does not match provider base branch ${branch}.`,
    );
  }
  return branch;
}
