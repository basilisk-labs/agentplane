---
id: "202604221605-SQYRNQ"
title: "Publish v0.3.19 init hotfix release"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "init"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T16:06:04.437Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: publish v0.3.19 patch release for the init cached recipe manifest compatibility fix and restored interactive init ASCII logo."
events:
  -
    type: "status"
    at: "2026-04-22T16:06:04.900Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: publish v0.3.19 patch release for the init cached recipe manifest compatibility fix and restored interactive init ASCII logo."
doc_version: 3
doc_updated_at: "2026-04-22T16:06:04.906Z"
doc_updated_by: "CODER"
description: "Publish the next patch release containing the init cached recipe manifest compatibility fix and restored interactive init ASCII logo."
sections:
  Summary: |-
    Publish v0.3.19 init hotfix release
    
    Publish the next patch release containing the init cached recipe manifest compatibility fix and restored interactive init ASCII logo.
  Scope: |-
    - In scope: Publish the next patch release containing the init cached recipe manifest compatibility fix and restored interactive init ASCII logo.
    - Out of scope: unrelated refactors not required for "Publish v0.3.19 init hotfix release".
  Plan: |-
    Goal: publish v0.3.19 as a patch release for the init hotfix merged in PR #501.
    
    Plan:
    1. Generate a patch release plan from v0.3.18 to current main.
    2. Write docs/releases/v0.3.19.md describing the init manifest compatibility fix and ASCII logo restoration.
    3. Apply the release plan locally on release/v0.3.19-publish.
    4. Run release parity and release gates.
    5. Push the release branch, open PR to main, wait for hosted checks, merge, push tag, and verify GitHub/npm publication.
  Verify Steps: |-
    - agentplane release plan --patch
    - agentplane release apply --plan <plan-dir>
    - bun run release:parity
    - bun run ci:local:fast or pre-push standard gate
    - GitHub PR checks pass
    - Publish to npm workflow passes after merge/tag
    - npm view agentplane version && npm view @agentplaneorg/core version && npm view @agentplaneorg/recipes version report 0.3.19
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

Publish v0.3.19 init hotfix release

Publish the next patch release containing the init cached recipe manifest compatibility fix and restored interactive init ASCII logo.

## Scope

- In scope: Publish the next patch release containing the init cached recipe manifest compatibility fix and restored interactive init ASCII logo.
- Out of scope: unrelated refactors not required for "Publish v0.3.19 init hotfix release".

## Plan

Goal: publish v0.3.19 as a patch release for the init hotfix merged in PR #501.

Plan:
1. Generate a patch release plan from v0.3.18 to current main.
2. Write docs/releases/v0.3.19.md describing the init manifest compatibility fix and ASCII logo restoration.
3. Apply the release plan locally on release/v0.3.19-publish.
4. Run release parity and release gates.
5. Push the release branch, open PR to main, wait for hosted checks, merge, push tag, and verify GitHub/npm publication.

## Verify Steps

- agentplane release plan --patch
- agentplane release apply --plan <plan-dir>
- bun run release:parity
- bun run ci:local:fast or pre-push standard gate
- GitHub PR checks pass
- Publish to npm workflow passes after merge/tag
- npm view agentplane version && npm view @agentplaneorg/core version && npm view @agentplaneorg/recipes version report 0.3.19

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
