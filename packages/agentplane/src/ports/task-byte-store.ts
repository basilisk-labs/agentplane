import type { taskKernel } from "@agentplaneorg/core/tasks";

export type TaskByteSnapshot = Readonly<{
  task_id: string;
  text: string;
  encoding_valid: boolean;
  digest: taskKernel.Sha256Digest;
  revision: number;
}>;

/** Migration uses the same canonical record and transaction owner as normal Task writes. */
export interface TaskByteStore {
  readonly backend_identity: string;
  read(taskId: string): Promise<TaskByteSnapshot | null>;
  compareAndSwap(expected: TaskByteSnapshot, nextText: string): Promise<boolean>;
  backupLocation(source: TaskByteSnapshot): string;
  backup(source: TaskByteSnapshot): Promise<string>;
  readBackup(location: string): Promise<string>;
}
