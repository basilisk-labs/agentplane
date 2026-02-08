---
id: "202602081506-R18Y1Q"
title: "Close commit: add --close mode to agentplane commit"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602081505-GYB2MA"
tags:
  - "cli"
  - "code"
  - "git"
verify:
  - "bun run test:full"
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T15:07:24.113Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T15:44:11.711Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: bun run typecheck; bun run lint; bun run test:full. Manual: commit --close produces policy-compliant subject and stages only task README."
commit:
  hash: "140165022f7de84daf180710276976719d4d49dc"
  message: "✨ R18Y1Q commit: add deterministic close commits"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: add deterministic close-commit mode (agentplane commit --close) that builds an informative close message from task snapshot + verification + git diff summary."
  -
    author: "ORCHESTRATOR"
    body: "Verified: bun run test:full; close mode stages only the task README, builds a policy-compliant subject, and derives key files from the recorded implementation commit."
doc_version: 2
doc_updated_at: "2026-02-08T15:44:30.296Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add a close-commit mode that builds commit subject/body deterministically from task snapshot + verification + git diff summary; stage only the task README and commit with the generated message."
id_source: "generated"
---
## Summary

(See title/description.)

## Scope

(See description.)

## Plan

(See task README Plan section.)

## Risks

- Regressions in CLI behavior or tests due to contract changes.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T15:44:11.711Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: bun run typecheck; bun run lint; bun run test:full. Manual: commit --close produces policy-compliant subject and stages only task README.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T15:43:49.261Z, excerpt_hash=sha256:f8d7c713cf2cecba534de6f587a1d09adef3edf0b4d46f9d15a6617ec27eeeab

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the implementation commit and re-run bun run test:full.

## Verify Steps

### Scope
- Implement `agentplane commit <task-id> --close`.
- Ensure generated close message is deterministic and policy-compliant.
- Ensure key files are derived from the recorded implementation commit.

### Checks
- bun run typecheck
- bun run lint
- bun run test:full

### Pass criteria
- All checks pass.
- CLI tests cover `agentplane commit <task-id> --close`.
