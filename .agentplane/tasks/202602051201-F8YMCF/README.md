---
id: "202602051201-F8YMCF"
title: "Verify: parse Verify Steps and execute commands"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602051201-MNK3HD"
tags:
  - "workflow"
  - "cli"
  - "verify"
  - "code"
verify:
  - "bun run test:fast"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "3df65582ac7ff8d577d1450769720a846f3d2379"
  message: "✨ F8YMCF verify from README steps"
comments:
  -
    author: "CODER"
    body: "Start: implement Verify Steps parsing (cmd vs human) and wire verify to execute commands from README."
  -
    author: "CODER"
    body: "Verified: bun run lint; bun run test:fast; agentplane verify 202602051201-F8YMCF."
doc_version: 2
doc_updated_at: "2026-02-05T12:22:57.337Z"
doc_updated_by: "CODER"
description: "Parse Verify Steps from task README (cmd vs human), execute commands, and collect results for verification."
id_source: "generated"
---
## Summary

Added Verify Steps parsing (cmd vs human) and wired verify to execute README commands with manual-step output.

## Scope

Parse Verify Steps section, extract cmd: lines, display manual steps, and prefer README commands over task.verify; added workflow verify test coverage.

## Risks

Verify behavior now depends on README content; missing cmd: lines yields no commands unless task.verify is populated.

## Verify Steps

bun run lint\nbun run test:fast

## Rollback Plan

Revert the verify parsing commit to restore task.verify-only behavior.

## Plan


## Verification
