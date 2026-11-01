import { mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, expect, it } from "vitest";
import { RetirementEvidence } from "./stale-admission-retirement-evidence.js";
import {
  retirementBytesDigest,
  type RetirementContext,
  type RetirementRequest,
} from "./stale-admission-retirement-validation.js";

const roots: string[] = [];
afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});
async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "retirement-evidence-"));
  roots.push(root);
  const common = path.join(root, ".git");
  await mkdir(common);
  const request: RetirementRequest = {
    schema_version: 1,
    kind: "stale_admission_retirement_request",
    task_id: "evidence-fixture",
    repository_identity: "sha256:" + "a".repeat(64),
    policy_digest: "sha256:" + "b".repeat(64),
    source_digest: "sha256:" + "c".repeat(64),
    journal_digest: "sha256:" + "d".repeat(64),
    operation_key: "sha256:" + "e".repeat(64),
    work_order_digest: "sha256:" + "f".repeat(64),
    exchange_digest: "sha256:" + "1".repeat(64),
    result_digest: null,
    original_checkout: path.join(root, ".agentplane/worktrees/missing"),
  };
  const ctx: RetirementContext = {
    checkout: root,
    common_git_dir: common,
    task_id: request.task_id,
    workflow_dir: ".agentplane/tasks",
    worktrees_dir: ".agentplane/worktrees",
    observe_binding: () => Promise.resolve(request),
  };
  const before = {
    source: "---\r\nexact source\n",
    journal: '{"old":"intent"}\r\n',
    work_order: '{"old":"work"}\n',
    exchange: '{"old":"exchange"}',
    result: null,
  };
  return { root, ctx, request, before, evidence: new RetirementEvidence(ctx, request) };
}

it.each([null, '{"genuine":"retained result"}\r\n'])(
  "retains every exact beforeimage and result absence (%s)",
  async (result) => {
    const f = await fixture();
    const before = { ...f.before, result };
    const prepared = await f.evidence.prepare(
      before,
      '{"native":"journal"}\n',
      '{"status":"retired"}\n',
    );
    expect(prepared.before).toEqual(before);
    const retained = await f.evidence.readPrepared();
    expect(retained?.before).toEqual(before);
    const first = await f.evidence.receipt(prepared, true);
    const bytes = await readFile(first.path);
    const repeated = await f.evidence.receipt(prepared, true);
    expect(repeated.present).toBe(true);
    expect(await readFile(first.path)).toEqual(bytes);
    expect(first.receipt.prior_effect_outcome).toBe("unassessed");
    expect(first.receipt.disposition).toBe("admission_retired");
  },
);
it("refuses a different request for an operation after an interrupted intent write", async () => {
  const f = await fixture();
  await mkdir(f.evidence.directory, { recursive: true });
  await writeFile(
    path.join(f.evidence.directory, "intent.json"),
    JSON.stringify(f.request, null, 2) + "\n",
  );
  expect(await f.evidence.readPrepared()).toBeNull();
  const changed = new RetirementEvidence(f.ctx, {
    ...f.request,
    policy_digest: f.request.source_digest,
  });
  await expect(changed.readPrepared()).rejects.toThrow(/different request/u);
  const prepared = await f.evidence.prepare(f.before, "journal after\n", "exchange after\n");
  expect(prepared.before).toEqual(f.before);
});
it("refuses beforeimage, prepared record and receipt tampering", async () => {
  for (const target of ["object", "prepared", "receipt"]) {
    const f = await fixture();
    const prepared = await f.evidence.prepare(f.before, "journal after\n", "exchange after\n");
    const receipt = await f.evidence.receipt(prepared, true);
    const file =
      target === "object"
        ? path.join(
            f.evidence.directory,
            "objects",
            retirementBytesDigest(f.before.source).slice(7) + ".source",
          )
        : target === "prepared"
          ? path.join(f.evidence.directory, "prepared.json")
          : receipt.path;
    await writeFile(file, '{"tampered":true}\n');
    if (target === "receipt")
      await expect(f.evidence.receipt(prepared, true)).rejects.toThrow(/receipt changed/u);
    else await expect(f.evidence.readPrepared()).rejects.toThrow();
  }
});
it("does not recreate lost prepared evidence under a completed receipt", async () => {
  const f = await fixture();
  const prepared = await f.evidence.prepare(f.before, "journal after\n", "exchange after\n");
  await f.evidence.receipt(prepared, true);
  await rm(path.join(f.evidence.directory, "prepared.json"));
  await expect(f.evidence.readPrepared()).rejects.toThrow(/lost its prepared evidence/u);
});
it("refuses a linked evidence directory before writing outside the native root", async () => {
  const f = await fixture();
  const outside = await mkdtemp(path.join(os.tmpdir(), "retirement-outside-"));
  roots.push(outside);
  await mkdir(path.dirname(f.evidence.directory), { recursive: true });
  await symlink(outside, f.evidence.directory, "junction");
  await expect(f.evidence.prepare(f.before, "after", "after")).rejects.toThrow(/symlink/u);
  await expect(readFile(path.join(outside, "intent.json"))).rejects.toMatchObject({
    code: "ENOENT",
  });
});
