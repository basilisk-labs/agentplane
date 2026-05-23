---
id: "202605230451-N5F0HY"
title: "Release v0.6.7"
result_summary: "Superseded duplicate release task closed"
status: "DONE"
priority: "med"
owner: "INTEGRATOR"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-23T04:51:55.135Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-23T07:47:31.230Z"
  updated_by: "DEUS"
  note: "Hosted publish confirmed for v0.6.7."
quality_review:
  state: "pass"
  updated_at: "2026-05-23T07:32:53.316Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed: PR #4081 restores the missing README for the superseded release task so the hidden DOING task becomes visible and closable."
  evaluated_sha: "cf01c8d7f29ccff5c9ecaabfe0fd64fb54a6a580"
  blueprint_digest: "5296cc05f5ea77afaa3e006874e78d1d6dbdbaf09e0b86def5d71db5341fb562"
  evidence_refs:
    - ".agentplane/tasks/202605230451-N5F0HY/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/tasks/202605230451-N5F0HY/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "adb56d4a6a0f1dfe8b905a0147b3b0d4f81ef497"
  message: "Merge pull request #4080 from basilisk-labs/task-close/202605230709-SKBRHW/0110815efa50"
comments:
  -
    author: "INTEGRATOR"
    body: "Start: prepare v0.6.7 release notes, candidate version bump, release gates, and publication evidence after backlog closure."
  -
    author: "INTEGRATOR"
    body: "Verified: superseded duplicate release task closed after canonical v0.6.7 release work moved to 202605230546-RS539J and publish-gate follow-up 202605230709-SKBRHW."
events:
  -
    type: "status"
    at: "2026-05-23T04:53:20.748Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: prepare v0.6.7 release notes, candidate version bump, release gates, and publication evidence after backlog closure."
  -
    type: "verify"
    at: "2026-05-23T07:29:18.078Z"
    author: "INTEGRATOR"
    state: "ok"
    note: "Superseded duplicate release task; canonical v0.6.7 release work moved to 202605230546-RS539J."
  -
    type: "verify"
    at: "2026-05-23T07:32:53.316Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed: PR #4081 restores the missing README for the superseded release task so the hidden DOING task becomes visible and closable."
  -
    type: "status"
    at: "2026-05-23T07:33:30.000Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: superseded duplicate release task closed after canonical v0.6.7 release work moved to 202605230546-RS539J and publish-gate follow-up 202605230709-SKBRHW."
doc_version: 3
doc_updated_at: "2026-05-23T07:47:31.230Z"
doc_updated_by: "DEUS"
description: "Prepare and publish the next patch release after closing the backlog. Target version v0.6.7, include task-level changes since v0.6.6, run release gates, publish through branch_pr release candidate flow, and verify npm/GitHub release evidence."
sections:
  Summary: |-
    Release v0.6.7.

    This abandoned release task was superseded before PR publication. The canonical v0.6.7 release path moved to task `202605230546-RS539J`, with publish-gate follow-up task `202605230709-SKBRHW`.
  Scope: |-
    - In scope: restore the missing task README so the task registry can list and close this stale release task.
    - Out of scope: release implementation, version changes, package publication, or release-note changes.
  Plan: |-
    1. Restore this missing README from backend-visible task state.
    2. Record verification that the task is superseded by the canonical release task.
    3. Close the stale task so backlog listing is truthful.
  Verify Steps: |-
    1. Run `ap task show 202605230451-N5F0HY`.
    2. Run `ap task list --status DOING --limit 20`.
    3. Confirm the old task no longer appears as hidden `missing_or_unreadable_readme` state after close.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    - State: ok
    - Note: Hosted publish confirmed for v0.6.7.
    - Details:
      - release_sha: 5937638eb63301ff4f249104e4d130ee19d378d3
      - version: 0.6.7
      - tag: v0.6.7
      - @agentplaneorg/core: published_in_run
      - @agentplaneorg/recipes: published_in_run
      - agentplane: published_in_run
      - npm_smoke: pass
      - github_release: created
      - release_url: https://github.com/basilisk-labs/agentplane/releases/tag/v0.6.7
      - publish_run: https://github.com/basilisk-labs/agentplane/actions/runs/26327236568
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the close-repair PR.
    - Re-run `ap task list --status DOING --limit 20`.
  Findings: |-
    Superseded by release task `202605230546-RS539J` and follow-up publish-gate task `202605230709-SKBRHW`. This task was abandoned before PR publication; its generated artifacts were left only in a stale worktree and the canonical release path moved to `202605230546-RS539J`.

    - Observation: The task backend kept 202605230451-N5F0HY as DOING while its README was never merged, causing task list to skip it as missing_or_unreadable_readme.
      Impact: Backlog output showed Total: 0 while a hidden DOING task still existed.
      Resolution: Restore the task README through a close-repair artifact, mark this duplicate release task verified as superseded, and close it with a tracked task artifact commit.

    - Observation: The branch changes only task artifacts for 202605230451-N5F0HY.
      Impact: This repairs false-empty backlog reporting before release publication.
      Resolution: Hosted checks on PR #4081 are green; the remaining close transition must run from main after this repair PR lands.
id_source: "generated"
---
## Summary

Release v0.6.7.

This abandoned release task was superseded before PR publication. The canonical v0.6.7 release path moved to task `202605230546-RS539J`, with publish-gate follow-up task `202605230709-SKBRHW`.

## Scope

- In scope: restore the missing task README so the task registry can list and close this stale release task.
- Out of scope: release implementation, version changes, package publication, or release-note changes.

## Plan

1. Restore this missing README from backend-visible task state.
2. Record verification that the task is superseded by the canonical release task.
3. Close the stale task so backlog listing is truthful.

## Verify Steps

1. Run `ap task show 202605230451-N5F0HY`.
2. Run `ap task list --status DOING --limit 20`.
3. Confirm the old task no longer appears as hidden `missing_or_unreadable_readme` state after close.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
- State: ok
- Note: Hosted publish confirmed for v0.6.7.
- Details:
  - release_sha: 5937638eb63301ff4f249104e4d130ee19d378d3
  - version: 0.6.7
  - tag: v0.6.7
  - @agentplaneorg/core: published_in_run
  - @agentplaneorg/recipes: published_in_run
  - agentplane: published_in_run
  - npm_smoke: pass
  - github_release: created
  - release_url: https://github.com/basilisk-labs/agentplane/releases/tag/v0.6.7
  - publish_run: https://github.com/basilisk-labs/agentplane/actions/runs/26327236568
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the close-repair PR.
- Re-run `ap task list --status DOING --limit 20`.

## Findings

Superseded by release task `202605230546-RS539J` and follow-up publish-gate task `202605230709-SKBRHW`. This task was abandoned before PR publication; its generated artifacts were left only in a stale worktree and the canonical release path moved to `202605230546-RS539J`.

- Observation: The task backend kept 202605230451-N5F0HY as DOING while its README was never merged, causing task list to skip it as missing_or_unreadable_readme.
  Impact: Backlog output showed Total: 0 while a hidden DOING task still existed.
  Resolution: Restore the task README through a close-repair artifact, mark this duplicate release task verified as superseded, and close it with a tracked task artifact commit.

- Observation: The branch changes only task artifacts for 202605230451-N5F0HY.
  Impact: This repairs false-empty backlog reporting before release publication.
  Resolution: Hosted checks on PR #4081 are green; the remaining close transition must run from main after this repair PR lands.