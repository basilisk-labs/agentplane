import fs from "node:fs/promises";
import path from "node:path";

export function sanitizeWorkspaceKey(raw: string): string {
  const normalized = raw.trim();
  if (normalized.length === 0) return "issue";
  return normalized.replaceAll(/[^a-zA-Z0-9._-]/g, "_");
}

export function resolveWorkspacePath(root: string, key: string): string {
  return path.join(path.resolve(root), sanitizeWorkspaceKey(key));
}

export async function validateWorkspacePathInvariants(opts: {
  root: string;
  workspacePath: string;
}): Promise<
  | { ok: true }
  | {
      ok: false;
      code:
        | "WORKSPACE_EQUALS_ROOT"
        | "WORKSPACE_OUTSIDE_ROOT"
        | "WORKSPACE_SYMLINK_ESCAPE"
        | "WORKSPACE_PATH_UNREADABLE";
      path: string;
      message: string;
    }
> {
  const root = path.resolve(opts.root);
  const workspace = path.resolve(opts.workspacePath);
  const rootPrefix = `${root}${path.sep}`;

  if (workspace === root) {
    return {
      ok: false,
      code: "WORKSPACE_EQUALS_ROOT",
      path: workspace,
      message: "Workspace path must not equal workspace root.",
    };
  }

  if (!(workspace === root || workspace.startsWith(rootPrefix))) {
    return {
      ok: false,
      code: "WORKSPACE_OUTSIDE_ROOT",
      path: workspace,
      message: "Workspace path escapes configured workspace root.",
    };
  }

  const relative = path.relative(root, workspace);
  const segments = relative.split(path.sep).filter((s) => s.length > 0);
  let cursor = root;
  for (const segment of segments) {
    cursor = path.join(cursor, segment);
    try {
      const stat = await fs.lstat(cursor);
      if (stat.isSymbolicLink()) {
        return {
          ok: false,
          code: "WORKSPACE_SYMLINK_ESCAPE",
          path: cursor,
          message: "Workspace path contains a symlink component.",
        };
      }
    } catch (error) {
      const err = error as NodeJS.ErrnoException;
      if (err.code === "ENOENT") {
        return { ok: true };
      }
      return {
        ok: false,
        code: "WORKSPACE_PATH_UNREADABLE",
        path: cursor,
        message: `Workspace path cannot be validated: ${err.message}`,
      };
    }
  }

  return { ok: true };
}
