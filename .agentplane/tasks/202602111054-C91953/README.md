---
id: "202602111054-C91953"
title: "Init clean tree: avoid extra tracked mutations"
result_summary: "Fixed post-init dirty tree by staging .gitignore and added regression test."
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602111054-C11PDM"
tags:
  - "cli"
  - "init"
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-11T11:02:33.400Z"
  updated_by: "TESTER"
  note: "Init clean-tree behavior verified"
commit:
  hash: "446966248f8b38bd689f074d9aae5aaaff140374"
  message: "✅ C91953 task: init now stages .gitignore in install commit, so fresh repositories remain clean after init"
comments:
  -
    author: "CODER"
    body: "Start: reproduce and fix dirty working tree behavior after init"
  -
    author: "CODER"
    body: "Verified: init now stages .gitignore in install commit, so fresh repositories remain clean after init"
events:
  -
    type: "status"
    at: "2026-02-11T10:59:39.301Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce and fix dirty working tree behavior after init"
  -
    type: "verify"
    at: "2026-02-11T11:02:33.400Z"
    author: "TESTER"
    state: "ok"
    note: "Init clean-tree behavior verified"
  -
    type: "status"
    at: "2026-02-11T11:02:33.689Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: init now stages .gitignore in install commit, so fresh repositories remain clean after init"
doc_version: 2
doc_updated_at: "2026-02-11T11:02:33.943Z"
doc_updated_by: "CODER"
description: "Ensure post-init tracked tree is clean except intended install commit artifacts and remove unintended diffs."
id_source: "generated"
---
## Summary

Выявить и устранить причину грязного дерева после init.

## Scope

In scope: init commit path selection and generated artifacts that remain staged/unstaged after init.

## Plan

1) Воспроизвести в temp repo. 2) Локализовать источник diff. 3) Исправить и покрыть тестом.

## Risks

Риск: изменить поведение install commit. Смягчение: валидировать init tests и git status в temp repo.

## Verify Steps

- bun run test:cli:core -- packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts
- manual: init in temp repo then git status --short

## Verification

После init в чистом репо git status не содержит tracked/untracked install artifacts (кроме игнорируемых).

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-11T11:02:33.400Z — VERIFY — ok

By: TESTER

Note: Init clean-tree behavior verified

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-11T10:59:39.301Z, excerpt_hash=sha256:ae77bfa36c55e6828e6dc1c2f2c6f396611e9c2e5ae188915a8595641725a863

Details:

Reproduced clean-repo init and fixed .gitignore staging; added regression test ensuring git status is clean after init --yes.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Откатить изменения commit/staging в init и вернуть предыдущее поведение.
