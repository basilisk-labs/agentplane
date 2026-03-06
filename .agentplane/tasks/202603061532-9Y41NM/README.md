---
id: "202603061532-9Y41NM"
title: "Fix release apply push hang"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "release"
verify:
  - "bunx vitest run packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/release/plan.test.ts"
  - "bun run release:check"
  - "agentplane release apply --push --yes"
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T15:35:04.228Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved release/code bugfix scope and verification contract."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: trace the release apply hang after local commit/tag creation, patch the lifecycle/push path, add regression coverage, and verify deterministic completion."
events:
  -
    type: "status"
    at: "2026-03-06T15:35:19.423Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: trace the release apply hang after local commit/tag creation, patch the lifecycle/push path, add regression coverage, and verify deterministic completion."
doc_version: 2
doc_updated_at: "2026-03-06T15:35:19.423Z"
doc_updated_by: "CODER"
description: "Diagnose and fix the bug where agentplane release apply --push --yes can hang after creating the local release commit and tag, leaving push/publication incomplete."
id_source: "generated"
---
## Summary

Fix release apply push hang

Diagnose and fix the bug where agentplane release apply --push --yes can hang after creating the local release commit and tag, leaving push/publication incomplete.

## Scope

In scope: release/apply command flow, subprocess lifecycle and exit handling, release push stage, regression tests, and any generated docs/help text that becomes stale because of the fix. Out of scope: redesign of the overall release pipeline or npm/GitHub workflow semantics unrelated to the hang.

## Plan

1. Reproduce and trace the exact point where release apply stops after local commit/tag creation.\n2. Patch the release apply implementation so subprocesses and push stages terminate deterministically and surface actionable errors.\n3. Add regression coverage for the previously hanging path.\n4. Verify with targeted release tests and command-level checks, then record evidence and close the task.

## Risks

Release code is high-impact: a wrong fix can create duplicate tags, partial publishes, or hide real publish failures behind false success. Tests that exercise release commands may also leave temp git/tag artifacts if cleanup regresses.

## Verify Steps

### Scope\nRelease/apply command lifecycle, push handoff, and failure/exit behavior after local commit and tag creation.\n\n### Checks\n- Run 'bunx vitest run packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/release/plan.test.ts'.\n- Run 'bun run release:check'.\n- Reproduce the fixed path with 'agentplane release apply --push --yes' or an equivalent regression harness that exercises the same control flow without performing an unsafe publish.\n\n### Evidence / Commands\nRecord the exact commands, whether the command exits, whether push is attempted/completed, and whether any residual tag/commit side effects remain.\n\n### Pass criteria\nThe release apply path must not leave an idle parent process after local commit/tag creation; it must either complete the push path or exit with a deterministic error. Targeted release tests and release:check must pass.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the release-flow fix commit, rebuild dist if required, and rerun the targeted release tests to confirm the repository returns to the prior baseline. Do not run a real publish while the fix is in doubt.

## Notes

Observed failure mode from the v0.3.1 release: local release commit and local tag were created, but the parent 'agentplane release apply --push --yes' process stayed alive with an idle event loop and never completed the push/publication path.
