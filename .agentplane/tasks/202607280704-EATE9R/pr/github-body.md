Task: `202607280704-EATE9R`
Title: Prove cleanup identity after provider-updated PR head
Canonical task record: `.agentplane/tasks/202607280704-EATE9R/README.md`

## Summary

Prove cleanup identity after provider-updated PR head

Allow branch_pr cleanup to recognize a GitHub-generated PR branch update after a protected-base merge, only when immutable ancestry and merged-base evidence prove the original task head is integrated. Preserve fail-closed behavior for unrelated or rewritten heads.

## Scope

- In scope: Allow branch_pr cleanup to recognize a GitHub-generated PR branch update after a protected-base merge, only when immutable ancestry and merged-base evidence prove the original task head is integrated. Preserve fail-closed behavior for unrelated or rewritten heads.
- Out of scope: unrelated refactors not required for "Prove cleanup identity after provider-updated PR head".

## Verification

- State: ok
- Note:

```text
Targeted cleanup provider-proof regression suite, TypeScript build, runtime doctor, and routing
validation all passed for commit 4e4708b49.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T07:06:34.499Z
- Branch: task/202607280704-EATE9R/prove-cleanup-identity-after-provider-updated-pr
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/branch/cleanup-merged-proof.ts    | 47 +++++++++++++++++
 .../branch/cleanup-merged.targeted.test.ts         | 59 ++++++++++++++++++++++
 2 files changed, 106 insertions(+)
```

</details>
