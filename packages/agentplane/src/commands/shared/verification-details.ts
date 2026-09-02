export type VerificationCheckDetail = {
  checkId: string | null;
  command: string;
  result: "pass" | "fail";
  evidence: string;
  scope: string;
};

const REQUIRED_FIELDS = ["Command", "Result", "Evidence", "Scope"] as const;
type RequiredField = (typeof REQUIRED_FIELDS)[number];
type VerificationField = RequiredField | "Check";

// A label is structural only at a line boundary or after the terminal period
// used by the compatibility inline format. Plain label-shaped text inside a
// command or evidence value (for example `echo Scope: smoke`) stays data.
const FIELD_PATTERN =
  /(?:^|(?:\r?\n)[\t ]*|(?<=\.)[\t ]+)(Check|Command|Result|Evidence|Scope):[\t ]*/gu;

/**
 * Parses the durable, user-facing verification-details format once. Consumers
 * must not infer a passing check from prose that lacks its command, outcome,
 * evidence, or declared scope.
 */
export function parseVerificationCheckDetails(details: unknown): VerificationCheckDetail[] | null {
  if (typeof details !== "string" || !details.trim()) return null;
  const text = details.trim();
  const matches = [...text.matchAll(FIELD_PATTERN)];
  if (matches.length === 0) return null;

  const checks: Map<VerificationField, string>[] = [];
  let fields: Map<VerificationField, string> | null = null;
  for (const [index, match] of matches.entries()) {
    const field = match[1] as VerificationField;
    if (fields?.has(field)) {
      checks.push(fields);
      fields = new Map();
    }
    fields ??= new Map();
    const valueStart = (match.index ?? 0) + match[0].length;
    const valueEnd = matches[index + 1]?.index ?? text.length;
    const value = text.slice(valueStart, valueEnd).trim();
    if (!value) return null;
    fields.set(field, value);
  }
  if (fields) checks.push(fields);
  if (
    checks.length === 0 ||
    checks.some((check) => REQUIRED_FIELDS.some((field) => !check.get(field)))
  ) {
    return null;
  }

  const parsed: VerificationCheckDetail[] = [];
  for (const check of checks) {
    const resultField = check.get("Result") ?? "";
    const resultMatch = /^(pass|fail)(?:\.|\s*;\s*.+|\s+\(.+\)\.?)?$/u.exec(resultField);
    if (!resultMatch) return null;
    parsed.push({
      checkId: check.get("Check") ?? null,
      command: check.get("Command") ?? "",
      result: resultMatch[1] as "pass" | "fail",
      evidence: check.get("Evidence") ?? "",
      scope: check.get("Scope") ?? "",
    });
  }
  return parsed;
}
