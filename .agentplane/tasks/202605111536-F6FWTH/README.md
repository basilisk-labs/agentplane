---
id: "202605111536-F6FWTH"
title: "Harden wait-remote-pr-checks argument parsing"
result_summary: "Merged via PR #3594."
status: "DONE"
priority: "med"
owner: "INTEGRATOR"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-11T15:36:49.565Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-11T15:36:53.765Z"
  updated_by: "INTEGRATOR"
  note: "Fixed unknown --* option handling in scripts/wait-remote-pr-checks.mjs and added regression coverage in packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts; no behavior change beyond CLI validation."
  attempts: 0
commit:
  hash: "8fe62d47afeecea373405fa91477677f846c19ce"
  message: "🚧 F6FWTH task: Harden wait-remote-pr-checks argument parsing [202605111536-F6FWTH] (#3594)"
comments:
  -
    author: "INTEGRATOR"
    body: "Start: owner executing requested CLI rough-edge fix. Scope is script argument validation guard + regression test. Evidence from targeted CLI test suite and docs checks will be recorded in verify step."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3594 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-11T15:36:50.662Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: owner executing requested CLI rough-edge fix. Scope is script argument validation guard + regression test. Evidence from targeted CLI test suite and docs checks will be recorded in verify step."
  -
    type: "verify"
    at: "2026-05-11T15:36:53.765Z"
    author: "INTEGRATOR"
    state: "ok"
    note: "Fixed unknown --* option handling in scripts/wait-remote-pr-checks.mjs and added regression coverage in packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts; no behavior change beyond CLI validation."
  -
    type: "status"
    at: "2026-05-12T09:44:22.347Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3594 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-12T09:44:22.355Z"
doc_updated_by: "INTEGRATOR"
description: "Unknown --* option should fail fast with explicit error and no GitHub calls; add regression test and keep parse behavior stable."
sections:
  Summary: |-
    Harden wait-remote-pr-checks argument parsing
    
    Unknown --* option should fail fast with explicit error and no GitHub calls; add regression test and keep parse behavior stable.
  Scope: |-
    - In scope: Unknown --* option should fail fast with explicit error and no GitHub calls; add regression test and keep parse behavior stable.
    - Out of scope: unrelated refactors not required for "Harden wait-remote-pr-checks argument parsing".
  Plan: "Fix parseArgs in scripts/wait-remote-pr-checks.mjs to reject unknown --* args; add regression tests and keep script behavior deterministic."
  Verify Steps: |-
    1. Review the requested outcome for "Harden wait-remote-pr-checks argument parsing". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-11T15:36:53.765Z — VERIFY — ok
    
    By: INTEGRATOR
    
    Note: Fixed unknown --* option handling in scripts/wait-remote-pr-checks.mjs and added regression coverage in packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts; no behavior change beyond CLI validation.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-11T15:36:50.676Z, excerpt_hash=sha256:5bd873274e8cee03bc0f5f842d759bb6f9ada289ff597053bea70dfb81e647bf
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605111536-F6FWTH/blueprint/resolved-snapshot.json
    - old_digest: eaefbf69d06b32fc0f70f948502112ce5a45976f3142719f1e6a3e9b20f45a9e
    - current_digest: eaefbf69d06b32fc0f70f948502112ce5a45976f3142719f1e6a3e9b20f45a9e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605111536-F6FWTH
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Discovered that full CLI suite (packages/agentplane/src/cli) has existing unrelated failures in finish/upgrade/init and pr lifecycle areas under this environment.
      Impact: No direct user-facing regressions in script behavior; deterministic fast-fail for malformed flags.
      Resolution: Added parse guard and regression test; execution checks pass for targeted suites.
id_source: "generated"
---
## Summary

Harden wait-remote-pr-checks argument parsing

Unknown --* option should fail fast with explicit error and no GitHub calls; add regression test and keep parse behavior stable.

## Scope

- In scope: Unknown --* option should fail fast with explicit error and no GitHub calls; add regression test and keep parse behavior stable.
- Out of scope: unrelated refactors not required for "Harden wait-remote-pr-checks argument parsing".

## Plan

Fix parseArgs in scripts/wait-remote-pr-checks.mjs to reject unknown --* args; add regression tests and keep script behavior deterministic.

## Verify Steps

1. Review the requested outcome for "Harden wait-remote-pr-checks argument parsing". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-11T15:36:53.765Z — VERIFY — ok

By: INTEGRATOR

Note: Fixed unknown --* option handling in scripts/wait-remote-pr-checks.mjs and added regression coverage in packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts; no behavior change beyond CLI validation.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-11T15:36:50.676Z, excerpt_hash=sha256:5bd873274e8cee03bc0f5f842d759bb6f9ada289ff597053bea70dfb81e647bf

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605111536-F6FWTH/blueprint/resolved-snapshot.json
- old_digest: eaefbf69d06b32fc0f70f948502112ce5a45976f3142719f1e6a3e9b20f45a9e
- current_digest: eaefbf69d06b32fc0f70f948502112ce5a45976f3142719f1e6a3e9b20f45a9e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605111536-F6FWTH

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Discovered that full CLI suite (packages/agentplane/src/cli) has existing unrelated failures in finish/upgrade/init and pr lifecycle areas under this environment.
  Impact: No direct user-facing regressions in script behavior; deterministic fast-fail for malformed flags.
  Resolution: Added parse guard and regression test; execution checks pass for targeted suites.
