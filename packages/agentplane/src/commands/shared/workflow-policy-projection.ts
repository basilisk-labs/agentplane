import { lstat, readlink, realpath } from "node:fs/promises";
import path from "node:path";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitProofEnv } from "@agentplaneorg/core/git";
import { readContainedStableTextNoFollow } from "../../shared/contained-stable-file.js";
const ROUTE_PROJECTION_MAX_BYTES = 16 * 1024 * 1024;

/** Only the framework's tracked AGENTS projection may use a symlink. */
export async function readPolicyProjection(
  repositoryRoot: string,
  relativePath: string,
  label: string,
) {
  const root = await realpath(repositoryRoot);
  const file = path.join(root, relativePath);
  const before = await lstat(file, { bigint: true });
  if (!before.isSymbolicLink()) {
    return readContainedStableTextNoFollow({
      repository_root: root,
      file_path: file,
      label,
      max_bytes: ROUTE_PROJECTION_MAX_BYTES,
    });
  }
  const target = "packages/agentplane/assets/AGENTS.md";
  if (relativePath !== "AGENTS.md" || (await readlink(file)) !== target)
    throw new Error("Unapproved policy projection alias");
  const git = async (args: string[]) => {
    const result = await execFileAsync("git", args, {
      cwd: root,
      env: gitProofEnv(),
      maxBuffer: ROUTE_PROJECTION_MAX_BYTES,
    });
    return result.stdout;
  };
  const indexArgs = ["ls-files", "--stage", "-z", "--", "AGENTS.md", target];
  const recordedIndex = await git(indexArgs);
  const entries = recordedIndex.split("\0").filter(Boolean);
  const linked = entries.find((entry) => /^120000 [a-f0-9]+ 0\tAGENTS\.md$/u.test(entry));
  const regular = entries.find(
    (entry) => /^100(?:644|755) [a-f0-9]+ 0\t/u.test(entry) && entry.endsWith(`\t${target}`),
  );
  if (!linked || !regular || (await git(["show", ":AGENTS.md"])) !== target)
    throw new Error("Policy projection is not the exact tracked link");
  const content = await readContainedStableTextNoFollow({
    repository_root: root,
    file_path: path.join(root, target),
    label,
    max_bytes: ROUTE_PROJECTION_MAX_BYTES,
  });
  const observedLink = await readlink(file);
  const observedIndex = await git(indexArgs);
  const after = await lstat(file, { bigint: true });
  if (
    !after.isSymbolicLink() ||
    before.dev !== after.dev ||
    before.ino !== after.ino ||
    before.ctimeNs !== after.ctimeNs ||
    before.mtimeNs !== after.mtimeNs ||
    observedLink !== target ||
    observedIndex !== recordedIndex
  )
    throw new Error("Policy projection changed during observation");
  // Include link identity in the semantic observation without machine-specific inode values.
  return JSON.stringify({ projection: relativePath, target, tracked: entries, content });
}
