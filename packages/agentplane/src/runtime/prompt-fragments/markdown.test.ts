import { describe, expect, it } from "vitest";

import { parsePromptMarkdownFragments, renderPromptMarkdownFragments } from "./index.js";

describe("prompt markdown fragments", () => {
  it("parses named markdown markers and renders installed text without marker comments", () => {
    const source = [
      "# Policy",
      "",
      '<!-- ap:fragment id="policy.workflow.branch_pr.sequence.start_worktree" slot="workflow" mutability="replaceable" -->',
      "2. Start work with dedicated task branch + worktree.",
      "<!-- /ap:fragment -->",
      "",
      "Tail.",
      "",
    ].join("\n");

    const parsed = parsePromptMarkdownFragments(source, {
      source_ref: "packages/agentplane/assets/policy/workflow.branch_pr.md",
    });

    expect(parsed.has_markers).toBe(true);
    expect(parsed.fragments).toHaveLength(1);
    expect(parsed.fragments[0]).toMatchObject({
      id: "policy.workflow.branch_pr.sequence.start_worktree",
      id_source: "declared",
      slot: "workflow",
      mutability: "replaceable",
      text: "2. Start work with dedicated task branch + worktree.\n",
      source: {
        kind: "markdown_marker",
        source_ref: "packages/agentplane/assets/policy/workflow.branch_pr.md",
        index: 0,
      },
    });
    expect(renderPromptMarkdownFragments(parsed)).toBe(
      ["# Policy", "", "2. Start work with dedicated task branch + worktree.", "", "Tail.", ""].join(
        "\n",
      ),
    );
  });

  it("rejects nested, duplicate, and unclosed markdown markers", () => {
    expect(() =>
      parsePromptMarkdownFragments(
        '<!-- ap:fragment id="policy.workflow.one" slot="workflow" mutability="replaceable" -->A<!-- ap:fragment id="policy.workflow.two" slot="workflow" mutability="replaceable" -->B<!-- /ap:fragment -->',
      ),
    ).toThrow("Nested ap:fragment marker");

    expect(() =>
      parsePromptMarkdownFragments(
        '<!-- ap:fragment id="policy.workflow.one" slot="workflow" mutability="replaceable" -->A<!-- /ap:fragment --><!-- ap:fragment id="policy.workflow.one" slot="workflow" mutability="replaceable" -->B<!-- /ap:fragment -->',
      ),
    ).toThrow('Duplicate prompt fragment id "policy.workflow.one"');

    expect(() =>
      parsePromptMarkdownFragments(
        '<!-- ap:fragment id="policy.workflow.one" slot="workflow" mutability="replaceable" -->A',
      ),
    ).toThrow('Unclosed ap:fragment marker "policy.workflow.one"');
  });

  it("models unmarked markdown as a generated whole-file compatibility fragment", () => {
    const parsed = parsePromptMarkdownFragments("## PURPOSE\n\nGateway text.\n", {
      source_ref: "packages/agentplane/assets/AGENTS.md",
      fallback_slot: "body",
    });

    expect(parsed.has_markers).toBe(false);
    expect(parsed.fragments).toHaveLength(1);
    expect(parsed.fragments[0]).toMatchObject({
      id: "markdown.packages.agentplane.assets.agents.md.file",
      id_source: "generated",
      slot: "body",
      text: "## PURPOSE\n\nGateway text.\n",
      mutability: "replaceable",
      source: {
        kind: "markdown_whole_file",
        source_ref: "packages/agentplane/assets/AGENTS.md",
        index: 0,
      },
    });
    expect(renderPromptMarkdownFragments(parsed)).toBe("## PURPOSE\n\nGateway text.\n");
  });
});
