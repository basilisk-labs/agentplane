import { createReadStream, createWriteStream } from "node:fs";
import {
  lstat,
  mkdir,
  readdir,
  readFile,
  readlink,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { pipeline } from "node:stream/promises";

import type { FileStat, FileSystemPort, PathKind } from "../../ports/fs-port.js";

function toKind(st: Awaited<ReturnType<typeof lstat>>): PathKind {
  if (st.isSymbolicLink()) return "symlink";
  if (st.isDirectory()) return "dir";
  return "file";
}

export class NodeFileSystemAdapter implements FileSystemPort {
  async readFileText(path: string): Promise<string> {
    return await readFile(path, "utf8");
  }

  async readFileBytes(path: string): Promise<Buffer> {
    return await readFile(path);
  }

  async writeFileText(path: string, text: string): Promise<void> {
    await writeFile(path, text, "utf8");
  }

  async writeFileBytes(path: string, bytes: Buffer): Promise<void> {
    await writeFile(path, bytes);
  }

  async mkdirp(path: string): Promise<void> {
    await mkdir(path, { recursive: true });
  }

  async readdir(path: string): Promise<string[]> {
    return await readdir(path);
  }

  async lstat(path: string): Promise<FileStat> {
    const st = await lstat(path);
    return { kind: toKind(st), mtimeMs: st.mtimeMs };
  }

  async rm(path: string): Promise<void> {
    await rm(path, { recursive: true, force: true });
  }

  async readlink(path: string): Promise<string> {
    return await readlink(path);
  }

  async symlink(target: string, path: string): Promise<void> {
    await symlink(target, path);
  }

  // Utility for large copies without buffering the entire file.
  async copyFileStream(src: string, dest: string): Promise<void> {
    await pipeline(createReadStream(src), createWriteStream(dest));
  }
}
