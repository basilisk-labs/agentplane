import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const taskId = "202606012037-W0QJJ2";

const sourceRoots = [
  "packages/agentplane/src",
  "packages/core/src",
  "packages/core/schemas",
  "packages/recipes/src",
  "packages/spec/schemas",
  "packages/spec/examples",
  "packages/testkit/src",
  "scripts/checks",
  "scripts/release",
  "scripts/generate",
  "scripts/workflow",
  ".github/workflows",
  ".agentplane/policy",
];

const includeExt = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".md", ".yml", ".yaml"]);
const ignoredParts = new Set(["node_modules", "dist", ".git", "coverage"]);

const conceptDefs = [
  ["cli", ["cli", "command", "run-cli", "commander"]],
  ["task-lifecycle", ["task", "start-ready", "verify", "finish", "status"]],
  ["branch-pr", ["branch_pr", "pr", "integrate", "worktree", "merge"]],
  ["context-layer", ["context", "wiki", "graph", "facts", "reindex", "assimilation"]],
  ["release", ["release", "publish", "version", "distribution"]],
  ["upgrade", ["upgrade", "migration", "framework"]],
  ["policy", ["policy", "guard", "dod", "security", "routing"]],
  ["schemas", ["schema", "zod", "contract"]],
  ["testing", ["test", "vitest", "coverage", "fixture"]],
  ["github-actions", ["github", "workflow", "actions", "checks"]],
  ["runner", ["runner", "process", "execution", "handoff"]],
  ["backend", ["backend", "local backend", "cloud backend"]],
  ["recipes", ["recipe", "recipes", "catalog"]],
  ["blueprints", ["blueprint", "route", "task_kind"]],
  ["doctor", ["doctor", "diagnostic", "repair"]],
  ["evaluator", ["evaluator", "quality", "verdict"]],
];

const layerRules = [
  ["cli-runtime", /^packages\/agentplane\/src\/cli\//],
  ["commands", /^packages\/agentplane\/src\/commands\//],
  ["runtime", /^packages\/agentplane\/src\/runtime\//],
  ["runner", /^packages\/agentplane\/src\/runner\//],
  ["context-engine", /^packages\/agentplane\/src\/context\//],
  ["task-backends", /^packages\/agentplane\/src\/(backends|adapters\/task-backend)\//],
  ["workflow-runtime", /^packages\/agentplane\/src\/workflow-/],
  ["policy-engine", /^packages\/agentplane\/src\/policy\//],
  ["blueprints", /^packages\/agentplane\/src\/blueprints\//],
  ["shared-core", /^packages\/(core|agentplane)\/src\/shared\//],
  ["schemas", /^packages\/(core|spec)\/schemas\//],
  ["recipes", /^packages\/recipes\/src\//],
  ["testkit", /^packages\/testkit\/src\//],
  ["checks", /^scripts\/checks\//],
  ["release-scripts", /^scripts\/release\//],
  ["generators", /^scripts\/generate\//],
  ["workflow-scripts", /^scripts\/workflow\//],
  ["github-workflows", /^\.github\/workflows\//],
  ["repo-policy", /^\.agentplane\/policy\//],
];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredParts.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (includeExt.has(path.extname(entry.name))) out.push(full);
  }
  return out;
}

function sha256(text) {
  return `sha256:${crypto.createHash("sha256").update(text).digest("hex")}`;
}

function slug(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100);
}

function fileId(rel) {
  return `entity.source_file.${slug(rel)}`;
}

function packageOf(rel) {
  const parts = rel.split("/");
  if (parts[0] === "packages") return parts.slice(0, 2).join("/");
  if (parts[0] === "scripts") return "scripts";
  if (parts[0] === ".github") return ".github";
  if (parts[0] === ".agentplane") return ".agentplane";
  return parts[0];
}

function layerOf(rel) {
  return layerRules.find(([, rx]) => rx.test(rel))?.[0] ?? "other-source";
}

function commandGroupOf(rel) {
  const parts = rel.split("/");
  if (parts[0] === "packages" && parts[1] === "agentplane" && parts[2] === "src" && parts[3] === "commands") {
    return parts[4] ?? "root";
  }
  return null;
}

function sourceRef(file, lines = "1-80") {
  return { path: file.rel, sha256: file.sha256, lines };
}

function firstLineSummary(text, rel) {
  const heading = text.match(/^#\s+(.+)$/m)?.[1]?.trim();
  if (heading) return heading.replace(/`/g, "");
  const exported = text.match(/export\s+(?:async\s+)?(?:function|class|const|interface|type)\s+([A-Za-z0-9_]+)/)?.[1];
  if (exported) return exported;
  return path.basename(rel);
}

function importsOf(text) {
  const imports = new Set();
  for (const match of text.matchAll(/(?:import|export)\s+(?:[^'"]+\s+from\s+)?["']([^"']+)["']/g)) {
    imports.add(match[1]);
  }
  for (const match of text.matchAll(/await import\(["']([^"']+)["']\)/g)) {
    imports.add(match[1]);
  }
  return [...imports].sort();
}

function resolveLocalImport(fromRel, spec) {
  if (!spec.startsWith(".")) return null;
  const base = path.posix.normalize(path.posix.join(path.posix.dirname(fromRel), spec));
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.js`,
    `${base}.mjs`,
    `${base}.json`,
    path.posix.join(base, "index.ts"),
    path.posix.join(base, "index.tsx"),
    path.posix.join(base, "index.js"),
  ];
  return candidates.find((candidate) => fileByRel.has(candidate)) ?? null;
}

function collectConcepts(text, rel) {
  const haystack = `${rel}\n${text}`.toLowerCase();
  return conceptDefs
    .filter(([, terms]) => terms.some((term) => haystack.includes(term)))
    .map(([id]) => id);
}

function write(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
}

function wikiFrontmatter({ canonicalId, title, refs = [], entities = [], edges = [], aliases = [] }) {
  const cleanRefs = refs.filter((ref) => typeof ref === "string" && ref.trim());
  const lines = [
    "---",
    ...(aliases.length ? ["aliases:", ...aliases.map((a) => `  - "${a}"`)] : []),
    "tags:",
    "  - agentplane/context",
    "  - agentplane/source-architecture-assimilation",
    "cssclasses:",
    "  - agentplane-context",
    "agentplane_context:",
    "  schema_version: 1",
    "  artifact_type: wiki_page",
    `  canonical_id: "${canonicalId}"`,
    `  title: "${title.replaceAll('"', '\\"')}"`,
    "  modality: observation",
    "  epistemic_status: sourced_claim",
    "  visibility: project",
    "  source_refs:",
    ...(cleanRefs.length ? cleanRefs.slice(0, 35).map((r) => `    - "${r}"`) : ["    - no-source: generated navigation page"]),
    "  claims: []",
    "  graph_refs:",
    "    entities:",
    ...(entities.length ? entities.slice(0, 120).map((e) => `      - "${e}"`) : []),
    "    edges:",
    ...(edges.length ? edges.slice(0, 120).map((e) => `      - "${e}"`) : []),
    "  conflicts: []",
    "  updated_by: CURATOR",
    "---",
    "",
    "## Sources",
    "",
    ...(cleanRefs.length
      ? cleanRefs.slice(0, 35).map((ref, index) => `${index + 1}. [\`${ref}\`](../../${ref})`)
      : ["- no-source: generated navigation page over sourced child pages."]),
    "",
  ];
  return lines.join("\n");
}

function markdownTable(rows) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const body = [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${headers.map((h) => String(row[h]).replaceAll("|", "\\|")).join(" | ")} |`),
  ];
  return body.join("\n");
}

const files = sourceRoots
  .flatMap((sourceRoot) => walk(path.join(root, sourceRoot)))
  .map((full) => {
    const rel = path.relative(root, full).replaceAll(path.sep, "/");
    const text = fs.readFileSync(full, "utf8");
    const lines = text.split(/\r?\n/).length;
    return {
      rel,
      text,
      bytes: Buffer.byteLength(text),
      lines,
      sha256: sha256(text),
      title: firstLineSummary(text, rel),
      package: packageOf(rel),
      layer: layerOf(rel),
      commandGroup: commandGroupOf(rel),
      isTest: /\.test\.tsx?$|\.spec\.tsx?$|__snapshots__/.test(rel),
      concepts: collectConcepts(text, rel),
      imports: importsOf(text),
    };
  })
  .toSorted((a, b) => a.rel.localeCompare(b.rel));

const fileByRel = new Map(files.map((file) => [file.rel, file]));
const packages = new Map();
const layers = new Map();
const commandGroups = new Map();
const concepts = new Map();

for (const file of files) {
  if (!packages.has(file.package)) packages.set(file.package, []);
  packages.get(file.package).push(file);
  if (!layers.has(file.layer)) layers.set(file.layer, []);
  layers.get(file.layer).push(file);
  if (file.commandGroup) {
    if (!commandGroups.has(file.commandGroup)) commandGroups.set(file.commandGroup, []);
    commandGroups.get(file.commandGroup).push(file);
  }
  for (const concept of file.concepts) {
    if (!concepts.has(concept)) concepts.set(concept, []);
    concepts.get(concept).push(file);
  }
}

const localImportEdges = [];
for (const file of files) {
  for (const spec of file.imports) {
    const target = resolveLocalImport(file.rel, spec);
    if (target) localImportEdges.push({ from: file.rel, to: target, spec });
  }
}

const extracted = [];
function itemBase(id, kind, summary, refs, confidence = 0.86) {
  return { id, kind, summary, source_refs: refs, confidence, status: "accepted" };
}

function addEntity(id, kind, label, refs, summary, aliases = []) {
  extracted.push({
    ...itemBase(id, "graph_entity", summary, refs),
    entity: { id, kind, label, aliases },
  });
}

function addEdge(id, from, to, relation, refs, summary) {
  extracted.push({
    ...itemBase(id, "graph_edge", summary, refs, 0.8),
    edge: { id, from, to, relation },
  });
}

function addFact(id, summary, refs) {
  extracted.push(itemBase(id, "fact", summary, refs, 0.84));
}

function addCoverage(file) {
  const coveredIds = [
    fileId(file.rel),
    `entity.source_package.${slug(file.package)}`,
    `entity.source_layer.${slug(file.layer)}`,
    ...(file.commandGroup ? [`entity.command_group.${slug(file.commandGroup)}`] : []),
    "entity.source_architecture_corpus",
  ];
  extracted.push({
    ...itemBase(
      `coverage.source_architecture.${slug(file.rel)}`,
      "coverage",
      `${file.rel} is covered by source architecture graph, wiki, metrics, and coverage detail artifacts.`,
      [sourceRef(file)],
      0.86,
    ),
    coverage: {
      source_path: file.rel,
      status: "covered",
      reason:
        "Source file is represented by a file graph entity, package/layer edges, concept or command-group edges where applicable, coverage detail JSONL, and the source architecture wiki navigation layer; implementation bodies are intentionally not copied into wiki prose.",
      covered_item_ids: coveredIds,
    },
  });
}

const reasoningRefs = files.slice(0, 25).map((file) => sourceRef(file));
addEntity(
  "entity.source_architecture_corpus",
  "source",
  "AgentPlane source architecture corpus",
  reasoningRefs,
  "Source architecture corpus covering packages, command groups, workflows, schemas, policies, checks, and tests.",
  ["source-architecture-assimilation", "code-assimilation"],
);

for (const [pkg, pkgFiles] of [...packages.entries()].toSorted()) {
  const refs = pkgFiles.slice(0, 12).map((file) => sourceRef(file));
  const id = `entity.source_package.${slug(pkg)}`;
  addEntity(id, "concept", pkg, refs, `${pkg} contains ${pkgFiles.length} assimilated source files.`);
  addEdge(`edge.${slug(pkg)}.part_of.source_architecture`, id, "entity.source_architecture_corpus", "part_of", refs, `${pkg} is part of the source architecture corpus.`);
  addFact(`fact.${slug(pkg)}.source_size`, `${pkg} has ${pkgFiles.length} assimilated files, ${pkgFiles.reduce((n, f) => n + f.lines, 0)} lines, and ${pkgFiles.reduce((n, f) => n + f.bytes, 0)} bytes in the selected source set.`, refs);
}

for (const [layer, layerFiles] of [...layers.entries()].toSorted()) {
  const refs = layerFiles.slice(0, 12).map((file) => sourceRef(file));
  const id = `entity.source_layer.${slug(layer)}`;
  addEntity(id, "concept", layer, refs, `${layer} layer contains ${layerFiles.length} assimilated files.`);
  addEdge(`edge.${slug(layer)}.part_of.source_architecture`, id, "entity.source_architecture_corpus", "part_of", refs, `${layer} belongs to the source architecture corpus.`);
}

for (const [group, groupFiles] of [...commandGroups.entries()].toSorted()) {
  const refs = groupFiles.slice(0, 12).map((file) => sourceRef(file));
  const id = `entity.command_group.${slug(group)}`;
  addEntity(id, "concept", `ap ${group}`, refs, `Command group ${group} has ${groupFiles.length} implementation/test files under packages/agentplane/src/commands/${group}.`);
  addEdge(`edge.command_group.${slug(group)}.part_of.commands`, id, "entity.source_layer.commands", "part_of", refs, `${group} is part of the CLI command surface.`);
}

for (const [concept, conceptFiles] of [...concepts.entries()].toSorted()) {
  const refs = conceptFiles.slice(0, 12).map((file) => sourceRef(file));
  const id = `entity.source_concept.${slug(concept)}`;
  addEntity(id, "concept", concept, refs, `${concept} appears in ${conceptFiles.length} assimilated source files.`);
  addEdge(`edge.source_concept.${slug(concept)}.mentions.source_architecture`, id, "entity.source_architecture_corpus", "mentions", refs, `${concept} recurs across the source architecture corpus.`);
}

for (const file of files) {
  const refs = [sourceRef(file)];
  const id = fileId(file.rel);
  addEntity(id, "file", file.rel, refs, `${file.rel}: ${file.title}; ${file.lines} lines; layer=${file.layer}; package=${file.package}.`);
  addEdge(`edge.${slug(file.rel)}.part_of.${slug(file.package)}`, id, `entity.source_package.${slug(file.package)}`, "part_of", refs, `${file.rel} belongs to ${file.package}.`);
  addEdge(`edge.${slug(file.rel)}.part_of.${slug(file.layer)}`, id, `entity.source_layer.${slug(file.layer)}`, "part_of", refs, `${file.rel} belongs to ${file.layer}.`);
  if (file.commandGroup) {
    addEdge(`edge.${slug(file.rel)}.part_of.command.${slug(file.commandGroup)}`, id, `entity.command_group.${slug(file.commandGroup)}`, "part_of", refs, `${file.rel} belongs to command group ${file.commandGroup}.`);
  }
  for (const concept of file.concepts.slice(0, 4)) {
    addEdge(`edge.${slug(file.rel)}.mentions.${slug(concept)}`, id, `entity.source_concept.${slug(concept)}`, "mentions", refs, `${file.rel} mentions ${concept}.`);
  }
}

for (const edge of localImportEdges.slice(0, 2500)) {
  const from = fileByRel.get(edge.from);
  addEdge(
    `edge.import.${slug(edge.from)}.${slug(edge.to)}`,
    fileId(edge.from),
    fileId(edge.to),
    "mentions",
    [sourceRef(from)],
    `${edge.from} imports ${edge.to}.`,
  );
}

for (const file of files) {
  addCoverage(file);
}

const sourceLines = files.reduce((n, file) => n + file.lines, 0);
const sourceBytes = files.reduce((n, file) => n + file.bytes, 0);
const testFiles = files.filter((file) => file.isTest);
const commandFiles = files.filter((file) => file.commandGroup);
const schemaFiles = files.filter((file) => file.layer === "schemas");
const policyFiles = files.filter((file) => file.layer === "repo-policy");
const checkFiles = files.filter((file) => file.layer === "checks" || file.layer === "github-workflows");

addFact("fact.source_architecture.total_size", `The selected source architecture corpus has ${files.length} files, ${sourceLines} lines, and ${sourceBytes} bytes, excluding dist/node_modules/generated vendor paths.`, reasoningRefs);
addFact("fact.source_architecture.command_surface", `The command surface has ${commandGroups.size} command groups and ${commandFiles.length} command-adjacent files under packages/agentplane/src/commands.`, commandFiles.slice(0, 12).map((file) => sourceRef(file)));
addFact("fact.source_architecture.test_surface", `The selected source set includes ${testFiles.length} test/spec/snapshot files linked by path and concept to runtime modules.`, testFiles.slice(0, 12).map((file) => sourceRef(file)));
addFact("fact.source_architecture.contract_surface", `The selected source set includes ${schemaFiles.length} schema files, ${policyFiles.length} policy files, and ${checkFiles.length} check/workflow files.`, [...schemaFiles, ...policyFiles, ...checkFiles].slice(0, 12).map((file) => sourceRef(file)));

const sgr = {
  schema_version: 1,
  kind: "context_extraction",
  task_id: taskId,
  source_refs: files.map((file) => sourceRef(file)),
  reasoning: [
    {
      label: "source-inventory",
      summary: `Read ${files.length} source architecture files across packages, scripts, workflows, and policy surfaces; excluded dist/node_modules.`,
      evidence_refs: reasoningRefs,
    },
    {
      label: "graph-first-architecture",
      summary: "Promoted packages, layers, command groups, recurring source concepts, and source files into graph entities linked by part_of and mentions edges.",
      evidence_refs: reasoningRefs,
    },
    {
      label: "token-efficient-code-assimilation",
      summary: "Captured implementation topology, command/test/check relationships, and file-level provenance without copying function bodies into wiki prose.",
      evidence_refs: reasoningRefs,
    },
  ],
  extracted,
  extracted_items: extracted,
};

write(".agentplane/context/derived/reports/source-architecture-assimilation.sgr.json", `${JSON.stringify(sgr, null, 2)}\n`);

execFileSync("ap", ["context", "extraction", "apply", ".agentplane/context/derived/reports/source-architecture-assimilation.sgr.json", "--task-id", taskId], {
  cwd: root,
  stdio: "inherit",
});

const packageRows = [...packages.entries()].toSorted().map(([pkg, pkgFiles]) => ({
  Package: pkg,
  Files: pkgFiles.length,
  Lines: pkgFiles.reduce((n, file) => n + file.lines, 0),
  Bytes: pkgFiles.reduce((n, file) => n + file.bytes, 0),
  Tests: pkgFiles.filter((file) => file.isTest).length,
}));

const layerRows = [...layers.entries()].toSorted().map(([layer, layerFiles]) => ({
  Layer: layer,
  Files: layerFiles.length,
  Lines: layerFiles.reduce((n, file) => n + file.lines, 0),
  Tests: layerFiles.filter((file) => file.isTest).length,
}));

const commandRows = [...commandGroups.entries()].toSorted().map(([group, groupFiles]) => ({
  Command: group,
  Files: groupFiles.length,
  Tests: groupFiles.filter((file) => file.isTest).length,
  Lines: groupFiles.reduce((n, file) => n + file.lines, 0),
}));

const refsFor = (items) => items.slice(0, 35).map((file) => file.rel);

write(
  "context/wiki/source-architecture/index.md",
  `${wikiFrontmatter({
    canonicalId: "wiki.source_architecture.index",
    title: "Source Architecture Assimilation",
    refs: refsFor(files),
    entities: ["entity.source_architecture_corpus"],
  })}# Source Architecture Assimilation

This page is the navigation entrypoint for the [[packages|package map]], [[command-surface|command surface]], [[workflow-state-machines|workflow and state-machine map]], [[schemas-policies-checks|schema/policy/check map]], and [[test-coverage|test coverage map]].

The assimilation is graph-first: file-level coverage is stored in graph entities, graph edges, provenance rows, and coverage reports; wiki pages keep the code layer navigable without copying implementation bodies.

## Metrics

- Source files: ${files.length}
- Source lines: ${sourceLines}
- Source bytes: ${sourceBytes}
- Packages/groups: ${packages.size}
- Layers: ${layers.size}
- Command groups: ${commandGroups.size}
- Test/spec/snapshot files: ${testFiles.length}
- Local import edges captured: ${Math.min(localImportEdges.length, 2500)} of ${localImportEdges.length}

## Navigation

- [[packages]]
- [[command-surface]]
- [[workflow-state-machines]]
- [[schemas-policies-checks]]
- [[test-coverage]]
`,
);

write(
  "context/wiki/source-architecture/packages.md",
  `${wikiFrontmatter({
    canonicalId: "wiki.source_architecture.packages",
    title: "Source Packages",
    refs: refsFor(files),
    entities: [...packages.keys()].map((pkg) => `entity.source_package.${slug(pkg)}`),
  })}# Source Packages

${markdownTable(packageRows)}

## Interpretation

The package map is a compact ownership surface. It separates runtime implementation, public schemas, recipe catalog logic, and testkit support code so retrieval can answer where a behavior is likely implemented before reading individual files.
`,
);

write(
  "context/wiki/source-architecture/command-surface.md",
  `${wikiFrontmatter({
    canonicalId: "wiki.source_architecture.command_surface",
    title: "Command Surface",
    refs: refsFor(commandFiles),
    entities: [...commandGroups.keys()].map((group) => `entity.command_group.${slug(group)}`),
  })}# Command Surface

${markdownTable(commandRows)}

## Interpretation

Command groups are the primary operational interface of AgentPlane. The graph links each command-group entity to its implementation files, test files when colocated by path, and recurring concepts such as task lifecycle, release, context, policy, and GitHub PR integration.
`,
);

write(
  "context/wiki/source-architecture/workflow-state-machines.md",
  `${wikiFrontmatter({
    canonicalId: "wiki.source_architecture.workflow_state_machines",
    title: "Workflow and State Machines",
    refs: refsFor(files.filter((file) => ["workflow-runtime", "workflow-scripts", "policy-engine", "repo-policy"].includes(file.layer))),
    entities: ["entity.source_concept.branch-pr", "entity.source_concept.task-lifecycle", "entity.source_concept.release", "entity.source_concept.upgrade"],
  })}# Workflow and State Machines

Workflow logic is spread across runtime workflow code, policy modules, release/upgrade command paths, and branch PR integration commands. The assimilation links these surfaces through recurring concepts rather than treating each command as an isolated file.

${markdownTable(layerRows.filter((row) => /workflow|policy|release|commands/.test(row.Layer)))}

## Retrieval Use

Use this page when a task asks why a command is blocked, what route owns a mutation, or which state transition must happen before finish/merge. The detailed file-level graph carries the concrete source refs.
`,
);

write(
  "context/wiki/source-architecture/schemas-policies-checks.md",
  `${wikiFrontmatter({
    canonicalId: "wiki.source_architecture.schemas_policies_checks",
    title: "Schemas Policies Checks",
    refs: refsFor([...schemaFiles, ...policyFiles, ...checkFiles]),
    entities: ["entity.source_concept.schemas", "entity.source_concept.policy", "entity.source_concept.github-actions"],
  })}# Schemas Policies Checks

Contract surfaces are the main guardrails for AgentPlane changes: schemas define artifact shape, policy files define agent routing and task constraints, and check scripts/workflows enforce merge and release quality.

${markdownTable([
  { Surface: "schemas", Files: schemaFiles.length, Lines: schemaFiles.reduce((n, file) => n + file.lines, 0) },
  { Surface: "policies", Files: policyFiles.length, Lines: policyFiles.reduce((n, file) => n + file.lines, 0) },
  { Surface: "checks/workflows", Files: checkFiles.length, Lines: checkFiles.reduce((n, file) => n + file.lines, 0) },
])}

## Retrieval Use

Use this page when a behavior may be governed by a schema, policy route, CI check, or release gate rather than by command implementation alone.
`,
);

write(
  "context/wiki/source-architecture/test-coverage.md",
  `${wikiFrontmatter({
    canonicalId: "wiki.source_architecture.test_coverage",
    title: "Test Coverage Map",
    refs: refsFor(testFiles),
    entities: ["entity.source_concept.testing"],
  })}# Test Coverage Map

The selected source set contains ${testFiles.length} test/spec/snapshot files. Tests are represented as file entities and linked to packages, layers, command groups, and recurring concepts by path and source terms.

${markdownTable(layerRows.filter((row) => row.Tests > 0).toSorted((a, b) => b.Tests - a.Tests))}

## Retrieval Use

Use this page to locate the likely verification surface before changing a command, workflow route, context behavior, release path, or schema contract.
`,
);

const coverageRows = files.map((file) => ({
  path: file.rel,
  sha256: file.sha256,
  lines: file.lines,
  bytes: file.bytes,
  package: file.package,
  layer: file.layer,
  command_group: file.commandGroup,
  is_test: file.isTest,
  concepts: file.concepts,
  local_imports: file.imports.map((spec) => resolveLocalImport(file.rel, spec)).filter(Boolean),
}));

write(
  ".agentplane/context/derived/reports/source-architecture-coverage-detail.jsonl",
  coverageRows.map((row) => JSON.stringify(row)).join("\n") + "\n",
);

const metrics = {
  schema_version: 1,
  generated_by: "source-architecture-assimilation",
  task_id: taskId,
  source: {
    files: files.length,
    lines: sourceLines,
    bytes: sourceBytes,
    packages: packages.size,
    layers: layers.size,
    command_groups: commandGroups.size,
    test_files: testFiles.length,
    schema_files: schemaFiles.length,
    policy_files: policyFiles.length,
    check_workflow_files: checkFiles.length,
    local_import_edges_total: localImportEdges.length,
    local_import_edges_captured: Math.min(localImportEdges.length, 2500),
  },
  assimilation: {
    wiki_pages: 6,
    sgr_items: extracted.length,
    graph_entities: extracted.filter((item) => item.kind === "graph_entity").length,
    graph_edges: extracted.filter((item) => item.kind === "graph_edge").length,
    facts: extracted.filter((item) => item.kind === "fact").length,
    coverage_items: extracted.filter((item) => item.kind === "coverage").length,
    coverage_rows: coverageRows.length,
    coverage_degree: coverageRows.length / files.length,
    granularity:
      "package -> layer -> command group -> workflow/contract concept -> source file -> local import/test/check coverage row",
  },
  packages: packageRows,
  layers: layerRows,
  command_groups: commandRows,
};

write(".agentplane/context/derived/reports/source-architecture-assimilation.json", `${JSON.stringify(metrics, null, 2)}\n`);

const readmePath = `.agentplane/tasks/${taskId}/README.md`;
const readme = fs.readFileSync(readmePath, "utf8");
const sourceSet = files.map((file) => `      - path: "${file.rel}"\n        sha256: "${file.sha256}"\n        lines: ${file.lines}`).join("\n");
const marker = "  agentplane.context:";
const extensionBlock = `extensions:
  agentplane.context:
    allowed_outputs:
      - "context/wiki/**"
      - ".agentplane/context/derived/facts/**"
      - ".agentplane/context/derived/graph/**"
      - ".agentplane/context/derived/reports/**"
      - ".agentplane/tasks/${taskId}/README.md"
      - ".agentplane/tasks/${taskId}/blueprint/**"
      - ".agentplane/tasks/${taskId}/pr/**"
      - ".agentplane/tasks/${taskId}/scripts/**"
    mode: "maximum_assimilation"
    source_set:
      files:
${sourceSet}
`;
if (readme.includes(marker) && !readme.includes("source_architecture_source_set:")) {
  fs.writeFileSync(
    readmePath,
    readme.replace(
      marker,
      `${marker}\n    source_architecture_source_set:\n      files:\n${sourceSet}`,
    ),
  );
} else if (!readme.includes("agentplane.context:")) {
  fs.writeFileSync(readmePath, readme.replace('id_source: "generated"\n---', `${extensionBlock}id_source: "generated"\n---`));
}

console.log(
  JSON.stringify(
    {
      source: metrics.source,
      assimilation: metrics.assimilation,
      reports: [
        ".agentplane/context/derived/reports/source-architecture-assimilation.json",
        ".agentplane/context/derived/reports/source-architecture-assimilation.sgr.json",
        ".agentplane/context/derived/reports/source-architecture-coverage-detail.jsonl",
      ],
      wiki: "context/wiki/source-architecture/index.md",
    },
    null,
    2,
  ),
);
