---
id: "202602081505-GYB2MA"
title: "Finish: require --result for non-spike tasks"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "cli"
  - "code"
  - "tasks"
verify:
  - "bun run test:full"
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T15:07:23.482Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T15:20:05.301Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: finish now supports --result/--risk/--breaking (single-task only) and requires --result for non-spike single-task finishes; result_summary is persisted in task frontmatter. bun run typecheck/lint/test:full PASS (704 tests)."
commit:
  hash: "743e43710a22c0285d5a979a10b91c4cf35e3257"
  message: "✨ GYB2MA tasks: require finish --result and persist result_summary"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: require a one-line --result summary on finish for non-spike tasks and persist it in task metadata (frontmatter) for deterministic close commits."
  -
    author: "ORCHESTRATOR"
    body: "Verified: finish now requires --result for non-spike single-task finishes; result_summary persisted in task metadata; typecheck/lint/test:full pass."
events: []
doc_version: 2
doc_updated_at: "2026-02-08T15:20:58.332Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add a required one-line result_summary to task finish metadata for non-spike tasks; store it in task frontmatter; keep spike tasks exempt; update tests."
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
#### 2026-02-08T15:20:05.301Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: finish now supports --result/--risk/--breaking (single-task only) and requires --result for non-spike single-task finishes; result_summary is persisted in task frontmatter. bun run typecheck/lint/test:full PASS (704 tests).

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T15:11:19.509Z, excerpt_hash=sha256:a456e06b5a873345e0038646f8f08bd48c77d8cce1e444c0787c845fe05cb86a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the implementation commit and re-run bun run test:full.

## Verify Steps

### Scope\n- See task description.\n\n### Checks\n- bun run typecheck\n- bun run lint\n- bun run test:full\n\n### Pass criteria\n- All checks pass.
