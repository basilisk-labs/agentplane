---
id: "202605041945-SWHBDW"
title: "Expand blueprint implementation specification"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-04T19:45:57.911Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-04T19:50:50.625Z"
  updated_by: "DOCS"
  note: "Docs updated and verified. Checks passed: node .agentplane/policy/check-routing.mjs; agentplane doctor; bun run docs:ia:check; bun run format:check -- docs/developer/blueprints.mdx; git diff --check. Doctor still reports an unrelated existing warning for two shipped branch_pr tasks on base branch."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: expand blueprint documentation into an implementation-ready v0 specification with methodology references, model contracts, validation invariants, resolver I/O, and rollout sequence."
events:
  -
    type: "status"
    at: "2026-05-04T19:46:28.983Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: expand blueprint documentation into an implementation-ready v0 specification with methodology references, model contracts, validation invariants, resolver I/O, and rollout sequence."
  -
    type: "verify"
    at: "2026-05-04T19:50:50.625Z"
    author: "DOCS"
    state: "ok"
    note: "Docs updated and verified. Checks passed: node .agentplane/policy/check-routing.mjs; agentplane doctor; bun run docs:ia:check; bun run format:check -- docs/developer/blueprints.mdx; git diff --check. Doctor still reports an unrelated existing warning for two shipped branch_pr tasks on base branch."
doc_version: 3
doc_updated_at: "2026-05-04T19:50:50.630Z"
doc_updated_by: "DOCS"
description: "Expand docs/developer/blueprints.mdx with implementation-ready references, v0 module plan, validation invariants, resolver contract, test matrix, and rollout sequence."
sections:
  Summary: |-
    Expand blueprint implementation specification
    
    Expand docs/developer/blueprints.mdx with implementation-ready references, v0 module plan, validation invariants, resolver contract, test matrix, and rollout sequence.
  Scope: |-
    - In scope: Expand docs/developer/blueprints.mdx with implementation-ready references, v0 module plan, validation invariants, resolver contract, test matrix, and rollout sequence.
    - Out of scope: unrelated refactors not required for "Expand blueprint implementation specification".
  Plan: |-
    1. Expand docs/developer/blueprints.mdx into an implementation-ready blueprint specification: terminology, methodology references, boundaries, and why blueprints must not collapse into one code PR pipeline.
    2. Define v0 contracts for model, registry, validator, resolver, evidence, and recipe interaction without adding execution commands in this task.
    3. Add a first-code-PR backlog with concrete files, TypeScript shapes, validation invariants, test matrix, and rollout order.
    4. Verify policy routing, repository health, docs IA, and formatting for the edited documentation.
  Verify Steps: |-
    1. Run `node .agentplane/policy/check-routing.mjs`.
    2. Run `agentplane doctor`.
    3. Run `bun run docs:ia:check`.
    4. Run `bun run format:check -- docs/developer/blueprints.mdx`.
    5. Manually review `docs/developer/blueprints.mdx` for implementation-readiness: v0 module plan, resolver I/O, validation invariants, built-in blueprint table, recipe boundaries, and rollout sequence are explicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T19:50:50.625Z — VERIFY — ok
    
    By: DOCS
    
    Note: Docs updated and verified. Checks passed: node .agentplane/policy/check-routing.mjs; agentplane doctor; bun run docs:ia:check; bun run format:check -- docs/developer/blueprints.mdx; git diff --check. Doctor still reports an unrelated existing warning for two shipped branch_pr tasks on base branch.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T19:46:28.983Z, excerpt_hash=sha256:ed2cfc6ea3c364a6e247af8b67f848dc94b346d66bf4b70a6b5c880ffbd72377
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Blueprint documentation now includes implementation-ready v0 contracts for model, built-ins, validation, resolver, explain output, recipe boundaries, evidence, test matrix, and rollout order.
      Impact: The first code implementation can start with types and validation without adding command execution or making code PR flow the default for analysis/content tasks.
      Resolution: Keep PR 1 scoped to model, built-ins, registry, and validation; defer resolver, explain command, ACR, and runner handoff to later PRs.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Expand blueprint implementation specification

Expand docs/developer/blueprints.mdx with implementation-ready references, v0 module plan, validation invariants, resolver contract, test matrix, and rollout sequence.

## Scope

- In scope: Expand docs/developer/blueprints.mdx with implementation-ready references, v0 module plan, validation invariants, resolver contract, test matrix, and rollout sequence.
- Out of scope: unrelated refactors not required for "Expand blueprint implementation specification".

## Plan

1. Expand docs/developer/blueprints.mdx into an implementation-ready blueprint specification: terminology, methodology references, boundaries, and why blueprints must not collapse into one code PR pipeline.
2. Define v0 contracts for model, registry, validator, resolver, evidence, and recipe interaction without adding execution commands in this task.
3. Add a first-code-PR backlog with concrete files, TypeScript shapes, validation invariants, test matrix, and rollout order.
4. Verify policy routing, repository health, docs IA, and formatting for the edited documentation.

## Verify Steps

1. Run `node .agentplane/policy/check-routing.mjs`.
2. Run `agentplane doctor`.
3. Run `bun run docs:ia:check`.
4. Run `bun run format:check -- docs/developer/blueprints.mdx`.
5. Manually review `docs/developer/blueprints.mdx` for implementation-readiness: v0 module plan, resolver I/O, validation invariants, built-in blueprint table, recipe boundaries, and rollout sequence are explicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T19:50:50.625Z — VERIFY — ok

By: DOCS

Note: Docs updated and verified. Checks passed: node .agentplane/policy/check-routing.mjs; agentplane doctor; bun run docs:ia:check; bun run format:check -- docs/developer/blueprints.mdx; git diff --check. Doctor still reports an unrelated existing warning for two shipped branch_pr tasks on base branch.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T19:46:28.983Z, excerpt_hash=sha256:ed2cfc6ea3c364a6e247af8b67f848dc94b346d66bf4b70a6b5c880ffbd72377

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Blueprint documentation now includes implementation-ready v0 contracts for model, built-ins, validation, resolver, explain output, recipe boundaries, evidence, test matrix, and rollout order.
  Impact: The first code implementation can start with types and validation without adding command execution or making code PR flow the default for analysis/content tasks.
  Resolution: Keep PR 1 scoped to model, built-ins, registry, and validation; defer resolver, explain command, ACR, and runner handoff to later PRs.
  Promotion: incident-candidate
  Fixability: external
