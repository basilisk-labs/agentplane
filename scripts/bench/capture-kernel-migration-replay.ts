import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { renderTaskReadme, taskKernel as k } from "../../packages/core/src/tasks/index.js";
import { LocalBackend } from "../../packages/agentplane/src/backends/task-backend.js";
import {
  LocalTaskByteStore,
  taskBytesDigest,
} from "../../packages/agentplane/src/backends/task-backend/local-task-byte-store.js";
import { KernelMigration } from "../../packages/agentplane/src/adapters/task-backend/kernel-migration.js";

const anchor = process.argv[2];
if (!anchor || !/^[a-f0-9]{40}$/u.test(anchor))
  throw new Error("Pass an exact migration source anchor.");
execFileSync("git", ["cat-file", "-e", `${anchor}^{commit}`]);
execFileSync(
  "git",
  [
    "diff",
    "--exit-code",
    anchor,
    "--",
    "packages/agentplane/src/adapters/task-backend/kernel-migration.ts",
    "packages/agentplane/src/adapters/task-backend/kernel-migration-source.ts",
    "packages/agentplane/src/backends/task-backend/local-task-byte-store.ts",
  ],
  { stdio: "pipe" },
);
const repositoryIdentity = k.kernelDigest("frozen-migration-repository");
const cases: {
  id: string;
  fields?: Record<string, unknown>;
  bytes?: Buffer;
  crlf?: boolean;
  classification: string;
}[] = [
  ...["TODO", "DOING", "BLOCKED", "DONE"].map((status) => ({
    id: `legacy-${status}`,
    fields: { status },
    classification: status === "DONE" ? "legacy_terminal" : "legacy_active",
  })),
  { id: "unknown-status", fields: { status: "FUTURE" }, classification: "quarantined" },
  { id: "unknown-schema", fields: { schema_version: 42 }, classification: "quarantined" },
  { id: "unknown-document", fields: { doc_version: 42 }, classification: "quarantined" },
  {
    id: "malformed-canonical",
    fields: { extensions: { task_kernel: {} } },
    classification: "quarantined",
  },
  {
    id: "unknown-runtime",
    fields: { extensions: { "agentplane.task_centric_runtime": { schema_version: 42 } } },
    classification: "quarantined",
  },
  {
    id: "unreconciled-effect",
    fields: {
      extensions: {
        "agentplane.task_centric_runtime": {
          schema_version: 1,
          leases: [],
          pending_effects: [{ id: "unknown-merge" }],
          checkpoints: [],
          retry_budgets: [],
          mutation_receipts: {},
        },
      },
    },
    classification: "quarantined",
  },
  {
    id: "source-path-ambiguous",
    fields: { extensions: { fixture: { required_inputs: ["src/main.ts"] } } },
    classification: "quarantined",
  },
  {
    id: "typed-context",
    fields: {
      extensions: { fixture: { required_inputs: [{ id: "src/main.ts", kind: "context_ref" }] } },
    },
    classification: "legacy_active",
  },
  {
    id: "typed-output",
    fields: {
      extensions: {
        fixture: { required_inputs: [{ id: "upstream-build", kind: "output_manifest" }] },
      },
    },
    classification: "legacy_active",
  },
  {
    id: "declared-output",
    fields: {
      extensions: {
        fixture: {
          required_inputs: ["upstream-build"],
          output_manifests: [{ id: "upstream-build", kind: "report" }],
        },
      },
    },
    classification: "legacy_active",
  },
  {
    id: "input-collision",
    fields: {
      extensions: {
        fixture: {
          required_inputs: ["same"],
          context_refs: [{ id: "same", kind: "file" }],
          output_manifests: [{ id: "same", kind: "report" }],
        },
      },
    },
    classification: "quarantined",
  },
  {
    id: "malformed-input-list",
    fields: { extensions: { fixture: { required_inputs: "upstream-build" } } },
    classification: "quarantined",
  },
  { id: "malformed-yaml", bytes: Buffer.from("---\nid: [\n---\n"), classification: "quarantined" },
  { id: "invalid-encoding", bytes: Buffer.from([0xff, 0xfe, 0x00]), classification: "quarantined" },
  { id: "unicode-crlf", crlf: true, classification: "legacy_active" },
];
const root = await mkdtemp(path.join(os.tmpdir(), "capture-migration-replay-"));
try {
  const migration = new KernelMigration(
    new LocalTaskByteStore(new LocalBackend({ dir: root })),
    repositoryIdentity,
  );
  const fixtures = [];
  for (const [index, value] of cases.entries()) {
    const taskId = `202608300000-MGR${String(index + 1).padStart(3, "0")}`;
    let text = renderTaskReadme(
      {
        schema_version: 1,
        doc_version: 3,
        doc_updated_at: "2026-08-30T00:00:00.000Z",
        doc_updated_by: "FIXTURE",
        id: taskId,
        revision: 4,
        title: "Frozen migration source",
        description: "Exact bytes: данные",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: [],
        ...value.fields,
      },
      "## Notes\n\nPreserve comments and source bytes.\n",
    );
    if (value.crlf) text = text.replaceAll("\n", "\r\n");
    const bytes = value.bytes ?? Buffer.from(text);
    await mkdir(path.join(root, taskId));
    await writeFile(path.join(root, taskId, "README.md"), bytes);
    const expected = await migration.dryRun(taskId);
    if (expected.classification !== value.classification)
      throw new Error(`${value.id}: ${JSON.stringify(expected)}`);
    fixtures.push({
      id: value.id,
      task_id: taskId,
      source_base64: bytes.toString("base64"),
      source_digest: taskBytesDigest(bytes),
      implementation_anchor: anchor,
      commands: ["dryRun", "apply", "apply-again", "rollback"],
      expected,
      reproduction_command: `bun x vitest run packages/agentplane/src/adapters/task-backend/kernel-replay-migration.test.ts -t ${value.id}`,
    });
  }
  await writeFile(
    "packages/agentplane/src/adapters/task-backend/kernel-replay-migration.corpus.json",
    JSON.stringify(
      {
        schema_version: 1,
        source_anchor: anchor,
        repository_identity: repositoryIdentity,
        fixtures,
      },
      null,
      2,
    ) + "\n",
    { flag: "wx" },
  );
  process.stdout.write(`Captured ${fixtures.length} frozen migration sources.\n`);
} finally {
  await rm(root, { recursive: true, force: true });
}
