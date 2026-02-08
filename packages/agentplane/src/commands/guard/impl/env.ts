export function buildGitCommitEnv(opts: {
  taskId: string;
  allowTasks: boolean;
  allowBase: boolean;
  allowPolicy: boolean;
  allowConfig: boolean;
  allowHooks: boolean;
  allowCI: boolean;
}): NodeJS.ProcessEnv {
  return {
    ...process.env,
    AGENTPLANE_TASK_ID: opts.taskId,
    AGENTPLANE_ALLOW_TASKS: opts.allowTasks ? "1" : "0",
    AGENTPLANE_ALLOW_BASE: opts.allowBase ? "1" : "0",
    AGENTPLANE_ALLOW_POLICY: opts.allowPolicy ? "1" : "0",
    AGENTPLANE_ALLOW_CONFIG: opts.allowConfig ? "1" : "0",
    AGENTPLANE_ALLOW_HOOKS: opts.allowHooks ? "1" : "0",
    AGENTPLANE_ALLOW_CI: opts.allowCI ? "1" : "0",
  };
}
