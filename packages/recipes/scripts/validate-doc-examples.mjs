import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, realpathSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

// Require an actual installed project; never fall back to a source-workspace import.
const installed = realpathSync(process.argv[2]);
const requireInstalled = createRequire(path.join(installed, "package.json"));
const entry = realpathSync(requireInstalled.resolve("@agentplaneorg/recipes"));
assert.ok(entry.startsWith(path.join(installed, "node_modules") + path.sep));
const api = await import(pathToFileURL(entry).href);
const examples = path.resolve("docs/examples/recipes-v2");
const read = (name) => JSON.parse(readFileSync(path.join(examples, name), "utf8"));
const scenario = read("scenario.json");
const selection = read("selection.json");
let assertions = 0;
const check = (fn) => {
  fn();
  assertions++;
};
check(() => assert.equal(api.validateRecipeManifest(read("manifest.json")).schema_version, "2"));
check(() => assert.equal(api.parseScenarioDefinition(scenario, ["1", "2"]).schema_version, "2"));
check(() => assert.throws(() => api.parseScenarioDefinition(scenario), /Unsupported scenario API/));
const resolved = api.resolveScenarioParameters(scenario, selection.bindings);
check(() =>
  assert.equal(
    resolved.plan_template.work_items[0].objective,
    "Inspect README.md and report to maintainers.",
  ),
);
check(() =>
  assert.match(resolved.plan_template.criteria[0].description, /maximum 5 findings; notes=false/),
);
check(() =>
  assert.throws(
    () => api.resolveScenarioParameters(scenario, []),
    api.MissingScenarioParametersError,
  ),
);
check(() =>
  assert.throws(
    () => api.resolveScenarioParameters(scenario, [...selection.bindings, selection.bindings[0]]),
    /Duplicate parameter/,
  ),
);
check(() =>
  assert.throws(
    () =>
      api.resolveScenarioParameters(scenario, [
        ...selection.bindings,
        { name: "unknown", value: true },
      ]),
    /Unknown parameter/,
  ),
);
check(() =>
  assert.throws(
    () =>
      api.resolveScenarioParameters(scenario, [
        ...selection.bindings,
        { name: "limit", value: "5" },
      ]),
    /Invalid integer/,
  ),
);
for (const value of ["../outside", "/absolute", "C:\\outside", "\\\\server\\share"])
  check(() =>
    assert.throws(
      () =>
        api.resolveScenarioParameters(scenario, [
          { name: "audience", value: "readers" },
          { name: "source", value },
        ]),
      /Invalid repo_path/,
    ),
  );
check(() =>
  assert.throws(
    () =>
      api.resolveScenarioParameters(scenario, [
        { name: "audience", value: "{{source}}" },
        { name: "source", value: "README.md" },
      ]),
    /Unresolved placeholder/,
  ),
);
for (const field of ["approval", "steps", "lifecycle"])
  check(() => assert.throws(() => api.parseScenarioV2({ ...scenario, [field]: true })));
const commandTemplate = structuredClone(scenario);
commandTemplate.plan_template.checks = [
  {
    id: "test",
    kind: "deterministic",
    required: true,
    capability: "run_checks",
    command: "echo {{audience}}",
  },
];
check(() =>
  assert.throws(
    () => api.resolveScenarioParameters(commandTemplate, selection.bindings),
    /Placeholders are forbidden/,
  ),
);
const bytes = readFileSync(path.join(examples, "legacy-unsupported.json"));
const audit = api.auditRecipeV1(bytes);
check(() => assert.equal(audit.disposition, "semantic_conversion_required"));
check(() => assert.deepEqual(Buffer.from(audit.source.base64, "base64"), bytes));
check(() =>
  assert.equal(audit.source.digest, `sha256:${createHash("sha256").update(bytes).digest("hex")}`),
);
check(() => assert.ok(audit.unresolved.some((entry) => entry.source_path === "/custom_stop")));
check(() =>
  assert.equal(api.parseScenarioDefinition(read("legacy-unsupported.json")).schema_version, "1"),
);
check(() =>
  assert.throws(
    () => api.parseScenarioDefinition(read("legacy-unsupported.json"), ["2"]),
    /Unsupported scenario API/,
  ),
);
console.log(
  JSON.stringify(
    {
      kind: "installed_recipe_documentation_examples",
      assertions,
      entry,
      package_version: requireInstalled("@agentplaneorg/recipes/package.json").version,
      scope:
        "Installed public parser/parameter/V1 audit only; native retained closure and admission were qualified separately by RC16.",
    },
    null,
    2,
  ),
);
