# Project, config, help, and docs migration verification

## Scope implemented

- Added reusable minimal capability profiles for no-context, project-only, project-plus-config, and output-only command sessions.
- Migrated runtime, platform, agents, config, mode, profile, IDE sync, and docs CLI entries away from legacy `needs` metadata in this vertical slice.
- Kept fast help outside `CommandSession` preparation.
- Split config, runtime explain, help, and docs CLI semantics into typed results followed by compatibility renderers.
- Removed direct stdout use from docs CLI generation.

## Capability evidence

- `runtime`, platform group/list/explain/doctor: no context.
- agents, IDE sync, platform sync: project only.
- config show/set, mode get/set, profile set, runtime explain: project and config only.
- docs CLI generation: output only.
- Kernel denial tests prove project/config sessions cannot access task or provider capabilities.
- Runtime explain remains successful outside a configured project and reports an `unconfigured` repository expectation without preparing command context or provider capabilities.

## Verification results

- Focused project/config/help/docs and CLI-core tests: 100 passing in the final focused runs, including 5 command-session regressions.
- `bun run docs:cli:check`: passed; generated CLI documentation has no drift.
- `bun run guards:check`: passed.
- `bun run test:critical`: passed, 12 of 12 chunks.
- `bun run typecheck`: passed with the TypeScript 7 default compiler.
- `bun run format:check`: passed.
- `bun run lint:core`: passed.
- `bun run arch:check`: passed; no dependency violations.
- `bun run knip:check`: passed with the existing 545-item baseline.
- `git diff --check`: passed.

## Baseline classification

The help registry snapshot was stale on clean `main` at `0dca3d627916e8c36ecf46bcbbb523a3b0013317`: its integration queue, context, and evaluator descriptions no longer matched the current command catalog. This task owns the help/docs surface, so the snapshot was updated to the existing catalog output without changing those unrelated command implementations.

## Residual risk

Capabilities outside project/config/output still resolve through the shared `CommandContext`. Migrating those families is intentionally deferred to their dedicated vertical slices.
