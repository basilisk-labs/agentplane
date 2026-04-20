import {
  BackendCliError,
  GitError,
  IoError,
  NetworkError,
  ValidationError,
} from "../shared/errors.js";
import type { CliError } from "../shared/errors.js";
import { BackendError } from "../backends/task-backend.js";

export function mapCoreError(err: unknown, context: Record<string, unknown>): CliError {
  const message = err instanceof Error ? err.message : String(err);

  if (
    message.startsWith("Not a git repository") ||
    message.startsWith("Detached HEAD") ||
    message.includes("failed to resolve current branch")
  ) {
    return new GitError({
      message,
      context,
    });
  }

  if (err instanceof SyntaxError) {
    return new ValidationError({
      message: `Invalid JSON: ${message}`,
      context,
    });
  }

  if (message.includes("schema_version") || message.startsWith("config.")) {
    return new ValidationError({
      message,
      context,
    });
  }

  return new IoError({ message, context });
}

export function mapBackendError(err: unknown, context: Record<string, unknown>): CliError {
  if (err instanceof BackendError) {
    if (err.code === "E_NETWORK") return new NetworkError({ message: err.message, context });
    return new BackendCliError({ message: err.message, context });
  }
  return mapCoreError(err, context);
}
