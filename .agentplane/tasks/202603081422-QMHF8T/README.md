---
id: "202603081422-QMHF8T"
title: "Refocus blog release surface on the 0.3.x line"
result_summary: "Primary blog release ordering now starts at 0.3.0 and proceeds chronologically through 0.3.1 and 0.3.2, while 0.2.25 remains accessible outside the main line."
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on:
  - "202603081422-FFKF4E"
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T14:42:08.664Z"
  updated_by: "ORCHESTRATOR"
  note: "Primary blog release line must start at 0.3.0 and keep 0.2.25 accessible separately."
verification:
  state: "ok"
  updated_at: "2026-03-08T14:43:50.292Z"
  updated_by: "DOCS"
  note: |-
    Checks passed:
    - bun run docs:site:check
    - node .agentplane/policy/check-routing.mjs
    - reviewed website/src/pages/blog/index.tsx to confirm the primary release line is 0.3.0 -> 0.3.1 -> 0.3.2 and earlier context lives separately.
commit:
  hash: "ee72dbcbcb690b0e99b34dcd72a634515203691a"
  message: "📝 QMHF8T docs: refocus blog release line on 0.3.x"
comments:
  -
    author: "DOCS"
    body: "Start: adjust the blog landing page so the primary release line begins with 0.3.0 and earlier releases move to a secondary surface."
  -
    author: "DOCS"
    body: "Verified: the custom /blog landing page now presents the 0.3.x release line first and keeps earlier context on a secondary surface."
events:
  -
    type: "status"
    at: "2026-03-08T14:42:14.325Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: adjust the blog landing page so the primary release line begins with 0.3.0 and earlier releases move to a secondary surface."
  -
    type: "verify"
    at: "2026-03-08T14:43:50.292Z"
    author: "DOCS"
    state: "ok"
    note: |-
      Checks passed:
      - bun run docs:site:check
      - node .agentplane/policy/check-routing.mjs
      - reviewed website/src/pages/blog/index.tsx to confirm the primary release line is 0.3.0 -> 0.3.1 -> 0.3.2 and earlier context lives separately.
  -
    type: "status"
    at: "2026-03-08T14:44:11.540Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: the custom /blog landing page now presents the 0.3.x release line first and keeps earlier context on a secondary surface."
doc_version: 3
doc_updated_at: "2026-03-08T14:44:11.540Z"
doc_updated_by: "DOCS"
description: "Adjust the custom blog landing page so the primary release line starts at 0.3.0 and proceeds chronologically through 0.3.1 and 0.3.2, while earlier releases stay accessible via a separate earlier-releases/archive surface instead of preceding 0.3 on the primary line."
id_source: "generated"
---
## Summary

Refocus blog release surface on the 0.3.x line

Adjust the custom blog landing page so the primary release line starts at 0.3.0 and proceeds chronologically through 0.3.1 and 0.3.2, while earlier releases stay accessible via a separate earlier-releases/archive surface instead of preceding 0.3 on the primary line.

## Scope

- In scope: Adjust the custom blog landing page so the primary release line starts at 0.3.0 and proceeds chronologically through 0.3.1 and 0.3.2, while earlier releases stay accessible via a separate earlier-releases/archive surface instead of preceding 0.3 on the primary line.
- Out of scope: unrelated refactors not required for "Refocus blog release surface on the 0.3.x line".

## Plan

1. Split the custom /blog landing page into a primary 0.3.x release line and a separate earlier-releases surface.
2. Keep 0.3.0 -> 0.3.1 -> 0.3.2 in chronological order on the main release line while preserving access to 0.2.25 and roadmap materials.
3. Run site checks, record verification, and close the task with a scoped commit.

## Verify Steps

1. Run `bun run docs:site:check`. Expected: the site builds successfully and the design-language check passes.
2. Review `website/src/pages/blog/index.tsx`. Expected: the primary release line starts at 0.3.0 and proceeds through 0.3.1 and 0.3.2 in order.
3. Review the same page for secondary links. Expected: 0.2.25 remains accessible outside the primary 0.3.x line, alongside roadmap/archive context.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T14:43:50.292Z — VERIFY — ok

By: DOCS

Note: Checks passed:
- bun run docs:site:check
- node .agentplane/policy/check-routing.mjs
- reviewed website/src/pages/blog/index.tsx to confirm the primary release line is 0.3.0 -> 0.3.1 -> 0.3.2 and earlier context lives separately.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T14:43:10.147Z, excerpt_hash=sha256:99445bbfb234e52eff894872b967fbc1dede6d9f9eefde3aa3eca3f8101fe436

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
