---
id: "202603251226-RK1M7J"
title: "Sync branch_pr policy template after workflow changes"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
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
  updated_at: "2026-03-25T12:28:56.314Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-25T12:30:48.406Z"
  updated_by: "CODER"
  note: "Generated template sync is clean: bun run agents:sync reduced the drift to a single generated policy file, bun run agents:check passed, and the branch_pr policy template now matches canonical assets again."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: syncing generated agent and policy templates from canonical assets inside a dedicated branch_pr worktree, confirming the diff stays limited to generated files, and using that sync to clear the local pre-push blocker before retrying push."
events:
  -
    type: "status"
    at: "2026-03-25T12:30:23.859Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: syncing generated agent and policy templates from canonical assets inside a dedicated branch_pr worktree, confirming the diff stays limited to generated files, and using that sync to clear the local pre-push blocker before retrying push."
  -
    type: "verify"
    at: "2026-03-25T12:30:48.406Z"
    author: "CODER"
    state: "ok"
    note: "Generated template sync is clean: bun run agents:sync reduced the drift to a single generated policy file, bun run agents:check passed, and the branch_pr policy template now matches canonical assets again."
doc_version: 3
doc_updated_at: "2026-03-25T12:30:48.415Z"
doc_updated_by: "CODER"
description: "Refresh generated agent and policy templates so local .agentplane/agents and .agentplane/policy match canonical assets again, unblock pre-push, and keep the branch_pr gateway text in sync with the shipped framework templates."
sections:
  Summary: |-
    Sync branch_pr policy template after workflow changes
    
    Refresh generated agent and policy templates so local .agentplane/agents and .agentplane/policy match canonical assets again, unblock pre-push, and keep the branch_pr gateway text in sync with the shipped framework templates.
  Scope: |-
    - In scope: Refresh generated agent and policy templates so local .agentplane/agents and .agentplane/policy match canonical assets again, unblock pre-push, and keep the branch_pr gateway text in sync with the shipped framework templates.
    - Out of scope: unrelated refactors not required for "Sync branch_pr policy template after workflow changes".
  Plan: |-
    1. Confirm the exact canonical-vs-generated drift and keep the fix scoped to generated agent/policy artifacts only.
    2. Run bun run agents:sync, inspect the resulting diff, and verify that only the intended generated files changed.
    3. Run the smallest blocking checks for this drift, record verification evidence, and return to push once pre-push is unblocked.
  Verify Steps: |-
    1. Run bun run agents:sync. Expected: generated agent and policy templates match canonical assets with no unrelated file drift.
    2. Run bun run agents:check. Expected: agent templates and policy templates are reported in sync.
    3. Re-run git push origin main through the normal pre-push gate. Expected: the previous agents:check blocker is gone, and any remaining push blocker is recorded explicitly.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-25T12:30:48.406Z — VERIFY — ok
    
    By: CODER
    
    Note: Generated template sync is clean: bun run agents:sync reduced the drift to a single generated policy file, bun run agents:check passed, and the branch_pr policy template now matches canonical assets again.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T12:30:23.880Z, excerpt_hash=sha256:80451ae6733b5826d0be2a7e2fba2a7bfb30299a7908565ce29342748fe160dc
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Sync branch_pr policy template after workflow changes

Refresh generated agent and policy templates so local .agentplane/agents and .agentplane/policy match canonical assets again, unblock pre-push, and keep the branch_pr gateway text in sync with the shipped framework templates.

## Scope

- In scope: Refresh generated agent and policy templates so local .agentplane/agents and .agentplane/policy match canonical assets again, unblock pre-push, and keep the branch_pr gateway text in sync with the shipped framework templates.
- Out of scope: unrelated refactors not required for "Sync branch_pr policy template after workflow changes".

## Plan

1. Confirm the exact canonical-vs-generated drift and keep the fix scoped to generated agent/policy artifacts only.
2. Run bun run agents:sync, inspect the resulting diff, and verify that only the intended generated files changed.
3. Run the smallest blocking checks for this drift, record verification evidence, and return to push once pre-push is unblocked.

## Verify Steps

1. Run bun run agents:sync. Expected: generated agent and policy templates match canonical assets with no unrelated file drift.
2. Run bun run agents:check. Expected: agent templates and policy templates are reported in sync.
3. Re-run git push origin main through the normal pre-push gate. Expected: the previous agents:check blocker is gone, and any remaining push blocker is recorded explicitly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-25T12:30:48.406Z — VERIFY — ok

By: CODER

Note: Generated template sync is clean: bun run agents:sync reduced the drift to a single generated policy file, bun run agents:check passed, and the branch_pr policy template now matches canonical assets again.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T12:30:23.880Z, excerpt_hash=sha256:80451ae6733b5826d0be2a7e2fba2a7bfb30299a7908565ce29342748fe160dc

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
