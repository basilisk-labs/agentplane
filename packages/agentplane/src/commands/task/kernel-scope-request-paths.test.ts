import { mkdtemp, mkdir, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, expect, it } from "vitest";
import { validateScopeRequestPaths } from "./kernel-scope-request.js";

const roots: string[] = [];
afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});
async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "scope-request-paths-"));
  roots.push(root);
  await mkdir(path.join(root, "scripts"));
  return root;
}
it("rejects configured policy roots even when requested through an ancestor", async () => {
  const root = await fixture();
  await expect(
    validateScopeRequestPaths(root, ["scripts"], ["scripts/native-state"]),
  ).rejects.toThrow("intersects protected");
});
it("rejects nested policy files", async () => {
  const root = await fixture();
  await writeFile(path.join(root, "scripts", "AGENTS.md"), "protected");
  await expect(validateScopeRequestPaths(root, ["scripts"], [])).rejects.toThrow(
    "contains protected",
  );
});
it("rejects symlink roots, ancestors and nested symlinks", async () => {
  const root = await fixture();
  await mkdir(path.join(root, "target"));
  await symlink(path.join(root, "target"), path.join(root, "scripts", "alias"), "junction");
  for (const selected of ["scripts", "scripts/alias", "scripts/alias/file.ts"])
    await expect(validateScopeRequestPaths(root, [selected], [])).rejects.toThrow("symbolic link");
});
it("permits a bounded ordinary directory and prospective missing file", async () => {
  const root = await fixture();
  await writeFile(path.join(root, "scripts", "check.ts"), "export {};\n");
  await expect(
    validateScopeRequestPaths(root, ["scripts", "new.test.ts"], [".agentplane"]),
  ).resolves.toBeUndefined();
});
