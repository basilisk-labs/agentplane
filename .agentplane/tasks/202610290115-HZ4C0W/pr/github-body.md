Task: `202610290115-HZ4C0W`
Title: Preserve frozen execution base while revalidating publication after main advances
Canonical task record: `.agentplane/tasks/202610290115-HZ4C0W/README.md`

## Summary

Preserve frozen execution base while revalidating publication after main advances

The user explicitly authorizes a separate native AP Task to fix publication when canonical main advances, preserve the original execution base, revalidate, and continue PR/merge then SB recovery. Reproduce the real VPBGBK prepublication failure: frozen execution base d51453363dbafa18b79f4c35ed9cc7e76f25b867, verified source5745f9b7b0014b8ecd7def0688dec8aeb27137a2, native full011 and genuine EVAL778c84 PASS; live canonical main52302393b857dc213764c7a22ba06df1d48afa01. Native approval.pr.open grant was accepted but exact pr open refused before push: Exact-SHA PR base is ambiguous: local and live main differ. Updating local main alone cannot satisfy local==live==frozen. First inspect fresh canonical primitives and select the smallest complete prospective correction. Keep immutable execution/comparison base and old Task/Kernel/failed/full/EVAL history. Authenticate live canonical provider target and descendant ancestry; reject unrelated/rewritten/ambiguous/stale/missing/racing evidence before publish. Require fresh current-main verification and review rather than carrying an old PASS across a changed integration state. A normal advancing main must not produce an endless sequence of corrective tasks. Do not disable exact-base guards, forge Task/import/receipt authority, rewrite frozen bases, or manually open a PR. Use native task lifecycle, mandatory full regression and genuine evaluator before canonical PR/merge. Preserve original VPBGBK and Factory DRG36R worktrees, all untracked files, privateTMP, credentials, runtime guards. No host effects, auth, installation, global environment/config or cleanup in this AP Task. Plan may propose bounded necessary publication/recovery roots under this explicit corrective scope; do not silently expand to unrelated mechanisms. Prior boundary evidence is Factory YMR artifacts/semantic-assimilation/sb-post121845-vpbgbk-authorized-pr-open-frozen-base-blocked.json.

## Scope

- In scope: The user explicitly authorizes a separate native AP Task to fix publication when canonical main advances, preserve the original execution base, revalidate, and continue PR/merge then SB recovery. Reproduce the real VPBGBK prepublication failure: frozen execution base d51453363dbafa18b79f4c35ed9cc7e76f25b867, verified source5745f9b7b0014b8ecd7def0688dec8aeb27137a2, native full011 and genuine EVAL778c84 PASS; live canonical main52302393b857dc213764c7a22ba06df1d48afa01. Native approval.pr.open grant was accepted but exact pr open refused before push: Exact-SHA PR base is ambiguous: local and live main differ. Updating local main alone cannot satisfy local==live==frozen. First inspect fresh canonical primitives and select the smallest complete prospective correction. Keep immutable execution/comparison base and old Task/Kernel/failed/full/EVAL history. Authenticate live canonical provider target and descendant ancestry; reject unrelated/rewritten/ambiguous/stale/missing/racing evidence before publish. Require fresh current-main verification and review rather than carrying an old PASS across a changed integration state. A normal advancing main must not produce an endless sequence of corrective tasks. Do not disable exact-base guards, forge Task/import/receipt authority, rewrite frozen bases, or manually open a PR. Use native task lifecycle, mandatory full regression and genuine evaluator before canonical PR/merge. Preserve original VPBGBK and Factory DRG36R worktrees, all untracked files, privateTMP, credentials, runtime guards. No host effects, auth, installation, global environment/config or cleanup in this AP Task. Plan may propose bounded necessary publication/recovery roots under this explicit corrective scope; do not silently expand to unrelated mechanisms. Prior boundary evidence is Factory YMR artifacts/semantic-assimilation/sb-post121845-vpbgbk-authorized-pr-open-frozen-base-blocked.json.
- Out of scope: unrelated refactors not required for "Preserve frozen execution base while revalidating publication after main advances".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-29T06:12:32.546Z
- Branch: task/202610290115-HZ4C0W/preserve-frozen-execution-base-while-revalidatin
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...run-cli.core.pr-flow.pr-open.validation.test.ts |  90 ++++-
 .../agentplane/src/cli/stale-dist-readonly.test.ts |   2 +
 .../commands/branch/work-start.hook-shim.test.ts   |   9 +-
 .../pr/integrate/cmd.protected-base.test.ts        | 162 ++++++++-
 .../src/commands/pr/integrate/cmd.test.ts          |  43 ++-
 .../agentplane/src/commands/pr/integrate/cmd.ts    |   1 +
 .../internal/github-pr-merge-strategy.test.ts      |  74 ++++
 .../pr/integrate/internal/github-pr-merge.ts       |  35 +-
 .../integrate/internal/github-protection.test.ts   |  58 +++
 .../pr/integrate/internal/github-protection.ts     |  55 +++
 .../pr/integrate/internal/gitlab-mr-merge.test.ts  |  95 ++++-
 .../pr/integrate/internal/gitlab-mr-merge.ts       |  37 ++
 .../commands/pr/integrate/internal/prepare.test.ts |  73 +++-
 .../src/commands/pr/integrate/internal/prepare.ts  |  26 ++
 .../integrate/internal/protected-base-handoff.ts   |  63 +++-
 .../src/commands/pr/internal/provider-base.test.ts |  70 +++-
 .../src/commands/pr/internal/provider-base.ts      |  41 ++-
 .../pr/provider-update-branch-local.test.ts        |  55 ++-
 .../commands/pr/provider-update-branch-local.ts    |  21 +-
 .../pr/provider-update-verification-proof.test.ts  | 348 ++++++++++++++++++
 .../pr/provider-update-verification-proof.ts       | 333 +++++++++++++++++
 .../task/branch-task-supervisor-operations.test.ts |  17 +
 .../task/branch-task-supervisor-operations.ts      |  21 +-
 .../task/provider-update-effect-recovery.test.ts   | 153 +++++++-
 .../task/provider-update-effect-recovery.ts        |  42 ++-
 .../task/verify-record-observed-changes.ts         |  14 +
 .../verify-record.inherited-provider-base.test.ts  | 403 +++++++++++++++++++++
 27 files changed, 2256 insertions(+), 85 deletions(-)
```

</details>
