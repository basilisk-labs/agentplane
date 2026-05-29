import { describe, expect, it } from "vitest";

import {
  listTaskReadmeFrontmatterSchemaErrors,
  renderTaskReadmeFrontmatterSchemaJson,
  validateTaskReadmeFrontmatter,
  validateTasksExportSnapshot,
  withTaskReadmeFrontmatterDefaults,
} from "../index.js";

describe("task sync envelope schema", () => {
  it("validates a provider-neutral task sync envelope in task README frontmatter", () => {
    const frontmatter = withTaskReadmeFrontmatterDefaults({
      id: "202605291916-5Q6T1E",
      title: "Synced task",
      status: "TODO",
      priority: "high",
      owner: "CODER",
      depends_on: [],
      tags: ["cloud"],
      verify: ["bun run test"],
      comments: [],
      doc_version: 3,
      doc_updated_at: "2026-05-29T19:16:00.000Z",
      doc_updated_by: "CODER",
      description: "Task with external projection metadata.",
      sync: validSyncEnvelope(),
    });

    expect(() => validateTaskReadmeFrontmatter(frontmatter)).not.toThrow();
  });

  it("exports sync envelope fields in tasks snapshots", () => {
    const task = withTaskReadmeFrontmatterDefaults({
      id: "202605291916-5Q6T1E",
      title: "Provider-neutral sync envelope fixture",
      status: "TODO",
      priority: "high",
      owner: "CODER",
      depends_on: [],
      tags: ["code"],
      verify: [],
      plan_approval: { state: "approved", updated_at: null, updated_by: null, note: null },
      verification: { state: "pending", updated_at: null, updated_by: null, note: null },
      comments: [],
      doc_version: 3,
      doc_updated_at: "2026-05-29T19:17:18.812Z",
      doc_updated_by: "CODER",
      description: "Fixture",
      id_source: "generated",
      sync: validSyncEnvelope(),
    });

    expect(() =>
      validateTasksExportSnapshot({
        tasks: [{ ...task, commit: null, dirty: false }],
        meta: {
          schema_version: 1,
          managed_by: "agentplane",
          checksum_algo: "sha256",
          checksum: "abc",
        },
      }),
    ).not.toThrow();
  });

  it("rejects malformed task sync envelope entries", () => {
    const errors = listTaskReadmeFrontmatterSchemaErrors(
      withTaskReadmeFrontmatterDefaults({
        id: "202605291916-5Q6T1E",
        title: "Malformed sync envelope fixture",
        status: "TODO",
        priority: "high",
        owner: "CODER",
        depends_on: [],
        tags: ["code"],
        verify: [],
        comments: [],
        doc_version: 3,
        doc_updated_at: "2026-05-29T19:17:18.812Z",
        doc_updated_by: "CODER",
        description: "Fixture",
        sync: {
          version: 2,
          external_refs: [{ provider: "gitlab" }],
          field_policies: { status: { authority: "remote" } },
          conflicts: [
            {
              id: "conflict_1",
              kind: "field",
              severity: "warning",
              status: "open",
              summary: "Missing detected timestamp.",
            },
          ],
        },
      }),
    );

    expect(errors.join("\n")).toContain("sync");
    expect(errors.join("\n")).toContain("remote_id");
    expect(errors.join("\n")).toContain("detected_at");
  });

  it("renders task sync envelope fields in the published schema", () => {
    const schema = JSON.parse(renderTaskReadmeFrontmatterSchemaJson()) as {
      properties?: Record<string, unknown>;
    };

    expect(schema.properties).toHaveProperty("sync");
    expect(JSON.stringify(schema.properties?.sync)).toContain("external_refs");
    expect(JSON.stringify(schema.properties?.sync)).toContain("field_policies");
    expect(JSON.stringify(schema.properties?.sync)).toContain("conflicts");
  });
});

function validSyncEnvelope() {
  return {
    version: 1,
    external_refs: [
      {
        provider: "github-projects",
        connector_kind: "cloud",
        connection_id: "conn-1",
        remote_id: "item-1",
        remote_url: "https://github.com/orgs/example/projects/1/views/1?pane=issue&itemId=1",
        remote_revision: "rev-1",
        title: "Remote title",
        state: "Todo",
        synced_at: "2026-05-29T19:16:00.000Z",
      },
    ],
    field_policies: {
      status: {
        authority: "provider",
        remote_field: "Status",
        conflict_policy: "record",
        updated_at: "2026-05-29T19:16:00.000Z",
      },
      "sections.Plan": {
        authority: "agentplane",
        conflict_policy: "agentplane_wins",
      },
    },
    freshness: {
      projected_at: "2026-05-29T19:16:00.000Z",
      projection_sha256: "sha256:abcdef",
      source_revision: 3,
      provider_revision: "rev-1",
      stale: false,
    },
    conflicts: [
      {
        id: "conflict-1",
        kind: "field",
        severity: "warning",
        status: "open",
        summary: "Remote status differs from local task status.",
        provider: "github-projects",
        remote_id: "item-1",
        field: "status",
        detected_at: "2026-05-29T19:16:00.000Z",
        safe_command: "agentplane backend sync cloud --direction pull --conflict=diff --yes",
        when_to_stop: "stop if provider status should not override local status",
      },
    ],
  };
}
