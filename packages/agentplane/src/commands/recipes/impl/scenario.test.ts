import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { readScenarioDefinition } from "./scenario.js";

describe("readScenarioDefinition", () => {
  it("normalizes required task_template data from scenario files", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-scenario-definition-"));
    const scenarioPath = path.join(tempDir, "scenario.json");

    await writeFile(
      scenarioPath,
      JSON.stringify(
        {
          schema_version: "1",
          id: "demo",
          summary: "Demo",
          goal: "Do the thing.",
          task_template: {
            title: "  Scenario task  ",
            description: "  Materialize recipe work.  ",
            owner: "  CODER  ",
            priority: "med",
            tags: ["recipes", "recipes", "runner"],
            verify: ["bun test", "bun test"],
            doc: {
              summary: "  Summary seed  ",
              verify_steps: "  Run the test suite.  ",
            },
          },
          inputs: [],
          outputs: [],
          steps: [],
        },
        null,
        2,
      ),
      "utf8",
    );

    try {
      const scenario = await readScenarioDefinition(scenarioPath);
      expect(scenario.task_template).toEqual({
        title: "Scenario task",
        description: "Materialize recipe work.",
        owner: "CODER",
        priority: "med",
        tags: ["recipes", "runner"],
        verify: ["bun test"],
        doc: {
          summary: "Summary seed",
          verify_steps: "Run the test suite.",
        },
      });
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  it("fails with a precise error when task_template is missing", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-scenario-definition-"));
    const scenarioPath = path.join(tempDir, "scenario.json");

    await writeFile(
      scenarioPath,
      JSON.stringify(
        {
          schema_version: "1",
          id: "demo",
          goal: "Do the thing.",
          inputs: [],
          outputs: [],
          steps: [],
        },
        null,
        2,
      ),
      "utf8",
    );

    try {
      await expect(readScenarioDefinition(scenarioPath)).rejects.toThrow(
        "Missing required field: scenario.task_template",
      );
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  });
});
