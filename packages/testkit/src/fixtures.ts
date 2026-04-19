import { rm } from "node:fs/promises";

import { defaultConfig } from "@agentplaneorg/core";

import { makeTaskBackendDouble } from "./task.js";
import {
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  mkTempDir,
  writeConfig,
  writeDefaultConfig,
} from "./cli.js";

export type TempRepoHandle = {
  root: string;
  cleanup: () => Promise<void>;
  writeDefaultConfig: () => Promise<void>;
  writeConfig: (config?: ReturnType<typeof defaultConfig>) => Promise<void>;
};

export async function tempRepo(
  opts: {
    git?: boolean;
    branch?: string;
    withDefaultConfig?: boolean;
  } = {},
): Promise<TempRepoHandle> {
  const git = opts.git ?? true;
  const root = opts.branch
    ? await mkGitRepoRootWithBranch(opts.branch)
    : git
      ? await mkGitRepoRoot()
      : await mkTempDir();

  const handle: TempRepoHandle = {
    root,
    cleanup: async () => {
      await rm(root, { recursive: true, force: true });
    },
    writeDefaultConfig: async () => {
      await writeDefaultConfig(root);
    },
    writeConfig: async (config = defaultConfig()) => {
      await writeConfig(root, config);
    },
  };

  if (opts.withDefaultConfig) {
    await handle.writeDefaultConfig();
  }

  return handle;
}

export function mockConfig(
  configure?: (config: ReturnType<typeof defaultConfig>) => void,
): ReturnType<typeof defaultConfig> {
  const config = defaultConfig();
  configure?.(config);
  return config;
}

export const mockTaskBackend = makeTaskBackendDouble;
