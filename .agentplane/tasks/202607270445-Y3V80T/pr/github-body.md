Task: `202607270445-Y3V80T`
Title: Reconcile resolved release incidents after SX8T09 integration
Canonical task record: `.agentplane/tasks/202607270445-Y3V80T/README.md`

## Summary

Reconcile resolved release incidents after SX8T09 integration

Verify that the two active release incidents are already fixed on main, archive their final evidence, clear only resolved entries from the active incident registry, and restore the release incident gate without changing runtime behavior.

## Scope

- In scope: Verify that the two active release incidents are already fixed on main, archive their final evidence, clear only resolved entries from the active incident registry, and restore the release incident gate without changing runtime behavior.
- Out of scope: unrelated refactors not required for "Reconcile resolved release incidents after SX8T09 integration".

## Verification

- State: ok
- Note: Verified: release incident, policy, guard, schema, formatting, and hosted PR checks passed on b5e79fe4.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-27T04:47:52.829Z
- Branch: task/202607270445-Y3V80T/reconcile-resolved-release-incidents-after-sx8t0
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/incidents.md                | 2 --
 docs/developer/incident-archive.mdx            | 5 +++++
 packages/agentplane/assets/policy/incidents.md | 2 --
 3 files changed, 5 insertions(+), 4 deletions(-)
```

</details>
