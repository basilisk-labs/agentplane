import { describe, expect, it } from "vitest";

import { DEFAULT_WORKFLOW_TEMPLATE, buildWorkflowFromTemplates } from "./build.js";

describe("workflow-runtime/build", () => {
  it("merges override front matter and sections", () => {
    const out = buildWorkflowFromTemplates({
      baseTemplate: DEFAULT_WORKFLOW_TEMPLATE,
      projectOverrideTemplate: `---
mode: branch_pr
owners:
  orchestrator: ORCHESTRATOR
---

## Prompt Template
Repository {{ runtime.repo_root }}

## Checks
- preflight
- verify
- finish
- custom
`,
      runtimeContext: {
        workflow: { mode: "branch_pr", version: 1 },
        runtime: { repo_root: "/repo" },
      },
    });

    expect(out.text).toContain('mode: "branch_pr"');
    expect(out.text).toContain("Repository /repo");
    expect(out.text).toContain("- custom");
  });

  it("reports strict rendering errors", () => {
    const out = buildWorkflowFromTemplates({
      baseTemplate: DEFAULT_WORKFLOW_TEMPLATE,
      projectOverrideTemplate: `---
mode: direct
owners:
  orchestrator: ORCHESTRATOR
---

## Prompt Template
Unknown {{ missing.value }}

## Checks
- preflight

## Fallback
f
`,
      runtimeContext: {
        workflow: { mode: "direct", version: 1 },
        runtime: { repo_root: "/repo" },
      },
    });

    expect(out.diagnostics.some((d) => d.code === "WF_TEMPLATE_UNKNOWN_VARIABLE")).toBe(true);
  });
});
