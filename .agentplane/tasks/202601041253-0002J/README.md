---
id: "202601041253-0002J"
title: "Docs: update README and fix Mermaid diagram"
status: "DONE"
priority: "high"
owner: "PLANNER"
depends_on:
  - "202601041253-0002A"
  - "202601041253-0002H"
tags:
  - "docs"
  - "workflow"
  - "mermaid"
verify:
  - "python scripts/agentctl.py task lint"
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
  hash: "c881605fdfef8585816e845648c826acf0c0ee6f"
  message: "Legacy completion (backfill)"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=ran; pr=docs/workflow/T-082/pr."
doc_version: 2
doc_updated_at: "2026-02-03T12:08:27.640Z"
doc_updated_by: "agentplane"
description: "Update root README.md to reflect latest branch_pr workflow and agentctl behavior (integrate auto-refresh artifacts; integrate may skip verify when SHA already verified). Fix Mermaid diagram so it renders correctly on GitHub."
dirty: false
---
## Summary


## Scope


## Risks


## Verify Steps


## Rollback Plan


## Plan


## Verification
