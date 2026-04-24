import type { InitClackPrompts } from "../prompts.js";

type InitApplySpinner = {
  start: (message: string) => void;
  stop: (message?: string) => void;
  message?: (message: string) => void;
};

type InitApplyClack = Pick<InitClackPrompts, "spinner">;

type InitApplyStepWriter = () => Promise<void | readonly string[]>;

type InitApplyInstallCommitWriter = (installPaths: readonly string[]) => Promise<void>;

type InitApplyPlan = {
  config: InitApplyStepWriter;
  agents: InitApplyStepWriter;
  workflow: InitApplyStepWriter;
  gitignore: InitApplyStepWriter;
  hooks?: InitApplyStepWriter;
  ideSync: InitApplyStepWriter;
  recipes: InitApplyStepWriter;
  installCommit?: InitApplyInstallCommitWriter;
};

function asInstallPaths(value: void | readonly string[]): string[] {
  if (!value) return [];
  return [...value];
}

export async function withStep<T>(opts: {
  clack?: InitApplyClack | null;
  start: string;
  success?: string;
  failure?: string;
  run: (setProgress: (message: string) => void) => Promise<T>;
}): Promise<T> {
  const spinner: InitApplySpinner | null = opts.clack ? opts.clack.spinner() : null;
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

export async function applyInitWithProgress(opts: {
  clack?: InitApplyClack | null;
  plan: InitApplyPlan;
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

  const recipePaths = await withStep({
    clack: opts.clack,
    start: "Materializing recipes",
    success: "Materialized recipes",
    failure: "Failed to materialize recipes",
    run: async () => asInstallPaths(await opts.plan.recipes()),
  });
  installPaths.push(...recipePaths);

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
