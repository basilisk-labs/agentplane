---
id: "202603130653-SDG861"
title: "Tighten publish workflow concurrency to release identity"
status: "TODO"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-03-13T06:55:24.005Z"
doc_updated_by: "ORCHESTRATOR"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
