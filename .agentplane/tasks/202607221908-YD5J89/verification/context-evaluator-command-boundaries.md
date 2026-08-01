# Context and evaluator command-boundary verification

## Result

- Context commands now declare no-context, project-only, or task-write capability profiles instead of the legacy shared command-context boundary.
- Evaluator commands declare read, write, or provider-execute profiles. `evaluator run --no-record` resolves `task.read`; recording resolves `task.write`.
- Context search, show, ingest, reindex, wiki, graph, and doctor operations expose typed in-process results. CLI rendering remains at compatibility-handler edges.
- `context supervise-task` invokes the typed evaluator use case with the same prepared `CommandContext`; no subprocess or stdout capture is used for orchestration.
- `context learn files`, `learn changes`, `learn tasks`, and `harvest tasks` reuse the session-owned `CommandContext` instead of loading it a second time.
- `context verify-task` resolves a read-only task session once; `context finalize-task` resolves a task-write session once and passes that context through final verification.
- Existing human and JSON output contracts remain unchanged; existing schema versions and durable evaluator/context artifacts were preserved.

## Capability evidence

- Read-only context profiles reject `task.write`.
- Evaluator read/write profiles reject undeclared provider execution.
- Provider execution is available only to `evaluator execute`.
- Context mutation profiles do not include provider access.

## Verification commands

- Focused context/evaluator/catalog suite: 12 files, 98 tests passed.
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

## Semantic review rework

The first EVALUATOR review found that `context verify-task` and `context finalize-task` were still declared project-only while loading task context internally. The rework added explicit task-read/task-write profiles, injected the session-owned context into both handlers, and added regression coverage for single context resolution.

## Hosted CI rework

The first hosted run exposed two sequential repository gates that the focused verification had not reached:

- `scripts/README.md` was stale because the already-merged TypeScript 7 toolchain check was absent from the generated script inventory. Regenerating the inventory restored source/document parity.
- `evaluator.command.ts` exceeded the 600-line runtime-module limit. Catalog discovery and list/show rendering were extracted into `evaluator-catalog.command.ts`; the compatibility exports remain unchanged and the original command module is now 516 lines.

Rework verification:

- Focused evaluator/catalog suite: 3 files, 39 tests passed.
- `bun run typecheck`: passed with the TypeScript 7 default compiler.
- `bun run hotspots:check`: passed.
- `bun run docs:scripts:check`: passed.
- `bun run ci:local:fast`: passed, including 512 unit-test files / 3589 tests and all 12 critical CLI chunks.

## Evaluator run authority rework

The follow-up EVALUATOR review found that `evaluator run --no-record` selected a read dependency only after entering a write-capable session. The command catalog now resolves a conditional session plan from parsed arguments before handler loading:

- `record=false` creates `EVALUATOR_READ_REQUIREMENTS` and denies `backend.write`, `task.write`, `git.mutate`, and `approvals` before context preparation.
- `record=true` creates `EVALUATOR_WRITE_REQUIREMENTS`.
- The evaluator handler receives exactly one context dependency; it no longer chooses between read/write callbacks inside the authority boundary.

Authority rework verification:

- Catalog/kernel/evaluator/registry suite: 4 files, 40 tests passed.
- Command-session regression suite: 1 file, 5 tests passed.
- `bun run typecheck`: passed with the TypeScript 7 default compiler.
- `bun run guards:check`: passed.
- `bun run arch:check`: passed with zero dependency violations.
- `bun run lint:core`: passed.
- `bun run hotspots:check`: passed.
- `bun run docs:scripts:check`: passed.
- `bun run test:critical`: 12 of 12 chunks passed, 77 tests total.

## Evaluator artifact authority rework

The next EVALUATOR review found that preparation still writes a durable evidence packet, so the no-record path could not truthfully remain read-only. The command kernel now models that side effect explicitly:

- `evaluator.artifacts.write` authorizes only evaluator evidence-packet preparation.
- `evaluator prepare` and `evaluator run --no-record` use `EVALUATOR_PREPARE_REQUIREMENTS` and do not receive `task.write`, `git.mutate`, or approval authority.
- Recording paths use `EVALUATOR_WRITE_REQUIREMENTS`, which composes artifact preparation with task-state mutation authority.
- Provider execution composes artifact preparation, task-state mutation, and provider authority.
- A real registry-dispatched no-record regression test proves that evidence files are created while the task README remains byte-for-byte unchanged and no `task.write` capability is resolved.

Artifact-authority rework verification:

- Catalog/kernel/evaluator/registry suite: 4 files, 41 tests passed.
- `bun run typecheck`: passed with the TypeScript 7 default compiler.
- Targeted ESLint for all changed implementation/test files: passed.
- `bun run guards:check`: passed.
- `bun run arch:check`: passed with zero dependency violations.
- `bun run hotspots:check`: passed.
- `bun run test:critical`: 12 of 12 chunks passed, 77 tests total.
- `git diff --check`: passed.
