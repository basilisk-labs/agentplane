---
id: "202602120818-C1VM03"
title: "Fix release prepublish test regressions"
result_summary: "Release prepublish regressions fixed and validated."
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "e2884cc12866314dbfc0eaf1181b468d39f5e72b"
  message: "🛠️ C1VM03 test: fix release prepublish regressions"
comments:
  -
    author: "CODER"
    body: "Start: fix release prepublish test regressions by updating task-update test expectations and hardening redmine env test isolation."
  -
    author: "CODER"
    body: "Verified: updated task-update regression tests for primary-tag lock semantics and expanded redmine env cleanup to avoid host env leakage; release:prepublish passes."
events:
  -
    type: "status"
    at: "2026-02-12T08:18:37.246Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix release prepublish test regressions by updating task-update test expectations and hardening redmine env test isolation."
  -
    type: "status"
    at: "2026-02-12T08:19:51.232Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: updated task-update regression tests for primary-tag lock semantics and expanded redmine env cleanup to avoid host env leakage; release:prepublish passes."
doc_version: 2
doc_updated_at: "2026-02-12T08:19:51.232Z"
doc_updated_by: "CODER"
description: "Adjust task-update tests for primary-tag lock policy and stabilize redmine env isolation in backend tests."
id_source: "generated"
---
## Summary


## Scope


## Plan

1) Update run-cli task update tests for primary-tag lock semantics. 2) Expand env cleanup in backend load tests to prevent host env leakage. 3) Run targeted failing tests and release prepublish gate.

## Risks


## Verification


## Rollback Plan


## Verify Steps

1) bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.test.ts -t "task update supports replace flags" 2) bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.test.ts -t "task update allows code primary without verify commands" 3) bunx vitest run packages/agentplane/src/backends/task-backend.test.ts -t "fails to load redmine backend when task-id custom field env key is missing" 4) bun run release:prepublish
