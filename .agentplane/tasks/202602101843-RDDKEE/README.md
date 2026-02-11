---
id: "202602101843-RDDKEE"
title: "Upgrade: cleanup untracked artifacts after completion"
result_summary: "auto-upgrade no longer leaves backup/run-dir artifacts in normal workspace"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602101813-VZ44RV"
tags:
  - "cli"
  - "upgrade"
  - "quality"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-11T04:45:25.389Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved for implementation"
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "4d75ef3da08a70714d5fe16c381b755d8870ab5b"
  message: "🛠 RDDKEE upgrade: clean transient artifacts after auto apply"
comments:
  -
    author: "CODER"
    body: "Start: add auto-upgrade cleanup of transient artifacts and validate with upgrade tests."
  -
    author: "CODER"
    body: "Verified: upgrade --auto now removes transient artifacts created during the run (backup files and .agentplane/.upgrade/agent run dirs) while preserving durable upgrade state files. Added regression coverage in upgrade cleanup test."
events:
  -
    type: "status"
    at: "2026-02-11T04:45:28.759Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add auto-upgrade cleanup of transient artifacts and validate with upgrade tests."
  -
    type: "status"
    at: "2026-02-11T04:48:14.964Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: upgrade --auto now removes transient artifacts created during the run (backup files and .agentplane/.upgrade/agent run dirs) while preserving durable upgrade state files. Added regression coverage in upgrade cleanup test."
doc_version: 2
doc_updated_at: "2026-02-11T04:48:14.964Z"
doc_updated_by: "CODER"
description: "Ensure agentplane upgrade removes or quarantines transient artifacts it creates (e.g. .agentplane/.upgrade/agent run dirs and *.bak-* backups) after successful auto mode, keeping normal workspaces clean."
id_source: "generated"
---
## Summary

Make `agentplane upgrade` clean up transient artifacts it creates during successful auto-apply runs, so normal repositories do not accumulate upgrade leftovers in `git status`.

## Scope

In scope:
- `packages/agentplane/src/commands/upgrade.ts`
- Upgrade tests validating cleanup behavior

Out of scope:
- General cache lifecycle outside upgrade command
- Removal of durable upgrade state (`state.json`, `last-review.json`, baseline)

## Plan

1. Track transient artifacts created by `upgrade --auto` (backup files and temporary review run dirs).
2. Add post-success cleanup for transient artifacts while preserving durable state.
3. Add tests for backup cleanup and `.upgrade/agent` cleanup behavior.
4. Run required build/lint/test sequence.

## Risks

- Risk: cleanup may remove artifacts users still need for debugging.
Mitigation: keep durable `state.json`, `last-review.json`, and baseline snapshots.

- Risk: cleanup could remove files not created by current run.
Mitigation: delete only paths explicitly tracked as created in this run.

## Verify Steps

- `bun run --filter=@agentplaneorg/core build`
- `bun run --filter=agentplane build`
- `bun run lint`
- `bunx vitest run packages/agentplane/src/commands/upgrade.merge.test.ts packages/agentplane/src/commands/upgrade.agent-mode.test.ts packages/agentplane/src/commands/upgrade.safety.test.ts`
Pass criteria:
- auto-upgrade run leaves no new `*.bak-*` files from upgraded managed files
- transient `.agentplane/.upgrade/agent/*` artifacts do not accumulate after auto mode
- existing upgrade tests remain green

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task commit. This restores previous upgrade artifact behavior.
