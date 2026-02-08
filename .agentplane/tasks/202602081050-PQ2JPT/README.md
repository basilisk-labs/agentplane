---
id: "202602081050-PQ2JPT"
title: "CLI2-FULL: Full spec-only CLI and monolith decomposition"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602081051-BAY4H5"
  - "202602081051-D35M4C"
  - "202602081051-G8M5DW"
  - "202602081051-X7B54P"
  - "202602081051-QSHZVZ"
  - "202602081051-0B7J4E"
  - "202602081051-4W84S1"
  - "202602081051-C1R7DS"
tags:
  - "cli"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T10:51:32.474Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T12:23:31.517Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: CLI2 spec-driven routing is the single command source of truth; run-cli.ts is decomposed via cli/run-cli/commands/*; repo has regression test packages/agentplane/src/cli/legacy-cli-regressions.test.ts to prevent legacy patterns; typecheck+lint+test:fast+test:cli:core green; rg assertions for parse*Flags and exported *_USAGE are clean."
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: close out CLI2 full-migration tracking task by linking dependent tasks, re-verifying repo invariants (spec-only parsing, no exported usage constants), and recording verification and finish metadata."
events: []
doc_version: 2
doc_updated_at: "2026-02-08T12:23:31.518Z"
doc_updated_by: "ORCHESTRATOR"
description: "Remove all legacy argv parsing, delete usage constants, and decompose remaining monolithic CLI/command modules so spec is the only CLI source of truth."
id_source: "generated"
---
## Summary


## Scope

- Remove all remaining legacy argv parsing in `packages/agentplane/src/commands/**`.
- Decompose remaining monolithic modules that still couple parsing/usage/dispatch.
- Add automated enforcement tests to prevent regressions.

## Plan

Execute the dependent tasks in order (CLI2-FULL-010..040). Each task removes remaining legacy argv parsing and/or decomposes monolithic modules, updates tests to use cli2 specs or parsed-only APIs, and adds enforcement checks to prevent regression.

## Steps

1. Eliminate legacy parsing + usage constants for `upgrade`.
2. Eliminate legacy parsing + usage constants for `task new`.
3. Refactor verification recording to parsed-only APIs and delete legacy usage/flag parsing.
4. Decompose `commands/recipes.ts` into per-command impl modules; remove legacy CLI routing/parsers.
5. Decompose `commands/pr/index.ts` into small focused modules.
6. Decompose `commands/branch/index.ts` and `commands/scenario.ts` into small focused modules.
7. Decompose `cli/run-cli.ts` into cohesive submodules without behavior changes.
8. Add enforcement tests that fail on any reintroduced `parse*Flags`, `*_USAGE`, or legacy argv entrypoints.

## Trade-offs

- This breaks internal APIs and requires test rewrites toward `runCli([...])` and parsed-only command APIs.
- We prefer fewer brittle snapshot assertions; tests should assert invariants and structured outputs.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T12:23:31.517Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: CLI2 spec-driven routing is the single command source of truth; run-cli.ts is decomposed via cli/run-cli/commands/*; repo has regression test packages/agentplane/src/cli/legacy-cli-regressions.test.ts to prevent legacy patterns; typecheck+lint+test:fast+test:cli:core green; rg assertions for parse*Flags and exported *_USAGE are clean.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T12:22:54.442Z, excerpt_hash=sha256:fe12a2450d9ddd4492b9aa24b8d3fcd7236c44d214e44b094fab74809f8c3450

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Exit criteria
- All dependent implementation tasks are DONE.
- No legacy CLI argv parsing remains under `packages/agentplane/src/commands/**`.
- No exported `*_USAGE` constants remain under `packages/agentplane/src/commands/**`.

### Commands
- `bun run typecheck`
- `bun run lint`
- `bun run test:cli:core`
- `bun run test:fast`

### Assertions
- `rg -n "parse[A-Za-z0-9]*Flags\(" packages/agentplane/src/commands` returns empty.
- `rg -n "export const [A-Z0-9_]+_USAGE(_EXAMPLE)?\b" packages/agentplane/src/commands` returns empty.
- `packages/agentplane/src/cli/legacy-cli-regressions.test.ts` passes.

### Pass criteria
- All commands succeed.
- The assertions are satisfied.
