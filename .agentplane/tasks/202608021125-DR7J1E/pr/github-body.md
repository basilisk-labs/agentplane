Task: `202608021125-DR7J1E`
Title: Build the v0.7.1 end-to-end release qualification suite
Canonical task record: `.agentplane/tasks/202608021125-DR7J1E/README.md`

## Summary

Build the v0.7.1 end-to-end release qualification suite

Specify and implement a deterministic E2E and benchmark matrix for every supported task lifecycle, automatic context preparation, managed and external-agent supervisor frontends, failure recovery, hosted integration, token efficiency, latency, and release acceptance. The suite must run against the candidate build, preserve observed evidence, compare to the v0.6 baseline, and emit an actionable defect ledger without claiming speed or token gains that are not measured.

## Scope

In scope: the complete public task lifecycle in direct and branch_pr modes; managed runner and external-agent supervisor paths; automatic task/context/knowledge preparation; authority and fingerprint boundaries; verification and evaluator outcomes; PR synchronization, hosted checks, integration and cleanup; failure recovery; context packet size; command count; provider and evaluator token usage; latency; scope correctness; benchmark comparison; CI and release evidence. The user-provided architecture audit and the current v0.7.0 qualification artifacts are input evidence. Out of scope for this task: implementing every discovered product fix. Each confirmed release-blocking defect that cannot be fixed without materially widening this task becomes a separate executable task before release.

## Verification

- State: needs_rework
- Note:

```text
Rework the task verification contract: the harness correctly emits release-blocking defects, but
current Verify Steps incorrectly require the not-yet-fixed candidate to pass the final product gate
before the harness can be integrated.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-02T11:30:44.483Z
- Branch: task/202608021125-DR7J1E/build-the-v0-7-1-end-to-end-release-qualificatio
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .gitignore                                         |   1 +
 package.json                                       |   4 +
 scripts/README.md                                  |   8 +
 scripts/lib/test-route-registry.mjs                |  99 +++++
 .../check-v0.7.1-efficiency-evidence.mjs           | 221 +++++++++++
 .../check-v0.7.1-product-contract.mjs              | 185 ++++++++++
 .../measure-v0.7.1-matched-cli-latency.mjs         | 302 +++++++++++++++
 scripts/qualification/release-qualification.mjs    | 388 ++++++++++++++++++++
 .../qualification/release-qualification.test.mjs   | 201 ++++++++++
 .../run-v0.7.1-release-qualification.mjs           | 244 +++++++++++++
 .../v0.7.1-release-qualification.json              | 406 +++++++++++++++++++++
 11 files changed, 2059 insertions(+)
```

</details>
