import path from "node:path";
import { mkdir, readFile, writeFile } from "node:fs/promises";

type CloudBackendState = { last_checked_at: string | null };

export async function readCloudBackendState(statePath: string): Promise<CloudBackendState> {
  try {
    const raw = JSON.parse(await readFile(statePath, "utf8")) as unknown;
    if (
      raw &&
      typeof raw === "object" &&
      typeof (raw as { last_checked_at?: unknown }).last_checked_at === "string"
    ) {
      return { last_checked_at: (raw as { last_checked_at: string }).last_checked_at };
    }
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code !== "ENOENT") throw err;
  }
  return { last_checked_at: null };
}

export async function writeCloudBackendState(
  statePath: string,
  state: { last_checked_at: string },
): Promise<void> {
  await mkdir(path.dirname(statePath), { recursive: true });
  await writeFile(statePath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
}
