---
id: "202604081931-P5XKNF"
title: "Fix pr close-superseded GitHub auth propagation"
result_summary: "integrate: squash task/202604081931-P5XKNF/close-superseded-auth"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
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
  state: "ok"
  updated_at: "2026-04-08T19:43:38.928Z"
  updated_by: "REVIEWER"
  note: "Focused pr close-superseded auth/env regression tests passed; eslint passed on touched command and test files; command diff remains limited to shared gh auth propagation for close-superseded and close."
commit:
  hash: "3af2fe2a14bdaa0380da91828768bd36d9bbc780"
  message: "🧩 P5XKNF integrate: github/workflow: Fix pr close-superseded GitHub auth propagation"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the repo-local close-superseded auth failure, fix gh child auth propagation, and cover the path with a focused regression test before integrating the change."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604081931-P5XKNF/pr."
events:
  -
    type: "status"
    at: "2026-04-08T19:32:12.365Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the repo-local close-superseded auth failure, fix gh child auth propagation, and cover the path with a focused regression test before integrating the change."
  -
    type: "verify"
    at: "2026-04-08T19:43:38.928Z"
    author: "REVIEWER"
    state: "ok"
    note: "Focused pr close-superseded auth/env regression tests passed; eslint passed on touched command and test files; command diff remains limited to shared gh auth propagation for close-superseded and close."
  -
    type: "status"
    at: "2026-04-08T19:57:55.636Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604081931-P5XKNF/pr."
doc_version: 3
doc_updated_at: "2026-04-08T19:57:55.642Z"
doc_updated_by: "INTEGRATOR"
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
    ### 2026-04-08T19:43:38.928Z — VERIFY — ok
    
    By: REVIEWER
    
    Note: Focused pr close-superseded auth/env regression tests passed; eslint passed on touched command and test files; command diff remains limited to shared gh auth propagation for close-superseded and close.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T19:32:12.376Z, excerpt_hash=sha256:9267bad68143cf3817bcfaa132de52344c2e3d3bdb594508ee0a2d41d481b2ff
    
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
### 2026-04-08T19:43:38.928Z — VERIFY — ok

By: REVIEWER

Note: Focused pr close-superseded auth/env regression tests passed; eslint passed on touched command and test files; command diff remains limited to shared gh auth propagation for close-superseded and close.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T19:32:12.376Z, excerpt_hash=sha256:9267bad68143cf3817bcfaa132de52344c2e3d3bdb594508ee0a2d41d481b2ff

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
