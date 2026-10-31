import { mkdtemp, mkdir, readFile, writeFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createLegacyTaskAggregate,
  parseTaskReadme,
  renderTaskReadme,
  withTaskCentricAggregate,
  taskKernel as k,
  type TaskAggregate,
} from "@agentplaneorg/core/tasks";
import {
  LocalTaskByteStore,
  taskBytesDigest,
} from "../../backends/task-backend/local-task-byte-store.js";
import { applyLifecycleOwnerMigration, inspectLifecycleOwnerMigration } from "./migration-apply.js";
import { previewLifecycleOwnerMigration } from "./migration-preview.js";
import { rollbackLifecycleOwnerQuarantine } from "./migration-quarantine.js";
import { classifyKernelCutover, requireKernelIssuanceEligibility } from "./kernel-cutover.js";
import { tryAcquireSupervisorExecutionLease } from "../shared/supervisor-execution-episode.js";

const id = "202610310000-QWAR12";
const identity = k.kernelDigest("quarantine-fixture-repository");
const temporary: string[] = [];
afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(temporary.splice(0).map((p) => rm(p, { recursive: true, force: true })));
});

function sourceBytes(
  change?: (task: TaskAggregate, extensions: Record<string, unknown>) => Record<string, unknown>,
) {
  const task: TaskAggregate = {
    ...createLegacyTaskAggregate({
      id,
      revision: 2,
      title: "Preserve ambiguous history",
      description: "Retain exact source",
      status: "DOING",
      acceptance_criteria: ["Retained"],
      captured_at: "2026-09-01T00:00:00Z",
      updated_at: "2026-09-01T00:00:00Z",
    }),
    work_items: {
      pending: {
        id: "pending",
        state: "READY",
        revision: 1,
        attempt: 0,
        claim_id: null,
        output_manifests: [],
        validation_result: null,
        last_failure: null,
      },
    },
  };
  let extensions = withTaskCentricAggregate({}, task) as Record<string, unknown>;
  if (change) extensions = change(task, extensions);
  return renderTaskReadme(
    {
      schema_version: 1,
      doc_version: 3,
      doc_updated_at: "2026-09-01T00:00:00Z",
      doc_updated_by: "TEST",
      id,
      title: "Preserve ambiguous history",
      description: "Retain exact source",
      status: "DOING",
      priority: "med",
      owner: "CODER",
      tags: [],
      depends_on: [],
      verify: ["Retained"],
      revision: 3,
      extensions,
    },
    "# Original\n\nСохранить историю.\n",
  )
    .replace("---\n", "---\n# Exact source comment\n")
    .replaceAll("\n", "\r\n");
}

async function fixture(source = sourceBytes()) {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-quarantine-"));
  temporary.push(root);
  const store = new LocalTaskByteStore({ root: path.join(root, "tasks") });
  const file = path.join(store.backend.root, id, "README.md");
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, source);
  const journal = path.join(root, "supervisor", "journal.json");
  const preview = previewLifecycleOwnerMigration(Buffer.from(source));
  const binding = async () => ({
    repository_identity: identity,
    state_fingerprint_digest: k.kernelDigest((await store.read(id))!.digest),
    policy_digest: k.kernelDigest("policy"),
    authority_digest: k.kernelDigest("approved-quarantine"),
  });
  const apply = async (observe = binding) =>
    applyLifecycleOwnerMigration({
      store,
      repository_identity: identity,
      journal_path: journal,
      request: {
        task_id: id,
        source_digest: preview.source_digest,
        mapping_version: preview.mapping_version,
        mapping_digest: k.kernelDigest(preview.mapping),
        binding: await binding(),
      },
      observe_binding: observe,
    });
  return { root, store, file, journal, source, preview, binding, apply };
}

async function quarantined(f: Awaited<ReturnType<typeof fixture>>) {
  const result = await f.apply();
  expect(result).toMatchObject({
    kind: "quarantined",
    reason: "source_revision_mismatch",
    persisted: true,
  });
  if (result.kind !== "quarantined" || !result.quarantine_proof)
    throw new Error(JSON.stringify(result));
  return result.quarantine_proof;
}

describe("native quiescent legacy revision-split quarantine", () => {
  it("retains exact source and pending work, blocks issuance and rolls back exact bytes", async () => {
    const f = await fixture();
    const proof = await quarantined(f);
    const current = (await f.store.read(id))!;
    expect(current.revision).toBe(4);
    expect(current.digest).toBe(proof.output_bytes_digest);
    expect(await f.store.readBackup(proof.backup_location)).toBe(f.source);
    const parsed = parseTaskReadme(current.text);
    expect(parsed.body).toContain("Сохранить историю.");
    expect(parsed.frontmatter).toMatchObject({ status: "BLOCKED" });
    expect(parsed.frontmatter.extensions).not.toHaveProperty("task_kernel");
    expect(parsed.frontmatter.extensions).not.toHaveProperty("agentplane.task_centric");
    const task = { id, status: "BLOCKED", extensions: parsed.frontmatter.extensions } as Parameters<
      typeof classifyKernelCutover
    >[0];
    expect(classifyKernelCutover(task)).toEqual({
      kind: "migration_required",
      reason: "lifecycle_migration_quarantined",
    });
    expect(() => requireKernelIssuanceEligibility(task)).toThrow(/cannot issue new work/u);
    expect(
      await rollbackLifecycleOwnerQuarantine({
        store: f.store,
        repository_identity: identity,
        proof: proof,
      }),
    ).toMatchObject({ kind: "rolled_back", source_digest: taskBytesDigest(f.source) });
    expect(await readFile(f.file, "utf8")).toBe(f.source);
    expect(await f.store.readBackup(proof.backup_location)).toBe(f.source);
  });

  it("replays a persisted quarantine without another source write", async () => {
    const f = await fixture();
    const cas = vi.spyOn(f.store, "compareAndSwap");
    const first = await quarantined(f);
    const second = await quarantined(f);
    expect(second).toEqual(first);
    expect(cas).toHaveBeenCalledTimes(1);
  });

  it("refuses a competing writer during replay before returning a retained proof", async () => {
    const f = await fixture();
    await quarantined(f);
    const after = await readFile(f.file, "utf8");
    const cas = vi.spyOn(f.store, "compareAndSwap");
    const result = await f.apply(async () => {
      const binding = await f.binding();
      await writeFile(f.file, after + "\nConcurrent replay edit\n");
      return binding;
    });
    expect(result).toEqual({ kind: "refused", reason: "source_changed" });
    expect(cas).not.toHaveBeenCalled();
    expect(await readFile(f.file, "utf8")).toBe(after + "\nConcurrent replay edit\n");
  });

  it("reconciles a source CAS interruption through exact independent readback", async () => {
    const f = await fixture();
    const real = f.store.compareAndSwap.bind(f.store);
    const cas = vi.spyOn(f.store, "compareAndSwap").mockImplementation(async (...args) => {
      await real(...args);
      throw new Error("interrupted after publication");
    });
    const first = await quarantined(f);
    expect(await quarantined(f)).toEqual(first);
    expect(cas).toHaveBeenCalledTimes(1);
    expect(
      await rollbackLifecycleOwnerQuarantine({
        store: f.store,
        repository_identity: identity,
        proof: first,
      }),
    ).toMatchObject({ kind: "rolled_back" });
    expect(await readFile(f.file, "utf8")).toBe(f.source);
  });

  it("refuses a changed outer afterimage even with a valid retained marker", async () => {
    const f = await fixture();
    const proof = await quarantined(f);
    await writeFile(f.file, (await readFile(f.file, "utf8")) + "\nUnreviewed edit\n");
    const altered = (await f.store.read(id))!;
    expect(
      await inspectLifecycleOwnerMigration({
        store: f.store,
        repository_identity: identity,
        task_id: id,
      }),
    ).toEqual({ kind: "invalid" });
    expect(await f.apply()).toEqual({ kind: "refused", reason: "quarantine_invalid" });
    expect(
      await rollbackLifecycleOwnerQuarantine({
        store: f.store,
        repository_identity: identity,
        proof: { ...proof, output_bytes_digest: altered.digest },
      }),
    ).toEqual({ kind: "refused", reason: "state_changed_after_quarantine" });
    expect((await f.store.read(id))!.digest).toBe(altered.digest);
  });

  it.each(["missing", "changed"])("refuses %s retained backup", async (kind) => {
    const f = await fixture();
    const proof = await quarantined(f);
    const backup = path.join(f.store.backend.root, proof.backup_location);
    if (kind === "missing") await rm(backup);
    else await writeFile(backup, "Changed backup\n");
    const current = await readFile(f.file, "utf8");
    expect(await f.apply()).toEqual({ kind: "refused", reason: "quarantine_invalid" });
    expect(
      await rollbackLifecycleOwnerQuarantine({
        store: f.store,
        repository_identity: identity,
        proof: proof,
      }),
    ).toEqual({ kind: "refused", reason: "backup_mismatch" });
    expect(await readFile(f.file, "utf8")).toBe(current);
  });

  it.each(["repository", "proof", "output"])(
    "refuses a changed %s rollback binding",
    async (kind) => {
      const f = await fixture();
      const proof = await quarantined(f);
      const cas = vi.spyOn(f.store, "compareAndSwap");
      const result = await rollbackLifecycleOwnerQuarantine({
        store: f.store,
        repository_identity: kind === "repository" ? k.kernelDigest("other") : identity,
        proof:
          kind === "proof"
            ? { ...proof, source_digest: k.kernelDigest("edited") }
            : kind === "output"
              ? { ...proof, output_bytes_digest: k.kernelDigest("other") }
              : proof,
      });
      expect(result.kind).toBe("refused");
      expect(cas).not.toHaveBeenCalled();
    },
  );

  it("refuses policy drift after backup without reaching source CAS", async () => {
    const f = await fixture();
    const cas = vi.spyOn(f.store, "compareAndSwap");
    let observations = 0;
    const result = await f.apply(async () => ({
      ...(await f.binding()),
      policy_digest: ++observations === 1 ? k.kernelDigest("policy") : k.kernelDigest("changed"),
    }));
    expect(result).toEqual({ kind: "refused", reason: "preview_binding_stale" });
    expect(cas).not.toHaveBeenCalled();
    expect(await readFile(f.file, "utf8")).toBe(f.source);
  });

  it("refuses a competing source writer", async () => {
    const f = await fixture();
    const real = f.store.compareAndSwap.bind(f.store);
    vi.spyOn(f.store, "compareAndSwap").mockImplementation(async (...args) => {
      await writeFile(f.file, f.source + "\nConcurrent edit\n");
      return real(...args);
    });
    expect(await f.apply()).toEqual({ kind: "refused", reason: "source_changed" });
    expect(await readFile(f.file, "utf8")).toBe(f.source + "\nConcurrent edit\n");
  });

  it("refuses an active supervisor execution lease", async () => {
    const f = await fixture();
    const lease = await tryAcquireSupervisorExecutionLease({ journal_path: f.journal });
    expect(lease).not.toBeNull();
    try {
      expect(await f.apply()).toEqual({ kind: "refused", reason: "supervisor_execution_active" });
      expect(await readFile(f.file, "utf8")).toBe(f.source);
    } finally {
      await lease?.release();
    }
  });

  it.each(["identity", "kernel", "executing", "claimed", "lease", "effect"])(
    "preserves the refusal for %s state",
    async (kind) => {
      const source = sourceBytes((task, extensions) => {
        if (kind === "kernel") return { ...extensions, task_kernel: { unreviewed: true } };
        if (kind === "identity")
          return withTaskCentricAggregate(
            {},
            { ...task, id: "other-task", intent: { ...task.intent, task_id: "other-task" } },
          ) as Record<string, unknown>;
        if (kind === "executing" || kind === "claimed")
          return withTaskCentricAggregate(
            {},
            {
              ...task,
              work_items: {
                pending: {
                  ...task.work_items.pending!,
                  state: kind === "executing" ? "EXECUTING" : "READY",
                  claim_id: kind === "claimed" ? "active-claim" : null,
                },
              },
            },
          ) as Record<string, unknown>;
        return {
          ...extensions,
          "agentplane.task_centric_runtime": {
            schema_version: 1,
            events: [],
            leases: kind === "lease" ? [{ id: "lease-1" }] : [],
            pending_effects:
              kind === "effect"
                ? [
                    {
                      operation_id: "effect-1",
                      state: "confirmed",
                      idempotent: true,
                      receipt_ref: "receipt",
                    },
                  ]
                : [],
            checkpoints: [],
            retry_budgets: [],
            mutation_receipts: {},
          },
        };
      });
      const f = await fixture(source);
      const result = await f.apply();
      expect(result).toMatchObject({ kind: "quarantined", persisted: false });
      expect(await readFile(f.file, "utf8")).toBe(source);
    },
  );
});
