Task: `202608032250-WDRW1E`
Title: Stabilize supervisor latency p95 qualification sampling
Canonical task record: `.agentplane/tasks/202608032250-WDRW1E/README.md`

## Summary

Stabilize supervisor latency p95 qualification sampling

Increase the mandatory cold supervisor latency sample from 10 to 20 while preserving the existing 10 percent regression budget, so release qualification uses a meaningful p95 estimate instead of treating one maximum outlier as p95.

## Scope

- In scope: Increase the mandatory cold supervisor latency sample from 10 to 20 while preserving the existing 10 percent regression budget, so release qualification uses a meaningful p95 estimate instead of treating one maximum outlier as p95.
- Out of scope: unrelated refactors not required for "Stabilize supervisor latency p95 qualification sampling".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-03T22:51:23.070Z
- Branch: task/202608032250-WDRW1E/stabilize-supervisor-latency-p95-qualification-s
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 scripts/qualification/measure-v0.7.1-supervisor-latency.mjs |  2 +-
 scripts/qualification/release-qualification.test.mjs        | 11 +++++++++--
 2 files changed, 10 insertions(+), 3 deletions(-)
```

</details>
