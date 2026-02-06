import { parse as parseYaml } from "yaml";

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function orderedKeys(
  value: Record<string, unknown>,
  preferredKeyOrder: readonly string[] | null,
): string[] {
  const keys = Object.keys(value);
  const ordered: string[] = [];

  if (preferredKeyOrder) {
    for (const k of preferredKeyOrder) if (k in value) ordered.push(k);
  }
  const remaining = keys.filter((k) => !ordered.includes(k)).toSorted((a, b) => a.localeCompare(b));
  ordered.push(...remaining);
  return ordered;
}

export type ParsedTaskReadme = {
  frontmatter: Record<string, unknown>;
  body: string;
};

function stripLeadingFrontmatterBlocks(body: string): string {
  let next = body.replaceAll("\r\n", "\n");
  while (true) {
    const trimmed = next.replace(/^\n+/, "");
    if (!trimmed.startsWith("---\n")) break;
    const end = trimmed.indexOf("\n---\n", 4);
    if (end === -1) break;
    next = trimmed.slice(end + 5);
  }
  return next;
}

function splitFrontmatter(markdown: string): { frontmatterText: string | null; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(markdown);
  if (!match) return { frontmatterText: null, body: markdown };
  const body = stripLeadingFrontmatterBlocks(markdown.slice(match[0].length));
  return { frontmatterText: match[1] ?? null, body };
}

export function parseTaskReadme(markdown: string): ParsedTaskReadme {
  const { frontmatterText, body } = splitFrontmatter(markdown);
  if (frontmatterText == null) {
    throw new Error("Task README is missing YAML frontmatter");
  }

  const parsed = parseYaml(frontmatterText) as unknown;
  if (!isRecord(parsed)) {
    throw new TypeError("Task README frontmatter must be a YAML mapping");
  }

  return { frontmatter: parsed, body };
}

function renderScalar(value: unknown): string {
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "true" : "false";
  throw new TypeError(`Unsupported scalar type: ${typeof value}`);
}

function renderFlowSeq(value: unknown[]): string {
  const parts = value.map((v) => {
    if (Array.isArray(v)) return renderFlowSeq(v);
    if (isRecord(v))
      return `{ ${orderedKeys(v, null)
        .map((k) => `${k}: ${renderScalar(v[k])}`)
        .join(", ")} }`;
    return renderScalar(v);
  });
  return `[${parts.join(", ")}]`;
}

function renderMapLines(
  value: Record<string, unknown>,
  indent: string,
  preferredKeyOrder: readonly string[] | null,
): string[] {
  const keys = orderedKeys(value, preferredKeyOrder);
  const lines: string[] = [];
  for (const k of keys) {
    const v = value[k];
    lines.push(...renderValueLines(k, v, indent));
  }
  return lines;
}

function isStringArray(value: unknown[]): value is string[] {
  return value.every((v) => typeof v === "string");
}

function renderValueLines(key: string, value: unknown, indent: string): string[] {
  if (Array.isArray(value)) {
    if (value.length === 0) return [`${indent}${key}: []`];

    if (isStringArray(value)) {
      return [`${indent}${key}:`, ...value.map((item) => `${indent}  - ${renderScalar(item)}`)];
    }

    const allObjects = value.every((v) => isRecord(v));
    if (!allObjects) return [`${indent}${key}: ${renderFlowSeq(value)}`];

    return [
      `${indent}${key}:`,
      ...value.flatMap((item) => {
        if (!isRecord(item)) throw new TypeError("Expected an object item in YAML sequence");
        const preferred = key === "comments" ? (["author", "body"] as const) : null;
        const itemLines = renderMapLines(item, `${indent}    `, preferred);
        if (itemLines.length === 0) return [`${indent}  - {}`];
        return [`${indent}  -`, ...itemLines];
      }),
    ];
  }

  if (isRecord(value)) {
    const preferred =
      key === "origin"
        ? (["system", "issue_id", "url"] as const)
        : key === "plan_approval"
          ? (["state", "updated_at", "updated_by", "note"] as const)
          : key === "verification"
            ? (["state", "updated_at", "updated_by", "note"] as const)
            : key === "commit"
              ? (["hash", "message"] as const)
              : null;
    const inner = renderMapLines(value, `${indent}  `, preferred);
    if (inner.length === 0) return [`${indent}${key}: {}`];
    return [`${indent}${key}:`, ...inner];
  }

  return [`${indent}${key}: ${renderScalar(value)}`];
}

export function renderTaskFrontmatter(frontmatter: Record<string, unknown>): string {
  const preferredKeyOrder = [
    "id",
    "title",
    "status",
    "priority",
    "owner",
    "created_at",
    "created_by",
    "origin",
    "depends_on",
    "tags",
    "verify",
    "plan_approval",
    "verification",
    "commit",
    "comments",
    "doc_version",
    "doc_updated_at",
    "doc_updated_by",
    "description",
    "id_source",
    "dirty",
  ] as const;

  const ordered = orderedKeys(frontmatter, preferredKeyOrder);

  const lines: string[] = [];
  for (const k of ordered) {
    lines.push(...renderValueLines(k, frontmatter[k], ""));
  }

  return `---\n${lines.join("\n")}\n---\n`;
}

export function renderTaskReadme(frontmatter: Record<string, unknown>, body: string): string {
  return `${renderTaskFrontmatter(frontmatter)}${body}`;
}
