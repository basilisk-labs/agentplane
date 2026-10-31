Task: `202610311835-GVTHA3`
Title: Deliver terminal verification retry from current canonical main
Canonical task record: `.agentplane/tasks/202610311835-GVTHA3/README.md`

## Summary

Deliver terminal verification retry from current canonical main

The user authorized all eight SB recovery items, native code fixes, PR/merge, deployment and live acceptance while preserving data, credentials and runtime guards. Deliver the already approved terminal verification retry feature from current canonical main f89d603f7fa9b70bca5896fef42212c4c1590fe8. The reviewed candidate is the exact 13-source-file diff from that base to 7e8a77981dd9ab67ac9f2771988e613017306831. Preserve original VPB Task 202610280840-VPBGBK, immutable completed Kernel 43c0045943740ec27078f9b25cf0e9a5168f011e6c2e01a1a712f0812b5405df, PR6957, failed native run015 and all source evidence. The old branch imports canonical Task artifacts relative to its older frozen base and the ownership guard refuses publication. Do not relax that guard, rebuild or reset the old branch, include unrelated Tasks in a fake batch, copy protected proofs, or assign a new result to the old Task. This is a genuine current-main implementation Task with its own source diff, tests, review and publication. Import source code only. Keep one typed verification_retry_request through the existing public task advance workflow recovery. Authenticate exact repository, approved completed Kernel and command contracts, source or audited metadata descendant, and retained real supervisor failure. Execute all mandatory real checks once under the existing lease. Preserve old Kernel, original failed journal, prior EVAL, PR artifacts and receipts. Reconcile interruption from exact durable before/afterimages. Refuse unknown outcomes, duplicate execution, source/command/scope drift, and provider or frozen-base guard changes. Require a fresh EVALUATOR after actual native success. Keep default and configured workflow directories, containment and symlink guards. Address the actual merged-candidate hotspots failure: verify-record-execute.ts has 602 lines against the existing 600-line limit. Do not waive budgets. Investigate the full-suite kernel-bookkeeping body-file cold-read readback_mismatch without weakening its exact CR/LF, two-write or duplicate-replay checks. Independent canonical and merged focused tests passed4 each, and related full-config tests passed60; those diagnostics are not native acceptance. Use full native CI and the current source review before canonical protected PR/merge. Do not modify Factory, SB runtime, credentials, global files, old worktrees, branches or archives. Native retirement of four historical Factory intents is a separate pending user scope decision and is excluded.

## Scope

- In scope: The user authorized all eight SB recovery items, native code fixes, PR/merge, deployment and live acceptance while preserving data, credentials and runtime guards. Deliver the already approved terminal verification retry feature from current canonical main f89d603f7fa9b70bca5896fef42212c4c1590fe8. The reviewed candidate is the exact 13-source-file diff from that base to 7e8a77981dd9ab67ac9f2771988e613017306831. Preserve original VPB Task 202610280840-VPBGBK, immutable completed Kernel 43c0045943740ec27078f9b25cf0e9a5168f011e6c2e01a1a712f0812b5405df, PR6957, failed native run015 and all source evidence. The old branch imports canonical Task artifacts relative to its older frozen base and the ownership guard refuses publication. Do not relax that guard, rebuild or reset the old branch, include unrelated Tasks in a fake batch, copy protected proofs, or assign a new result to the old Task. This is a genuine current-main implementation Task with its own source diff, tests, review and publication. Import source code only. Keep one typed verification_retry_request through the existing public task advance workflow recovery. Authenticate exact repository, approved completed Kernel and command contracts, source or audited metadata descendant, and retained real supervisor failure. Execute all mandatory real checks once under the existing lease. Preserve old Kernel, original failed journal, prior EVAL, PR artifacts and receipts. Reconcile interruption from exact durable before/afterimages. Refuse unknown outcomes, duplicate execution, source/command/scope drift, and provider or frozen-base guard changes. Require a fresh EVALUATOR after actual native success. Keep default and configured workflow directories, containment and symlink guards. Address the actual merged-candidate hotspots failure: verify-record-execute.ts has 602 lines against the existing 600-line limit. Do not waive budgets. Investigate the full-suite kernel-bookkeeping body-file cold-read readback_mismatch without weakening its exact CR/LF, two-write or duplicate-replay checks. Independent canonical and merged focused tests passed4 each, and related full-config tests passed60; those diagnostics are not native acceptance. Use full native CI and the current source review before canonical protected PR/merge. Do not modify Factory, SB runtime, credentials, global files, old worktrees, branches or archives. Native retirement of four historical Factory intents is a separate pending user scope decision and is excluded.
- Out of scope: unrelated refactors not required for "Deliver terminal verification retry from current canonical main".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-31T20:15:58.708Z
- Branch: task/202610311835-GVTHA3/deliver-terminal-verification-retry-from-current
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...re.workflow-recovery.verification-retry.test.ts | 563 +++++++++++++++++++++
 .../task/direct-task-verification-observation.ts   | 101 +++-
 .../direct-task-verification.observability.test.ts |  88 +++-
 .../src/commands/task/direct-task-verification.ts  |  24 +-
 .../task/external-agent-task-artifact-baseline.ts  |  42 +-
 .../src/commands/task/kernel-bookkeeping.test.ts   |  42 +-
 .../verification-retry-effect-recovery.test.ts     | 463 +++++++++++++++++
 .../task/verification-retry-effect-recovery.ts     | 479 ++++++++++++++++++
 .../task/verification-retry-source-proof.test.ts   | 145 ++++++
 .../task/verification-retry-source-proof.ts        | 276 ++++++++++
 .../src/commands/task/verify-record-execute.ts     |  46 +-
 .../task/verify-record-terminal-projection.ts      |  44 ++
 .../agentplane/src/commands/task/verify-record.ts  |   2 +
 .../src/commands/task/verify-record.types.ts       |   2 +
 .../src/commands/task/workflow-effect-recovery.ts  |   2 +
 15 files changed, 2242 insertions(+), 77 deletions(-)
```

</details>
