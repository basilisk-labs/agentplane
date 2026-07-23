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
          pageInfo?: {
            hasNextPage?: boolean;
            endCursor?: string | null;
          } | null;
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

type GithubReviewThreadNode = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<NonNullable<GithubReviewThreadPayload["data"]>["repository"]>["pullRequest"]
    >["reviewThreads"]
  >["nodes"]
>[number];

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
    const unresolved: GithubUnresolvedReviewThread[] = [];
    const seenCursors = new Set<string>();
    let cursor: string | null = null;
    let shouldContinue = true;
    while (shouldContinue) {
      const args = [
        "graphql",
        "-f",
        "query=query($owner:String!,$repo:String!,$number:Int!,$cursor:String){repository(owner:$owner,name:$repo){pullRequest(number:$number){reviewThreads(first:100,after:$cursor){nodes{isResolved isOutdated path line comments(first:1){nodes{url}}} pageInfo{hasNextPage endCursor}}}}}",
        "-f",
        `owner=${repo.owner}`,
        "-f",
        `repo=${repo.repo}`,
        "-F",
        `number=${opts.prNumber}`,
      ];
      if (cursor !== null) args.push("-f", `cursor=${cursor}`);
      const payload = await runGhApiJson<GithubReviewThreadPayload>(opts.gitRoot, args);
      const threads = payload.data?.repository?.pullRequest?.reviewThreads;
      if (!threads || !Array.isArray(threads.nodes)) {
        return {
          checked: false,
          reason: "GitHub review-thread response is missing a valid nodes array",
        };
      }
      const pageInfo = threads.pageInfo;
      if (!pageInfo || typeof pageInfo.hasNextPage !== "boolean") {
        return {
          checked: false,
          reason: "GitHub review-thread response is missing valid pageInfo",
        };
      }
      for (const thread of threads.nodes) {
        if (!isValidReviewThreadNode(thread)) {
          return {
            checked: false,
            reason: "GitHub review-thread response contains a malformed thread node",
          };
        }
        if (!thread.isResolved) {
          unresolved.push({
            path: thread.path?.trim() ?? null,
            line: typeof thread.line === "number" ? thread.line : null,
            url: thread.comments?.nodes?.[0]?.url?.trim() ?? null,
          });
        }
      }
      shouldContinue = pageInfo.hasNextPage;
      if (!shouldContinue) return { checked: true, unresolved };
      const nextCursor = typeof pageInfo.endCursor === "string" ? pageInfo.endCursor.trim() : "";
      if (!nextCursor || seenCursors.has(nextCursor)) {
        return {
          checked: false,
          reason: "GitHub review-thread pagination returned an invalid or repeated cursor",
        };
      }
      seenCursors.add(nextCursor);
      cursor = nextCursor;
    }
    return { checked: true, unresolved };
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return { checked: false, reason: "gh CLI is unavailable" };
    return { checked: false, reason: normalizeGhTransportError(err) };
  }
}

function isValidReviewThreadNode(value: unknown): value is GithubReviewThreadNode {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const thread = value as GithubReviewThreadNode;
  if (typeof thread.isResolved !== "boolean") return false;
  if (thread.path !== null && typeof thread.path !== "string") return false;
  if (thread.line !== null && typeof thread.line !== "number") return false;
  const comments = thread.comments;
  if (!comments || !Array.isArray(comments.nodes)) return false;
  return comments.nodes.every(
    (comment) =>
      Boolean(comment) &&
      typeof comment === "object" &&
      !Array.isArray(comment) &&
      (comment.url === null || typeof comment.url === "string"),
  );
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
