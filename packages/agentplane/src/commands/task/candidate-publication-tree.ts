import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { promisify } from "node:util";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { CandidatePublicationRequest } from "./candidate-publication-request.js";

const run = promisify(execFile);
const oid = /^[a-f0-9]{40}(?:[a-f0-9]{24})?$/u;
async function git(root: string, args: string[]) {
  const result = await run("git", args, {
    cwd: root,
    encoding: "buffer",
    maxBuffer: 32 * 1024 * 1024,
    timeout: 30_000,
    env: { ...process.env, GIT_NO_REPLACE_OBJECTS: "1", GIT_OPTIONAL_LOCKS: "0" },
  });
  return result.stdout;
}
function utf8(bytes: Buffer): string {
  const text = bytes.toString("utf8");
  if (!Buffer.from(text).equals(bytes)) throw new Error("Candidate Git paths must be UTF-8");
  return text;
}

/** The manifest describes every changed tracked path, including deletion and mode changes. */
export async function readCandidateTree(root: string, base: string, commit: string) {
  if (!oid.test(base) || !oid.test(commit))
    throw new Error("Candidate commits must be full object IDs");
  for (const value of [base, commit]) {
    if (utf8(await git(root, ["cat-file", "-t", value])).trim() !== "commit")
      throw new Error("Candidate identity must name an immutable commit");
  }
  await git(root, ["merge-base", "--is-ancestor", base, commit]);
  const tree = utf8(await git(root, ["rev-parse", `${commit}^{tree}`])).trim();
  const changed = utf8(
    await git(root, ["diff", "--name-only", "--no-renames", "-z", base, commit, "--"]),
  )
    .split("\0")
    .filter(Boolean)
    .toSorted();
  if (changed.length === 0 || changed.length > 10_000)
    throw new Error("Candidate change inventory is empty or too large");
  const entries = new Map<string, { mode: string; blob: string }>();
  for (const line of utf8(await git(root, ["ls-tree", "-rz", "--full-tree", commit]))
    .split("\0")
    .filter(Boolean)) {
    const match = /^(\d+) (\w+) ([a-f0-9]+)\t([\s\S]+)$/u.exec(line);
    if (!match) throw new Error("Invalid candidate tree entry");
    if (changed.includes(match[4]!)) {
      if (match[2] !== "blob" || !["100644", "100755", "120000"].includes(match[1]!))
        throw new Error("Candidate publication does not support changed submodules");
      entries.set(match[4]!, { mode: match[1]!, blob: match[3]! });
    }
  }
  const files: CandidatePublicationRequest["files"] = [];
  for (const path of changed) {
    const entry = entries.get(path);
    if (!entry) {
      files.push({ path, mode: null, blob: null, content_digest: null });
      continue;
    }
    const bytes = await git(root, ["cat-file", "blob", entry.blob]);
    files.push({
      path,
      mode: entry.mode as "100644" | "100755" | "120000",
      blob: entry.blob,
      content_digest: `sha256:${createHash("sha256").update(bytes).digest("hex")}`,
    });
  }
  return { commit, tree, base_commit: base, files, files_digest: k.kernelDigest(files) };
}

export async function assertCandidateTree(root: string, request: CandidatePublicationRequest) {
  const observed = await readCandidateTree(root, request.base_commit, request.commit);
  if (
    k.kernelDigest(observed) !==
    k.kernelDigest({
      commit: request.commit,
      tree: request.tree,
      base_commit: request.base_commit,
      files: request.files,
      files_digest: request.files_digest,
    })
  )
    throw new Error("Candidate commit/tree/file inventory does not match the reviewed request");
}
