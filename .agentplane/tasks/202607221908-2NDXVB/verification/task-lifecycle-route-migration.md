# Task, lifecycle, and route capability migration

## Scope implemented

- Replaced the legacy `CommandNeeds` adapter for the task read, task write, lifecycle, and route command families with explicit `CommandSession` profiles.
- Kept runner/Hermes, hosted-close/provider operations, normalization sync, and Obsidian commands on their owning downstream slices.
- Added separate local and remote route context resolvers for `task status`, `task brief`, and `task next-action`; provider preparation now occurs only when `--remote` is selected.
- Replaced `task begin` stdout interception with the typed `setTaskPlan()` use-case result. The standalone `task plan set` renderer preserves its existing stdout contract.
- Added catalog, undeclared-capability denial, local-route laziness, and guided lifecycle coverage.

## Verification

- `bun run typecheck`: passed.
- `bun run format:check`: passed.
- `bun run lint:core`: passed.
- `bun run arch:check`: passed; dependency-cruiser used `typescript@6.0.3` and reported zero violations.
- `bun run knip:check`: passed at the existing 545-entry baseline.
- `bun run guards:check`: passed, including the trust-boundary ratchet.
- `bun run lifecycle:invariants`: passed, 8 invariants.
- `bun run test:critical`: passed, 12/12 chunks.
- Focused catalog/session/route/workflow/mutation matrix: passed, 91 tests.
- Focused `task begin` direct and branch_pr fixtures: passed, 2 tests.
- Focused plan/catalog/session suite under Vitest: passed, 28 tests.
- `bun run test:fast`: 510/511 files and 3577/3579 tests passed; two cases in `task-run-lifecycle-replay-security.test.ts` exceeded the shared 30-second timeout under full-suite load.
- Isolated replay-security rerun on this task branch: passed, 10/10 tests.
- Isolated replay-security control rerun on clean `main` at `68b71790527489b13f868deede5a8de4552117cb`: passed, 10/10 tests with the same approximately 44-second aggregate test runtime.

## Baseline classification

`run-cli.core.task-guided.test.ts` case `task complete records verification and finishes a direct task` fails before the changed completion path because its temporary repository omits `.agentplane/policy/dod.code.md`, which the evaluator now freezes as required policy evidence. The same case reproduces on clean `main` at `68b71790527489b13f868deede5a8de4552117cb`; it is not introduced by this task. The changed `task begin` direct and branch_pr cases pass independently.

The two `test:fast` replay-security failures were timeout-only under concurrent full-suite load. Both the task branch and clean `main` pass the entire file in isolation, so they are classified as suite-load flakiness rather than a behavioral regression in this slice.

## Residual boundary

Granular requirements now deny undeclared session access before command-context preparation and keep remote provider resolution lazy. The shared `CommandContext` remains the compatibility value behind declared context capabilities until all five vertical slices converge and the RF-24 fan-in task removes the coarse compatibility layer.
