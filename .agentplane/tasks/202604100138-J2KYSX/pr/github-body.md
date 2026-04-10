## Summary

Make pr open explain unpushed task branches before remote create

When branch_pr pr open runs before the task branch exists on origin, GitHub returns a validation failure and the command collapses it into a generic staged/failed message. Detect the missing remote head case and print an explicit actionable outcome instead of a misleading partial-success summary.

## Scope

- In scope: When branch_pr pr open runs before the task branch exists on origin, GitHub returns a validation failure and the command collapses it into a generic staged/failed message. Detect the missing remote head case and print an explicit actionable outcome instead of a misleading partial-success summary.
- Out of scope: unrelated refactors not required for "Make pr open explain unpushed task branches before remote create".

## Verification

### Plan

1. Run the targeted `pr open` CLI test coverage for the new unpushed-branch scenario and the existing remote-create/sync-only cases. Expected: the new scenario reports an explicit actionable staged outcome, while existing staged/create/link behavior stays green.
2. Run the touched lint/test slice for the modified command files. Expected: the updated `pr open` implementation and tests pass without new lint failures.
3. Inspect operator-facing output for the unpushed-branch path. Expected: it explicitly says the task branch is not yet published on `origin` and tells the operator to push before rerunning remote creation.

### Current Status

- State: ok
- Note: Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts -t "pr open"; Result: pass; Evidence: the new unpublished-branch scenario and the existing remote-create/sync-only/linkage scenarios passed in the touched CLI slice. Command: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts; Result: pass; Evidence: the matcher expansion and test harness updates remained lint-clean. Command: agentplane pr open before push plus repeat after git push; Result: pass; Evidence: the first run emitted explicit origin-publish guidance for the task branch, and the second run auto-created GitHub PR #257 without manual gh pr create.

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

- Updated: 2026-04-10T01:59:06.747Z
- Branch: task/202604100138-J2KYSX/pr-open-unpushed-branch
- Head: 22be564585fd

```text
 .agentplane/tasks/202604100138-J2KYSX/README.md    | 117 +++++++++++++++++++++
 .../tasks/202604100138-J2KYSX/pr/diffstat.txt      |  11 ++
 .../tasks/202604100138-J2KYSX/pr/github-body.md    |  60 +++++++++++
 .../tasks/202604100138-J2KYSX/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604100138-J2KYSX/pr/meta.json |  17 +++
 .../tasks/202604100138-J2KYSX/pr/notes.jsonl       |   0
 .agentplane/tasks/202604100138-J2KYSX/pr/review.md |  67 ++++++++++++
 .../tasks/202604100138-J2KYSX/pr/verify.log        |   0
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        |  79 ++++++++++++++
 .../agentplane/src/commands/pr/internal/sync.ts    |  27 +++++
 10 files changed, 379 insertions(+)
```

</details>
