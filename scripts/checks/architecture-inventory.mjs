import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const REQUIRED_CATEGORIES = new Set([
  "backend_entrypoint",
  "blueprint_consumer",
  "blueprint_producer",
  "generated_mirror",
  "lifecycle_writer",
  "project_local_definition",
  "public_export",
  "recipe_extension",
  "verification_identity",
]);

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function requireText(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be non-empty text.`);
  }
  return value;
}

export async function validateArchitectureInventory({ repoRoot, inventory }) {
  if (inventory?.schema_version !== 1 || !Array.isArray(inventory.rows)) {
    throw new Error("Architecture inventory schema is unsupported.");
  }
  if (inventory.unknown_custom_semantics !== "explicit_blocker") {
    throw new Error("Unknown custom semantics must remain explicit blockers.");
  }

  const ids = new Set();
  const categories = new Set();
  const sourceBytes = new Map();
  for (const [index, row] of inventory.rows.entries()) {
    const prefix = `rows[${index}]`;
    const id = requireText(row?.id, `${prefix}.id`);
    if (ids.has(id)) throw new Error(`Duplicate architecture inventory id: ${id}.`);
    ids.add(id);
    categories.add(requireText(row.category, `${prefix}.category`));
    requireText(row.owner, `${prefix}.owner`);
    requireText(row.caller, `${prefix}.caller`);
    requireText(row.invariant, `${prefix}.invariant`);
    requireText(row.replacement_test, `${prefix}.replacement_test`);
    if (!new Set(["existing", "proposed"]).has(row.replacement_test_status)) {
      throw new Error(`${prefix}.replacement_test_status is invalid.`);
    }
    if (!Array.isArray(row.sources) || row.sources.length === 0) {
      throw new Error(`${prefix}.sources must not be empty.`);
    }
    for (const [sourceIndex, source] of row.sources.entries()) {
      const sourcePrefix = `${prefix}.sources[${sourceIndex}]`;
      const relativePath = requireText(source?.path, `${sourcePrefix}.path`);
      if (path.isAbsolute(relativePath) || relativePath.split("/").includes("..")) {
        throw new Error(`${sourcePrefix}.path must stay inside the repository.`);
      }
      if (!Array.isArray(source.symbols) || source.symbols.length === 0) {
        throw new Error(`${sourcePrefix}.symbols must not be empty.`);
      }
      let bytes = sourceBytes.get(relativePath);
      if (bytes === undefined) {
        bytes = await readFile(path.join(repoRoot, relativePath), "utf8");
        sourceBytes.set(relativePath, bytes);
      }
      for (const symbol of source.symbols) {
        const expected = requireText(symbol, `${sourcePrefix}.symbols`);
        if (!bytes.includes(expected)) {
          throw new Error(`${id} source ${relativePath} is missing required symbol ${expected}.`);
        }
      }
    }
  }

  const missingCategories = [...REQUIRED_CATEGORIES].filter((category) => !categories.has(category));
  if (missingCategories.length > 0) {
    throw new Error(`Architecture inventory is missing categories: ${missingCategories.join(", ")}.`);
  }

  const sourceManifest = [...sourceBytes]
    .map(([relativePath, bytes]) => `${relativePath}\0${sha256(bytes)}`)
    .sort()
    .join("\0");
  return Object.freeze({
    schema_version: 1,
    row_count: inventory.rows.length,
    source_count: sourceBytes.size,
    categories: [...categories].sort(),
    source_digest: `sha256:${sha256(sourceManifest)}`,
    unknown_custom_semantics: inventory.unknown_custom_semantics,
  });
}

export async function readAndValidateArchitectureInventory(repoRoot) {
  const inventoryPath = path.join(repoRoot, "scripts/baselines/architecture-inventory.json");
  const inventory = JSON.parse(await readFile(inventoryPath, "utf8"));
  return await validateArchitectureInventory({ repoRoot, inventory });
}

async function main() {
  const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
  const repoRoot = path.resolve(scriptDirectory, "../..");
  const report = await readAndValidateArchitectureInventory(repoRoot);
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await main();
}
