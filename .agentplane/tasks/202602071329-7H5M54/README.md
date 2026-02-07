---
id: "202602071329-7H5M54"
title: "AP-GITIGNORE-01: .agentplane commit/gitignore audit"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602071328-RDATF2"
tags:
  - "roadmap"
  - "git"
  - "cleanup"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T13:31:55.444Z"
  updated_by: "USER"
  note: "Approved in chat on 2026-02-07T13:31:55.444Z."
verification:
  state: "ok"
  updated_at: "2026-02-07T13:45:55.109Z"
  updated_by: "CODER"
  note: "Repository no longer tracks .agentplane/tasks.json; .gitignore ignores only snapshot and cache dirs."
commit:
  hash: "e71a31c97ca36005bd5f550329a2727f9ccd7a47"
  message: "✅ 7H5M54 git: ignore and untrack .agentplane/tasks.json"
comments:
  -
    author: "CODER"
    body: "Start: Audit .agentplane tracked files vs gitignore; fix tasks.json tracking."
  -
    author: "CODER"
    body: "Verified: .agentplane/tasks.json is no longer tracked and is ignored; only cache/snapshot paths are excluded from commits."
events: []
doc_version: 2
doc_updated_at: "2026-02-07T13:46:03.013Z"
doc_updated_by: "CODER"
description: "Ensure .agentplane commits include only the intended files (agents/tasks/backends/config), and .gitignore ignores only export snapshot tasks.json plus caches (.agentplane/cache, .agentplane/recipes-cache, etc.). Remove .agentplane/tasks.json from the git index if it is tracked."
id_source: "generated"
---
## Summary


## Scope


## Plan

1. Ensure .gitignore ignores only .agentplane/tasks.json (export snapshot) and cache directories (.agentplane/cache, .agentplane/recipes-cache, .agentplane/worktrees).
2. If .agentplane/tasks.json is tracked, remove it from the index (keep the working file intact).
3. Confirm that .agentplane/tasks, .agentplane/agents, .agentplane/backends, and .agentplane/config.json remain committed.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T13:45:55.109Z — VERIFY — ok

By: CODER

Note: Repository no longer tracks .agentplane/tasks.json; .gitignore ignores only snapshot and cache dirs.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
