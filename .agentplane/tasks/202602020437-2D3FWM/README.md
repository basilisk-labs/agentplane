---
id: "202602020437-2D3FWM"
title: "Optimize test runtime and modularity"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["testing"]
verify: []
commit: { hash: "f26e41da2b95fa868a5e158a525f8441d5f378fe", message: "⚡ 2D3FWM optimize test suites: add package-scoped scripts; split cli smoke; update docs" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: optimize test runtime and modularity; audit suites, split fast/full, reduce timeouts, update docs/CI guidance." }
  - { author: "ORCHESTRATOR", body: "verified: ran bun run test:fast | details: split CLI smoke into its own suite; added package-scoped test scripts; updated testing docs for new commands." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:40.730Z"
doc_updated_by: "agentplane"
description: "Speed up test runs, split suites for faster feedback, reduce timeouts/flakes, and update docs/CI as needed."
---
## Summary

Optimize test runtime and modularity across CLI suites while keeping coverage and stability.

## Scope

Audit current test scripts/suites, split into fast/targeted sets, optimize slow/flaky areas, and update docs/CI guidance.

## Risks

Suite reorganization could miss coverage or change execution order; tighter timeouts may surface new failures.

## Verify Steps

Run fast suite and targeted suites; run full suite if time allows; ensure docs updated.

## Rollback Plan

Revert test script/suite changes to prior config and remove new docs if instability persists.
