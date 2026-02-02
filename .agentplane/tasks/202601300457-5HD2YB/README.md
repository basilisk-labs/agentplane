---
id: "202601300457-5HD2YB"
title: "Raise task-backend branch coverage to 72"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["code", "backend"]
verify: ["bun run coverage"]
commit: { hash: "04fd35075ad5c26d7d35597595f10660a471ae5b", message: "✨ 5HD2YB raise branch coverage to 72 with expanded tests" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: raise branch coverage to 72 by expanding task-backend tests and restoring vitest threshold." }
  - { author: "ORCHESTRATOR", body: "verified: ran bun run coverage on 2026-01-30 | details: all 347 tests passed and branch coverage reached 72.02%." }
doc_version: 2
doc_updated_at: "2026-01-30T04:57:38+00:00"
doc_updated_by: "agentctl"
description: "Add tests to lift branch coverage back to 72% without lowering thresholds."
---
## Summary

Restore branch coverage threshold to 72% by adding targeted tests for task-backend branches.

## Context

Branch coverage was temporarily lowered to 66 to pass CI; goal is to raise real coverage and restore threshold to 72.

## Scope

Add tests in task-backend.test.ts (or related files) to exercise remaining branches; update vitest coverage thresholds back to 72.

## Risks

Extra tests could be brittle if they depend on internal error messages; keep assertions resilient. Risk of masking coverage gaps by changing thresholds; avoid lowering thresholds.

## Verify Steps

bun run coverage

## Rollback Plan

Revert commit to restore previous tests/thresholds if coverage regressions or unstable tests appear.

## Notes

Focus on untested branches in task-backend helpers and error paths.
