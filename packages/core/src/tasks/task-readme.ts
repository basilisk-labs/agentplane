import { parse as parseYaml } from "yaml";
import { getTaskDocContract, TASK_DOC_SECTION_ORDER } from "./task-doc-contract.js";
import { parseDocSections, renderTaskDocFromSections } from "./task-doc.js";

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function normalizeCanonicalSections(
  value: unknown,
  docVersion: unknown = 3,
): Record<string, string> | null {
  if (!isRecord(value)) return null;
  const allowedSections = new Set(getTaskDocContract(docVersion).sections);
  const out: Record<string, string> = {};
  for (const [title, text] of Object.entries(value)) {
    const normalizedTitle = title.trim();
    if (!normalizedTitle || typeof text !== "string") continue;
    if (!allowedSections.has(normalizedTitle)) continue;
    out[normalizedTitle] = text.replaceAll("\r\n", "\n").trimEnd();
  }
  return Object.keys(out).length > 0 ? out : null;
}

function frontmatterForRender(frontmatter: Record<string, unknown>): Record<string, unknown> {
  const sections = normalizeCanonicalSections(frontmatter.sections, frontmatter.doc_version);
  if (!sections) return frontmatter;
  return { ...frontmatter, sections };
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
  if (value === undefined) return "null";
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "true" : "false";
  throw new TypeError(`Unsupported scalar type: ${typeof value}`);
}

const MULTILINE_FRIENDLY_KEYS = new Set([
  "description",
  "body",
  "note",
  "message",
  "result_summary",
]);

function shouldDecodeEscapedNewlines(value: string): boolean {
  const escapedDoubleNewline =
    value.includes(String.raw`\n\n`) || value.includes(String.raw`\r\n\r\n`);
  const escapedNewlineMatches = value.match(/\\n/g) ?? [];
  return escapedDoubleNewline || escapedNewlineMatches.length >= 2;
}

function normalizeReadableMultilineString(key: string, value: string): string {
  let next = value.replaceAll("\r\n", "\n");
  if (MULTILINE_FRIENDLY_KEYS.has(key) && shouldDecodeEscapedNewlines(next)) {
    next = next.replaceAll(String.raw`\r\n`, "\n").replaceAll(String.raw`\n`, "\n");
  }
  return next;
}

function renderBlockScalar(key: string, value: string, indent: string): string[] {
  const normalized = normalizeReadableMultilineString(key, value);
  const lines = normalized.split("\n");
  return [`${indent}${key}: |-`, ...lines.map((line) => `${indent}  ${line}`)];
}

function renderFlowSeq(value: unknown[]): string {
  const parts = value
    .filter((v) => v !== undefined)
    .map((v) => {
      if (Array.isArray(v)) return renderFlowSeq(v);
      if (isRecord(v))
        return `{ ${orderedKeys(v, null)
          .filter((k) => v[k] !== undefined)
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
    if (v === undefined) continue;
    lines.push(...renderValueLines(k, v, indent));
  }
  return lines;
}

function isStringArray(value: unknown[]): value is string[] {
  return value.every((v) => typeof v === "string");
}

function renderValueLines(key: string, value: unknown, indent: string): string[] {
  if (value === undefined) return [];
  if (typeof value === "string") {
    const normalized = normalizeReadableMultilineString(key, value);
    if (normalized.includes("\n")) return renderBlockScalar(key, normalized, indent);
    return [`${indent}${key}: ${renderScalar(normalized)}`];
  }

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
        const preferred =
          key === "comments"
            ? (["author", "body"] as const)
            : key === "events"
              ? (["type", "at", "author", "from", "to", "state", "note", "body"] as const)
              : null;
        const itemLines = renderMapLines(item, `${indent}    `, preferred);
        if (itemLines.length === 0) return [`${indent}  - {}`];
        return [`${indent}  -`, ...itemLines];
      }),
    ];
  }

  if (isRecord(value)) {
    const preferred =
      key === "origin"
        ? ([
            "system",
            "issue_id",
            "url",
            "recipe_id",
            "scenario_id",
            "recipe_version",
            "run_id",
          ] as const)
        : key === "plan_approval"
          ? (["state", "updated_at", "updated_by", "note"] as const)
          : key === "verification"
            ? (["state", "updated_at", "updated_by", "note"] as const)
            : key === "runner"
              ? ([
                  "run_id",
                  "status",
                  "adapter_id",
                  "mode",
                  "updated_at",
                  "started_at",
                  "ended_at",
                  "exit_code",
                  "target",
                  "summary",
                  "output_paths",
                  "stdout_summary",
                  "stderr_summary",
                  "metrics",
                ] as const)
              : key === "target"
                ? (["kind", "task_id", "recipe_id", "scenario_id"] as const)
                : key === "metrics"
                  ? ([
                      "duration_ms",
                      "stdout_bytes",
                      "stderr_bytes",
                      "output_last_message_bytes",
                    ] as const)
                  : key === "commit"
                    ? (["hash", "message"] as const)
                    : key === "sections"
                      ? TASK_DOC_SECTION_ORDER
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
    "result_summary",
    "risk_level",
    "breaking",
    "status",
    "priority",
    "owner",
    "revision",
    "created_at",
    "created_by",
    "origin",
    "depends_on",
    "tags",
    "verify",
    "plan_approval",
    "verification",
    "runner",
    "commit",
    "comments",
    "events",
    "doc_version",
    "doc_updated_at",
    "doc_updated_by",
    "description",
    "sections",
    "id_source",
    "dirty",
  ] as const;

  const ordered = orderedKeys(frontmatter, preferredKeyOrder);

  const lines: string[] = [];
  for (const k of ordered) {
    const value = frontmatter[k];
    if (value === undefined) continue;
    lines.push(...renderValueLines(k, value, ""));
  }

  return `---\n${lines.join("\n")}\n---\n`;
}

function escapeRegExp(value: string): string {
  return value.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
}

function normalizeMarkdownBody(value: string): string {
  return value.replaceAll("\r\n", "\n").trim();
}

function containsCanonicalTaskDocHeading(body: string): boolean {
  return TASK_DOC_SECTION_ORDER.some((title) => {
    const escaped = escapeRegExp(title);
    return new RegExp(String.raw`^##\s+${escaped}\s*$`, "imu").test(body);
  });
}

function isCanonicalTaskDocSection(title: string): boolean {
  return (TASK_DOC_SECTION_ORDER as readonly string[]).includes(title);
}

function canonicalSectionsFromBody(body: string, docVersion: unknown): Record<string, string> {
  const allowedSections = new Set(getTaskDocContract(docVersion).sections);
  const parsed = parseDocSections(body);
  const out: Record<string, string> = {};
  for (const key of parsed.order) {
    const section = parsed.sections.get(key);
    if (!section || !allowedSections.has(section.title)) continue;
    out[section.title] = section.lines.join("\n").trimEnd();
  }
  return out;
}

function mergeCanonicalSectionsWithBody(
  canonicalSections: Record<string, string>,
  body: string,
  docVersion: unknown,
): Record<string, string> {
  const bodySections = canonicalSectionsFromBody(body, docVersion);
  if (Object.keys(bodySections).length === 0) return canonicalSections;
  return { ...bodySections, ...canonicalSections };
}

function renderNonCanonicalContext(body: string): string {
  const lines: string[] = [];
  let skipCanonicalSection = false;

  for (const line of body.replaceAll("\r\n", "\n").split("\n")) {
    const match = /^##\s+(.*)$/.exec(line.trim());
    if (match) {
      const title = match[1]?.trim() ?? "";
      skipCanonicalSection = isCanonicalTaskDocSection(title);
      if (skipCanonicalSection) continue;
    }

    if (skipCanonicalSection) continue;
    lines.push(line);
  }

  return lines.join("\n").trim();
}

export function taskReadmeDocBody(frontmatter: Record<string, unknown>, body: string): string {
  const canonicalSections = normalizeCanonicalSections(
    frontmatter.sections,
    frontmatter.doc_version,
  );
  return canonicalSections
    ? renderTaskDocFromSections(
        mergeCanonicalSectionsWithBody(canonicalSections, body, frontmatter.doc_version),
      )
    : body;
}

function renderContextualBody(frontmatter: Record<string, unknown>, body: string): string {
  const canonicalSections = normalizeCanonicalSections(
    frontmatter.sections,
    frontmatter.doc_version,
  );
  if (!canonicalSections) return body;

  const normalizedBody = normalizeMarkdownBody(body);
  if (!normalizedBody) return "";

  const renderedCanonicalBody = normalizeMarkdownBody(
    renderTaskDocFromSections(
      mergeCanonicalSectionsWithBody(canonicalSections, body, frontmatter.doc_version),
    ),
  );
  if (normalizedBody === renderedCanonicalBody) return "";

  if (containsCanonicalTaskDocHeading(body)) return renderNonCanonicalContext(body);
  return body;
}

export function renderTaskReadme(frontmatter: Record<string, unknown>, body: string): string {
  const renderedFrontmatter = frontmatterForRender(frontmatter);
  return `${renderTaskFrontmatter(renderedFrontmatter)}${renderContextualBody(frontmatter, body)}`;
}
