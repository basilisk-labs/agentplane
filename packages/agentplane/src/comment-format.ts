import { type AgentplaneConfig } from "@agentplane/core";

type CommentPrefix = { raw: string; label: string };

export function normalizeCommentBodyForCommit(body: string): string {
  const raw = body.replaceAll("\r\n", "\n").replaceAll("\r", "\n");
  const collapsed = raw.replaceAll(/\n+/g, " | ").replaceAll(/\s+/g, " ");
  return collapsed.trim();
}

function normalizeCommentPrefix(prefix: string): string {
  let label = prefix.trim();
  if (label.endsWith(":")) label = label.slice(0, -1);
  return label.trim().toLowerCase();
}

function commentPrefixesForCommit(config: AgentplaneConfig): CommentPrefix[] {
  const prefixes: CommentPrefix[] = [];
  for (const kind of ["start", "blocked", "verified"] as const) {
    const raw = config.tasks.comments[kind]?.prefix ?? "";
    const label = normalizeCommentPrefix(raw);
    if (raw && label) prefixes.push({ raw, label });
  }
  return prefixes;
}

function splitCommentPrefix(
  text: string,
  prefixes: CommentPrefix[],
): { label: string | null; remainder: string } {
  const lowered = text.toLowerCase();
  for (const { raw, label } of prefixes) {
    const trimmed = raw.trim();
    if (!trimmed) continue;
    if (lowered.startsWith(trimmed.toLowerCase())) {
      return { label, remainder: text.slice(trimmed.length).trim() };
    }
  }
  return { label: null, remainder: text };
}

export function splitSummaryAndDetails(text: string): { summary: string; details: string[] } {
  const cleaned = text.trim();
  if (!cleaned) return { summary: "", details: [] };
  for (const pattern of [/\s*\|\s*/, /\s*;\s*/, /\s+--\s+/, /\s+-\s+/]) {
    if (pattern.test(cleaned)) {
      const parts = cleaned
        .split(pattern)
        .map((part) => part.trim())
        .filter(Boolean);
      if (parts.length > 0) {
        const [summary, ...details] = parts;
        return { summary: summary ?? "", details };
      }
    }
  }
  const sentences = cleaned
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (sentences.length > 1) {
    const [summary, ...details] = sentences;
    return { summary: summary ?? "", details };
  }
  return { summary: cleaned, details: [] };
}

export function formatCommentBodyForCommit(body: string, config: AgentplaneConfig): string {
  const compact = normalizeCommentBodyForCommit(body);
  if (!compact) return "";
  const prefixes = commentPrefixesForCommit(config);
  let { label, remainder } = splitCommentPrefix(compact, prefixes);
  let { summary, details } = splitSummaryAndDetails(remainder);
  if (!summary) {
    summary = remainder || compact;
    if (summary === compact && label) label = null;
  }
  if (label) summary = `${label}: ${summary}`.trim();
  if (details.length > 0) {
    const detailsText = details.filter(Boolean).join("; ").trim();
    if (detailsText) return `${summary} | details: ${detailsText}`;
  }
  return summary;
}
