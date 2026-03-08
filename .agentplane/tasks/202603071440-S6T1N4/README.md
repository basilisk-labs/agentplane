---
id: "202603071440-S6T1N4"
title: "Document ownership of managed policy files"
result_summary: "Managed ownership is now explicit in the main upgrade docs: AGENTS.md and the managed policy tree are framework-owned, while incidents.md remains the sanctioned local override area."
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-07T16:35:05.640Z"
  updated_by: "REVIEWER"
  note: "Verified: setup, recovery, troubleshooting, and agents docs now state that AGENTS.md and managed policy files are framework-owned while incidents.md remains the local override area."
commit:
  hash: "ddfa3f585f6fb9254874c18bfacc108f173ec05a"
  message: "🧭 2ZVTF7 docs: align agent-first onboarding IA"
comments:
  -
    author: "DOCS"
    body: "Start: make the ownership contract explicit so agents treat AGENTS.md and managed policy files as framework-owned and reserve incidents.md for local directives."
  -
    author: "DOCS"
    body: "Verified: made managed ownership explicit across setup, recovery, troubleshooting, and agent guidance."
events:
  -
    type: "status"
    at: "2026-03-07T16:26:27.780Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: make the ownership contract explicit so agents treat AGENTS.md and managed policy files as framework-owned and reserve incidents.md for local directives."
  -
    type: "verify"
    at: "2026-03-07T16:35:05.640Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: setup, recovery, troubleshooting, and agents docs now state that AGENTS.md and managed policy files are framework-owned while incidents.md remains the local override area."
  -
    type: "status"
    at: "2026-03-07T16:35:05.866Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: made managed ownership explicit across setup, recovery, troubleshooting, and agent guidance."
doc_version: 3
doc_updated_at: "2026-03-07T16:35:05.866Z"
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

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T16:35:05.640Z — VERIFY — ok

By: REVIEWER

Note: Verified: setup, recovery, troubleshooting, and agents docs now state that AGENTS.md and managed policy files are framework-owned while incidents.md remains the local override area.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T16:26:27.780Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings


## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
