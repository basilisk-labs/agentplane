Task: `202608131733-KECD7J`
Title: Archive resolved release incidents before 0.7.6
Canonical task record: `.agentplane/tasks/202608131733-KECD7J/README.md`

## Summary

Archive resolved release incidents before 0.7.6

Review INC-20260810-01 and INC-20260811-01 against their merged fixes and current enforcement tests. If both failure classes are fixed and no active operator work remains, remove them from the active incidents registry and its installed asset mirror, append complete archived records with exact task, commit, test, and enforcement evidence to docs/developer/incident-archive.mdx, run policy routing and focused incident/regression checks, integrate the policy-only change, then unblock release task 202608131730-BHEAQT without changing its sequence or release scope.

## Scope

- In scope: Review INC-20260810-01 and INC-20260811-01 against their merged fixes and current enforcement tests. If both failure classes are fixed and no active operator work remains, remove them from the active incidents registry and its installed asset mirror, append complete archived records with exact task, commit, test, and enforcement evidence to docs/developer/incident-archive.mdx, run policy routing and focused incident/regression checks, integrate the policy-only change, then unblock release task 202608131730-BHEAQT without changing its sequence or release scope.
- Out of scope: unrelated refactors not required for "Archive resolved release incidents before 0.7.6".

## Verification

- State: ok
- Note:

```text
Exact d0135b104 verification passed; prior full-fast evidence remains applicable to unchanged
policy/archive scope.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-13T17:39:03.323Z
- Branch: task/202608131733-KECD7J/archive-resolved-release-incidents-before-0-7-6
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/incidents.md                | 2 --
 docs/developer/incident-archive.mdx            | 6 ++++++
 packages/agentplane/assets/policy/incidents.md | 2 --
 3 files changed, 6 insertions(+), 4 deletions(-)
```

</details>
