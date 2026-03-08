---
id: "202603081829-08BVN9"
title: "Normalize repo-local handoff tests against inherited framework env"
result_summary: "Made runtime and repo-local handoff regression tests hermetic against inherited framework environment."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T18:30:31.916Z"
  updated_by: "ORCHESTRATOR"
  note: "Release-blocker env-hermetic runtime test fix approved; keep scope on runtime/handoff assertions only."
verification:
  state: "ok"
  updated_at: "2026-03-08T18:41:37.032Z"
  updated_by: "CODER"
  note: "Targeted runtime and repo-local handoff tests passed after clearing inherited AGENTPLANE_* env in parent and child processes."
commit:
  hash: "4a9a63c4c57beadb86e0820bbca9902868a36f5e"
  message: "🧪 08BVN9 runtime: make handoff tests hermetic"
comments:
  -
    author: "CODER"
    body: "Start: making runtime and repo-local handoff tests hermetic against inherited framework env so the 0.3.4 release gate matches the current runtime mode contract."
  -
    author: "CODER"
    body: "Verified: runtime and repo-local handoff regression tests now ignore inherited AGENTPLANE_* env and pass consistently under the release gate."
events:
  -
    type: "status"
    at: "2026-03-08T18:30:35.410Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: making runtime and repo-local handoff tests hermetic against inherited framework env so the 0.3.4 release gate matches the current runtime mode contract."
  -
    type: "verify"
    at: "2026-03-08T18:41:37.032Z"
    author: "CODER"
    state: "ok"
    note: "Targeted runtime and repo-local handoff tests passed after clearing inherited AGENTPLANE_* env in parent and child processes."
  -
    type: "status"
    at: "2026-03-08T18:42:22.774Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: runtime and repo-local handoff regression tests now ignore inherited AGENTPLANE_* env and pass consistently under the release gate."
doc_version: 3
doc_updated_at: "2026-03-08T18:42:22.774Z"
doc_updated_by: "CODER"
description: "Fix runtime and repo-local handoff tests so release gates do not depend on inherited AGENTPLANE_* framework-dev environment variables, then rerun release:prepublish for 0.3.4."
id_source: "generated"
---
## Summary

Normalize repo-local handoff tests against inherited framework env

Fix runtime and repo-local handoff tests so release gates do not depend on inherited AGENTPLANE_* framework-dev environment variables, then rerun release:prepublish for 0.3.4.

## Scope

- In scope: Fix runtime and repo-local handoff tests so release gates do not depend on inherited AGENTPLANE_* framework-dev environment variables, then rerun release:prepublish for 0.3.4.
- Out of scope: unrelated refactors not required for "Normalize repo-local handoff tests against inherited framework env".

## Plan

1. Make runtime.command and repo-local-handoff tests hermetic with respect to inherited AGENTPLANE_* framework-dev environment variables.
2. Keep the current runtime contract (`repo-local-handoff` when delegation occurred) and update the assertions to match the real mode model.
3. Re-run the targeted runtime/handoff suites and then rerun `bun run release:prepublish` before returning to the 0.3.4 release task.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/cli/repo-local-handoff.test.ts --testTimeout 60000 --hookTimeout 60000`. Expected: all runtime/handoff assertions pass under a hermetic env.
2. Run `bun run release:prepublish`. Expected: the full release gate stays green after the runtime/handoff test fix.
3. Confirm the new assertions still distinguish direct repo-local runtime from repo-local handoff. Expected: the tests explicitly cover both modes instead of collapsing them.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T18:41:37.032Z — VERIFY — ok

By: CODER

Note: Targeted runtime and repo-local handoff tests passed after clearing inherited AGENTPLANE_* env in parent and child processes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T18:30:35.410Z, excerpt_hash=sha256:b3cde69f8eea0ad4982357c6e0089bd2720c045cf99d5bd26a5b4ca6d7bff8b8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
