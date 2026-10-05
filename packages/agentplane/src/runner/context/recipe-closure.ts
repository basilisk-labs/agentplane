import { createHash } from "node:crypto";
import { constants } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { parseTaskPlanProposal, taskCentricDigest } from "@agentplaneorg/core/tasks";
import {
  isScenarioRepoPath,
  resolveScenarioParameters,
  validateRecipeManifest,
  type CompiledRecipeDependencyClosure,
  type RecipeClosureFile,
  type RecipeDependencyReference,
  type ScenarioParameterBinding,
} from "@agentplaneorg/recipes";
import {
  assertContainedPathChainIdentityUnchanged,
  captureContainedPathChainIdentity,
  type ContainedPathChainIdentity,
} from "../../shared/contained-stable-file.js";
import { readStableRegularFileNoFollow } from "../../shared/stable-file.js";

const MAX_FILES = 4096;
const MAX_BYTES = 64 * 1024 * 1024;
const MAX_FILE_BYTES = 16 * 1024 * 1024;
function compareText(left: string, right: string): number {
  if (left === right) return 0;
  return left < right ? -1 : 1;
}
const sorted = (values: Iterable<string>) => [...new Set(values)].toSorted();
const bytesDigest = (bytes: Uint8Array) =>
  `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
const fileKey = (source: string, relative: string) => `file:${source}:${relative}`;
const referenceKey = (ref: RecipeDependencyReference): string =>
  ref.kind === "file"
    ? fileKey(ref.source, ref.path)
    : ref.kind === "package" || ref.kind === "tool"
      ? `${ref.kind}:${ref.id}`
      : `secret:${JSON.stringify([ref.id, ref.version])}`;

export class RecipeClosureError extends Error {
  constructor(
    readonly code: string,
    readonly reference: string,
  ) {
    super(`Recipe dependency closure ${code}: ${reference}`);
    this.name = "RecipeClosureError";
  }
}
function fail(code: string, reference: string): never {
  throw new RecipeClosureError(code, reference);
}
function indexBy<T>(values: readonly T[], key: (value: T) => string): Map<string, T> {
  const entries = new Map<string, T>();
  for (const value of values) {
    const id = key(value);
    if (entries.has(id)) fail("duplicate_declaration", id);
    entries.set(id, value);
  }
  return entries;
}

export type ComputedRecipeClosure = {
  closure: CompiledRecipeDependencyClosure;
  /** Non-secret bytes for the existing evidence owner. This function does not persist them. */
  objects: { digest: string; bytes: Uint8Array }[];
  assertUnchanged: () => Promise<void>;
};

/** Pre-approval computation only. Declarations describe dependencies; they grant no permission.
 * Packages must declare a complete file inventory and pin its content digest. External package
 * dependencies must be explicit. This is not a JavaScript/shell import analyzer or effect sandbox.
 */
export async function computeRecipeDependencyClosure(opts: {
  recipe_root: string;
  repository_root: string;
  scenario_id: string;
  bindings: readonly ScenarioParameterBinding[];
  proposed_plan: unknown;
}): Promise<ComputedRecipeClosure> {
  if (!["linux", "darwin"].includes(process.platform) || !constants.O_NOFOLLOW)
    fail("containment_unsupported", process.platform);
  const roots = {
    recipe: path.resolve(opts.recipe_root),
    repository: path.resolve(opts.repository_root),
  };
  const recipeIdentity = await captureContainedPathChainIdentity({
    repository_root: roots.repository,
    file_path: roots.recipe,
    label: "Recipe package root",
    path_policy: { target_kind: "file_or_directory", exact_case: true, allow_root: true },
  });
  if (!recipeIdentity.target_exists) fail("missing_package_root", "recipe");
  const identities: ContainedPathChainIdentity[] = [recipeIdentity];
  const content = new Map<string, { record: RecipeClosureFile; bytes: Buffer }>();
  let totalBytes = 0;
  async function capture(source: "recipe" | "repository", relative: string, directory = false) {
    if (relative === "." || !isScenarioRepoPath(relative)) fail("unsafe_path", relative);
    const identity = await captureContainedPathChainIdentity({
      repository_root: roots[source],
      file_path: path.join(roots[source], relative),
      label: "Recipe closure",
      path_policy: { target_kind: directory ? "file_or_directory" : "file", exact_case: true },
    });
    if (!identity.target_exists) fail("missing_path", fileKey(source, relative));
    identities.push(identity);
    return identity;
  }
  async function read(source: "recipe" | "repository", relative: string) {
    const key = fileKey(source, relative);
    const known = content.get(key);
    if (known) return known;
    // Declared secrets belong in opaque refs, never in a retained dotenv/private-key file.
    if (
      relative
        .split("/")
        .some((part) => /^\.env(?:\.|$)|^id_(?:rsa|ed25519)$|\.(?:key|pem)$/u.test(part))
    )
      fail("secret_file_forbidden", key);
    if (content.size >= MAX_FILES) fail("file_budget_exceeded", key);
    const identity = await capture(source, relative);
    const bytes = await readStableRegularFileNoFollow(identity.file_path, "Recipe closure", {
      max_bytes: Math.min(MAX_FILE_BYTES, MAX_BYTES - totalBytes),
      expected_identity: identity.identities.at(-1),
    });
    await assertContainedPathChainIdentityUnchanged(identity, "Recipe closure");
    totalBytes += bytes.length;
    const value = {
      record: { source, path: relative, digest: bytesDigest(bytes), size_bytes: bytes.length },
      bytes,
    };
    content.set(key, value);
    return value;
  }
  const manifestBytes = await read("recipe", "manifest.json");
  const manifest = validateRecipeManifest(JSON.parse(manifestBytes.bytes.toString("utf8")));
  // The manifest is a catalogue index. Retain only selected definitions below, not unrelated bytes.
  content.delete(fileKey("recipe", "manifest.json"));
  const declaration = manifest.dependency_closure;
  if (!declaration) fail("declaration_missing", manifest.id);
  const selected = manifest.scenarios?.filter((item) => item.id === opts.scenario_id) ?? [];
  if (selected.length !== 1) fail("scenario_unknown", opts.scenario_id);
  const descriptor = selected[0]!;
  const scenarioBytes = await read("recipe", descriptor.file);
  const scenario = resolveScenarioParameters(
    JSON.parse(scenarioBytes.bytes.toString("utf8")),
    opts.bindings,
  );
  if (scenario.id !== descriptor.id) fail("scenario_identity_mismatch", descriptor.id);
  const proposal = parseTaskPlanProposal(opts.proposed_plan);
  const files = indexBy(declaration.files, (entry) => fileKey(entry.source, entry.path));
  const packages = indexBy(declaration.packages, (entry) => entry.id);
  const tools = indexBy(manifest.tools ?? [], (entry) => entry.id);
  const toolPackages = indexBy(declaration.tools, (entry) => entry.id);
  const capabilities = indexBy(declaration.capabilities, (entry) => entry.id);
  const commands = indexBy(declaration.commands, (entry) => entry.command);
  const agents = indexBy(manifest.agents ?? [], (entry) => entry.id);
  const skills = indexBy(manifest.skills ?? [], (entry) => entry.id);
  const nodes = new Map<string, CompiledRecipeDependencyClosure["nodes"][number]>();
  const active = new Set<string>();
  const secrets = new Map<string, { id: string; version: string }>();
  const rootKeys = new Set<string>();
  function put(id: string, definition: unknown, dependencies: string[]) {
    if (nodes.size >= MAX_FILES) fail("node_budget_exceeded", id);
    nodes.set(id, { id, definition, dependencies: sorted(dependencies) });
  }
  async function visit(ref: RecipeDependencyReference): Promise<void> {
    const id = referenceKey(ref);
    if (nodes.has(id)) return;
    if (active.has(id)) fail("dependency_cycle", id);
    active.add(id);
    switch (ref.kind) {
      case "secret": {
        const existing = secrets.get(ref.id);
        if (existing && existing.version !== ref.version)
          fail("conflicting_secret_version", ref.id);
        secrets.set(ref.id, { id: ref.id, version: ref.version });
        put(id, { id: ref.id, version: ref.version }, []);

        break;
      }
      case "file": {
        const entry = files.get(id);
        if (!entry) fail("file_dependencies_unknown", id);
        const value = await read(ref.source, ref.path);
        for (const dependency of entry.dependencies) await visit(dependency);
        put(
          id,
          value.record,
          entry.dependencies.map((ref) => referenceKey(ref)),
        );

        break;
      }
      case "tool": {
        await tool(ref.id);

        break;
      }
      default: {
        const entry = packages.get(ref.id);
        if (!entry) fail("package_unpinned", ref.id);
        if (new Set(entry.files).size !== entry.files.length)
          fail("duplicate_package_file", ref.id);
        const inventory: string[] = [];
        async function walk(relative: string, prefix: string): Promise<void> {
          if (inventory.length >= MAX_FILES || identities.length >= MAX_FILES * 4)
            fail("file_budget_exceeded", id);
          const identity = await capture(entry!.source, relative, true);
          const children = await readdir(identity.file_path, { withFileTypes: true });
          if (children.length + inventory.length > MAX_FILES) fail("file_budget_exceeded", id);
          for (const child of children.toSorted((a, b) => compareText(a.name, b.name))) {
            const subpath = prefix ? `${prefix}/${child.name}` : child.name;
            if (child.isSymbolicLink() || (!child.isDirectory() && !child.isFile()))
              fail("unsafe_package_entry", subpath);
            if (child.isDirectory()) await walk(`${relative}/${child.name}`, subpath);
            else inventory.push(subpath);
          }
          await assertContainedPathChainIdentityUnchanged(identity, "Recipe closure");
        }
        await walk(entry.root, "");
        if (JSON.stringify(sorted(inventory)) !== JSON.stringify(sorted(entry.files)))
          fail("package_inventory_unpinned", ref.id);
        const pinned = [];
        for (const relative of sorted(entry.files)) {
          const value = await read(entry.source, `${entry.root}/${relative}`);
          pinned.push({ path: relative, digest: value.record.digest });
        }
        if (taskCentricDigest(pinned) !== entry.digest) fail("package_digest_mismatch", ref.id);
        for (const dependency of entry.dependencies) await visit(dependency);
        put(
          id,
          {
            id: entry.id,
            version: entry.version,
            source: entry.source,
            root: entry.root,
            digest: entry.digest,
            files: pinned,
          },
          entry.dependencies.map((ref) => referenceKey(ref)),
        );
      }
    }
    active.delete(id);
  }
  async function root(ref: RecipeDependencyReference) {
    rootKeys.add(referenceKey(ref));
    await visit(ref);
  }
  async function tool(id: string) {
    const definition = tools.get(id);
    const pin = toolPackages.get(id);
    if (!definition || !pin) fail("tool_package_unpinned", id);
    const pkg = packages.get(pin.package_id);
    if (
      pkg?.source !== "recipe" ||
      !definition.entrypoint.startsWith(`${pkg.root}/`) ||
      !pkg.files.includes(definition.entrypoint.slice(pkg.root.length + 1))
    )
      fail("entrypoint_not_in_package", id);
    await visit({ kind: "package", id: pin.package_id });
    put(`tool:${id}`, definition, [`package:${pin.package_id}`]);
  }
  async function skill(id: string) {
    const definition = skills.get(id);
    if (!definition) fail("skill_unknown", id);
    const ref = { kind: "file" as const, source: "recipe" as const, path: definition.file };
    await root(ref);
    put(`skill:${id}`, definition, [referenceKey(ref)]);
    rootKeys.add(`skill:${id}`);
  }
  for (const id of manifest.requires ?? []) await root({ kind: "package", id });
  for (const id of descriptor.agents_involved) {
    const definition = agents.get(id);
    if (!definition) fail("agent_unknown", id);
    await root({ kind: "file", source: "recipe", path: definition.file });
    for (const dep of definition.skills ?? []) await skill(dep);
    for (const dep of definition.tools ?? []) await root({ kind: "tool", id: dep });
    put(`agent:${id}`, definition, [
      fileKey("recipe", definition.file),
      ...(definition.skills ?? []).map((dep) => `skill:${dep}`),
      ...(definition.tools ?? []).map((dep) => `tool:${dep}`),
    ]);
    rootKeys.add(`agent:${id}`);
  }
  for (const id of descriptor.skills_used) await skill(id);
  for (const id of descriptor.tools_used) await root({ kind: "tool", id });
  await root({ kind: "file", source: "recipe", path: descriptor.file });
  put(`scenario:${descriptor.id}`, descriptor, sorted(rootKeys));
  rootKeys.add(`scenario:${descriptor.id}`);
  const checks = [
    ...proposal.top_level_validation.checks,
    ...proposal.work_items.work_items.flatMap((item) => item.validation.checks),
  ];
  const requestedCapabilities = sorted([
    ...proposal.work_items.work_items.flatMap((item) => item.capabilities),
    ...checks.map((check) => check.capability),
  ]);
  for (const id of requestedCapabilities) {
    const entry = capabilities.get(id);
    if (!entry) fail("capability_dependencies_unknown", id);
    for (const ref of entry.dependencies) await visit(ref);
    put(
      `capability:${id}`,
      { id },
      entry.dependencies.map((ref) => referenceKey(ref)),
    );
    rootKeys.add(`capability:${id}`);
  }
  for (const command of sorted(checks.flatMap((check) => (check.command ? [check.command] : [])))) {
    const entry = commands.get(command);
    if (!entry) fail("command_dependencies_unknown", command);
    for (const ref of entry.dependencies) await visit(ref);
    const id = `command:${taskCentricDigest(command)}`;
    put(
      id,
      { command },
      entry.dependencies.map((ref) => referenceKey(ref)),
    );
    rootKeys.add(id);
  }
  for (const item of proposal.work_items.work_items) {
    for (const source of [...item.context.required_sources, ...item.context.optional_sources])
      await root({ kind: "file", source: "repository", path: source });
  }
  const body = {
    schema_version: 1 as const,
    kind: "recipe_dependency_closure" as const,
    recipe: { id: manifest.id, version: manifest.version },
    scenario_id: scenario.id,
    scenario_digest: taskCentricDigest(scenario),
    plan_digest: taskCentricDigest(proposal),
    roots: sorted(rootKeys),
    nodes: sorted(nodes.keys()).map((id) => nodes.get(id)!),
    files: sorted(content.keys()).map((id) => content.get(id)!.record),
    secret_refs: sorted(secrets.keys()).map((id) => secrets.get(id)!),
  };
  const closure = { ...body, digest: taskCentricDigest(body) };
  const objects = [
    ...new Map(
      [...content.values()].map((entry) => [
        entry.record.digest,
        { digest: entry.record.digest, bytes: new Uint8Array(entry.bytes) },
      ]),
    ).values(),
  ].toSorted((a, b) => compareText(a.digest, b.digest));
  const reportDigest = taskCentricDigest(closure);
  const objectInventoryDigest = taskCentricDigest(objects.map((object) => object.digest));
  const assertUnchanged = async () => {
    if (
      taskCentricDigest(closure) !== reportDigest ||
      taskCentricDigest(objects.map((object) => object.digest)) !== objectInventoryDigest ||
      objects.some((object) => bytesDigest(object.bytes) !== object.digest)
    )
      fail("computed_closure_changed", scenario.id);
    for (const identity of identities)
      await assertContainedPathChainIdentityUnchanged(identity, "Recipe closure");
  };
  await assertUnchanged();
  return Object.freeze({ closure, objects, assertUnchanged });
}
