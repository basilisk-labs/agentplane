---
id: "202602051353-J8QH3D"
title: "Epic G: Task index cache"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["roadmap", "epic", "performance"]
verify: []
commit: { hash: "394f1cdf40d4e9aa9eb33c4b74bd7927e381de3c", message: "📝 JD7PBE document task index cache" }
comments:
  - { author: "ORCHESTRATOR", body: "Verified: index cache implemented, list/search optimized, tests and docs updated." }
doc_version: 2
doc_updated_at: "2026-02-05T14:09:16.373Z"
doc_updated_by: "ORCHESTRATOR"
description: "Implement task index cache for list/search performance and close Epic G."
id_source: "generated"
---
## Summary

Epic G: implement a task index cache to speed up list/search and hooks.

## Scope

Implement tasks index storage, integrate list/search, add tests and docs, and close Epic G.

## Risks

Index could go stale or diverge from README content; ensure mtime-based refresh and fallback rebuild.

## Verify Steps

- Run .\n- Run 
[1m[46m RUN [49m[22m [36mv4.0.18 [39m[90m/Users/densmirnov/Github/agentplane[39m

 [32m✓[39m packages/core/src/commit/commit-policy.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 113[2mms[22m[39m
 [32m✓[39m packages/core/src/tasks/tasks-export.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 39[2mms[22m[39m
 [32m✓[39m packages/core/src/tasks/tasks-lint.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 50[2mms[22m[39m
 [32m✓[39m packages/core/src/tasks/task-store.test.ts [2m([22m[2m13 tests[22m[2m)[22m[32m 103[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/agents/agents-template.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 22[2mms[22m[39m
 [32m✓[39m packages/core/src/tasks/task-readme.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 14[2mms[22m[39m
 [32m✓[39m packages/core/src/git/base-branch.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 296[2mms[22m[39m
 [32m✓[39m packages/core/src/config/config.test.ts [2m([22m[2m12 tests[22m[2m)[22m[32m 22[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/shared/comment-format.test.ts [2m([22m[2m16 tests[22m[2m)[22m[32m 4[2mms[22m[39m
 [32m✓[39m packages/core/src/project/project-root.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 24[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/fs-utils.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/http.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 17[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/update-check.test.ts [2m([22m[2m9 tests[22m[2m)[22m[32m 17[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/backends/task-backend.test.ts [2m([22m[2m62 tests[22m[2m)[22m[33m 356[2mms[22m[39m
 [32m✓[39m packages/core/src/git/git-utils.test.ts [2m([22m[2m6 tests[22m[2m)[22m[33m 514[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/checksum.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 7[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/output.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 4[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/cli-contract.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 1[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/command-guide.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 5[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/commands/upgrade.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 17[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/prompts.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 5[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/commands/backend.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 2[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/recipes-bundled.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 6[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/archive.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 2[2mms[22m[39m
 [32m✓[39m packages/testkit/src/index.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 2[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/shared/errors.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 1[2mms[22m[39m
 [32m✓[39m packages/recipes/src/index.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 1[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/cli/error-map.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 1[2mms[22m[39m
Installed recipe viewer@1.2.3
Installed recipe viewer@1.2.3
 [32m✓[39m packages/agentplane/src/commands/recipes.test.ts [2m([22m[2m44 tests[22m[2m)[22m[33m 822[2mms[22m[39m
 [32m✓[39m packages/agentplane/src/commands/workflow.test.ts [2m([22m[2m44 tests[22m[2m)[22m[33m 1416[2mms[22m[39m

[2m Test Files [22m [1m[32m30 passed[39m[22m[90m (30)[39m
[2m      Tests [22m [1m[32m293 passed[39m[22m[90m (293)[39m
[2m   Start at [22m 20:54:39
[2m   Duration [22m 1.96s[2m (transform 1.26s, setup 0ms, import 3.67s, tests 3.90s, environment 7ms)[22m.\n- Run .\n- Validate task list/search performance using the index.

## Verification

Verified on 2026-02-05: tasks index implemented, list/search uses cache, tests and docs updated; lint/test/pre-commit hooks passed.

## Rollback Plan

Remove task index cache code and restore full README scans in list/search.
