---
id: "202602051316-2XC43Y"
title: "AP-050: Move task-doc operations to core"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["roadmap", "tasks", "core", "docs"]
verify: []
commit: null
comments:
  - { author: "CODER", body: "Start: extract task-doc helpers to core and replace duplicates in core/task-store and agentplane task-backend." }
doc_version: 2
doc_updated_at: "2026-02-05T13:40:30.140Z"
doc_updated_by: "CODER"
description: "Extract task doc/markdown helpers into core task-doc module and replace duplicates in core/task-store and agentplane task-backend; add regression tests."
id_source: "generated"
---
## Summary

Moved task doc/markdown helpers into core and replaced duplicate implementations in agentplane workflow/task-backend and core task-store.

## Scope

Core: add task-doc and task-id modules and export from index. Core: update task-store to use core helpers and id generator. Agentplane: replace task-backend/workflow doc helpers with core utilities. Tests: update task-store collision tests.

Core: add task-doc module and export helpers. Core: update task-store to use core doc helpers. Agentplane: replace task-backend/workflow doc helpers with core utilities. Tests: keep task-doc behavior covered.

## Risks

Doc normalization behavior could drift; ensure parity tests cover merged sections. Task ID generation now centralized; ensure all callers use core API.

## Verify Steps

- Run .\n- Run 
[1m[46m RUN [49m[22m [36mv4.0.18 [39m[90m/Users/densmirnov/Github/agentplane[39m

 [32m✓[39m packages/core/src/commit/commit-policy.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 100[2mms[22m[39m
 [32m✓[39m packages/core/src/tasks/tasks-export.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 33[2mms[22m[39m
 [32m✓[39m packages/core/src/tasks/tasks-lint.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 45[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/agents/agents-template.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 21[2mms[22m[39m
 [32m✓[39m packages/core/src/tasks/task-store.test.ts [2m([22m[2m13 tests[22m[2m)[22m[32m 101[2mms[22m[39m
 [32m✓[39m packages/core/src/tasks/task-readme.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 16[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/update-check.test.ts [2m([22m[2m9 tests[22m[2m)[22m[32m 22[2mms[22m[39m
 [32m✓[39m packages/core/src/git/base-branch.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 285[2mms[22m[39m
 [32m✓[39m packages/core/src/config/config.test.ts [2m([22m[2m12 tests[22m[2m)[22m[32m 23[2mms[22m[39m
 [32m✓[39m packages/core/src/project/project-root.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/fs-utils.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 18[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/checksum.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/http.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 15[2mms[22m[39m
 [32m✓[39m packages/core/src/git/git-utils.test.ts [2m([22m[2m6 tests[22m[2m)[22m[33m 622[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/shared/comment-format.test.ts [2m([22m[2m16 tests[22m[2m)[22m[32m 14[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/commands/upgrade.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 4[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/backends/task-backend.test.ts [2m([22m[2m62 tests[22m[2m)[22m[33m 508[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/output.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 2[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/archive.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 4[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/command-guide.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 14[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/shared/errors.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 4[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/cli-contract.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 4[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/prompts.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 7[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/error-map.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 5[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/commands/backend.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 2[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/recipes-bundled.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 3[2mms[22m[39m
 [32m✓[39m packages/recipes/src/index.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 1[2mms[22m[39m
 [32m✓[39m packages/testkit/src/index.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 1[2mms[22m[39m
Installed recipe viewer@1.2.3
Installed recipe viewer@1.2.3
 [32m✓[39m packages/agentplane/src/commands/recipes.test.ts [2m([22m[2m44 tests[22m[2m)[22m[33m 954[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/commands/workflow.test.ts [2m([22m[2m44 tests[22m[2m)[22m[33m 1525[2mms[22m[39m

[2m Test Files [22m [1m[32m30 passed[39m[22m[90m (30)[39m
[2m      Tests [22m [1m[32m293 passed[39m[22m[90m (293)[39m
[2m   Start at [22m 20:34:45
[2m   Duration [22m 2.04s[2m (transform 1.45s, setup 0ms, import 3.79s, tests 4.38s, environment 2ms)[22m.\n- Run .\n- Spot-check task README section updates via task doc set.

## Verification

Verified on 2026-02-05: , 
[1m[46m RUN [49m[22m [36mv4.0.18 [39m[90m/Users/densmirnov/Github/agentplane[39m

 [32m✓[39m packages/core/src/commit/commit-policy.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 119[2mms[22m[39m
 [32m✓[39m packages/core/src/tasks/tasks-export.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 30[2mms[22m[39m
 [32m✓[39m packages/core/src/tasks/tasks-lint.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 40[2mms[22m[39m
 [32m✓[39m packages/core/src/tasks/task-store.test.ts [2m([22m[2m13 tests[22m[2m)[22m[32m 91[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/update-check.test.ts [2m([22m[2m9 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/agents/agents-template.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 23[2mms[22m[39m
 [32m✓[39m packages/core/src/config/config.test.ts [2m([22m[2m12 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32m✓[39m packages/core/src/git/base-branch.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 257[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/fs-utils.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 14[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/command-guide.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 2[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/http.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32m✓[39m packages/core/src/tasks/task-readme.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 21[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/backends/task-backend.test.ts [2m([22m[2m62 tests[22m[2m)[22m[32m 259[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/checksum.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 13[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/shared/comment-format.test.ts [2m([22m[2m16 tests[22m[2m)[22m[32m 6[2mms[22m[39m
 [32m✓[39m packages/core/src/git/git-utils.test.ts [2m([22m[2m6 tests[22m[2m)[22m[33m 502[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/cli-contract.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 1[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/shared/errors.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 3[2mms[22m[39m
 [32m✓[39m packages/core/src/project/project-root.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/error-map.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 3[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/archive.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 2[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/prompts.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 18[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/commands/upgrade.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 3[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/output.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 2[2mms[22m[39m
 [32m✓[39m packages/testkit/src/index.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 1[2mms[22m[39m
 [32m✓[39m packages/recipes/src/index.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 1[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/commands/backend.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 2[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/recipes-bundled.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 2[2mms[22m[39m
Installed recipe viewer@1.2.3
Installed recipe viewer@1.2.3
 [32m✓[39m packages/agentplane/src/commands/recipes.test.ts [2m([22m[2m44 tests[22m[2m)[22m[33m 739[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/commands/workflow.test.ts [2m([22m[2m44 tests[22m[2m)[22m[33m 1357[2mms[22m[39m

[2m Test Files [22m [1m[32m30 passed[39m[22m[90m (30)[39m
[2m      Tests [22m [1m[32m293 passed[39m[22m[90m (293)[39m
[2m   Start at [22m 20:35:03
[2m   Duration [22m 1.91s[2m (transform 1.49s, setup 0ms, import 3.58s, tests 3.56s, environment 2ms)[22m, .

## Rollback Plan

Revert core task-doc/task-id modules and restore prior in-file helpers in task-store, task-backend, and workflow.
