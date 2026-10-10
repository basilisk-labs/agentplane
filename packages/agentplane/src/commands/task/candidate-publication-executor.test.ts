import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync, readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  appendSideEffectAuthorityAudit,
  withSideEffectAuthorityState,
} from "../shared/side-effect-authority.js";
import { nativeCandidateFixture } from "./candidate-publication.test-helpers.js";
import {
  admitCandidatePublication,
  candidatePublicationOperation,
  prepareCandidatePublication,
} from "./candidate-publication-admission.js";
import { readCandidateTree } from "./candidate-publication-tree.js";
import { publishCandidateWithJournal } from "./candidate-publication-executor.js";

const roots: string[] = [];
afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});
async function fixture() {
  const root = mkdtempSync(path.join(os.tmpdir(), "candidate-journal-"));
  roots.push(root);
  const git = (...args: string[]) =>
    execFileSync("git", args, {
      cwd: root,
      encoding: "utf8",
      env: { ...process.env, GIT_CONFIG_GLOBAL: os.devNull, GIT_CONFIG_NOSYSTEM: "1" },
    }).trim();
  git("init", "--quiet");
  git("config", "user.name", "Fixture");
  git("config", "user.email", "fixture@example.invalid");
  writeFileSync(path.join(root, "file"), "base");
  git("add", "file");
  git("-c", `core.hooksPath=${os.devNull}`, "commit", "--quiet", "-m", "base");
  const base = git("rev-parse", "HEAD");
  writeFileSync(path.join(root, "file"), "candidate");
  git("add", "file");
  git("-c", `core.hooksPath=${os.devNull}`, "commit", "--quiet", "-m", "candidate");
  const commit = git("rev-parse", "HEAD");
  const f = nativeCandidateFixture(root, commit);
  const tree = await readCandidateTree(root, base, commit);
  const preparation = await prepareCandidatePublication({
    ...f,
    work_order_digest: f.pins.work_order_digest,
    base_commit: base,
    commit,
    frozen_files_digest: tree.files_digest,
    review_digest: k.kernelDigest("review"),
    remote_url: "https://example.invalid/project.git",
    candidate_ref: `refs/heads/agentplane-candidates/fixture/${commit}`,
  });
  const request = preparation.request;
  const fingerprint = f.raw.state_fingerprint;
  const issued_at = new Date().toISOString();
  const grant = await admitCandidatePublication({
    ...f,
    request,
    fingerprint,
    actor: "USER",
    approved_digest: preparation.approval_digest,
    issued_at,
    expires_at: new Date(Date.now() + 600_000).toISOString(),
  });
  const operation = candidatePublicationOperation(request);
  const state = appendSideEffectAuthorityAudit({
    state: { schemaVersion: 1, grants: [grant], audit: [] },
    at: issued_at,
    actor: "USER",
    operation,
    fingerprint,
    authority: grant,
    outcome: "approved",
  });
  const context = {
    ...f,
    fingerprint,
    task: { extensions: withSideEffectAuthorityState({ extensions: {} }, state) },
  };
  let head: string | null = null;
  let pushes = 0;
  const port = {
    read: async () => head,
    create: async () => {
      pushes += 1;
      head = commit;
    },
  };
  const options = {
    root,
    directory: path.join(root, ".git", "candidate-operation"),
    request,
    readContext: async () => context,
    port,
  };
  return {
    ...f,
    options,
    context,
    commit,
    pushes: () => pushes,
    setHead: (value: string | null) => {
      head = value;
    },
  };
}

describe("candidate supervisor publication journal", () => {
  it("records only exact publication and replays its authenticated receipt without another push", async () => {
    const f = await fixture();
    const before = JSON.stringify(f.record);
    const first = await publishCandidateWithJournal(f.options);
    const second = await publishCandidateWithJournal(f.options);
    expect(first).toEqual(second);
    expect(f.pushes()).toBe(1);
    expect(first).toMatchObject({
      observed_head: f.commit,
      qualification: "not_established",
      reconciled: false,
    });
    expect(JSON.stringify(f.record)).toBe(before);
    const journal = JSON.parse(
      readFileSync(path.join(f.options.directory, "journal.json"), "utf8"),
    );
    expect(journal.operations).toHaveLength(1);
    expect(journal.operations[0].status).toBe("completed");
  });
  it("reconciles crash-after-effect against exact remote truth without retrying", async () => {
    const f = await fixture();
    const create = f.options.port.create;
    f.options.port.create = async () => {
      await create();
      throw new Error("simulated process lost after effect");
    };
    await expect(publishCandidateWithJournal(f.options)).rejects.toThrow("lost after effect");
    const result = await publishCandidateWithJournal(f.options);
    expect(result).toMatchObject({ reconciled: true, observed_head: f.commit });
    expect(f.pushes()).toBe(1);
  });
  it("does not retry an unresolved intent when remote is absent", async () => {
    const f = await fixture();
    let calls = 0;
    f.options.port.create = async () => {
      calls += 1;
      throw new Error("transport interrupted");
    };
    await expect(publishCandidateWithJournal(f.options)).rejects.toThrow("interrupted");
    await expect(publishCandidateWithJournal(f.options)).rejects.toThrow("will not be retried");
    expect(calls).toBe(1);
  });
  it("rejects revocation after journal admission before dispatch", async () => {
    const f = await fixture();
    let reads = 0;
    f.options.readContext = async () => {
      reads += 1;
      if (reads === 3) f.context.task.extensions = {};
      return f.context;
    };
    await expect(publishCandidateWithJournal(f.options)).rejects.toThrow("revoked");
    expect(f.pushes()).toBe(0);
  });
  it("rejects rehashed receipt substitution and remote drift on replay", async () => {
    const f = await fixture();
    await publishCandidateWithJournal(f.options);
    const file = path.join(f.options.directory, "receipt.json");
    const value = JSON.parse(readFileSync(file, "utf8"));
    value.tree = "f".repeat(40);
    const { digest: _digest, ...contents } = value;
    writeFileSync(file, JSON.stringify({ ...contents, digest: k.kernelDigest(contents) }));
    await expect(publishCandidateWithJournal(f.options)).rejects.toThrow("receipt identity");
    f.setHead("e".repeat(40));
    await expect(publishCandidateWithJournal(f.options)).rejects.toThrow("remote identity changed");
    expect(f.pushes()).toBe(1);
  });
  it("serializes overlapping controllers before a second provider operation", async () => {
    const f = await fixture();
    let release!: () => void;
    let entered!: () => void;
    const held = new Promise<void>((resolve) => {
      release = resolve;
    });
    const started = new Promise<void>((resolve) => {
      entered = resolve;
    });
    const create = f.options.port.create;
    f.options.port.create = async () => {
      entered();
      await held;
      await create();
    };
    const first = publishCandidateWithJournal(f.options);
    try {
      await started;
      await expect(publishCandidateWithJournal(f.options)).rejects.toThrow("another controller");
    } finally {
      release();
    }
    await first;
    expect(f.pushes()).toBe(1);
  });
});
