---
id: "202603071710-CJMQZT"
title: "Guarantee full local framework install for development"
status: "DOING"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: audit the current framework-dev install path, make the local checkout the deterministic runtime source for both agentplane and core during framework development, and document the resulting install workflow."
events:
  -
    type: "status"
    at: "2026-03-07T17:38:29.454Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: audit the current framework-dev install path, make the local checkout the deterministic runtime source for both agentplane and core during framework development, and document the resulting install workflow."
doc_version: 2
doc_updated_at: "2026-03-07T17:38:29.454Z"
doc_updated_by: "ORCHESTRATOR"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
