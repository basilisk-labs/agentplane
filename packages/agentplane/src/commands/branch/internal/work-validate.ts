import { CliError } from "../../../shared/errors.js";

export function validateWorkSlug(slug: string): void {
  const trimmed = slug.trim();
  if (!trimmed) {
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: "Invalid value for --slug." });
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(trimmed)) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Slug must be lowercase kebab-case (a-z, 0-9, hyphen).",
    });
  }
}

export function validateWorkAgent(agent: string): void {
  const trimmed = agent.trim();
  if (!trimmed) {
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: "Invalid value for --agent." });
  }
  if (!/^[A-Z0-9_]+$/.test(trimmed)) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Agent id must be uppercase letters, numbers, or underscores.",
    });
  }
}
