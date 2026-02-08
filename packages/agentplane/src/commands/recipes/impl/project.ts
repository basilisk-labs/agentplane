import { resolveProject } from "@agentplaneorg/core";

function isNotGitRepoError(err: unknown): boolean {
  if (err instanceof Error) {
    return err.message.startsWith("Not a git repository");
  }
  return false;
}

export async function maybeResolveProject(opts: {
  cwd: string;
  rootOverride?: string;
}): Promise<{ gitRoot: string; agentplaneDir: string } | null> {
  try {
    return await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
  } catch (err) {
    if (isNotGitRepoError(err)) {
      if (opts.rootOverride) throw err;
      return null;
    }
    throw err;
  }
}
