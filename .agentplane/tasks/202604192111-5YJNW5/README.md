---
id: "202604192111-5YJNW5"
title: "Sync generated agent policy mirrors for push gates"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "maintenance"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T21:11:18.952Z"
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
    body: "Start: sync generated policy mirrors to satisfy agents:check and restore a pushable branch after epic B closure."
events:
  -
    type: "status"
    at: "2026-04-19T21:11:19.396Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: sync generated policy mirrors to satisfy agents:check and restore a pushable branch after epic B closure."
doc_version: 3
doc_updated_at: "2026-04-19T21:11:19.402Z"
doc_updated_by: "CODER"
description: "Pre-push agents:check fails because .agentplane/policy mirrors drifted from packages/agentplane/assets/policy for incidents.md and workflow.direct.md after recent task closures. Regenerate canonical mirrors, verify agents:check, and unblock epic push without mixing in unrelated code changes."
sections:
  Summary: |-
    Sync generated agent policy mirrors for push gates
    
    Pre-push agents:check fails because .agentplane/policy mirrors drifted from packages/agentplane/assets/policy for incidents.md and workflow.direct.md after recent task closures. Regenerate canonical mirrors, verify agents:check, and unblock epic push without mixing in unrelated code changes.
  Scope: |-
    - In scope: Pre-push agents:check fails because .agentplane/policy mirrors drifted from packages/agentplane/assets/policy for incidents.md and workflow.direct.md after recent task closures. Regenerate canonical mirrors, verify agents:check, and unblock epic push without mixing in unrelated code changes.
    - Out of scope: unrelated refactors not required for "Sync generated agent policy mirrors for push gates".
  Plan: "1. Reproduce agents:check drift and confirm only generated mirror files are affected. 2. Regenerate agent/policy mirrors from canonical assets using the supported sync command. 3. Verify agents:check and pre-push gate inputs, then commit only the generated mirror updates needed to unblock the branch push."
  Verify Steps: |-
    1. Review the requested outcome for "Sync generated agent policy mirrors for push gates". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
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

Sync generated agent policy mirrors for push gates

Pre-push agents:check fails because .agentplane/policy mirrors drifted from packages/agentplane/assets/policy for incidents.md and workflow.direct.md after recent task closures. Regenerate canonical mirrors, verify agents:check, and unblock epic push without mixing in unrelated code changes.

## Scope

- In scope: Pre-push agents:check fails because .agentplane/policy mirrors drifted from packages/agentplane/assets/policy for incidents.md and workflow.direct.md after recent task closures. Regenerate canonical mirrors, verify agents:check, and unblock epic push without mixing in unrelated code changes.
- Out of scope: unrelated refactors not required for "Sync generated agent policy mirrors for push gates".

## Plan

1. Reproduce agents:check drift and confirm only generated mirror files are affected. 2. Regenerate agent/policy mirrors from canonical assets using the supported sync command. 3. Verify agents:check and pre-push gate inputs, then commit only the generated mirror updates needed to unblock the branch push.

## Verify Steps

1. Review the requested outcome for "Sync generated agent policy mirrors for push gates". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
