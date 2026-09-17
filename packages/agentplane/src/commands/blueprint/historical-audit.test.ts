import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { blueprintSnapshotDigest } from "../../blueprints/snapshot.js";
import {
  auditHistoricalBlueprintSnapshot,
  projectHistoricalBlueprintAudit,
} from "./historical-audit.js";

const TASK_ID = "202609170000-AUDIT1";

async function fixtureRoot(): Promise<{ root: string; snapshotPath: string }> {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-historical-blueprint-"));
  const snapshotPath = path.join(
    root,
    ".agentplane/tasks",
    TASK_ID,
    "blueprint/resolved-snapshot.json",
  );
  await mkdir(path.dirname(snapshotPath), { recursive: true });
  return { root, snapshotPath };
}

describe("historical Blueprint audit", () => {
  it("returns the exact stored bytes and cold identity fields", async () => {
    const { root, snapshotPath } = await fixtureRoot();
    const payload = {
      schemaVersion: 1,
      artifactKind: "agentplane.blueprint.resolved_snapshot",
      selectedBlueprint: { id: "code.branch_pr", version: 1 },
    };
    const storedDigest = blueprintSnapshotDigest(payload).value;
    const source = `${JSON.stringify({ ...payload, digest: { algorithm: "sha256", value: storedDigest } }, null, 2)}\n`;
    await writeFile(snapshotPath, source, "utf8");

    const audit = await auditHistoricalBlueprintSnapshot({
      repository_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: TASK_ID,
    });

    expect(audit).toMatchObject({
      kind: "decoded",
      source_bytes: source,
      source_byte_length: Buffer.byteLength(source),
      identity: {
        artifact_kind: "agentplane.blueprint.resolved_snapshot",
        schema_version: 1,
        selected_blueprint_id: "code.branch_pr",
        selected_blueprint_version: 1,
        stored_digest: storedDigest,
      },
    });
    expect(audit.kind === "decoded" ? audit.source_digest : "").toMatch(/^sha256:[a-f0-9]{64}$/u);
    expect(projectHistoricalBlueprintAudit(audit)).not.toHaveProperty("source_bytes");
  });

  it("reports invalid stored bytes without replacing them", async () => {
    const { root, snapshotPath } = await fixtureRoot();
    const source = "{not-json}\n";
    await writeFile(snapshotPath, source, "utf8");

    const audit = await auditHistoricalBlueprintSnapshot({
      repository_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: TASK_ID,
    });

    expect(audit).toMatchObject({ kind: "invalid", source_bytes: source });
  });

  it("reports digest tampering while retaining the changed bytes", async () => {
    const { root, snapshotPath } = await fixtureRoot();
    const source = `${JSON.stringify({
      schemaVersion: 1,
      artifactKind: "agentplane.blueprint.resolved_snapshot",
      digest: { algorithm: "sha256", value: "a".repeat(64) },
      selectedBlueprint: { id: "code.branch_pr", version: 1 },
    })}\n`;
    await writeFile(snapshotPath, source, "utf8");

    const audit = await auditHistoricalBlueprintSnapshot({
      repository_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: TASK_ID,
    });

    expect(audit).toMatchObject({ kind: "invalid", source_bytes: source });
    expect(audit.kind === "invalid" ? audit.reason : "").toContain("digest mismatch");
  });

  it("reports missing evidence and never regenerates it", async () => {
    const { root } = await fixtureRoot();
    const audit = await auditHistoricalBlueprintSnapshot({
      repository_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: TASK_ID,
    });
    expect(audit).toMatchObject({ kind: "missing" });
  });
});
