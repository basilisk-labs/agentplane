---
id: "202602071329-7H5M54"
title: "AP-GITIGNORE-01: .agentplane commit/gitignore audit"
status: "DOING"
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
  note: "Approved in chat on 2026-02-07."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Audit .agentplane tracked files vs gitignore; fix tasks.json tracking."
events: []
doc_version: 2
doc_updated_at: "2026-02-07T13:35:32.113Z"
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


## Rollback Plan
