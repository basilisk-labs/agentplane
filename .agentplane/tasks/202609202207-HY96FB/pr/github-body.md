Task: `202609202207-HY96FB`
Title: Fix canonical verification projection metadata so Kernel final-validation records remain current through operational ...
Canonical task record: `.agentplane/tasks/202609202207-HY96FB/README.md`

## Summary

Fix canonical verification projection metadata so Kernel final-validation records remain current through operational projection and pre-merge closure

The 0.7.10 Kernel final-validation writer records note 'Verified: canonical Task Kernel final checks passed.' but kernel-operational-projection overwrites task.verification.note with 'Canonical validation <digest>'. recordMetadataMatches then rejects the otherwise valid signed record as verification_metadata_changed, blocking PR closure. Preserve the exact verification metadata owned by the accepted record/projection, add regression coverage, and keep fail-closed verification identity checks intact.

## Scope

- In scope: The 0.7.10 Kernel final-validation writer records note 'Verified: canonical Task Kernel final checks passed.' but kernel-operational-projection overwrites task.verification.note with 'Canonical validation <digest>'. recordMetadataMatches then rejects the otherwise valid signed record as verification_metadata_changed, blocking PR closure. Preserve the exact verification metadata owned by the accepted record/projection, add regression coverage, and keep fail-closed verification identity checks intact.
- Out of scope: unrelated refactors not required for "Fix canonical verification projection metadata so Kernel final-validation records remain current through operational projection and pre-merge closure".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-20T22:23:58.894Z
- Branch: task/202609202207-HY96FB/canonical-hy96fb
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task/kernel-operational-projection.test.ts     | 40 +++++++++++++++++++++-
 .../commands/task/kernel-operational-projection.ts | 26 ++++++++------
 2 files changed, 55 insertions(+), 11 deletions(-)
```

</details>
