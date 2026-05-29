---
id: "202605291916-YGJASQ"
title: "Add remote task import policy for cloud backend"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T19:35:45.328Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T19:50:22.940Z"
  updated_by: "CODER"
  note: "Implemented explicit cloud remote_create_policy behavior for diff, ignore, and import. Verified remote-only diff summary, no silent materialization, explicit import with sync envelope, typecheck, and focused cloud backend tests."
  attempts: 0
commit:
  hash: "80b423d6ac5cea94fa52fc7f8f1230df0f2c8173"
  message: "Merge pull request #4317 from basilisk-labs/task/202605291916-5Q6T1E/task-sync-contract"
comments:
  -
    author: "CODER"
    body: "Start: implementing the remote task import policy inside the shared sync contract branch, with explicit remote-only diff, ignore, and import behavior."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4317 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-29T19:36:33.992Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the remote task import policy inside the shared sync contract branch, with explicit remote-only diff, ignore, and import behavior."
  -
    type: "verify"
    at: "2026-05-29T19:50:22.940Z"
    author: "CODER"
    state: "ok"
    note: "Implemented explicit cloud remote_create_policy behavior for diff, ignore, and import. Verified remote-only diff summary, no silent materialization, explicit import with sync envelope, typecheck, and focused cloud backend tests."
  -
    type: "status"
    at: "2026-05-29T21:15:52.447Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4317 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-29T21:15:52.453Z"
doc_updated_by: "INTEGRATOR"
description: "Add an explicit remote_create_policy for cloud backend pulls so remote-only provider items can be diffed, ignored, or materialized into local AgentPlane task READMEs without silent loss or accidental provider authority."
sections:
  Summary: |-
    Add remote task import policy for cloud backend

    Add an explicit remote_create_policy for cloud backend pulls so remote-only provider items can be diffed, ignored, or materialized into local AgentPlane task READMEs without silent loss or accidental provider authority.
  Scope: |-
    - In scope: Add an explicit remote_create_policy for cloud backend pulls so remote-only provider items can be diffed, ignored, or materialized into local AgentPlane task READMEs without silent loss or accidental provider authority.
    - Out of scope: unrelated refactors not required for "Add remote task import policy for cloud backend".
  Plan: |-
    1. Add remote_create_policy configuration and cloud pull behavior for remote-only tasks: fail/diff, ignore, and explicit materialize/import.
    2. Implement safe materialization into AgentPlane task READMEs using the provider-neutral sync envelope and revision guards; do not treat provider-only payloads as full AgentPlane lifecycle evidence.
    3. Add tests for remote-only diff output, ignored remote tasks, explicit import, stale projection guards, and conflict handling.
  Verify Steps: |-
    1. Run cloud backend pull tests with remote-only items under each policy. Expected: diff/ignore/import behavior is explicit and no remote item silently becomes canonical.
    2. Inspect generated task README for imported remote items. Expected: AgentPlane fields are populated conservatively and external refs preserve provider identity.
    3. Run routing, doctor, and focused backend tests. Expected: stale projection and conflict behavior remain guarded before local mutation.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T19:50:22.940Z — VERIFY — ok

    By: CODER

    Note: Implemented explicit cloud remote_create_policy behavior for diff, ignore, and import. Verified remote-only diff summary, no silent materialization, explicit import with sync envelope, typecheck, and focused cloud backend tests.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T19:36:33.992Z, excerpt_hash=sha256:1fce00a0097be011f518561fe3accbded45af970bf5c5f5b678b3c6d16d04a27

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605291916-5Q6T1E-task-sync-contract/.agentplane/tasks/202605291916-YGJASQ/blueprint/resolved-snapshot.json
    - old_digest: e608dd8458cf30bcf377c9bb15f130944b9a7e1a5ffb39f4b15762634916fa68
    - current_digest: e608dd8458cf30bcf377c9bb15f130944b9a7e1a5ffb39f4b15762634916fa68
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605291916-YGJASQ

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  branch_pr_batch:
    base: "main"
    branch: "task/202605291916-5Q6T1E/task-sync-contract"
    included_task_ids:
      - "202605291916-YGJASQ"
      - "202605291917-4RF08R"
    primary_task_id: "202605291916-5Q6T1E"
    role: "included"
    updated_at: "2026-05-29T20:50:38.017Z"
id_source: "generated"
---
## Summary

Add remote task import policy for cloud backend

Add an explicit remote_create_policy for cloud backend pulls so remote-only provider items can be diffed, ignored, or materialized into local AgentPlane task READMEs without silent loss or accidental provider authority.

## Scope

- In scope: Add an explicit remote_create_policy for cloud backend pulls so remote-only provider items can be diffed, ignored, or materialized into local AgentPlane task READMEs without silent loss or accidental provider authority.
- Out of scope: unrelated refactors not required for "Add remote task import policy for cloud backend".

## Plan

1. Add remote_create_policy configuration and cloud pull behavior for remote-only tasks: fail/diff, ignore, and explicit materialize/import.
2. Implement safe materialization into AgentPlane task READMEs using the provider-neutral sync envelope and revision guards; do not treat provider-only payloads as full AgentPlane lifecycle evidence.
3. Add tests for remote-only diff output, ignored remote tasks, explicit import, stale projection guards, and conflict handling.

## Verify Steps

1. Run cloud backend pull tests with remote-only items under each policy. Expected: diff/ignore/import behavior is explicit and no remote item silently becomes canonical.
2. Inspect generated task README for imported remote items. Expected: AgentPlane fields are populated conservatively and external refs preserve provider identity.
3. Run routing, doctor, and focused backend tests. Expected: stale projection and conflict behavior remain guarded before local mutation.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T19:50:22.940Z — VERIFY — ok

By: CODER

Note: Implemented explicit cloud remote_create_policy behavior for diff, ignore, and import. Verified remote-only diff summary, no silent materialization, explicit import with sync envelope, typecheck, and focused cloud backend tests.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T19:36:33.992Z, excerpt_hash=sha256:1fce00a0097be011f518561fe3accbded45af970bf5c5f5b678b3c6d16d04a27

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605291916-5Q6T1E-task-sync-contract/.agentplane/tasks/202605291916-YGJASQ/blueprint/resolved-snapshot.json
- old_digest: e608dd8458cf30bcf377c9bb15f130944b9a7e1a5ffb39f4b15762634916fa68
- current_digest: e608dd8458cf30bcf377c9bb15f130944b9a7e1a5ffb39f4b15762634916fa68
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605291916-YGJASQ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
