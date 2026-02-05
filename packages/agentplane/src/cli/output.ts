export function successMessage(action: string, target?: string, details?: string): string {
  const base = target ? `${action} ${target}` : action;
  const suffix = details ? ` (${details})` : "";
  return `✅ ${base}${suffix}`;
}

export function infoMessage(message: string): string {
  return `ℹ️ ${message}`;
}

export function warnMessage(message: string): string {
  return `⚠️ ${message}`;
}

export function usageMessage(usage: string, example?: string): string {
  return example ? `${usage}\nExample: ${example}` : usage;
}

export function backendNotSupportedMessage(feature: string): string {
  return `Backend does not support ${feature}`;
}

export function missingValueMessage(flag: string): string {
  return `Missing value for ${flag} (expected value after flag)`;
}

export function invalidValueMessage(label: string, value: string, expected: string): string {
  return `Invalid ${label}: ${value} (expected ${expected})`;
}

export function invalidValueForFlag(flag: string, value: string, expected: string): string {
  return invalidValueMessage(`value for ${flag}`, value, expected);
}

export function unknownEntityMessage(entity: string, value: string): string {
  return `Unknown ${entity}: ${value}`;
}

export function emptyStateMessage(resource: string, hint?: string): string {
  return `No ${resource} found.${hint ? ` ${hint}` : ""}`;
}

export function requiredFieldMessage(field: string, source?: string): string {
  return `Missing required field: ${field}${source ? ` (${source})` : ""}`;
}

export function invalidFieldMessage(field: string, expected: string, source?: string): string {
  return `Invalid field ${field}: expected ${expected}${source ? ` (${source})` : ""}`;
}

export function invalidPathMessage(field: string, reason: string, source?: string): string {
  return `Invalid ${field}: ${reason}${source ? ` (${source})` : ""}`;
}

export function missingFileMessage(filename: string, rootHint?: string): string {
  return `Missing ${filename}${rootHint ? ` at ${rootHint}` : ""}`;
}

export function workflowModeMessage(actual: string | undefined, expected: string): string {
  return `Invalid workflow_mode: ${actual ?? "unknown"} (expected ${expected})`;
}
