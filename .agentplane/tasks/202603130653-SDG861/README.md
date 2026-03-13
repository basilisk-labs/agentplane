---
id: "202603130653-SDG861"
title: "Tighten publish workflow concurrency to release identity"
result_summary: "Publish workflow now serializes by release SHA or explicit dispatch identity, allowing queued duplicate runs to re-run detect against fresh registry state instead of canceling an active release."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T06:55:24.669Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T07:19:12.454Z"
  updated_by: "CODER"
  note: "Verified release-identity publish concurrency: publish workflow contract, workflows lint, and prettier all pass."
commit:
  hash: "b79905bfcfea020e1cadf3991b72b4cb35c088e5"
  message: "🧭 SDG861 task: apply release-identity publish concurrency"
comments:
  -
    author: "CODER"
    body: "Start: tighten publish workflow concurrency so manual dispatches and workflow_run publishes serialize by release identity instead of branch ref, without broadening the workflow contract."
  -
    author: "CODER"
    body: "Verified: publish workflow concurrency is now keyed to release identity instead of branch ref, duplicate runs queue rather than canceling an in-flight release, and the workflow contract/docs reflect the new behavior."
events:
  -
    type: "status"
    at: "2026-03-13T07:17:11.496Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: tighten publish workflow concurrency so manual dispatches and workflow_run publishes serialize by release identity instead of branch ref, without broadening the workflow contract."
  -
    type: "verify"
    at: "2026-03-13T07:19:12.454Z"
    author: "CODER"
    state: "ok"
    note: "Verified release-identity publish concurrency: publish workflow contract, workflows lint, and prettier all pass."
  -
    type: "status"
    at: "2026-03-13T07:20:08.026Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: publish workflow concurrency is now keyed to release identity instead of branch ref, duplicate runs queue rather than canceling an in-flight release, and the workflow contract/docs reflect the new behavior."
doc_version: 3
doc_updated_at: "2026-03-13T07:20:08.027Z"
doc_updated_by: "CODER"
description: "Avoid unrelated publish cancellations by keying concurrency to the release SHA or tag instead of a mutable branch ref."
id_source: "generated"
---
## Summary

Tighten publish workflow concurrency to release identity

Avoid unrelated publish cancellations by keying concurrency to the release SHA or tag instead of a mutable branch ref.

## Scope

- In scope: Avoid unrelated publish cancellations by keying concurrency to the release SHA or tag instead of a mutable branch ref.
- Out of scope: unrelated refactors not required for "Tighten publish workflow concurrency to release identity".

## Plan

1. Re-key publish workflow concurrency to release identity instead of a mutable branch ref.
2. Keep manual recovery on historical SHAs isolated from new mainline publish attempts.
3. Cover the workflow contract so concurrency drift is caught before release time.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/release/publish-workflow-contract.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: publish workflow contract covers release-identity concurrency.
2. Run `bun run workflows:lint`. Expected: publish workflow YAML remains valid after concurrency changes.
3. Inspect `.github/workflows/publish.yml`. Expected: concurrency is keyed to release SHA or tag instead of only branch ref.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T07:19:12.454Z — VERIFY — ok

By: CODER

Note: Verified release-identity publish concurrency: publish workflow contract, workflows lint, and prettier all pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T07:17:11.497Z, excerpt_hash=sha256:ef637f85aef23ed8da10711e9ea8f996901673d1d0ad277a36e4f4ab3519e27b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
