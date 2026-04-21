import type { InitV2ClackPrompts } from "../prompts-v2.js";

type InitV2ApplySpinner = {
  start: (message: string) => void;
  stop: (message?: string) => void;
  message?: (message: string) => void;
};

type InitV2ApplyClack = Pick<InitV2ClackPrompts, "spinner">;

type InitV2ApplyStepWriter = () => Promise<void | readonly string[]>;

type InitV2ApplyInstallCommitWriter = (installPaths: readonly string[]) => Promise<void>;

type InitV2ApplyPlan = {
  config: InitV2ApplyStepWriter;
  agents: InitV2ApplyStepWriter;
  workflow: InitV2ApplyStepWriter;
  gitignore: InitV2ApplyStepWriter;
  hooks?: InitV2ApplyStepWriter;
  ideSync: InitV2ApplyStepWriter;
  recipes: InitV2ApplyStepWriter;
  installCommit?: InitV2ApplyInstallCommitWriter;
};

function asInstallPaths(value: void | readonly string[]): string[] {
  if (!value) return [];
  return [...value];
}

export async function withStep<T>(opts: {
  clack?: InitV2ApplyClack | null;
  start: string;
  success?: string;
  failure?: string;
  run: (setProgress: (message: string) => void) => Promise<T>;
}): Promise<T> {
  const spinner: InitV2ApplySpinner | null = opts.clack ? opts.clack.spinner() : null;
  spinner?.start(opts.start);
  const setProgress = (message: string): void => {
    spinner?.message?.(message);
  };

  try {
    const value = await opts.run(setProgress);
    spinner?.stop(opts.success ?? opts.start);
    return value;
  } catch (error) {
    spinner?.stop(opts.failure ?? opts.start);
    throw error;
  }
}

export async function applyInitV2WithProgress(opts: {
  clack?: InitV2ApplyClack | null;
  plan: InitV2ApplyPlan;
  includeInstallCommit: boolean;
}): Promise<{ installPaths: string[] }> {
  const installPaths: string[] = [];

  await withStep({
    clack: opts.clack,
    start: "Writing init config",
    success: "Wrote init config",
    failure: "Failed to write init config",
    run: async () => {
      await opts.plan.config();
    },
  });

  const agentsPaths = await withStep({
    clack: opts.clack,
    start: "Writing agents",
    success: "Wrote agents",
    failure: "Failed to write agents",
    run: async () => asInstallPaths(await opts.plan.agents()),
  });
  installPaths.push(...agentsPaths);

  const workflowPaths = await withStep({
    clack: opts.clack,
    start: "Writing workflow files",
    success: "Wrote workflow files",
    failure: "Failed to write workflow files",
    run: async () => asInstallPaths(await opts.plan.workflow()),
  });
  installPaths.push(...workflowPaths);

  const gitignorePaths = await withStep({
    clack: opts.clack,
    start: "Updating .gitignore",
    success: "Updated .gitignore",
    failure: "Failed to update .gitignore",
    run: async () => asInstallPaths(await opts.plan.gitignore()),
  });
  installPaths.push(...gitignorePaths);

  if (opts.plan.hooks) {
    const hookPaths = await withStep({
      clack: opts.clack,
      start: "Installing hooks",
      success: "Installed hooks",
      failure: "Failed to install hooks",
      run: async () => asInstallPaths(await opts.plan.hooks?.()),
    });
    installPaths.push(...hookPaths);
  }

  const idePaths = await withStep({
    clack: opts.clack,
    start: "Syncing IDE rules",
    success: "Synced IDE rules",
    failure: "Failed to sync IDE rules",
    run: async () => asInstallPaths(await opts.plan.ideSync()),
  });
  installPaths.push(...idePaths);

  await withStep({
    clack: opts.clack,
    start: "Materializing recipes",
    success: "Materialized recipes",
    failure: "Failed to materialize recipes",
    run: async () => {
      await opts.plan.recipes();
    },
  });

  if (opts.includeInstallCommit && opts.plan.installCommit) {
    await withStep({
      clack: opts.clack,
      start: "Creating install commit",
      success: "Created install commit",
      failure: "Failed to create install commit",
      run: async () => {
        await opts.plan.installCommit?.(installPaths);
      },
    });
  }

  return { installPaths };
}
