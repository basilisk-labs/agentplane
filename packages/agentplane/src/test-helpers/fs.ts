import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export async function writeExecutableFile(
  root: string,
  relativePath: string,
  content: string | readonly string[],
): Promise<string> {
  const target = path.join(root, relativePath);
  const body = Array.isArray(content) ? content.join("\n") : String(content);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, body + "\n", { encoding: "utf8", mode: 0o755 });
  return target;
}
