import path from "node:path";

import { CliError } from "../../shared/errors.js";

import type { ContextInitParsed } from "./context.spec.js";

export const POLICY_FILES = new Set([
  ".agentplane/context/policies/context.rules.md",
  ".agentplane/context/policies/wiki.rules.md",
  ".agentplane/context/policies/capability.rules.md",
  ".agentplane/context/policies/redaction.rules.yaml",
  ".agentplane/context/policies/sync.rules.yaml",
]);

const PROFILE_MANAGED_FILES = new Set([
  "context/README.md",
  "context/wiki/AGENTS.md",
  "context/capabilities/README.md",
  ".agentplane/context/agentplane.context.yaml",
]);

export async function assertProfileSwitchIsExplicit(opts: {
  root: string;
  parsed: ContextInitParsed;
  readExisting: (path: string) => Promise<string | null>;
}): Promise<void> {
  if (opts.parsed.profileProvided !== true || opts.parsed.force === true) return;
  const manifestPath = path.join(opts.root, ".agentplane/context/agentplane.context.yaml");
  const existing = await opts.readExisting(manifestPath);
  if (!existing) return;
  const mode = existing.match(/^\s*mode:\s*([^\s#]+)/mu)?.[1]?.trim();
  if (!mode || mode === opts.parsed.profile) return;
  throw new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message: [
      `context workspace is already initialized with profile ${mode}; requested ${opts.parsed.profile}.`,
      "Profile switches are explicit rewrites of generated context scaffold files.",
      `Fix: rerun with \`agentplane context init --profile ${opts.parsed.profile} --force\`, or keep the current profile and omit --profile.`,
    ].join("\n"),
  });
}

export function shouldRewriteExistingContextFile(
  file: { relative: string; policy?: boolean },
  parsed: ContextInitParsed,
): boolean {
  if (parsed.force !== true) return false;
  if (parsed.profileProvided === true && PROFILE_MANAGED_FILES.has(file.relative)) return true;
  return parsed.repair === true && file.policy === true && POLICY_FILES.has(file.relative);
}
