---
id: "202605290732-0XREE3"
title: "Release v0.6.12"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "publish"
  - "release"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "external_system"
  - "merge"
  - "publish"
blueprint_request: "release.strict"
verify:
  - "ap pr check <task-id>"
  - "ap release candidate --plan .agentplane/.release/plan/2026-05-29T07-32-07-845Z --push --yes"
  - "ap verify <task-id> --ok --by CODER --note \"Release checks recorded\""
  - "npm view agentplane version && git ls-remote --tags origin v0.6.12 && gh release view v0.6.12"
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T07:32:33.271Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Prepare v0.6.12 release candidate from approved release.strict plan, validate release checks, publish PR artifacts, and record evidence."
events:
  -
    type: "status"
    at: "2026-05-29T07:32:51.547Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Prepare v0.6.12 release candidate from approved release.strict plan, validate release checks, publish PR artifacts, and record evidence."
doc_version: 3
doc_updated_at: "2026-05-29T07:32:51.547Z"
doc_updated_by: "CODER"
description: "Prepare, validate, merge, publish, and record evidence for the next patch release v0.6.12."
sections:
  Summary: |-
    Release v0.6.12

    Prepare, validate, merge, publish, and record evidence for the next patch release v0.6.12.
  Scope: |-
    - In scope: Prepare, validate, merge, publish, and record evidence for the next patch release v0.6.12.
    - Out of scope: unrelated refactors not required for "Release v0.6.12".
  Plan: "Release plan: version=0.6.12, tag=v0.6.12, scope=next patch release from current origin/main using branch_pr release.strict route; use .agentplane/.release/plan/2026-05-29T07-32-07-845Z; run release candidate, hosted PR merge, Publish to npm dispatch, and external evidence checks."
  Verify Steps: |-
    1. Run `ap release plan --patch`. Expected: the plan targets `v0.6.12`.
    2. Run `ap release candidate --plan <plan-dir> --push --yes`. Expected: versioned release candidate commit is created and pushed without creating a tag.
    3. Run `ap pr check 202605290732-0XREE3`. Expected: task PR metadata is current and required checks are green or explicitly recorded.
    4. After merge and publish, run `npm view agentplane version`, `git ls-remote --tags origin v0.6.12`, and `gh release view v0.6.12`. Expected: all external surfaces show `v0.6.12`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Release v0.6.12

Prepare, validate, merge, publish, and record evidence for the next patch release v0.6.12.

## Scope

- In scope: Prepare, validate, merge, publish, and record evidence for the next patch release v0.6.12.
- Out of scope: unrelated refactors not required for "Release v0.6.12".

## Plan

Release plan: version=0.6.12, tag=v0.6.12, scope=next patch release from current origin/main using branch_pr release.strict route; use .agentplane/.release/plan/2026-05-29T07-32-07-845Z; run release candidate, hosted PR merge, Publish to npm dispatch, and external evidence checks.

## Verify Steps

1. Run `ap release plan --patch`. Expected: the plan targets `v0.6.12`.
2. Run `ap release candidate --plan <plan-dir> --push --yes`. Expected: versioned release candidate commit is created and pushed without creating a tag.
3. Run `ap pr check 202605290732-0XREE3`. Expected: task PR metadata is current and required checks are green or explicitly recorded.
4. After merge and publish, run `npm view agentplane version`, `git ls-remote --tags origin v0.6.12`, and `gh release view v0.6.12`. Expected: all external surfaces show `v0.6.12`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
