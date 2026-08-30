import { createHash } from "node:crypto";
import path from "node:path";
import {
  parseTaskReadme,
  taskReadmePath,
  withTaskReadmeTransaction,
  type taskKernel,
} from "@agentplaneorg/core/tasks";

import type { TaskByteSnapshot, TaskByteStore } from "../../ports/task-byte-store.js";
import {
  captureContainedPathChainIdentity,
  assertContainedPathChainIdentityUnchanged,
} from "../../shared/contained-stable-file.js";
import { readStableRegularFileNoFollow } from "../../shared/stable-file.js";
import { writeTextIfChanged } from "../../shared/write-if-changed.js";
import { validateTaskId } from "./shared.js";
import type { LocalBackend } from "./local-backend.js";

export function taskBytesDigest(text: string | Buffer): taskKernel.Sha256Digest {
  return `sha256:${createHash("sha256").update(text).digest("hex")}`;
}

export class LocalTaskByteStore implements TaskByteStore {
  readonly backend_identity = "local-task-readme-v1";
  constructor(readonly backend: LocalBackend) {}

  private async readBytes(file: string): Promise<Buffer> {
    const chain = await captureContainedPathChainIdentity({
      repository_root: this.backend.root,
      file_path: file,
      label: "Task migration source",
    });
    const bytes = await readStableRegularFileNoFollow(file, "Task migration source");
    await assertContainedPathChainIdentityUnchanged(chain, "Task migration source");
    return bytes;
  }

  private async readText(file: string): Promise<string> {
    const bytes = await this.readBytes(file);
    const text = bytes.toString("utf8");
    if (!Buffer.from(text, "utf8").equals(bytes)) throw new Error("unsupported_encoding");
    return text;
  }

  async read(taskId: string): Promise<TaskByteSnapshot | null> {
    validateTaskId(taskId);
    let bytes: Buffer;
    try {
      bytes = await this.readBytes(taskReadmePath(this.backend.root, taskId));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
      throw error;
    }
    const text = bytes.toString("utf8");
    const encoding_valid = Buffer.from(text, "utf8").equals(bytes);
    let revision = 0;
    try {
      const value = parseTaskReadme(text).frontmatter.revision;
      if (typeof value === "number" && Number.isSafeInteger(value) && value >= 0) revision = value;
    } catch {
      /* Classification reports malformed source without guessing a state. */
    }
    return { task_id: taskId, text, encoding_valid, revision, digest: taskBytesDigest(bytes) };
  }

  async compareAndSwap(expected: TaskByteSnapshot, nextText: string): Promise<boolean> {
    validateTaskId(expected.task_id);
    const file = taskReadmePath(this.backend.root, expected.task_id);
    return withTaskReadmeTransaction(file, async () => {
      const current = await this.read(expected.task_id);
      if (current?.digest !== expected.digest || current.revision !== expected.revision)
        return false;
      await writeTextIfChanged(file, nextText, {
        containedRoot: this.backend.root,
        label: "Task migration record",
        beforePublication: async () => {
          const fresh = await this.read(expected.task_id);
          if (fresh?.digest !== expected.digest || fresh.revision !== expected.revision)
            throw new Error("source_changed");
        },
      });
      return true;
    });
  }

  backupLocation(source: TaskByteSnapshot): string {
    validateTaskId(source.task_id);
    return `${source.task_id}/migration-${source.digest.slice(7)}.source`;
  }

  async backup(source: TaskByteSnapshot): Promise<string> {
    validateTaskId(source.task_id);
    if (!source.encoding_valid || taskBytesDigest(source.text) !== source.digest)
      throw new Error("backup_source_mismatch");
    const location = this.backupLocation(source);
    const file = path.join(this.backend.root, location);
    await withTaskReadmeTransaction(file, async () => {
      try {
        const previous = await this.readText(file);
        if (previous !== source.text) throw new Error("backup_mismatch");
        return;
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      }
      await writeTextIfChanged(file, source.text, {
        containedRoot: this.backend.root,
        label: "Task migration backup",
        beforePublication: async () => {
          try {
            if ((await this.readText(file)) !== source.text) throw new Error("backup_mismatch");
          } catch (error) {
            if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
          }
        },
      });
    });
    if ((await this.readText(file)) !== source.text) throw new Error("backup_mismatch");
    return location;
  }

  async readBackup(location: string): Promise<string> {
    const match = /^([^/]+)\/migration-[a-f0-9]{64}\.source$/u.exec(location);
    if (!match) throw new Error("invalid_backup_location");
    validateTaskId(match[1]!);
    return this.readText(path.join(this.backend.root, location));
  }
}
