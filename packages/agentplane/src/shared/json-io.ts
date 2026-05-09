import { readFile } from "node:fs/promises";

export type ReadJsonFileOptions<T> = {
  defaultValue?: T;
};

export async function readJsonFile<T = unknown>(
  filePath: string,
  options: ReadJsonFileOptions<T> = {},
): Promise<T> {
  try {
    return JSON.parse(await readFile(filePath, "utf8")) as T;
  } catch (error) {
    if ("defaultValue" in options) return options.defaultValue as T;
    throw error;
  }
}
