---
id: "202602070855-JBHZSB"
title: "GitContext: memoized facade + guard/commit migration"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602070855-ZXJ9M4"
tags:
  - "code"
  - "git"
  - "perf"
verify:
  - "bun run typecheck"
  - "bun run test:cli:core"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T11:39:48.192Z"
  updated_by: "CODEX"
  note: "Approved by user in chat (2026-02-07)."
verification:
  state: "ok"
  updated_at: "2026-02-07T11:51:30.329Z"
  updated_by: "CODEX"
  note: "bun run typecheck; bun run test:cli:core"
commit:
  hash: "e79d0c7eb1b717dd109ca23e4d72a7080d0911ef"
  message: "✅ JBHZSB git: add GitContext and migrate guard/status staging"
comments:
  -
    author: "CODEX"
    body: "start: implement GitContext facade + migrate guard/commit pipeline"
  -
    author: "CODEX"
    body: "Verified: bun run typecheck; bun run test:cli:core. GitContext now uses single git status --porcelain -z -uall and invalidates memo after stage/commit."
events:
  -
    type: "status"
    at: "2026-02-07T11:39:52.651Z"
    author: "CODEX"
    from: "TODO"
    to: "DOING"
    note: "start: implement GitContext facade + migrate guard/commit pipeline"
  -
    type: "verify"
    at: "2026-02-07T11:51:30.329Z"
    author: "CODEX"
    state: "ok"
    note: "bun run typecheck; bun run test:cli:core"
  -
    type: "status"
    at: "2026-02-07T11:51:42.188Z"
    author: "CODEX"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run typecheck; bun run test:cli:core. GitContext now uses single git status --porcelain -z -uall and invalidates memo after stage/commit."
doc_version: 2
doc_updated_at: "2026-02-07T11:51:42.188Z"
doc_updated_by: "CODEX"
description: "Implement GitContext(statusChangedPaths via one git status --porcelain -z, headCommit memoized, stage batched, commit). Migrate guard/commit pipeline and disallow direct git exec outside GitContext."
id_source: "explicit"
---
## Summary


## Scope


## Plan

1) Add GitContext facade (statusChangedPaths via git status --porcelain -z; headCommit memoized; stage(paths) batched; commit(message)).
2) Attach GitContext to CommandContext and memoize per-command.
3) Migrate guard/commit codepaths to use ctx.git (changed paths, staging allowlist, commitFromComment checks) and stop calling git exec directly outside GitContext in those paths.
4) Run verify: bun run typecheck; bun run test:cli:core.
5) Commit with allowlist; finish task.

Risks:
- porcelain -z parsing for renames and spaces.
- behavior drift in require-clean semantics (must ignore untracked).

Rollback:
- revert GitContext wiring and keep old guard implementation (git diff/ls-files).

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T11:51:30.329Z — VERIFY — ok

By: CODEX

Note: bun run typecheck; bun run test:cli:core

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
