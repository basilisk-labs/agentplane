import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import {
  renderTaskPrMetaSchemaJson,
  renderTaskReadmeFrontmatterSchemaJson,
  renderTasksExportSchemaJson,
  validateTaskPrMeta,
  validateTaskReadmeFrontmatter,
  validateTasksExportSnapshot,
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
    const coreTaskReadmeUrl = new URL(
      "../../schemas/task-readme-frontmatter.schema.json",
      import.meta.url,
    );
    const coreTasksExportUrl = new URL("../../schemas/tasks-export.schema.json", import.meta.url);
    const corePrMetaUrl = new URL("../../schemas/pr-meta.schema.json", import.meta.url);

    const renderedTaskReadme = JSON.parse(renderTaskReadmeFrontmatterSchemaJson()) as unknown;
    const renderedTasksExport = JSON.parse(renderTasksExportSchemaJson()) as unknown;
    const renderedPrMeta = JSON.parse(renderTaskPrMetaSchemaJson()) as unknown;

    const [
      specTaskReadme,
      specTasksExport,
      specPrMeta,
      coreTaskReadme,
      coreTasksExport,
      corePrMeta,
    ] = await Promise.all([
      readFile(fileURLToPath(specTaskReadmeUrl), "utf8"),
      readFile(fileURLToPath(specTasksExportUrl), "utf8"),
      readFile(fileURLToPath(specPrMetaUrl), "utf8"),
      readFile(fileURLToPath(coreTaskReadmeUrl), "utf8"),
      readFile(fileURLToPath(coreTasksExportUrl), "utf8"),
      readFile(fileURLToPath(corePrMetaUrl), "utf8"),
    ]);

    expect(JSON.parse(specTaskReadme)).toEqual(renderedTaskReadme);
    expect(JSON.parse(specTasksExport)).toEqual(renderedTasksExport);
    expect(JSON.parse(specPrMeta)).toEqual(renderedPrMeta);
    expect(JSON.parse(coreTaskReadme)).toEqual(renderedTaskReadme);
    expect(JSON.parse(coreTasksExport)).toEqual(renderedTasksExport);
    expect(JSON.parse(corePrMeta)).toEqual(renderedPrMeta);
  });

  it("runtime validators accept the published spec examples", async () => {
    const examplesRoot = path.join(process.cwd(), "packages", "spec", "examples");
    const [taskReadmeExample, tasksExportExample, prMetaExample] = await Promise.all([
      readFile(path.join(examplesRoot, "task-readme-frontmatter.json"), "utf8"),
      readFile(path.join(examplesRoot, "tasks.json"), "utf8"),
      readFile(path.join(examplesRoot, "pr-meta.json"), "utf8"),
    ]);

    expect(() =>
      validateTaskReadmeFrontmatter(JSON.parse(taskReadmeExample) as unknown),
    ).not.toThrow();
    expect(() =>
      validateTasksExportSnapshot(JSON.parse(tasksExportExample) as unknown),
    ).not.toThrow();
    expect(() => validateTaskPrMeta(JSON.parse(prMetaExample) as unknown)).not.toThrow();
  });
});
