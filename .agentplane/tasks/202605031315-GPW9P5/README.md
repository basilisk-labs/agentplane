---
id: "202605031315-GPW9P5"
title: "Refresh website homepage and metadata positioning"
result_summary: "Website homepage and metadata now reflect the CMO positioning update."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-05-03T13:41:11.449Z"
  updated_by: "CODER"
  note: "Homepage positioning, metadata, navigation links, and manifest were updated around the audit-layer thesis. Verified with bun run docs:site:typecheck, bun run docs:site:build, and git diff --check after adding linked compare/manifesto docs."
commit:
  hash: "ad49569d0c8143850c3a21f487f9b83719ce4b94"
  message: "🎯 GPW9P5 site: reposition homepage audit layer"
comments:
  -
    author: "CODER"
    body: "Start: proceed after quickstart implementation and verification; branch_pr leaf finish will be recorded from base after integration."
  -
    author: "INTEGRATOR"
    body: "Verified: Website homepage and metadata positioning landed through PR #819; task verification was recorded before merge."
events:
  -
    type: "status"
    at: "2026-05-03T13:33:37.514Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: proceed after quickstart implementation and verification; branch_pr leaf finish will be recorded from base after integration."
  -
    type: "verify"
    at: "2026-05-03T13:41:11.449Z"
    author: "CODER"
    state: "ok"
    note: "Homepage positioning, metadata, navigation links, and manifest were updated around the audit-layer thesis. Verified with bun run docs:site:typecheck, bun run docs:site:build, and git diff --check after adding linked compare/manifesto docs."
  -
    type: "status"
    at: "2026-05-03T14:43:20.058Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Website homepage and metadata positioning landed through PR #819; task verification was recorded before merge."
doc_version: 3
doc_updated_at: "2026-05-03T14:43:20.058Z"
doc_updated_by: "INTEGRATOR"
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
    ### 2026-05-03T13:41:11.449Z — VERIFY — ok
    
    By: CODER
    
    Note: Homepage positioning, metadata, navigation links, and manifest were updated around the audit-layer thesis. Verified with bun run docs:site:typecheck, bun run docs:site:build, and git diff --check after adding linked compare/manifesto docs.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:33:37.514Z, excerpt_hash=sha256:f53dfb2fd5999892b5090d69f7a0500d0fc397dc096124d59de1378cceb7ef36
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The production build succeeds; it reports an existing webpack warning from vscode-languageserver-types dynamic require, not a broken route or changed source file.
      Impact: The website can ship the new public positioning without broken links to /docs/manifesto or /docs/compare.
      Resolution: Keep the dependency warning as residual build noise outside this task scope.
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
### 2026-05-03T13:41:11.449Z — VERIFY — ok

By: CODER

Note: Homepage positioning, metadata, navigation links, and manifest were updated around the audit-layer thesis. Verified with bun run docs:site:typecheck, bun run docs:site:build, and git diff --check after adding linked compare/manifesto docs.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:33:37.514Z, excerpt_hash=sha256:f53dfb2fd5999892b5090d69f7a0500d0fc397dc096124d59de1378cceb7ef36

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The production build succeeds; it reports an existing webpack warning from vscode-languageserver-types dynamic require, not a broken route or changed source file.
  Impact: The website can ship the new public positioning without broken links to /docs/manifesto or /docs/compare.
  Resolution: Keep the dependency warning as residual build noise outside this task scope.
