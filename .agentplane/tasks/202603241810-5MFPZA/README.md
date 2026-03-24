---
id: "202603241810-5MFPZA"
title: "Probe custom wrapper sandbox support matrix"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "custom"
  - "sandbox"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T18:11:11.773Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: probe the codex sandbox wrapper against the custom-runner write contract, then harden the unsupported-sandbox refusal path and the documented support matrix so the wrapper mode stays fail-closed and honest."
events:
  -
    type: "status"
    at: "2026-03-24T18:11:13.191Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: probe the codex sandbox wrapper against the custom-runner write contract, then harden the unsupported-sandbox refusal path and the documented support matrix so the wrapper mode stays fail-closed and honest."
doc_version: 3
doc_updated_at: "2026-03-24T18:13:01.123Z"
doc_updated_by: "CODER"
description: "Probe whether codex sandbox wrapper can honestly support additional custom-runner sandbox modes beyond workspace-write, then codify the resulting support matrix in adapter behavior, tests, and docs without weakening fail-closed semantics."
sections:
  Summary: |-
    Probe custom wrapper sandbox support matrix
    
    Probe whether codex sandbox wrapper can honestly support additional custom-runner sandbox modes beyond workspace-write, then codify the resulting support matrix in adapter behavior, tests, and docs without weakening fail-closed semantics.
  Scope: |-
    - In scope: Probe whether codex sandbox wrapper can honestly support additional custom-runner sandbox modes beyond workspace-write, then codify the resulting support matrix in adapter behavior, tests, and docs without weakening fail-closed semantics.
    - Out of scope: unrelated refactors not required for "Probe custom wrapper sandbox support matrix".
  Plan: |-
    1. Probe the current codex sandbox wrapper modes against the custom-runner write requirements to determine whether read-only support is technically compatible with the shared runner contract.
    2. Update the custom wrapper enforcement path so unsupported sandbox values fail closed with a precise reason tied to required runner write artifacts rather than a generic unsupported-values message.
    3. Add focused tests and docs that codify the resulting support matrix and keep the contract honest for future wrapper extensions.
  Verify Steps: |-
    1. Run bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/policy-decision.test.ts. Expected: the custom adapter support matrix and refusal reasons stay deterministic.
    2. Run bun run --filter=agentplane build. Expected: the runner package builds cleanly after the support-matrix changes.
    3. Inspect the updated adapter/docs contract for custom wrapper sandbox support. Expected: unsupported modes explain the write-contract incompatibility explicitly and supported modes remain narrow and honest.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "- Manual probe evidence: codex sandbox macos without --full-auto blocked writes to both cwd and TMPDIR, while codex sandbox macos --full-auto allowed both. Because the shared custom-runner contract must write result and trace artifacts under run_dir, read-only wrapper semantics remain incompatible and must stay fail-closed."
id_source: "generated"
---
## Summary

Probe custom wrapper sandbox support matrix

Probe whether codex sandbox wrapper can honestly support additional custom-runner sandbox modes beyond workspace-write, then codify the resulting support matrix in adapter behavior, tests, and docs without weakening fail-closed semantics.

## Scope

- In scope: Probe whether codex sandbox wrapper can honestly support additional custom-runner sandbox modes beyond workspace-write, then codify the resulting support matrix in adapter behavior, tests, and docs without weakening fail-closed semantics.
- Out of scope: unrelated refactors not required for "Probe custom wrapper sandbox support matrix".

## Plan

1. Probe the current codex sandbox wrapper modes against the custom-runner write requirements to determine whether read-only support is technically compatible with the shared runner contract.
2. Update the custom wrapper enforcement path so unsupported sandbox values fail closed with a precise reason tied to required runner write artifacts rather than a generic unsupported-values message.
3. Add focused tests and docs that codify the resulting support matrix and keep the contract honest for future wrapper extensions.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/policy-decision.test.ts. Expected: the custom adapter support matrix and refusal reasons stay deterministic.
2. Run bun run --filter=agentplane build. Expected: the runner package builds cleanly after the support-matrix changes.
3. Inspect the updated adapter/docs contract for custom wrapper sandbox support. Expected: unsupported modes explain the write-contract incompatibility explicitly and supported modes remain narrow and honest.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Manual probe evidence: codex sandbox macos without --full-auto blocked writes to both cwd and TMPDIR, while codex sandbox macos --full-auto allowed both. Because the shared custom-runner contract must write result and trace artifacts under run_dir, read-only wrapper semantics remain incompatible and must stay fail-closed.
