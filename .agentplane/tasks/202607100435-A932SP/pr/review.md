# PR Review

Created: 2026-07-10T04:36:53.058Z

## Task

- Task: `202607100435-A932SP`
- Title: Release integration lane after pre-merge Hosted Close
- Status: DOING
- Branch: `task/202607100435-A932SP/release-lane-after-premerge-hosted-close`
- Canonical task record: `.agentplane/tasks/202607100435-A932SP/README.md`

## Verification

- State: ok
- Note: Verified review hardening at 3fcc7b0: same Hosted Close task/marker/basis validation, focused 4 files/21 tests, typecheck, lint:core, Knip 574/574, ci:contract, and full fast 364 files/2150 tests passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-10T09:06:02.845Z
- Branch: task/202607100435-A932SP/release-lane-after-premerge-hosted-close
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607092209-F33MNN/README.md    |   2 +
 docs/internal/v0.6.22-refactor-plan.md             |   5 +-
 .../src/commands/pr/flow-status.pre-merge.test.ts  | 117 +++++++++++++++++++++
 packages/agentplane/src/commands/pr/flow-status.ts |  51 +++++++++
 4 files changed, 173 insertions(+), 2 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
