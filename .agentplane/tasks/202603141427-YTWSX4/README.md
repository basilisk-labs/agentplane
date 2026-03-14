---
id: "202603141427-YTWSX4"
title: "Stabilize release and rebase integration timeouts for v0.3.7"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
depends_on: []
tags:
  - "code"
  - "release"
verify:
  - "bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/release/local-release-e2e-script.test.ts"
  - "bun x tsc -b packages/core packages/agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T14:27:48.319Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T14:54:13.627Z"
  updated_by: "CODER"
  note: "Targeted rebase/release timeout stabilization passed: the integrate/apply/local-release suites are green, tsc passed, and the remaining full release:prepublish failures are now outside this task's scope."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproduce the remaining release-gate timeout failures across integrate rebase, release apply push coverage, and local release E2E, isolate whether the slowdown is in git orchestration or external workflow stubs, and land the smallest coherent stabilization patch."
events:
  -
    type: "status"
    at: "2026-03-14T14:38:09.265Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the remaining release-gate timeout failures across integrate rebase, release apply push coverage, and local release E2E, isolate whether the slowdown is in git orchestration or external workflow stubs, and land the smallest coherent stabilization patch."
  -
    type: "verify"
    at: "2026-03-14T14:54:13.627Z"
    author: "CODER"
    state: "ok"
    note: "Targeted rebase/release timeout stabilization passed: the integrate/apply/local-release suites are green, tsc passed, and the remaining full release:prepublish failures are now outside this task's scope."
doc_version: 3
doc_updated_at: "2026-03-14T14:54:13.631Z"
doc_updated_by: "CODER"
description: "Diagnose and fix the timeout regressions in rebase-based integrate coverage, release apply push coverage, and local release E2E checks so the 0.3.7 release path can pass the full prepublish gate again."
sections:
  Summary: |-
    Stabilize release and rebase integration timeouts for v0.3.7
    
    Diagnose and fix the timeout regressions in rebase-based integrate coverage, release apply push coverage, and local release E2E checks so the 0.3.7 release path can pass the full prepublish gate again.
  Scope: |-
    - In scope: Diagnose and fix the timeout regressions in rebase-based integrate coverage, release apply push coverage, and local release E2E checks so the 0.3.7 release path can pass the full prepublish gate again.
    - Out of scope: unrelated refactors not required for "Stabilize release and rebase integration timeouts for v0.3.7".
  Plan: "Plan: reproduce the rebase/integrate, release apply push, and local release E2E timeout failures, isolate the slow path or hang in each flow, apply the smallest coherent fix, and rerun the targeted release-critical suites."
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/release/local-release-e2e-script.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T14:54:13.627Z — VERIFY — ok
    
    By: CODER
    
    Note: Targeted rebase/release timeout stabilization passed: the integrate/apply/local-release suites are green, tsc passed, and the remaining full release:prepublish failures are now outside this task's scope.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T14:38:09.267Z, excerpt_hash=sha256:1ccefd628e29359bf28f7b4d1ac4ceb8f84e18c229903bb20e1f92cf96da3818
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Stabilize release and rebase integration timeouts for v0.3.7

Diagnose and fix the timeout regressions in rebase-based integrate coverage, release apply push coverage, and local release E2E checks so the 0.3.7 release path can pass the full prepublish gate again.

## Scope

- In scope: Diagnose and fix the timeout regressions in rebase-based integrate coverage, release apply push coverage, and local release E2E checks so the 0.3.7 release path can pass the full prepublish gate again.
- Out of scope: unrelated refactors not required for "Stabilize release and rebase integration timeouts for v0.3.7".

## Plan

Plan: reproduce the rebase/integrate, release apply push, and local release E2E timeout failures, isolate the slow path or hang in each flow, apply the smallest coherent fix, and rerun the targeted release-critical suites.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/release/local-release-e2e-script.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T14:54:13.627Z — VERIFY — ok

By: CODER

Note: Targeted rebase/release timeout stabilization passed: the integrate/apply/local-release suites are green, tsc passed, and the remaining full release:prepublish failures are now outside this task's scope.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T14:38:09.267Z, excerpt_hash=sha256:1ccefd628e29359bf28f7b4d1ac4ceb8f84e18c229903bb20e1f92cf96da3818

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
