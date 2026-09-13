Task: `202609121424-3YAX44`
Title: Add the 0.7.9 marginal-cost and paired production benchmark harness for ST-14 through ST-16
Canonical task record: `.agentplane/tasks/202609121424-3YAX44/README.md`

## Summary

Add the 0.7.9 marginal-cost and paired production benchmark harness for ST-14 through ST-16

Source contract: agentplane-roadmap-r2 cards ST-14, ST-15, and ST-16. Measure marginal Git and artifact cost in the existing fixture harness, add one production-path paired driver using current isolation and evidence utilities, and report all-attempt cost per independently verified success with paired outcomes, success and violation rates, stage distributions, coverage, and uncertainty. Enforce matched target tree, product artifacts, model, effort, authority, checks, retries, runtime profile, verifier, and raw cost. Managed and external modes remain stratified. Unknown charges prevent a complete numeric claim; all-failed arms yield no finite success score. Do not execute paid calls in this task and do not reinterpret historical baselines. Preserve I01-I12 and C01-C08. The roadmap directory is source-only and must never be committed. Required checks: node --test scripts/bench/task-marginal-cost.test.mjs; node --test scripts/bench/paired-production-driver.test.mjs; node --test scripts/bench/paired-result-report.test.mjs; existing benchmark replay checks and relevant release critical checks.

## Scope

- In scope: Source contract: agentplane-roadmap-r2 cards ST-14, ST-15, and ST-16. Measure marginal Git and artifact cost in the existing fixture harness, add one production-path paired driver using current isolation and evidence utilities, and report all-attempt cost per independently verified success with paired outcomes, success and violation rates, stage distributions, coverage, and uncertainty. Enforce matched target tree, product artifacts, model, effort, authority, checks, retries, runtime profile, verifier, and raw cost. Managed and external modes remain stratified. Unknown charges prevent a complete numeric claim; all-failed arms yield no finite success score. Do not execute paid calls in this task and do not reinterpret historical baselines. Preserve I01-I12 and C01-C08. The roadmap directory is source-only and must never be committed. Required checks: node --test scripts/bench/task-marginal-cost.test.mjs; node --test scripts/bench/paired-production-driver.test.mjs; node --test scripts/bench/paired-result-report.test.mjs; existing benchmark replay checks and relevant release critical checks.
- Out of scope: unrelated refactors not required for "Add the 0.7.9 marginal-cost and paired production benchmark harness for ST-14 through ST-16".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-13T08:00:01.413Z
- Branch: task/202609121424-3YAX44/add-the-0-7-9-marginal-cost-and-paired-productio
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 scripts/bench/paired-production-driver.mjs         | 607 +++++++++++++++++++++
 scripts/bench/paired-production-driver.test.mjs    | 289 ++++++++++
 scripts/bench/paired-result-report.mjs             | 428 +++++++++++++++
 scripts/bench/paired-result-report.test.mjs        | 207 +++++++
 scripts/bench/task-marginal-cost.test.mjs          | 104 ++++
 .../lib/agent-efficiency-repository-snapshot.mjs   | 195 +++++++
 6 files changed, 1830 insertions(+)
```

</details>
