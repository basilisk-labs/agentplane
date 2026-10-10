import assert from "node:assert/strict";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import path from "node:path";
import { codingRecipe } from "./coding-recipe.mjs";
import { digest } from "./contract.mjs";

// Package only reusable strategy and guidance. Reference answers and hidden
// assertions are never packaged or installed in a treatment repository.
export function writeCodingRecipePackage(root, spec, { specialize = false } = {}) {
  const scenario = codingRecipe(spec, { specialize });
  assert.ok(scenario, "No-match has no substitute package");
  const id = `m05-${spec.id}`,
    source = path.join(root, id);
  mkdirSync(source, { recursive: true });
  const manifest = {
    schema_version: "2",
    kind: "project_overlay",
    id,
    version: "1.0.0",
    name: id,
    summary: "Pure module coding strategy",
    compatibility: {
      manifest_api_version: "2",
      scenario_api_version: "2",
      runtime_api_version: "1",
    },
    agents: [
      {
        id: "worker",
        display_name: "Worker",
        role: "EXECUTOR",
        summary: "Inspect and repair the task source",
        file: "agent.md",
      },
    ],
    scenarios: [
      {
        id: spec.id,
        name: spec.id,
        summary: "Inspect and repair a pure module",
        use_when: ["Matching documented pure-module task"],
        required_inputs: ["objective"],
        outputs: ["patch"],
        permissions: [],
        artifacts: [],
        agents_involved: ["worker"],
        skills_used: [],
        tools_used: [],
        run_profile: { mode: "code" },
        file: "scenario.json",
      },
    ],
    dependency_closure: {
      schema_version: 1,
      files: [
        { source: "recipe", path: "scenario.json", dependencies: [] },
        { source: "recipe", path: "agent.md", dependencies: [] },
        ...scenario.plan_template.work_items[0].context.required_sources.map((file) => ({
          source: "repository",
          path: file,
          dependencies: [],
        })),
      ],
      packages: [],
      tools: [],
      capabilities: [
        { id: "task.verify", dependencies: [] },
        { id: "repository_write", dependencies: [] },
      ],
      commands: [{ command: "node visible.test.mjs", dependencies: [] }],
    },
  };
  writeFileSync(path.join(source, "manifest.json"), JSON.stringify(manifest));
  writeFileSync(path.join(source, "scenario.json"), JSON.stringify(scenario));
  writeFileSync(
    path.join(source, "agent.md"),
    "Inspect the documented source. Preserve visible assertions. This Recipe grants no authority and supplies no answer patch.\n",
  );
  const archive = path.join(root, `${id}.tar.gz`);
  execFileSync(
    "tar",
    [
      "--sort=name",
      "--mtime=@0",
      "--owner=0",
      "--group=0",
      "--numeric-owner",
      "-czf",
      archive,
      "-C",
      source,
      ".",
    ],
    { timeout: 5000 },
  );
  return {
    id,
    archive,
    archive_digest: `sha256:${createHash("sha256").update(readFileSync(archive)).digest("hex")}`,
    scenario_digest: digest(scenario),
    selection: {
      schema_version: 1,
      kind: "selected_recipe",
      selection: {
        recipe_id: id,
        recipe_version: "1.0.0",
        scenario_id: spec.id,
        scenario_api_version: "2",
      },
      bindings: [{ name: "objective", value: spec.objective }],
    },
  };
}
