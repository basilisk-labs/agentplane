---
id: "202605031315-8R3SRX"
title: "Add repo visual proof and social assets"
result_summary: "Repo visual proof and social sharing assets are available in the public surface."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-05-03T13:45:52.525Z"
  updated_by: "CREATOR"
  note: "Refreshed the shared 1560x840 header, OpenGraph, Twitter card, and Codex plugin screenshot PNGs around the audit-layer task-trail visual. Verified dimensions and identical SHA-256 across all copied assets, visual rendering via image inspection, docs:site:build, and git diff --check."
commit:
  hash: "be7a9eed6431f31ea6c353f3c095e0435b74ee6c"
  message: "🎨 8R3SRX assets: refresh audit-layer previews"
comments:
  -
    author: "CREATOR"
    body: "Start: refresh visual proof and social preview assets to match the new audit-layer positioning."
  -
    author: "INTEGRATOR"
    body: "Verified: Visual proof and social assets landed through PR #819; task verification was recorded before merge."
events:
  -
    type: "status"
    at: "2026-05-03T13:43:51.704Z"
    author: "CREATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: refresh visual proof and social preview assets to match the new audit-layer positioning."
  -
    type: "verify"
    at: "2026-05-03T13:45:52.525Z"
    author: "CREATOR"
    state: "ok"
    note: "Refreshed the shared 1560x840 header, OpenGraph, Twitter card, and Codex plugin screenshot PNGs around the audit-layer task-trail visual. Verified dimensions and identical SHA-256 across all copied assets, visual rendering via image inspection, docs:site:build, and git diff --check."
  -
    type: "status"
    at: "2026-05-03T14:43:27.652Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Visual proof and social assets landed through PR #819; task verification was recorded before merge."
doc_version: 3
doc_updated_at: "2026-05-03T14:43:27.652Z"
doc_updated_by: "INTEGRATOR"
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
    ### 2026-05-03T13:45:52.525Z — VERIFY — ok
    
    By: CREATOR
    
    Note: Refreshed the shared 1560x840 header, OpenGraph, Twitter card, and Codex plugin screenshot PNGs around the audit-layer task-trail visual. Verified dimensions and identical SHA-256 across all copied assets, visual rendering via image inspection, docs:site:build, and git diff --check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:43:51.704Z, excerpt_hash=sha256:4d6a21cf89d9a9636d286d3c4f0a49a86821f8803d65625bc5b39d728586525d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Docusaurus build still emits the existing vscode-languageserver-types dynamic require warning; static generation succeeds.
      Impact: README, website social previews, and plugin screenshot now present the same public visual proof for the new positioning.
      Resolution: Use the same source visual across header/social/plugin copies until a dedicated asset pipeline exists.
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
### 2026-05-03T13:45:52.525Z — VERIFY — ok

By: CREATOR

Note: Refreshed the shared 1560x840 header, OpenGraph, Twitter card, and Codex plugin screenshot PNGs around the audit-layer task-trail visual. Verified dimensions and identical SHA-256 across all copied assets, visual rendering via image inspection, docs:site:build, and git diff --check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:43:51.704Z, excerpt_hash=sha256:4d6a21cf89d9a9636d286d3c4f0a49a86821f8803d65625bc5b39d728586525d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Docusaurus build still emits the existing vscode-languageserver-types dynamic require warning; static generation succeeds.
  Impact: README, website social previews, and plugin screenshot now present the same public visual proof for the new positioning.
  Resolution: Use the same source visual across header/social/plugin copies until a dedicated asset pipeline exists.
