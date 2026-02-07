---
id: "202601290730-7PS62K"
title: "Speed up local git hooks"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "workflow"
  - "git"
  - "hooks"
  - "docs"
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
  hash: "01acf3f4e41b56cf72ff4fab548c1bd269efab83"
  message: "✨ 7PS62K speed up pre-commit hooks"
comments:
  -
    author: "CODER"
    body: "Start: Adjust lefthook to reduce pre-commit workload and update code-quality docs to match."
  -
    author: "CODER"
    body: "verified: pre-commit runs format+lint | details: pre-push runs bun run ci; docs updated."
doc_version: 2
doc_updated_at: "2026-02-03T12:09:21.979Z"
doc_updated_by: "agentplane"
description: "Adjust lefthook pre-commit to avoid running full ci on every commit while keeping ci on pre-push, and update docs accordingly."
---
## Summary

Speed up local git hooks by moving full ci to pre-push and keeping pre-commit fast.

## Scope

- Update lefthook pre-commit to run format + lint only.\n- Add pre-push hook to run full ci.\n- Update code-quality docs.

## Risks

- Pre-commit no longer runs full tests; failures may surface at pre-push instead.\n- Developers can still bypass hooks with --no-verify (unchanged).

## Verify Steps

git commit (runs pre-commit: format + lint); bun run ci runs on pre-push

## Rollback Plan

Revert commit 01acf3f4e41b.

## Plan


## Verification
