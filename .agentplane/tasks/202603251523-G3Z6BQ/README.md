---
id: "202603251523-G3Z6BQ"
title: "Create framework code map and aggregate refactor ledger"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "architecture"
  - "analysis"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-25T15:25:44.025Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-25T15:44:43.568Z"
  updated_by: "CODER"
  note: "Verified: framework code map, subsystem analysis ledger, and sequential refactor backlog were aligned; Prettier and policy-routing checks passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: build the aggregate refactor ledger, map subsystem boundaries, collect per-area findings, and derive an ordered refactor roadmap from the combined analysis."
events:
  -
    type: "status"
    at: "2026-03-25T15:26:46.319Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: build the aggregate refactor ledger, map subsystem boundaries, collect per-area findings, and derive an ordered refactor roadmap from the combined analysis."
  -
    type: "verify"
    at: "2026-03-25T15:44:43.568Z"
    author: "CODER"
    state: "ok"
    note: "Verified: framework code map, subsystem analysis ledger, and sequential refactor backlog were aligned; Prettier and policy-routing checks passed."
doc_version: 3
doc_updated_at: "2026-03-25T15:44:43.575Z"
doc_updated_by: "CODER"
description: "Build a current code map of the framework repository, create the aggregate analysis ledger at docs/developer/framework-refactor-program.mdx, define logical subsystem boundaries, and act as the collection point for area-level analysis results and the eventual refactor backlog."
sections:
  Summary: |-
    Create framework code map and aggregate refactor ledger
    
    Build a current code map of the framework repository, create the aggregate analysis ledger at docs/developer/framework-refactor-program.mdx, define logical subsystem boundaries, and act as the collection point for area-level analysis results and the eventual refactor backlog.
  Scope: |-
    - In scope: Build a current code map of the framework repository, create the aggregate analysis ledger at docs/developer/framework-refactor-program.mdx, define logical subsystem boundaries, and act as the collection point for area-level analysis results and the eventual refactor backlog.
    - Out of scope: unrelated refactors not required for "Create framework code map and aggregate refactor ledger".
  Plan: |-
    1. Build a current code map that identifies the main subsystem boundaries, ownership seams, and cross-package couplings in the framework repository.
    2. Aggregate subsystem analysis results into docs/developer/framework-refactor-program.mdx with one section per logical area and a cross-cutting findings section.
    3. Convert the aggregated analysis into an ordered refactor roadmap made of atomic sequential tasks with explicit dependencies, risks, and expected payoffs.
  Verify Steps: |-
    1. Review `docs/developer/framework-refactor-program.mdx`. Expected: it contains the code map, seven subsystem analyses, cross-cutting findings, and an ordered roadmap with concrete task IDs.
    2. Run `agentplane task list` for the analysis and refactor IDs. Expected: synthesis depends on the seven analysis tasks, and the eleven refactor tasks form one linear chain after synthesis.
    3. Run `bunx prettier --check docs/developer/framework-refactor-program.mdx` and `node .agentplane/policy/check-routing.mjs`. Expected: both checks pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-25T15:44:43.568Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: framework code map, subsystem analysis ledger, and sequential refactor backlog were aligned; Prettier and policy-routing checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T15:43:01.350Z, excerpt_hash=sha256:394b62a75758ebfe5e60ecf7593546209b0c3d84c436f21a808124a1906537d3
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Create framework code map and aggregate refactor ledger

Build a current code map of the framework repository, create the aggregate analysis ledger at docs/developer/framework-refactor-program.mdx, define logical subsystem boundaries, and act as the collection point for area-level analysis results and the eventual refactor backlog.

## Scope

- In scope: Build a current code map of the framework repository, create the aggregate analysis ledger at docs/developer/framework-refactor-program.mdx, define logical subsystem boundaries, and act as the collection point for area-level analysis results and the eventual refactor backlog.
- Out of scope: unrelated refactors not required for "Create framework code map and aggregate refactor ledger".

## Plan

1. Build a current code map that identifies the main subsystem boundaries, ownership seams, and cross-package couplings in the framework repository.
2. Aggregate subsystem analysis results into docs/developer/framework-refactor-program.mdx with one section per logical area and a cross-cutting findings section.
3. Convert the aggregated analysis into an ordered refactor roadmap made of atomic sequential tasks with explicit dependencies, risks, and expected payoffs.

## Verify Steps

1. Review `docs/developer/framework-refactor-program.mdx`. Expected: it contains the code map, seven subsystem analyses, cross-cutting findings, and an ordered roadmap with concrete task IDs.
2. Run `agentplane task list` for the analysis and refactor IDs. Expected: synthesis depends on the seven analysis tasks, and the eleven refactor tasks form one linear chain after synthesis.
3. Run `bunx prettier --check docs/developer/framework-refactor-program.mdx` and `node .agentplane/policy/check-routing.mjs`. Expected: both checks pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-25T15:44:43.568Z — VERIFY — ok

By: CODER

Note: Verified: framework code map, subsystem analysis ledger, and sequential refactor backlog were aligned; Prettier and policy-routing checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T15:43:01.350Z, excerpt_hash=sha256:394b62a75758ebfe5e60ecf7593546209b0c3d84c436f21a808124a1906537d3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
