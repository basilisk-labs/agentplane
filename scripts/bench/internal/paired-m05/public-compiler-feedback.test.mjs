import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { publicCompilerFeedback } from "./public-compiler-feedback.mjs";
import { codingRecipe } from "./coding-recipe.mjs";

test("public feedback returns real bounded compiler diagnostics without admission", (t) => {
  const root = mkdtempSync(path.join(os.tmpdir(), "m05-public-compiler-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const scenario = codingRecipe({ id: "public-test", selection: "exact" });
  for (const name of [
    "api_contract",
    "source_path",
    "visible_check",
    "allowed_write_paths",
    "workflow",
  ])
    scenario.parameters.push({ name, type: "string", required: true });
  scenario.plan_template.work_items[0].required_inputs = Array.from(
    { length: 25 },
    (_, i) => `absent_${i}`,
  );
  writeFileSync(path.join(root, "manifest.json"), "{}");
  writeFileSync(path.join(root, "scenario.json"), JSON.stringify(scenario));
  writeFileSync(path.join(root, "agent.md"), "Public generic test instructions.");
  const cases = path.join(root, "cases.json");
  writeFileSync(
    cases,
    JSON.stringify([
      {
        id: "public-test",
        objective: "public objective",
        api: "solve",
        source_path: "src/module.mjs",
        visible_check: "node visible.test.mjs",
        allowed_write_paths: ["src/module.mjs"],
        workflow: "repair",
      },
    ]),
  );
  const result = publicCompilerFeedback(root, cases);
  assert.equal(result.scenario.passed, true);
  assert.equal(result.cases[0].passed, false);
  assert.equal(result.cases[0].truncated, true);
  assert.equal(result.cases[0].issues.length, 20);
  assert.match(result.cases[0].issues[0].message, /missing_input_declaration/u);
  assert.match(result.scope, /no native admission/u);
  writeFileSync(path.join(root, "agent.md"), "x".repeat(262_145));
  assert.throws(() => publicCompilerFeedback(root, cases), /Invalid candidate file/u);
});
