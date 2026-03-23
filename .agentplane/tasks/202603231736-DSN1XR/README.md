---
id: "202603231736-DSN1XR"
title: "Add structured runner result manifest contract"
result_summary: "runner: structured result manifest contract"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603231736-74XMMD"
tags:
  - "code"
  - "runner"
  - "contracts"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T17:39:29.658Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T18:31:46.009Z"
  updated_by: "CODER"
  note: "Added a structured runner result manifest contract with result.json artifacts, taught custom/codex adapters to read or synthesize it, and verified it through adapter tests, CLI integration, builds, and doctor."
commit:
  hash: "a0728d9871a71768a23d081a577be5ec0a17c2b1"
  message: "✅ DSN1XR code: done"
comments:
  -
    author: "CODER"
    body: "Start: replace ad-hoc stdout/stderr runner results with a structured result manifest contract that adapters can emit and task persistence can consume consistently."
  -
    author: "CODER"
    body: "Verified: Added a structured runner result manifest contract with result.json artifacts, taught custom and codex adapters to read or synthesize it, and verified the manifest flow through adapter tests, CLI integration, builds, and doctor."
events:
  -
    type: "status"
    at: "2026-03-23T18:18:20.927Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace ad-hoc stdout/stderr runner results with a structured result manifest contract that adapters can emit and task persistence can consume consistently."
  -
    type: "verify"
    at: "2026-03-23T18:31:46.009Z"
    author: "CODER"
    state: "ok"
    note: "Added a structured runner result manifest contract with result.json artifacts, taught custom/codex adapters to read or synthesize it, and verified it through adapter tests, CLI integration, builds, and doctor."
  -
    type: "status"
    at: "2026-03-23T18:34:03.457Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Added a structured runner result manifest contract with result.json artifacts, taught custom and codex adapters to read or synthesize it, and verified the manifest flow through adapter tests, CLI integration, builds, and doctor."
doc_version: 3
doc_updated_at: "2026-03-23T18:34:03.458Z"
doc_updated_by: "CODER"
description: "Teach codex and custom runners to emit and persist a structured result manifest so universal runner integrations are not limited to stdout/stderr summaries."
sections:
  Summary: |-
    Add structured runner result manifest contract
    
    Teach codex and custom runners to emit and persist a structured result manifest so universal runner integrations are not limited to stdout/stderr summaries.
  Scope: |-
    - In scope: Teach codex and custom runners to emit and persist a structured result manifest so universal runner integrations are not limited to stdout/stderr summaries.
    - Out of scope: unrelated refactors not required for "Add structured runner result manifest contract".
  Plan: |-
    1. Define a structured runner result manifest that adapters can emit and the shared runner layer can persist alongside run-state.
    2. Teach codex and custom adapters to read or write that manifest while preserving current stdout/stderr summaries as fallback.
    3. Update bundle/result tests so universal runners can return findings, artifact paths, verification hints, and metrics without bespoke parsing.
  Verify Steps: |-
    1. Run adapter tests for codex and custom runners. Expected: both adapters persist the structured result manifest and preserve fallback summaries.
    2. Run scenario/task-run CLI integration that inspects result artifacts. Expected: findings, metrics, and output paths are visible through the shared contract.
    3. Review a produced run directory. Expected: structured result data exists without forcing consumers to parse freeform stdout.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T18:31:46.009Z — VERIFY — ok
    
    By: CODER
    
    Note: Added a structured runner result manifest contract with result.json artifacts, taught custom/codex adapters to read or synthesize it, and verified it through adapter tests, CLI integration, builds, and doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T18:18:20.928Z, excerpt_hash=sha256:815ecdfc08e92411bf42b9483366cdb5b95683b1c8e653a070bc4d6c8d477bf6
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add structured runner result manifest contract

Teach codex and custom runners to emit and persist a structured result manifest so universal runner integrations are not limited to stdout/stderr summaries.

## Scope

- In scope: Teach codex and custom runners to emit and persist a structured result manifest so universal runner integrations are not limited to stdout/stderr summaries.
- Out of scope: unrelated refactors not required for "Add structured runner result manifest contract".

## Plan

1. Define a structured runner result manifest that adapters can emit and the shared runner layer can persist alongside run-state.
2. Teach codex and custom adapters to read or write that manifest while preserving current stdout/stderr summaries as fallback.
3. Update bundle/result tests so universal runners can return findings, artifact paths, verification hints, and metrics without bespoke parsing.

## Verify Steps

1. Run adapter tests for codex and custom runners. Expected: both adapters persist the structured result manifest and preserve fallback summaries.
2. Run scenario/task-run CLI integration that inspects result artifacts. Expected: findings, metrics, and output paths are visible through the shared contract.
3. Review a produced run directory. Expected: structured result data exists without forcing consumers to parse freeform stdout.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T18:31:46.009Z — VERIFY — ok

By: CODER

Note: Added a structured runner result manifest contract with result.json artifacts, taught custom/codex adapters to read or synthesize it, and verified it through adapter tests, CLI integration, builds, and doctor.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T18:18:20.928Z, excerpt_hash=sha256:815ecdfc08e92411bf42b9483366cdb5b95683b1c8e653a070bc4d6c8d477bf6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
