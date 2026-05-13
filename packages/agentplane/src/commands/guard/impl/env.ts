import { execFileAsync } from "@agentplaneorg/core/process";

export type CanonicalGitIdentity = {
  name: string;
  email: string;
};

let canonicalGitIdentityPromise: Promise<CanonicalGitIdentity | null> | null = null;

async function readGitConfigValue(key: "user.name" | "user.email"): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("git", ["config", "--global", "--get", key], {
      cwd: process.cwd(),
      env: process.env,
    });
    const trimmed = stdout.trim();
    return trimmed.length > 0 ? trimmed : null;
  } catch {
    return null;
  }
}

export async function resolveCanonicalGitIdentity(): Promise<CanonicalGitIdentity | null> {
  canonicalGitIdentityPromise ??= (async () => {
    const globalName = await readGitConfigValue("user.name");
    const globalEmail = await readGitConfigValue("user.email");
    const name =
      globalName ??
      process.env.GIT_AUTHOR_NAME?.trim() ??
      process.env.GIT_COMMITTER_NAME?.trim() ??
      null;
    const email =
      globalEmail ??
      process.env.GIT_AUTHOR_EMAIL?.trim() ??
      process.env.GIT_COMMITTER_EMAIL?.trim() ??
      null;
    if (!name || !email) return null;
    return { name, email };
  })();
  return await canonicalGitIdentityPromise;
}

export function buildGitCommitEnv(opts: {
  taskId: string;
  agentId?: string;
  statusTo?: string;
  allowTasks: boolean;
  allowBase: boolean;
  allowPolicy: boolean;
  allowConfig: boolean;
  allowHooks: boolean;
  allowCI: boolean;
  allowStaleDist?: boolean;
  allowHumanTaskSubject?: boolean;
  gitIdentity?: CanonicalGitIdentity | null;
}): NodeJS.ProcessEnv {
  return {
    ...process.env,
    ...(opts.gitIdentity
      ? {
          GIT_AUTHOR_NAME: opts.gitIdentity.name,
          GIT_AUTHOR_EMAIL: opts.gitIdentity.email,
          GIT_COMMITTER_NAME: opts.gitIdentity.name,
          GIT_COMMITTER_EMAIL: opts.gitIdentity.email,
        }
      : null),
    AGENTPLANE_TASK_ID: opts.taskId,
    ...(opts.agentId ? { AGENTPLANE_AGENT_ID: opts.agentId } : null),
    ...(opts.statusTo ? { AGENTPLANE_STATUS_TO: opts.statusTo } : null),
    AGENTPLANE_ALLOW_TASKS: opts.allowTasks ? "1" : "0",
    AGENTPLANE_ALLOW_BASE: opts.allowBase ? "1" : "0",
    AGENTPLANE_ALLOW_POLICY: opts.allowPolicy ? "1" : "0",
    AGENTPLANE_ALLOW_CONFIG: opts.allowConfig ? "1" : "0",
    AGENTPLANE_ALLOW_HOOKS: opts.allowHooks ? "1" : "0",
    AGENTPLANE_ALLOW_CI: opts.allowCI ? "1" : "0",
    ...(opts.allowStaleDist ? { AGENTPLANE_DEV_ALLOW_STALE_DIST: "1" } : null),
    ...(opts.allowHumanTaskSubject ? { AGENTPLANE_ALLOW_HUMAN_TASK_SUBJECT: "1" } : null),
  };
}
