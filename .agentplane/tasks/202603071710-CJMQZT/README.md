---
id: "202603071710-CJMQZT"
title: "Guarantee full local framework install for development"
result_summary: "Framework contributors now have a deterministic global dev-install flow with runtime verification for both agentplane and @agentplaneorg/core."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T17:38:25.544Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: start the next-release P0 track by making framework development installs deterministic and verifiable from the local checkout."
verification:
  state: "ok"
  updated_at: "2026-03-07T18:09:49.874Z"
  updated_by: "CODER"
  note: "Added a global-install verifier that checks the runtime-resolved agentplane and @agentplaneorg/core build manifests against the current checkout; updated the reinstall helper to reinstall both packages and run the verifier; local checks passed: vitest verify-global-install-script.test.ts, lint:core on the new script/test, verifier --help, website build, routing check."
commit:
  hash: "87b249895fa294cfa71ecefbdef274b2570eb4d2"
  message: "🛠️ CJMQZT task: verify local global framework installs"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: audit the current framework-dev install path, make the local checkout the deterministic runtime source for both agentplane and core during framework development, and document the resulting install workflow."
  -
    author: "CODER"
    body: "Verified: the framework development reinstall flow now rebuilds both local packages, reinstalls both globally from the checkout, and verifies that global agentplane resolves the local checkout builds instead of a published core fallback."
events:
  -
    type: "status"
    at: "2026-03-07T17:38:29.454Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: audit the current framework-dev install path, make the local checkout the deterministic runtime source for both agentplane and core during framework development, and document the resulting install workflow."
  -
    type: "verify"
    at: "2026-03-07T18:09:49.874Z"
    author: "CODER"
    state: "ok"
    note: "Added a global-install verifier that checks the runtime-resolved agentplane and @agentplaneorg/core build manifests against the current checkout; updated the reinstall helper to reinstall both packages and run the verifier; local checks passed: vitest verify-global-install-script.test.ts, lint:core on the new script/test, verifier --help, website build, routing check."
  -
    type: "status"
    at: "2026-03-07T18:09:58.355Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the framework development reinstall flow now rebuilds both local packages, reinstalls both globally from the checkout, and verifies that global agentplane resolves the local checkout builds instead of a published core fallback."
doc_version: 2
doc_updated_at: "2026-03-07T18:09:58.355Z"
doc_updated_by: "CODER"
description: "Make the framework development install flow guarantee that both agentplane and @agentplaneorg/core come from the current checkout, not from published registry resolution."
id_source: "generated"
---
## Summary

Guarantee full local framework install for development

Make the framework development install flow guarantee that both agentplane and @agentplaneorg/core come from the current checkout, not from published registry resolution.

## Scope

- In scope: Make the framework development install flow guarantee that both agentplane and @agentplaneorg/core come from the current checkout, not from published registry resolution..
- Out of scope: unrelated refactors not required for "Guarantee full local framework install for development".

## Plan

1. Audit the current framework development install path, especially scripts/reinstall-global-agentplane.sh and workspace dependency resolution for @agentplaneorg/core. 2. Design a deterministic developer install flow that guarantees the global CLI resolves both agentplane and core from the local checkout. 3. Implement the chosen install path, add diagnostics or tests that prove the active runtime stack is local, and document the development workflow.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- Add explicit checks/commands for this task before approval.

### Evidence / Commands
- Record executed commands and key outputs.

### Pass criteria
- Steps are reproducible and produce expected results.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T18:09:49.874Z — VERIFY — ok

By: CODER

Note: Added a global-install verifier that checks the runtime-resolved agentplane and @agentplaneorg/core build manifests against the current checkout; updated the reinstall helper to reinstall both packages and run the verifier; local checks passed: vitest verify-global-install-script.test.ts, lint:core on the new script/test, verifier --help, website build, routing check.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T17:38:29.454Z, excerpt_hash=sha256:682d5674a3bb4d925efca0f9cabc057c814315f01dc448e2879b94eecb1a7911

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
