---
id: "202603130653-XHH0FZ"
title: "Teach release recovery to read publish-result artifact"
status: "TODO"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T06:55:24.447Z"
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
doc_updated_at: "2026-03-13T06:55:23.558Z"
doc_updated_by: "ORCHESTRATOR"
description: "Consume the publish-result artifact when present so release recovery reports published outcomes from canonical data before falling back to inference."
id_source: "generated"
---
## Summary

Teach release recovery to read publish-result artifact

Consume the publish-result artifact when present so release recovery reports published outcomes from canonical data before falling back to inference.

## Scope

- In scope: Consume the publish-result artifact when present so release recovery reports published outcomes from canonical data before falling back to inference.
- Out of scope: unrelated refactors not required for "Teach release recovery to read publish-result artifact".

## Plan

1. Teach `release:recover` to prefer `publish-result` artifact data when a publish run exists for the release SHA.
2. Fall back to workflow-state inference only when the publish-result artifact is missing or unavailable.
3. Cover both canonical and fallback paths with release recovery regression tests.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/release-recovery-script.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: recovery prefers publish-result data when present and preserves fallback behavior otherwise.
2. Run `bun run test:release:critical`. Expected: release recovery and smoke paths stay green after the artifact consumption change.
3. Inspect `scripts/check-release-recovery-state.mjs`. Expected: publish-result artifact is read before publish workflow status inference.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
