---
id: "202605030854-FNBYFZ"
title: "Harden external distribution publishing"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T08:54:26.272Z"
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
    body: "Start: harden external distribution publication so Homebrew, Scoop, and setup-agentplane PRs are created even when optional repository metadata updates fail."
events:
  -
    type: "status"
    at: "2026-05-03T08:55:10.181Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: harden external distribution publication so Homebrew, Scoop, and setup-agentplane PRs are created even when optional repository metadata updates fail."
doc_version: 3
doc_updated_at: "2026-05-03T08:55:10.181Z"
doc_updated_by: "CODER"
description: "Make Homebrew/Scoop/setup-agentplane external distribution publication open PRs even when repository metadata updates are denied, and make publish reporting distinguish metadata permission failures from missing credentials."
sections:
  Summary: |-
    Harden external distribution publishing
    
    Make Homebrew/Scoop/setup-agentplane external distribution publication open PRs even when repository metadata updates are denied, and make publish reporting distinguish metadata permission failures from missing credentials.
  Scope: |-
    - In scope: Make Homebrew/Scoop/setup-agentplane external distribution publication open PRs even when repository metadata updates are denied, and make publish reporting distinguish metadata permission failures from missing credentials.
    - Out of scope: unrelated refactors not required for "Harden external distribution publishing".
  Plan: "Plan: make publish-external-distribution create/update external distribution PRs before best-effort repository metadata updates; capture metadata permission failures in evidence without blocking file PR creation; make publish-result aggregate external module evidence and fail/flag required external modules when no PR/update occurred; add focused tests for metadata 403 and publish result classification; then open branch_pr and merge after checks."
  Verify Steps: |-
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

Harden external distribution publishing

Make Homebrew/Scoop/setup-agentplane external distribution publication open PRs even when repository metadata updates are denied, and make publish reporting distinguish metadata permission failures from missing credentials.

## Scope

- In scope: Make Homebrew/Scoop/setup-agentplane external distribution publication open PRs even when repository metadata updates are denied, and make publish reporting distinguish metadata permission failures from missing credentials.
- Out of scope: unrelated refactors not required for "Harden external distribution publishing".

## Plan

Plan: make publish-external-distribution create/update external distribution PRs before best-effort repository metadata updates; capture metadata permission failures in evidence without blocking file PR creation; make publish-result aggregate external module evidence and fail/flag required external modules when no PR/update occurred; add focused tests for metadata 403 and publish result classification; then open branch_pr and merge after checks.

## Verify Steps

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
