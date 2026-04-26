import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { defaultConfig } from "@agentplaneorg/core/config";

import {
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  mkTempDir,
  writeConfig,
  writeDefaultConfig,
} from "./cli.js";
export { makeTaskBackendDouble as mockTaskBackend } from "./task.js";

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

export async function writeExecutableFile(
  root: string,
  relativePath: string,
  content: string | readonly string[],
): Promise<string> {
  const target = path.join(root, relativePath);
  const body = Array.isArray(content) ? content.join("\n") : String(content);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, `${body}\n`, { encoding: "utf8", mode: 0o755 });
  return target;
}
