import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import {
  observeExistingChangeRequestByBranch,
  observeExistingChangeRequestByNumber,
} from "./internal/change-request-provider.js";
import type { ObservedChangeRequest } from "./internal/change-request-model.js";
import type { RecordedGitHostIdentity } from "./internal/git-host-identity.js";
import type { ObservedGithubPr } from "./internal/sync-github.js";

const PROVIDER_HEAD_UNAVAILABLE_REASON = "change_request_state_unavailable";

export function isProviderHeadUnavailableError(err: unknown): err is CliError {
  return (
    err instanceof CliError &&
    (err.context?.reason_code === PROVIDER_HEAD_UNAVAILABLE_REASON ||
      err.context?.reason_code === "github_pr_state_unavailable")
  );
}

export async function requireOpenChangeRequestAtHead(opts: {
  gitRoot: string;
  branch: string;
  base: string;
  expectedHeadSha: string;
  prNumber?: number | null;
  recorded?: RecordedGitHostIdentity | null;
}): Promise<ObservedChangeRequest> {
  const observation =
    typeof opts.prNumber === "number" && opts.prNumber > 0
      ? await observeExistingChangeRequestByNumber({
          gitRoot: opts.gitRoot,
          prNumber: opts.prNumber,
          branch: opts.branch,
          baseBranch: opts.base,
          recorded: opts.recorded,
        })
      : await observeExistingChangeRequestByBranch({
          gitRoot: opts.gitRoot,
          branch: opts.branch,
          baseBranch: opts.base,
          recorded: opts.recorded,
        });

  if (observation.state === "unavailable") {
    throw new CliError({
      exitCode: exitCodeForError("E_NETWORK"),
      code: "E_NETWORK",
      message: `Hosted change-request state is unavailable for ${opts.branch}: ${observation.reason}`,
      context: {
        reason_code: PROVIDER_HEAD_UNAVAILABLE_REASON,
        branch: opts.branch,
        provider: opts.recorded?.kind ?? "unknown",
      },
    });
  }
  if (observation.state === "not_found") {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Hosted change request was not found for ${opts.branch}; publish or relink it before integration`,
    });
  }
  if (observation.pr.status !== "OPEN") {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `${observation.pr.provider === "gitlab" ? "GitLab MR" : "GitHub PR"} #${observation.pr.prNumber} is ${observation.pr.status}; expected OPEN before integration`,
    });
  }
  if (observation.pr.headSha !== opts.expectedHeadSha) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `${observation.pr.provider === "gitlab" ? "GitLab MR" : "GitHub PR"} #${observation.pr.prNumber} head differs from the prepared branch: ` +
        `hosted=${observation.pr.headSha ?? "<missing>"} local=${opts.expectedHeadSha}`,
    });
  }
  return observation.pr;
}

export async function requireOpenGithubPrAtHead(opts: {
  gitRoot: string;
  branch: string;
  base: string;
  expectedHeadSha: string;
  prNumber?: number | null;
  recorded?: RecordedGitHostIdentity | null;
}): Promise<ObservedGithubPr & ObservedChangeRequest> {
  return requireOpenChangeRequestAtHead(opts);
}
