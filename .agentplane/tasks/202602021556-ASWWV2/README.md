---
id: "202602021556-ASWWV2"
title: "Enable npm trusted publishing in workflow"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "release"
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
  hash: "0f3c85f5b2f3bca58cac2190d807a2d22ece30b9"
  message: "🚀 ASWWV2 enable npm provenance"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: enable OIDC trusted publishing flags in workflow to remove token dependency."
  -
    author: "ORCHESTRATOR"
    body: "Verified: GitHub Actions publish workflow will use npm --provenance with OIDC trusted publisher."
doc_version: 2
doc_updated_at: "2026-02-03T12:09:45.889Z"
doc_updated_by: "agentplane"
description: "Update publish workflow to use OIDC provenance so npm publish succeeds without tokens."
id_source: "generated"
---
## Summary


## Scope


## Risks


## Verify Steps


## Rollback Plan


## Plan


## Verification
