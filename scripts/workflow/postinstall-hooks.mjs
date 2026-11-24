// Root postinstall hook installer.
// Framework bootstrap installs AgentPlane-managed hook shims and treats lefthook hooks as
// legacy. A bare `lefthook install` on every `bun install` would overwrite those shims, so
// lefthook runs only when no AgentPlane-managed hook is present.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const AGENTPLANE_HOOK_MARKER = "agentplane-hook";
export const HOOK_NAMES = ["commit-msg", "pre-commit", "pre-push", "post-merge"];

export function resolveGitHooksDir(cwd) {
  try {
    const hooksPath = execFileSync("git", ["rev-parse", "--git-path", "hooks"], {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return hooksPath ? path.resolve(cwd, hooksPath) : null;
  } catch {
    return null;
  }
}

export function listAgentplaneManagedHooks(hooksDir) {
  return HOOK_NAMES.filter((hookName) => {
    try {
      return fs
        .readFileSync(path.join(hooksDir, hookName), "utf8")
        .includes(AGENTPLANE_HOOK_MARKER);
    } catch {
      return false;
    }
  });
}

export function decidePostinstallHooks(cwd) {
  const hooksDir = resolveGitHooksDir(cwd);
  if (!hooksDir) return { action: "skip", reason: "not_a_git_repository", managedHooks: [] };
  const managedHooks = listAgentplaneManagedHooks(hooksDir);
  if (managedHooks.length > 0) {
    return { action: "skip", reason: "agentplane_managed_hooks", managedHooks };
  }
  return { action: "lefthook_install", reason: "no_agentplane_managed_hooks", managedHooks };
}

export function runPostinstallHooks({
  cwd = process.cwd(),
  runLefthook = () => execFileSync("lefthook", ["install"], { cwd, stdio: "inherit" }),
  write = (text) => process.stdout.write(text),
} = {}) {
  const decision = decidePostinstallHooks(cwd);
  if (decision.action === "lefthook_install") {
    runLefthook();
  } else if (decision.reason === "agentplane_managed_hooks") {
    write(
      `postinstall: keeping AgentPlane-managed git hooks (${decision.managedHooks.join(", ")}); skipped lefthook install.\n`,
    );
  }
  return decision;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  runPostinstallHooks();
}
