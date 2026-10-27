Task: `202610270849-HC2R85`
Title: Bound doctor archive commit inspection in partial clones without lazy object fetch
Canonical task record: `.agentplane/tasks/202610270849-HC2R85/README.md`

## Summary

Bound doctor archive commit inspection in partial clones without lazy object fetch

Make the generic DONE-task historical commit summary lookup local-only in promisor/partial clones. Preserve explicit INFO findings when historical commits are unavailable; do not suppress current doctor failures or skip the archive scan. Add focused regression coverage for local commits and unavailable promised objects.

## Scope

- In scope: Make the generic DONE-task historical commit summary lookup local-only in promisor/partial clones. Preserve explicit INFO findings when historical commits are unavailable; do not suppress current doctor failures or skip the archive scan. Add focused regression coverage for local commits and unavailable promised objects.
- Out of scope: unrelated refactors not required for "Bound doctor archive commit inspection in partial clones without lazy object fetch".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-27T09:16:56.607Z
- Branch: task/202610270849-HC2R85/bound-doctor-archive-commit-inspection-in-partia
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/commands/doctor/archive.test.ts | 193 ++++++++++++++++++++-
 packages/agentplane/src/commands/doctor/archive.ts |  12 +-
 2 files changed, 203 insertions(+), 2 deletions(-)
```

</details>
