import test from "node:test";
import assert from "node:assert/strict";
import { validateConfig, defaultConfig, setByDottedKey } from "./config.js";

test("defaultConfig validates", () => {
  assert.doesNotThrow(() => validateConfig(defaultConfig()));
});

test("setByDottedKey sets nested fields and preserves object shape", () => {
  const cfg = defaultConfig() as unknown as Record<string, unknown>;
  setByDottedKey(cfg, "workflow_mode", "branch_pr");
  setByDottedKey(cfg, "paths.tasks_path", ".agentplane/tasks.json");
  const validated = validateConfig(cfg);
  assert.equal(validated.workflow_mode, "branch_pr");
  assert.equal(validated.paths.tasks_path, ".agentplane/tasks.json");
});
