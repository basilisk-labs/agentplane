---
id: "202602011805-EFYV0M"
title: "Optimize test runtime and modularity"
status: "TODO"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["testing"]
doc_version: 2
doc_updated_at: "2026-02-01T18:21:50+00:00"
doc_updated_by: "agentctl"
description: "Speed up slow/flaky tests, split heavy suites, and refine fast/full test entrypoints."
---
## Summary

Speed up and stabilize tests by splitting slow suites, refining fast/full entrypoints, and tightening per-suite timeouts.

## Scope

- Identify slow/flaky test suites and heavy commands
- Split large test files into modular suites where feasible
- Refine fast/full test scripts to keep fast runs quick
- Adjust per-suite timeouts or setup to reduce flakes

## Risks

- Test suite refactors may change coverage or expectations
- Adjusting scripts could affect CI/pre-push behavior

## Verify Steps

- bun run test:cli:scenario
- bun run test:cli:recipes

## Rollback Plan

- Revert the commit for this task
- Restore previous test suites/scripts and timeouts

