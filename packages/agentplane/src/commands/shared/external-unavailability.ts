import { CliError } from "../../shared/errors.js";

const EXTERNAL_UNAVAILABLE_REASON_CODES = new Set([
  "github_pr_state_unavailable",
  "integration_queue_provider_unavailable",
]);

export function isExternalStateUnavailableError(err: unknown): err is CliError {
  if (!(err instanceof CliError)) return false;
  if (err.code === "E_NETWORK") return true;
  const reasonCode = err.context?.reason_code;
  return typeof reasonCode === "string" && EXTERNAL_UNAVAILABLE_REASON_CODES.has(reasonCode);
}
