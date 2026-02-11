export class BackendError extends Error {
  code: "E_BACKEND" | "E_NETWORK";
  constructor(message: string, code: "E_BACKEND" | "E_NETWORK") {
    super(message);
    this.code = code;
  }
}

export class RedmineUnavailable extends BackendError {
  constructor(message: string) {
    super(message, "E_NETWORK");
  }
}

export function redmineConfigMissingEnvMessage(keys: string[] | string): string {
  const list = Array.isArray(keys) ? keys : [keys];
  return `Missing required Redmine configuration env key(s): ${list.join(", ")}. Set them in environment variables (for example via .env).`;
}

export function redmineConfigInvalidEnvMessage(key: string, expected: string): string {
  return `Invalid Redmine configuration env value for ${key}. Expected ${expected}.`;
}

export function redmineIssueIdMissingMessage(): string {
  return "Missing Redmine issue id for task";
}
