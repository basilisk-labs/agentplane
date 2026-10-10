import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, writeFileSync, rmSync, copyFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

test("actual installer rejects mixed APIs and validates a generic public V2 package", async (t) => {
  const root = mkdtempSync(path.join(os.tmpdir(), "m05-package-feedback-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const bundle = path.join(root, "public-compiler.mjs");
  execFileSync(
    "bun",
    [
      "build",
      fileURLToPath(new URL("public-package-feedback.mjs", import.meta.url)),
      "--target=node",
      "--minify",
      "--outfile=" + bundle,
    ],
    { stdio: "pipe" },
  );
  copyFileSync(
    fileURLToPath(new URL("../../../../packages/agentplane/package.json", import.meta.url)),
    path.join(root, "package.json"),
  );
  const { publicPackageFeedback } = await import(pathToFileURL(bundle).href);
  const manifest = {
    schema_version: "2",
    kind: "project_overlay",
    id: "public-fixture",
    version: "1.0.0",
    name: "Public fixture",
    summary: "Public schema fixture",
    compatibility: { scenario_api_version: "2" },
    agents: [
      {
        id: "reviewer",
        display_name: "Reviewer",
        role: "EVALUATOR",
        summary: "Inspect",
        file: "agent.md",
      },
    ],
    scenarios: [
      {
        id: "public-fixture",
        name: "Public",
        summary: "Inspect",
        use_when: ["Public validation"],
        required_inputs: [],
        outputs: [],
        permissions: [],
        artifacts: [],
        agents_involved: ["reviewer"],
        skills_used: [],
        tools_used: [],
        run_profile: { mode: "code" },
        file: "scenario.json",
      },
    ],
  };
  const scenario = {
    schema_version: "2",
    id: "public-fixture",
    goal: "Inspect",
    parameters: [],
    applicability: { required: [], excluded: [] },
    plan_template: {
      schema_version: 2,
      criteria: [{ id: "checked", description: "Check", required: true, check_ids: ["check"] }],
      checks: [{ id: "check", kind: "semantic", required: true, capability: "task.verify" }],
      work_items: [
        {
          id: "inspect",
          objective: "Inspect public interface",
          depends_on: [],
          required_inputs: [],
          expected_outputs: ["report"],
          scope_roots: ["src"],
          context: {
            required_sources: [],
            optional_sources: [],
            symbol_hints: [],
            max_bytes: 1024,
          },
          risk: "low",
          capabilities: ["task.verify"],
          resource_claims: [],
          optional: false,
          priority: 0,
        },
      ],
      assumptions: [],
      unresolved_questions: [],
    },
  };
  const save = () => writeFileSync(path.join(root, "manifest.json"), JSON.stringify(manifest));
  save();
  writeFileSync(path.join(root, "scenario.json"), JSON.stringify(scenario));
  writeFileSync(path.join(root, "agent.md"), "Inspect public artifacts without modification.");
  const cases = path.join(root, "cases.json");
  writeFileSync(cases, JSON.stringify([{ id: "public-fixture" }]));
  const valid = await publicPackageFeedback(root, cases);
  assert.equal(valid.package_assets.passed, true);
  manifest.schema_version = "1";
  save();
  const mixed = await publicPackageFeedback(root, cases);
  assert.match(mixed.package_assets.error, /expected "1"/u);
  manifest.schema_version = "2";
  delete manifest.compatibility;
  save();
  const undeclared = await publicPackageFeedback(root, cases);
  assert.equal(undeclared.package_assets.passed, false);
  manifest.compatibility = { scenario_api_version: "2" };
  save();
  writeFileSync(path.join(root, "agent.md"), "");
  const empty = await publicPackageFeedback(root, cases);
  assert.match(empty.package_assets.error, /non-empty markdown/u);
});
