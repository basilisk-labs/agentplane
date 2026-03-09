---
id: "202603091443-73NE1Q"
title: "Refine preview homepage UX with tabs and typographic hierarchy"
result_summary: "Refined /home-preview into a more typographic, minimal preview surface with tabbed product views, clearer hierarchy, and tighter interaction cues."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T14:43:16.126Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-09T14:45:39.629Z"
  updated_by: "REVIEWER"
  note: "Verified: bun run docs:site:check, node .agentplane/policy/check-routing.mjs, and agentplane doctor passed; /home-preview now uses a real tabbed operator surface with stronger hierarchy and restrained hover/focus microinteractions; root / remains unchanged."
commit:
  hash: "c3f7b35e12aff6c231d6dd1dc94b95da51de6aed"
  message: "✨ 73NE1Q website: refine preview homepage UX"
comments:
  -
    author: "CODER"
    body: "Start: restructuring the /home-preview UX around typographic hierarchy, tabbed product views, and restrained microinteractions while keeping the current root placeholder untouched."
  -
    author: "CODER"
    body: "Verified: docs site check, routing check, and doctor passed; the preview homepage now exposes the repository story through tabs, nested detail, and restrained microinteractions while the root placeholder remains untouched."
events:
  -
    type: "status"
    at: "2026-03-09T14:43:16.089Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: restructuring the /home-preview UX around typographic hierarchy, tabbed product views, and restrained microinteractions while keeping the current root placeholder untouched."
  -
    type: "verify"
    at: "2026-03-09T14:45:39.629Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: bun run docs:site:check, node .agentplane/policy/check-routing.mjs, and agentplane doctor passed; /home-preview now uses a real tabbed operator surface with stronger hierarchy and restrained hover/focus microinteractions; root / remains unchanged."
  -
    type: "status"
    at: "2026-03-09T14:45:48.510Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: docs site check, routing check, and doctor passed; the preview homepage now exposes the repository story through tabs, nested detail, and restrained microinteractions while the root placeholder remains untouched."
doc_version: 3
doc_updated_at: "2026-03-09T14:45:48.510Z"
doc_updated_by: "CODER"
description: "Improve the /home-preview test homepage so it feels more typographic, minimal, and current by adding tabbed information surfaces, stronger hierarchy, and restrained microinteractions while staying inside the current DESIGN.md contract."
id_source: "generated"
---
## Summary

Refine preview homepage UX with tabs and typographic hierarchy

Improve the /home-preview test homepage so it feels more typographic, minimal, and current by adding tabbed information surfaces, stronger hierarchy, and restrained microinteractions while staying inside the current DESIGN.md contract.

## Scope

- In scope: Improve the /home-preview test homepage so it feels more typographic, minimal, and current by adding tabbed information surfaces, stronger hierarchy, and restrained microinteractions while staying inside the current DESIGN.md contract.
- Out of scope: unrelated refactors not required for "Refine preview homepage UX with tabs and typographic hierarchy".

## Plan

1. Rework the /home-preview information architecture so the page has clearer reading hierarchy and at least one tabbed surface for switching between core product views.
2. Refine the preview page layout and data model to support nested detail, stronger typographic rhythm, and restrained microinteractions while keeping the root placeholder unchanged.
3. Rebuild and verify the site so the preview route stays direct-link only and remains compliant with the current DESIGN.md checks.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T14:45:39.629Z — VERIFY — ok

By: REVIEWER

Note: Verified: bun run docs:site:check, node .agentplane/policy/check-routing.mjs, and agentplane doctor passed; /home-preview now uses a real tabbed operator surface with stronger hierarchy and restrained hover/focus microinteractions; root / remains unchanged.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T14:43:16.097Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
