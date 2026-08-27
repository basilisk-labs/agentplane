Task: `202608271538-T21JCA`
Title: Recover green behind PRs through provider branch update
Canonical task record: `.agentplane/tasks/202608271538-T21JCA/README.md`

## Summary

Recover green behind PRs through provider branch update

Repair the demonstrated recovery gap for an OPEN GitHub PR whose exact aligned head has successful required checks but whose provider mergeability is behind under strict protection. PR #5854 is the observed case: queue handoff after HTTP 405 required PR verification expected; no merge conflict, no live runner. Route the existing provider.pr.update_branch operation for coherent exact-head behind evidence, preserve stale-head/provider/base/authority guards, required checks, and queue ownership. Add focused regression tests. Do not merge or publish from semantic implementation, bypass protection, manufacture hosted failures, or rewrite frozen task bases.

## Scope

- In scope: Repair the demonstrated recovery gap for an OPEN GitHub PR whose exact aligned head has successful required checks but whose provider mergeability is behind under strict protection. PR #5854 is the observed case: queue handoff after HTTP 405 required PR verification expected; no merge conflict, no live runner. Route the existing provider.pr.update_branch operation for coherent exact-head behind evidence, preserve stale-head/provider/base/authority guards, required checks, and queue ownership. Add focused regression tests. Do not merge or publish from semantic implementation, bypass protection, manufacture hosted failures, or rewrite frozen task bases.
- Out of scope: unrelated refactors not required for "Recover green behind PRs through provider branch update".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-27T15:56:08.543Z
- Branch: task/202608271538-T21JCA/recover-green-behind-prs-through-provider-branch
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../shared/provider-update-branch-route.ts         |   5 +-
 .../route-decision-blockers.quality-review.test.ts | 106 +++++++++-
 ...rkflow-step-projections.conflict-rework.test.ts | 228 ++++++++++++---------
 .../shared/workflow-step-provider-update-branch.ts |   2 +-
 4 files changed, 232 insertions(+), 109 deletions(-)
```

</details>
