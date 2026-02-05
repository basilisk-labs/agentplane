import { exitCodeForError } from "./exit-codes.js";
import { CliError } from "../errors.js";
import { BackendError } from "../task-backend.js";

export function mapCoreError(err: unknown, context: Record<string, unknown>): CliError {
  const message = err instanceof Error ? err.message : String(err);

  if (message.startsWith("Not a git repository")) {
    return new CliError({
      exitCode: exitCodeForError("E_GIT"),
      code: "E_GIT",
      message,
      context,
    });
  }

  if (err instanceof SyntaxError) {
    return new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Invalid JSON: ${message}`,
      context,
    });
  }

  if (message.includes("schema_version") || message.startsWith("config.")) {
    return new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message,
      context,
    });
  }

  return new CliError({ exitCode: exitCodeForError("E_IO"), code: "E_IO", message, context });
}

export function mapBackendError(err: unknown, context: Record<string, unknown>): CliError {
  if (err instanceof BackendError) {
    return new CliError({
      exitCode: exitCodeForError(err.code),
      code: err.code,
      message: err.message,
      context,
    });
  }
  return mapCoreError(err, context);
}
