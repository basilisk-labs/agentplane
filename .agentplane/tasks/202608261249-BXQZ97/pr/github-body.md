Task: `202608261249-BXQZ97`
Title: Add a digest-bound provider update-branch recovery transition for stale hosted PR heads
Canonical task record: `.agentplane/tasks/202608261249-BXQZ97/README.md`

## Summary

Add a digest-bound provider update-branch recovery transition for stale hosted PR heads

Release blocker for 0.7.8 and task 202608252330-9RCWZQ. Symptom: PR #4889 is OPEN, MERGEABLE, and BEHIND; required verify-real-e2e fails on exact head e19eb173c25eb7c6800643bcb87173c857a042fb because that head excludes the already integrated C6WV4T qualification correction on exact main 79bc13ff33358c49e216901f59c8fbc0a17987d2. All other hosted jobs pass. The failure reproduced on multiple clean published heads. Violated invariant: when required hosted checks fail solely on a provider PR head that is behind its protected base, AgentPlane must offer a digest-bound, effectively-once provider update-branch recovery transition before semantic source rework or integration. Root cause: current route classification maps failed hosted checks directly to implementation_rework_required and exposes no normal AgentPlane operation for GitHub's update-branch effect. Temporary recovery: preserve 9RCWZQ and use an approved bootstrap runtime only for control-plane retirement; do not manually merge, rebase, push, or edit state. Permanent fix: add the smallest provider-neutral route/effect contract with GitHub update-branch execution, exact expected-head/base readback, effect-in-doubt reconciliation, authority digests, and fail-closed behavior for conflicts, head drift, ambiguity, or unsupported providers. Regression tests must prove route selection, pre-effect failure safety, effect reconciliation, and that semantic rework remains selected for genuine source failures. Integrate normally, then use the fresh runtime to refresh PR #4889 and resume 9RCWZQ.

## Scope

- In scope: Release blocker for 0.7.8 and task 202608252330-9RCWZQ. Symptom: PR #4889 is OPEN, MERGEABLE, and BEHIND; required verify-real-e2e fails on exact head e19eb173c25eb7c6800643bcb87173c857a042fb because that head excludes the already integrated C6WV4T qualification correction on exact main 79bc13ff33358c49e216901f59c8fbc0a17987d2. All other hosted jobs pass. The failure reproduced on multiple clean published heads. Violated invariant: when required hosted checks fail solely on a provider PR head that is behind its protected base, AgentPlane must offer a digest-bound, effectively-once provider update-branch recovery transition before semantic source rework or integration. Root cause: current route classification maps failed hosted checks directly to implementation_rework_required and exposes no normal AgentPlane operation for GitHub's update-branch effect. Temporary recovery: preserve 9RCWZQ and use an approved bootstrap runtime only for control-plane retirement; do not manually merge, rebase, push, or edit state. Permanent fix: add the smallest provider-neutral route/effect contract with GitHub update-branch execution, exact expected-head/base readback, effect-in-doubt reconciliation, authority digests, and fail-closed behavior for conflicts, head drift, ambiguity, or unsupported providers. Regression tests must prove route selection, pre-effect failure safety, effect reconciliation, and that semantic rework remains selected for genuine source failures. Integrate normally, then use the fresh runtime to refresh PR #4889 and resume 9RCWZQ.
- Out of scope: unrelated refactors not required for "Add a digest-bound provider update-branch recovery transition for stale hosted PR heads".

## Verification

- State: needs_rework
- Note:

```text
Rework: Declared check failed: bunx vitest run
packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-26T13:12:22.036Z
- Branch: task/202608261249-BXQZ97/add-provider-update-branch-recovery
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/provider-update-branch.test.ts | 230 +++++++++++++
 .../src/commands/pr/provider-update-branch.ts      | 368 +++++++++++++++++++++
 2 files changed, 598 insertions(+)
```

</details>
