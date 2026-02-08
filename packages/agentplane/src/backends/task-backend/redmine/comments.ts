import { isRecord } from "../../../shared/guards.js";

import { toStringSafe } from "../shared.js";

export type TaskComment = { author: string; body: string };

export function normalizeComments(value: unknown): TaskComment[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is TaskComment =>
      isRecord(item) ? typeof item.author === "string" && typeof item.body === "string" : false,
    );
  }
  if (isRecord(value)) return [value as TaskComment];
  if (typeof value === "string" && value.trim()) {
    return [{ author: "redmine", body: value.trim() }];
  }
  return [];
}

function commentsToPairs(comments: TaskComment[]): [string, string][] {
  const pairs: [string, string][] = [];
  for (const comment of comments) {
    const author = toStringSafe(comment.author).trim();
    const body = toStringSafe(comment.body).trim();
    if (!author && !body) continue;
    pairs.push([author, body]);
  }
  return pairs;
}

function formatCommentNote(author = "unknown", body = ""): string {
  const authorText = author;
  const bodyText = body;
  return `[comment] ${authorText}: ${bodyText}`.trim();
}

export async function appendCommentNotes(opts: {
  issueId: string;
  existingComments: TaskComment[];
  desiredComments: TaskComment[];
  requestJson: (
    method: string,
    reqPath: string,
    payload?: Record<string, unknown>,
    params?: Record<string, unknown>,
  ) => Promise<Record<string, unknown>>;
}): Promise<void> {
  const issueIdText = toStringSafe(opts.issueId);
  if (!issueIdText) return;
  const existingPairs = commentsToPairs(opts.existingComments);
  const desiredPairs = commentsToPairs(opts.desiredComments);
  if (desiredPairs.length === 0) return;
  if (desiredPairs.length < existingPairs.length) return;
  if (existingPairs.length > 0) {
    const prefix = desiredPairs.slice(0, existingPairs.length);
    const matches =
      prefix.length === existingPairs.length &&
      prefix.every(
        (pair, idx) => pair[0] === existingPairs[idx]?.[0] && pair[1] === existingPairs[idx]?.[1],
      );
    if (!matches) return;
  }
  const newPairs = desiredPairs.slice(existingPairs.length);
  for (const [author, body] of newPairs) {
    const note = formatCommentNote(author, body);
    if (note) {
      await opts.requestJson("PUT", `issues/${issueIdText}.json`, { issue: { notes: note } });
    }
  }
}
