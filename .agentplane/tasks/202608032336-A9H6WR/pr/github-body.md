Task: `202608032336-A9H6WR`
Title: Preflight the provider binary before release qualification
Canonical task record: `.agentplane/tasks/202608032336-A9H6WR/README.md`

## Summary

Preflight the provider binary before release qualification

Fail provider-enabled v0.7.1 qualification before running local scenarios when the exact requested Codex version does not match the trusted ChatGPT.app replay binary, preventing wasted deterministic work and zero-episode gate failures.

## Scope

- In scope: Fail provider-enabled v0.7.1 qualification before running local scenarios when the exact requested Codex version does not match the trusted ChatGPT.app replay binary, preventing wasted deterministic work and zero-episode gate failures.
- Out of scope: unrelated refactors not required for "Preflight the provider binary before release qualification".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-03T23:38:16.998Z
- Branch: task/202608032336-A9H6WR/preflight-the-provider-binary-before-release-qua
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../qualification/release-qualification.test.mjs   | 37 +++++++++++++++++++++-
 .../run-v0.7.1-release-qualification.mjs           | 11 +++++++
 2 files changed, 47 insertions(+), 1 deletion(-)
```

</details>
