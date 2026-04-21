---
id: "202604210859-824XT0"
title: "Split oversized test files by scenario family"
result_summary: "Split oversized test files into scenario-focused test suites."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on:
  - "202604210859-0RCJ44"
tags:
  - "code"
  - "refactor"
  - "testing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T10:51:40.470Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T10:58:52.430Z"
  updated_by: "CODER"
  note: "Split recipes and task-run execution oversized test files by scenario family; affected Vitest selectors and lint checks pass; no production behavior changes in task scope."
commit:
  hash: "d9f5f6b40b60b37310048822f12fc635738ffd0f"
  message: "✅ 824XT0 code: done"
comments:
  -
    author: "CODER"
    body: "Start: split approved oversized test files by scenario family while preserving test behavior."
  -
    author: "CODER"
    body: "Verified: split approved oversized recipe and query-run-execute tests by scenario family; split files are below 600 lines and affected cli-recipes/cli-core tests, lint, diff check, policy routing, and framework bootstrap passed."
events:
  -
    type: "status"
    at: "2026-04-21T10:51:40.904Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split approved oversized test files by scenario family while preserving test behavior."
  -
    type: "verify"
    at: "2026-04-21T10:58:52.430Z"
    author: "CODER"
    state: "ok"
    note: "Split recipes and task-run execution oversized test files by scenario family; affected Vitest selectors and lint checks pass; no production behavior changes in task scope."
  -
    type: "status"
    at: "2026-04-21T11:02:36.668Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: split approved oversized recipe and query-run-execute tests by scenario family; split files are below 600 lines and affected cli-recipes/cli-core tests, lint, diff check, policy routing, and framework bootstrap passed."
doc_version: 3
doc_updated_at: "2026-04-21T11:02:36.669Z"
doc_updated_by: "CODER"
description: "Break selected large test files into smaller scenario-focused files after the suffix convention is settled."
sections:
  Summary: "Split the highest-value oversized test files using describe/scenario boundaries while preserving test semantics and runtime selection."
  Scope: "In scope: top test files from T15, import/testkit updates, and Vitest workspace inclusion. Out of scope: production code changes unless required by test helper extraction."
  Plan: |-
    1. Pick the top files from the approved T15 inventory.
    2. Split by scenario family and keep helper duplication low.
    3. Ensure Vitest workspace globs still include renamed files.
    4. Run affected Vitest projects.
  Verify Steps: |-
    - Selected files fall below the target size threshold or have a documented exception.
    - Affected tests pass.
    - No production behavior changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    - Command: `agentplane task verify-show 202604210859-824XT0`
      - Result: pass
      - Evidence: verification contract requires selected files below target threshold or documented exception, affected tests passing, and no production behavior changes.
      - Scope: task acceptance contract.
    - Command: `wc -l packages/agentplane/src/cli/run-cli.recipes*.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute*.test.ts`
      - Result: pass
      - Evidence: split files are 476, 469, 501, 332, 547, 507, and 298 lines; all selected outputs are below the 600-line hotspot target.
      - Scope: selected oversized test files from the approved inventory.
    - Command: `bunx eslint vitest.workspace.ts packages/agentplane/src/cli/run-cli.recipes.install-project.test.ts packages/agentplane/src/cli/run-cli.recipes.validation-list.test.ts packages/agentplane/src/cli/run-cli.recipes.remote-usage.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.*.test.ts`
      - Result: pass
      - Evidence: no lint errors after removing split-induced unused imports.
      - Scope: new split tests and Vitest inclusion config.
    - Command: `bun run test:project -- cli-recipes`
      - Result: pass
      - Evidence: 3 files passed, 31 tests passed.
      - Scope: recipes split files and `cli-recipes` project inclusion.
    - Command: `bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.codex.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.control.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.history.test.ts`
      - Result: pass
      - Evidence: 4 files passed, 10 tests passed.
      - Scope: task run execution split files under the existing `cli-core` project glob.
    - Command: `git diff --check -- vitest.workspace.ts packages/agentplane/src/cli/run-cli.recipes.install-project.test.ts packages/agentplane/src/cli/run-cli.recipes.remote-usage.test.ts packages/agentplane/src/cli/run-cli.recipes.validation-list.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.codex.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.control.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.history.test.ts`
      - Result: pass
      - Evidence: no whitespace errors.
      - Scope: task-owned file edits.
    - Command: `node .agentplane/policy/check-routing.mjs`
      - Result: pass
      - Evidence: `policy routing OK`.
      - Scope: direct workflow policy routing after task documentation and code/test edits.
    
    ### 2026-04-21T10:58:52.430Z — VERIFY — ok
    
    By: CODER
    
    Note: Split recipes and task-run execution oversized test files by scenario family; affected Vitest selectors and lint checks pass; no production behavior changes in task scope.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T10:58:46.961Z, excerpt_hash=sha256:011ce7c83fbe8d77c82d61b584851281cb4ef85852997b206510d3ee6e7ef95b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore original test files and remove split files for this task only."
  Findings: |-
    Selected inventory files split in this task: `packages/agentplane/src/cli/run-cli.recipes.test.ts` and `packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.test.ts`.
    
    Scenario family split:
    - Recipes: install/project lifecycle, validation/list output, remote index/usage errors.
    - Task run execution: Codex execution outcomes, custom adapter outcomes, control operations, history rendering.
    
    Vitest inclusion: updated `vitest.workspace.ts` recipe selectors from the single old file name to `run-cli.recipes*.test.ts`. `run-cli.core.tasks.query-run-execute.*.test.ts` is already covered by existing `run-cli.core*.test.ts` project globs.
    
    Production behavior: no production code was changed for this task. Current working tree contains unrelated parallel-task changes outside this scope, including hosted-close, Zod/config, lockfile, and other task READMEs; those were not edited for this task and remain unstaged.
    
    Scope guard: did not touch audit input files, hosted-close command pipeline, Zod formatting implementation, ESLint config, or no-misused-promises work.
id_source: "generated"
---
## Summary

Split the highest-value oversized test files using describe/scenario boundaries while preserving test semantics and runtime selection.

## Scope

In scope: top test files from T15, import/testkit updates, and Vitest workspace inclusion. Out of scope: production code changes unless required by test helper extraction.

## Plan

1. Pick the top files from the approved T15 inventory.
2. Split by scenario family and keep helper duplication low.
3. Ensure Vitest workspace globs still include renamed files.
4. Run affected Vitest projects.

## Verify Steps

- Selected files fall below the target size threshold or have a documented exception.
- Affected tests pass.
- No production behavior changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
- Command: `agentplane task verify-show 202604210859-824XT0`
  - Result: pass
  - Evidence: verification contract requires selected files below target threshold or documented exception, affected tests passing, and no production behavior changes.
  - Scope: task acceptance contract.
- Command: `wc -l packages/agentplane/src/cli/run-cli.recipes*.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute*.test.ts`
  - Result: pass
  - Evidence: split files are 476, 469, 501, 332, 547, 507, and 298 lines; all selected outputs are below the 600-line hotspot target.
  - Scope: selected oversized test files from the approved inventory.
- Command: `bunx eslint vitest.workspace.ts packages/agentplane/src/cli/run-cli.recipes.install-project.test.ts packages/agentplane/src/cli/run-cli.recipes.validation-list.test.ts packages/agentplane/src/cli/run-cli.recipes.remote-usage.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.*.test.ts`
  - Result: pass
  - Evidence: no lint errors after removing split-induced unused imports.
  - Scope: new split tests and Vitest inclusion config.
- Command: `bun run test:project -- cli-recipes`
  - Result: pass
  - Evidence: 3 files passed, 31 tests passed.
  - Scope: recipes split files and `cli-recipes` project inclusion.
- Command: `bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.codex.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.control.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.history.test.ts`
  - Result: pass
  - Evidence: 4 files passed, 10 tests passed.
  - Scope: task run execution split files under the existing `cli-core` project glob.
- Command: `git diff --check -- vitest.workspace.ts packages/agentplane/src/cli/run-cli.recipes.install-project.test.ts packages/agentplane/src/cli/run-cli.recipes.remote-usage.test.ts packages/agentplane/src/cli/run-cli.recipes.validation-list.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.codex.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.control.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.history.test.ts`
  - Result: pass
  - Evidence: no whitespace errors.
  - Scope: task-owned file edits.
- Command: `node .agentplane/policy/check-routing.mjs`
  - Result: pass
  - Evidence: `policy routing OK`.
  - Scope: direct workflow policy routing after task documentation and code/test edits.

### 2026-04-21T10:58:52.430Z — VERIFY — ok

By: CODER

Note: Split recipes and task-run execution oversized test files by scenario family; affected Vitest selectors and lint checks pass; no production behavior changes in task scope.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T10:58:46.961Z, excerpt_hash=sha256:011ce7c83fbe8d77c82d61b584851281cb4ef85852997b206510d3ee6e7ef95b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore original test files and remove split files for this task only.

## Findings

Selected inventory files split in this task: `packages/agentplane/src/cli/run-cli.recipes.test.ts` and `packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.test.ts`.

Scenario family split:
- Recipes: install/project lifecycle, validation/list output, remote index/usage errors.
- Task run execution: Codex execution outcomes, custom adapter outcomes, control operations, history rendering.

Vitest inclusion: updated `vitest.workspace.ts` recipe selectors from the single old file name to `run-cli.recipes*.test.ts`. `run-cli.core.tasks.query-run-execute.*.test.ts` is already covered by existing `run-cli.core*.test.ts` project globs.

Production behavior: no production code was changed for this task. Current working tree contains unrelated parallel-task changes outside this scope, including hosted-close, Zod/config, lockfile, and other task READMEs; those were not edited for this task and remain unstaged.

Scope guard: did not touch audit input files, hosted-close command pipeline, Zod formatting implementation, ESLint config, or no-misused-promises work.
