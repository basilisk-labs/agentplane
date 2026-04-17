import { lstat, rename, rm } from "node:fs/promises";

let recipeMutationNonce = 0;

async function pathExists(filePath: string): Promise<boolean> {
  try {
    await lstat(filePath);
    return true;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT") return false;
    throw err;
  }
}

function backupPath(targetDir: string): string {
  return `${targetDir}.agentplane-backup-${process.pid}-${Date.now()}-${recipeMutationNonce++}`;
}

export async function runVendoredRecipeMutation<T>(opts: {
  targetDir: string;
  mode: "create" | "replace" | "remove";
  materialize?: (targetDir: string) => Promise<void>;
  commit: () => Promise<T>;
}): Promise<T> {
  const existed = await pathExists(opts.targetDir);
  const backupDir =
    existed && (opts.mode === "replace" || opts.mode === "remove")
      ? backupPath(opts.targetDir)
      : null;

  if (backupDir) {
    await rename(opts.targetDir, backupDir);
  }

  try {
    if (opts.mode !== "remove") {
      if (!opts.materialize) throw new Error("materialize callback is required for create/replace");
      await opts.materialize(opts.targetDir);
    }
    const result = await opts.commit();
    if (backupDir) {
      await rm(backupDir, { recursive: true, force: true });
    }
    return result;
  } catch (err) {
    if (opts.mode !== "remove") {
      await rm(opts.targetDir, { recursive: true, force: true }).catch((_error) => null);
    }
    if (backupDir) {
      await rename(backupDir, opts.targetDir).catch((_error) => null);
    }
    throw err;
  }
}
