---
id: "202607250037-96WEYY"
title: "Make RF-04 replay cleanup retry-safe on macOS"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "milestone-alpha2"
  - "reliability"
  - "rf-04"
  - "v0.7"
verify:
  - "bunx vitest run packages/agentplane/src/cli/run-cli.critical.agent-efficiency-replay-hardening.test.ts"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-25T00:38:13.292Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved under the existing AgentPlane 0.7 authorization as a narrow release-reliability fix for a reproduced cleanup-only failure."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-07-25T00:39:06.635Z"
doc_updated_by: "ORCHESTRATOR"
description: "Prevent Finder-created .DS_Store files from turning successful RF-04 offline replay assertions into cleanup-only ENOTEMPTY failures. Keep the frozen 50-run/55-provider-episode evidence unchanged and add deterministic cleanup regression coverage."
sections:
  Summary: |-
    Make RF-04 replay cleanup retry-safe on macOS

    Prevent Finder-created .DS_Store files from turning successful RF-04 offline replay assertions into cleanup-only ENOTEMPTY failures. Keep the frozen 50-run/55-provider-episode evidence unchanged and add deterministic cleanup regression coverage.
  Scope: |-
    - In scope: Prevent Finder-created .DS_Store files from turning successful RF-04 offline replay assertions into cleanup-only ENOTEMPTY failures. Keep the frozen 50-run/55-provider-episode evidence unchanged and add deterministic cleanup regression coverage.
    - Out of scope: unrelated refactors not required for "Make RF-04 replay cleanup retry-safe on macOS".
  Plan: "1. Reproduce the cleanup-only ENOTEMPTY path without changing RF-04 replay assertions or frozen provider evidence. 2. Replace one-shot recursive cleanup with the smallest bounded retry-safe helper at the test boundary. 3. Add deterministic regression coverage that injects a late .DS_Store-style entry and proves bounded cleanup succeeds while real cleanup errors still surface. 4. Run the focused RF-04 hardening test repeatedly, test:critical, typecheck, scoped lint, format, and task gates."
  Verify Steps: |-
    1. Inject a late `.DS_Store`-style entry during temporary-root cleanup. Expected: bounded retry cleanup removes the tree without hiding the successful replay assertions.
    2. Inject a persistent cleanup failure. Expected: cleanup stops after the configured bound and surfaces the original error.
    3. Run the RF-04 replay-hardening test repeatedly. Expected: every run preserves the frozen 50 runs, 70 outcomes, 27 provider token cells, and 170 scalar cells.
    4. Run `bun run test:critical`, `bun run typecheck`, scoped ESLint, Prettier, routing, hotspot, and task-lint gates. Expected: all product assertions pass; no provider/model calls are made.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make RF-04 replay cleanup retry-safe on macOS

Prevent Finder-created .DS_Store files from turning successful RF-04 offline replay assertions into cleanup-only ENOTEMPTY failures. Keep the frozen 50-run/55-provider-episode evidence unchanged and add deterministic cleanup regression coverage.

## Scope

- In scope: Prevent Finder-created .DS_Store files from turning successful RF-04 offline replay assertions into cleanup-only ENOTEMPTY failures. Keep the frozen 50-run/55-provider-episode evidence unchanged and add deterministic cleanup regression coverage.
- Out of scope: unrelated refactors not required for "Make RF-04 replay cleanup retry-safe on macOS".

## Plan

1. Reproduce the cleanup-only ENOTEMPTY path without changing RF-04 replay assertions or frozen provider evidence. 2. Replace one-shot recursive cleanup with the smallest bounded retry-safe helper at the test boundary. 3. Add deterministic regression coverage that injects a late .DS_Store-style entry and proves bounded cleanup succeeds while real cleanup errors still surface. 4. Run the focused RF-04 hardening test repeatedly, test:critical, typecheck, scoped lint, format, and task gates.

## Verify Steps

1. Inject a late `.DS_Store`-style entry during temporary-root cleanup. Expected: bounded retry cleanup removes the tree without hiding the successful replay assertions.
2. Inject a persistent cleanup failure. Expected: cleanup stops after the configured bound and surfaces the original error.
3. Run the RF-04 replay-hardening test repeatedly. Expected: every run preserves the frozen 50 runs, 70 outcomes, 27 provider token cells, and 170 scalar cells.
4. Run `bun run test:critical`, `bun run typecheck`, scoped ESLint, Prettier, routing, hotspot, and task-lint gates. Expected: all product assertions pass; no provider/model calls are made.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
