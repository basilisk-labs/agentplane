import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { gitEnv, gitRevParse } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import {
  executionGrantDigest,
  taskExecutionBaseFromExtensions,
} from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";

/**
 * A logical repository identity must survive checkout relocation and branch changes.
 * Root commits are Git object identities, so no absolute path or mutable remote URL
 * participates in the authority boundary.
 */
export async function resolveLogicalRepositoryIdentity(opts: {
  git_root: string;
  task: Pick<TaskData, "extensions">;
}): Promise<string> {
  const base = taskExecutionBaseFromExtensions(opts.task.extensions);
  if (base?.repository_identity) return base.repository_identity;
  const commonDir = await gitRevParse(opts.git_root, [
    "--path-format=absolute",
    "--git-common-dir",
  ]);
  const identityPath = path.join(commonDir, "agentplane", "repository-identity.json");
  const persisted = await readFile(identityPath, "utf8")
    .then((raw) => JSON.parse(raw) as { repository_identity?: unknown })
    .catch(() => null);
  if (
    typeof persisted?.repository_identity === "string" &&
    /^sha256:[0-9a-f]{64}$/u.test(persisted.repository_identity)
  ) {
    return persisted.repository_identity;
  }
  const anchor = base?.base_sha ?? (await gitRevParse(opts.git_root, ["HEAD"]).catch(() => null));
  const stdout = anchor
    ? await execFileAsync("git", ["rev-list", "--max-parents=0", anchor], {
        cwd: opts.git_root,
        env: gitEnv(),
      }).then((result) => result.stdout)
    : "";
  const root_commits = String(stdout)
    .split(/\r?\n/u)
    .map((value) => value.trim())
    .filter(Boolean)
    .toSorted();
  if (root_commits.length > 0) {
    return executionGrantDigest({
      schema_version: 1,
      kind: "agentplane.logical_repository_identity",
      root_commits,
    });
  }

  const repository_identity = executionGrantDigest({
    schema_version: 1,
    kind: "agentplane.unborn_repository_identity",
    nonce: randomUUID(),
  });
  await mkdir(path.dirname(identityPath), { recursive: true, mode: 0o700 });
  await writeFile(
    identityPath,
    `${JSON.stringify({ schema_version: 1, repository_identity }, null, 2)}\n`,
    { encoding: "utf8", mode: 0o600, flag: "wx" },
  ).catch((error) => {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
  });
  const winner = JSON.parse(await readFile(identityPath, "utf8")) as {
    repository_identity?: unknown;
  };
  if (
    typeof winner.repository_identity !== "string" ||
    !/^sha256:[0-9a-f]{64}$/u.test(winner.repository_identity)
  ) {
    throw new Error("Persisted logical repository identity is malformed.");
  }
  return winner.repository_identity;
}
