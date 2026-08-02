Task: `202608020545-Y4HQ7A`
Title: Freeze qualification metric policy and verification evidence
Canonical task record: `.agentplane/tasks/202608020545-Y4HQ7A/README.md`

## Summary

Freeze qualification metric policy and verification evidence

Make milestone qualification packets distinguish diagnostic-only RF-04 timing failures from blocking metric failures, and make evaluator preparation freeze the packet-selected verification record against the qualified implementation SHA. Preserve raw failures, reject unclassified blocking regressions, and keep qualification tasks evidence-only.

## Scope

- In scope: Make milestone qualification packets distinguish diagnostic-only RF-04 timing failures from blocking metric failures, and make evaluator preparation freeze the packet-selected verification record against the qualified implementation SHA. Preserve raw failures, reject unclassified blocking regressions, and keep qualification tasks evidence-only.
- Out of scope: unrelated refactors not required for "Freeze qualification metric policy and verification evidence".

## Verification

- State: ok
- Note:

```text
Verified qualification gate classification and frozen verification provenance on implementation SHA
98f9f6edd. Raw RF-04 latency failures remain visible and non-publishing, blocking failures stop
packet construction, and evaluator evidence now includes the packet-selected verification record.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-02T05:47:46.450Z
- Branch: task/202608020545-Y4HQ7A/freeze-qualification-metric-policy-and-verificat
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator-qualification-packet.test.ts         | 75 +++++++++++++++++++++-
 .../commands/evaluator/evaluator-review-usecase.ts |  3 +-
 .../src/commands/task/qualification-packet-rf04.ts | 54 +++++++++++++++-
 3 files changed, 128 insertions(+), 4 deletions(-)
```

</details>
