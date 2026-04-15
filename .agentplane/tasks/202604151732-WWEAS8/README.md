---
id: "202604151732-WWEAS8"
title: "Require exact artifact identity for workflow_dispatch release-ready resolution"
result_summary: "Merged via PR #323."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-15T17:36:36.265Z"
  updated_by: "CODER"
  note: "Verified exact artifact identity tightening locally."
commit:
  hash: "d7d52f7bbfe3e5fc4ccf51c74eecafc3744de9d6"
  message: "release: Require exact artifact identity for workflow_dispatch release-ready r... (WWEAS8) (#323)"
comments:
  -
    author: "CODER"
    body: "Start: tightening workflow_dispatch release-ready resolution so mismatched runs only satisfy requested SHAs through exact alias artifacts, then replaying manual publish on main to verify that publish consumes the resolved release candidate instead of the dispatch head."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #323 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-15T17:34:16.173Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: tightening workflow_dispatch release-ready resolution so mismatched runs only satisfy requested SHAs through exact alias artifacts, then replaying manual publish on main to verify that publish consumes the resolved release candidate instead of the dispatch head."
  -
    type: "verify"
    at: "2026-04-15T17:36:36.265Z"
    author: "CODER"
    state: "ok"
    note: "Verified exact artifact identity tightening locally."
  -
    type: "status"
    at: "2026-04-15T17:43:34.896Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #323 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-15T17:43:34.902Z"
doc_updated_by: "INTEGRATOR"
description: "workflow_dispatch publish currently accepts a generic release-ready artifact from a mismatched run, which lets detect resolve the dispatch head instead of the true release candidate and makes publish fail on manifest sha mismatch."
sections:
  Summary: |-
    Require exact artifact identity for workflow_dispatch release-ready resolution
    
    workflow_dispatch publish currently accepts a generic release-ready artifact from a mismatched run, which lets detect resolve the dispatch head instead of the true release candidate and makes publish fail on manifest sha mismatch.
  Scope: |-
    - In scope: workflow_dispatch publish currently accepts a generic release-ready artifact from a mismatched run, which lets detect resolve the dispatch head instead of the true release candidate and makes publish fail on manifest sha mismatch.
    - Out of scope: unrelated refactors not required for "Require exact artifact identity for workflow_dispatch release-ready resolution".
  Plan: "1. Tighten workflow_dispatch release-ready resolution so mismatched runs only satisfy a requested sha via exact alias artifacts, never via the generic release-ready name; verify: resolver tests cover negative mismatched-generic and positive mismatched-alias cases. 2. Re-run the manual publish flow on main after the fix; verify: detect resolves the intended release candidate sha instead of dispatch head and publish advances further than the previous manifest mismatch point. 3. If publish then succeeds, record tag/npm evidence for the pending patch release."
  Verify Steps: |-
    1. Review the requested outcome for "Require exact artifact identity for workflow_dispatch release-ready resolution". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-15T17:36:36.265Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified exact artifact identity tightening locally.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T17:34:16.207Z, excerpt_hash=sha256:7e514779baf93b826fe19ef38e656d6ae9127c39ddf16302033130565519fafe
    
    Details:
    
    Command: bun vitest run packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts
    Result: pass
    Evidence: 10 tests passed, including negative mismatched-generic cases and positive exact-alias cases.
    Scope: release-ready resolver identity rules for workflow_dispatch and explicit run-id recovery.
    
    Command: export GITHUB_REPOSITORY=basilisk-labs/agentplane GITHUB_TOKEN="$(gh auth token)"; node scripts/resolve-release-ready-source.mjs --workflow ci.yml --sha 8566687a2ff9bb433d6887eb955e04bef0f785df --json
    Result: pass
    Evidence: returned state=workflow_missing for the close-commit SHA instead of falsely accepting a mismatched generic artifact.
    Scope: exact release-ready resolution for branch_pr main close head.
    
    Command: export GITHUB_REPOSITORY=basilisk-labs/agentplane GITHUB_TOKEN="$(gh auth token)"; while IFS= read -r candidate; do if node scripts/resolve-release-ready-source.mjs --workflow ci.yml --sha "$candidate" --json > /tmp/wweas8-source.json 2>/tmp/wweas8-source.err; then echo "$candidate"; cat /tmp/wweas8-source.json; break; fi; done < <(git rev-list --first-parent --max-count=16 origin/main)
    Result: pass
    Evidence: first reachable release-ready candidate resolved to ec423be77f058a79d09dc1dd2f02436a445f72a1 and the payload reported ready_artifact_available for version 0.3.12.
    Scope: branch_pr main manual publish candidate discovery after exact-artifact tightening.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Require exact artifact identity for workflow_dispatch release-ready resolution

workflow_dispatch publish currently accepts a generic release-ready artifact from a mismatched run, which lets detect resolve the dispatch head instead of the true release candidate and makes publish fail on manifest sha mismatch.

## Scope

- In scope: workflow_dispatch publish currently accepts a generic release-ready artifact from a mismatched run, which lets detect resolve the dispatch head instead of the true release candidate and makes publish fail on manifest sha mismatch.
- Out of scope: unrelated refactors not required for "Require exact artifact identity for workflow_dispatch release-ready resolution".

## Plan

1. Tighten workflow_dispatch release-ready resolution so mismatched runs only satisfy a requested sha via exact alias artifacts, never via the generic release-ready name; verify: resolver tests cover negative mismatched-generic and positive mismatched-alias cases. 2. Re-run the manual publish flow on main after the fix; verify: detect resolves the intended release candidate sha instead of dispatch head and publish advances further than the previous manifest mismatch point. 3. If publish then succeeds, record tag/npm evidence for the pending patch release.

## Verify Steps

1. Review the requested outcome for "Require exact artifact identity for workflow_dispatch release-ready resolution". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-15T17:36:36.265Z — VERIFY — ok

By: CODER

Note: Verified exact artifact identity tightening locally.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T17:34:16.207Z, excerpt_hash=sha256:7e514779baf93b826fe19ef38e656d6ae9127c39ddf16302033130565519fafe

Details:

Command: bun vitest run packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts
Result: pass
Evidence: 10 tests passed, including negative mismatched-generic cases and positive exact-alias cases.
Scope: release-ready resolver identity rules for workflow_dispatch and explicit run-id recovery.

Command: export GITHUB_REPOSITORY=basilisk-labs/agentplane GITHUB_TOKEN="$(gh auth token)"; node scripts/resolve-release-ready-source.mjs --workflow ci.yml --sha 8566687a2ff9bb433d6887eb955e04bef0f785df --json
Result: pass
Evidence: returned state=workflow_missing for the close-commit SHA instead of falsely accepting a mismatched generic artifact.
Scope: exact release-ready resolution for branch_pr main close head.

Command: export GITHUB_REPOSITORY=basilisk-labs/agentplane GITHUB_TOKEN="$(gh auth token)"; while IFS= read -r candidate; do if node scripts/resolve-release-ready-source.mjs --workflow ci.yml --sha "$candidate" --json > /tmp/wweas8-source.json 2>/tmp/wweas8-source.err; then echo "$candidate"; cat /tmp/wweas8-source.json; break; fi; done < <(git rev-list --first-parent --max-count=16 origin/main)
Result: pass
Evidence: first reachable release-ready candidate resolved to ec423be77f058a79d09dc1dd2f02436a445f72a1 and the payload reported ready_artifact_available for version 0.3.12.
Scope: branch_pr main manual publish candidate discovery after exact-artifact tightening.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
