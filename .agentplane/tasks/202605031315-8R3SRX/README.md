---
id: "202605031315-8R3SRX"
title: "Add repo visual proof and social assets"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202605031315-VZ15JW"
tags:
  - "assets"
  - "code"
  - "website"
verify:
  - "bun run docs:site:build"
  - "test -s docs/assets/agentplane-demo.gif || test -s docs/assets/agentplane-demo.cast"
  - "test -s website/static/img/og-image.png && test -s website/static/img/twitter-card.png"
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T13:15:58.666Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-03T13:15:46.042Z"
doc_updated_by: "PLANNER"
description: "Create or wire repository assets required by the audit: a short CLI demo artifact for README/site use, distinct OG/Twitter/HN social cards, and asset references that do not imply nonexistent external channels."
sections:
  Summary: |-
    Add repo visual proof and social assets
    
    Create or wire repository assets required by the audit: a short CLI demo artifact for README/site use, distinct OG/Twitter/HN social cards, and asset references that do not imply nonexistent external channels.
  Scope: |-
    - In scope: Create or wire repository assets required by the audit: a short CLI demo artifact for README/site use, distinct OG/Twitter/HN social cards, and asset references that do not imply nonexistent external channels.
    - Out of scope: unrelated refactors not required for "Add repo visual proof and social assets".
  Plan: "Create or wire repo-owned visual proof assets: short demo GIF or cast, distinct OG/Twitter/HN social-card assets or a deterministic generation path, and README/site references. Acceptance: referenced assets exist, are not byte-identical placeholders unless deliberately generated from one source, and docs-site build passes."
  Verify Steps: |-
    1. Run `test -s docs/assets/agentplane-demo.gif || test -s docs/assets/agentplane-demo.cast`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `test -s website/static/img/og-image.png && test -s website/static/img/twitter-card.png`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run docs:site:build`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Add repo visual proof and social assets

Create or wire repository assets required by the audit: a short CLI demo artifact for README/site use, distinct OG/Twitter/HN social cards, and asset references that do not imply nonexistent external channels.

## Scope

- In scope: Create or wire repository assets required by the audit: a short CLI demo artifact for README/site use, distinct OG/Twitter/HN social cards, and asset references that do not imply nonexistent external channels.
- Out of scope: unrelated refactors not required for "Add repo visual proof and social assets".

## Plan

Create or wire repo-owned visual proof assets: short demo GIF or cast, distinct OG/Twitter/HN social-card assets or a deterministic generation path, and README/site references. Acceptance: referenced assets exist, are not byte-identical placeholders unless deliberately generated from one source, and docs-site build passes.

## Verify Steps

1. Run `test -s docs/assets/agentplane-demo.gif || test -s docs/assets/agentplane-demo.cast`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `test -s website/static/img/og-image.png && test -s website/static/img/twitter-card.png`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run docs:site:build`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
