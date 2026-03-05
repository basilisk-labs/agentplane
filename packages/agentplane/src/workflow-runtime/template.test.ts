import { describe, expect, it } from "vitest";

import { renderTemplateStrict, validateTemplateStrict } from "./template.js";

describe("workflow-runtime/template", () => {
  it("fails on unknown variable in strict mode", () => {
    const result = validateTemplateStrict("Hello {{ user.name }}", { task: { id: "T-1" } });
    expect(result.ok).toBe(false);
    expect(result.diagnostics.some((d) => d.code === "WF_TEMPLATE_UNKNOWN_VARIABLE")).toBe(true);
  });

  it("fails on unknown filter in strict mode", () => {
    const result = validateTemplateStrict("{{ task.id | xfilter }}", { task: { id: "T-1" } });
    expect(result.ok).toBe(false);
    expect(result.diagnostics.some((d) => d.code === "WF_TEMPLATE_UNKNOWN_FILTER")).toBe(true);
  });

  it("renders deterministically when all variables exist", () => {
    const first = renderTemplateStrict("Task {{ task.id | upper }}", { task: { id: "ab-1" } });
    const second = renderTemplateStrict("Task {{ task.id | upper }}", { task: { id: "ab-1" } });
    expect(first.diagnostics).toEqual([]);
    expect(first.text).toBe("Task AB-1");
    expect(second.text).toBe(first.text);
  });
});
