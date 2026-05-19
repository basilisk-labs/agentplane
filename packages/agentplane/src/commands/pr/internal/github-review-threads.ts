import { exitCodeForError } from "../../../cli/exit-codes.js";
import { CliError } from "../../../shared/errors.js";
import { normalizeGhTransportError } from "../../shared/gh-transport.js";
import { resolveDefaultGithubRepo, runGhApiJson } from "./gh-api.js";

type GithubReviewThreadPayload = {
  data?: {
    repository?: {
      pullRequest?: {
        reviewThreads?: {
          nodes?:
            | {
                isResolved?: boolean | null;
                isOutdated?: boolean | null;
                path?: string | null;
                line?: number | null;
                comments?: { nodes?: { url?: string | null }[] | null } | null;
              }[]
            | null;
        } | null;
      } | null;
    } | null;
  };
};

export type GithubUnresolvedReviewThread = {
  path: string | null;
  line: number | null;
  url: string | null;
};

export type GithubReviewThreadCheck =
  | { checked: true; unresolved: GithubUnresolvedReviewThread[] }
  | { checked: false; reason: string };

function repoParts(repoSlug: string): { owner: string; repo: string } | null {
  const [owner, repo] = repoSlug.split("/");
  if (!owner || !repo) return null;
  return { owner, repo };
}

export async function checkGithubUnresolvedReviewThreads(opts: {
  gitRoot: string;
  prNumber: number | null;
}): Promise<GithubReviewThreadCheck> {
  if (opts.prNumber === null || opts.prNumber <= 0) {
    return { checked: false, reason: "GitHub PR number is not recorded in PR metadata" };
  }
  let repoSlug: string;
  try {
    repoSlug = await resolveDefaultGithubRepo(opts.gitRoot);
  } catch (err) {
    return { checked: false, reason: normalizeGhTransportError(err) };
  }
  const repo = repoParts(repoSlug);
  if (!repo) return { checked: false, reason: `Invalid GitHub repo slug: ${repoSlug}` };

  try {
    const payload = await runGhApiJson<GithubReviewThreadPayload>(opts.gitRoot, [
      "graphql",
      "-f",
      "query=query($owner:String!,$repo:String!,$number:Int!){repository(owner:$owner,name:$repo){pullRequest(number:$number){reviewThreads(first:100){nodes{isResolved isOutdated path line comments(first:1){nodes{url}}}}}}}",
      "-f",
      `owner=${repo.owner}`,
      "-f",
      `repo=${repo.repo}`,
      "-F",
      `number=${opts.prNumber}`,
    ]);
    const nodes = payload.data?.repository?.pullRequest?.reviewThreads?.nodes ?? [];
    const unresolved = nodes
      .filter((thread) => thread?.isResolved !== true)
      .map((thread) => ({
        path: thread?.path?.trim() ?? null,
        line: typeof thread?.line === "number" ? thread.line : null,
        url: thread?.comments?.nodes?.[0]?.url?.trim() ?? null,
      }));
    return { checked: true, unresolved };
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return { checked: false, reason: "gh CLI is unavailable" };
    return { checked: false, reason: normalizeGhTransportError(err) };
  }
}

export function throwIfGithubReviewThreadsUnresolved(opts: {
  prNumber: number;
  unresolved: GithubUnresolvedReviewThread[];
}): void {
  if (opts.unresolved.length === 0) return;
  const examples = opts.unresolved
    .slice(0, 5)
    .map((thread) => {
      const location = thread.path
        ? `${thread.path}${thread.line ? `:${thread.line}` : ""}`
        : "unknown location";
      return thread.url ? `- ${location} (${thread.url})` : `- ${location}`;
    })
    .join("\n");
  throw new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message:
      `GitHub PR #${opts.prNumber} has ${opts.unresolved.length} unresolved review thread(s).\n` +
      `${examples}\n` +
      "Resolve or address review threads before merge/integration.",
  });
}
