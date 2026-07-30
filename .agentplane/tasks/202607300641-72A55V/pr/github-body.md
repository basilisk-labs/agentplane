Task: `202607300641-72A55V`
Title: Archive the externally mitigated RF-04 provider mismatch incident
Canonical task record: `.agentplane/tasks/202607300641-72A55V/README.md`

## Summary

Archive the externally mitigated RF-04 provider mismatch incident

Perform the dedicated incident review required by the release gate: preserve INC-20260730-01 in the historical archive with its failed capture, the user-approved no-retry constraint, and CR9VTJ do_not_publish evidence; remove it from the active registry only as externally mitigated, not as a successful measurement or resolved provider defect.

## Scope

- In scope: Perform the dedicated incident review required by the release gate: preserve INC-20260730-01 in the historical archive with its failed capture, the user-approved no-retry constraint, and CR9VTJ do_not_publish evidence; remove it from the active registry only as externally mitigated, not as a successful measurement or resolved provider defect.
- Out of scope: unrelated refactors not required for "Archive the externally mitigated RF-04 provider mismatch incident".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T06:42:31.242Z
- Branch: task/202607300641-72A55V/archive-the-externally-mitigated-rf-04-provider
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/incidents.md     | 1 -
 docs/developer/incident-archive.mdx | 4 ++++
 2 files changed, 4 insertions(+), 1 deletion(-)
```

</details>
