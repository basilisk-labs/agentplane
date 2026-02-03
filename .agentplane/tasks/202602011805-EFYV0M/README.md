---
id: "202602011805-EFYV0M"
title: "Optimize test runtime and modularity"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["testing"]
verify: []
commit: { hash: "c1a49b8e91e5ef3b457216762e480c26b1f7c910", message: "⚡ EFYV0M speed up cli tests: reuse git template; add cli unit/slow scripts; update docs" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: optimize test runtime by modularizing CLI suites and reducing per-test git setup; update scripts/docs accordingly while keeping coverage." }
  - { author: "ORCHESTRATOR", body: "verified: bun run test:fast | details: bun run test:cli:unit; bun run test:cli:slow; pre-commit hooks (format/lint/test-fast) passed." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:38.853Z"
doc_updated_by: "agentplane"
description: "Speed up slow/flaky tests, split heavy suites, and refine fast/full test entrypoints."
---
## Summary

Speed up Node.js CLI tests by reusing a cached git repo template and add modular CLI test scripts (unit vs slow suites).


## Scope

Update test helpers to reuse git repo templates, add CLI test scripts for unit/slow suites, and refresh testing docs accordingly.


## Risks

Cached git templates could mask issues if tests rely on a freshly initialized repo; ensure template stays minimal and empty.


## Verify Steps

bun run test:fast\nbun run test:cli:unit\nbun run test:cli:slow


## Rollback Plan

Revert helper/script/doc changes to restore per-test git init and prior CLI test commands.
