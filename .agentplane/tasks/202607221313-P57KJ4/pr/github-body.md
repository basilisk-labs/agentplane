Task: `202607221313-P57KJ4`
Title: Archive resolved context incidents before v0.6.24
Canonical task record: `.agentplane/tasks/202607221313-P57KJ4/README.md`

## Summary

Archive resolved context incidents before v0.6.24

Verify INC-20260722-01 and INC-20260722-02 are durably mitigated on main, preserve final evidence in docs/developer/incident-archive.mdx, and clear the active incident registry so patch release planning can proceed.

## Scope

- In scope: Verify INC-20260722-01 and INC-20260722-02 are durably mitigated on main, preserve final evidence in docs/developer/incident-archive.mdx, and clear the active incident registry so patch release planning can proceed.
- Out of scope: unrelated refactors not required for "Archive resolved context incidents before v0.6.24".

## Verification

- State: ok
- Note:

```text
Incident archive verified: 27 context regressions, 8 incident/release tests, empty release incident
gate, asset parity, routing, doctor, format, and local smoke passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-22T13:25:02.942Z
- Branch: task/202607221313-P57KJ4/archive-resolved-context-incidents-before-v0-6-2
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/incidents.md                            | 2 --
 docs/developer/incident-archive.mdx                        | 5 +++++
 packages/agentplane/assets/policy/incidents.md             | 2 --
 packages/agentplane/src/shared/builtin-assets.generated.ts | 4 ++--
 4 files changed, 7 insertions(+), 6 deletions(-)
```

</details>
