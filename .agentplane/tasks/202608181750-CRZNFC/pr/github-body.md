Task: `202608181750-CRZNFC`
Title: Qualify and publish AgentPlane 0.7.7 from exact main 708f0d7d5b813ea2bb4de659d9eb113a752e3c63; promote the already re...
Canonical task record: `.agentplane/tasks/202608181750-CRZNFC/README.md`

## Summary

Qualify and publish AgentPlane 0.7.7 from exact main 708f0d7d5b813ea2bb4de659d9eb113a752e3c63; promote the already reviewed 0.7.7-beta.1 candidate to stable without semantic code changes, run canonical release gates, integrate the stable version candidate through protected main, publish GitHub Release and all three npm packages at exact merged SHA, verify public readback, confirm automatic 0.7.8-beta.1 development opening, then clean superseded PRs/tasks and reconcile the original dirty checkout behind a recovery ref.

Stable patch publication only after PR #4844 merged and Task Hosted Close 32167609851 succeeded. Preserve exact source behavior; change only canonical stable version/release surfaces and release task artifacts. Require exact-head local and hosted evidence, public registry/tag/release readback, and post-release cleanup of superseded PRs #4838, #4839, #4841, and #4843 plus obsolete local task artifacts, without losing recoverability.

## Scope

- In scope: Stable patch publication only after PR #4844 merged and Task Hosted Close 32167609851 succeeded. Preserve exact source behavior; change only canonical stable version/release surfaces and release task artifacts. Require exact-head local and hosted evidence, public registry/tag/release readback, and post-release cleanup of superseded PRs #4838, #4839, #4841, and #4843 plus obsolete local task artifacts, without losing recoverability.
- Out of scope: unrelated refactors not required for "Qualify and publish AgentPlane 0.7.7 from exact main 708f0d7d5b813ea2bb4de659d9eb113a752e3c63; promote the already reviewed 0.7.7-beta.1 candidate to stable without semantic code changes, run canonical release gates, integrate the stable version candidate through protected main, publish GitHub Release and all three npm packages at exact merged SHA, verify public readback, confirm automatic 0.7.8-beta.1 development opening, then clean superseded PRs/tasks and reconcile the original dirty checkout behind a recovery ref.".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-18T17:51:51.714Z
- Branch: task/202608181750-CRZNFC/qualify-and-publish-agentplane-0-7-7-from-exact
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
