---
id: "202605031315-GPW9P5"
title: "Refresh website homepage and metadata positioning"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202605031315-Z0PECQ"
tags:
  - "code"
  - "positioning"
  - "website"
verify:
  - "bun run docs:site:build"
  - "bun run docs:site:typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T13:15:57.863Z"
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
doc_updated_at: "2026-05-03T13:15:45.249Z"
doc_updated_by: "PLANNER"
description: "Update the docs-site homepage content, Docusaurus metadata, and webmanifest to use one canonical public message, pain anchor, recipes section, comparison route, and consistent social metadata."
sections:
  Summary: |-
    Refresh website homepage and metadata positioning
    
    Update the docs-site homepage content, Docusaurus metadata, and webmanifest to use one canonical public message, pain anchor, recipes section, comparison route, and consistent social metadata.
  Scope: |-
    - In scope: Update the docs-site homepage content, Docusaurus metadata, and webmanifest to use one canonical public message, pain anchor, recipes section, comparison route, and consistent social metadata.
    - Out of scope: unrelated refactors not required for "Refresh website homepage and metadata positioning".
  Plan: "Update website/src/data/homepage-content.ts, website/docusaurus.config.ts, and website/static/site.webmanifest for one canonical positioning line, pain anchor, recipes proof, comparison link, and consistent metadata. Acceptance: no off-repo community claims unless already true in repo-visible links; docs-site typecheck/build pass."
  Verify Steps: |-
    1. Run `bun run docs:site:typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run docs:site:build`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Refresh website homepage and metadata positioning

Update the docs-site homepage content, Docusaurus metadata, and webmanifest to use one canonical public message, pain anchor, recipes section, comparison route, and consistent social metadata.

## Scope

- In scope: Update the docs-site homepage content, Docusaurus metadata, and webmanifest to use one canonical public message, pain anchor, recipes section, comparison route, and consistent social metadata.
- Out of scope: unrelated refactors not required for "Refresh website homepage and metadata positioning".

## Plan

Update website/src/data/homepage-content.ts, website/docusaurus.config.ts, and website/static/site.webmanifest for one canonical positioning line, pain anchor, recipes proof, comparison link, and consistent metadata. Acceptance: no off-repo community claims unless already true in repo-visible links; docs-site typecheck/build pass.

## Verify Steps

1. Run `bun run docs:site:typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run docs:site:build`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
