---
id: "202603081239-AG4527"
title: "Document the CLI help-spec fast bucket"
result_summary: "Updated the pre-push contour documentation so the new cli-help bucket is documented alongside the existing targeted buckets and the broad fallback boundary remains explicit."
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T12:46:44.248Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: sync only the pre-push contour documentation to include the new cli-help bucket and preserve the explicit runtime-sensitive CLI fallback boundary."
verification:
  state: "ok"
  updated_at: "2026-03-08T12:47:22.413Z"
  updated_by: "DOCS"
  note: "Updated testing-and-quality docs to include targeted(cli-help) and clarified that runtime-sensitive CLI paths remain on the broad fast fallback. docs:site:check and policy routing passed."
commit:
  hash: "539a01f2745116e04906d86eb65dd35333d2ea6a"
  message: "📝 AG4527 docs: add cli-help contour"
comments:
  -
    author: "DOCS"
    body: "Verified: the developer testing-and-quality guide now lists targeted(cli-help) and keeps the remaining broad fallback scoped to runtime-sensitive CLI and other infra-heavy paths."
events:
  -
    type: "verify"
    at: "2026-03-08T12:47:22.413Z"
    author: "DOCS"
    state: "ok"
    note: "Updated testing-and-quality docs to include targeted(cli-help) and clarified that runtime-sensitive CLI paths remain on the broad fast fallback. docs:site:check and policy routing passed."
  -
    type: "status"
    at: "2026-03-08T12:47:42.365Z"
    author: "DOCS"
    from: "TODO"
    to: "DONE"
    note: "Verified: the developer testing-and-quality guide now lists targeted(cli-help) and keeps the remaining broad fallback scoped to runtime-sensitive CLI and other infra-heavy paths."
doc_version: 3
doc_updated_at: "2026-03-08T12:47:42.365Z"
doc_updated_by: "DOCS"
description: "Update developer guidance so the pre-push contour documentation distinguishes the new CLI help/spec bucket from the remaining broad CLI fallback."
id_source: "generated"
---
## Summary

Document the CLI help-spec fast bucket

Update developer guidance so the pre-push contour documentation distinguishes the new CLI help/spec bucket from the remaining broad CLI fallback.

## Scope

- In scope: Update developer guidance so the pre-push contour documentation distinguishes the new CLI help/spec bucket from the remaining broad CLI fallback..
- Out of scope: unrelated refactors not required for "Document the CLI help-spec fast bucket".

## Plan

1. Review the current pre-push contour docs and find the section that now needs the new cli-help bucket.
2. Update that developer guidance so it lists the cli-help contour and keeps the runtime-sensitive CLI fallback boundary explicit.
3. Run docs and routing checks, then record the updated contour contract in the task README.

## Verify Steps

1. Open the updated pre-push contour documentation. Expected: the cli-help bucket is listed alongside the other targeted contours and the broad CLI fallback boundary remains explicit.
2. Run the relevant docs and policy checks for the changed files. Expected: all checks pass without drift.
3. Compare the documented contours with the current selector implementation. Expected: the docs match the implemented buckets and do not promise unsupported CLI narrowing.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T12:47:22.413Z — VERIFY — ok

By: DOCS

Note: Updated testing-and-quality docs to include targeted(cli-help) and clarified that runtime-sensitive CLI paths remain on the broad fast fallback. docs:site:check and policy routing passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T12:47:22.259Z, excerpt_hash=sha256:3aa8cba97bd4dc0b6491c9c363c810539574a165022e879267f9c2e21e7863ec

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: the docs already described the first wave of targeted pre-push contours, but after adding the cli-help bucket they understated the safe CLI narrowing that now exists and overstated the generic CLI broad fallback.
  Impact: contributors would not know that isolated help/spec/guidance edits now take a lighter path.
  Resolution: updated the contour list to include targeted(cli-help) and clarified that the remaining broad fallback is specifically for runtime-sensitive CLI and other infra-heavy paths.
  Promotion: none
