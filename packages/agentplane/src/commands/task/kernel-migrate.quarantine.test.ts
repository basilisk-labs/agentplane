import { spawnSync } from "node:child_process";
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { installRunCliIntegrationHarness, tempRepo, cleanGitEnv } from "@agentplane/testkit";
import {
  createLegacyTaskAggregate,
  renderTaskReadme,
  withTaskCentricAggregate,
} from "@agentplaneorg/core/tasks";
import { taskBytesDigest } from "../../backends/task-backend/local-task-byte-store.js";

installRunCliIntegrationHarness();
const roots: Awaited<ReturnType<typeof tempRepo>>[] = [];
afterEach(async () => {
  await Promise.all(roots.splice(0).map((r) => r.cleanup()));
});
const id = "202610310000-QWAR12";
const cli = fileURLToPath(new URL("../../../bin/agentplane.js", import.meta.url));
function invoke(root: string, args: string[]) {
  const p = spawnSync("node", [cli, ...args, "--root", root], {
    cwd: root,
    encoding: "utf8",
    timeout: 30_000,
    maxBuffer: 4 * 1024 * 1024,
    env: {
      ...cleanGitEnv(),
      AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK: "1",
      AGENTPLANE_DEV_AUTO_BOOTSTRAP: "0",
      AGENTPLANE_NO_UPDATE_CHECK: "1",
      AGENTPLANE_HOOK_RUNNER: cli,
    },
  });
  if (p.error) throw p.error;
  return { code: p.status, stdout: p.stdout, stderr: p.stderr };
}
async function fixture(workItemCount = 0) {
  const repo = await tempRepo({ withDefaultConfig: true, branch: "main" });
  roots.push(repo);
  const init = invoke(repo.root, [
    "init",
    "--force",
    "--yes",
    "--recipes",
    "none",
    "--workflow",
    "direct",
    "--require-network-approval",
    "true",
  ]);
  expect(init.code, init.stdout + init.stderr).toBe(0);
  const aggregate = createLegacyTaskAggregate({
    id,
    revision: 2,
    title: "Retain ambiguous history",
    description: "Keep exact bytes",
    status: "DOING",
    acceptance_criteria: ["Retained"],
    captured_at: "2026-09-01T00:00:00Z",
    updated_at: "2026-09-01T00:00:00Z",
  });
  const source = renderTaskReadme(
    {
      schema_version: 1,
      doc_version: 3,
      doc_updated_at: "2026-09-01T00:00:00Z",
      doc_updated_by: "TEST",
      id,
      title: "Retain ambiguous history",
      description: "Keep exact bytes",
      status: "DOING",
      priority: "med",
      owner: "CODER",
      tags: ["meta"],
      depends_on: [],
      verify: ["Retained"],
      revision: 3,
      extensions: withTaskCentricAggregate(
        {},
        {
          ...aggregate,
          work_items: Object.fromEntries(
            Array.from({ length: workItemCount }, (_, index) => {
              const itemId = `pending-${index}`;
              return [
                itemId,
                {
                  id: itemId,
                  state: "READY" as const,
                  revision: 1,
                  attempt: 0,
                  claim_id: null,
                  output_manifests: [],
                  validation_result: null,
                  last_failure: null,
                },
              ];
            }),
          ),
        },
      ),
    },
    "# Historical evidence\n\nСохранить точные байты.\n",
  )
    .replace("---\n", "---\n# Source comment\n")
    .replaceAll("\n", "\r\n");
  const file = path.join(repo.root, ".agentplane/tasks", id, "README.md");
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, source);
  return { ...repo, file, source };
}

describe("public Node quarantine operator workflow", () => {
  it(
    "authenticates quarantined history from a compact worktree without hiding a bad local source",
    { timeout: 120_000 },
    async () => {
      const f = await fixture();
      const applied = invoke(f.root, [
        "task",
        "kernel-migrate",
        id,
        "--apply",
        "--source-digest",
        taskBytesDigest(f.source),
        "--yes",
      ]);
      expect(applied.code, applied.stdout + applied.stderr).toBe(1);
      const result = JSON.parse(applied.stdout) as {
        quarantine_proof: { backup_location: string };
      };
      expect(result).toMatchObject({ kind: "quarantined", persisted: true });
      const after = await readFile(f.file, "utf8");
      const compact = path.join(f.root, ".agentplane/worktrees/quarantine-doctor");
      const git = (cwd: string, ...args: string[]) => {
        const p = spawnSync("git", ["-c", "core.hooksPath=/dev/null", ...args], {
          cwd,
          encoding: "utf8",
          env: cleanGitEnv(),
        });
        expect(p.status, p.stdout + p.stderr).toBe(0);
      };
      git(f.root, "add", "--all");
      git(f.root, "add", "--force", "--all", ".agentplane");
      git(f.root, "commit", "-m", "Retain quarantined fixture history");
      git(f.root, "config", "extensions.worktreeConfig", "true");
      git(f.root, "worktree", "add", "--no-checkout", "-b", "compact-history", compact);
      git(compact, "sparse-checkout", "set", "--no-cone", "/*", "!/.agentplane/tasks/*");
      git(compact, "config", "--worktree", "agentplane.compactTaskHistory", "true");
      git(compact, "read-tree", "-mu", "HEAD");
      await mkdir(path.join(compact, ".agentplane/tasks"), { recursive: true });
      expect(await readFile(path.join(compact, ".agentplane/WORKFLOW.md"), "utf8")).toBe(
        await readFile(path.join(f.root, ".agentplane/WORKFLOW.md"), "utf8"),
      );
      const local = path.join(compact, ".agentplane/tasks", id, "README.md");
      await expect(readFile(local, "utf8")).rejects.toMatchObject({ code: "ENOENT" });

      let doctor = invoke(compact, ["doctor"]);
      expect(doctor.code, doctor.stdout + doctor.stderr).toBe(0);
      expect(doctor.stdout + doctor.stderr).toContain("retained lifecycle migration quarantine");

      await mkdir(path.dirname(local), { recursive: true });
      await writeFile(local, after + "\nEdited local afterimage\n");
      doctor = invoke(compact, ["doctor"]);
      expect(doctor.code).not.toBe(0);
      expect(doctor.stdout + doctor.stderr).toContain("quarantine source proof failed");
      await rm(path.dirname(local), { recursive: true });

      const backup = path.join(
        f.root,
        ".agentplane/tasks",
        result.quarantine_proof.backup_location,
      );
      await rm(backup);
      doctor = invoke(compact, ["doctor"]);
      expect(doctor.code).not.toBe(0);
      expect(doctor.stdout + doctor.stderr).toContain("quarantine source proof failed");
      expect(await readFile(f.file, "utf8")).toBe(after);
    },
  );

  it(
    "previews, quarantines, checks diagnostics, refuses work, replays and rolls back exact bytes",
    { timeout: 120_000 },
    async () => {
      const f = await fixture();
      const preview = invoke(f.root, ["task", "kernel-migrate", id]);
      expect(preview.code).toBe(1);
      const read = JSON.parse(preview.stdout) as { source_digest: string };
      expect(read).toMatchObject({
        classification: "quarantined",
        reason: "source_revision_mismatch",
        persisted: false,
      });
      expect(read.source_digest).toBe(taskBytesDigest(f.source));
      expect(await readFile(f.file, "utf8")).toBe(f.source);
      const applyArgs = [
        "task",
        "kernel-migrate",
        id,
        "--apply",
        "--source-digest",
        read.source_digest,
        "--yes",
      ];
      const applied = invoke(f.root, applyArgs);
      expect(applied.code, applied.stdout + applied.stderr).toBe(1);
      const proof = JSON.parse(applied.stdout) as {
        quarantine_proof: { backup_location: string; output_bytes_digest: string };
      };
      expect(proof).toMatchObject({
        kind: "quarantined",
        persisted: true,
        reason: "source_revision_mismatch",
      });
      const after = await readFile(f.file, "utf8");
      expect(taskBytesDigest(after)).toBe(proof.quarantine_proof.output_bytes_digest);
      expect(
        await readFile(
          path.join(f.root, ".agentplane/tasks", proof.quarantine_proof.backup_location),
          "utf8",
        ),
      ).toBe(f.source);
      const retained = invoke(f.root, ["task", "kernel-migrate", id]);
      expect(retained.code).toBe(1);
      expect(JSON.parse(retained.stdout) as unknown).toMatchObject({
        classification: "quarantined",
        persisted: true,
        source_digest: read.source_digest,
      });
      const doctor = invoke(f.root, ["doctor"]);
      expect(doctor.code, doctor.stdout + doctor.stderr).toBe(0);
      expect(doctor.stdout + doctor.stderr).toContain(
        `retained lifecycle migration quarantine for ${id}`,
      );
      expect(doctor.stdout + doctor.stderr).toContain("source_revision_mismatch");
      const advance = invoke(f.root, ["task", "advance", id, "--agent-json"]);
      expect(advance.code).not.toBe(0);
      expect(advance.stderr).toContain("E_PHASE_POLICY");
      expect(advance.stderr).toContain("Ordinary advancement is disabled");
      expect(await readFile(f.file, "utf8")).toBe(after);
      const repeated = invoke(f.root, applyArgs);
      expect(repeated.code).toBe(1);
      expect((JSON.parse(repeated.stdout) as typeof proof).quarantine_proof).toEqual(
        proof.quarantine_proof,
      );
      expect(await readFile(f.file, "utf8")).toBe(after);
      const proofPath = path.join(f.root, "quarantine-result.json");
      await writeFile(proofPath, JSON.stringify(proof));
      const rollback = invoke(f.root, [
        "task",
        "kernel-migrate",
        id,
        "--rollback",
        proofPath,
        "--yes",
      ]);
      expect(rollback.code, rollback.stdout + rollback.stderr).toBe(0);
      expect(JSON.parse(rollback.stdout) as unknown).toMatchObject({
        kind: "rolled_back",
        source_digest: read.source_digest,
      });
      expect(await readFile(f.file, "utf8")).toBe(f.source);
      const restoredDoctor = invoke(f.root, ["doctor"]);
      expect(restoredDoctor.code).not.toBe(0);
      expect(restoredDoctor.stdout + restoredDoctor.stderr).toContain(
        `task-centric revision split blocks ${id}`,
      );
    },
  );

  it(
    "rolls back the complete emitted result for a large retained mapping within the unchanged file limit",
    { timeout: 120_000 },
    async () => {
      const f = await fixture(500);
      const applied = invoke(f.root, [
        "task",
        "kernel-migrate",
        id,
        "--apply",
        "--source-digest",
        taskBytesDigest(f.source),
        "--yes",
      ]);
      expect(applied.code, applied.stderr).toBe(1);
      const result = JSON.parse(applied.stdout) as {
        kind: string;
        persisted: boolean;
        quarantine_proof: unknown;
      };
      expect(result).toMatchObject({ kind: "quarantined", persisted: true });
      expect(Buffer.byteLength(JSON.stringify(result.quarantine_proof))).toBeLessThan(1024);
      expect(Buffer.byteLength(applied.stdout)).toBeLessThan(1024 * 1024);
      const proofPath = path.join(f.root, "large-quarantine-result.json");
      await writeFile(proofPath, applied.stdout);
      const rollback = invoke(f.root, [
        "task",
        "kernel-migrate",
        id,
        "--rollback",
        proofPath,
        "--yes",
      ]);
      expect(rollback.code, rollback.stdout + rollback.stderr).toBe(0);
      expect(await readFile(f.file, "utf8")).toBe(f.source);
    },
  );

  it(
    "keeps missing backup and edited afterimage as Doctor errors",
    { timeout: 120_000 },
    async () => {
      const f = await fixture();
      const applied = invoke(f.root, [
        "task",
        "kernel-migrate",
        id,
        "--apply",
        "--source-digest",
        taskBytesDigest(f.source),
        "--yes",
      ]);
      expect(applied.code).toBe(1);
      const result = JSON.parse(applied.stdout) as {
        quarantine_proof: { backup_location: string; output_bytes_digest: string };
      };
      const after = await readFile(f.file, "utf8");
      const backup = path.join(
        f.root,
        ".agentplane/tasks",
        result.quarantine_proof.backup_location,
      );
      await rm(backup);
      let doctor = invoke(f.root, ["doctor"]);
      expect(doctor.code).not.toBe(0);
      expect(doctor.stdout + doctor.stderr).toContain("quarantine source proof failed");
      await writeFile(backup, f.source);
      await writeFile(f.file, after + "\nEdited body\n");
      doctor = invoke(f.root, ["doctor"]);
      expect(doctor.code).not.toBe(0);
      expect(doctor.stdout + doctor.stderr).toContain("quarantine source proof failed");
      const proofPath = path.join(f.root, "quarantine-result.json");
      await writeFile(proofPath, JSON.stringify(result));
      const refused = invoke(f.root, [
        "task",
        "kernel-migrate",
        id,
        "--rollback",
        proofPath,
        "--yes",
      ]);
      expect(refused.code).not.toBe(0);
      expect(await readFile(f.file, "utf8")).toBe(after + "\nEdited body\n");
    },
  );
});
