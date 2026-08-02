Task: `202608020432-CCE1A2`
Title: Allow qualification packets to ignore root lifecycle drift
Canonical task record: `.agentplane/tasks/202608020432-CCE1A2/README.md`

## Summary

Allow qualification packets to ignore root lifecycle drift

Fix qualification packet generation so lifecycle-only changes to the qualification root task after the reviewed implementation SHA do not trigger false dependency artifact drift, while dependency task documents and evidence remain strictly SHA-bound. Add a regression test for start-ready lifecycle drift and preserve all existing tamper rejection behavior.

## Scope

- In scope: Fix qualification packet generation so lifecycle-only changes to the qualification root task after the reviewed implementation SHA do not trigger false dependency artifact drift, while dependency task documents and evidence remain strictly SHA-bound. Add a regression test for start-ready lifecycle drift and preserve all existing tamper rejection behavior.
- Out of scope: unrelated refactors not required for "Allow qualification packets to ignore root lifecycle drift".

## Verification

- State: ok
- Note:

```text
Refreshed deterministic verification evidence for a728b1134 with six machine-readable passing
command records; no implementation change.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-02T04:46:30.035Z
- Branch: task/202608020432-CCE1A2/allow-qualification-packets-to-ignore-root-lifec
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator-qualification-packet.test.ts         | 60 ++++++++++++++++
 .../src/commands/shared/quality-review-target.ts   | 21 +++++-
 .../task/qualification-packet-pinned-task.ts       | 80 ++++++++++++++++++----
 .../src/commands/task/qualification-packet.ts      | 10 ++-
 4 files changed, 153 insertions(+), 18 deletions(-)
```

</details>
