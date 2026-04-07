## Summary

Skip broad pre-commit test-fast for artifact-only and docs-only staged changes

Avoid running the full pre-commit test-fast suite for commits that only touch task artifacts or docs/policy paths, so unrelated worker timeouts do not block workflow bookkeeping commits.

## Scope

- In scope: Avoid running the full pre-commit test-fast suite for commits that only touch task artifacts or docs/policy paths, so unrelated worker timeouts do not block workflow bookkeeping commits.
- Out of scope: unrelated refactors not required for "Skip broad pre-commit test-fast for artifact-only and docs-only staged changes".

## Verification

### Plan

1. Run focused tests for the staged-file selection or pre-commit decision path on an artifact-only or docs-only staged set. Expected: broad test-fast is skipped and the hook reports the skip reason.
2. Run focused tests for a code-bearing staged set. Expected: the hook still selects the broad test path instead of skipping it.
3. Run eslint on the touched hook or selection files and any new tests. Expected: lint exits 0.

### Current Status

- State: ok
- Note: Focused vitest and eslint passed; pre-commit checks and narrowed test-fast gate passed on final HEAD 3977423a.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-07T05:13:41.521Z
- Branch: task/202604070443-T8F4ZZ/pre-commit-artifact-fast-path
- Head: 6388ae265a74

```text
 .agentplane/tasks/202604070443-T8F4ZZ/README.md    | 162 +++++++++++++++++++++
 .../tasks/202604070443-T8F4ZZ/pr/diffstat.txt      |  10 ++
 .../tasks/202604070443-T8F4ZZ/pr/github-body.md    |  50 +++++++
 .../tasks/202604070443-T8F4ZZ/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604070443-T8F4ZZ/pr/meta.json |  14 ++
 .../tasks/202604070443-T8F4ZZ/pr/notes.jsonl       |   0
 .agentplane/tasks/202604070443-T8F4ZZ/pr/review.md |  57 ++++++++
 .../tasks/202604070443-T8F4ZZ/pr/verify.log        |   0
 lefthook.yml                                       |   2 +-
 .../agentplane/src/cli/local-ci-selection.test.ts  |  28 ++++
 .../src/cli/pre-commit-test-fast-script.test.ts    | 104 +++++++++++++
 scripts/lib/local-ci-selection.mjs                 |   8 +-
 scripts/lib/staged-git-files.mjs                   |  12 ++
 scripts/run-commit-msg-hook.mjs                    |  15 +-
 scripts/run-pre-commit-hook.mjs                    |  14 +-
 scripts/run-pre-commit-test-fast.mjs               |  31 ++++
 16 files changed, 482 insertions(+), 26 deletions(-)
```

</details>
