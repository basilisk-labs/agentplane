import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  readlinkSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { readSnapshotFile } from "./snapshot-file.mjs";

const hash = (bytes) => `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
const canonical = (value) =>
  Array.isArray(value)
    ? value.map((entry) => canonical(entry))
    : value && typeof value === "object"
      ? Object.fromEntries(
          Object.keys(value)
            .toSorted()
            .map((key) => [key, canonical(value[key])]),
        )
      : value;
const digest = (value) => hash(JSON.stringify(canonical(value)));
function writeJson(file, value) {
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(value, null, 2) + "\n");
}
function compactPlan(unresolved = false) {
  return {
    schema_version: 2,
    criteria: [
      {
        id: "report",
        description: "Report preserves the source facts",
        required: true,
        check_ids: ["review"],
      },
    ],
    checks: [{ id: "review", kind: "semantic", required: true, capability: "task.verify" }],
    work_items: [
      {
        id: "report",
        objective: "Report for {{audience}}",
        depends_on: [],
        required_inputs: [],
        expected_outputs: ["report"],
        scope_roots: [],
        context: { required_sources: [], optional_sources: [], symbol_hints: [], max_bytes: 4096 },
        risk: "low",
        capabilities: [],
        resource_claims: [],
        optional: false,
        priority: 1,
      },
    ],
    assumptions: [],
    unresolved_questions: unresolved ? ["Which facts require interpretation?"] : [],
  };
}
function v2(unresolved = false) {
  return {
    schema_version: "2",
    id: "report",
    goal: "Report {{audience}}",
    parameters: [{ name: "audience", type: "string", required: true }],
    applicability: { required: [], excluded: [] },
    plan_template: compactPlan(unresolved),
  };
}
function v1() {
  return {
    schema_version: "1",
    id: "legacy",
    goal: "Preserve ordered custom obligations",
    task_template: {
      title: "Legacy report",
      description: "Inspect before reporting",
      owner: "CODER",
    },
    inputs: {},
    outputs: ["report"],
    steps: [
      "Inspect",
      { custom_mandatory: "Never publish source data", command: "throw MUST_NOT_RUN" },
      "Report",
    ],
    custom_stop: "Missing source provenance blocks execution",
  };
}
function descriptor(id) {
  return {
    id,
    name: id,
    summary: id,
    use_when: ["report"],
    required_inputs: [],
    outputs: [],
    permissions: ["provider.write"],
    artifacts: [],
    agents_involved: ["worker"],
    skills_used: [],
    tools_used: [],
    run_profile: { mode: "analysis" },
    file: "scenario.json",
  };
}
const binary = Buffer.from([0, 255, 128, 1, 10, 0]);
const packageFiles = [
  { path: "binary.dat", bytes: binary },
  { path: "helper.js", bytes: Buffer.from("export const oldHelper = 1;\n") },
  { path: "main.js", bytes: Buffer.from('import "./helper.js"; throw Error("MUST_NOT_RUN");\n') },
];
function manifest(id, api, incompatible = false) {
  return {
    schema_version: api,
    kind: "project_overlay",
    id,
    version: "1.0.0",
    name: id,
    summary: id,
    compatibility: {
      manifest_api_version: api,
      scenario_api_version: api,
      runtime_api_version: "1",
      ...(incompatible ? { repo_types: ["unavailable-repository-kind"] } : {}),
    },
    agents: [
      {
        id: "worker",
        display_name: "Worker",
        role: "EXECUTOR",
        summary: "Worker",
        file: "agent.md",
        ...(api === "2" ? { tools: ["report-tool"] } : {}),
      },
    ],
    scenarios: [descriptor(api === "2" ? "report" : "legacy")],
    ...(api === "2"
      ? {
          tools: [
            {
              id: "report-tool",
              summary: "Never execute during preparation",
              runtime: "node",
              entrypoint: "tool/main.js",
            },
          ],
          dependency_closure: {
            schema_version: 1,
            files: [
              { source: "recipe", path: "scenario.json", dependencies: [] },
              { source: "recipe", path: "agent.md", dependencies: [] },
            ],
            packages: [
              {
                id: "tool-package",
                version: "1",
                source: "recipe",
                root: "tool",
                files: packageFiles.map((file) => file.path),
                digest: digest(
                  packageFiles.map((file) => ({ path: file.path, digest: hash(file.bytes) })),
                ),
                dependencies: [],
              },
            ],
            tools: [{ id: "report-tool", package_id: "tool-package" }],
            capabilities: [{ id: "task.verify", dependencies: [] }],
            commands: [],
          },
        }
      : {}),
  };
}

/** Qualification only: every CLI invocation uses the separately installed tarball executable. */
export function runInstalledRecipeMatrix({
  agentplane,
  recipesPackageRoot,
  agentplanePackageRoot,
  tempRoot,
  run,
  runFailure,
}) {
  const scenarios = [];
  const fixtureEnv = {
    AGENTPLANE_HOME: path.join(tempRoot, "isolated-home"),
    AGENTPLANE_NO_UPDATE_CHECK: "1",
    npm_config_offline: "true",
    GIT_ALLOW_PROTOCOL: "file",
    GIT_TERMINAL_PROMPT: "0",
    GIT_CONFIG_NOSYSTEM: "1",
  };
  const invoke = (command, args, cwd) =>
    run(command, args, { cwd, env: fixtureEnv, timeout: 120_000 });
  const git = (root, args) =>
    invoke("git", ["-c", "core.hooksPath=/dev/null", "-c", "commit.gpgsign=false", ...args], root);
  const cli = (root, args) => invoke(agentplane, args, root);
  const json = (root, args) => JSON.parse(cli(root, args));
  const failure = (root, args) =>
    runFailure(agentplane, args, { cwd: root, env: fixtureEnv, timeout: 120_000 });
  const init = (name) => {
    const root = path.join(tempRoot, name);
    invoke("git", ["init", "-q", "-b", "main", root], tempRoot);
    git(root, ["config", "user.name", "Recipe Smoke"]);
    git(root, ["config", "user.email", "recipe-smoke@example.com"]);
    writeFileSync(path.join(root, "README.md"), "# Installed Recipe fixture\n");
    git(root, ["add", "."]);
    git(root, ["commit", "-qm", "seed"]);
    cli(root, [
      "init",
      "--yes",
      "--setup-profile",
      "light",
      "--workflow",
      "direct",
      "--backend",
      "local",
      "--hooks",
      "false",
      "--require-plan-approval",
      "true",
    ]);
    return root;
  };
  const install = (root, id, scenario, incompatible = false) => {
    const source = path.join(tempRoot, `source-${id}`);
    writeJson(
      path.join(source, "manifest.json"),
      manifest(id, scenario.schema_version, incompatible),
    );
    writeJson(path.join(source, "scenario.json"), scenario);
    writeFileSync(
      path.join(source, "agent.md"),
      "Pinned old Recipe guidance. No permission is granted.\n",
    );
    if (scenario.schema_version === "2") {
      mkdirSync(path.join(source, "tool"), { recursive: true });
      for (const file of packageFiles)
        writeFileSync(path.join(source, "tool", file.path), file.bytes);
    }
    const archive = path.join(tempRoot, `${id}.tar.gz`);
    invoke("tar", ["-czf", archive, "-C", source, "."], root);
    cli(root, ["recipes", "install", "--path", archive]);
    cli(root, ["recipes", "add", `${id}@1.0.0`, "--mode", "copy"]);
    return path.join(root, ".agentplane/recipes/packages", id);
  };
  const selectionInput = (root, id) => {
    const file = path.join(root, "selection.json");
    writeJson(file, {
      schema_version: 1,
      kind: "selected_recipe",
      selection: {
        recipe_id: id,
        recipe_version: "1.0.0",
        scenario_id: "report",
        scenario_api_version: "2",
      },
      bindings: [{ name: "audience", value: "operators" }],
    });
    return file;
  };
  const create = (root, file) =>
    json(root, [
      "task",
      "create",
      "Report installed Recipe facts",
      "--task-kind",
      "analysis",
      "--mutation-scope",
      "none",
      "--recipe-file",
      file,
      "--json",
    ]);
  const saveContinuation = (root, created) => {
    const file = path.join(root, ".agentplane/tasks", created.task_id, "recipe-input.json");
    writeJson(file, created.recipe_input);
    return file;
  };
  const commit = (root) => {
    git(root, ["add", "."]);
    git(root, ["commit", "-qm", "fixture input"]);
  };
  const commitRetention = (root, created, continuation) => {
    git(root, [
      "add",
      "-f",
      created.recipe_input.reference.artifact.path,
      continuation,
      `.agentplane/tasks/${created.task_id}/README.md`,
    ]);
    git(root, ["commit", "-qm", "retain exact closure and native task"]);
  };
  const orderFor = (packet) =>
    JSON.parse(
      readFileSync(path.join(packet.exchange.directory, packet.exchange.work_order_ref), "utf8"),
    );
  mkdirSync(tempRoot, { recursive: true });

  const root = init("versions-recovery");
  const legacy = install(root, "legacy-report", v1());
  const packageRoot = install(root, "v2-report", v2());
  const parserScript = `import assert from 'node:assert/strict'; import {readFileSync} from 'node:fs'; import {parseScenarioDefinition,auditRecipeV1} from "@agentplaneorg/recipes"; const old=JSON.parse(readFileSync(process.argv[1],'utf8'));const current=JSON.parse(readFileSync(process.argv[2],'utf8')); assert.equal(parseScenarioDefinition(old).schema_version,'1'); assert.throws(()=>parseScenarioDefinition(current)); assert.equal(parseScenarioDefinition(current,['2']).schema_version,'2'); assert.throws(()=>parseScenarioDefinition(old,['2'])); for(const schema_version of ['3',2,null])assert.throws(()=>parseScenarioDefinition({...current,schema_version},['1','2'])); for(const field of ['cursor','approval','steps'])assert.throws(()=>parseScenarioDefinition({...current,[field]:true},['2'])); const audit=auditRecipeV1(readFileSync(process.argv[1]));assert.equal(audit.disposition,'semantic_conversion_required');assert.deepEqual(JSON.parse(Buffer.from(audit.source.base64,'base64').toString()).steps,old.steps); console.log('installed parser negotiation and unsupported V1 preservation OK');`;
  invoke(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      parserScript,
      path.join(legacy, "scenario.json"),
      path.join(packageRoot, "scenario.json"),
    ],
    recipesPackageRoot,
  );
  scenarios.push("installed-v1-v2-parser-negotiation");
  const snapshot = () =>
    readdirSync(root, { recursive: true })
      .toSorted()
      .map((entry) => {
        const file = path.join(root, entry);
        const stat = lstatSync(file, { bigint: true });
        return [
          entry,
          stat.isSymbolicLink()
            ? readlinkSync(file)
            : stat.isFile()
              ? hash(readSnapshotFile(file, stat))
              : "directory",
        ];
      });
  const beforePreview = snapshot();
  const oldPreview = json(root, [
    "recipes",
    "preview-v1",
    ".agentplane/recipes/packages/legacy-report/scenario.json",
  ]);
  assert.equal(oldPreview.disposition, "semantic_conversion_required");
  assert.deepEqual(
    JSON.parse(Buffer.from(oldPreview.source.base64, "base64").toString()).steps,
    v1().steps,
  );
  assert.deepEqual(snapshot(), beforePreview);
  scenarios.push("unsupported-v1-read-only-preservation");
  const input = selectionInput(root, "v2-report");
  const preview = json(root, ["recipes", "preview-v2", input]);
  assert.equal(preview.kind, "preview_only");
  assert.equal(preview.scenario.goal, "Report operators");
  commit(root);
  const created = create(root, input);
  assert.equal(created.status, "retention_required");
  const continuation = saveContinuation(root, created);
  const uncommitted = json(root, [
    "task",
    "plan",
    "set",
    created.task_id,
    "--recipe-file",
    continuation,
  ]);
  assert.equal(uncommitted.status, "needs_evidence");
  commitRetention(root, created, continuation);
  const retainedPath = path.join(root, created.recipe_input.reference.artifact.path);
  const retainedBytes = readFileSync(retainedPath);
  const retained = JSON.parse(retainedBytes.toString());
  assert.deepEqual(
    Buffer.from(retained.objects.find((object) => object.digest === hash(binary)).base64, "base64"),
    binary,
  );
  for (const file of packageFiles)
    assert.deepEqual(
      Buffer.from(
        retained.objects.find((object) => object.digest === hash(file.bytes)).base64,
        "base64",
      ),
      file.bytes,
    );
  writeFileSync(path.join(packageRoot, "tool/helper.js"), "export const oldHelper = 999;\n");
  rmSync(path.join(root, ".agentplane/recipes"), { recursive: true });
  // Commit intentional catalogue removal before taking the portable native baseline.
  git(root, ["add", "-A"]);
  git(root, ["commit", "--allow-empty", "-qm", "remove installed source"]);
  const clone = path.join(tempRoot, "offline-fresh-clone");
  git(root, ["clone", "--no-local", "--no-hardlinks", "--", root, clone]);
  assert.equal(existsSync(path.join(clone, ".git/objects/info/alternates")), false);
  assert.equal(existsSync(path.join(clone, ".agentplane/recipes")), false);
  git(clone, ["config", "user.name", "Recipe Smoke"]);
  git(clone, ["config", "user.email", "recipe-smoke@example.com"]);
  const recoveredFile = path.join(clone, path.relative(root, continuation));
  const recoveredArtifact = path.join(clone, created.recipe_input.reference.artifact.path);
  assert.deepEqual(readFileSync(recoveredArtifact), retainedBytes);
  // No installed cache is available to the restarted executable.
  rmSync(fixtureEnv.AGENTPLANE_HOME, { recursive: true, force: true });
  writeFileSync(recoveredArtifact, "tampered");
  assert.equal(
    json(clone, ["task", "plan", "set", created.task_id, "--recipe-file", recoveredFile]).status,
    "needs_evidence",
  );
  rmSync(recoveredArtifact);
  assert.equal(
    json(clone, ["task", "plan", "set", created.task_id, "--recipe-file", recoveredFile]).status,
    "needs_evidence",
  );
  writeFileSync(recoveredArtifact, retainedBytes);
  const proposed = json(clone, [
    "task",
    "plan",
    "set",
    created.task_id,
    "--recipe-file",
    recoveredFile,
  ]);
  assert.equal(proposed.status, "advance_required");
  assert.equal(
    json(clone, ["task", "plan", "set", created.task_id, "--recipe-file", recoveredFile])
      .plan_digest,
    proposed.plan_digest,
  );
  const pending = json(clone, ["task", "advance", created.task_id, "--agent-json"]);
  assert.equal(pending.action.kind, "approval_required");
  assert.equal(pending.exchange, undefined);
  cli(clone, ["task", "plan", "approve", created.task_id, "--by", "USER"]);
  const execution = json(clone, ["task", "advance", created.task_id, "--agent-json"]);
  const order = orderFor(execution);
  assert.equal(order.role, "EXECUTOR");
  assert.equal(order.task.objective, "Report for operators");
  assert.deepEqual(order.authority.writable_roots, []);
  assert.deepEqual(order.authority.external_side_effects, []);
  assert.equal(order.authority.network, "deny");
  assert.equal(order.recipe_context.projection.role, "EXECUTOR");
  assert.equal(order.recipe_context.digest, digest(order.recipe_context.projection));
  assert.equal(
    order.recipe_context.projection.guidance.some(
      (entry) => entry.content === "Pinned old Recipe guidance. No permission is granted.\n",
    ),
    true,
  );
  const contextManifest = JSON.parse(readFileSync(execution.context_manifest.ref, "utf8"));
  assert.equal(digest(contextManifest), execution.context_manifest.digest);
  assert.equal(contextManifest.source_digest, digest(order));
  const recipeBlock = contextManifest.blocks.find((block) => block.id === "recipe");
  assert.equal(recipeBlock.required, true);
  assert.equal(recipeBlock.pointer, "/recipe_context");
  assert.equal(recipeBlock.digest, digest(order.recipe_context));
  assert.equal(
    orderFor(json(clone, ["task", "advance", created.task_id, "--agent-json"])).work_order_id,
    order.work_order_id,
  );
  writeJson(execution.exchange.result_path, {
    work_order_id: order.work_order_id,
    status: "completed",
    summary: "Installed Recipe report",
    findings: [],
    uncertainty: [],
    canonical_outputs: [{ id: "report", kind: "report", digest: hash("report") }],
  });
  const inspection = json(clone, [
    "task",
    "advance",
    created.task_id,
    "--result",
    execution.exchange.result_path,
    "--agent-json",
  ]);
  assert.equal(orderFor(inspection).role, "EVALUATOR");
  scenarios.push("committed-instantiation-tamper-removal-offline-clone-restart-review");

  const specialRoot = init("specialization");
  cli(specialRoot, ["config", "set", "agents.approvals.require_planner", "true"]);
  install(specialRoot, "specialized-report", v2(true));
  const specialInput = selectionInput(specialRoot, "specialized-report");
  commit(specialRoot);
  const special = create(specialRoot, specialInput);
  assert.equal(special.status, "retention_required");
  const specialFile = saveContinuation(specialRoot, special);
  commitRetention(specialRoot, special, specialFile);
  const specialized = json(specialRoot, [
    "task",
    "plan",
    "set",
    special.task_id,
    "--recipe-file",
    specialFile,
  ]);
  assert.equal(specialized.status, "specialization_required");
  assert.deepEqual(specialized.prepared.request.questions, ["Which facts require interpretation?"]);
  assert.equal(specialized.prepared.request.task_id, special.task_id);
  assert.equal(
    existsSync(path.join(specialRoot, ".git/agentplane/kernel/exchanges", special.task_id)),
    false,
  );
  const planning = json(specialRoot, ["task", "advance", special.task_id, "--agent-json"]);
  const planner = orderFor(planning);
  assert.equal(planner.role, "PLANNER");
  assert.deepEqual(planner.authority.writable_roots, []);
  const specializedPlan = {
    work_items: [
      {
        id: "report",
        depends_on: [],
        required_inputs: [],
        expected_outputs: ["report"],
        optional: false,
        execution_requirements: {
          scope_roots: [],
          repository_effects: [],
          external_effects: [],
          capabilities: [],
          resources: [],
        },
        contract: {
          role: "EXECUTOR",
          objective: "Report verified source facts for operators",
          acceptance_criteria: [
            "Report preserves the source facts",
            "Interpret only facts supported by the retained source",
          ],
          verification_commands: [],
        },
      },
    ],
  };
  const plannerResult = {
    work_order_id: planner.work_order_id,
    status: "completed",
    summary: "Specialized unresolved interpretation through ordinary native planning",
    findings: [],
    uncertainty: [],
    canonical_plan: specializedPlan,
  };
  writeJson(planning.exchange.result_path, {
    ...plannerResult,
    work_order_id: hash("stale specialization WorkOrder"),
  });
  assert.match(
    failure(specialRoot, [
      "task",
      "advance",
      special.task_id,
      "--result",
      planning.exchange.result_path,
      "--agent-json",
    ]).stderr,
    /work.order|binding|mismatch/iu,
  );
  assert.equal(json(specialRoot, ["task", "show", special.task_id]).planning.plan_digest, null);
  writeJson(planning.exchange.result_path, plannerResult);
  const admitted = json(specialRoot, [
    "task",
    "advance",
    special.task_id,
    "--result",
    planning.exchange.result_path,
    "--agent-json",
  ]);
  assert.equal(admitted.action.kind, "approval_required");
  assert.equal(admitted.exchange, undefined);
  cli(specialRoot, ["task", "plan", "approve", special.task_id, "--by", "USER"]);
  const specializedExecution = json(specialRoot, [
    "task",
    "advance",
    special.task_id,
    "--agent-json",
  ]);
  assert.equal(
    orderFor(specializedExecution).task.objective,
    specializedPlan.work_items[0].contract.objective,
  );
  scenarios.push("bounded-specialization-native-typed-admission-and-stale-binding");

  // The declared installed library prepares source/Plan data; only the public CLI changes native state.
  const conversionRoot = init("unsupported-v1-conversion");
  writeJson(path.join(conversionRoot, "legacy.json"), v1());
  commit(conversionRoot);
  const conversionTask = json(conversionRoot, [
    "task",
    "create",
    "Review unsupported V1 conversion",
    "--task-kind",
    "analysis",
    "--mutation-scope",
    "none",
    "--json",
  ]);
  const audit = json(conversionRoot, ["recipes", "preview-v1", "legacy.json"]);
  const libraryScript =
    'import * as api from "agentplane/recipes"; const method=process.argv[1]; const result=await api[method](JSON.parse(process.argv[2])); console.log(JSON.stringify(result));';
  const library = (method, opts) =>
    JSON.parse(
      invoke(
        process.execPath,
        ["--input-type=module", "-e", libraryScript, method, JSON.stringify(opts)],
        agentplanePackageRoot,
      ),
    );
  const libraryFailure = (method, opts) =>
    runFailure(
      process.execPath,
      ["--input-type=module", "-e", libraryScript, method, JSON.stringify(opts)],
      { cwd: agentplanePackageRoot, env: fixtureEnv, timeout: 120_000 },
    );
  const conversionBase = { repository_root: conversionRoot, task_id: conversionTask.task_id };
  const sourceReference = library("prepareRecipeV1ConversionSource", {
    ...conversionBase,
    source_path: "legacy.json",
    expected_source_digest: audit.source.digest,
  });
  assert.match(
    libraryFailure("prepareRecipeV1ConversionPlan", {
      ...conversionBase,
      reference: sourceReference,
    }).stderr,
    /committed|HEAD|retained/iu,
  );
  git(conversionRoot, [
    "add",
    "-f",
    sourceReference.artifact.path,
    `.agentplane/tasks/${conversionTask.task_id}/README.md`,
  ]);
  git(conversionRoot, ["commit", "-qm", "retain exact unsupported V1 source"]);
  const conversion = library("prepareRecipeV1ConversionPlan", {
    ...conversionBase,
    reference: sourceReference,
  });
  const convertedScenario = v2();
  convertedScenario.id = audit.exact_fields.id;
  convertedScenario.parameters = [];
  convertedScenario.goal = "Preserve ordered custom obligations";
  convertedScenario.plan_template.work_items[0].objective =
    "Inspect and report without publishing source data";
  convertedScenario.plan_template.criteria.push({
    id: "ordered-source-obligations",
    description:
      "Inspect before reporting. Never publish source data. Missing source provenance blocks execution. Preserve the custom mandatory obligation without executing its untrusted command.",
    required: true,
    check_ids: ["review"],
  });
  const draft = {
    schema_version: 1,
    kind: "recipe_v1_conversion_result",
    task_id: conversionTask.task_id,
    source_digest: audit.source.digest,
    audit_digest: digest(audit),
    status: "draft",
    scenario: convertedScenario,
    resolutions: audit.unresolved.map((field) => ({
      source_path: field.source_path,
      target_path: field.target,
      explanation:
        "Fixture interpretation requires independent review of every preserved ordered obligation.",
    })),
  };
  const reviewedInput = {
    ...conversionBase,
    work_item_id: conversion.proposal.work_items[0].id,
    reference: sourceReference,
    result: draft,
  };
  cli(conversionRoot, [
    "task",
    "plan",
    "set",
    conversionTask.task_id,
    "--text",
    JSON.stringify(conversion.proposal),
  ]);
  assert.match(
    libraryFailure("readReviewedRecipeV1Conversion", reviewedInput).stderr,
    /independently reviewed/u,
  );
  cli(conversionRoot, ["task", "plan", "approve", conversionTask.task_id, "--by", "USER"]);
  const drafting = json(conversionRoot, [
    "task",
    "advance",
    conversionTask.task_id,
    "--agent-json",
  ]);
  const curator = orderFor(drafting);
  assert.equal(curator.role, "CURATOR");
  assert.ok(
    curator.required_inputs.some(
      (input) =>
        input.id === "recipe-v1-source" && input.digest === sourceReference.artifact.sha256,
    ),
  );
  assert.deepEqual(curator.authority.writable_roots, []);
  const draftResult = {
    work_order_id: curator.work_order_id,
    status: "completed",
    summary: JSON.stringify(draft),
    findings: [],
    uncertainty: [],
    canonical_outputs: [{ id: "recipe-v2-draft", kind: "report", digest: digest(draft) }],
  };
  writeJson(drafting.exchange.result_path, {
    ...draftResult,
    canonical_outputs: [{ id: "recipe-v2-draft", kind: "report", digest: hash("another draft") }],
  });
  assert.match(
    failure(conversionRoot, [
      "task",
      "advance",
      conversionTask.task_id,
      "--result",
      drafting.exchange.result_path,
      "--agent-json",
    ]).stderr,
    /exact typed draft/u,
  );
  writeJson(drafting.exchange.result_path, draftResult);
  const reviewing = json(conversionRoot, [
    "task",
    "advance",
    conversionTask.task_id,
    "--result",
    drafting.exchange.result_path,
    "--agent-json",
  ]);
  const evaluator = orderFor(reviewing);
  assert.equal(evaluator.role, "EVALUATOR");
  assert.match(
    libraryFailure("readReviewedRecipeV1Conversion", reviewedInput).stderr,
    /independently reviewed/u,
  );
  assert.ok(
    libraryFailure("readReviewedRecipeV1Conversion", {
      ...reviewedInput,
      result: { ...draft, reviewed: true },
    }).stderr.length > 0,
  );
  writeJson(reviewing.exchange.result_path, {
    work_order_id: evaluator.work_order_id,
    status: "completed",
    summary: "Fixture independent source-to-draft review",
    findings: ["Reviewed retained ordered/custom semantics and exact draft identity."],
    uncertainty: [],
    review: { verdict: "pass", missing_tests: [], hidden_assumptions: [], residual_risks: [] },
  });
  json(conversionRoot, [
    "task",
    "advance",
    conversionTask.task_id,
    "--result",
    reviewing.exchange.result_path,
    "--agent-json",
  ]);
  const candidate = library("readReviewedRecipeV1Conversion", reviewedInput);
  assert.equal(candidate.kind, "reviewed_recipe_v2_candidate");
  assert.equal(candidate.draft_digest, digest(draft));
  assert.match(
    libraryFailure("readReviewedRecipeV1Conversion", {
      ...reviewedInput,
      work_item_id: "different-work-item",
    }).stderr,
    /another WorkItem/u,
  );
  assert.match(
    libraryFailure("readReviewedRecipeV1Conversion", {
      ...reviewedInput,
      result: { ...draft, scenario: { ...draft.scenario, goal: "Unreviewed replacement" } },
    }).stderr,
    /independently reviewed/u,
  );
  assert.deepEqual(
    JSON.parse(readFileSync(path.join(conversionRoot, "legacy.json"), "utf8")),
    v1(),
  );
  scenarios.push("installed-library-v1-preparation-native-curator-result-and-review-gating");

  const noMatchRoot = init("no-match");
  install(noMatchRoot, "incompatible-report", v2(), true);
  const absent = selectionInput(noMatchRoot, "absent-report");
  assert.match(failure(noMatchRoot, ["recipes", "preview-v2", absent]).stderr, /not_installed/u);
  const inlineFile = path.join(noMatchRoot, "inline.json");
  const inline = compactPlan();
  inline.work_items[0].objective = "Report without a Recipe";
  writeJson(inlineFile, inline);
  commit(noMatchRoot);
  const ordinary = json(noMatchRoot, [
    "task",
    "create",
    "Ordinary no-match report",
    "--task-kind",
    "analysis",
    "--mutation-scope",
    "none",
    "--plan-file",
    inlineFile,
    "--json",
  ]);
  const ordinaryPacket = json(noMatchRoot, ["task", "advance", ordinary.task_id, "--agent-json"]);
  assert.equal(ordinaryPacket.action.kind, "approval_required");
  assert.equal(ordinaryPacket.exchange, undefined);
  assert.deepEqual(
    json(noMatchRoot, ["task", "show", ordinary.task_id]).planning.issued_work_orders,
    [],
  );
  scenarios.push("no-match-ordinary-inline-zero-planner");
  return { scenarios, count: scenarios.length };
}
