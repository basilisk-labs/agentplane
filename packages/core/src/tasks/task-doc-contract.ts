export type TaskDocVersion = 2 | 3;
export type TaskDocSections = Record<string, string>;

export const DEFAULT_TASK_DOC_VERSION: TaskDocVersion = 3;

export const TASK_DOC_SECTION_ORDER = [
  "Summary",
  "Scope",
  "Plan",
  "Risks",
  "Verify Steps",
  "Verification",
  "Rollback Plan",
  "Notes",
  "Findings",
] as const;

export type TaskDocContract = {
  version: TaskDocVersion;
  sections: readonly string[];
};

const ISO_UTC_TIMESTAMP_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/;

export const TASK_DOC_CONTRACTS: Record<TaskDocVersion, TaskDocContract> = {
  2: {
    version: 2,
    sections: ["Summary", "Scope", "Plan", "Risks", "Verify Steps", "Rollback Plan", "Notes"],
  },
  3: {
    version: 3,
    sections: [
      "Summary",
      "Scope",
      "Plan",
      "Verify Steps",
      "Verification",
      "Rollback Plan",
      "Findings",
    ],
  },
};

export function normalizeTaskDocVersion(
  value: unknown,
  fallback: TaskDocVersion = DEFAULT_TASK_DOC_VERSION,
): TaskDocVersion {
  if (value === 3 || value === "3") return 3;
  if (value === 2 || value === "2") return 2;
  return fallback;
}

export function getTaskDocContract(version: unknown): TaskDocContract {
  return TASK_DOC_CONTRACTS[normalizeTaskDocVersion(version)];
}

export function buildDefaultTaskDoc(version: unknown = DEFAULT_TASK_DOC_VERSION): string {
  const contract = getTaskDocContract(version);
  const lines: string[] = [];
  for (const section of contract.sections) {
    lines.push(`## ${section}`, "");

    if (section === "Verify Steps") {
      lines.push(
        "<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->",
        "",
        "1. <Action>. Expected: <observable result>.",
        "2. <Action>. Expected: <observable result>.",
        "3. <Action>. Expected: <observable result>.",
      );
    } else if (section === "Verification") {
      lines.push("<!-- BEGIN VERIFICATION RESULTS -->", "<!-- END VERIFICATION RESULTS -->");
    }

    lines.push("");
  }
  return lines.join("\n");
}

export function isIsoUtcTimestamp(value: unknown): value is string {
  if (typeof value !== "string" || !ISO_UTC_TIMESTAMP_RE.test(value)) return false;
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return false;
  const canonical = value.includes(".") ? value : value.replace(/Z$/, ".000Z");
  return new Date(parsed).toISOString() === canonical;
}

export function validateTaskDocMetadata(frontmatter: Record<string, unknown>): string[] {
  const errors: string[] = [];

  const version = frontmatter.doc_version;
  if (version !== 2 && version !== 3 && version !== "2" && version !== "3") {
    errors.push("doc_version must be 2 or 3");
  }

  const updatedAt = frontmatter.doc_updated_at;
  if (!isIsoUtcTimestamp(updatedAt)) {
    errors.push("doc_updated_at must be an ISO timestamp");
  }

  const updatedBy = frontmatter.doc_updated_by;
  if (typeof updatedBy !== "string" || updatedBy.trim().length === 0) {
    errors.push("doc_updated_by must be a non-empty string");
  }

  return errors;
}
