Task: `202607280107-BPZFPF`
Title: Archive incident INC-20260727-01 task-context evidence
Canonical task record: `.agentplane/tasks/202607280107-BPZFPF/README.md`

## Summary

Reconcile release incident INC-20260727-01

Dedicated incident review/fix for the release-blocking TaskEpisodeView section-authority entry. Verify the shipped RF-21 contract: task_document_schema is explicit, required-section omission or validation failure is enforced, and tests cover localized structural headings. Preserve final evidence in the incident archive and remove the active entry only after deterministic checks pass. Do not author a new semantic role/heading policy.

## Scope

- In scope: Dedicated incident review/fix for the release-blocking TaskEpisodeView section-authority entry. Verify the shipped RF-21 contract: task_document_schema is explicit, required-section omission or validation failure is enforced, and tests cover localized structural headings. Preserve final evidence in the incident archive and remove the active entry only after deterministic checks pass. Do not author a new semantic role/heading policy.
- Out of scope: unrelated refactors not required for "Reconcile release incident INC-20260727-01".

## Verification

- State: ok
- Note:

```text
Verified archive reconciliation: TaskEpisodeView authority and loss-prevention regression passed;
policy routing, release incident gate, doctor, and diff checks passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T01:09:13.903Z
- Branch: task/202607280107-BPZFPF/reconcile-release-incident
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/incidents.md                | 3 ++-
 docs/developer/incident-archive.mdx            | 4 ++++
 packages/agentplane/assets/policy/incidents.md | 3 ++-
 3 files changed, 8 insertions(+), 2 deletions(-)
```

</details>
