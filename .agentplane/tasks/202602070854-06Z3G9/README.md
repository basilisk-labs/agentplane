---
id: "202602070854-06Z3G9"
title: "Epic: IO/Git/TaskStore performance refactor"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "epic"
  - "performance"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T12:38:33.060Z"
  updated_by: "USER"
  note: "Approved in chat on 2026-02-07T12:38:33.060Z."
verification:
  state: "ok"
  updated_at: "2026-02-07T12:38:44.333Z"
  updated_by: "CODEX"
  note: "Verified: covered by dependent tasks' verification records (typecheck, lint, test:agentplane)."
commit:
  hash: "954cd8e85640200b838acd916262e9630b61ff19"
  message: "✅ 96MNE3 close: record verify and finish"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: track completion of IO/Git/TaskStore performance refactor epics and dependent tasks."
  -
    author: "ORCHESTRATOR"
    body: "Verified: covered by dependent tasks' verification records. Summary: epic completed via CS7KA9, ZXJ9M4, JBHZSB, B7WC12, 5Z7C2Y, JRBN0P, G8K609, 96MNE3."
doc_version: 2
doc_updated_at: "2026-02-07T12:38:49.364Z"
doc_updated_by: "ORCHESTRATOR"
description: "Implement write-if-changed + stable serialization, unify per-command CommandContext/GitContext/TaskStore, and minimize diff-noise + IO storms."
id_source: "explicit"
---
## Summary

Tracking epic for IO/Git/TaskStore performance refactor; completed via dependent tasks CS7KA9, ZXJ9M4, JBHZSB, B7WC12, 5Z7C2Y, JRBN0P, G8K609, 96MNE3.

## Scope

In scope: per-command context bootstrap (CommandContext), memoized Git facade (GitContext), cached task read/patch/write (TaskStore), backend normalizeTasks + batch APIs, stable write-if-changed across key writes, and targeted regression tests.

## Plan

1) Complete dependent tasks: CS7KA9 (write-if-changed), ZXJ9M4 (CommandContext), JBHZSB (GitContext), B7WC12 (TaskStore), 5Z7C2Y (normalizeTasks), JRBN0P (batch APIs), G8K609 (stable writes), 96MNE3 (tests).\n2) Confirm CI-equivalent verify commands pass (typecheck, lint, test:agentplane).\n3) Mark epic done once all deps are DONE.

## Risks

Risk: behavior regressions in CLI guard/commit flows; Risk: accidental timestamp churn causing noisy diffs; Risk: filesystem concurrency issues (mtime guards) and git porcelain parsing edge cases.

## Verification

Epic verification is covered by per-task verification records (typecheck + lint + test:agentplane) across all dependent tasks.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T12:38:44.333Z — VERIFY — ok

By: CODEX

Note: Verified: covered by dependent tasks' verification records (typecheck, lint, test:agentplane).

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

If needed, revert the per-task commits for the dependent tasks; each change-set was kept localized and tested.
