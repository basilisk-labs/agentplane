import { describe, expect, it } from "vitest";

import type { CommandSpec } from "./spec.js";
import { renderCommandHelpJson, renderCommandHelpText } from "./help-render.js";

describe("cli2 help render", () => {
  it("renders JSON deterministically", () => {
    const spec: CommandSpec = {
      id: ["task", "new"],
      group: "Task",
      summary: "Create a task.",
      options: [
        {
          kind: "string",
          name: "title",
          valueHint: "<text>",
          required: true,
          description: "Title.",
        },
        {
          kind: "string",
          name: "tag",
          valueHint: "<tag>",
          repeatable: true,
          minCount: 1,
          description: "Tags.",
        },
        {
          kind: "boolean",
          name: "quiet",
          description: "Quiet.",
        },
      ],
      examples: [{ cmd: 'agentplane task new --title "X" --tag cli', why: "Example." }],
      notes: ["Note."],
    };

    const json = renderCommandHelpJson(spec);
    expect(json.id).toEqual(["task", "new"]);
    expect(json.usage[0]).toContain("agentplane task new");
    expect(json.options.map((o) => o.name)).toEqual(["title", "tag", "quiet"]);
  });

  it("renders compact text", () => {
    const spec: CommandSpec = {
      id: ["x"],
      group: "Test",
      summary: "test",
      options: [
        {
          kind: "string",
          name: "msg",
          short: "m",
          valueHint: "<text>",
          required: true,
          description: "m",
        },
      ],
    };
    const text = renderCommandHelpText(spec, { compact: true, includeHeader: false });
    expect(text).toContain("Usage:");
    expect(text).toContain("--msg <text>");
  });
});
