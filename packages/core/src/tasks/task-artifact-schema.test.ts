import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import {
  renderTaskHandoffSchemaJson,
  renderTaskPrMetaSchemaJson,
  renderTaskReadmeFrontmatterSchemaJson,
  renderTasksExportSchemaJson,
  validateTaskHandoff,
  validateTaskPrMeta,
  validateTaskReadmeFrontmatter,
  validateTasksExportSnapshot,
  withTaskReadmeFrontmatterDefaults,
} from "../index.js";

describe("task-artifact-schema", () => {
  it("published task artifact schema artifacts match the runtime schema source", async () => {
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

    const renderedTaskReadme = JSON.parse(renderTaskReadmeFrontmatterSchemaJson()) as unknown;
    const renderedTasksExport = JSON.parse(renderTasksExportSchemaJson()) as unknown;
    const renderedPrMeta = JSON.parse(renderTaskPrMetaSchemaJson()) as unknown;
    const renderedTaskHandoff = JSON.parse(renderTaskHandoffSchemaJson()) as unknown;

    const [
      specTaskReadme,
      specTasksExport,
      specPrMeta,
      specTaskHandoff,
      coreTaskReadme,
      coreTasksExport,
      corePrMeta,
      coreTaskHandoff,
    ] = await Promise.all([
      readFile(fileURLToPath(specTaskReadmeUrl), "utf8"),
      readFile(fileURLToPath(specTasksExportUrl), "utf8"),
      readFile(fileURLToPath(specPrMetaUrl), "utf8"),
      readFile(fileURLToPath(specTaskHandoffUrl), "utf8"),
      readFile(fileURLToPath(coreTaskReadmeUrl), "utf8"),
      readFile(fileURLToPath(coreTasksExportUrl), "utf8"),
      readFile(fileURLToPath(corePrMetaUrl), "utf8"),
      readFile(fileURLToPath(coreTaskHandoffUrl), "utf8"),
    ]);

    expect(JSON.parse(specTaskReadme)).toEqual(renderedTaskReadme);
    expect(JSON.parse(specTasksExport)).toEqual(renderedTasksExport);
    expect(JSON.parse(specPrMeta)).toEqual(renderedPrMeta);
    expect(JSON.parse(specTaskHandoff)).toEqual(renderedTaskHandoff);
    expect(JSON.parse(coreTaskReadme)).toEqual(renderedTaskReadme);
    expect(JSON.parse(coreTasksExport)).toEqual(renderedTasksExport);
    expect(JSON.parse(corePrMeta)).toEqual(renderedPrMeta);
    expect(JSON.parse(coreTaskHandoff)).toEqual(renderedTaskHandoff);
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
        verification: { state: "ok", updated_at: null, updated_by: null, note: null },
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
});
