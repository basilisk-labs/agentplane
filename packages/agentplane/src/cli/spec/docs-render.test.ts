import { describe, expect, it } from "vitest";

import { renderCliDocsMdx } from "./docs-render.js";
import type { HelpJson } from "./help-render.js";

function spec(id: string[], args: HelpJson["args"] = []): HelpJson {
  return {
    id,
    group: "Task",
    summary: id.join(" "),
    usage: [`agentplane ${id.join(" ")}`],
    args,
  };
}

describe("renderCliDocsMdx", () => {
  it("hides optional non-variadic dispatcher group roots while keeping children", () => {
    const mdx = renderCliDocsMdx([
      spec(["task", "doc"], [{ name: "subcommand", required: false, valueHint: "<subcommand>" }]),
      spec(["task", "doc", "show"]),
      spec(["task", "doc", "set"]),
    ]);

    expect(mdx).not.toContain("### task doc\n");
    expect(mdx).toContain("### task doc show");
    expect(mdx).toContain("### task doc set");
  });

  it("renders the runtime error contract from canonical metadata", () => {
    const mdx = renderCliDocsMdx([spec(["task", "show"])]);

    expect(mdx).toContain("## Runtime error contract");
    expect(mdx).toContain("`0` — Success");
    expect(mdx).toContain("`8` — Runtime");
    expect(mdx).toContain("`9` — Handoff");
    expect(mdx).toContain("Required error fields: `code`, `message`.");
    expect(mdx).toContain(
      "Optional error fields: `context`, `state`, `likely_cause`, `hint`, `remediation`, `next_action`, `reason_decode`.",
    );
    expect(mdx).toContain(
      "`next_action` required fields: `command`, `reason`; optional fields: `reasonCode`.",
    );
    expect(mdx).toContain("`E_RUNTIME` → exit `8`");
    expect(mdx).toContain("`E_HANDOFF` → exit `9`");
    expect(mdx).toContain("`E_COMMIT_ALLOW_TASK_ARTIFACT_DENIED` → exit `2`");
  });
});
