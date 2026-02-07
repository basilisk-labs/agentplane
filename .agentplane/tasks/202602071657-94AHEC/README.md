---
id: "202602071657-94AHEC"
title: "CLI: task new should not require --verify for code tags"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on:
  - "202602071657-X6KPJS"
tags:
  - "code"
  - "cli"
  - "tasks"
verify:
  - "bun run test:agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T17:24:28.768Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T17:26:37.449Z"
  updated_by: "CODER"
  note: "task new/add/update no longer require verify commands for code/backend/frontend tags; bun run test:agentplane + bun run test:cli:core."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: relax task new/add/update so code-tag tasks do not require --verify commands."
doc_version: 2
doc_updated_at: "2026-02-07T17:26:37.451Z"
doc_updated_by: "CODER"
description: "Relax task new validation: --verify remains optional; do not hard-require it by tags."
---
## Summary


## Scope


## Plan

1) Remove hard requirement for frontmatter verify commands in task new/add/update for code/backend/frontend tags.
2) Keep frontmatter.verify supported (string[]), but optional.
3) Update affected tests to match the new behavior.
4) Run bun run test:agentplane.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T17:26:37.449Z — VERIFY — ok

By: CODER

Note: task new/add/update no longer require verify commands for code/backend/frontend tags; bun run test:agentplane + bun run test:cli:core.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Scope

Make frontmatter verify commands optional; keep Verify Steps/Verification as the primary workflow gates.

### Checks

- `agentplane task new ... --tag code` succeeds without `--verify`.
- `agentplane task add ... --tag backend` succeeds without `--verify`.
- `agentplane task update ... --tag code` succeeds without requiring verify commands.

### Evidence / Commands

- bun run test:agentplane

### Pass criteria

- All updated commands accept missing verify commands and tests are updated accordingly.
