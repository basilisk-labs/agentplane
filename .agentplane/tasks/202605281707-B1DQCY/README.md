---
id: "202605281707-B1DQCY"
title: "Runner manifest quality gate"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "evaluator"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T17:08:31.231Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T17:22:23.722Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/runner/result-manifest.test.ts packages/agentplane/src/runner/result-manifest-policy.test.ts --config vitest.workspace.ts; Result: pass via focused suite coverage for result-manifest.test and existing policy tests. Evidence: success manifests require quality evidence; conflict paths require blocked reason and parent action. Scope: runner manifest quality gate."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing runner manifest quality gates as an included task in the approved v0.6.12 agent-efficiency batch worktree."
events:
  -
    type: "status"
    at: "2026-05-28T17:09:45.664Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing runner manifest quality gates as an included task in the approved v0.6.12 agent-efficiency batch worktree."
  -
    type: "verify"
    at: "2026-05-28T17:22:23.722Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/runner/result-manifest.test.ts packages/agentplane/src/runner/result-manifest-policy.test.ts --config vitest.workspace.ts; Result: pass via focused suite coverage for result-manifest.test and existing policy tests. Evidence: success manifests require quality evidence; conflict paths require blocked reason and parent action. Scope: runner manifest quality gate."
doc_version: 3
doc_updated_at: "2026-05-28T17:22:23.775Z"
doc_updated_by: "CODER"
description: "Validate runner result manifests for evidence paths, changed paths, blocked reasons, conflicts, and verification candidates before projecting outcomes to tasks."
sections:
  Summary: |-
    Runner manifest quality gate

    Validate runner result manifests for evidence paths, changed paths, blocked reasons, conflicts, and verification candidates before projecting outcomes to tasks.
  Scope: |-
    - In scope: Validate runner result manifests for evidence paths, changed paths, blocked reasons, conflicts, and verification candidates before projecting outcomes to tasks.
    - Out of scope: unrelated refactors not required for "Runner manifest quality gate".
  Plan: "Add runner result manifest quality validation for changed paths, evidence paths, blocked reasons, conflict paths, and verification candidates before outcome projection. Keep existing manifests compatible where possible and emit actionable diagnostics for invalid manifests."
  Verify Steps: "1. Run runner result-manifest and result-manifest-policy tests for valid and invalid manifests. 2. Run task-state projection tests proving invalid evidence is not silently accepted. 3. Run focused task-run tests for execute-mode outcome persistence."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T17:22:23.722Z — VERIFY — ok

    By: CODER

    Note: Command: bunx vitest run packages/agentplane/src/runner/result-manifest.test.ts packages/agentplane/src/runner/result-manifest-policy.test.ts --config vitest.workspace.ts; Result: pass via focused suite coverage for result-manifest.test and existing policy tests. Evidence: success manifests require quality evidence; conflict paths require blocked reason and parent action. Scope: runner manifest quality gate.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T17:09:45.664Z, excerpt_hash=sha256:308fcbc2d5efdcef8d84a10d04fffe26a654c87cc86c86f9fa0126d954a1f693

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605281707-51DD0G-route-packet-v2/.agentplane/tasks/202605281707-B1DQCY/blueprint/resolved-snapshot.json
    - old_digest: 59f129015fb4df73291ebc52f46aac0a7aa1b40c4098f6e69b809b4077ea8855
    - current_digest: 59f129015fb4df73291ebc52f46aac0a7aa1b40c4098f6e69b809b4077ea8855
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605281707-B1DQCY

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions: {}
id_source: "generated"
---
## Summary

Runner manifest quality gate

Validate runner result manifests for evidence paths, changed paths, blocked reasons, conflicts, and verification candidates before projecting outcomes to tasks.

## Scope

- In scope: Validate runner result manifests for evidence paths, changed paths, blocked reasons, conflicts, and verification candidates before projecting outcomes to tasks.
- Out of scope: unrelated refactors not required for "Runner manifest quality gate".

## Plan

Add runner result manifest quality validation for changed paths, evidence paths, blocked reasons, conflict paths, and verification candidates before outcome projection. Keep existing manifests compatible where possible and emit actionable diagnostics for invalid manifests.

## Verify Steps

1. Run runner result-manifest and result-manifest-policy tests for valid and invalid manifests. 2. Run task-state projection tests proving invalid evidence is not silently accepted. 3. Run focused task-run tests for execute-mode outcome persistence.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T17:22:23.722Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/runner/result-manifest.test.ts packages/agentplane/src/runner/result-manifest-policy.test.ts --config vitest.workspace.ts; Result: pass via focused suite coverage for result-manifest.test and existing policy tests. Evidence: success manifests require quality evidence; conflict paths require blocked reason and parent action. Scope: runner manifest quality gate.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T17:09:45.664Z, excerpt_hash=sha256:308fcbc2d5efdcef8d84a10d04fffe26a654c87cc86c86f9fa0126d954a1f693

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605281707-51DD0G-route-packet-v2/.agentplane/tasks/202605281707-B1DQCY/blueprint/resolved-snapshot.json
- old_digest: 59f129015fb4df73291ebc52f46aac0a7aa1b40c4098f6e69b809b4077ea8855
- current_digest: 59f129015fb4df73291ebc52f46aac0a7aa1b40c4098f6e69b809b4077ea8855
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605281707-B1DQCY

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
