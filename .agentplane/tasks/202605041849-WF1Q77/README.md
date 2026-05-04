---
id: "202605041849-WF1Q77"
title: "Make diagnostics teach remediation"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-04T18:54:46.669Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-04T19:04:15.599Z"
  updated_by: "CODER"
  note: "Focused remediation diagnostics implementation verified: ACR, workflow doctor, policy routing, and framework runtime dependency surfaces now emit or preserve actionable code, why, fix, safe command, and stop condition guidance with regression coverage."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing shared agent-facing remediation diagnostics in the task worktree, with focused tests for doctor/workflow, ACR, and policy routing surfaces."
events:
  -
    type: "status"
    at: "2026-05-04T18:55:13.702Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing shared agent-facing remediation diagnostics in the task worktree, with focused tests for doctor/workflow, ACR, and policy routing surfaces."
  -
    type: "verify"
    at: "2026-05-04T19:04:15.599Z"
    author: "CODER"
    state: "ok"
    note: "Focused remediation diagnostics implementation verified: ACR, workflow doctor, policy routing, and framework runtime dependency surfaces now emit or preserve actionable code, why, fix, safe command, and stop condition guidance with regression coverage."
doc_version: 3
doc_updated_at: "2026-05-04T19:04:15.604Z"
doc_updated_by: "CODER"
description: "Introduce a shared agent-facing remediation contract for diagnostic failures and apply it to high-value doctor, workflow, ACR, and policy routing surfaces."
sections:
  Summary: |-
    Make diagnostics teach remediation
    
    Introduce a shared agent-facing remediation contract for diagnostic failures and apply it to high-value doctor, workflow, ACR, and policy routing surfaces.
  Scope: |-
    - In scope: Introduce a shared agent-facing remediation contract for diagnostic failures and apply it to high-value doctor, workflow, ACR, and policy routing surfaces.
    - Out of scope: unrelated refactors not required for "Make diagnostics teach remediation".
  Plan: |-
    1. Add a shared diagnostic remediation contract that can render agent-facing guidance with code, why, fix, safe command, and stop condition.
    2. Apply the contract to the highest-value diagnostic surfaces in scope: doctor/workflow diagnostics, ACR validation or check failures, and policy routing/check failures where they currently emit bare errors.
    3. Keep output backward-compatible for existing callers while enriching human/agent text output and preserving machine-readable codes.
    4. Add focused regression tests for the new rendering and at least one integration point per touched surface.
    5. Verify with focused tests, typecheck, git diff checks, framework bootstrap or documented bootstrap blocker, agentplane doctor, and policy routing.
  Verify Steps: |-
    1. Run focused tests for the shared diagnostic remediation contract and each touched integration point. Expected: tests assert code, why, fix, safe command, and stop condition render in agent-facing output without dropping existing diagnostic codes.
    2. Run bun run typecheck. Expected: TypeScript passes for changed diagnostic surfaces.
    3. Run git diff --check. Expected: no whitespace or patch-format issues.
    4. Run bun run framework:dev:bootstrap, or record a concrete pre-existing bootstrap blocker if the local dependency layout remains outside this task's fix. Expected: repo-local runtime can rebuild and explain itself.
    5. Run agentplane doctor and node .agentplane/policy/check-routing.mjs. Expected: both complete, and any diagnostic failure includes actionable remediation fields.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T19:04:15.599Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused remediation diagnostics implementation verified: ACR, workflow doctor, policy routing, and framework runtime dependency surfaces now emit or preserve actionable code, why, fix, safe command, and stop condition guidance with regression coverage.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:55:13.702Z, excerpt_hash=sha256:1d4f09691609a686197d1b20cf2224208a4941cc95b9ac1e8485b8bc5e7bb6b0
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands passed: focused bun tests for workflow/ACR/policy routing plus targeted stale-dist workspace dependency test; bun run typecheck; Prettier check on touched files; ESLint on touched files; bun run arch:check; git diff --check; bun run framework:dev:bootstrap; agentplane doctor; node .agentplane/policy/check-routing.mjs.
      Impact: Diagnostic failures now teach agents the likely cause and safe recovery path instead of only emitting bare failure text; existing diagnostic codes remain stable for tests and automation.
      Resolution: No mandatory check remains skipped. The full stale-dist-readonly file still contains an unrelated pre-existing auto-bootstrap timeout when run under this ad hoc focused bundle; the new workspace dependency test passes independently.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Make diagnostics teach remediation

Introduce a shared agent-facing remediation contract for diagnostic failures and apply it to high-value doctor, workflow, ACR, and policy routing surfaces.

## Scope

- In scope: Introduce a shared agent-facing remediation contract for diagnostic failures and apply it to high-value doctor, workflow, ACR, and policy routing surfaces.
- Out of scope: unrelated refactors not required for "Make diagnostics teach remediation".

## Plan

1. Add a shared diagnostic remediation contract that can render agent-facing guidance with code, why, fix, safe command, and stop condition.
2. Apply the contract to the highest-value diagnostic surfaces in scope: doctor/workflow diagnostics, ACR validation or check failures, and policy routing/check failures where they currently emit bare errors.
3. Keep output backward-compatible for existing callers while enriching human/agent text output and preserving machine-readable codes.
4. Add focused regression tests for the new rendering and at least one integration point per touched surface.
5. Verify with focused tests, typecheck, git diff checks, framework bootstrap or documented bootstrap blocker, agentplane doctor, and policy routing.

## Verify Steps

1. Run focused tests for the shared diagnostic remediation contract and each touched integration point. Expected: tests assert code, why, fix, safe command, and stop condition render in agent-facing output without dropping existing diagnostic codes.
2. Run bun run typecheck. Expected: TypeScript passes for changed diagnostic surfaces.
3. Run git diff --check. Expected: no whitespace or patch-format issues.
4. Run bun run framework:dev:bootstrap, or record a concrete pre-existing bootstrap blocker if the local dependency layout remains outside this task's fix. Expected: repo-local runtime can rebuild and explain itself.
5. Run agentplane doctor and node .agentplane/policy/check-routing.mjs. Expected: both complete, and any diagnostic failure includes actionable remediation fields.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T19:04:15.599Z — VERIFY — ok

By: CODER

Note: Focused remediation diagnostics implementation verified: ACR, workflow doctor, policy routing, and framework runtime dependency surfaces now emit or preserve actionable code, why, fix, safe command, and stop condition guidance with regression coverage.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:55:13.702Z, excerpt_hash=sha256:1d4f09691609a686197d1b20cf2224208a4941cc95b9ac1e8485b8bc5e7bb6b0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands passed: focused bun tests for workflow/ACR/policy routing plus targeted stale-dist workspace dependency test; bun run typecheck; Prettier check on touched files; ESLint on touched files; bun run arch:check; git diff --check; bun run framework:dev:bootstrap; agentplane doctor; node .agentplane/policy/check-routing.mjs.
  Impact: Diagnostic failures now teach agents the likely cause and safe recovery path instead of only emitting bare failure text; existing diagnostic codes remain stable for tests and automation.
  Resolution: No mandatory check remains skipped. The full stale-dist-readonly file still contains an unrelated pre-existing auto-bootstrap timeout when run under this ad hoc focused bundle; the new workspace dependency test passes independently.
  Promotion: incident-candidate
  Fixability: external
