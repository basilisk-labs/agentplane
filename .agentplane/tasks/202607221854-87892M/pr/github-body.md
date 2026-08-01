Task: `202607221854-87892M`
Title: Add fingerprinted preparation caches
Canonical task record: `.agentplane/tasks/202607221854-87892M/README.md`

## Summary

Add fingerprinted preparation caches

RF-26b: cache only measured expensive deterministic nodes by exact StateFingerprint/TTL with explicit hit, miss, and invalidation receipts; never serve stale task, Git, provider, policy, or knowledge state.

## Scope

- In scope: caches for selected measured nodes, exact keys/TTL, dependency invalidation, provider freshness policy, corruption fallback, receipts, bounded storage, warm/cold benchmarks, and stale-state negative tests.
- Out of scope: caching semantic decisions without provenance/invalidation or adding a DAG whose benchmark does not justify complexity.

## Verification

- State: ok
- Note: RF-26b deterministic evidence confirms the measured cache candidate is a no-go and no prototype remains.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T15:52:59.720Z
- Branch: task/202607221854-87892M/add-fingerprinted-preparation-caches
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../workflow-step-fingerprint-preparation.ts       | 154 +++++++++++++
 .../commands/shared/workflow-step-fingerprint.ts   | 157 ++++----------
 .../observation/git-snapshot.capture.unit.test.ts  |  65 ++++++
 .../src/runner/observation/git-snapshot.test.ts    |  31 +++
 .../src/runner/observation/git-snapshot.ts         |   6 +-
 .../src/runner/observation/git-snapshot/capture.ts | 240 +++++++++++++++------
 6 files changed, 473 insertions(+), 180 deletions(-)
```

</details>
