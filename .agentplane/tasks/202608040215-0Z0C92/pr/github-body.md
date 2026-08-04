Task: `202608040215-0Z0C92`
Title: Add exact candidate RF-04 pilot mode
Canonical task record: `.agentplane/tasks/202608040215-0Z0C92/README.md`

## Summary

Add exact candidate RF-04 pilot mode

Add a non-persisting one-run pilot to the v0.7.1 candidate provider capture so the pinned Codex runtime and exact candidate harness can be validated before the no-retry 50-run generation; cover precondition failures and prove no artifacts are published.

## Scope

- In scope: Add a non-persisting one-run pilot to the v0.7.1 candidate provider capture so the pinned Codex runtime and exact candidate harness can be validated before the no-retry 50-run generation; cover precondition failures and prove no artifacts are published.
- Out of scope: unrelated refactors not required for "Add exact candidate RF-04 pilot mode".

## Verification

- State: ok
- Note:

```text
Candidate RF-04 pilot verified on implementation 3ceafe0ab with structured local evidence and no
provider execution.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-04T02:16:59.152Z
- Branch: task/202608040215-0Z0C92/add-exact-candidate-rf-04-pilot-mode
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...cli.critical.agent-efficiency-candidate.test.ts | 109 ++++++++++++++++
 .../bench/capture-agent-efficiency-candidate.mjs   | 140 +++++++++++++++++----
 2 files changed, 227 insertions(+), 22 deletions(-)
```

</details>
