---
id: "202604221918-QX0XJG"
title: "Add oversized test ratchet"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202604221918-C1KTM7"
tags:
  - "code"
  - "test"
verify:
  - "bun run hotspots:check"
  - "bun run vitest:projects:check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T19:39:32.256Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T19:42:45.424Z"
  updated_by: "CODER"
  note: "Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/hotspot-report-script.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 8 tests passed. Command: bun run hotspots:check; Result: pass; Evidence: hotspot thresholds passed and oversized test baseline OK (16 entries, threshold>1000). Command: bun run vitest:projects:check; Result: pass; Evidence: vitest workspace projects OK and test routing OK."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: adding a deterministic oversized test ratchet baseline so current large-test debt is explicit and future growth fails."
events:
  -
    type: "status"
    at: "2026-04-22T19:39:32.626Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: adding a deterministic oversized test ratchet baseline so current large-test debt is explicit and future growth fails."
  -
    type: "verify"
    at: "2026-04-22T19:42:45.424Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/hotspot-report-script.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 8 tests passed. Command: bun run hotspots:check; Result: pass; Evidence: hotspot thresholds passed and oversized test baseline OK (16 entries, threshold>1000). Command: bun run vitest:projects:check; Result: pass; Evidence: vitest workspace projects OK and test routing OK."
doc_version: 3
doc_updated_at: "2026-04-22T19:42:45.426Z"
doc_updated_by: "CODER"
description: "Add a baseline-backed oversized-test ratchet that allows current large tests but fails on new oversized tests or growth beyond the checked-in baseline."
sections:
  Summary: |-
    Add oversized test ratchet
    
    Add a baseline-backed oversized-test ratchet that allows current large tests but fails on new oversized tests or growth beyond the checked-in baseline.
  Scope: |-
    - In scope: add a baseline-backed ratchet for oversized test files.
    - In scope: allow current oversized tests only through an explicit checked-in baseline.
    - In scope: fail on new oversized tests or growth beyond baseline unless baseline is intentionally updated.
    - Out of scope: splitting oversized tests; that is a follow-up once guardrails are active.
  Plan: "Add an oversized-test ratchet backed by a deterministic baseline so the current large-test debt is explicit and future growth fails automatically."
  Verify Steps: |-
    1. Run `bun run hotspots:check`. Expected: pass with oversized-test baseline enforced.
    2. Run `bun run vitest:projects:check`. Expected: pass.
    3. Inspect the baseline artifact. Expected: it contains only current oversized tests and deterministic line counts.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T19:42:45.424Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/hotspot-report-script.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 8 tests passed. Command: bun run hotspots:check; Result: pass; Evidence: hotspot thresholds passed and oversized test baseline OK (16 entries, threshold>1000). Command: bun run vitest:projects:check; Result: pass; Evidence: vitest workspace projects OK and test routing OK.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T19:39:32.633Z, excerpt_hash=sha256:a59415a626636f6b88222b57edec4521e20b007a5cbbfdd26e96e78fb106fa57
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add oversized test ratchet

Add a baseline-backed oversized-test ratchet that allows current large tests but fails on new oversized tests or growth beyond the checked-in baseline.

## Scope

- In scope: add a baseline-backed ratchet for oversized test files.
- In scope: allow current oversized tests only through an explicit checked-in baseline.
- In scope: fail on new oversized tests or growth beyond baseline unless baseline is intentionally updated.
- Out of scope: splitting oversized tests; that is a follow-up once guardrails are active.

## Plan

Add an oversized-test ratchet backed by a deterministic baseline so the current large-test debt is explicit and future growth fails automatically.

## Verify Steps

1. Run `bun run hotspots:check`. Expected: pass with oversized-test baseline enforced.
2. Run `bun run vitest:projects:check`. Expected: pass.
3. Inspect the baseline artifact. Expected: it contains only current oversized tests and deterministic line counts.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T19:42:45.424Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/hotspot-report-script.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 8 tests passed. Command: bun run hotspots:check; Result: pass; Evidence: hotspot thresholds passed and oversized test baseline OK (16 entries, threshold>1000). Command: bun run vitest:projects:check; Result: pass; Evidence: vitest workspace projects OK and test routing OK.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T19:39:32.633Z, excerpt_hash=sha256:a59415a626636f6b88222b57edec4521e20b007a5cbbfdd26e96e78fb106fa57

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
