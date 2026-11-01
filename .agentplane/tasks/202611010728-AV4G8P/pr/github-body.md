Task: `202611010728-AV4G8P`
Title: Retire stale writable semantic admissions before legacy quarantine
Canonical task record: `.agentplane/tasks/202611010728-AV4G8P/README.md`

## Summary

Retire stale writable semantic admissions before legacy quarantine

Implement a bounded public native operator recovery to revoke only stale writable external semantic admissions before revision-split quarantine. Initial approved application targets are Factory BPA49V,778NR2,G6MVKS,BCJRWK. Preserve exact Task/journal/WorkOrder/exchange/result beforeimages, old results and receipts; never execute old WorkItems or assign historical DONE/PASS/CANCELLED, and never classify an unknown effect applied/not_applied. Require exact current repository/source/policy/operation pins, missing original checkout and no external-effect authority or active execution lease. Use native retired exchange and journal CAS under the common execution fence, durable prepared/afterimage receipts and strict crash/duplicate/drift/tamper/concurrency refusal. Reuse existing native retirement primitives without weakening migration admission or runtime guards. Validate rollback cannot reactivate retired admission. No Factory application until this source task passes native mandatory checks, fresh independent EVALUATOR, protected canonical PR/merge and current CLI qualification. Keep existing branches/worktrees and all runtime data/credentials. User explicitly approved this extension and the all8 PR/merge/deploy outcome.

## Scope

- In scope: Implement a bounded public native operator recovery to revoke only stale writable external semantic admissions before revision-split quarantine. Initial approved application targets are Factory BPA49V,778NR2,G6MVKS,BCJRWK. Preserve exact Task/journal/WorkOrder/exchange/result beforeimages, old results and receipts; never execute old WorkItems or assign historical DONE/PASS/CANCELLED, and never classify an unknown effect applied/not_applied. Require exact current repository/source/policy/operation pins, missing original checkout and no external-effect authority or active execution lease. Use native retired exchange and journal CAS under the common execution fence, durable prepared/afterimage receipts and strict crash/duplicate/drift/tamper/concurrency refusal. Reuse existing native retirement primitives without weakening migration admission or runtime guards. Validate rollback cannot reactivate retired admission. No Factory application until this source task passes native mandatory checks, fresh independent EVALUATOR, protected canonical PR/merge and current CLI qualification. Keep existing branches/worktrees and all runtime data/credentials. User explicitly approved this extension and the all8 PR/merge/deploy outcome.
- Out of scope: unrelated refactors not required for "Retire stale writable semantic admissions before legacy quarantine".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-11-01T08:22:38.255Z
- Branch: task/202611010728-AV4G8P/retire-stale-writable-semantic-admissions-before
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...run-cli.core.stale-admission-retirement.test.ts | 625 +++++++++++++++++++++
 .../src/cli/run-cli/command-catalog/task.ts        |   7 +
 .../src/cli/run-cli/command-loaders/task.ts        |   4 +
 .../task/stale-admission-retirement-evidence.ts    | 212 +++++++
 .../stale-admission-retirement-recovery.test.ts    | 161 ++++++
 .../task/stale-admission-retirement-validation.ts  | 431 ++++++++++++++
 .../task/stale-admission-retirement.command.ts     | 134 +++++
 .../task/stale-admission-retirement.test.ts        | 102 ++++
 .../commands/task/stale-admission-retirement.ts    | 158 ++++++
 9 files changed, 1834 insertions(+)
```

</details>
