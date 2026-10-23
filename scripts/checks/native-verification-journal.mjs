import { createHash } from "node:crypto";

const JOURNAL_PATH =
  /^(\.agentplane\/tasks\/[^/]+\/supervision\/verification-runs\/(?:run-\d+)(?:\/children\/run-\d+)*)\/(stdout|stderr|failures)\.jsonl$/u;
const RUN_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/u;
const SHA256 = /^sha256:[0-9a-f]{64}$/u;
const BINDINGS = new Set(["declared_check", "verification_group", "vitest_failures"]);
const TERMINAL_STATES = new Set(["passed", "failed", "timed_out"]);

function parseObject(bytes) {
  const value = JSON.parse(bytes.toString("utf8"));
  return value && typeof value === "object" && !Array.isArray(value) ? value : null;
}

export function isNativeVerificationJournal(filePath, read) {
  const match = JOURNAL_PATH.exec(filePath);
  if (!match) return false;
  const [, runDir, stream] = match;
  try {
    const status = parseObject(read(`${runDir}/status.json`));
    const binding = status?.binding;
    if (
      status?.schema_version !== 1 ||
      !RUN_ID.test(status.run_id) ||
      !BINDINGS.has(binding?.kind) ||
      !["running", ...TERMINAL_STATES].includes(status.state) ||
      typeof status.success !== "boolean" ||
      (status.state === "passed") !== status.success ||
      !Number.isSafeInteger(status.started_at_ms) ||
      !Number.isSafeInteger(status.updated_at_ms) ||
      status.updated_at_ms < status.started_at_ms ||
      !Number.isSafeInteger(status.last_activity_at_ms) ||
      status.last_activity_at_ms < status.started_at_ms ||
      !Number.isSafeInteger(status.elapsed_ms) ||
      status.elapsed_ms < 0 ||
      !Number.isSafeInteger(status.deadline_ms) ||
      !Number.isSafeInteger(status.pid) ||
      status.pid <= 0 ||
      typeof binding.command !== "string" ||
      binding.command.length === 0 ||
      binding.deadline_ms !== status.deadline_ms ||
      !SHA256.test(binding.command_digest) ||
      typeof binding.command_text_truncated !== "boolean" ||
      !binding.runtime ||
      typeof binding.runtime !== "object"
    )
      return false;

    const parentDir = runDir.replace(/\/children\/run-\d+$/u, "");
    if (parentDir === runDir) {
      if (binding.kind !== "declared_check" || binding.parent_run_id !== undefined) return false;
    } else {
      const parent = parseObject(read(`${parentDir}/status.json`));
      if (
        !RUN_ID.test(binding.parent_run_id) ||
        parent?.schema_version !== 1 ||
        parent.run_id !== binding.parent_run_id
      )
        return false;
    }

    const journal = read(filePath);
    for (const line of journal.toString("utf8").split(/\r?\n/u)) {
      if (line) JSON.parse(line);
    }

    if (status.state === "running") return true;
    const manifest = parseObject(read(`${runDir}/manifest.json`));
    if (
      manifest?.schema_version !== 1 ||
      manifest.run_id !== status.run_id ||
      manifest.binding?.kind !== status.binding.kind ||
      manifest.state !== status.state ||
      !Array.isArray(manifest.files)
    )
      return false;
    const entry = manifest.files.find((item) => item.path === `${stream}.jsonl`);
    const digest = `sha256:${createHash("sha256").update(journal).digest("hex")}`;
    return entry?.bytes === journal.length && entry.digest === digest;
  } catch {
    return false;
  }
}
