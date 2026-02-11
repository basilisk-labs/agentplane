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

export function redmineConfigMissingMessage(detail: string): string {
  return `Missing required Redmine configuration. Set ${detail} in environment variables (for example via .env).`;
}

export function redmineIssueIdMissingMessage(): string {
  return "Missing Redmine issue id for task";
}
