Task: `202607252218-XBHBE5`
Title: Archive resolved KnowledgeRef guard incident
Canonical task record: `.agentplane/tasks/202607252218-XBHBE5/README.md`

## Summary

Archive resolved KnowledgeRef guard incident

Move the resolved INC-20260725-01 record from the active incident registry to the historical archive with the merged task, test, and release-gate evidence required to unblock the release incident check. Do not alter the underlying guard behavior or weaken policy.

## Scope

In scope: archive only INC-20260725-01 after validating task 202607251433-75Q4J6 is merged and its canonical shared-guard fix and checks are present on main. Modify only the active incident registry and historical archive, plus task/PR evidence. Out of scope: changes to KnowledgeRef, guard enforcement, release policy semantics, or any unrelated incident entry.

## Verification

- State: ok
- Note: Archived the resolved guard incident and cleared the release incident gate.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-25T22:26:12.382Z
- Branch: task/202607252218-XBHBE5/archive-resolved-knowledgeref-guard-incident
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/incidents.md     | 1 -
 docs/developer/incident-archive.mdx | 4 ++++
 2 files changed, 4 insertions(+), 1 deletion(-)
```

</details>
