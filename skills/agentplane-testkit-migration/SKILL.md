---
name: agentplane-testkit-migration
description: Use when migrating Agentplane tests to @agentplane/testkit, replacing local test helpers, fixing testkit export/build failures, splitting large CLI/backend suites, or diagnosing missing testkit dist exports in package builds.
---

# Agentplane Testkit Migration

## Use This Skill When

- A task mentions `@agentplane/testkit`, `run-cli.test-helpers`, shared fixtures, Vitest wrappers, or test helper duplication.
- CI/build fails because `packages/agentplane/src/testing/*` cannot import `../../../testkit/dist/*`.
- A large test file is being split into scenario-focused suites.
- Tests use local helper clones that should move behind the canonical testkit surface.

## Source Of Truth

Prefer exported testkit surfaces over deep imports or local helper copies. Before adding a helper, search for an existing one:

```bash
rg -n "tempRepo|mockTaskBackend|mockPrApi|mockConfig|describeWhen|runCliSilent|installRunCliIntegrationHarness" packages/testkit packages/agentplane/src
```

## Migration Steps

1. Identify the test family: CLI PR flow, task lifecycle, release/upgrade, runner, recipes, Redmine/backend, or scripts.
2. Replace local setup with canonical testkit helpers:
   - repository setup: `tempRepo`, git helpers, config writers
   - backend setup: mock task backend helpers
   - GitHub PR setup: mock PR API helpers
   - suite gating: `describeWhenEnvPresent`, `describeWhenNotHook`, `describeCritical`
3. Keep compatibility exports in `packages/agentplane/src/testing/index.ts` only as a bridge. The canonical implementation belongs in `packages/testkit`.
4. If `agentplane build` imports from `../../../testkit/dist/*`, ensure `@agentplane/testkit` is built before `agentplane`.
5. Remove obsolete shims only after `rg` proves no imports remain.

## Build-Safe Export Checklist

When adding or moving a helper:

1. Export it from the package-local module where it is implemented.
2. Export it from the public testkit barrel.
3. Export compatibility aliases only where existing agentplane tests still depend on them.
4. Run both focused tests and package builds.

Common failure:

```text
Module "../testing/index.js" has no exported member ...
Cannot find module "../../../testkit/dist/index.js"
```

Interpretation: the helper was migrated without a complete export chain, or build order skipped testkit.

## Verification

Use focused checks first, then the smallest relevant package build:

```bash
bun run --filter=@agentplane/testkit build
bun run --filter=agentplane build
bunx vitest run <focused-test-files>
```

For known slow PR-flow suites, prefer the recorded single-worker route instead of broad retries.

## Boundaries

- Do not introduce general testing style rules here.
- Do not add helper abstractions without at least two current consumers or an immediate build/export need.
- Do not hide fragile setup in testkit if the setup is task-specific and unlikely to recur.
