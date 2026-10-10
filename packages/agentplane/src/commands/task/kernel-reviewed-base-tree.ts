import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { promisify } from "node:util";
import { runProcess } from "@agentplaneorg/core/process";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { KernelRepositoryObservation } from "../../runner/observation/kernel-repository.js";

const run = promisify(execFile);
type Entry = KernelRepositoryObservation["files"][number];
const excluded = (name: string, roots: readonly string[]) =>
  roots.some((root) => name === root || name.startsWith(`${root}/`));

async function tree(
  root: string,
  commit: string,
  exclusions: readonly string[],
  blobs: Map<string, k.Sha256Digest>,
) {
  const { stdout } = await run("git", ["ls-tree", "-rz", "--full-tree", commit], {
    cwd: root,
    encoding: "buffer",
    maxBuffer: 32 * 1024 * 1024,
  });
  if (!Buffer.from(stdout.toString("utf8"), "utf8").equals(stdout))
    throw new Error("Reviewed base contains non-UTF8 Git paths");
  const entries: { name: string; mode: string; hash: string }[] = [];
  for (const line of stdout.toString("utf8").split("\0").filter(Boolean)) {
    const match = /^(\d+) (\w+) ([a-f0-9]+)\t([\s\S]+)$/u.exec(line);
    if (!match) throw new Error("Reviewed base has an invalid Git tree entry");
    const mode = match[1]!;
    const kind = match[2]!;
    const hash = match[3]!;
    const name = match[4]!;
    if (excluded(name, exclusions)) continue;
    if (kind !== "blob") throw new Error("Reviewed base import does not support submodules");
    entries.push({ name, mode, hash });
  }
  const missing = [...new Set(entries.map((entry) => entry.hash))].filter(
    (hash) => !blobs.has(hash),
  );
  if (missing.length > 0) {
    const result = await runProcess({
      command: "git",
      args: ["cat-file", "--batch"],
      cwd: root,
      input: `${missing.join("\n")}\n`,
      encoding: null,
      stripFinalNewline: false,
      maxBuffer: 128 * 1024 * 1024,
      timeoutMs: 60_000,
    });
    if (!Buffer.isBuffer(result.stdout))
      throw new Error("Reviewed base Git batch did not return bytes");
    let offset = 0;
    for (const hash of missing) {
      const newline = result.stdout.indexOf(10, offset);
      if (newline === -1) throw new Error("Reviewed base Git batch header is missing");
      const header = result.stdout.subarray(offset, newline).toString("ascii");
      const match = /^([a-f0-9]+) blob (\d+)$/u.exec(header);
      const size = Number(match?.[2]);
      offset = newline + 1;
      if (
        match?.[1] !== hash ||
        !Number.isSafeInteger(size) ||
        size < 0 ||
        size > 32 * 1024 * 1024 ||
        result.stdout[offset + size] !== 10
      )
        throw new Error("Reviewed base Git batch object is invalid or exceeds its bound");
      blobs.set(
        hash,
        `sha256:${createHash("sha256")
          .update(result.stdout.subarray(offset, offset + size))
          .digest("hex")}`,
      );
      offset += size + 1;
    }
    if (offset !== result.stdout.length)
      throw new Error("Reviewed base Git batch has unexpected trailing bytes");
  }
  const files = new Map<string, Entry>();
  for (const { name, mode, hash } of entries) {
    files.set(name, {
      path: name,
      kind: mode === "120000" ? "symlink" : "file",
      executable: mode === "100755",
      content_digest: blobs.get(hash)!,
    });
  }
  return files;
}

/** Authenticate the unchanged overlay against immutable Git blobs and native checkpoints. */
export async function verifyReviewedBaseTrees(opts: {
  root: string;
  old_commit: string;
  new_commit: string;
  parent: k.ExecutionAuthority;
  before: KernelRepositoryObservation;
  after: KernelRepositoryObservation;
}) {
  const { before, after, parent } = opts;
  for (const commit of [opts.old_commit, opts.new_commit])
    if (!/^[a-f0-9]{40}$/u.test(commit)) throw new Error("Reviewed base requires full commit SHAs");
  if (opts.old_commit === opts.new_commit) throw new Error("Reviewed base import must change HEAD");
  for (const observation of [before, after]) {
    const { fingerprint, ...contents } = observation;
    if (
      k.kernelDigest(contents) !== fingerprint ||
      observation.repository_identity !== parent.repository_identity
    )
      throw new Error("Reviewed base checkpoint authentication failed");
  }
  if (
    before.fingerprint !== parent.repository_fingerprint ||
    k.kernelDigest(before.excluded_paths) !== k.kernelDigest(after.excluded_paths)
  )
    throw new Error("Reviewed base checkpoint binding changed");
  const { stdout: head } = await run("git", ["rev-parse", "HEAD"], { cwd: opts.root });
  if (head.trim() !== opts.new_commit) throw new Error("Reviewed base current HEAD changed");
  const { stdout: staged } = await run(
    "git",
    ["diff", "--cached", "--name-only", "-z", opts.new_commit],
    { cwd: opts.root },
  );
  if (staged.split("\0").some((name) => name.length > 0 && !excluded(name, before.excluded_paths)))
    throw new Error("Reviewed base has staged implementation changes outside its checkpoint");
  await run("git", ["merge-base", "--is-ancestor", opts.old_commit, opts.new_commit], {
    cwd: opts.root,
  });
  const blobs = new Map<string, k.Sha256Digest>();
  const oldTree = await tree(opts.root, opts.old_commit, before.excluded_paths, blobs);
  const newTree = await tree(opts.root, opts.new_commit, before.excluded_paths, blobs);
  const oldFiles = new Map(before.files.map((entry) => [entry.path, entry]));
  const newFiles = new Map(after.files.map((entry) => [entry.path, entry]));
  const equal = (a: Entry | undefined, b: Entry | undefined) =>
    k.kernelDigest(a ?? null) === k.kernelDigest(b ?? null);
  const overlay: { path: string; value: Entry | null }[] = [];
  const imported: string[] = [];
  const paths = [
    ...new Set([...oldTree.keys(), ...newTree.keys(), ...oldFiles.keys(), ...newFiles.keys()]),
  ].toSorted();
  for (const name of paths) {
    const overlaid = !equal(oldTree.get(name), oldFiles.get(name));
    if (overlaid) {
      if (
        !parent.scope_roots.some(
          (scope) => scope === "." || name === scope || name.startsWith(`${scope}/`),
        )
      )
        throw new Error(`Reviewed base overlay is outside admitted scope: ${name}`);
      if (
        !equal(oldFiles.get(name), newFiles.get(name)) ||
        !equal(oldTree.get(name), newTree.get(name))
      )
        throw new Error(`Reviewed base overlay changed or overlaps imported changes: ${name}`);
      overlay.push({ path: name, value: oldFiles.get(name) ?? null });
    } else {
      if (!equal(newTree.get(name), newFiles.get(name)))
        throw new Error(`Reviewed base contains an additional implementation edit: ${name}`);
      if (!equal(oldTree.get(name), newTree.get(name))) imported.push(name);
    }
  }
  return { imported_paths: imported, overlay_digest: k.kernelDigest(overlay) };
}
