---
id: "202602081820-F7KYCD"
title: "CLI refactor: registry/help/jsonErrors"
result_summary: "Complete CLI refactor wave 1"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602081822-Q1RST6"
tags:
  - "epic"
  - "cli"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T18:21:44.991Z"
  updated_by: "ORCHESTRATOR"
  note: "OK: proceed with tasks 1–9 sequentially; keep changes atomic and verified."
verification:
  state: "ok"
  updated_at: "2026-02-08T19:12:48.393Z"
  updated_by: "TESTER"
  note: "Downstream tasks 1–9 completed; see per-task verification logs."
commit:
  hash: "faa70f67263af4480f942d43e367ae3b66608df4"
  message: "✅ Q1RST6 close: Metadata-driven bootstrapping (202602081822-Q1RST6) [cli,code,refactor]"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Verified: Completed tasks 1–9: jsonErrors prescan; registry/catalog dedup; duplicate-id guard; command catalog; split registry modules; pilot spec/handler split; lazy handler imports; removed help-fast registry; metadata-driven bootstrapping. Each task has its own verify log and commits."
events:
  -
    type: "verify"
    at: "2026-02-08T19:12:48.393Z"
    author: "TESTER"
    state: "ok"
    note: "Downstream tasks 1–9 completed; see per-task verification logs."
  -
    type: "status"
    at: "2026-02-08T19:12:48.540Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: Completed tasks 1–9: jsonErrors prescan; registry/catalog dedup; duplicate-id guard; command catalog; split registry modules; pilot spec/handler split; lazy handler imports; removed help-fast registry; metadata-driven bootstrapping. Each task has its own verify log and commits."
doc_version: 2
doc_updated_at: "2026-02-08T19:12:48.540Z"
doc_updated_by: "ORCHESTRATOR"
description: "Tracking epic for CLI improvements: jsonErrors prescan, registry/catalog split, lazy handlers, and metadata-driven bootstrapping (tasks 1–9)."
id_source: "generated"
---
## Summary

Tracking epic for refactoring CLI startup/routing: fix jsonErrors prescan, dedupe registries, introduce command catalog, and move toward lazy handler loading.

## Scope

In scope: packages/agentplane/src/cli/** and minimal supporting changes under packages/agentplane/src/commands/** for spec/handler splitting and lazy loading. Out of scope (for this epic wave): packages/core typed errors and UX flag renames (handled after tasks 1–9).

## Plan

1) Create downstream tasks 1–9 with strict depends_on ordering.\n2) Execute tasks sequentially: fix jsonErrors prescan; add registry equality test; add duplicate-id guard; introduce command catalog; split registries; pilot spec/handler split; add lazy import; simplify help fast; add metadata-driven bootstrapping.\n3) After each task: run targeted tests (bun run test:cli:core; typecheck; add smoke tests where appropriate).\n4) Finish each task with agentplane commit/finish once verified; keep allowlist tight to touched paths.

## Risks

- Risk: refactor touches CLI routing; regressions possible in argument parsing/help rendering. Mitigation: keep changes atomic; maintain/extend cli core tests and smoke tests.\n- Risk: spec/handler split may inadvertently pull heavy deps back into specs. Mitigation: enforce via imports discipline and unit tests.

## Verification

(Filled as downstream tasks complete; this epic is considered complete when tasks 1–9 are DONE and their verify logs are OK.)

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T19:12:48.393Z — VERIFY — ok

By: TESTER

Note: Downstream tasks 1–9 completed; see per-task verification logs.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T18:21:40.984Z, excerpt_hash=sha256:d1594af291959a2c6fabf4c6d42d14fd1b02cc96c90f42d2c17f07f1cd2650b6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

If a task causes regressions: revert the last commit (agentplane commit history) and re-run bun run test:cli:core + bun run typecheck; if needed, temporarily restore prior registry wiring.

## Context

User-provided analysis identified: (1) jsonErrors not honored when global parse fails; (2) duplicated help/run registry lists; (3) static handler imports defeating fast help; (4) no duplicate-id protection. This epic tracks the ordered implementation tasks (1–9) and their dependencies.

## Verify Steps

- bun run test:cli:core\n- bun run typecheck\nPass criteria: all tests pass; no TypeScript errors.

## Notes

### Approvals / Overrides\n- 2026-02-08: User approved plan/tasks 0–9; no network/outside-repo overrides requested.\n\n### Decomposition\n- Task 1: prescan --json for global parse errors + test\n- Task 2: test guard help registry == run registry\n- Task 3: CommandRegistry.register duplicate id guard + test\n- Task 4: introduce command-catalog.ts as single source of truth\n- Task 5: split registry into help/run modules to avoid static imports\n- Task 6: pilot spec/handler split (commit, task new)\n- Task 7: lazy handler loading via import()\n- Task 8: remove/simplify help-fast registry\n- Task 9: metadata-driven bootstrapping (needsProject/needsConfig/needsTaskContext)
