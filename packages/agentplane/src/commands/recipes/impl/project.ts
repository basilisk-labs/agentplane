import { resolveProject } from "@agentplaneorg/core";

function isNoProjectError(err: unknown): boolean {
  if (err instanceof Error) {
    return (
      err.message.startsWith("Not an agentplane project") ||
      err.message.startsWith("Not a git repository") ||
      err.message.startsWith("Agentplane project root is not a git repository")
    );
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
    if (isNoProjectError(err)) {
      if (opts.rootOverride) throw err;
      return null;
    }
    throw err;
  }
}
