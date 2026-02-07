---
id: "202602070855-JBHZSB"
title: "GitContext: memoized facade + guard/commit migration"
status: "DOING"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODEX"
    body: "start: implement GitContext facade + migrate guard/commit pipeline"
events:
  -
    type: "status"
    at: "2026-02-07T11:39:52.651Z"
    author: "CODEX"
    from: "TODO"
    to: "DOING"
    note: "start: implement GitContext facade + migrate guard/commit pipeline"
doc_version: 2
doc_updated_at: "2026-02-07T11:39:52.651Z"
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


## Rollback Plan
