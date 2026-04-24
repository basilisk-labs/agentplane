import { stripAnsi } from "../../../shared/ansi.js";
import { withDiagnosticContext } from "../../shared/diagnostics.js";
import { CliError } from "../../../shared/errors.js";

type ExecFileLikeError = Error & {
  cmd?: unknown;
  escapedCommand?: unknown;
  shortMessage?: unknown;
  code?: unknown;
  stdout?: unknown;
  stderr?: unknown;
};

export type CommitFailurePhase = "task_commit" | "close_commit";
type CommitFailureSignal = "formatter" | "eslint" | null;

const COMMIT_FAILURE_SIGNAL_PATTERNS = [
  /Code style issues found/i,
  /Run Prettier with --write/i,
  /\bESLint\b/i,
  /\b[0-9]+\s+problems?\b/i,
  /\berror\b/i,
  /\bfailed\b/i,
  /✖/,
] as const;
const FORMATTER_SIGNAL_PATTERNS = [
  /Code style issues found/i,
  /Run Prettier with --write/i,
] as const;
const ESLINT_SIGNAL_PATTERNS = [/\bESLint\b/i, /\b[0-9]+\s+problems?\b/i] as const;

function readText(value: unknown): string {
  if (typeof value === "string") return value;
  if (Buffer.isBuffer(value)) return value.toString("utf8");
  return "";
}

function summarizeOutput(raw: string): string[] {
  const lines = raw
    .replaceAll("\r\n", "\n")
    .split("\n")
    .map((line) => stripAnsi(line).trimEnd())
    .filter((line) => line.trim().length > 0)
    .map((line) => (line.length > 180 ? `${line.slice(0, 180)} [truncated]` : line));

  if (lines.length <= 12) return lines;

  const selected = new Set<number>();
  for (let index = 0; index < Math.min(6, lines.length); index += 1) selected.add(index);
  for (let index = Math.max(lines.length - 6, 0); index < lines.length; index += 1) {
    selected.add(index);
  }
  for (const [index, line] of lines.entries()) {
    if (
      !selected.has(index) &&
      COMMIT_FAILURE_SIGNAL_PATTERNS.some((pattern) => pattern.test(line))
    ) {
      selected.add(index);
    }
  }

  const summary: string[] = [];
  let previous = -1;
  for (const index of [...selected].toSorted((a, b) => a - b)) {
    if (previous >= 0 && index - previous > 1) {
      summary.push(`[${index - previous - 1} lines omitted]`);
    }
    summary.push(lines[index] ?? "");
    previous = index;
  }
  return summary;
}

function detectCommitFailureSignal(output: string): CommitFailureSignal {
  if (FORMATTER_SIGNAL_PATTERNS.some((pattern) => pattern.test(output))) return "formatter";
  if (ESLINT_SIGNAL_PATTERNS.some((pattern) => pattern.test(output))) return "eslint";
  return null;
}

function commitFailureDiagnostic(
  phase: CommitFailurePhase,
  output: string,
): {
  state: string;
  likelyCause: string;
  nextAction?: {
    command: string;
    reason: string;
    reasonCode?: string;
  };
} {
  const signal = detectCommitFailureSignal(output);
  if (signal === "formatter") {
    return {
      state:
        phase === "close_commit"
          ? "git rejected the generated close commit"
          : "git rejected the requested task-scoped commit",
      likelyCause:
        phase === "close_commit"
          ? "a formatting check in the pre-commit path rejected the deterministic close commit after the task README was staged"
          : "a formatting check in the pre-commit path rejected the staged task-scoped commit",
      nextAction: {
        command: "bun run format",
        reason: "apply formatter fixes before retrying the commit flow",
        reasonCode: "git_pre_commit_format",
      },
    };
  }
  if (signal === "eslint") {
    return {
      state:
        phase === "close_commit"
          ? "git rejected the generated close commit"
          : "git rejected the requested task-scoped commit",
      likelyCause:
        phase === "close_commit"
          ? "a lint check in the pre-commit path rejected the deterministic close commit after the task README was staged"
          : "a lint check in the pre-commit path rejected the staged task-scoped commit",
      nextAction: {
        command: "bun run lint:core",
        reason: "rerun lint and fix the reported error before retrying the commit flow",
        reasonCode: "git_pre_commit_lint",
      },
    };
  }
  if (phase === "close_commit") {
    return {
      state: "git rejected the generated close commit",
      likelyCause:
        "a hook or commit policy blocked the deterministic task close commit after the task README was staged",
      nextAction: {
        command: "git status --short --untracked-files=no",
        reason: "inspect the staged close-commit payload before fixing the hook or policy failure",
        reasonCode: "git_close_commit_blocked",
      },
    };
  }
  return {
    state: "git rejected the requested task-scoped commit",
    likelyCause: "a hook or commit policy blocked the staged changes after guard validation passed",
    nextAction: {
      command: "git status --short --untracked-files=no",
      reason: "inspect the staged task-scoped payload before fixing the hook or policy failure",
      reasonCode: "git_task_commit_blocked",
    },
  };
}

export function asCommitFailure(err: unknown, phase: CommitFailurePhase): CliError | null {
  if (!(err instanceof Error)) return null;
  const e = err as ExecFileLikeError;
  const shortMessage = typeof e.shortMessage === "string" ? e.shortMessage : "";
  const message = typeof e.message === "string" ? e.message : "";
  const extractedCommand =
    typeof e.cmd === "string"
      ? e.cmd
      : typeof e.escapedCommand === "string"
        ? e.escapedCommand
        : (/^Command failed(?: with exit code \d+)?: ([^\n]+)$/m.exec(shortMessage)?.[1] ??
          /^Command failed(?: with exit code \d+)?: ([^\n]+)$/m.exec(message)?.[1] ??
          "");
  const cmd = extractedCommand.trim();
  if (!cmd.startsWith("git commit")) return null;

  const output = [readText(e.stderr), readText(e.stdout)]
    .filter((part) => part.length > 0)
    .join("\n");
  const summary = summarizeOutput(output);
  const code = typeof e.code === "number" ? e.code : null;
  const lines = ["git commit failed (hook or commit policy).", `command: ${cmd}`];
  if (typeof code === "number") lines.push(`exit_code: ${code}`);
  if (summary.length > 0) lines.push("output_summary:");
  lines.push(...summary.map((line) => `  ${line}`));

  return new CliError({
    exitCode: 5,
    code: "E_GIT",
    message: lines.join("\n"),
    context: withDiagnosticContext({ command: "commit" }, commitFailureDiagnostic(phase, output)),
  });
}
