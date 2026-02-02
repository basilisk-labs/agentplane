---
id: "202602020548-354P6W"
title: "Optimize test runtime and modularity"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["testing"]
comments:
  - { author: "ORCHESTRATOR", body: "Start: analyze current test suites and timings, then refactor into faster modular groups with updated scripts/docs; keep scope to Node CLI tests only." }
doc_version: 2
doc_updated_at: "2026-02-02T05:53:15+00:00"
doc_updated_by: "agentctl"
description: "Refactor Node.js tests to reduce runtime, split into modular suites, and update docs/scripts accordingly."
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

