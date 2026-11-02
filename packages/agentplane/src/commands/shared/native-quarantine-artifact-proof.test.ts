import { describe, expect, it } from "vitest";
import {
  createLegacyTaskAggregate,
  parseTaskReadme,
  renderTaskReadme,
  taskKernel as k,
  withTaskCentricAggregate,
} from "@agentplaneorg/core/tasks";
import {
  createLifecycleOwnerMigrationQuarantineMarker,
  type LifecycleOwnerMigrationQuarantine,
} from "../task/migration-apply-conversion.js";
import { previewLifecycleOwnerMigration } from "../task/migration-preview.js";
import { quarantineAfterimage } from "../task/migration-quarantine.js";
import { nativeQuarantineArtifactPair } from "./native-quarantine-artifact-proof.js";

const taskId = "202611010001-QSRCE1";
const repositoryIdentity = k.kernelDigest("repository");
function fixture() {
  const aggregate = createLegacyTaskAggregate({
    id: taskId,
    revision: 2,
    title: "Retain historical work",
    description: "Preserve exact bytes",
    status: "DOING",
    acceptance_criteria: ["Retained"],
    captured_at: "2026-09-01T00:00:00Z",
    updated_at: "2026-09-01T00:00:00Z",
  });
  const source = renderTaskReadme(
    {
      id: taskId,
      revision: 3,
      status: "DOING",
      title: "Historical task",
      owner: "CODER",
      extensions: withTaskCentricAggregate({ retained: { result: "unknown" } }, aggregate),
    },
    "# Historical evidence\n\nСохранить точные байты.\n",
  )
    .replace("---\n", "---\n# Original source comment\n")
    .replaceAll("\n", "\r\n");
  const preview = previewLifecycleOwnerMigration(Buffer.from(source, "utf8"));
  const contents = {
    schema_version: 1 as const,
    kind: "lifecycle_owner_migration_quarantine" as const,
    task_id: taskId,
    repository_identity: repositoryIdentity,
    backend_identity: "local-task-readme-v1",
    source_digest: preview.source_digest,
    source_revision: preview.source_revision,
    mapping_version: preview.mapping_version,
    mapping_digest: k.kernelDigest(preview.mapping),
    mapping_receipt: preview.mapping,
    semantic_assessment_request: preview.semantic_assessment,
    reason: "source_revision_mismatch",
    backup_digest: preview.source_digest,
    backup_location: `${taskId}/migration-${preview.source_digest.slice(7)}.source`,
    output_revision: preview.source_revision + 1,
  };
  const marker = createLifecycleOwnerMigrationQuarantineMarker(contents);
  return {
    source,
    contents,
    marker,
    input: {
      taskId,
      repositoryIdentity,
      workflowDir: ".agentplane/tasks",
      source,
      afterimage: quarantineAfterimage(source, marker),
      backup: source,
    },
  };
}

describe("native quarantine byte projection", () => {
  it("admits only the exact BLOCKED projection and content-addressed raw backup", () => {
    const f = fixture();
    const before = JSON.stringify(f);
    expect(nativeQuarantineArtifactPair(f.input)).toEqual([
      `.agentplane/tasks/${taskId}/README.md`,
      `.agentplane/tasks/${f.marker.backup_location}`,
    ]);
    const after = parseTaskReadme(f.input.afterimage);
    expect(after.frontmatter.status).toBe("BLOCKED");
    expect(after.frontmatter.extensions?.retained).toEqual({ result: "unknown" });
    expect(f.input.backup).toContain("\r\n# Original source comment\r\n");
    expect(JSON.stringify(f)).toBe(before);
  });

  it.each([
    ["repository_identity", k.kernelDigest("other repository")],
    ["backend_identity", "other-backend"],
    ["task_id", "202611010002-QTHER2"],
    ["source_revision", 4],
    ["mapping_version", "unreviewed-version"],
    ["reason", "different-quarantine"],
    ["backup_location", "../outside.source"],
    ["output_revision", 5],
    ["semantic_assessment_request", { unreviewed: true }],
  ])("rejects a rehashed marker with changed %s", (key, value) => {
    const f = fixture();
    const marker = createLifecycleOwnerMigrationQuarantineMarker({ ...f.contents, [key]: value });
    expect(
      nativeQuarantineArtifactPair({
        ...f.input,
        afterimage: quarantineAfterimage(f.source, marker),
      }),
    ).toBeNull();
  });

  it("recomputes the source digest and mapping rather than trusting rehashed marker claims", () => {
    const f = fixture();
    for (const changes of [
      {
        source_digest: k.kernelDigest("other source"),
        backup_digest: k.kernelDigest("other source"),
      },
      { mapping_receipt: { other: true }, mapping_digest: k.kernelDigest({ other: true }) },
    ]) {
      const marker = createLifecycleOwnerMigrationQuarantineMarker({ ...f.contents, ...changes });
      expect(
        nativeQuarantineArtifactPair({
          ...f.input,
          afterimage: quarantineAfterimage(f.source, marker),
        }),
      ).toBeNull();
    }
  });

  it("refuses byte-normalized backups, altered bodies, promotion and new outer fields", () => {
    const f = fixture();
    const parsed = parseTaskReadme(f.input.afterimage);
    const altered = [
      { ...f.input, backup: f.source.replaceAll("\r\n", "\n") },
      { ...f.input, afterimage: `${f.input.afterimage}\nextra history\n` },
      ...["DONE", "CANCELLED"].map((status) => ({
        ...f.input,
        afterimage: renderTaskReadme({ ...parsed.frontmatter, status }, parsed.body),
      })),
      {
        ...f.input,
        afterimage: renderTaskReadme(
          { ...parsed.frontmatter, verification: { state: "ok", note: "unreviewed promotion" } },
          parsed.body,
        ),
      },
    ];
    for (const input of altered) expect(nativeQuarantineArtifactPair(input)).toBeNull();
    expect(f.input.afterimage).toBe(quarantineAfterimage(f.source, f.marker));
  });

  it("requires a genuine revision split and a valid native marker digest", () => {
    const f = fixture();
    const matchingRevision = f.source.replace("revision: 3", "revision: 2");
    expect(
      nativeQuarantineArtifactPair({
        ...f.input,
        source: matchingRevision,
        backup: matchingRevision,
      }),
    ).toBeNull();
    const marker: LifecycleOwnerMigrationQuarantine = {
      ...f.marker,
      quarantine_digest: k.kernelDigest("forged"),
    };
    expect(
      nativeQuarantineArtifactPair({
        ...f.input,
        afterimage: quarantineAfterimage(f.source, marker),
      }),
    ).toBeNull();
  });

  it("supports a configured Task directory and refuses traversal or invalid Task IDs", () => {
    const f = fixture();
    expect(nativeQuarantineArtifactPair({ ...f.input, workflowDir: "state/task-records" })).toEqual(
      [`state/task-records/${taskId}/README.md`, `state/task-records/${f.marker.backup_location}`],
    );
    for (const workflowDir of [
      "../tasks",
      "/tmp/tasks",
      "tasks/../outside",
      "tasks//records",
      "tasks\\records",
    ]) {
      expect(nativeQuarantineArtifactPair({ ...f.input, workflowDir })).toBeNull();
    }
    expect(nativeQuarantineArtifactPair({ ...f.input, taskId: "../foreign" })).toBeNull();
  });
});
