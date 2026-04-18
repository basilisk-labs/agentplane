---
id: "202604181543-N2ZWW2"
title: "Prepare and ship patch release v0.3.14"
result_summary: "Merged via PR #465."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-18T15:45:40.832Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-18T16:01:52.900Z"
  updated_by: "CODER"
  note: "Release checks: local v0.3.14 candidate and release smoke passed."
commit:
  hash: "2568c8cffc5363f691985c954f3850e6949696ce"
  message: "release: Prepare and ship patch release v0.3.14 (N2ZWW2) (#465)"
comments:
  -
    author: "CODER"
    body: "Start: preparing the v0.3.14 patch release from current main, freezing the release route, and validating the exact publish/install path including @agentplaneorg/recipes before any candidate commit is created."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #465 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-18T15:46:09.207Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: preparing the v0.3.14 patch release from current main, freezing the release route, and validating the exact publish/install path including @agentplaneorg/recipes before any candidate commit is created."
  -
    type: "verify"
    at: "2026-04-18T16:01:52.900Z"
    author: "CODER"
    state: "ok"
    note: "Release checks: local v0.3.14 candidate and release smoke passed."
  -
    type: "status"
    at: "2026-04-18T16:04:19.892Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #465 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-18T16:04:19.898Z"
doc_updated_by: "INTEGRATOR"
description: "Generate a fresh release plan from the current 0.3.13 workspace state, apply the next patch bump and release notes, validate the exact release payload including the recipes publish fix, merge it to main, and verify the resulting published install path works end-to-end."
sections:
  Summary: |-
    Prepare and ship patch release v0.3.14
    
    Generate a fresh release plan from the current 0.3.13 workspace state, apply the next patch bump and release notes, validate the exact release payload including the recipes publish fix, merge it to main, and verify the resulting published install path works end-to-end.
  Scope: |-
    - In scope: Generate a fresh release plan from the current 0.3.13 workspace state, apply the next patch bump and release notes, validate the exact release payload including the recipes publish fix, merge it to main, and verify the resulting published install path works end-to-end.
    - Out of scope: unrelated refactors not required for "Prepare and ship patch release v0.3.14".
  Plan: "Release plan: version=v0.3.14, tag=v0.3.14, route=branch_pr release candidate merged to main with hosted publish, scope=refresh patch release plan from current 0.3.13 main, generate release notes, prepare release candidate, validate release payload and npm install path including @agentplaneorg/recipes, merge to main, verify registry publication end-to-end."
  Verify Steps: |-
    1. Review the requested outcome for "Prepare and ship patch release v0.3.14". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-18T16:01:52.900Z — VERIFY — ok
    
    By: CODER
    
    Note: Release checks: local v0.3.14 candidate and release smoke passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-18T15:46:09.252Z, excerpt_hash=sha256:7f4885476dfc20ec70639dda5b4b4e571a44cfb938a3b46366219cc27b3beec4
    
    Details:
    
    Command: bunx vitest run packages/agentplane/src/commands/release/apply.test.ts
    Result: pass (16/16 tests)
    Evidence: release apply tests now cover packages/recipes version bump plus packages/testkit agentplane dependency parity.
    Scope: packages/agentplane/src/commands/release/*.
    
    Command: bun run release:check
    Result: pass
    Evidence: core build, agentplane build, and scripts/release-check.mjs succeeded before the candidate bump.
    Scope: release packaging and parity gates.
    
    Command: agentplane release candidate --plan .agentplane/.release/plan/2026-04-18T15-46-24-093Z
    Result: pass
    Evidence: created commit ✨ N2ZWW2 release: publish v0.3.14 without bun.lock resolution failure.
    Scope: branch_pr release-candidate route for v0.3.14.
    
    Command: bun run test:release:smoke
    Result: pass (3/3 tests)
    Evidence: release smoke suite passed.
    Scope: release-critical upgrade and workflow-runtime paths.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Prepare and ship patch release v0.3.14

Generate a fresh release plan from the current 0.3.13 workspace state, apply the next patch bump and release notes, validate the exact release payload including the recipes publish fix, merge it to main, and verify the resulting published install path works end-to-end.

## Scope

- In scope: Generate a fresh release plan from the current 0.3.13 workspace state, apply the next patch bump and release notes, validate the exact release payload including the recipes publish fix, merge it to main, and verify the resulting published install path works end-to-end.
- Out of scope: unrelated refactors not required for "Prepare and ship patch release v0.3.14".

## Plan

Release plan: version=v0.3.14, tag=v0.3.14, route=branch_pr release candidate merged to main with hosted publish, scope=refresh patch release plan from current 0.3.13 main, generate release notes, prepare release candidate, validate release payload and npm install path including @agentplaneorg/recipes, merge to main, verify registry publication end-to-end.

## Verify Steps

1. Review the requested outcome for "Prepare and ship patch release v0.3.14". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-18T16:01:52.900Z — VERIFY — ok

By: CODER

Note: Release checks: local v0.3.14 candidate and release smoke passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-18T15:46:09.252Z, excerpt_hash=sha256:7f4885476dfc20ec70639dda5b4b4e571a44cfb938a3b46366219cc27b3beec4

Details:

Command: bunx vitest run packages/agentplane/src/commands/release/apply.test.ts
Result: pass (16/16 tests)
Evidence: release apply tests now cover packages/recipes version bump plus packages/testkit agentplane dependency parity.
Scope: packages/agentplane/src/commands/release/*.

Command: bun run release:check
Result: pass
Evidence: core build, agentplane build, and scripts/release-check.mjs succeeded before the candidate bump.
Scope: release packaging and parity gates.

Command: agentplane release candidate --plan .agentplane/.release/plan/2026-04-18T15-46-24-093Z
Result: pass
Evidence: created commit ✨ N2ZWW2 release: publish v0.3.14 without bun.lock resolution failure.
Scope: branch_pr release-candidate route for v0.3.14.

Command: bun run test:release:smoke
Result: pass (3/3 tests)
Evidence: release smoke suite passed.
Scope: release-critical upgrade and workflow-runtime paths.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
