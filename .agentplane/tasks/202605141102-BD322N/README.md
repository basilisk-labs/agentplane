---
id: "202605141102-BD322N"
title: "Release AgentPlane v0.6.0"
status: "DOING"
priority: "high"
owner: "INTEGRATOR"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "quality"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T11:02:30.051Z"
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
    author: "INTEGRATOR"
    body: "Start: prepare AgentPlane v0.6.0 release candidate from the verified main state, rerun full readiness checks, merge the candidate, dispatch hosted publish, and record publication evidence."
events:
  -
    type: "status"
    at: "2026-05-14T11:02:44.702Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: prepare AgentPlane v0.6.0 release candidate from the verified main state, rerun full readiness checks, merge the candidate, dispatch hosted publish, and record publication evidence."
doc_version: 3
doc_updated_at: "2026-05-14T11:02:44.702Z"
doc_updated_by: "INTEGRATOR"
description: "Prepare, verify, publish, and record AgentPlane v0.6.0 from the current green main state. Scope includes release plan, candidate branch, release notes/version parity, full local readiness checks, GitHub candidate merge, hosted publish dispatch, and publication verification."
sections:
  Summary: |-
    Release AgentPlane v0.6.0
    
    Prepare, verify, publish, and record AgentPlane v0.6.0 from the current green main state. Scope includes release plan, candidate branch, release notes/version parity, full local readiness checks, GitHub candidate merge, hosted publish dispatch, and publication verification.
  Scope: |-
    - In scope: Prepare, verify, publish, and record AgentPlane v0.6.0 from the current green main state. Scope includes release plan, candidate branch, release notes/version parity, full local readiness checks, GitHub candidate merge, hosted publish dispatch, and publication verification.
    - Out of scope: unrelated refactors not required for "Release AgentPlane v0.6.0".
  Plan: "Release plan: version=0.6.0, tag=v0.6.0, workflow=branch_pr. Scope: regenerate release plan/notes, prepare candidate with agentplane release candidate --push --yes, rerun full local readiness gates including docs:cli:check, release:check, policy routing, platform-critical tests, and empty-folder context assimilation smoke; merge the candidate via GitHub after green checks; dispatch GitHub Publish to npm for the merged release commit; verify tag/release/npm package availability and record evidence. Stop if version/tag changes, incidents become active, checks fail, npm version is unavailable, or hosted publish cannot be verified."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

Release AgentPlane v0.6.0

Prepare, verify, publish, and record AgentPlane v0.6.0 from the current green main state. Scope includes release plan, candidate branch, release notes/version parity, full local readiness checks, GitHub candidate merge, hosted publish dispatch, and publication verification.

## Scope

- In scope: Prepare, verify, publish, and record AgentPlane v0.6.0 from the current green main state. Scope includes release plan, candidate branch, release notes/version parity, full local readiness checks, GitHub candidate merge, hosted publish dispatch, and publication verification.
- Out of scope: unrelated refactors not required for "Release AgentPlane v0.6.0".

## Plan

Release plan: version=0.6.0, tag=v0.6.0, workflow=branch_pr. Scope: regenerate release plan/notes, prepare candidate with agentplane release candidate --push --yes, rerun full local readiness gates including docs:cli:check, release:check, policy routing, platform-critical tests, and empty-folder context assimilation smoke; merge the candidate via GitHub after green checks; dispatch GitHub Publish to npm for the merged release commit; verify tag/release/npm package availability and record evidence. Stop if version/tag changes, incidents become active, checks fail, npm version is unavailable, or hosted publish cannot be verified.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
