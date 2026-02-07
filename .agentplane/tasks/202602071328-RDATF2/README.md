---
id: "202602071328-RDATF2"
title: "ROADMAP: Modularity + Dedup across policy/git/cli (no compatibility)"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "roadmap"
  - "refactor"
  - "policy"
  - "git"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T13:30:18.515Z"
  updated_by: "USER"
  note: "Approved in chat on 2026-02-07."
verification:
  state: "ok"
  updated_at: "2026-02-07T13:35:21.932Z"
  updated_by: "USER"
  note: "Decomposition captured and approved; tracking task can be closed."
commit:
  hash: "3f331697cc154d230f07faa3843b1469aa60ed8d"
  message: "✅ 06Z3G9 close: epic done"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Verified: Tracking task closed after decomposition; implementation continues in dependent tasks."
events: []
doc_version: 2
doc_updated_at: "2026-02-07T13:35:21.969Z"
doc_updated_by: "ORCHESTRATOR"
description: "Decompose and implement redesign: explicit contexts (Git/Policy/Command), a single policy engine, centralized git facts, thin guard/hooks, and removal of legacy duplication. Also: update help banner (version + release commit date) and clean up .agentplane gitignore/commits (ignore only tasks.json snapshots and caches)."
id_source: "generated"
---
## Summary


## Scope


## Plan

1. Capture atomic tasks and dependencies in agentplane.
2. Execute tasks by domain: contexts -> git base -> policy engine -> thin adapters -> CLI cleanup -> legacy cleanup.
3. Separately: help banner (version + release commit date) and .agentplane gitignore/commits.
4. Regression: run vitest (cli/core) and smoke guard/hooks, ensure traceability (task docs/events/allowlist) remains intact.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T13:35:21.932Z — VERIFY — ok

By: USER

Note: Decomposition captured and approved; tracking task can be closed.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
