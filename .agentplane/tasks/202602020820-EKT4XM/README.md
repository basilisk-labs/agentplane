---
id: "202602020820-EKT4XM"
title: "Fix CLI smoke test for codex IDE flag"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["testing"]
verify: []
commit: { hash: "65a6acd5aea7f06191fee6407073e4fc4187196e", message: "🐛 EKT4XM fix CLI smoke test IDE flag" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: fix CLI smoke test to use supported IDE flag so pre-push passes; scope limited to test update and full test run; risk: other tests may still fail and require follow-up" }
  - { author: "ORCHESTRATOR", body: "verified: bun run test:full | details: pre-commit hooks (format/lint/test-fast) passed during commit; no additional changes." }
  - { author: "ORCHESTRATOR", body: "verified: bun run test:full | details: pre-commit hooks (format/lint/test-fast) passed during commit; no additional changes." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:44.068Z"
doc_updated_by: "agentplane"
description: "Update CLI smoke test to use supported --ide value so pre-push and full test suite pass."
---
## Summary

Updated the CLI smoke test to use the supported codex IDE flag so init succeeds under current CLI options.


## Scope

Change only the CLI smoke test flag value; no production code changes.


## Risks

Low risk: test could still fail if CLI flags change again; in that case update the smoke test to match the CLI contract.


## Verify Steps

bun run test:full


## Rollback Plan

Revert the smoke test change in packages/agentplane/src/cli-smoke.test.ts if it causes mismatches with the CLI contract.
