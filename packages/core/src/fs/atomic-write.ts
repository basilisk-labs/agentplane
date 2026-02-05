import { mkdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";

export async function atomicWriteFile(
  filePath: string,
  contents: string | Buffer,
  encoding: BufferEncoding = "utf8",
): Promise<void> {
  const dir = path.dirname(filePath);
  await mkdir(dir, { recursive: true });
  const tmpPath = `${filePath}.tmp-${process.pid}-${Date.now()}`;
  await writeFile(tmpPath, contents, typeof contents === "string" ? encoding : undefined);
  await rename(tmpPath, filePath);
}
