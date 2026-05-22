---
id: "202605222245-V6VTG8"
title: "Narrow pre-push PR-flow test selection for small integrate changes"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "performance"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T22:46:12.328Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T22:48:36.375Z"
  updated_by: "EVALUATOR"
  note: "Evaluator check: pre-push routing is narrowed by path-specific PR integrate bucket while generic PR paths still keep the existing pr bucket; regression coverage asserts pr-flow suites are excluded for integrate internals."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-22T22:48:36.375Z"
  updated_by: "EVALUATOR"
  note: "Evaluator check: pre-push routing is narrowed by path-specific PR integrate bucket while generic PR paths still keep the existing pr bucket; regression coverage asserts pr-flow suites are excluded for integrate internals."
  evaluated_sha: "cb5e1611bfac8dc26796761f3ba48b2988cf80aa"
  blueprint_digest: "8cceb46aad272efd793c6c2cc69c711c27a3f4851d54633ceaa6d195cab8fba1"
  evidence_refs:
    - ".agentplane/tasks/202605222245-V6VTG8/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605222245-V6VTG8-narrow-pr-integrate-ci-selection/.agentplane/tasks/202605222245-V6VTG8/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: narrowing pre-push local CI selection for small PR integrate command changes."
events:
  -
    type: "status"
    at: "2026-05-22T22:46:13.412Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: narrowing pre-push local CI selection for small PR integrate command changes."
  -
    type: "verify"
    at: "2026-05-22T22:48:31.347Z"
    author: "CODER"
    state: "ok"
    note: "Verified: observed PR integrate changed-file set now selects targeted pr-integrate bucket instead of broad pr-flow suites; selector test passes, selected integrate unit suite passes, lint passes, typecheck passes, and local CI explain shows the narrowed route."
  -
    type: "verify"
    at: "2026-05-22T22:48:36.375Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Evaluator check: pre-push routing is narrowed by path-specific PR integrate bucket while generic PR paths still keep the existing pr bucket; regression coverage asserts pr-flow suites are excluded for integrate internals."
doc_version: 3
doc_updated_at: "2026-05-22T22:48:36.403Z"
doc_updated_by: "CODER"
description: "A small protected-base integrate transport change triggered the pre-push fast CI targeted pr selector to run the broad pr-flow Vitest bucket and hang for more than ten minutes. Tighten changed-file routing so focused integrate internals and cmd tests do not fan out to unrelated PR lifecycle suites, or add a bounded timeout/reporting guard for that selector."
sections:
  Summary: |-
    Narrow pre-push PR-flow test selection for small integrate changes

    A small protected-base integrate transport change triggered the pre-push fast CI targeted pr selector to run the broad pr-flow Vitest bucket and hang for more than ten minutes. Tighten changed-file routing so focused integrate internals and cmd tests do not fan out to unrelated PR lifecycle suites, or add a bounded timeout/reporting guard for that selector.
  Scope: |-
    - In scope: A small protected-base integrate transport change triggered the pre-push fast CI targeted pr selector to run the broad pr-flow Vitest bucket and hang for more than ten minutes. Tighten changed-file routing so focused integrate internals and cmd tests do not fan out to unrelated PR lifecycle suites, or add a bounded timeout/reporting guard for that selector.
    - Out of scope: unrelated refactors not required for "Narrow pre-push PR-flow test selection for small integrate changes".
  Plan: |-
    Plan:
    1. Add a narrow local-CI bucket for packages/agentplane/src/commands/pr/integrate/** so command-level integrate changes run command tests instead of every CLI pr-flow suite.
    2. Keep existing broad pr bucket for generic PR command paths and CLI pr-flow tests.
    3. Add selector tests for integrate internals and mixed task artifacts, then run selector tests plus local CI explain for the observed changed-file set.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T22:48:31.347Z — VERIFY — ok

    By: CODER

    Note: Verified: observed PR integrate changed-file set now selects targeted pr-integrate bucket instead of broad pr-flow suites; selector test passes, selected integrate unit suite passes, lint passes, typecheck passes, and local CI explain shows the narrowed route.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T22:46:13.412Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605222245-V6VTG8-narrow-pr-integrate-ci-selection/.agentplane/tasks/202605222245-V6VTG8/blueprint/resolved-snapshot.json
    - old_digest: 8cceb46aad272efd793c6c2cc69c711c27a3f4851d54633ceaa6d195cab8fba1
    - current_digest: 8cceb46aad272efd793c6c2cc69c711c27a3f4851d54633ceaa6d195cab8fba1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605222245-V6VTG8

    ### 2026-05-22T22:48:36.375Z — VERIFY — ok

    By: EVALUATOR

    Note: Evaluator check: pre-push routing is narrowed by path-specific PR integrate bucket while generic PR paths still keep the existing pr bucket; regression coverage asserts pr-flow suites are excluded for integrate internals.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T22:48:31.373Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605222245-V6VTG8-narrow-pr-integrate-ci-selection/.agentplane/tasks/202605222245-V6VTG8/blueprint/resolved-snapshot.json
    - old_digest: 8cceb46aad272efd793c6c2cc69c711c27a3f4851d54633ceaa6d195cab8fba1
    - current_digest: 8cceb46aad272efd793c6c2cc69c711c27a3f4851d54633ceaa6d195cab8fba1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605222245-V6VTG8

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Narrow pre-push PR-flow test selection for small integrate changes

A small protected-base integrate transport change triggered the pre-push fast CI targeted pr selector to run the broad pr-flow Vitest bucket and hang for more than ten minutes. Tighten changed-file routing so focused integrate internals and cmd tests do not fan out to unrelated PR lifecycle suites, or add a bounded timeout/reporting guard for that selector.

## Scope

- In scope: A small protected-base integrate transport change triggered the pre-push fast CI targeted pr selector to run the broad pr-flow Vitest bucket and hang for more than ten minutes. Tighten changed-file routing so focused integrate internals and cmd tests do not fan out to unrelated PR lifecycle suites, or add a bounded timeout/reporting guard for that selector.
- Out of scope: unrelated refactors not required for "Narrow pre-push PR-flow test selection for small integrate changes".

## Plan

Plan:
1. Add a narrow local-CI bucket for packages/agentplane/src/commands/pr/integrate/** so command-level integrate changes run command tests instead of every CLI pr-flow suite.
2. Keep existing broad pr bucket for generic PR command paths and CLI pr-flow tests.
3. Add selector tests for integrate internals and mixed task artifacts, then run selector tests plus local CI explain for the observed changed-file set.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T22:48:31.347Z — VERIFY — ok

By: CODER

Note: Verified: observed PR integrate changed-file set now selects targeted pr-integrate bucket instead of broad pr-flow suites; selector test passes, selected integrate unit suite passes, lint passes, typecheck passes, and local CI explain shows the narrowed route.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T22:46:13.412Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605222245-V6VTG8-narrow-pr-integrate-ci-selection/.agentplane/tasks/202605222245-V6VTG8/blueprint/resolved-snapshot.json
- old_digest: 8cceb46aad272efd793c6c2cc69c711c27a3f4851d54633ceaa6d195cab8fba1
- current_digest: 8cceb46aad272efd793c6c2cc69c711c27a3f4851d54633ceaa6d195cab8fba1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605222245-V6VTG8

### 2026-05-22T22:48:36.375Z — VERIFY — ok

By: EVALUATOR

Note: Evaluator check: pre-push routing is narrowed by path-specific PR integrate bucket while generic PR paths still keep the existing pr bucket; regression coverage asserts pr-flow suites are excluded for integrate internals.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T22:48:31.373Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605222245-V6VTG8-narrow-pr-integrate-ci-selection/.agentplane/tasks/202605222245-V6VTG8/blueprint/resolved-snapshot.json
- old_digest: 8cceb46aad272efd793c6c2cc69c711c27a3f4851d54633ceaa6d195cab8fba1
- current_digest: 8cceb46aad272efd793c6c2cc69c711c27a3f4851d54633ceaa6d195cab8fba1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605222245-V6VTG8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
