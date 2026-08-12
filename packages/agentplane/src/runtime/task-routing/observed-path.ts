import type { TaskRepositoryEffect } from "@agentplaneorg/core/tasks";

export function structuralEffectsForPath(pathValue: string): TaskRepositoryEffect[] {
  const normalized = pathValue.trim().replaceAll("\\", "/").replace(/^\.\//u, "");
  if (!normalized || normalized.startsWith("../") || normalized.startsWith("/")) return [];
  const effects: TaskRepositoryEffect[] = ["repository_write"];
  if (
    normalized.startsWith("docs/") ||
    normalized === "README.md" ||
    normalized.endsWith(".md") ||
    normalized.endsWith(".mdx")
  ) {
    effects.push("documentation");
  }
  if (
    /(?:^|\/)(?:test|tests|__tests__)(?:\/|$)/u.test(normalized) ||
    /\.(?:spec|test)\.[cm]?[jt]sx?$/u.test(normalized)
  ) {
    effects.push("tests");
  } else if (/\.[cm]?[jt]sx?$/u.test(normalized)) {
    effects.push("source_code");
  }
  if (
    normalized.startsWith(".github/workflows/") ||
    normalized === ".gitlab-ci.yml" ||
    normalized.startsWith(".circleci/")
  ) {
    effects.push("ci");
  }
  if (
    /(^|\/)(?:package\.json|bun\.lockb?|pnpm-lock\.yaml|yarn\.lock|package-lock\.json)$/u.test(
      normalized,
    )
  ) {
    effects.push("dependencies");
  }
  if (
    normalized.startsWith("schemas/") ||
    normalized.includes("/schemas/") ||
    normalized.startsWith("migrations/") ||
    normalized.includes("/migrations/") ||
    normalized.endsWith(".schema.json")
  ) {
    effects.push("schema");
  }
  if (
    normalized === "CHANGELOG.md" ||
    normalized.startsWith(".changeset/") ||
    normalized.startsWith("changesets/")
  ) {
    effects.push("release_metadata");
  }
  if (/^packages\/[^/]+\/src\/index\.[cm]?[jt]sx?$/u.test(normalized)) {
    effects.push("public_api");
  }
  return effects;
}

export function componentForPath(pathValue: string): string {
  const normalized = pathValue.trim().replaceAll("\\", "/").replace(/^\.\//u, "");
  const segments = normalized.split("/").filter(Boolean);
  if (segments.length === 0) return "repository";
  if (segments[0] === "packages" && segments[1]) return `packages/${segments[1]}`;
  if (segments[0] === "apps" && segments[1]) return `apps/${segments[1]}`;
  return segments[0] ?? "repository";
}
