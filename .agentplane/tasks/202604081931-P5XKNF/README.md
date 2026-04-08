---
id: "202604081931-P5XKNF"
title: "Fix pr close-superseded GitHub auth propagation"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-08T19:32:05.775Z"
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
    body: "Start: reproduce the repo-local close-superseded auth failure, fix gh child auth propagation, and cover the path with a focused regression test before integrating the change."
events:
  -
    type: "status"
    at: "2026-04-08T19:32:12.365Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the repo-local close-superseded auth failure, fix gh child auth propagation, and cover the path with a focused regression test before integrating the change."
doc_version: 3
doc_updated_at: "2026-04-08T19:32:12.376Z"
doc_updated_by: "CODER"
description: "Ensure repo-local agentplane can close superseded task PRs using the authenticated gh session without losing auth context in child gh api calls."
sections:
  Summary: |-
    Fix pr close-superseded GitHub auth propagation
    
    Ensure repo-local agentplane can close superseded task PRs using the authenticated gh session without losing auth context in child gh api calls.
  Scope: |-
    - In scope: Ensure repo-local agentplane can close superseded task PRs using the authenticated gh session without losing auth context in child gh api calls.
    - Out of scope: unrelated refactors not required for "Fix pr close-superseded GitHub auth propagation".
  Plan: "1. Reproduce the repo-local pr close-superseded auth path and identify where gh child calls lose the authenticated session. 2. Centralize or extend the GitHub CLI execution environment so close-superseded preserves the same auth context as direct gh usage. 3. Add regression coverage for auth/env propagation in close-superseded and validate the command path with targeted tests."
  Verify Steps: "1. Run the pr close-superseded focused test suite. Expected: it proves the command forwards the authenticated gh environment and closes the matched PR path without auth failures. 2. Run eslint on touched command/test files. Expected: no lint violations in the modified scope. 3. Re-check the command contract diff. Expected: the fix is limited to auth propagation and does not change unrelated PR-close behavior."
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

Fix pr close-superseded GitHub auth propagation

Ensure repo-local agentplane can close superseded task PRs using the authenticated gh session without losing auth context in child gh api calls.

## Scope

- In scope: Ensure repo-local agentplane can close superseded task PRs using the authenticated gh session without losing auth context in child gh api calls.
- Out of scope: unrelated refactors not required for "Fix pr close-superseded GitHub auth propagation".

## Plan

1. Reproduce the repo-local pr close-superseded auth path and identify where gh child calls lose the authenticated session. 2. Centralize or extend the GitHub CLI execution environment so close-superseded preserves the same auth context as direct gh usage. 3. Add regression coverage for auth/env propagation in close-superseded and validate the command path with targeted tests.

## Verify Steps

1. Run the pr close-superseded focused test suite. Expected: it proves the command forwards the authenticated gh environment and closes the matched PR path without auth failures. 2. Run eslint on touched command/test files. Expected: no lint violations in the modified scope. 3. Re-check the command contract diff. Expected: the fix is limited to auth propagation and does not change unrelated PR-close behavior.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
