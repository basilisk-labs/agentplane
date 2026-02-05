---
id: "202602051201-7KW7RP"
title: "Verify: write Verification section and fail-back workflow"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: ["202602051201-F8YMCF"]
tags: ["workflow", "tasks", "verify", "code"]
verify: ["bun run test:fast"]
commit: { hash: "1877155613c8dc83d3f900708a47b0337b0d2d70", message: "✨ 7KW7RP verify writes Verification and fail-back" }
comments:
  - { author: "CODER", body: "Start: implement Verification section updates and fail-back workflow on verify failure." }
  - { author: "CODER", body: "Verified: bun run lint; bun run test:fast; hooks pre-commit; agentplane verify (Verification section updated)." }
doc_version: 2
doc_updated_at: "2026-02-05T12:51:30.876Z"
doc_updated_by: "CODER"
description: "Write Verification results to task README and return task to DOING with comments on failure."
id_source: "generated"
---
## Summary

Make verify write a Verification section and fail back to DOING with a comment on errors.

## Scope

Update cmdVerify to write Verification content, track failure details, update task status/comments, and add unit tests for pass/fail behavior.

## Risks

Verification now requires task docs support; failure handling updates task state and could be noisy if commands are flaky.

## Verify Steps

cmd: bun run lint
cmd: bun run test:fast
cmd: node packages/agentplane/bin/agentplane.js hooks run pre-commit

## Verification

Pending: execute verify after implementation.

## Rollback Plan

Revert verify workflow changes and restore previous cmdVerify behavior; remove added tests.
