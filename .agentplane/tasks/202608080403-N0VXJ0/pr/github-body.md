Task: `202608080403-N0VXJ0`
Title: Archive resolved supervisor route incident
Canonical task record: `.agentplane/tasks/202608080403-N0VXJ0/README.md`

## Summary

Archive resolved supervisor route incident

Preserve INC-20260807-01 with its final merged evidence in docs/developer/incident-archive.mdx, then remove it from the active repository and bundled incident registries. The dependency-readiness and supervisor protocol failure is repaired by merged task 202608062021-MCY8ZC and its focused, hosted, and evaluator evidence. Keep incident registry semantics and generated assets aligned so the release incident gate passes.

## Scope

- In scope: Preserve INC-20260807-01 with its final merged evidence in docs/developer/incident-archive.mdx, then remove it from the active repository and bundled incident registries. The dependency-readiness and supervisor protocol failure is repaired by merged task 202608062021-MCY8ZC and its focused, hosted, and evaluator evidence. Keep incident registry semantics and generated assets aligned so the release incident gate passes.
- Out of scope: unrelated refactors not required for "Archive resolved supervisor route incident".

## Verification

- State: ok
- Note: Archived INC-20260807-01 is preserved with merged evidence; both active registries are empty and synchronized.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-08T04:08:42.543Z
- Branch: task/202608080403-N0VXJ0/archive-resolved-supervisor-route-incident
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/incidents.md                | 1 -
 docs/developer/incident-archive.mdx            | 4 ++++
 packages/agentplane/assets/policy/incidents.md | 1 -
 3 files changed, 4 insertions(+), 2 deletions(-)
```

</details>
