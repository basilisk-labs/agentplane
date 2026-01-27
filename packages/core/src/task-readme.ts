import { parse as parseYaml } from "yaml";

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

export type ParsedTaskReadme = {
  frontmatter: Record<string, unknown>;
  body: string;
};

function splitFrontmatter(markdown: string): { frontmatterText: string | null; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(markdown);
  if (!match) return { frontmatterText: null, body: markdown };
  return { frontmatterText: match[1] ?? null, body: markdown.slice(match[0].length) };
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

function renderInlineMap(
  value: Record<string, unknown>,
  preferredKeyOrder: readonly string[] | null,
): string {
  const keys = Object.keys(value);
  const ordered: string[] = [];

  if (preferredKeyOrder) {
    for (const k of preferredKeyOrder) if (k in value) ordered.push(k);
  }
  const remaining = keys.filter((k) => !ordered.includes(k)).toSorted((a, b) => a.localeCompare(b));
  ordered.push(...remaining);

  const parts = ordered.map((k) => {
    const v = value[k];
    if (Array.isArray(v)) return `${k}: ${renderFlowSeq(v)}`;
    if (isRecord(v)) return `${k}: ${renderInlineMap(v, null)}`;
    return `${k}: ${renderScalar(v)}`;
  });
  return `{ ${parts.join(", ")} }`;
}

function renderFlowSeq(value: unknown[]): string {
  const parts = value.map((v) => {
    if (Array.isArray(v)) return renderFlowSeq(v);
    if (isRecord(v)) return renderInlineMap(v, null);
    return renderScalar(v);
  });
  return `[${parts.join(", ")}]`;
}

function renderValue(key: string, value: unknown): string[] {
  if (Array.isArray(value)) {
    if (value.length === 0) return [`${key}: []`];
    const allObjects = value.every((v) => isRecord(v));
    if (!allObjects) return [`${key}: ${renderFlowSeq(value)}`];

    return [
      `${key}:`,
      ...value.map((item) => {
        if (!isRecord(item)) throw new TypeError("Expected an object item in YAML sequence");
        const preferred = key === "comments" ? (["author", "body"] as const) : null;
        return `  - ${renderInlineMap(item, preferred)}`;
      }),
    ];
  }

  if (isRecord(value)) {
    const preferred = key === "commit" ? (["hash", "message"] as const) : null;
    return [`${key}: ${renderInlineMap(value, preferred)}`];
  }

  return [`${key}: ${renderScalar(value)}`];
}

export function renderTaskFrontmatter(frontmatter: Record<string, unknown>): string {
  const preferredKeyOrder = [
    "id",
    "title",
    "status",
    "priority",
    "owner",
    "depends_on",
    "tags",
    "verify",
    "commit",
    "comments",
    "doc_version",
    "doc_updated_at",
    "doc_updated_by",
    "description",
  ] as const;

  const keys = Object.keys(frontmatter);
  const ordered: string[] = [];
  for (const k of preferredKeyOrder) if (k in frontmatter) ordered.push(k);
  const remaining = keys.filter((k) => !ordered.includes(k)).toSorted((a, b) => a.localeCompare(b));
  ordered.push(...remaining);

  const lines: string[] = [];
  for (const k of ordered) {
    lines.push(...renderValue(k, frontmatter[k]));
  }

  return `---\n${lines.join("\n")}\n---\n`;
}

export function renderTaskReadme(frontmatter: Record<string, unknown>, body: string): string {
  return `${renderTaskFrontmatter(frontmatter)}${body}`;
}
