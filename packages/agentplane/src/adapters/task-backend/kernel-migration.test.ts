import { mkdtemp, readFile, writeFile, rm, symlink } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { parseTaskReadme, renderTaskReadme, taskKernel } from "@agentplaneorg/core/tasks";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LocalBackend } from "../../backends/task-backend.js";
import {
  LocalTaskByteStore,
  taskBytesDigest,
} from "../../backends/task-backend/local-task-byte-store.js";
import { makeTaskCommandContext } from "@agentplane/testkit/task";
import {
  runKernelMigration,
  taskKernelMigrateSpec,
} from "../../commands/task/kernel-migrate.command.js";
import { KernelMigration, KERNEL_MIGRATION_EXTENSION } from "./kernel-migration.js";
import { classifyMigrationInputs } from "./kernel-migration-source.js";
import { KernelBackendAdapter } from "./kernel-backend-adapter.js";

const mocks = vi.hoisted(() => ({ identity: vi.fn() }));
vi.mock("../../commands/task/execution-authority-context.js", () => ({
  resolveLogicalRepositoryIdentity: mocks.identity,
}));
const paths: string[] = [];
const taskId = "202608300000-MGR001";
const identity = taskKernel.kernelDigest("migration-fixture-repository");
afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(paths.splice(0).map((p) => rm(p, { recursive: true, force: true })));
});
async function fixture(status = "TODO") {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-kernel-migration-"));
  paths.push(root);
  const backend = new LocalBackend({ dir: root });
  await backend.writeTask({
    id: taskId,
    title: "Migration fixture",
    description: "Preserve source bytes",
    status,
    priority: "med",
    owner: "CODER",
    tags: [],
    depends_on: [],
    verify: [],
  });
  const file = path.join(root, taskId, "README.md");
  // Preserve real YAML formatting, comments, Unicode and CRLF in the exact backup.
  const original = await readFile(file, "utf8");
  const text = original
    .replace("---\n", "---\n# source comment: точные байты\n")
    .replaceAll("\n", "\r\n");
  await writeFile(file, text);
  const store = new LocalTaskByteStore(backend);
  return { root, file, text, backend, store, migration: new KernelMigration(store, identity) };
}

describe("explicit canonical migration", () => {
  it.each(["TODO", "DOING", "BLOCKED"])(
    "dry-runs %s, atomically applies an empty PLANNING record, repeats and restores exact bytes",
    async (status) => {
      const f = await fixture(status);
      const source = await f.migration.inspect(taskId);
      expect(source.kind).toBe("legacy_active");
      expect(await readFile(f.file, "utf8")).toBe(f.text);
      const result = await f.migration.apply(taskId, taskBytesDigest(f.text));
      expect(result.kind).toBe("applied");
      if (result.kind !== "applied") throw new Error(JSON.stringify(result));
      const fresh = await new KernelBackendAdapter(
        new LocalBackend({ dir: f.root }),
        identity,
      ).read(taskId);
      expect(fresh.kind).toBe("canonical");
      if (fresh.kind !== "canonical") throw new Error(JSON.stringify(fresh));
      expect(fresh.record.aggregate).toMatchObject({
        state: "PLANNING",
        current_plan: null,
        work_items: {},
        effects: [],
        mutation_receipts: {},
        final_validation: null,
      });
      expect(result.proof.receipt).toMatchObject({
        source_class: "legacy_active",
        source_digest: taskBytesDigest(f.text),
        backup_digest: taskBytesDigest(f.text),
        repository_identity: identity,
        source_schema: "task-readme-v1",
      });
      expect(await f.store.readBackup(result.proof.receipt.backup_location)).toBe(f.text);
      const bytes = await readFile(f.file);
      expect(await f.migration.apply(taskId, taskBytesDigest(f.text))).toEqual({
        kind: "already_applied",
        proof: result.proof,
      });
      expect(await readFile(f.file)).toEqual(bytes);
      expect(await f.migration.rollback(result.proof)).toEqual({
        kind: "rolled_back",
        source_digest: taskBytesDigest(f.text),
      });
      expect(await readFile(f.file, "utf8")).toBe(f.text);
    },
  );

  it("archives DONE without inventing a completed kernel plan", async () => {
    const f = await fixture("DONE");
    const dry = await f.migration.dryRun(taskId);
    expect(dry.rollback_capability).toBe("exact_bytes_cas");
    const result = await f.migration.apply(taskId, taskBytesDigest(f.text));
    expect(result.kind).toBe("applied");
    if (result.kind === "applied")
      expect(result.proof.output_bytes_digest).toBe(dry.proposed_output_bytes_digest);
    const fresh = await new KernelBackendAdapter(f.backend, identity).read(taskId);
    expect(fresh).toMatchObject({
      kind: "archived",
      archive: { read_only: true, source_digest: taskBytesDigest(f.text) },
    });
  });

  it.each(["source_changed", "backup_failure", "cas_race", "lost_response", "readback_failure"])(
    "handles %s without unguarded writes",
    async (mode) => {
      const f = await fixture();
      const compare = f.store.compareAndSwap.bind(f.store);
      if (mode === "source_changed") await writeFile(f.file, f.text + "\nchanged\n");
      if (mode === "backup_failure")
        vi.spyOn(f.store, "backup").mockRejectedValue(new Error("disk failed"));
      if (mode === "cas_race") vi.spyOn(f.store, "compareAndSwap").mockResolvedValue(false);
      if (mode === "lost_response")
        vi.spyOn(f.store, "compareAndSwap").mockImplementation(async (source, next) => {
          await compare(source, next);
          throw new Error("lost response");
        });
      if (mode === "readback_failure")
        vi.spyOn(f.store, "compareAndSwap").mockImplementation(async (source, next) => {
          const applied = await compare(source, next);
          vi.spyOn(f.store, "read").mockRejectedValue(new Error("read unavailable"));
          return applied;
        });
      const result = await f.migration.apply(taskId, taskBytesDigest(f.text));
      expect(result).toMatchObject(
        mode === "lost_response"
          ? { kind: "applied" }
          : {
              kind: "refused",
              reason: {
                source_changed: "source_changed",
                backup_failure: "backup_mismatch",
                cas_race: "source_changed",
                readback_failure: "write_in_doubt",
              }[mode],
            },
      );
      if (["backup_failure", "cas_race"].includes(mode))
        expect(await readFile(f.file, "utf8")).toBe(f.text);
      if (["lost_response", "readback_failure"].includes(mode)) {
        const restartedStore = new LocalTaskByteStore(new LocalBackend({ dir: f.root }));
        const restarted = new KernelMigration(restartedStore, identity);
        const write = vi.spyOn(restartedStore, "compareAndSwap");
        const recovered = await restarted.apply(taskId, taskBytesDigest(f.text));
        expect(recovered.kind).toBe("already_applied");
        expect(write).not.toHaveBeenCalled();
        if (recovered.kind !== "already_applied") throw new Error(JSON.stringify(recovered));
        expect(await restarted.rollback(recovered.proof)).toEqual({
          kind: "rolled_back",
          source_digest: taskBytesDigest(f.text),
        });
        expect(await readFile(f.file, "utf8")).toBe(f.text);
      }
    },
  );

  it.each(["metadata", "revision", "backup", "identity", "receipt"])(
    "refuses rollback after %s changes",
    async (mode) => {
      const f = await fixture();
      const result = await f.migration.apply(taskId, taskBytesDigest(f.text));
      if (result.kind !== "applied") throw new Error(JSON.stringify(result));
      const proof = structuredClone(result.proof);
      if (mode === "metadata")
        await writeFile(f.file, (await readFile(f.file, "utf8")) + "\nnew note\n");
      if (mode === "revision") {
        const parsed = parseTaskReadme(await readFile(f.file, "utf8"));
        parsed.frontmatter.revision = 9;
        await writeFile(f.file, renderTaskReadme(parsed.frontmatter, parsed.body));
      }
      if (mode === "backup")
        await writeFile(path.join(f.root, proof.receipt.backup_location), "corrupt");
      if (mode === "identity") proof.receipt.repository_identity = taskKernel.kernelDigest("other");
      if (mode === "receipt") proof.receipt.output_revision += 1;
      const before = await readFile(f.file);
      expect(await f.migration.rollback(proof)).toMatchObject({
        kind: "refused",
        reason:
          mode === "backup"
            ? "backup_mismatch"
            : ["identity", "receipt"].includes(mode)
              ? "invalid_receipt"
              : "state_changed_after_migration",
      });
      expect(await readFile(f.file)).toEqual(before);
    },
  );

  it.each(["malformed", "unknown_schema", "ambiguous", "invalid_encoding", "malformed_canonical"])(
    "quarantines %s without backup or output mutation",
    async (mode) => {
      const f = await fixture();
      if (mode === "malformed") await writeFile(f.file, "bad source");
      else if (mode === "invalid_encoding")
        await writeFile(f.file, Buffer.from([0xff, 0xfe, 0x00]));
      else {
        const parsed = parseTaskReadme(f.text);
        if (mode === "unknown_schema") parsed.frontmatter.doc_version = 99;
        if (mode === "ambiguous")
          parsed.frontmatter.extensions = { fixture: { required_inputs: ["implementation"] } };
        if (mode === "malformed_canonical")
          parsed.frontmatter.extensions = { task_kernel: { schema_version: 9 } };
        await writeFile(f.file, renderTaskReadme(parsed.frontmatter, parsed.body));
      }
      const before = await readFile(f.file);
      const backup = vi.spyOn(f.store, "backup");
      expect(await f.migration.inspect(taskId)).toMatchObject({ kind: "quarantined" });
      expect(await f.migration.apply(taskId, taskBytesDigest(before))).toMatchObject({
        kind: "refused",
      });
      expect(backup).not.toHaveBeenCalled();
      expect(await readFile(f.file)).toEqual(before);
    },
  );

  it("quarantines unresolved runtime effects and reports the exact ambiguous input field", async () => {
    const f = await fixture();
    const parsed = parseTaskReadme(f.text);
    parsed.frontmatter.extensions = {
      "agentplane.task_centric_runtime": {
        schema_version: 1,
        leases: [],
        pending_effects: [{ state: "IN_DOUBT" }],
        checkpoints: [],
        retry_budgets: [],
        mutation_receipts: {},
      },
    };
    await writeFile(f.file, renderTaskReadme(parsed.frontmatter, parsed.body));
    expect(await f.migration.dryRun(taskId)).toMatchObject({
      classification: "quarantined",
      reason: "unreconciled_runtime",
    });
    parsed.frontmatter.extensions = { fixture: { required_inputs: ["unknown"] } };
    await writeFile(f.file, renderTaskReadme(parsed.frontmatter, parsed.body));
    expect(await f.migration.dryRun(taskId)).toMatchObject({
      classification: "quarantined",
      reason: "ambiguous_required_inputs",
      fields: ["frontmatter.extensions.fixture.required_inputs[0]"],
    });
  });

  it("classifies only typed context and output identities and rejects collisions", () => {
    expect(
      classifyMigrationInputs({
        required_inputs: ["ctx", "out"],
        context_refs: [{ id: "ctx", kind: "source_artifact" }],
        expected_outputs: [{ id: "out", kind: "report" }],
      }),
    ).toEqual({ context_refs: ["ctx"], output_manifest_refs: ["out"] });
    expect(() =>
      classifyMigrationInputs({
        required_inputs: ["same"],
        context_refs: [{ id: "same", kind: "source_artifact" }],
        expected_outputs: [{ id: "same", kind: "report" }],
      }),
    ).toThrow("ambiguous_required_inputs");
    expect(() =>
      classifyMigrationInputs({ required_inputs: ["out"], expected_outputs: ["out"] }),
    ).toThrow("ambiguous_required_inputs");
  });

  it("stops a canary batch before the next record when the canary fails", async () => {
    const f = await fixture();
    const apply = vi.spyOn(f.migration, "apply");
    expect(
      await f.migration.applyCanaryBatch([
        { task_id: taskId, source_digest: taskKernel.kernelDigest("stale") },
        { task_id: "202608300000-MGR002", source_digest: taskKernel.kernelDigest("next") },
      ]),
    ).toEqual([{ kind: "refused", reason: "source_changed" }]);
    expect(apply).toHaveBeenCalledTimes(1);
  });

  it("rejects symlinked source and backup paths without following them", async () => {
    const f = await fixture();
    const source = await f.store.read(taskId);
    if (!source) throw new Error("fixture missing");
    const backupLocation = `${taskId}/migration-${source.digest.slice(7)}.source`;
    const other = path.join(f.root, "other");
    await writeFile(other, "do not modify");
    await symlink(other, path.join(f.root, backupLocation));
    expect(await f.migration.apply(taskId, source.digest)).toEqual({
      kind: "refused",
      reason: "backup_mismatch",
    });
    expect(await readFile(other, "utf8")).toBe("do not modify");
    await rm(f.file);
    await symlink(other, f.file);
    await expect(f.store.read(taskId)).rejects.toThrow(/symlink|non-regular/u);
  });

  it("exposes dry-run, guarded apply and exact rollback through the operator command", async () => {
    const f = await fixture();
    mocks.identity.mockResolvedValue(identity);
    const ctx = makeTaskCommandContext({ taskBackend: f.backend });
    ctx.resolvedProject.gitRoot = f.root;
    const stdout = vi.spyOn(process.stdout, "write").mockReturnValue(true);
    expect(taskKernelMigrateSpec.id).toEqual(["task", "kernel-migrate"]);
    await expect(runKernelMigration(ctx, { taskId, apply: false, yes: false })).resolves.toBe(0);
    const report = JSON.parse(String(stdout.mock.calls.at(-1)?.[0])) as { source_digest: string };
    expect(report).toMatchObject({
      classification: "legacy_active",
      source_digest: taskBytesDigest(f.text),
    });
    expect(report).not.toHaveProperty("text");
    await expect(runKernelMigration(ctx, { taskId, apply: true, yes: true })).rejects.toMatchObject(
      { code: "E_USAGE" },
    );
    await expect(
      runKernelMigration(ctx, {
        taskId,
        apply: true,
        sourceDigest: report.source_digest,
        yes: true,
      }),
    ).resolves.toBe(0);
    const proofPath = path.join(f.root, "migration-proof.json");
    await writeFile(proofPath, String(stdout.mock.calls.at(-1)?.[0]));
    await expect(
      runKernelMigration(ctx, { taskId, apply: false, rollback: proofPath, yes: true }),
    ).resolves.toBe(0);
    expect(await readFile(f.file, "utf8")).toBe(f.text);
  });

  it("persists receipt and canonical output in the same CAS record", async () => {
    const f = await fixture();
    const compare = vi.spyOn(f.store, "compareAndSwap");
    await f.migration.apply(taskId, taskBytesDigest(f.text));
    expect(compare).toHaveBeenCalledTimes(1);
    const parsed = parseTaskReadme(compare.mock.calls[0]![1]);
    expect(parsed.frontmatter.extensions).toHaveProperty(KERNEL_MIGRATION_EXTENSION);
    expect(parsed.frontmatter.extensions).toHaveProperty("task_kernel");
  });
});
