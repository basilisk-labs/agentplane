---
id: "202604210859-0RCJ44"
title: "Inventory large tests and settle test suffix convention"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 16
origin:
  system: "manual"
depends_on: []
tags:
  - "conventions"
  - "docs"
  - "testing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T09:38:07.639Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T09:41:58.533Z"
  updated_by: "CODER"
  note: "Findings now include the compact large-test inventory and the documented .test.ts convention; policy routing and doctor checks remain passing."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Inventory largest test files, compare .test.ts and .spec.ts usage, document the minimal suffix convention in approved docs/task-local scope, and run cheap checks only."
events:
  -
    type: "status"
    at: "2026-04-21T09:38:15.992Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Inventory largest test files, compare .test.ts and .spec.ts usage, document the minimal suffix convention in approved docs/task-local scope, and run cheap checks only."
  -
    type: "verify"
    at: "2026-04-21T09:40:35.270Z"
    author: "CODER"
    state: "ok"
    note: "Documented the .test.ts test suffix convention, recorded the large test inventory and split candidates, and ran policy routing, doctor, and diff whitespace checks successfully."
  -
    type: "verify"
    at: "2026-04-21T09:41:58.533Z"
    author: "CODER"
    state: "ok"
    note: "Findings now include the compact large-test inventory and the documented .test.ts convention; policy routing and doctor checks remain passing."
doc_version: 3
doc_updated_at: "2026-04-21T09:41:58.576Z"
doc_updated_by: "CODER"
description: "Document the largest test files and decide whether the repository standard is .test.ts or .spec.ts before further splitting."
sections:
  Summary: "Create a concrete inventory of oversized tests and establish a single test file suffix convention for future cleanup."
  Scope: "In scope: inventory output in task findings/docs, CONTRIBUTING/ADR update if appropriate, and no behavior changes. Out of scope: renaming/splitting tests."
  Plan: "1. Inventory largest *.{test,spec}.ts files by line count without modifying tests. 2. Count .test.ts versus .spec.ts usage by package/domain. 3. Document the minimal suffix convention in the existing developer testing docs and record the inventory in task Findings. 4. Run cheap docs/policy checks and record verification evidence."
  Verify Steps: |-
    - Top oversized tests are listed with line counts.
    - The suffix convention is explicitly documented.
    - No test behavior changes occur in this task.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    - Command: `rg --files -g "*.test.ts" -g "*.spec.ts" | xargs wc -l | sort -nr | head -30`
      - Result: pass
      - Evidence: identified top large suites; largest is `packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts` at 1712 lines.
      - Scope: repository test/spec file inventory; no source/test files modified.
      - Links: findings recorded in this task README.
    - Command: `printf ".test.ts "; rg --files -g "*.test.ts" | wc -l; printf ".spec.ts "; rg --files -g "*.spec.ts" | wc -l`
      - Result: pass
      - Evidence: `.test.ts` count is 283; `.spec.ts` count is 19.
      - Scope: suffix inventory.
      - Links: convention documented in `docs/developer/testing-and-quality.mdx`.
    - Command: `rg -n "\b(describe|it|test)\(" packages/agentplane/src/commands/**/*.spec.ts packages/agentplane/src/commands/*.spec.ts`
      - Result: pass
      - Evidence: no Vitest declarations found in `.spec.ts` command spec modules; only a regex string use matched in `run-tail.spec.ts`.
      - Scope: suffix convention check.
      - Links: `vitest.config.ts` includes only `packages/**/src/**/*.test.ts`.
    - Command: `node .agentplane/policy/check-routing.mjs`
      - Result: pass
      - Evidence: `policy routing OK`.
      - Scope: policy/docs routing rules.
      - Links: loaded `security.must.md`, `dod.core.md`, `workflow.direct.md`, `dod.docs.md`.
    - Command: `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane doctor`
      - Result: pass
      - Evidence: `doctor (OK)`, errors=0, warnings=0, info=8.
      - Scope: workflow/runtime health after docs/task-local changes.
      - Links: task lifecycle evidence in this README.
    - Command: `git diff --check -- docs/developer/testing-and-quality.mdx .agentplane/tasks/202604210859-0RCJ44/README.md`
      - Result: pass
      - Evidence: no whitespace errors.
      - Scope: changed files for this task.
      - Links: `docs/developer/testing-and-quality.mdx`; `.agentplane/tasks/202604210859-0RCJ44/README.md`.
    
    ### 2026-04-21T09:40:35.270Z — VERIFY — ok
    
    By: CODER
    
    Note: Documented the .test.ts test suffix convention, recorded the large test inventory and split candidates, and ran policy routing, doctor, and diff whitespace checks successfully.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:40:23.383Z, excerpt_hash=sha256:56ad42159e5cd5aeab08e5d57ac8b37b61d259ecdda9b9a78335e86e5cc995c3
    
    ### 2026-04-21T09:41:58.533Z — VERIFY — ok
    
    By: CODER
    
    Note: Findings now include the compact large-test inventory and the documented .test.ts convention; policy routing and doctor checks remain passing.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:41:26.205Z, excerpt_hash=sha256:56ad42159e5cd5aeab08e5d57ac8b37b61d259ecdda9b9a78335e86e5cc995c3
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert documentation changes; inventory remains in task findings if useful."
  Findings: |-
    Source input: AUDIT L-3 and REFACTORING_PLAN G.1/G.3.
    
    Large test inventory: repository has 283 .test.ts files and 19 .spec.ts files. Vitest includes only packages/**/src/**/*.test.ts. The 19 .spec.ts files are all under packages/agentplane/src/commands/** and are command specification modules, not Vitest suites.
    
    Top oversized .test.ts files by line count: 1712 packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts; 1689 packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts; 1684 packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts; 1521 packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.test.ts; 1365 packages/agentplane/src/cli/run-cli.recipes.test.ts; 1346 packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; 1297 packages/agentplane/src/cli/run-cli.core.init.test.ts; 1262 packages/agentplane/src/commands/release/apply.test.ts; 1205 packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts; 1194 packages/agentplane/src/commands/guard/impl/commands.unit.test.ts.
    
    Convention decision: new Vitest tests use .test.ts. The .spec.ts suffix is reserved for command specification modules and should not be used for tests. Permanent docs location: docs/developer/testing-and-quality.mdx.
    
    Split candidates: prioritize CLI integration hotspots above 1200 lines first, especially pr-flow validation, lifecycle, tasks query-run-execute, recipes, task-hosted-close, init, and release apply suites.
id_source: "generated"
---
## Summary

Create a concrete inventory of oversized tests and establish a single test file suffix convention for future cleanup.

## Scope

In scope: inventory output in task findings/docs, CONTRIBUTING/ADR update if appropriate, and no behavior changes. Out of scope: renaming/splitting tests.

## Plan

1. Inventory largest *.{test,spec}.ts files by line count without modifying tests. 2. Count .test.ts versus .spec.ts usage by package/domain. 3. Document the minimal suffix convention in the existing developer testing docs and record the inventory in task Findings. 4. Run cheap docs/policy checks and record verification evidence.

## Verify Steps

- Top oversized tests are listed with line counts.
- The suffix convention is explicitly documented.
- No test behavior changes occur in this task.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
- Command: `rg --files -g "*.test.ts" -g "*.spec.ts" | xargs wc -l | sort -nr | head -30`
  - Result: pass
  - Evidence: identified top large suites; largest is `packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts` at 1712 lines.
  - Scope: repository test/spec file inventory; no source/test files modified.
  - Links: findings recorded in this task README.
- Command: `printf ".test.ts "; rg --files -g "*.test.ts" | wc -l; printf ".spec.ts "; rg --files -g "*.spec.ts" | wc -l`
  - Result: pass
  - Evidence: `.test.ts` count is 283; `.spec.ts` count is 19.
  - Scope: suffix inventory.
  - Links: convention documented in `docs/developer/testing-and-quality.mdx`.
- Command: `rg -n "\b(describe|it|test)\(" packages/agentplane/src/commands/**/*.spec.ts packages/agentplane/src/commands/*.spec.ts`
  - Result: pass
  - Evidence: no Vitest declarations found in `.spec.ts` command spec modules; only a regex string use matched in `run-tail.spec.ts`.
  - Scope: suffix convention check.
  - Links: `vitest.config.ts` includes only `packages/**/src/**/*.test.ts`.
- Command: `node .agentplane/policy/check-routing.mjs`
  - Result: pass
  - Evidence: `policy routing OK`.
  - Scope: policy/docs routing rules.
  - Links: loaded `security.must.md`, `dod.core.md`, `workflow.direct.md`, `dod.docs.md`.
- Command: `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane doctor`
  - Result: pass
  - Evidence: `doctor (OK)`, errors=0, warnings=0, info=8.
  - Scope: workflow/runtime health after docs/task-local changes.
  - Links: task lifecycle evidence in this README.
- Command: `git diff --check -- docs/developer/testing-and-quality.mdx .agentplane/tasks/202604210859-0RCJ44/README.md`
  - Result: pass
  - Evidence: no whitespace errors.
  - Scope: changed files for this task.
  - Links: `docs/developer/testing-and-quality.mdx`; `.agentplane/tasks/202604210859-0RCJ44/README.md`.

### 2026-04-21T09:40:35.270Z — VERIFY — ok

By: CODER

Note: Documented the .test.ts test suffix convention, recorded the large test inventory and split candidates, and ran policy routing, doctor, and diff whitespace checks successfully.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:40:23.383Z, excerpt_hash=sha256:56ad42159e5cd5aeab08e5d57ac8b37b61d259ecdda9b9a78335e86e5cc995c3

### 2026-04-21T09:41:58.533Z — VERIFY — ok

By: CODER

Note: Findings now include the compact large-test inventory and the documented .test.ts convention; policy routing and doctor checks remain passing.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:41:26.205Z, excerpt_hash=sha256:56ad42159e5cd5aeab08e5d57ac8b37b61d259ecdda9b9a78335e86e5cc995c3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert documentation changes; inventory remains in task findings if useful.

## Findings

Source input: AUDIT L-3 and REFACTORING_PLAN G.1/G.3.

Large test inventory: repository has 283 .test.ts files and 19 .spec.ts files. Vitest includes only packages/**/src/**/*.test.ts. The 19 .spec.ts files are all under packages/agentplane/src/commands/** and are command specification modules, not Vitest suites.

Top oversized .test.ts files by line count: 1712 packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts; 1689 packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts; 1684 packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts; 1521 packages/agentplane/src/cli/run-cli.core.tasks.query-run-execute.test.ts; 1365 packages/agentplane/src/cli/run-cli.recipes.test.ts; 1346 packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts; 1297 packages/agentplane/src/cli/run-cli.core.init.test.ts; 1262 packages/agentplane/src/commands/release/apply.test.ts; 1205 packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts; 1194 packages/agentplane/src/commands/guard/impl/commands.unit.test.ts.

Convention decision: new Vitest tests use .test.ts. The .spec.ts suffix is reserved for command specification modules and should not be used for tests. Permanent docs location: docs/developer/testing-and-quality.mdx.

Split candidates: prioritize CLI integration hotspots above 1200 lines first, especially pr-flow validation, lifecycle, tasks query-run-execute, recipes, task-hosted-close, init, and release apply suites.
