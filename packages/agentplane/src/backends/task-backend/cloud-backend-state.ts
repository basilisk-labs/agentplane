import { readFile } from "node:fs/promises";
import { atomicWriteFile } from "@agentplaneorg/core/fs";

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
    if (code !== "ENOENT" && !(err instanceof SyntaxError)) throw err;
  }
  return { last_checked_at: null };
}

export async function writeCloudBackendState(
  statePath: string,
  state: { last_checked_at: string },
): Promise<void> {
  await atomicWriteFile(statePath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
}
