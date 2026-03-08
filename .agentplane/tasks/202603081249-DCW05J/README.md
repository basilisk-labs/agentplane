---
id: "202603081249-DCW05J"
title: "Document runtime-sensitive CLI fast contours"
status: "DOING"
priority: "med"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T13:10:29.256Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: document cli-core and cli-runtime contours plus the intentional broad fallback boundary for residual runtime-sensitive CLI paths."
verification:
  state: "ok"
  updated_at: "2026-03-08T13:11:13.180Z"
  updated_by: "DOCS"
  note: "Command: bun run docs:site:check; node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: updated pre-push contour docs list cli-core and cli-runtime, and explicitly preserve docs-cli plus init-upgrade runtime paths on broad fallback. Scope: docs/developer/testing-and-quality.mdx."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: updating developer guidance for the new runtime-sensitive CLI fast buckets and the residual broad-fallback boundary, without changing selector behavior."
events:
  -
    type: "status"
    at: "2026-03-08T13:10:29.353Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: updating developer guidance for the new runtime-sensitive CLI fast buckets and the residual broad-fallback boundary, without changing selector behavior."
  -
    type: "verify"
    at: "2026-03-08T13:11:13.180Z"
    author: "DOCS"
    state: "ok"
    note: "Command: bun run docs:site:check; node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: updated pre-push contour docs list cli-core and cli-runtime, and explicitly preserve docs-cli plus init-upgrade runtime paths on broad fallback. Scope: docs/developer/testing-and-quality.mdx."
doc_version: 3
doc_updated_at: "2026-03-08T13:11:13.182Z"
doc_updated_by: "DOCS"
description: "Update developer guidance so the pre-push contour documentation includes the new runtime-sensitive CLI buckets and their remaining fallback boundaries."
id_source: "generated"
---
## Summary

Document runtime-sensitive CLI fast contours

Update developer guidance so the pre-push contour documentation includes the new runtime-sensitive CLI buckets and their remaining fallback boundaries.

## Scope

- In scope: Update developer guidance so the pre-push contour documentation includes the new runtime-sensitive CLI buckets and their remaining fallback boundaries..
- Out of scope: unrelated refactors not required for "Document runtime-sensitive CLI fast contours".

## Plan

1. Update the pre-push contour section in docs/developer/testing-and-quality.mdx to document the new cli-core and cli-runtime buckets and the residual broad-fallback boundary.
2. Verify the documentation against the implemented selector behavior and existing fast bucket names.
3. Run docs checks, record findings about intentionally retained broad fallback paths, and finish with traceable commit metadata.

## Verify Steps

1. Review docs/developer/testing-and-quality.mdx against the selector implementation. Expected: the document lists cli-core and cli-runtime with the same names and semantics used by the fast selector.
2. Run bun run docs:site:check. Expected: docs checks pass with the updated contour wording.
3. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing remains valid after the docs update.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T13:11:13.180Z — VERIFY — ok

By: DOCS

Note: Command: bun run docs:site:check; node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: updated pre-push contour docs list cli-core and cli-runtime, and explicitly preserve docs-cli plus init-upgrade runtime paths on broad fallback. Scope: docs/developer/testing-and-quality.mdx.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T13:11:12.690Z, excerpt_hash=sha256:fea890f1551676bbba1b5a43e0ec40094934042cf21398b23359009ee776627f

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: the new runtime-sensitive selector split needs explicit docs boundaries, otherwise contributors will expect docs-cli and init-upgrade integration paths to route into the new buckets.
  Impact: without those boundaries, broad fallback would look accidental instead of deliberate.
  Resolution: documented cli-core and cli-runtime separately and named the residual broad-fallback paths that still stay outside them by design.
  Promotion: none
