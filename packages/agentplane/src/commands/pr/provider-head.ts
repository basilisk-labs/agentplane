import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import {
  observeExistingGithubPrByBranch,
  observeExistingGithubPrByNumber,
  type ObservedGithubPr,
} from "./internal/sync-github.js";

const PROVIDER_HEAD_UNAVAILABLE_REASON = "github_pr_state_unavailable";

export function isProviderHeadUnavailableError(err: unknown): err is CliError {
  return err instanceof CliError && err.context?.reason_code === PROVIDER_HEAD_UNAVAILABLE_REASON;
}

export async function requireOpenGithubPrAtHead(opts: {
  gitRoot: string;
  branch: string;
  base: string;
  expectedHeadSha: string;
  prNumber?: number | null;
}): Promise<ObservedGithubPr> {
  const observation =
    typeof opts.prNumber === "number" && opts.prNumber > 0
      ? await observeExistingGithubPrByNumber({
          gitRoot: opts.gitRoot,
          prNumber: opts.prNumber,
          branch: opts.branch,
          baseBranch: opts.base,
        })
      : await observeExistingGithubPrByBranch({
          gitRoot: opts.gitRoot,
          branch: opts.branch,
          baseBranch: opts.base,
        });

  if (observation.state === "unavailable") {
    throw new CliError({
      exitCode: exitCodeForError("E_NETWORK"),
      code: "E_NETWORK",
      message: `GitHub PR state is unavailable for ${opts.branch}: ${observation.reason}`,
      context: {
        reason_code: PROVIDER_HEAD_UNAVAILABLE_REASON,
        branch: opts.branch,
        provider: "github",
      },
    });
  }
  if (observation.state === "not_found") {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `GitHub PR was not found for ${opts.branch}; publish or relink it before integration`,
    });
  }
  if (observation.pr.status !== "OPEN") {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `GitHub PR #${observation.pr.prNumber} is ${observation.pr.status}; expected OPEN before integration`,
    });
  }
  if (observation.pr.headSha !== opts.expectedHeadSha) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `GitHub PR #${observation.pr.prNumber} head differs from the prepared branch: ` +
        `hosted=${observation.pr.headSha ?? "<missing>"} local=${opts.expectedHeadSha}`,
    });
  }
  return observation.pr;
}
