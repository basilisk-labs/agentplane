---
id: "202602051316-J8K6A5"
title: "AP-051: Unify task id generation"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["roadmap", "tasks", "core"]
verify: []
commit: { hash: "22592cf39afbfd4e1fdb0e6ee6d23dbe2f96553e", message: "✨ J8K6A5 unify task id generation" }
comments:
  - { author: "CODER", body: "Start: implement core generateTaskId with crypto.randomInt and replace existing generators." }
  - { author: "CODER", body: "Verified: ran bun run lint, bun run test:fast, and agentplane hooks run pre-commit; task ids now generated via core crypto helper." }
doc_version: 2
doc_updated_at: "2026-02-05T13:45:49.396Z"
doc_updated_by: "CODER"
description: "Add crypto-based generateTaskId in core and replace Math.random/crypto.randomInt variants across codebase; add tests."
id_source: "generated"
---
## Summary

Unified task id generation in core using crypto-based generator and reused in task-store and backends.

## Scope

Core: add task-id module, export generateTaskId and alphabet. Core: update task-store to use generateTaskId. Agentplane: update task-backend and workflow to use core functions. Tests: adjust task-store collision tests.

## Risks

ID generator behavior changes (crypto-based). Ensure collision handling and deterministic test coverage.

## Verify Steps

- Run .\n- Run 
[1m[46m RUN [49m[22m [36mv4.0.18 [39m[90m/Users/densmirnov/Github/agentplane[39m

 [32m✓[39m packages/core/src/commit/commit-policy.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 76[2mms[22m[39m
 [32m✓[39m packages/core/src/tasks/tasks-export.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 34[2mms[22m[39m
 [32m✓[39m packages/core/src/tasks/tasks-lint.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 43[2mms[22m[39m
 [32m✓[39m packages/core/src/tasks/task-store.test.ts [2m([22m[2m13 tests[22m[2m)[22m[32m 88[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/agents/agents-template.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 19[2mms[22m[39m
 [32m✓[39m packages/core/src/tasks/task-readme.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 15[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/fs-utils.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 17[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/checksum.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32m✓[39m packages/core/src/git/base-branch.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 297[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/prompts.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 4[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/update-check.test.ts [2m([22m[2m9 tests[22m[2m)[22m[32m 20[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/backends/task-backend.test.ts [2m([22m[2m62 tests[22m[2m)[22m[33m 336[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/http.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32m✓[39m packages/core/src/git/git-utils.test.ts [2m([22m[2m6 tests[22m[2m)[22m[33m 533[2mms[22m[39m
 [32m✓[39m packages/core/src/project/project-root.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 32[2mms[22m[39m
 [32m✓[39m packages/core/src/config/config.test.ts [2m([22m[2m12 tests[22m[2m)[22m[32m 14[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/shared/comment-format.test.ts [2m([22m[2m16 tests[22m[2m)[22m[32m 2[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/shared/errors.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 2[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/archive.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 3[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/commands/upgrade.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 4[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/error-map.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 3[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/output.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 4[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/command-guide.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 7[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/commands/backend.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 2[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/recipes-bundled.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 2[2mms[22m[39m
 [32m✓[39m packages/testkit/src/index.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 1[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/cli-contract.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 2[2mms[22m[39m
Installed recipe viewer@1.2.3
 [32m✓[39m packages/recipes/src/index.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 1[2mms[22m[39m
Installed recipe viewer@1.2.3
 [32m✓[39m packages/agentplane/src/commands/recipes.test.ts [2m([22m[2m44 tests[22m[2m)[22m[33m 886[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/commands/workflow.test.ts [2m([22m[2m44 tests[22m[2m)[22m[33m 1454[2mms[22m[39m

[2m Test Files [22m [1m[32m30 passed[39m[22m[90m (30)[39m
[2m      Tests [22m [1m[32m293 passed[39m[22m[90m (293)[39m
[2m   Start at [22m 20:35:38
[2m   Duration [22m 1.97s[2m (transform 1.51s, setup 0ms, import 4.14s, tests 3.92s, environment 2ms)[22m.\n- Run .\n- Confirm task id generation uses core generator in task-store and task-backend.

## Verification

Verified on 2026-02-05: , 
[1m[46m RUN [49m[22m [36mv4.0.18 [39m[90m/Users/densmirnov/Github/agentplane[39m

 [32m✓[39m packages/core/src/commit/commit-policy.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 115[2mms[22m[39m
 [32m✓[39m packages/core/src/tasks/tasks-lint.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 42[2mms[22m[39m
 [32m✓[39m packages/core/src/tasks/tasks-export.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 34[2mms[22m[39m
 [32m✓[39m packages/core/src/tasks/task-store.test.ts [2m([22m[2m13 tests[22m[2m)[22m[32m 85[2mms[22m[39m
 [32m✓[39m packages/core/src/project/project-root.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 14[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/update-check.test.ts [2m([22m[2m9 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/agents/agents-template.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 30[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/fs-utils.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 14[2mms[22m[39m
 [32m✓[39m packages/core/src/git/base-branch.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 267[2mms[22m[39m
 [32m✓[39m packages/core/src/tasks/task-readme.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 18[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/checksum.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 13[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/command-guide.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 2[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/backends/task-backend.test.ts [2m([22m[2m62 tests[22m[2m)[22m[33m 314[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/http.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 40[2mms[22m[39m
 [32m✓[39m packages/core/src/config/config.test.ts [2m([22m[2m12 tests[22m[2m)[22m[32m 14[2mms[22m[39m
 [32m✓[39m packages/core/src/git/git-utils.test.ts [2m([22m[2m6 tests[22m[2m)[22m[33m 559[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/output.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 3[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/archive.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 5[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/error-map.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 4[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/commands/upgrade.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 27[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/cli-contract.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 1[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/prompts.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 3[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/shared/comment-format.test.ts [2m([22m[2m16 tests[22m[2m)[22m[32m 6[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/recipes-bundled.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 17[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/shared/errors.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 1[2mms[22m[39m
 [32m✓[39m packages/recipes/src/index.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 2[2mms[22m[39m
 [32m✓[39m packages/testkit/src/index.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 1[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/commands/backend.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 3[2mms[22m[39m
Installed recipe viewer@1.2.3
Installed recipe viewer@1.2.3
 [32m✓[39m packages/agentplane/src/commands/recipes.test.ts [2m([22m[2m44 tests[22m[2m)[22m[33m 886[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/commands/workflow.test.ts [2m([22m[2m44 tests[22m[2m)[22m[33m 1518[2mms[22m[39m

[2m Test Files [22m [1m[32m30 passed[39m[22m[90m (30)[39m
[2m      Tests [22m [1m[32m293 passed[39m[22m[90m (293)[39m
[2m   Start at [22m 20:35:50
[2m   Duration [22m 2.07s[2m (transform 1.62s, setup 0ms, import 4.00s, tests 4.05s, environment 2ms)[22m, .

## Rollback Plan

Revert core task-id module and restore prior per-backend/task-store ID generation.
