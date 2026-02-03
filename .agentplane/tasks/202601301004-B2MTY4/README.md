---
id: "202601301004-B2MTY4"
title: "Node CLI parity: commit/guard flags"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: ["202601300958-HRNHRH"]
tags: ["nodejs", "cli", "parity", "git"]
verify: []
commit: { hash: "6466b3577ad6c67ca319aa4cd4d23cf28c0db4c3", message: "B2MTY4 align guard/commit flags" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: parity for commit/guard flags; review agentctl behavior and align Node CLI." }
  - { author: "ORCHESTRATOR", body: "verified: bun run test | details: packages/agentplane/src/run-cli.test.ts" }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:25.684Z"
doc_updated_by: "agentplane"
description: "Align agentplane commit/guard flags with agentctl (allow-tasks, require-clean, quiet; guard commit parity)."
---
## Summary

Align guard/commit flags with agentctl (auto-allow, allow-dirty, quiet), add guard clean output, and update help/tests.


## Scope

Add guard clean --quiet, guard commit --auto-allow/--allow-dirty, guard suggest-allow empty check, update help text and run-cli tests.


## Risks

Guard flags now accept extra options; output changes for guard clean could affect scripts relying on empty stdout.


## Verify Steps

bun run test -- packages/agentplane/src/run-cli.test.ts


## Rollback Plan

git revert <commit>
