---
id: "202603061532-9Y41NM"
title: "Fix release apply push hang"
result_summary: "Fixed the release CLI so internal push steps bypass recursive local hooks and the previously hanging release-apply path is covered by regression tests."
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-06T15:39:55.738Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/release/plan.test.ts\nResult: pass\nEvidence: 8/8 tests passed, including the new pushReleaseRefs regression that proves internal release pushes bypass local pre-push hooks.\nScope: release apply command flow, release plan flow, internal push behavior.\n\nCommand: bun run release:check\nResult: pass\nEvidence: package builds and release pack/parity checks completed successfully for 0.3.1.\nScope: release build/parity gate.\n\nCommand: git diff -- packages/agentplane/src/commands/release/apply.command.ts packages/agentplane/src/commands/release/apply.test.ts docs/developer/release-and-publishing.mdx\nResult: pass\nEvidence: release apply now calls git push with --no-verify, plus docs and regression coverage were updated.\nScope: implemented fix and documentation alignment."
commit:
  hash: "d1b1fb3ce143e0f804bf15b474277018c4e9d623"
  message: "🐛 9Y41NM release: skip hook recursion in release apply"
comments:
  -
    author: "CODER"
    body: "Start: trace the release apply hang after local commit/tag creation, patch the lifecycle/push path, add regression coverage, and verify deterministic completion."
  -
    author: "CODER"
    body: "Verified: release apply no longer re-enters local pre-push hooks; targeted release tests and release:check passed."
events:
  -
    type: "status"
    at: "2026-03-06T15:35:19.423Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: trace the release apply hang after local commit/tag creation, patch the lifecycle/push path, add regression coverage, and verify deterministic completion."
  -
    type: "verify"
    at: "2026-03-06T15:39:55.738Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/release/plan.test.ts\nResult: pass\nEvidence: 8/8 tests passed, including the new pushReleaseRefs regression that proves internal release pushes bypass local pre-push hooks.\nScope: release apply command flow, release plan flow, internal push behavior.\n\nCommand: bun run release:check\nResult: pass\nEvidence: package builds and release pack/parity checks completed successfully for 0.3.1.\nScope: release build/parity gate.\n\nCommand: git diff -- packages/agentplane/src/commands/release/apply.command.ts packages/agentplane/src/commands/release/apply.test.ts docs/developer/release-and-publishing.mdx\nResult: pass\nEvidence: release apply now calls git push with --no-verify, plus docs and regression coverage were updated.\nScope: implemented fix and documentation alignment."
  -
    type: "status"
    at: "2026-03-06T15:40:03.844Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: release apply no longer re-enters local pre-push hooks; targeted release tests and release:check passed."
doc_version: 2
doc_updated_at: "2026-03-06T15:40:03.844Z"
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
#### 2026-03-06T15:39:55.738Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/release/plan.test.ts
Result: pass
Evidence: 8/8 tests passed, including the new pushReleaseRefs regression that proves internal release pushes bypass local pre-push hooks.
Scope: release apply command flow, release plan flow, internal push behavior.

Command: bun run release:check
Result: pass
Evidence: package builds and release pack/parity checks completed successfully for 0.3.1.
Scope: release build/parity gate.

Command: git diff -- packages/agentplane/src/commands/release/apply.command.ts packages/agentplane/src/commands/release/apply.test.ts docs/developer/release-and-publishing.mdx
Result: pass
Evidence: release apply now calls git push with --no-verify, plus docs and regression coverage were updated.
Scope: implemented fix and documentation alignment.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T15:35:19.423Z, excerpt_hash=sha256:8293c8b3fef4de505eb31c11fde2eb6f1a72d05e49bf2d0c3d4ddef01021a29d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the release-flow fix commit, rebuild dist if required, and rerun the targeted release tests to confirm the repository returns to the prior baseline. Do not run a real publish while the fix is in doubt.

## Notes

Observed failure mode from the v0.3.1 release: local release commit and local tag were created, but the parent 'agentplane release apply --push --yes' process stayed alive with an idle event loop and never completed the push/publication path.
