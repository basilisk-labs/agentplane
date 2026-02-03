---
id: "202601301004-VWC1C3"
title: "Node CLI parity: start/block/finish flags"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: ["202601300958-HRNHRH"]
tags: ["nodejs", "cli", "parity", "workflow"]
verify: []
commit: { hash: "dde1e7b60f59644ce330be1134035a739b180408", message: "VWC1C3 align start/block/finish parity and integrate finish" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: Extend start/block/finish flags for parity with agentctl and update tests." }
  - { author: "ORCHESTRATOR", body: "verified: bun run test | details: packages/agentplane/src/run-cli.test.ts" }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:26.449Z"
doc_updated_by: "agentplane"
description: "Bring start/block/finish in Node CLI to agentctl parity (commit-from-comment options, allow/auto-allow, require-clean, quiet/force, multi-task finish, status-commit behavior, skip-verify)."
---
## Summary

Extend start/block/finish parity, add readiness checks, and align integrate->finish invocation.


## Scope

Update run-cli start/block/finish flag parsing and behaviors, allow multi-task finish, enforce dependency readiness, update integrate finish call, refresh help text, and add/adjust run-cli tests.


## Risks

Potential behavior change if DONE tasks are re-finished without --force or if status commit policy is misapplied; finish now exports/lints tasks.json on every call.


## Verify Steps

bun run test -- packages/agentplane/src/run-cli.test.ts


## Rollback Plan

git revert <commit>
