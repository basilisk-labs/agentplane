import { normalizeGitPathPrefix } from "./git-path.js";

export function findRepoWideAllowPrefixes(prefixes: string[]): string[] {
  return prefixes.filter((prefix) => normalizeGitPathPrefix(prefix) === ".");
}

export function repoWideAllowPrefixMessage(flagName: string): string {
  return (
    `${flagName} cannot be repo-wide ('.'). ` +
    "Choose minimal path prefixes; tip: `agentplane guard suggest-allow --format args`."
  );
}
