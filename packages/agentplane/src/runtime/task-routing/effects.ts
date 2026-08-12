import type { TaskExternalEffect, TaskRepositoryEffect } from "@agentplaneorg/core/tasks";

export const ISOLATED_REPOSITORY_EFFECTS = new Set<TaskRepositoryEffect>([
  "public_api",
  "schema",
  "dependencies",
  "ci",
  "release_metadata",
  "security_boundary",
]);
export const ISOLATED_EXTERNAL_EFFECTS = new Set<TaskExternalEffect>([
  "external_write",
  "credentials",
  "publish",
  "deploy",
  "destructive_git",
]);
export const ALL_REPOSITORY_EFFECTS = [
  "repository_write",
  "documentation",
  "source_code",
  "tests",
  "public_api",
  "schema",
  "dependencies",
  "ci",
  "release_metadata",
  "security_boundary",
] as const satisfies readonly TaskRepositoryEffect[];
export const ALL_EXTERNAL_EFFECTS = [
  "network_read",
  "external_write",
  "credentials",
  "publish",
  "deploy",
  "destructive_git",
] as const satisfies readonly TaskExternalEffect[];
