---
id: "202602060850-P2VNYW"
title: "C4: Enforce require_plan by blocking start/work/integrate until approved"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "roadmap"
  - "approvals"
  - "guard"
  - "cli"
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
  hash: "aad4f84218a7ffeb6db879a568165cbeef2bebe6"
  message: "✨ P2VNYW guard"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: enforce require_plan via plan_approval.state guard in start/work start/integrate; update tests to require plan approval first."
  -
    author: "ORCHESTRATOR"
    body: "Verified: require_plan now blocks start/work start/integrate until plan_approval.state=approved; updated tests, lint and fast tests pass."
doc_version: 3
doc_updated_at: "2026-02-06T08:53:35.490Z"
doc_updated_by: "ORCHESTRATOR"
description: "Implement ensurePlanApprovedIfRequired guard and apply it to start, work start, and integrate when agents.approvals.require_plan=true."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Findings


## Risks
