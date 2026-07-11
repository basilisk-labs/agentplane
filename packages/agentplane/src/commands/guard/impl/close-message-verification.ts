import type { TaskData } from "../../../backends/task-backend.js";

function uniqInOrder(values: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of values) {
    if (seen.has(value)) continue;
    seen.add(value);
    out.push(value);
  }
  return out;
}

function splitVerificationText(value: string): string[] {
  const withoutPrefix = value
    .replaceAll(/^Verified:\s*/giu, "")
    .replaceAll(/^Verify:\s*/giu, "")
    .trim();
  const commandMatches = [...withoutPrefix.matchAll(/\bCommand:\s*(.+?)\s*;\s*Result:\s*pass\b/giu)]
    .map((match) => match[1]?.trim() ?? "")
    .filter(Boolean);
  if (commandMatches.length > 0) return commandMatches;

  const colon = /\b(?:passed|checks passed|commands passed):\s*(.+)$/iu.exec(withoutPrefix)?.[1];
  const source = colon ?? withoutPrefix;
  return source
    .split(/[;,]/u)
    .map((part) => part.trim())
    .filter(Boolean);
}

function normalizeCheckLabel(value: string): string {
  const text = value
    .trim()
    .replaceAll(/\s+/g, " ")
    .replace(/^and\s+/iu, "")
    .replaceAll(/\bResult:\s*pass(?:ed)?\.?/giu, "")
    .replaceAll(/\bEvidence:\s*/giu, "")
    .replaceAll(/\bScope:\s*[^.]+\.?/giu, "")
    .replace(/\s+(?:pass|passed)\.?$/iu, "")
    .replace(/\s+(?:pass|passed)\s+locally\.?$/iu, "")
    .trim()
    .replaceAll(/\s+/g, " ");
  const lower = text.toLowerCase();
  if (lower === "typecheck" || lower === "type check") return "Typecheck";
  if (lower === "lint") return "Lint";
  if (lower === "release:build" || lower === "release build") return "Release build";
  if (lower === "docs generation" || lower === "doc generation") return "Docs generation";
  if (lower === "release parity") return "Release parity checks";
  if (lower === "local and hosted readiness checks") return "Local and hosted readiness checks";
  return `${text[0]?.toUpperCase() ?? ""}${text.slice(1)}`;
}

export function normalizeVerification(checks: string[] | undefined): string[] {
  const expanded = (checks ?? []).flatMap((check) => splitVerificationText(check));
  return uniqInOrder(
    expanded
      .map((check) => normalizeCheckLabel(check).replace(/\s+passed$/iu, ""))
      .filter(Boolean)
      .map((check) => {
        const lower = check.toLowerCase();
        if (lower.startsWith("not required")) return `${check}.`;
        if (lower.startsWith("ok ")) return `${check}.`;
        if (lower === "pending" || lower === "needs_rework" || lower === "blocked_external") {
          return `${check}.`;
        }
        return `${check} passed.`;
      }),
  );
}

export function buildVerificationInput(task: TaskData, isSpike: boolean): string[] {
  if (isSpike) return ["not required (spike)"];
  const state = task.verification?.state ?? "pending";
  const note = typeof task.verification?.note === "string" ? task.verification.note : "";
  if (state === "ok" && note.trim()) return [note];
  const cmds = Array.isArray(task.verify)
    ? task.verify.filter((c) => typeof c === "string" && c.trim())
    : [];
  if (cmds.length > 0) return cmds;
  if (state === "ok") return ["ok (see task verification note)"];
  return [String(state)];
}
