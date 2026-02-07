---
id: "202602061915-DZBAW0"
title: "P1: Единый CommitPolicy для guard и hooks"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "git"
  - "workflow"
  - "cli"
  - "hooks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-06T19:31:09.086Z"
  updated_by: "USER"
  note: "Approved by user on 2026-02-06T19:31:09.086Z: unify guard/hooks policy; can drop backward-compat and avoid backend/network in hooks."
verification:
  state: "ok"
  updated_at: "2026-02-06T19:37:41.003Z"
  updated_by: "TESTER"
  note: "bun run test:agentplane passed."
commit:
  hash: "55aa964f36b865424c44e860ad31671faf618524"
  message: "✨ DZBAW0 git"
comments:
  -
    author: "CODER"
    body: "Start: Unify guard/hooks commit policies: protected paths from config, robust allowlist matching, branch_pr base restrictions in guard, and commit-msg hook without backend/network."
  -
    author: "CODER"
    body: "Verified: Guard and hooks share consistent commit policy behavior (tasks_path from config, robust allowlist matching, branch_pr base restrictions); commit-msg hook requires AGENTPLANE_TASK_ID; bun run test:agentplane passed."
doc_version: 2
doc_updated_at: "2026-02-06T19:39:09.220Z"
doc_updated_by: "CODER"
description: "(Tracking=202602061915-XCPF92; depends_on=202602061915-RNTNEP) Унифицировать policy: protected paths из config, allowlist matching через path.relative, commit-msg и guard используют core validateCommitSubject; hooks не должны дергать backend/network."
id_source: "generated"
---
## Summary


## Scope


## Plan

1) Extract shared commit/allowlist path policy helpers.\n2) Use config.paths.tasks_path in guard, and switch allowlist matching to path.relative-based logic.\n3) Add branch_pr base-branch restrictions to guard commit (align with pre-commit hook).\n4) Make commit-msg hook avoid backend/network (require AGENTPLANE_TASK_ID if needed).\n5) Update tests and run bun run test:agentplane.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-06T19:37:41.003Z — VERIFY — ok

By: TESTER

Note: bun run test:agentplane passed.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
