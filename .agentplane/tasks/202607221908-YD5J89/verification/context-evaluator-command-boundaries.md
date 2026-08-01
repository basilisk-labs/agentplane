# Context and evaluator command-boundary verification

## Result

- Context commands now declare no-context, project-only, or task-write capability profiles instead of the legacy shared command-context boundary.
- Evaluator commands declare read, write, or provider-execute profiles. `evaluator run --no-record` resolves `task.read`; recording resolves `task.write`.
- Context search, show, ingest, reindex, wiki, graph, and doctor operations expose typed in-process results. CLI rendering remains at compatibility-handler edges.
- `context supervise-task` invokes the typed evaluator use case with the same prepared `CommandContext`; no subprocess or stdout capture is used for orchestration.
- `context learn files`, `learn changes`, `learn tasks`, and `harvest tasks` reuse the session-owned `CommandContext` instead of loading it a second time.
- Existing human and JSON output contracts remain unchanged; existing schema versions and durable evaluator/context artifacts were preserved.

## Capability evidence

- Read-only context profiles reject `task.write`.
- Evaluator read/write profiles reject undeclared provider execution.
- Provider execution is available only to `evaluator execute`.
- Context mutation profiles do not include provider access.

## Verification commands

- Focused context/evaluator/catalog suite: 12 files, 97 tests passed.
- Doctor/wiki compatibility suite: 4 files, 20 tests passed.
- Critical CLI suite: 12 of 12 chunks passed, 77 tests total.
- `bun run format:check`: passed.
- `bun run schemas:check`: passed.
- `bun run guards:check`: passed.
- `bun run typecheck`: passed with the TypeScript 7 default compiler.
- `bun run arch:check`: passed with zero dependency violations.
- `bun run knip:check`: passed against the reviewed baseline.
- Targeted ESLint for all changed implementation/test files: passed.
- `git diff --check`: passed.
- Static subprocess/stdout orchestration search over migrated supervisor/evaluator paths: no matches.

## Residual boundary

Capability resolution still materializes the shared `CommandContext` behind granular session capabilities. This slice removes broad declaration and duplicate loading, but per-capability physical context objects remain a later infrastructure concern rather than a compatibility change for 0.7.
