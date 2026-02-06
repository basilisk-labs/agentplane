---
id: "202602061732-NG820E"
title: "P1.4: Protected paths policy in guard commit"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "git"
  - "workflow"
  - "guard"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-06T19:01:29.239Z"
  updated_by: "USER"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-06T19:09:23.464Z"
  updated_by: "CODER"
  note: "Implemented protected paths policy for guard commit and hooks pre-commit with explicit overrides. Ran bun run build, bun run test:cli:core, bun run lint."
commit:
  hash: "a6b1850439ea8587554dd0e41d6c30ba582a29d1"
  message: "✨ NG820E protect policy/config/ci paths"
comments:
  -
    author: "CODER"
    body: "Start: implement protected paths policy in guard commit and hooks pre-commit; add explicit override flags/env and regression tests."
  -
    author: "CODER"
    body: "Verified: protected paths policy enforced in guard commit and hooks pre-commit with explicit override flags/env. Verified via bun run build, bun run test:cli:core, bun run lint. Commit=a6b1850439ea."
doc_version: 2
doc_updated_at: "2026-02-06T19:10:13.075Z"
doc_updated_by: "CODER"
description: "Introduce protected paths deny policy for critical guardrail/config files, with explicit override flags to allow intentional edits."
id_source: "generated"
---
## Summary

Implements FIX.md item for: 202602061732-NG820E

## Scope


## Plan

1. Add protected-paths classification shared between guard commit and hooks pre-commit.
2. Extend CLI commit/guard commit parsing with override flags: --allow-policy, --allow-config, --allow-hooks, --allow-ci.
3. Enforce protected paths in guardCommitCheck (fail unless override present), and export env vars for hooks.
4. Enforce the same in hooks run pre-commit using AGENTPLANE_ALLOW_* env overrides.
5. Add unit/CLI tests for guard commit + commit wrapper + hooks pre-commit.
6. Run bun run test:cli:core and bun run lint; record agentplane verify ok; commit and finish.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-06T19:09:23.464Z — VERIFY — ok

By: CODER

Note: Implemented protected paths policy for guard commit and hooks pre-commit with explicit overrides. Ran bun run build, bun run test:cli:core, bun run lint.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
