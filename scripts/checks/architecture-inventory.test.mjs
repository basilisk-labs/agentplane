import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  readAndValidateArchitectureInventory,
  validateArchitectureInventory,
} from "./architecture-inventory.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const inventoryPath = path.join(repoRoot, "scripts/baselines/architecture-inventory.json");

test("reproduces the source-bound architecture inventory", async () => {
  const first = await readAndValidateArchitectureInventory(repoRoot);
  const second = await readAndValidateArchitectureInventory(repoRoot);

  assert.deepEqual(second, first);
  assert.equal(first.row_count, 12);
  assert.equal(first.unknown_custom_semantics, "explicit_blocker");
  assert.match(first.source_digest, /^sha256:[0-9a-f]{64}$/u);
  assert.ok(first.categories.includes("generated_mirror"));
  assert.ok(first.categories.includes("backend_entrypoint"));
  assert.ok(first.categories.includes("project_local_definition"));
});

test("rejects missing source evidence instead of inferring a mapping", async () => {
  const inventory = JSON.parse(await readFile(inventoryPath, "utf8"));
  const changed = structuredClone(inventory);
  changed.rows[0].sources[0].symbols.push("missing-architecture-owner-symbol");

  await assert.rejects(
    validateArchitectureInventory({ repoRoot, inventory: changed }),
    /missing required symbol missing-architecture-owner-symbol/u,
  );
});

test("requires unknown custom semantics to remain explicit blockers", async () => {
  const inventory = JSON.parse(await readFile(inventoryPath, "utf8"));
  const changed = { ...inventory, unknown_custom_semantics: "nearest_match" };

  await assert.rejects(
    validateArchitectureInventory({ repoRoot, inventory: changed }),
    /must remain explicit blockers/u,
  );
});
