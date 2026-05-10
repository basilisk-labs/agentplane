import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import {
  renderAcrSchemaJson,
  renderTaskHandoffSchemaJson,
  renderTaskPrMetaSchemaJson,
  renderTaskReadmeFrontmatterSchemaJson,
  renderTasksExportSchemaJson,
  listAcrSchemaErrors,
  listTaskReadmeFrontmatterSchemaErrors,
  validateAcr,
  validateTaskHandoff,
  validateTaskPrMeta,
  validateTaskReadmeFrontmatter,
  validateTasksExportSnapshot,
  withTaskReadmeFrontmatterDefaults,
} from "../index.js";

const validAcr = () => ({
  acr_version: "0.1.0",
  record_type: "agent_change_record",
  record_id: "acr_01HXEXAMPLE",
  created_at: "2026-05-03T12:00:00.000Z",
  producer: { name: "agentplane", version: "0.4.2" },
  repository: {
    vcs: "git",
    base_ref: "main",
    base_commit: "1111111111111111111111111111111111111111",
    work_ref: "task/202605031625-886KZ6/acr-core-schema",
    work_commit: "2222222222222222222222222222222222222222",
  },
  task: {
    task_id: "202605031625-886KZ6",
    title: "ACR v0.1 core schema contract",
    intent: "Add the Agent Change Record v0.1 schema contract.",
  },
  agent: {
    id: "CODER",
    name: "Codex",
    agent_type: "coding_agent",
    model: { provider: "openai", name: "unknown", version: "unknown" },
    toolchain: [{ name: "agentplane", version: "0.4.2" }],
  },
  plan: {
    status: "approved",
    artifact: {
      path: ".agentplane/tasks/202605031625-886KZ6/README.md",
      sha256: "sha256:1111111111111111111111111111111111111111111111111111111111111111",
    },
    approved_at: "2026-05-03T12:10:00.000Z",
    approved_by: { type: "agentplane_role", id: "ORCHESTRATOR" },
  },
  permissions: {
    filesystem: {
      allowed_paths: ["packages/**"],
      protected_paths: [".github/**", "secrets/**"],
    },
    network: { mode: "disabled" },
    secrets: { access: "none" },
    tools: [{ name: "shell", allowed: true }],
  },
  policy: {
    policy_version: "0.1.0",
    decisions: [
      {
        rule_id: "plan.required",
        decision: "pass",
        reason: "Approved plan artifact exists.",
      },
    ],
  },
  changes: {
    summary: "Added ACR v0.1 schema support.",
    diff_stats: { files_changed: 3, insertions: 120, deletions: 0 },
    files: [
      {
        path: "packages/core/src/tasks/task-artifact-schema.acr.ts",
        status: "added",
        risk_categories: ["schema", "evidence"],
      },
    ],
    risk: {
      level: "medium",
      categories: ["schema"],
      protected_paths_touched: false,
    },
  },
  verification: {
    status: "passed",
    checks: [
      {
        check_id: "schemas-check",
        type: "schema_validation",
        command: "bun run schemas:check",
        status: "passed",
        exit_code: 0,
      },
    ],
  },
  approvals: [
    {
      approval_id: "approval_01HXEXAMPLE",
      type: "plan_approval",
      decision: "approved",
      approved_by: { type: "agentplane_role", id: "ORCHESTRATOR" },
      approved_at: "2026-05-03T12:10:00.000Z",
      scope: "task",
    },
  ],
  evidence: [
    {
      type: "plan",
      path: ".agentplane/tasks/202605031625-886KZ6/README.md",
      sha256: "sha256:1111111111111111111111111111111111111111111111111111111111111111",
    },
  ],
  result: {
    status: "verified",
    merge_ready: true,
    residual_risks: [],
    rollback: {
      available: true,
      notes:
        "Revert work_commit 2222222222222222222222222222222222222222 if downstream validation fails.",
    },
  },
  integrity: {
    digest_algorithm: "sha256",
    record_digest: "sha256:2222222222222222222222222222222222222222222222222222222222222222",
    canonicalization: "rfc8785-jcs",
    signatures: [],
  },
});

describe("task-artifact-schema", () => {
  it("published task artifact schema artifacts match the runtime schema source", async () => {
    const specAcrUrl = new URL("../../../spec/schemas/acr-v0.1.schema.json", import.meta.url);
    const specTaskReadmeUrl = new URL(
      "../../../spec/schemas/task-readme-frontmatter.schema.json",
      import.meta.url,
    );
    const specTasksExportUrl = new URL(
      "../../../spec/schemas/tasks-export.schema.json",
      import.meta.url,
    );
    const specPrMetaUrl = new URL("../../../spec/schemas/pr-meta.schema.json", import.meta.url);
    const specTaskHandoffUrl = new URL(
      "../../../spec/schemas/task-handoff.schema.json",
      import.meta.url,
    );
    const coreTaskReadmeUrl = new URL(
      "../../schemas/task-readme-frontmatter.schema.json",
      import.meta.url,
    );
    const coreTasksExportUrl = new URL("../../schemas/tasks-export.schema.json", import.meta.url);
    const corePrMetaUrl = new URL("../../schemas/pr-meta.schema.json", import.meta.url);
    const coreTaskHandoffUrl = new URL("../../schemas/task-handoff.schema.json", import.meta.url);
    const coreAcrUrl = new URL("../../schemas/acr-v0.1.schema.json", import.meta.url);

    const renderedAcr = JSON.parse(renderAcrSchemaJson()) as unknown;
    const renderedTaskReadme = JSON.parse(renderTaskReadmeFrontmatterSchemaJson()) as unknown;
    const renderedTasksExport = JSON.parse(renderTasksExportSchemaJson()) as unknown;
    const renderedPrMeta = JSON.parse(renderTaskPrMetaSchemaJson()) as unknown;
    const renderedTaskHandoff = JSON.parse(renderTaskHandoffSchemaJson()) as unknown;

    const [
      specTaskReadme,
      specTasksExport,
      specPrMeta,
      specTaskHandoff,
      specAcr,
      coreTaskReadme,
      coreTasksExport,
      corePrMeta,
      coreTaskHandoff,
      coreAcr,
    ] = await Promise.all([
      readFile(fileURLToPath(specTaskReadmeUrl), "utf8"),
      readFile(fileURLToPath(specTasksExportUrl), "utf8"),
      readFile(fileURLToPath(specPrMetaUrl), "utf8"),
      readFile(fileURLToPath(specTaskHandoffUrl), "utf8"),
      readFile(fileURLToPath(specAcrUrl), "utf8"),
      readFile(fileURLToPath(coreTaskReadmeUrl), "utf8"),
      readFile(fileURLToPath(coreTasksExportUrl), "utf8"),
      readFile(fileURLToPath(corePrMetaUrl), "utf8"),
      readFile(fileURLToPath(coreTaskHandoffUrl), "utf8"),
      readFile(fileURLToPath(coreAcrUrl), "utf8"),
    ]);

    expect(JSON.parse(specAcr)).toEqual(renderedAcr);
    expect(JSON.parse(specTaskReadme)).toEqual(renderedTaskReadme);
    expect(JSON.parse(specTasksExport)).toEqual(renderedTasksExport);
    expect(JSON.parse(specPrMeta)).toEqual(renderedPrMeta);
    expect(JSON.parse(specTaskHandoff)).toEqual(renderedTaskHandoff);
    expect(JSON.parse(coreTaskReadme)).toEqual(renderedTaskReadme);
    expect(JSON.parse(coreTasksExport)).toEqual(renderedTasksExport);
    expect(JSON.parse(corePrMeta)).toEqual(renderedPrMeta);
    expect(JSON.parse(coreTaskHandoff)).toEqual(renderedTaskHandoff);
    expect(JSON.parse(coreAcr)).toEqual(renderedAcr);
  });

  it("validates a minimal ACR v0.1 record", () => {
    expect(() => validateAcr(validAcr())).not.toThrow();
  });

  it("rejects unknown top-level ACR fields", () => {
    const errors = listAcrSchemaErrors({ ...validAcr(), unexpected: true });

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("Unrecognized key(s)");
  });

  it("rejects absolute ACR evidence paths", () => {
    const acr = validAcr();
    acr.evidence[0].path = "/tmp/secret.log";

    const errors = listAcrSchemaErrors(acr);

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("evidence[0].path");
  });

  it("rejects ACR paths that escape the repository", () => {
    const acr = validAcr();
    acr.changes.files[0].path = "../outside.ts";

    const errors = listAcrSchemaErrors(acr);

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("changes.files[0].path");
  });

  it("rejects Windows-style ACR evidence paths", () => {
    const windowsTraversal = validAcr();
    windowsTraversal.evidence[0].path = String.raw`..\outside.txt`;

    const windowsTraversalErrors = listAcrSchemaErrors(windowsTraversal);

    expect(windowsTraversalErrors).toHaveLength(1);
    expect(windowsTraversalErrors[0]).toContain("evidence[0].path");

    const windowsAbsolute = validAcr();
    windowsAbsolute.evidence[0].path = String.raw`C:\tmp\acr.json`;

    const windowsAbsoluteErrors = listAcrSchemaErrors(windowsAbsolute);

    expect(windowsAbsoluteErrors).toHaveLength(1);
    expect(windowsAbsoluteErrors[0]).toContain("evidence[0].path");
  });

  it("rejects malformed ACR sha256 digests", () => {
    const acr = validAcr();
    acr.integrity.record_digest = "sha256:not-a-digest";

    const errors = listAcrSchemaErrors(acr);

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("integrity.record_digest");
  });

  it("accepts null ACR record digest for draft/schema-only records", () => {
    const acr = validAcr();
    acr.result.merge_ready = false;
    acr.integrity.record_digest = null;

    expect(() => validateAcr(acr)).not.toThrow();
  });

  it("enforces Git object id shape for ACR repository commits", () => {
    const acr = validAcr();
    acr.repository.work_commit = "def456";

    const errors = listAcrSchemaErrors(acr);

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("repository.work_commit");
  });

  it("rejects unknown ACR risk categories", () => {
    const acr = validAcr();
    acr.changes.risk.categories = ["code"];

    const errors = listAcrSchemaErrors(acr);

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("changes.risk.categories[0]");
  });

  it("runtime validators accept the published spec examples", async () => {
    const examplesRoot = path.join(process.cwd(), "packages", "spec", "examples");
    const [taskReadmeExample, tasksExportExample, prMetaExample, taskHandoffExample] =
      await Promise.all([
        readFile(path.join(examplesRoot, "task-readme-frontmatter.json"), "utf8"),
        readFile(path.join(examplesRoot, "tasks.json"), "utf8"),
        readFile(path.join(examplesRoot, "pr-meta.json"), "utf8"),
        readFile(path.join(examplesRoot, "task-handoff.json"), "utf8"),
      ]);

    expect(() =>
      validateTaskReadmeFrontmatter(JSON.parse(taskReadmeExample) as unknown),
    ).not.toThrow();
    expect(() =>
      validateTasksExportSnapshot(JSON.parse(tasksExportExample) as unknown),
    ).not.toThrow();
    expect(() => validateTaskPrMeta(JSON.parse(prMetaExample) as unknown)).not.toThrow();
    expect(() => validateTaskHandoff(JSON.parse(taskHandoffExample) as unknown)).not.toThrow();
  });

  it("accepts short non-git commit hashes in task README frontmatter", () => {
    expect(() =>
      validateTaskReadmeFrontmatter({
        id: "202603251535-DPZ4NN",
        title: "Short commit hash fixture",
        status: "DONE",
        priority: "high",
        owner: "CODER",
        depends_on: [],
        tags: ["code"],
        verify: [],
        plan_approval: { state: "approved", updated_at: null, updated_by: null, note: null },
        verification: { state: "ok", attempts: 0, updated_at: null, updated_by: null, note: null },
        comments: [],
        events: [],
        doc_version: 3,
        doc_updated_at: "2026-03-25T17:20:00.000Z",
        doc_updated_by: "CODER",
        description: "Fixture",
        id_source: "generated",
        commit: { hash: "abc", message: "external backend reference" },
      } satisfies Record<string, unknown>),
    ).not.toThrow();
  });

  it("accepts specialized blueprint requests in task artifact schemas", () => {
    const task = withTaskReadmeFrontmatterDefaults({
      id: "202603251535-DPZ4NN",
      title: "Specialized blueprint fixture",
      status: "TODO",
      priority: "high",
      owner: "CODER",
      depends_on: [],
      tags: ["code", "performance"],
      task_kind: "code",
      mutation_scope: "code",
      blueprint_request: "performance.benchmark",
      verify: [],
      plan_approval: { state: "approved", updated_at: null, updated_by: null, note: null },
      verification: { state: "pending", updated_at: null, updated_by: null, note: null },
      comments: [],
      doc_version: 3,
      doc_updated_at: "2026-03-25T17:20:00.000Z",
      doc_updated_by: "CODER",
      description: "Fixture",
      id_source: "generated",
    });

    expect(() => validateTaskReadmeFrontmatter(task)).not.toThrow();
    expect(() =>
      validateTasksExportSnapshot({
        tasks: [
          {
            ...task,
            commit: null,
            dirty: false,
          },
        ],
        meta: {
          schema_version: 1,
          managed_by: "agentplane",
          checksum_algo: "sha256",
          checksum: "abc",
        },
      }),
    ).not.toThrow();
  });

  it("normalizes legacy medium priority before README schema validation", () => {
    expect(() =>
      validateTaskReadmeFrontmatter(
        withTaskReadmeFrontmatterDefaults({
          id: "202603251535-DPZ4NN",
          title: "Legacy medium priority fixture",
          status: "TODO",
          priority: "medium",
          owner: "CODER",
          depends_on: [],
          tags: [],
          verify: [],
          plan_approval: { state: "approved", updated_at: null, updated_by: null, note: null },
          verification: { state: "pending", updated_at: null, updated_by: null, note: null },
          comments: [],
          doc_version: 3,
          doc_updated_at: "2026-03-25T17:30:00.000Z",
          doc_updated_by: "CODER",
          description: "Fixture",
        }),
      ),
    ).not.toThrow();
  });

  it("formats nested and multiple task artifact schema errors consistently", () => {
    const errors = listTaskReadmeFrontmatterSchemaErrors(
      withTaskReadmeFrontmatterDefaults({
        id: "202603251535-DPZ4NN",
        title: "Nested validation fixture",
        status: "TODO",
        priority: "normal",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: [],
        plan_approval: { state: "invalid", updated_at: null, updated_by: null, note: null },
        verification: { state: "pending", updated_at: null, updated_by: null, note: null },
        comments: [{ author: "", body: "" }],
        doc_version: 3,
        doc_updated_at: "2026-03-25T17:30:00.000Z",
        doc_updated_by: "CODER",
        description: "Fixture",
      }),
    );

    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain("task README frontmatter schema validation failed:");
    expect(errors[0]).toContain("comments[0].author");
    expect(errors[0]).toContain("comments[0].body");
  });
});
