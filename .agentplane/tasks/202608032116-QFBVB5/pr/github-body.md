Task: `202608032116-QFBVB5`
Title: Keep frozen qualification subject clean while writing evidence
Canonical task record: `.agentplane/tasks/202608032116-QFBVB5/README.md`

## Summary

Keep frozen qualification subject clean while writing evidence

Allow qualification subprocesses to exclude only the active in-repository evidence output directory from frozen-subject cleanliness checks, while still failing on every other tracked or untracked change.

## Scope

- In scope: Allow qualification subprocesses to exclude only the active in-repository evidence output directory from frozen-subject cleanliness checks, while still failing on every other tracked or untracked change.
- Out of scope: unrelated refactors not required for "Keep frozen qualification subject clean while writing evidence".

## Verification

- State: ok
- Note:

```text
PASS. Qualification subprocesses keep the frozen subject strict while allowing only their active
evidence directory; matched CLI and supervisor latency both executed and passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-03T21:17:50.559Z
- Branch: task/202608032116-QFBVB5/keep-frozen-qualification-subject-clean-while-wr
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 scripts/qualification/release-qualification.mjs    | 26 +++++++++-
 .../qualification/release-qualification.test.mjs   | 56 +++++++++++++++++++++-
 2 files changed, 79 insertions(+), 3 deletions(-)
```

</details>
