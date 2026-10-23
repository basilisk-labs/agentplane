Task: `202610231840-74H7WF`
Title: Admit authenticated native verification journals in artifact gate for 0.7.13
Canonical task record: `.agentplane/tasks/202610231840-74H7WF/README.md`

## Summary

Admit authenticated native verification journals in artifact gate for 0.7.13

Apply the independently reviewed generic journal policy from completed local task 202610231619-5B8XWB to main. Preserve durable native status, manifest, JSONL and archive evidence. Reject arbitrary logs and forged metadata. Publish reviewable PR targeting main.

## Scope

- In scope: Apply the independently reviewed generic journal policy from completed local task 202610231619-5B8XWB to main. Preserve durable native status, manifest, JSONL and archive evidence. Reject arbitrary logs and forged metadata. Publish reviewable PR targeting main.
- Out of scope: unrelated refactors not required for "Admit authenticated native verification journals in artifact gate for 0.7.13".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-23T18:44:38.768Z
- Branch: task/202610231840-74H7WF/admit-authenticated-native-verification-journals
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 scripts/checks/check-agentplane-artifacts.mjs      |  41 ++++++-
 scripts/checks/native-verification-journal.mjs     |  83 +++++++++++++
 .../checks/native-verification-journal.test.mjs    | 128 +++++++++++++++++++++
 3 files changed, 250 insertions(+), 2 deletions(-)
```

</details>
