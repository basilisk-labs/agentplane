import type { PrFlowStatusReport } from "./flow-status.js";

const MAX_HOSTED_CHECK_ROWS = 64;
const MAX_MISSING_REQUIRED_CHECKS = 32;

export type ConflictReworkChecks =
  | {
      checked: true;
      total: number;
      passing: number;
      pending: number;
      failing: number;
      missingRequired: {
        names: string[];
        total: number;
        truncated: boolean;
      };
      rows: {
        entries: { name: string; state: string }[];
        total: number;
        truncated: boolean;
      };
    }
  | { checked: false; reason: string };

function trimmed(value: string | null | undefined): string | null {
  const normalized = value?.trim() ?? "";
  return normalized.length > 0 ? normalized : null;
}

export function normalizeConflictReworkChecks(report: PrFlowStatusReport): ConflictReworkChecks {
  if (!report.hostedChecks.checked) {
    return { checked: false, reason: report.hostedChecks.reason };
  }
  const rows = report.hostedChecks.rows
    .map((row) => ({
      name: trimmed(row.name) ?? "<unnamed>",
      state: trimmed(row.state) ?? "UNKNOWN",
    }))
    .toSorted(
      (left, right) => left.name.localeCompare(right.name) || left.state.localeCompare(right.state),
    );
  const missingRequired = [
    ...new Set(report.hostedChecks.missingRequired.map((name) => trimmed(name) ?? "<unnamed>")),
  ].toSorted((left, right) => left.localeCompare(right));
  return {
    checked: true,
    total: report.hostedChecks.total,
    passing: report.hostedChecks.passing,
    pending: report.hostedChecks.pending,
    failing: report.hostedChecks.failing,
    missingRequired: {
      names: missingRequired.slice(0, MAX_MISSING_REQUIRED_CHECKS),
      total: missingRequired.length,
      truncated: missingRequired.length > MAX_MISSING_REQUIRED_CHECKS,
    },
    rows: {
      entries: rows.slice(0, MAX_HOSTED_CHECK_ROWS),
      total: rows.length,
      truncated: rows.length > MAX_HOSTED_CHECK_ROWS,
    },
  };
}
