---
id: "202602081238-XJ2RJJ"
title: "Decompose backends/task-backend.ts"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602081238-E47R1X"
tags:
  - "backend"
  - "code"
  - "refactor"
verify:
  - "bun run test:full"
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T12:57:38.021Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T13:10:15.528Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: decomposed backends/task-backend.ts into task-backend/* modules; bun run typecheck, bun run lint, bun run test:full (704 tests) all pass."
commit:
  hash: "88b20a69e766c001afdfd61ba00891408365db46"
  message: "✨ XJ2RJJ backend: decompose task-backend.ts into modules"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: decompose backends/task-backend.ts into modules while preserving the public API and keeping bun run test:full green."
  -
    author: "ORCHESTRATOR"
    body: "Verified: split backends/task-backend.ts into task-backend/* modules; bun run typecheck, bun run lint, bun run test:full (704 tests) all pass."
doc_version: 2
doc_updated_at: "2026-02-08T13:12:15.017Z"
doc_updated_by: "ORCHESTRATOR"
description: "Split packages/agentplane/src/backends/task-backend.ts into smaller modules (interfaces, local backend, redmine backend, shared validation/IO) with tests."
id_source: "generated"
---
## Summary


## Scope


## Plan

Scope: split packages/agentplane/src/backends/task-backend.ts into a small facade plus modules under packages/agentplane/src/backends/task-backend/. Steps: (1) Extract shared types/helpers/errors/doc metadata into task-backend/shared.ts. (2) Extract LocalBackend into task-backend/local.ts. (3) Extract RedmineBackend into task-backend/redmine.ts. (4) Extract backend config parsing + loadTaskBackend into task-backend/load.ts. (5) Replace task-backend.ts with a facade re-exporting the existing public API. (6) Run bun run typecheck, bun run lint, bun run test:full; fix any behavioral drift or import cycles.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T13:10:15.528Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: decomposed backends/task-backend.ts into task-backend/* modules; bun run typecheck, bun run lint, bun run test:full (704 tests) all pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T12:57:58.359Z, excerpt_hash=sha256:a71b64cbe1d5396f6e7c0063ba0d1992d1fe602b68ef1e5b3ebb0c6400ab92f2

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Commands\n- \n- \n- 
 RUN  v4.0.18 /Users/densmirnov/Github/agentplane

Installed recipe viewer@1.2.3
Run artifacts: .agentplane/recipes/viewer/runs/2026-02-08T12-57-05-825Z-AUDIT_SCENARIO
Installed recipe viewer@1.2.3
Installed recipe viewer@1.2.3
 ✓ packages/agentplane/src/cli/run-cli.recipes.test.ts (25 tests) 996ms
 ✓ packages/agentplane/src/commands/recipes.test.ts (46 tests) 1024ms
 ✓ packages/agentplane/src/cli/run-cli.core.branch-meta.test.ts (26 tests) 1400ms
     ✓ branch base explain prints current, pinned, and effective base  309ms
 ✓ packages/agentplane/src/cli/run-cli.core.tasks.test.ts (51 tests) 1473ms
 ✓ packages/agentplane/src/commands/workflow.test.ts (40 tests) 1686ms
 ✓ packages/agentplane/src/cli/run-cli.core.test.ts (21 tests) 508ms
 ✓ packages/agentplane/src/cli/run-cli.core.guard.test.ts (33 tests) 1959ms
 ✓ packages/agentplane/src/cli/run-cli.scenario.test.ts (7 tests) 452ms
 ✓ packages/agentplane/src/cli/cli-smoke.test.ts (1 test) 588ms
     ✓ runs init, task, finish, recipe, and work start flow  587ms
 ✓ packages/agentplane/src/backends/task-backend.test.ts (65 tests) 318ms
 ✓ packages/core/src/git/base-branch.test.ts (13 tests) 645ms
 ✓ packages/agentplane/src/cli/run-cli.core.misc.test.ts (11 tests) 369ms
 ✓ packages/agentplane/src/cli/run-cli.core.hooks.test.ts (26 tests) 1470ms
✅ migrated task docs (changed=1)
✅ migrated task docs (changed=0)
✅ migrated task docs (changed=1)
✅ migrated task docs (changed=1)
 ✓ packages/core/src/git/git-utils.test.ts (7 tests) 527ms
 ✓ packages/agentplane/src/commands/task/migrate-doc.test.ts (3 tests) 158ms
 ✓ packages/core/src/tasks/task-store.test.ts (13 tests) 132ms
 ✓ packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts (1 test) 74ms
 ✓ packages/agentplane/src/commands/shared/task-backend.test.ts (2 tests) 98ms
 ✓ packages/core/src/tasks/tasks-lint.test.ts (5 tests) 46ms
 ✓ packages/agentplane/src/cli/legacy-cli-regressions.test.ts (1 test) 44ms
 ✓ packages/core/src/commit/commit-policy.test.ts (9 tests) 85ms
 ✓ packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts (45 tests) 3214ms
 ✓ packages/agentplane/src/commands/shared/task-store.test.ts (2 tests) 61ms
 ✓ packages/agentplane/src/cli/update-check.test.ts (9 tests) 13ms
 ✓ packages/agentplane/src/cli/checksum.test.ts (3 tests) 9ms
 ✓ packages/core/src/tasks/tasks-export.test.ts (4 tests) 47ms
 ✓ packages/agentplane/src/shared/write-if-changed.test.ts (2 tests) 39ms
 ✓ packages/core/src/config/config.test.ts (13 tests) 15ms
 ✓ packages/agentplane/src/agents/agents-template.test.ts (7 tests) 23ms
 ✓ packages/agentplane/src/cli/fs-utils.test.ts (2 tests) 13ms
 ✓ packages/core/src/project/project-root.test.ts (5 tests) 13ms
 ✓ packages/core/src/tasks/task-readme.test.ts (7 tests) 25ms
 ✓ packages/agentplane/src/commands/shared/git-context.test.ts (2 tests) 10ms
 ✓ packages/core/src/tasks/task-readme-io.test.ts (1 test) 32ms
 ✓ packages/core/src/fs/atomic-write.test.ts (2 tests) 43ms
 ✓ packages/agentplane/src/cli/http.test.ts (6 tests) 10ms
 ✓ packages/agentplane/src/shared/comment-format.test.ts (16 tests) 7ms
 ✓ packages/agentplane/src/cli2/help-render.test.ts (2 tests) 2ms
 ✓ packages/agentplane/src/policy/evaluate.test.ts (5 tests) 3ms
 ✓ packages/agentplane/src/cli/archive.test.ts (2 tests) 6ms
 ✓ packages/agentplane/src/commands/backend.test.ts (2 tests) 4ms
 ✓ packages/agentplane/src/cli/run-cli.core.help-snap.test.ts (4 tests) 15ms
 ✓ packages/agentplane/src/cli/command-guide.test.ts (4 tests) 2ms
 ✓ packages/agentplane/src/cli/output.test.ts (4 tests) 4ms
 ✓ packages/agentplane/src/cli2/parse.test.ts (6 tests) 3ms
 ✓ packages/agentplane/src/shared/errors.test.ts (1 test) 1ms
 ✓ packages/agentplane/src/cli/run-cli.core.help-contract.test.ts (1 test) 8ms
 ✓ packages/agentplane/src/cli2/suggest.test.ts (2 tests) 3ms
 ✓ packages/agentplane/src/cli/error-map.test.ts (4 tests) 3ms
 ✓ packages/agentplane/src/commands/shared/network-approval.test.ts (3 tests) 6ms
 ✓ packages/agentplane/src/shared/git-log.test.ts (2 tests) 2ms
 ✓ packages/agentplane/src/commands/task/shared.verify-steps.test.ts (4 tests) 1ms
 ✓ packages/agentplane/src/commands/upgrade.spec-parse.test.ts (5 tests) 4ms
 ✓ packages/agentplane/src/cli/cli-contract.test.ts (1 test) 1ms
 ✓ packages/recipes/src/index.test.ts (1 test) 1ms
 ✓ packages/agentplane/src/commands/guard/index.test.ts (1 test) 2ms
 ✓ packages/agentplane/src/cli/prompts.test.ts (6 tests) 2ms
 ✓ packages/testkit/src/index.test.ts (1 test) 1ms
 ✓ packages/agentplane/src/cli/recipes-bundled.test.ts (7 tests) 2ms
 ✓ packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts (43 tests) 4324ms
     ✓ init prompts for interactive defaults  307ms
 ✓ packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts (61 tests) 7729ms
     ✓ integrate merges branch and marks task done  703ms
     ✓ integrate uses a compliant fallback commit subject when branch subject is invalid (squash)  678ms
     ✓ integrate supports dry-run  636ms
     ✓ integrate supports merge strategy  684ms
     ✓ integrate supports rebase strategy  371ms
     ✓ integrate rebase fails when base changes during verify  357ms
     ✓ integrate fails when post-merge hook removes pr dir  803ms
     ✓ integrate runs verify when requested  344ms

 Test Files  61 passed (61)
      Tests  704 passed (704)
   Start at  19:57:04
   Duration  8.49s (transform 3.80s, setup 0ms, import 11.00s, tests 29.75s, environment 4ms)\n\n### Pass criteria\n- packages/agentplane/src/backends/task-backend.ts becomes a facade; implementation moved to packages/agentplane/src/backends/task-backend/*.ts.\n- All existing imports of ../backends/task-backend.js continue to work (same exported names).\n- Full test suite passes and no legacy patterns are introduced.
