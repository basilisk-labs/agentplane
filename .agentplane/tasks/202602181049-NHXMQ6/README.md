---
id: "202602181049-NHXMQ6"
title: "Align local pre-push with CI, run full verify, prep patch release"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
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
    body: "Start: align local pre-push with CI commands, clear docs format warnings, run full verify suite, and prepare a patch release candidate with validated artifacts."
events:
  -
    type: "status"
    at: "2026-02-18T10:50:04.120Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: align local pre-push with CI commands, clear docs format warnings, run full verify suite, and prepare a patch release candidate with validated artifacts."
doc_version: 2
doc_updated_at: "2026-02-18T10:50:04.120Z"
doc_updated_by: "CODER"
description: "Make local pre-push checks mirror GitHub CI (including format checks), run full verification suite, and prepare patch release artifacts."
id_source: "generated"
---
## Summary

Align local pre-push checks with GitHub CI, fix format-check failures, run full verification, and prepare patch release artifacts.

## Scope

In scope: CI/pre-push scripts/hooks, affected docs formatting, release version/changelog metadata for patch release, and verification commands. Out of scope: feature changes unrelated to CI parity/release gating.

## Plan

1) Inspect GitHub CI workflows and local pre-push hooks/scripts for drift. 2) Update local pre-push to execute the same quality gates as CI. 3) Apply formatting fixes for failing docs and any related generated artifacts. 4) Run full verification suite equivalent to CI/release gates. 5) Prepare patch release version bump and notes; run release preflight checks.

## Risks

Risk 1: local parity may miss OS-specific differences; mitigate by matching command set and using strict exits. Risk 2: release bump may include unrelated changes; mitigate by tight allowlist and clean staged diff review. Risk 3: docs formatter may touch many files; mitigate by formatting only required scope first and then checking.

## Verify Steps

1) bun run format:check. 2) bun run lint. 3) bun run typecheck. 4) bun run test. 5) bun run test:cli:core. 6) Execute the local pre-push/CI parity command and confirm pass. 7) Run release preflight/check command(s) used before patch publish.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

If verification fails, revert the task commit(s) with git revert in reverse order, restore previous hook/script behavior, and re-run baseline CI-equivalent checks.

## Context

Windows CI currently fails format:check with Prettier warnings across docs/*.mdx. User requested local pre-push parity with GitHub CI, full test pass, and patch release preparation.
