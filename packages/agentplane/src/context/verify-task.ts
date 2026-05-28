/* eslint-disable @typescript-eslint/no-base-to-string, unicorn/no-array-callback-reference */
import { CliError } from "../shared/errors.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  type CommandContext,
} from "../commands/shared/task-backend.js";
import { fileExists, isRecord, parseJsonlLines, readText, toPosix } from "./context-utils.js";
import path from "node:path";
import { readdir } from "node:fs/promises";
import { parse as parseYaml } from "yaml";
import { validateMaximumAssimilationCoverage } from "./coverage-validation.js";
import { validateMaximumAssimilationArtifacts } from "./maximum-assimilation-artifacts-validation.js";

type ContextExtension = {
  assimilation?: {
    propose_capabilities?: boolean;
    update_capabilities?: boolean;
    allow_raw_mutation?: boolean;
  };
  task_type?: string;
  mode?: string;
  source_set?: {
    files?: { path?: unknown; sha256?: unknown }[];
  };
  allowed_outputs?: string[];
  forbidden_outputs?: string[];
};

type ContextRunnerEvidence = {
  changed_paths?: string[];
  changed_capabilities?: string[];
  changed_graph_nodes?: string[];
  changed_facts?: string[];
};

type TaskRunner = {
  evidence?: ContextRunnerEvidence;
};

type VerificationInput = {
  task_kind?: string;
  mutation_scope?: string;
  blueprint_request?: string;
  id: string;
  owner?: string;
  status?: string;
  extensions?: Record<string, unknown>;
  runner?: TaskRunner;
};

const DEFAULT_ALLOWED = [
  "context/wiki/",
  ".agentplane/context/derived/facts/facts.jsonl",
  ".agentplane/context/derived/graph/entities.jsonl",
  ".agentplane/context/derived/graph/edges.jsonl",
  ".agentplane/context/derived/graph/provenance_edges.jsonl",
  ".agentplane/context/derived/capabilities/capabilities.jsonl",
  ".agentplane/context/derived/reports/assimilation-events.jsonl",
  ".agentplane/context/derived/reports/coverage.jsonl",
  ".agentplane/tasks/${taskId}/README.md",
  ".agentplane/tasks/${taskId}/acr.json",
];

const DEFAULT_FORBIDDEN = [
  "context/raw/",
  ".agentplane/cache.sqlite",
  ".agentplane/context/service/",
];

function normalizePath(path: string): string {
  return toPosix(path).replace(/^\/+/, "");
}

function normalizeChangedPath(projectRoot: string, value: string): string {
  const resolved = path.resolve(value);
  const root = path.resolve(projectRoot);
  if (resolved === root) return "";
  if (resolved.startsWith(`${root}${path.sep}`)) {
    return normalizePath(path.relative(root, resolved));
  }
  return normalizePath(value);
}

function hasPathPrefix(target: string, prefix: string): boolean {
  const normalizedPrefix = prefix.replace(/\/+$/u, "");
  return target === normalizedPrefix || target.startsWith(`${normalizedPrefix}/`);
}

function isTaskPathMatch(path: string, patterns: string[], taskId: string): boolean {
  return patterns.some((pattern) => {
    const resolved = pattern.replaceAll("${taskId}", taskId);
    if (resolved.includes("*")) {
      const asPrefix = resolved.replaceAll("*", "");
      return hasPathPrefix(path, asPrefix);
    }
    if (resolved.endsWith("/")) return hasPathPrefix(path, resolved);
    return path === resolved || path.startsWith(`${resolved}/`);
  });
}

function readContextExtensions(task: VerificationInput): ContextExtension {
  const extensions = isRecord(task.extensions) ? task.extensions : {};
  const rawContext = extensions["agentplane.context"];
  return isRecord(rawContext) ? (rawContext as ContextExtension) : {};
}

function readAllowed(context: ContextExtension, taskId: string): string[] {
  const extras = Array.isArray(context.allowed_outputs)
    ? context.allowed_outputs.filter(Boolean)
    : [];
  return [
    ...DEFAULT_ALLOWED.map((value) => value.replaceAll("${taskId}", taskId)),
    ...extras.map(String),
  ];
}

function readForbidden(context: ContextExtension): string[] {
  return [
    ...DEFAULT_FORBIDDEN,
    ...(Array.isArray(context.forbidden_outputs) ? context.forbidden_outputs : []),
  ].map(String);
}

function readChangedPaths(task: VerificationInput): string[] {
  const evidence = task.runner?.evidence;
  if (!isRecord(evidence)) return [];
  const changed = evidence.changed_paths;
  return Array.isArray(changed)
    ? changed.filter((path) => typeof path === "string" && path.trim())
    : [];
}

function isRawMutationAllowed(context: ContextExtension): boolean {
  return context.assimilation?.allow_raw_mutation === true;
}

function isProfileSwitchContextTask(context: ContextExtension): boolean {
  return (
    context.task_type === "context_profile_switch" || context.task_type === "context_configuration"
  );
}

function isMaximumAssimilationTask(task: VerificationInput, context: ContextExtension): boolean {
  return (
    task.blueprint_request === "context.maximum_assimilation" ||
    context.mode === "maximum_assimilation"
  );
}

async function readJsonFile(filePath: string): Promise<Record<string, unknown> | null> {
  try {
    const parsed = JSON.parse(await readText(filePath)) as unknown;
    return isRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function rowSourceRefs(row: Record<string, unknown>): string[] {
  const out: string[] = [];
  if (typeof row.source_ref === "string" && row.source_ref.trim()) out.push(row.source_ref);
  if (typeof row.source === "string" && row.source.trim()) out.push(row.source);
  if (Array.isArray(row.source_refs)) {
    out.push(...row.source_refs.filter((value): value is string => typeof value === "string"));
  }
  return out;
}

async function loadJsonlRows(filePath: string): Promise<Record<string, unknown>[]> {
  if (!(await fileExists(filePath))) return [];
  return parseJsonlLines(await readText(filePath)) as Record<string, unknown>[];
}

async function validateWikiPage(filePath: string, errors: string[]): Promise<void> {
  if (!filePath.endsWith(".md") && !filePath.endsWith(".mdx")) return;
  const text = await readText(filePath);
  if (!/source_refs\s*:|source_ref\s*:|no-source\s*:|no_source\s*:/u.test(text)) {
    errors.push(`${filePath}: wiki page must include source_refs or an explicit no-source reason`);
  }
}

function stripYamlFrontmatter(text: string): string {
  if (!text.startsWith("---")) return text;
  const end = text.indexOf("\n---", 3);
  return end === -1 ? text : text.slice(end + 4);
}

async function validateMaximumAssimilationGlossary(root: string, errors: string[]): Promise<void> {
  const rel = "context/wiki/glossary.md";
  const abs = path.join(root, rel);
  if (!(await fileExists(abs))) {
    errors.push(`${rel}: maximum assimilation requires a root glossary file`);
    return;
  }
  const text = await readText(abs);
  const body = stripYamlFrontmatter(text)
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.startsWith("#"))
    .filter((line) => !line.startsWith("<!--"));
  const hasNavigableEntry = body.some(
    (line) => /\[\[[^\]]+\]\]/u.test(line) || /\[[^\]]+\]\([^)]*context\/wiki\//u.test(line),
  );
  if (!hasNavigableEntry) {
    errors.push(
      `${rel}: maximum-assimilation glossary must include at least one navigable canonical wiki entry`,
    );
  }
  await validateWikiPage(abs, errors);
}

async function validateFacts(filePath: string, errors: string[]): Promise<void> {
  for (const row of await loadJsonlRows(filePath)) {
    const id = String(row.id ?? "<unknown>");
    if (rowSourceRefs(row).length === 0) {
      errors.push(`${filePath}#${id}: fact row has no source_ref/source_refs`);
    }
    if (typeof row.confidence !== "number" || !Number.isFinite(row.confidence)) {
      errors.push(`${filePath}#${id}: fact row must include numeric confidence`);
    }
    if (typeof row.status !== "string" || !row.status.trim()) {
      errors.push(`${filePath}#${id}: fact row must include status`);
    }
  }
}

async function validateGraph(root: string, errors: string[]): Promise<void> {
  const graphRoot = path.join(root, ".agentplane/context/derived/graph");
  const entities = await loadJsonlRows(path.join(graphRoot, "entities.jsonl"));
  const entityIds = new Set(entities.map((row) => String(row.id ?? "")).filter(Boolean));
  for (const row of await loadJsonlRows(path.join(graphRoot, "edges.jsonl"))) {
    const id = String(row.id ?? "<unknown>");
    const from = String(row.from ?? "");
    const to = String(row.to ?? "");
    if (!from || !entityIds.has(from))
      errors.push(`edges.jsonl#${id}: missing from entity ${from}`);
    if (!to || !entityIds.has(to)) errors.push(`edges.jsonl#${id}: missing to entity ${to}`);
    if (rowSourceRefs(row).length === 0) {
      errors.push(`edges.jsonl#${id}: edge row has no source_ref/source_refs`);
    }
  }
  for (const row of await loadJsonlRows(path.join(graphRoot, "provenance_edges.jsonl"))) {
    const id = String(row.id ?? "<unknown>");
    if (rowSourceRefs(row).length === 0) {
      errors.push(`provenance_edges.jsonl#${id}: provenance row has no source`);
    }
    if (typeof row.target !== "string" && typeof row.artifact !== "string") {
      errors.push(`provenance_edges.jsonl#${id}: provenance row must include target or artifact`);
    }
  }
}

function hasNonEmptyGraphRefs(text: string): boolean {
  const frontmatterMatch = /^---\n([\s\S]*?)\n---/u.exec(text.replaceAll("\r\n", "\n"));
  const frontmatter = frontmatterMatch?.[1] ?? "";
  if (!frontmatter) return false;
  const parsed = parseYaml(frontmatter) as unknown;
  if (!isRecord(parsed) || !isRecord(parsed.agentplane_context)) return false;
  const graphRefs = parsed.agentplane_context.graph_refs;
  if (!isRecord(graphRefs)) return false;
  return (
    (Array.isArray(graphRefs.entities) && graphRefs.entities.length > 0) ||
    (Array.isArray(graphRefs.edges) && graphRefs.edges.length > 0)
  );
}

async function validateMaximumAssimilationDerivedConsistency(
  root: string,
  context: ContextExtension,
  errors: string[],
): Promise<void> {
  if (context.mode !== "maximum_assimilation") return;
  if (isProfileSwitchContextTask(context)) return;
  const graphRoot = path.join(root, ".agentplane/context/derived/graph");
  const entities = await loadJsonlRows(path.join(graphRoot, "entities.jsonl"));
  const edges = await loadJsonlRows(path.join(graphRoot, "edges.jsonl"));
  const provenance = await loadJsonlRows(path.join(graphRoot, "provenance_edges.jsonl"));
  const facts = await loadJsonlRows(
    path.join(root, ".agentplane/context/derived/facts/facts.jsonl"),
  );
  if (
    entities.length === 0 ||
    edges.length === 0 ||
    provenance.length === 0 ||
    facts.length === 0
  ) {
    errors.push(
      "maximum-assimilation requires non-empty derived facts, graph entities, graph edges, and provenance before verification",
    );
  }
  const wikiRoot = path.join(root, "context/wiki");
  const wikiPages: string[] = [];
  async function walk(current: string): Promise<void> {
    let entries;
    try {
      entries = await readdir(current, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.name === ".obsidian") continue;
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        wikiPages.push(full);
      }
    }
  }
  await walk(wikiRoot);
  let pagesWithGraphRefs = 0;
  for (const page of wikiPages) {
    if (hasNonEmptyGraphRefs(await readText(page))) pagesWithGraphRefs += 1;
  }
  if (pagesWithGraphRefs === 0) return;
}

async function validateCapabilityArtifact(filePath: string, errors: string[]): Promise<void> {
  const text = await readText(filePath);
  if (filePath.endsWith(".jsonl")) {
    for (const row of parseJsonlLines(text)) {
      const id = String(row.id ?? "<unknown>");
      if (typeof row.id !== "string" || !row.id.trim()) {
        errors.push(`${filePath}#${id}: capability row missing id`);
      }
      if (rowSourceRefs(row).length === 0) {
        errors.push(`${filePath}#${id}: capability row has no source_refs`);
      }
    }
    return;
  }
  if ((filePath.endsWith(".md") || filePath.endsWith(".mdx")) && !text.trim().startsWith("---")) {
    errors.push(`${filePath}: capability markdown must use YAML frontmatter`);
  }
}

async function validateAcrContextExtension(
  root: string,
  task: VerificationInput,
  context: ContextExtension,
  errors: string[],
): Promise<void> {
  const acrPath = path.join(root, ".agentplane/tasks", task.id, "acr.json");
  if (!(await fileExists(acrPath))) {
    if (task.status === "DONE") {
      errors.push(
        `${toPosix(path.relative(root, acrPath))}: ACR file is required for completed context tasks`,
      );
    }
    return;
  }
  const acr = await readJsonFile(acrPath);
  const extension = isRecord(acr?.extensions) ? acr.extensions["agentplane.context"] : undefined;
  if (!isRecord(extension)) {
    errors.push(`${toPosix(path.relative(root, acrPath))}: missing extensions.agentplane.context`);
    return;
  }
  const acrSourceSet = isRecord(extension.source_set) ? extension.source_set : {};
  const acrFiles = Array.isArray(acrSourceSet.files) ? acrSourceSet.files : [];
  const taskFiles = Array.isArray(context.source_set?.files) ? context.source_set.files : [];
  if (acrFiles.length !== taskFiles.length) {
    errors.push(
      `${toPosix(path.relative(root, acrPath))}: source_set.files count does not match task frontmatter`,
    );
  }
}

async function validateContextArtifacts(opts: {
  root: string;
  task: VerificationInput;
  context: ContextExtension;
  changedPaths: string[];
}): Promise<string[]> {
  const errors: string[] = [];
  const sourceFiles = Array.isArray(opts.context.source_set?.files)
    ? opts.context.source_set.files
    : [];
  if (sourceFiles.length === 0) {
    if (isProfileSwitchContextTask(opts.context)) {
      if (opts.changedPaths.some((changed) => hasPathPrefix(changed, "context/raw/"))) {
        errors.push("profile-switch context tasks must not mutate context/raw/**");
      }
    } else {
      errors.push(
        "extensions.agentplane.context.source_set.files must not be empty for context assimilation tasks",
      );
    }
  }
  for (const file of sourceFiles) {
    if (typeof file.path !== "string" || !file.path.trim()) {
      errors.push("source_set file is missing path");
    }
    if (typeof file.sha256 !== "string" || !file.sha256.startsWith("sha256:")) {
      errors.push(`source_set file has invalid sha256: ${String(file.path ?? "<unknown>")}`);
    }
  }

  const pathsToCheck = new Set(opts.changedPaths);
  if (opts.changedPaths.length === 0) {
    pathsToCheck.add(".agentplane/context/derived/facts/facts.jsonl");
    pathsToCheck.add(".agentplane/context/derived/graph/entities.jsonl");
    pathsToCheck.add(".agentplane/context/derived/graph/edges.jsonl");
    pathsToCheck.add(".agentplane/context/derived/graph/provenance_edges.jsonl");
    pathsToCheck.add(".agentplane/context/derived/reports/coverage.jsonl");
  }

  for (const rel of pathsToCheck) {
    const abs = path.join(opts.root, rel);
    if (!(await fileExists(abs))) continue;
    if (rel.startsWith("context/wiki/")) await validateWikiPage(abs, errors);
    if (rel === ".agentplane/context/derived/facts/facts.jsonl") await validateFacts(abs, errors);
    if (rel.startsWith("context/capabilities/")) await validateCapabilityArtifact(abs, errors);
    if (rel.startsWith(".agentplane/context/derived/capabilities/")) {
      await validateCapabilityArtifact(abs, errors);
    }
  }
  if (
    opts.task.blueprint_request === "context.maximum_assimilation" &&
    !isProfileSwitchContextTask(opts.context)
  ) {
    await validateMaximumAssimilationGlossary(opts.root, errors);
  }
  await validateGraph(opts.root, errors);
  await validateMaximumAssimilationCoverage(opts.root, opts.context, errors);
  await validateMaximumAssimilationDerivedConsistency(opts.root, opts.context, errors);
  if (
    isMaximumAssimilationTask(opts.task, opts.context) &&
    !isProfileSwitchContextTask(opts.context)
  ) {
    errors.push(
      ...(await validateMaximumAssimilationArtifacts({
        root: opts.root,
        changedPaths: opts.changedPaths,
      })),
    );
  }
  await validateAcrContextExtension(opts.root, opts.task, opts.context, errors);
  return errors;
}

export async function cmdContextVerifyTask(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  parsed: { taskId: string };
}): Promise<number> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const task = await loadTaskFromContext({ ctx, taskId: opts.parsed.taskId });
  if (!task) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Task not found: ${opts.parsed.taskId}`,
    });
  }
  if (task.task_kind !== "context") {
    process.stdout.write(
      `context verify-task ${opts.parsed.taskId}: skipped_not_applicable (task_kind=${task.task_kind ?? "unknown"}; expected context)\n`,
    );
    return 0;
  }
  if (task.mutation_scope !== "context") {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Task ${opts.parsed.taskId} has invalid mutation scope: ${task.mutation_scope ?? "unknown"}`,
    });
  }
  if (
    task.blueprint_request !== "context.assimilation" &&
    task.blueprint_request !== "context.maximum_assimilation"
  ) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Task ${opts.parsed.taskId} has unexpected blueprint request: ${task.blueprint_request ?? "unknown"}`,
    });
  }

  const normalizedTask = task as VerificationInput;
  const context = readContextExtensions(normalizedTask);
  const allowed = readAllowed(context, task.id);
  const forbidden = readForbidden(context);
  const changedPaths = readChangedPaths(normalizedTask)
    .map((value) => normalizeChangedPath(ctx.resolvedProject.gitRoot, value))
    .map(normalizePath)
    .filter(Boolean);
  const normalizedTaskId = task.id;
  const normalizedTaskOwner = task.owner ?? "unknown";
  const requiredSourceRoots =
    Array.isArray(context.allowed_outputs) && context.allowed_outputs.length > 0
      ? context.allowed_outputs.map(String)
      : [];

  if (changedPaths.length > 0) {
    const denied: string[] = [];
    for (const changed of changedPaths) {
      if (
        changed === ".agentplane/cache.sqlite" ||
        changed.startsWith(".agentplane/context/service/")
      ) {
        denied.push(`${changed}: forbidden service mutation`);
        continue;
      }

      if (hasPathPrefix(changed, "context/raw/") && !isRawMutationAllowed(context)) {
        denied.push(`${changed}: raw mutation is forbidden`);
      }

      if (
        !isTaskPathMatch(changed, allowed, normalizedTaskId) &&
        !DEFAULT_FORBIDDEN.some((forbiddenPrefix) => hasPathPrefix(changed, forbiddenPrefix))
      ) {
        denied.push(`${changed}: path outside allowed outputs`);
      }

      for (const forbiddenPrefix of forbidden) {
        if (hasPathPrefix(changed, forbiddenPrefix)) {
          denied.push(`${changed}: matches forbidden output ${forbiddenPrefix}`);
          break;
        }
      }
      if (
        requiredSourceRoots.length > 0 &&
        !isTaskPathMatch(changed, requiredSourceRoots, normalizedTaskId)
      ) {
        denied.push(`${changed}: path outside required context outputs`);
      }
    }
    if (denied.length > 0) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `context verify-task failed for ${opts.parsed.taskId}: ${denied.length} mutation policy violation(s)\n- ${denied.join("\n- ")}`,
      });
    }
  } else {
    process.stdout.write(
      `context verify-task ${opts.parsed.taskId}: no changed_paths reported by task evidence\n`,
    );
  }

  const artifactErrors = await validateContextArtifacts({
    root: ctx.resolvedProject.gitRoot,
    task: normalizedTask,
    context,
    changedPaths,
  });
  if (artifactErrors.length > 0) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `context verify-task failed for ${opts.parsed.taskId}: ${artifactErrors.length} artifact validation issue(s)\n- ${artifactErrors.join("\n- ")}`,
    });
  }

  process.stdout.write(
    `context verify-task ${opts.parsed.taskId}: ok (${normalizedTaskOwner} / ${task.status ?? "unknown"})\n`,
  );
  return 0;
}
