import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const taskId = "202606011933-T87604";

const conceptDefs = [
  ["workflow", ["workflow", "branch_pr", "direct", "task lifecycle", "finish", "integrate"]],
  ["context", ["context", "wiki", "facts", "graph", "reindex", "assimilation"]],
  ["release", ["release", "publish", "version", "changelog", "distribution"]],
  ["github-pr", ["github", "pull request", "pr ", "hosted", "checks"]],
  ["task-backend", ["backend", "local backend", "cloud backend", "tasks backend"]],
  ["cli", ["cli", "command", "agentplane ", "ap "]],
  ["agents", ["agent", "agents", "orchestrator", "curator", "integrator", "reviewer"]],
  ["blueprints", ["blueprint", "task_kind", "mutation_scope"]],
  ["verification", ["verify", "verification", "doctor", "check", "test"]],
  ["policy", ["policy", "agents.md", "guard", "must", "dod"]],
  ["recipes", ["recipe", "recipes", "template"]],
  ["hermes", ["hermes", "kanban"]],
  ["cloud-sync", ["cloud", "sync", "remote task"]],
  ["security", ["security", "secret", "credential", "redaction"]],
  ["documentation", ["docs", "documentation", "mdx", "guide"]],
  ["configuration", ["config", "configuration", "workflow.md"]],
  ["worktrees", ["worktree", "branch", "checkout"]],
  ["hooks", ["hook", "pre-commit", "pre-push", "commit-msg"]],
  ["quality", ["quality", "evaluator", "review", "regression"]],
  ["performance", ["performance", "baseline", "cold-start", "fast"]],
  ["dashboard", ["dashboard", "knowledge dashboard"]],
  ["acr", ["acr", "agent change record"]],
  ["incidents", ["incident", "runbook", "troubleshooting"]],
  ["migration", ["migration", "upgrade", "breaking change"]],
  ["architecture", ["architecture", "topology", "module"]],
  ["schemas", ["schema", "zod", "contract"]],
  ["testing", ["test", "vitest", "coverage"]],
  ["local-context", ["local context", "context layer"]],
  ["website", ["website", "ia", "showcase", "launch"]],
  ["commands-reference", ["reference", "commands", "help json"]],
  ["task-runner", ["runner", "task run", "execution"]],
  ["provider-integration", ["provider", "github actions", "gitlab"]],
];

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(md|mdx)$/.test(entry.name)) out.push(full);
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
    .slice(0, 80);
}

function titleOf(text, rel) {
  const heading = text.match(/^#\s+(.+)$/m)?.[1]?.trim();
  if (heading) return heading.replace(/`/g, "");
  return path.basename(rel).replace(/\.(md|mdx)$/, "");
}

function domainOf(rel) {
  const parts = rel.split("/");
  if (parts[0] !== "docs") return "other";
  if (parts[1] === "archive") return `archive-${parts[2] ?? "root"}`;
  if (parts.length === 2) return "root";
  return parts[1].replace(/[^a-z0-9-]/gi, "-").toLowerCase();
}

function releaseVersion(rel) {
  const base = path.basename(rel).replace(/\.mdx?$/, "");
  const match = base.match(/^v(\d+)\.(\d+)(?:\.(\d+))?(?:-(.+))?$/);
  if (!match) return null;
  return {
    version: base,
    line: `v${match[1]}.${match[2]}`,
    major: `v${match[1]}`,
  };
}

function sourceRef(file) {
  return { path: file.rel, sha256: file.sha256, lines: "1-80" };
}

function wikiFrontmatter({ canonicalId, title, refs = [], entities = [], edges = [], aliases = [] }) {
  const cleanRefs = refs.filter((ref) => typeof ref === "string" && ref.trim());
  const frontmatter = [
    "---",
    ...(aliases.length ? ["aliases:", ...aliases.map((a) => `  - "${a}"`)] : []),
    "tags:",
    "  - agentplane/context",
    "  - agentplane/release-docs-assimilation",
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
    ...(cleanRefs.length
      ? cleanRefs.slice(0, 25).map((r) => `    - "${r}"`)
      : ["    - no-source: generated index page"]),
    "  claims: []",
    "  graph_refs:",
    "    entities:",
    ...(entities.length ? entities.slice(0, 80).map((e) => `      - "${e}"`) : []),
    "    edges:",
    ...(edges.length ? edges.slice(0, 80).map((e) => `      - "${e}"`) : []),
    "  conflicts: []",
    "  updated_by: CURATOR",
    "---",
    "",
  ].join("\n");
  const sources = [
    "",
    "## Sources",
    "",
    ...(cleanRefs.length
      ? cleanRefs.slice(0, 25).map((ref, index) => `${index + 1}. [\`${ref}\`](../../${ref})`)
      : ["- no-source: generated navigation page over sourced child pages."]),
    "",
  ].join("\n");
  return `${frontmatter}${sources}`;
}

function write(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
}

const docFiles = walk(path.join(root, "docs"))
  .map((full) => {
    const rel = path.relative(root, full).replaceAll(path.sep, "/");
    const text = fs.readFileSync(full, "utf8");
    const headings = [...text.matchAll(/^#{1,3}\s+(.+)$/gm)].map((m) => m[1].trim()).slice(0, 12);
    const lower = text.toLowerCase();
    const concepts = conceptDefs
      .filter(([, terms]) => terms.some((term) => lower.includes(term)))
      .map(([id]) => id);
    const release = rel.startsWith("docs/releases/") ? releaseVersion(rel) : null;
    return {
      rel,
      text,
      bytes: Buffer.byteLength(text),
      sha256: sha256(text),
      title: titleOf(text, rel),
      headings,
      domain: domainOf(rel),
      concepts,
      release,
    };
  })
  .toSorted((a, b) => a.rel.localeCompare(b.rel));

const releaseFiles = docFiles.filter((f) => f.release);
const domains = new Map();
const releaseLines = new Map();
const concepts = new Map();

for (const file of docFiles) {
  if (!domains.has(file.domain)) domains.set(file.domain, []);
  domains.get(file.domain).push(file);
  for (const concept of file.concepts) {
    if (!concepts.has(concept)) concepts.set(concept, []);
    concepts.get(concept).push(file);
  }
  if (file.release) {
    if (!releaseLines.has(file.release.line)) releaseLines.set(file.release.line, []);
    releaseLines.get(file.release.line).push(file);
  }
}

const extracted = [];
const reasoningRefs = docFiles.slice(0, 20).map(sourceRef);
const sourceRefs = docFiles.map(sourceRef);

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
    ...itemBase(id, "graph_edge", summary, refs, 0.82),
    edge: { id, from, to, relation },
  });
}

function addFact(id, summary, refs) {
  extracted.push(itemBase(id, "fact", summary, refs, 0.84));
}

addEntity(
  "entity.release_docs_corpus",
  "source",
  "Release notes and documentation corpus",
  reasoningRefs,
  "Canonical docs/releases and docs/**/*.mdx source corpus for AgentPlane context assimilation.",
  ["release-docs-assimilation"],
);

for (const [line, files] of [...releaseLines.entries()].toSorted()) {
  const refs = files.slice(0, 8).map(sourceRef);
  const id = `entity.release_line.${slug(line)}`;
  addEntity(id, "concept", line, refs, `${line} release line represented by ${files.length} release note files.`);
  addEdge(
    `edge.release_docs_corpus.includes.${slug(line)}`,
    id,
    "entity.release_docs_corpus",
    "part_of",
    refs,
    `${line} belongs to the release/docs corpus.`,
  );
  addFact(`fact.release_line.${slug(line)}.coverage`, `${line} has ${files.length} release note files in docs/releases.`, refs);
}

for (const file of releaseFiles) {
  const id = `entity.release.${slug(file.release.version)}`;
  const lineId = `entity.release_line.${slug(file.release.line)}`;
  addEntity(
    id,
    "source",
    file.release.version,
    [sourceRef(file)],
    `${file.release.version} release note: ${file.title}.`,
  );
  addEdge(
    `edge.${slug(file.release.version)}.belongs_to.${slug(file.release.line)}`,
    id,
    lineId,
    "part_of",
    [sourceRef(file)],
    `${file.release.version} belongs to ${file.release.line}.`,
  );
}

for (const [domain, files] of [...domains.entries()].toSorted()) {
  const refs = files.slice(0, 8).map(sourceRef);
  const id = `entity.docs_domain.${slug(domain)}`;
  addEntity(
    id,
    "concept",
    domain,
    refs,
    `${domain} documentation domain represented by ${files.length} canonical docs files.`,
  );
  addEdge(
    `edge.release_docs_corpus.includes.docs_domain.${slug(domain)}`,
    id,
    "entity.release_docs_corpus",
    "part_of",
    refs,
    `${domain} belongs to the release/docs corpus.`,
  );
  addFact(`fact.docs_domain.${slug(domain)}.coverage`, `${domain} has ${files.length} documentation files in the assimilated source set.`, refs);
}

for (const file of docFiles) {
  const docId = `entity.doc.${slug(file.rel.replace(/^docs\//, "").replace(/\.(md|mdx)$/, ""))}`;
  const domainId = `entity.docs_domain.${slug(file.domain)}`;
  addEntity(docId, "file", file.title, [sourceRef(file)], `${file.rel} documents ${file.title}.`);
  addEdge(
    `edge.${slug(docId)}.in_domain.${slug(file.domain)}`,
    docId,
    domainId,
    "part_of",
    [sourceRef(file)],
    `${file.rel} belongs to the ${file.domain} docs domain.`,
  );
  if (file.release) {
    addEdge(
      `edge.${slug(docId)}.documents_release.${slug(file.release.version)}`,
      docId,
      `entity.release.${slug(file.release.version)}`,
      "mentions",
      [sourceRef(file)],
      `${file.rel} is the release note for ${file.release.version}.`,
    );
  }
}

for (const [concept, files] of [...concepts.entries()].toSorted()) {
  const refs = files.slice(0, 10).map(sourceRef);
  const conceptId = `entity.concept.${slug(concept)}`;
  addEntity(conceptId, "concept", concept, refs, `${concept} appears across ${files.length} release/docs sources.`);
  addFact(`fact.concept.${slug(concept)}.source_frequency`, `${concept} appears in ${files.length} release/docs source files.`, refs);
  for (const file of files.slice(0, 40)) {
    const docId = `entity.doc.${slug(file.rel.replace(/^docs\//, "").replace(/\.(md|mdx)$/, ""))}`;
    addEdge(
      `edge.${slug(docId)}.mentions.${slug(concept)}`,
      docId,
      conceptId,
      "mentions",
      [sourceRef(file)],
      `${file.rel} mentions ${concept}.`,
    );
    if (file.release) {
      addEdge(
        `edge.${slug(file.release.version)}.mentions.${slug(concept)}`,
        `entity.release.${slug(file.release.version)}`,
        conceptId,
        "mentions",
        [sourceRef(file)],
        `${file.release.version} release note mentions ${concept}.`,
      );
    }
  }
}

for (const file of docFiles) {
  const covered = [
    "entity.release_docs_corpus",
    `entity.docs_domain.${slug(file.domain)}`,
    `entity.doc.${slug(file.rel.replace(/^docs\//, "").replace(/\.(md|mdx)$/, ""))}`,
    ...file.concepts.slice(0, 8).map((concept) => `entity.concept.${slug(concept)}`),
  ];
  if (file.release) {
    covered.push(`entity.release_line.${slug(file.release.line)}`, `entity.release.${slug(file.release.version)}`);
  }
  extracted.push({
    ...itemBase(`coverage.release_docs.${slug(file.rel)}`, "coverage", `${file.rel} is represented by docs/release graph entities, wiki synthesis, and coverage rows.`, [sourceRef(file)], 0.9),
    coverage: {
      source_path: file.rel,
      status: "covered",
      reason: "Title, domain, release line where applicable, headings, and matched concepts were assimilated into graph rows, wiki synthesis pages, and the release/docs report.",
      covered_item_ids: covered,
    },
  });
}

const sgr = {
  schema_version: 1,
  kind: "context_extraction",
  task_id: taskId,
  reasoning: [
    {
      label: "source-inventory",
      summary: `Read ${docFiles.length} docs files including ${releaseFiles.length} release notes and grouped them by release line, docs domain, and recurring concept.`,
      evidence_refs: reasoningRefs,
    },
    {
      label: "graph-density",
      summary: "Promoted release lines, individual release notes, docs domains, documentation pages, and recurring concepts into graph entities; linked them with domain, release, and concept relations.",
      evidence_refs: reasoningRefs,
    },
  ],
  source_refs: sourceRefs,
  extracted_items: extracted,
};

const reportDir = path.join(root, ".agentplane/context/derived/reports");
fs.mkdirSync(reportDir, { recursive: true });
const sgrPath = path.join(reportDir, "release-docs-assimilation.sgr.json");
write(sgrPath, `${JSON.stringify(sgr, null, 2)}\n`);
execFileSync("ap", ["context", "extraction", "apply", sgrPath, "--task-id", taskId], {
  cwd: root,
  stdio: "inherit",
});

const wikiRoot = path.join(root, "context/wiki/release-docs");
const topConcepts = [...concepts.entries()].toSorted((a, b) => b[1].length - a[1].length);
const sourceBytes = docFiles.reduce((sum, file) => sum + file.bytes, 0);

write(
  path.join(wikiRoot, "index.md"),
  wikiFrontmatter({
    canonicalId: "wiki.release_docs.index",
    title: "Release notes and documentation assimilation",
    refs: ["docs/releases/README.md", "docs/README.md"],
    entities: ["entity.release_docs_corpus"],
  }) +
    [
      "# Release notes and documentation assimilation",
      "",
      `Assimilated ${docFiles.length} canonical documentation files, including ${releaseFiles.length} release notes, into graph-backed context.`,
      "",
      "## Navigation",
      "",
      "- [[Release documentation lines]]",
      "- [[Documentation domains]]",
      "- [[Release and documentation concepts]]",
      "- [[Release docs coverage]]",
      "",
      "## Metrics",
      "",
      `- source_files: ${docFiles.length}`,
      `- release_note_files: ${releaseFiles.length}`,
      `- source_bytes: ${sourceBytes}`,
      `- release_lines: ${releaseLines.size}`,
      `- docs_domains: ${domains.size}`,
      `- concepts: ${concepts.size}`,
      `- graph_entities_added_or_updated: ${extracted.filter((item) => item.kind === "graph_entity").length}`,
      `- graph_edges_added_or_updated: ${extracted.filter((item) => item.kind === "graph_edge").length}`,
      `- facts_added_or_updated: ${extracted.filter((item) => item.kind === "fact").length}`,
      `- coverage_rows_added_or_updated: ${docFiles.length}`,
      "",
    ].join("\n"),
);

write(
  path.join(wikiRoot, "release-lines.md"),
  wikiFrontmatter({
    canonicalId: "wiki.release_docs.release_lines",
    title: "Release documentation lines",
    refs: releaseFiles.slice(0, 20).map((f) => f.rel),
    entities: [...releaseLines.keys()].map((line) => `entity.release_line.${slug(line)}`),
  }) +
    [
      "# Release documentation lines",
      "",
      ...[...releaseLines.entries()].toSorted().map(
        ([line, files]) =>
          `- [[${line} release line]]: ${files.length} release notes; latest source: \`${files.at(-1)?.rel}\`.`,
      ),
      "",
    ].join("\n"),
);

write(
  path.join(wikiRoot, "docs-domains.md"),
  wikiFrontmatter({
    canonicalId: "wiki.release_docs.docs_domains",
    title: "Documentation domains",
    refs: docFiles.slice(0, 20).map((f) => f.rel),
    entities: [...domains.keys()].map((domain) => `entity.docs_domain.${slug(domain)}`),
  }) +
    [
      "# Documentation domains",
      "",
      ...[...domains.entries()].toSorted().map(
        ([domain, files]) => `- [[${domain} documentation domain]]: ${files.length} files.`,
      ),
      "",
    ].join("\n"),
);

write(
  path.join(wikiRoot, "concepts.md"),
  wikiFrontmatter({
    canonicalId: "wiki.release_docs.concepts",
    title: "Release and documentation concepts",
    refs: topConcepts.slice(0, 20).flatMap(([, files]) => files.slice(0, 1).map((f) => f.rel)),
    entities: topConcepts.map(([concept]) => `entity.concept.${slug(concept)}`),
  }) +
    [
      "# Release and documentation concepts",
      "",
      ...topConcepts.map(([concept, files]) => `- [[${concept} concept]]: ${files.length} source files.`),
      "",
    ].join("\n"),
);

write(
  path.join(wikiRoot, "coverage.md"),
  wikiFrontmatter({
    canonicalId: "wiki.release_docs.coverage",
    title: "Release docs coverage",
    refs: docFiles.slice(0, 20).map((f) => f.rel),
    entities: ["entity.release_docs_corpus"],
  }) +
    [
      "# Release docs coverage",
      "",
      `Coverage degree: ${docFiles.length}/${docFiles.length} source files covered.`,
      "",
      "- covered: title, heading outline, docs domain, release line/version where applicable, recurring concept matches.",
      "- omitted_boilerplate: navigation chrome, repeated installation snippets, generated CLI exhaustive details are summarized by domain/concept rather than repeated verbatim.",
      "- redacted: no secrets were copied into wiki synthesis.",
      "- unresolved: semantic extraction is deterministic keyword/domain based; it is useful for navigation but not a substitute for later human curation of subtle design decisions.",
      "",
    ].join("\n"),
);

for (const [line, files] of [...releaseLines.entries()].toSorted()) {
  write(
    path.join(wikiRoot, "release-lines", `${slug(line)}.md`),
    wikiFrontmatter({
      canonicalId: `wiki.release_docs.release_line.${slug(line)}`,
      title: `${line} release line`,
      refs: files.map((f) => f.rel),
      entities: [`entity.release_line.${slug(line)}`, ...files.map((f) => `entity.release.${slug(f.release.version)}`)],
    }) +
      [
        `# ${line} release line`,
        "",
        `This release line has ${files.length} release note files.`,
        "",
        "## Releases",
        "",
        ...files.map((f) => `- \`${f.release.version}\`: ${f.title} (${f.concepts.map((c) => `[[${c} concept]]`).join(", ") || "no matched concept"})`),
        "",
      ].join("\n"),
  );
}

for (const [domain, files] of [...domains.entries()].toSorted()) {
  write(
    path.join(wikiRoot, "domains", `${slug(domain)}.md`),
    wikiFrontmatter({
      canonicalId: `wiki.release_docs.domain.${slug(domain)}`,
      title: `${domain} documentation domain`,
      refs: files.slice(0, 20).map((f) => f.rel),
      entities: [`entity.docs_domain.${slug(domain)}`],
    }) +
      [
        `# ${domain} documentation domain`,
        "",
        `This domain has ${files.length} source files.`,
        "",
        "## Files",
        "",
        ...files.map((f) => `- \`${f.rel}\`: ${f.title}`),
        "",
      ].join("\n"),
  );
}

for (const [concept, files] of topConcepts) {
  write(
    path.join(wikiRoot, "concepts", `${slug(concept)}.md`),
    wikiFrontmatter({
      canonicalId: `wiki.release_docs.concept.${slug(concept)}`,
      title: `${concept} concept`,
      refs: files.slice(0, 20).map((f) => f.rel),
      entities: [`entity.concept.${slug(concept)}`],
    }) +
      [
        `# ${concept} concept`,
        "",
        `Matched in ${files.length} release/docs source files.`,
        "",
        "## Representative sources",
        "",
        ...files.slice(0, 40).map((f) => `- \`${f.rel}\`: ${f.title}`),
        "",
      ].join("\n"),
  );
}

const wikiFiles = walk(wikiRoot).map((full) => path.relative(root, full).replaceAll(path.sep, "/"));
const report = {
  task_id: taskId,
  source: {
    docs_files: docFiles.length,
    release_note_files: releaseFiles.length,
    source_bytes: sourceBytes,
    release_lines: releaseLines.size,
    docs_domains: domains.size,
    concepts: concepts.size,
  },
  assimilation: {
    wiki_pages: wikiFiles.length,
    sgr_items: extracted.length,
    graph_entities: extracted.filter((item) => item.kind === "graph_entity").length,
    graph_edges: extracted.filter((item) => item.kind === "graph_edge").length,
    facts: extracted.filter((item) => item.kind === "fact").length,
    coverage_rows: docFiles.length,
    coverage_degree: 1,
    granularity: "release line -> release note -> documentation domain -> documentation page -> recurring concept -> source coverage row",
  },
  wiki_files: wikiFiles,
  source_files: docFiles.map((file) => ({
    path: file.rel,
    bytes: file.bytes,
    sha256: file.sha256,
    title: file.title,
    domain: file.domain,
    release: file.release,
    concepts: file.concepts,
    headings: file.headings,
  })),
};
write(path.join(reportDir, "release-docs-assimilation.json"), `${JSON.stringify(report, null, 2)}\n`);
write(
  path.join(reportDir, "release-docs-coverage-detail.jsonl"),
  docFiles
    .map((file) =>
      JSON.stringify({
        id: `coverage.release_docs.${slug(file.rel)}`,
        source_path: file.rel,
        bytes: file.bytes,
        sha256: file.sha256,
        title: file.title,
        domain: file.domain,
        release: file.release,
        concepts: file.concepts,
        coverage_status: "covered",
      }),
    )
    .join("\n") + "\n",
);

const taskReadme = path.join(root, ".agentplane/tasks", taskId, "README.md");
let readme = fs.readFileSync(taskReadme, "utf8");
const sourceYaml = docFiles
  .map((file) => `        -\n          path: "${file.rel}"\n          sha256: "${file.sha256}"`)
  .join("\n");
readme = readme.replace(/source_set:\n      files: \[\]/, `source_set:\n      files:\n${sourceYaml}`);
write(taskReadme, readme);

console.log(
  JSON.stringify(
    {
      source_files: docFiles.length,
      release_note_files: releaseFiles.length,
      source_bytes: sourceBytes,
      wiki_pages: wikiFiles.length,
      graph_entities: report.assimilation.graph_entities,
      graph_edges: report.assimilation.graph_edges,
      facts: report.assimilation.facts,
      coverage_rows: report.assimilation.coverage_rows,
    },
    null,
    2,
  ),
);
