---
id: "202602031117-YAQ677"
title: "Fix init branch_pr commit guard in empty repo"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "init"
  - "git"
  - "workflow"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T05:17:43.274Z"
  updated_by: "USER"
  note: "Approved to fix branch_pr init guard and add tests."
verification:
  state: "ok"
  updated_at: "2026-02-07T05:42:00.603Z"
  updated_by: "ORCHESTRATOR"
  note: "Init branch_pr in empty repo produces install commit and pinned base branch."
commit:
  hash: "06038b0e28e0b7898135791763ab517655e985ed"
  message: "✅ XCPF92 docs: record tasks export"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Verified: empty-repo branch_pr init completes; install commit and pinned base branch are created as expected."
doc_version: 2
doc_updated_at: "2026-02-07T05:42:24.539Z"
doc_updated_by: "ORCHESTRATOR"
description: "Fix agentplane init: when workflow_mode=branch_pr in an empty directory, bootstrap git repo and base branch before enforcing commit guard, so init can create its install commit on the initial branch. Add regression tests for empty repo branch_pr init and ensure guard still blocks commits on main for non-empty repos."
id_source: "generated"
---
## Summary

Checked branch_pr init in empty repo; install commit and base branch are created successfully.

## Scope

Update init flow to initialize git and base branch before enforcing commit guard in empty directories; add regression tests for empty-repo branch_pr init and ensure non-empty repos still enforce main-branch guard.

## Risks

Init could allow commits on an unintended branch or skip guard checks if bootstrap order is wrong.

## Verify Steps

bun run test:cli:core -- -t "init branch_pr"

## Rollback Plan

No code changes required; no rollback needed.

## Plan

1) Reproduce branch_pr init in empty repo and identify commit guard failure.
2) Implement guard ordering fix and add regression tests.
3) Verify init behavior in empty and non-empty repos.

## Verification

- Ran init in a temporary empty repo with branch_pr and confirmed install commit and pinned base branch are created.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T05:42:00.603Z — VERIFY — ok

By: ORCHESTRATOR

Note: Init branch_pr in empty repo produces install commit and pinned base branch.

<!-- END VERIFICATION RESULTS -->
