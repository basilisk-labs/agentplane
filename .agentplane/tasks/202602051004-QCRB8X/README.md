---
id: "202602051004-QCRB8X"
title: "Stabilize hooks pre-commit test env"
status: "DONE"
priority: "high"
owner: "TESTER"
depends_on: []
tags: ["testing", "hooks"]
verify: []
commit: { hash: "42af88597c5e55218d3fb344dbc0aed8d1ef4d44", message: "🧪 QCRB8X tests" }
comments:
  - { author: "TESTER", body: "Start: stabilize hooks pre-commit test against env leakage." }
  - { author: "TESTER", body: "Verified: bun run format:check; bun run lint; bun run test:fast. Commit: 42af88597c5e." }
doc_version: 2
doc_updated_at: "2026-02-05T10:06:00.644Z"
doc_updated_by: "TESTER"
description: "Ensure workflow hook test unsets AGENT_PLANE_ALLOW_TASKS so it behaves consistently under agentplane commit."
id_source: "generated"
---
## Summary

Unset AGENT_PLANE_ALLOW_TASKS during hooks pre-commit test to avoid env leakage.

## Scope

Updated workflow hook test in packages/agentplane/src/commands/workflow.test.ts.

## Risks

Low risk; test-only change.

## Verify Steps

bun run format:check\nbun run lint\nbun run test:fast

## Rollback Plan

Revert commit 42af88597c5e if the test change is unwanted.
