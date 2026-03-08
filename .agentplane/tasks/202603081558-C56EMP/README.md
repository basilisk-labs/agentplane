---
id: "202603081558-C56EMP"
title: "Apply and publish release v0.3.3"
result_summary: "Released v0.3.3 via repair-in-place: fixed the post-bump runtime-command test regression, moved v0.3.3 to the repaired commit, and completed npm/GitHub publication on the rerun publish workflow."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202603081557-2QA2Q0"
  - "202603081558-MG88QJ"
  - "202603081612-DA2WJ5"
  - "202603081612-M5FTQ0"
tags:
  - "code"
  - "release"
verify:
  - "agentplane doctor"
  - "agentplane release plan --patch"
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T16:02:55.222Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T16:53:43.214Z"
  updated_by: "CODER"
  note: "Verified repaired v0.3.3 release: tag v0.3.3 now resolves to a34c41c7e667be5160fe0a0c06cb965bd78ea116, npm shows agentplane@0.3.3 and @agentplaneorg/core@0.3.3, GitHub Release v0.3.3 is published, and the repaired workflow runs are green (Core CI 22825389596, Docs CI 22825389597, Publish to npm 22825401953, Pages Deploy 22825414619)."
commit:
  hash: "a34c41c7e667be5160fe0a0c06cb965bd78ea116"
  message: "✅ 813X8Y close: Replaced release-sensitive 0.3.2 literals in runtime.command.test.ts with dynamic repos... (202603081643-813X8Y) [code,release]"
comments:
  -
    author: "CODER"
    body: "Start: confirm the clean 0.3.2 baseline, run the patch release plan and publish flow for 0.3.3, then record git/npm/CI evidence before closing the release task."
  -
    author: "CODER"
    body: "Blocked: bun run release:prepublish failed before release apply because run-cli.core.docs-cli.test is not MDX-idempotent after prettier and run-cli.core.tasks.test still expects stderr output from task scaffold --quiet. Creating dedicated blocker-fix tasks before resuming release."
  -
    author: "CODER"
    body: "Start: the two prepublish blocker regressions are fixed and pushed, so rerun the full release gate and continue with release apply for v0.3.3 if it stays green."
  -
    author: "CODER"
    body: "Blocked: release apply rejected v0.3.3 because docs/releases/v0.3.3.md only has 42 bullets while the current release plan requires 175 bullets from the v0.3.2..HEAD change inventory. Creating a DOCS blocker task to expand the notes before resuming apply."
  -
    author: "CODER"
    body: "Start: the release-notes coverage blocker is fixed and pushed, so rerun release apply for v0.3.3 from the current clean main state."
  -
    author: "CODER"
    body: "Blocked: release apply created and pushed v0.3.3, but Core CI on the release SHA failed because runtime.command.test.ts still hardcodes 0.3.2 in release-sensitive expectations. Creating a focused code task to repair the test, then I will move the v0.3.3 tag to the fixed commit and rerun publish."
  -
    author: "CODER"
    body: "Start: the runtime-command release blocker is fixed, the v0.3.3 tag now points at the repaired commit a34c41c7, and the rerun publish workflow completed successfully, so record final evidence and close the release task."
  -
    author: "CODER"
    body: "Verified: repaired v0.3.3 is published on npm and GitHub, the tag now points at a34c41c7e667be5160fe0a0c06cb965bd78ea116, and the rerun CI/publish workflows are green."
events:
  -
    type: "status"
    at: "2026-03-08T16:02:59.581Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: confirm the clean 0.3.2 baseline, run the patch release plan and publish flow for 0.3.3, then record git/npm/CI evidence before closing the release task."
  -
    type: "status"
    at: "2026-03-08T16:12:03.304Z"
    author: "CODER"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: bun run release:prepublish failed before release apply because run-cli.core.docs-cli.test is not MDX-idempotent after prettier and run-cli.core.tasks.test still expects stderr output from task scaffold --quiet. Creating dedicated blocker-fix tasks before resuming release."
  -
    type: "status"
    at: "2026-03-08T16:20:38.105Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Start: the two prepublish blocker regressions are fixed and pushed, so rerun the full release gate and continue with release apply for v0.3.3 if it stays green."
  -
    type: "status"
    at: "2026-03-08T16:26:42.467Z"
    author: "CODER"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: release apply rejected v0.3.3 because docs/releases/v0.3.3.md only has 42 bullets while the current release plan requires 175 bullets from the v0.3.2..HEAD change inventory. Creating a DOCS blocker task to expand the notes before resuming apply."
  -
    type: "status"
    at: "2026-03-08T16:32:58.287Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Start: the release-notes coverage blocker is fixed and pushed, so rerun release apply for v0.3.3 from the current clean main state."
  -
    type: "status"
    at: "2026-03-08T16:43:20.930Z"
    author: "CODER"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: release apply created and pushed v0.3.3, but Core CI on the release SHA failed because runtime.command.test.ts still hardcodes 0.3.2 in release-sensitive expectations. Creating a focused code task to repair the test, then I will move the v0.3.3 tag to the fixed commit and rerun publish."
  -
    type: "status"
    at: "2026-03-08T16:53:37.385Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Start: the runtime-command release blocker is fixed, the v0.3.3 tag now points at the repaired commit a34c41c7, and the rerun publish workflow completed successfully, so record final evidence and close the release task."
  -
    type: "verify"
    at: "2026-03-08T16:53:43.214Z"
    author: "CODER"
    state: "ok"
    note: "Verified repaired v0.3.3 release: tag v0.3.3 now resolves to a34c41c7e667be5160fe0a0c06cb965bd78ea116, npm shows agentplane@0.3.3 and @agentplaneorg/core@0.3.3, GitHub Release v0.3.3 is published, and the repaired workflow runs are green (Core CI 22825389596, Docs CI 22825389597, Publish to npm 22825401953, Pages Deploy 22825414619)."
  -
    type: "status"
    at: "2026-03-08T16:55:00.642Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: repaired v0.3.3 is published on npm and GitHub, the tag now points at a34c41c7e667be5160fe0a0c06cb965bd78ea116, and the rerun CI/publish workflows are green."
doc_version: 3
doc_updated_at: "2026-03-08T16:55:00.642Z"
doc_updated_by: "CODER"
description: "Run the approved direct-mode release flow for v0.3.3 from the current clean main state, publish the tag and packages, and record release evidence."
id_source: "generated"
---
## Summary

Apply and publish release v0.3.3

Run the approved direct-mode release flow for v0.3.3 from the current clean main state, publish the tag and packages, and record release evidence.

## Scope

- In scope: Run the approved direct-mode release flow for v0.3.3 from the current clean main state, publish the tag and packages, and record release evidence.
- Out of scope: unrelated refactors not required for "Apply and publish release v0.3.3".

## Plan

1. Confirm clean tracked state, current version 0.3.2, and the authored release notes for v0.3.3. 2. Run release planning and prepublish checks for the patch release from v0.3.2 to v0.3.3. 3. Apply the release with push so package versions, tag, generated artifacts, and framework.cli.expected_version mutate together. 4. Record release evidence from git, npm publication, and CI status, then close the task.

## Verify Steps

1. Run `agentplane release plan --patch`. Expected: the planned version/tag resolve to `0.3.3` / `v0.3.3` and the release plan validates against the authored notes.
2. Run the release apply flow with push. Expected: package versions bump to `0.3.3`, `framework.cli.expected_version` is updated, the release commit and tag are pushed, and publish workflows start.
3. Verify post-release state. Expected: npm, GitHub release, and required CI checks succeed for `v0.3.3`, and the tracked tree returns to a clean state.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T16:53:43.214Z — VERIFY — ok

By: CODER

Note: Verified repaired v0.3.3 release: tag v0.3.3 now resolves to a34c41c7e667be5160fe0a0c06cb965bd78ea116, npm shows agentplane@0.3.3 and @agentplaneorg/core@0.3.3, GitHub Release v0.3.3 is published, and the repaired workflow runs are green (Core CI 22825389596, Docs CI 22825389597, Publish to npm 22825401953, Pages Deploy 22825414619).

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T16:53:37.392Z, excerpt_hash=sha256:13ad7fd35d2aa323075ddaaaeedd2871352b0a9ef5b15ebb1a63ff0b8141de2c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: the first v0.3.3 release apply created and pushed tag f71052056fa023e5a341a44fb0d587c6ce9b7713, but Core CI failed afterward because runtime.command.test.ts still hardcoded 0.3.2 in release-sensitive assertions.
  Impact: the first Publish to npm run failed, so 0.3.3 remained unpublished even though the tag existed on origin.
  Resolution: fixed the test in task 202603081643-813X8Y, pushed a34c41c7e667be5160fe0a0c06cb965bd78ea116 to main, force-moved v0.3.3 to that commit, and reran Publish to npm manually on the repaired SHA.
  Promotion: incident-candidate
