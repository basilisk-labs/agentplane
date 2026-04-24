import { exitCodeForError } from "../../cli/exit-codes.js";
import { workflowModeMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { isGhNotFound, resolveDefaultGithubRepo, runGhApiNoOutput } from "../pr/internal/gh-api.js";

export type CloseRemoteBranchAction = "deleted" | "already-absent";

export function ensureNonEmptyCloseFlag(name: string, value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message: `Invalid value for --${name}.`,
    });
  }
  return trimmed;
}

export function ensureBranchPrCloseWorkflowMode(workflowMode: string): void {
  if (workflowMode !== "branch_pr") {
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message: workflowModeMessage(workflowMode, "branch_pr"),
    });
  }
}

export async function resolveCloseGithubRepo(opts: {
  gitRoot: string;
  repoOverride: string | null;
}): Promise<string> {
  const repo = opts.repoOverride?.trim() ?? "";
  if (repo) return repo;
  return await resolveDefaultGithubRepo(opts.gitRoot);
}

export function resolveCloseGithubOwner(repo: string): string {
  const owner = repo.split("/", 1)[0]?.trim() ?? "";
  if (!owner) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: "Could not derive GitHub owner from remote origin.",
    });
  }
  return owner;
}

export async function deleteCloseRemoteHeadBranch(opts: {
  cwd: string;
  repo: string;
  branch: string;
}): Promise<CloseRemoteBranchAction> {
  const endpoint = `repos/${opts.repo}/git/refs/heads/${encodeURIComponent(opts.branch)}`;
  try {
    await runGhApiNoOutput(opts.cwd, [endpoint, "-X", "DELETE"]);
    return "deleted";
  } catch (err) {
    if (isGhNotFound(err)) return "already-absent";
    throw err;
  }
}
