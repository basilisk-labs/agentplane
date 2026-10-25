Task: `202610252200-AFM63A`
Title: Recover provider update intent across authorized base advancement
Canonical task record: `.agentplane/tasks/202610252200-AFM63A/README.md`

## Summary

Recover provider update intent across authorized base advancement

Release 0.7.13 generic supervisor recovery: preserve strict same-base proof. For a stopped provider.pr.update_branch intent whose signed base advanced before GitHub completed its update, settle only after exact original USER grant/audit and intent binding, GitHub verified merge of the signed old head with a descendant base, temporal and authenticated account proof, explicit USER attestation of exact PR/head/base/grant, clean local tracking, second route check, and one-shot journal CAS. Read-only recovery must never dispatch a provider mutation. Reject ambiguous actor, unrelated merge, stale head, wrong ancestry, replay, or concurrent journal drift. Preserve hosted failure verdict and normal route recomputation.

## Scope

- In scope: Release 0.7.13 generic supervisor recovery: preserve strict same-base proof. For a stopped provider.pr.update_branch intent whose signed base advanced before GitHub completed its update, settle only after exact original USER grant/audit and intent binding, GitHub verified merge of the signed old head with a descendant base, temporal and authenticated account proof, explicit USER attestation of exact PR/head/base/grant, clean local tracking, second route check, and one-shot journal CAS. Read-only recovery must never dispatch a provider mutation. Reject ambiguous actor, unrelated merge, stale head, wrong ancestry, replay, or concurrent journal drift. Preserve hosted failure verdict and normal route recomputation.
- Out of scope: unrelated refactors not required for "Recover provider update intent across authorized base advancement".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-25T22:34:12.763Z
- Branch: task/202610252200-AFM63A/recover-provider-update-intent-across-authorized
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../shared/provider-update-branch-route.ts         |  29 ++
 .../commands/task/authority-grant.command.test.ts  | 392 ++++++++++++++++++++-
 .../src/commands/task/authority-grant.command.ts   |  55 ++-
 .../task/provider-update-effect-recovery.test.ts   | 304 +++++++++++++++-
 .../task/provider-update-effect-recovery.ts        | 277 +++++++++++++--
 .../task/provider-update-recovery-grant.ts         | 374 ++++++++++++++++++++
 6 files changed, 1389 insertions(+), 42 deletions(-)
```

</details>
