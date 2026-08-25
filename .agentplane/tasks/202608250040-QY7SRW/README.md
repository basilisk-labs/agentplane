---
id: "202608250040-QY7SRW"
title: "Release 0.6.27 with dead PID reclaim fix"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
verify:
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts --pool=forks --maxWorkers=1"
plan_approval:
  state: "approved"
  updated_at: "2026-08-25T00:40:54.324Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement and qualify the isolated v0.6.27 reclaim fix, then publish only the exact maintenance-branch candidate after all release gates pass."
events:
  -
    type: "status"
    at: "2026-08-25T00:40:54.960Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement and qualify the isolated v0.6.27 reclaim fix, then publish only the exact maintenance-branch candidate after all release gates pass."
doc_version: 3
doc_updated_at: "2026-08-25T01:02:23.033Z"
doc_updated_by: "CODER"
description: "Fix valid absent PID handling in task reclaim on the 0.6 maintenance line, add realistic regression coverage, qualify the exact candidate, and publish AgentPlane 0.6.27 without touching main."
sections:
  Summary: |-
    Release 0.6.27 with dead PID reclaim fix

    Fix valid absent PID handling in task reclaim on the 0.6 maintenance line, add realistic regression coverage, qualify the exact candidate, and publish AgentPlane 0.6.27 without touching main.
  Scope: |-
    - In scope: Fix valid absent PID handling in task reclaim on the 0.6 maintenance line, add realistic regression coverage, qualify the exact candidate, and publish AgentPlane 0.6.27 without touching main.
    - Out of scope: unrelated refactors not required for "Release 0.6.27 with dead PID reclaim fix".
  Plan: "Release plan: version=0.6.27, tag=v0.6.27, base=v0.6.26@3703e0d56a6454b7e76b407a85929ac11eeb9a68, branch=codex/release-v0.6.27-reclaim-fix. 1. Fix readObservedProcessIdentity so a valid absent PID returning ExecaError.exitCode=1 is treated as missing rather than fatal. 2. Replace the oversized-PID fixture with a real exited-process PID and retain live-process identity safeguards. 3. Run focused tests, formatting, lint/type/full release prepublish and parity gates. 4. Bump all release surfaces to 0.6.27 and add complete release notes. 5. Commit and push only this isolated maintenance branch, qualify its exact SHA with hosted CI without merging into main, tag that SHA, dispatch Publish to npm, and verify GitHub plus npm registry readback. Rollback: do not publish until all gates pass; before publication revert only this isolated branch; after publication issue a newer patch rather than rewriting v0.6.27."
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts --pool=forks --maxWorkers=1`; expect all reclaim and runner cancellation tests to pass.
    2. Run the direct PID probe for `readObservedProcessIdentity(46382)`; expect `pid_alive=false` and `identity=null` rather than an exception.
    3. Run `bunx prettier --check packages/agentplane/src/runner/process-supervision/signals.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts`; expect formatting to pass.
    4. Run `bun run lint:core`, `bun run release:parity`, and `bun run release:prepublish`; expect all release gates to pass.
    5. Run `git diff --check` and inspect the complete branch diff from `v0.6.26`; expect only the scoped fix, test, task evidence, release notes, and 0.6.27 version surfaces.
    6. Confirm `agentplane@0.6.27` and all participant packages are absent before publication, then verify the exact GitHub release/tag SHA, successful Publish to npm workflow, and npm registry versions after publication.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Release 0.6.27 with dead PID reclaim fix

Fix valid absent PID handling in task reclaim on the 0.6 maintenance line, add realistic regression coverage, qualify the exact candidate, and publish AgentPlane 0.6.27 without touching main.

## Scope

- In scope: Fix valid absent PID handling in task reclaim on the 0.6 maintenance line, add realistic regression coverage, qualify the exact candidate, and publish AgentPlane 0.6.27 without touching main.
- Out of scope: unrelated refactors not required for "Release 0.6.27 with dead PID reclaim fix".

## Plan

Release plan: version=0.6.27, tag=v0.6.27, base=v0.6.26@3703e0d56a6454b7e76b407a85929ac11eeb9a68, branch=codex/release-v0.6.27-reclaim-fix. 1. Fix readObservedProcessIdentity so a valid absent PID returning ExecaError.exitCode=1 is treated as missing rather than fatal. 2. Replace the oversized-PID fixture with a real exited-process PID and retain live-process identity safeguards. 3. Run focused tests, formatting, lint/type/full release prepublish and parity gates. 4. Bump all release surfaces to 0.6.27 and add complete release notes. 5. Commit and push only this isolated maintenance branch, qualify its exact SHA with hosted CI without merging into main, tag that SHA, dispatch Publish to npm, and verify GitHub plus npm registry readback. Rollback: do not publish until all gates pass; before publication revert only this isolated branch; after publication issue a newer patch rather than rewriting v0.6.27.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts --pool=forks --maxWorkers=1`; expect all reclaim and runner cancellation tests to pass.
2. Run the direct PID probe for `readObservedProcessIdentity(46382)`; expect `pid_alive=false` and `identity=null` rather than an exception.
3. Run `bunx prettier --check packages/agentplane/src/runner/process-supervision/signals.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts`; expect formatting to pass.
4. Run `bun run lint:core`, `bun run release:parity`, and `bun run release:prepublish`; expect all release gates to pass.
5. Run `git diff --check` and inspect the complete branch diff from `v0.6.26`; expect only the scoped fix, test, task evidence, release notes, and 0.6.27 version surfaces.
6. Confirm `agentplane@0.6.27` and all participant packages are absent before publication, then verify the exact GitHub release/tag SHA, successful Publish to npm workflow, and npm registry versions after publication.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
