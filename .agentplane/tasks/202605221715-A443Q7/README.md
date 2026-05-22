---
id: "202605221715-A443Q7"
title: "Harden release fetch against stale local tags"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "git"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:17:27.807Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T17:37:30.860Z"
  updated_by: "CODER"
  note: "Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement approved release pipeline hardening batch; this task is included in the shared batch worktree owned by primary task 202605221715-424TFE."
events:
  -
    type: "status"
    at: "2026-05-22T17:17:58.139Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement approved release pipeline hardening batch; this task is included in the shared batch worktree owned by primary task 202605221715-424TFE."
  -
    type: "verify"
    at: "2026-05-22T17:37:30.860Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed."
doc_version: 3
doc_updated_at: "2026-05-22T17:37:30.881Z"
doc_updated_by: "CODER"
description: "Avoid fetch --tags clobber failures during release preflight by fetching targeted refs and diagnosing stale tags."
sections:
  Summary: |-
    Harden release fetch against stale local tags

    Avoid fetch --tags clobber failures during release preflight by fetching targeted refs and diagnosing stale tags.
  Scope: |-
    - In scope: Avoid fetch --tags clobber failures during release preflight by fetching targeted refs and diagnosing stale tags.
    - Out of scope: unrelated refactors not required for "Harden release fetch against stale local tags".
  Plan: "Harden release git fetch to avoid stale local tag clobber failures: targeted fetch for main/target tag and explicit stale-tag diagnostics. Verify stale unrelated tag no longer blocks release preflight."
  Verify Steps: |-
    1. Run release git preflight/fetch tests with stale unrelated local tag.
    2. Confirm target tag absence/presence is still checked.
    3. Confirm diagnostics tell operator how to repair stale local tags.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T17:37:30.860Z — VERIFY — ok

    By: CODER

    Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:58.139Z, excerpt_hash=sha256:ebcfac78ccb461aa15dbb2303ffbed6d907bc7c32674fcb3d8d5d52f3343227b

    Details:

    BlueprintSnapshotRef:
    - state: missing
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221715-A443Q7/blueprint/resolved-snapshot.json
    - old_digest: none
    - current_digest: 27c809872a669bdb29b49354442dacd6b13cad95c8561a5865d2b7abc23e5a52
    - route_changed: unknown
    - safe_command: agentplane blueprint snapshot 202605221715-A443Q7

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Harden release fetch against stale local tags

Avoid fetch --tags clobber failures during release preflight by fetching targeted refs and diagnosing stale tags.

## Scope

- In scope: Avoid fetch --tags clobber failures during release preflight by fetching targeted refs and diagnosing stale tags.
- Out of scope: unrelated refactors not required for "Harden release fetch against stale local tags".

## Plan

Harden release git fetch to avoid stale local tag clobber failures: targeted fetch for main/target tag and explicit stale-tag diagnostics. Verify stale unrelated tag no longer blocks release preflight.

## Verify Steps

1. Run release git preflight/fetch tests with stale unrelated local tag.
2. Confirm target tag absence/presence is still checked.
3. Confirm diagnostics tell operator how to repair stale local tags.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T17:37:30.860Z — VERIFY — ok

By: CODER

Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:58.139Z, excerpt_hash=sha256:ebcfac78ccb461aa15dbb2303ffbed6d907bc7c32674fcb3d8d5d52f3343227b

Details:

BlueprintSnapshotRef:
- state: missing
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221715-A443Q7/blueprint/resolved-snapshot.json
- old_digest: none
- current_digest: 27c809872a669bdb29b49354442dacd6b13cad95c8561a5865d2b7abc23e5a52
- route_changed: unknown
- safe_command: agentplane blueprint snapshot 202605221715-A443Q7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
