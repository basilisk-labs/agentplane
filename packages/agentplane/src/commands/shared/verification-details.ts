export type VerificationCheckDetail = {
  command: string;
  result: "pass" | "fail";
  evidence: string;
  scope: string;
};

const REQUIRED_FIELDS = ["Command", "Result", "Evidence", "Scope"] as const;

/**
 * Parses the durable, user-facing verification-details format once. Consumers
 * must not infer a passing check from prose that lacks its command, outcome,
 * evidence, or declared scope.
 */
export function parseVerificationCheckDetails(details: unknown): VerificationCheckDetail[] | null {
  if (typeof details !== "string" || !details.trim()) return null;
  const checks = details.trim().split(/\n\s*\n/gu);
  const parsed = checks.map((check) => {
    const fields = new Map(
      check.split("\n").map((line) => {
        const [field, ...value] = line.split(":");
        return [field?.trim(), value.join(":").trim()] as const;
      }),
    );
    if (REQUIRED_FIELDS.some((field) => !fields.get(field))) return null;
    const result = fields.get("Result");
    if (result !== "pass" && result !== "fail") return null;
    return {
      command: fields.get("Command") ?? "",
      result,
      evidence: fields.get("Evidence") ?? "",
      scope: fields.get("Scope") ?? "",
    } satisfies VerificationCheckDetail;
  });
  return parsed.every((check): check is VerificationCheckDetail => check !== null) ? parsed : null;
}
