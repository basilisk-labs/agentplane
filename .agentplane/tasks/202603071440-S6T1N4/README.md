---
id: "202603071440-S6T1N4"
title: "Document ownership of managed policy files"
status: "DOING"
priority: "med"
owner: "DOCS"
depends_on:
  - "202603071440-AA1H09"
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T16:26:27.452Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: make managed ownership explicit across setup, upgrade, and recovery docs."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: make the ownership contract explicit so agents treat AGENTS.md and managed policy files as framework-owned and reserve incidents.md for local directives."
events:
  -
    type: "status"
    at: "2026-03-07T16:26:27.780Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: make the ownership contract explicit so agents treat AGENTS.md and managed policy files as framework-owned and reserve incidents.md for local directives."
doc_version: 2
doc_updated_at: "2026-03-07T16:26:27.780Z"
doc_updated_by: "DOCS"
description: "Make the contract explicit that AGENTS.md and .agentplane/policy/** are framework-managed while incidents.md remains the sanctioned local override area."
id_source: "generated"
---
## Summary

Document ownership of managed policy files

Make the contract explicit that AGENTS.md and .agentplane/policy/** are framework-managed while incidents.md remains the sanctioned local override area.

## Scope

- In scope: Make the contract explicit that AGENTS.md and .agentplane/policy/** are framework-managed while incidents.md remains the sanctioned local override area..
- Out of scope: unrelated refactors not required for "Document ownership of managed policy files".

## Plan

1. Make ownership of AGENTS.md and .agentplane/policy/** explicit in setup and recovery docs. 2. Mirror the same ownership contract in upgrade guidance and doctor-facing docs. 3. Regenerate site docs if needed and verify routing/docs checks.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
