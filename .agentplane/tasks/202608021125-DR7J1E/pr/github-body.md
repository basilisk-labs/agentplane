Task: `202608021125-DR7J1E`
Title: Build the v0.7.1 end-to-end release qualification suite
Canonical task record: `.agentplane/tasks/202608021125-DR7J1E/README.md`

## Summary

Build the v0.7.1 end-to-end release qualification suite

Specify and implement a deterministic E2E and benchmark matrix for every supported task lifecycle, automatic context preparation, managed and external-agent supervisor frontends, failure recovery, hosted integration, token efficiency, latency, and release acceptance. The suite must run against the candidate build, preserve observed evidence, compare to the v0.6 baseline, and emit an actionable defect ledger without claiming speed or token gains that are not measured.

## Scope

In scope: the complete public task lifecycle in direct and branch_pr modes; managed runner and external-agent supervisor paths; automatic task/context/knowledge preparation; authority and fingerprint boundaries; verification and evaluator outcomes; PR synchronization, hosted checks, integration and cleanup; failure recovery; context packet size; command count; provider and evaluator token usage; latency; scope correctness; benchmark comparison; CI and release evidence. The user-provided architecture audit and the current v0.7.0 qualification artifacts are input evidence. Out of scope for this task: implementing every discovered product fix. Each confirmed release-blocking defect that cannot be fixed without materially widening this task becomes a separate executable task before release.

## Verification

- State: ok
- Note:

```text
Qualification harness verified against exact clean implementation SHA
81d9e5f433d4ee95dda12e2d521ff8499822fd98; source tree and packed candidate hashes are frozen, and
each observed blocker has an executable owner.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-02T11:30:44.483Z
- Branch: task/202608021125-DR7J1E/build-the-v0-7-1-end-to-end-release-qualificatio
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202608021231-BPMM04/README.md    |  99 +++++
 .agentplane/tasks/202608021231-PZGG3V/README.md    | 100 +++++
 .agentplane/tasks/202608021231-SHYJGK/README.md    |  99 +++++
 .agentplane/tasks/202608021232-53WJMN/README.md    | 102 +++++
 .agentplane/tasks/202608021232-6BTB6D/README.md    | 104 +++++
 .agentplane/tasks/202608021232-MT4FK2/README.md    | 102 +++++
 .agentplane/tasks/202608021232-YCNM1S/README.md    | 107 +++++
 .gitignore                                         |   1 +
 package.json                                       |   4 +
 scripts/README.md                                  |   8 +
 scripts/lib/test-route-registry.mjs                |  99 +++++
 .../check-v0.7.1-efficiency-evidence.mjs           | 221 ++++++++++
 .../check-v0.7.1-product-contract.mjs              | 185 +++++++++
 .../measure-v0.7.1-matched-cli-latency.mjs         | 328 +++++++++++++++
 scripts/qualification/release-qualification.mjs    | 445 +++++++++++++++++++++
 .../qualification/release-qualification.test.mjs   | 281 +++++++++++++
 .../run-v0.7.1-release-qualification.mjs           | 247 ++++++++++++
 .../v0.7.1-release-qualification.json              | 406 +++++++++++++++++++
 18 files changed, 2938 insertions(+)
```

</details>
