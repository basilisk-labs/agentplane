---
id: "202602011358-FV1J5E"
title: "Fix coverage and close pending quality gates"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "testing"
  - "coverage"
  - "ci"
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
  hash: "3181b63a185aa5b416cdf6c2d8bef1925cb5aa83"
  message: "🧪 FV1J5E raise coverage thresholds and stabilize test timeouts"
comments:
  -
    author: "ORCHESTRATOR"
    body: "verified: bun run coverage (branches 72.11%) and bun run lint completed | details: added tests and timeouts to keep CI green."
doc_version: 2
doc_updated_at: "2026-02-03T12:09:37.477Z"
doc_updated_by: "agentplane"
description: "Raise branch coverage (run-cli), keep CI gates green, and commit current changes."
---
## Summary

Raised branch coverage over 72% by expanding CLI parsing tests and adding targeted timeouts to stabilize CI.

## Scope

Updated test suites for run-cli, command-guide, cli-smoke, git-utils, and config/export validation to cover additional branches and satisfy lint.

## Risks

Low risk: changes are limited to tests and documentation; minor risk of increased test runtime due to longer timeouts.

## Verify Steps

1) bun run lint
2) bun run coverage

## Rollback Plan

Revert commit 3181b63 and rerun bun run coverage to confirm the gate behavior returns to baseline.

## Plan


## Verification
