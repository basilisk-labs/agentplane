import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

export type InsightsFailure = {
  error_code: string | null;
  command_id: string | null;
  command_group: string | null;
  phase: string | null;
  reason_code: string | null;
  message_class: string | null;
  argv_shape: string[];
  dedupe_signature: string;
};

export type FailureContextInput = {
  errorCode?: string;
  commandId?: string;
  phase?: string;
  reasonCode?: string;
  messageClass?: string;
  argvShape?: string[];
};

function cleanToken(value: string | undefined, maxLength = 80): string | null {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return null;
  return trimmed
    .replaceAll(/\/Users\/[^\s"'`]+/g, "<absolute-path>")
    .replaceAll(/[A-Za-z]:\\[^\s"'`]+/g, "<absolute-path>")
    .replaceAll(/\s+/g, " ")
    .slice(0, maxLength);
}

function cleanArgvShape(tokens: readonly string[] | undefined): string[] {
  return (tokens ?? [])
    .flatMap((token) => {
      const cleaned = cleanToken(token, 80);
      return cleaned ? [cleaned] : [];
    })
    .slice(0, 24);
}

export function buildFailureContext(input: FailureContextInput | undefined): InsightsFailure {
  const commandId = cleanToken(input?.commandId);
  const failure = {
    error_code: cleanToken(input?.errorCode, 40),
    command_id: commandId,
    command_group: commandId ? commandId.split(" ")[0] : null,
    phase: cleanToken(input?.phase, 60),
    reason_code: cleanToken(input?.reasonCode, 80),
    message_class: cleanToken(input?.messageClass, 80),
    argv_shape: cleanArgvShape(input?.argvShape),
  };
  const signatureInput = JSON.stringify(failure);
  return {
    ...failure,
    dedupe_signature: `sha256:${createHash("sha256").update(signatureInput).digest("hex")}`,
  };
}

function trimOptional(value: string | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  return trimmed || null;
}

export async function resolveAgentContext(opts: {
  inline: string | undefined;
  file: string | undefined;
  root: string;
}): Promise<string | null> {
  const inline = trimOptional(opts.inline);
  if (inline) return inline;
  const file = trimOptional(opts.file);
  if (!file) return null;
  const absolutePath = path.isAbsolute(file) ? file : path.join(opts.root, file);
  return trimOptional(await readFile(absolutePath, "utf8"));
}

export function renderAgentContext(context: string | null): string[] {
  if (!context) {
    return [
      "## Agent context",
      "Not provided. Re-run with `--agent-context` or `--agent-context-file` for actionable triage.",
    ];
  }
  return ["## Agent context", context];
}
