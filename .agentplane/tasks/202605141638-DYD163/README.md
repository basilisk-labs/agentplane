---
id: "202605141638-DYD163"
title: "Unify release note validation rules"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T16:41:00.774Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-14T16:39:42.123Z"
doc_updated_by: "PLANNER"
description: "Move duplicated release-note validation invariants out of the TS preflight and MJS release script into one canonical rules surface, keep both callers aligned, and add fixture tests that prove section, placeholder, duplicate heading, and bullet-count behavior share the same contract."
sections:
  Summary: |-
    Unify release note validation rules
    
    Move duplicated release-note validation invariants out of the TS preflight and MJS release script into one canonical rules surface, keep both callers aligned, and add fixture tests that prove section, placeholder, duplicate heading, and bullet-count behavior share the same contract.
  Scope: |-
    - In scope: Move duplicated release-note validation invariants out of the TS preflight and MJS release script into one canonical rules surface, keep both callers aligned, and add fixture tests that prove section, placeholder, duplicate heading, and bullet-count behavior share the same contract.
    - Out of scope: unrelated refactors not required for "Unify release note validation rules".
  Plan: "Unify release-note validation rule ownership. Scope: shared rule module usable by release apply TS preflight and MJS release script, fixture tests for headings/placeholders/duplicates/bullets/fences, and removal of duplicated constants/functions. Out of scope: changing release-note public template content unless required by tests."
  Verify Steps: "1. Prove TS release apply preflight and scripts/release/check-release-notes.mjs consume one canonical rule set or generated mirror. 2. Add/adjust fixtures for required sections, duplicate headings, template placeholders, fenced bullet lines, and tag validation. 3. Run targeted release-note tests and the release-note script against docs/releases/v0.6.0.md. 4. Run bun run lint:core -- changed release validation files. 5. Run node .agentplane/policy/check-routing.mjs."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Unify release note validation rules

Move duplicated release-note validation invariants out of the TS preflight and MJS release script into one canonical rules surface, keep both callers aligned, and add fixture tests that prove section, placeholder, duplicate heading, and bullet-count behavior share the same contract.

## Scope

- In scope: Move duplicated release-note validation invariants out of the TS preflight and MJS release script into one canonical rules surface, keep both callers aligned, and add fixture tests that prove section, placeholder, duplicate heading, and bullet-count behavior share the same contract.
- Out of scope: unrelated refactors not required for "Unify release note validation rules".

## Plan

Unify release-note validation rule ownership. Scope: shared rule module usable by release apply TS preflight and MJS release script, fixture tests for headings/placeholders/duplicates/bullets/fences, and removal of duplicated constants/functions. Out of scope: changing release-note public template content unless required by tests.

## Verify Steps

1. Prove TS release apply preflight and scripts/release/check-release-notes.mjs consume one canonical rule set or generated mirror. 2. Add/adjust fixtures for required sections, duplicate headings, template placeholders, fenced bullet lines, and tag validation. 3. Run targeted release-note tests and the release-note script against docs/releases/v0.6.0.md. 4. Run bun run lint:core -- changed release validation files. 5. Run node .agentplane/policy/check-routing.mjs.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
