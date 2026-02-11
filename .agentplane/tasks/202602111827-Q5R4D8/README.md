---
id: "202602111827-Q5R4D8"
title: "Harden GitHub npm publish idempotency"
result_summary: "GitHub publish workflow is resilient to already-published versions."
risk_level: "low"
status: "DONE"
priority: "med"
owner: "INTEGRATOR"
depends_on: []
tags:
  - "release"
  - "ci"
  - "npm"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "beca6f77f30bb16b9796df9a4424aa1515feafad"
  message: "✅ Q5R4D8 ci: make npm publish idempotent in GitHub workflow"
comments:
  -
    author: "INTEGRATOR"
    body: "Start: implement idempotent GitHub npm publish flow to prevent E403 when version already exists and keep release workflow deterministic."
  -
    author: "INTEGRATOR"
    body: "Verified: publish workflow now uses idempotent package publish helper; local checks passed (format, lint, helper skip behavior)."
events:
  -
    type: "status"
    at: "2026-02-11T18:28:07.124Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: implement idempotent GitHub npm publish flow to prevent E403 when version already exists and keep release workflow deterministic."
  -
    type: "status"
    at: "2026-02-11T18:31:31.932Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: publish workflow now uses idempotent package publish helper; local checks passed (format, lint, helper skip behavior)."
doc_version: 2
doc_updated_at: "2026-02-11T18:31:31.932Z"
doc_updated_by: "INTEGRATOR"
description: "Make publish.yml resilient when a version is already published to npm, so GitHub release pipeline stays green and deterministic."
id_source: "generated"
---
## Summary


## Scope


## Plan

1. Add scripts/publish-package-if-needed.mjs to publish package idempotently. 2. Update .github/workflows/publish.yml to call helper for both packages. 3. Run workflow-relevant checks and commit changes.

## Risks


## Verification


## Rollback Plan
