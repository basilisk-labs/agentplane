---
id: "202602111841-XAE2BE"
title: "Release v0.2.19 via GitHub provenance pipeline"
result_summary: "Released v0.2.19 via GitHub provenance pipeline."
risk_level: "low"
status: "DONE"
priority: "med"
owner: "INTEGRATOR"
depends_on:
  - "202602111841-YT01ZG"
tags:
  - "release"
  - "npm"
  - "ci"
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
  hash: "222c807cf63fe3bb2b8b2dc55a31e1eaff8524af"
  message: "✨ release: v0.2.19"
comments:
  -
    author: "INTEGRATOR"
    body: "Start: publish patch release v0.2.19 through GitHub provenance pipeline after full local prepublish checks."
  -
    author: "INTEGRATOR"
    body: "Verified: ran full local release prepublish gate, applied v0.2.19, GitHub publish workflow 21918489642 succeeded, and both packages were published with signed provenance."
events:
  -
    type: "status"
    at: "2026-02-11T18:45:14.708Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: publish patch release v0.2.19 through GitHub provenance pipeline after full local prepublish checks."
  -
    type: "status"
    at: "2026-02-11T18:51:02.976Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: ran full local release prepublish gate, applied v0.2.19, GitHub publish workflow 21918489642 succeeded, and both packages were published with signed provenance."
doc_version: 2
doc_updated_at: "2026-02-11T18:51:02.976Z"
doc_updated_by: "INTEGRATOR"
description: "Prepare and apply patch release v0.2.19, push tag, verify GitHub publish workflow succeeds with provenance and marks release as latest."
id_source: "generated"
---
## Summary


## Scope


## Plan

1. Generate release plan for next patch. 2. Write docs/releases/v0.2.19.md. 3. Run full local release prepublish gate. 4. Apply release with --push and confirm tag. 5. Verify GitHub Publish workflow success and npm versions.

## Risks


## Verification


## Rollback Plan
