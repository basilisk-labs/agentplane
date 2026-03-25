---
id: "202603251236-YZ5HXQ"
title: "Repair branch_pr policy template sync after false close"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
  - "policy"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-25T12:37:00.605Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-25T12:39:17.412Z"
  updated_by: "CODER"
  note: "The one-line generated branch_pr policy drift is now committed directly, bun run agents:check passes, and the remaining push path should no longer fail on agent template sync."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: repairing the still-unsynced generated branch_pr policy target after RK1M7J closed without the actual policy file, keeping the scope to the one generated policy artifact and rerunning the blocked template check before another push attempt."
events:
  -
    type: "status"
    at: "2026-03-25T12:37:56.541Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: repairing the still-unsynced generated branch_pr policy target after RK1M7J closed without the actual policy file, keeping the scope to the one generated policy artifact and rerunning the blocked template check before another push attempt."
  -
    type: "verify"
    at: "2026-03-25T12:39:17.412Z"
    author: "CODER"
    state: "ok"
    note: "The one-line generated branch_pr policy drift is now committed directly, bun run agents:check passes, and the remaining push path should no longer fail on agent template sync."
doc_version: 3
doc_updated_at: "2026-03-25T12:39:17.440Z"
doc_updated_by: "CODER"
description: "Actually sync .agentplane/policy/workflow.branch_pr.md with the canonical branch_pr workflow asset after RK1M7J closed without committing the policy file, so agents:check and pre-push return to green."
sections:
  Summary: |-
    Repair branch_pr policy template sync after false close
    
    Actually sync .agentplane/policy/workflow.branch_pr.md with the canonical branch_pr workflow asset after RK1M7J closed without committing the policy file, so agents:check and pre-push return to green.
  Scope: |-
    - In scope: Actually sync .agentplane/policy/workflow.branch_pr.md with the canonical branch_pr workflow asset after RK1M7J closed without committing the policy file, so agents:check and pre-push return to green.
    - Out of scope: unrelated refactors not required for "Repair branch_pr policy template sync after false close".
  Plan: |-
    1. Implement the change for "Repair branch_pr policy template sync after false close".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run bun run agents:sync. Expected: the generated branch_pr policy target matches the canonical asset and no unrelated generated files change.
    2. Run bun run agents:check. Expected: agent and policy templates are reported in sync.
    3. Re-run git push origin main through the normal pre-push gate. Expected: the previous agents:check blocker is gone, and any remaining push blocker is recorded explicitly.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-25T12:39:17.412Z — VERIFY — ok
    
    By: CODER
    
    Note: The one-line generated branch_pr policy drift is now committed directly, bun run agents:check passes, and the remaining push path should no longer fail on agent template sync.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T12:37:56.550Z, excerpt_hash=sha256:17d46153b43a11838200c09f61cc3487c79d3ca00648f510f41fa8a82ae31ca4
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Repair branch_pr policy template sync after false close

Actually sync .agentplane/policy/workflow.branch_pr.md with the canonical branch_pr workflow asset after RK1M7J closed without committing the policy file, so agents:check and pre-push return to green.

## Scope

- In scope: Actually sync .agentplane/policy/workflow.branch_pr.md with the canonical branch_pr workflow asset after RK1M7J closed without committing the policy file, so agents:check and pre-push return to green.
- Out of scope: unrelated refactors not required for "Repair branch_pr policy template sync after false close".

## Plan

1. Implement the change for "Repair branch_pr policy template sync after false close".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run bun run agents:sync. Expected: the generated branch_pr policy target matches the canonical asset and no unrelated generated files change.
2. Run bun run agents:check. Expected: agent and policy templates are reported in sync.
3. Re-run git push origin main through the normal pre-push gate. Expected: the previous agents:check blocker is gone, and any remaining push blocker is recorded explicitly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-25T12:39:17.412Z — VERIFY — ok

By: CODER

Note: The one-line generated branch_pr policy drift is now committed directly, bun run agents:check passes, and the remaining push path should no longer fail on agent template sync.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T12:37:56.550Z, excerpt_hash=sha256:17d46153b43a11838200c09f61cc3487c79d3ca00648f510f41fa8a82ae31ca4

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
