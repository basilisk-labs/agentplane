---
id: "202602011745-1KSBF8"
title: "Optimize test runs and split fast/full suites"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "testing"
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
commit:
  hash: "edce441b3d5c3f65c01265fa365b89ee2c94b06a"
  message: "⚡ 1KSBF8 2BER2W Z5WV9G BJRJ61 speed up tests: add fast/full/cli scripts; update hooks; document workflow"
comments: []
doc_version: 2
doc_updated_at: "2026-02-01T17:54:22+00:00"
doc_updated_by: "agentctl"
description: "Audit current test commands, identify slow suites/timeouts, and introduce modular fast vs full test entrypoints so full runs are only required before commit/push. Update scripts/docs and optional hooks if appropriate."
---
## Summary

Optimized test workflow by splitting fast vs full suites and documenting the new commands and hook behavior.

## Scope

Introduced fast/full/CLI test scripts, adjusted git hooks to run appropriate suites, and updated testing docs.

## Risks

Fast suite skips CLI integration tests; ensure full tests still run before pushes/commits to prevent regressions.

## Verify Steps

bun run test:fast

## Rollback Plan

Revert package.json, lefthook.yml, and testing docs to restore the previous single-suite workflow.

## Plan


## Verification
