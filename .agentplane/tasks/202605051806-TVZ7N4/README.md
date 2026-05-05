---
id: "202605051806-TVZ7N4"
title: "Add cloud backend CLI connection surface"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "cloud"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T18:07:08.447Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T18:21:09.619Z"
  updated_by: "CODER"
  note: "Verified: backend connect cloud writes endpoint/project/provider metadata, leaves tokens out of backend JSON, and backend inspect prints connection/freshness metadata."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Add the neutral cloud backend CLI connection surface in the shared batch worktree, keeping provider-specific setup outside local init."
events:
  -
    type: "status"
    at: "2026-05-05T18:07:45.663Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add the neutral cloud backend CLI connection surface in the shared batch worktree, keeping provider-specific setup outside local init."
  -
    type: "verify"
    at: "2026-05-05T18:21:09.619Z"
    author: "CODER"
    state: "ok"
    note: "Verified: backend connect cloud writes endpoint/project/provider metadata, leaves tokens out of backend JSON, and backend inspect prints connection/freshness metadata."
doc_version: 3
doc_updated_at: "2026-05-05T18:21:09.625Z"
doc_updated_by: "CODER"
description: "Add a neutral CLI surface for configuring a cloud backend endpoint and connection metadata, including actionable inspect output for users who connect AgentPlane to a hosted sync implementation."
sections:
  Summary: |-
    Add cloud backend CLI connection surface
    
    Add a neutral CLI surface for configuring a cloud backend endpoint and connection metadata, including actionable inspect output for users who connect AgentPlane to a hosted sync implementation.
  Scope: |-
    - In scope: Add a neutral CLI surface for configuring a cloud backend endpoint and connection metadata, including actionable inspect output for users who connect AgentPlane to a hosted sync implementation.
    - Out of scope: unrelated refactors not required for "Add cloud backend CLI connection surface".
  Plan: "Epic E3: Cloud backend CLI connection surface. Scope: expose neutral CLI support for configuring or inspecting a cloud backend endpoint and connection metadata, so users can connect AgentPlane to a hosted sync implementation without choosing GitHub Projects inside local init. Verify: CLI parser tests and inspect behavior tests."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T18:21:09.619Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: backend connect cloud writes endpoint/project/provider metadata, leaves tokens out of backend JSON, and backend inspect prints connection/freshness metadata.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T18:07:45.663Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun test packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts; Result: pass; Evidence: 14 pass, 0 fail. Command: bun test packages/agentplane/src/cli/run-cli.core.help-snap.test.ts; Result: pass before generated duplicate snapshot cleanup; Evidence: 14 pass, 0 fail.
      Impact: Users get a neutral cloud connection surface without choosing GitHub Projects in local init.
      Resolution: Use AGENTPLANE_CLOUD_TOKEN or local secret storage for auth; backend JSON remains non-secret.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Add cloud backend CLI connection surface

Add a neutral CLI surface for configuring a cloud backend endpoint and connection metadata, including actionable inspect output for users who connect AgentPlane to a hosted sync implementation.

## Scope

- In scope: Add a neutral CLI surface for configuring a cloud backend endpoint and connection metadata, including actionable inspect output for users who connect AgentPlane to a hosted sync implementation.
- Out of scope: unrelated refactors not required for "Add cloud backend CLI connection surface".

## Plan

Epic E3: Cloud backend CLI connection surface. Scope: expose neutral CLI support for configuring or inspecting a cloud backend endpoint and connection metadata, so users can connect AgentPlane to a hosted sync implementation without choosing GitHub Projects inside local init. Verify: CLI parser tests and inspect behavior tests.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T18:21:09.619Z — VERIFY — ok

By: CODER

Note: Verified: backend connect cloud writes endpoint/project/provider metadata, leaves tokens out of backend JSON, and backend inspect prints connection/freshness metadata.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T18:07:45.663Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bun test packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts; Result: pass; Evidence: 14 pass, 0 fail. Command: bun test packages/agentplane/src/cli/run-cli.core.help-snap.test.ts; Result: pass before generated duplicate snapshot cleanup; Evidence: 14 pass, 0 fail.
  Impact: Users get a neutral cloud connection surface without choosing GitHub Projects in local init.
  Resolution: Use AGENTPLANE_CLOUD_TOKEN or local secret storage for auth; backend JSON remains non-secret.
  Promotion: incident-candidate
  Fixability: external
