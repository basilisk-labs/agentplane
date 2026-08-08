import { randomUUID } from "node:crypto";
import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

// Legacy owner records have no process identity, so they retain a conservative
// stale timeout. Current records name a PID: a live long-running owner keeps
// authority regardless of age, while a dead owner is recoverable immediately.
const EXECUTION_LEASE_STALE_AFTER_MS = 11 * 60 * 1000;
const EXECUTION_LEASE_OWNER_FILE = "owner";

export type SupervisorExecutionLease = {
  release: () => Promise<void>;
};

type SupervisorExecutionLeaseOwner = {
  owner: string;
  pid: number;
  started_at: string;
};

function parseSupervisorExecutionLeaseOwner(
  value: string | null,
): SupervisorExecutionLeaseOwner | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as Partial<SupervisorExecutionLeaseOwner>;
    if (
      typeof parsed.owner !== "string" ||
      !Number.isSafeInteger(parsed.pid) ||
      (parsed.pid ?? 0) <= 0 ||
      typeof parsed.started_at !== "string"
    ) {
      return null;
    }
    return parsed as SupervisorExecutionLeaseOwner;
  } catch {
    return null;
  }
}

function processOwnsSupervisorExecutionLease(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return (error as NodeJS.ErrnoException | null)?.code === "EPERM";
  }
}

/**
 * Claim the full prepare -> provider -> persist window for one task episode.
 *
 * The journal CAS admits only one provider intent, but evaluator preparation
 * itself writes frozen task artifacts. Without this lease, a losing process
 * can create those artifacts while the winner is attesting its read-only
 * provider workspace and make the winner look like it changed the repository.
 */
export async function tryAcquireSupervisorExecutionLease(opts: {
  journal_path: string;
}): Promise<SupervisorExecutionLease | null> {
  const leasePath = `${opts.journal_path}.execution`;
  await mkdir(path.dirname(opts.journal_path), { recursive: true, mode: 0o700 });
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      await mkdir(leasePath, { mode: 0o700 });
      const owner = randomUUID();
      try {
        const ownerRecord: SupervisorExecutionLeaseOwner = {
          owner,
          pid: process.pid,
          started_at: new Date().toISOString(),
        };
        await writeFile(
          path.join(leasePath, EXECUTION_LEASE_OWNER_FILE),
          `${JSON.stringify(ownerRecord)}\n`,
          "utf8",
        );
      } catch (error) {
        await rm(leasePath, { recursive: true, force: true });
        throw error;
      }
      return {
        release: async () => {
          const observed = await readFile(
            path.join(leasePath, EXECUTION_LEASE_OWNER_FILE),
            "utf8",
          ).catch(() => null);
          const observedOwner = parseSupervisorExecutionLeaseOwner(observed);
          if (observedOwner?.owner === owner || observed?.trim() === owner) {
            await rm(leasePath, { recursive: true, force: true });
          }
        },
      };
    } catch (error) {
      if ((error as NodeJS.ErrnoException | null)?.code !== "EEXIST") throw error;
      const observedOwner = parseSupervisorExecutionLeaseOwner(
        await readFile(path.join(leasePath, EXECUTION_LEASE_OWNER_FILE), "utf8").catch(() => null),
      );
      if (observedOwner) {
        if (processOwnsSupervisorExecutionLease(observedOwner.pid)) return null;
        await rm(leasePath, { recursive: true, force: true });
        continue;
      }
      const age = await stat(leasePath)
        .then((entry) => Date.now() - entry.mtimeMs)
        .catch(() => 0);
      if (age <= EXECUTION_LEASE_STALE_AFTER_MS) return null;
      await rm(leasePath, { recursive: true, force: true });
    }
  }
  return null;
}
