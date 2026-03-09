---
id: "202603091418-S58YYQ"
title: "Create preview homepage from updated content map"
result_summary: "Added a test-only homepage preview route backed by the updated content contract without replacing the current root placeholder."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T14:18:50.633Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-09T14:33:21.389Z"
  updated_by: "REVIEWER"
  note: "Verified: bun run docs:site:check, node .agentplane/policy/check-routing.mjs, and agentplane doctor passed; root homepage files stayed unchanged; preview page builds at /home-preview only."
commit:
  hash: "20b5bd59fb87819214d339a7aafce1eebaa9bc34"
  message: "✨ S58YYQ website: add preview homepage from content contract"
comments:
  -
    author: "CODER"
    body: "Start: Translating the updated content map into a test-only homepage route, updating the content data source, and keeping the current root placeholder unchanged."
  -
    author: "CODER"
    body: "Verified: docs site check, routing check, and doctor passed; preview homepage was implemented at /home-preview while the existing placeholder root page remained unchanged."
events:
  -
    type: "status"
    at: "2026-03-09T14:19:10.325Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Translating the updated content map into a test-only homepage route, updating the content data source, and keeping the current root placeholder unchanged."
  -
    type: "verify"
    at: "2026-03-09T14:33:21.389Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: bun run docs:site:check, node .agentplane/policy/check-routing.mjs, and agentplane doctor passed; root homepage files stayed unchanged; preview page builds at /home-preview only."
  -
    type: "status"
    at: "2026-03-09T14:33:33.773Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: docs site check, routing check, and doctor passed; preview homepage was implemented at /home-preview while the existing placeholder root page remained unchanged."
doc_version: 3
doc_updated_at: "2026-03-09T14:33:33.773Z"
doc_updated_by: "CODER"
description: "Implement a test-only homepage page based on website/CONTENT.md, keep the current root placeholder unchanged, and expose the new homepage only via a direct preview URL."
id_source: "generated"
---
## Summary

Create preview homepage from updated content map

Implement a test-only homepage page based on website/CONTENT.md, keep the current root placeholder unchanged, and expose the new homepage only via a direct preview URL.

## Scope

- In scope: Implement a test-only homepage page based on website/CONTENT.md, keep the current root placeholder unchanged, and expose the new homepage only via a direct preview URL.
- Out of scope: unrelated refactors not required for "Create preview homepage from updated content map".

## Plan

1. Translate the updated website/CONTENT.md into a concrete preview-page content model: hero, problem, repository surface, workflow path, modes, trust model, docs rail, release surface, and closing CTA.
2. Implement a test-only homepage route under website/src/pages without changing the current root placeholder, and style it to fit the existing site shell and design constraints.
3. Run site checks and confirm the preview page is reachable only by direct URL, while the current / homepage remains unchanged.

## Verify Steps

1. Build the website with the new preview homepage route. Expected: the site builds successfully and the current root placeholder at / is unchanged.
2. Open the preview page source and confirm it reflects the section order and claims from website/CONTENT.md. Expected: hero, problem, repository surface, workflow, modes, trust, docs rail, release record, and closing CTA are all present without hosted-platform drift.
3. Check routing and visibility. Expected: the new homepage is reachable only by its direct URL and is not wired into the existing main navigation or root route.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T14:33:21.389Z — VERIFY — ok

By: REVIEWER

Note: Verified: bun run docs:site:check, node .agentplane/policy/check-routing.mjs, and agentplane doctor passed; root homepage files stayed unchanged; preview page builds at /home-preview only.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T14:19:10.325Z, excerpt_hash=sha256:bada96f8e4d58fd379f5fbe580d2394cba082ce311860a00488e53f36dcfccf5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
