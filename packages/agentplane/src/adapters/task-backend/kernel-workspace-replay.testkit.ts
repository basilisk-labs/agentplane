import { mkdtemp, mkdir, readFile, writeFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { LocalBackend } from "../../backends/task-backend.js";
import {
  LocalTaskByteStore,
  taskBytesDigest,
} from "../../backends/task-backend/local-task-byte-store.js";
import { KernelBackendAdapter } from "./kernel-backend-adapter.js";
import { KernelMigration } from "./kernel-migration.js";
import { compareKernelReadPaths, replayBytesDigest } from "./kernel-replay.js";
import { kernelReplayJourney } from "./kernel-replay-journey.test-fixtures.js";

const layouts = ["base", "task-worktree", "missing-frozen-document", "divergent-head"] as const;
type Source = {
  layout: (typeof layouts)[number];
  task_id: string;
  source_base64: string;
  repository_identity: k.Sha256Digest;
};

export async function kernelWorkspaceReplayCases() {
  const corpus = JSON.parse(
    await readFile(new URL("kernel-replay-migration.corpus.json", import.meta.url), "utf8"),
  ) as {
    repository_identity: k.Sha256Digest;
    fixtures: { id: string; task_id: string; source_base64: string }[];
  };
  const fixture = corpus.fixtures.find((entry) => entry.id === "unicode-crlf");
  if (!fixture) throw new Error("Missing frozen workspace source");
  return layouts.map((layout) => ({
    id: `workspace-${layout}`,
    layout,
    source_bytes: JSON.stringify({
      layout,
      task_id: fixture.task_id,
      source_base64: fixture.source_base64,
      repository_identity: corpus.repository_identity,
    } satisfies Source),
  }));
}

/** Qualify exact source bytes in real Git checkouts. No project Task or user worktree is mutated. */
export async function observeKernelWorkspaceReplay(sourceBytes: string) {
  const source = JSON.parse(sourceBytes) as Source;
  const parent = await mkdtemp(path.join(os.tmpdir(), "qualified-kernel-workspace-"));
  const base = path.join(parent, "base");
  const frozen = path.join(parent, "frozen");
  const relative = path.join(source.task_id, "README.md");
  const bytes = Buffer.from(source.source_base64, "base64");
  const env = {
    ...gitEnv(),
    GIT_CONFIG_GLOBAL: "/dev/null",
    GIT_CONFIG_SYSTEM: "/dev/null",
    GIT_AUTHOR_NAME: "Workspace Fixture",
    GIT_AUTHOR_EMAIL: "workspace@example.invalid",
    GIT_COMMITTER_NAME: "Workspace Fixture",
    GIT_COMMITTER_EMAIL: "workspace@example.invalid",
    GIT_AUTHOR_DATE: "2026-08-30T00:00:00Z",
    GIT_COMMITTER_DATE: "2026-08-30T00:00:00Z",
  };
  const git = async (cwd: string, args: string[]) => {
    const result = await execFileAsync("git", args, { cwd, env });
    return result.stdout.trim();
  };
  try {
    await mkdir(path.join(base, source.task_id), { recursive: true });
    await writeFile(path.join(base, relative), bytes);
    await git(base, ["init", "-q"]);
    await git(base, ["-c", "core.autocrlf=false", "add", "--", relative]);
    await git(base, ["commit", "-q", "-m", "Frozen workspace source"]);
    const originalHead = await git(base, ["rev-parse", "HEAD"]);
    if (source.layout !== "base")
      await git(base, ["-c", "core.autocrlf=false", "worktree", "add", "--detach", frozen, "HEAD"]);
    const target = source.layout === "base" ? base : frozen;
    if (source.layout === "missing-frozen-document") await rm(path.join(target, relative));
    if (source.layout === "divergent-head") {
      await writeFile(path.join(target, "divergence.txt"), "different implementation\n");
      await git(target, ["add", "--", "divergence.txt"]);
      await git(target, ["commit", "-q", "-m", "Divergent implementation"]);
    }
    const currentHead = await git(target, ["rev-parse", "HEAD"]);
    const originalFingerprint = k.kernelDigest({ head: originalHead });
    const fingerprint = k.kernelDigest({ head: currentHead });
    const backend = new LocalBackend({ dir: target });
    const store = new LocalTaskByteStore(backend);
    const backup = store.backup.bind(store);
    const cas = store.compareAndSwap.bind(store);
    let backups = 0;
    let writes = 0;
    store.backup = async (...args) => {
      backups++;
      return backup(...args);
    };
    store.compareAndSwap = async (...args) => {
      writes++;
      return cas(...args);
    };
    const migration = new KernelMigration(store, source.repository_identity);
    const dry = await migration.dryRun(source.task_id);
    const applied = await migration.apply(source.task_id, taskBytesDigest(bytes));
    const adapter = new KernelBackendAdapter(backend, source.repository_identity);
    const read = await adapter.read(source.task_id);
    const compared = await compareKernelReadPaths(backend, adapter, source.task_id, fingerprint, {
      fixture_id: `workspace-${source.layout}`,
      implementation_anchor: "capture-context",
      reproduction_command: "qualified kernel workspace replay",
    });
    if (!compared.comparison.matched) throw new Error("Workspace projection mismatch");
    if (applied.kind !== "applied")
      return {
        dry,
        applied,
        read_kind: read.kind,
        next_action: compared.next_action,
        backups,
        writes,
        base_digest: taskBytesDigest(await readFile(path.join(base, relative))),
      };
    if (read.kind !== "canonical") throw new Error("Missing canonical migration output");
    const canonicalBytes = await readFile(path.join(target, relative));
    const proposal = kernelReplayJourney("direct").steps[1]!.input;
    const command = {
      ...proposal,
      repository_fingerprint: fingerprint,
      authority: {
        ...proposal.authority!,
        task_id: source.task_id,
        repository_identity: source.repository_identity,
        repository_fingerprint: fingerprint,
      },
      command: {
        ...proposal.command,
        task_id: source.task_id,
        expected_task_revision: read.record.aggregate.revision,
        expected_state_fingerprint: originalFingerprint,
      },
    };
    const route =
      source.layout === "divergent-head"
        ? await adapter.execute(command)
        : await adapter.preview(command);
    const routeSummary =
      route.kind === "rejected"
        ? route
        : route.kind === "accepted"
          ? {
              kind: route.kind,
              events: route.events,
              receipts: route.receipts,
              aggregate_digest: k.kernelDigest(route.aggregate),
            }
          : { kind: route.kind };
    const repeat = await migration.apply(source.task_id, taskBytesDigest(bytes));
    const repeatUnchanged = canonicalBytes.equals(await readFile(path.join(target, relative)));
    const rollback = await migration.rollback(applied.proof);
    return {
      dry,
      applied: { kind: applied.kind, receipt: applied.proof.receipt },
      canonical: {
        events: read.record.events,
        receipts: read.record.aggregate.mutation_receipts,
        aggregate_digest: k.kernelDigest(read.record.aggregate),
        projection_digest: applied.proof.receipt.projection_digest,
        effect_states: read.record.aggregate.effects,
        next_action: compared.next_action,
      },
      command_sequence: [command],
      route: routeSummary,
      repeat: repeat.kind,
      repeat_unchanged: repeatUnchanged,
      rollback,
      restored_digest: taskBytesDigest(await readFile(path.join(target, relative))),
      base_digest: taskBytesDigest(await readFile(path.join(base, relative))),
      backups,
      writes,
    };
  } finally {
    await rm(parent, { recursive: true, force: true });
  }
}

export async function captureKernelWorkspaceReplay(anchor: string) {
  if (!/^[a-f0-9]{40}$/u.test(anchor)) throw new Error("Exact qualification anchor required");
  const fixtures = [];
  for (const fixture of await kernelWorkspaceReplayCases())
    fixtures.push({
      identity: {
        fixture_id: fixture.id,
        implementation_anchor: anchor,
        source_digest: replayBytesDigest(fixture.source_bytes),
        reproduction_command: `node scripts/bench/qualify-kernel-replay.mjs ${anchor}`,
      },
      family: "workspaces",
      source_bytes: fixture.source_bytes,
      expected: await observeKernelWorkspaceReplay(fixture.source_bytes),
    });
  return fixtures;
}
