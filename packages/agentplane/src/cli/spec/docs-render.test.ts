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
});
