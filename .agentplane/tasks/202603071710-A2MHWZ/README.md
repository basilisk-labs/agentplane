---
id: "202603071710-A2MHWZ"
title: "Add runtime source diagnostics"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on:
  - "202603071710-CJMQZT"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T18:20:32.921Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: add a runtime explain surface and align doctor diagnostics around active binary/source facts before continuing the post-0.3.2 P0 track."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: add explicit runtime-source diagnostics so one command can explain which binary is active, where it comes from, and whether the current process is using global install, repo-local handoff, or another runtime source."
events:
  -
    type: "status"
    at: "2026-03-07T18:19:59.581Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: add explicit runtime-source diagnostics so one command can explain which binary is active, where it comes from, and whether the current process is using global install, repo-local handoff, or another runtime source."
doc_version: 2
doc_updated_at: "2026-03-07T18:20:25.140Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add a runtime explain surface and doctor diagnostics that show the active binary path, source mode, package versions, and framework source roots."
id_source: "generated"
---
## Summary

Add runtime source diagnostics

Add a runtime explain surface and doctor diagnostics that show the active binary path, source mode, package versions, and framework source roots.

## Scope

- In scope: Add a runtime explain surface and doctor diagnostics that show the active binary path, source mode, package versions, and framework source roots..
- Out of scope: unrelated refactors not required for "Add runtime source diagnostics".

## Plan

1. Define a small runtime-context model that can report the active binary path, whether execution is global or repo-local, the current framework checkout context, and the effective agentplane/core package sources. 2. Expose that model through a new runtime explain CLI surface and add doctor output that points to the same runtime facts when framework-checkout or global-install ambiguity is relevant. 3. Add regression tests for the resolver and CLI output, update docs, and verify with targeted tests plus local docs checks.

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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
