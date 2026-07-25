import { rm } from "node:fs/promises";

export const TEMP_ROOT_CLEANUP_OPTIONS = {
  force: true,
  maxRetries: 5,
  recursive: true,
  retryDelay: 100,
} as const;

type TempRootRemover = (root: string, options: typeof TEMP_ROOT_CLEANUP_OPTIONS) => Promise<void>;

export async function removeTempRoot(root: string, remover: TempRootRemover = rm): Promise<void> {
  await remover(root, TEMP_ROOT_CLEANUP_OPTIONS);
}
