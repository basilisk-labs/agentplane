---
id: "202608021232-53WJMN"
title: "Audit GitHub issues and pull requests for v0.7.1"
status: "TODO"
priority: "high"
owner: "REVIEWER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "github-audit"
  - "v0.7.1"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "external_system"
  - "network"
blueprint_request: "release.strict"
verify:
  - "gh issue list --state open --limit 200"
  - "gh pr list --state open --limit 200"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-08-02T12:32:24.049Z"
doc_updated_by: "REVIEWER"
description: "Triage all open GitHub issues and pull requests against the exact main candidate, reproduce release-relevant reports, implement or create bounded follow-up tasks for confirmed blockers, close or disposition stale duplicates with evidence, and preserve hosted truth for the release decision."
sections:
  Summary: |-
    Audit GitHub issues and pull requests for v0.7.1

    Triage all open GitHub issues and pull requests against the exact main candidate, reproduce release-relevant reports, implement or create bounded follow-up tasks for confirmed blockers, close or disposition stale duplicates with evidence, and preserve hosted truth for the release decision.
  Scope: |-
    - In scope: Triage all open GitHub issues and pull requests against the exact main candidate, reproduce release-relevant reports, implement or create bounded follow-up tasks for confirmed blockers, close or disposition stale duplicates with evidence, and preserve hosted truth for the release decision.
    - Out of scope: unrelated refactors not required for "Audit GitHub issues and pull requests for v0.7.1".
  Plan: |-
    1. Implement the change for "Audit GitHub issues and pull requests for v0.7.1".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    PLANNER fallback scaffold for "Audit GitHub issues and pull requests for v0.7.1". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Audit GitHub issues and pull requests for v0.7.1". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Audit GitHub issues and pull requests for v0.7.1

Triage all open GitHub issues and pull requests against the exact main candidate, reproduce release-relevant reports, implement or create bounded follow-up tasks for confirmed blockers, close or disposition stale duplicates with evidence, and preserve hosted truth for the release decision.

## Scope

- In scope: Triage all open GitHub issues and pull requests against the exact main candidate, reproduce release-relevant reports, implement or create bounded follow-up tasks for confirmed blockers, close or disposition stale duplicates with evidence, and preserve hosted truth for the release decision.
- Out of scope: unrelated refactors not required for "Audit GitHub issues and pull requests for v0.7.1".

## Plan

1. Implement the change for "Audit GitHub issues and pull requests for v0.7.1".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

PLANNER fallback scaffold for "Audit GitHub issues and pull requests for v0.7.1". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Audit GitHub issues and pull requests for v0.7.1". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
