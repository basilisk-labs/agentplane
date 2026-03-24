---
id: "202603241029-VWK994"
title: "Harden custom runner structural result contract"
result_summary: "Restrict custom result-manifest structural fields to machine-safe identifiers and preserve source artifacts on invalid manifests."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603241029-4RY25C"
tags:
  - "code"
  - "runner"
  - "custom"
  - "contracts"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T11:45:44.548Z"
  updated_by: "ORCHESTRATOR"
  note: "Structural custom manifest hardening scoped and approved"
verification:
  state: "ok"
  updated_at: "2026-03-24T11:49:56.860Z"
  updated_by: "CODER"
  note: |-
    Command: bunx vitest run packages/agentplane/src/runner/result-manifest.test.ts packages/agentplane/src/runner/adapters/custom.test.ts
    Result: pass
    Evidence: 2 files, 12 tests passed; valid machine-safe capabilities_used and artifact labels were accepted, while structurally invalid labels and capability identifiers failed deterministically and preserved result.source.json plus result.invalid.json.
    Scope: custom runner manifest normalization and invalid-manifest preservation.
    
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
    Result: pass
    Evidence: 34 CLI tests passed, including the custom-runner execute path and the invalid structural manifest path that keeps normalized task-facing output while rejecting external structural fields.
    Scope: CLI consumption of the hardened custom manifest contract.
    
    Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: both package builds exited with code 0 after the runtime changes.
    Scope: source build regression guard for touched runner and CLI files.
commit:
  hash: "2d9731e2cf5f6ec191224f9927f3dba1c0c0f908"
  message: "✅ VWK994 code: done"
comments:
  -
    author: "CODER"
    body: "Start: harden custom runner structural manifest fields so capabilities_used and artifact labels accept only bounded machine-safe identifiers while preserving source artifacts for rejected manifests."
  -
    author: "CODER"
    body: "Verified: harden custom runner structural manifest fields so machine-safe capabilities and artifact labels pass while invalid identifiers fail deterministically and preserve source artifacts for inspection."
events:
  -
    type: "status"
    at: "2026-03-24T11:45:56.017Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: harden custom runner structural manifest fields so capabilities_used and artifact labels accept only bounded machine-safe identifiers while preserving source artifacts for rejected manifests."
  -
    type: "verify"
    at: "2026-03-24T11:49:56.860Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx vitest run packages/agentplane/src/runner/result-manifest.test.ts packages/agentplane/src/runner/adapters/custom.test.ts
      Result: pass
      Evidence: 2 files, 12 tests passed; valid machine-safe capabilities_used and artifact labels were accepted, while structurally invalid labels and capability identifiers failed deterministically and preserved result.source.json plus result.invalid.json.
      Scope: custom runner manifest normalization and invalid-manifest preservation.
      
      Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
      Result: pass
      Evidence: 34 CLI tests passed, including the custom-runner execute path and the invalid structural manifest path that keeps normalized task-facing output while rejecting external structural fields.
      Scope: CLI consumption of the hardened custom manifest contract.
      
      Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
      Result: pass
      Evidence: both package builds exited with code 0 after the runtime changes.
      Scope: source build regression guard for touched runner and CLI files.
  -
    type: "status"
    at: "2026-03-24T11:50:11.589Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: harden custom runner structural manifest fields so machine-safe capabilities and artifact labels pass while invalid identifiers fail deterministically and preserve source artifacts for inspection."
doc_version: 3
doc_updated_at: "2026-03-24T11:50:11.590Z"
doc_updated_by: "CODER"
description: "Restrict custom result-manifest structural fields such as capabilities_used and artifact labels to a stricter validated contract without widening prose projection."
sections:
  Summary: |-
    Harden custom runner structural result contract
    
    Restrict custom result-manifest structural fields such as capabilities_used and artifact labels to a stricter validated contract without widening prose projection.
  Scope: |-
    - In scope: Restrict custom result-manifest structural fields such as capabilities_used and artifact labels to a stricter validated contract without widening prose projection.
    - Out of scope: unrelated refactors not required for "Harden custom runner structural result contract".
  Plan: "1. Inspect current custom result-manifest normalization for capabilities_used and artifact labels. 2. Add strict validation helpers so structural fields accept only bounded, machine-safe identifiers while preserving result.source.json for rejected manifests. 3. Update custom adapter tests and targeted CLI regression coverage for deterministic invalid-manifest failures. 4. Run focused checks, record verification evidence, and finish with a single task-scoped commit."
  Verify Steps: |-
    1. Run focused custom-runner manifest tests. Expected: valid capabilities_used and artifact labels pass, while invalid structural values fail deterministically and preserve result.source.json.
    2. Exercise a CLI path that consumes the hardened custom manifest contract. Expected: runner output remains normalized and rejects invalid structural fields without leaking external prose into result.json.
    3. Run source build for @agentplaneorg/core and agentplane. Expected: touched runner and CLI files build without regressions.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T11:49:56.860Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/runner/result-manifest.test.ts packages/agentplane/src/runner/adapters/custom.test.ts
    Result: pass
    Evidence: 2 files, 12 tests passed; valid machine-safe capabilities_used and artifact labels were accepted, while structurally invalid labels and capability identifiers failed deterministically and preserved result.source.json plus result.invalid.json.
    Scope: custom runner manifest normalization and invalid-manifest preservation.
    
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
    Result: pass
    Evidence: 34 CLI tests passed, including the custom-runner execute path and the invalid structural manifest path that keeps normalized task-facing output while rejecting external structural fields.
    Scope: CLI consumption of the hardened custom manifest contract.
    
    Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: both package builds exited with code 0 after the runtime changes.
    Scope: source build regression guard for touched runner and CLI files.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T11:45:56.018Z, excerpt_hash=sha256:48f402b07847a923dd53c733de2bf13bd6958a3d3ad206346c3f85162652103f
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Harden custom runner structural result contract

Restrict custom result-manifest structural fields such as capabilities_used and artifact labels to a stricter validated contract without widening prose projection.

## Scope

- In scope: Restrict custom result-manifest structural fields such as capabilities_used and artifact labels to a stricter validated contract without widening prose projection.
- Out of scope: unrelated refactors not required for "Harden custom runner structural result contract".

## Plan

1. Inspect current custom result-manifest normalization for capabilities_used and artifact labels. 2. Add strict validation helpers so structural fields accept only bounded, machine-safe identifiers while preserving result.source.json for rejected manifests. 3. Update custom adapter tests and targeted CLI regression coverage for deterministic invalid-manifest failures. 4. Run focused checks, record verification evidence, and finish with a single task-scoped commit.

## Verify Steps

1. Run focused custom-runner manifest tests. Expected: valid capabilities_used and artifact labels pass, while invalid structural values fail deterministically and preserve result.source.json.
2. Exercise a CLI path that consumes the hardened custom manifest contract. Expected: runner output remains normalized and rejects invalid structural fields without leaking external prose into result.json.
3. Run source build for @agentplaneorg/core and agentplane. Expected: touched runner and CLI files build without regressions.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T11:49:56.860Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/runner/result-manifest.test.ts packages/agentplane/src/runner/adapters/custom.test.ts
Result: pass
Evidence: 2 files, 12 tests passed; valid machine-safe capabilities_used and artifact labels were accepted, while structurally invalid labels and capability identifiers failed deterministically and preserved result.source.json plus result.invalid.json.
Scope: custom runner manifest normalization and invalid-manifest preservation.

Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts
Result: pass
Evidence: 34 CLI tests passed, including the custom-runner execute path and the invalid structural manifest path that keeps normalized task-facing output while rejecting external structural fields.
Scope: CLI consumption of the hardened custom manifest contract.

Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
Result: pass
Evidence: both package builds exited with code 0 after the runtime changes.
Scope: source build regression guard for touched runner and CLI files.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T11:45:56.018Z, excerpt_hash=sha256:48f402b07847a923dd53c733de2bf13bd6958a3d3ad206346c3f85162652103f

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
