---
id: "202602111841-YT01ZG"
title: "Release hardening: GitHub-only provenance publish"
result_summary: "Release pipeline hardened for GitHub-only provenance publishing."
risk_level: "low"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "release"
  - "ci"
  - "npm"
  - "quality"
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
  hash: "1f29f2e9e69e9a5a33a6672087f3cdf7cf644a71"
  message: "✅ YT01ZG release: enforce GitHub-only provenance publishing"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: harden release pipeline so npm publish is GitHub-only, provenance-only, and release push path requires a full local test run before tag push."
  -
    author: "ORCHESTRATOR"
    body: "Verified: release path now enforces GitHub-only npm publish, provenance-only publish config, and local full release prepublish gate before --push."
events:
  -
    type: "status"
    at: "2026-02-11T18:41:29.029Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: harden release pipeline so npm publish is GitHub-only, provenance-only, and release push path requires a full local test run before tag push."
  -
    type: "status"
    at: "2026-02-11T18:44:36.901Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: release path now enforces GitHub-only npm publish, provenance-only publish config, and local full release prepublish gate before --push."
doc_version: 2
doc_updated_at: "2026-02-11T18:44:36.901Z"
doc_updated_by: "ORCHESTRATOR"
description: "Enforce that npm publish can run only in GitHub Actions with provenance and require full local test run before release apply --push."
id_source: "generated"
---
## Summary


## Scope


## Plan

1. Enforce GitHub-only publish guard in package prepublish hooks. 2. Enforce provenance in package publishConfig for both packages. 3. Require full local release gate before release apply --push. 4. Run lint/tests and commit.

## Risks


## Verification


## Rollback Plan
