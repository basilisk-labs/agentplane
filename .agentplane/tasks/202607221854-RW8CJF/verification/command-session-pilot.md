# CommandSession Pilot Verification

Verified implementation SHA: `33e59899d5cd381f089b96746fb715fa5c84a6a2`.

## 1. Typed capability boundary and lazy resolution

Command: `bunx vitest run packages/agentplane/src/cli/run-cli/command-catalog/kernel.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli.command-session.test.ts`

Result: pass (3 files, 13 tests).

Evidence: the session tests cover compile-time capability narrowing, typed `E_INTERNAL` denial before an undeclared resolver runs, lazy node reuse, explicit legacy compatibility, and preparation trace visibility. The CLI integration test proves that `docs cli` resolves only the `output` node.

Scope: Verify steps 1-4; `CommandSession`, the command catalog, the registry bridge, and representative simple/read/task/route/provider commands.

The trace integration case lives in a dedicated test file so the existing oversized `run-cli.core.test.ts` baseline does not grow.

## 2. Architecture and trust boundaries

Command: `bun run arch:check && bun run guards:check`

Result: pass.

Evidence: dependency-cruiser reported zero violations for every package and command slice; shared guards passed; the trust-boundary ratchet retained its single reviewed baseline exception.

Scope: Verify step 5; dependency direction, shared guard contracts, and trust-boundary invariants.

## 3. Critical CLI compatibility

Command: `bun run test:critical`

Result: pass (12 of 12 chunks).

Evidence: all critical CLI suites passed, including efficiency baseline/candidate/replay, exit-code, Git edge, protected-path, scope-leak, symlink-root, and trust-boundary regression suites.

Scope: Verify steps 2, 3, and 5; user-visible CLI compatibility and safety behavior.

## 4. Type and bundle integrity

Command: `bun run typecheck && bun run build`

Result: pass.

Evidence: the repository TypeScript build completed without diagnostics; core, recipes, and agentplane bundles built successfully, including the 3.01 MB CLI bundle.

Scope: Verify steps 1 and 5; compile-time session subsets, public package boundaries, and production bundle generation.

## 5. Dead-code and export surface

Command: `bun run knip:check`

Result: pass.

Evidence: the unused-code baseline remains unchanged at 545 entries (`files=1`, `exports=178`, `types=366`). Session types are exported only from the modules that consume them; no unused public re-export debt was added.

Scope: Verify step 5; public type surface and dead-code ratchet.

## Residual boundary

Granular capabilities currently coalesce onto the existing monolithic `CommandContext` preparation node. This pilot makes requirements explicit, typed, lazy, and traceable without claiming field-level runtime isolation. Downstream vertical-slice tasks will split the underlying context resolvers while the explicit legacy adapter preserves compatibility.
