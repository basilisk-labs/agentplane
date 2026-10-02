import { createHash } from "node:crypto";
import { mkdir, mkdtemp, rm } from "node:fs/promises";
import path from "node:path";
import { loadConfig, type AgentplaneConfig } from "@agentplaneorg/core/config";
import { gitEnv } from "@agentplaneorg/core/git";
import { runProcess } from "@agentplaneorg/core/process";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { KernelRepositoryObservation } from "../../runner/observation/kernel-repository.js";
import {
  readStableRegularTextNoFollow,
  writeNewStableRegularFileNoFollow,
} from "../../shared/stable-file.js";
import { writeKernelArtifact } from "./kernel-exchange.js";

type PolicySnapshot = {
  config: AgentplaneConfig;
  files: KernelRepositoryObservation["files"];
};

function policyFiles(repository: KernelRepositoryObservation) {
  // Keep the existing digest format so already-approved tasks remain recoverable.
  return repository.files.filter(
    (file) => file.path === "AGENTS.md" || file.path.startsWith(".agentplane/policy/"),
  );
}

function reject(): never {
  throw new Error("Canonical authority rejected: native_policy_changed");
}

async function readBaseline(directory: string, authority: k.ExecutionAuthority) {
  const baseline = JSON.parse(
    await readStableRegularTextNoFollow(
      path.join(directory, `${authority.repository_fingerprint.slice(7)}.json`),
      "canonical policy baseline",
    ),
  ) as KernelRepositoryObservation;
  const { fingerprint, ...contents } = baseline;
  if (
    fingerprint !== authority.repository_fingerprint ||
    baseline.repository_identity !== authority.repository_identity ||
    k.kernelDigest(contents) !== fingerprint
  )
    reject();
  return baseline;
}

/** A legacy task may predate policy snapshots. Recover only content proven by its checkpoint. */
async function recoverSnapshot(opts: {
  root: string;
  directory: string;
  baseline: KernelRepositoryObservation;
  expected: k.Sha256Digest;
  current: AgentplaneConfig;
}): Promise<PolicySnapshot> {
  const files = policyFiles(opts.baseline);
  const unchangedConfig = { config: opts.current, files };
  if (k.kernelDigest(unchangedConfig) === opts.expected) return unchangedConfig;
  const source = opts.baseline.files.find((file) => file.path === ".agentplane/WORKFLOW.md");
  if (source?.kind !== "file") reject();
  // Covers a failed commit and a committed result interrupted before authority continuation.
  for (const revision of ["HEAD", "HEAD^"]) {
    const result = await runProcess({
      command: "git",
      args: ["show", `${revision}:.agentplane/WORKFLOW.md`],
      cwd: opts.root,
      env: gitEnv(),
      reject: false,
    });
    if (result.exitCode !== 0) continue;
    const digest = `sha256:${createHash("sha256").update(result.stdout).digest("hex")}`;
    if (digest !== source.content_digest) continue;
    await mkdir(opts.directory, { recursive: true, mode: 0o700 });
    const temporary = await mkdtemp(path.join(opts.directory, "recover-"));
    try {
      await writeNewStableRegularFileNoFollow(
        path.join(temporary, "WORKFLOW.md"),
        result.stdout,
        "canonical policy recovery",
      );
      const { config } = await loadConfig(temporary);
      const snapshot = { config, files };
      if (k.kernelDigest(snapshot) !== opts.expected) reject();
      return snapshot;
    } finally {
      await rm(temporary, { recursive: true, force: true });
    }
  }
  return reject();
}

const contains = (roots: readonly string[], file: string) =>
  roots.some((root) => root === "." || file === root || file.startsWith(`${root}/`));

export function assertAuthorizedPolicyDelta(opts: {
  baseline: KernelRepositoryObservation;
  current: KernelRepositoryObservation;
  snapshot: PolicySnapshot;
  config: AgentplaneConfig;
  authority: k.ExecutionAuthority;
  items: readonly k.WorkItemDefinition[];
}) {
  if (k.kernelDigest(opts.baseline.excluded_paths) !== k.kernelDigest(opts.current.excluded_paths))
    reject();
  const before = new Map(opts.baseline.files.map((file) => [file.path, file]));
  const after = new Map(opts.current.files.map((file) => [file.path, file]));
  const policyPaths = new Set([
    ...policyFiles(opts.baseline).map((file) => file.path),
    ...policyFiles(opts.current).map((file) => file.path),
    ".agentplane/WORKFLOW.md",
    ".agentplane/config.json",
  ]);
  const changed = [...policyPaths].filter(
    (file) => k.kernelDigest(before.get(file) ?? null) !== k.kernelDigest(after.get(file) ?? null),
  );
  if (
    changed.length === 0 ||
    !opts.authority.repository_effects.includes("security_boundary") ||
    changed.some(
      (file) =>
        !contains(opts.authority.scope_roots, file) ||
        !opts.items.some(
          (item) =>
            item.execution_requirements.repository_effects.includes("security_boundary") &&
            contains(item.execution_requirements.scope_roots, file),
        ),
    ) ||
    (k.kernelDigest(opts.config) !== k.kernelDigest(opts.snapshot.config) &&
      !changed.some(
        (file) => file === ".agentplane/WORKFLOW.md" || file === ".agentplane/config.json",
      ))
  )
    reject();
}

/** Keep the approved policy in force for this task; edits become policy for subsequent tasks. */
export async function resolveKernelPolicyBaseline(opts: {
  root: string;
  observation_directory: string;
  config: AgentplaneConfig;
  repository: KernelRepositoryObservation;
  approved?: k.ExecutionAuthority;
  items: readonly k.WorkItemDefinition[];
}): Promise<{ digest: k.Sha256Digest; config: AgentplaneConfig }> {
  const live = { config: opts.config, files: policyFiles(opts.repository) };
  const digest = k.kernelDigest(live);
  const directory = path.join(opts.observation_directory, "policies");
  const expected = opts.approved?.policy_digests;
  if (!expected || (expected.length === 1 && expected[0] === digest)) {
    await writeKernelArtifact(directory, `${digest.slice(7)}.json`, live);
    return { digest, config: opts.config };
  }
  if (expected.length !== 1 || !opts.approved) return reject();
  const baseline = await readBaseline(opts.observation_directory, opts.approved);
  let snapshot: PolicySnapshot;
  try {
    snapshot = JSON.parse(
      await readStableRegularTextNoFollow(
        path.join(directory, `${expected[0].slice(7)}.json`),
        "canonical approved policy",
      ),
    ) as PolicySnapshot;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    snapshot = await recoverSnapshot({
      root: opts.root,
      directory,
      baseline,
      expected: expected[0],
      current: opts.config,
    });
  }
  if (
    k.kernelDigest(snapshot) !== expected[0] ||
    k.kernelDigest(snapshot.files) !== k.kernelDigest(policyFiles(baseline))
  )
    return reject();
  assertAuthorizedPolicyDelta({
    baseline,
    current: opts.repository,
    snapshot,
    config: opts.config,
    authority: opts.approved,
    items: opts.items,
  });
  await writeKernelArtifact(directory, `${expected[0].slice(7)}.json`, snapshot);
  return { digest: expected[0], config: structuredClone(snapshot.config) };
}
