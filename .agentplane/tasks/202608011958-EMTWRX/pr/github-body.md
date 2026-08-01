Task: `202608011958-EMTWRX`
Title: Archive resolved RF-24/RF-25 help snapshot incident
Canonical task record: `.agentplane/tasks/202608011958-EMTWRX/README.md`

## Summary

Archive resolved RF-24/RF-25 help snapshot incident

Reconcile INC-20260801-01 against merged main evidence, preserve its final state in the historical archive, remove it from the active source and packaged registries, and reopen the release gates without changing runtime behavior.

## Scope

- In scope: Reconcile INC-20260801-01 against merged main evidence, preserve its final state in the historical archive, remove it from the active source and packaged registries, and reopen the release gates without changing runtime behavior.
- Out of scope: unrelated refactors not required for "Archive resolved RF-24/RF-25 help snapshot incident".

## Verification

- State: ok
- Note:

```text
PASS at a6b69790d: help snapshot 13/13; release incident gate, builtin asset parity, source/package
byte parity, policy routing, doctor, diff check, and clean worktree all pass. Doctor warnings are
unrelated historical metadata drift already recorded in Findings.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T20:08:22.699Z
- Branch: task/202608011958-EMTWRX/archive-resolved-rf-24-rf-25-help-snapshot-incid
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/incidents.md                | 1 -
 docs/developer/incident-archive.mdx            | 4 ++++
 packages/agentplane/assets/policy/incidents.md | 1 -
 3 files changed, 4 insertions(+), 2 deletions(-)
```

</details>
