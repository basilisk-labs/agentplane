import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { isNativeVerificationJournal } from "./native-verification-journal.mjs";

const root = ".agentplane/tasks/202610231537-N35BA0/supervision/verification-runs/run-001";
const filePath = `${root}/stdout.jsonl`;
const runId = "6d668f2e-001f-46f1-9771-2f71b0ab468d";
const journal = Buffer.from('"verified"\n');

function fixture(state = "passed") {
  const status = {
    schema_version: 1,
    run_id: runId,
    binding: {
      kind: "declared_check",
      command: "bun run example:check",
      deadline_ms: 2000,
      runtime: { kind: "local_runtime_resolution" },
      command_text_truncated: false,
      command_digest: `sha256:${"a".repeat(64)}`,
    },
    state,
    success: state === "passed",
    started_at_ms: 1000,
    updated_at_ms: 1200,
    elapsed_ms: 200,
    last_activity_at_ms: 1150,
    deadline_ms: 2000,
    pid: 1234,
  };
  const manifest = {
    schema_version: 1,
    run_id: runId,
    binding: { kind: "declared_check" },
    state,
    files: [
      {
        path: "stdout.jsonl",
        bytes: journal.length,
        digest: `sha256:${createHash("sha256").update(journal).digest("hex")}`,
      },
    ],
  };
  const files = new Map([
    [filePath, journal],
    [`${root}/status.json`, Buffer.from(JSON.stringify(status))],
    [`${root}/manifest.json`, Buffer.from(JSON.stringify(manifest))],
  ]);
  const read = (path) => {
    if (!files.has(path)) throw new Error("missing");
    return files.get(path);
  };
  return { files, read, status, manifest };
}

test("admits a completed native journal only with matching status and manifest digest", () => {
  const value = fixture();
  assert.equal(isNativeVerificationJournal(filePath, value.read), true);
  value.manifest.files[0].digest = "sha256:bad";
  value.files.set(`${root}/manifest.json`, Buffer.from(JSON.stringify(value.manifest)));
  assert.equal(isNativeVerificationJournal(filePath, value.read), false);
});

test("retains interrupted nested observations without inventing a completion manifest", () => {
  const value = fixture("running");
  value.files.delete(`${root}/manifest.json`);
  assert.equal(isNativeVerificationJournal(filePath, value.read), true);
  const nestedRoot = `${root}/children/run-002`;
  const nestedStatus = {
    ...value.status,
    run_id: "e2d4d352-e03d-49ac-86c4-34dd76549e23",
    binding: {
      ...value.status.binding,
      kind: "verification_group",
      parent_run_id: runId,
    },
  };
  const nested = new Map([
    [`${nestedRoot}/stderr.jsonl`, Buffer.from('"interrupted"\n')],
    [`${nestedRoot}/status.json`, Buffer.from(JSON.stringify(nestedStatus))],
    [`${root}/status.json`, value.files.get(`${root}/status.json`)],
  ]);
  const readNested = (path) => {
    if (!nested.has(path)) throw new Error("missing");
    return nested.get(path);
  };
  assert.equal(isNativeVerificationJournal(`${nestedRoot}/stderr.jsonl`, readNested), true);
});

test("rejects unrelated paths, missing status, malformed JSONL, and invalid native status", () => {
  const value = fixture();
  assert.equal(isNativeVerificationJournal(`${root}/debug.jsonl`, value.read), false);
  assert.equal(isNativeVerificationJournal(`${root}/stdout.log`, value.read), false);
  assert.equal(
    isNativeVerificationJournal(`${root}/children/misc/stdout.jsonl`, value.read),
    false,
  );
  value.files.delete(`${root}/status.json`);
  assert.equal(isNativeVerificationJournal(filePath, value.read), false);
  value.files.set(
    `${root}/status.json`,
    Buffer.from(JSON.stringify({ ...value.status, binding: { kind: "other" } })),
  );
  assert.equal(isNativeVerificationJournal(filePath, value.read), false);
  value.files.set(`${root}/status.json`, Buffer.from(JSON.stringify(value.status)));
  value.files.set(filePath, Buffer.from("not json\n"));
  assert.equal(isNativeVerificationJournal(filePath, value.read), false);
});

test("rejects a forged minimal running status without native run metadata", () => {
  const value = fixture("running");
  value.files.delete(`${root}/manifest.json`);
  value.files.set(
    `${root}/status.json`,
    Buffer.from(
      JSON.stringify({
        schema_version: 1,
        run_id: runId,
        binding: { kind: "declared_check" },
        state: "running",
        success: false,
      }),
    ),
  );
  assert.equal(isNativeVerificationJournal(filePath, value.read), false);
});

test("artifact gate reads an aggregate above 64 MiB and still rejects staged tampering", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "agentplane-artifact-batches-"));
  const script = fileURLToPath(new URL("check-agentplane-artifacts.mjs", import.meta.url));
  const git = (...args) =>
    execFileSync("git", ["-c", "core.hooksPath=/dev/null", ...args], {
      cwd: directory,
      stdio: ["ignore", "pipe", "pipe"],
    });
  const runGate = () => spawnSync(process.execPath, [script], { cwd: directory, encoding: "utf8" });
  try {
    git("init", "-q", "-b", "main");
    git("config", "user.name", "Artifact fixture");
    git("config", "user.email", "artifact-fixture@example.com");
    mkdirSync(path.join(directory, root), { recursive: true });
    writeFileSync(path.join(directory, ".gitattributes"), ".agentplane export-ignore\n");
    const value = fixture();
    const entries = [];
    for (const [stream, byte] of [
      ["stdout", 120],
      ["stderr", 121],
    ]) {
      const bytes = Buffer.concat([
        Buffer.from('"'),
        Buffer.alloc(34 * 1024 * 1024, byte),
        Buffer.from('"\n'),
      ]);
      writeFileSync(path.join(directory, root, `${stream}.jsonl`), bytes);
      entries.push({
        path: `${stream}.jsonl`,
        bytes: bytes.length,
        digest: `sha256:${createHash("sha256").update(bytes).digest("hex")}`,
      });
    }
    writeFileSync(path.join(directory, root, "status.json"), JSON.stringify(value.status));
    writeFileSync(
      path.join(directory, root, "manifest.json"),
      JSON.stringify({ ...value.manifest, files: entries }),
    );
    git("add", "--all");
    git("commit", "-qm", "fixture native verification above one batch");
    const valid = runGate();
    assert.equal(valid.status, 0, valid.stderr);
    assert.match(valid.stdout, /agentplane artifact policy OK/);

    writeFileSync(path.join(directory, filePath), '"tampered"\n');
    assert.equal(runGate().status, 0, "the gate must inspect index bytes, not unstaged bytes");
    git("add", filePath);
    const tampered = runGate();
    assert.notEqual(tampered.status, 0);
    assert.match(tampered.stderr, /new tracked volatile/);
    assert.ok(tampered.stderr.includes(filePath));
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
